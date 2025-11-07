import React from 'react'
import Link from 'next/link'
import type { Metadata } from 'next'
import { Logo } from '@/components/Logo/Logo'

export const metadata: Metadata = {
  title: 'Connie - Communication Platform for Nonprofits',
  description: 'Future home of Connie.one - Empowering community-based organizations through secure communication technology.',
}

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white flex flex-col">
      <div className="flex-1 flex items-center justify-center px-6">
        <div className="max-w-3xl w-full text-center space-y-8">
          {/* Logo */}
          <div className="flex justify-center mb-8">
            <Logo className="h-16 w-auto" />
          </div>

          {/* Main Content */}
          <div className="space-y-6">
            <h1 className="text-5xl md:text-6xl font-semibold text-slate-900 tracking-tight">
              Future Home of Connie.one
            </h1>

            <p className="text-xl md:text-2xl text-slate-600 leading-relaxed max-w-2xl mx-auto">
              Empowering community-based organizations through secure communication technology
            </p>
          </div>

          {/* Links */}
          <div className="pt-8 flex flex-wrap justify-center gap-4">
            <Link
              href="/dataroom"
              className="inline-block px-6 py-3 bg-slate-900 text-white font-medium rounded-lg hover:bg-slate-800 transition-colors"
            >
              Document Portal
            </Link>
            <Link
              href="/dataroom/user-acceptance-testing/discovery"
              className="inline-block px-6 py-3 bg-indigo-600 text-white font-medium rounded-lg hover:bg-indigo-700 transition-colors"
            >
              UAT Discovery Form
            </Link>
          </div>
        </div>
      </div>

      {/* Footer Note */}
      <div className="py-8 text-center text-sm text-slate-500">
        <p>© 2025 Nevada Senior Services, Inc. All rights reserved.</p>
      </div>
    </div>
  )
}
