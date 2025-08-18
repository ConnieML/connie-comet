'use client'

import React from 'react'

export default function UATDashboard() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 font-sans antialiased">
      {/* Header with Grid Background */}
      <div className="relative w-full overflow-hidden bg-slate-50">
        {/* Grid Background Pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#8882_1px,transparent_1px),linear-gradient(to_bottom,#8882_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" />
        
        {/* Header Content */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center">
            <h1 className="text-6xl font-light text-slate-900 mb-6">
              🧪 Connie UAT Center
            </h1>
            <p className="text-2xl text-slate-600 max-w-3xl mx-auto">
              User Acceptance Testing Hub for Connie 2.0 Features
            </p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white p-10 rounded-xl shadow-lg">

          <div className="bg-blue-50 border-l-4 border-blue-500 p-6 rounded-lg mb-10">
            <div className="flex items-center">
              <span className="text-2xl mr-3">📍</span>
              <strong className="text-blue-900">Current Focus:</strong>
              <span className="ml-2 text-blue-800">Support System UAT - Testing comprehensive bug reporting and support request features deployed to connie.plus</span>
            </div>
          </div>

          <h2 className="text-3xl font-bold text-gray-800 mb-6 border-b-2 border-gray-200 pb-3">🔴 Active UAT Campaigns</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            {/* Support System UAT */}
            <div className="bg-white border-2 border-gray-200 rounded-xl p-8 hover:border-green-400 transition-all duration-300 hover:shadow-xl relative">
              <div className="absolute top-4 right-4 w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
              <div className="inline-block px-3 py-1 bg-green-100 text-green-700 text-sm rounded-full mb-4 font-semibold">
                Active Testing
              </div>
              <h3 className="text-2xl font-bold text-gray-800 mb-4 flex items-center">
                <span className="text-3xl mr-3">🛟</span>Support System
              </h3>
              <p className="text-gray-600 mb-6">
                Comprehensive bug reporting and support request system with smart routing between live chat and email based on business hours.
              </p>
              
              <div className="grid grid-cols-3 gap-4 mb-6">
                <div className="text-center p-3 bg-gray-50 rounded-lg">
                  <div className="text-2xl font-bold text-green-600">25</div>
                  <div className="text-sm text-gray-600">Test Cases</div>
                </div>
                <div className="text-center p-3 bg-gray-50 rounded-lg">
                  <div className="text-2xl font-bold text-green-600">0%</div>
                  <div className="text-sm text-gray-600">Complete</div>
                </div>
                <div className="text-center p-3 bg-gray-50 rounded-lg">
                  <div className="text-2xl font-bold text-green-600">2</div>
                  <div className="text-sm text-gray-600">Clients</div>
                </div>
              </div>
              
              <div className="bg-gray-200 rounded-full h-3 mb-6">
                <div className="bg-gradient-to-r from-green-400 to-blue-500 h-3 rounded-full transition-all duration-300" style={{width: '10%'}}></div>
              </div>
              
              <div className="space-y-3">
                <div className="flex items-center justify-between text-sm">
                  <span className="font-medium">Aug 18</span>
                  <span>Internal Testing</span>
                  <span className="text-2xl">🟡</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="font-medium">Aug 21</span>
                  <span>Beta Testing</span>
                  <span className="text-2xl">⏳</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="font-medium">Sept 1</span>
                  <span>Go Live</span>
                  <span className="text-2xl">📅</span>
                </div>
              </div>
              
              <div className="mt-6 flex gap-3">
                <a href="/UAT/support-system/UAT-PLAN.md" className="flex-1 bg-gradient-to-r from-green-500 to-blue-600 text-white px-4 py-2 rounded-lg text-center font-semibold hover:from-green-600 hover:to-blue-700 transition-all">
                  View Plan
                </a>
                <a href="https://connie.plus/support/report-bug" className="flex-1 bg-white border-2 border-green-500 text-green-600 px-4 py-2 rounded-lg text-center font-semibold hover:bg-green-50 transition-all">
                  Test Now
                </a>
              </div>
            </div>
          </div>

          <h2 className="text-3xl font-bold text-gray-800 mb-6 border-b-2 border-gray-200 pb-3">📋 Upcoming UAT Campaigns</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            {/* Voice Framework UAT */}
            <div className="bg-white border-2 border-gray-200 rounded-xl p-8">
              <div className="inline-block px-3 py-1 bg-purple-100 text-purple-700 text-sm rounded-full mb-4 font-semibold">
                Planned
              </div>
              <h3 className="text-2xl font-bold text-gray-800 mb-4 flex items-center">
                <span className="text-3xl mr-3">📞</span>Voice Framework
              </h3>
              <p className="text-gray-600 mb-6">
                Three-tier voice implementation pattern (Direct, Direct+, Full) with carrier-agnostic architecture and advanced features.
              </p>
              
              <div className="grid grid-cols-3 gap-4 mb-6">
                <div className="text-center p-3 bg-gray-50 rounded-lg">
                  <div className="text-2xl font-bold text-purple-600">40</div>
                  <div className="text-sm text-gray-600">Est. Cases</div>
                </div>
                <div className="text-center p-3 bg-gray-50 rounded-lg">
                  <div className="text-lg font-bold text-purple-600">Aug 25</div>
                  <div className="text-sm text-gray-600">Start Date</div>
                </div>
                <div className="text-center p-3 bg-gray-50 rounded-lg">
                  <div className="text-2xl font-bold text-purple-600">3</div>
                  <div className="text-sm text-gray-600">Clients</div>
                </div>
              </div>
              
              <div className="mt-6">
                <button className="w-full bg-gray-500 text-white px-4 py-2 rounded-lg font-semibold">
                  Coming Soon
                </button>
              </div>
            </div>

            {/* Analytics Dashboard UAT */}
            <div className="bg-white border-2 border-gray-200 rounded-xl p-8">
              <div className="inline-block px-3 py-1 bg-purple-100 text-purple-700 text-sm rounded-full mb-4 font-semibold">
                Planned
              </div>
              <h3 className="text-2xl font-bold text-gray-800 mb-4 flex items-center">
                <span className="text-3xl mr-3">📊</span>Analytics Dashboard
              </h3>
              <p className="text-gray-600 mb-6">
                Real-time contact center metrics, agent performance tracking, and customizable reports for nonprofit administrators.
              </p>
              
              <div className="grid grid-cols-3 gap-4 mb-6">
                <div className="text-center p-3 bg-gray-50 rounded-lg">
                  <div className="text-2xl font-bold text-purple-600">35</div>
                  <div className="text-sm text-gray-600">Est. Cases</div>
                </div>
                <div className="text-center p-3 bg-gray-50 rounded-lg">
                  <div className="text-lg font-bold text-purple-600">Sept 1</div>
                  <div className="text-sm text-gray-600">Start Date</div>
                </div>
                <div className="text-center p-3 bg-gray-50 rounded-lg">
                  <div className="text-2xl font-bold text-purple-600">2</div>
                  <div className="text-sm text-gray-600">Clients</div>
                </div>
              </div>
              
              <div className="mt-6">
                <button className="w-full bg-gray-500 text-white px-4 py-2 rounded-lg font-semibold">
                  Coming Soon
                </button>
              </div>
            </div>

            {/* Admin Platform UAT */}
            <div className="bg-white border-2 border-gray-200 rounded-xl p-8">
              <div className="inline-block px-3 py-1 bg-purple-100 text-purple-700 text-sm rounded-full mb-4 font-semibold">
                Planned
              </div>
              <h3 className="text-2xl font-bold text-gray-800 mb-4 flex items-center">
                <span className="text-3xl mr-3">⚙️</span>Admin Platform v3.0
              </h3>
              <p className="text-gray-600 mb-6">
                Multi-tenant management system with automated onboarding, billing integration, and deployment safety protocols.
              </p>
              
              <div className="grid grid-cols-3 gap-4 mb-6">
                <div className="text-center p-3 bg-gray-50 rounded-lg">
                  <div className="text-2xl font-bold text-purple-600">60</div>
                  <div className="text-sm text-gray-600">Est. Cases</div>
                </div>
                <div className="text-center p-3 bg-gray-50 rounded-lg">
                  <div className="text-lg font-bold text-purple-600">Sept 15</div>
                  <div className="text-sm text-gray-600">Start Date</div>
                </div>
                <div className="text-center p-3 bg-gray-50 rounded-lg">
                  <div className="text-2xl font-bold text-purple-600">5</div>
                  <div className="text-sm text-gray-600">Clients</div>
                </div>
              </div>
              
              <div className="mt-6">
                <button className="w-full bg-gray-500 text-white px-4 py-2 rounded-lg font-semibold">
                  Coming Soon
                </button>
              </div>
            </div>
          </div>

          <div className="bg-gray-800 text-white p-8 rounded-lg text-center">
            <h3 className="text-2xl font-bold mb-4">🎯 UAT Mission</h3>
            <p className="text-lg opacity-90 mb-4">
              Ensuring every Connie feature meets the reliability, usability, and accessibility standards 
              required by nonprofit organizations serving vulnerable populations.
            </p>
            <div className="text-sm opacity-80">
              <strong>Testing Philosophy:</strong> Real users, real scenarios, real feedback<br/>
              <strong>Success Standard:</strong> 95% functionality, 90% usability, 100% accessibility<br/>
              <strong>Next Milestone:</strong> Support System go-live (September 1, 2025)
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}