'use client'

import React from 'react'
import Link from 'next/link'

export default function ConnieUATLandingPage() {
  return (
    <div className="min-h-screen bg-white text-twilio-navy relative overflow-hidden">
      {/* Hero Section */}
      <div className="bg-white py-20 md:py-28">
        <div className="container mx-auto px-6">
          <div className="text-center">
            <p className="text-sm font-semibold text-twilio-teal uppercase tracking-widest mb-4 bg-twilio-bg-subtle px-4 py-2 rounded-full inline-block">
              American Society on Aging 2024
            </p>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-semibold text-twilio-navy mb-6 leading-tight">
              Help Us Build a More Connected<br />Future for Aging
            </h1>
            <p className="text-xl text-twilio-muted max-w-2xl mx-auto leading-relaxed">
              Thank you for your interest in Connie. We&apos;re seeking strategic partners to help scale this proven model and transform community-based care.
            </p>
          </div>
        </div>
      </div>

      {/* What is Connie UAT */}
      <div className="bg-twilio-bg-subtle py-20 md:py-24">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <div className="bg-white border border-twilio-border rounded-lg p-6 md:p-8 shadow-[0_1px_3px_rgba(0,0,0,0.08)]">
              <h2 className="text-2xl font-semibold text-twilio-navy mb-4">What is Connie UAT?</h2>
              <p className="text-twilio-muted mb-8 leading-relaxed">
                <span className="font-semibold text-twilio-navy">User Acceptance Testing (UAT)</span> is the final validation phase before Connie 2.0 goes live. Selected Community-Based Organizations (CBOs) work directly with real users in real scenarios to ensure the platform meets the needs of older adults and the organizations that serve them.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
                <div className="text-center p-4">
                  <div className="w-12 h-12 rounded-full bg-twilio-blue/10 flex items-center justify-center mb-3 mx-auto">
                    <div className="w-6 h-6 rounded-full bg-twilio-blue"></div>
                  </div>
                  <h3 className="font-semibold text-twilio-navy mb-2">Real Users</h3>
                  <p className="text-sm text-twilio-muted">Test with actual staff and clients in your organization</p>
                </div>
                <div className="text-center p-4">
                  <div className="w-12 h-12 rounded-full bg-twilio-teal/10 flex items-center justify-center mb-3 mx-auto">
                    <div className="w-6 h-6 rounded-full bg-twilio-teal"></div>
                  </div>
                  <h3 className="font-semibold text-twilio-navy mb-2">Real Scenarios</h3>
                  <p className="text-sm text-twilio-muted">Validate workflows that match your daily operations</p>
                </div>
                <div className="text-center p-4">
                  <div className="w-12 h-12 rounded-full bg-twilio-muted/10 flex items-center justify-center mb-3 mx-auto">
                    <div className="w-6 h-6 rounded-full bg-twilio-muted"></div>
                  </div>
                  <h3 className="font-semibold text-twilio-navy mb-2">Real Impact</h3>
                  <p className="text-sm text-twilio-muted">Shape the future of community-based care technology</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* First 90 Days Timeline */}
      <div className="bg-white py-20 md:py-24">
        <div className="container mx-auto px-6">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-10">
              <h2 className="text-2xl font-semibold text-twilio-navy mb-2">First 90 Days with Connie</h2>
              <p className="text-twilio-muted">A phased onramp designed for your pace. You control each step.</p>
            </div>

            {/* Timeline Progress Bar - Desktop */}
            <div className="hidden md:block relative mb-8">
              <div className="absolute top-8 left-[16.67%] right-[16.67%] h-0.5 bg-twilio-border"></div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
              {/* Phase 1 */}
              <div className="relative">
                <div className="hidden md:flex w-16 h-16 rounded-full bg-white border-4 border-twilio-teal items-center justify-center mx-auto mb-4 shadow-[0_1px_3px_rgba(0,0,0,0.08)]">
                  <span className="text-lg font-bold text-twilio-teal">30</span>
                </div>
                <div className="bg-white border border-twilio-border rounded-lg p-6 shadow-[0_1px_3px_rgba(0,0,0,0.08)] h-full">
                  <p className="text-xs font-bold text-twilio-teal uppercase tracking-wider mb-2">Days 1–30</p>
                  <h3 className="text-xl font-semibold text-twilio-navy mb-4">Set Up & Focus</h3>
                  <ul className="space-y-3 text-sm text-twilio-muted mb-4">
                    <li className="flex items-start gap-2">
                      <span className="text-twilio-teal font-bold">•</span>
                      <span>Choose 1–2 programs (e.g., intake, Hospital-to-Home)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-twilio-teal font-bold">•</span>
                      <span>Train a small core team</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-twilio-teal font-bold">•</span>
                      <span>Turn on unified comms for limited channels (phone + SMS)</span>
                    </li>
                  </ul>
                  <p className="text-xs italic text-twilio-muted pt-3 border-t border-twilio-border">
                    &ldquo;Start small. One team, one or two workflows, one shared screen.&rdquo;
                  </p>
                </div>
              </div>

              {/* Phase 2 */}
              <div className="relative">
                <div className="hidden md:flex w-16 h-16 rounded-full bg-white border-4 border-twilio-teal items-center justify-center mx-auto mb-4 shadow-[0_1px_3px_rgba(0,0,0,0.08)]">
                  <span className="text-lg font-bold text-twilio-teal">60</span>
                </div>
                <div className="bg-white border border-twilio-border rounded-lg p-6 shadow-[0_1px_3px_rgba(0,0,0,0.08)] h-full">
                  <p className="text-xs font-bold text-twilio-teal uppercase tracking-wider mb-2">Days 31–60</p>
                  <h3 className="text-xl font-semibold text-twilio-navy mb-4">Stabilize & Measure</h3>
                  <ul className="space-y-3 text-sm text-twilio-muted mb-4">
                    <li className="flex items-start gap-2">
                      <span className="text-twilio-teal font-bold">•</span>
                      <span>Capture all client/partner requests as tasks</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-twilio-teal font-bold">•</span>
                      <span>Monitor connection rates, repeat contacts, backlog</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-twilio-teal font-bold">•</span>
                      <span>Weekly check-ins with Connie team to adjust</span>
                    </li>
                  </ul>
                  <p className="text-xs italic text-twilio-muted pt-3 border-t border-twilio-border">
                    &ldquo;Move from chaos to visibility. See what&apos;s really happening in real time.&rdquo;
                  </p>
                </div>
              </div>

              {/* Phase 3 */}
              <div className="relative">
                <div className="hidden md:flex w-16 h-16 rounded-full bg-white border-4 border-twilio-teal items-center justify-center mx-auto mb-4 shadow-[0_1px_3px_rgba(0,0,0,0.08)]">
                  <span className="text-lg font-bold text-twilio-teal">90</span>
                </div>
                <div className="bg-white border border-twilio-border rounded-lg p-6 shadow-[0_1px_3px_rgba(0,0,0,0.08)] h-full">
                  <p className="text-xs font-bold text-twilio-teal uppercase tracking-wider mb-2">Days 61–90</p>
                  <h3 className="text-xl font-semibold text-twilio-navy mb-4">Expand & Decide</h3>
                  <ul className="space-y-3 text-sm text-twilio-muted mb-4">
                    <li className="flex items-start gap-2">
                      <span className="text-twilio-teal font-bold">•</span>
                      <span>Refine workflows based on data</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-twilio-teal font-bold">•</span>
                      <span>Explore CRM/EHR/CIE integration where appropriate</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-twilio-teal font-bold">•</span>
                      <span>Decide: expand, deepen integrations, or pause</span>
                    </li>
                  </ul>
                  <p className="text-xs italic text-twilio-muted pt-3 border-t border-twilio-border">
                    &ldquo;You control the next step. Data-driven, not faith-based.&rdquo;
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Why Participate */}
      <div className="bg-twilio-bg-subtle py-20 md:py-24">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl font-semibold text-twilio-navy mb-8 text-center">Why Participate?</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
              <div className="bg-white border border-twilio-border rounded-lg p-6 shadow-[0_1px_3px_rgba(0,0,0,0.08)]">
                <h3 className="text-lg font-semibold text-twilio-navy mb-3">Early Access</h3>
                <p className="text-sm text-twilio-muted leading-relaxed">
                  Be among the first CBOs to implement Connie 2.0 and gain a competitive advantage in delivering integrated, efficient care.
                </p>
              </div>
              <div className="bg-white border border-twilio-border rounded-lg p-6 shadow-[0_1px_3px_rgba(0,0,0,0.08)]">
                <h3 className="text-lg font-semibold text-twilio-navy mb-3">Direct Influence</h3>
                <p className="text-sm text-twilio-muted leading-relaxed">
                  Your feedback directly shapes product development. UAT partners have a voice in feature prioritization.
                </p>
              </div>
              <div className="bg-white border border-twilio-border rounded-lg p-6 shadow-[0_1px_3px_rgba(0,0,0,0.08)]">
                <h3 className="text-lg font-semibold text-twilio-navy mb-3">Dedicated Support</h3>
                <p className="text-sm text-twilio-muted leading-relaxed">
                  Receive hands-on implementation support, training, and a direct line to the Connie development team.
                </p>
              </div>
              <div className="bg-white border border-twilio-border rounded-lg p-6 shadow-[0_1px_3px_rgba(0,0,0,0.08)]">
                <h3 className="text-lg font-semibold text-twilio-navy mb-3">Transparent Pricing</h3>
                <p className="text-sm text-twilio-muted leading-relaxed">
                  UAT participants receive preferential pricing and extended trial periods as we validate the platform together.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* CTAs */}
      <div className="bg-white py-20 md:py-24">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl font-semibold text-twilio-navy mb-8 text-center">Get Involved</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
              {/* Schedule a Call */}
              <div className="bg-white border border-twilio-border rounded-lg p-6 text-center shadow-[0_1px_3px_rgba(0,0,0,0.08)] hover:shadow-[0_4px_6px_rgba(0,0,0,0.12)] transition-shadow duration-300">
                <div className="w-12 h-12 rounded-full bg-twilio-blue/10 flex items-center justify-center mb-4 mx-auto">
                  <svg className="w-6 h-6 text-twilio-blue" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-twilio-navy mb-3">Schedule a Call</h3>
                <p className="text-sm text-twilio-muted mb-6">Request a live demo and discuss how Connie fits your organization.</p>
                <a
                  href="https://calendly.com/connie-uat"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block w-full py-3 px-6 bg-twilio-blue hover:bg-[#0052CC] text-white font-semibold rounded-md transition-colors"
                >
                  Book a Meeting
                </a>
              </div>

              {/* Apply for UAT */}
              <div className="bg-white border border-twilio-border rounded-lg p-6 text-center shadow-[0_1px_3px_rgba(0,0,0,0.08)] hover:shadow-[0_4px_6px_rgba(0,0,0,0.12)] transition-shadow duration-300">
                <div className="w-12 h-12 rounded-full bg-twilio-teal/10 flex items-center justify-center mb-4 mx-auto">
                  <svg className="w-6 h-6 text-twilio-teal" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-twilio-navy mb-3">Apply for UAT</h3>
                <p className="text-sm text-twilio-muted mb-6">Complete our discovery questionnaire to be considered for the UAT program.</p>
                <Link
                  href="/dataroom/user-acceptance-testing"
                  className="inline-block w-full py-3 px-6 bg-white hover:bg-twilio-bg-subtle text-twilio-navy font-semibold rounded-md border border-twilio-border transition-colors"
                >
                  Start Application
                </Link>
              </div>

              {/* Share */}
              <div className="bg-white border border-twilio-border rounded-lg p-6 text-center shadow-[0_1px_3px_rgba(0,0,0,0.08)] hover:shadow-[0_4px_6px_rgba(0,0,0,0.12)] transition-shadow duration-300">
                <div className="w-12 h-12 rounded-full bg-twilio-muted/10 flex items-center justify-center mb-4 mx-auto">
                  <svg className="w-6 h-6 text-twilio-muted" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-twilio-navy mb-3">Share With a Colleague</h3>
                <p className="text-sm text-twilio-muted mb-6">Know another CBO leader who should hear about this? Send them this page.</p>
                <a
                  href="mailto:?subject=Connie%20UAT%20Program%20-%20Community-Based%20Care%20Technology&body=I%20thought%20you%20might%20be%20interested%20in%20the%20Connie%20UAT%20program%20for%20community-based%20organizations.%20Learn%20more%3A%20https%3A%2F%2Fconnie.one%2Fconnie-uat-landing-1"
                  className="inline-block w-full py-3 px-6 bg-white hover:bg-twilio-bg-subtle text-twilio-navy font-semibold rounded-md border border-twilio-border transition-colors"
                >
                  Email This Page
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="bg-twilio-bg-subtle py-20 md:py-24">
        <div className="container mx-auto px-6">
          <div className="max-w-3xl mx-auto">
            <div className="bg-white border border-twilio-border rounded-lg p-6 md:p-8 shadow-[0_1px_3px_rgba(0,0,0,0.08)]">
              <h2 className="text-xl font-semibold text-twilio-navy mb-6 text-center">UAT Program at a Glance</h2>
              <div className="grid grid-cols-3 gap-8 text-center mb-6">
                <div>
                  <p className="text-4xl font-bold text-twilio-teal mb-1">95%</p>
                  <p className="text-sm text-twilio-muted">Functionality Target</p>
                </div>
                <div>
                  <p className="text-4xl font-bold text-twilio-teal mb-1">90%</p>
                  <p className="text-sm text-twilio-muted">Usability Target</p>
                </div>
                <div>
                  <p className="text-4xl font-bold text-twilio-teal mb-1">100%</p>
                  <p className="text-sm text-twilio-muted">Accessibility Compliance</p>
                </div>
              </div>
              <p className="text-center text-sm text-twilio-muted">Target go-live: September 2025</p>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="bg-white py-8 border-t border-twilio-border">
        <div className="container mx-auto px-6">
          <p className="text-sm text-twilio-muted text-center">Copyright © 2025 Nevada Senior Services. All rights reserved.</p>
        </div>
      </div>
    </div>
  )
}
