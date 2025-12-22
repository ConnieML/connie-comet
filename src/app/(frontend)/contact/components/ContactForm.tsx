'use client'

import React, { useState } from 'react'
import { Mail, CheckCircle } from 'lucide-react'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    phone: '',
    inquiryType: '',
    message: '',
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitSuccess, setSubmitSuccess] = useState(false)
  const [submitError, setSubmitError] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitError('')

    // Client-side validation
    if (!formData.name || !formData.email || !formData.company || !formData.inquiryType || !formData.message) {
      setSubmitError('Please fill in all required fields.')
      setIsSubmitting(false)
      return
    }

    // Email format validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(formData.email)) {
      setSubmitError('Please enter a valid email address.')
      setIsSubmitting(false)
      return
    }

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })

      if (!response.ok) throw new Error('Submission failed')

      setSubmitSuccess(true)
      setFormData({
        name: '',
        email: '',
        company: '',
        phone: '',
        inquiryType: '',
        message: '',
      })
    } catch (_error) {
      setSubmitError('Failed to submit form. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  if (submitSuccess) {
    return (
      <Card className="h-full">
        <CardHeader>
          <div className="flex items-center gap-2">
            <CheckCircle className="h-5 w-5 text-green-600" />
            <CardTitle>Message Sent</CardTitle>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-slate-600">
            Thank you! We&apos;ll be in touch within 24 hours.
          </p>
          <Button
            variant="outline"
            onClick={() => setSubmitSuccess(false)}
            className="w-full"
          >
            Send Another Message
          </Button>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="h-full">
      <CardHeader>
        <div className="flex items-center gap-2">
          <Mail className="h-5 w-5 text-slate-600" />
          <CardTitle>Send us a Message</CardTitle>
        </div>
        <CardDescription>
          Fill out the form and we&apos;ll get back to you within 24 hours
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name">
                Name <span className="text-red-500">*</span>
              </Label>
              <Input
                id="name"
                type="text"
                value={formData.name}
                onChange={(e) => handleInputChange('name', e.target.value)}
                placeholder="Your name"
                required
                aria-invalid={submitError ? 'true' : undefined}
                aria-describedby={submitError ? 'form-error' : undefined}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">
                Work Email <span className="text-red-500">*</span>
              </Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => handleInputChange('email', e.target.value)}
                placeholder="you@organization.org"
                required
                aria-invalid={submitError ? 'true' : undefined}
                aria-describedby={submitError ? 'form-error' : undefined}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="company">
                Company/Organization <span className="text-red-500">*</span>
              </Label>
              <Input
                id="company"
                type="text"
                value={formData.company}
                onChange={(e) => handleInputChange('company', e.target.value)}
                placeholder="Your organization"
                required
                aria-invalid={submitError ? 'true' : undefined}
                aria-describedby={submitError ? 'form-error' : undefined}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone">Phone</Label>
              <Input
                id="phone"
                type="tel"
                value={formData.phone}
                onChange={(e) => handleInputChange('phone', e.target.value)}
                placeholder="(555) 555-5555"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="inquiryType" id="inquiryType-label">
              What can we help you with? <span className="text-red-500">*</span>
            </Label>
            <Select
              value={formData.inquiryType}
              onValueChange={(value) => handleInputChange('inquiryType', value)}
            >
              <SelectTrigger
                id="inquiryType"
                aria-labelledby="inquiryType-label"
                aria-invalid={submitError ? 'true' : undefined}
                aria-describedby={submitError ? 'form-error' : undefined}
              >
                <SelectValue placeholder="Select an option" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="General Inquiry">General Inquiry</SelectItem>
                <SelectItem value="Schedule a Demo">Schedule a Demo</SelectItem>
                <SelectItem value="Pricing Information">Pricing Information</SelectItem>
                <SelectItem value="Technical Support">Technical Support</SelectItem>
                <SelectItem value="Partnership Opportunity">Partnership Opportunity</SelectItem>
                <SelectItem value="Media Inquiry">Media Inquiry</SelectItem>
                <SelectItem value="Other">Other</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="message">
              Message <span className="text-red-500">*</span>
            </Label>
            <Textarea
              id="message"
              value={formData.message}
              onChange={(e) => handleInputChange('message', e.target.value)}
              placeholder="How can we help you?"
              rows={4}
              required
              aria-invalid={submitError ? 'true' : undefined}
              aria-describedby={submitError ? 'form-error' : undefined}
            />
          </div>

          {submitError && (
            <div
              id="form-error"
              role="alert"
              className="p-3 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm"
            >
              {submitError}
            </div>
          )}

          <Button
            type="submit"
            disabled={isSubmitting}
            className="w-full"
          >
            {isSubmitting ? 'Sending...' : 'Send Message'}
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}
