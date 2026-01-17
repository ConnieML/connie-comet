'use client'

import React, { useState, useEffect, useRef } from 'react'

const categoryConfig: Record<string, { icon: string; label: string }> = {
  logos: { icon: '~', label: 'Logos & Marks' },
  colors: { icon: '~', label: 'Colors & Palettes' },
  fonts: { icon: 'A', label: 'Typography & Fonts' },
  templates: { icon: '#', label: 'Templates & Documents' },
  photos: { icon: '*', label: 'Photography & Images' },
  video: { icon: '>', label: 'Video & Motion' },
  audio: { icon: ')', label: 'Audio & Sound' },
  presentations: { icon: '=', label: 'Presentations & Decks' },
  developer: { icon: '<', label: 'Developer & Technical' },
  social: { icon: '@', label: 'Social Media' },
  packages: { icon: '+', label: 'Asset Packages' },
  guidelines: { icon: '?', label: 'Guidelines & Docs' },
}

interface BrandAsset {
  id: string
  name: string
  description?: string
  category: string
  assetType: string
  usageRights: string
  usageNotes?: string
  version?: string
  sourceFile?: string
  tags?: string
  url?: string
  filename?: string
  mimeType?: string
  filesize?: number
  width?: number
  height?: number
  sizes?: {
    thumbnail?: { url: string }
    preview?: { url: string }
  }
}

interface BrandPortalBlockProps {
  heading?: string
  description?: string
  showCategories?: string[]
  usageFilter?: string[]
}

export const BrandPortalBlock: React.FC<BrandPortalBlockProps> = ({
  heading = 'Brand Assets',
  description = 'Download logos, templates, and brand materials for your projects.',
  showCategories = [],
  usageFilter = ['public', 'partners', 'internal', 'restricted'],
}) => {
  const [assets, setAssets] = useState<BrandAsset[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedCategory, setSelectedCategory] = useState<string>('all')
  const [searchQuery, setSearchQuery] = useState('')
  const [copiedId, setCopiedId] = useState<string | null>(null)
  const hasFetched = useRef(false)

  useEffect(() => {
    // Only fetch once on mount
    if (hasFetched.current) return
    hasFetched.current = true

    const fetchAssets = async () => {
      try {
        setLoading(true)
        const params = new URLSearchParams()
        params.append('limit', '100')
        params.append('where[_status][equals]', 'published')

        if (usageFilter && usageFilter.length > 0) {
          usageFilter.forEach((usage, i) => {
            params.append(`where[usageRights][in][${i}]`, usage)
          })
        }

        if (showCategories && showCategories.length > 0) {
          showCategories.forEach((cat, i) => {
            params.append(`where[category][in][${i}]`, cat)
          })
        }

        const response = await fetch(`/api/brand-assets?${params.toString()}`)
        if (!response.ok) throw new Error('Failed to fetch assets')

        const data = await response.json()
        setAssets(data.docs || [])
      } catch (err) {
        console.error('Failed to load assets:', err)
      } finally {
        setLoading(false)
      }
    }

    fetchAssets()
  }, []) // Empty deps - only run once

  const copyToClipboard = async (url: string, id: string) => {
    try {
      await navigator.clipboard.writeText(url)
      setCopiedId(id)
      setTimeout(() => setCopiedId(null), 2000)
    } catch (err) {
      console.error('Failed to copy:', err)
    }
  }

  const formatFileSize = (bytes?: number) => {
    if (!bytes) return ''
    if (bytes < 1024) return `${bytes} B`
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`
  }

  const getFileExtension = (filename?: string) => {
    if (!filename) return ''
    return filename.split('.').pop()?.toUpperCase() || ''
  }

  const availableCategories = [...new Set(assets.map((a) => a.category))]

  const filteredAssets = assets.filter((asset) => {
    const matchesCategory = selectedCategory === 'all' || asset.category === selectedCategory
    const matchesSearch =
      !searchQuery ||
      asset.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      asset.description?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      asset.tags?.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesCategory && matchesSearch
  })

  const groupedAssets = filteredAssets.reduce(
    (acc, asset) => {
      if (!acc[asset.category]) acc[asset.category] = []
      acc[asset.category].push(asset)
      return acc
    },
    {} as Record<string, BrandAsset[]>,
  )

  if (loading) {
    return (
      <div className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="animate-pulse space-y-8">
            <div className="h-10 bg-white/10 rounded-lg w-64 mx-auto" />
            <div className="h-6 bg-white/10 rounded-lg w-96 mx-auto" />
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {[...Array(8)].map((_, i) => (
                <div key={i} className="h-64 bg-white/5 rounded-2xl" />
              ))}
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="py-20 px-4 min-h-screen bg-gradient-to-b from-zinc-900 via-zinc-900 to-black">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6 tracking-tight">
            {heading}
          </h1>
          <p className="text-xl text-zinc-400 max-w-2xl mx-auto leading-relaxed">{description}</p>
        </div>

        {/* Search & Filter */}
        <div className="flex flex-col lg:flex-row gap-4 mb-12">
          <div className="flex-1 relative">
            <input
              type="text"
              placeholder="Search assets by name, description, or tag..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-6 py-4 rounded-2xl bg-white/5 border border-white/10 text-white placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-pink-500/50 focus:border-pink-500/50 transition-all"
            />
            <span className="absolute right-5 top-1/2 -translate-y-1/2 text-zinc-500">
              [Search]
            </span>
          </div>

          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setSelectedCategory('all')}
              className={`px-5 py-3 rounded-xl text-sm font-medium transition-all ${
                selectedCategory === 'all'
                  ? 'bg-pink-500 text-white shadow-lg shadow-pink-500/25'
                  : 'bg-white/5 text-zinc-300 hover:bg-white/10 border border-white/10'
              }`}
            >
              All Assets
            </button>
            {availableCategories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-5 py-3 rounded-xl text-sm font-medium transition-all ${
                  selectedCategory === cat
                    ? 'bg-pink-500 text-white shadow-lg shadow-pink-500/25'
                    : 'bg-white/5 text-zinc-300 hover:bg-white/10 border border-white/10'
                }`}
              >
                [{categoryConfig[cat]?.icon}] {categoryConfig[cat]?.label}
              </button>
            ))}
          </div>
        </div>

        {/* Results count */}
        <p className="text-sm text-zinc-500 mb-8">
          {filteredAssets.length} asset{filteredAssets.length !== 1 ? 's' : ''} available
        </p>

        {/* Assets Grid by Category */}
        {Object.entries(groupedAssets).map(([category, categoryAssets]) => (
          <div key={category} className="mb-16">
            <h2 className="text-2xl font-semibold text-white mb-8 flex items-center gap-3">
              <span className="text-xl text-pink-500">[{categoryConfig[category]?.icon}]</span>
              {categoryConfig[category]?.label}
              <span className="text-sm font-normal text-zinc-500 ml-2">
                ({categoryAssets.length})
              </span>
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {categoryAssets.map((asset) => (
                <div
                  key={asset.id}
                  className="group bg-white/5 backdrop-blur-sm rounded-2xl overflow-hidden border border-white/10 hover:border-pink-500/50 transition-all duration-300 hover:shadow-xl hover:shadow-pink-500/10"
                >
                  {/* Preview */}
                  <div className="aspect-[4/3] bg-zinc-800/50 relative flex items-center justify-center overflow-hidden">
                    {asset.sizes?.preview?.url || asset.sizes?.thumbnail?.url ? (
                      <img
                        src={asset.sizes.preview?.url || asset.sizes.thumbnail?.url}
                        alt={asset.name}
                        className="w-full h-full object-contain p-4 group-hover:scale-105 transition-transform duration-300"
                      />
                    ) : (
                      <span className="text-4xl text-zinc-600">
                        [{categoryConfig[asset.category]?.icon || '?'}]
                      </span>
                    )}

                    {/* File type badge */}
                    <span className="absolute top-3 right-3 bg-black/60 backdrop-blur-sm text-white text-xs px-3 py-1.5 rounded-full font-medium">
                      {getFileExtension(asset.filename)}
                    </span>

                    {/* Usage badge */}
                    <span
                      className={`absolute top-3 left-3 text-xs px-3 py-1.5 rounded-full font-medium backdrop-blur-sm ${
                        asset.usageRights === 'public'
                          ? 'bg-green-500/20 text-green-300'
                          : asset.usageRights === 'partners'
                            ? 'bg-blue-500/20 text-blue-300'
                            : asset.usageRights === 'internal'
                              ? 'bg-yellow-500/20 text-yellow-300'
                              : 'bg-red-500/20 text-red-300'
                      }`}
                    >
                      {asset.usageRights === 'public' && 'Public'}
                      {asset.usageRights === 'partners' && 'Partners'}
                      {asset.usageRights === 'internal' && 'Internal'}
                      {asset.usageRights === 'restricted' && 'Restricted'}
                    </span>
                  </div>

                  {/* Info */}
                  <div className="p-5">
                    <h3
                      className="font-semibold text-white mb-2 truncate group-hover:text-pink-400 transition-colors"
                      title={asset.name}
                    >
                      {asset.name}
                    </h3>

                    {asset.description && (
                      <p className="text-sm text-zinc-400 mb-4 line-clamp-2">{asset.description}</p>
                    )}

                    {/* Meta */}
                    <div className="flex items-center gap-3 text-xs text-zinc-500 mb-5">
                      {asset.filesize && <span>{formatFileSize(asset.filesize)}</span>}
                      {asset.width && asset.height && (
                        <span>
                          | {asset.width}x{asset.height}
                        </span>
                      )}
                      {asset.version && <span>| {asset.version}</span>}
                    </div>

                    {/* Actions */}
                    <div className="flex gap-2">
                      <a
                        href={asset.url}
                        download
                        className="flex-1 bg-pink-500 hover:bg-pink-400 text-white text-sm font-semibold py-3 px-4 rounded-xl text-center transition-colors shadow-lg shadow-pink-500/20"
                      >
                        Download
                      </a>
                      <button
                        onClick={() => asset.url && copyToClipboard(asset.url, asset.id)}
                        className="bg-white/10 hover:bg-white/20 text-white text-sm font-medium py-3 px-4 rounded-xl transition-colors"
                        title="Copy hotlink URL"
                      >
                        {copiedId === asset.id ? 'OK' : 'URL'}
                      </button>
                    </div>

                    {/* Source link */}
                    {asset.sourceFile && (
                      <a
                        href={asset.sourceFile}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block mt-3 text-xs text-pink-400 hover:text-pink-300 transition-colors"
                      >
                        Open source file -&gt;
                      </a>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}

        {/* Empty state */}
        {filteredAssets.length === 0 && (
          <div className="text-center py-20">
            <div className="text-6xl mb-6 text-zinc-600">[?]</div>
            <h3 className="text-2xl font-semibold text-white mb-3">No assets found</h3>
            <p className="text-zinc-400">Try adjusting your search or filters</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default BrandPortalBlock
