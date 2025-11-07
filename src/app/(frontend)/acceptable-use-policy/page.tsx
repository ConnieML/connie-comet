import React from 'react'
import Link from 'next/link'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Acceptable Use Policy | Connie',
  description: 'Connie Acceptable Use Policy - Rules and guidelines for using Connie services.',
}

export default function AcceptableUsePolicyPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <div className="bg-gradient-to-b from-slate-50 to-white border-b border-slate-200">
        <div className="container mx-auto px-6 py-16 max-w-4xl">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-semibold text-slate-900 mb-4">
              Acceptable Use Policy
            </h1>
            <p className="text-lg text-slate-600">
              Last Updated: November 5, 2025
            </p>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-6 py-12 max-w-4xl">
        <div className="prose prose-slate max-w-none">
          {/* Introduction */}
          <div className="mb-12">
            <p className="text-lg text-slate-700 leading-relaxed">
              This Acceptable Use Policy ("AUP") describes rules that apply to any party ("you", "your", "yours", or "Customer") using any products and services provided by ConnieML, Inc. or any of its affiliates ("Services") and any user of the Services, including via any products and services provided by Customer ("End User"). ConnieML, Inc. together with its affiliates will be referred to as "Connie" in this AUP.
            </p>
            <p className="text-lg text-slate-700 leading-relaxed mt-4">
              The prohibited conduct in this AUP is not exhaustive. Customer is responsible for its End Users' compliance with this AUP and making its End Users aware of this AUP. If Customer or any End User violates this AUP, Connie may suspend Customer's use of the Services.
            </p>
            <p className="text-lg text-slate-700 leading-relaxed mt-4">
              This AUP may be updated by Connie from time to time upon reasonable notice, which may be provided via Customer's account, email, or by posting an updated version of this AUP at{' '}
              <Link href="/acceptable-use-policy" className="text-indigo-600 hover:text-indigo-800 underline">
                connie.one/acceptable-use-policy
              </Link>.
            </p>
          </div>

          {/* Prohibited Activities */}
          <section className="mb-12">
            <h2 className="text-3xl font-semibold text-slate-900 mb-6 pb-3 border-b border-slate-200">
              Prohibited Activities
            </h2>
            <p className="text-lg text-slate-700 leading-relaxed mb-6">
              Do not use the Services to engage in or encourage any activity that is illegal, deceptive, harmful, a violation of others' rights, or harmful to Connie's business operations or reputation, including:
            </p>

            {/* Violations of Laws */}
            <div className="mb-8">
              <h3 className="text-2xl font-semibold text-slate-900 mb-4">
                Violations of Laws or Standards
              </h3>
              <p className="text-slate-700 leading-relaxed">
                Violating laws, regulations, governmental orders, industry standards, or telecommunications providers' requirements or guidance in any applicable jurisdiction, including any of the foregoing that require:
              </p>
              <ul className="list-disc pl-6 mt-3 space-y-2 text-slate-700">
                <li>Consent be obtained prior to transmitting, recording, collecting, or monitoring data or communications</li>
                <li>Compliance with opt-out requests for any data or communications</li>
              </ul>
            </div>

            {/* Interference */}
            <div className="mb-8">
              <h3 className="text-2xl font-semibold text-slate-900 mb-4">
                Interference with the Services
              </h3>
              <p className="text-slate-700 leading-relaxed">
                Interfering with or otherwise negatively impacting any aspect of the Services or any third-party networks that are linked to the Services.
              </p>
            </div>

            {/* Reverse Engineering */}
            <div className="mb-8">
              <h3 className="text-2xl font-semibold text-slate-900 mb-4">
                Reverse Engineering
              </h3>
              <p className="text-slate-700 leading-relaxed">
                Reverse engineering, copying, disassembling, or decompiling the Services.
              </p>
            </div>

            {/* Falsification */}
            <div className="mb-8">
              <h3 className="text-2xl font-semibold text-slate-900 mb-4">
                Falsification of Identity or Origin
              </h3>
              <p className="text-slate-700 leading-relaxed">
                Creating a false identity or any attempt to mislead others as to the identity of the sender or the origin of any data or communications.
              </p>
            </div>
          </section>

          {/* Service Integrity */}
          <section className="mb-12">
            <h2 className="text-3xl font-semibold text-slate-900 mb-6 pb-3 border-b border-slate-200">
              No Service Integrity Violations
            </h2>
            <p className="text-lg text-slate-700 leading-relaxed mb-6">
              Do not violate the integrity of the Services, including:
            </p>

            {/* Bypassing */}
            <div className="mb-8">
              <h3 className="text-2xl font-semibold text-slate-900 mb-4">
                Bypassing Service Limitations
              </h3>
              <p className="text-slate-700 leading-relaxed">
                Attempting to bypass, exploit, defeat, or disable limitations or restrictions placed on the Services.
              </p>
            </div>

            {/* Security Vulnerabilities */}
            <div className="mb-8">
              <h3 className="text-2xl font-semibold text-slate-900 mb-4">
                Security Vulnerabilities
              </h3>
              <p className="text-slate-700 leading-relaxed">
                Finding security vulnerabilities to exploit the Services or attempting to bypass any security mechanism or filtering capabilities.
              </p>
            </div>

            {/* DoS */}
            <div className="mb-8">
              <h3 className="text-2xl font-semibold text-slate-900 mb-4">
                Disabling the Services
              </h3>
              <p className="text-slate-700 leading-relaxed">
                Any denial of service (DoS) attack on the Services or any other conduct that attempts to disrupt, disable, or overload the Services.
              </p>
            </div>

            {/* Harmful Code */}
            <div className="mb-8">
              <h3 className="text-2xl font-semibold text-slate-900 mb-4">
                Harmful Code or Bots
              </h3>
              <p className="text-slate-700 leading-relaxed">
                Transmitting code, files, scripts, agents, or programs intended to do harm, including viruses or malware, or using automated means, such as bots, to gain access to or use the Services.
              </p>
            </div>

            {/* Unauthorized Access */}
            <div className="mb-8">
              <h3 className="text-2xl font-semibold text-slate-900 mb-4">
                Unauthorized Access
              </h3>
              <p className="text-slate-700 leading-relaxed">
                Attempting to gain unauthorized access to the Services.
              </p>
            </div>
          </section>

          {/* Data Safeguards */}
          <section className="mb-12">
            <h2 className="text-3xl font-semibold text-slate-900 mb-6 pb-3 border-b border-slate-200">
              Data Safeguards
            </h2>
            <p className="text-slate-700 leading-relaxed">
              Customer is responsible for determining whether the Services offer appropriate safeguards for Customer's use of the Services, including, but not limited to, any safeguards required by applicable law or regulation, prior to transmitting or processing, or prior to permitting End Users to transmit or process, any data or communications via the Services.
            </p>
          </section>

          {/* Nonprofit Considerations */}
          <section className="mb-12 bg-indigo-50 border-l-4 border-indigo-600 p-6 rounded-r-lg">
            <h2 className="text-3xl font-semibold text-slate-900 mb-6">
              Special Considerations for Nonprofit Organizations
            </h2>
            <p className="text-slate-700 leading-relaxed mb-4">
              Given Connie's focus on serving nonprofit and community-based organizations, additional care must be taken to:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-slate-700">
              <li>Ensure all communications comply with nonprofit regulations and ethical standards</li>
              <li>Protect vulnerable populations who may be service recipients</li>
              <li>Maintain confidentiality of sensitive beneficiary information</li>
              <li>Comply with HIPAA, FERPA, or other regulations as applicable</li>
            </ul>
          </section>

          {/* Service Specific */}
          <section className="mb-12">
            <h2 className="text-3xl font-semibold text-slate-900 mb-6 pb-3 border-b border-slate-200">
              Service and Country Specific Requirements
            </h2>
            <p className="text-slate-700 leading-relaxed">
              Additional requirements for specific Services, including any country specific requirements and products and services that are purchased from Connie, but provided, or otherwise made available, by a third party, apply solely to the extent Customer uses those specific Services or third-party products and services.
            </p>
          </section>

          {/* Reporting */}
          <section className="mb-12">
            <h2 className="text-3xl font-semibold text-slate-900 mb-6 pb-3 border-b border-slate-200">
              Reporting Violations
            </h2>
            <p className="text-slate-700 leading-relaxed">
              Violations of this AUP, including any prohibited content or communications, may be reported to{' '}
              <a href="mailto:abuse@connie.one" className="text-indigo-600 hover:text-indigo-800 underline font-medium">
                abuse@connie.one
              </a>. Customer agrees to immediately report any violation of this AUP to Connie and provide cooperation, as requested by Connie, to investigate and/or remedy that violation.
            </p>
          </section>

          {/* Contact Info */}
          <section className="bg-slate-50 border border-slate-200 rounded-xl p-8 mt-12">
            <h2 className="text-2xl font-semibold text-slate-900 mb-6">
              Contact Information
            </h2>
            <div className="text-slate-700">
              <p className="font-medium text-slate-900 mb-3">Connie</p>
              <p className="leading-relaxed">
                By Nevada Senior Services, Inc<br />
                901 North Jones Boulevard<br />
                Las Vegas, NV 89108
              </p>
              <div className="pt-4 mt-4 border-t border-slate-200 space-y-2">
                <p>
                  <span className="font-medium">Abuse Reporting:</span>{' '}
                  <a href="mailto:abuse@connie.one" className="text-indigo-600 hover:text-indigo-800 underline">
                    abuse@connie.one
                  </a>
                </p>
                <p>
                  <span className="font-medium">General Inquiries:</span>{' '}
                  <a href="mailto:legal@connie.one" className="text-indigo-600 hover:text-indigo-800 underline">
                    legal@connie.one
                  </a>
                </p>
              </div>
            </div>
          </section>
        </div>

        {/* Back Link */}
        <div className="mt-12 pt-8 border-t border-slate-200">
          <Link
            href="/"
            className="inline-flex items-center text-slate-600 hover:text-slate-900 transition-colors font-medium"
          >
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  )
}
