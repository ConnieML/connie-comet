import React from 'react'
import Link from 'next/link'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Terms of Service | Connie',
  description: 'Connie Terms of Service - Legal terms and conditions for using Connie services.',
}

export default function TermsOfServicePage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <div className="bg-gradient-to-b from-slate-50 to-white border-b border-slate-200">
        <div className="container mx-auto px-6 py-16 max-w-4xl">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-semibold text-slate-900 mb-4">
              Terms of Service
            </h1>
            <div className="space-y-1 text-lg text-slate-600">
              <p>Last Updated: November 5, 2025</p>
              <p>Effective Date: November 5, 2025</p>
            </div>
          </div>
        </div>
      </div>

      {/* Important Notice */}
      <div className="bg-amber-50 border-y border-amber-200">
        <div className="container mx-auto px-6 py-8 max-w-4xl">
          <div className="flex items-start gap-4">
            <div className="flex-shrink-0 text-3xl">⚠️</div>
            <div className="space-y-3">
              <h2 className="text-xl font-semibold text-amber-900">Important Notice</h2>
              <p className="text-amber-900 leading-relaxed">
                <strong>PLEASE REVIEW THESE CONNIE TERMS OF SERVICE CAREFULLY.</strong> ONCE ACCEPTED, THESE TERMS BECOME A BINDING LEGAL COMMITMENT BETWEEN YOU AND CONNIE.
              </p>
              <p className="text-amber-900 leading-relaxed">
                THE SERVICES ARE INTENDED FOR BUSINESS USE OR USE IN CONNECTION WITH AN INDIVIDUAL'S TRADE, CRAFT, OR PROFESSION ONLY.
              </p>
              <p className="text-amber-900 leading-relaxed">
                It is important that you review and understand these terms before using our services. If you do not agree to these terms, you should not agree to them, create an account, or use our services.
              </p>
              <p className="text-amber-900 leading-relaxed">
                Our services are generally intended for nonprofit and community-based organizations, businesses, or professional use only.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-6 py-12 max-w-4xl">
        <div className="prose prose-slate max-w-none">

          {/* Table of Contents */}
          <section className="mb-12 bg-slate-50 border border-slate-200 rounded-xl p-8">
            <h2 className="text-2xl font-semibold text-slate-900 mb-6">Table of Contents</h2>
            <nav className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <a href="#definitions" className="text-indigo-600 hover:text-indigo-800 underline">1. Definitions</a>
              <a href="#services" className="text-indigo-600 hover:text-indigo-800 underline">2. Services</a>
              <a href="#fees" className="text-indigo-600 hover:text-indigo-800 underline">3. Fees and Payment Terms</a>
              <a href="#ownership" className="text-indigo-600 hover:text-indigo-800 underline">4. Ownership, Customer Data, and Confidentiality</a>
              <a href="#warranties" className="text-indigo-600 hover:text-indigo-800 underline">5. Representations, Warranties, and Disclaimer</a>
              <a href="#indemnification" className="text-indigo-600 hover:text-indigo-800 underline">6. Mutual Indemnification</a>
              <a href="#liability" className="text-indigo-600 hover:text-indigo-800 underline">7. Limitation of Liability</a>
              <a href="#termination" className="text-indigo-600 hover:text-indigo-800 underline">8. Term, Termination, and Survival</a>
              <a href="#general" className="text-indigo-600 hover:text-indigo-800 underline">9. General</a>
              <a href="#additional" className="text-indigo-600 hover:text-indigo-800 underline">10. Additional Terms</a>
            </nav>
          </section>

          {/* 1. Definitions */}
          <section id="definitions" className="mb-12 scroll-mt-8">
            <h2 className="text-3xl font-semibold text-slate-900 mb-6 pb-3 border-b border-slate-200">
              1. Definitions
            </h2>
            <p className="text-slate-700 leading-relaxed mb-6">
              These are definitions for certain words that we will use repeatedly throughout these terms. When you see these capitalized words used as you read through these terms, they have the meanings provided in this Section 1.
            </p>

            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-semibold text-slate-900 mb-2">Affiliate</h3>
                <p className="text-slate-700 leading-relaxed">
                  Means any entity that directly or indirectly controls or is controlled by, or is under common control with, the party specified. For purposes of this definition, "control" means direct or indirect ownership of more than fifty percent (50%) of the voting interests of the subject entity.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-slate-900 mb-2">Connie Data</h3>
                <p className="text-slate-700 leading-relaxed">
                  Means any data that is (a) derived or generated from the use or provision of the Services that does not identify you, your End Users, or any natural person or is anonymized, de-identified, and/or aggregated such that it can no longer identify you, your End Users, or any natural person or (b) any Customer Data that is anonymized, de-identified, and/or aggregated by Connie in accordance with this Agreement.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-slate-900 mb-2">Customer Data</h3>
                <p className="text-slate-700 leading-relaxed">
                  Means any data (a) provided by you or your End Users to Connie in connection with your use of the Services or (b) generated for your use as part of the Services. Customer Data excludes any Connie Data.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-slate-900 mb-2">Customer Services</h3>
                <p className="text-slate-700 leading-relaxed">
                  Means any software application or other products and services provided by you and used in connection with your use of the Services under this Agreement. If applicable, Customer Services includes sources from which you choose to retrieve Customer Data and destinations to which you choose to transmit Customer Data using the Services.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-slate-900 mb-2">Documentation</h3>
                <p className="text-slate-700 leading-relaxed">
                  Means Connie's documentation, including any usage guides and policies, for the Services.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-slate-900 mb-2">End User</h3>
                <p className="text-slate-700 leading-relaxed">
                  Means any user of the Services, including via any Customer Services.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-slate-900 mb-2">Malicious Code</h3>
                <p className="text-slate-700 leading-relaxed">
                  Means code, files, scripts, agents, or programs intended to do harm, including, for example, viruses, worms, time bombs and Trojan horses.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-slate-900 mb-2">Order Form</h3>
                <p className="text-slate-700 leading-relaxed">
                  Means an ordering document between you and Connie, or any of their Affiliates, that specifies mutually agreed upon rates for certain Services and any commercial terms related thereto.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-slate-900 mb-2">Services</h3>
                <p className="text-slate-700 leading-relaxed">
                  Means the products and services provided by Connie or its Affiliates, as applicable, including all updates, modifications, or improvements thereto, that you purchase pursuant to an Order Form or otherwise use. Services excludes any Customer Services and Third Party Services.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-slate-900 mb-2">Third Party Services</h3>
                <p className="text-slate-700 leading-relaxed">
                  Means any products, services, or software components that are purchased by you from Connie, but provided, or otherwise made available, by a third party (i.e., a party other than Connie). Third Party Services are governed by a separate agreement between you and the third-party provider.
                </p>
              </div>
            </div>
          </section>

          {/* 2. Services */}
          <section id="services" className="mb-12 scroll-mt-8">
            <h2 className="text-3xl font-semibold text-slate-900 mb-6 pb-3 border-b border-slate-200">
              2. Services
            </h2>

            <div className="space-y-8">
              <div>
                <h3 className="text-2xl font-semibold text-slate-900 mb-4">2.1 Provision of the Services</h3>
                <p className="text-slate-700 leading-relaxed mb-3">Connie will:</p>
                <ul className="list-disc pl-6 space-y-2 text-slate-700">
                  <li>Provide the Services to you pursuant to this Agreement, the applicable Documentation, and any applicable Order Form(s)</li>
                  <li>Comply with applicable laws regarding Connie's provision of the Services to its customers generally</li>
                  <li>Use commercially reasonable efforts to scan, detect, and delete Malicious Code</li>
                  <li>Use trained, qualified personnel to provide the Services</li>
                  <li>Use commercially reasonable efforts to provide you with applicable support for the Services</li>
                </ul>
              </div>

              <div>
                <h3 className="text-2xl font-semibold text-slate-900 mb-4">2.2 Customer Responsibilities</h3>
                <p className="text-slate-700 leading-relaxed mb-3">You will:</p>
                <ul className="list-disc pl-6 space-y-2 text-slate-700">
                  <li>Be solely responsible for all use of the Services and Documentation under your account and the Customer Services</li>
                  <li>Not transfer, resell, lease, license, or otherwise make available the Services to third parties (except to make the Services available to your End Users) or offer them on a standalone basis</li>
                  <li>Use the Services only in accordance with this Agreement, the applicable Documentation, any applicable Order Form(s), and applicable law or regulation</li>
                  <li>Be solely responsible for all acts, omissions, and activities of your End Users, including their compliance with this Agreement</li>
                  <li>Use commercially reasonable efforts to prevent unauthorized access to or use of the Services and notify Connie promptly of any such unauthorized access or use</li>
                  <li>Provide reasonable cooperation regarding information requests from law enforcement, regulators, or telecommunications providers</li>
                  <li>Comply with your representations and warranties set forth in Section 5</li>
                </ul>
              </div>

              <div>
                <h3 className="text-2xl font-semibold text-slate-900 mb-4">2.3 Suspension of Services</h3>
                <p className="text-slate-700 leading-relaxed mb-3">
                  Connie may suspend the Services upon written notice to you if Connie, in good faith, determines:
                </p>
                <ul className="list-disc pl-6 space-y-2 text-slate-700">
                  <li>That you or your End Users materially breach the acceptable use policy</li>
                  <li>There is an unusual and material spike or increase in your use of the Services that threatens service stability</li>
                  <li>That its provision of the Services is prohibited by applicable law or regulation</li>
                  <li>There is any use of the Services that threatens security, integrity, or availability</li>
                  <li>That information in your account is untrue, inaccurate, or incomplete</li>
                </ul>
                <p className="text-slate-700 leading-relaxed mt-3">
                  You remain responsible for the fees during any suspension period.
                </p>
              </div>

              <div>
                <h3 className="text-2xl font-semibold text-slate-900 mb-4">2.4 Changes to the Services</h3>
                <p className="text-slate-700 leading-relaxed">
                  You acknowledge that the features and functions of the Services may change over time. Connie will not materially decrease the overall functionality of the Services. Connie will use commercially reasonable efforts to notify you at least sixty (60) days prior to implementation of any non-backwards compatible changes.
                </p>
              </div>
            </div>
          </section>

          {/* 3. Fees and Payment Terms */}
          <section id="fees" className="mb-12 scroll-mt-8">
            <h2 className="text-3xl font-semibold text-slate-900 mb-6 pb-3 border-b border-slate-200">
              3. Fees and Payment Terms
            </h2>

            <div className="space-y-8">
              <div>
                <h3 className="text-2xl font-semibold text-slate-900 mb-4">3.1 Fees</h3>
                <p className="text-slate-700 leading-relaxed">
                  You agree to pay the fees set forth in the applicable Order Form(s). If you use any Services not set forth in the applicable Order Form(s), you will be charged the applicable rates.
                </p>
              </div>

              <div>
                <h3 className="text-2xl font-semibold text-slate-900 mb-4">3.2 Taxes and Communications Surcharges</h3>

                <h4 className="text-xl font-semibold text-slate-900 mb-3 mt-4">3.2.1 Taxes</h4>
                <p className="text-slate-700 leading-relaxed">
                  All fees are exclusive of any applicable taxes, levies, duties, or other similar exactions imposed by a legal, governmental, or regulatory authority in any applicable jurisdiction. You will pay all taxes in connection with this Agreement, excluding any taxes based on Connie's net income, property, or employees.
                </p>

                <h4 className="text-xl font-semibold text-slate-900 mb-3 mt-4">3.2.2 Communications Charges</h4>
                <p className="text-slate-700 leading-relaxed">
                  If applicable, all fees are exclusive of any applicable communications service or telecommunication provider fees or surcharges. You will pay all Communications Surcharges in connection with your use of the Services.
                </p>

                <h4 className="text-xl font-semibold text-slate-900 mb-3 mt-4">3.2.3 Exemption</h4>
                <p className="text-slate-700 leading-relaxed">
                  If you are exempt from paying certain taxes or communications surcharges, you will provide the necessary exemption information as requested by Connie. You will be exempt on a going-forward basis once Connie has approved your exemption request.
                </p>
              </div>

              <div>
                <h3 className="text-2xl font-semibold text-slate-900 mb-4">3.3 Payment Terms</h3>
                <p className="text-slate-700 leading-relaxed mb-4">
                  Payment obligations are non-cancelable and fees are non-refundable. You will pay the fees due in accordance with the following applicable payment method:
                </p>

                <h4 className="text-xl font-semibold text-slate-900 mb-3 mt-4">3.3.1 Credit Card</h4>
                <p className="text-slate-700 leading-relaxed">
                  If you elect to add funds to your account by credit card, you are responsible for ensuring sufficient funds cover the fees. If your account does not have sufficient funds or your credit card declines, Connie may suspend the provision of the Services until the fees are paid in full.
                </p>

                <h4 className="text-xl font-semibold text-slate-900 mb-3 mt-4">3.3.2 Invoicing</h4>
                <p className="text-slate-700 leading-relaxed mb-3">If you elect to receive invoices and Connie approves, then:</p>
                <ul className="list-disc pl-6 space-y-2 text-slate-700">
                  <li>Invoices will be sent to you each month via email to the email address you designate</li>
                  <li>You will pay the fees due within thirty (30) days of the date of the invoice</li>
                </ul>
                <p className="text-slate-700 leading-relaxed mt-3">
                  Fees are payable in United States dollars unless otherwise specified. If you fail to pay on time, Connie may assess a late fee and suspend services.
                </p>

                <h4 className="text-xl font-semibold text-slate-900 mb-3 mt-4">3.3.3 Payment Disputes</h4>
                <p className="text-slate-700 leading-relaxed">
                  You will notify Connie in writing within sixty (60) days of any fee dispute. You must act reasonably and in good faith when disputing charges.
                </p>
              </div>
            </div>
          </section>

          {/* 4. Ownership */}
          <section id="ownership" className="mb-12 scroll-mt-8">
            <h2 className="text-3xl font-semibold text-slate-900 mb-6 pb-3 border-b border-slate-200">
              4. Ownership, Customer Data, and Confidentiality
            </h2>

            <div className="space-y-8">
              <div>
                <h3 className="text-2xl font-semibold text-slate-900 mb-4">4.1 Ownership Rights</h3>
                <p className="text-slate-700 leading-relaxed mb-3">As between the parties:</p>
                <ul className="list-disc pl-6 space-y-2 text-slate-700">
                  <li>Connie exclusively owns all rights in the Services, Documentation, Connie's Confidential Information, and Connie Data</li>
                  <li>You exclusively own all rights in Customer Services, your Confidential Information, and Customer Data (subject to Connie's rights to process Customer Data)</li>
                </ul>
              </div>

              <div>
                <h3 className="text-2xl font-semibold text-slate-900 mb-4">4.2 Customer Data</h3>
                <p className="text-slate-700 leading-relaxed">
                  You grant Connie and its Affiliates the right to process Customer Data as necessary to provide the Services in a manner consistent with this Agreement. You are responsible for the quality and integrity of Customer Data.
                </p>
              </div>

              <div>
                <h3 className="text-2xl font-semibold text-slate-900 mb-4">4.3 Confidentiality</h3>

                <h4 className="text-xl font-semibold text-slate-900 mb-3 mt-4">4.3.1 Definition</h4>
                <p className="text-slate-700 leading-relaxed">
                  "Confidential Information" means any information or data, regardless of form, disclosed by either party to the other party that is marked or otherwise designated as confidential or proprietary or that should otherwise be reasonably understood to be confidential given the nature of the information and circumstances surrounding disclosure.
                </p>

                <h4 className="text-xl font-semibold text-slate-900 mb-3 mt-4">4.3.2 Use and Disclosure</h4>
                <p className="text-slate-700 leading-relaxed mb-3">Except as otherwise authorized, Receiving Party will not:</p>
                <ul className="list-disc pl-6 space-y-2 text-slate-700">
                  <li>Use any Confidential Information of Disclosing Party for any purpose outside of exercising rights or fulfilling obligations under this Agreement</li>
                  <li>Disclose Confidential Information to any party except to Affiliates and representatives who have a "need to know"</li>
                </ul>

                <h4 className="text-xl font-semibold text-slate-900 mb-3 mt-4">4.3.3 Compelled Disclosure</h4>
                <p className="text-slate-700 leading-relaxed">
                  Receiving Party may disclose Confidential Information if required by law, regulation, subpoena, or court order, provided written notice is given to Disclosing Party to the extent legally permitted.
                </p>
              </div>

              <div>
                <h3 className="text-2xl font-semibold text-slate-900 mb-4">4.4 Use of Marks</h3>
                <p className="text-slate-700 leading-relaxed">
                  You grant Connie the right to use and display your name, logo, and description of your use case(s) on Connie's website, in earnings releases and calls, and in marketing and promotional materials, subject to your standard trademark usage guidelines.
                </p>
              </div>
            </div>
          </section>

          {/* 5. Warranties */}
          <section id="warranties" className="mb-12 scroll-mt-8">
            <h2 className="text-3xl font-semibold text-slate-900 mb-6 pb-3 border-b border-slate-200">
              5. Representations, Warranties, and Disclaimer
            </h2>

            <div className="space-y-8">
              <div>
                <h3 className="text-2xl font-semibold text-slate-900 mb-4">5.1 Power and Authority</h3>
                <p className="text-slate-700 leading-relaxed">
                  Each party represents and warrants that it has validly accepted or entered into this Agreement and has the legal power to do so.
                </p>
              </div>

              <div>
                <h3 className="text-2xl font-semibold text-slate-900 mb-4">5.2 Anti-Corruption and International Trade Laws</h3>
                <p className="text-slate-700 leading-relaxed">
                  Each party warrants compliance with all applicable anti-corruption, anti-money laundering, economic and trade sanctions, export controls, and other international trade laws and regulations in the jurisdictions that apply to the Services.
                </p>
              </div>

              <div>
                <h3 className="text-2xl font-semibold text-slate-900 mb-4">5.3 Consents and Permissions</h3>
                <p className="text-slate-700 leading-relaxed">
                  You represent and warrant that you have provided adequate notices and obtained necessary permissions and consents required to enable Connie to process all Customer Data.
                </p>
              </div>

              <div>
                <h3 className="text-2xl font-semibold text-slate-900 mb-4">5.4 Services</h3>
                <p className="text-slate-700 leading-relaxed">
                  Connie represents and warrants that the Services perform materially in accordance with the applicable Documentation. Your exclusive remedy for breach will be, at Connie's option, to remediate any material non-conformity or refund fees for the affected period.
                </p>
              </div>

              <div className="bg-slate-50 border-l-4 border-slate-900 p-6 rounded-r-lg">
                <h3 className="text-2xl font-semibold text-slate-900 mb-4">5.5 DISCLAIMER</h3>
                <p className="text-slate-700 leading-relaxed font-medium">
                  WITHOUT LIMITING A PARTY'S EXPRESS WARRANTIES AND OBLIGATIONS HEREUNDER, AND EXCEPT AS EXPRESSLY PROVIDED HEREIN, THE SERVICES ARE PROVIDED "AS IS," AND NEITHER PARTY MAKES ANY WARRANTY OF ANY KIND, WHETHER EXPRESS, IMPLIED, STATUTORY, OR OTHERWISE, AND EACH PARTY SPECIFICALLY DISCLAIMS ALL IMPLIED WARRANTIES, INCLUDING ANY IMPLIED WARRANTY OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, OR NON-INFRINGEMENT TO THE FULLEST EXTENT PERMITTED BY LAW.
                </p>
              </div>
            </div>
          </section>

          {/* 6. Indemnification */}
          <section id="indemnification" className="mb-12 scroll-mt-8">
            <h2 className="text-3xl font-semibold text-slate-900 mb-6 pb-3 border-b border-slate-200">
              6. Mutual Indemnification
            </h2>

            <div className="space-y-8">
              <div>
                <h3 className="text-2xl font-semibold text-slate-900 mb-4">6.1 Indemnification by Connie</h3>
                <p className="text-slate-700 leading-relaxed">
                  Connie will defend you and your Affiliates from and against any third party claim alleging that Connie's provision of the Services infringes or misappropriates such third party's intellectual property rights, and will indemnify you from damages, attorneys' fees, and costs awarded against you or settlement amounts approved by Connie.
                </p>
              </div>

              <div>
                <h3 className="text-2xl font-semibold text-slate-900 mb-4">6.2 Indemnification by Customer</h3>
                <p className="text-slate-700 leading-relaxed mb-3">
                  You will defend Connie and its Affiliates from and against any third party claim alleging or arising out of:
                </p>
                <ul className="list-disc pl-6 space-y-2 text-slate-700">
                  <li>Your or your End Users' breach of Section 2.2 (Customer Responsibilities)</li>
                  <li>Any Customer Services infringing or misappropriating third party intellectual property rights</li>
                </ul>
                <p className="text-slate-700 leading-relaxed mt-3">
                  You will indemnify Connie from damages, attorneys' fees, and costs awarded against Connie or settlement amounts you approve.
                </p>
              </div>

              <div>
                <h3 className="text-2xl font-semibold text-slate-900 mb-4">6.3 Conditions of Indemnification</h3>
                <p className="text-slate-700 leading-relaxed mb-3">The indemnified party will:</p>
                <ul className="list-disc pl-6 space-y-2 text-slate-700">
                  <li>Promptly notify the indemnifying party of any claim</li>
                  <li>Allow the indemnifying party sole authority to defend or settle the claim</li>
                  <li>Reasonably cooperate with the indemnifying party</li>
                </ul>
              </div>

              <div>
                <h3 className="text-2xl font-semibold text-slate-900 mb-4">6.4 Exclusive Remedy</h3>
                <p className="text-slate-700 leading-relaxed">
                  This Section 6 states each party's sole liability and exclusive remedy for third-party claims.
                </p>
              </div>
            </div>
          </section>

          {/* 7. Limitation of Liability */}
          <section id="liability" className="mb-12 scroll-mt-8">
            <h2 className="text-3xl font-semibold text-slate-900 mb-6 pb-3 border-b border-slate-200">
              7. Limitation of Liability
            </h2>

            <div className="space-y-8">
              <div className="bg-slate-50 border-l-4 border-slate-900 p-6 rounded-r-lg">
                <h3 className="text-2xl font-semibold text-slate-900 mb-4">7.1 LIMITATION ON INDIRECT DAMAGES</h3>
                <p className="text-slate-700 leading-relaxed font-medium">
                  IN NO EVENT WILL EITHER PARTY OR ITS AFFILIATES HAVE ANY LIABILITY ARISING OUT OF OR RELATED TO THIS AGREEMENT FOR ANY LOST PROFITS, REVENUES, GOODWILL, OR INDIRECT, SPECIAL, INCIDENTAL, CONSEQUENTIAL, COVER, LOST DATA, BUSINESS INTERRUPTION, OR PUNITIVE DAMAGES, WHETHER AN ACTION IS IN CONTRACT OR TORT AND REGARDLESS OF THE THEORY OF LIABILITY, EVEN IF A PARTY HAS BEEN ADVISED OF THE POSSIBILITY OF SUCH DAMAGES.
                </p>
              </div>

              <div className="bg-slate-50 border-l-4 border-slate-900 p-6 rounded-r-lg">
                <h3 className="text-2xl font-semibold text-slate-900 mb-4">7.2 LIMITATION OF LIABILITY</h3>
                <p className="text-slate-700 leading-relaxed font-medium">
                  IN NO EVENT WILL THE AGGREGATE LIABILITY OF EITHER PARTY TOGETHER WITH ALL OF ITS AFFILIATES ARISING OUT OF OR RELATED TO THIS AGREEMENT EXCEED THE AMOUNTS PAID OR PAYABLE BY YOU FOR THE SERVICES GIVING RISE TO THE LIABILITY DURING THE TWELVE (12) MONTH PERIOD PRECEDING THE FIRST INCIDENT OUT OF WHICH THE LIABILITY AROSE.
                </p>
              </div>

              <div>
                <h3 className="text-2xl font-semibold text-slate-900 mb-4">7.3 EXCEPTIONS</h3>
                <p className="text-slate-700 leading-relaxed mb-3">
                  The limitations in Sections 7.1 and 7.2 do not apply to:
                </p>
                <ul className="list-disc pl-6 space-y-2 text-slate-700">
                  <li>Your breach of Section 2.2 (Customer Responsibilities)</li>
                  <li>Your breach of Section 3 (Fees and Payment Terms)</li>
                  <li>Amounts payable pursuant to indemnification obligations under Section 6</li>
                </ul>
              </div>
            </div>
          </section>

          {/* 8. Termination */}
          <section id="termination" className="mb-12 scroll-mt-8">
            <h2 className="text-3xl font-semibold text-slate-900 mb-6 pb-3 border-b border-slate-200">
              8. Term, Termination, and Survival
            </h2>

            <div className="space-y-8">
              <div>
                <h3 className="text-2xl font-semibold text-slate-900 mb-4">8.1 Agreement Term</h3>
                <p className="text-slate-700 leading-relaxed">
                  This Agreement will commence on the Effective Date and continue until terminated in accordance with Section 8.2.
                </p>
              </div>

              <div>
                <h3 className="text-2xl font-semibold text-slate-900 mb-4">8.2 Termination</h3>

                <h4 className="text-xl font-semibold text-slate-900 mb-3 mt-4">8.2.1 For Convenience</h4>
                <p className="text-slate-700 leading-relaxed">
                  Either party may terminate this Agreement for convenience by providing the other party with at least thirty (30) days prior written notice.
                </p>

                <h4 className="text-xl font-semibold text-slate-900 mb-3 mt-4">8.2.2 Material Breach</h4>
                <p className="text-slate-700 leading-relaxed">
                  Either party may terminate this Agreement if the other party commits any material breach and fails to remedy such breach within fifteen (15) days of written notice.
                </p>

                <h4 className="text-xl font-semibold text-slate-900 mb-3 mt-4">8.2.3 Insolvency</h4>
                <p className="text-slate-700 leading-relaxed">
                  Either party may terminate this Agreement immediately upon written notice in the event of the other party's liquidation, commencement of dissolution proceedings, or bankruptcy.
                </p>
              </div>

              <div>
                <h3 className="text-2xl font-semibold text-slate-900 mb-4">8.3 Survival</h3>
                <p className="text-slate-700 leading-relaxed mb-3">Upon termination, the following sections will survive:</p>
                <ul className="list-disc pl-6 space-y-2 text-slate-700">
                  <li>Section 3 (Fees and Payment Terms)</li>
                  <li>Section 4 (Ownership, Customer Data, and Confidentiality)</li>
                  <li>Section 5.5 (Disclaimer)</li>
                  <li>Section 6 (Mutual Indemnification)</li>
                  <li>Section 7 (Limitation of Liability)</li>
                  <li>Section 9 (General)</li>
                  <li>Any applicable terms in Section 10</li>
                </ul>
              </div>
            </div>
          </section>

          {/* 9. General */}
          <section id="general" className="mb-12 scroll-mt-8">
            <h2 className="text-3xl font-semibold text-slate-900 mb-6 pb-3 border-b border-slate-200">
              9. General
            </h2>

            <div className="space-y-8">
              <div>
                <h3 className="text-2xl font-semibold text-slate-900 mb-4">9.1 Affiliates of Customer</h3>
                <p className="text-slate-700 leading-relaxed">
                  Your Affiliates may use the Services under this Agreement. You will be jointly and severally liable for acts and omissions of Affiliates.
                </p>
              </div>

              <div>
                <h3 className="text-2xl font-semibold text-slate-900 mb-4">9.2 Assignment</h3>
                <p className="text-slate-700 leading-relaxed">
                  Neither party may assign this Agreement without the other party's prior written consent, except to a successor to all or part of its assets or business or to an Affiliate.
                </p>
              </div>

              <div>
                <h3 className="text-2xl font-semibold text-slate-900 mb-4">9.3 Relationship</h3>
                <p className="text-slate-700 leading-relaxed">
                  Each party is an independent contractor. Nothing in this Agreement creates an employer-employee relationship, partnership, agency, joint venture, or franchise.
                </p>
              </div>

              <div>
                <h3 className="text-2xl font-semibold text-slate-900 mb-4">9.4 No Third-Party Beneficiaries</h3>
                <p className="text-slate-700 leading-relaxed">
                  This Agreement does not confer any benefits on any third party unless it expressly states that it does.
                </p>
              </div>

              <div>
                <h3 className="text-2xl font-semibold text-slate-900 mb-4">9.5 Notices</h3>
                <p className="text-slate-700 leading-relaxed">
                  Notices to Connie:{' '}
                  <a href="mailto:legal@connie.one" className="text-indigo-600 hover:text-indigo-800 underline">
                    legal@connie.one
                  </a>
                  . All notices to you will be provided via email to the contact(s) you designate in your account.
                </p>
              </div>

              <div>
                <h3 className="text-2xl font-semibold text-slate-900 mb-4">9.6 Governing Law and Jurisdiction</h3>
                <p className="text-slate-700 leading-relaxed">
                  This Agreement will be governed by and interpreted according to the laws of the State of Nevada, without regard to conflicts of law principles. Any legal proceedings will be instituted in the courts of Clark County, Nevada.
                </p>
              </div>

              <div>
                <h3 className="text-2xl font-semibold text-slate-900 mb-4">9.7 Dispute Resolution</h3>
                <p className="text-slate-700 leading-relaxed">
                  In the event of any dispute, the parties will attempt in good faith to resolve it. If unable to resolve within thirty (30) days, the parties may commence binding arbitration under JAMS' Comprehensive Arbitration Rules.
                </p>
              </div>

              <div>
                <h3 className="text-2xl font-semibold text-slate-900 mb-4">9.8 Force Majeure</h3>
                <p className="text-slate-700 leading-relaxed">
                  No failure, delay, or default in performance will constitute breach to the extent arising from causes beyond reasonable control, including acts of nature, war, terrorism, strikes, or other labor disputes.
                </p>
              </div>

              <div>
                <h3 className="text-2xl font-semibold text-slate-900 mb-4">9.9 Waiver and Order of Precedence</h3>
                <p className="text-slate-700 leading-relaxed mb-3">
                  No failure to exercise any right will constitute a waiver. In the event of conflict, the order of precedence will be:
                </p>
                <ol className="list-decimal pl-6 space-y-2 text-slate-700">
                  <li>Applicable Order Form(s)</li>
                  <li>This Agreement</li>
                  <li>Applicable Documentation</li>
                </ol>
              </div>

              <div>
                <h3 className="text-2xl font-semibold text-slate-900 mb-4">9.10 Severability</h3>
                <p className="text-slate-700 leading-relaxed">
                  If any provision is held unenforceable, it will be limited to the minimum extent necessary and the remainder will continue in full force and effect.
                </p>
              </div>

              <div>
                <h3 className="text-2xl font-semibold text-slate-900 mb-4">9.11 Entire Agreement</h3>
                <p className="text-slate-700 leading-relaxed">
                  This Agreement constitutes the entire agreement between the parties and supersedes all prior understandings, proposals, statements, or agreements.
                </p>
              </div>
            </div>
          </section>

          {/* 10. Additional Terms */}
          <section id="additional" className="mb-12 scroll-mt-8">
            <h2 className="text-3xl font-semibold text-slate-900 mb-6 pb-3 border-b border-slate-200">
              10. Additional Terms
            </h2>

            <div className="space-y-8">
              <div>
                <h3 className="text-2xl font-semibold text-slate-900 mb-4">10.1 United States Federal, State, and Tribal Governments</h3>
                <p className="text-slate-700 leading-relaxed">
                  Special terms for government entities may apply. Please contact{' '}
                  <a href="mailto:sales@connie.one" className="text-indigo-600 hover:text-indigo-800 underline">
                    sales@connie.one
                  </a>{' '}
                  for more information.
                </p>
              </div>

              <div className="bg-indigo-50 border-l-4 border-indigo-600 p-6 rounded-r-lg">
                <h3 className="text-2xl font-semibold text-slate-900 mb-4">10.2 Nonprofit Organizations</h3>
                <p className="text-slate-700 leading-relaxed">
                  Special provisions and discounts may be available for qualified 501(c)(3) nonprofit organizations. Contact{' '}
                  <a href="mailto:sales@connie.one" className="text-indigo-600 hover:text-indigo-800 underline font-medium">
                    sales@connie.one
                  </a>{' '}
                  for nonprofit pricing and terms.
                </p>
              </div>

              <div>
                <h3 className="text-2xl font-semibold text-slate-900 mb-4">10.3 Partner Programs</h3>
                <p className="text-slate-700 leading-relaxed">
                  If you are participating in any Connie partner program, additional terms apply as specified in the partner program documentation.
                </p>
              </div>
            </div>
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
                  <span className="font-medium">Support:</span>{' '}
                  <a href="mailto:support@connie.one" className="text-indigo-600 hover:text-indigo-800 underline">
                    support@connie.one
                  </a>
                </p>
                <p>
                  <span className="font-medium">Sales:</span>{' '}
                  <a href="mailto:sales@connie.one" className="text-indigo-600 hover:text-indigo-800 underline">
                    sales@connie.one
                  </a>
                </p>
                <p>
                  <span className="font-medium">Legal:</span>{' '}
                  <a href="mailto:legal@connie.one" className="text-indigo-600 hover:text-indigo-800 underline">
                    legal@connie.one
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
