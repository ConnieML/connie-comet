'use client'

import React from 'react'
import Link from 'next/link'
import {
  AUDIT_DATE,
  DIRECT_RATES,
  FLAT_CHARGES,
  FLAT_TOTAL,
  SEAT_RATE,
  SEAT_CROSSOVER_HOURS,
  SUPPORT,
  TYPICAL_ALL_IN,
} from '@/lib/uat-pricing'

export default function UATRateCardPage() {
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
        <div className="text-center mb-10">
          <div className="text-6xl mb-4">📊</div>
          <h1 className="text-4xl font-light text-slate-800 mb-4">UAT Rate Card</h1>
          <p className="text-lg text-slate-600 max-w-3xl mx-auto">
            Every rate behind a UAT invoice, in one place
          </p>
        </div>

        <div className="max-w-5xl mx-auto">

          {/* Validity notice */}
          <div className="bg-amber-50 border-2 border-amber-200 rounded-xl px-6 py-4 mb-10 text-center">
            <p className="text-sm text-amber-900">
              <strong>Valid for UAT partners as of {AUDIT_DATE}, and subject to change.</strong>{' '}
              These are wholesale costs we pass through without markup during UAT. Carriers change
              their prices; when ours change, yours do. We give notice before any change takes
              effect.
            </p>
          </div>

          {/* 1 · Direct Usage */}
          <div className="mb-10">
            <h2 className="text-2xl font-semibold text-slate-800 mb-2">1 · Direct Usage</h2>
            <p className="text-slate-600 mb-6 leading-relaxed">
              Metered. You pay what we pay, with no markup during UAT. This is the only part of
              your bill that moves month to month.
            </p>

            <div className="bg-white border-2 border-slate-200 rounded-2xl overflow-hidden shadow-lg">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-slate-100 border-b-2 border-slate-200">
                    <th className="text-left px-5 py-3 font-semibold text-slate-700">Item</th>
                    <th className="text-right px-5 py-3 font-semibold text-slate-700 whitespace-nowrap">
                      Rate
                    </th>
                    <th className="text-left px-5 py-3 font-semibold text-slate-700">Unit</th>
                  </tr>
                </thead>
                <tbody>
                  {DIRECT_RATES.map((r) => (
                    <tr
                      key={r.key}
                      className={`border-b border-slate-100 last:border-0 ${
                        'dominant' in r && r.dominant ? 'bg-blue-50/60' : ''
                      }`}
                    >
                      <td className="px-5 py-4 align-top">
                        <div className="font-semibold text-slate-800">{r.label}</div>
                        <div className="text-xs text-slate-500 mt-0.5 leading-relaxed">{r.note}</div>
                      </td>
                      <td
                        className={`px-5 py-4 text-right align-top font-bold whitespace-nowrap ${
                          'free' in r && r.free ? 'text-slate-400' : 'text-slate-900'
                        }`}
                      >
                        {r.display}
                      </td>
                      <td className="px-5 py-4 align-top text-slate-600">{r.unit}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Hourly vs seats */}
          <div className="bg-gradient-to-br from-blue-50 to-cyan-50 border-2 border-blue-200 rounded-2xl p-8 mb-10 shadow-lg">
            <h2 className="text-xl font-semibold text-slate-800 mb-3">
              Why platform time is billed hourly
            </h2>
            <p className="text-slate-700 leading-relaxed mb-4">
              Agent access sells two ways: <strong>$1.00 per active hour</strong>, shared by any
              number of people, or <strong>${SEAT_RATE} a month per named seat</strong> for one
              person. Hourly is cheaper whenever the average person is on the system less than{' '}
              <strong>{SEAT_CROSSOVER_HOURS} hours a month</strong> — for teams of part-timers and
              volunteers, nearly always.
            </p>
            <p className="text-slate-600 text-sm leading-relaxed">
              Our own June 2026 bill: 192 active hours across 25 provisioned users cost{' '}
              <strong>$192.36</strong>. Two named seats alone would have cost $300.{' '}
              <strong>UAT partners are set up hourly.</strong> Named seats become the right tool
              later, for larger organizations with near-full-time staff.
            </p>
          </div>

          {/* 2·3·4 Flat */}
          <div className="mb-10">
            <h2 className="text-2xl font-semibold text-slate-800 mb-2">
              2 · 3 · 4 — Flat monthly charges
            </h2>
            <p className="text-slate-600 mb-6 leading-relaxed">
              Fixed. These do not vary with usage and they do not true up — that is what makes them
              flat.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-5">
              {FLAT_CHARGES.map((c) => (
                <div
                  key={c.key}
                  className="bg-white border-2 border-slate-200 rounded-xl p-6 shadow-sm"
                >
                  <div className="text-xs font-semibold text-slate-500 mb-1">
                    {c.n} · {c.lead}
                  </div>
                  <div className="text-lg font-semibold text-slate-800">{c.label}</div>
                  <div className="text-3xl font-bold text-slate-900 my-2">${c.amount}</div>
                  <p className="text-sm text-slate-600 leading-relaxed">{c.note}</p>
                </div>
              ))}
            </div>

            <div className="bg-slate-800 text-white rounded-xl px-8 py-5 text-center shadow-md">
              <div className="text-xl font-bold">
                Flat charge total: ${FLAT_TOTAL} per month
              </div>
              <div className="text-sm text-slate-300 mt-1">
                Your monthly bill = your usage + ${FLAT_TOTAL}. All-in, typically $
                {TYPICAL_ALL_IN.low.toLocaleString()}–{TYPICAL_ALL_IN.high.toLocaleString()} a month.
              </div>
            </div>
          </div>

          {/* Support & work orders */}
          <div className="bg-gradient-to-br from-purple-50 to-violet-50 border-2 border-purple-200 rounded-2xl p-8 mb-10 shadow-lg">
            <h2 className="text-2xl font-semibold text-slate-800 mb-5">
              Support and custom work
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-semibold text-slate-800 mb-2">Included with your subscription</h3>
                <ul className="text-sm text-slate-700 space-y-2 list-disc pl-5">
                  <li>
                    <strong>
                      {SUPPORT.onboardingHoursTotal} hours of Connie Premium Support
                    </strong>{' '}
                    — {SUPPORT.onboardingHoursPerMonth} hours a month across your first{' '}
                    {SUPPORT.onboardingMonths} months. Unused hours roll forward through your UAT
                    engagement; no new hours accrue after month {SUPPORT.onboardingMonths}.
                  </li>
                  <li>
                    <strong>{SUPPORT.freeWorkOrderHours} free work-order hours</strong>, usable any
                    time during UAT.
                  </li>
                  <li>
                    <strong>The shared ticketing system</strong> for everything day to day.
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold text-slate-800 mb-2">Custom work beyond that</h3>
                <div className="bg-white/70 rounded-xl p-5 border border-purple-200">
                  <div className="flex justify-between items-baseline mb-2">
                    <span className="text-slate-700 text-sm">During the pilot period</span>
                    <span className="text-2xl font-bold text-purple-700">
                      ${SUPPORT.workOrderRatePilot}
                      <span className="text-sm font-normal text-slate-500">/hr</span>
                    </span>
                  </div>
                  <div className="flex justify-between items-baseline">
                    <span className="text-slate-700 text-sm">Standard rate</span>
                    <span className="text-lg font-semibold text-slate-500">
                      ${SUPPORT.workOrderRateStandard}
                      <span className="text-sm font-normal">/hr</span>
                    </span>
                  </div>
                </div>
                <p className="text-xs text-slate-600 mt-3 leading-relaxed">
                  Every work order is quoted in writing and approved before any work starts.
                </p>
              </div>
            </div>
          </div>

          {/* CTAs */}
          <div className="bg-gradient-to-br from-slate-50 to-blue-50 border-2 border-slate-200 rounded-2xl p-8 shadow-lg text-center">
            <h2 className="text-2xl font-semibold text-slate-800 mb-3">
              Want these rates applied to your numbers?
            </h2>
            <p className="text-slate-600 mb-6 max-w-2xl mx-auto leading-relaxed">
              The intake wizard collects your operating hours, headcount and channel volumes and
              estimates your monthly cost. The estimate is indicative — the agreement is the
              agreement.
            </p>
            <div className="flex gap-3 justify-center flex-wrap">
              <Link
                href="/intake"
                className="inline-block px-6 py-3 bg-slate-800 text-white rounded-lg font-semibold hover:bg-slate-900 transition-colors"
              >
                Start the Intake Wizard →
              </Link>
              <Link
                href="/dataroom/user-acceptance-testing/pricing/invoice"
                className="inline-block px-6 py-3 bg-white border-2 border-slate-300 text-slate-700 rounded-lg font-semibold hover:border-slate-400 transition-colors"
              >
                See these rates on an invoice
              </Link>
            </div>
          </div>

          <p className="mt-8 text-xs text-slate-500 text-center leading-relaxed max-w-3xl mx-auto">
            Rates re-derived in {AUDIT_DATE} two ways — from actual June and July 2026 carrier
            invoices, and from current published rate cards — with any disagreement resolved in
            favour of published list price. Full working papers are held with Connie finance.
          </p>
        </div>
      </div>
    </div>
  )
}
