import { getCachedGlobal } from '@/utilities/getGlobals'
import Link from 'next/link'
import React from 'react'

import type { Footer } from '@/payload-types'

import { ThemeSelector } from '@/providers/Theme/ThemeSelector'
import { CMSLink } from '@/components/Link'
import { Logo } from '@/components/Logo/Logo'

export async function Footer() {
  const footerData: Footer = await getCachedGlobal('footer', 1)()

  const navItems = footerData?.navItems || []
  const footerColumns = footerData?.footerColumns || []

  return (
    <footer className="mt-auto border-t border-border bg-black dark:bg-card text-white">
      <div className="container py-8 gap-8 flex flex-col">
        {/* Top section with logo and nav items */}
        <div className="flex flex-col md:flex-row md:justify-between gap-8">
          <Link className="flex items-center" href="/">
            <Logo />
          </Link>

          <div className="flex flex-col-reverse items-start md:flex-row gap-4 md:items-center">
            <ThemeSelector />
            <nav className="flex flex-col md:flex-row gap-4">
              {navItems.map(({ link }, i) => {
                return <CMSLink className="text-white" key={i} {...link} />
              })}
            </nav>
          </div>
        </div>

        {/* Footer columns section */}
        {footerColumns.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-8 border-t border-border/20">
            {footerColumns.map((column, columnIndex) => (
              <div key={columnIndex} className="flex flex-col gap-4">
                <h3 className="font-semibold text-white">{column.title}</h3>
                <nav className="flex flex-col gap-2">
                  {column.links?.map(({ link }, linkIndex) => (
                    <CMSLink 
                      key={linkIndex} 
                      className="text-gray-300 hover:text-white transition-colors" 
                      {...link} 
                    />
                  ))}
                </nav>
              </div>
            ))}
          </div>
        )}

        {/* Copyright section */}
        <div className="pt-8 border-t border-border/20">
          <p className="text-gray-400 text-sm">
            Copyright © 2025, Nevada Senior Services. All Rights Reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}
