'use client'

// Testing Partner Intake Form V2 (S25) — connie.one/intake
// Standalone, shareable, iframe-embeddable. Same aesthetic as V1 (CEO directive).
// V1 (dataroom/user-acceptance-testing/discovery) remains live until Phase 3 cutover.

import React, { useCallback, useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import {
  Phone,
  MessageSquare,
  MessagesSquare,
  FileText,
  Mail,
  Printer,
  Share2,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react'

// ---------------------------------------------------------------------------
// Types & constants
// ---------------------------------------------------------------------------

type DayHours = { open: string; close: string; closed: boolean }

const DAYS = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'] as const

const DEFAULT_HOURS: Record<string, DayHours> = Object.fromEntries(
  DAYS.map((d) => [d, { open: '08:00', close: '17:00', closed: d === 'Saturday' || d === 'Sunday' }]),
)

const CHANNELS = [
  { key: 'Live Voice Calls', icon: Phone, color: 'text-indigo-600' },
  { key: 'Messaging SMS/TXT', icon: MessageSquare, color: 'text-green-600' },
  { key: 'Webchat', icon: MessagesSquare, color: 'text-blue-600' },
  { key: 'Webforms', icon: FileText, color: 'text-purple-600' },
  { key: 'Email', icon: Mail, color: 'text-red-600' },
  { key: 'Fax', icon: Printer, color: 'text-gray-600' },
  { key: 'Social Media', icon: Share2, color: 'text-pink-600' },
] as const

// F8: WhatsApp + Facebook Messenger prioritized, YouTube removed
const SOCIAL_PLATFORMS = [
  'WhatsApp',
  'Facebook Messenger',
  'Facebook',
  'Instagram',
  'Twitter/X',
  'LinkedIn',
  'TikTok',
  'Other',
]

const TECH_RESOURCE_TYPES = [
  'In-house technical staff or team',
  'Contracted / outsourced IT (managed service provider)',
  'Volunteers, friends & family help',
  `Someone on staff who's "good with computers"`,
]

const STAFF_ACCESS_OPTIONS = [
  'Desktop computers (in-office)',
  'Laptops (office or remote)',
  'Tablets',
  'Mobile phones',
]

const initialFormData = {
  // Step 1 — Organization
  orgName: '',
  contactName: '',
  contactTitle: '',
  email: '',
  phone: '',
  orgType: '',
  orgTypeOther: '',
  serviceArea: '',
  clientsServed: '',
  // Step 2 — Hours (F5)
  hoursByDay: DEFAULT_HOURS,
  afterHoursSupport: '',
  afterHoursDescription: '',
  // Step 3 — Staffing (F6) + patterns (F7)
  agentCount: '',
  supervisorCount: '',
  adminCount: '',
  teamNotes: '',
  volumePatterns: '',
  // Step 4 — Channels (F8)
  channelsToMigrate: [] as string[],
  socialMediaPlatforms: [] as string[],
  socialVolumes: {} as Record<string, string>,
  inboundCalls: '',
  outboundCalls: '',
  avgCallDuration: '',
  inboundFaxes: '',
  outboundFaxes: '',
  avgFaxPagesInbound: '',
  avgFaxPagesOutbound: '',
  emailsSent: '',
  emailsReceived: '',
  smsVolume: '',
  webchatVolume: '',
  formSubmissions: '',
  // Step 5 — Tech (F9)
  hasTechnicalResources: '',
  techResourceTypes: [] as string[],
  technicalResourcesDescription: '',
  staffAccess: [] as string[],
  phoneSystem: '',
  phoneSystemDetails: '',
  mainBusinessLines: '',
  businessPhoneProvider: '',
  faxSystem: '',
  faxSystemDetails: '',
  emailSystem: '',
  emailSystemDetails: '',
  websiteStatus: '',
  websiteUrl: '',
  painPoints: '',
  // Step 6 — Vision
  excitedAbout: '',
  // Step 7 — Additional
  additionalContext: '',
  howHeard: '',
  referralDetails: '',
  // F14 honeypot — humans never see or fill this
  companyWebsiteConfirm: '',
}

type FormDataShape = typeof initialFormData

const DRAFT_KEY = 'connie.intake.v2.draft'
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/
const PHONE_RE = /(\d[\s\-().]*){10,}/

const inputCls =
  'w-full px-6 py-4 border-2 border-slate-300 rounded-xl text-lg focus:outline-none focus:ring-4 focus:ring-indigo-500 focus:border-indigo-500'
const labelCls = 'block text-base font-semibold text-slate-900 mb-3'
const errCls = 'border-red-400 ring-2 ring-red-200'

// ---------------------------------------------------------------------------
// Page
// ---------------------------------------------------------------------------

export default function TestingPartnerIntakePage() {
  const [formData, setFormData] = useState<FormDataShape>(initialFormData)
  const [currentStep, setCurrentStep] = useState(0)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitSuccess, setSubmitSuccess] = useState(false)
  const [refNumber, setRefNumber] = useState('')
  const [submitError, setSubmitError] = useState('')
  const [stepError, setStepError] = useState('')
  const [errorField, setErrorField] = useState('')
  const [draftAvailable, setDraftAvailable] = useState(false)
  const [restored, setRestored] = useState(false)
  const restoredRef = useRef(false)
  const totalSteps = 7

  // --- F3: autosave + restore ----------------------------------------------
  useEffect(() => {
    try {
      const raw = localStorage.getItem(DRAFT_KEY)
      if (raw) {
        const draft = JSON.parse(raw)
        if (draft?.formData?.orgName !== undefined) setDraftAvailable(true)
      }
    } catch {
      /* storage unavailable — form still works, just no autosave */
    }
  }, [])

  useEffect(() => {
    if (draftAvailable && !restoredRef.current) return // don't overwrite until user decides
    const t = setTimeout(() => {
      try {
        localStorage.setItem(DRAFT_KEY, JSON.stringify({ formData, currentStep, ts: Date.now() }))
      } catch {
        /* ignore */
      }
    }, 400)
    return () => clearTimeout(t)
  }, [formData, currentStep, draftAvailable])

  const restoreDraft = () => {
    try {
      const raw = localStorage.getItem(DRAFT_KEY)
      if (raw) {
        const draft = JSON.parse(raw)
        setFormData({ ...initialFormData, ...draft.formData })
        setCurrentStep(typeof draft.currentStep === 'number' ? draft.currentStep : 0)
      }
    } catch {
      /* ignore */
    }
    restoredRef.current = true
    setDraftAvailable(false)
    setRestored(true)
  }

  const discardDraft = () => {
    try {
      localStorage.removeItem(DRAFT_KEY)
    } catch {
      /* ignore */
    }
    restoredRef.current = true
    setDraftAvailable(false)
  }

  // --- helpers ---------------------------------------------------------------
  const set = useCallback(<K extends keyof FormDataShape>(key: K, value: FormDataShape[K]) => {
    setFormData((prev) => ({ ...prev, [key]: value }))
    setStepError('')
    setErrorField('')
  }, [])

  const toggleIn = (key: 'channelsToMigrate' | 'socialMediaPlatforms' | 'techResourceTypes' | 'staffAccess', value: string) => {
    setFormData((prev) => ({
      ...prev,
      [key]: prev[key].includes(value) ? prev[key].filter((v) => v !== value) : [...prev[key], value],
    }))
    setStepError('')
    setErrorField('')
  }

  const setDayHours = (day: string, patch: Partial<DayHours>) => {
    setFormData((prev) => ({
      ...prev,
      hoursByDay: { ...prev.hoursByDay, [day]: { ...prev.hoursByDay[day], ...patch } },
    }))
  }

  const applyMondayToAll = () => {
    setFormData((prev) => {
      const mon = prev.hoursByDay['Monday']
      const next: Record<string, DayHours> = {}
      for (const d of DAYS) next[d] = { ...mon }
      return { ...prev, hoursByDay: next }
    })
  }

  const seatTotal =
    (parseInt(formData.agentCount, 10) || 0) +
    (parseInt(formData.supervisorCount, 10) || 0) +
    (parseInt(formData.adminCount, 10) || 0)

  // --- validation (F11/F12) --------------------------------------------------
  const validateStep = (step: number): { msg: string; field: string } | null => {
    switch (step) {
      case 1:
        if (!formData.orgName) return { msg: 'Organization Name is required', field: 'orgName' }
        if (!formData.contactName) return { msg: 'Primary Contact Name is required', field: 'contactName' }
        if (!formData.email) return { msg: 'Email Address is required', field: 'email' }
        if (!EMAIL_RE.test(formData.email))
          return { msg: 'That email address doesn’t look right — please double-check it', field: 'email' }
        if (!formData.phone) return { msg: 'Phone Number is required', field: 'phone' }
        if (!PHONE_RE.test(formData.phone))
          return { msg: 'That phone number doesn’t look right — please include area code', field: 'phone' }
        if (!formData.orgType) return { msg: 'Organization Type is required', field: 'orgType' }
        break
      case 2: {
        const anyOpen = DAYS.some((d) => !formData.hoursByDay[d].closed)
        if (!anyOpen) return { msg: 'Please set hours for at least one open day', field: 'hoursByDay' }
        break
      }
      case 3:
        if (seatTotal === 0)
          return { msg: 'Please enter at least one staff member across the three roles', field: 'agentCount' }
        break
      case 4:
        if (formData.channelsToMigrate.length === 0)
          return { msg: 'Please select at least one communication channel', field: 'channels' }
        if (formData.channelsToMigrate.includes('Live Voice Calls') && !formData.avgCallDuration)
          return { msg: 'Average Call Duration is required when Live Voice Calls is selected', field: 'avgCallDuration' }
        break
      case 5:
        if (!formData.hasTechnicalResources)
          return { msg: 'Please indicate if you have technical resources', field: 'hasTechnicalResources' }
        if (!formData.painPoints)
          return { msg: 'Please tell us about your communication pain points', field: 'painPoints' }
        break
    }
    return null
  }

  const goToNextStep = () => {
    const error = validateStep(currentStep)
    if (error) {
      setStepError(error.msg)
      setErrorField(error.field)
      return
    }
    setStepError('')
    setErrorField('')
    setCurrentStep((prev) => Math.min(prev + 1, totalSteps))
    setTimeout(() => window.scrollTo(0, 0), 0)
  }

  const goToPreviousStep = () => {
    setStepError('')
    setErrorField('')
    setCurrentStep((prev) => Math.max(prev - 1, 0))
    setTimeout(() => window.scrollTo(0, 0), 0)
  }

  const handleSubmit = async () => {
    setIsSubmitting(true)
    setSubmitError('')
    try {
      const response = await fetch('/api/intake', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })
      const json = await response.json().catch(() => ({}))
      if (!response.ok) throw new Error(json.error || 'Submission failed')
      setRefNumber(json.refNumber || '')
      setSubmitSuccess(true)
      try {
        localStorage.removeItem(DRAFT_KEY)
      } catch {
        /* ignore */
      }
    } catch (e) {
      setSubmitError(
        e instanceof Error && e.message !== 'Submission failed'
          ? e.message
          : 'Failed to submit form. Your answers are still saved on this device — please try again.',
      )
    } finally {
      setIsSubmitting(false)
    }
  }

  const err = (field: string) => (errorField === field ? ` ${errCls}` : '')

  // -------------------------------------------------------------------------
  // Success screen
  // -------------------------------------------------------------------------
  if (submitSuccess) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-200 text-slate-800">
        <div className="container mx-auto px-6 py-16">
          <div className="max-w-2xl mx-auto">
            <div className="bg-white/60 backdrop-blur-sm border border-slate-200 rounded-2xl p-12 shadow-lg text-center">
              <div className="text-6xl mb-6">✅</div>
              <h2 className="text-3xl font-light text-slate-800 mb-4">Thank You!</h2>
              <p className="text-lg text-slate-600 mb-4">
                Your Testing Partner Intake Form has been submitted successfully.
              </p>
              {refNumber && (
                <div className="inline-block bg-indigo-50 border-2 border-indigo-200 rounded-xl px-6 py-3 mb-6">
                  <p className="text-sm text-slate-600 mb-1">Your reference number</p>
                  <p className="text-2xl font-semibold tracking-wide text-indigo-800">{refNumber}</p>
                </div>
              )}
              <p className="text-base text-slate-600 mb-6">
                We&apos;ve emailed a copy of your responses to you. Please keep your reference number
                handy for any follow-up.
              </p>
              <div className="bg-green-50 border border-green-200 rounded-lg p-6 mb-6">
                <h3 className="font-semibold text-slate-800 mb-2">Next Steps:</h3>
                <ul className="text-left text-slate-600 space-y-2">
                  <li>• The Connie team will review your information within 2 business days</li>
                  <li>• We&apos;ll calculate your customized pricing estimate</li>
                  <li>• You&apos;ll receive a formal quote via email within 5-7 business days</li>
                  <li>• We&apos;ll schedule a follow-up call to discuss next steps</li>
                </ul>
              </div>
              <p className="text-sm text-slate-600 mb-6">
                Questions? Contact us at{' '}
                <a
                  href="mailto:support@connie.team"
                  className="text-indigo-600 hover:text-indigo-800 underline"
                >
                  support@connie.team
                </a>
              </p>
              <div className="mt-8 flex justify-center opacity-40 hover:opacity-60 transition-opacity">
                <Image src="/connie-logo-black-strong.svg" alt="Connie" width={120} height={32} />
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  // -------------------------------------------------------------------------
  // Form
  // -------------------------------------------------------------------------
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-100 to-slate-400 text-slate-800">
      <div className="container mx-auto px-6 py-8">
        <div className="max-w-4xl mx-auto relative">
          {/* Support button */}
          <div className="flex justify-end mb-4">
            <a
              href="https://connie.plus/support"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 bg-white/80 backdrop-blur-sm border border-slate-300 rounded-full hover:bg-white transition-colors text-sm font-medium text-slate-700"
            >
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              Get Support
            </a>
          </div>

          {/* F3 restore banner */}
          {draftAvailable && (
            <div className="mb-6 p-6 bg-indigo-50 border-2 border-indigo-300 rounded-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
              <p className="text-lg text-slate-800 font-medium">
                Welcome back! We saved your progress on this device.
              </p>
              <div className="flex gap-3 flex-shrink-0">
                <button
                  type="button"
                  onClick={restoreDraft}
                  className="px-5 py-2.5 bg-indigo-600 text-white font-medium rounded-lg hover:bg-indigo-700 transition-colors"
                >
                  Pick up where I left off
                </button>
                <button
                  type="button"
                  onClick={discardDraft}
                  className="px-5 py-2.5 bg-slate-200 text-slate-800 font-medium rounded-lg hover:bg-slate-300 transition-colors"
                >
                  Start fresh
                </button>
              </div>
            </div>
          )}

          {restored && currentStep > 0 && (
            <div className="mb-4 text-sm text-slate-600 text-right">Progress restored ✓</div>
          )}

          {/* F12 step error — aria-live, stays near nav too */}
          {stepError && (
            <div
              role="alert"
              aria-live="polite"
              className="mb-6 p-6 bg-red-50 border-2 border-red-300 rounded-xl text-red-800 text-lg font-medium"
            >
              {stepError}
            </div>
          )}

          {/* Content card — page scrolls naturally (F12: no inner scrollbox) */}
          <div className="bg-white/80 backdrop-blur-md border border-slate-300 rounded-t-2xl shadow-2xl shadow-slate-900/20 ring-1 ring-white/50">
            <div className="p-8 md:p-12">
              {currentStep === 0 && (
                <div className="space-y-8">
                  <div className="flex justify-center mb-2">
                    <Image
                      src="/connie-logo-black-strong.svg"
                      alt="Connie"
                      width={250}
                      height={66}
                      priority
                    />
                  </div>
                  <div className="text-center">
                    <h1 className="text-4xl font-light text-slate-900 mb-6">
                      Testing Partner Intake Form
                    </h1>
                    <p className="text-xl text-slate-700 mb-6 leading-normal">
                      This short intake wizard asks a series of questions about how your
                      organization communicates today. Your answers help us define your
                      requirements, estimate costs, and set up your new Connie environment for a
                      smooth onboarding experience for your staff.
                    </p>
                    <div className="bg-slate-100 border-2 border-slate-300 rounded-lg p-4 mb-8 max-w-2xl mx-auto">
                      <p className="text-base text-slate-700 font-medium">
                        Your progress is <strong>saved automatically on this device</strong> — you
                        can close this page and pick up right where you left off.
                      </p>
                    </div>
                  </div>

                  <div className="bg-indigo-50 border-2 border-indigo-300 rounded-xl p-8 space-y-6">
                    <h2 className="text-2xl font-semibold text-slate-900 mb-4">What to Expect</h2>
                    <ul className="space-y-4 text-lg text-slate-700">
                      <li className="flex items-start gap-4">
                        <span className="text-indigo-600 text-2xl flex-shrink-0">1</span>
                        <span>
                          <strong className="text-slate-900">7 sections</strong> covering your
                          organization, hours, staffing, communication channels, technology, goals,
                          and anything else you&apos;d like to share
                        </span>
                      </li>
                      <li className="flex items-start gap-4">
                        <span className="text-indigo-600 text-2xl flex-shrink-0">2</span>
                        <span>
                          <strong className="text-slate-900">10-15 minutes</strong> to complete —
                          you can go back and forth between steps
                        </span>
                      </li>
                      <li className="flex items-start gap-4">
                        <span className="text-indigo-600 text-2xl flex-shrink-0">3</span>
                        <span>
                          <strong className="text-slate-900">Best estimates are fine</strong> —
                          we&apos;re looking for general understanding, not exact numbers
                        </span>
                      </li>
                      <li className="flex items-start gap-4">
                        <span className="text-indigo-600 text-2xl flex-shrink-0">4</span>
                        <span>
                          <strong className="text-slate-900">
                            Required fields are marked with <span className="text-red-600">*</span>
                          </strong>{' '}
                          — everything else is optional
                        </span>
                      </li>
                    </ul>
                  </div>

                  <div className="text-center pt-4">
                    <p className="text-lg text-slate-600">
                      All information provided is confidential and used only for program evaluation.
                    </p>
                  </div>
                </div>
              )}

              {/* Step 1 — Organization */}
              {currentStep === 1 && (
                <div className="space-y-8">
                  <div>
                    <h2 className="text-3xl font-semibold text-slate-900 mb-3">
                      🏢 Organization Information
                    </h2>
                    <p className="text-lg text-slate-600">
                      Tell us about your organization and who we&apos;ll be working with.
                    </p>
                  </div>

                  <div className="space-y-8">
                    <div>
                      <label htmlFor="orgName" className={labelCls}>
                        Organization Name <span className="text-red-600 text-xl">*</span>
                      </label>
                      <input
                        id="orgName"
                        type="text"
                        value={formData.orgName}
                        onChange={(e) => set('orgName', e.target.value)}
                        className={inputCls + err('orgName')}
                      />
                    </div>

                    <div>
                      <label htmlFor="orgType" className={labelCls}>
                        Organization Type <span className="text-red-600 text-xl">*</span>
                      </label>
                      <select
                        id="orgType"
                        value={formData.orgType}
                        onChange={(e) => set('orgType', e.target.value)}
                        className={inputCls + err('orgType')}
                      >
                        <option value="">Select type...</option>
                        <option value="Senior Services / Area Agency on Aging">
                          Senior Services / Area Agency on Aging
                        </option>
                        <option value="Community Action Agency">Community Action Agency</option>
                        <option value="Health & Human Services">Health & Human Services</option>
                        <option value="Housing Services">Housing Services</option>
                        <option value="Disability Services">Disability Services</option>
                        <option value="Veterans Services">Veterans Services</option>
                        <option value="Other">Other</option>
                      </select>
                    </div>

                    {formData.orgType === 'Other' && (
                      <div>
                        <label htmlFor="orgTypeOther" className={labelCls}>
                          Please specify
                        </label>
                        <input
                          id="orgTypeOther"
                          type="text"
                          value={formData.orgTypeOther}
                          onChange={(e) => set('orgTypeOther', e.target.value)}
                          className={inputCls}
                        />
                      </div>
                    )}

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label htmlFor="contactName" className={labelCls}>
                          Primary Contact Name <span className="text-red-600 text-xl">*</span>
                        </label>
                        <input
                          id="contactName"
                          type="text"
                          value={formData.contactName}
                          onChange={(e) => set('contactName', e.target.value)}
                          className={inputCls + err('contactName')}
                        />
                      </div>
                      <div>
                        <label htmlFor="contactTitle" className={labelCls}>
                          Contact Title/Role
                        </label>
                        <input
                          id="contactTitle"
                          type="text"
                          value={formData.contactTitle}
                          onChange={(e) => set('contactTitle', e.target.value)}
                          className={inputCls}
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label htmlFor="email" className={labelCls}>
                          Email Address <span className="text-red-600 text-xl">*</span>
                        </label>
                        <input
                          id="email"
                          type="email"
                          inputMode="email"
                          value={formData.email}
                          onChange={(e) => set('email', e.target.value)}
                          className={inputCls + err('email')}
                        />
                      </div>
                      <div>
                        <label htmlFor="phone" className={labelCls}>
                          Phone Number <span className="text-red-600 text-xl">*</span>
                        </label>
                        <input
                          id="phone"
                          type="tel"
                          inputMode="tel"
                          placeholder="e.g., (702) 555-1234"
                          value={formData.phone}
                          onChange={(e) => set('phone', e.target.value)}
                          className={inputCls + err('phone')}
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label htmlFor="serviceArea" className={labelCls}>
                          Service Area/Location
                        </label>
                        <input
                          id="serviceArea"
                          type="text"
                          placeholder="e.g., Clark County, Nevada"
                          value={formData.serviceArea}
                          onChange={(e) => set('serviceArea', e.target.value)}
                          className={inputCls}
                        />
                      </div>
                      <div>
                        <label htmlFor="clientsServed" className={labelCls}>
                          Clients Served Monthly
                        </label>
                        <input
                          id="clientsServed"
                          type="text"
                          value={formData.clientsServed}
                          onChange={(e) => set('clientsServed', e.target.value)}
                          className={inputCls}
                        />
                        {/* F4 — visible helper, not just placeholder */}
                        <p className="text-base text-slate-600 mt-2">
                          A best estimate is perfectly fine — a rough monthly number helps us size
                          things.
                        </p>
                      </div>
                    </div>

                    {/* F14 honeypot — visually hidden, tabIndex -1 */}
                    <div className="absolute -left-[9999px] top-auto" aria-hidden="true">
                      <label htmlFor="companyWebsiteConfirm">Leave this field empty</label>
                      <input
                        id="companyWebsiteConfirm"
                        type="text"
                        tabIndex={-1}
                        autoComplete="off"
                        value={formData.companyWebsiteConfirm}
                        onChange={(e) => set('companyWebsiteConfirm', e.target.value)}
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Step 2 — Hours (F5) */}
              {currentStep === 2 && (
                <div className="space-y-8">
                  <div>
                    <h2 className="text-3xl font-semibold text-slate-900 mb-3">
                      ⏰ Hours of Operation
                    </h2>
                    <p className="text-lg text-slate-600">
                      Set your typical hours for each day — uncheck days you&apos;re closed.
                    </p>
                  </div>

                  <div className="space-y-3">
                    <div className="flex justify-end">
                      <button
                        type="button"
                        onClick={applyMondayToAll}
                        className="px-4 py-2 bg-indigo-100 text-indigo-800 font-medium text-sm rounded-lg hover:bg-indigo-200 transition-colors"
                      >
                        Apply Monday&apos;s hours to all days
                      </button>
                    </div>
                    {DAYS.map((day) => {
                      const h = formData.hoursByDay[day]
                      return (
                        <div
                          key={day}
                          className={`flex flex-col md:flex-row md:items-center gap-3 p-4 border-2 rounded-xl transition-colors ${
                            h.closed ? 'bg-slate-50 border-slate-200' : 'bg-white border-slate-300'
                          }`}
                        >
                          <label className="flex items-center gap-3 md:w-44 cursor-pointer">
                            <input
                              type="checkbox"
                              checked={!h.closed}
                              onChange={() => setDayHours(day, { closed: !h.closed })}
                              className="rounded border-2 border-slate-300 text-indigo-600 focus:ring-4 focus:ring-indigo-500 w-6 h-6"
                            />
                            <span
                              className={`text-lg font-medium ${h.closed ? 'text-slate-400' : 'text-slate-900'}`}
                            >
                              {day}
                            </span>
                          </label>
                          {h.closed ? (
                            <span className="text-slate-400 text-base md:ml-4">Closed</span>
                          ) : (
                            <div className="flex items-center gap-3">
                              <label className="sr-only" htmlFor={`open-${day}`}>
                                {day} opening time
                              </label>
                              <input
                                id={`open-${day}`}
                                type="time"
                                value={h.open}
                                onChange={(e) => setDayHours(day, { open: e.target.value })}
                                className="px-4 py-2.5 border-2 border-slate-300 rounded-lg text-base focus:outline-none focus:ring-4 focus:ring-indigo-500"
                              />
                              <span className="text-slate-500">to</span>
                              <label className="sr-only" htmlFor={`close-${day}`}>
                                {day} closing time
                              </label>
                              <input
                                id={`close-${day}`}
                                type="time"
                                value={h.close}
                                onChange={(e) => setDayHours(day, { close: e.target.value })}
                                className="px-4 py-2.5 border-2 border-slate-300 rounded-lg text-base focus:outline-none focus:ring-4 focus:ring-indigo-500"
                              />
                            </div>
                          )}
                        </div>
                      )
                    })}
                  </div>

                  <div>
                    <label htmlFor="afterHoursSupport" className={labelCls}>
                      Does your organization provide on-call or after-hours coverage?
                    </label>
                    <select
                      id="afterHoursSupport"
                      value={formData.afterHoursSupport}
                      onChange={(e) => set('afterHoursSupport', e.target.value)}
                      className={inputCls}
                    >
                      <option value="">Select...</option>
                      <option value="No — business hours only">No — business hours only</option>
                      <option value="Yes — on-call for emergencies">
                        Yes — on-call for emergencies
                      </option>
                      <option value="Yes — extended hours (evenings/weekends)">
                        Yes — extended hours (evenings/weekends)
                      </option>
                      <option value="Yes — 24/7 operations">Yes — 24/7 operations</option>
                    </select>
                  </div>

                  {formData.afterHoursSupport.startsWith('Yes') && (
                    <div className="pl-4 border-l-4 border-indigo-300 bg-indigo-50/50 p-4 rounded-r-xl">
                      <label htmlFor="afterHoursDescription" className={labelCls}>
                        Tell us how after-hours coverage works today
                      </label>
                      <textarea
                        id="afterHoursDescription"
                        placeholder="e.g., One staff member is on call 24/7/365 for emergencies; calls forward to their cell phone."
                        value={formData.afterHoursDescription}
                        onChange={(e) => set('afterHoursDescription', e.target.value)}
                        rows={3}
                        className={inputCls}
                      />
                    </div>
                  )}
                </div>
              )}

              {/* Step 3 — Staffing (F6) + patterns (F7) */}
              {currentStep === 3 && (
                <div className="space-y-8">
                  <div>
                    <h2 className="text-3xl font-semibold text-slate-900 mb-3">
                      👥 Staffing & Usage Patterns
                    </h2>
                    <p className="text-lg text-slate-600">
                      Help us understand who will use Connie and how often.
                    </p>
                  </div>

                  <div>
                    <p className={labelCls}>
                      How many people will use Connie in each role?{' '}
                      <span className="text-red-600 text-xl">*</span>
                    </p>
                    <div className="space-y-3">
                      {(
                        [
                          {
                            key: 'agentCount' as const,
                            name: 'Agents',
                            desc: 'Answer calls and messages, work directly with clients and partners',
                            hint: 'e.g., 15',
                          },
                          {
                            key: 'supervisorCount' as const,
                            name: 'Supervisors / Managers',
                            desc: 'Oversee agents, monitor activity, run reports',
                            hint: 'e.g., 4',
                          },
                          {
                            key: 'adminCount' as const,
                            name: 'Administrators',
                            desc: 'Manage settings, users, and the overall system',
                            hint: 'e.g., 2',
                          },
                        ]
                      ).map((role) => (
                        <div
                          key={role.key}
                          className="flex flex-col md:flex-row md:items-center gap-3 p-4 bg-white border-2 border-slate-300 rounded-xl"
                        >
                          <div className="flex-1">
                            <label htmlFor={role.key} className="text-lg font-semibold text-slate-900">
                              {role.name}
                            </label>
                            <p className="text-base text-slate-600">{role.desc}</p>
                          </div>
                          <input
                            id={role.key}
                            type="number"
                            min={0}
                            placeholder={role.hint}
                            value={formData[role.key]}
                            onChange={(e) => set(role.key, e.target.value)}
                            className={
                              'w-full md:w-32 px-4 py-3 border-2 border-slate-300 rounded-xl text-lg text-center focus:outline-none focus:ring-4 focus:ring-indigo-500' +
                              err(role.key === 'agentCount' ? 'agentCount' : '')
                            }
                          />
                        </div>
                      ))}
                      <div className="flex justify-end pr-4">
                        <p className="text-lg font-semibold text-indigo-800">
                          Total seats: {seatTotal}
                        </p>
                      </div>
                    </div>
                    <p className="text-base text-slate-600 mt-1">
                      The same person can wear multiple hats — count them where they&apos;ll spend
                      most of their time.
                    </p>
                  </div>

                  <div>
                    <label htmlFor="teamNotes" className={labelCls}>
                      Anything unusual about your team structure?
                    </label>
                    <textarea
                      id="teamNotes"
                      placeholder="e.g., volunteers who answer phones, part-time staff, shared roles"
                      value={formData.teamNotes}
                      onChange={(e) => set('teamNotes', e.target.value)}
                      rows={2}
                      className={inputCls}
                    />
                  </div>

                  {/* F7 */}
                  <div>
                    <label htmlFor="volumePatterns" className={labelCls}>
                      Do you notice any recurring patterns in when people contact you?
                    </label>
                    <p className="text-base text-slate-600 mb-3">
                      Think daily, weekly, monthly, or seasonal — anything you&apos;ve observed is
                      helpful.
                    </p>
                    <textarea
                      id="volumePatterns"
                      placeholder="e.g., Mondays and Tuesdays are our busiest days and volume drops off toward Friday… We spike every year around Thanksgiving… Snowbird season doubles our call volume November–April."
                      value={formData.volumePatterns}
                      onChange={(e) => set('volumePatterns', e.target.value)}
                      rows={4}
                      className={inputCls}
                    />
                    <p className="text-base text-slate-500 mt-2 italic">
                      Not sure? That&apos;s completely fine — identifying these patterns is one of
                      the things Connie helps you do once you&apos;re up and running.
                    </p>
                  </div>
                </div>
              )}

              {/* Step 4 — Channels (F8) */}
              {currentStep === 4 && (
                <div className="space-y-8">
                  <div>
                    <h2 className="text-3xl font-semibold text-slate-900 mb-3">
                      📞 Current Communication Volumes
                    </h2>
                    <p className="text-lg text-slate-600">
                      Which channels would you like to bring into Connie? Check a channel and its
                      questions will appear right below it. Best estimates are fine everywhere.
                    </p>
                  </div>

                  <div className="space-y-3">
                    {CHANNELS.map(({ key, icon: Icon, color }) => {
                      const checked = formData.channelsToMigrate.includes(key)
                      return (
                        <div key={key}>
                          <label
                            className={`flex items-center space-x-3 p-4 border-2 rounded-xl transition-colors cursor-pointer ${
                              checked
                                ? 'bg-indigo-50 border-indigo-300'
                                : 'bg-white border-slate-300 hover:bg-slate-50'
                            }`}
                          >
                            <input
                              type="checkbox"
                              checked={checked}
                              onChange={() => toggleIn('channelsToMigrate', key)}
                              className="rounded border-2 border-slate-300 text-indigo-600 focus:ring-4 focus:ring-indigo-500 w-6 h-6"
                            />
                            <Icon className={`w-6 h-6 ${color}`} />
                            <span className="text-lg text-slate-900 font-medium">{key}</span>
                          </label>

                          {/* Inline expansion — directly under the channel card */}
                          {checked && key === 'Live Voice Calls' && (
                            <div className="mt-2 mb-2 ml-4 pl-4 border-l-4 border-indigo-300 bg-indigo-50/50 p-4 rounded-r-xl space-y-4">
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                  <label htmlFor="inboundCalls" className={labelCls}>
                                    Monthly Inbound Calls
                                  </label>
                                  <input
                                    id="inboundCalls"
                                    type="number"
                                    min={0}
                                    placeholder="Calls you receive"
                                    value={formData.inboundCalls}
                                    onChange={(e) => set('inboundCalls', e.target.value)}
                                    className={inputCls}
                                  />
                                </div>
                                <div>
                                  <label htmlFor="outboundCalls" className={labelCls}>
                                    Monthly Outbound Calls
                                  </label>
                                  <input
                                    id="outboundCalls"
                                    type="number"
                                    min={0}
                                    placeholder="Calls you make"
                                    value={formData.outboundCalls}
                                    onChange={(e) => set('outboundCalls', e.target.value)}
                                    className={inputCls}
                                  />
                                </div>
                              </div>
                              <div>
                                <label htmlFor="avgCallDuration" className={labelCls}>
                                  Average Call Duration{' '}
                                  <span className="text-red-600 text-xl">*</span>
                                </label>
                                <select
                                  id="avgCallDuration"
                                  value={formData.avgCallDuration}
                                  onChange={(e) => set('avgCallDuration', e.target.value)}
                                  className={inputCls + err('avgCallDuration')}
                                >
                                  <option value="">Select...</option>
                                  <option value="Under 2 minutes">Under 2 minutes</option>
                                  <option value="2-5 minutes">2-5 minutes</option>
                                  <option value="5-10 minutes">5-10 minutes</option>
                                  <option value="10-15 minutes">10-15 minutes</option>
                                  <option value="15+ minutes">15+ minutes</option>
                                </select>
                              </div>
                            </div>
                          )}

                          {checked && key === 'Messaging SMS/TXT' && (
                            <div className="mt-2 mb-2 ml-4 pl-4 border-l-4 border-green-300 bg-green-50/50 p-4 rounded-r-xl">
                              <label htmlFor="smsVolume" className={labelCls}>
                                Approximate Monthly SMS Volume
                              </label>
                              <input
                                id="smsVolume"
                                type="number"
                                min={0}
                                placeholder="e.g., 100"
                                value={formData.smsVolume}
                                onChange={(e) => set('smsVolume', e.target.value)}
                                className={inputCls}
                              />
                            </div>
                          )}

                          {checked && key === 'Webchat' && (
                            <div className="mt-2 mb-2 ml-4 pl-4 border-l-4 border-blue-300 bg-blue-50/50 p-4 rounded-r-xl">
                              <label htmlFor="webchatVolume" className={labelCls}>
                                Approximate Monthly Webchat Conversations
                              </label>
                              <input
                                id="webchatVolume"
                                type="number"
                                min={0}
                                placeholder="e.g., 50 — enter 0 if you don't have webchat today"
                                value={formData.webchatVolume}
                                onChange={(e) => set('webchatVolume', e.target.value)}
                                className={inputCls}
                              />
                            </div>
                          )}

                          {checked && key === 'Webforms' && (
                            <div className="mt-2 mb-2 ml-4 pl-4 border-l-4 border-purple-300 bg-purple-50/50 p-4 rounded-r-xl">
                              <label htmlFor="formSubmissions" className={labelCls}>
                                Approximate Monthly Form Submissions
                              </label>
                              <input
                                id="formSubmissions"
                                type="number"
                                min={0}
                                placeholder="e.g., 25"
                                value={formData.formSubmissions}
                                onChange={(e) => set('formSubmissions', e.target.value)}
                                className={inputCls}
                              />
                            </div>
                          )}

                          {checked && key === 'Email' && (
                            <div className="mt-2 mb-2 ml-4 pl-4 border-l-4 border-red-300 bg-red-50/50 p-4 rounded-r-xl grid grid-cols-1 md:grid-cols-2 gap-4">
                              <div>
                                <label htmlFor="emailsSent" className={labelCls}>
                                  Monthly Emails Sent
                                </label>
                                <input
                                  id="emailsSent"
                                  type="number"
                                  min={0}
                                  placeholder="Bulk and individual combined"
                                  value={formData.emailsSent}
                                  onChange={(e) => set('emailsSent', e.target.value)}
                                  className={inputCls}
                                />
                              </div>
                              <div>
                                <label htmlFor="emailsReceived" className={labelCls}>
                                  Monthly Emails Received
                                </label>
                                <input
                                  id="emailsReceived"
                                  type="number"
                                  min={0}
                                  placeholder="From clients"
                                  value={formData.emailsReceived}
                                  onChange={(e) => set('emailsReceived', e.target.value)}
                                  className={inputCls}
                                />
                              </div>
                            </div>
                          )}

                          {checked && key === 'Fax' && (
                            <div className="mt-2 mb-2 ml-4 pl-4 border-l-4 border-gray-300 bg-gray-50/70 p-4 rounded-r-xl space-y-4">
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                  <label htmlFor="inboundFaxes" className={labelCls}>
                                    Monthly Inbound Faxes
                                  </label>
                                  <input
                                    id="inboundFaxes"
                                    type="number"
                                    min={0}
                                    value={formData.inboundFaxes}
                                    onChange={(e) => set('inboundFaxes', e.target.value)}
                                    className={inputCls}
                                  />
                                </div>
                                <div>
                                  <label htmlFor="outboundFaxes" className={labelCls}>
                                    Monthly Outbound Faxes
                                  </label>
                                  <input
                                    id="outboundFaxes"
                                    type="number"
                                    min={0}
                                    value={formData.outboundFaxes}
                                    onChange={(e) => set('outboundFaxes', e.target.value)}
                                    className={inputCls}
                                  />
                                </div>
                              </div>
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                  <label htmlFor="avgFaxPagesInbound" className={labelCls}>
                                    Avg Pages per Inbound Fax
                                  </label>
                                  <input
                                    id="avgFaxPagesInbound"
                                    type="number"
                                    min={0}
                                    placeholder="e.g., 3"
                                    value={formData.avgFaxPagesInbound}
                                    onChange={(e) => set('avgFaxPagesInbound', e.target.value)}
                                    className={inputCls}
                                  />
                                </div>
                                <div>
                                  <label htmlFor="avgFaxPagesOutbound" className={labelCls}>
                                    Avg Pages per Outbound Fax
                                  </label>
                                  <input
                                    id="avgFaxPagesOutbound"
                                    type="number"
                                    min={0}
                                    placeholder="e.g., 5"
                                    value={formData.avgFaxPagesOutbound}
                                    onChange={(e) => set('avgFaxPagesOutbound', e.target.value)}
                                    className={inputCls}
                                  />
                                </div>
                              </div>
                            </div>
                          )}

                          {checked && key === 'Social Media' && (
                            <div className="mt-2 mb-2 ml-4 pl-4 border-l-4 border-pink-300 bg-pink-50/50 p-4 rounded-r-xl">
                              <p className={labelCls}>
                                Which platforms would you like to handle using Connie?
                              </p>
                              <div className="space-y-2">
                                {SOCIAL_PLATFORMS.map((platform) => {
                                  const pChecked = formData.socialMediaPlatforms.includes(platform)
                                  return (
                                    <div
                                      key={platform}
                                      className="flex flex-col md:flex-row md:items-center gap-2"
                                    >
                                      <label className="flex items-center space-x-3 cursor-pointer md:w-56">
                                        <input
                                          type="checkbox"
                                          checked={pChecked}
                                          onChange={() =>
                                            toggleIn('socialMediaPlatforms', platform)
                                          }
                                          className="rounded border-2 border-slate-300 text-pink-600 focus:ring-4 focus:ring-pink-500 w-6 h-6"
                                        />
                                        <span className="text-lg text-slate-900">{platform}</span>
                                      </label>
                                      {pChecked && (
                                        <input
                                          type="number"
                                          min={0}
                                          aria-label={`Estimated monthly contacts via ${platform}`}
                                          placeholder="Est. contacts / month"
                                          value={formData.socialVolumes[platform] || ''}
                                          onChange={(e) =>
                                            setFormData((prev) => ({
                                              ...prev,
                                              socialVolumes: {
                                                ...prev.socialVolumes,
                                                [platform]: e.target.value,
                                              },
                                            }))
                                          }
                                          className="w-full md:w-56 px-4 py-2.5 border-2 border-slate-300 rounded-lg text-base focus:outline-none focus:ring-4 focus:ring-pink-500"
                                        />
                                      )}
                                    </div>
                                  )
                                })}
                              </div>
                            </div>
                          )}
                        </div>
                      )
                    })}
                  </div>
                </div>
              )}

              {/* Step 5 — Tech (F9) */}
              {currentStep === 5 && (
                <div className="space-y-8">
                  <div>
                    <h2 className="text-3xl font-semibold text-slate-900 mb-3">
                      💻 Current Technology Setup
                    </h2>
                    <p className="text-lg text-slate-600">
                      Tell us about your current communication technology and pain points.
                    </p>
                  </div>

                  <div className="space-y-8">
                    <div>
                      <label htmlFor="hasTechnicalResources" className={labelCls}>
                        Do you have dedicated technical resources?{' '}
                        <span className="text-red-600 text-xl">*</span>
                      </label>
                      <select
                        id="hasTechnicalResources"
                        value={formData.hasTechnicalResources}
                        onChange={(e) => set('hasTechnicalResources', e.target.value)}
                        className={inputCls + err('hasTechnicalResources')}
                      >
                        <option value="">Select...</option>
                        <option value="Yes">Yes</option>
                        <option value="No">No</option>
                      </select>
                    </div>

                    {formData.hasTechnicalResources === 'Yes' && (
                      <div className="pl-4 border-l-4 border-indigo-300 bg-indigo-50/50 p-4 rounded-r-xl space-y-4">
                        <p className={labelCls}>Tell us more — check all that apply</p>
                        <div className="space-y-2">
                          {TECH_RESOURCE_TYPES.map((t) => (
                            <label key={t} className="flex items-center space-x-3 cursor-pointer">
                              <input
                                type="checkbox"
                                checked={formData.techResourceTypes.includes(t)}
                                onChange={() => toggleIn('techResourceTypes', t)}
                                className="rounded border-2 border-slate-300 text-indigo-600 focus:ring-4 focus:ring-indigo-500 w-6 h-6"
                              />
                              <span className="text-lg text-slate-900">{t}</span>
                            </label>
                          ))}
                        </div>
                        <div>
                          <label htmlFor="technicalResourcesDescription" className={labelCls}>
                            Anything else about your technical support setup?
                          </label>
                          <textarea
                            id="technicalResourcesDescription"
                            placeholder="e.g., '1 full-time IT manager' or 'MSP handles everything, 24-48h response time'"
                            value={formData.technicalResourcesDescription}
                            onChange={(e) => set('technicalResourcesDescription', e.target.value)}
                            rows={2}
                            className={inputCls}
                          />
                        </div>
                      </div>
                    )}

                    <div>
                      <p className={labelCls}>How does your staff access your current systems?</p>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        {STAFF_ACCESS_OPTIONS.map((opt) => (
                          <label
                            key={opt}
                            className="flex items-center space-x-3 p-4 bg-white border-2 border-slate-300 rounded-xl hover:bg-slate-50 transition-colors cursor-pointer"
                          >
                            <input
                              type="checkbox"
                              checked={formData.staffAccess.includes(opt)}
                              onChange={() => toggleIn('staffAccess', opt)}
                              className="rounded border-2 border-slate-300 text-indigo-600 focus:ring-4 focus:ring-indigo-500 w-6 h-6"
                            />
                            <span className="text-lg text-slate-900">{opt}</span>
                          </label>
                        ))}
                      </div>
                      <p className="text-base text-slate-600 mt-2">
                        Mixed setups are completely normal — check everything your team uses.
                      </p>
                    </div>

                    <div>
                      <label htmlFor="phoneSystem" className={labelCls}>
                        Current Phone System
                      </label>
                      <select
                        id="phoneSystem"
                        value={formData.phoneSystem}
                        onChange={(e) => set('phoneSystem', e.target.value)}
                        className={inputCls}
                      >
                        <option value="">Select...</option>
                        <option value="Traditional landline/PBX">Traditional landline/PBX</option>
                        <option value="VoIP system">VoIP system</option>
                        <option value="Mix of landlines and cell phones">
                          Mix of landlines and cell phones
                        </option>
                        <option value="Cell phones only">Cell phones only</option>
                        <option value="Other">Other</option>
                      </select>
                    </div>

                    {(formData.phoneSystem === 'VoIP system' || formData.phoneSystem === 'Other') && (
                      <div>
                        <label htmlFor="phoneSystemDetails" className={labelCls}>
                          Please specify provider/system
                        </label>
                        <input
                          id="phoneSystemDetails"
                          type="text"
                          value={formData.phoneSystemDetails}
                          onChange={(e) => set('phoneSystemDetails', e.target.value)}
                          className={inputCls}
                        />
                      </div>
                    )}

                    <div>
                      <label htmlFor="mainBusinessLines" className={labelCls}>
                        Main Business Line(s)
                      </label>
                      <input
                        id="mainBusinessLines"
                        type="text"
                        placeholder="Enter phone numbers, separated by commas"
                        value={formData.mainBusinessLines}
                        onChange={(e) => set('mainBusinessLines', e.target.value)}
                        className={inputCls}
                      />
                      <p className="text-base text-slate-600 mt-2">
                        e.g., (702) 555-1234, (702) 555-5678
                      </p>
                    </div>

                    <div>
                      <label htmlFor="businessPhoneProvider" className={labelCls}>
                        Current Business Phone Provider
                      </label>
                      <select
                        id="businessPhoneProvider"
                        value={formData.businessPhoneProvider}
                        onChange={(e) => set('businessPhoneProvider', e.target.value)}
                        className={inputCls}
                      >
                        <option value="">Select...</option>
                        <option value="Spectrum">Spectrum</option>
                        <option value="Verizon">Verizon</option>
                        <option value="Cox">Cox</option>
                        <option value="AT&T">AT&T</option>
                        <option value="CenturyLink">CenturyLink</option>
                        <option value="Comcast/Xfinity">Comcast/Xfinity</option>
                        <option value="T-Mobile">T-Mobile</option>
                        <option value="RingCentral">RingCentral</option>
                        <option value="8x8">8x8</option>
                        <option value="Vonage">Vonage</option>
                        <option value="Other">Other</option>
                        <option value="Not sure">Not sure</option>
                      </select>
                    </div>

                    <div>
                      <label htmlFor="faxSystem" className={labelCls}>
                        Current Fax System
                      </label>
                      <select
                        id="faxSystem"
                        value={formData.faxSystem}
                        onChange={(e) => set('faxSystem', e.target.value)}
                        className={inputCls}
                      >
                        <option value="">Select...</option>
                        <option value="Physical fax machine">Physical fax machine</option>
                        <option value="Online fax service">
                          Online fax service (e.g., eFax, RingCentral Fax)
                        </option>
                        <option value="We don't use fax">We don&apos;t use fax</option>
                        <option value="Other">Other</option>
                      </select>
                    </div>

                    {(formData.faxSystem === 'Online fax service' || formData.faxSystem === 'Other') && (
                      <div>
                        <label htmlFor="faxSystemDetails" className={labelCls}>
                          Please specify
                        </label>
                        <input
                          id="faxSystemDetails"
                          type="text"
                          value={formData.faxSystemDetails}
                          onChange={(e) => set('faxSystemDetails', e.target.value)}
                          className={inputCls}
                        />
                      </div>
                    )}

                    <div>
                      <label htmlFor="emailSystem" className={labelCls}>
                        Email System
                      </label>
                      <select
                        id="emailSystem"
                        value={formData.emailSystem}
                        onChange={(e) => set('emailSystem', e.target.value)}
                        className={inputCls}
                      >
                        <option value="">Select...</option>
                        <option value="Gmail / Google Workspace">Gmail / Google Workspace</option>
                        <option value="Outlook / Microsoft 365">Outlook / Microsoft 365</option>
                        <option value="Other email provider">Other email provider</option>
                        <option value="Mixed systems">Mixed systems</option>
                      </select>
                    </div>

                    {(formData.emailSystem === 'Other email provider' ||
                      formData.emailSystem === 'Mixed systems') && (
                      <div>
                        <label htmlFor="emailSystemDetails" className={labelCls}>
                          Please specify
                        </label>
                        <input
                          id="emailSystemDetails"
                          type="text"
                          value={formData.emailSystemDetails}
                          onChange={(e) => set('emailSystemDetails', e.target.value)}
                          className={inputCls}
                        />
                      </div>
                    )}

                    <div>
                      <label htmlFor="websiteStatus" className={labelCls}>
                        Website Status
                      </label>
                      <select
                        id="websiteStatus"
                        value={formData.websiteStatus}
                        onChange={(e) => set('websiteStatus', e.target.value)}
                        className={inputCls}
                      >
                        <option value="">Select...</option>
                        <option value="Yes, WordPress">Yes, WordPress</option>
                        <option value="Yes, Wix/Squarespace">Yes, Wix/Squarespace</option>
                        <option value="Yes, custom website">Yes, custom website</option>
                        <option value="Yes, other platform">Yes, other platform</option>
                        <option value="No website">No website</option>
                        <option value="Website but no forms">Website but no forms</option>
                      </select>
                    </div>

                    {formData.websiteStatus !== '' && formData.websiteStatus !== 'No website' && (
                      <div>
                        <label htmlFor="websiteUrl" className={labelCls}>
                          Primary Business Website URL
                        </label>
                        <input
                          id="websiteUrl"
                          type="url"
                          inputMode="url"
                          placeholder="e.g., https://www.yourorganization.org"
                          value={formData.websiteUrl}
                          onChange={(e) => set('websiteUrl', e.target.value)}
                          className={inputCls}
                        />
                      </div>
                    )}

                    <div>
                      <label htmlFor="painPoints" className={labelCls}>
                        What are your biggest communication pain points?{' '}
                        <span className="text-red-600 text-xl">*</span>
                      </label>
                      <textarea
                        id="painPoints"
                        placeholder="e.g., 'Can't track call history', 'Faxes get lost', 'Too many disconnected systems'"
                        value={formData.painPoints}
                        onChange={(e) => set('painPoints', e.target.value)}
                        rows={3}
                        className={inputCls + err('painPoints')}
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Step 6 — Vision */}
              {currentStep === 6 && (
                <div className="space-y-8">
                  <div>
                    <h2 className="text-3xl font-semibold text-slate-900 mb-3">
                      🎯 Your Vision & Aspirations
                    </h2>
                    <p className="text-lg text-slate-600">
                      Share your hopes and expectations for becoming a Connie Testing Partner.
                    </p>
                  </div>
                  <div>
                    <label htmlFor="excitedAbout" className={labelCls}>
                      Tell us about your goals, expectations, challenges, and aspirations
                    </label>
                    <textarea
                      id="excitedAbout"
                      placeholder="Share what you're hoping to achieve, any specific challenges you're facing, features you're excited about, or how you envision Connie transforming your organization's communications..."
                      value={formData.excitedAbout}
                      onChange={(e) => set('excitedAbout', e.target.value)}
                      rows={6}
                      className={inputCls}
                    />
                  </div>
                </div>
              )}

              {/* Step 7 — Additional */}
              {currentStep === 7 && (
                <div className="space-y-8">
                  <div>
                    <h2 className="text-3xl font-semibold text-slate-900 mb-3">
                      💡 Additional Information
                    </h2>
                    <p className="text-lg text-slate-600">
                      Any final details you&apos;d like to share with us?
                    </p>
                  </div>

                  <div className="space-y-8">
                    <div>
                      <label htmlFor="additionalContext" className={labelCls}>
                        Anything else we should know?
                      </label>
                      <textarea
                        id="additionalContext"
                        placeholder="Optional - any additional context, concerns, or questions"
                        value={formData.additionalContext}
                        onChange={(e) => set('additionalContext', e.target.value)}
                        rows={3}
                        className={inputCls}
                      />
                    </div>

                    <div>
                      <label htmlFor="howHeard" className={labelCls}>
                        How did you hear about the Connie Testing Partner program?
                      </label>
                      <select
                        id="howHeard"
                        value={formData.howHeard}
                        onChange={(e) => set('howHeard', e.target.value)}
                        className={inputCls}
                      >
                        <option value="">Select...</option>
                        <option value="Direct outreach from the Connie team">
                          Direct outreach from the Connie team
                        </option>
                        <option value="Referral from another organization">
                          Referral from another organization
                        </option>
                        <option value="Conference/event">Conference/event</option>
                        <option value="Other">Other</option>
                      </select>
                    </div>

                    {(formData.howHeard === 'Referral from another organization' ||
                      formData.howHeard === 'Other') && (
                      <div>
                        <label htmlFor="referralDetails" className={labelCls}>
                          Please specify
                        </label>
                        <input
                          id="referralDetails"
                          type="text"
                          value={formData.referralDetails}
                          onChange={(e) => set('referralDetails', e.target.value)}
                          className={inputCls}
                        />
                      </div>
                    )}

                    {submitError && (
                      <div
                        role="alert"
                        aria-live="polite"
                        className="p-6 bg-red-50 border-2 border-red-300 rounded-xl text-red-800 text-lg"
                      >
                        {submitError}
                      </div>
                    )}

                    <div className="bg-slate-50 border-2 border-slate-300 rounded-xl p-8 space-y-4">
                      <div>
                        <p className="text-base text-slate-700 text-center mb-3">
                          Please review these important documents before submitting:
                        </p>
                        <div className="flex flex-wrap justify-center gap-3">
                          <a
                            href="https://connie.one/acceptable-use-policy"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-indigo-600 hover:text-indigo-800 underline text-base"
                          >
                            Acceptable Use Policy
                          </a>
                          <span className="text-slate-400">•</span>
                          <a
                            href="https://connie.one/terms-of-service"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-indigo-600 hover:text-indigo-800 underline text-base"
                          >
                            Terms of Service
                          </a>
                          <span className="text-slate-400">•</span>
                          <a
                            href="https://connie.one/privacy-policy"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-indigo-600 hover:text-indigo-800 underline text-base"
                          >
                            Privacy Policy
                          </a>
                          <span className="text-slate-400">•</span>
                          <a
                            href="https://connie.one/dataroom/legal"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-indigo-600 hover:text-indigo-800 underline text-base"
                          >
                            Testing Partner MOU
                          </a>
                        </div>
                      </div>
                      <div className="border-t border-slate-300 pt-4">
                        <p className="text-sm text-slate-600 text-center">
                          By submitting, you agree to receive communications from the Connie team
                          about the Testing Partner program.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Navigation */}
          <div className="bg-white/95 backdrop-blur-md border-t-2 border-slate-300 rounded-b-2xl shadow-2xl shadow-slate-900/20 ring-1 ring-white/50">
            <div className="p-6">
              {currentStep > 0 && (
                <div className="mb-6">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-base font-semibold text-slate-900">
                      Step {currentStep} of {totalSteps}
                    </span>
                    <span className="text-base text-slate-600">
                      {Math.round((currentStep / totalSteps) * 100)}% Complete
                    </span>
                  </div>
                  <div className="w-full bg-slate-200 rounded-full h-4 overflow-hidden">
                    <div
                      className="bg-indigo-600 h-4 rounded-full transition-all duration-300 ease-in-out"
                      style={{ width: `${(currentStep / totalSteps) * 100}%` }}
                    />
                  </div>
                </div>
              )}

              <div className="flex items-center justify-between gap-6">
                <button
                  type="button"
                  onClick={goToPreviousStep}
                  disabled={currentStep === 0}
                  className={`flex items-center gap-2 px-5 py-2.5 bg-slate-200 text-slate-900 font-medium text-base rounded-lg hover:bg-slate-300 transition-colors disabled:cursor-not-allowed ${
                    currentStep === 0 ? 'invisible' : ''
                  }`}
                >
                  <ChevronLeft className="w-5 h-5" />
                  Back
                </button>

                {currentStep < totalSteps ? (
                  <button
                    type="button"
                    onClick={goToNextStep}
                    className="flex items-center gap-2 px-5 py-2.5 bg-indigo-600 text-white font-medium text-base rounded-lg hover:bg-indigo-700 transition-colors"
                  >
                    {currentStep === 0 ? 'Get Started' : 'Next'}
                    <ChevronRight className="w-5 h-5" />
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={handleSubmit}
                    disabled={isSubmitting}
                    className="flex items-center gap-2 px-5 py-2.5 bg-green-600 text-white font-medium text-base rounded-lg hover:bg-green-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? 'Submitting...' : 'Submit Intake Form'}
                  </button>
                )}
              </div>
            </div>
          </div>

          {currentStep > 0 && (
            <div className="mt-8 flex justify-center opacity-40 hover:opacity-60 transition-opacity">
              <Image src="/connie-logo-black-strong.svg" alt="Connie" width={120} height={32} />
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
