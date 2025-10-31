'use client'

import React from 'react'
import Link from 'next/link'

export default function UATHubPage() {
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

        {/* Category Header */}
        <div className="text-center mb-12">
          <div className="text-6xl mb-4">🧪</div>
          <h1 className="text-4xl font-light text-slate-800 mb-4">
            User Acceptance & Beta Testing
          </h1>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto">
            Comprehensive testing resources, documentation, and interactive dashboards for Connie 2.0 feature validation
          </p>
        </div>

        {/* UAT Resources Grid */}
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">

            {/* UAT Testing Dashboard Card */}
            <Link
              href="/dataroom/uat"
              className="group"
            >
              <div className="bg-gradient-to-br from-green-50 to-blue-50 border-2 border-green-200 rounded-xl p-8 hover:from-green-100 hover:to-blue-100 hover:border-green-300 transition-all duration-300 hover:transform hover:scale-[1.02] shadow-lg hover:shadow-xl">
                {/* Dashboard Icon */}
                <div className="text-center mb-6">
                  <div className="text-6xl mb-4">🧪</div>
                  <div className="inline-block px-3 py-2 bg-green-100 text-green-700 text-sm rounded-full border border-green-300 font-semibold">
                    LIVE DASHBOARD
                  </div>
                </div>

                {/* Dashboard Info */}
                <div className="text-center">
                  <h3 className="text-2xl font-semibold text-slate-800 mb-4 group-hover:text-green-600 transition-colors">
                    UAT Testing Dashboard
                  </h3>
                  
                  <p className="text-slate-600 mb-6 leading-relaxed">
                    Interactive dashboard showing all Connie UAT activities, testing progress, beta feedback, and campaign status across all features
                  </p>

                  <div className="flex justify-between items-center text-sm text-slate-600 mb-4">
                    <span className="font-medium">📊 Interactive</span>
                    <span className="font-medium">🔄 Real-time</span>
                  </div>
                  
                  <div className="text-sm text-green-600 font-semibold">
                    View Live Dashboard →
                  </div>
                </div>
              </div>
            </Link>

            {/* UAT Documentation Card */}
            <a
              href="https://docs.connie.one/end-users/test-teams/overview"
              target="_blank"
              rel="noopener noreferrer"
              className="group"
            >
              <div className="bg-gradient-to-br from-blue-50 to-purple-50 border-2 border-blue-200 rounded-xl p-8 hover:from-blue-100 hover:to-purple-100 hover:border-blue-300 transition-all duration-300 hover:transform hover:scale-[1.02] shadow-lg hover:shadow-xl">
                {/* Docs Icon */}
                <div className="text-center mb-6">
                  <div className="text-6xl mb-4">🧪</div>
                  <div className="inline-block px-3 py-2 bg-blue-100 text-blue-700 text-sm rounded-full border border-blue-300 font-semibold">
                    LIVE DOCS
                  </div>
                </div>

                {/* Docs Info */}
                <div className="text-center">
                  <h3 className="text-2xl font-semibold text-slate-800 mb-4 group-hover:text-blue-600 transition-colors">
                    UAT Documentation
                  </h3>
                  
                  <p className="text-slate-600 mb-6 leading-relaxed">
                    Comprehensive testing guides, frameworks, protocols, and resources for Test Teams on the official docs platform
                  </p>

                  <div className="flex justify-between items-center text-sm text-slate-600 mb-4">
                    <span className="font-medium">🧪 Test Teams</span>
                    <span className="font-medium">📖 Live Docs</span>
                  </div>
                  
                  <div className="text-sm text-blue-600 font-semibold">
                    Open Documentation →
                  </div>
                </div>
              </div>
            </a>

            {/* UAT Cohort Pricing Card */}
            <Link
              href="/dataroom/user-acceptance-testing/pricing"
              className="group"
            >
              <div className="bg-gradient-to-br from-amber-50 to-orange-50 border-2 border-amber-200 rounded-xl p-8 hover:from-amber-100 hover:to-orange-100 hover:border-amber-300 transition-all duration-300 hover:transform hover:scale-[1.02] shadow-lg hover:shadow-xl">
                {/* Pricing Icon */}
                <div className="text-center mb-6">
                  <div className="text-6xl mb-4">💰</div>
                  <div className="inline-block px-3 py-2 bg-amber-100 text-amber-700 text-sm rounded-full border border-amber-300 font-semibold">
                    TRANSPARENT PRICING
                  </div>
                </div>

                {/* Pricing Info */}
                <div className="text-center">
                  <h3 className="text-2xl font-semibold text-slate-800 mb-4 group-hover:text-amber-600 transition-colors">
                    UAT Cohort Pricing
                  </h3>

                  <p className="text-slate-600 mb-6 leading-relaxed">
                    Complete cost breakdown for UAT cohort participants with per-channel rates and support costs
                  </p>

                  <div className="flex justify-between items-center text-sm text-slate-600 mb-4">
                    <span className="font-medium">💰 Cost-Based</span>
                    <span className="font-medium">🔍 Transparent</span>
                  </div>

                  <div className="text-sm text-amber-600 font-semibold">
                    View Pricing Grid →
                  </div>
                </div>
              </div>
            </Link>

            {/* Partner Discovery Intake Card */}
            <Link
              href="/dataroom/user-acceptance-testing/discovery"
              className="group"
            >
              <div className="bg-gradient-to-br from-indigo-50 to-purple-50 border-2 border-indigo-200 rounded-xl p-8 hover:from-indigo-100 hover:to-purple-100 hover:border-indigo-300 transition-all duration-300 hover:transform hover:scale-[1.02] shadow-lg hover:shadow-xl">
                {/* Discovery Icon */}
                <div className="text-center mb-6">
                  <div className="text-6xl mb-4">📋</div>
                  <div className="inline-block px-3 py-2 bg-indigo-100 text-indigo-700 text-sm rounded-full border border-indigo-300 font-semibold">
                    INTAKE FORM
                  </div>
                </div>

                {/* Discovery Info */}
                <div className="text-center">
                  <h3 className="text-2xl font-semibold text-slate-800 mb-4 group-hover:text-indigo-600 transition-colors">
                    Partner Discovery
                  </h3>

                  <p className="text-slate-600 mb-6 leading-relaxed">
                    Intake questionnaire for prospective UAT partners to collect operational data and communication needs
                  </p>

                  <div className="flex justify-between items-center text-sm text-slate-600 mb-4">
                    <span className="font-medium">📊 Data Collection</span>
                    <span className="font-medium">🤝 Partners</span>
                  </div>

                  <div className="text-sm text-indigo-600 font-semibold">
                    Start Discovery Form →
                  </div>
                </div>
              </div>
            </Link>

          </div>
        </div>

        {/* Additional Info Section */}
        <div className="max-w-4xl mx-auto mt-16">
          <div className="bg-white/60 backdrop-blur-sm border border-slate-200 rounded-xl p-8">
            <div className="text-center">
              <h2 className="text-2xl font-semibold text-slate-800 mb-4">UAT Program Overview</h2>
              <p className="text-slate-600 leading-relaxed mb-6">
                Our User Acceptance Testing program ensures every Connie feature meets the reliability, usability, 
                and accessibility standards required by nonprofit organizations serving vulnerable populations.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
                <div className="p-4">
                  <div className="text-3xl mb-2">🎯</div>
                  <div className="font-semibold text-slate-800">Testing Philosophy</div>
                  <div className="text-sm text-slate-600 mt-1">Real users, real scenarios, real feedback</div>
                </div>
                <div className="p-4">
                  <div className="text-3xl mb-2">📈</div>
                  <div className="font-semibold text-slate-800">Success Standards</div>
                  <div className="text-sm text-slate-600 mt-1">95% functionality, 90% usability, 100% accessibility</div>
                </div>
                <div className="p-4">
                  <div className="text-3xl mb-2">🚀</div>
                  <div className="font-semibold text-slate-800">Current Focus</div>
                  <div className="text-sm text-slate-600 mt-1">Support System UAT (Sept 1, 2025 go-live)</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}