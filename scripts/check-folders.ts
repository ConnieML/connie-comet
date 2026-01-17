import * as dotenv from 'dotenv'
dotenv.config({ path: '.env.local' })

import { v2 as cloudinary } from 'cloudinary'

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
})

async function checkFolders() {
  const folders = [
    'Connie-BrandAssets',
    'Connie Diagrams', 
    'Connie Screenshots',
    'Connie People',
    'Connie-Heros',
    'Icons',
    'Backgrounds'
  ]

  for (const folder of folders) {
    try {
      const result = await cloudinary.api.resources({
        type: 'upload',
        prefix: folder,
        max_results: 10,
      })
      console.log(`\n${folder}: ${result.resources.length} assets`)
      for (const r of result.resources.slice(0, 3)) {
        console.log(`  - ${r.public_id}`)
      }
    } catch (err: any) {
      console.log(`${folder}: Error - ${err.message}`)
    }
  }
}

checkFolders()
