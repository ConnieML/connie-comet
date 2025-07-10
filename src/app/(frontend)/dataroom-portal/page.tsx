'use client'

import React from 'react'
import Link from 'next/link'

export default function DataroomPortalPage() {
  const documentPortals = [
    {
      path: 'bizops',
      label: 'Business Operations',
      icon: '📈',
      description: 'Strategy, operations, finance, and legal documentation',
      color: 'from-blue-50 to-indigo-50 border-blue-200 hover:border-blue-400'
    },
    {
      path: 'techops', 
      label: 'Technical Operations',
      icon: '🔧',
      description: 'Architecture, security, infrastructure, and API documentation',
      color: 'from-green-50 to-emerald-50 border-green-200 hover:border-green-400'
    },
    {
      path: 'investors',
      label: 'Investor DataRoom',
      icon: '🔒',
      description: 'Curated documents for stakeholders and investors',
      color: 'from-purple-50 to-violet-50 border-purple-200 hover:border-purple-400'
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
            Connie Document Portal
          </h1>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto">
            Access business operations, technical documentation, and investor materials
          </p>
        </div>

        {/* Document Portal Grid */}
        <div className="max-w-4xl mx-auto">
          <div className="grid gap-8 md:grid-cols-1 lg:grid-cols-1">
            {documentPortals.map((portal) => (
              <Link
                key={portal.path}
                href={`/dataroom-portal/${portal.path}`}
                className="group"
              >
                <div className={`backdrop-blur-sm rounded-2xl p-8 transition-all duration-300 hover:transform hover:scale-[1.02] shadow-lg hover:shadow-xl bg-gradient-to-br ${portal.color} border-2`}>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-6">
                      <div className="text-5xl">{portal.icon}</div>
                      <div>
                        <h3 className="text-3xl font-medium text-slate-800 mb-2">
                          {portal.label}
                        </h3>
                        <p className="text-slate-600 text-lg">
                          {portal.description}
                        </p>
                      </div>
                    </div>
                    <div className="text-slate-400 group-hover:text-slate-600 transition-colors">
                      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          <div className="text-center mt-12">
            <p className="text-slate-600 text-sm">
              Authentication is required to access document repositories.
            </p>
            <p className="text-slate-500 text-xs mt-2">
              Contact your administrator for access permissions.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}