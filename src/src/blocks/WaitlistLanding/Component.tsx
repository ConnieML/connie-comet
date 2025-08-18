import React from 'react'
import { AnimatedGridPattern } from '@/components/magicui/animated-grid-pattern'

export const WaitlistLanding: React.FC = () => {
  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-gradient-to-b from-slate-50 to-slate-200">
      {/* Animated Grid Background */}
      <AnimatedGridPattern
        numSquares={60}
        maxOpacity={0.3}
        duration={3}
        repeatDelay={1}
        className="absolute inset-0 h-full w-full [mask-image:radial-gradient(500px_circle_at_center,white,transparent)]"
      />
      
      {/* Content */}
      <div className="relative z-10 mx-auto max-w-6xl px-6 py-20">
        <div className="text-center">
          {/* Logo */}
          <div className="mb-10">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-xl bg-slate-600 text-xl font-bold text-white">
              C
            </div>
          </div>
          
          {/* Heading */}
          <h1 className="mb-6 bg-gradient-to-r from-slate-900 to-slate-600 bg-clip-text text-6xl font-light text-transparent">
            A Nonprofit<br />Community Engagement Platform
          </h1>
          
          {/* Subtitle */}
          <p className="mb-12 text-2xl text-slate-600">
            Join the waitlist for early access to Connie&apos;s closed beta
          </p>
          
          {/* Email Form */}
          <div className="mx-auto max-w-md rounded-2xl border border-slate-200/50 bg-white/70 p-8 shadow-xl backdrop-blur-xl">
            <form className="flex gap-4">
              <input
                type="email"
                placeholder="your-email@organization.org"
                className="flex-1 rounded-xl border border-slate-200/50 bg-white/80 px-5 py-4 text-slate-900 placeholder-slate-500 outline-none transition-all focus:border-slate-400 focus:ring-2 focus:ring-slate-400/20"
                required
              />
              <button
                type="submit"
                className="rounded-xl bg-slate-600 px-8 py-4 font-semibold text-white transition-all hover:bg-slate-700 hover:-translate-y-0.5 hover:shadow-lg"
              >
                Join Waitlist
              </button>
            </form>
          </div>
        </div>
        
        {/* Features */}
        <div className="mt-20 grid gap-8 md:grid-cols-3">
          <div className="rounded-2xl border border-slate-200/50 bg-white/60 p-8 text-center transition-all hover:-translate-y-1 hover:border-slate-300/50 hover:bg-white/80 hover:shadow-xl">
            <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-slate-500 to-slate-600 text-2xl">
              🤝
            </div>
            <h3 className="mb-4 text-2xl font-semibold text-slate-900">Community Connection</h3>
            <p className="text-slate-600">
              Connect nonprofits with community members through intelligent matching and engagement tools.
            </p>
          </div>
          
          <div className="rounded-2xl border border-slate-200/50 bg-white/60 p-8 text-center transition-all hover:-translate-y-1 hover:border-slate-300/50 hover:bg-white/80 hover:shadow-xl">
            <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-slate-500 to-slate-600 text-2xl">
              📊
            </div>
            <h3 className="mb-4 text-2xl font-semibold text-slate-900">Impact Tracking</h3>
            <p className="text-slate-600">
              Measure and visualize community impact with comprehensive analytics and reporting.
            </p>
          </div>
          
          <div className="rounded-2xl border border-slate-200/50 bg-white/60 p-8 text-center transition-all hover:-translate-y-1 hover:border-slate-300/50 hover:bg-white/80 hover:shadow-xl">
            <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-slate-500 to-slate-600 text-2xl">
              🎯
            </div>
            <h3 className="mb-4 text-2xl font-semibold text-slate-900">Resource Management</h3>
            <p className="text-slate-600">
              Efficiently distribute resources and services to those who need them most in your community.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}