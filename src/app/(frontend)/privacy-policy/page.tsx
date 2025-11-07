import React from 'react'
import Link from 'next/link'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Privacy Policy | Connie',
  description: 'Connie Website Privacy Notice - How we collect, use, and protect your personal information.',
}

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <div className="bg-gradient-to-b from-slate-50 to-white border-b border-slate-200">
        <div className="container mx-auto px-6 py-16 max-w-4xl">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-semibold text-slate-900 mb-4">
              Website Privacy Notice
            </h1>
            <div className="space-y-1 text-lg text-slate-600">
              <p>Effective Date: November 5, 2025</p>
              <p>Last Updated: November 5, 2025</p>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-6 py-12 max-w-4xl">
        <div className="prose prose-slate max-w-none">

          {/* Introduction */}
          <section className="mb-12">
            <h2 className="text-3xl font-semibold text-slate-900 mb-6 pb-3 border-b border-slate-200">
              1. Introduction and Scope
            </h2>
            <p className="text-lg text-slate-700 leading-relaxed mb-4">
              This Website Privacy Notice ("Privacy Notice") describes how ConnieML, Inc. ("Connie," "we," "us," or "our") collects, uses, shares, and protects personal information when you visit our websites, including docs.connie.one, connie.plus, and connie.center (collectively, the "Sites"), and when you use our communication platform services designed specifically for community-based organizations (CBOs) and nonprofit entities.
            </p>

            <div className="mb-6">
              <h3 className="text-xl font-semibold text-slate-900 mb-3">This Privacy Notice applies to personal information we collect through:</h3>
              <ul className="list-disc pl-6 space-y-2 text-slate-700">
                <li>Our websites and documentation platforms</li>
                <li>Our Connie communication platform services</li>
                <li>Email communications, newsletters, and marketing materials</li>
                <li>Customer support interactions</li>
                <li>Events, webinars, and training sessions</li>
              </ul>
            </div>

            <div className="mb-6">
              <h3 className="text-xl font-semibold text-slate-900 mb-3">This Privacy Notice does not apply to:</h3>
              <ul className="list-disc pl-6 space-y-2 text-slate-700">
                <li>Information collected by third-party websites or services</li>
                <li>Personal data processed by our customers through the Connie platform</li>
                <li>Information collected by our business partners or service providers operating under their own privacy policies</li>
              </ul>
            </div>

            <p className="text-lg text-slate-700 leading-relaxed">
              By using our Sites or services, you acknowledge that you have read and understood this Privacy Notice.
            </p>
          </section>

          {/* Table of Contents */}
          <section className="mb-12 bg-slate-50 border border-slate-200 rounded-xl p-8">
            <h2 className="text-2xl font-semibold text-slate-900 mb-6">Quick Navigation</h2>
            <nav className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <a href="#information-we-collect" className="text-indigo-600 hover:text-indigo-800 underline">2. Information We Collect</a>
              <a href="#how-we-use" className="text-indigo-600 hover:text-indigo-800 underline">3. How We Use Information</a>
              <a href="#how-we-share" className="text-indigo-600 hover:text-indigo-800 underline">4. How We Share Information</a>
              <a href="#data-retention" className="text-indigo-600 hover:text-indigo-800 underline">5. Data Retention Policies</a>
              <a href="#your-rights" className="text-indigo-600 hover:text-indigo-800 underline">6. Your Rights and Choices</a>
              <a href="#security" className="text-indigo-600 hover:text-indigo-800 underline">7. Security Measures</a>
              <a href="#international" className="text-indigo-600 hover:text-indigo-800 underline">8. International Data Transfers</a>
              <a href="#children" className="text-indigo-600 hover:text-indigo-800 underline">9. Children's Privacy</a>
              <a href="#third-party" className="text-indigo-600 hover:text-indigo-800 underline">10. Third-Party Services</a>
              <a href="#cookies" className="text-indigo-600 hover:text-indigo-800 underline">11. Cookies and Tracking</a>
              <a href="#marketing" className="text-indigo-600 hover:text-indigo-800 underline">12. Marketing Communications</a>
              <a href="#changes" className="text-indigo-600 hover:text-indigo-800 underline">13. Changes to This Notice</a>
              <a href="#contact" className="text-indigo-600 hover:text-indigo-800 underline">14. Contact Information</a>
            </nav>
          </section>

          {/* 2. Information We Collect */}
          <section id="information-we-collect" className="mb-12 scroll-mt-8">
            <h2 className="text-3xl font-semibold text-slate-900 mb-6 pb-3 border-b border-slate-200">
              2. Information We Collect
            </h2>

            <div className="space-y-8">
              <div>
                <h3 className="text-2xl font-semibold text-slate-900 mb-4">2.1 Information You Provide to Us</h3>

                <div className="mb-6">
                  <h4 className="text-xl font-semibold text-slate-900 mb-3">Account and Registration Information:</h4>
                  <ul className="list-disc pl-6 space-y-2 text-slate-700">
                    <li>Name, email address, phone number, and organization details</li>
                    <li>Job title, role within organization, and contact preferences</li>
                    <li>Username, password, and security questions</li>
                    <li>Payment and billing information (processed by third-party payment processors)</li>
                  </ul>
                </div>

                <div className="mb-6">
                  <h4 className="text-xl font-semibold text-slate-900 mb-3">Communications and Support:</h4>
                  <ul className="list-disc pl-6 space-y-2 text-slate-700">
                    <li>Information you provide when contacting us for support or inquiries</li>
                    <li>Content of messages, chat transcripts, and support tickets</li>
                    <li>Feedback, survey responses, and testimonials</li>
                    <li>Information provided during webinars, training sessions, or events</li>
                  </ul>
                </div>

                <div>
                  <h4 className="text-xl font-semibold text-slate-900 mb-3">Service Usage Information:</h4>
                  <ul className="list-disc pl-6 space-y-2 text-slate-700">
                    <li>Configuration settings for voice, fax, email, and web chat channels</li>
                    <li>Call forwarding numbers and voicemail preferences</li>
                    <li>User roles, permissions, and access controls</li>
                    <li>Content uploaded to our platform (documents, recordings, transcripts)</li>
                  </ul>
                </div>
              </div>

              <div>
                <h3 className="text-2xl font-semibold text-slate-900 mb-4">2.2 Information We Collect Automatically</h3>

                <div className="mb-6">
                  <h4 className="text-xl font-semibold text-slate-900 mb-3">Technical Information:</h4>
                  <ul className="list-disc pl-6 space-y-2 text-slate-700">
                    <li>IP address, browser type, operating system, and device information</li>
                    <li>Pages visited, time spent on pages, and navigation patterns</li>
                    <li>Referral sources and search terms used to find our Sites</li>
                    <li>Cookies, web beacons, and similar tracking technologies</li>
                  </ul>
                </div>

                <div>
                  <h4 className="text-xl font-semibold text-slate-900 mb-3">Service Performance Data:</h4>
                  <ul className="list-disc pl-6 space-y-2 text-slate-700">
                    <li>Call quality metrics, connection data, and system performance</li>
                    <li>Error logs, diagnostic information, and usage analytics</li>
                    <li>Feature utilization and platform engagement metrics</li>
                  </ul>
                </div>
              </div>

              <div>
                <h3 className="text-2xl font-semibold text-slate-900 mb-4">2.3 Information from Third Parties</h3>

                <div className="mb-6">
                  <h4 className="text-xl font-semibold text-slate-900 mb-3">Service Providers and Partners:</h4>
                  <ul className="list-disc pl-6 space-y-2 text-slate-700">
                    <li>Information from payment processors, telecommunications carriers, and service providers</li>
                    <li>Data from CRM systems, email marketing platforms, and analytics providers</li>
                    <li>Information from social media platforms when you interact with our content</li>
                  </ul>
                </div>

                <div>
                  <h4 className="text-xl font-semibold text-slate-900 mb-3">Public Sources:</h4>
                  <ul className="list-disc pl-6 space-y-2 text-slate-700">
                    <li>Publicly available information about organizations and contacts</li>
                    <li>Industry databases and professional networks</li>
                    <li>Government databases for nonprofit verification</li>
                  </ul>
                </div>
              </div>
            </div>
          </section>

          {/* 3. How We Use Information */}
          <section id="how-we-use" className="mb-12 scroll-mt-8">
            <h2 className="text-3xl font-semibold text-slate-900 mb-6 pb-3 border-b border-slate-200">
              3. How We Use Information
            </h2>
            <p className="text-lg text-slate-700 leading-relaxed mb-6">
              We use personal information for the following purposes:
            </p>

            <div className="space-y-8">
              <div>
                <h3 className="text-2xl font-semibold text-slate-900 mb-4">3.1 Service Delivery and Support</h3>
                <ul className="list-disc pl-6 space-y-2 text-slate-700">
                  <li>Providing, maintaining, and improving our communication platform services</li>
                  <li>Processing registrations, managing accounts, and billing</li>
                  <li>Delivering customer support and technical assistance</li>
                  <li>Configuring voice, fax, email, and web chat channels</li>
                  <li>Facilitating communication routing and call forwarding</li>
                </ul>
              </div>

              <div>
                <h3 className="text-2xl font-semibold text-slate-900 mb-4">3.2 Communication and Marketing</h3>
                <ul className="list-disc pl-6 space-y-2 text-slate-700">
                  <li>Sending service-related notifications and updates</li>
                  <li>Providing product information, newsletters, and educational content</li>
                  <li>Conducting webinars, training sessions, and support events</li>
                  <li>Responding to inquiries and support requests</li>
                  <li>Personalizing marketing communications based on interests and usage</li>
                </ul>
              </div>

              <div>
                <h3 className="text-2xl font-semibold text-slate-900 mb-4">3.3 Platform Improvement and Analytics</h3>
                <ul className="list-disc pl-6 space-y-2 text-slate-700">
                  <li>Analyzing usage patterns to improve our services</li>
                  <li>Conducting research and development for new features</li>
                  <li>Monitoring system performance and security</li>
                  <li>Generating aggregated, anonymized analytics and reports</li>
                </ul>
              </div>

              <div>
                <h3 className="text-2xl font-semibold text-slate-900 mb-4">3.4 Legal and Compliance</h3>
                <ul className="list-disc pl-6 space-y-2 text-slate-700">
                  <li>Complying with legal obligations and regulatory requirements</li>
                  <li>Protecting our rights, property, and safety, and that of our users</li>
                  <li>Detecting, preventing, and addressing fraud or security issues</li>
                  <li>Enforcing our Terms of Service and other agreements</li>
                </ul>
              </div>
            </div>
          </section>

          {/* 4. How We Share Information */}
          <section id="how-we-share" className="mb-12 scroll-mt-8">
            <h2 className="text-3xl font-semibold text-slate-900 mb-6 pb-3 border-b border-slate-200">
              4. How We Share Information
            </h2>

            <div className="space-y-8">
              <div>
                <h3 className="text-2xl font-semibold text-slate-900 mb-4">4.1 Service Providers and Partners</h3>
                <p className="text-slate-700 leading-relaxed mb-4">
                  We share personal information with trusted third parties who provide services on our behalf:
                </p>

                <div className="mb-6">
                  <h4 className="text-xl font-semibold text-slate-900 mb-3">Technology Partners:</h4>
                  <ul className="list-disc pl-6 space-y-2 text-slate-700">
                    <li>Twilio (voice and messaging services)</li>
                    <li>Mailgun and SendGrid (email delivery)</li>
                    <li>Adobe Acrobat Sign (document processing)</li>
                    <li>Cloud hosting and infrastructure providers</li>
                  </ul>
                </div>

                <div>
                  <h4 className="text-xl font-semibold text-slate-900 mb-3">Business Service Providers:</h4>
                  <ul className="list-disc pl-6 space-y-2 text-slate-700">
                    <li>Payment processors and billing services</li>
                    <li>Customer support platforms</li>
                    <li>Analytics and marketing automation tools</li>
                    <li>Legal, accounting, and professional service providers</li>
                  </ul>
                </div>
              </div>

              <div>
                <h3 className="text-2xl font-semibold text-slate-900 mb-4">4.2 Legal Requirements and Protection</h3>
                <p className="text-slate-700 leading-relaxed mb-3">
                  We may disclose personal information when required by law or to protect our rights:
                </p>
                <ul className="list-disc pl-6 space-y-2 text-slate-700">
                  <li>In response to valid legal process (subpoenas, court orders, warrants)</li>
                  <li>To comply with applicable laws and regulations</li>
                  <li>To protect the rights, property, or safety of Connie, our users, or others</li>
                  <li>In connection with investigations of fraud, security breaches, or illegal activities</li>
                </ul>
              </div>

              <div>
                <h3 className="text-2xl font-semibold text-slate-900 mb-4">4.3 Business Transfers</h3>
                <p className="text-slate-700 leading-relaxed">
                  In the event of a merger, acquisition, sale, or other business transaction, personal information may be transferred as part of the transaction, subject to appropriate confidentiality and notice requirements.
                </p>
              </div>

              <div>
                <h3 className="text-2xl font-semibold text-slate-900 mb-4">4.4 Aggregated and Anonymized Data</h3>
                <p className="text-slate-700 leading-relaxed">
                  We may share aggregated, anonymized, or de-identified information that cannot reasonably be used to identify individuals for research, analytics, or marketing purposes.
                </p>
              </div>
            </div>
          </section>

          {/* 5. Data Retention */}
          <section id="data-retention" className="mb-12 scroll-mt-8">
            <h2 className="text-3xl font-semibold text-slate-900 mb-6 pb-3 border-b border-slate-200">
              5. Data Retention Policies
            </h2>
            <p className="text-slate-700 leading-relaxed mb-6">
              We retain personal information for as long as necessary to fulfill the purposes outlined in this Privacy Notice, unless a longer retention period is required by law.
            </p>

            <div className="space-y-4 text-slate-700">
              <p><strong className="text-slate-900">Account Information:</strong> Retained while your account is active and for a reasonable period after account closure</p>
              <p><strong className="text-slate-900">Service Usage Data:</strong> Retained for analytics and service improvement purposes</p>
              <p><strong className="text-slate-900">Support Communications:</strong> Retained to maintain support history and quality</p>
              <p><strong className="text-slate-900">Marketing Data:</strong> Retained until you opt out or for a reasonable period of inactivity</p>
              <p><strong className="text-slate-900">Legal and Compliance Data:</strong> Retained as required by applicable laws and regulations</p>
            </div>

            <p className="text-slate-700 leading-relaxed mt-6">
              You may request deletion of your personal information, subject to legal and operational requirements.
            </p>
          </section>

          {/* 6. Your Rights */}
          <section id="your-rights" className="mb-12 scroll-mt-8">
            <h2 className="text-3xl font-semibold text-slate-900 mb-6 pb-3 border-b border-slate-200">
              6. Your Rights and Choices
            </h2>

            <div className="space-y-8">
              <div>
                <h3 className="text-2xl font-semibold text-slate-900 mb-4">6.1 Access and Control</h3>
                <p className="text-slate-700 leading-relaxed mb-3">You have the right to:</p>
                <ul className="list-disc pl-6 space-y-2 text-slate-700">
                  <li>Access, review, and update your personal information</li>
                  <li>Download or export your data in a portable format</li>
                  <li>Delete or deactivate your account</li>
                  <li>Object to certain processing activities</li>
                  <li>Restrict how we use your information</li>
                </ul>
              </div>

              <div className="bg-indigo-50 border-l-4 border-indigo-600 p-6 rounded-r-lg">
                <h3 className="text-2xl font-semibold text-slate-900 mb-4">6.2 GDPR Rights (EU Residents)</h3>
                <p className="text-slate-700 leading-relaxed mb-3">
                  If you are located in the European Union, you have additional rights under the General Data Protection Regulation:
                </p>
                <ul className="list-disc pl-6 space-y-2 text-slate-700">
                  <li>Right of access to your personal data</li>
                  <li>Right to rectification of inaccurate data</li>
                  <li>Right to erasure ("right to be forgotten")</li>
                  <li>Right to restrict processing</li>
                  <li>Right to data portability</li>
                  <li>Right to object to processing</li>
                  <li>Right to withdraw consent</li>
                  <li>Right to lodge a complaint with supervisory authorities</li>
                </ul>
              </div>

              <div className="bg-amber-50 border-l-4 border-amber-600 p-6 rounded-r-lg">
                <h3 className="text-2xl font-semibold text-slate-900 mb-4">6.3 CCPA Rights (California Residents)</h3>
                <p className="text-slate-700 leading-relaxed mb-3">
                  If you are a California resident, you have rights under the California Consumer Privacy Act:
                </p>
                <ul className="list-disc pl-6 space-y-2 text-slate-700">
                  <li>Right to know what personal information is collected and how it's used</li>
                  <li>Right to delete personal information</li>
                  <li>Right to opt out of the sale of personal information</li>
                  <li>Right to non-discrimination for exercising these rights</li>
                </ul>
              </div>

              <div>
                <h3 className="text-2xl font-semibold text-slate-900 mb-4">6.4 Communication Preferences</h3>
                <p className="text-slate-700 leading-relaxed mb-3">You can manage your communication preferences by:</p>
                <ul className="list-disc pl-6 space-y-2 text-slate-700">
                  <li>Updating your account settings</li>
                  <li>Using unsubscribe links in emails</li>
                  <li>Contacting us directly at <a href="mailto:privacy@connie.one" className="text-indigo-600 hover:text-indigo-800 underline">privacy@connie.one</a></li>
                  <li>Managing cookie preferences through browser settings</li>
                </ul>
              </div>
            </div>
          </section>

          {/* 7. Security */}
          <section id="security" className="mb-12 scroll-mt-8">
            <h2 className="text-3xl font-semibold text-slate-900 mb-6 pb-3 border-b border-slate-200">
              7. Security Measures
            </h2>
            <p className="text-slate-700 leading-relaxed mb-6">
              We implement comprehensive security measures to protect your personal information:
            </p>

            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-semibold text-slate-900 mb-3">Technical Safeguards:</h3>
                <ul className="list-disc pl-6 space-y-2 text-slate-700">
                  <li>Encryption of data in transit and at rest</li>
                  <li>Secure authentication and access controls</li>
                  <li>Regular security assessments and penetration testing</li>
                  <li>Network monitoring and intrusion detection systems</li>
                </ul>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-slate-900 mb-3">Administrative Safeguards:</h3>
                <ul className="list-disc pl-6 space-y-2 text-slate-700">
                  <li>Employee training on privacy and security practices</li>
                  <li>Strict access controls based on job responsibilities</li>
                  <li>Regular review and update of security policies</li>
                  <li>Incident response and breach notification procedures</li>
                </ul>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-slate-900 mb-3">Physical Safeguards:</h3>
                <ul className="list-disc pl-6 space-y-2 text-slate-700">
                  <li>Secured data centers with restricted access</li>
                  <li>Environmental controls and monitoring systems</li>
                  <li>Secure disposal of hardware and storage media</li>
                </ul>
              </div>

              <p className="text-slate-700 leading-relaxed italic mt-6">
                While we strive to protect your information, no security system is completely impenetrable. We continuously monitor and improve our security practices.
              </p>
            </div>
          </section>

          {/* 8. International Transfers */}
          <section id="international" className="mb-12 scroll-mt-8">
            <h2 className="text-3xl font-semibold text-slate-900 mb-6 pb-3 border-b border-slate-200">
              8. International Data Transfers
            </h2>
            <p className="text-slate-700 leading-relaxed mb-6">
              Connie operates globally and may transfer personal information to countries other than your country of residence. When we transfer personal information internationally, we implement appropriate safeguards to protect your data:
            </p>

            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-semibold text-slate-900 mb-3">Transfer Mechanisms:</h3>
                <ul className="list-disc pl-6 space-y-2 text-slate-700">
                  <li>Standard Contractual Clauses (SCCs)</li>
                  <li>Adequacy decisions by regulatory authorities</li>
                  <li>Binding Corporate Rules (where applicable)</li>
                  <li>Consent for specific transfers</li>
                </ul>
              </div>

              <p className="text-slate-700 leading-relaxed">
                <strong className="text-slate-900">Data Processing Locations:</strong> Our primary data processing occurs in the United States, with additional processing as necessary to provide our services.
              </p>
            </div>
          </section>

          {/* 9. Children's Privacy */}
          <section id="children" className="mb-12 scroll-mt-8">
            <h2 className="text-3xl font-semibold text-slate-900 mb-6 pb-3 border-b border-slate-200">
              9. Children's Privacy
            </h2>
            <p className="text-slate-700 leading-relaxed mb-4">
              Our services are designed for organizations and are not intended for use by individuals under the age of 16. We do not knowingly collect personal information from children under 16 without verifiable parental consent.
            </p>
            <p className="text-slate-700 leading-relaxed mb-4">
              If we become aware that we have collected personal information from a child under 16 without appropriate consent, we will take steps to delete such information promptly.
            </p>
            <p className="text-slate-700 leading-relaxed">
              Organizations using our platform are responsible for ensuring compliance with applicable children's privacy laws for any communications involving minors.
            </p>
          </section>

          {/* 10. Third-Party Services */}
          <section id="third-party" className="mb-12 scroll-mt-8">
            <h2 className="text-3xl font-semibold text-slate-900 mb-6 pb-3 border-b border-slate-200">
              10. Third-Party Services
            </h2>
            <p className="text-slate-700 leading-relaxed mb-6">
              Our Sites and services may contain links to third-party websites, applications, or services that are not owned or controlled by Connie. This Privacy Notice does not apply to these third-party services.
            </p>

            <div className="mb-6">
              <h3 className="text-xl font-semibold text-slate-900 mb-3">Key Third-Party Integrations:</h3>
              <ul className="list-disc pl-6 space-y-2 text-slate-700">
                <li>Telecommunications providers (Twilio, carrier partners)</li>
                <li>Email service providers (Mailgun, SendGrid, SMTP2GO)</li>
                <li>Document services (Adobe Acrobat Sign)</li>
                <li>Analytics providers (Google Analytics)</li>
                <li>Social media platforms</li>
              </ul>
            </div>

            <p className="text-slate-700 leading-relaxed">
              We encourage you to review the privacy policies of any third-party services you access through our platform.
            </p>
          </section>

          {/* 11. Cookies */}
          <section id="cookies" className="mb-12 scroll-mt-8">
            <h2 className="text-3xl font-semibold text-slate-900 mb-6 pb-3 border-b border-slate-200">
              11. Cookies and Tracking Technologies
            </h2>
            <p className="text-slate-700 leading-relaxed mb-6">
              We use cookies and similar tracking technologies to enhance your experience and analyze usage patterns.
            </p>

            <div className="space-y-6">
              <div>
                <h3 className="text-2xl font-semibold text-slate-900 mb-4">11.1 Types of Cookies We Use</h3>
                <ul className="list-disc pl-6 space-y-2 text-slate-700">
                  <li><strong>Essential Cookies:</strong> Required for basic site functionality and security</li>
                  <li><strong>Functional Cookies:</strong> Enable enhanced features and personalization</li>
                  <li><strong>Analytics Cookies:</strong> Help us understand site usage and performance</li>
                  <li><strong>Marketing Cookies:</strong> Support targeted advertising and marketing campaigns</li>
                </ul>
              </div>

              <div>
                <h3 className="text-2xl font-semibold text-slate-900 mb-4">11.2 Cookie Management</h3>
                <p className="text-slate-700 leading-relaxed mb-3">You can control cookies through your browser settings:</p>
                <ul className="list-disc pl-6 space-y-2 text-slate-700">
                  <li>Block all cookies (may affect site functionality)</li>
                  <li>Accept only first-party cookies</li>
                  <li>Delete existing cookies</li>
                  <li>Receive notifications when cookies are set</li>
                </ul>
              </div>
            </div>
          </section>

          {/* 12. Marketing */}
          <section id="marketing" className="mb-12 scroll-mt-8">
            <h2 className="text-3xl font-semibold text-slate-900 mb-6 pb-3 border-b border-slate-200">
              12. Marketing Communications
            </h2>

            <div className="space-y-6">
              <div>
                <h3 className="text-2xl font-semibold text-slate-900 mb-4">12.1 Types of Communications</h3>
                <p className="text-slate-700 leading-relaxed mb-3">We may send you marketing communications about:</p>
                <ul className="list-disc pl-6 space-y-2 text-slate-700">
                  <li>Product updates and new features</li>
                  <li>Educational content and best practices</li>
                  <li>Webinars, events, and training opportunities</li>
                  <li>Industry news and insights</li>
                  <li>Special offers and promotions</li>
                </ul>
              </div>

              <div>
                <h3 className="text-2xl font-semibold text-slate-900 mb-4">12.2 Opt-Out Options</h3>
                <p className="text-slate-700 leading-relaxed mb-3">You can opt out of marketing communications by:</p>
                <ul className="list-disc pl-6 space-y-2 text-slate-700">
                  <li>Clicking unsubscribe links in emails</li>
                  <li>Updating your account communication preferences</li>
                  <li>Contacting us at <a href="mailto:privacy@connie.one" className="text-indigo-600 hover:text-indigo-800 underline">privacy@connie.one</a></li>
                </ul>
                <p className="text-slate-700 leading-relaxed italic mt-4">
                  Please note that even if you opt out of marketing communications, we may still send you service-related notifications and account updates.
                </p>
              </div>
            </div>
          </section>

          {/* 13. Changes */}
          <section id="changes" className="mb-12 scroll-mt-8">
            <h2 className="text-3xl font-semibold text-slate-900 mb-6 pb-3 border-b border-slate-200">
              13. Changes to This Privacy Notice
            </h2>
            <p className="text-slate-700 leading-relaxed mb-4">
              We may update this Privacy Notice from time to time to reflect changes in our practices, services, or legal requirements. We will notify you of material changes by:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-slate-700 mb-4">
              <li>Posting an updated notice on our website</li>
              <li>Sending email notifications to registered users</li>
              <li>Displaying prominent notices in our services</li>
              <li>Providing advance notice for significant changes</li>
            </ul>
            <p className="text-slate-700 leading-relaxed">
              Your continued use of our services after changes become effective constitutes acceptance of the updated Privacy Notice.
            </p>
          </section>

          {/* 14. Contact */}
          <section id="contact" className="mb-12 scroll-mt-8">
            <h2 className="text-3xl font-semibold text-slate-900 mb-6 pb-3 border-b border-slate-200">
              14. Contact Information
            </h2>

            <div className="space-y-8">
              <div>
                <h3 className="text-2xl font-semibold text-slate-900 mb-4">14.1 Privacy Officer</h3>
                <p className="text-slate-700 leading-relaxed mb-3">
                  If you have questions, concerns, or requests regarding this Privacy Notice or our privacy practices, please contact our Privacy Officer:
                </p>
                <div className="space-y-2 text-slate-700">
                  <p>
                    <strong>Email:</strong>{' '}
                    <a href="mailto:privacy@connie.one" className="text-indigo-600 hover:text-indigo-800 underline">
                      privacy@connie.one
                    </a>
                  </p>
                </div>
              </div>

              <div>
                <h3 className="text-2xl font-semibold text-slate-900 mb-4">14.2 Response Times</h3>
                <p className="text-slate-700 leading-relaxed mb-3">We strive to respond to privacy inquiries within:</p>
                <ul className="list-disc pl-6 space-y-2 text-slate-700">
                  <li>30 days for general inquiries</li>
                  <li>30 days for GDPR requests (may be extended to 90 days for complex requests)</li>
                  <li>45 days for CCPA requests (may be extended to 90 days with notice)</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Contact Info Box */}
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
                  <span className="font-medium">Privacy Inquiries:</span>{' '}
                  <a href="mailto:privacy@connie.one" className="text-indigo-600 hover:text-indigo-800 underline">
                    privacy@connie.one
                  </a>
                </p>
                <p>
                  <span className="font-medium">General Support:</span>{' '}
                  <a href="mailto:support@connie.one" className="text-indigo-600 hover:text-indigo-800 underline">
                    support@connie.one
                  </a>
                </p>
                <p>
                  <span className="font-medium">Website:</span>{' '}
                  <a href="https://connie.one" className="text-indigo-600 hover:text-indigo-800 underline">
                    connie.one
                  </a>
                </p>
              </div>
            </div>

            <div className="mt-6 pt-6 border-t border-slate-200 text-sm text-slate-600">
              <p className="font-medium text-slate-700 mb-2">Empowering Community-Based Organizations Through Secure Communication Technology</p>
              <p>Document Version: 1.0 | Classification: Public | Review Cycle: Annual</p>
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
