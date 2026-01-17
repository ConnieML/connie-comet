import * as dotenv from 'dotenv'
dotenv.config({ path: '.env.local' })

import { v2 as cloudinary } from 'cloudinary'
import * as fs from 'fs'

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
})

interface CloudinaryAsset {
  public_id: string
  folder: string
  filename: string
  format: string
  resource_type: string
  type: string
  created_at: string
  bytes: number
  width?: number
  height?: number
  url: string
  secure_url: string
  tags?: string[]
}

async function exportAssets() {
  console.log('Connecting to Cloudinary...')
  console.log(`Cloud: ${process.env.CLOUDINARY_CLOUD_NAME}`)

  const allAssets: CloudinaryAsset[] = []
  let nextCursor: string | undefined = undefined

  // First, get all folders
  console.log('\nFetching folders...')
  try {
    const foldersResult = await cloudinary.api.root_folders()
    console.log('Root folders:', foldersResult.folders.map((f: any) => f.name))
  } catch (err: any) {
    console.log('Could not fetch folders:', err.message)
  }

  // Fetch all assets (paginated)
  console.log('\nFetching assets...')
  let page = 1

  do {
    try {
      const result = await cloudinary.api.resources({
        type: 'upload',
        max_results: 500,
        next_cursor: nextCursor,
      })

      console.log(`  Page ${page}: ${result.resources.length} assets`)

      for (const asset of result.resources) {
        allAssets.push({
          public_id: asset.public_id,
          folder: asset.folder || '(root)',
          filename: asset.public_id.split('/').pop() || asset.public_id,
          format: asset.format,
          resource_type: asset.resource_type,
          type: asset.type,
          created_at: asset.created_at,
          bytes: asset.bytes,
          width: asset.width,
          height: asset.height,
          url: asset.url,
          secure_url: asset.secure_url,
          tags: asset.tags,
        })
      }

      nextCursor = result.next_cursor
      page++
    } catch (err: any) {
      console.error('Error fetching assets:', err.message)
      break
    }
  } while (nextCursor)

  console.log(`\nTotal assets found: ${allAssets.length}`)

  // Group by folder
  const byFolder: Record<string, CloudinaryAsset[]> = {}
  for (const asset of allAssets) {
    if (!byFolder[asset.folder]) byFolder[asset.folder] = []
    byFolder[asset.folder].push(asset)
  }

  console.log('\n=== FOLDER STRUCTURE ===')
  for (const [folder, assets] of Object.entries(byFolder).sort()) {
    console.log(`\n${folder}: ${assets.length} assets`)
    // Show first 5 assets as sample
    for (const asset of assets.slice(0, 5)) {
      console.log(`  - ${asset.filename}.${asset.format} (${Math.round(asset.bytes/1024)}KB)`)
    }
    if (assets.length > 5) {
      console.log(`  ... and ${assets.length - 5} more`)
    }
  }

  // Save full manifest to JSON
  const outputPath = './scripts/cloudinary-manifest.json'
  fs.writeFileSync(outputPath, JSON.stringify(allAssets, null, 2))
  console.log(`\nFull manifest saved to: ${outputPath}`)

  // Save summary CSV for review
  const csvPath = './scripts/cloudinary-assets.csv'
  const csvHeader = 'folder,filename,format,width,height,size_kb,url\n'
  const csvRows = allAssets.map(a =>
    `"${a.folder}","${a.filename}","${a.format}",${a.width || ''},${a.height || ''},${Math.round(a.bytes/1024)},"${a.secure_url}"`
  ).join('\n')
  fs.writeFileSync(csvPath, csvHeader + csvRows)
  console.log(`CSV summary saved to: ${csvPath}`)
}

exportAssets().catch(console.error)
