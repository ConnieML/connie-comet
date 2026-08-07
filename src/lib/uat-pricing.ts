/**
 * UAT pricing — the single source of truth.
 *
 * Every surface that quotes a UAT number imports from here: the rate card page,
 * the pricing policy page, and the UAT cost estimator. If a figure lives in two
 * places it will eventually disagree with itself — that is exactly how the old
 * /dataroom/p-and-l-calculator ended up understating a partner's network cost by
 * roughly 7.6x for ten months, and how the retired /pricing/breakdown page came
 * to contradict the policy on both rates and support hours.
 *
 * Provenance: rates re-derived two ways in August 2026 — from actual June/July
 * 2026 Twilio and Sinch invoices, and from the published rate cards — with any
 * disagreement resolved in favour of published list price (the conservative
 * direction for a partner quote).
 *
 * Canonical document: Connie UAT Partner Pricing Policy, August 2026.
 * Do not edit a number here without updating that policy in the same change.
 */

export const AUDIT_DATE = 'August 2026'

/** Metered, passed through at our wholesale cost. UAT only — no markup. */
export const DIRECT_RATES = [
  {
    key: 'platform_time',
    label: 'Platform time',
    rate: 1.0,
    unit: 'per active user hour',
    display: '$1.00',
    note: 'Shared across your whole team — not per named seat. This is the largest line on most bills.',
    dominant: true,
  },
  {
    key: 'voice',
    label: 'Voice',
    rate: 0.0085,
    unit: 'per minute',
    display: '$0.0085',
    note: 'Inbound and outbound, published list rate.',
  },
  {
    key: 'local_number',
    label: 'Local phone number',
    rate: 1.15,
    unit: 'per number, per month',
    display: '$1.15',
    note: 'Each number you keep on the platform.',
  },
  {
    key: 'tollfree_number',
    label: 'Toll-free number',
    rate: 2.15,
    unit: 'per number, per month',
    display: '$2.15',
    note: 'Optional.',
  },
  {
    key: 'sms',
    label: 'SMS',
    rate: 0.0079,
    unit: 'per segment',
    display: '$0.0079',
    note: 'A long message counts as more than one segment.',
  },
  {
    key: 'a2p',
    label: 'Messaging campaign registration',
    rate: 1.5,
    unit: 'per month',
    display: '$1.50',
    note: 'Carrier requirement for business texting.',
  },
  {
    key: 'fax',
    label: 'Fax',
    rate: 0.045,
    unit: 'per page',
    display: '$0.045',
    note: 'Send and receive.',
  },
  {
    key: 'recording',
    label: 'Call recording storage',
    rate: 2.4,
    unit: 'per month',
    display: '$2.40',
    note: 'Only if recording is switched on.',
  },
  {
    key: 'email_webform',
    label: 'Email and web-form intake',
    rate: 0,
    unit: 'no metered charge',
    display: '$0.00',
    note: 'Included. There is no per-message cost for these channels.',
    free: true,
  },
  {
    key: 'taxes',
    label: 'Taxes and carrier fees',
    rate: 0.01,
    unit: 'of the usage subtotal',
    display: '~1%',
    note: 'Passed through exactly as billed to us.',
  },
] as const

/** The named-seat alternative, and where the two cross over. */
export const SEAT_RATE = 150
export const SEAT_CROSSOVER_HOURS = 150

/** Fixed monthly charges. These never vary. */
export const FLAT_CHARGES = [
  {
    key: 'indirect',
    n: 2,
    label: 'Indirect Usage',
    amount: 100,
    lead: 'Keeps the platform running',
    note: 'Cloud hosting, security and HIPAA infrastructure, the phone-system core. The whole pool is $481 a month; five or more partners cover it.',
  },
  {
    key: 'platform',
    n: 3,
    label: 'Platform Services',
    amount: 550,
    lead: 'Keeps the platform improving',
    note: 'Pays back what built Connie and funds the development that continues.',
  },
  {
    key: 'support',
    n: 4,
    label: 'Support Services',
    amount: 200,
    lead: 'Helps your team',
    note: '24 onboarding hours plus 5 free work-order hours, then the shared ticketing system.',
  },
] as const

export const FLAT_TOTAL = FLAT_CHARGES.reduce((s, c) => s + c.amount, 0) // 850

/** Support and custom work. */
export const SUPPORT = {
  onboardingHoursPerMonth: 8,
  onboardingMonths: 3,
  get onboardingHoursTotal() {
    return this.onboardingHoursPerMonth * this.onboardingMonths
  },
  freeWorkOrderHours: 5,
  workOrderRatePilot: 150,
  workOrderRateStandard: 250,
} as const

/** Typical all-in range quoted in the policy. */
export const TYPICAL_ALL_IN = { low: 950, high: 1200 } as const
