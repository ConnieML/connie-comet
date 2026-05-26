'use client'

import React from 'react'
import Link from 'next/link'

export default function TestingPhilosophyPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-200 text-slate-800">
      <div className="container mx-auto px-6 py-16">
        {/* Back Navigation */}
        <div className="mb-8">
          <Link
            href="/dataroom/user-acceptance-testing"
            className="inline-flex items-center text-slate-600 hover:text-slate-800 transition-colors"
          >
            ← Back to UAT Hub
          </Link>
        </div>

        {/* Header */}
        <div className="text-center mb-12">
          <div className="text-6xl mb-4">🧭</div>
          <h1 className="text-4xl font-light text-slate-800 mb-4">
            Testing Philosophy
          </h1>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto">
            Why our UAT spreadsheet has three layers instead of one &mdash; and how to read it.
          </p>
        </div>

        {/* Intro */}
        <div className="max-w-4xl mx-auto mb-12">
          <div className="bg-white/80 backdrop-blur-sm border border-slate-300 rounded-2xl p-8 shadow-lg">
            <p className="text-lg text-slate-700 leading-relaxed">
              When we test Connie, we&apos;re not just walking through a list of features. We&apos;re checking whether{' '}
              <strong>real people can do their real jobs</strong>. That&apos;s why the spreadsheet is shaped the way it is &mdash;
              three layers instead of one.
            </p>
          </div>
        </div>

        {/* The Three Layers */}
        <div className="max-w-6xl mx-auto mb-12">
          <h2 className="text-2xl font-semibold text-slate-800 mb-6 text-center">
            The three layers, in plain terms
          </h2>

          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 border-2 border-blue-200 rounded-2xl p-6 shadow-md">
              <div className="text-4xl mb-3">👤</div>
              <div className="text-blue-700 font-bold text-sm uppercase tracking-wide mb-2">Layer 1</div>
              <h3 className="text-xl font-semibold text-slate-800 mb-3">User Story</h3>
              <p className="text-slate-700 leading-relaxed">
                <em>What someone is trying to do.</em>
              </p>
              <p className="text-sm text-slate-600 mt-3">
                &ldquo;Karen the agent transfers a call to her supervisor.&rdquo;
              </p>
            </div>

            <div className="bg-gradient-to-br from-purple-50 to-pink-50 border-2 border-purple-200 rounded-2xl p-6 shadow-md">
              <div className="text-4xl mb-3">📡</div>
              <div className="text-purple-700 font-bold text-sm uppercase tracking-wide mb-2">Layer 2</div>
              <h3 className="text-xl font-semibold text-slate-800 mb-3">Channel</h3>
              <p className="text-slate-700 leading-relaxed">
                <em>Where it&apos;s happening.</em>
              </p>
              <p className="text-sm text-slate-600 mt-3">
                Voice, SMS, Web Chat, Email &mdash; same job, different surface, sometimes different rules.
              </p>
            </div>

            <div className="bg-gradient-to-br from-emerald-50 to-teal-50 border-2 border-emerald-200 rounded-2xl p-6 shadow-md">
              <div className="text-4xl mb-3">⚙️</div>
              <div className="text-emerald-700 font-bold text-sm uppercase tracking-wide mb-2">Layer 3</div>
              <h3 className="text-xl font-semibold text-slate-800 mb-3">Atomic Feature</h3>
              <p className="text-slate-700 leading-relaxed">
                <em>The specific thing under the hood.</em>
              </p>
              <p className="text-sm text-slate-600 mt-3">
                The transfer directory. The hang-up reporting. The recording.
              </p>
            </div>
          </div>
        </div>

        {/* Why three layers */}
        <div className="max-w-4xl mx-auto mb-12">
          <div className="bg-white/80 backdrop-blur-sm border border-slate-300 rounded-2xl p-8 shadow-lg">
            <h2 className="text-2xl font-semibold text-slate-800 mb-4">
              Why three layers and not just one
            </h2>
            <p className="text-lg text-slate-700 leading-relaxed mb-6">
              Because the same feature shows up in lots of places, doing slightly different work for different people.
            </p>

            <div className="bg-amber-50 border-l-4 border-amber-400 rounded-r-lg p-6 mb-6">
              <p className="font-semibold text-amber-900 mb-3">Take <em>call recording</em> as an example:</p>
              <ul className="space-y-2 text-slate-700">
                <li className="flex gap-3">
                  <span className="font-mono font-bold text-amber-700 shrink-0">CSA-4</span>
                  <span>An agent on a voice call needs to know it&apos;s recording.</span>
                </li>
                <li className="flex gap-3">
                  <span className="font-mono font-bold text-amber-700 shrink-0">CPM-7</span>
                  <span>A manager doing quality review needs to find the recording.</span>
                </li>
                <li className="flex gap-3">
                  <span className="font-mono font-bold text-amber-700 shrink-0">C-3</span>
                  <span>The Analytics dashboard counts recorded vs. non-recorded calls.</span>
                </li>
              </ul>
            </div>

            <p className="text-slate-700 leading-relaxed">
              Same feature. Three different people care about it for three different reasons. If we only tested
              it from the agent&apos;s seat, we&apos;d miss the manager&apos;s view. If we only tested the
              manager&apos;s view, the dashboard count could be wrong and nobody would notice.
            </p>
          </div>
        </div>

        {/* How to test */}
        <div className="max-w-4xl mx-auto mb-12">
          <div className="bg-gradient-to-br from-slate-50 to-blue-50 border-2 border-slate-300 rounded-2xl p-8 shadow-lg">
            <h2 className="text-2xl font-semibold text-slate-800 mb-6">
              What this means when you&apos;re testing
            </h2>

            <ol className="space-y-5">
              <li className="flex gap-4">
                <span className="shrink-0 w-10 h-10 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold text-lg">1</span>
                <div>
                  <p className="font-semibold text-slate-800 mb-1">Pick a User Story to start.</p>
                  <p className="text-slate-600">&ldquo;Today I&apos;m testing what happens when an agent transfers a call.&rdquo;</p>
                </div>
              </li>
              <li className="flex gap-4">
                <span className="shrink-0 w-10 h-10 bg-purple-600 text-white rounded-full flex items-center justify-center font-bold text-lg">2</span>
                <div>
                  <p className="font-semibold text-slate-800 mb-1">Look at the atomic features listed for that story.</p>
                  <p className="text-slate-600">Those are the buttons, screens, and behaviors you actually click through.</p>
                </div>
              </li>
              <li className="flex gap-4">
                <span className="shrink-0 w-10 h-10 bg-emerald-600 text-white rounded-full flex items-center justify-center font-bold text-lg">3</span>
                <div>
                  <p className="font-semibold text-slate-800 mb-1">Notice the channel column.</p>
                  <p className="text-slate-600">If the same feature shows up on Voice <em>and</em> Web Chat, test both. The bugs are usually in the differences between them.</p>
                </div>
              </li>
            </ol>
          </div>
        </div>

        {/* The short version */}
        <div className="max-w-4xl mx-auto mb-12">
          <div className="bg-slate-800 text-white rounded-2xl p-8 shadow-xl">
            <h2 className="text-2xl font-semibold mb-4">The short version</h2>
            <p className="text-2xl font-light mb-6 text-blue-200">
              Workflow &rarr; surface &rarr; plumbing. Three angles at once.
            </p>
            <p className="text-slate-300 leading-relaxed">
              A feature can be technically working but used in a workflow that breaks. A workflow can be smooth but
              only on one channel. A channel can look fine but the feature underneath has a quiet bug. The
              three-layer view catches all three.
            </p>
          </div>
        </div>

        {/* The Pyramid (embedded sheet) */}
        <div className="max-w-7xl mx-auto mb-12">
          <div className="bg-white/80 backdrop-blur-sm border border-slate-300 rounded-2xl p-6 shadow-lg">
            <div className="mb-4">
              <h2 className="text-2xl font-semibold text-slate-800 mb-2">
                The UAT Feature Pyramid
              </h2>
              <p className="text-slate-600">
                Every Campaign &times; User Story &times; Atomic Feature combination in one place. Filter by
                column, sort by status, mark off tests as you go.
              </p>
            </div>
            <div className="rounded-lg overflow-hidden border border-slate-300 bg-white">
              <iframe
                src="https://docs.google.com/spreadsheets/d/1eMbbJB8aq7isnuX0tChN7zBjeAU_c2tdxnIwLt-aCRs/preview?gid=692599242&single=true&widget=true&headers=false&chrome=false"
                className="w-full"
                style={{ height: '700px', border: 0 }}
                title="Connie UAT Feature Pyramid"
                loading="lazy"
              />
            </div>
            <div className="mt-4 text-sm text-slate-600 text-center">
              <a
                href="https://docs.google.com/spreadsheets/d/1eMbbJB8aq7isnuX0tChN7zBjeAU_c2tdxnIwLt-aCRs/edit?gid=692599242"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:text-blue-800 font-semibold"
              >
                Open the full sheet in Google Sheets &rarr;
              </a>
            </div>
          </div>
        </div>

        {/* Footer note */}
        <div className="max-w-4xl mx-auto">
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 text-center">
            <p className="text-slate-700">
              <strong>Questions or feedback?</strong> Reach out to Chris &mdash; this is a living document and
              your testing experience shapes the next version.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
