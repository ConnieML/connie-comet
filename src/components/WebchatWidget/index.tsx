'use client'

import React, { useEffect, useState, useCallback, useRef } from 'react'
import Link from 'next/link'

// Connie Care Team Webchat Configuration - loaded from environment variables
const DEPLOYMENT_KEY = process.env.NEXT_PUBLIC_WEBCHAT_DEPLOYMENT_KEY || ''
const ACCOUNT_SID = process.env.NEXT_PUBLIC_TWILIO_ACCOUNT_SID || ''
const AVAILABILITY_URL = process.env.NEXT_PUBLIC_WEBCHAT_AVAILABILITY_URL || ''
const FLEX_FLOW_SID = process.env.NEXT_PUBLIC_WEBCHAT_FLEX_FLOW_SID || ''

interface AvailabilityResponse {
  available: boolean
  agentCount: number
}

interface WebchatManager {
  init: () => void
}

declare global {
  interface Window {
    Twilio?: {
      FlexWebChat?: {
        createWebChat: (config: unknown) => Promise<WebchatManager>
        Actions?: {
          invokeAction: (action: string, payload?: unknown) => void
        }
      }
    }
  }
}

export const WebchatWidget: React.FC = () => {
  const [isAvailable, setIsAvailable] = useState<boolean | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isOpen, setIsOpen] = useState(false)
  const [webchatLoaded, setWebchatLoaded] = useState(false)
  const [showUnavailableMessage, setShowUnavailableMessage] = useState(false)
  const webchatManagerRef = useRef<WebchatManager | null>(null)

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

  // Load Twilio Flex Webchat script
  const loadWebchatScript = useCallback(() => {
    return new Promise<void>((resolve, reject) => {
      if (window.Twilio?.FlexWebChat) {
        resolve()
        return
      }

      const script = document.createElement('script')
      script.src = 'https://assets.flex.twilio.com/releases/flex-webchat-ui/2.9.1/twilio-flex-webchat.min.js'
      script.async = true
      script.onload = () => {
        console.log('Twilio Webchat script loaded')
        resolve()
      }
      script.onerror = () => reject(new Error('Failed to load Twilio Webchat'))
      document.head.appendChild(script)

      // Also load the CSS
      const link = document.createElement('link')
      link.rel = 'stylesheet'
      link.href = 'https://assets.flex.twilio.com/releases/flex-webchat-ui/2.9.1/twilio-flex-webchat.min.css'
      document.head.appendChild(link)
    })
  }, [])

  // Initialize webchat
  const initializeWebchat = useCallback(async () => {
    if (!window.Twilio?.FlexWebChat) {
      console.error('Twilio FlexWebChat not available')
      return false
    }

    // Log config for debugging (without sensitive data)
    console.log('Initializing webchat with:', {
      hasAccountSid: !!ACCOUNT_SID,
      hasFlexFlowSid: !!FLEX_FLOW_SID,
      hasDeploymentKey: !!DEPLOYMENT_KEY,
    })

    if (!ACCOUNT_SID || !FLEX_FLOW_SID) {
      console.error('Missing required webchat configuration')
      return false
    }

    const webchatConfig = {
      accountSid: ACCOUNT_SID,
      flexFlowSid: FLEX_FLOW_SID,
      startEngagementOnInit: false,
      preEngagementConfig: {
        description: "Welcome to Connie! Please fill out the form below to start chatting with our team.",
        fields: [
          {
            label: "Your Name",
            type: "InputItem",
            attributes: {
              name: "friendlyName",
              type: "text",
              required: true,
              placeholder: "Enter your name"
            }
          },
          {
            label: "Work Email",
            type: "InputItem",
            attributes: {
              name: "email",
              type: "email",
              required: true,
              placeholder: "you@company.com"
            }
          },
          {
            label: "Company",
            type: "InputItem",
            attributes: {
              name: "company",
              type: "text",
              required: true,
              placeholder: "Your organization"
            }
          },
          {
            label: "Phone (Optional)",
            type: "InputItem",
            attributes: {
              name: "phone",
              type: "tel",
              required: false,
              placeholder: "+1 (555) 123-4567"
            }
          }
        ],
        submitLabel: "Start Chat"
      },
      mainHeader: {
        titleText: "Connie Sales",
        showImage: true,
        imageUrl: "https://docs.connie.one/img/logos/connie-rtc-docs-logo.png"
      },
      colorTheme: {
        overrides: {
          MainHeader: {
            Container: {
              background: "linear-gradient(90deg, #ec4899, #8b5cf6)"
            }
          },
          Chat: {
            MessageListItem: {
              FromOthers: {
                Avatar: {
                  background: "#8b5cf6"
                }
              }
            }
          },
          MainContainer: {
            background: "#ffffff"
          },
          EntryPoint: {
            Container: {
              display: "none" // Hide Twilio's default entry point since we have our own
            }
          }
        }
      },
      context: {
        channel: "connie.one",
        taskType: "sales"
      }
    }

    try {
      console.log('Creating webchat...')
      const webchatManager = await window.Twilio.FlexWebChat.createWebChat(webchatConfig)
      console.log('Webchat created, initializing...')

      // IMPORTANT: Must call init() to render the webchat widget
      webchatManager.init()

      webchatManagerRef.current = webchatManager
      setWebchatLoaded(true)
      console.log('Webchat initialized successfully')
      return true
    } catch (error) {
      console.error('Failed to initialize webchat:', error)
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

    // Toggle the webchat visibility
    // Small delay to ensure webchat is fully rendered
    setTimeout(() => {
      if (window.Twilio?.FlexWebChat?.Actions) {
        console.log('Toggling webchat visibility, isOpen:', isOpen)
        window.Twilio.FlexWebChat.Actions.invokeAction(isOpen ? 'MinimizeChat' : 'ToggleChatVisibility')
        setIsOpen(!isOpen)
      } else {
        console.error('FlexWebChat Actions not available')
      }
    }, 100)
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

      {/* Chat Button */}
      <button
        onClick={handleClick}
        disabled={isLoading}
        aria-label={isLoading ? 'Loading chat...' : isOpen ? 'Close chat' : 'Open chat'}
        className="fixed bottom-6 right-6 z-[9999] w-16 h-16 rounded-full bg-gradient-to-r from-pink-500 to-purple-500 text-white shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200 flex items-center justify-center disabled:opacity-50 disabled:cursor-wait"
      >
        {isLoading ? (
          <svg className="w-6 h-6 animate-spin" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
          </svg>
        ) : isOpen ? (
          <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        ) : (
          <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
          </svg>
        )}
      </button>

      {/* Availability indicator dot */}
      {!isLoading && (
        <span
          className={`fixed bottom-6 right-6 z-[10000] w-4 h-4 rounded-full border-2 border-white transform translate-x-10 -translate-y-10 ${
            isAvailable ? 'bg-green-500' : 'bg-gray-400'
          }`}
          aria-hidden="true"
        />
      )}
    </>
  )
}

export default WebchatWidget
