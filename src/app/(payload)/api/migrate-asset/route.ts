/**
 * Asset Migration Endpoint
 *
 * This endpoint receives downloaded asset files and creates BrandAsset records.
 * It should only be enabled temporarily during migration, then removed.
 *
 * Protected by a migration secret to prevent unauthorized uploads.
 */

import { getPayload } from 'payload'
import config from '@payload-config'
import { NextResponse } from 'next/server'

// Migration secret - set this in your environment
const MIGRATION_SECRET = process.env.MIGRATION_SECRET || 'connie-dam-migration-2026'

export async function POST(request: Request) {
  try {
    // Verify migration secret
    const authHeader = request.headers.get('x-migration-secret')
    if (authHeader !== MIGRATION_SECRET) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    // Get form data
    const formData = await request.formData()
    const file = formData.get('file') as File | null
    const name = formData.get('name') as string
    const category = formData.get('category') as string
    const assetType = formData.get('assetType') as string
    const usageRights = formData.get('usageRights') as string

    if (!file || !name || !category || !assetType || !usageRights) {
      return NextResponse.json(
        { error: 'Missing required fields: file, name, category, assetType, usageRights' },
        { status: 400 },
      )
    }

    // Convert File to Buffer
    const arrayBuffer = await file.arrayBuffer()
    const buffer = Buffer.from(arrayBuffer)

    // Initialize Payload
    const payload = await getPayload({ config })

    // Check if asset already exists by name
    const existing = await payload.find({
      collection: 'brand-assets',
      where: { name: { equals: name } },
      limit: 1,
    })

    if (existing.docs.length > 0) {
      return NextResponse.json(
        { success: true, id: existing.docs[0].id, skipped: true, message: 'Already exists' },
        { status: 200 },
      )
    }

    // Create brand asset
    const doc = await payload.create({
      collection: 'brand-assets',
      data: {
        name,
        category,
        assetType,
        usageRights,
        _status: 'published',
      },
      file: {
        data: buffer,
        name: file.name,
        mimetype: file.type,
        size: buffer.length,
      },
    })

    return NextResponse.json({ success: true, id: doc.id }, { status: 201 })
  } catch (error: any) {
    console.error('Migration endpoint error:', error)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}

// Health check
export async function GET() {
  return NextResponse.json({
    status: 'ready',
    message: 'Migration endpoint active. POST with x-migration-secret header.',
  })
}
