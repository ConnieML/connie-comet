import type { Metadata } from 'next/types'

import { CollectionArchive } from '@/components/CollectionArchive'
import { PageRange } from '@/components/PageRange'
import { Pagination } from '@/components/Pagination'
import configPromise from '@payload-config'
import { getPayload } from 'payload'
import { draftMode } from 'next/headers'
import React from 'react'
import PageClient from './page.client'

export const dynamic = 'force-static'

export default async function Page({
  params,
}: {
  params: Promise<{
    pageNumber: string
  }>
}) {
  const { pageNumber } = await params
  const currentPage = parseInt(pageNumber) || 1

  const payload = await getPayload({ config: configPromise })
  const { isEnabled: draft } = await draftMode()

  const posts = await payload.find({
    collection: 'posts',
    depth: 1,
    draft,
    limit: 12,
    overrideAccess: false,
    page: currentPage,
    select: {
      title: true,
      slug: true,
      categories: true,
      meta: true,
    },
  })

  return (
    <div className="pt-24 pb-24">
      <PageClient />
      <div className="container mb-16">
        <div className="prose dark:prose-invert max-w-none">
          <h1>Blog</h1>
          <p>Stay updated with the latest insights, news, and resources from Connie.</p>
        </div>
      </div>

      <div className="container mb-8">
        <PageRange
          collection="posts"
          currentPage={posts.page}
          limit={12}
          totalDocs={posts.totalDocs}
        />
      </div>

      <CollectionArchive posts={posts.docs} />

      <div className="container">
        {posts.totalPages > 1 && posts.page && (
          <Pagination page={posts.page} totalPages={posts.totalPages} />
        )}
      </div>
    </div>
  )
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ pageNumber: string }>
}): Promise<Metadata> {
  const { pageNumber } = await params
  return {
    title: `Blog - Page ${pageNumber || 1} | Connie`,
    description: 'Stay updated with the latest insights, news, and resources from Connie.',
  }
}

export async function generateStaticParams() {
  const payload = await getPayload({ config: configPromise })
  const posts = await payload.find({
    collection: 'posts',
    depth: 0,
    limit: 1,
    overrideAccess: false,
  })

  const totalPages = posts.totalPages || 1

  return Array.from({ length: totalPages }, (_, i) => ({
    pageNumber: String(i + 1),
  }))
}