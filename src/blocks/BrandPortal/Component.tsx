'use client'

import React, { useState, useEffect, useRef } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'

// Category configuration with icons and default images
const categoryConfig: Record<string, { icon: string; label: string }> = {
  logos: { icon: '◇', label: 'Logos & Marks' },
  colors: { icon: '●', label: 'Colors & Palettes' },
  fonts: { icon: 'A', label: 'Typography & Fonts' },
  templates: { icon: '▤', label: 'Templates & Documents' },
  photos: { icon: '▣', label: 'Photography & Images' },
  video: { icon: '▶', label: 'Video & Motion' },
  audio: { icon: '♪', label: 'Audio & Sound' },
  presentations: { icon: '▧', label: 'Presentations & Decks' },
  developer: { icon: '⟨/⟩', label: 'Developer & Technical' },
  social: { icon: '@', label: 'Social Media' },
  packages: { icon: '⊞', label: 'Asset Packages' },
  guidelines: { icon: '☰', label: 'Guidelines & Docs' },
}

// File type icons for non-image assets
const fileTypeIcons: Record<string, { icon: string; color: string }> = {
  pdf: { icon: '📄', color: 'text-red-400' },
  doc: { icon: '📝', color: 'text-blue-400' },
  docx: { icon: '📝', color: 'text-blue-400' },
  ppt: { icon: '📊', color: 'text-orange-400' },
  pptx: { icon: '📊', color: 'text-orange-400' },
  xls: { icon: '📈', color: 'text-green-400' },
  xlsx: { icon: '📈', color: 'text-green-400' },
  mp4: { icon: '🎬', color: 'text-purple-400' },
  webm: { icon: '🎬', color: 'text-purple-400' },
  mov: { icon: '🎬', color: 'text-purple-400' },
  mp3: { icon: '🎵', color: 'text-pink-400' },
  wav: { icon: '🎵', color: 'text-pink-400' },
  zip: { icon: '📦', color: 'text-yellow-400' },
  svg: { icon: '◈', color: 'text-cyan-400' },
  psd: { icon: '🎨', color: 'text-blue-500' },
  ai: { icon: '🎨', color: 'text-orange-500' },
  fig: { icon: '🎨', color: 'text-purple-500' },
  ttf: { icon: 'Aa', color: 'text-zinc-300' },
  otf: { icon: 'Aa', color: 'text-zinc-300' },
  woff: { icon: 'Aa', color: 'text-zinc-300' },
  woff2: { icon: 'Aa', color: 'text-zinc-300' },
}

interface BrandAsset {
  id: string
  name: string
  description?: string
  category: string
  subcategory?: string
  isCategoryHero?: boolean
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
  const searchParams = useSearchParams()
  const router = useRouter()

  const [assets, setAssets] = useState<BrandAsset[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedCategory, setSelectedCategory] = useState<string | null>(searchParams.get('category'))
  const [selectedSubcategory, setSelectedSubcategory] = useState<string | null>(searchParams.get('sub'))
  const [searchQuery, setSearchQuery] = useState('')
  const [copiedId, setCopiedId] = useState<string | null>(null)
  const [previewAsset, setPreviewAsset] = useState<BrandAsset | null>(null)
  const [downloading, setDownloading] = useState(false)
  const hasFetched = useRef(false)

  // Handle escape key to close lightbox
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setPreviewAsset(null)
    }
    if (previewAsset) {
      document.addEventListener('keydown', handleEscape)
      document.body.style.overflow = 'hidden'
    }
    return () => {
      document.removeEventListener('keydown', handleEscape)
      document.body.style.overflow = ''
    }
  }, [previewAsset])

  // Download handler using server endpoint
  const handleDownload = async (asset: BrandAsset) => {
    setDownloading(true)
    try {
      const response = await fetch(`/api/download/${asset.id}`)
      if (!response.ok) throw new Error('Download failed')

      const blob = await response.blob()
      const url = window.URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = asset.filename || asset.name || 'download'
      document.body.appendChild(a)
      a.click()
      window.URL.revokeObjectURL(url)
      document.body.removeChild(a)
    } catch (err) {
      console.error('Download failed:', err)
    } finally {
      setDownloading(false)
    }
  }

  // Update URL when category/subcategory changes
  const updateURL = (category: string | null, subcategory: string | null) => {
    const params = new URLSearchParams()
    if (category) params.set('category', category)
    if (subcategory) params.set('sub', subcategory)
    const queryString = params.toString()
    router.push(queryString ? `/brand?${queryString}` : '/brand', { scroll: false })
  }

  useEffect(() => {
    if (hasFetched.current) return
    hasFetched.current = true

    const fetchAssets = async () => {
      try {
        setLoading(true)
        const params = new URLSearchParams()
        params.append('limit', '50')
        // Note: usageRights filter removed - was causing 500 errors
        // All assets are public-read per collection config anyway

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
  }, [])

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
    if (!bytes) return '-'
    if (bytes < 1024) return `${bytes} B`
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(0)} KB`
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`
  }

  const getFileExtension = (filename?: string) => {
    if (!filename) return ''
    return filename.split('.').pop()?.toLowerCase() || ''
  }

  const isImageFile = (mimeType?: string, filename?: string) => {
    if (mimeType?.startsWith('image/') && !mimeType?.includes('svg')) return true
    const ext = getFileExtension(filename)
    return ['jpg', 'jpeg', 'png', 'gif', 'webp'].includes(ext)
  }

  const getFileIcon = (filename?: string) => {
    const ext = getFileExtension(filename)
    return fileTypeIcons[ext] || { icon: '📁', color: 'text-zinc-400' }
  }

  // Group assets by category
  const categoryCounts = assets.reduce(
    (acc, asset) => {
      acc[asset.category] = (acc[asset.category] || 0) + 1
      return acc
    },
    {} as Record<string, number>,
  )

  // Get hero image for each category (prefer isCategoryHero, fallback to first image)
  const categoryImages = assets.reduce(
    (acc, asset) => {
      const hasImage = asset.sizes?.thumbnail?.url || asset.sizes?.preview?.url
      if (!hasImage) return acc

      // If this asset is marked as hero, use it (overwrite any existing)
      if (asset.isCategoryHero) {
        acc[asset.category] = asset.sizes?.thumbnail?.url || asset.sizes?.preview?.url || null
      }
      // Otherwise, only set if we don't have one yet
      else if (!acc[asset.category]) {
        acc[asset.category] = asset.sizes?.thumbnail?.url || asset.sizes?.preview?.url || null
      }

      return acc
    },
    {} as Record<string, string | null>,
  )

  // Get assets for selected category
  const categoryAssets = selectedCategory
    ? assets.filter((asset) => asset.category === selectedCategory)
    : []

  // Get unique subcategories for selected category
  const subcategories = [...new Set(categoryAssets.map((a) => a.subcategory).filter(Boolean))] as string[]

  // Filter assets for selected category and subcategory
  const filteredAssets = categoryAssets.filter((asset) => {
    const matchesSubcategory = !selectedSubcategory || asset.subcategory === selectedSubcategory
    const matchesSearch =
      !searchQuery ||
      asset.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      asset.description?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      asset.tags?.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesSubcategory && matchesSearch
  })

  // Sort categories by count (descending)
  const sortedCategories = Object.entries(categoryCounts).sort((a, b) => b[1] - a[1])

  if (loading) {
    return (
      <div className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="animate-pulse space-y-8">
            <div className="h-10 bg-white/10 rounded-lg w-64 mx-auto" />
            <div className="h-6 bg-white/10 rounded-lg w-96 mx-auto" />
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {[...Array(8)].map((_, i) => (
                <div key={i} className="h-48 bg-white/5 rounded-2xl" />
              ))}
            </div>
          </div>
        </div>
      </div>
    )
  }

  // ==========================================
  // CATEGORY GRID VIEW (default)
  // ==========================================
  if (!selectedCategory) {
    return (
      <div className="py-20 px-4 min-h-screen bg-gradient-to-b from-zinc-900 via-zinc-900 to-black">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="text-center mb-16">
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-6 tracking-tight">
              {heading}
            </h1>
            <p className="text-xl text-zinc-400 max-w-2xl mx-auto leading-relaxed">{description}</p>
            <p className="text-sm text-zinc-500 mt-4">
              {assets.length} assets across {sortedCategories.length} categories
            </p>
          </div>

          {/* Category Grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {sortedCategories.map(([category, count]) => {
              const config = categoryConfig[category] || { icon: '?', label: category }
              const imageUrl = categoryImages[category]

              return (
                <button
                  key={category}
                  onClick={() => {
                    setSelectedCategory(category)
                    setSelectedSubcategory(null)
                    setSearchQuery('')
                    updateURL(category, null)
                  }}
                  className="group bg-white/5 backdrop-blur-sm rounded-2xl overflow-hidden border border-white/10 hover:border-pink-500/50 transition-all duration-300 hover:shadow-xl hover:shadow-pink-500/10 text-left"
                >
                  {/* Category Preview Image */}
                  <div className="aspect-[4/3] bg-zinc-800/50 relative flex items-center justify-center overflow-hidden">
                    {imageUrl ? (
                      <img
                        src={imageUrl}
                        alt={config.label}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300 opacity-60 group-hover:opacity-80"
                      />
                    ) : (
                      <span className="text-6xl text-zinc-600 group-hover:text-zinc-500 transition-colors">
                        {config.icon}
                      </span>
                    )}
                    {/* Overlay gradient */}
                    <div className="absolute inset-0 bg-gradient-to-t from-zinc-900/90 via-zinc-900/30 to-transparent" />

                    {/* Count badge */}
                    <span className="absolute top-3 right-3 bg-pink-500/90 text-white text-sm px-3 py-1 rounded-full font-semibold">
                      {count}
                    </span>
                  </div>

                  {/* Category Info */}
                  <div className="p-5">
                    <div className="flex items-center gap-3">
                      <span className="text-2xl text-pink-500">{config.icon}</span>
                      <div>
                        <h3 className="font-semibold text-white group-hover:text-pink-400 transition-colors">
                          {config.label}
                        </h3>
                        <p className="text-sm text-zinc-500">
                          {count} asset{count !== 1 ? 's' : ''}
                        </p>
                      </div>
                    </div>
                  </div>
                </button>
              )
            })}
          </div>
        </div>
      </div>
    )
  }

  // ==========================================
  // TABLE VIEW (after selecting category)
  // ==========================================
  const categoryLabel = categoryConfig[selectedCategory]?.label || selectedCategory

  return (
    <div className="py-12 px-4 min-h-screen bg-gradient-to-b from-zinc-900 via-zinc-900 to-black">
      <div className="max-w-7xl mx-auto">
        {/* Back Button & Header */}
        <div className="mb-8">
          <button
            onClick={() => {
              setSelectedCategory(null)
              setSelectedSubcategory(null)
              setSearchQuery('')
              updateURL(null, null)
            }}
            className="flex items-center gap-2 text-zinc-400 hover:text-white transition-colors mb-6 group"
          >
            <span className="text-xl group-hover:-translate-x-1 transition-transform">←</span>
            <span>Back to Categories</span>
          </button>

          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-white flex items-center gap-3">
                <span className="text-pink-500">{categoryConfig[selectedCategory]?.icon}</span>
                {categoryLabel}
              </h1>
              <p className="text-zinc-400 mt-1">
                {filteredAssets.length} asset{filteredAssets.length !== 1 ? 's' : ''}
                {selectedSubcategory && ` in "${selectedSubcategory}"`}
              </p>
            </div>

            {/* Search */}
            <div className="relative w-full md:w-80">
              <input
                type="text"
                placeholder="Search in category..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-pink-500/50 focus:border-pink-500/50 transition-all text-sm"
              />
            </div>
          </div>
        </div>

        {/* Subcategory Filter */}
        {subcategories.length > 0 && (
          <div className="mb-6 flex flex-wrap gap-2">
            <button
              onClick={() => {
                setSelectedSubcategory(null)
                updateURL(selectedCategory, null)
              }}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                selectedSubcategory === null
                  ? 'bg-pink-500 text-white shadow-lg shadow-pink-500/25'
                  : 'bg-white/5 text-zinc-300 hover:bg-white/10 border border-white/10'
              }`}
            >
              All ({categoryAssets.length})
            </button>
            {subcategories.map((subcat) => {
              const count = categoryAssets.filter((a) => a.subcategory === subcat).length
              return (
                <button
                  key={subcat}
                  onClick={() => {
                    setSelectedSubcategory(subcat)
                    updateURL(selectedCategory, subcat)
                  }}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                    selectedSubcategory === subcat
                      ? 'bg-pink-500 text-white shadow-lg shadow-pink-500/25'
                      : 'bg-white/5 text-zinc-300 hover:bg-white/10 border border-white/10'
                  }`}
                >
                  {subcat} ({count})
                </button>
              )
            })}
            {/* Show uncategorized count if there are assets without subcategory */}
            {categoryAssets.some((a) => !a.subcategory) && (
              <button
                onClick={() => {
                  setSelectedSubcategory('__none__')
                  updateURL(selectedCategory, '__none__')
                }}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                  selectedSubcategory === '__none__'
                    ? 'bg-pink-500 text-white shadow-lg shadow-pink-500/25'
                    : 'bg-white/5 text-zinc-300 hover:bg-white/10 border border-white/10'
                }`}
              >
                Uncategorized ({categoryAssets.filter((a) => !a.subcategory).length})
              </button>
            )}
          </div>
        )}

        {/* Assets Table */}
        <div className="bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 overflow-hidden">
          {/* Table Header */}
          <div className="hidden md:grid grid-cols-12 gap-4 px-6 py-4 bg-white/5 border-b border-white/10 text-sm font-medium text-zinc-400">
            <div className="col-span-1">Preview</div>
            <div className="col-span-3">Name</div>
            <div className="col-span-2">Subcategory</div>
            <div className="col-span-2">Type</div>
            <div className="col-span-1">Size</div>
            <div className="col-span-1">Usage</div>
            <div className="col-span-2 text-right">Actions</div>
          </div>

          {/* Table Body */}
          <div className="divide-y divide-white/5">
            {filteredAssets
              .filter((asset) => {
                // Handle special __none__ filter for uncategorized
                if (selectedSubcategory === '__none__') return !asset.subcategory
                return true
              })
              .map((asset) => {
                const ext = getFileExtension(asset.filename)
                const isImage = isImageFile(asset.mimeType, asset.filename)
                const fileIcon = getFileIcon(asset.filename)

                return (
                  <div
                    key={asset.id}
                    className="grid grid-cols-1 md:grid-cols-12 gap-4 px-6 py-4 hover:bg-white/5 transition-colors items-center"
                  >
                    {/* Preview/Thumbnail - Clickable */}
                    <div className="col-span-1">
                      <button
                        onClick={() => setPreviewAsset(asset)}
                        className="w-12 h-12 rounded-lg bg-zinc-800 flex items-center justify-center overflow-hidden hover:ring-2 hover:ring-pink-500 transition-all cursor-pointer"
                        title="Click to preview"
                      >
                        {isImage && (asset.sizes?.thumbnail?.url || asset.url) ? (
                          <img
                            src={asset.sizes?.thumbnail?.url || asset.url}
                            alt={asset.name}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <span className={`text-2xl ${fileIcon.color}`}>{fileIcon.icon}</span>
                        )}
                      </button>
                    </div>

                    {/* Name & Description */}
                    <div className="col-span-3">
                      <h3 className="font-medium text-white truncate" title={asset.name}>
                        {asset.name}
                      </h3>
                      {asset.description && (
                        <p className="text-sm text-zinc-500 truncate" title={asset.description}>
                          {asset.description}
                        </p>
                      )}
                    </div>

                    {/* Subcategory */}
                    <div className="col-span-2">
                      {asset.subcategory ? (
                        <span className="inline-block text-xs px-2.5 py-1 rounded-lg bg-zinc-800 text-zinc-300">
                          {asset.subcategory}
                        </span>
                      ) : (
                        <span className="text-zinc-600 text-sm">—</span>
                      )}
                    </div>

                    {/* File Type */}
                    <div className="col-span-2">
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-zinc-800 text-xs font-medium text-zinc-300">
                        <span className={fileIcon.color}>{fileIcon.icon}</span>
                        {ext.toUpperCase() || 'FILE'}
                      </span>
                    </div>

                    {/* Size */}
                    <div className="col-span-1 text-sm text-zinc-400">
                      {formatFileSize(asset.filesize)}
                    </div>

                    {/* Usage Rights */}
                    <div className="col-span-1">
                      <span
                        className={`inline-block text-xs px-2 py-1 rounded-lg font-medium ${
                          asset.usageRights === 'public'
                            ? 'bg-green-500/20 text-green-300'
                            : asset.usageRights === 'partners'
                              ? 'bg-blue-500/20 text-blue-300'
                              : asset.usageRights === 'internal'
                                ? 'bg-yellow-500/20 text-yellow-300'
                                : 'bg-red-500/20 text-red-300'
                        }`}
                        title={asset.usageRights}
                      >
                        {asset.usageRights === 'public' && 'Pub'}
                        {asset.usageRights === 'partners' && 'Part'}
                        {asset.usageRights === 'internal' && 'Int'}
                        {asset.usageRights === 'restricted' && 'Res'}
                      </span>
                    </div>

                    {/* Actions */}
                    <div className="col-span-2 flex items-center justify-end gap-2">
                      <button
                        onClick={() => setPreviewAsset(asset)}
                        className="py-2 px-3 rounded-lg text-sm font-medium bg-white/10 hover:bg-white/20 text-white transition-colors"
                        title="Preview"
                      >
                        👁
                      </button>
                      <button
                        onClick={() => handleDownload(asset)}
                        disabled={downloading}
                        className="flex items-center gap-1.5 bg-pink-500 hover:bg-pink-400 disabled:opacity-50 text-white text-sm font-medium py-2 px-4 rounded-lg transition-colors"
                      >
                        <span>↓</span>
                        <span className="hidden lg:inline">Download</span>
                      </button>
                      <button
                        onClick={() => asset.url && copyToClipboard(asset.url, asset.id)}
                        className={`py-2 px-3 rounded-lg text-sm font-medium transition-all ${
                          copiedId === asset.id
                            ? 'bg-green-500/20 text-green-300'
                            : 'bg-white/10 hover:bg-white/20 text-white'
                        }`}
                        title="Copy URL"
                      >
                        {copiedId === asset.id ? '✓' : '🔗'}
                      </button>
                    </div>
                  </div>
                )
              })}
          </div>

          {/* Empty State */}
          {filteredAssets.length === 0 && (
            <div className="text-center py-16">
              <div className="text-4xl mb-4 text-zinc-600">🔍</div>
              <h3 className="text-lg font-medium text-white mb-2">No assets found</h3>
              <p className="text-zinc-400 text-sm">Try adjusting your search or filter</p>
            </div>
          )}
        </div>

        {/* Lightbox Modal */}
        {previewAsset && (
          <LightboxModal
            asset={previewAsset}
            onClose={() => setPreviewAsset(null)}
            onDownload={() => handleDownload(previewAsset)}
            onCopyUrl={() => previewAsset.url && copyToClipboard(previewAsset.url, previewAsset.id)}
            downloading={downloading}
            copied={copiedId === previewAsset.id}
            formatFileSize={formatFileSize}
            getFileExtension={getFileExtension}
            isImageFile={isImageFile}
            getFileIcon={getFileIcon}
          />
        )}
      </div>
    </div>
  )
}

// Lightbox Modal Component
interface LightboxModalProps {
  asset: BrandAsset
  onClose: () => void
  onDownload: () => void
  onCopyUrl: () => void
  downloading: boolean
  copied: boolean
  formatFileSize: (bytes?: number) => string
  getFileExtension: (filename?: string) => string
  isImageFile: (mimeType?: string, filename?: string) => boolean
  getFileIcon: (filename?: string) => { icon: string; color: string }
}

const LightboxModal: React.FC<LightboxModalProps> = ({
  asset,
  onClose,
  onDownload,
  onCopyUrl,
  downloading,
  copied,
  formatFileSize,
  getFileExtension,
  isImageFile,
  getFileIcon,
}) => {
  const ext = getFileExtension(asset.filename)
  const isImage = isImageFile(asset.mimeType, asset.filename)
  const fileIcon = getFileIcon(asset.filename)

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="relative bg-zinc-900 rounded-2xl border border-white/10 max-w-4xl w-full max-h-[90vh] overflow-hidden shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full bg-black/50 hover:bg-black/70 text-white flex items-center justify-center transition-colors"
          title="Close (Esc)"
        >
          <span className="text-xl">×</span>
        </button>

        <div className="flex flex-col md:flex-row">
          {/* Preview Area */}
          <div className="flex-1 bg-zinc-950 flex items-center justify-center p-8 min-h-[300px] md:min-h-[500px]">
            {isImage && asset.url ? (
              <img
                src={asset.url}
                alt={asset.name}
                className="max-w-full max-h-[70vh] object-contain rounded-lg"
              />
            ) : (
              <div className="text-center">
                <span className={`text-8xl ${fileIcon.color}`}>{fileIcon.icon}</span>
                <p className="mt-4 text-zinc-400 text-lg">{ext.toUpperCase()} File</p>
              </div>
            )}
          </div>

          {/* Details Sidebar */}
          <div className="w-full md:w-80 p-6 border-t md:border-t-0 md:border-l border-white/10 bg-zinc-900/50">
            <h2 className="text-xl font-semibold text-white mb-2">{asset.name}</h2>

            {asset.description && (
              <p className="text-zinc-400 text-sm mb-4">{asset.description}</p>
            )}

            {/* Metadata */}
            <div className="space-y-3 mb-6">
              <div className="flex justify-between text-sm">
                <span className="text-zinc-500">Type</span>
                <span className="text-zinc-300 flex items-center gap-1.5">
                  <span className={fileIcon.color}>{fileIcon.icon}</span>
                  {ext.toUpperCase() || 'FILE'}
                </span>
              </div>

              {asset.filesize && (
                <div className="flex justify-between text-sm">
                  <span className="text-zinc-500">Size</span>
                  <span className="text-zinc-300">{formatFileSize(asset.filesize)}</span>
                </div>
              )}

              {asset.width && asset.height && (
                <div className="flex justify-between text-sm">
                  <span className="text-zinc-500">Dimensions</span>
                  <span className="text-zinc-300">{asset.width} × {asset.height}</span>
                </div>
              )}

              {asset.subcategory && (
                <div className="flex justify-between text-sm">
                  <span className="text-zinc-500">Subcategory</span>
                  <span className="text-zinc-300">{asset.subcategory}</span>
                </div>
              )}

              <div className="flex justify-between text-sm">
                <span className="text-zinc-500">Usage</span>
                <span
                  className={`px-2 py-0.5 rounded text-xs font-medium ${
                    asset.usageRights === 'public'
                      ? 'bg-green-500/20 text-green-300'
                      : asset.usageRights === 'partners'
                        ? 'bg-blue-500/20 text-blue-300'
                        : asset.usageRights === 'internal'
                          ? 'bg-yellow-500/20 text-yellow-300'
                          : 'bg-red-500/20 text-red-300'
                  }`}
                >
                  {asset.usageRights}
                </span>
              </div>

              {asset.usageNotes && (
                <div className="pt-2 border-t border-white/5">
                  <span className="text-zinc-500 text-sm block mb-1">Usage Notes</span>
                  <p className="text-zinc-400 text-xs">{asset.usageNotes}</p>
                </div>
              )}
            </div>

            {/* Action Buttons */}
            <div className="space-y-2">
              <button
                onClick={onDownload}
                disabled={downloading}
                className="w-full flex items-center justify-center gap-2 bg-pink-500 hover:bg-pink-400 disabled:opacity-50 text-white font-medium py-3 px-4 rounded-xl transition-colors"
              >
                {downloading ? (
                  <>
                    <span className="animate-spin">↻</span>
                    <span>Downloading...</span>
                  </>
                ) : (
                  <>
                    <span>↓</span>
                    <span>Download</span>
                  </>
                )}
              </button>

              <button
                onClick={onCopyUrl}
                className={`w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl font-medium transition-all ${
                  copied
                    ? 'bg-green-500/20 text-green-300'
                    : 'bg-white/10 hover:bg-white/20 text-white'
                }`}
              >
                {copied ? (
                  <>
                    <span>✓</span>
                    <span>Copied!</span>
                  </>
                ) : (
                  <>
                    <span>🔗</span>
                    <span>Copy URL</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default BrandPortalBlock
