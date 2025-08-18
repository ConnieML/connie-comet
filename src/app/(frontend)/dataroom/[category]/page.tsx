'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'

interface PageProps {
  params: Promise<{
    category: string
  }>
}

const categoryLabels: Record<string, { label: string; icon: string; description: string }> = {
  financial: {
    label: 'Financial Reports',
    icon: '📊',
    description: 'Quarterly reports, audited statements, financial projections'
  },
  legal: {
    label: 'Legal Documents',
    icon: '📋', 
    description: 'Contracts, compliance documents, regulatory filings'
  },
  business: {
    label: 'Business Operations',
    icon: '🎯',
    description: 'Business plans, market analysis, operational KPIs, UAT reports, product testing'
  },
  technical: {
    label: 'Technical Documentation',
    icon: '🔧',
    description: 'Architecture docs, API documentation, security reports'
  },
}

export default function CategoryPage({ params }: PageProps) {
  const [category, setCategory] = useState<string>('')
  const [docs, setDocs] = useState<any[]>([])

  useEffect(() => {
    // Extract category from params and fetch real documents
    const getCategory = async () => {
      const resolvedParams = await params
      setCategory(resolvedParams.category)
      
      try {
        // Fetch documents from PayloadCMS API
        const response = await fetch('/api/media?where[isDataroomDocument][equals]=true&where[documentCategory][equals]=' + resolvedParams.category + '&limit=50')
        
        if (response.ok) {
          const data = await response.json()
          console.log('Fetched documents:', data.docs)
          setDocs(data.docs || [])
        } else {
          console.error('Failed to fetch documents:', response.status)
          setDocs([])
        }
      } catch (error) {
        console.error('Error fetching documents:', error)
        setDocs([])
      }
    }
    
    getCategory()
  }, [params])

  const categoryInfo = categoryLabels[category]
  
  if (!categoryInfo) {
    return <div>Category not found</div>
  }

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
        {/* Back Navigation */}
        <div className="mb-8">
          <Link 
            href="/dataroom"
            className="inline-flex items-center text-slate-600 hover:text-slate-800 transition-colors"
          >
            ← Back to Categories
          </Link>
        </div>

        {/* Category Header */}
        <div className="text-center mb-12">
          <div className="text-6xl mb-4">{categoryInfo.icon}</div>
          <h1 className="text-4xl font-light text-slate-800 mb-4">
            {categoryInfo.label}
          </h1>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto">
            {categoryInfo.description}
          </p>
        </div>

        {/* Documents Grid */}
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            
            {/* Special UAT Hub Card for Business Category */}
            {category === 'business' && (
              <Link
                href="/dataroom/user-acceptance-testing"
                className="group"
              >
                <div className="bg-gradient-to-br from-green-50 to-blue-50 border-2 border-green-200 rounded-xl p-6 hover:from-green-100 hover:to-blue-100 hover:border-green-300 transition-all duration-300 hover:transform hover:scale-[1.02] shadow-lg hover:shadow-xl">
                  {/* UAT Icon */}
                  <div className="text-center mb-4">
                    <div className="text-4xl mb-2">🧪</div>
                    <div className="inline-block px-2 py-1 bg-green-100 text-green-700 text-xs rounded-full border border-green-300">
                      UAT HUB
                    </div>
                  </div>

                  {/* UAT Info */}
                  <div className="text-center">
                    <h3 className="text-lg font-medium text-slate-800 mb-2 group-hover:text-green-600 transition-colors">
                      User Acceptance & Beta Testing
                    </h3>
                    
                    <p className="text-sm text-slate-600 mb-3">
                      Comprehensive testing resources, interactive dashboards, documentation, and beta feedback programs
                    </p>

                    <div className="flex justify-between items-center text-xs text-slate-600 mb-3">
                      <span>TESTING HUB</span>
                      <span>📊 Resources</span>
                    </div>
                    
                    <div className="text-xs text-green-600 font-medium">
                      Explore UAT Resources →
                    </div>
                  </div>
                </div>
              </Link>
            )}

            {/* Regular Documents */}
            {docs.length > 0 && docs.map((doc: any) => (
              <Link
                key={doc.id}
                href={`/dataroom/view/${doc.id}`}
                className="group"
              >
                <div className="bg-white/60 backdrop-blur-sm border border-slate-200 rounded-xl p-6 hover:bg-white/80 hover:border-pink-500/50 transition-all duration-300 hover:transform hover:scale-[1.02] shadow-lg hover:shadow-xl">
                  {/* File Icon */}
                  <div className="text-center mb-4">
                    <div className="text-4xl mb-2">
                      {doc.mimeType?.includes('pdf') ? '📄' : 
                       doc.mimeType?.includes('image') ? '🖼️' :
                       doc.mimeType?.includes('spreadsheet') || doc.mimeType?.includes('excel') ? '📊' :
                       '📄'}
                    </div>
                  </div>

                  {/* Document Info */}
                  <div className="text-center">
                    <h3 className="text-lg font-medium text-slate-800 mb-2 group-hover:text-pink-600 transition-colors">
                      {doc.alt || doc.filename}
                    </h3>
                    
                    {doc.documentDescription && (
                      <p className="text-sm text-slate-600 mb-3 line-clamp-2">
                        {doc.documentDescription}
                      </p>
                    )}

                    <div className="flex justify-between items-center text-xs text-slate-600">
                      <span>
                        {doc.mimeType?.split('/')[1]?.toUpperCase() || 'FILE'}
                      </span>
                      <span>
                        {doc.filesize ? `${Math.round(doc.filesize / 1024)} KB` : ''}
                      </span>
                    </div>

                    {/* Access Level Badge */}
                    <div className="mt-3">
                      <span className={`inline-block px-2 py-1 rounded-full text-xs ${
                        doc.accessLevel === 'public' ? 'bg-green-100 text-green-700 border border-green-300' :
                        doc.accessLevel === 'investors' ? 'bg-blue-100 text-blue-700 border border-blue-300' :
                        doc.accessLevel === 'board' ? 'bg-purple-100 text-purple-700 border border-purple-300' :
                        'bg-red-100 text-red-700 border border-red-300'
                      }`}>
                        {doc.accessLevel || 'public'}
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
          
          {/* Show "No Documents Yet" message only if business category has no docs and no UAT card */}
          {docs.length === 0 && category !== 'business' && (
            <div className="text-center py-16">
              <div className="text-6xl mb-4">📂</div>
              <h3 className="text-2xl font-light text-slate-800 mb-4">No Documents Yet</h3>
              <p className="text-slate-600">
                Documents in this category will appear here once uploaded.
              </p>
            </div>
          )}
          
          {/* Special message for business category when no docs */}
          {docs.length === 0 && category === 'business' && (
            <div className="text-center py-16">
              <div className="text-6xl mb-4">📂</div>
              <h3 className="text-2xl font-light text-slate-800 mb-4">Business Documents Coming Soon</h3>
              <p className="text-slate-600">
                Check out the UAT Testing Dashboard above, or additional business documents will appear here once uploaded.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export const dynamic = 'force-dynamic'