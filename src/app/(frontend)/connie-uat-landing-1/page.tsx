'use client'

import React from 'react'
import Link from 'next/link'

export default function ConnieUATLandingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-200 text-slate-800 relative overflow-hidden">
      {/* Subtle Background Pattern */}
      <div className="absolute inset-0 opacity-30 pointer-events-none">
        <div className="absolute top-20 left-10 w-64 h-64 bg-teal-200 rounded-full mix-blend-multiply filter blur-3xl"></div>
        <div className="absolute top-40 right-20 w-72 h-72 bg-blue-200 rounded-full mix-blend-multiply filter blur-3xl"></div>
        <div className="absolute bottom-20 left-1/3 w-80 h-80 bg-indigo-200 rounded-full mix-blend-multiply filter blur-3xl"></div>
      </div>

      <div className="container mx-auto px-6 py-12 relative z-10">
        {/* Hero Section */}
        <div className="text-center mb-16 pt-8">
          <p className="text-sm font-semibold text-teal-600 uppercase tracking-widest mb-4">
            American Society on Aging 2024
          </p>
          <h1 className="text-4xl md:text-5xl font-light text-slate-800 mb-6 leading-tight">
            Help Us Build a More Connected<br />Future for Aging
          </h1>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto leading-relaxed">
            Thank you for your interest in Connie. We're seeking strategic partners to help scale this proven model and transform community-based care.
          </p>
        </div>

        {/* What is Connie UAT */}
        <div className="max-w-4xl mx-auto mb-16">
          <div className="bg-white/70 backdrop-blur-sm border border-slate-200 rounded-2xl p-8 shadow-lg">
            <h2 className="text-2xl font-semibold text-slate-800 mb-4">What is Connie UAT?</h2>
            <p className="text-slate-600 mb-8 leading-relaxed">
              <span className="font-semibold text-slate-700">User Acceptance Testing (UAT)</span> is the final validation phase before Connie 2.0 goes live. Selected Community-Based Organizations (CBOs) work directly with real users in real scenarios to ensure the platform meets the needs of older adults and the organizations that serve them.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center p-4">
                <div className="text-3xl mb-3">👥</div>
                <h3 className="font-semibold text-slate-800 mb-2">Real Users</h3>
                <p className="text-sm text-slate-600">Test with actual staff and clients in your organization</p>
              </div>
              <div className="text-center p-4">
                <div className="text-3xl mb-3">🔄</div>
                <h3 className="font-semibold text-slate-800 mb-2">Real Scenarios</h3>
                <p className="text-sm text-slate-600">Validate workflows that match your daily operations</p>
              </div>
              <div className="text-center p-4">
                <div className="text-3xl mb-3">🎯</div>
                <h3 className="font-semibold text-slate-800 mb-2">Real Impact</h3>
                <p className="text-sm text-slate-600">Shape the future of community-based care technology</p>
              </div>
            </div>
          </div>
        </div>

        {/* First 90 Days Timeline */}
        <div className="max-w-5xl mx-auto mb-16">
          <div className="text-center mb-10">
            <h2 className="text-2xl font-semibold text-slate-800 mb-2">First 90 Days with Connie</h2>
            <p className="text-slate-600">A phased onramp designed for your pace. You control each step.</p>
          </div>

          {/* Timeline Progress Bar - Desktop */}
          <div className="hidden md:block relative mb-8">
            <div className="absolute top-8 left-[16.67%] right-[16.67%] h-1 bg-slate-200 rounded-full">
              <div className="absolute left-0 w-1/3 h-full bg-teal-500 rounded-l-full"></div>
              <div className="absolute left-1/3 w-1/3 h-full bg-teal-400"></div>
              <div className="absolute left-2/3 w-1/3 h-full bg-teal-300 rounded-r-full"></div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Phase 1 */}
            <div className="relative">
              <div className="hidden md:flex w-16 h-16 rounded-full bg-white border-4 border-teal-500 items-center justify-center mx-auto mb-4 shadow-md">
                <span className="text-lg font-bold text-teal-600">30</span>
              </div>
              <div className="bg-white/80 backdrop-blur-sm border border-teal-200 rounded-xl p-6 shadow-md h-full">
                <p className="text-xs font-bold text-teal-600 uppercase tracking-wider mb-2">Days 1–30</p>
                <h3 className="text-xl font-semibold text-slate-800 mb-4">Set Up & Focus</h3>
                <ul className="space-y-3 text-sm text-slate-600 mb-4">
                  <li className="flex items-start gap-2">
                    <span className="text-teal-500 font-bold">•</span>
                    <span>Choose 1–2 programs (e.g., intake, Hospital-to-Home)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-teal-500 font-bold">•</span>
                    <span>Train a small core team</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-teal-500 font-bold">•</span>
                    <span>Turn on unified comms for limited channels (phone + SMS)</span>
                  </li>
                </ul>
                <p className="text-xs italic text-slate-500 pt-3 border-t border-slate-200">
                  "Start small. One team, one or two workflows, one shared screen."
                </p>
              </div>
            </div>

            {/* Phase 2 */}
            <div className="relative">
              <div className="hidden md:flex w-16 h-16 rounded-full bg-white border-4 border-teal-400 items-center justify-center mx-auto mb-4 shadow-md">
                <span className="text-lg font-bold text-teal-500">60</span>
              </div>
              <div className="bg-white/80 backdrop-blur-sm border border-teal-200 rounded-xl p-6 shadow-md h-full">
                <p className="text-xs font-bold text-teal-500 uppercase tracking-wider mb-2">Days 31–60</p>
                <h3 className="text-xl font-semibold text-slate-800 mb-4">Stabilize & Measure</h3>
                <ul className="space-y-3 text-sm text-slate-600 mb-4">
                  <li className="flex items-start gap-2">
                    <span className="text-teal-400 font-bold">•</span>
                    <span>Capture all client/partner requests as tasks</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-teal-400 font-bold">•</span>
                    <span>Monitor connection rates, repeat contacts, backlog</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-teal-400 font-bold">•</span>
                    <span>Weekly check-ins with Connie team to adjust</span>
                  </li>
                </ul>
                <p className="text-xs italic text-slate-500 pt-3 border-t border-slate-200">
                  "Move from chaos to visibility. See what's really happening in real time."
                </p>
              </div>
            </div>

            {/* Phase 3 */}
            <div className="relative">
              <div className="hidden md:flex w-16 h-16 rounded-full bg-white border-4 border-teal-300 items-center justify-center mx-auto mb-4 shadow-md">
                <span className="text-lg font-bold text-teal-400">90</span>
              </div>
              <div className="bg-white/80 backdrop-blur-sm border border-teal-200 rounded-xl p-6 shadow-md h-full">
                <p className="text-xs font-bold text-teal-400 uppercase tracking-wider mb-2">Days 61–90</p>
                <h3 className="text-xl font-semibold text-slate-800 mb-4">Expand & Decide</h3>
                <ul className="space-y-3 text-sm text-slate-600 mb-4">
                  <li className="flex items-start gap-2">
                    <span className="text-teal-300 font-bold">•</span>
                    <span>Refine workflows based on data</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-teal-300 font-bold">•</span>
                    <span>Explore CRM/EHR/CIE integration where appropriate</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-teal-300 font-bold">•</span>
                    <span>Decide: expand, deepen integrations, or pause</span>
                  </li>
                </ul>
                <p className="text-xs italic text-slate-500 pt-3 border-t border-slate-200">
                  "You control the next step. Data-driven, not faith-based."
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Why Participate */}
        <div className="max-w-4xl mx-auto mb-16">
          <h2 className="text-2xl font-semibold text-slate-800 mb-8 text-center">Why Participate?</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white/70 backdrop-blur-sm border border-slate-200 rounded-xl p-6 shadow-md">
              <h3 className="text-lg font-semibold text-slate-800 mb-3">Early Access</h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                Be among the first CBOs to implement Connie 2.0 and gain a competitive advantage in delivering integrated, efficient care.
              </p>
            </div>
            <div className="bg-white/70 backdrop-blur-sm border border-slate-200 rounded-xl p-6 shadow-md">
              <h3 className="text-lg font-semibold text-slate-800 mb-3">Direct Influence</h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                Your feedback directly shapes product development. UAT partners have a voice in feature prioritization.
              </p>
            </div>
            <div className="bg-white/70 backdrop-blur-sm border border-slate-200 rounded-xl p-6 shadow-md">
              <h3 className="text-lg font-semibold text-slate-800 mb-3">Dedicated Support</h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                Receive hands-on implementation support, training, and a direct line to the Connie development team.
              </p>
            </div>
            <div className="bg-white/70 backdrop-blur-sm border border-slate-200 rounded-xl p-6 shadow-md">
              <h3 className="text-lg font-semibold text-slate-800 mb-3">Transparent Pricing</h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                UAT participants receive preferential pricing and extended trial periods as we validate the platform together.
              </p>
            </div>
          </div>
        </div>

        {/* CTAs */}
        <div className="max-w-4xl mx-auto mb-16">
          <h2 className="text-2xl font-semibold text-slate-800 mb-8 text-center">Get Involved</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Schedule a Call */}
            <div className="bg-gradient-to-br from-teal-50 to-blue-50 border-2 border-teal-200 rounded-xl p-6 text-center shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.02]">
              <div className="text-4xl mb-4">📅</div>
              <h3 className="text-lg font-semibold text-slate-800 mb-3">Schedule a Call</h3>
              <p className="text-sm text-slate-600 mb-6">Request a live demo and discuss how Connie fits your organization.</p>
              <a
                href="https://calendly.com/connie-uat"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block w-full py-3 px-6 bg-teal-600 hover:bg-teal-700 text-white font-semibold rounded-lg transition-colors"
              >
                Book a Meeting
              </a>
            </div>

            {/* Apply for UAT */}
            <div className="bg-gradient-to-br from-indigo-50 to-purple-50 border-2 border-indigo-200 rounded-xl p-6 text-center shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.02]">
              <div className="text-4xl mb-4">📋</div>
              <h3 className="text-lg font-semibold text-slate-800 mb-3">Apply for UAT</h3>
              <p className="text-sm text-slate-600 mb-6">Complete our discovery questionnaire to be considered for the UAT program.</p>
              <Link
                href="/dataroom/user-acceptance-testing"
                className="inline-block w-full py-3 px-6 bg-white hover:bg-slate-50 text-slate-800 font-semibold rounded-lg border border-slate-300 transition-colors"
              >
                Start Application
              </Link>
            </div>

            {/* Share */}
            <div className="bg-gradient-to-br from-amber-50 to-orange-50 border-2 border-amber-200 rounded-xl p-6 text-center shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.02]">
              <div className="text-4xl mb-4">📧</div>
              <h3 className="text-lg font-semibold text-slate-800 mb-3">Share With a Colleague</h3>
              <p className="text-sm text-slate-600 mb-6">Know another CBO leader who should hear about this? Send them this page.</p>
              <a
                href="mailto:?subject=Connie%20UAT%20Program%20-%20Community-Based%20Care%20Technology&body=I%20thought%20you%20might%20be%20interested%20in%20the%20Connie%20UAT%20program%20for%20community-based%20organizations.%20Learn%20more%3A%20https%3A%2F%2Fconnie.one%2Fconnie-uat-landing-1"
                className="inline-block w-full py-3 px-6 bg-white hover:bg-slate-50 text-slate-800 font-semibold rounded-lg border border-slate-300 transition-colors"
              >
                Email This Page
              </a>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="max-w-3xl mx-auto">
          <div className="bg-white/60 backdrop-blur-sm border border-slate-200 rounded-2xl p-8 shadow-lg">
            <h2 className="text-xl font-semibold text-slate-800 mb-6 text-center">UAT Program at a Glance</h2>
            <div className="grid grid-cols-3 gap-8 text-center mb-6">
              <div>
                <p className="text-4xl font-bold text-teal-600 mb-1">95%</p>
                <p className="text-sm text-slate-600">Functionality Target</p>
              </div>
              <div>
                <p className="text-4xl font-bold text-teal-600 mb-1">90%</p>
                <p className="text-sm text-slate-600">Usability Target</p>
              </div>
              <div>
                <p className="text-4xl font-bold text-teal-600 mb-1">100%</p>
                <p className="text-sm text-slate-600">Accessibility Compliance</p>
              </div>
            </div>
            <p className="text-center text-sm text-slate-500">Target go-live: September 2025</p>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center mt-16 pt-8 border-t border-slate-200">
          <p className="text-sm text-slate-500">Copyright © 2025 Nevada Senior Services. All rights reserved.</p>
        </div>
      </div>
    </div>
  )
}
