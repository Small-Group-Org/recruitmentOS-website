import React from 'react';

export default function HeroDashboard() {
  return (
    <div className="relative w-full max-w-[640px] mx-auto lg:ml-auto">
      {/* Soft mesh background glow */}
      <div className="absolute -inset-10 bg-gradient-to-r from-[#FF6B00]/20 to-transparent blur-3xl opacity-50 rounded-full z-0 pointer-events-none" />

      {/* Main Dashboard Card */}
      <div 
        className="relative z-10 bg-white rounded-3xl p-6 md:p-8 border border-neutral-100 transition-all duration-700 hover:scale-[1.02] hover:-translate-y-2 hover:shadow-2xl"
        style={{
          boxShadow: '0 20px 60px -15px rgba(255, 107, 0, 0.05), 0 30px 100px -20px rgba(0,0,0,0.08)'
        }}
      >
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <h3 className="text-xl md:text-2xl font-bold text-neutral-900 tracking-tight">
            Your Pipeline. On Autopilot.
          </h3>
          <div className="flex items-center gap-2 bg-neutral-50 px-3 py-1.5 rounded-full border border-neutral-100">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
            </span>
            <span className="text-[11px] font-semibold text-neutral-600 uppercase tracking-wider">Live Campaign</span>
          </div>
        </div>

        {/* Dashboard Grid */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
          {/* Left Column: Pipeline */}
          <div className="md:col-span-3 space-y-4 relative">
            {/* Connecting line */}
            <div className="absolute left-[23px] top-[24px] bottom-[24px] w-0.5 bg-gradient-to-b from-[#FF6B00] via-[#FF6B00]/50 to-neutral-200 z-0" />

            {[
              { title: 'Lead Sourced', stat: '20,342 leads', icon: (
                <svg className="w-4 h-4 text-[#FF6B00]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              ), check: true },
              { title: 'Hiring Manager Found', stat: '8,731 profiles', icon: (
                <svg className="w-4 h-4 text-[#FF6B00]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              ), check: true },
              { title: 'Outreach Sent', stat: '6,521 emails', icon: (
                <svg className="w-4 h-4 text-[#FF6B00]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              ), check: true },
              { title: 'Positive Reply', stat: '312 replies', icon: (
                <svg className="w-4 h-4 text-[#FF6B00]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                </svg>
              ), check: true },
              { title: 'Meeting Booked', stat: '48 meetings', active: true, icon: (
                <svg className="w-4 h-4 text-[#FF6B00]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              ), check: false }
            ].map((step, idx) => (
              <div key={idx} className="relative z-10 flex items-center gap-4 bg-white p-3 rounded-2xl border border-neutral-100 shadow-sm">
                <div className={`w-12 h-12 shrink-0 rounded-xl flex items-center justify-center ${step.active ? 'bg-white border-2 border-[#FF6B00] shadow-md shadow-[#FF6B00]/10' : 'bg-orange-50'}`}>
                  {step.icon}
                </div>
                <div className="flex-1">
                  <h4 className="text-sm font-bold text-neutral-900">{step.title}</h4>
                  <p className="text-[11px] text-neutral-500 font-medium">{step.stat}</p>
                </div>
                {step.check ? (
                  <div className="w-6 h-6 rounded-full bg-green-500 flex items-center justify-center shrink-0">
                    <svg className="w-3.5 h-3.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                ) : (
                  <div className="w-6 h-6 rounded-full bg-orange-100 flex items-center justify-center shrink-0">
                    <div className="w-2 h-2 rounded-full bg-[#FF6B00]" />
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Right Column: Charts */}
          <div className="md:col-span-2 space-y-4">
            {/* Chart 1 */}
            <div className="bg-white p-4 rounded-2xl border border-neutral-100 shadow-sm h-[160px] flex flex-col justify-between">
              <div>
                <p className="text-[11px] font-bold text-neutral-500 uppercase tracking-wide">Positive Reply Rate</p>
                <div className="flex items-baseline gap-2 mt-1">
                  <span className="text-3xl font-black text-[#FF6B00]">8.7%</span>
                </div>
                <p className="text-[10px] text-green-600 font-semibold flex items-center mt-1">
                  <svg className="w-3 h-3 mr-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 10l7-7m0 0l7 7m-7-7v18" />
                  </svg>
                  24% vs last 30 days
                </p>
              </div>
              {/* Fake line chart */}
              <div className="mt-2 relative h-12 w-full flex items-end">
                <svg className="w-full h-full overflow-visible" viewBox="0 0 100 40" preserveAspectRatio="none">
                  <path d="M0 35 L15 25 L30 30 L45 15 L60 20 L75 5 L90 10 L100 0" fill="none" stroke="rgba(255, 107, 0, 0.2)" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M0 35 L15 25 L30 30 L45 15 L60 20 L75 5 L90 10 L100 0" fill="none" stroke="#FF6B00" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  <circle cx="100" cy="0" r="3" fill="#FF6B00" />
                </svg>
                <div className="absolute inset-0 bg-gradient-to-t from-white via-white/80 to-transparent bottom-0 h-1/2" />
              </div>
            </div>

            {/* Chart 2: Top Industries */}
            <div className="bg-white p-4 rounded-2xl border border-neutral-100 shadow-sm flex-1">
              <p className="text-[11px] font-bold text-neutral-500 uppercase tracking-wide mb-3">Top Industries</p>
              <div className="space-y-3">
                {[
                  { name: 'IT Services', pct: 32 },
                  { name: 'Healthcare', pct: 24 },
                  { name: 'Finance', pct: 18 },
                  { name: 'Manufacturing', pct: 12 },
                  { name: 'Others', pct: 14 }
                ].map((ind, i) => (
                  <div key={i} className="flex items-center text-xs">
                    <span className="w-20 font-semibold text-neutral-700 truncate">{ind.name}</span>
                    <div className="flex-1 h-1.5 bg-neutral-100 rounded-full mx-2 overflow-hidden">
                      <div className="h-full bg-[#FF6B00] rounded-full" style={{ width: `${ind.pct}%` }} />
                    </div>
                    <span className="w-7 text-right font-medium text-neutral-500">{ind.pct}%</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Floating Testimonial */}
      <div 
        className="absolute -bottom-12 left-6 md:left-20 z-20 bg-white p-4 rounded-2xl border border-neutral-100 flex items-start gap-4 max-w-sm"
        style={{
          boxShadow: '0 15px 35px -5px rgba(0,0,0,0.08), 0 5px 15px -5px rgba(0,0,0,0.04)'
        }}
      >
        <div className="flex -space-x-2 shrink-0">
          <div className="w-8 h-8 rounded-full border-2 border-white bg-blue-100 flex items-center justify-center text-xs font-bold text-blue-800 overflow-hidden">
            <img src="https://i.pravatar.cc/100?img=47" alt="User" />
          </div>
          <div className="w-8 h-8 rounded-full border-2 border-white bg-green-100 flex items-center justify-center text-xs font-bold text-green-800 overflow-hidden">
            <img src="https://i.pravatar.cc/100?img=68" alt="User" />
          </div>
          <div className="w-8 h-8 rounded-full border-2 border-white bg-purple-100 flex items-center justify-center text-xs font-bold text-purple-800 overflow-hidden">
            <img src="https://i.pravatar.cc/100?img=12" alt="User" />
          </div>
          <div className="w-8 h-8 rounded-full border-2 border-white bg-neutral-100 flex items-center justify-center text-[10px] font-bold text-neutral-600">
            +34
          </div>
        </div>
        <div>
          <p className="text-xs font-semibold text-neutral-900 leading-snug">
            "RecruitmentOS helped us add 27 new clients in just 45 days."
          </p>
          <div className="flex items-center justify-between mt-2">
            <p className="text-[10px] text-neutral-500 font-medium">
              UK, US and Germany Based Recruitment Agencies
            </p>
            <div className="flex gap-0.5 text-[#FF6B00]">
              {[1,2,3,4,5].map(i => (
                <svg key={i} className="w-3 h-3 fill-current" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
