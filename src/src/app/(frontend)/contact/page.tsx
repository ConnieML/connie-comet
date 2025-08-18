import React from 'react'
import Link from 'next/link'

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-200 text-slate-800">
      <div className="container mx-auto px-6 py-16">
        <div className="max-w-2xl mx-auto text-center">
          <h1 className="text-5xl font-light text-slate-800 mb-6">
            Contact Us
          </h1>
          <p className="text-xl text-slate-600 mb-8">
            Get in touch with our team for access requests, support, or general inquiries.
          </p>
          
          <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-8 border border-slate-200 shadow-lg">
            <h2 className="text-2xl font-medium text-slate-800 mb-4">
              Document Access Requests
            </h2>
            <p className="text-slate-600 mb-6">
              For access to business operations, technical documentation, or investor materials, 
              please contact your administrator or reach out to our team directly.
            </p>
            
            <div className="space-y-3 text-left">
              <div className="flex items-center">
                <span className="font-medium text-slate-700 w-20">Email:</span>
                <span className="text-slate-600">admin@connie.team</span>
              </div>
              <div className="flex items-center">
                <span className="font-medium text-slate-700 w-20">Support:</span>
                <span className="text-slate-600">Coming Soon</span>
              </div>
            </div>
          </div>
          
          <div className="mt-8">
            <Link 
              href="/dataroom-portal" 
              className="inline-flex items-center text-slate-600 hover:text-slate-800 transition-colors"
            >
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Back to Document Portal
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}