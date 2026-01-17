/**
 * Cloudinary to DAM Migration - Local API Version
 *
 * This script uses Payload's local API for direct database access
 * Run it on the server or locally with database access.
 *
 * Usage:
 *   DRY RUN:  npx tsx scripts/migrate-cloudinary-local.ts --dry-run
 *   EXECUTE:  npx tsx scripts/migrate-cloudinary-local.ts
 *   LIMIT:    npx tsx scripts/migrate-cloudinary-local.ts --limit 10
 *   RESUME:   npx tsx scripts/migrate-cloudinary-local.ts (auto-skips completed)
 */

import * as dotenv from 'dotenv'
dotenv.config({ path: '.env.local' })

import * as fs from 'fs'
import * as path from 'path'
import * as https from 'https'
import * as http from 'http'

// Configuration
const MAPPING_FILE = './scripts/migration-mapping.csv'
const MANIFEST_FILE = './scripts/cloudinary-manifest.json'
const PROGRESS_FILE = './scripts/migration-progress.json'
const TEMP_DIR = './scripts/temp-downloads'

interface MigrationRow {
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

interface MigrationProgress {
  completed: string[]
  failed: { name: string; error: string }[]
  lastRun: string
}

// Parse CSV line (handles quoted values)
function parseCSVLine(line: string): string[] {
  const values: string[] = []
  let current = ''
  let inQuotes = false

  for (let i = 0; i < line.length; i++) {
    const char = line[i]
    if (char === '"') {
      inQuotes = !inQuotes
    } else if (char === ',' && !inQuotes) {
      values.push(current.trim())
      current = ''
    } else {
      current += char
    }
  }
  values.push(current.trim())
  return values
}

// Load migration mapping
function loadMapping(): MigrationRow[] {
  const content = fs.readFileSync(MAPPING_FILE, 'utf-8')
  const lines = content.split('\n').filter((l) => l.trim())

  return lines.slice(1).map((line) => {
    const values = parseCSVLine(line)
    return {
      original_name: values[0],
      new_name: values[1],
      category: values[2],
      asset_type: values[3],
      usage_rights: values[4],
      format: values[5],
      size_kb: parseInt(values[6], 10),
      dimensions: values[7],
      preview_url: values[8],
    }
  })
}

// Load cloudinary manifest for full asset data
function loadManifest(): CloudinaryAsset[] {
  return JSON.parse(fs.readFileSync(MANIFEST_FILE, 'utf-8'))
}

// Load/save progress
function loadProgress(): MigrationProgress {
  if (fs.existsSync(PROGRESS_FILE)) {
    return JSON.parse(fs.readFileSync(PROGRESS_FILE, 'utf-8'))
  }
  return { completed: [], failed: [], lastRun: '' }
}

function saveProgress(progress: MigrationProgress) {
  progress.lastRun = new Date().toISOString()
  fs.writeFileSync(PROGRESS_FILE, JSON.stringify(progress, null, 2))
}

// Download file from URL to local file
async function downloadFile(url: string, destPath: string): Promise<void> {
  return new Promise((resolve, reject) => {
    const protocol = url.startsWith('https') ? https : http
    const file = fs.createWriteStream(destPath)

    protocol
      .get(url, (response) => {
        if (response.statusCode === 301 || response.statusCode === 302) {
          const redirectUrl = response.headers.location
          if (redirectUrl) {
            file.close()
            fs.unlinkSync(destPath)
            downloadFile(redirectUrl, destPath).then(resolve).catch(reject)
            return
          }
        }

        if (response.statusCode !== 200) {
          file.close()
          fs.unlinkSync(destPath)
          reject(new Error(`HTTP ${response.statusCode}: ${response.statusMessage}`))
          return
        }

        response.pipe(file)
        file.on('finish', () => {
          file.close()
          resolve()
        })
        file.on('error', (err) => {
          file.close()
          fs.unlinkSync(destPath)
          reject(err)
        })
      })
      .on('error', (err) => {
        file.close()
        if (fs.existsSync(destPath)) fs.unlinkSync(destPath)
        reject(err)
      })
  })
}

// Get MIME type from format
function getMimeType(format: string): string {
  const mimeTypes: Record<string, string> = {
    png: 'image/png',
    jpg: 'image/jpeg',
    jpeg: 'image/jpeg',
    gif: 'image/gif',
    svg: 'image/svg+xml',
    webp: 'image/webp',
    pdf: 'application/pdf',
    mp4: 'video/mp4',
    webm: 'video/webm',
    mp3: 'audio/mpeg',
    wav: 'audio/wav',
    ico: 'image/x-icon',
  }
  return mimeTypes[format.toLowerCase()] || 'application/octet-stream'
}

// Format asset name for display
function formatAssetName(name: string): string {
  return name
    .replace(/\.(png|jpg|jpeg|gif|svg|webp|pdf|mp4|webm|ico)$/i, '')
    .split('-')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ')
}

async function runMigration(options: { dryRun: boolean; limit?: number }) {
  console.log('\n═══════════════════════════════════════════════════════════')
  console.log('  CLOUDINARY → DAM MIGRATION (Local API)')
  console.log('  Mode:', options.dryRun ? 'DRY RUN (no uploads)' : 'EXECUTE')
  if (options.limit) console.log('  Limit:', options.limit)
  console.log('═══════════════════════════════════════════════════════════\n')

  // Create temp directory
  if (!fs.existsSync(TEMP_DIR)) {
    fs.mkdirSync(TEMP_DIR, { recursive: true })
  }

  const mapping = loadMapping()
  const manifest = loadManifest()
  const progress = loadProgress()

  console.log(`Loaded ${mapping.length} assets from mapping`)
  console.log(`Already completed: ${progress.completed.length}`)
  console.log(`Previously failed: ${progress.failed.length}`)

  // Build lookup for secure_url by original_name
  const manifestLookup = new Map<string, CloudinaryAsset>()
  for (const asset of manifest) {
    const key = `${asset.filename}.${asset.format}`
    manifestLookup.set(key, asset)
  }

  // Filter out already completed
  let toProcess = mapping.filter((m) => !progress.completed.includes(m.original_name))

  if (options.limit) {
    toProcess = toProcess.slice(0, options.limit)
  }

  console.log(`Assets to process: ${toProcess.length}\n`)

  if (toProcess.length === 0) {
    console.log('Nothing to process. Migration complete!')
    return
  }

  // Dynamic import of Payload after env is loaded
  let payload: any
  if (!options.dryRun) {
    console.log('Initializing Payload...')
    const { getPayload } = await import('payload')
    const config = await import('../src/payload.config')
    payload = await getPayload({ config: config.default })
    console.log('Payload initialized.\n')
  }

  let successCount = 0
  let failCount = 0

  for (let i = 0; i < toProcess.length; i++) {
    const row = toProcess[i]
    const pct = Math.round(((i + 1) / toProcess.length) * 100)

    process.stdout.write(`[${pct.toString().padStart(3)}%] ${row.new_name.padEnd(50)}`)

    // Find in manifest for secure_url
    const cloudinaryAsset = manifestLookup.get(row.original_name)
    if (!cloudinaryAsset) {
      console.log('⚠️  NOT IN MANIFEST')
      progress.failed.push({ name: row.original_name, error: 'Not found in manifest' })
      failCount++
      continue
    }

    if (options.dryRun) {
      console.log('✓ (dry run)')
      successCount++
      continue
    }

    const tempFilePath = path.join(TEMP_DIR, row.new_name)

    try {
      // Download from Cloudinary
      await downloadFile(cloudinaryAsset.secure_url, tempFilePath)

      // Read file for Payload upload
      const fileBuffer = fs.readFileSync(tempFilePath)

      // Create in Payload
      const doc = await payload.create({
        collection: 'brand-assets',
        data: {
          name: formatAssetName(row.new_name),
          category: row.category,
          assetType: row.asset_type,
          usageRights: row.usage_rights,
          _status: 'published',
        },
        file: {
          data: fileBuffer,
          name: row.new_name,
          mimetype: getMimeType(row.format),
          size: fileBuffer.length,
        },
      })

      console.log(`✓ ID: ${doc.id}`)
      progress.completed.push(row.original_name)
      successCount++

      // Clean up temp file
      fs.unlinkSync(tempFilePath)

      // Save progress periodically
      if ((i + 1) % 10 === 0) {
        saveProgress(progress)
      }

      // Small delay to avoid overwhelming the server
      await new Promise((r) => setTimeout(r, 100))
    } catch (err: any) {
      console.log(`✗ ${err.message}`)
      progress.failed.push({ name: row.original_name, error: err.message })
      failCount++

      // Clean up temp file if exists
      if (fs.existsSync(tempFilePath)) {
        fs.unlinkSync(tempFilePath)
      }
    }
  }

  // Final save
  saveProgress(progress)

  // Clean up temp directory
  if (fs.existsSync(TEMP_DIR)) {
    const remaining = fs.readdirSync(TEMP_DIR)
    if (remaining.length === 0) {
      fs.rmdirSync(TEMP_DIR)
    }
  }

  console.log('\n═══════════════════════════════════════════════════════════')
  console.log('  MIGRATION COMPLETE')
  console.log('═══════════════════════════════════════════════════════════')
  console.log(`  ✓ Successful: ${successCount}`)
  console.log(`  ✗ Failed: ${failCount}`)
  console.log(`  Total completed (all runs): ${progress.completed.length}`)
  console.log('═══════════════════════════════════════════════════════════\n')

  if (progress.failed.length > 0) {
    console.log('Failed assets:')
    for (const f of progress.failed.slice(-10)) {
      console.log(`  - ${f.name}: ${f.error}`)
    }
    if (progress.failed.length > 10) {
      console.log(`  ... and ${progress.failed.length - 10} more`)
    }
  }

  // Shut down gracefully
  process.exit(0)
}

// Parse CLI args
const args = process.argv.slice(2)
const dryRun = args.includes('--dry-run')
const limitArg = args.find((a) => a.startsWith('--limit'))
const limit = limitArg ? parseInt(args[args.indexOf(limitArg) + 1], 10) : undefined

runMigration({ dryRun, limit }).catch((err) => {
  console.error('Migration failed:', err)
  process.exit(1)
})
