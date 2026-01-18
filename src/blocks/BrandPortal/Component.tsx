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

interface CategorySummary {
  category: string
  count: number
  heroImage: string | null
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

  // Category-level state (for grid view)
  const [categorySummaries, setCategorySummaries] = useState<CategorySummary[]>([])
  const [loadingCategories, setLoadingCategories] = useState(true)

  // Asset-level state (for category detail view)
  const [categoryAssets, setCategoryAssets] = useState<BrandAsset[]>([])
  const [loadingAssets, setLoadingAssets] = useState(false)

  const [selectedCategory, setSelectedCategory] = useState<string | null>(searchParams.get('category'))
  const [selectedSubcategory, setSelectedSubcategory] = useState<string | null>(searchParams.get('sub'))
  const [searchQuery, setSearchQuery] = useState('')
  const [copiedId, setCopiedId] = useState<string | null>(null)
  const [previewAsset, setPreviewAsset] = useState<BrandAsset | null>(null)
  const [downloading, setDownloading] = useState(false)
  const hasFetchedCategories = useRef(false)

  // Known categories from your database
  const knownCategories = ['developer', 'guidelines', 'logos', 'one-pagers', 'photos', 'presentations', 'templates']

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

  // ==========================================
  // FETCH CATEGORY SUMMARIES (for grid view)
  // ==========================================
  useEffect(() => {
    if (hasFetchedCategories.current) return
    hasFetchedCategories.current = true

    const fetchCategorySummaries = async () => {
      try {
        setLoadingCategories(true)
        
        // Fetch one asset per category (for hero images) + get total count
        // Using Promise.all to fetch all categories in parallel
        const categoriesToFetch = showCategories.length > 0 ? showCategories : knownCategories
        
        const summaryPromises = categoriesToFetch.map(async (category) => {
          // Fetch 1 asset with image for hero, and get totalDocs for count
          const params = new URLSearchParams()
          params.append('where[category][equals]', category)
          params.append('limit', '1')
          
          const response = await fetch(`/api/brand-assets?${params.toString()}`)
          if (!response.ok) return null
          
          const data = await response.json()
          
          // Find hero image from the sample asset
          const sampleAsset = data.docs?.[0]
          let heroImage: string | null = null
          if (sampleAsset) {
            heroImage = sampleAsset.sizes?.thumbnail?.url || sampleAsset.sizes?.preview?.url || null
          }
          
          return {
            category,
            count: data.totalDocs || 0,
            heroImage,
          } as CategorySummary
        })

        const results = await Promise.all(summaryPromises)
        const validSummaries = results.filter((s): s is CategorySummary => s !== null && s.count > 0)
        
        // Sort by count descending
        validSummaries.sort((a, b) => b.count - a.count)
        
        setCategorySummaries(validSummaries)
      } catch (err) {
        console.error('Failed to load category summaries:', err)
      } finally {
        setLoadingCategories(false)
      }
    }

    fetchCategorySummaries()
  }, [])

  // ==========================================
  // FETCH ASSETS FOR SELECTED CATEGORY
  // ==========================================
  useEffect(() => {
    if (!selectedCategory) {
      setCategoryAssets([])
      return
    }

    const fetchCategoryAssets = async () => {
      try {
        setLoadingAssets(true)
        
        const params = new URLSearchParams()
        params.append('where[category][equals]', selectedCategory)
        params.append('limit', '100') // Higher limit OK for single category
        
        const response = await fetch(`/api/brand-assets?${params.toString()}`)
        if (!response.ok) throw new Error('Failed to fetch assets')

        const data = await response.json()
        setCategoryAssets(data.docs || [])
      } catch (err) {
        console.error('Failed to load category assets:', err)
      } finally {
        setLoadingAssets(false)
      }
    }

    fetchCategoryAssets()
  }, [selectedCategory])

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

  // Get unique subcategories for selected category
  const subcategories = [...new Set(categoryAssets.map((a) => a.subcategory).filter(Boolean))] as string[]

  // Filter assets for selected subcategory and search
  const filteredAssets = categoryAssets.filter((asset) => {
    const matchesSubcategory = !selectedSubcategory || asset.subcategory === selectedSubcategory
    const matchesSearch =
      !searchQuery ||
      asset.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      asset.description?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      asset.tags?.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesSubcategory && matchesSearch
  })

  // Calculate totals for header
  const totalAssets = categorySummaries.reduce((sum, s) => sum + s.count, 0)
  const totalCategories = categorySummaries.length

  // ==========================================
  // LOADING STATE
  // ==========================================
  if (loadingCategories) {
    return (
      <div className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="animate-pulse space-y-8">
            <div className="h-10 bg-white/10 rounded-lg w-64 mx-auto" />
            <div className="h-6 bg-white/10 rounded-lg w-96 mx-auto" />
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {[...Array(6)].map((_, i) => (
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
              {totalAssets} assets across {totalCategories} categories
            </p>
          </div>

          {/* Category Grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {categorySummaries.map(({ category, count, heroImage }) => {
              const config = categoryConfig[category] || { icon: '?', label: category }

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
                    {heroImage ? (
                      <img
                        src={heroImage}
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
  // CATEGORY DETAIL VIEW
  // ==========================================
  const currentCategoryConfig = categoryConfig[selectedCategory] || { icon: '?', label: selectedCategory }

  return (
    <div className="py-20 px-4 min-h-screen bg-gradient-to-b from-zinc-900 via-zinc-900 to-black">
      <div className="max-w-7xl mx-auto">
        {/* Back Button */}
        <button
          onClick={() => {
            setSelectedCategory(null)
            setSelectedSubcategory(null)
            setSearchQuery('')
            updateURL(null, null)
          }}
          className="flex items-center gap-2 text-zinc-400 hover:text-white mb-8 transition-colors"
        >
          <span>←</span>
          <span>Back to Categories</span>
        </button>

        {/* Category Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <span className="text-3xl text-pink-500">{currentCategoryConfig.icon}</span>
              <h2 className="text-3xl font-bold text-white">{currentCategoryConfig.label}</h2>
            </div>
            <p className="text-zinc-400">{filteredAssets.length} assets</p>
          </div>

          {/* Search in category */}
          <div className="flex-shrink-0 w-full md:w-80">
            <input
              type="text"
              placeholder="Search in category..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-zinc-500 focus:outline-none focus:border-pink-500/50 transition-colors"
            />
          </div>
        </div>

        {/* Subcategory Filter */}
        {subcategories.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-8">
            <button
              onClick={() => {
                setSelectedSubcategory(null)
                updateURL(selectedCategory, null)
              }}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                !selectedSubcategory
                  ? 'bg-pink-500 text-white'
                  : 'bg-white/5 text-zinc-400 hover:bg-white/10 hover:text-white'
              }`}
            >
              All
            </button>
            {subcategories.map((sub) => (
              <button
                key={sub}
                onClick={() => {
                  setSelectedSubcategory(sub)
                  updateURL(selectedCategory, sub)
                }}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                  selectedSubcategory === sub
                    ? 'bg-pink-500 text-white'
                    : 'bg-white/5 text-zinc-400 hover:bg-white/10 hover:text-white'
                }`}
              >
                {sub}
              </button>
            ))}
          </div>
        )}

        {/* Loading state for assets */}
        {loadingAssets ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="h-48 bg-white/5 rounded-2xl animate-pulse" />
            ))}
          </div>
        ) : (
          <>
            {/* Assets Table */}
            <div className="bg-white/5 rounded-2xl border border-white/10 overflow-hidden">
              {/* Table Header */}
              <div className="grid grid-cols-12 gap-4 px-6 py-4 border-b border-white/10 text-sm font-medium text-zinc-400">
                <div className="col-span-1">Preview</div>
                <div className="col-span-3">Name</div>
                <div className="col-span-2">Subcategory</div>
                <div className="col-span-1">Type</div>
                <div className="col-span-1">Size</div>
                <div className="col-span-1">Usage</div>
                <div className="col-span-3">Actions</div>
              </div>

              {/* Table Body */}
              {filteredAssets.map((asset) => {
                const ext = getFileExtension(asset.filename)
                const isImage = isImageFile(asset.mimeType, asset.filename)
                const fileIcon = getFileIcon(asset.filename)

                return (
                  <div
                    key={asset.id}
                    className="grid grid-cols-12 gap-4 px-6 py-4 border-b border-white/5 items-center hover:bg-white/5 transition-colors"
                  >
                    {/* Preview */}
                    <div className="col-span-1">
                      {isImage && (asset.sizes?.thumbnail?.url || asset.url) ? (
                        <img
                          src={asset.sizes?.thumbnail?.url || asset.url}
                          alt={asset.name}
                          className="w-12 h-12 object-cover rounded-lg cursor-pointer hover:ring-2 hover:ring-pink-500/50 transition-all"
                          onClick={() => setPreviewAsset(asset)}
                        />
                      ) : (
                        <div
                          className={`w-12 h-12 rounded-lg bg-zinc-800 flex items-center justify-center cursor-pointer hover:ring-2 hover:ring-pink-500/50 transition-all ${fileIcon.color}`}
                          onClick={() => setPreviewAsset(asset)}
                        >
                          <span className="text-xl">{fileIcon.icon}</span>
                        </div>
                      )}
                    </div>

                    {/* Name */}
                    <div className="col-span-3">
                      <p className="text-white font-medium truncate" title={asset.name}>
                        {asset.name}
                      </p>
                    </div>

                    {/* Subcategory */}
                    <div className="col-span-2">
                      <p className="text-zinc-400 text-sm">{asset.subcategory || '-'}</p>
                    </div>

                    {/* Type */}
                    <div className="col-span-1">
                      <span className={`flex items-center gap-1 text-sm ${fileIcon.color}`}>
                        <span>{fileIcon.icon}</span>
                        <span>{ext.toUpperCase()}</span>
                      </span>
                    </div>

                    {/* Size */}
                    <div className="col-span-1">
                      <p className="text-zinc-400 text-sm">{formatFileSize(asset.filesize)}</p>
                    </div>

                    {/* Usage */}
                    <div className="col-span-1">
                      <span
                        className={`px-2 py-1 rounded text-xs font-medium ${
                          asset.usageRights === 'public'
                            ? 'bg-green-500/20 text-green-300'
                            : asset.usageRights === 'partners'
                              ? 'bg-blue-500/20 text-blue-300'
                              : asset.usageRights === 'internal'
                                ? 'bg-yellow-500/20 text-yellow-300'
                                : 'bg-red-500/20 text-red-300'
                        }`}
                      >
                        {asset.usageRights?.slice(0, 4)}
                      </span>
                    </div>

                    {/* Actions */}
                    <div className="col-span-3 flex items-center gap-2">
                      <button
                        onClick={() => setPreviewAsset(asset)}
                        className="p-2 rounded-lg bg-white/10 hover:bg-white/20 text-white transition-colors"
                        title="Preview"
                      >
                        👁
                      </button>
                      <button
                        onClick={() => handleDownload(asset)}
                        className="p-2 rounded-lg bg-pink-500/80 hover:bg-pink-500 text-white transition-colors"
                        title="Download"
                      >
                        ↓
                      </button>
                      <button
                        onClick={() => asset.url && copyToClipboard(asset.url, asset.id)}
                        className={`p-2 rounded-lg transition-all ${
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
          </>
        )}

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
