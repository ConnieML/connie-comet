'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'

interface DocumentData {
  id: string
  alt?: string
  filename: string
  mimeType?: string
  documentDescription?: string
  filesize?: number
  accessLevel?: 'public' | 'investors' | 'board' | 'admin'
}

export default function ProductDevelopmentPage() {
  const [docs, setDocs] = useState<DocumentData[]>([])

  useEffect(() => {
    const fetchDocs = async () => {
      try {
        const response = await fetch('/api/media?where[isDataroomDocument][equals]=true&where[documentCategory][equals]=product-development&limit=50')
        
        if (response.ok) {
          const data = await response.json()
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
    
    fetchDocs()
  }, [])

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
            href="/dataroom/business"
            className="inline-flex items-center text-slate-600 hover:text-slate-800 transition-colors"
          >
            ← Back to Business Operations
          </Link>
        </div>

        {/* Product Development Header */}
        <div className="text-center mb-12">
          <div className="text-6xl mb-4">🚀</div>
          <h1 className="text-4xl font-light text-slate-800 mb-4">
            Product Development
          </h1>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto">
            Product roadmaps, feature specifications, development timelines, and innovation initiatives
          </p>
        </div>

        {/* Documents Grid */}
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            
            {/* Sample Product Development Resources */}
            <div className="bg-gradient-to-br from-purple-50 to-blue-50 border-2 border-purple-200 rounded-xl p-6 transition-all duration-300 hover:transform hover:scale-[1.02] shadow-lg hover:shadow-xl">
              <div className="text-center mb-4">
                <div className="text-4xl mb-2">📋</div>
                <div className="inline-block px-2 py-1 bg-purple-100 text-purple-700 text-xs rounded-full border border-purple-300">
                  ROADMAP
                </div>
              </div>
              <div className="text-center">
                <h3 className="text-lg font-medium text-slate-800 mb-2">
                  Product Roadmap 2024
                </h3>
                <p className="text-sm text-slate-600 mb-3">
                  Strategic product development timeline and feature prioritization matrix
                </p>
                <div className="flex justify-between items-center text-xs text-slate-600 mb-3">
                  <span>PLANNING</span>
                  <span>📅 Q1-Q4 2024</span>
                </div>
                <div className="text-xs text-purple-600 font-medium">
                  View Roadmap →
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-orange-50 to-red-50 border-2 border-orange-200 rounded-xl p-6 transition-all duration-300 hover:transform hover:scale-[1.02] shadow-lg hover:shadow-xl">
              <div className="text-center mb-4">
                <div className="text-4xl mb-2">⚡</div>
                <div className="inline-block px-2 py-1 bg-orange-100 text-orange-700 text-xs rounded-full border border-orange-300">
                  FEATURES
                </div>
              </div>
              <div className="text-center">
                <h3 className="text-lg font-medium text-slate-800 mb-2">
                  Feature Specifications
                </h3>
                <p className="text-sm text-slate-600 mb-3">
                  Detailed technical specifications for upcoming platform features and enhancements
                </p>
                <div className="flex justify-between items-center text-xs text-slate-600 mb-3">
                  <span>SPECS</span>
                  <span>🔧 Technical</span>
                </div>
                <div className="text-xs text-orange-600 font-medium">
                  View Specs →
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-emerald-50 to-teal-50 border-2 border-emerald-200 rounded-xl p-6 transition-all duration-300 hover:transform hover:scale-[1.02] shadow-lg hover:shadow-xl">
              <div className="text-center mb-4">
                <div className="text-4xl mb-2">📊</div>
                <div className="inline-block px-2 py-1 bg-emerald-100 text-emerald-700 text-xs rounded-full border border-emerald-300">
                  METRICS
                </div>
              </div>
              <div className="text-center">
                <h3 className="text-lg font-medium text-slate-800 mb-2">
                  Development KPIs
                </h3>
                <p className="text-sm text-slate-600 mb-3">
                  Product development metrics, sprint velocity, and team performance indicators
                </p>
                <div className="flex justify-between items-center text-xs text-slate-600 mb-3">
                  <span>ANALYTICS</span>
                  <span>📈 Performance</span>
                </div>
                <div className="text-xs text-emerald-600 font-medium">
                  View Metrics →
                </div>
              </div>
            </div>

            {/* Dynamic Documents from CMS */}
            {docs.length > 0 && docs.map((doc: DocumentData) => (
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
          
          {/* No Documents Message */}
          {docs.length === 0 && (
            <div className="text-center py-16">
              <div className="text-6xl mb-4">🔧</div>
              <h3 className="text-2xl font-light text-slate-800 mb-4">Product Development Hub</h3>
              <p className="text-slate-600 mb-8">
                This section will contain product roadmaps, feature specifications, development timelines, and innovation resources.
              </p>
              <div className="space-y-4 max-w-lg mx-auto">
                <div className="bg-white/60 backdrop-blur-sm border border-slate-200 rounded-lg p-4">
                  <div className="text-sm text-slate-700">
                    <strong>Coming Soon:</strong> Interactive product roadmap, feature request portal, and development milestone tracking
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export const dynamic = 'force-dynamic'