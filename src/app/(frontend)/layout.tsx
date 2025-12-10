import type { Metadata } from 'next'

import { cn } from '@/utilities/ui'
import { GeistMono } from 'geist/font/mono'
import { GeistSans } from 'geist/font/sans'
import React from 'react'

import { AdminBar } from '@/components/AdminBar'
import { Footer } from '@/Footer/Component'
import { Header } from '@/Header/Component'
import { Providers } from '@/providers'
import { InitTheme } from '@/providers/Theme/InitTheme'
import { mergeOpenGraph } from '@/utilities/mergeOpenGraph'
import { draftMode, headers } from 'next/headers'
import { getPageLayoutType } from '@/utilities/getPageLayoutType'

import './globals.css'
import { getServerSideURL } from '@/utilities/getURL'

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const { isEnabled } = await draftMode()
  const layoutType = await getPageLayoutType()
  const isLandingPage = layoutType === 'landing'

  // Check if this is the UAT discovery page or presentations page
  const headersList = await headers()
  const pathname = headersList.get('x-pathname') || '/'
  const isUATDiscoveryPage = pathname.includes('/user-acceptance-testing/discovery')
  const isPresentationsPage = pathname.startsWith('/presentations')
  const isUATLandingPage = pathname.startsWith('/connie-uat-landing')

  return (
    <html className={cn(GeistSans.variable, GeistMono.variable)} lang="en" suppressHydrationWarning>
      <head>
        <InitTheme />
        <link href="/favicon.ico" rel="icon" sizes="32x32" />
        <link href="/favicon.svg" rel="icon" type="image/svg+xml" />
      </head>
      <body>
        <Providers>
          <AdminBar
            adminBarProps={{
              preview: isEnabled,
            }}
          />

          {!isLandingPage && !isUATDiscoveryPage && !isPresentationsPage && !isUATLandingPage && <Header />}
          {children}
          {!isLandingPage && !isUATDiscoveryPage && !isPresentationsPage && !isUATLandingPage && <Footer />}
        </Providers>
      </body>
    </html>
  )
}

export const metadata: Metadata = {
  metadataBase: new URL(getServerSideURL()),
  openGraph: mergeOpenGraph(),
  twitter: {
    card: 'summary_large_image',
    creator: '@payloadcms',
  },
}
