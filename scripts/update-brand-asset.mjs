/**
 * Direct MongoDB update for brand assets - bypasses Payload's S3 handling
 * Usage: node scripts/update-brand-asset.mjs <assetId> <field> <value>
 */
import mongoose from 'mongoose/index.js'
import dotenv from 'dotenv'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
dotenv.config({ path: path.resolve(__dirname, '../.env.local') })

async function updateAsset() {
  const [assetId, field, value] = process.argv.slice(2)
  
  if (!assetId || !field) {
    console.log('Usage: node scripts/update-brand-asset.mjs <assetId> <field> <value>')
    console.log('Example: node scripts/update-brand-asset.mjs 696afb6cb1804801c01e3e51 subcategory "Team"')
    process.exit(1)
  }

  const uri = process.env.DATABASE_URI
  if (!uri) {
    console.error('DATABASE_URI not found in .env.local')
    process.exit(1)
  }

  try {
    await mongoose.connect(uri)
    console.log('Connected to MongoDB')
    
    let parsedValue = value
    if (value === 'true') parsedValue = true
    if (value === 'false') parsedValue = false
    
    const result = await mongoose.connection.collection('brand-assets').updateOne(
      { _id: new mongoose.Types.ObjectId(assetId) },
      { $set: { [field]: parsedValue, updatedAt: new Date() } }
    )
    
    if (result.matchedCount === 0) {
      console.log(`No asset found with ID: ${assetId}`)
    } else {
      console.log(`✅ Updated ${field} = "${parsedValue}" for asset ${assetId}`)
    }
  } finally {
    await mongoose.disconnect()
  }
}

updateAsset().catch(console.error)
