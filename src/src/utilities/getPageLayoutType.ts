import { cache } from 'react'
import { getPayload } from 'payload'
import configPromise from '@payload-config'
import { draftMode, headers } from 'next/headers'

export const getPageLayoutType = cache(async (): Promise<string> => {
  try {
    const { isEnabled: draft } = await draftMode()
    const headersList = await headers()
    const pathname = headersList.get('x-pathname') || '/'
    
    // Extract slug from pathname
    let slug = pathname === '/' ? 'home' : pathname.slice(1)
    
    // Handle nested paths - just use the first segment for now
    if (slug.includes('/')) {
      slug = slug.split('/')[0]
    }

    const payload = await getPayload({ config: configPromise })

    const result = await payload.find({
      collection: 'pages',
      draft,
      limit: 1,
      pagination: false,
      overrideAccess: draft,
      where: {
        slug: {
          equals: slug,
        },
      },
      select: {
        layoutType: true,
      },
    })

    const page = result.docs?.[0]
    return page?.layoutType || 'standard'
  } catch (error) {
    // Fallback to standard layout if anything goes wrong
    console.warn('Could not determine page layout type:', error)
    return 'standard'
  }
})