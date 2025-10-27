'use client'

import React from 'react'
import Link from 'next/link'
import COGSCalculator from './COGSCalculator'

export default function PAndLCalculatorPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-200 text-slate-800">
      <div className="container mx-auto px-6 py-16">

        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-light text-slate-800 mb-6">
            💰 P&L Calculator
          </h1>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto mb-4">
            Interactive pricing and unit economics calculator for strategic decision-making
          </p>

          <div className="inline-block px-4 py-2 bg-white/60 backdrop-blur-sm border border-slate-300 rounded-full">
            <span className="text-sm text-slate-600">
              Admin Only • P&L Mode
            </span>
          </div>
        </div>

        {/* Calculator Description */}
        <div className="max-w-4xl mx-auto mb-8">
          <div className="bg-white/60 backdrop-blur-sm border border-slate-200 rounded-2xl p-8 shadow-lg">
            <h2 className="text-2xl font-medium text-slate-800 mb-4">About This Calculator</h2>
            <div className="space-y-3 text-slate-600">
              <p>
                This calculator uses ConnieRTC wholesale costs validated from NSS audit (October 2025)
                with margin scenario modeling for strategic pricing decisions.
              </p>
              <p className="mt-4">
                <strong>Key Features:</strong> Transaction-level cost breakdown, target margin calculator,
                pricing scenarios (30%, 40%, 50%, 60% margins), break-even analysis, and MRR projections.
              </p>
            </div>
          </div>
        </div>

        {/* Calculator Component */}
        <div className="mb-12">
          <COGSCalculator />
        </div>

        {/* Related Resources */}
        <div className="max-w-4xl mx-auto mt-12">
          <div className="bg-blue-50 border-2 border-blue-200 rounded-2xl p-8">
            <h3 className="text-xl font-semibold text-blue-900 mb-4">📊 Related Financial Models</h3>
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
            </div>
          </div>
        </div>

        {/* Wholesale Cost Summary */}
        <div className="max-w-4xl mx-auto mt-8">
          <div className="bg-teal-50 border-2 border-teal-300 rounded-2xl p-8">
            <h3 className="text-xl font-semibold text-teal-900 mb-4">📋 Validated Wholesale Costs (NSS Audit Oct 2025)</h3>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold text-teal-800 mb-3">Transaction Costs (Variable)</h4>
                <ul className="space-y-2 text-teal-700 text-sm">
                  <li>• <strong>Voice Calls:</strong> $0.0364/call (blended)</li>
                  <li>• <strong>Fax (Variable):</strong> $0.0788/fax (1.75 pages avg)</li>
                  <li>• <strong>Fax (Fixed):</strong> $20.00/month (Sinch baseline)</li>
                  <li>• <strong>Email:</strong> $0.00 (FREE - inbound via Conversations)</li>
                  <li>• <strong>Web Forms:</strong> $0.00 (FREE - delivered via Conversations)</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold text-teal-800 mb-3">Platform Costs (Fixed)</h4>
                <ul className="space-y-2 text-teal-700 text-sm">
                  <li>• <strong>Platform OpEx:</strong> $553.00/month (Twilio Flex)</li>
                  <li>• <strong>NSS Monthly Total:</strong> $580.99/month (280 transactions avg)</li>
                </ul>
                <div className="mt-4 p-3 bg-white rounded-lg border border-teal-400">
                  <p className="text-sm text-teal-800">
                    <strong>Recommended Pricing:</strong> $968.28/month per customer (40% margin)
                  </p>
                  <p className="text-xs text-teal-600 mt-1">
                    Break-even: 4 paying customers
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Back to Dataroom */}
        <div className="text-center mt-12">
          <Link
            href="/dataroom"
            className="inline-flex items-center px-6 py-3 bg-slate-700 hover:bg-slate-800 text-white font-medium rounded-lg transition-colors"
          >
            ← Back to Dataroom
          </Link>
        </div>

      </div>
    </div>
  )
}
