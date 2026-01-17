import { Metadata } from 'next'
import { BrandPortalBlock } from '@/blocks/BrandPortal/Component'

export const metadata: Metadata = {
  title: 'Brand Assets | Connie',
  description:
    'Download official Connie logos, templates, brand guidelines, and marketing materials.',
  openGraph: {
    title: 'Brand Assets | Connie',
    description:
      'Download official Connie logos, templates, brand guidelines, and marketing materials.',
  },
}

export default function BrandPage() {
  return (
    <main className="bg-zinc-900 min-h-screen">
      <BrandPortalBlock
        heading="Connie Brand Assets"
        description="Official logos, templates, and brand materials for partners, developers, and team members. Download what you need or copy hotlink URLs for direct embedding."
        usageFilter={['public', 'partners']}
      />
    </main>
  )
}
