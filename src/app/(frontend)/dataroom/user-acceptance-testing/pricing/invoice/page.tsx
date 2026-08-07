'use client'

import React from 'react'
import Link from 'next/link'

const PDF = '/dataroom/uat-pricing/connie-sample-invoice.pdf'

const READS = [
  {
    icon: '1️⃣',
    title: 'Direct Usage, itemised',
    body: 'Every line your team actually consumed — platform hours, voice minutes, numbers, SMS, fax — at the wholesale rate we pay, with no markup during UAT.',
  },
  {
    icon: '2️⃣',
    title: 'The flat charge, plainly',
    body: 'Indirect Usage, Platform Services and Support Services shown as three lines totalling $850. Same every month, whatever happens.',
  },
  {
    icon: '3️⃣',
    title: 'One number at the top',
    body: 'The bill leads with the answer, then shows the working underneath — so you can reconcile it against the policy without a phone call.',
  },
]

export default function UATSampleInvoicePage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-200 text-slate-800">
      <div className="container mx-auto px-6 py-16">

        {/* Back Navigation */}
        <div className="mb-8">
          <Link
            href="/dataroom/user-acceptance-testing/pricing"
            className="inline-flex items-center text-slate-600 hover:text-slate-800 transition-colors"
          >
            ← Back to UAT Pricing
          </Link>
        </div>

        {/* Header */}
        <div className="text-center mb-12">
          <div className="text-6xl mb-4">🧾</div>
          <h1 className="text-4xl font-light text-slate-800 mb-4">Sample Invoice</h1>
          <p className="text-lg text-slate-600 max-w-3xl mx-auto">
            What a monthly bill looks like for a small nonprofit running multiple channels —
            about $1,200 a month, all in
          </p>
          <div className="mt-6 flex gap-3 justify-center flex-wrap">
            <a
              href={PDF}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block px-5 py-2.5 bg-slate-800 text-white rounded-lg text-sm font-semibold hover:bg-slate-900 transition-colors"
            >
              ⬇ Download the PDF
            </a>
            <Link
              href="/dataroom/user-acceptance-testing/pricing/policy"
              className="inline-block px-5 py-2.5 bg-white border-2 border-slate-300 text-slate-700 rounded-lg text-sm font-semibold hover:border-slate-400 transition-colors"
            >
              Read the Pricing Policy
            </Link>
          </div>
        </div>

        <div className="max-w-5xl mx-auto">

          {/* Sample notice */}
          <div className="bg-amber-50 border-2 border-amber-200 rounded-xl px-6 py-4 mb-8 text-center">
            <p className="text-sm text-amber-800">
              <strong>Sample invoice.</strong> Illustrative figures for a sample organization.
              Not a bill and not a quote.
            </p>
          </div>

          {/* How to read it */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
            {READS.map((r) => (
              <div
                key={r.title}
                className="bg-white/70 backdrop-blur border-2 border-slate-200 rounded-xl p-6 shadow-sm"
              >
                <div className="text-2xl mb-3">{r.icon}</div>
                <h3 className="text-base font-semibold text-slate-800 mb-2">{r.title}</h3>
                <p className="text-sm text-slate-600 leading-relaxed">{r.body}</p>
              </div>
            ))}
          </div>

          {/* Viewer */}
          <div className="bg-white border-2 border-slate-300 rounded-2xl shadow-lg overflow-hidden">
            <div className="bg-slate-100 border-b-2 border-slate-200 px-6 py-3 flex items-center justify-between">
              <span className="text-sm font-semibold text-slate-700">
                Coral Way Senior Alliance · July 2026
              </span>
              <a
                href={PDF}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-blue-600 font-semibold hover:underline"
              >
                Open full size ↗
              </a>
            </div>
            <object
              data={PDF}
              type="application/pdf"
              className="w-full h-[1000px] bg-slate-50"
              aria-label="Connie sample invoice"
            >
              <div className="p-10 text-center">
                <p className="text-slate-600 mb-4">
                  Your browser can&rsquo;t display the PDF inline.
                </p>
                <a
                  href={PDF}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block px-5 py-2.5 bg-slate-800 text-white rounded-lg text-sm font-semibold"
                >
                  Open the invoice
                </a>
              </div>
            </object>
          </div>

          {/* Footnote */}
          <div className="mt-8 bg-gradient-to-br from-slate-50 to-blue-50 border-2 border-slate-200 rounded-2xl p-8 shadow-sm">
            <h2 className="text-xl font-semibold text-slate-800 mb-3">
              Why the invoice looks like this
            </h2>
            <p className="text-slate-600 leading-relaxed">
              Connie bills in four categories and they never move around. Direct Usage is what your
              team actually consumed, passed through at the wholesale cost we pay, with no markup
              during UAT. Indirect Usage, Platform Services and Support Services are flat — $850
              together, every month, no surprises. Once a year we lay your billed usage beside the
              carrier invoices behind it, so &ldquo;at cost&rdquo; is something you can check rather
              than something we assert.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
