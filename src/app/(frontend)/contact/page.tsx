import React from 'react'
import type { Metadata } from 'next'
import ContactForm from './components/ContactForm'
import ScheduleCard from './components/ScheduleCard'
import LiveChatCard from './components/LiveChatCard'
import CallUsCard from './components/CallUsCard'

export const metadata: Metadata = {
  title: 'Contact Us - Connie',
  description: 'Get in touch with Connie. We help nonprofits transform their communications and scale their impact. Contact us via form, phone, or schedule a meeting.',
  openGraph: {
    title: 'Contact Us - Connie',
    description: 'Get in touch with Connie. We help nonprofits transform their communications and scale their impact.',
    url: 'https://connie.one/contact',
  },
}

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-200 text-slate-800">
      <div className="container mx-auto px-6 py-16">
        {/* Header Section */}
        <div className="max-w-3xl mx-auto text-center mb-12">
          <h1 className="text-5xl font-light text-slate-800 mb-6">
            Get in Touch
          </h1>
          <p className="text-xl text-slate-600 mb-4">
            We help nonprofits transform their communications and scale their impact
          </p>
          <p className="text-sm text-slate-500">
            Serving nonprofit organizations since 2021
          </p>
        </div>

        {/* Contact Cards Grid */}
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
          <ContactForm />
          <ScheduleCard />
          <LiveChatCard />
          <CallUsCard />
        </div>
      </div>
    </div>
  )
}
