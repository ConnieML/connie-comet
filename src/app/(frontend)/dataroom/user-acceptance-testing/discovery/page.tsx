'use client'

import React, { useState } from 'react'
import Link from 'next/link'
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
  HelpCircle,
} from 'lucide-react'

export default function UATDiscoveryPage() {
  const [formData, setFormData] = useState({
    // Section 1: Organization Information
    orgName: '',
    contactName: '',
    contactTitle: '',
    email: '',
    phone: '',
    orgType: '',
    orgTypeOther: '',
    serviceArea: '',
    clientsServed: '',

    // Section 2: Hours of Operation
    daysOfOperation: [] as string[],
    operatingHours: '',
    afterHoursSupport: '',
    afterHoursDescription: '',

    // Section 3: Staffing & Usage
    staffCount: '',
    staffRoles: '',
    hoursPerDay: '',
    daysPerMonth: '',
    busiestDays: [] as string[],
    usageNotes: '',

    // Section 4: Communication Volumes
    channelsToMigrate: [] as string[],
    socialMediaPlatforms: [] as string[],
    inboundCalls: '',
    outboundCalls: '',
    avgCallDuration: '',
    inboundFaxes: '',
    outboundFaxes: '',
    avgFaxPagesInbound: '',
    avgFaxPagesOutbound: '',
    emailsSent: '',
    emailsReceived: '',
    smsUsage: '',
    smsVolume: '',
    webFormsUsage: '',
    formSubmissions: '',

    // Section 5: Current Tech
    hasTechnicalResources: '',
    technicalResourcesDescription: '',
    phoneSystem: '',
    phoneSystemDetails: '',
    mainBusinessLines: '',
    businessPhoneProvider: '',
    faxSystem: '',
    faxSystemDetails: '',
    emailSystem: '',
    emailSystemDetails: '',
    websiteStatus: '',
    painPoints: '',

    // Section 6: UAT Timeline
    idealStart: '',
    targetDate: '',
    duration: '',
    primaryGoals: [] as string[],
    otherGoals: '',
    budgetProcess: '',
    approvalTimeline: '',
    excitedAbout: '',

    // Section 7: Additional
    additionalContext: '',
    howHeard: '',
    referralDetails: '',
  })

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitSuccess, setSubmitSuccess] = useState(false)
  const [submitError, setSubmitError] = useState('')
  const [currentStep, setCurrentStep] = useState(0)
  const [stepError, setStepError] = useState('')
  const totalSteps = 7

  const handleSubmit = async () => {
    setIsSubmitting(true)
    setSubmitError('')

    try {
      const response = await fetch('/api/uat-intake', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })

      if (!response.ok) throw new Error('Submission failed')

      setSubmitSuccess(true)
      // Reset form
      setFormData({
        orgName: '',
        contactName: '',
        contactTitle: '',
        email: '',
        phone: '',
        orgType: '',
        orgTypeOther: '',
        serviceArea: '',
        clientsServed: '',
        daysOfOperation: [],
        operatingHours: '',
        afterHoursSupport: '',
        afterHoursDescription: '',
        staffCount: '',
        staffRoles: '',
        hoursPerDay: '',
        daysPerMonth: '',
        busiestDays: [],
        usageNotes: '',
        channelsToMigrate: [],
        socialMediaPlatforms: [],
        inboundCalls: '',
        outboundCalls: '',
        avgCallDuration: '',
        inboundFaxes: '',
        outboundFaxes: '',
        avgFaxPagesInbound: '',
        avgFaxPagesOutbound: '',
        emailsSent: '',
        emailsReceived: '',
        smsUsage: '',
        smsVolume: '',
        webFormsUsage: '',
        formSubmissions: '',
        hasTechnicalResources: '',
        technicalResourcesDescription: '',
        phoneSystem: '',
        phoneSystemDetails: '',
        mainBusinessLines: '',
        businessPhoneProvider: '',
        faxSystem: '',
        faxSystemDetails: '',
        emailSystem: '',
        emailSystemDetails: '',
        websiteStatus: '',
        painPoints: '',
        idealStart: '',
        targetDate: '',
        duration: '',
        primaryGoals: [],
        otherGoals: '',
        budgetProcess: '',
        approvalTimeline: '',
        excitedAbout: '',
        additionalContext: '',
        howHeard: '',
        referralDetails: '',
      })
    } catch (_error) {
      setSubmitError('Failed to submit form. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleCheckboxChange = (
    field:
      | 'daysOfOperation'
      | 'busiestDays'
      | 'primaryGoals'
      | 'channelsToMigrate'
      | 'socialMediaPlatforms',
    value: string,
  ) => {
    setFormData((prev) => ({
      ...prev,
      [field]: prev[field].includes(value)
        ? prev[field].filter((v: string) => v !== value)
        : [...prev[field], value],
    }))
  }

  const handleSelectAllChannels = (e: React.ChangeEvent<HTMLInputElement>) => {
    const allChannels = [
      'Live Voice Calls',
      'Messaging SMS/TXT',
      'Webchat',
      'Webforms',
      'Email',
      'Fax',
      'Social Media',
    ]
    setFormData((prev) => ({
      ...prev,
      channelsToMigrate: e.target.checked ? allChannels : [],
    }))
  }

  const validateStep = (step: number): string => {
    switch (step) {
      case 1:
        if (!formData.orgName) return 'Organization Name is required'
        if (!formData.contactName) return 'Primary Contact Name is required'
        if (!formData.email) return 'Email Address is required'
        if (!formData.phone) return 'Phone Number is required'
        if (!formData.orgType) return 'Organization Type is required'
        break
      case 2:
        if (formData.daysOfOperation.length === 0)
          return 'Please select at least one day of operation'
        if (!formData.operatingHours) return 'Typical Operating Hours is required'
        break
      case 3:
        if (!formData.staffCount) return 'Staff Count is required'
        if (!formData.staffRoles) return 'Staff Roles is required'
        break
      case 4:
        if (formData.channelsToMigrate.length === 0)
          return 'Please select at least one communication channel'
        if (formData.channelsToMigrate.includes('Live Voice Calls') && !formData.avgCallDuration)
          return 'Average Call Duration is required when Live Voice Calls is selected'
        break
      case 5:
        if (!formData.hasTechnicalResources)
          return 'Please indicate if you have technical resources'
        if (!formData.painPoints) return 'Pain Points description is required'
        break
      case 6:
        // No required fields in Step 6
        break
    }
    return ''
  }

  const goToNextStep = () => {
    const error = validateStep(currentStep)
    if (error) {
      setStepError(error)
      return
    }
    setStepError('')
    setCurrentStep((prev) => Math.min(prev + 1, totalSteps))
    setTimeout(() => window.scrollTo(0, 0), 0)
  }

  const goToPreviousStep = () => {
    setStepError('')
    setCurrentStep((prev) => Math.max(prev - 1, 0))
    setTimeout(() => window.scrollTo(0, 0), 0)
  }

  if (submitSuccess) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-200 text-slate-800">
        <div className="container mx-auto px-6 py-16">
          <div className="max-w-2xl mx-auto">
            <div className="bg-white/60 backdrop-blur-sm border border-slate-200 rounded-2xl p-12 shadow-lg text-center">
              <div className="text-6xl mb-6">✅</div>
              <h2 className="text-3xl font-light text-slate-800 mb-4">Thank You!</h2>
              <p className="text-lg text-slate-600 mb-6">
                Your UAT Cohort intake form has been submitted successfully.
              </p>
              <div className="bg-green-50 border border-green-200 rounded-lg p-6 mb-6">
                <h3 className="font-semibold text-slate-800 mb-2">Next Steps:</h3>
                <ul className="text-left text-slate-600 space-y-2">
                  <li>• The NSS team will review your information within 2 business days</li>
                  <li>• We&apos;ll calculate your customized pricing estimate</li>
                  <li>• You&apos;ll receive a formal quote via email within 5-7 business days</li>
                  <li>• We&apos;ll schedule a follow-up call to discuss next steps</li>
                </ul>
              </div>
              <p className="text-sm text-slate-600 mb-6">
                Questions? Contact Chris Berno at{' '}
                <a
                  href="mailto:cberno@nevadaseniorservices.org"
                  className="text-indigo-600 hover:text-indigo-800 underline"
                >
                  cberno@nevadaseniorservices.org
                </a>
              </p>
              <div className="flex items-center justify-center gap-4">
                <Link
                  href="/dataroom/user-acceptance-testing"
                  className="inline-block px-6 py-3 bg-slate-800 text-white rounded-lg hover:bg-slate-700 transition-colors"
                >
                  Back to UAT Hub
                </Link>
                <button
                  onClick={() => window.close()}
                  className="inline-block px-6 py-3 bg-slate-200 text-slate-800 rounded-lg hover:bg-slate-300 transition-colors"
                >
                  Close Window
                </button>
              </div>

              {/* Connie Logo */}
              <div className="mt-8 flex justify-center opacity-40 hover:opacity-60 transition-opacity">
                <Image
                  src="/connie-logo-black-strong.svg"
                  alt="Connie"
                  width={120}
                  height={32}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-100 to-slate-400 text-slate-800">
      <div className="container mx-auto px-6 py-8">
        <div className="max-w-4xl mx-auto relative">
          {/* Top Navigation - Only show on Step 0 and Success */}
          {(currentStep === 0 || submitSuccess) && (
            <div className="flex items-center justify-between mb-6">
              <Link
                href="/dataroom/user-acceptance-testing"
                className="inline-flex items-center gap-1 text-sm text-slate-600 hover:text-slate-900 transition-colors"
              >
                <ChevronLeft className="w-4 h-4" />
                Back to UAT Hub
              </Link>
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
          )}

          {/* Support Button Only - Show during form steps */}
          {currentStep > 0 && !submitSuccess && (
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
          )}

          {/* Step Error Display */}
          {stepError && (
            <div className="mb-6 p-6 bg-red-50 border-2 border-red-300 rounded-xl text-red-800 text-lg font-medium">
              {stepError}
            </div>
          )}

          {/* Scrollable Content Area */}
          <div className="bg-white/80 backdrop-blur-md border border-slate-300 rounded-t-2xl shadow-2xl shadow-slate-900/20 ring-1 ring-white/50 max-h-[600px] overflow-y-auto">
            <div className="p-12">
              {/* Logo - Only on Step 0 and Success */}
              {(currentStep === 0 || submitSuccess) && (
                <div className="flex justify-center mb-10">
                  <Image
                    src="/connie-logo-black-strong.svg"
                    alt="Connie"
                    width={250}
                    height={66}
                    priority
                  />
                </div>
              )}

              {/* Step 0: Welcome */}
              {currentStep === 0 && (
                <div className="space-y-8">
                  <div className="text-center">
                    <h2 className="text-4xl font-light text-slate-900 mb-6">
                      Cohort Team Intake Form
                    </h2>
                    <p className="text-xl text-slate-700 mb-6 leading-normal">
                      The following intake wizard will ask you a series of business operations
                      questions. The information provided will be used to define your organizations
                      requirements, estimate costs and and set up your new Connie environment for
                      quick and easy onboarding process and adoption by your staff. Click "Next" to
                      get
                    </p>
                    <div className="bg-slate-100 border-2 border-slate-300 rounded-lg p-4 mb-8 max-w-2xl mx-auto">
                      <p className="text-base text-slate-700 font-medium">
                        <strong>Please Note:</strong> Your responses are not saved until you
                        complete and submit the entire form. We recommend setting aside 10-15
                        minutes to complete it in one session.
                      </p>
                    </div>
                  </div>

                  <div className="bg-indigo-50 border-2 border-indigo-300 rounded-xl p-8 space-y-6">
                    <h3 className="text-2xl font-semibold text-slate-900 mb-4">What to Expect</h3>
                    <ul className="space-y-4 text-lg text-slate-700">
                      <li className="flex items-start gap-4">
                        <span className="text-indigo-600 text-2xl flex-shrink-0">1</span>
                        <span>
                          <strong className="text-slate-900">7 sections</strong> covering
                          organization info, operations, staffing, volumes, tech, goals, and
                          additional context
                        </span>
                      </li>
                      <li className="flex items-start gap-4">
                        <span className="text-indigo-600 text-2xl flex-shrink-0">2</span>
                        <span>
                          <strong className="text-slate-900">10-15 minutes</strong> to complete -
                          you can go back and forth between steps
                        </span>
                      </li>
                      <li className="flex items-start gap-4">
                        <span className="text-indigo-600 text-2xl flex-shrink-0">3</span>
                        <span>
                          <strong className="text-slate-900">Best estimates are fine</strong> -
                          we're looking for general understanding, not exact numbers
                        </span>
                      </li>
                      <li className="flex items-start gap-4">
                        <span className="text-indigo-600 text-2xl flex-shrink-0">4</span>
                        <span>
                          <strong className="text-slate-900">
                            Required fields marked with <span className="text-red-600">*</span>
                          </strong>{' '}
                          - you must complete these to move forward
                        </span>
                      </li>
                    </ul>
                  </div>

                  <div className="text-center pt-4">
                    <p className="text-lg text-slate-600 mb-6">
                      All information provided is confidential and used only for program evaluation.
                    </p>
                  </div>
                </div>
              )}

              {/* Step 1: Organization Information */}
              {currentStep === 1 && (
                <div className="space-y-8">
                  <div>
                    <h2 className="text-3xl font-semibold text-slate-900 mb-3">
                      🏢 Organization Information
                    </h2>
                    <p className="text-lg text-slate-600">
                      Tell us about your organization and who we'll be working with.
                    </p>
                  </div>

                  <div className="space-y-8">
                    <div>
                      <label className="block text-base font-semibold text-slate-900 mb-3">
                        Organization Name <span className="text-red-600 text-xl">*</span>
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.orgName}
                        onChange={(e) => setFormData({ ...formData, orgName: e.target.value })}
                        className="w-full px-6 py-4 border-2 border-slate-300 rounded-xl text-lg focus:outline-none focus:ring-4 focus:ring-indigo-500 focus:border-indigo-500"
                      />
                    </div>

                    <div>
                      <label className="block text-base font-semibold text-slate-900 mb-3">
                        Organization Type <span className="text-red-600 text-xl">*</span>
                      </label>
                      <select
                        required
                        value={formData.orgType}
                        onChange={(e) => setFormData({ ...formData, orgType: e.target.value })}
                        className="w-full px-6 py-4 border-2 border-slate-300 rounded-xl text-lg focus:outline-none focus:ring-4 focus:ring-indigo-500 focus:border-indigo-500"
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
                        <label className="block text-base font-semibold text-slate-900 mb-3">
                          Please specify
                        </label>
                        <input
                          type="text"
                          value={formData.orgTypeOther}
                          onChange={(e) =>
                            setFormData({ ...formData, orgTypeOther: e.target.value })
                          }
                          className="w-full px-6 py-4 border-2 border-slate-300 rounded-xl text-lg focus:outline-none focus:ring-4 focus:ring-indigo-500 focus:border-indigo-500"
                        />
                      </div>
                    )}

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-base font-semibold text-slate-900 mb-3">
                          Primary Contact Name <span className="text-red-600 text-xl">*</span>
                        </label>
                        <input
                          type="text"
                          required
                          value={formData.contactName}
                          onChange={(e) =>
                            setFormData({ ...formData, contactName: e.target.value })
                          }
                          className="w-full px-6 py-4 border-2 border-slate-300 rounded-xl text-lg focus:outline-none focus:ring-4 focus:ring-indigo-500 focus:border-indigo-500"
                        />
                      </div>

                      <div>
                        <label className="block text-base font-semibold text-slate-900 mb-3">
                          Contact Title/Role
                        </label>
                        <input
                          type="text"
                          value={formData.contactTitle}
                          onChange={(e) =>
                            setFormData({ ...formData, contactTitle: e.target.value })
                          }
                          className="w-full px-6 py-4 border-2 border-slate-300 rounded-xl text-lg focus:outline-none focus:ring-4 focus:ring-indigo-500 focus:border-indigo-500"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-base font-semibold text-slate-900 mb-3">
                          Email Address <span className="text-red-600 text-xl">*</span>
                        </label>
                        <input
                          type="email"
                          required
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          className="w-full px-6 py-4 border-2 border-slate-300 rounded-xl text-lg focus:outline-none focus:ring-4 focus:ring-indigo-500 focus:border-indigo-500"
                        />
                      </div>

                      <div>
                        <label className="block text-base font-semibold text-slate-900 mb-3">
                          Phone Number <span className="text-red-600 text-xl">*</span>
                        </label>
                        <input
                          type="tel"
                          required
                          value={formData.phone}
                          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                          className="w-full px-6 py-4 border-2 border-slate-300 rounded-xl text-lg focus:outline-none focus:ring-4 focus:ring-indigo-500 focus:border-indigo-500"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-base font-semibold text-slate-900 mb-3">
                          Service Area/Location
                        </label>
                        <input
                          type="text"
                          placeholder="e.g., Clark County, Nevada"
                          value={formData.serviceArea}
                          onChange={(e) =>
                            setFormData({ ...formData, serviceArea: e.target.value })
                          }
                          className="w-full px-6 py-4 border-2 border-slate-300 rounded-xl text-lg focus:outline-none focus:ring-4 focus:ring-indigo-500 focus:border-indigo-500"
                        />
                      </div>

                      <div>
                        <label className="block text-base font-semibold text-slate-900 mb-3">
                          Clients Served Monthly
                        </label>
                        <input
                          type="text"
                          placeholder="Best estimate is fine"
                          value={formData.clientsServed}
                          onChange={(e) =>
                            setFormData({ ...formData, clientsServed: e.target.value })
                          }
                          className="w-full px-6 py-4 border-2 border-slate-300 rounded-xl text-lg focus:outline-none focus:ring-4 focus:ring-indigo-500 focus:border-indigo-500"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Step 2: Hours of Operation */}
              {currentStep === 2 && (
                <div className="space-y-8">
                  <div>
                    <h2 className="text-3xl font-semibold text-slate-900 mb-3">
                      ⏰ Hours of Operation
                    </h2>
                    <p className="text-lg text-slate-600">
                      Tell us when your organization operates and provides services.
                    </p>
                  </div>

                  <div className="space-y-8">
                    <div>
                      <label className="block text-base font-semibold text-slate-900 mb-3">
                        Days of Operation <span className="text-red-600 text-xl">*</span>
                      </label>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                        {[
                          'Monday',
                          'Tuesday',
                          'Wednesday',
                          'Thursday',
                          'Friday',
                          'Saturday',
                          'Sunday',
                        ].map((day) => (
                          <label key={day} className="flex items-center space-x-3 cursor-pointer">
                            <input
                              type="checkbox"
                              checked={formData.daysOfOperation.includes(day)}
                              onChange={() => handleCheckboxChange('daysOfOperation', day)}
                              className="rounded border-2 border-slate-300 text-indigo-600 focus:ring-4 focus:ring-indigo-500 w-6 h-6"
                            />
                            <span className="text-lg text-slate-900">{day}</span>
                          </label>
                        ))}
                      </div>
                    </div>

                    <div>
                      <label className="block text-base font-semibold text-slate-900 mb-3">
                        Typical Operating Hours <span className="text-red-600 text-xl">*</span>
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="e.g., 8:00 AM - 5:00 PM Monday-Friday"
                        value={formData.operatingHours}
                        onChange={(e) =>
                          setFormData({ ...formData, operatingHours: e.target.value })
                        }
                        className="w-full px-6 py-4 border-2 border-slate-300 rounded-xl text-lg focus:outline-none focus:ring-4 focus:ring-indigo-500 focus:border-indigo-500"
                      />
                    </div>

                    <div>
                      <label className="block text-base font-semibold text-slate-900 mb-3">
                        Do you provide after-hours or weekend support?
                      </label>
                      <select
                        value={formData.afterHoursSupport}
                        onChange={(e) =>
                          setFormData({ ...formData, afterHoursSupport: e.target.value })
                        }
                        className="w-full px-6 py-4 border-2 border-slate-300 rounded-xl text-lg focus:outline-none focus:ring-4 focus:ring-indigo-500 focus:border-indigo-500"
                      >
                        <option value="">Select...</option>
                        <option value="No, standard business hours only">
                          No, standard business hours only
                        </option>
                        <option value="Yes, limited after-hours coverage">
                          Yes, limited after-hours coverage
                        </option>
                        <option value="Yes, 24/7 operations">Yes, 24/7 operations</option>
                      </select>
                    </div>

                    {formData.afterHoursSupport && formData.afterHoursSupport.startsWith('Yes') && (
                      <div>
                        <label className="block text-base font-semibold text-slate-900 mb-3">
                          Please describe after-hours operations
                        </label>
                        <textarea
                          value={formData.afterHoursDescription}
                          onChange={(e) =>
                            setFormData({ ...formData, afterHoursDescription: e.target.value })
                          }
                          rows={3}
                          className="w-full px-6 py-4 border-2 border-slate-300 rounded-xl text-lg focus:outline-none focus:ring-4 focus:ring-indigo-500 focus:border-indigo-500"
                        />
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Step 3: Staffing & Usage */}
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

                  <div className="space-y-8">
                    <div>
                      <label className="block text-base font-semibold text-slate-900 mb-3">
                        How many staff members will actively use Connie?{' '}
                        <span className="text-red-600 text-xl">*</span>
                      </label>
                      <input
                        type="number"
                        required
                        value={formData.staffCount}
                        onChange={(e) => setFormData({ ...formData, staffCount: e.target.value })}
                        className="w-full px-6 py-4 border-2 border-slate-300 rounded-xl text-lg focus:outline-none focus:ring-4 focus:ring-indigo-500 focus:border-indigo-500"
                      />
                      <p className="text-base text-slate-600 mt-2">
                        Include agents, case managers, supervisors, and administrators
                      </p>
                    </div>

                    <div>
                      <label className="block text-base font-semibold text-slate-900 mb-3">
                        Please describe the roles of staff who will use Connie <span className="text-red-600 text-xl">*</span>
                      </label>
                      <textarea
                        required
                        placeholder="e.g., '2 front-line intake specialists, 1 case manager, 1 supervisor'"
                        value={formData.staffRoles}
                        onChange={(e) => setFormData({ ...formData, staffRoles: e.target.value })}
                        rows={3}
                        className="w-full px-6 py-4 border-2 border-slate-300 rounded-xl text-lg focus:outline-none focus:ring-4 focus:ring-indigo-500 focus:border-indigo-500"
                      />
                    </div>

                    <div>
                      <label className="block text-base font-semibold text-slate-900 mb-3">
                        Which days tend to be your busiest?
                      </label>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                        {[
                          'Monday',
                          'Tuesday',
                          'Wednesday',
                          'Thursday',
                          'Friday',
                          'Saturday',
                          'Sunday',
                          'Consistent across all days',
                        ].map((day) => (
                          <label key={day} className="flex items-center space-x-3 cursor-pointer">
                            <input
                              type="checkbox"
                              checked={formData.busiestDays.includes(day)}
                              onChange={() => handleCheckboxChange('busiestDays', day)}
                              className="rounded border-2 border-slate-300 text-indigo-600 focus:ring-4 focus:ring-indigo-500 w-6 h-6"
                            />
                            <span className="text-lg text-slate-900">
                              {day === 'Consistent across all days' ? 'Consistent' : day}
                            </span>
                          </label>
                        ))}
                      </div>
                    </div>

                    <div>
                      <label className="block text-base font-semibold text-slate-900 mb-3">
                        Any additional notes about usage patterns?
                      </label>
                      <textarea
                        placeholder="e.g., 'Busiest on Mondays after weekend, slower on Fridays'"
                        value={formData.usageNotes}
                        onChange={(e) => setFormData({ ...formData, usageNotes: e.target.value })}
                        rows={2}
                        className="w-full px-6 py-4 border-2 border-slate-300 rounded-xl text-lg focus:outline-none focus:ring-4 focus:ring-indigo-500 focus:border-indigo-500"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Step 4: Communication Volumes */}
              {currentStep === 4 && (
                <div className="space-y-8">
                  <div>
                    <h2 className="text-3xl font-semibold text-slate-900 mb-3">
                      📞 Current Communication Volumes
                    </h2>
                    <p className="text-lg text-slate-600">
                      Help us understand your current communication channels and volumes.
                    </p>
                  </div>

                  <div className="space-y-8">
                    {/* Channels to Migrate */}
                    <div>
                      <label className="block text-base font-semibold text-slate-900 mb-4">
                        Which communication channels are you interested in migrating to the cloud?{' '}
                        <span className="text-red-600 text-xl">*</span>
                      </label>

                      <div className="space-y-3">
                        {/* Select All Option */}
                        <label className="flex items-center space-x-3 p-4 bg-indigo-50 border-2 border-indigo-300 rounded-xl hover:bg-indigo-100 transition-colors cursor-pointer">
                          <input
                            type="checkbox"
                            checked={formData.channelsToMigrate.length === 7}
                            onChange={handleSelectAllChannels}
                            className="rounded border-2 border-slate-300 text-indigo-600 focus:ring-4 focus:ring-indigo-500 w-6 h-6"
                          />
                          <span className="text-lg font-semibold text-indigo-900">
                            Select All Channels
                          </span>
                        </label>

                        {/* Individual Channel Options with Icons */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                          <label className="flex items-center space-x-3 p-4 bg-white border-2 border-slate-300 rounded-xl hover:bg-slate-50 transition-colors cursor-pointer">
                            <input
                              type="checkbox"
                              checked={formData.channelsToMigrate.includes('Live Voice Calls')}
                              onChange={() =>
                                handleCheckboxChange('channelsToMigrate', 'Live Voice Calls')
                              }
                              className="rounded border-2 border-slate-300 text-indigo-600 focus:ring-4 focus:ring-indigo-500 w-6 h-6"
                            />
                            <Phone className="w-6 h-6 text-indigo-600" />
                            <span className="text-lg text-slate-900 font-medium">
                              Live Voice Calls
                            </span>
                          </label>

                          <label className="flex items-center space-x-3 p-4 bg-white border-2 border-slate-300 rounded-xl hover:bg-slate-50 transition-colors cursor-pointer">
                            <input
                              type="checkbox"
                              checked={formData.channelsToMigrate.includes('Messaging SMS/TXT')}
                              onChange={() =>
                                handleCheckboxChange('channelsToMigrate', 'Messaging SMS/TXT')
                              }
                              className="rounded border-2 border-slate-300 text-indigo-600 focus:ring-4 focus:ring-indigo-500 w-6 h-6"
                            />
                            <MessageSquare className="w-6 h-6 text-green-600" />
                            <span className="text-lg text-slate-900 font-medium">
                              Messaging SMS/TXT
                            </span>
                          </label>

                          <label className="flex items-center space-x-3 p-4 bg-white border-2 border-slate-300 rounded-xl hover:bg-slate-50 transition-colors cursor-pointer">
                            <input
                              type="checkbox"
                              checked={formData.channelsToMigrate.includes('Webchat')}
                              onChange={() => handleCheckboxChange('channelsToMigrate', 'Webchat')}
                              className="rounded border-2 border-slate-300 text-indigo-600 focus:ring-4 focus:ring-indigo-500 w-6 h-6"
                            />
                            <MessagesSquare className="w-6 h-6 text-blue-600" />
                            <span className="text-lg text-slate-900 font-medium">Webchat</span>
                          </label>

                          <label className="flex items-center space-x-3 p-4 bg-white border-2 border-slate-300 rounded-xl hover:bg-slate-50 transition-colors cursor-pointer">
                            <input
                              type="checkbox"
                              checked={formData.channelsToMigrate.includes('Webforms')}
                              onChange={() => handleCheckboxChange('channelsToMigrate', 'Webforms')}
                              className="rounded border-2 border-slate-300 text-indigo-600 focus:ring-4 focus:ring-indigo-500 w-6 h-6"
                            />
                            <FileText className="w-6 h-6 text-purple-600" />
                            <span className="text-lg text-slate-900 font-medium">Webforms</span>
                          </label>

                          <label className="flex items-center space-x-3 p-4 bg-white border-2 border-slate-300 rounded-xl hover:bg-slate-50 transition-colors cursor-pointer">
                            <input
                              type="checkbox"
                              checked={formData.channelsToMigrate.includes('Email')}
                              onChange={() => handleCheckboxChange('channelsToMigrate', 'Email')}
                              className="rounded border-2 border-slate-300 text-indigo-600 focus:ring-4 focus:ring-indigo-500 w-6 h-6"
                            />
                            <Mail className="w-6 h-6 text-red-600" />
                            <span className="text-lg text-slate-900 font-medium">Email</span>
                          </label>

                          <label className="flex items-center space-x-3 p-4 bg-white border-2 border-slate-300 rounded-xl hover:bg-slate-50 transition-colors cursor-pointer">
                            <input
                              type="checkbox"
                              checked={formData.channelsToMigrate.includes('Fax')}
                              onChange={() => handleCheckboxChange('channelsToMigrate', 'Fax')}
                              className="rounded border-2 border-slate-300 text-indigo-600 focus:ring-4 focus:ring-indigo-500 w-6 h-6"
                            />
                            <Printer className="w-6 h-6 text-gray-600" />
                            <span className="text-lg text-slate-900 font-medium">Fax</span>
                          </label>

                          <label className="flex items-center space-x-3 p-4 bg-white border-2 border-slate-300 rounded-xl hover:bg-slate-50 transition-colors cursor-pointer">
                            <input
                              type="checkbox"
                              checked={formData.channelsToMigrate.includes('Social Media')}
                              onChange={() =>
                                handleCheckboxChange('channelsToMigrate', 'Social Media')
                              }
                              className="rounded border-2 border-slate-300 text-indigo-600 focus:ring-4 focus:ring-indigo-500 w-6 h-6"
                            />
                            <Share2 className="w-6 h-6 text-pink-600" />
                            <span className="text-lg text-slate-900 font-medium">Social Media</span>
                          </label>
                        </div>

                        {/* Social Media Platforms - Conditional */}
                        {formData.channelsToMigrate.includes('Social Media') && (
                          <div className="mt-4 pl-4 border-l-4 border-pink-300 bg-pink-50/50 p-4 rounded-r-xl">
                            <label className="block text-base font-semibold text-slate-900 mb-3">
                              Which social media platforms would you like to handle using Connie?
                            </label>
                            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                              {[
                                'Facebook',
                                'Instagram',
                                'Twitter/X',
                                'LinkedIn',
                                'WhatsApp',
                                'TikTok',
                                'YouTube',
                                'Other',
                              ].map((platform) => (
                                <label
                                  key={platform}
                                  className="flex items-center space-x-3 cursor-pointer"
                                >
                                  <input
                                    type="checkbox"
                                    checked={formData.socialMediaPlatforms.includes(platform)}
                                    onChange={() =>
                                      handleCheckboxChange('socialMediaPlatforms', platform)
                                    }
                                    className="rounded border-2 border-slate-300 text-pink-600 focus:ring-4 focus:ring-pink-500 w-6 h-6"
                                  />
                                  <span className="text-lg text-slate-900">{platform}</span>
                                </label>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    </div>

                    <p className="text-base text-slate-600">
                      Please provide best estimates - exact numbers aren&apos;t required
                    </p>

                    {/* Live Voice Calls - Conditional */}
                    {formData.channelsToMigrate.includes('Live Voice Calls') && (
                      <>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div>
                            <label className="block text-base font-semibold text-slate-900 mb-3">
                              Monthly Inbound Phone Calls
                            </label>
                            <input
                              type="number"
                              placeholder="Calls you receive"
                              value={formData.inboundCalls}
                              onChange={(e) =>
                                setFormData({ ...formData, inboundCalls: e.target.value })
                              }
                              className="w-full px-6 py-4 border-2 border-slate-300 rounded-xl text-lg focus:outline-none focus:ring-4 focus:ring-indigo-500 focus:border-indigo-500"
                            />
                          </div>

                          <div>
                            <label className="block text-base font-semibold text-slate-900 mb-3">
                              Monthly Outbound Phone Calls
                            </label>
                            <input
                              type="number"
                              placeholder="Calls you make"
                              value={formData.outboundCalls}
                              onChange={(e) =>
                                setFormData({ ...formData, outboundCalls: e.target.value })
                              }
                              className="w-full px-6 py-4 border-2 border-slate-300 rounded-xl text-lg focus:outline-none focus:ring-4 focus:ring-indigo-500 focus:border-indigo-500"
                            />
                          </div>
                        </div>

                        <div>
                          <label className="block text-base font-semibold text-slate-900 mb-3">
                            Average Call Duration <span className="text-red-600 text-xl">*</span>
                          </label>
                          <select
                            required
                            value={formData.avgCallDuration}
                            onChange={(e) =>
                              setFormData({ ...formData, avgCallDuration: e.target.value })
                            }
                            className="w-full px-6 py-4 border-2 border-slate-300 rounded-xl text-lg focus:outline-none focus:ring-4 focus:ring-indigo-500 focus:border-indigo-500"
                          >
                            <option value="">Select...</option>
                            <option value="Under 2 minutes">Under 2 minutes</option>
                            <option value="2-5 minutes">2-5 minutes</option>
                            <option value="5-10 minutes">5-10 minutes</option>
                            <option value="10-15 minutes">10-15 minutes</option>
                            <option value="15+ minutes">15+ minutes</option>
                          </select>
                        </div>
                      </>
                    )}

                    {/* Fax - Conditional */}
                    {formData.channelsToMigrate.includes('Fax') && (
                      <>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div>
                            <label className="block text-base font-semibold text-slate-900 mb-3">
                              Monthly Inbound Faxes
                            </label>
                            <input
                              type="number"
                              placeholder="Enter 0 if you don't use fax"
                              value={formData.inboundFaxes}
                              onChange={(e) =>
                                setFormData({ ...formData, inboundFaxes: e.target.value })
                              }
                              className="w-full px-6 py-4 border-2 border-slate-300 rounded-xl text-lg focus:outline-none focus:ring-4 focus:ring-indigo-500 focus:border-indigo-500"
                            />
                          </div>

                          <div>
                            <label className="block text-base font-semibold text-slate-900 mb-3">
                              Monthly Outbound Faxes
                            </label>
                            <input
                              type="number"
                              placeholder="Enter 0 if you don't use fax"
                              value={formData.outboundFaxes}
                              onChange={(e) =>
                                setFormData({ ...formData, outboundFaxes: e.target.value })
                              }
                              className="w-full px-6 py-4 border-2 border-slate-300 rounded-xl text-lg focus:outline-none focus:ring-4 focus:ring-indigo-500 focus:border-indigo-500"
                            />
                          </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div>
                            <label className="block text-base font-semibold text-slate-900 mb-3">
                              Average Pages per Inbound Fax
                            </label>
                            <input
                              type="number"
                              placeholder="e.g., 3"
                              value={formData.avgFaxPagesInbound}
                              onChange={(e) =>
                                setFormData({ ...formData, avgFaxPagesInbound: e.target.value })
                              }
                              className="w-full px-6 py-4 border-2 border-slate-300 rounded-xl text-lg focus:outline-none focus:ring-4 focus:ring-indigo-500 focus:border-indigo-500"
                            />
                          </div>

                          <div>
                            <label className="block text-base font-semibold text-slate-900 mb-3">
                              Average Pages per Outbound Fax
                            </label>
                            <input
                              type="number"
                              placeholder="e.g., 5"
                              value={formData.avgFaxPagesOutbound}
                              onChange={(e) =>
                                setFormData({ ...formData, avgFaxPagesOutbound: e.target.value })
                              }
                              className="w-full px-6 py-4 border-2 border-slate-300 rounded-xl text-lg focus:outline-none focus:ring-4 focus:ring-indigo-500 focus:border-indigo-500"
                            />
                          </div>
                        </div>
                      </>
                    )}

                    {/* Email - Conditional */}
                    {formData.channelsToMigrate.includes('Email') && (
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <label className="block text-base font-semibold text-slate-900 mb-3">
                            Monthly Emails Sent
                          </label>
                          <input
                            type="number"
                            placeholder="Bulk and individual combined"
                            value={formData.emailsSent}
                            onChange={(e) => setFormData({ ...formData, emailsSent: e.target.value })}
                            className="w-full px-6 py-4 border-2 border-slate-300 rounded-xl text-lg focus:outline-none focus:ring-4 focus:ring-indigo-500 focus:border-indigo-500"
                          />
                        </div>

                        <div>
                          <label className="block text-base font-semibold text-slate-900 mb-3">
                            Monthly Emails Received
                          </label>
                          <input
                            type="number"
                            placeholder="From clients"
                            value={formData.emailsReceived}
                            onChange={(e) =>
                              setFormData({ ...formData, emailsReceived: e.target.value })
                            }
                            className="w-full px-6 py-4 border-2 border-slate-300 rounded-xl text-lg focus:outline-none focus:ring-4 focus:ring-indigo-500 focus:border-indigo-500"
                          />
                        </div>
                      </div>
                    )}

                    {/* SMS - Conditional */}
                    {formData.channelsToMigrate.includes('Messaging SMS/TXT') && (
                      <>
                        <div>
                          <label className="block text-base font-semibold text-slate-900 mb-3">
                            SMS Text Messaging Usage
                          </label>
                          <select
                            value={formData.smsUsage}
                            onChange={(e) => setFormData({ ...formData, smsUsage: e.target.value })}
                            className="w-full px-6 py-4 border-2 border-slate-300 rounded-xl text-lg focus:outline-none focus:ring-4 focus:ring-indigo-500 focus:border-indigo-500"
                          >
                            <option value="">Select...</option>
                            <option value="No, we don't use SMS">No, we don&apos;t use SMS</option>
                            <option value="Yes, limited use (under 50/month)">
                              Yes, limited use (under 50/month)
                            </option>
                            <option value="Yes, moderate use (50-200/month)">
                              Yes, moderate use (50-200/month)
                            </option>
                            <option value="Yes, heavy use (200+/month)">
                              Yes, heavy use (200+/month)
                            </option>
                          </select>
                        </div>

                        {formData.smsUsage && formData.smsUsage.startsWith('Yes') && (
                          <div>
                            <label className="block text-base font-semibold text-slate-900 mb-3">
                              Approximate Monthly SMS Volume
                            </label>
                            <input
                              type="number"
                              value={formData.smsVolume}
                              onChange={(e) => setFormData({ ...formData, smsVolume: e.target.value })}
                              className="w-full px-6 py-4 border-2 border-slate-300 rounded-xl text-lg focus:outline-none focus:ring-4 focus:ring-indigo-500 focus:border-indigo-500"
                            />
                          </div>
                        )}
                      </>
                    )}

                    {/* Webforms - Conditional */}
                    {formData.channelsToMigrate.includes('Webforms') && (
                      <>
                        <div>
                          <label className="block text-base font-semibold text-slate-900 mb-3">
                            Online Intake / Web Forms
                          </label>
                          <select
                            value={formData.webFormsUsage}
                            onChange={(e) =>
                              setFormData({ ...formData, webFormsUsage: e.target.value })
                            }
                            className="w-full px-6 py-4 border-2 border-slate-300 rounded-xl text-lg focus:outline-none focus:ring-4 focus:ring-indigo-500 focus:border-indigo-500"
                          >
                            <option value="">Select...</option>
                            <option value="No">No</option>
                            <option value="Yes, occasionally (under 10/month)">
                              Yes, occasionally (under 10/month)
                            </option>
                            <option value="Yes, regularly (10-50/month)">
                              Yes, regularly (10-50/month)
                            </option>
                            <option value="Yes, frequently (50+/month)">
                              Yes, frequently (50+/month)
                            </option>
                          </select>
                        </div>

                        {formData.webFormsUsage && formData.webFormsUsage.startsWith('Yes') && (
                          <div>
                            <label className="block text-base font-semibold text-slate-900 mb-3">
                              Approximate Monthly Form Submissions
                            </label>
                            <input
                              type="number"
                              value={formData.formSubmissions}
                              onChange={(e) =>
                                setFormData({ ...formData, formSubmissions: e.target.value })
                              }
                              className="w-full px-6 py-4 border-2 border-slate-300 rounded-xl text-lg focus:outline-none focus:ring-4 focus:ring-indigo-500 focus:border-indigo-500"
                            />
                          </div>
                        )}
                      </>
                    )}
                  </div>
                </div>
              )}

              {/* Step 5: Current Technology */}
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
                      <label className="block text-base font-semibold text-slate-900 mb-3">
                        Do you have dedicated Technical Resources?{' '}
                        <span className="text-red-600 text-xl">*</span>
                      </label>
                      <select
                        required
                        value={formData.hasTechnicalResources}
                        onChange={(e) =>
                          setFormData({ ...formData, hasTechnicalResources: e.target.value })
                        }
                        className="w-full px-6 py-4 border-2 border-slate-300 rounded-xl text-lg focus:outline-none focus:ring-4 focus:ring-indigo-500 focus:border-indigo-500"
                      >
                        <option value="">Select...</option>
                        <option value="Yes">Yes</option>
                        <option value="No">No</option>
                      </select>
                    </div>

                    {formData.hasTechnicalResources === 'Yes' && (
                      <div>
                        <label className="block text-base font-semibold text-slate-900 mb-3">
                          Please describe your technical resources
                        </label>
                        <textarea
                          placeholder="e.g., '1 full-time IT manager, 2 part-time support staff' or 'Outsourced IT support via managed service provider'"
                          value={formData.technicalResourcesDescription}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              technicalResourcesDescription: e.target.value,
                            })
                          }
                          rows={3}
                          className="w-full px-6 py-4 border-2 border-slate-300 rounded-xl text-lg focus:outline-none focus:ring-4 focus:ring-indigo-500 focus:border-indigo-500"
                        />
                      </div>
                    )}

                    <div>
                      <label className="block text-base font-semibold text-slate-900 mb-3">
                        Current Phone System
                      </label>
                      <select
                        value={formData.phoneSystem}
                        onChange={(e) => setFormData({ ...formData, phoneSystem: e.target.value })}
                        className="w-full px-6 py-4 border-2 border-slate-300 rounded-xl text-lg focus:outline-none focus:ring-4 focus:ring-indigo-500 focus:border-indigo-500"
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

                    {(formData.phoneSystem === 'VoIP system' ||
                      formData.phoneSystem === 'Other') && (
                      <div>
                        <label className="block text-base font-semibold text-slate-900 mb-3">
                          Please specify provider/system
                        </label>
                        <input
                          type="text"
                          value={formData.phoneSystemDetails}
                          onChange={(e) =>
                            setFormData({ ...formData, phoneSystemDetails: e.target.value })
                          }
                          className="w-full px-6 py-4 border-2 border-slate-300 rounded-xl text-lg focus:outline-none focus:ring-4 focus:ring-indigo-500 focus:border-indigo-500"
                        />
                      </div>
                    )}

                    <div>
                      <label className="block text-base font-semibold text-slate-900 mb-3">
                        Main Business Line(s)
                      </label>
                      <input
                        type="text"
                        placeholder="Enter phone numbers, separated by commas"
                        value={formData.mainBusinessLines}
                        onChange={(e) =>
                          setFormData({ ...formData, mainBusinessLines: e.target.value })
                        }
                        className="w-full px-6 py-4 border-2 border-slate-300 rounded-xl text-lg focus:outline-none focus:ring-4 focus:ring-indigo-500 focus:border-indigo-500"
                      />
                      <p className="text-base text-slate-600 mt-2">
                        e.g., (702) 555-1234, (702) 555-5678
                      </p>
                    </div>

                    <div>
                      <label className="block text-base font-semibold text-slate-900 mb-3">
                        Current Business Phone Provider
                      </label>
                      <select
                        value={formData.businessPhoneProvider}
                        onChange={(e) =>
                          setFormData({ ...formData, businessPhoneProvider: e.target.value })
                        }
                        className="w-full px-6 py-4 border-2 border-slate-300 rounded-xl text-lg focus:outline-none focus:ring-4 focus:ring-indigo-500 focus:border-indigo-500"
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
                      <label className="block text-base font-semibold text-slate-900 mb-3">
                        Current Fax System
                      </label>
                      <select
                        value={formData.faxSystem}
                        onChange={(e) => setFormData({ ...formData, faxSystem: e.target.value })}
                        className="w-full px-6 py-4 border-2 border-slate-300 rounded-xl text-lg focus:outline-none focus:ring-4 focus:ring-indigo-500 focus:border-indigo-500"
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

                    {(formData.faxSystem === 'Online fax service' ||
                      formData.faxSystem === 'Other') && (
                      <div>
                        <label className="block text-base font-semibold text-slate-900 mb-3">
                          Please specify
                        </label>
                        <input
                          type="text"
                          value={formData.faxSystemDetails}
                          onChange={(e) =>
                            setFormData({ ...formData, faxSystemDetails: e.target.value })
                          }
                          className="w-full px-6 py-4 border-2 border-slate-300 rounded-xl text-lg focus:outline-none focus:ring-4 focus:ring-indigo-500 focus:border-indigo-500"
                        />
                      </div>
                    )}

                    <div>
                      <label className="block text-base font-semibold text-slate-900 mb-3">
                        Email System
                      </label>
                      <select
                        value={formData.emailSystem}
                        onChange={(e) => setFormData({ ...formData, emailSystem: e.target.value })}
                        className="w-full px-6 py-4 border-2 border-slate-300 rounded-xl text-lg focus:outline-none focus:ring-4 focus:ring-indigo-500 focus:border-indigo-500"
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
                        <label className="block text-base font-semibold text-slate-900 mb-3">
                          Please specify
                        </label>
                        <input
                          type="text"
                          value={formData.emailSystemDetails}
                          onChange={(e) =>
                            setFormData({ ...formData, emailSystemDetails: e.target.value })
                          }
                          className="w-full px-6 py-4 border-2 border-slate-300 rounded-xl text-lg focus:outline-none focus:ring-4 focus:ring-indigo-500 focus:border-indigo-500"
                        />
                      </div>
                    )}

                    <div>
                      <label className="block text-base font-semibold text-slate-900 mb-3">
                        Website Status
                      </label>
                      <select
                        value={formData.websiteStatus}
                        onChange={(e) =>
                          setFormData({ ...formData, websiteStatus: e.target.value })
                        }
                        className="w-full px-6 py-4 border-2 border-slate-300 rounded-xl text-lg focus:outline-none focus:ring-4 focus:ring-indigo-500 focus:border-indigo-500"
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

                    <div>
                      <label className="block text-base font-semibold text-slate-900 mb-3">
                        What are your biggest communication pain points?{' '}
                        <span className="text-red-600 text-xl">*</span>
                      </label>
                      <textarea
                        required
                        placeholder="e.g., 'Can't track call history', 'Faxes get lost', 'Too many disconnected systems'"
                        value={formData.painPoints}
                        onChange={(e) => setFormData({ ...formData, painPoints: e.target.value })}
                        rows={3}
                        className="w-full px-6 py-4 border-2 border-slate-300 rounded-xl text-lg focus:outline-none focus:ring-4 focus:ring-indigo-500 focus:border-indigo-500"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Step 6: Your Vision & Aspirations */}
              {currentStep === 6 && (
                <div className="space-y-8">
                  <div>
                    <h2 className="text-3xl font-semibold text-slate-900 mb-3">
                      🎯 Your Vision & Aspirations
                    </h2>
                    <p className="text-lg text-slate-600">
                      Share your hopes and expectations for this UAT cohort experience.
                    </p>
                  </div>

                  <div className="space-y-8">
                    <div>
                      <label className="block text-base font-semibold text-slate-900 mb-3">
                        Tell us about your goals, expectations, challenges, and aspirations for participating in the UAT cohort
                      </label>
                      <textarea
                        placeholder="Share what you're hoping to achieve, any specific challenges you're facing, features you're excited about, or how you envision Connie transforming your organization's communications..."
                        value={formData.excitedAbout}
                        onChange={(e) => setFormData({ ...formData, excitedAbout: e.target.value })}
                        rows={6}
                        className="w-full px-6 py-4 border-2 border-slate-300 rounded-xl text-lg focus:outline-none focus:ring-4 focus:ring-indigo-500 focus:border-indigo-500"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Step 7: Additional Information */}
              {currentStep === 7 && (
                <div className="space-y-8">
                  <div>
                    <h2 className="text-3xl font-semibold text-slate-900 mb-3">
                      💡 Additional Information
                    </h2>
                    <p className="text-lg text-slate-600">
                      Any final details you'd like to share with us?
                    </p>
                  </div>

                  <div className="space-y-8">
                    <div>
                      <label className="block text-base font-semibold text-slate-900 mb-3">
                        Anything else we should know?
                      </label>
                      <textarea
                        placeholder="Optional - any additional context, concerns, or questions"
                        value={formData.additionalContext}
                        onChange={(e) =>
                          setFormData({ ...formData, additionalContext: e.target.value })
                        }
                        rows={3}
                        className="w-full px-6 py-4 border-2 border-slate-300 rounded-xl text-lg focus:outline-none focus:ring-4 focus:ring-indigo-500 focus:border-indigo-500"
                      />
                    </div>

                    <div>
                      <label className="block text-base font-semibold text-slate-900 mb-3">
                        How did you hear about the Connie UAT Cohort?
                      </label>
                      <select
                        value={formData.howHeard}
                        onChange={(e) => setFormData({ ...formData, howHeard: e.target.value })}
                        className="w-full px-6 py-4 border-2 border-slate-300 rounded-xl text-lg focus:outline-none focus:ring-4 focus:ring-indigo-500 focus:border-indigo-500"
                      >
                        <option value="">Select...</option>
                        <option value="Direct outreach from NSS/Connie team">
                          Direct outreach from NSS/Connie team
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
                        <label className="block text-base font-semibold text-slate-900 mb-3">
                          Please specify
                        </label>
                        <input
                          type="text"
                          value={formData.referralDetails}
                          onChange={(e) =>
                            setFormData({ ...formData, referralDetails: e.target.value })
                          }
                          className="w-full px-6 py-4 border-2 border-slate-300 rounded-xl text-lg focus:outline-none focus:ring-4 focus:ring-indigo-500 focus:border-indigo-500"
                        />
                      </div>
                    )}

                    {submitError && (
                      <div className="p-6 bg-red-50 border-2 border-red-300 rounded-xl text-red-800 text-lg">
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
                            UAT Cohort Team MOU
                          </a>
                        </div>
                      </div>
                      <div className="border-t border-slate-300 pt-4">
                        <p className="text-sm text-slate-600 text-center">
                          By submitting, you agree to receive communications from Nevada Senior Services about the Connie UAT program.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Navigation Bar - Contained */}
          <div className="bg-white/95 backdrop-blur-md border-t-2 border-slate-300 rounded-b-2xl shadow-2xl shadow-slate-900/20 ring-1 ring-white/50">
            <div className="p-6">
              {/* Progress Bar */}
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

              {/* Navigation Buttons */}
              <div className="flex items-center justify-between gap-6">
                <button
                  type="button"
                  onClick={goToPreviousStep}
                  disabled={currentStep === 0}
                  className="flex items-center gap-2 px-5 py-2.5 bg-slate-200 text-slate-900 font-medium text-base rounded-lg hover:bg-slate-300 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
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
                    Next
                    <ChevronRight className="w-5 h-5" />
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={handleSubmit}
                    disabled={isSubmitting}
                    className="flex items-center gap-2 px-5 py-2.5 bg-green-600 text-white font-medium text-base rounded-lg hover:bg-green-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? 'Submitting...' : 'Submit Discovery Form'}
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Small Logo at Bottom - Only on form steps */}
          {currentStep > 0 && !submitSuccess && (
            <div className="mt-8 flex justify-center opacity-40 hover:opacity-60 transition-opacity">
              <Image src="/connie-logo-black-strong.svg" alt="Connie" width={120} height={32} />
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
