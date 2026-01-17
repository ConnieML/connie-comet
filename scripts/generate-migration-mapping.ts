import * as fs from 'fs'

interface CloudinaryAsset {
  public_id: string
  folder: string
  filename: string
  format: string
  resource_type: string
  bytes: number
  width?: number
  height?: number
  secure_url: string
}

interface MigrationMapping {
  original_name: string
  new_name: string
  category: string
  asset_type: string
  usage_rights: string
  format: string
  size_kb: number
  dimensions: string
  preview_url: string
}

// Category detection patterns
const categoryPatterns: { pattern: RegExp; category: string; assetType: string }[] = [
  // People - names
  { pattern: /berno|kaldes|schmitt|goldstein|clark|nguyen|morales|katz|chalmers|obrien|lin|huynh|cumming|willie|peter|cameron|leanne|dee|jason|mike|nadine|nhi|quan|marcelo|lois/i, category: 'photos', assetType: 'primary' },
  { pattern: /team|headshot|portrait|profile/i, category: 'photos', assetType: 'primary' },

  // Logos & Brand
  { pattern: /^logo|connie-logo|brand-?logo/i, category: 'logos', assetType: 'primary' },
  { pattern: /connie-inclusive|connie-bubbles|connie-team/i, category: 'logos', assetType: 'variant' },

  // Icons
  { pattern: /icon|arrow|check|alert|loading|chevron|caret/i, category: 'developer', assetType: 'primary' },
  { pattern: /facebook|twitter|linkedin|instagram|social/i, category: 'social', assetType: 'primary' },

  // Documents
  { pattern: /pdf|doc|spreadsheet|file|document/i, category: 'templates', assetType: 'primary' },

  // Screenshots & Diagrams
  { pattern: /screenshot|screen-?shot|capture/i, category: 'photos', assetType: 'secondary' },
  { pattern: /diagram|flow|chart|architecture/i, category: 'guidelines', assetType: 'primary' },

  // Backgrounds & Graphics
  { pattern: /background|bg-|hero|banner/i, category: 'photos', assetType: 'secondary' },
  { pattern: /cloud|pattern|texture/i, category: 'photos', assetType: 'variant' },

  // Audio/Video
  { pattern: /mp4|video|mp3|audio|sound/i, category: 'video', assetType: 'primary' },
]

function detectCategory(filename: string): { category: string; assetType: string } {
  for (const { pattern, category, assetType } of categoryPatterns) {
    if (pattern.test(filename)) {
      return { category, assetType }
    }
  }
  // Default
  return { category: 'photos', assetType: 'archive' }
}

function cleanFilename(filename: string): string {
  // Remove Cloudinary random suffix (e.g., _abc123, _2_xyz)
  let clean = filename
    .replace(/_[a-z0-9]{5,}$/i, '')  // Remove trailing random ID
    .replace(/_\d+_[a-z0-9]+$/i, '') // Remove _2_xyz patterns
    .replace(/_\d+$/i, '')           // Remove trailing numbers like _2

  // Convert to kebab-case
  clean = clean
    .replace(/([a-z])([A-Z])/g, '$1-$2') // camelCase to kebab
    .replace(/[_\s]+/g, '-')              // underscores/spaces to dashes
    .replace(/--+/g, '-')                 // multiple dashes to single
    .replace(/^-|-$/g, '')                // trim dashes
    .toLowerCase()

  // Add connie prefix if it's clearly a Connie asset but doesn't have it
  if (!clean.startsWith('connie-') && /^(logo|brand|team|inclusive)/i.test(clean)) {
    clean = 'connie-' + clean
  }

  return clean
}

function generateMapping(): void {
  // Read manifest
  const manifest: CloudinaryAsset[] = JSON.parse(
    fs.readFileSync('./scripts/cloudinary-manifest.json', 'utf-8')
  )

  console.log(`Processing ${manifest.length} assets...`)

  const mappings: MigrationMapping[] = []
  const usedNames = new Set<string>()

  for (const asset of manifest) {
    const { category, assetType } = detectCategory(asset.filename)
    let newName = cleanFilename(asset.filename)

    // Handle duplicates by adding number suffix
    let finalName = newName
    let counter = 1
    while (usedNames.has(`${finalName}.${asset.format}`)) {
      finalName = `${newName}-${counter}`
      counter++
    }
    usedNames.add(`${finalName}.${asset.format}`)

    mappings.push({
      original_name: `${asset.filename}.${asset.format}`,
      new_name: `${finalName}.${asset.format}`,
      category,
      asset_type: assetType,
      usage_rights: 'internal', // Default to internal, can be changed
      format: asset.format,
      size_kb: Math.round(asset.bytes / 1024),
      dimensions: asset.width && asset.height ? `${asset.width}x${asset.height}` : '',
      preview_url: asset.secure_url,
    })
  }

  // Sort by category then name
  mappings.sort((a, b) => {
    if (a.category !== b.category) return a.category.localeCompare(b.category)
    return a.new_name.localeCompare(b.new_name)
  })

  // Generate CSV
  const csvHeader = 'original_name,new_name,category,asset_type,usage_rights,format,size_kb,dimensions,preview_url\n'
  const csvRows = mappings.map(m =>
    `"${m.original_name}","${m.new_name}","${m.category}","${m.asset_type}","${m.usage_rights}","${m.format}",${m.size_kb},"${m.dimensions}","${m.preview_url}"`
  ).join('\n')

  fs.writeFileSync('./scripts/migration-mapping.csv', csvHeader + csvRows)
  console.log(`\nMapping saved to: ./scripts/migration-mapping.csv`)

  // Print summary
  const byCat: Record<string, number> = {}
  for (const m of mappings) {
    byCat[m.category] = (byCat[m.category] || 0) + 1
  }

  console.log('\n=== CATEGORY SUMMARY ===')
  for (const [cat, count] of Object.entries(byCat).sort((a, b) => b[1] - a[1])) {
    console.log(`  ${cat}: ${count}`)
  }

  // Show sample mappings
  console.log('\n=== SAMPLE MAPPINGS ===')
  const samples = mappings.filter(m => m.category === 'logos').slice(0, 5)
  console.log('\nLogos:')
  for (const s of samples) {
    console.log(`  ${s.original_name} → ${s.new_name}`)
  }

  const peopleSamples = mappings.filter(m => m.category === 'photos' && /berno|kaldes|schmitt/i.test(m.original_name)).slice(0, 5)
  console.log('\nPeople:')
  for (const s of peopleSamples) {
    console.log(`  ${s.original_name} → ${s.new_name}`)
  }

  const iconSamples = mappings.filter(m => m.category === 'developer').slice(0, 5)
  console.log('\nIcons/Developer:')
  for (const s of iconSamples) {
    console.log(`  ${s.original_name} → ${s.new_name}`)
  }

  console.log(`\n✓ Review the CSV and adjust any names/categories as needed.`)
  console.log(`✓ Then run the migration script to import into DAM.`)
}

generateMapping()
