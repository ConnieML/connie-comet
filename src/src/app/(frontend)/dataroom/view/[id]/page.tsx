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
      
      try {
        // Fetch the real document from PayloadCMS
        const response = await fetch(`/api/media/${resolvedParams.id}`)
        
        if (response.ok) {
          const data = await response.json()
          console.log('Fetched document:', data)
          setDoc(data)
        } else {
          console.error('Failed to fetch document:', response.status)
          setDoc(null)
        }
      } catch (error) {
        console.error('Error fetching document:', error)
        setDoc(null)
      }
      
      setLoading(false)
    }
    
    loadDocument()
  }, [params])

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-200 text-slate-800">
        <div className="container mx-auto px-6 py-8">Loading...</div>
      </div>
    )
  }

  if (!doc) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-200 text-slate-800">
        <div className="container mx-auto px-6 py-8">Document not found</div>
      </div>
    )
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
      <div className="container mx-auto px-6 py-8 relative z-10">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center space-x-4">
              <Link 
                href={`/dataroom/${doc.documentCategory || ''}`}
                className="inline-flex items-center text-slate-600 hover:text-slate-800 transition-colors"
              >
                ← Back to {categoryLabels[doc.documentCategory as string] || 'Documents'}
              </Link>
            </div>
            
            <div className="flex items-center space-x-4">
              {/* Download Button */}
              <a
                href={doc.url || '#'}
                download={doc.filename}
                className="inline-flex items-center px-4 py-2 bg-pink-600 hover:bg-pink-700 text-white rounded-lg transition-colors"
              >
                🔽 Download
              </a>
              
              {/* Share Button */}
              <button
                onClick={() => alert('Demo: Share functionality')}
                className="inline-flex items-center px-4 py-2 bg-slate-600 hover:bg-slate-500 text-white rounded-lg transition-colors"
              >
                🔗 Share
              </button>
            </div>
          </div>

          {/* Document Info */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-light text-slate-800 mb-4">
              {doc.alt || doc.filename}
            </h1>
            
            {doc.documentDescription && (
              <p className="text-lg text-slate-600 max-w-3xl mx-auto mb-4">
                {doc.documentDescription}
              </p>
            )}

            <div className="flex justify-center items-center space-x-6 text-sm text-slate-600">
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
          <div className="bg-white/60 backdrop-blur-sm border border-slate-200 rounded-2xl p-8 shadow-lg">
              {doc.mimeType?.includes('pdf') ? (
                // PDF Viewer
                <div className="w-full">
                  <iframe
                    src={doc.url}
                    className="w-full h-[800px] rounded-lg border"
                    title={doc.alt || doc.filename}
                  />
                  <div className="text-center mt-4">
                    <p className="text-slate-600 text-sm">
                      {doc.alt || doc.filename} • PDF Document
                    </p>
                  </div>
                </div>
              ) : doc.mimeType?.includes('image') ? (
                // Image Viewer
                <div className="text-center">
                  <img
                    src={doc.url || '#'}
                    alt={doc.alt || doc.filename}
                    className="max-w-full h-auto rounded-lg mx-auto"
                  />
                </div>
              ) : (
                // Generic File
                <div className="text-center py-16">
                  <div className="text-6xl mb-4">📄</div>
                  <h3 className="text-2xl font-light text-slate-800 mb-4">
                    {doc.alt || doc.filename}
                  </h3>
                  <p className="text-slate-600 mb-6">
                    This file type cannot be previewed in the browser.
                  </p>
                  <a
                    href={doc.url || '#'}
                    download={doc.filename}
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
            <p className="text-slate-600 text-xs">
              CONFIDENTIAL - Connie Corp Data Room - {new Date().toLocaleDateString()}
            </p>
            <div className="mt-2">
              <span className="inline-block px-2 py-1 bg-pink-100 text-pink-700 text-xs rounded border border-pink-300">
                DEMO VERSION
              </span>
            </div>
          </div>
      </div>
    </div>
  )
}

export const dynamic = 'force-dynamic'