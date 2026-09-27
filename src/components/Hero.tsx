'use client';

import Link from 'next/link';
import HeroDashboard from './ui/HeroDashboard';

export default function Hero() {
    return (
        <section className="relative overflow-hidden pt-12 md:pt-20 pb-16 md:pb-24 bg-white font-sans" id="hero">
            {/* Background elements */}
            <div className="absolute inset-0 z-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-orange-50 via-white to-white pointer-events-none" />
            <div className="absolute top-0 right-0 w-full h-[600px] bg-[url('/noise.webp')] opacity-[0.03] pointer-events-none mix-blend-overlay" />
            
            <div className="relative z-10 max-w-[1280px] mx-auto px-4 sm:px-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-8 items-center">
                    
                    {/* Left Column: Content */}
                    <div className="flex flex-col items-start text-left max-w-2xl">
                        {/* Badge */}
                        <p className="mb-6 text-xs font-bold uppercase tracking-[0.16em] text-brand" style={{ fontFamily: 'var(--font-mono)' }}>
                            DONE-FOR-YOU OUTBOUND BD FOR RECRUITMENT AGENCIES
                        </p>

                        {/* Headline */}
                        <h1 className="text-5xl sm:text-6xl lg:text-[4.5rem] text-neutral-900 leading-[1.02] mb-6" style={{ fontFamily: 'var(--font-serif)' }}>
                            Stop carrying 90% of your agency&apos;s BD. We install a done-for-you acquisition engine that books client fee agreements.
                        </h1>

                        {/* Subheadline */}
                        <p className="text-lg text-neutral-500 mb-10 leading-relaxed max-w-lg font-medium">
                             Your billers should be billing, not cold-emailing. We replace job-board candidate spam with a secondary-domain air-gap, live hiring signals, and qualified conversations with the decision-makers who can sign your next client fee agreement. No junior SDR experiment with a 70% failure rate to manage.
                        </p>

                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-10 w-full">
                            {['228 Signed Terms in 38 Days', '$0 Fee on Non-Buyers', '15–25 Client Calls/Wk'].map((proof) => (
                                <div key={proof} className="border-l-2 border-brand bg-[#FFF4EB] px-4 py-3 text-sm font-bold text-neutral-900">{proof}</div>
                            ))}
                        </div>

                        {/* CTAs */}
                        <div className="flex flex-col sm:flex-row items-center gap-4 w-full">
                            <a
                                href="https://cal.com/tusharm/30min?user=tusharm"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-brand text-white px-8 py-4 rounded-[4px] font-bold text-lg hover:bg-brand-hover shadow-lg shadow-brand/20 transition-all hover:scale-105"
                            >
                                Book a 30-Min Fit Call →
                                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                                </svg>
                            </a>

                            <Link
                                href="#operational-proof"
                                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-white text-neutral-800 px-8 py-4 rounded-[4px] font-bold text-lg border border-neutral-200 hover:bg-neutral-50 shadow-sm transition-all"
                            >
                                See Live Calendar Proof ↓
                            </Link>
                        </div>
                        

                    </div>

                    {/* Right Column: Dashboard Visual */}
                    <div className="w-full mt-12 lg:mt-0 lg:pl-10 relative">
                        <HeroDashboard />
                    </div>
                    
                </div>
            </div>
        </section>
    );
}
