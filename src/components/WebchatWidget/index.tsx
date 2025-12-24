'use client'

import React, { useEffect, useState, useCallback } from 'react'
import Link from 'next/link'

// Connie Care Team Webchat Configuration - loaded from environment variables
// Webchat 3.x.x uses deploymentKey only (no accountSid/flexFlowSid needed)
const DEPLOYMENT_KEY = process.env.NEXT_PUBLIC_WEBCHAT_DEPLOYMENT_KEY || ''
const AVAILABILITY_URL = process.env.NEXT_PUBLIC_WEBCHAT_AVAILABILITY_URL || ''

interface AvailabilityResponse {
  available: boolean
  agentCount: number
}

// Webchat 3.x.x appConfig structure (per Twilio documentation)
interface WebchatAppConfig {
  deploymentKey: string
  appStatus?: 'open' | 'closed'
  theme?: {
    isLight?: boolean
  }
  context?: Record<string, unknown>
  disablePreEngagementForm?: boolean
  preEngagementConfig?: {
    title?: string
    description?: string
    submitLabel?: string
    footerLabel?: string
    fields?: Array<{
      label: string
      type: 'InputItem' | 'TextareaItem' | 'SelectItem' | 'CheckboxItem'
      attributes: {
        name: string
        type?: string
        placeholder?: string
        required?: boolean
        pattern?: string
        readOnly?: boolean
        value?: string
      }
      options?: Array<{
        value: string
        label: string
        selected?: boolean
      }>
    }>
  }
}

declare global {
  interface Window {
    Twilio?: {
      // Webchat 3.x.x uses initWebchat
      initWebchat: (config: WebchatAppConfig) => void
    }
  }
}

export const WebchatWidget: React.FC = () => {
  const [isAvailable, setIsAvailable] = useState<boolean | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [webchatLoaded, setWebchatLoaded] = useState(false)
  const [showUnavailableMessage, setShowUnavailableMessage] = useState(false)

  // Check agent availability
  const checkAvailability = useCallback(async () => {
    if (!AVAILABILITY_URL) {
      console.warn('Webchat: AVAILABILITY_URL not configured')
      setIsLoading(false)
      setIsAvailable(false)
      return false
    }

    try {
      const response = await fetch(AVAILABILITY_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      })
      const data: AvailabilityResponse = await response.json()
      setIsAvailable(data.available)
      return data.available
    } catch (error) {
      console.error('Failed to check agent availability:', error)
      setIsAvailable(false)
      return false
    } finally {
      setIsLoading(false)
    }
  }, [])

  // Load Twilio Webchat 3.x.x stylesheet
  const loadWebchatStylesheet = useCallback(() => {
    const stylesheetId = 'twilio-webchat-stylesheet'
    // Guard against duplicate injection
    if (document.getElementById(stylesheetId)) {
      return
    }

    const link = document.createElement('link')
    link.id = stylesheetId
    link.rel = 'stylesheet'
    link.href = 'https://media.twiliocdn.com/sdk/js/webchat-v3/releases/3.3.0/assets/styles.css'
    document.head.appendChild(link)
    console.log('Twilio Webchat 3.x.x stylesheet loaded')
  }, [])

  // Load Twilio Webchat 3.x.x script from Twilio CDN
  const loadWebchatScript = useCallback(() => {
    return new Promise<void>((resolve, reject) => {
      // Check if Webchat 3.x is already loaded
      if (window.Twilio?.initWebchat) {
        resolve()
        return
      }

      // Load Webchat 3.x.x script from Twilio CDN
      const script = document.createElement('script')
      script.src = 'https://media.twiliocdn.com/sdk/js/webchat-v3/releases/3.3.0/webchat.min.js'
      script.defer = true
      script.onload = () => {
        console.log('Twilio Webchat 3.x.x script loaded')
        resolve()
      }
      script.onerror = () => reject(new Error('Failed to load Twilio Webchat 3.x.x'))
      document.head.appendChild(script)
    })
  }, [])

  // Initialize Webchat 3.x.x
  const initializeWebchat = useCallback(async () => {
    if (!window.Twilio?.initWebchat) {
      console.error('Twilio.initWebchat not available')
      return false
    }

    // Log config for debugging (without sensitive data)
    console.log('Initializing Webchat 3.x.x with:', {
      hasDeploymentKey: !!DEPLOYMENT_KEY,
    })

    if (!DEPLOYMENT_KEY) {
      console.error('Missing required webchat deploymentKey')
      return false
    }

    // Webchat 3.x configuration uses deploymentKey + optional preEngagementConfig
    // IMPORTANT: Pre-engagement form requires both 'friendlyName' and 'query' fields
    const webchatConfig: WebchatAppConfig = {
      deploymentKey: DEPLOYMENT_KEY,
      appStatus: 'open',
      theme: {
        isLight: true,
      },
      context: {
        locationOrigin: typeof window !== 'undefined' ? window.location.origin : '',
        channel: 'connie.one',
        taskType: 'sales',
      },
      disablePreEngagementForm: false,
      preEngagementConfig: {
        title: 'Connie Sales',
        description: 'Welcome to Connie! Please fill out the form below to start chatting with our team.',
        submitLabel: 'Start Chat',
        footerLabel: 'Powered by Connie',
        fields: [
          {
            label: 'Your Name',
            type: 'InputItem',
            attributes: {
              name: 'friendlyName',
              type: 'text',
              required: true,
              placeholder: 'Enter your name',
            },
          },
          {
            label: 'Work Email',
            type: 'InputItem',
            attributes: {
              name: 'email',
              type: 'email',
              required: true,
              placeholder: 'you@company.com',
            },
          },
          {
            label: 'Company',
            type: 'InputItem',
            attributes: {
              name: 'company',
              type: 'text',
              required: true,
              placeholder: 'Your organization',
            },
          },
          {
            label: 'Phone (Optional)',
            type: 'InputItem',
            attributes: {
              name: 'phone',
              type: 'tel',
              required: false,
              placeholder: '+1 (555) 123-4567',
            },
          },
          {
            label: 'How can we help?',
            type: 'TextareaItem',
            attributes: {
              name: 'query',
              type: 'text',
              required: true,
              placeholder: 'Tell us what you need help with...',
            },
          },
        ],
      },
    }

    try {
      console.log('Initializing Webchat 3.x.x...')
      window.Twilio.initWebchat(webchatConfig)
      setWebchatLoaded(true)
      console.log('Webchat 3.x.x initialized successfully')
      return true
    } catch (error) {
      console.error('Failed to initialize Webchat 3.x.x:', error)
      return false
    }
  }, [])

  // Check availability on mount
  useEffect(() => {
    checkAvailability()
  }, [checkAvailability])

  // Handle widget button click
  const handleClick = async () => {
    if (isLoading) return

    // Re-check availability when user clicks
    const available = await checkAvailability()

    if (!available) {
      setShowUnavailableMessage(true)
      return
    }

    setShowUnavailableMessage(false)

    if (!webchatLoaded) {
      try {
        // Load stylesheet before initializing widget
        loadWebchatStylesheet()
        await loadWebchatScript()
        const success = await initializeWebchat()
        if (!success) {
          console.error('Webchat initialization failed')
          return
        }
      } catch (error) {
        console.error('Failed to load webchat:', error)
        return
      }
    }

    // Webchat 3.x handles its own UI toggle via the built-in entry point
    // Once initialized, Twilio's widget appears and manages itself
  }

  // Close unavailable message
  const closeUnavailableMessage = () => {
    setShowUnavailableMessage(false)
  }

  return (
    <>
      {/* Unavailable Message Modal */}
      {showUnavailableMessage && (
        <div className="fixed inset-0 z-[9998] flex items-center justify-center bg-black/50 p-4">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-2xl max-w-md w-full p-6 animate-in fade-in zoom-in duration-200">
            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-r from-pink-500 to-purple-500 flex items-center justify-center">
                <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                We&apos;re Currently Away
              </h3>
              <p className="text-gray-600 dark:text-gray-300 mb-6">
                Our team isn&apos;t available for live chat right now, but we&apos;d love to hear from you!
                Leave us a message and we&apos;ll get back to you shortly.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Link
                  href="/contact"
                  onClick={closeUnavailableMessage}
                  className="inline-flex items-center justify-center px-6 py-3 rounded-lg bg-gradient-to-r from-pink-500 to-purple-500 text-white font-medium hover:opacity-90 transition-opacity"
                >
                  Contact Us
                </Link>
                <button
                  onClick={closeUnavailableMessage}
                  className="inline-flex items-center justify-center px-6 py-3 rounded-lg border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 font-medium hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                >
                  Maybe Later
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Chat Button - hidden once Twilio's widget is loaded (it has its own button) */}
      {!webchatLoaded && (
        <button
          onClick={handleClick}
          disabled={isLoading}
          aria-label={isLoading ? 'Loading chat...' : 'Open chat'}
          className="fixed bottom-6 right-6 z-[9999] w-16 h-16 rounded-full bg-gradient-to-r from-pink-500 to-purple-500 text-white shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200 flex items-center justify-center disabled:opacity-50 disabled:cursor-wait"
        >
        {isLoading ? (
          <svg className="w-6 h-6 animate-spin" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
          </svg>
        ) : (
          <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
          </svg>
        )}
        </button>
      )}

      {/* Availability indicator dot - only show when our button is visible */}
      {!isLoading && !webchatLoaded && (
        <span
          className={`fixed bottom-6 right-6 z-[10000] w-4 h-4 rounded-full border-2 border-white transform translate-x-10 -translate-y-10 ${
            isAvailable ? 'bg-green-500' : 'bg-gray-400'
          }`}
          aria-hidden="true"
        />
      )}

      {/* Twilio Webchat 3.x container - required for widget rendering */}
      <div id="twilio-webchat-widget-root" />
    </>
  )
}

export default WebchatWidget
