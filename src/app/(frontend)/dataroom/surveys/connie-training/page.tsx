'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { ChevronLeft, ChevronRight } from 'lucide-react'

export default function ConnieTrainingSurveyPage() {
  const [formData, setFormData] = useState({
    // Contact Info
    name: '',
    email: '',
    phone: '',
    organization: '',
    
    // Services Used
    servicesUsed: [] as string[],
    
    // Satisfaction ratings
    overallSatisfaction: '',
    staffProfessionalism: '',
    communicationEase: '',
    
    // Open feedback
    whatWorking: '',
    whatImprove: '',
    
    // Recommendation
    wouldRecommend: '',
    
    // Additional
    additionalComments: ''
  })

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitSuccess, setSubmitSuccess] = useState(false)
  const [submitError, setSubmitError] = useState('')
  const [currentStep, setCurrentStep] = useState(0)
  const [stepError, setStepError] = useState('')
  const totalSteps = 4

  const handleSubmit = async () => {
    setIsSubmitting(true)
    setSubmitError('')

    try {
      const response = await fetch('/api/training-survey', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })

      if (!response.ok) throw new Error('Submission failed')

      setSubmitSuccess(true)
    } catch (_error) {
      setSubmitError('Failed to submit form. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleCheckboxChange = (field: 'servicesUsed', value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: prev[field].includes(value)
        ? prev[field].filter((v: string) => v !== value)
        : [...prev[field], value],
    }))
  }

  const validateStep = (step: number): string => {
    switch (step) {
      case 1:
        if (!formData.name) return 'Name is required'
        if (!formData.email) return 'Email is required'
        if (!formData.organization) return 'Organization is required'
        break
      case 2:
        if (formData.servicesUsed.length === 0) return 'Please select at least one service'
        break
      case 3:
        if (!formData.overallSatisfaction) return 'Overall satisfaction rating is required'
        if (!formData.staffProfessionalism) return 'Staff professionalism rating is required'
        if (!formData.communicationEase) return 'Communication ease rating is required'
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
                Your training survey has been submitted successfully.
              </p>
              <div className="bg-green-50 border border-green-200 rounded-lg p-6 mb-6">
                <h3 className="font-semibold text-slate-800 mb-2">What Happens Next:</h3>
                <ul className="text-left text-slate-600 space-y-2">
                  <li>• Your feedback will be reviewed by the Connie team</li>
                  <li>• We'll use your insights to improve our training programs</li>
                  <li>• You may be contacted for follow-up questions</li>
                </ul>
              </div>
              <div className="flex items-center justify-center gap-4">
                <Link
                  href="/dataroom/surveys"
                  className="inline-block px-6 py-3 bg-slate-800 text-white rounded-lg hover:bg-slate-700 transition-colors"
                >
                  Back to Surveys
                </Link>
              </div>
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
          {currentStep === 0 && (
            <div className="flex items-center justify-between mb-6">
              <Link
                href="/dataroom/surveys"
                className="inline-flex items-center gap-1 text-sm text-slate-600 hover:text-slate-900 transition-colors"
              >
                <ChevronLeft className="w-4 h-4" />
                Back to Surveys
              </Link>
            </div>
          )}

          {stepError && (
            <div className="mb-6 p-6 bg-red-50 border-2 border-red-300 rounded-xl text-red-800 text-lg font-medium">
              {stepError}
            </div>
          )}

          <div className="bg-white/80 backdrop-blur-md border border-slate-300 rounded-t-2xl shadow-2xl shadow-slate-900/20 ring-1 ring-white/50 max-h-[600px] overflow-y-auto">
            <div className="p-12">
              {currentStep === 0 && (
                <div className="space-y-8">
                  <div className="flex justify-center mb-10">
                    <Image
                      src="/connie-logo-black-strong.svg"
                      alt="Connie"
                      width={250}
                      height={66}
                      priority
                    />
                  </div>
                  <div className="text-center">
                    <h2 className="text-4xl font-light text-slate-900 mb-6">
                      Connie Training Survey
                    </h2>
                    <p className="text-xl text-slate-700 mb-6 leading-normal">
                      Help us improve our training programs by sharing your experience. Your feedback is invaluable 
                      in helping us serve organizations like yours better.
                    </p>
                    <div className="bg-slate-100 border-2 border-slate-300 rounded-lg p-4 mb-8 max-w-2xl mx-auto">
                      <p className="text-base text-slate-700 font-medium">
                        <strong>Time Required:</strong> 5-10 minutes
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {/* Step 1: Contact Information */}
              {currentStep === 1 && (
                <div className="space-y-8">
                  <div>
                    <h2 className="text-3xl font-semibold text-slate-900 mb-3">
                      📝 Contact Information
                    </h2>
                    <p className="text-lg text-slate-600">
                      Tell us who you are
                    </p>
                  </div>
                  <div className="space-y-6">
                    <div>
                      <label className="block text-base font-semibold text-slate-900 mb-3">
                        Your Name <span className="text-red-600 text-xl">*</span>
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full px-6 py-4 border-2 border-slate-300 rounded-xl text-lg focus:outline-none focus:ring-4 focus:ring-orange-500 focus:border-orange-500"
                      />
                    </div>
                    <div>
                      <label className="block text-base font-semibold text-slate-900 mb-3">
                        Email Address <span className="text-red-600 text-xl">*</span>
                      </label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full px-6 py-4 border-2 border-slate-300 rounded-xl text-lg focus:outline-none focus:ring-4 focus:ring-orange-500 focus:border-orange-500"
                      />
                    </div>
                    <div>
                      <label className="block text-base font-semibold text-slate-900 mb-3">
                        Phone Number (optional)
                      </label>
                      <input
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="w-full px-6 py-4 border-2 border-slate-300 rounded-xl text-lg focus:outline-none focus:ring-4 focus:ring-orange-500 focus:border-orange-500"
                      />
                    </div>
                    <div>
                      <label className="block text-base font-semibold text-slate-900 mb-3">
                        Organization <span className="text-red-600 text-xl">*</span>
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.organization}
                        onChange={(e) => setFormData({ ...formData, organization: e.target.value })}
                        className="w-full px-6 py-4 border-2 border-slate-300 rounded-xl text-lg focus:outline-none focus:ring-4 focus:ring-orange-500 focus:border-orange-500"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Step 2: Services Used */}
              {currentStep === 2 && (
                <div className="space-y-8">
                  <div>
                    <h2 className="text-3xl font-semibold text-slate-900 mb-3">
                      🎯 Services Used
                    </h2>
                    <p className="text-lg text-slate-600">
                      Which Connie services have you used?
                    </p>
                  </div>
                  <div>
                    <label className="block text-base font-semibold text-slate-900 mb-4">
                      Select all that apply <span className="text-red-600 text-xl">*</span>
                    </label>
                    <div className="space-y-3">
                      {[
                        'Transportation Services',
                        'Meal Delivery',
                        'Home Care Assistance',
                        'Social Activities',
                        'Health & Wellness Services',
                        'Other'
                      ].map((service) => (
                        <label key={service} className="flex items-center space-x-3 p-4 bg-white border-2 border-slate-300 rounded-xl hover:bg-slate-50 transition-colors cursor-pointer">
                          <input
                            type="checkbox"
                            checked={formData.servicesUsed.includes(service)}
                            onChange={() => handleCheckboxChange('servicesUsed', service)}
                            className="rounded border-2 border-slate-300 text-orange-600 focus:ring-4 focus:ring-orange-500 w-6 h-6"
                          />
                          <span className="text-lg text-slate-900 font-medium">{service}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* Step 3: Satisfaction Ratings */}
              {currentStep === 3 && (
                <div className="space-y-8">
                  <div>
                    <h2 className="text-3xl font-semibold text-slate-900 mb-3">
                      ⭐ Satisfaction Ratings
                    </h2>
                    <p className="text-lg text-slate-600">
                      Rate your experience
                    </p>
                  </div>
                  
                  {/* Overall Satisfaction */}
                  <div>
                    <label className="block text-base font-semibold text-slate-900 mb-4">
                      Overall, how satisfied are you with Connie services? <span className="text-red-600 text-xl">*</span>
                    </label>
                    <div className="grid grid-cols-5 gap-3">
                      {[1, 2, 3, 4, 5].map((rating) => (
                        <label key={rating} className="cursor-pointer">
                          <input
                            type="radio"
                            name="overallSatisfaction"
                            value={rating}
                            checked={formData.overallSatisfaction === String(rating)}
                            onChange={(e) => setFormData({ ...formData, overallSatisfaction: e.target.value })}
                            className="sr-only"
                          />
                          <div className={`text-center p-4 border-2 rounded-xl transition-all ${
                            formData.overallSatisfaction === String(rating)
                              ? 'bg-orange-600 border-orange-600 text-white'
                              : 'border-slate-300 hover:border-orange-500'
                          }`}>
                            <div className="text-2xl font-bold">{rating}</div>
                            <div className="text-xs mt-1">
                              {rating === 1 ? 'Poor' : rating === 5 ? 'Excellent' : ''}
                            </div>
                          </div>
                        </label>
                      ))}
                    </div>
                  </div>

                  {/* Staff Professionalism */}
                  <div>
                    <label className="block text-base font-semibold text-slate-900 mb-4">
                      How would you rate staff professionalism? <span className="text-red-600 text-xl">*</span>
                    </label>
                    <div className="grid grid-cols-5 gap-3">
                      {[1, 2, 3, 4, 5].map((rating) => (
                        <label key={rating} className="cursor-pointer">
                          <input
                            type="radio"
                            name="staffProfessionalism"
                            value={rating}
                            checked={formData.staffProfessionalism === String(rating)}
                            onChange={(e) => setFormData({ ...formData, staffProfessionalism: e.target.value })}
                            className="sr-only"
                          />
                          <div className={`text-center p-4 border-2 rounded-xl transition-all ${
                            formData.staffProfessionalism === String(rating)
                              ? 'bg-orange-600 border-orange-600 text-white'
                              : 'border-slate-300 hover:border-orange-500'
                          }`}>
                            <div className="text-2xl font-bold">{rating}</div>
                            <div className="text-xs mt-1">
                              {rating === 1 ? 'Poor' : rating === 5 ? 'Excellent' : ''}
                            </div>
                          </div>
                        </label>
                      ))}
                    </div>
                  </div>

                  {/* Communication Ease */}
                  <div>
                    <label className="block text-base font-semibold text-slate-900 mb-4">
                      How easy is it to communicate and schedule services? <span className="text-red-600 text-xl">*</span>
                    </label>
                    <div className="space-y-3">
                      {['Very Easy', 'Easy', 'Neutral', 'Difficult', 'Very Difficult'].map((option) => (
                        <label key={option} className="flex items-center space-x-3 p-4 bg-white border-2 border-slate-300 rounded-xl hover:bg-slate-50 transition-colors cursor-pointer">
                          <input
                            type="radio"
                            name="communicationEase"
                            value={option}
                            checked={formData.communicationEase === option}
                            onChange={(e) => setFormData({ ...formData, communicationEase: e.target.value })}
                            className="w-5 h-5 text-orange-600 focus:ring-orange-500"
                          />
                          <span className="text-lg text-slate-900">{option}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* Step 4: Open Feedback */}
              {currentStep === 4 && (
                <div className="space-y-8">
                  <div>
                    <h2 className="text-3xl font-semibold text-slate-900 mb-3">
                      💬 Your Feedback
                    </h2>
                    <p className="text-lg text-slate-600">
                      Help us improve
                    </p>
                  </div>
                  
                  <div>
                    <label className="block text-base font-semibold text-slate-900 mb-3">
                      What do you appreciate most about Connie services?
                    </label>
                    <textarea
                      value={formData.whatWorking}
                      onChange={(e) => setFormData({ ...formData, whatWorking: e.target.value })}
                      rows={4}
                      placeholder="Tell us what we're doing right..."
                      className="w-full px-6 py-4 border-2 border-slate-300 rounded-xl text-lg focus:outline-none focus:ring-4 focus:ring-orange-500 focus:border-orange-500"
                    />
                  </div>

                  <div>
                    <label className="block text-base font-semibold text-slate-900 mb-3">
                      What could we improve?
                    </label>
                    <textarea
                      value={formData.whatImprove}
                      onChange={(e) => setFormData({ ...formData, whatImprove: e.target.value })}
                      rows={4}
                      placeholder="Your suggestions help us serve you better..."
                      className="w-full px-6 py-4 border-2 border-slate-300 rounded-xl text-lg focus:outline-none focus:ring-4 focus:ring-orange-500 focus:border-orange-500"
                    />
                  </div>

                  <div>
                    <label className="block text-base font-semibold text-slate-900 mb-4">
                      Would you recommend Connie to others?
                    </label>
                    <div className="space-y-3">
                      {['Definitely', 'Probably', 'Not Sure', 'Probably Not', 'Definitely Not'].map((option) => (
                        <label key={option} className="flex items-center space-x-3 p-4 bg-white border-2 border-slate-300 rounded-xl hover:bg-slate-50 transition-colors cursor-pointer">
                          <input
                            type="radio"
                            name="wouldRecommend"
                            value={option}
                            checked={formData.wouldRecommend === option}
                            onChange={(e) => setFormData({ ...formData, wouldRecommend: e.target.value })}
                            className="w-5 h-5 text-orange-600 focus:ring-orange-500"
                          />
                          <span className="text-lg text-slate-900">{option}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-base font-semibold text-slate-900 mb-3">
                      Any additional comments or feedback?
                    </label>
                    <textarea
                      value={formData.additionalComments}
                      onChange={(e) => setFormData({ ...formData, additionalComments: e.target.value })}
                      rows={3}
                      placeholder="Anything else you'd like us to know..."
                      className="w-full px-6 py-4 border-2 border-slate-300 rounded-xl text-lg focus:outline-none focus:ring-4 focus:ring-orange-500 focus:border-orange-500"
                    />
                  </div>

                  {submitError && (
                    <div className="p-6 bg-red-50 border-2 border-red-300 rounded-xl text-red-800 text-lg">
                      {submitError}
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* Navigation Bar */}
          <div className="bg-white/95 backdrop-blur-md border-t-2 border-slate-300 rounded-b-2xl shadow-2xl shadow-slate-900/20 ring-1 ring-white/50">
            <div className="p-6">
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
                    className="bg-orange-600 h-4 rounded-full transition-all duration-300 ease-in-out"
                    style={{ width: `${(currentStep / totalSteps) * 100}%` }}
                  />
                </div>
              </div>

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
                    className="flex items-center gap-2 px-5 py-2.5 bg-orange-600 text-white font-medium text-base rounded-lg hover:bg-orange-700 transition-colors"
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
                    {isSubmitting ? 'Submitting...' : 'Submit Survey'}
                  </button>
                )}
              </div>
            </div>
          </div>

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
