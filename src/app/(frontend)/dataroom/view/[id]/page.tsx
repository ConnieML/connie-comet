'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'

interface PageProps {
  params: Promise<{
    id: string
  }>
}

const categoryLabels: Record<string, string> = {
  financial: 'Financial Reports',
  legal: 'Legal Documents',
  business: 'Business Operations', 
  technical: 'Technical Documentation',
}

export default function DocumentViewPage({ params }: PageProps) {
  const [doc, setDoc] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadDocument = async () => {
      const resolvedParams = await params
      
      // Mock document for demo
      const mockDoc = {
        id: resolvedParams.id,
        alt: 'Q4 2024 Financial Report',
        documentDescription: 'Comprehensive quarterly financial analysis and projections for Q4 2024',
        documentCategory: 'financial',
        accessLevel: 'public',
        mimeType: 'application/pdf',
        filesize: 2400000,
        url: '#demo-document'
      }
      
      setDoc(mockDoc)
      setLoading(false)
    }
    
    loadDocument()
  }, [params])

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-slate-900 to-slate-800 text-white">
        <div className="container mx-auto px-6 py-8">Loading...</div>
      </div>
    )
  }

  if (!doc) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-slate-900 to-slate-800 text-white">
        <div className="container mx-auto px-6 py-8">Document not found</div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 to-slate-800 text-white">
      <div className="container mx-auto px-6 py-8">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center space-x-4">
              <Link 
                href={`/dataroom/${doc.documentCategory || ''}`}
                className="inline-flex items-center text-slate-400 hover:text-white transition-colors"
              >
                ← Back to {categoryLabels[doc.documentCategory as string] || 'Documents'}
              </Link>
            </div>
            
            <div className="flex items-center space-x-4">
              {/* Download Button */}
              <button
                onClick={() => alert('Demo: Download functionality')}
                className="inline-flex items-center px-4 py-2 bg-pink-600 hover:bg-pink-700 text-white rounded-lg transition-colors"
              >
                🔽 Download
              </button>
              
              {/* Share Button */}
              <button
                onClick={() => alert('Demo: Share functionality')}
                className="inline-flex items-center px-4 py-2 bg-slate-700 hover:bg-slate-600 text-white rounded-lg transition-colors"
              >
                🔗 Share
              </button>
            </div>
          </div>

          {/* Document Info */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-light text-white mb-4">
              {doc.alt || doc.filename}
            </h1>
            
            {doc.documentDescription && (
              <p className="text-lg text-slate-300 max-w-3xl mx-auto mb-4">
                {doc.documentDescription}
              </p>
            )}

            <div className="flex justify-center items-center space-x-6 text-sm text-slate-400">
              <span>
                Category: {categoryLabels[doc.documentCategory as string] || 'Uncategorized'}
              </span>
              <span>
                Access: {doc.accessLevel || 'public'}
              </span>
              <span>
                Size: {doc.filesize ? `${Math.round(doc.filesize / 1024)} KB` : 'Unknown'}
              </span>
            </div>
          </div>

        {/* Document Viewer */}
        <div className="max-w-5xl mx-auto">
          <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8">
              {doc.mimeType?.includes('pdf') ? (
                // PDF Viewer Demo
                <div className="w-full">
                  <div className="w-full h-[800px] rounded-lg bg-gray-100 dark:bg-gray-800 flex items-center justify-center">
                    <div className="text-center">
                      <div className="text-6xl mb-4">📄</div>
                      <h3 className="text-2xl font-light text-gray-700 dark:text-gray-300 mb-4">
                        PDF Viewer Demo
                      </h3>
                      <p className="text-gray-500 dark:text-gray-400">
                        In production, this would display the actual PDF document
                      </p>
                    </div>
                  </div>
                  <div className="text-center mt-4">
                    <p className="text-slate-400 text-sm">
                      Demo Mode - PDF Viewer Integration
                    </p>
                  </div>
                </div>
              ) : doc.mimeType?.includes('image') ? (
                // Image Viewer
                <div className="text-center">
                  <img
                    src={documentUrl}
                    alt={doc.alt || doc.filename}
                    className="max-w-full h-auto rounded-lg mx-auto"
                  />
                </div>
              ) : (
                // Generic File
                <div className="text-center py-16">
                  <div className="text-6xl mb-4">📄</div>
                  <h3 className="text-2xl font-light text-white mb-4">
                    {doc.alt || doc.filename}
                  </h3>
                  <p className="text-slate-400 mb-6">
                    This file type cannot be previewed in the browser.
                  </p>
                  <a
                    href={documentUrl}
                    download
                    className="inline-flex items-center px-6 py-3 bg-pink-600 hover:bg-pink-700 text-white rounded-lg transition-colors"
                  >
                    🔽 Download to View
                  </a>
                </div>
              )}
            </div>
          </div>

          {/* Watermark */}
          <div className="text-center mt-8">
            <p className="text-slate-500 text-xs">
              CONFIDENTIAL - Connie Corp Data Room - {new Date().toLocaleDateString()}
            </p>
            <div className="mt-2">
              <span className="inline-block px-2 py-1 bg-pink-500/20 text-pink-400 text-xs rounded border border-pink-500/30">
                DEMO VERSION
              </span>
            </div>
          </div>
      </div>
    </div>
  )
}

export const dynamic = 'force-dynamic'