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

    // Section 1: Onboarding & First Impressions
    trainingRating: '',
    trainingRatingComment: '',
    trainingConfidence: '',
    trainingConfidenceComment: '',
    trainingHelpful: '',
    trainingClearer: '',

    // Section 2: Before vs. After
    oldCommMethods: [] as string[],
    connieSpeedRating: '',
    connieReachRating: '',
    connieHistoryRating: '',
    connieResponseSpeed: '',
    connieResponseSpeedComment: '',

    // Section 3: What's Working Well
    usefulFeatures: [] as string[],
    connieBetter: '',

    // Section 4: Challenges & Friction Points
    hasTechnicalIssues: '',
    technicalIssuesDescription: '',
    confusingFeatures: '',
    slowdowns: '',

    // Section 5: Support & Training Needs
    additionalTraining: '',
    preferredTrainingFormat: [] as string[],

    // Section 6: Overall Satisfaction
    overallSatisfaction: '',
    npsScore: '',
    otherFeedback: '',

    // Section 7: Role-Specific Context
    primaryRole: '',
    weeklyClientCount: '',
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

  const handleCheckboxChange = (field: 'oldCommMethods' | 'usefulFeatures' | 'preferredTrainingFormat', value: string) => {
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
        if (!formData.trainingRating) return 'Training rating is required'
        if (!formData.trainingConfidence) return 'Please indicate your confidence level'
        break
      case 3:
        if (formData.oldCommMethods.length === 0) return 'Please select at least one previous communication method'
        if (!formData.connieSpeedRating) return 'Speed of communication rating is required'
        if (!formData.connieReachRating) return 'Ease of reaching clients rating is required'
        if (!formData.connieHistoryRating) return 'Tracking conversation history rating is required'
        if (!formData.connieResponseSpeed) return 'Please indicate if Connie changed your response speed'
        break
      case 4:
        if (formData.usefulFeatures.length === 0) return 'Please select at least one useful feature'
        break
      case 5:
        if (!formData.hasTechnicalIssues) return 'Please indicate if you experienced technical issues'
        break
      case 7:
        if (!formData.overallSatisfaction) return 'Overall satisfaction rating is required'
        if (!formData.npsScore) return 'Recommendation score is required'
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

  // Reusable 1-5 rating component
  const RatingScale = ({ name, value, onChange, lowLabel = 'Poor', highLabel = 'Excellent' }: {
    name: string
    value: string
    onChange: (val: string) => void
    lowLabel?: string
    highLabel?: string
  }) => (
    <div className="grid grid-cols-5 gap-3">
      {[1, 2, 3, 4, 5].map((rating) => (
        <label key={rating} className="cursor-pointer">
          <input
            type="radio"
            name={name}
            value={rating}
            checked={value === String(rating)}
            onChange={() => onChange(String(rating))}
            className="sr-only"
          />
          <div className={`text-center p-4 border-2 rounded-xl transition-all ${
            value === String(rating)
              ? 'bg-orange-600 border-orange-600 text-white'
              : 'border-slate-300 hover:border-orange-500'
          }`}>
            <div className="text-2xl font-bold">{rating}</div>
            <div className="text-xs mt-1">
              {rating === 1 ? lowLabel : rating === 5 ? highLabel : ''}
            </div>
          </div>
        </label>
      ))}
    </div>
  )

  // Step labels for progress display
  const stepLabels = [
    'Welcome',
    'Contact Info',
    'Onboarding',
    'Before/After',
    "What's Working",
    'Challenges',
    'Support',
    'Satisfaction',
  ]

  if (submitSuccess) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-200 text-slate-800">
        <div className="container mx-auto px-6 py-16">
          <div className="max-w-2xl mx-auto">
            <div className="bg-white/60 backdrop-blur-sm border border-slate-200 rounded-2xl p-12 shadow-lg text-center">
              <div className="text-6xl mb-6">&#x2705;</div>
              <h2 className="text-3xl font-light text-slate-800 mb-4">Thank You!</h2>
              <p className="text-lg text-slate-600 mb-6">
                Your training survey has been submitted successfully.
              </p>
              <div className="bg-green-50 border border-green-200 rounded-lg p-6 mb-6">
                <h3 className="font-semibold text-slate-800 mb-2">What Happens Next:</h3>
                <ul className="text-left text-slate-600 space-y-2">
                  <li>&bull; Your feedback will be reviewed by the Connie team</li>
                  <li>&bull; We&apos;ll use your insights to improve our training programs</li>
                  <li>&bull; You may be contacted for follow-up questions</li>
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

              {/* Step 0: Welcome */}
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
                      Connie Training Feedback Survey
                    </h2>
                    <p className="text-xl text-slate-700 mb-6 leading-normal">
                      Help us improve our training and platform by sharing your experience with Connie.
                      Your feedback directly shapes how we serve organizations like yours.
                    </p>
                    <div className="bg-slate-100 border-2 border-slate-300 rounded-lg p-4 mb-8 max-w-2xl mx-auto">
                      <p className="text-base text-slate-700 font-medium">
                        <strong>Time Required:</strong> 5-10 minutes &middot; 19 questions across 7 sections
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {/* Step 1: Contact Info + Role */}
              {currentStep === 1 && (
                <div className="space-y-8">
                  <div>
                    <h2 className="text-3xl font-semibold text-slate-900 mb-3">
                      Contact Information
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
                    <div>
                      <label className="block text-base font-semibold text-slate-900 mb-3">
                        What is your primary role? (Q18)
                      </label>
                      <select
                        value={formData.primaryRole}
                        onChange={(e) => setFormData({ ...formData, primaryRole: e.target.value })}
                        className="w-full px-6 py-4 border-2 border-slate-300 rounded-xl text-lg focus:outline-none focus:ring-4 focus:ring-orange-500 focus:border-orange-500 bg-white"
                      >
                        <option value="">Select your role...</option>
                        <option value="Case Manager">Case Manager</option>
                        <option value="Outreach Coordinator">Outreach Coordinator</option>
                        <option value="Admin">Admin</option>
                        <option value="Other">Other</option>
                      </select>
                    </div>
                  </div>
                </div>
              )}

              {/* Step 2: Onboarding & First Impressions (Q1-Q4) */}
              {currentStep === 2 && (
                <div className="space-y-8">
                  <div>
                    <h2 className="text-3xl font-semibold text-slate-900 mb-3">
                      Onboarding &amp; First Impressions
                    </h2>
                    <p className="text-lg text-slate-600">
                      Tell us about your training experience
                    </p>
                  </div>

                  {/* Q1 */}
                  <div>
                    <label className="block text-base font-semibold text-slate-900 mb-4">
                      Q1. How would you rate the onboarding/training process? <span className="text-red-600 text-xl">*</span>
                    </label>
                    <RatingScale
                      name="trainingRating"
                      value={formData.trainingRating}
                      onChange={(val) => setFormData({ ...formData, trainingRating: val })}
                    />
                    <textarea
                      value={formData.trainingRatingComment}
                      onChange={(e) => setFormData({ ...formData, trainingRatingComment: e.target.value })}
                      rows={2}
                      placeholder="Any additional comments on the training? (optional)"
                      maxLength={2000}
                      className="w-full mt-4 px-6 py-4 border-2 border-slate-300 rounded-xl text-lg focus:outline-none focus:ring-4 focus:ring-orange-500 focus:border-orange-500"
                    />
                  </div>

                  {/* Q2 */}
                  <div>
                    <label className="block text-base font-semibold text-slate-900 mb-4">
                      Q2. After the training, did you feel confident using Connie on your own? <span className="text-red-600 text-xl">*</span>
                    </label>
                    <div className="space-y-3">
                      {['Yes', 'No', 'Somewhat'].map((option) => (
                        <label key={option} className="flex items-center space-x-3 p-4 bg-white border-2 border-slate-300 rounded-xl hover:bg-slate-50 transition-colors cursor-pointer">
                          <input
                            type="radio"
                            name="trainingConfidence"
                            value={option}
                            checked={formData.trainingConfidence === option}
                            onChange={(e) => setFormData({ ...formData, trainingConfidence: e.target.value })}
                            className="w-5 h-5 text-orange-600 focus:ring-orange-500"
                          />
                          <span className="text-lg text-slate-900">{option}</span>
                        </label>
                      ))}
                    </div>
                    <textarea
                      value={formData.trainingConfidenceComment}
                      onChange={(e) => setFormData({ ...formData, trainingConfidenceComment: e.target.value })}
                      rows={2}
                      placeholder="Tell us more... (optional)"
                      maxLength={2000}
                      className="w-full mt-4 px-6 py-4 border-2 border-slate-300 rounded-xl text-lg focus:outline-none focus:ring-4 focus:ring-orange-500 focus:border-orange-500"
                    />
                  </div>

                  {/* Q3 */}
                  <div>
                    <label className="block text-base font-semibold text-slate-900 mb-3">
                      Q3. What was the most helpful part of the training?
                    </label>
                    <textarea
                      value={formData.trainingHelpful}
                      onChange={(e) => setFormData({ ...formData, trainingHelpful: e.target.value })}
                      rows={3}
                      placeholder="What stood out as most useful..."
                      maxLength={2000}
                      className="w-full px-6 py-4 border-2 border-slate-300 rounded-xl text-lg focus:outline-none focus:ring-4 focus:ring-orange-500 focus:border-orange-500"
                    />
                  </div>

                  {/* Q4 */}
                  <div>
                    <label className="block text-base font-semibold text-slate-900 mb-3">
                      Q4. What part of the training could have been clearer or more detailed?
                    </label>
                    <textarea
                      value={formData.trainingClearer}
                      onChange={(e) => setFormData({ ...formData, trainingClearer: e.target.value })}
                      rows={3}
                      placeholder="What would you improve about the training..."
                      maxLength={2000}
                      className="w-full px-6 py-4 border-2 border-slate-300 rounded-xl text-lg focus:outline-none focus:ring-4 focus:ring-orange-500 focus:border-orange-500"
                    />
                  </div>
                </div>
              )}

              {/* Step 3: Before vs. After (Q5-Q7) */}
              {currentStep === 3 && (
                <div className="space-y-8">
                  <div>
                    <h2 className="text-3xl font-semibold text-slate-900 mb-3">
                      Before vs. After
                    </h2>
                    <p className="text-lg text-slate-600">
                      How does Connie compare to your previous methods?
                    </p>
                  </div>

                  {/* Q5 */}
                  <div>
                    <label className="block text-base font-semibold text-slate-900 mb-4">
                      Q5. Before Connie, how did you typically communicate with clients/families? <span className="text-red-600 text-xl">*</span>
                    </label>
                    <div className="space-y-3">
                      {['Phone', 'Email', 'Text', 'Paper', 'Other'].map((method) => (
                        <label key={method} className="flex items-center space-x-3 p-4 bg-white border-2 border-slate-300 rounded-xl hover:bg-slate-50 transition-colors cursor-pointer">
                          <input
                            type="checkbox"
                            checked={formData.oldCommMethods.includes(method)}
                            onChange={() => handleCheckboxChange('oldCommMethods', method)}
                            className="rounded border-2 border-slate-300 text-orange-600 focus:ring-4 focus:ring-orange-500 w-6 h-6"
                          />
                          <span className="text-lg text-slate-900 font-medium">{method}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  {/* Q6 - Three sub-ratings */}
                  <div>
                    <label className="block text-base font-semibold text-slate-900 mb-4">
                      Q6. Compared to your previous method, how would you rate Connie for: <span className="text-red-600 text-xl">*</span>
                    </label>

                    <div className="space-y-6">
                      <div>
                        <p className="text-base text-slate-700 mb-3 font-medium">Speed of communication</p>
                        <RatingScale
                          name="connieSpeedRating"
                          value={formData.connieSpeedRating}
                          onChange={(val) => setFormData({ ...formData, connieSpeedRating: val })}
                          lowLabel="Worse"
                          highLabel="Much Better"
                        />
                      </div>

                      <div>
                        <p className="text-base text-slate-700 mb-3 font-medium">Ease of reaching clients</p>
                        <RatingScale
                          name="connieReachRating"
                          value={formData.connieReachRating}
                          onChange={(val) => setFormData({ ...formData, connieReachRating: val })}
                          lowLabel="Worse"
                          highLabel="Much Better"
                        />
                      </div>

                      <div>
                        <p className="text-base text-slate-700 mb-3 font-medium">Tracking conversation history</p>
                        <RatingScale
                          name="connieHistoryRating"
                          value={formData.connieHistoryRating}
                          onChange={(val) => setFormData({ ...formData, connieHistoryRating: val })}
                          lowLabel="Worse"
                          highLabel="Much Better"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Q7 */}
                  <div>
                    <label className="block text-base font-semibold text-slate-900 mb-4">
                      Q7. Has Connie changed how quickly you can respond to client questions or requests? <span className="text-red-600 text-xl">*</span>
                    </label>
                    <div className="space-y-3">
                      {['Yes', 'No', 'Not sure'].map((option) => (
                        <label key={option} className="flex items-center space-x-3 p-4 bg-white border-2 border-slate-300 rounded-xl hover:bg-slate-50 transition-colors cursor-pointer">
                          <input
                            type="radio"
                            name="connieResponseSpeed"
                            value={option}
                            checked={formData.connieResponseSpeed === option}
                            onChange={(e) => setFormData({ ...formData, connieResponseSpeed: e.target.value })}
                            className="w-5 h-5 text-orange-600 focus:ring-orange-500"
                          />
                          <span className="text-lg text-slate-900">{option}</span>
                        </label>
                      ))}
                    </div>
                    <textarea
                      value={formData.connieResponseSpeedComment}
                      onChange={(e) => setFormData({ ...formData, connieResponseSpeedComment: e.target.value })}
                      rows={2}
                      placeholder="Tell us more... (optional)"
                      maxLength={2000}
                      className="w-full mt-4 px-6 py-4 border-2 border-slate-300 rounded-xl text-lg focus:outline-none focus:ring-4 focus:ring-orange-500 focus:border-orange-500"
                    />
                  </div>
                </div>
              )}

              {/* Step 4: What's Working Well (Q8-Q9) */}
              {currentStep === 4 && (
                <div className="space-y-8">
                  <div>
                    <h2 className="text-3xl font-semibold text-slate-900 mb-3">
                      What&apos;s Working Well
                    </h2>
                    <p className="text-lg text-slate-600">
                      Tell us what you love about Connie
                    </p>
                  </div>

                  {/* Q8 */}
                  <div>
                    <label className="block text-base font-semibold text-slate-900 mb-4">
                      Q8. Which Connie feature(s) have been most useful so far? <span className="text-red-600 text-xl">*</span>
                    </label>
                    <div className="space-y-3">
                      {['Messaging', 'Broadcast', 'Contact Management', 'Conversation History', 'Other'].map((feature) => (
                        <label key={feature} className="flex items-center space-x-3 p-4 bg-white border-2 border-slate-300 rounded-xl hover:bg-slate-50 transition-colors cursor-pointer">
                          <input
                            type="checkbox"
                            checked={formData.usefulFeatures.includes(feature)}
                            onChange={() => handleCheckboxChange('usefulFeatures', feature)}
                            className="rounded border-2 border-slate-300 text-orange-600 focus:ring-4 focus:ring-orange-500 w-6 h-6"
                          />
                          <span className="text-lg text-slate-900 font-medium">{feature}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  {/* Q9 */}
                  <div>
                    <label className="block text-base font-semibold text-slate-900 mb-3">
                      Q9. What&apos;s one thing Connie does better than your old system?
                    </label>
                    <textarea
                      value={formData.connieBetter}
                      onChange={(e) => setFormData({ ...formData, connieBetter: e.target.value })}
                      rows={4}
                      placeholder="What stands out as a clear improvement..."
                      maxLength={2000}
                      className="w-full px-6 py-4 border-2 border-slate-300 rounded-xl text-lg focus:outline-none focus:ring-4 focus:ring-orange-500 focus:border-orange-500"
                    />
                  </div>
                </div>
              )}

              {/* Step 5: Challenges & Friction Points (Q10-Q12) */}
              {currentStep === 5 && (
                <div className="space-y-8">
                  <div>
                    <h2 className="text-3xl font-semibold text-slate-900 mb-3">
                      Challenges &amp; Friction Points
                    </h2>
                    <p className="text-lg text-slate-600">
                      Help us identify areas for improvement
                    </p>
                  </div>

                  {/* Q10 */}
                  <div>
                    <label className="block text-base font-semibold text-slate-900 mb-4">
                      Q10. Have you experienced any technical issues using Connie? <span className="text-red-600 text-xl">*</span>
                    </label>
                    <div className="space-y-3">
                      {['Yes', 'No'].map((option) => (
                        <label key={option} className="flex items-center space-x-3 p-4 bg-white border-2 border-slate-300 rounded-xl hover:bg-slate-50 transition-colors cursor-pointer">
                          <input
                            type="radio"
                            name="hasTechnicalIssues"
                            value={option}
                            checked={formData.hasTechnicalIssues === option}
                            onChange={(e) => setFormData({ ...formData, hasTechnicalIssues: e.target.value })}
                            className="w-5 h-5 text-orange-600 focus:ring-orange-500"
                          />
                          <span className="text-lg text-slate-900">{option}</span>
                        </label>
                      ))}
                    </div>
                    {formData.hasTechnicalIssues === 'Yes' && (
                      <textarea
                        value={formData.technicalIssuesDescription}
                        onChange={(e) => setFormData({ ...formData, technicalIssuesDescription: e.target.value })}
                        rows={3}
                        placeholder="Please describe the issues you encountered..."
                        maxLength={2000}
                        className="w-full mt-4 px-6 py-4 border-2 border-slate-300 rounded-xl text-lg focus:outline-none focus:ring-4 focus:ring-orange-500 focus:border-orange-500"
                      />
                    )}
                  </div>

                  {/* Q11 */}
                  <div>
                    <label className="block text-base font-semibold text-slate-900 mb-3">
                      Q11. Which feature(s) felt confusing or hard to use at first?
                    </label>
                    <textarea
                      value={formData.confusingFeatures}
                      onChange={(e) => setFormData({ ...formData, confusingFeatures: e.target.value })}
                      rows={3}
                      placeholder="Anything that wasn't intuitive at first..."
                      maxLength={2000}
                      className="w-full px-6 py-4 border-2 border-slate-300 rounded-xl text-lg focus:outline-none focus:ring-4 focus:ring-orange-500 focus:border-orange-500"
                    />
                  </div>

                  {/* Q12 */}
                  <div>
                    <label className="block text-base font-semibold text-slate-900 mb-3">
                      Q12. Is there anything that slowed you down or made a task harder than expected?
                    </label>
                    <textarea
                      value={formData.slowdowns}
                      onChange={(e) => setFormData({ ...formData, slowdowns: e.target.value })}
                      rows={3}
                      placeholder="Anything that took longer than it should have..."
                      maxLength={2000}
                      className="w-full px-6 py-4 border-2 border-slate-300 rounded-xl text-lg focus:outline-none focus:ring-4 focus:ring-orange-500 focus:border-orange-500"
                    />
                  </div>
                </div>
              )}

              {/* Step 6: Support & Training Needs (Q13-Q14) */}
              {currentStep === 6 && (
                <div className="space-y-8">
                  <div>
                    <h2 className="text-3xl font-semibold text-slate-900 mb-3">
                      Support &amp; Training Needs
                    </h2>
                    <p className="text-lg text-slate-600">
                      How can we better support you?
                    </p>
                  </div>

                  {/* Q13 */}
                  <div>
                    <label className="block text-base font-semibold text-slate-900 mb-3">
                      Q13. What additional training or resources would help you use Connie more effectively?
                    </label>
                    <textarea
                      value={formData.additionalTraining}
                      onChange={(e) => setFormData({ ...formData, additionalTraining: e.target.value })}
                      rows={4}
                      placeholder="What would help you get more out of Connie..."
                      maxLength={2000}
                      className="w-full px-6 py-4 border-2 border-slate-300 rounded-xl text-lg focus:outline-none focus:ring-4 focus:ring-orange-500 focus:border-orange-500"
                    />
                  </div>

                  {/* Q14 */}
                  <div>
                    <label className="block text-base font-semibold text-slate-900 mb-4">
                      Q14. Would you prefer: (select all that apply)
                    </label>
                    <div className="space-y-3">
                      {['Follow-up training sessions', 'Written guides', 'Video tutorials', '1-on-1 help'].map((format) => (
                        <label key={format} className="flex items-center space-x-3 p-4 bg-white border-2 border-slate-300 rounded-xl hover:bg-slate-50 transition-colors cursor-pointer">
                          <input
                            type="checkbox"
                            checked={formData.preferredTrainingFormat.includes(format)}
                            onChange={() => handleCheckboxChange('preferredTrainingFormat', format)}
                            className="rounded border-2 border-slate-300 text-orange-600 focus:ring-4 focus:ring-orange-500 w-6 h-6"
                          />
                          <span className="text-lg text-slate-900 font-medium">{format}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* Step 7: Overall Satisfaction (Q15-Q17, Q19) */}
              {currentStep === 7 && (
                <div className="space-y-8">
                  <div>
                    <h2 className="text-3xl font-semibold text-slate-900 mb-3">
                      Overall Satisfaction
                    </h2>
                    <p className="text-lg text-slate-600">
                      Your overall experience with Connie
                    </p>
                  </div>

                  {/* Q15 */}
                  <div>
                    <label className="block text-base font-semibold text-slate-900 mb-4">
                      Q15. Overall, how satisfied are you with Connie so far? <span className="text-red-600 text-xl">*</span>
                    </label>
                    <RatingScale
                      name="overallSatisfaction"
                      value={formData.overallSatisfaction}
                      onChange={(val) => setFormData({ ...formData, overallSatisfaction: val })}
                    />
                  </div>

                  {/* Q16 - NPS 0-10 */}
                  <div>
                    <label className="block text-base font-semibold text-slate-900 mb-4">
                      Q16. How likely are you to recommend Connie to other departments at NSS? <span className="text-red-600 text-xl">*</span>
                    </label>
                    <div className="grid grid-cols-11 gap-1.5">
                      {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((score) => (
                        <label key={score} className="cursor-pointer">
                          <input
                            type="radio"
                            name="npsScore"
                            value={score}
                            checked={formData.npsScore === String(score)}
                            onChange={(e) => setFormData({ ...formData, npsScore: e.target.value })}
                            className="sr-only"
                          />
                          <div className={`text-center p-3 border-2 rounded-xl transition-all ${
                            formData.npsScore === String(score)
                              ? 'bg-orange-600 border-orange-600 text-white'
                              : 'border-slate-300 hover:border-orange-500'
                          }`}>
                            <div className="text-lg font-bold">{score}</div>
                          </div>
                        </label>
                      ))}
                    </div>
                    <div className="flex justify-between mt-2 text-sm text-slate-500">
                      <span>Not at all likely</span>
                      <span>Extremely likely</span>
                    </div>
                  </div>

                  {/* Q17 */}
                  <div>
                    <label className="block text-base font-semibold text-slate-900 mb-3">
                      Q17. Any other feedback, suggestions, or concerns?
                    </label>
                    <textarea
                      value={formData.otherFeedback}
                      onChange={(e) => setFormData({ ...formData, otherFeedback: e.target.value })}
                      rows={4}
                      placeholder="Anything else you'd like us to know..."
                      maxLength={2000}
                      className="w-full px-6 py-4 border-2 border-slate-300 rounded-xl text-lg focus:outline-none focus:ring-4 focus:ring-orange-500 focus:border-orange-500"
                    />
                  </div>

                  {/* Q19 */}
                  <div>
                    <label className="block text-base font-semibold text-slate-900 mb-3">
                      Q19. Roughly how many clients do you communicate with in a typical week?
                    </label>
                    <input
                      type="text"
                      value={formData.weeklyClientCount}
                      onChange={(e) => setFormData({ ...formData, weeklyClientCount: e.target.value })}
                      placeholder="e.g., 20-30"
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
                    {currentStep === 0 ? 'Welcome' : `Step ${currentStep} of ${totalSteps} — ${stepLabels[currentStep]}`}
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
