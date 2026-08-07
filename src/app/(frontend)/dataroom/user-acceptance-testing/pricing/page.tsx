'use client'

import React from 'react'
import Link from 'next/link'

export default function UATPricingHubPage() {
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
      </div>

      <div className="container mx-auto px-6 py-16 relative z-10">
        {/* Back Navigation */}
        <div className="mb-8">
          <Link
            href="/dataroom/user-acceptance-testing"
            className="inline-flex items-center text-slate-600 hover:text-slate-800 transition-colors"
          >
            ← Back to UAT Hub
          </Link>
        </div>

        {/* Header */}
        <div className="text-center mb-12">
          <div className="text-6xl mb-4">💰</div>
          <h1 className="text-4xl font-light text-slate-800 mb-4">UAT Pricing</h1>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto">
            What a UAT partner pays, why, and what it looks like on an invoice
          </p>
        </div>

        {/* The model, in one line */}
        <div className="max-w-4xl mx-auto mb-14">
          <div className="bg-white/70 backdrop-blur border-2 border-slate-200 rounded-2xl px-8 py-6 shadow-lg text-center">
            <p className="text-lg text-slate-700">
              Your monthly bill ={' '}
              <span className="font-semibold text-slate-900">the usage you caused</span> +{' '}
              <span className="font-semibold text-slate-900">one flat charge of $850</span>
            </p>
            <p className="text-sm text-slate-500 mt-2">
              Only usage varies. Everything else is fixed, every month.
            </p>
          </div>
        </div>

        {/* Cards */}
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">

            {/* Pricing Policy Card */}
            <Link href="/dataroom/user-acceptance-testing/pricing/policy" className="group">
              <div className="h-full bg-gradient-to-br from-amber-50 to-orange-50 border-2 border-amber-200 rounded-xl p-8 hover:from-amber-100 hover:to-orange-100 hover:border-amber-300 transition-all duration-300 hover:transform hover:scale-[1.02] shadow-lg hover:shadow-xl">
                <div className="text-center mb-6">
                  <div className="text-6xl mb-4">📜</div>
                  <div className="inline-block px-3 py-2 bg-amber-100 text-amber-700 text-sm rounded-full border border-amber-300 font-semibold">
                    START HERE
                  </div>
                </div>
                <div className="text-center">
                  <h3 className="text-2xl font-semibold text-slate-800 mb-4 group-hover:text-amber-600 transition-colors">
                    Pricing Policy
                  </h3>
                  <p className="text-slate-600 mb-6 leading-relaxed">
                    The four categories, what each one covers, what UAT partners get, and how
                    billing works &mdash; in two pages
                  </p>
                  <div className="flex justify-between items-center text-sm text-slate-600 mb-4">
                    <span className="font-medium">📄 2-page read</span>
                    <span className="font-medium">🗓️ Aug 2026</span>
                  </div>
                  <div className="text-sm text-amber-600 font-semibold">
                    Read the Policy &rarr;
                  </div>
                </div>
              </div>
            </Link>

            {/* Sample Invoice Card */}
            <Link href="/dataroom/user-acceptance-testing/pricing/invoice" className="group">
              <div className="h-full bg-gradient-to-br from-green-50 to-teal-50 border-2 border-green-200 rounded-xl p-8 hover:from-green-100 hover:to-teal-100 hover:border-green-300 transition-all duration-300 hover:transform hover:scale-[1.02] shadow-lg hover:shadow-xl">
                <div className="text-center mb-6">
                  <div className="text-6xl mb-4">🧾</div>
                  <div className="inline-block px-3 py-2 bg-green-100 text-green-700 text-sm rounded-full border border-green-300 font-semibold">
                    WHAT YOU&rsquo;LL GET
                  </div>
                </div>
                <div className="text-center">
                  <h3 className="text-2xl font-semibold text-slate-800 mb-4 group-hover:text-green-600 transition-colors">
                    Sample Invoice
                  </h3>
                  <p className="text-slate-600 mb-6 leading-relaxed">
                    A real-shaped monthly invoice for a small nonprofit &mdash; usage itemised,
                    flat charges plain, no surprises
                  </p>
                  <div className="flex justify-between items-center text-sm text-slate-600 mb-4">
                    <span className="font-medium">🧾 Sample</span>
                    <span className="font-medium">💵 ~$1,200/mo</span>
                  </div>
                  <div className="text-sm text-green-600 font-semibold">
                    View the Invoice &rarr;
                  </div>
                </div>
              </div>
            </Link>

          </div>

          {/* Estimator prompt */}
          <div className="mt-14 max-w-4xl mx-auto">
            <div className="bg-gradient-to-br from-slate-50 to-blue-50 border-2 border-slate-200 rounded-2xl p-8 shadow-lg text-center">
              <h2 className="text-2xl font-semibold text-slate-800 mb-3">
                Want your own number?
              </h2>
              <p className="text-slate-600 mb-6 max-w-2xl mx-auto leading-relaxed">
                The intake wizard collects your operating hours, headcount and channel volumes,
                then estimates your monthly cost across all four categories. The estimate is
                indicative &mdash; the agreement is the agreement.
              </p>
              <Link
                href="/intake"
                className="inline-block px-6 py-3 bg-slate-800 text-white rounded-lg font-semibold hover:bg-slate-900 transition-colors"
              >
                Start the Intake Wizard →
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
