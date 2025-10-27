'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'

interface Document {
  id: string
  title: string
  description?: string
  url?: string
  filename?: string
  filesize?: number
  mimeType?: string
  source: 'upload' | 'external'
  createdAt: string
  updatedAt: string
}

export default function TechnicalDocumentsInvestorPage() {
  const [documents, setDocuments] = useState<Document[]>([])
  const [loading, setLoading] = useState(true)
  const [isAuthenticated, setIsAuthenticated] = useState(true)  // TEMP: Auth disabled for content setup

  useEffect(() => {
    // TEMP: Auth disabled for content setup - just load documents
    const loadData = async () => {
      await loadDocuments()
      setLoading(false)
    }
    loadData()
  }, [])

  const loadDocuments = async () => {
    try {
      const docs: Document[] = []

      // Fetch from Media collection (uploaded files)
      const mediaResponse = await fetch('/api/media?where[isDataroomDocument][equals]=true&where[documentCategory][equals]=technical')
      if (mediaResponse.ok) {
        const mediaData = await mediaResponse.json()
        const mediaDocuments = mediaData.docs.map((doc: any) => ({
          id: doc.id,
          title: doc.filename || doc.alt || 'Untitled Document',
          description: doc.documentDescription,
          filename: doc.filename,
          filesize: doc.filesize,
          mimeType: doc.mimeType,
          url: doc.url,
          source: 'upload' as const,
          createdAt: doc.createdAt,
          updatedAt: doc.updatedAt
        }))
        docs.push(...mediaDocuments)
      }

      // Fetch from ExternalDocuments collection
      const externalResponse = await fetch('/api/external-documents?where[documentCategory][equals]=technical')
      if (externalResponse.ok) {
        const externalData = await externalResponse.json()
        const externalDocuments = externalData.docs.map((doc: any) => ({
          id: doc.id,
          title: doc.title,
          description: doc.documentDescription,
          url: doc.externalUrl,
          source: 'external' as const,
          createdAt: doc.createdAt,
          updatedAt: doc.updatedAt
        }))
        docs.push(...externalDocuments)
      }

      // Sort by creation date (newest first)
      docs.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
      setDocuments(docs)
    } catch (error) {
      console.error('Error loading documents:', error)
    }
  }

  const formatFileSize = (bytes?: number) => {
    if (!bytes) return ''
    const sizes = ['Bytes', 'KB', 'MB', 'GB']
    const i = Math.floor(Math.log(bytes) / Math.log(1024))
    return `${Math.round(bytes / Math.pow(1024, i) * 100) / 100} ${sizes[i]}`
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    })
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-200 flex items-center justify-center">
        <div className="text-slate-600">Loading documents...</div>
      </div>
    )
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-200 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-medium text-slate-800 mb-4">Authentication Required</h1>
          <p className="text-slate-600 mb-6">Please log in to access technical documentation.</p>
          {/* eslint-disable-next-line @next/next/no-html-link-for-pages */}
          <a
            href="/api/auth/okta"
            className="inline-flex items-center px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors"
          >
            Login with Okta
          </a>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-200 text-slate-800">
      {/* Dot Matrix Background */}
      <div className="dot-matrix fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[600px] pointer-events-none z-0 opacity-100">
        <div className="dot absolute w-1 h-1 bg-slate-400 rounded-full opacity-40" style={{top: '10%', left: '15%', animationDelay: '0s'}}></div>
        <div className="dot absolute w-1 h-1 bg-slate-500 rounded-full opacity-30" style={{top: '20%', left: '25%', animationDelay: '-1s'}}></div>
        <div className="dot absolute w-1 h-1 bg-slate-400 rounded-full opacity-40" style={{top: '30%', left: '35%', animationDelay: '-2s'}}></div>
        <div className="dot absolute w-1 h-1 bg-slate-500 rounded-full opacity-30" style={{top: '40%', left: '45%', animationDelay: '-3s'}}></div>
        <div className="dot absolute w-1 h-1 bg-slate-400 rounded-full opacity-40" style={{top: '50%', left: '55%', animationDelay: '-4s'}}></div>
        <div className="dot absolute w-1 h-1 bg-slate-500 rounded-full opacity-30" style={{top: '60%', left: '65%', animationDelay: '-5s'}}></div>
      </div>

      <div className="container mx-auto px-6 py-16 relative z-10">
        {/* Breadcrumb Navigation */}
        <div className="mb-8">
          <div className="flex items-center space-x-2 text-sm text-slate-600">
            <Link href="/dataroom-portal" className="hover:text-slate-800 transition-colors">
              Document Portal
            </Link>
            <span>→</span>
            <Link href="/dataroom-portal/investors" className="hover:text-slate-800 transition-colors">
              Investor DataRoom
            </Link>
            <span>→</span>
            <span className="text-slate-800 font-medium">Technical Documentation</span>
          </div>
        </div>

        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-light text-slate-800 mb-4">
            🔧 Technical Documentation
          </h1>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Architecture docs, API documentation, security reports
          </p>
        </div>

        {/* Document List */}
        <div className="max-w-4xl mx-auto">
          {documents.length === 0 ? (
            <div className="text-center py-12">
              <div className="text-4xl mb-4">📄</div>
              <h3 className="text-xl font-medium text-slate-700 mb-2">No documents available</h3>
              <p className="text-slate-600">Technical documentation will appear here when added by administrators.</p>
            </div>
          ) : (
            <div className="space-y-4">
              {documents.map((doc) => (
                <div key={doc.id} className="bg-white/60 backdrop-blur-sm rounded-xl p-6 border border-slate-200 hover:bg-white/80 transition-all duration-200">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <div className="text-2xl">
                          {doc.source === 'external' ? '🔗' : '📄'}
                        </div>
                        <h3 className="text-lg font-medium text-slate-800">
                          {doc.title}
                        </h3>
                        <span className={`inline-block px-2 py-1 text-xs rounded-full ${
                          doc.source === 'external' 
                            ? 'bg-blue-100 text-blue-700' 
                            : 'bg-green-100 text-green-700'
                        }`}>
                          {doc.source === 'external' ? 'External Link' : 'Uploaded File'}
                        </span>
                      </div>
                      
                      {doc.description && (
                        <p className="text-slate-600 mb-3">{doc.description}</p>
                      )}
                      
                      <div className="flex items-center space-x-4 text-sm text-slate-500">
                        <span>Added {formatDate(doc.createdAt)}</span>
                        {doc.filesize && (
                          <span>{formatFileSize(doc.filesize)}</span>
                        )}
                        {doc.mimeType && (
                          <span className="uppercase">{doc.mimeType.split('/')[1]}</span>
                        )}
                      </div>
                    </div>
                    
                    <div className="ml-6">
                      {doc.source === 'external' ? (
                        <a
                          href={doc.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-lg transition-colors"
                        >
                          <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                          </svg>
                          Open External
                        </a>
                      ) : (
                        <a
                          href={doc.url}
                          download
                          className="inline-flex items-center px-4 py-2 bg-green-600 hover:bg-green-700 text-white text-sm font-medium rounded-lg transition-colors"
                        >
                          <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                          </svg>
                          Download
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}