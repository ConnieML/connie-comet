import { NextRequest, NextResponse } from 'next/server'
import { getPayload } from 'payload'
import configPromise from '@payload-config'

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params

    const payload = await getPayload({ config: configPromise })

    // Fetch the asset from database
    const asset = await payload.findByID({
      collection: 'brand-assets',
      id,
    })

    if (!asset || !asset.url) {
      return NextResponse.json({ error: 'Asset not found' }, { status: 404 })
    }

    // Fetch the file from S3
    const fileResponse = await fetch(asset.url)

    if (!fileResponse.ok) {
      return NextResponse.json({ error: 'Failed to fetch file' }, { status: 500 })
    }

    const fileBuffer = await fileResponse.arrayBuffer()

    // Determine filename
    const filename = asset.filename || `${asset.name || 'download'}.${asset.mimeType?.split('/')[1] || 'bin'}`

    // Return with Content-Disposition header to force download
    return new NextResponse(fileBuffer, {
      headers: {
        'Content-Type': asset.mimeType || 'application/octet-stream',
        'Content-Disposition': `attachment; filename="${filename}"`,
        'Content-Length': fileBuffer.byteLength.toString(),
      },
    })
  } catch (error) {
    console.error('Download error:', error)
    return NextResponse.json({ error: 'Download failed' }, { status: 500 })
  }
}
