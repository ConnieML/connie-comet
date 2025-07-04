'use client'

import React, { useEffect } from 'react'
import { sections } from './data.js'

export default function QuarterlyBusinessReview() {
  useEffect(() => {
    // Set current date
    const dateElement = document.getElementById('current-date')
    if (dateElement) {
      dateElement.textContent = new Date().toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      })
    }

    // Initialize Lucide icons if available
    if (typeof window !== 'undefined' && (window as any).lucide) {
      (window as any).lucide.createIcons()
    }
  }, [])

  return (
    <div className="bg-slate-50 text-slate-800 font-sans antialiased min-h-screen">
      <div id="app" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
        
        <header className="text-center mb-16">
          <img 
            src="https://r2.flowith.net/files/59e583fe-a268-450d-9d89-c6dd4579bb67/1751052774560-connie-logo@1276x357.png" 
            alt="Connie Digital Logo" 
            className="mx-auto mb-8 h-12 w-auto"
          />
          <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight">
            Connie Go-To-Market Strategy&nbsp;
          </h1>
          <p className="mt-4 text-lg md:text-xl text-slate-600 max-w-3xl mx-auto">
            A roadmap to advance Connie from prototype to commercially available MVP.
          </p>
          <div className="mt-2 text-sm text-slate-500">
            <span>Document Version: 1.0</span> • <span id="current-date">July 3, 2025</span>
          </div>
        </header>

        <div className="mb-16 md:mb-24">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
            {sections.map((section, index) => (
              <div key={section.id} className="bg-white rounded-2xl shadow-lg p-8 hover:shadow-xl transition-shadow duration-300">
                <div className="flex items-center mb-6">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center mr-4">
                    <i data-lucide={section.icon} className="w-6 h-6 text-white"></i>
                  </div>
                  <h2 className="text-2xl font-bold text-slate-900">{section.title}</h2>
                </div>
                
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-semibold text-slate-800 mb-2">Current State</h3>
                    <p 
                      className="text-slate-600 leading-relaxed"
                      dangerouslySetInnerHTML={{ __html: section.currentState }}
                    />
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-semibold text-slate-800 mb-2">Objective</h3>
                    <p 
                      className="text-slate-600 leading-relaxed"
                      dangerouslySetInnerHTML={{ __html: section.objective }}
                    />
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-semibold text-slate-800 mb-2">Next Steps</h3>
                    <ul className="space-y-2">
                      {section.nextSteps.map((step, stepIndex) => (
                        <li key={stepIndex} className="flex items-start">
                          <div className="w-1.5 h-1.5 bg-blue-500 rounded-full mt-3 mr-3 flex-shrink-0"></div>
                          <span 
                            className="text-slate-600 leading-relaxed"
                            dangerouslySetInnerHTML={{ __html: step }}
                          />
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Export/Print functionality */}
        <div className="text-center">
          <button 
            onClick={() => window.print()}
            className="inline-flex items-center px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors duration-200"
          >
            <i data-lucide="download" className="w-5 h-5 mr-2"></i>
            Export as PDF
          </button>
        </div>
      </div>

      {/* Load external scripts */}
      <script src="https://unpkg.com/lucide@latest" async />
    </div>
  )
}