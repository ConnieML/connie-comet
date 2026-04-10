'use client'

import React from 'react'
import Link from 'next/link'

export default function SurveysPage() {
  const surveys = [
    {
      id: 'connie-training',
      title: 'Connie Training Survey',
      description: 'User feedback survey for organizations participating in Connie training programs. Captures satisfaction, effectiveness, and suggestions for improvement.',
      icon: '📝',
      status: 'Active',
      category: 'Training',
      estimatedTime: '5-10 minutes',
      href: '/dataroom/surveys/connie-training'
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
        {/* Back Navigation */}
        <div className="mb-8">
          <Link 
            href="/dataroom/business"
            className="inline-flex items-center text-slate-600 hover:text-slate-800 transition-colors"
          >
            ← Back to Business Operations
          </Link>
        </div>

        {/* Page Header */}
        <div className="text-center mb-12">
          <div className="text-6xl mb-4">📋</div>
          <h1 className="text-4xl font-light text-slate-800 mb-4">
            Surveys & Feedback
          </h1>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto">
            Collection of Connie-related surveys for training, user feedback, and program evaluation
          </p>
        </div>

        {/* Surveys Grid */}
        <div className="max-w-4xl mx-auto">
          <div className="grid gap-6">
            {surveys.map((survey) => (
              <Link
                key={survey.id}
                href={survey.href}
                className="group"
              >
                <div className="bg-white/60 backdrop-blur-sm border border-slate-200 rounded-xl p-8 hover:bg-white/80 hover:border-orange-500/50 transition-all duration-300 hover:transform hover:scale-[1.01] shadow-lg hover:shadow-xl">
                  <div className="flex items-start justify-between">
                    <div className="flex items-start space-x-6 flex-1">
                      <div className="text-5xl">{survey.icon}</div>
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="text-2xl font-medium text-slate-800 group-hover:text-orange-600 transition-colors">
                            {survey.title}
                          </h3>
                          <span className="inline-block px-3 py-1 bg-green-100 text-green-700 text-xs font-semibold rounded-full border border-green-300">
                            {survey.status}
                          </span>
                        </div>
                        <p className="text-slate-600 mb-4 leading-relaxed">
                          {survey.description}
                        </p>
                        <div className="flex flex-wrap gap-4 text-sm text-slate-600">
                          <div className="flex items-center gap-2">
                            <span className="font-semibold">Category:</span>
                            <span className="px-2 py-1 bg-slate-100 rounded-md">{survey.category}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <span className="font-semibold">Time:</span>
                            <span className="px-2 py-1 bg-slate-100 rounded-md">{survey.estimatedTime}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="ml-4 text-slate-400 group-hover:text-orange-600 transition-colors">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          {/* Info Box */}
          <div className="mt-12 bg-blue-50 border border-blue-200 rounded-xl p-6">
            <h3 className="text-lg font-semibold text-slate-800 mb-3">📊 Why We Collect Feedback</h3>
            <p className="text-slate-700 leading-relaxed">
              Your responses help us continuously improve Connie training programs, features, and user experience. 
              All feedback is reviewed by our team and directly influences product development priorities.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
