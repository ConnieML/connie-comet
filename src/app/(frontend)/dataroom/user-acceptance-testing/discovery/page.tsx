'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { Phone, MessageSquare, MessagesSquare, FileText, Mail, Printer, Share2 } from 'lucide-react'

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
    referralDetails: ''
  })

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitSuccess, setSubmitSuccess] = useState(false)
  const [submitError, setSubmitError] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitError('')

    try {
      const response = await fetch('/api/uat-intake', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      })

      if (!response.ok) throw new Error('Submission failed')

      setSubmitSuccess(true)
      // Reset form
      setFormData({
        orgName: '', contactName: '', contactTitle: '', email: '', phone: '',
        orgType: '', orgTypeOther: '', serviceArea: '', clientsServed: '',
        daysOfOperation: [], operatingHours: '', afterHoursSupport: '', afterHoursDescription: '',
        staffCount: '', staffRoles: '', hoursPerDay: '', daysPerMonth: '',
        busiestDays: [], usageNotes: '', channelsToMigrate: [], socialMediaPlatforms: [],
        inboundCalls: '', outboundCalls: '', avgCallDuration: '', inboundFaxes: '', outboundFaxes: '',
        avgFaxPagesInbound: '', avgFaxPagesOutbound: '', emailsSent: '',
        emailsReceived: '', smsUsage: '', smsVolume: '', webFormsUsage: '',
        formSubmissions: '', hasTechnicalResources: '', technicalResourcesDescription: '',
        phoneSystem: '', phoneSystemDetails: '', mainBusinessLines: '',
        businessPhoneProvider: '', faxSystem: '',
        faxSystemDetails: '', emailSystem: '', emailSystemDetails: '', websiteStatus: '',
        painPoints: '', idealStart: '', targetDate: '', duration: '',
        primaryGoals: [], otherGoals: '', budgetProcess: '', approvalTimeline: '',
        excitedAbout: '', additionalContext: '', howHeard: '', referralDetails: ''
      })
    } catch (_error) {
      setSubmitError('Failed to submit form. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleCheckboxChange = (field: 'daysOfOperation' | 'busiestDays' | 'primaryGoals' | 'channelsToMigrate' | 'socialMediaPlatforms', value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: prev[field].includes(value)
        ? prev[field].filter((v: string) => v !== value)
        : [...prev[field], value]
    }))
  }

  const handleSelectAllChannels = (e: React.ChangeEvent<HTMLInputElement>) => {
    const allChannels = ['Live Voice Calls', 'Messaging SMS/TXT', 'Webchat', 'Webforms', 'Email', 'Fax', 'Social Media']
    setFormData(prev => ({
      ...prev,
      channelsToMigrate: e.target.checked ? allChannels : []
    }))
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
                Questions? Contact Chris Berno at chris.berno@nevsenior.org
              </p>
              <Link
                href="/dataroom/user-acceptance-testing"
                className="inline-block px-6 py-3 bg-slate-800 text-white rounded-lg hover:bg-slate-700 transition-colors"
              >
                Back to UAT Hub
              </Link>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-200 text-slate-800">
      <div className="container mx-auto px-6 py-16">

        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-light text-slate-800 mb-6">
            🧪 UAT Partner Discovery
          </h1>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto mb-4">
            Help us understand your communication needs for UAT participation
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-4">
            <div className="inline-block px-4 py-2 bg-white/60 backdrop-blur-sm border border-slate-300 rounded-full">
              <span className="text-sm text-slate-600">
                10-15 minutes • Confidential
              </span>
            </div>
            <a
              href="/api/uat-intake/pdf"
              download="UAT-Partner-Discovery-Form.pdf"
              className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-full hover:bg-indigo-700 transition-colors text-sm font-medium"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                <polyline points="7 10 12 15 17 10"></polyline>
                <line x1="12" y1="15" x2="12" y2="3"></line>
              </svg>
              Download Blank PDF
            </a>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="max-w-4xl mx-auto space-y-8">

          {/* Section 1: Organization Information */}
          <div className="bg-white/60 backdrop-blur-sm border border-slate-200 rounded-2xl p-8 shadow-lg">
            <h2 className="text-2xl font-semibold text-slate-800 mb-6">Organization Information</h2>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Organization Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={formData.orgName}
                  onChange={(e) => setFormData({...formData, orgName: e.target.value})}
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Primary Contact Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.contactName}
                    onChange={(e) => setFormData({...formData, contactName: e.target.value})}
                    className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Contact Title/Role
                  </label>
                  <input
                    type="text"
                    value={formData.contactTitle}
                    onChange={(e) => setFormData({...formData, contactTitle: e.target.value})}
                    className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Email Address <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({...formData, phone: e.target.value})}
                    className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Organization Type <span className="text-red-500">*</span>
                </label>
                <select
                  required
                  value={formData.orgType}
                  onChange={(e) => setFormData({...formData, orgType: e.target.value})}
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                >
                  <option value="">Select type...</option>
                  <option value="Senior Services / Area Agency on Aging">Senior Services / Area Agency on Aging</option>
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
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Please specify
                  </label>
                  <input
                    type="text"
                    value={formData.orgTypeOther}
                    onChange={(e) => setFormData({...formData, orgTypeOther: e.target.value})}
                    className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>
              )}

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Service Area/Location
                  </label>
                  <input
                    type="text"
                    placeholder="e.g., Clark County, Nevada"
                    value={formData.serviceArea}
                    onChange={(e) => setFormData({...formData, serviceArea: e.target.value})}
                    className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Clients Served Monthly
                  </label>
                  <input
                    type="text"
                    placeholder="Best estimate is fine"
                    value={formData.clientsServed}
                    onChange={(e) => setFormData({...formData, clientsServed: e.target.value})}
                    className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Section 2: Hours of Operation */}
          <div className="bg-white/60 backdrop-blur-sm border border-slate-200 rounded-2xl p-8 shadow-lg">
            <h2 className="text-2xl font-semibold text-slate-800 mb-6">Hours of Operation</h2>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Days of Operation <span className="text-red-500">*</span>
                </label>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                  {['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'].map(day => (
                    <label key={day} className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        checked={formData.daysOfOperation.includes(day)}
                        onChange={() => handleCheckboxChange('daysOfOperation', day)}
                        className="rounded border-slate-300 text-indigo-600 focus:ring-indigo-500"
                      />
                      <span className="text-sm text-slate-700">{day}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Typical Operating Hours <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g., 8:00 AM - 5:00 PM Monday-Friday"
                  value={formData.operatingHours}
                  onChange={(e) => setFormData({...formData, operatingHours: e.target.value})}
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Do you provide after-hours or weekend support?
                </label>
                <select
                  value={formData.afterHoursSupport}
                  onChange={(e) => setFormData({...formData, afterHoursSupport: e.target.value})}
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                >
                  <option value="">Select...</option>
                  <option value="No, standard business hours only">No, standard business hours only</option>
                  <option value="Yes, limited after-hours coverage">Yes, limited after-hours coverage</option>
                  <option value="Yes, 24/7 operations">Yes, 24/7 operations</option>
                </select>
              </div>

              {formData.afterHoursSupport && formData.afterHoursSupport.startsWith('Yes') && (
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Please describe after-hours operations
                  </label>
                  <textarea
                    value={formData.afterHoursDescription}
                    onChange={(e) => setFormData({...formData, afterHoursDescription: e.target.value})}
                    rows={3}
                    className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>
              )}
            </div>
          </div>

          {/* Section 3: Staffing */}
          <div className="bg-white/60 backdrop-blur-sm border border-slate-200 rounded-2xl p-8 shadow-lg">
            <h2 className="text-2xl font-semibold text-slate-800 mb-6">Staffing & Usage Patterns</h2>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  How many staff members will actively use Connie? <span className="text-red-500">*</span>
                </label>
                <input
                  type="number"
                  required
                  value={formData.staffCount}
                  onChange={(e) => setFormData({...formData, staffCount: e.target.value})}
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
                <p className="text-sm text-slate-500 mt-1">Include agents, case managers, supervisors, and administrators</p>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Please describe the roles of staff who will use Connie
                </label>
                <textarea
                  placeholder="e.g., '2 front-line intake specialists, 1 case manager, 1 supervisor'"
                  value={formData.staffRoles}
                  onChange={(e) => setFormData({...formData, staffRoles: e.target.value})}
                  rows={3}
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Average hours per day each staff member will use the platform <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g., '5-6 hours' or 'Full-time: 7 hours, Part-time: 3 hours'"
                  value={formData.hoursPerDay}
                  onChange={(e) => setFormData({...formData, hoursPerDay: e.target.value})}
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
                <p className="text-sm text-slate-500 mt-1">Time actively logged in (not breaks/meetings)</p>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  How many days per month do you typically operate? <span className="text-red-500">*</span>
                </label>
                <select
                  required
                  value={formData.daysPerMonth}
                  onChange={(e) => setFormData({...formData, daysPerMonth: e.target.value})}
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                >
                  <option value="">Select...</option>
                  <option value="15-17 days">15-17 days (part-time schedule)</option>
                  <option value="18-20 days">18-20 days (standard M-F minus holidays)</option>
                  <option value="21-23 days">21-23 days (M-F plus some weekends)</option>
                  <option value="24+ days">24+ days (extensive weekend/holiday operations)</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Which days tend to be your busiest?
                </label>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                  {['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday', 'Consistent across all days'].map(day => (
                    <label key={day} className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        checked={formData.busiestDays.includes(day)}
                        onChange={() => handleCheckboxChange('busiestDays', day)}
                        className="rounded border-slate-300 text-indigo-600 focus:ring-indigo-500"
                      />
                      <span className="text-sm text-slate-700">{day}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Any additional notes about usage patterns?
                </label>
                <textarea
                  placeholder="e.g., 'Busiest on Mondays after weekend, slower on Fridays'"
                  value={formData.usageNotes}
                  onChange={(e) => setFormData({...formData, usageNotes: e.target.value})}
                  rows={2}
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>
            </div>
          </div>

          {/* Section 4: Communication Volumes */}
          <div className="bg-white/60 backdrop-blur-sm border border-slate-200 rounded-2xl p-8 shadow-lg">
            <h2 className="text-2xl font-semibold text-slate-800 mb-6">Current Communication Volumes</h2>

            {/* Channels to Migrate */}
            <div className="mb-8 pb-6 border-b border-slate-300">
              <label className="block text-sm font-medium text-slate-700 mb-4">
                Which communication channels are you interested in migrating to the cloud? <span className="text-red-500">*</span>
              </label>

              <div className="space-y-3">
                {/* Select All Option */}
                <label className="flex items-center space-x-3 p-3 bg-indigo-50 border border-indigo-200 rounded-lg hover:bg-indigo-100 transition-colors cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.channelsToMigrate.length === 7}
                    onChange={handleSelectAllChannels}
                    className="rounded border-slate-300 text-indigo-600 focus:ring-indigo-500 w-5 h-5"
                  />
                  <span className="text-sm font-semibold text-indigo-900">Select All Channels</span>
                </label>

                {/* Individual Channel Options with Icons */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <label className="flex items-center space-x-3 p-3 bg-white border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.channelsToMigrate.includes('Live Voice Calls')}
                      onChange={() => handleCheckboxChange('channelsToMigrate', 'Live Voice Calls')}
                      className="rounded border-slate-300 text-indigo-600 focus:ring-indigo-500 w-5 h-5"
                    />
                    <Phone className="w-5 h-5 text-indigo-600" />
                    <span className="text-sm text-slate-700 font-medium">Live Voice Calls</span>
                  </label>

                  <label className="flex items-center space-x-3 p-3 bg-white border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.channelsToMigrate.includes('Messaging SMS/TXT')}
                      onChange={() => handleCheckboxChange('channelsToMigrate', 'Messaging SMS/TXT')}
                      className="rounded border-slate-300 text-indigo-600 focus:ring-indigo-500 w-5 h-5"
                    />
                    <MessageSquare className="w-5 h-5 text-green-600" />
                    <span className="text-sm text-slate-700 font-medium">Messaging SMS/TXT</span>
                  </label>

                  <label className="flex items-center space-x-3 p-3 bg-white border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.channelsToMigrate.includes('Webchat')}
                      onChange={() => handleCheckboxChange('channelsToMigrate', 'Webchat')}
                      className="rounded border-slate-300 text-indigo-600 focus:ring-indigo-500 w-5 h-5"
                    />
                    <MessagesSquare className="w-5 h-5 text-blue-600" />
                    <span className="text-sm text-slate-700 font-medium">Webchat</span>
                  </label>

                  <label className="flex items-center space-x-3 p-3 bg-white border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.channelsToMigrate.includes('Webforms')}
                      onChange={() => handleCheckboxChange('channelsToMigrate', 'Webforms')}
                      className="rounded border-slate-300 text-indigo-600 focus:ring-indigo-500 w-5 h-5"
                    />
                    <FileText className="w-5 h-5 text-purple-600" />
                    <span className="text-sm text-slate-700 font-medium">Webforms</span>
                  </label>

                  <label className="flex items-center space-x-3 p-3 bg-white border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.channelsToMigrate.includes('Email')}
                      onChange={() => handleCheckboxChange('channelsToMigrate', 'Email')}
                      className="rounded border-slate-300 text-indigo-600 focus:ring-indigo-500 w-5 h-5"
                    />
                    <Mail className="w-5 h-5 text-red-600" />
                    <span className="text-sm text-slate-700 font-medium">Email</span>
                  </label>

                  <label className="flex items-center space-x-3 p-3 bg-white border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.channelsToMigrate.includes('Fax')}
                      onChange={() => handleCheckboxChange('channelsToMigrate', 'Fax')}
                      className="rounded border-slate-300 text-indigo-600 focus:ring-indigo-500 w-5 h-5"
                    />
                    <Printer className="w-5 h-5 text-gray-600" />
                    <span className="text-sm text-slate-700 font-medium">Fax</span>
                  </label>

                  <label className="flex items-center space-x-3 p-3 bg-white border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.channelsToMigrate.includes('Social Media')}
                      onChange={() => handleCheckboxChange('channelsToMigrate', 'Social Media')}
                      className="rounded border-slate-300 text-indigo-600 focus:ring-indigo-500 w-5 h-5"
                    />
                    <Share2 className="w-5 h-5 text-pink-600" />
                    <span className="text-sm text-slate-700 font-medium">Social Media</span>
                  </label>
                </div>

                {/* Social Media Platforms - Conditional */}
                {formData.channelsToMigrate.includes('Social Media') && (
                  <div className="mt-4 pl-4 border-l-4 border-pink-300 bg-pink-50/50 p-4 rounded-r-lg">
                    <label className="block text-sm font-medium text-slate-700 mb-3">
                      Which social media platforms would you like to handle using Connie?
                    </label>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                      {['Facebook', 'Instagram', 'Twitter/X', 'LinkedIn', 'WhatsApp', 'TikTok', 'YouTube', 'Other'].map(platform => (
                        <label key={platform} className="flex items-center space-x-2">
                          <input
                            type="checkbox"
                            checked={formData.socialMediaPlatforms.includes(platform)}
                            onChange={() => handleCheckboxChange('socialMediaPlatforms', platform)}
                            className="rounded border-slate-300 text-pink-600 focus:ring-pink-500"
                          />
                          <span className="text-sm text-slate-700">{platform}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>

            <p className="text-sm text-slate-600 mb-4">Please provide best estimates - exact numbers aren&apos;t required</p>

            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Monthly Inbound Phone Calls
                  </label>
                  <input
                    type="number"
                    placeholder="Calls you receive"
                    value={formData.inboundCalls}
                    onChange={(e) => setFormData({...formData, inboundCalls: e.target.value})}
                    className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Monthly Outbound Phone Calls
                  </label>
                  <input
                    type="number"
                    placeholder="Calls you make"
                    value={formData.outboundCalls}
                    onChange={(e) => setFormData({...formData, outboundCalls: e.target.value})}
                    className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Average Call Duration <span className="text-red-500">*</span>
                </label>
                <select
                  required
                  value={formData.avgCallDuration}
                  onChange={(e) => setFormData({...formData, avgCallDuration: e.target.value})}
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                >
                  <option value="">Select...</option>
                  <option value="Under 2 minutes">Under 2 minutes</option>
                  <option value="2-5 minutes">2-5 minutes</option>
                  <option value="5-10 minutes">5-10 minutes</option>
                  <option value="10-15 minutes">10-15 minutes</option>
                  <option value="15+ minutes">15+ minutes</option>
                </select>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Monthly Inbound Faxes
                  </label>
                  <input
                    type="number"
                    placeholder="Enter 0 if you don't use fax"
                    value={formData.inboundFaxes}
                    onChange={(e) => setFormData({...formData, inboundFaxes: e.target.value})}
                    className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Monthly Outbound Faxes
                  </label>
                  <input
                    type="number"
                    placeholder="Enter 0 if you don't use fax"
                    value={formData.outboundFaxes}
                    onChange={(e) => setFormData({...formData, outboundFaxes: e.target.value})}
                    className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Average Pages per Inbound Fax
                  </label>
                  <input
                    type="number"
                    placeholder="e.g., 3"
                    value={formData.avgFaxPagesInbound}
                    onChange={(e) => setFormData({...formData, avgFaxPagesInbound: e.target.value})}
                    className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Average Pages per Outbound Fax
                  </label>
                  <input
                    type="number"
                    placeholder="e.g., 5"
                    value={formData.avgFaxPagesOutbound}
                    onChange={(e) => setFormData({...formData, avgFaxPagesOutbound: e.target.value})}
                    className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Monthly Emails Sent
                  </label>
                  <input
                    type="number"
                    placeholder="Bulk and individual combined"
                    value={formData.emailsSent}
                    onChange={(e) => setFormData({...formData, emailsSent: e.target.value})}
                    className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Monthly Emails Received
                  </label>
                  <input
                    type="number"
                    placeholder="From clients"
                    value={formData.emailsReceived}
                    onChange={(e) => setFormData({...formData, emailsReceived: e.target.value})}
                    className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  SMS Text Messaging Usage
                </label>
                <select
                  value={formData.smsUsage}
                  onChange={(e) => setFormData({...formData, smsUsage: e.target.value})}
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                >
                  <option value="">Select...</option>
                  <option value="No, we don't use SMS">No, we don&apos;t use SMS</option>
                  <option value="Yes, limited use (under 50/month)">Yes, limited use (under 50/month)</option>
                  <option value="Yes, moderate use (50-200/month)">Yes, moderate use (50-200/month)</option>
                  <option value="Yes, heavy use (200+/month)">Yes, heavy use (200+/month)</option>
                </select>
              </div>

              {formData.smsUsage && formData.smsUsage.startsWith('Yes') && (
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Approximate Monthly SMS Volume
                  </label>
                  <input
                    type="number"
                    value={formData.smsVolume}
                    onChange={(e) => setFormData({...formData, smsVolume: e.target.value})}
                    className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>
              )}

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Online Intake / Web Forms
                </label>
                <select
                  value={formData.webFormsUsage}
                  onChange={(e) => setFormData({...formData, webFormsUsage: e.target.value})}
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                >
                  <option value="">Select...</option>
                  <option value="No">No</option>
                  <option value="Yes, occasionally (under 10/month)">Yes, occasionally (under 10/month)</option>
                  <option value="Yes, regularly (10-50/month)">Yes, regularly (10-50/month)</option>
                  <option value="Yes, frequently (50+/month)">Yes, frequently (50+/month)</option>
                </select>
              </div>

              {formData.webFormsUsage && formData.webFormsUsage.startsWith('Yes') && (
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Approximate Monthly Form Submissions
                  </label>
                  <input
                    type="number"
                    value={formData.formSubmissions}
                    onChange={(e) => setFormData({...formData, formSubmissions: e.target.value})}
                    className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>
              )}
            </div>
          </div>

          {/* Section 5: Current Technology */}
          <div className="bg-white/60 backdrop-blur-sm border border-slate-200 rounded-2xl p-8 shadow-lg">
            <h2 className="text-2xl font-semibold text-slate-800 mb-6">Current Technology Setup</h2>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Do you have dedicated Technical Resources? <span className="text-red-500">*</span>
                </label>
                <select
                  required
                  value={formData.hasTechnicalResources}
                  onChange={(e) => setFormData({...formData, hasTechnicalResources: e.target.value})}
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                >
                  <option value="">Select...</option>
                  <option value="Yes">Yes</option>
                  <option value="No">No</option>
                </select>
              </div>

              {formData.hasTechnicalResources === 'Yes' && (
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Please describe your technical resources
                  </label>
                  <textarea
                    placeholder="e.g., '1 full-time IT manager, 2 part-time support staff' or 'Outsourced IT support via managed service provider'"
                    value={formData.technicalResourcesDescription}
                    onChange={(e) => setFormData({...formData, technicalResourcesDescription: e.target.value})}
                    rows={3}
                    className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>
              )}

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Current Phone System
                </label>
                <select
                  value={formData.phoneSystem}
                  onChange={(e) => setFormData({...formData, phoneSystem: e.target.value})}
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                >
                  <option value="">Select...</option>
                  <option value="Traditional landline/PBX">Traditional landline/PBX</option>
                  <option value="VoIP system">VoIP system</option>
                  <option value="Mix of landlines and cell phones">Mix of landlines and cell phones</option>
                  <option value="Cell phones only">Cell phones only</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              {(formData.phoneSystem === 'VoIP system' || formData.phoneSystem === 'Other') && (
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Please specify provider/system
                  </label>
                  <input
                    type="text"
                    value={formData.phoneSystemDetails}
                    onChange={(e) => setFormData({...formData, phoneSystemDetails: e.target.value})}
                    className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>
              )}

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Main Business Line(s)
                </label>
                <input
                  type="text"
                  placeholder="Enter phone numbers, separated by commas"
                  value={formData.mainBusinessLines}
                  onChange={(e) => setFormData({...formData, mainBusinessLines: e.target.value})}
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
                <p className="text-sm text-slate-500 mt-1">e.g., (702) 555-1234, (702) 555-5678</p>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Current Business Phone Provider
                </label>
                <select
                  value={formData.businessPhoneProvider}
                  onChange={(e) => setFormData({...formData, businessPhoneProvider: e.target.value})}
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
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
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Current Fax System
                </label>
                <select
                  value={formData.faxSystem}
                  onChange={(e) => setFormData({...formData, faxSystem: e.target.value})}
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                >
                  <option value="">Select...</option>
                  <option value="Physical fax machine">Physical fax machine</option>
                  <option value="Online fax service">Online fax service (e.g., eFax, RingCentral Fax)</option>
                  <option value="We don't use fax">We don&apos;t use fax</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              {(formData.faxSystem === 'Online fax service' || formData.faxSystem === 'Other') && (
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Please specify
                  </label>
                  <input
                    type="text"
                    value={formData.faxSystemDetails}
                    onChange={(e) => setFormData({...formData, faxSystemDetails: e.target.value})}
                    className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>
              )}

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Email System
                </label>
                <select
                  value={formData.emailSystem}
                  onChange={(e) => setFormData({...formData, emailSystem: e.target.value})}
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                >
                  <option value="">Select...</option>
                  <option value="Gmail / Google Workspace">Gmail / Google Workspace</option>
                  <option value="Outlook / Microsoft 365">Outlook / Microsoft 365</option>
                  <option value="Other email provider">Other email provider</option>
                  <option value="Mixed systems">Mixed systems</option>
                </select>
              </div>

              {(formData.emailSystem === 'Other email provider' || formData.emailSystem === 'Mixed systems') && (
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Please specify
                  </label>
                  <input
                    type="text"
                    value={formData.emailSystemDetails}
                    onChange={(e) => setFormData({...formData, emailSystemDetails: e.target.value})}
                    className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>
              )}

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Website Status
                </label>
                <select
                  value={formData.websiteStatus}
                  onChange={(e) => setFormData({...formData, websiteStatus: e.target.value})}
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
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
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  What are your biggest communication pain points? <span className="text-red-500">*</span>
                </label>
                <textarea
                  required
                  placeholder="e.g., 'Can't track call history', 'Faxes get lost', 'Too many disconnected systems'"
                  value={formData.painPoints}
                  onChange={(e) => setFormData({...formData, painPoints: e.target.value})}
                  rows={3}
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>
            </div>
          </div>

          {/* Section 6: UAT Timeline & Goals */}
          <div className="bg-white/60 backdrop-blur-sm border border-slate-200 rounded-2xl p-8 shadow-lg">
            <h2 className="text-2xl font-semibold text-slate-800 mb-6">User Acceptance Testing (UAT) Cohort Goals & Timeline</h2>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  When would you ideally like to start UAT? <span className="text-red-500">*</span>
                </label>
                <select
                  required
                  value={formData.idealStart}
                  onChange={(e) => setFormData({...formData, idealStart: e.target.value})}
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                >
                  <option value="">Select...</option>
                  <option value="Within 2 weeks">Within 2 weeks</option>
                  <option value="Within 1 month">Within 1 month</option>
                  <option value="Within 2-3 months">Within 2-3 months</option>
                  <option value="Flexible / To be determined">Flexible / To be determined</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Specific Target Date (if any)
                </label>
                <input
                  type="date"
                  value={formData.targetDate}
                  onChange={(e) => setFormData({...formData, targetDate: e.target.value})}
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Anticipated UAT Duration
                </label>
                <select
                  value={formData.duration}
                  onChange={(e) => setFormData({...formData, duration: e.target.value})}
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                >
                  <option value="">Select...</option>
                  <option value="3 months (recommended minimum)">3 months (recommended minimum)</option>
                  <option value="6 months">6 months</option>
                  <option value="Flexible / Open-ended">Flexible / Open-ended</option>
                  <option value="To be determined">To be determined</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Primary Goals for UAT Participation <span className="text-red-500">*</span>
                </label>
                <div className="space-y-2">
                  {[
                    'Test platform reliability and performance',
                    'Validate cost savings vs. current systems',
                    'Provide feedback on features and usability',
                    'Train staff on modern communication tools',
                    'Explore integration with existing systems',
                    'Help improve the platform for other nonprofits',
                    'Other'
                  ].map(goal => (
                    <label key={goal} className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        checked={formData.primaryGoals.includes(goal)}
                        onChange={() => handleCheckboxChange('primaryGoals', goal)}
                        className="rounded border-slate-300 text-indigo-600 focus:ring-indigo-500"
                      />
                      <span className="text-sm text-slate-700">{goal}</span>
                    </label>
                  ))}
                </div>
              </div>

              {formData.primaryGoals.includes('Other') && (
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Please describe other goals
                  </label>
                  <input
                    type="text"
                    value={formData.otherGoals}
                    onChange={(e) => setFormData({...formData, otherGoals: e.target.value})}
                    className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>
              )}

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Budget Approval Process
                </label>
                <select
                  value={formData.budgetProcess}
                  onChange={(e) => setFormData({...formData, budgetProcess: e.target.value})}
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                >
                  <option value="">Select...</option>
                  <option value="Executive Director can approve immediately">Executive Director can approve immediately</option>
                  <option value="Requires Board approval">Requires Board approval</option>
                  <option value="Requires grant/funding approval">Requires grant/funding approval</option>
                  <option value="Budget already allocated">Budget already allocated</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              {(formData.budgetProcess === 'Requires Board approval' || formData.budgetProcess === 'Requires grant/funding approval') && (
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Typical approval timeline
                  </label>
                  <input
                    type="text"
                    value={formData.approvalTimeline}
                    onChange={(e) => setFormData({...formData, approvalTimeline: e.target.value})}
                    className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>
              )}

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Any specific features you&apos;re most excited about?
                </label>
                <textarea
                  placeholder="Optional - helps us prioritize what to demo during onboarding"
                  value={formData.excitedAbout}
                  onChange={(e) => setFormData({...formData, excitedAbout: e.target.value})}
                  rows={2}
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>
            </div>
          </div>

          {/* Section 7: Additional Information */}
          <div className="bg-white/60 backdrop-blur-sm border border-slate-200 rounded-2xl p-8 shadow-lg">
            <h2 className="text-2xl font-semibold text-slate-800 mb-6">Additional Information</h2>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Anything else we should know?
                </label>
                <textarea
                  placeholder="Optional - any additional context, concerns, or questions"
                  value={formData.additionalContext}
                  onChange={(e) => setFormData({...formData, additionalContext: e.target.value})}
                  rows={3}
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  How did you hear about the Connie UAT Cohort?
                </label>
                <select
                  value={formData.howHeard}
                  onChange={(e) => setFormData({...formData, howHeard: e.target.value})}
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                >
                  <option value="">Select...</option>
                  <option value="Direct outreach from NSS/Connie team">Direct outreach from NSS/Connie team</option>
                  <option value="Referral from another organization">Referral from another organization</option>
                  <option value="Conference/event">Conference/event</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              {(formData.howHeard === 'Referral from another organization' || formData.howHeard === 'Other') && (
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Please specify
                  </label>
                  <input
                    type="text"
                    value={formData.referralDetails}
                    onChange={(e) => setFormData({...formData, referralDetails: e.target.value})}
                    className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>
              )}
            </div>
          </div>

          {/* Submit Button */}
          <div className="bg-white/60 backdrop-blur-sm border border-slate-200 rounded-2xl p-8 shadow-lg">
            {submitError && (
              <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700">
                {submitError}
              </div>
            )}

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-4 px-6 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? 'Submitting...' : 'Submit Discovery Form'}
            </button>

            <p className="text-center text-sm text-slate-600 mt-4">
              By submitting, you agree to receive communications from Nevada Senior Services about the Connie UAT program.
            </p>
          </div>
        </form>

        {/* Back Link */}
        <div className="max-w-4xl mx-auto mt-8">
          <Link
            href="/dataroom/user-acceptance-testing"
            className="inline-flex items-center text-slate-600 hover:text-slate-800 transition-colors"
          >
            ← Back to UAT Hub
          </Link>
        </div>
      </div>
    </div>
  )
}
