'use client'

import React from 'react'
import Link from 'next/link'

const PDF = '/dataroom/uat-pricing/connie-uat-pricing-policy-aug-2026.pdf'

const CATEGORIES = [
  {
    n: '1',
    name: 'Direct Usage',
    price: 'varies',
    tint: 'from-blue-50 to-cyan-50 border-blue-200',
    accent: 'text-blue-700',
    lead: 'What you use',
    body: 'Changes month to month with your actual use across every active channel. For UAT only, we pass through our wholesale costs with no markup — platform time per user, voice minutes, fax pages, carrier fees. Billed monthly on real usage, payment net 30.',
  },
  {
    n: '2',
    name: 'Indirect Usage',
    price: '$100',
    tint: 'from-green-50 to-emerald-50 border-green-200',
    accent: 'text-green-700',
    lead: 'Keeps the platform running',
    body: 'Cloud hosting, security and HIPAA infrastructure, the phone-system core. The whole pool is $481 a month (June 2026); five or more partners cover it.',
  },
  {
    n: '3',
    name: 'Platform Services',
    price: '$550',
    tint: 'from-purple-50 to-violet-50 border-purple-200',
    accent: 'text-purple-700',
    lead: 'Keeps the platform improving',
    body: 'Pays back what built Connie and funds the development that continues. In NSS’s books this is the Professional Services line.',
  },
  {
    n: '4',
    name: 'Support Services',
    price: '$200',
    tint: 'from-amber-50 to-orange-50 border-amber-200',
    accent: 'text-amber-700',
    lead: 'Helps your team',
    body: '24 onboarding hours plus 5 free work-order hours, then the same ticketing system that runs Connie support today.',
  },
]

const BENEFITS = [
  {
    icon: '🌐',
    title: 'Wholesale network pricing',
    body: 'Agent access is billed by the hour and shared across your whole team rather than per named seat. Hourly is cheaper whenever the average person is on the system less than 150 hours a month — for teams of part-timers and volunteers, nearly always. Our own June 2026 bill: 192 active hours across 25 users cost $192.36; two named seats alone would have cost $300.',
  },
  {
    icon: '🤝',
    title: '24 hours of Connie Premium Support',
    body: 'Eight hours a month across your first three months. Unused hours roll forward through your UAT engagement. No new hours accrue after month three — the bank is what it is.',
  },
  {
    icon: '🛠️',
    title: '5 free work-order hours',
    body: 'Want something built just for you? That is a work order, quoted in writing and approved before any work starts, at $250 an hour discounted to $150 during the pilot. Your first five hours are free.',
  },
  {
    icon: '🎟️',
    title: 'The same support desk everyone uses',
    body: 'For everything day to day you work through the same ticketing system that runs Connie support today — the operation every partner shares, not a side channel.',
  },
]

export default function UATPricingPolicyPage() {
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
          <div className="text-6xl mb-4">📜</div>
          <h1 className="text-4xl font-light text-slate-800 mb-4">
            UAT Partner Pricing Policy
          </h1>
          <p className="text-lg text-slate-600 max-w-3xl mx-auto">
            Built on the four-category model proposed on November 3, 2025 and agreed to by all
            stakeholders. Updated August 2026.
          </p>
          <div className="mt-6">
            <a
              href={PDF}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block px-5 py-2.5 bg-slate-800 text-white rounded-lg text-sm font-semibold hover:bg-slate-900 transition-colors"
            >
              ⬇ Download the PDF
            </a>
          </div>
        </div>

        <div className="max-w-5xl mx-auto">

          {/* UAT partners only */}
          <div className="bg-amber-50 border-2 border-amber-200 rounded-2xl p-6 mb-10 shadow-sm">
            <h2 className="text-lg font-semibold text-slate-800 mb-2">UAT partners only</h2>
            <p className="text-slate-700 leading-relaxed">
              This pricing policy covers Connie UAT partners only. Commercial pricing and terms
              will be published before public launch.
            </p>
          </div>

          {/* The pricing model */}
          <div className="mb-10">
            <h2 className="text-2xl font-semibold text-slate-800 mb-4">The pricing model</h2>
            <p className="text-slate-600 mb-8 leading-relaxed max-w-3xl">
              A UAT partner pays for their monthly network usage, plus three flat monthly charges
              that keep the platform running, keep it improving, and support their team.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 mb-6">
              {CATEGORIES.map((c) => (
                <div
                  key={c.n}
                  className={`bg-gradient-to-br ${c.tint} border-2 rounded-xl p-6 shadow-sm`}
                >
                  <div className="text-xs font-semibold text-slate-500 mb-1">
                    {c.n} · {c.lead}
                  </div>
                  <div className="text-lg font-semibold text-slate-800">{c.name}</div>
                  <div className={`text-3xl font-bold my-2 ${c.accent}`}>{c.price}</div>
                  <p className="text-sm text-slate-600 leading-relaxed">{c.body}</p>
                </div>
              ))}
            </div>

            <div className="bg-white border-2 border-slate-800 rounded-xl px-8 py-5 text-center shadow-md">
              <div className="text-xl font-bold text-slate-900">
                Monthly bill = usage + $850 flat
              </div>
              <div className="text-sm text-slate-500 mt-1">
                All-in, typically $950–1,200 a month · usage trued up against carrier invoices yearly
              </div>
            </div>
          </div>

          {/* What partners get */}
          <div className="mb-10">
            <h2 className="text-2xl font-semibold text-slate-800 mb-6">What UAT partners get</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {BENEFITS.map((b) => (
                <div
                  key={b.title}
                  className="bg-white/70 backdrop-blur border-2 border-slate-200 rounded-xl p-6 shadow-sm"
                >
                  <div className="text-3xl mb-3">{b.icon}</div>
                  <h3 className="text-lg font-semibold text-slate-800 mb-2">{b.title}</h3>
                  <p className="text-sm text-slate-600 leading-relaxed">{b.body}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Billing cycle */}
          <div className="bg-gradient-to-br from-slate-50 to-blue-50 border-2 border-slate-200 rounded-2xl p-8 mb-10 shadow-lg">
            <h2 className="text-2xl font-semibold text-slate-800 mb-5">Billing cycle</h2>
            <ol className="space-y-4 text-slate-700">
              <li className="flex gap-4">
                <span className="flex-shrink-0 w-7 h-7 rounded-full bg-slate-800 text-white text-sm font-bold flex items-center justify-center">
                  1
                </span>
                <span className="leading-relaxed">
                  <strong>Billed at the beginning of each month</strong> — flat charges in advance,
                  usage in arrears. Payment net 30 from the invoice date. See a{' '}
                  <Link
                    href="/dataroom/user-acceptance-testing/pricing/invoice"
                    className="text-blue-600 font-semibold hover:underline"
                  >
                    sample invoice
                  </Link>
                  .
                </span>
              </li>
              <li className="flex gap-4">
                <span className="flex-shrink-0 w-7 h-7 rounded-full bg-slate-800 text-white text-sm font-bold flex items-center justify-center">
                  2
                </span>
                <span className="leading-relaxed">
                  <strong>Annual usage true-up at fiscal year end.</strong> We lay your billed usage
                  beside the carrier invoices behind it, so the pass-through is something you can
                  check rather than something we assert. The flat charges do not true up — that is
                  what makes them flat.
                </span>
              </li>
            </ol>
          </div>

          {/* Estimating */}
          <div className="bg-gradient-to-br from-green-50 to-teal-50 border-2 border-green-200 rounded-2xl p-8 mb-10 shadow-lg">
            <h2 className="text-2xl font-semibold text-slate-800 mb-3">
              Estimating your cost before you sign
            </h2>
            <p className="text-slate-600 mb-5 leading-relaxed">
              The intake wizard collects what an estimate needs — your operating hours by day,
              headcount by role, and channel volumes — and produces an estimate across all four
              categories. The estimate is simple because the pricing is simple: only Direct Usage
              varies. <strong className="text-slate-800">Estimate your usage and add $850.</strong>
            </p>
            <Link
              href="/intake"
              className="inline-block px-5 py-2.5 bg-slate-800 text-white rounded-lg text-sm font-semibold hover:bg-slate-900 transition-colors"
            >
              Start the Intake Wizard →
            </Link>
          </div>

          {/* How to take part */}
          <div className="bg-white/70 backdrop-blur border-2 border-slate-200 rounded-2xl p-8 shadow-sm">
            <h2 className="text-2xl font-semibold text-slate-800 mb-3">
              How nonprofits can take part
            </h2>
            <p className="text-slate-600 leading-relaxed">
              The Connie UAT pilot is by invitation. To request an invitation, or to suggest a
              nonprofit that might be a good fit, complete the{' '}
              <Link href="/intake" className="text-blue-600 font-semibold hover:underline">
                interest form
              </Link>
              . A member of the Connie team will follow up with more information and next steps.
            </p>
          </div>

          {/* Sources */}
          <p className="mt-10 text-xs text-slate-500 leading-relaxed text-center max-w-3xl mx-auto">
            <strong>Where these numbers come from.</strong> Connie&rsquo;s June 2026 monthly close;
            June and July 2026 Twilio invoices checked against current published rates; the
            four-category model and the work-order rate from stakeholder correspondence of
            November 3 and November 11, 2025. Full working papers are held with Connie finance.
          </p>
        </div>
      </div>
    </div>
  )
}
