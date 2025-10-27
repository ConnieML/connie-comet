'use client'

import React from 'react'
import Link from 'next/link'

export default function FinancialPage() {
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
          <div className="text-6xl mb-4">📊</div>
          <h1 className="text-4xl font-light text-slate-800 mb-4">
            Financial Reports & Tools
          </h1>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto">
            Interactive calculators, pricing models, unit economics, cash flow projections
          </p>
        </div>

        {/* Financial Tools & Reports */}
        <div className="max-w-6xl mx-auto space-y-8">

          {/* Interactive Tools Section */}
          <div className="bg-blue-50 border-2 border-blue-200 rounded-2xl p-8">
            <h3 className="text-xl font-semibold text-blue-900 mb-4">💰 Interactive Tools</h3>
            <div className="grid md:grid-cols-2 gap-4">
              <Link
                href="/dataroom/p-and-l-calculator"
                target="_blank"
                rel="noopener noreferrer"
                className="block p-4 bg-white rounded-lg border border-blue-300 hover:border-blue-500 hover:shadow-md transition-all"
              >
                <h4 className="font-semibold text-blue-900 mb-1">P&L Calculator</h4>
                <p className="text-sm text-blue-700">Interactive pricing calculator with wholesale costs, margin scenarios, and break-even analysis</p>
              </Link>
            </div>
          </div>

          {/* Financial Models & Reports Section */}
          <div className="bg-blue-50 border-2 border-blue-200 rounded-2xl p-8">
            <h3 className="text-xl font-semibold text-blue-900 mb-4">📊 Financial Models & Reports</h3>
            <div className="grid md:grid-cols-2 gap-4">

              <a
                href="https://docs.google.com/spreadsheets/d/1nZJ-Q9T1m7ByfmtNdWI8dWCNbHA8ErVCcBTltQ1RG9w/edit"
                target="_blank"
                rel="noopener noreferrer"
                className="block p-4 bg-white rounded-lg border border-blue-300 hover:border-blue-500 hover:shadow-md transition-all"
              >
                <h4 className="font-semibold text-blue-900 mb-1">Executive Summary Dashboard</h4>
                <p className="text-sm text-blue-700">At-a-glance financial metrics and pricing scenarios</p>
              </a>

              <a
                href="https://docs.google.com/spreadsheets/d/1hXNTKUyHumPXiSJS7R4PBlGGxkdQpxSyc2OKc9UFZtc/edit"
                target="_blank"
                rel="noopener noreferrer"
                className="block p-4 bg-white rounded-lg border border-blue-300 hover:border-blue-500 hover:shadow-md transition-all"
              >
                <h4 className="font-semibold text-blue-900 mb-1">Unit Economics Model</h4>
                <p className="text-sm text-blue-700">Pricing scenarios and break-even analysis</p>
              </a>

              <a
                href="https://docs.google.com/spreadsheets/d/1RcpBrr6MYTcSKEjmVgotagSYzttv85mfL3A2hLkaR3M/edit"
                target="_blank"
                rel="noopener noreferrer"
                className="block p-4 bg-white rounded-lg border border-blue-300 hover:border-blue-500 hover:shadow-md transition-all"
              >
                <h4 className="font-semibold text-blue-900 mb-1">Cash Flow Runway Model</h4>
                <p className="text-sm text-blue-700">Revenue scenarios and runway projections</p>
              </a>

              <a
                href="https://docs.google.com/spreadsheets/d/1nZJ-Q9T1m7ByfmtNdWI8dWCNbHA8ErVCcBTltQ1RG9w/edit"
                target="_blank"
                rel="noopener noreferrer"
                className="block p-4 bg-white rounded-lg border border-blue-300 hover:border-blue-500 hover:shadow-md transition-all"
              >
                <h4 className="font-semibold text-blue-900 mb-1">NSS In-Kind Tracker</h4>
                <p className="text-sm text-blue-700">UAT partnership value and renewal planning</p>
              </a>

              <a
                href="https://docs.google.com/spreadsheets/d/1nZJ-Q9T1m7ByfmtNdWI8dWCNbHA8ErVCcBTltQ1RG9w/edit"
                target="_blank"
                rel="noopener noreferrer"
                className="block p-4 bg-white rounded-lg border border-blue-300 hover:border-blue-500 hover:shadow-md transition-all"
              >
                <h4 className="font-semibold text-blue-900 mb-1">COGS Classification</h4>
                <p className="text-sm text-blue-700">Transaction-level wholesale costs breakdown</p>
              </a>

              <div className="block p-4 bg-white rounded-lg border border-blue-300">
                <h4 className="font-semibold text-blue-900 mb-1">UAT Success Story</h4>
                <p className="text-sm text-blue-700">10-slide presentation: Dec 2024 → Oct 2025 validation journey</p>
              </div>

            </div>
          </div>

        </div>
      </div>
    </div>
  )
}

export const dynamic = 'force-dynamic'
