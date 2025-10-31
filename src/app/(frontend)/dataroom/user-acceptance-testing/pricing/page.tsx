'use client'

import React, { useState } from 'react'
import Link from 'next/link'

// Import rates from P&L Calculator
const WHOLESALE_RATES = {
  voice: {
    per_call: 0.0041,
    per_minute: 0.0129,
    avg_duration_minutes: 2.5
  },
  fax: {
    per_fax: 0.0788,
    fixed_monthly: 20.00
  },
  email: {
    per_email: 0.00
  },
  web_form: {
    per_form: 0.00
  },
  sms: {
    per_message: 0.0075 // Standard Twilio rate
  },
  platform: {
    default_monthly: 250.00
  }
}

const NSS_BASELINE = {
  voice_calls: 55,
  faxes: 76,
  emails: 142,
  web_forms: 7,
  sms_messages: 50
}

const SUPPORT_COSTS = {
  month_1: { hours_per_week: 12, rate_per_hour: 30 },
  month_2: { hours_per_week: 5, rate_per_hour: 30 },
  month_3_plus: { hours_per_week: 3, rate_per_hour: 30 }
}

export default function UATPricingPage() {
  const [volumes, setVolumes] = useState(NSS_BASELINE)

  // Calculate blended voice rate
  const blendedVoiceRate = WHOLESALE_RATES.voice.per_call +
    (WHOLESALE_RATES.voice.per_minute * WHOLESALE_RATES.voice.avg_duration_minutes)

  // Calculate costs
  const voiceCost = volumes.voice_calls * blendedVoiceRate
  const faxCost = (volumes.faxes * WHOLESALE_RATES.fax.per_fax) + WHOLESALE_RATES.fax.fixed_monthly
  const emailCost = volumes.emails * WHOLESALE_RATES.email.per_email
  const webFormCost = volumes.web_forms * WHOLESALE_RATES.web_form.per_form
  const smsCost = volumes.sms_messages * WHOLESALE_RATES.sms.per_message

  const transactionCOGS = voiceCost + faxCost + emailCost + webFormCost + smsCost
  const platformOpex = WHOLESALE_RATES.platform.default_monthly

  // Support costs
  const supportMonth1 = SUPPORT_COSTS.month_1.hours_per_week * 4 * SUPPORT_COSTS.month_1.rate_per_hour
  const supportMonth2 = SUPPORT_COSTS.month_2.hours_per_week * 4 * SUPPORT_COSTS.month_2.rate_per_hour
  const supportMonth3Plus = SUPPORT_COSTS.month_3_plus.hours_per_week * 4 * SUPPORT_COSTS.month_3_plus.rate_per_hour

  const totalMonth1 = transactionCOGS + platformOpex + supportMonth1
  const totalSteadyState = transactionCOGS + platformOpex + supportMonth3Plus

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-200 text-slate-800">
      <div className="container mx-auto px-6 py-16">
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
          <h1 className="text-4xl font-light text-slate-800 mb-4">
            UAT Cohort Pricing
          </h1>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto">
            Transparent, cost-based pricing for User Acceptance Testing cohort participants
          </p>
        </div>

        {/* Pricing Grid */}
        <div className="max-w-6xl mx-auto mb-12">
          <div className="bg-white/80 backdrop-blur-sm border border-slate-300 rounded-2xl p-8 shadow-lg">
            <h2 className="text-2xl font-semibold text-slate-800 mb-6">Per-Channel Costs</h2>

            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b-2 border-slate-300">
                    <th className="text-left py-3 px-4 text-slate-700 font-semibold">Channel</th>
                    <th className="text-right py-3 px-4 text-slate-700 font-semibold">Per-Transaction Rate</th>
                    <th className="text-right py-3 px-4 text-slate-700 font-semibold">Fixed Monthly</th>
                    <th className="text-right py-3 px-4 text-slate-700 font-semibold">Typical Volume<br/>(NSS baseline)</th>
                    <th className="text-right py-3 px-4 text-slate-700 font-semibold">Est. Monthly Cost</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200">
                  <tr className="hover:bg-slate-50">
                    <td className="py-3 px-4 font-medium">Voice Calls</td>
                    <td className="text-right py-3 px-4 text-slate-600">
                      ${blendedVoiceRate.toFixed(4)}/call*
                    </td>
                    <td className="text-right py-3 px-4 text-slate-600">$0</td>
                    <td className="text-right py-3 px-4 text-slate-600">{volumes.voice_calls} calls</td>
                    <td className="text-right py-3 px-4 font-semibold text-slate-800">
                      ${voiceCost.toFixed(2)}
                    </td>
                  </tr>
                  <tr className="hover:bg-slate-50">
                    <td className="py-3 px-4 font-medium">Faxes</td>
                    <td className="text-right py-3 px-4 text-slate-600">
                      ${WHOLESALE_RATES.fax.per_fax.toFixed(4)}/fax
                    </td>
                    <td className="text-right py-3 px-4 text-slate-600">
                      ${WHOLESALE_RATES.fax.fixed_monthly.toFixed(2)}
                    </td>
                    <td className="text-right py-3 px-4 text-slate-600">{volumes.faxes} faxes</td>
                    <td className="text-right py-3 px-4 font-semibold text-slate-800">
                      ${faxCost.toFixed(2)}
                    </td>
                  </tr>
                  <tr className="hover:bg-slate-50">
                    <td className="py-3 px-4 font-medium">Emails</td>
                    <td className="text-right py-3 px-4 text-green-600 font-semibold">FREE</td>
                    <td className="text-right py-3 px-4 text-slate-600">$0</td>
                    <td className="text-right py-3 px-4 text-slate-600">{volumes.emails} emails</td>
                    <td className="text-right py-3 px-4 font-semibold text-green-600">
                      ${emailCost.toFixed(2)}
                    </td>
                  </tr>
                  <tr className="hover:bg-slate-50">
                    <td className="py-3 px-4 font-medium">Web Forms</td>
                    <td className="text-right py-3 px-4 text-green-600 font-semibold">FREE</td>
                    <td className="text-right py-3 px-4 text-slate-600">$0</td>
                    <td className="text-right py-3 px-4 text-slate-600">{volumes.web_forms} forms</td>
                    <td className="text-right py-3 px-4 font-semibold text-green-600">
                      ${webFormCost.toFixed(2)}
                    </td>
                  </tr>
                  <tr className="hover:bg-slate-50">
                    <td className="py-3 px-4 font-medium">SMS</td>
                    <td className="text-right py-3 px-4 text-slate-600">
                      ${WHOLESALE_RATES.sms.per_message.toFixed(4)}/msg
                    </td>
                    <td className="text-right py-3 px-4 text-slate-600">$0</td>
                    <td className="text-right py-3 px-4 text-slate-600">{volumes.sms_messages} messages</td>
                    <td className="text-right py-3 px-4 font-semibold text-slate-800">
                      ${smsCost.toFixed(2)}
                    </td>
                  </tr>
                  <tr className="bg-slate-100 font-bold border-t-2 border-slate-300">
                    <td className="py-3 px-4" colSpan={4}>Transaction COGS Subtotal</td>
                    <td className="text-right py-3 px-4 text-slate-800">
                      ${transactionCOGS.toFixed(2)}/month
                    </td>
                  </tr>
                  <tr className="bg-blue-50">
                    <td className="py-3 px-4 font-medium">Platform OpEx Share</td>
                    <td className="text-right py-3 px-4 text-slate-600" colSpan={2}>
                      Fixed monthly allocation
                    </td>
                    <td className="text-right py-3 px-4 text-slate-600">Per cohort member</td>
                    <td className="text-right py-3 px-4 font-semibold text-blue-900">
                      ${platformOpex.toFixed(2)}/month
                    </td>
                  </tr>
                  <tr className="bg-slate-200 font-bold text-lg border-t-2 border-slate-400">
                    <td className="py-4 px-4" colSpan={4}>TOTAL (excl. support)</td>
                    <td className="text-right py-4 px-4 text-slate-900">
                      ${(transactionCOGS + platformOpex).toFixed(2)}/month
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="mt-4 text-sm text-slate-600 italic">
              *Voice blended rate: ${WHOLESALE_RATES.voice.per_call.toFixed(4)}/call + (${WHOLESALE_RATES.voice.per_minute.toFixed(4)}/min × {WHOLESALE_RATES.voice.avg_duration_minutes} min avg) = ${blendedVoiceRate.toFixed(4)}/call
            </div>
          </div>
        </div>

        {/* Support Costs Section */}
        <div className="max-w-6xl mx-auto mb-12">
          <div className="bg-gradient-to-br from-purple-50 to-blue-50 border-2 border-purple-200 rounded-2xl p-8 shadow-lg">
            <h2 className="text-2xl font-semibold text-slate-800 mb-6">Support Costs (Time-Based)</h2>

            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-white/60 rounded-xl p-6 border border-purple-200">
                <div className="text-purple-600 font-bold text-sm mb-2">MONTH 1 - Onboarding</div>
                <div className="text-3xl font-bold text-slate-900 mb-2">
                  ${supportMonth1.toLocaleString()}
                </div>
                <div className="text-sm text-slate-600">
                  {SUPPORT_COSTS.month_1.hours_per_week} hrs/week × ${SUPPORT_COSTS.month_1.rate_per_hour}/hr
                </div>
              </div>

              <div className="bg-white/60 rounded-xl p-6 border border-purple-200">
                <div className="text-purple-600 font-bold text-sm mb-2">MONTH 2 - Stabilization</div>
                <div className="text-3xl font-bold text-slate-900 mb-2">
                  ${supportMonth2.toLocaleString()}
                </div>
                <div className="text-sm text-slate-600">
                  {SUPPORT_COSTS.month_2.hours_per_week} hrs/week × ${SUPPORT_COSTS.month_2.rate_per_hour}/hr
                </div>
              </div>

              <div className="bg-white/60 rounded-xl p-6 border border-green-200">
                <div className="text-green-600 font-bold text-sm mb-2">MONTH 3+ - Steady State</div>
                <div className="text-3xl font-bold text-green-800 mb-2">
                  ${supportMonth3Plus.toLocaleString()}
                </div>
                <div className="text-sm text-slate-600">
                  {SUPPORT_COSTS.month_3_plus.hours_per_week} hrs/week × ${SUPPORT_COSTS.month_3_plus.rate_per_hour}/hr
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Total Cost Examples */}
        <div className="max-w-6xl mx-auto mb-12">
          <div className="grid md:grid-cols-2 gap-8">
            {/* Month 1 Total */}
            <div className="bg-gradient-to-br from-orange-50 to-red-50 border-2 border-orange-200 rounded-2xl p-8 shadow-lg">
              <h3 className="text-xl font-semibold text-slate-800 mb-4">Total First Month Cost</h3>
              <div className="space-y-2 text-slate-700 mb-4">
                <div className="flex justify-between">
                  <span>Transaction COGS:</span>
                  <span className="font-semibold">${transactionCOGS.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Platform OpEx Share:</span>
                  <span className="font-semibold">${platformOpex.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Support (Month 1):</span>
                  <span className="font-semibold">${supportMonth1.toLocaleString()}</span>
                </div>
                <div className="border-t-2 border-orange-300 pt-2 mt-2 flex justify-between text-lg font-bold text-orange-900">
                  <span>TOTAL MONTH 1:</span>
                  <span>${totalMonth1.toLocaleString()}</span>
                </div>
              </div>
            </div>

            {/* Steady State Total */}
            <div className="bg-gradient-to-br from-green-50 to-teal-50 border-2 border-green-200 rounded-2xl p-8 shadow-lg">
              <h3 className="text-xl font-semibold text-slate-800 mb-4">Steady State Cost (Month 3+)</h3>
              <div className="space-y-2 text-slate-700 mb-4">
                <div className="flex justify-between">
                  <span>Transaction COGS:</span>
                  <span className="font-semibold">${transactionCOGS.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Platform OpEx Share:</span>
                  <span className="font-semibold">${platformOpex.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Support (Steady):</span>
                  <span className="font-semibold">${supportMonth3Plus.toLocaleString()}</span>
                </div>
                <div className="border-t-2 border-green-300 pt-2 mt-2 flex justify-between text-lg font-bold text-green-900">
                  <span>TOTAL MONTH 3+:</span>
                  <span>${totalSteadyState.toLocaleString()}/month</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Fairness Principles */}
        <div className="max-w-6xl mx-auto">
          <div className="bg-white/80 backdrop-blur-sm border border-slate-300 rounded-2xl p-8 shadow-lg">
            <h2 className="text-2xl font-semibold text-slate-800 mb-6 text-center">UAT Cohort Fairness Principles</h2>

            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="text-4xl mb-3">📊</div>
                <h3 className="font-semibold text-slate-800 mb-2">Cost-Based Pricing</h3>
                <p className="text-sm text-slate-600">
                  All rates reflect actual wholesale costs from platform providers. No markup on infrastructure.
                </p>
              </div>

              <div className="text-center">
                <div className="text-4xl mb-3">🔍</div>
                <h3 className="font-semibold text-slate-800 mb-2">Complete Transparency</h3>
                <p className="text-sm text-slate-600">
                  Every cost is visible and verifiable. No hidden fees or surprise charges.
                </p>
              </div>

              <div className="text-center">
                <div className="text-4xl mb-3">🤝</div>
                <h3 className="font-semibold text-slate-800 mb-2">Shared Benefit</h3>
                <p className="text-sm text-slate-600">
                  Platform costs are split equally among cohort members. More participants = lower individual cost.
                </p>
              </div>
            </div>

            <div className="mt-8 p-4 bg-blue-50 border border-blue-200 rounded-lg">
              <p className="text-sm text-slate-700 text-center">
                <strong>Questions about pricing?</strong> Contact Chris Berno to discuss your organization&apos;s specific usage patterns and cost projections.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
