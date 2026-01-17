/**
 * Cloudinary to Production DAM Migration
 *
 * Downloads from Cloudinary and uploads to connie.one production.
 *
 * Usage:
 *   DRY RUN:  npx tsx scripts/migrate-to-production.ts --dry-run
 *   EXECUTE:  npx tsx scripts/migrate-to-production.ts
 *   LIMIT:    npx tsx scripts/migrate-to-production.ts --limit 10
 *   RESUME:   npx tsx scripts/migrate-to-production.ts (auto-skips completed)
 */

import * as fs from 'fs'
import * as path from 'path'
import * as https from 'https'
import * as http from 'http'

// Configuration
const PRODUCTION_URL = process.env.MIGRATION_TARGET || 'https://connie.one'
const MIGRATION_SECRET = process.env.MIGRATION_SECRET || 'connie-dam-migration-2026'
const MAPPING_FILE = './scripts/migration-mapping.csv'
const MANIFEST_FILE = './scripts/cloudinary-manifest.json'
const PROGRESS_FILE = './scripts/migration-progress.json'

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

// Load cloudinary manifest
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

// Download file from URL to buffer
async function downloadFile(url: string): Promise<Buffer> {
  return new Promise((resolve, reject) => {
    const protocol = url.startsWith('https') ? https : http

    const makeRequest = (targetUrl: string, redirectCount = 0) => {
      if (redirectCount > 5) {
        reject(new Error('Too many redirects'))
        return
      }

      const urlObj = new URL(targetUrl)
      const proto = urlObj.protocol === 'https:' ? https : http

      proto
        .get(targetUrl, (response) => {
          if (response.statusCode === 301 || response.statusCode === 302) {
            const redirectUrl = response.headers.location
            if (redirectUrl) {
              makeRequest(redirectUrl, redirectCount + 1)
              return
            }
          }

          if (response.statusCode !== 200) {
            reject(new Error(`HTTP ${response.statusCode}: ${response.statusMessage}`))
            return
          }

          const chunks: Buffer[] = []
          response.on('data', (chunk) => chunks.push(chunk))
          response.on('end', () => resolve(Buffer.concat(chunks)))
          response.on('error', reject)
        })
        .on('error', reject)
    }

    makeRequest(url)
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

// Upload to production via migration endpoint
async function uploadToProduction(
  fileBuffer: Buffer,
  filename: string,
  mimeType: string,
  metadata: {
    name: string
    category: string
    assetType: string
    usageRights: string
  },
): Promise<{ success: boolean; id?: string; skipped?: boolean; error?: string }> {
  // Create form data boundary
  const boundary = '----FormBoundary' + Math.random().toString(36).substring(2)

  // Build multipart form data
  const parts: Buffer[] = []

  // Add text fields
  for (const [key, value] of Object.entries(metadata)) {
    parts.push(
      Buffer.from(`--${boundary}\r\nContent-Disposition: form-data; name="${key}"\r\n\r\n${value}\r\n`),
    )
  }

  // Add file
  parts.push(
    Buffer.from(
      `--${boundary}\r\nContent-Disposition: form-data; name="file"; filename="${filename}"\r\nContent-Type: ${mimeType}\r\n\r\n`,
    ),
  )
  parts.push(fileBuffer)
  parts.push(Buffer.from('\r\n'))

  // End boundary
  parts.push(Buffer.from(`--${boundary}--\r\n`))

  const body = Buffer.concat(parts)

  return new Promise((resolve) => {
    const url = new URL(`${PRODUCTION_URL}/api/migrate-asset`)

    const options = {
      hostname: url.hostname,
      port: url.port || 443,
      path: url.pathname,
      method: 'POST',
      headers: {
        'Content-Type': `multipart/form-data; boundary=${boundary}`,
        'Content-Length': body.length,
        'x-migration-secret': MIGRATION_SECRET,
      },
    }

    const req = https.request(options, (res) => {
      let data = ''
      res.on('data', (chunk) => (data += chunk))
      res.on('end', () => {
        try {
          const response = JSON.parse(data)
          if (res.statusCode === 201 || res.statusCode === 200) {
            resolve({
              success: true,
              id: response.id,
              skipped: response.skipped,
            })
          } else {
            resolve({
              success: false,
              error: response.error || `HTTP ${res.statusCode}`,
            })
          }
        } catch {
          resolve({ success: false, error: `Parse error: ${data.substring(0, 200)}` })
        }
      })
    })

    req.on('error', (e) => resolve({ success: false, error: e.message }))
    req.setTimeout(60000, () => {
      req.destroy()
      resolve({ success: false, error: 'Request timeout' })
    })
    req.write(body)
    req.end()
  })
}

// Check if endpoint is available
async function checkEndpoint(): Promise<boolean> {
  return new Promise((resolve) => {
    const url = new URL(`${PRODUCTION_URL}/api/migrate-asset`)

    https
      .get(url.toString(), (res) => {
        let data = ''
        res.on('data', (chunk) => (data += chunk))
        res.on('end', () => {
          try {
            const response = JSON.parse(data)
            resolve(response.status === 'ready')
          } catch {
            resolve(false)
          }
        })
      })
      .on('error', () => resolve(false))
  })
}

async function runMigration(options: { dryRun: boolean; limit?: number }) {
  console.log('\n═══════════════════════════════════════════════════════════')
  console.log('  CLOUDINARY → PRODUCTION DAM MIGRATION')
  console.log('  Target:', PRODUCTION_URL)
  console.log('  Mode:', options.dryRun ? 'DRY RUN (no uploads)' : 'EXECUTE')
  if (options.limit) console.log('  Limit:', options.limit)
  console.log('═══════════════════════════════════════════════════════════\n')

  // Check endpoint availability
  if (!options.dryRun) {
    console.log('Checking migration endpoint...')
    const available = await checkEndpoint()
    if (!available) {
      console.error('ERROR: Migration endpoint not available at', PRODUCTION_URL)
      console.error('Make sure the endpoint is deployed and accessible.')
      process.exit(1)
    }
    console.log('Endpoint ready.\n')
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

  let successCount = 0
  let skipCount = 0
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

    try {
      // Download from Cloudinary
      const fileBuffer = await downloadFile(cloudinaryAsset.secure_url)

      // Upload to production
      const result = await uploadToProduction(fileBuffer, row.new_name, getMimeType(row.format), {
        name: formatAssetName(row.new_name),
        category: row.category,
        assetType: row.asset_type,
        usageRights: row.usage_rights,
      })

      if (result.success) {
        if (result.skipped) {
          console.log(`⏭️  Already exists (${result.id})`)
          skipCount++
        } else {
          console.log(`✓ ID: ${result.id}`)
          successCount++
        }
        progress.completed.push(row.original_name)
      } else {
        console.log(`✗ ${result.error}`)
        progress.failed.push({ name: row.original_name, error: result.error || 'Unknown error' })
        failCount++
      }

      // Save progress periodically
      if ((i + 1) % 10 === 0) {
        saveProgress(progress)
      }

      // Small delay to avoid overwhelming the server
      await new Promise((r) => setTimeout(r, 300))
    } catch (err: any) {
      console.log(`✗ ${err.message}`)
      progress.failed.push({ name: row.original_name, error: err.message })
      failCount++
    }
  }

  // Final save
  saveProgress(progress)

  console.log('\n═══════════════════════════════════════════════════════════')
  console.log('  MIGRATION COMPLETE')
  console.log('═══════════════════════════════════════════════════════════')
  console.log(`  ✓ New uploads: ${successCount}`)
  console.log(`  ⏭️  Skipped (existing): ${skipCount}`)
  console.log(`  ✗ Failed: ${failCount}`)
  console.log(`  Total completed (all runs): ${progress.completed.length}`)
  console.log('═══════════════════════════════════════════════════════════\n')

  if (progress.failed.length > 0) {
    console.log('Recent failures:')
    for (const f of progress.failed.slice(-10)) {
      console.log(`  - ${f.name}: ${f.error}`)
    }
    if (progress.failed.length > 10) {
      console.log(`  ... and ${progress.failed.length - 10} more`)
    }
  }
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
