/**
 * Local Drive Asset Import Script
 *
 * Imports PDFs from local/external drives to the DAM.
 * Keeps original filenames, categorizes as presentations, restricted access.
 *
 * Usage:
 *   GENERATE MANIFEST:  npx tsx scripts/import-local-assets.ts --scan
 *   DRY RUN:            npx tsx scripts/import-local-assets.ts --dry-run
 *   EXECUTE:            npx tsx scripts/import-local-assets.ts
 *   LIMIT:              npx tsx scripts/import-local-assets.ts --limit 5
 */

import * as fs from 'fs'
import * as path from 'path'
import * as https from 'https'
import { execSync } from 'child_process'

// Configuration
const SOURCE_DIR = '/Volumes/Seagate Backup Plus Drive/ASA/Connie/BizOps/pitch-decks'
const PRODUCTION_URL = process.env.MIGRATION_TARGET || 'https://connie.one'
const MIGRATION_SECRET = process.env.MIGRATION_SECRET || 'connie-dam-migration-2026'
const MANIFEST_FILE = './scripts/local-assets-manifest.json'
const PROGRESS_FILE = './scripts/local-import-progress.json'

// Default settings for this import
const DEFAULT_CATEGORY = 'presentations'
const DEFAULT_ASSET_TYPE = 'primary'
const DEFAULT_USAGE_RIGHTS = 'restricted'

// Folders to exclude
const EXCLUDE_PATTERNS = ['/templates/', '/examples/']

interface LocalAsset {
  path: string
  filename: string
  date: string
  size: number
}

interface ImportProgress {
  completed: string[]
  failed: { name: string; error: string }[]
  lastRun: string
}

// Scan directory for PDFs
function scanDirectory(): LocalAsset[] {
  console.log(`Scanning: ${SOURCE_DIR}`)
  console.log(`Excluding: ${EXCLUDE_PATTERNS.join(', ')}\n`)

  // Use find command to get files with dates
  const cmd = `find "${SOURCE_DIR}" -type f -name "*.pdf" -print0 | xargs -0 stat -f "%Sm|%z|%N" -t "%Y-%m-%d"`
  const output = execSync(cmd, { encoding: 'utf-8', maxBuffer: 10 * 1024 * 1024 })

  const assets: LocalAsset[] = []

  for (const line of output.split('\n').filter((l) => l.trim())) {
    const [date, sizeStr, filePath] = line.split('|')

    // Skip excluded folders
    if (EXCLUDE_PATTERNS.some((p) => filePath.toLowerCase().includes(p))) {
      continue
    }

    assets.push({
      path: filePath,
      filename: path.basename(filePath),
      date,
      size: parseInt(sizeStr, 10),
    })
  }

  // Sort by date descending (newest first)
  assets.sort((a, b) => b.date.localeCompare(a.date))

  return assets
}

// Load/save progress
function loadProgress(): ImportProgress {
  if (fs.existsSync(PROGRESS_FILE)) {
    return JSON.parse(fs.readFileSync(PROGRESS_FILE, 'utf-8'))
  }
  return { completed: [], failed: [], lastRun: '' }
}

function saveProgress(progress: ImportProgress) {
  progress.lastRun = new Date().toISOString()
  fs.writeFileSync(PROGRESS_FILE, JSON.stringify(progress, null, 2))
}

// Format filename to display name
function formatDisplayName(filename: string): string {
  return filename
    .replace(/\.pdf$/i, '')
    .replace(/\.pptx$/i, '')
    .replace(/[_-]+/g, ' ')
    .trim()
}

// Upload to production via migration endpoint
async function uploadToProduction(
  filePath: string,
  filename: string,
  metadata: {
    name: string
    category: string
    assetType: string
    usageRights: string
  },
): Promise<{ success: boolean; id?: string; skipped?: boolean; error?: string }> {
  // Read file
  const fileBuffer = fs.readFileSync(filePath)
  const mimeType = 'application/pdf'

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
    req.setTimeout(120000, () => {
      req.destroy()
      resolve({ success: false, error: 'Request timeout (PDFs can be large)' })
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

async function runImport(options: { scan: boolean; dryRun: boolean; limit?: number }) {
  console.log('\n═══════════════════════════════════════════════════════════')
  console.log('  LOCAL DRIVE → DAM IMPORT')
  console.log('  Source:', SOURCE_DIR)
  if (options.scan) console.log('  Mode: SCAN ONLY (generate manifest)')
  else console.log('  Mode:', options.dryRun ? 'DRY RUN' : 'EXECUTE')
  if (options.limit) console.log('  Limit:', options.limit)
  console.log('═══════════════════════════════════════════════════════════\n')

  // Check if source exists
  if (!fs.existsSync(SOURCE_DIR)) {
    console.error(`ERROR: Source directory not found: ${SOURCE_DIR}`)
    console.error('Make sure the external drive is connected.')
    process.exit(1)
  }

  // Scan or load manifest
  let assets: LocalAsset[]

  if (options.scan || !fs.existsSync(MANIFEST_FILE)) {
    assets = scanDirectory()
    fs.writeFileSync(MANIFEST_FILE, JSON.stringify(assets, null, 2))
    console.log(`Found ${assets.length} PDFs`)
    console.log(`Manifest saved to: ${MANIFEST_FILE}\n`)

    if (options.scan) {
      console.log('=== ASSETS (newest first) ===\n')
      for (const asset of assets.slice(0, 20)) {
        const sizeKb = Math.round(asset.size / 1024)
        console.log(`${asset.date}  ${sizeKb.toString().padStart(6)}KB  ${asset.filename}`)
      }
      if (assets.length > 20) {
        console.log(`\n... and ${assets.length - 20} more`)
      }
      console.log('\nRun without --scan to import these assets.')
      return
    }
  } else {
    assets = JSON.parse(fs.readFileSync(MANIFEST_FILE, 'utf-8'))
    console.log(`Loaded ${assets.length} assets from manifest`)
  }

  const progress = loadProgress()
  console.log(`Already completed: ${progress.completed.length}`)
  console.log(`Previously failed: ${progress.failed.length}`)

  // Filter out completed
  let toProcess = assets.filter((a) => !progress.completed.includes(a.filename))

  if (options.limit) {
    toProcess = toProcess.slice(0, options.limit)
  }

  console.log(`Assets to process: ${toProcess.length}\n`)

  if (toProcess.length === 0) {
    console.log('Nothing to process. Import complete!')
    return
  }

  // Check endpoint if not dry run
  if (!options.dryRun) {
    console.log('Checking migration endpoint...')
    const available = await checkEndpoint()
    if (!available) {
      console.error('ERROR: Migration endpoint not available at', PRODUCTION_URL)
      console.error('Make sure the endpoint is deployed.')
      process.exit(1)
    }
    console.log('Endpoint ready.\n')
  }

  let successCount = 0
  let skipCount = 0
  let failCount = 0

  for (let i = 0; i < toProcess.length; i++) {
    const asset = toProcess[i]
    const pct = Math.round(((i + 1) / toProcess.length) * 100)
    const sizeKb = Math.round(asset.size / 1024)

    process.stdout.write(
      `[${pct.toString().padStart(3)}%] ${asset.filename.substring(0, 45).padEnd(45)} (${sizeKb}KB) `,
    )

    if (options.dryRun) {
      console.log('✓ (dry run)')
      successCount++
      continue
    }

    try {
      const result = await uploadToProduction(asset.path, asset.filename, {
        name: formatDisplayName(asset.filename),
        category: DEFAULT_CATEGORY,
        assetType: DEFAULT_ASSET_TYPE,
        usageRights: DEFAULT_USAGE_RIGHTS,
      })

      if (result.success) {
        if (result.skipped) {
          console.log(`⏭️  exists`)
          skipCount++
        } else {
          console.log(`✓ ${result.id}`)
          successCount++
        }
        progress.completed.push(asset.filename)
      } else {
        console.log(`✗ ${result.error}`)
        progress.failed.push({ name: asset.filename, error: result.error || 'Unknown' })
        failCount++
      }

      // Save progress periodically
      if ((i + 1) % 5 === 0) {
        saveProgress(progress)
      }

      // Delay between uploads (PDFs can be large)
      await new Promise((r) => setTimeout(r, 500))
    } catch (err: any) {
      console.log(`✗ ${err.message}`)
      progress.failed.push({ name: asset.filename, error: err.message })
      failCount++
    }
  }

  // Final save
  saveProgress(progress)

  console.log('\n═══════════════════════════════════════════════════════════')
  console.log('  IMPORT COMPLETE')
  console.log('═══════════════════════════════════════════════════════════')
  console.log(`  ✓ New uploads: ${successCount}`)
  console.log(`  ⏭️  Skipped: ${skipCount}`)
  console.log(`  ✗ Failed: ${failCount}`)
  console.log(`  Total completed: ${progress.completed.length}`)
  console.log('═══════════════════════════════════════════════════════════\n')
}

// Parse CLI args
const args = process.argv.slice(2)
const scan = args.includes('--scan')
const dryRun = args.includes('--dry-run')
const limitIdx = args.indexOf('--limit')
const limit = limitIdx >= 0 ? parseInt(args[limitIdx + 1], 10) : undefined

runImport({ scan, dryRun, limit }).catch((err) => {
  console.error('Import failed:', err)
  process.exit(1)
})
