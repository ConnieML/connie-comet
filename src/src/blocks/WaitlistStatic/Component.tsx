import React from 'react'

export const WaitlistStatic: React.FC = () => {
  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-slate-50 dark:bg-slate-950">
      {/* Grid Background Pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#8882_1px,transparent_1px),linear-gradient(to_bottom,#8882_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" />
      
      {/* Alternative Dot Pattern (comment/uncomment to switch) */}
      {/* <div className="absolute inset-0 bg-[radial-gradient(#8882_1px,transparent_1px)] bg-[size:20px_20px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" /> */}
      
      {/* Content */}
      <div className="relative z-10 mx-auto max-w-6xl px-6 py-20">
        <div className="text-center">
          {/* Heading */}
          <h1 className="mb-6 text-6xl font-light text-slate-900 dark:text-slate-100">
            A Nonprofit<br />
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Community Engagement Platform
            </span>
          </h1>
          
          {/* Subtitle */}
          <p className="mb-12 text-2xl text-slate-600 dark:text-slate-400">
            Join the waitlist for early access to Connie&apos;s closed beta
          </p>
          
          {/* Email Form with Glassmorphism */}
          <div className="mx-auto max-w-lg">
            <div className="rounded-2xl border border-slate-200/20 bg-white/50 p-6 shadow-2xl backdrop-blur-xl dark:border-slate-700/30 dark:bg-slate-900/50">
              <form className="flex flex-col gap-3 sm:flex-row">
                <input
                  type="email"
                  placeholder="your-email@organization.org"
                  className="flex-1 rounded-lg border border-slate-300/50 bg-white/70 px-4 py-3 text-slate-900 placeholder-slate-500 outline-none transition-all focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 dark:border-slate-600/50 dark:bg-slate-800/70 dark:text-slate-100 dark:placeholder-slate-400"
                  required
                />
                <button
                  type="submit"
                  className="rounded-lg bg-gradient-to-r from-slate-600 to-slate-700 px-6 py-3 font-medium text-white transition-all hover:from-slate-700 hover:to-slate-800 hover:-translate-y-0.5 hover:shadow-lg"
                >
                  Stay Informed
                </button>
              </form>
            </div>
          </div>
        </div>
        
        {/* Features Grid */}
        <div className="mt-24 grid gap-8 md:grid-cols-3">
          <div className="group relative overflow-hidden rounded-2xl border border-slate-200/50 bg-white/60 p-8 text-center transition-all hover:-translate-y-1 hover:border-slate-300/50 hover:bg-white/80 hover:shadow-xl dark:border-slate-700/50 dark:bg-slate-900/60 dark:hover:border-slate-600/50 dark:hover:bg-slate-900/80">
            <div className="absolute inset-0 bg-gradient-to-br from-slate-500/5 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
            <div className="relative">
              <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-slate-500 to-slate-600 text-2xl shadow-md">
                🤝
              </div>
              <h3 className="mb-4 text-2xl font-semibold text-slate-900 dark:text-slate-100">Community Connection</h3>
              <p className="text-slate-600 dark:text-slate-400">
                Connect nonprofits with community members through intelligent matching and engagement tools.
              </p>
            </div>
          </div>
          
          <div className="group relative overflow-hidden rounded-2xl border border-slate-200/50 bg-white/60 p-8 text-center transition-all hover:-translate-y-1 hover:border-slate-300/50 hover:bg-white/80 hover:shadow-xl dark:border-slate-700/50 dark:bg-slate-900/60 dark:hover:border-slate-600/50 dark:hover:bg-slate-900/80">
            <div className="absolute inset-0 bg-gradient-to-br from-slate-600/5 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
            <div className="relative">
              <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-slate-600 to-slate-700 text-2xl shadow-md">
                📊
              </div>
              <h3 className="mb-4 text-2xl font-semibold text-slate-900 dark:text-slate-100">Impact Tracking</h3>
              <p className="text-slate-600 dark:text-slate-400">
                Measure and visualize community impact with comprehensive analytics and reporting.
              </p>
            </div>
          </div>
          
          <div className="group relative overflow-hidden rounded-2xl border border-slate-200/50 bg-white/60 p-8 text-center transition-all hover:-translate-y-1 hover:border-slate-300/50 hover:bg-white/80 hover:shadow-xl dark:border-slate-700/50 dark:bg-slate-900/60 dark:hover:border-slate-600/50 dark:hover:bg-slate-900/80">
            <div className="absolute inset-0 bg-gradient-to-br from-slate-700/5 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
            <div className="relative">
              <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-slate-700 to-slate-800 text-2xl shadow-md">
                🎯
              </div>
              <h3 className="mb-4 text-2xl font-semibold text-slate-900 dark:text-slate-100">Resource Management</h3>
              <p className="text-slate-600 dark:text-slate-400">
                Efficiently distribute resources and services to those who need them most in your community.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}