'use client'

import React, { useState, useEffect, useCallback } from 'react'

// ConnieRTC wholesale pricing data (validated from NSS audit Oct 2025)
const WHOLESALE_RATES = {
  voice: {
    per_call: 0.0041,
    per_minute: 0.0129,
    avg_duration_minutes: 2.5 // NSS average call duration
  },
  fax: {
    per_fax: 0.0788, // Based on 1.75 pages average @ $0.045/page
    fixed_monthly: 20.00 // Sinch baseline
  },
  email: {
    per_email: 0.00 // Inbound via Twilio Conversations = FREE
  },
  web_form: {
    per_form: 0.00 // Delivered via Twilio Conversations = FREE
  },
  platform: {
    fixed_monthly: 553.00 // Platform OpEx (validated Sept 2025)
  }
}

const DEFAULT_VALUES = {
  // Transaction-level defaults (based on NSS monthly averages)
  voice_calls: 55,
  fax_count: 76,
  email_count: 142,
  web_form_count: 7
}

interface CalculatorState {
  voiceCalls: number
  faxCount: number
  emailCount: number
  webFormCount: number
  targetMargin: number
}

interface CostBreakdown {
  platformCost: number
  voiceCallCost: number
  faxVariableCost: number
  faxFixedCost: number
  emailTransactionCost: number
  webFormCost: number
  transactionTotalCost: number
  wholesaleCost: number
  suggestedPrice: number
  grossMargin: number
  marginPercentage: number
}

export default function COGSCalculator() {
  const [state, setState] = useState<CalculatorState>({
    voiceCalls: DEFAULT_VALUES.voice_calls,
    faxCount: DEFAULT_VALUES.fax_count,
    emailCount: DEFAULT_VALUES.email_count,
    webFormCount: DEFAULT_VALUES.web_form_count,
    targetMargin: 40
  })

  const [costs, setCosts] = useState<CostBreakdown>({
    platformCost: 0,
    voiceCallCost: 0,
    faxVariableCost: 0,
    faxFixedCost: 0,
    emailTransactionCost: 0,
    webFormCost: 0,
    transactionTotalCost: 0,
    wholesaleCost: 0,
    suggestedPrice: 0,
    grossMargin: 0,
    marginPercentage: 0
  })

  const [showComparison, setShowComparison] = useState(false)

  const calculateCosts = useCallback(() => {
    const platformCost = WHOLESALE_RATES.platform.fixed_monthly

    // Transaction-level wholesale costs
    const blendedVoiceCost = WHOLESALE_RATES.voice.per_call +
      (WHOLESALE_RATES.voice.per_minute * WHOLESALE_RATES.voice.avg_duration_minutes)
    const voiceCallCost = state.voiceCalls * blendedVoiceCost

    const faxVariableCost = state.faxCount * WHOLESALE_RATES.fax.per_fax
    const faxFixedCost = WHOLESALE_RATES.fax.fixed_monthly

    const emailTransactionCost = state.emailCount * WHOLESALE_RATES.email.per_email
    const webFormCost = state.webFormCount * WHOLESALE_RATES.web_form.per_form

    const transactionTotalCost = voiceCallCost + faxVariableCost + faxFixedCost +
      emailTransactionCost + webFormCost

    const wholesaleCost = platformCost + transactionTotalCost

    // Calculate suggested price with target margin
    const marginDecimal = state.targetMargin / 100
    const suggestedPrice = marginDecimal >= 1 ? 0 : wholesaleCost / (1 - marginDecimal)
    const grossMargin = suggestedPrice - wholesaleCost
    const marginPercentage = wholesaleCost > 0 ? (grossMargin / suggestedPrice) * 100 : 0

    setCosts({
      platformCost,
      voiceCallCost,
      faxVariableCost,
      faxFixedCost,
      emailTransactionCost,
      webFormCost,
      transactionTotalCost,
      wholesaleCost,
      suggestedPrice,
      grossMargin,
      marginPercentage
    })
  }, [state])

  useEffect(() => {
    calculateCosts()
  }, [calculateCosts])

  const handleReset = () => {
    setState({
      voiceCalls: DEFAULT_VALUES.voice_calls,
      faxCount: DEFAULT_VALUES.fax_count,
      emailCount: DEFAULT_VALUES.email_count,
      webFormCount: DEFAULT_VALUES.web_form_count,
      targetMargin: 40
    })
  }

  const calculateMarginScenarios = () => {
    const margins = [30, 40, 50, 60]
    const wholesaleCost = costs.wholesaleCost

    return margins.map(margin => {
      const marginDecimal = margin / 100
      const price = marginDecimal >= 1 ? 0 : wholesaleCost / (1 - marginDecimal)
      const grossProfit = price - wholesaleCost
      return {
        margin,
        price,
        grossProfit
      }
    })
  }

  return (
    <div className="w-full max-w-7xl mx-auto">
      {/* Configuration Section */}
      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <div className="bg-white/80 backdrop-blur-sm border border-slate-300 rounded-2xl p-8 shadow-lg">
            <h2 className="text-2xl font-semibold text-slate-800 mb-6">Transaction Configuration</h2>

            <div className="space-y-6">
              <div>
                <label htmlFor="voiceCalls" className="block text-sm font-medium text-slate-700 mb-2">
                  Voice Calls
                  <span className="text-slate-500 font-normal ml-2">
                    ($0.0041/call + $0.0129/min, avg 2.5 min = $0.036/call)
                  </span>
                </label>
                <input
                  id="voiceCalls"
                  type="number"
                  value={state.voiceCalls}
                  onChange={(e) => setState({ ...state, voiceCalls: parseInt(e.target.value) || 0 })}
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  min={0}
                />
              </div>

              <div>
                <label htmlFor="faxCount" className="block text-sm font-medium text-slate-700 mb-2">
                  Faxes
                  <span className="text-slate-500 font-normal ml-2">
                    ($0.0788/fax + $20/month fixed)
                  </span>
                </label>
                <input
                  id="faxCount"
                  type="number"
                  value={state.faxCount}
                  onChange={(e) => setState({ ...state, faxCount: parseInt(e.target.value) || 0 })}
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  min={0}
                />
              </div>

              <div>
                <label htmlFor="emailCount" className="block text-sm font-medium text-slate-700 mb-2">
                  Emails
                  <span className="text-slate-500 font-normal ml-2">
                    (Free - inbound via Twilio Conversations)
                  </span>
                </label>
                <input
                  id="emailCount"
                  type="number"
                  value={state.emailCount}
                  onChange={(e) => setState({ ...state, emailCount: parseInt(e.target.value) || 0 })}
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  min={0}
                />
              </div>

              <div>
                <label htmlFor="webFormCount" className="block text-sm font-medium text-slate-700 mb-2">
                  Web Forms
                  <span className="text-slate-500 font-normal ml-2">
                    (Free - delivered via Twilio Conversations)
                  </span>
                </label>
                <input
                  id="webFormCount"
                  type="number"
                  value={state.webFormCount}
                  onChange={(e) => setState({ ...state, webFormCount: parseInt(e.target.value) || 0 })}
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  min={0}
                />
              </div>

              <div className="border-t border-slate-200 pt-6 mt-6">
                <h3 className="text-lg font-semibold text-slate-800 mb-4">Pricing Strategy</h3>
                <div>
                  <label htmlFor="targetMargin" className="block text-sm font-medium text-slate-700 mb-2">
                    Target Gross Margin (%)
                  </label>
                  <input
                    id="targetMargin"
                    type="number"
                    value={state.targetMargin}
                    onChange={(e) => setState({ ...state, targetMargin: parseInt(e.target.value) || 0 })}
                    className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    min={0}
                    max={99}
                  />
                  <p className="text-sm text-slate-500 mt-2">
                    Common scenarios: 30% (low), 40% (base), 50% (premium), 60% (high)
                  </p>
                </div>
              </div>

              <div className="flex gap-3 pt-4">
                <button
                  onClick={handleReset}
                  className="px-6 py-2 bg-slate-200 hover:bg-slate-300 text-slate-800 font-medium rounded-lg transition-colors"
                >
                  Reset All
                </button>
                <button
                  onClick={() => setShowComparison(!showComparison)}
                  className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors"
                >
                  {showComparison ? 'Hide' : 'Compare'} Margin Scenarios
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Results Section */}
        <div className="lg:col-span-1">
          <div className="bg-white/80 backdrop-blur-sm border border-slate-300 rounded-2xl p-8 shadow-lg sticky top-8">
            <h2 className="text-2xl font-semibold text-slate-800 mb-6">P&L Analysis</h2>

            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 border-2 border-blue-200 rounded-xl p-6 mb-6 text-center">
              <div className="text-4xl font-bold text-blue-900">
                ${costs.suggestedPrice.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </div>
              <div className="text-sm text-blue-700 mt-2">
                Suggested Monthly Price ({state.targetMargin}% margin)
              </div>
            </div>

            <div className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-slate-600">Platform OpEx (Fixed)</span>
                <span className="font-semibold">${costs.platformCost.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-600">Voice Calls ({state.voiceCalls})</span>
                <span className="font-semibold">${costs.voiceCallCost.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-600">Fax Variable ({state.faxCount})</span>
                <span className="font-semibold">${costs.faxVariableCost.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-600">Fax Fixed (Sinch)</span>
                <span className="font-semibold">${costs.faxFixedCost.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-600">Email ({state.emailCount})</span>
                <span className="font-semibold">${costs.emailTransactionCost.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-600">Web Forms ({state.webFormCount})</span>
                <span className="font-semibold">${costs.webFormCost.toFixed(2)}</span>
              </div>

              <div className="border-t border-slate-200 pt-3 mt-3">
                <div className="flex justify-between font-bold text-slate-800">
                  <span>Total Wholesale Cost</span>
                  <span>${costs.wholesaleCost.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-green-700 font-bold mt-2">
                  <span>Gross Margin</span>
                  <span>${costs.grossMargin.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-green-600 mt-1">
                  <span>Margin %</span>
                  <span>{costs.marginPercentage.toFixed(1)}%</span>
                </div>
              </div>
            </div>

            <div className="mt-6 pt-6 border-t border-slate-200">
              <h3 className="text-sm font-semibold text-slate-800 mb-3">ConnieRTC Wholesale Rates</h3>
              <div className="space-y-2 text-xs text-slate-600">
                <div className="flex justify-between">
                  <span>Platform OpEx</span>
                  <span>$553.00/month</span>
                </div>
                <div className="flex justify-between">
                  <span>Voice (Per Call)</span>
                  <span>$0.0041</span>
                </div>
                <div className="flex justify-between">
                  <span>Voice (Per Minute)</span>
                  <span>$0.0129</span>
                </div>
                <div className="flex justify-between">
                  <span>Fax (Variable)</span>
                  <span>$0.0788/fax</span>
                </div>
                <div className="flex justify-between">
                  <span>Fax (Fixed Baseline)</span>
                  <span>$20.00/month</span>
                </div>
                <div className="flex justify-between">
                  <span>Email</span>
                  <span>FREE</span>
                </div>
                <div className="flex justify-between">
                  <span>Web Forms</span>
                  <span>FREE</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Margin Comparison Section */}
      {showComparison && (
        <div className="mt-8 bg-white/80 backdrop-blur-sm border border-slate-300 rounded-2xl p-8 shadow-lg">
          <h2 className="text-2xl font-semibold text-slate-800 mb-6">Margin Scenario Comparison</h2>
          <div className="grid md:grid-cols-4 gap-6">
            {calculateMarginScenarios().map((scenario) => (
              <div
                key={scenario.margin}
                className={`border-2 rounded-xl p-6 ${
                  scenario.margin === state.targetMargin
                    ? 'border-blue-500 bg-blue-50'
                    : 'border-slate-200 bg-white'
                }`}
              >
                <h3 className="text-lg font-semibold text-slate-800 mb-3">
                  {scenario.margin}% Margin
                </h3>
                <div className={`text-3xl font-bold mb-4 ${
                  scenario.margin === state.targetMargin ? 'text-blue-900' : 'text-slate-800'
                }`}>
                  ${scenario.price.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </div>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between text-slate-600">
                    <span>Wholesale Cost:</span>
                    <span>${costs.wholesaleCost.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-green-700 font-semibold">
                    <span>Gross Margin:</span>
                    <span>${scenario.grossProfit.toFixed(2)}</span>
                  </div>
                </div>
                {scenario.margin === state.targetMargin && (
                  <div className="mt-4 px-3 py-2 bg-blue-100 border border-blue-300 rounded-lg text-center">
                    <span className="text-xs font-semibold text-blue-900">Current Selection</span>
                  </div>
                )}
              </div>
            ))}
          </div>
          <div className="mt-6 p-4 bg-slate-50 border border-slate-200 rounded-lg">
            <p className="text-sm text-slate-600">
              <strong>Pricing Scenarios:</strong> Compare different margin targets to find the optimal pricing strategy for your business.
              Higher margins increase profit per customer but may impact competitiveness.
            </p>
          </div>
        </div>
      )}
    </div>
  )
}
