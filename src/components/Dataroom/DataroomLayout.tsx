'use client'

import React from 'react'
import { ThemeProvider } from './ThemeProvider'
import { DataroomHeader } from './Header'
import { DataroomFooter } from './Footer'

interface DataroomLayoutProps {
  children: React.ReactNode
}

export function DataroomLayout({ children }: DataroomLayoutProps) {
  return (
    <ThemeProvider>
      <div className="dataroom-bg">
        <DataroomHeader />
        {children}
        <DataroomFooter />
      </div>
    </ThemeProvider>
  )
}