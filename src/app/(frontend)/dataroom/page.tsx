'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'

export default function DataroomPage() {
  const [categoryCounts, setCategoryCounts] = useState<Record<string, number>>({})

  useEffect(() => {
    // Fetch document counts for each category
    const fetchCounts = async () => {
      const categories = ['financial', 'legal', 'business', 'technical']
      const counts: Record<string, number> = {}
      
      for (const category of categories) {
        try {
          const response = await fetch(`/api/media?where[isDataroomDocument][equals]=true&where[documentCategory][equals]=${category}&limit=0`)
          if (response.ok) {
            const data = await response.json()
            counts[category] = data.totalDocs || 0
          }
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
      label: 'Financial Reports & Tools',
      count: 7,
      icon: '📊',
      description: 'Interactive calculators, pricing models, unit economics, cash flow projections'
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
        <div className="text-center mb-16">
          <h1 className="text-5xl font-light text-slate-800 mb-6">
            🔒 Connie Corp Data Room
          </h1>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto mb-4">
            Secure access to corporate documents and financial information for stakeholders
          </p>
          
          <div className="inline-block px-4 py-2 bg-white/60 backdrop-blur-sm border border-slate-300 rounded-full">
            <span className="text-sm text-slate-600">
              Public Access • Demo Mode
            </span>
          </div>
        </div>

        {/* Category Grid */}
        <div className="max-w-4xl mx-auto">
          <div className="grid gap-6">
            {categories.map((category) => (
              <Link
                key={category.category}
                href={`/dataroom/${category.category}`}
                className="group"
              >
                <div className={`backdrop-blur-sm rounded-2xl p-8 transition-all duration-300 hover:transform hover:scale-[1.02] shadow-lg hover:shadow-xl ${
                  category.isSpecial 
                    ? 'bg-gradient-to-br from-blue-50 to-purple-50 border-2 border-blue-200 hover:border-blue-400' 
                    : 'bg-white/60 border border-slate-200 hover:bg-white/80 hover:border-pink-500/50'
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
                      <div className="text-3xl font-light text-pink-600 mb-1">
                        {category.count}
                      </div>
                      <div className="text-sm text-slate-500">
                        {category.count === 1 ? 'document' : 'documents'}
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          <div className="text-center mt-12">
            <p className="text-slate-600 text-sm">
              Access levels are managed based on your user permissions. 
              Contact admin if you need additional access.
            </p>
            
            <div className="mt-4">
              <span className="inline-block px-3 py-1 bg-pink-100 text-pink-700 text-xs rounded-full border border-pink-300">
                DEMO DATAROOM • Showcase Version
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}