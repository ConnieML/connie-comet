'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'

export default function InvestorDataroomPage() {
  const [categoryCounts, setCategoryCounts] = useState<Record<string, number>>({})
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [authLoading, setAuthLoading] = useState(true)

  useEffect(() => {
    // Check authentication status
    const checkAuth = async () => {
      try {
        const response = await fetch('/api/users/me', {
          credentials: 'include'
        })
        
        // Check if we got actual user data (not a redirect)
        if (response.ok && !response.redirected && response.headers.get('content-type')?.includes('application/json')) {
          const data = await response.json()
          setIsAuthenticated(!!data.user)
        } else {
          setIsAuthenticated(false)
        }
      } catch (error) {
        console.error('Auth check failed:', error)
        setIsAuthenticated(false)
      } finally {
        setAuthLoading(false)
      }
    }
    
    checkAuth()
  }, [])

  useEffect(() => {
    // Fetch document counts for each category from both collections
    const fetchCounts = async () => {
      const categories = ['financial', 'legal', 'business', 'technical']
      const counts: Record<string, number> = {}
      
      for (const category of categories) {
        try {
          // Fetch from Media collection (uploaded files)
          const mediaResponse = await fetch(`/api/media?where[isDataroomDocument][equals]=true&where[documentCategory][equals]=${category}&limit=0`)
          let mediaCount = 0
          if (mediaResponse.ok) {
            const mediaData = await mediaResponse.json()
            mediaCount = mediaData.totalDocs || 0
          }

          // Fetch from ExternalDocuments collection (external links)
          const externalResponse = await fetch(`/api/external-documents?where[documentCategory][equals]=${category}&limit=0`)
          let externalCount = 0
          if (externalResponse.ok) {
            const externalData = await externalResponse.json()
            externalCount = externalData.totalDocs || 0
          }

          // Combine counts from both collections
          counts[category] = mediaCount + externalCount
        } catch (error) {
          console.error(`Error fetching count for ${category}:`, error)
          counts[category] = 0
        }
      }
      
      setCategoryCounts(counts)
    }
    
    fetchCounts()
  }, [])

  const categories = [
    {
      category: 'quarterly',
      label: 'Quarterly Business Review',
      count: 1,
      icon: '📈',
      description: 'Go-to-market strategy and quarterly performance metrics',
      isSpecial: true
    },
    {
      category: 'financial',
      label: 'Financial Reports',
      count: categoryCounts.financial || 0,
      icon: '📊',
      description: 'Quarterly reports, audited statements, financial projections'
    },
    {
      category: 'legal',
      label: 'Legal Documents', 
      count: categoryCounts.legal || 0,
      icon: '📋',
      description: 'Contracts, compliance documents, regulatory filings'
    },
    {
      category: 'business',
      label: 'Business Operations',
      count: categoryCounts.business || 0,
      icon: '🎯',
      description: 'Business plans, market analysis, operational KPIs'
    },
    {
      category: 'technical',
      label: 'Technical Documentation',
      count: categoryCounts.technical || 0,
      icon: '🔧',
      description: 'Architecture docs, API documentation, security reports'
    }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-200 text-slate-800 relative overflow-hidden">
      {/* Dot Matrix Background */}
      <div className="dot-matrix fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[600px] pointer-events-none z-0 opacity-100">
        <div className="dot absolute w-1 h-1 bg-slate-400 rounded-full opacity-40" style={{top: '10%', left: '15%', animationDelay: '0s'}}></div>
        <div className="dot absolute w-1 h-1 bg-slate-500 rounded-full opacity-30" style={{top: '20%', left: '25%', animationDelay: '-1s'}}></div>
        <div className="dot absolute w-1 h-1 bg-slate-400 rounded-full opacity-40" style={{top: '30%', left: '35%', animationDelay: '-2s'}}></div>
        <div className="dot absolute w-1 h-1 bg-slate-500 rounded-full opacity-30" style={{top: '40%', left: '45%', animationDelay: '-3s'}}></div>
        <div className="dot absolute w-1 h-1 bg-slate-400 rounded-full opacity-40" style={{top: '50%', left: '55%', animationDelay: '-4s'}}></div>
        <div className="dot absolute w-1 h-1 bg-slate-500 rounded-full opacity-30" style={{top: '60%', left: '65%', animationDelay: '-5s'}}></div>
        <div className="dot absolute w-1 h-1 bg-slate-400 rounded-full opacity-40" style={{top: '70%', left: '75%', animationDelay: '-6s'}}></div>
        <div className="dot absolute w-1 h-1 bg-slate-500 rounded-full opacity-30" style={{top: '80%', left: '85%', animationDelay: '-7s'}}></div>
        <div className="dot absolute w-1 h-1 bg-slate-400 rounded-full opacity-40" style={{top: '15%', left: '80%', animationDelay: '-8s'}}></div>
        <div className="dot absolute w-1 h-1 bg-slate-500 rounded-full opacity-30" style={{top: '25%', left: '70%', animationDelay: '-9s'}}></div>
        <div className="dot absolute w-1 h-1 bg-slate-400 rounded-full opacity-40" style={{top: '35%', left: '60%', animationDelay: '-10s'}}></div>
        <div className="dot absolute w-1 h-1 bg-slate-500 rounded-full opacity-30" style={{top: '45%', left: '50%', animationDelay: '-11s'}}></div>
      </div>
      <div className="container mx-auto px-6 py-16 relative z-10">
        {/* Breadcrumb Navigation */}
        <div className="mb-8">
          <Link 
            href="/dataroom-portal" 
            className="inline-flex items-center text-slate-600 hover:text-slate-800 transition-colors text-sm font-medium"
          >
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Document Portal
          </Link>
        </div>
        
        <div className="text-center mb-16">
          <h1 className="text-5xl font-light text-slate-800 mb-6">
            🔒 Investor DataRoom
          </h1>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto mb-4">
            Curated documents and financial information for stakeholders and investors
          </p>
          
          {authLoading ? (
            <div className="inline-block px-4 py-2 bg-white/60 backdrop-blur-sm border border-slate-300 rounded-full">
              <span className="text-sm text-slate-600">Checking access...</span>
            </div>
          ) : isAuthenticated ? (
            <div className="flex items-center justify-center gap-3">
              <div className="inline-flex items-center px-4 py-2 bg-green-50 backdrop-blur-sm border border-green-200 rounded-full">
                <svg className="w-4 h-4 mr-2 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span className="text-sm text-green-700">Authenticated</span>
              </div>
              <a
                href="https://connie.one"
                className="inline-flex items-center px-4 py-2 bg-slate-100 hover:bg-slate-200 border border-slate-300 rounded-full transition-colors"
              >
                <svg className="w-4 h-4 mr-2 text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                </svg>
                <span className="text-sm text-slate-600">Logout</span>
              </a>
            </div>
          ) : (
            <div className="flex items-center justify-center gap-3">
              <div className="inline-block px-4 py-2 bg-red-50 backdrop-blur-sm border border-red-200 rounded-full">
                <span className="text-sm text-red-700">Secure Access Required</span>
              </div>
              {/* eslint-disable-next-line @next/next/no-html-link-for-pages */}
              <a
                href="/api/auth/okta"
                className="inline-flex items-center px-4 py-2 bg-purple-500 hover:bg-purple-600 text-white rounded-full transition-colors"
              >
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013 3v1" />
                </svg>
                <span className="text-sm">Login</span>
              </a>
            </div>
          )}
        </div>

        {/* Category Grid */}
        <div className="max-w-4xl mx-auto">
          <div className="grid gap-6">
            {categories.map((category) => {
              const isClickable = true  // TEMP: Auth disabled for content setup

              const content = (
                <div className={`backdrop-blur-sm rounded-2xl p-8 transition-all duration-300 shadow-lg ${
                  isClickable 
                    ? 'hover:transform hover:scale-[1.02] hover:shadow-xl hover:bg-white/80' 
                    : 'opacity-75'
                } ${
                  category.isSpecial 
                    ? 'bg-gradient-to-br from-blue-50 to-purple-50 border-2 border-blue-200' + (isClickable ? ' hover:border-blue-400' : '')
                    : 'bg-white/60 border border-slate-200' + (isClickable ? ' hover:border-purple-500/50' : '')
                }`}>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className="text-4xl">{category.icon}</div>
                      <div>
                        <h3 className="text-2xl font-medium text-slate-800 mb-2">
                          {category.label}
                        </h3>
                        <p className="text-slate-600">
                          {category.description}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className={`text-3xl font-light mb-1 ${isAuthenticated ? 'text-purple-600' : 'text-slate-400'}`}>
                        {category.count}
                      </div>
                      <div className="text-sm text-slate-500">
                        {category.count === 1 ? 'document' : 'documents'}
                      </div>
                    </div>
                  </div>
                </div>
              )
              
              if (isClickable) {
                return (
                  <Link
                    key={category.category}
                    href={`/dataroom-portal/investors/${category.category}`}
                    className="group"
                  >
                    {content}
                  </Link>
                )
              } else {
                return (
                  <div
                    key={category.category}
                    className="group cursor-not-allowed"
                  >
                    {content}
                  </div>
                )
              }
            })}
          </div>

          <div className="text-center mt-12">
            <p className="text-slate-600 text-sm">
              Access levels are managed based on your user permissions.{' '}
              <Link href="/contact" className="text-purple-600 hover:text-purple-800 underline">
                Contact us
              </Link>{' '}
              if you need additional access.
            </p>
            
            <div className="mt-4">
              <span className="inline-block px-3 py-1 bg-purple-100 text-purple-700 text-xs rounded-full border border-purple-300">
                INVESTOR DATAROOM • Secure Access
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}