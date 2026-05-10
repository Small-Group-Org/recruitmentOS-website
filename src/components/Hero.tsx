'use client';

import Link from 'next/link';
import { trackCTAClick } from '@/lib/analytics';
import RetroGrid from './RetroGrid';

export default function Hero() {
    return (
        <section className="relative overflow-hidden pt-12 pb-24 md:pt-20 md:pb-40 bg-[#F9FAFB]" id="hero">
            <RetroGrid />
            <div className="relative z-10 max-w-[1280px] mx-auto px-4 sm:px-6 text-center">
                <div className="flex flex-col items-center justify-center">
                    {/* Eyebrow */}
                    <div className="mb-6 inline-flex items-center gap-2 bg-[#0A0A0A] border border-white/10 rounded-full px-4 py-1.5 text-[0.7rem] font-semibold text-white uppercase tracking-widest">
                        <span className="w-2 h-2 rounded-full bg-[#F97316] shrink-0"></span>
                        For recruitment agencies billing $500K–$5M
                    </div>

                    {/* H1 */}
                    <h1
                        className="text-[2.6rem] sm:text-5xl md:text-6xl lg:text-[6.5rem] xl:text-[7rem] tracking-[-0.04em] mb-8 leading-[0.95] mx-auto max-w-5xl font-extrabold"
                        style={{ fontFamily: "'Inter', 'Helvetica Neue', sans-serif" }}
                    >
                        <span className="block text-[#0A0A0A]">Stop hunting for</span>
                        <span className="block text-[#0A0A0A]">hiring companies</span>
                        <span className="block text-[#F97316]">with a team of analysts.</span>
                        <span className="block text-[#0A0A0A]">We do it for you.</span>
                    </h1>

                    {/* Subtext */}
                    <p className="text-lg md:text-xl text-[#4B5563] font-medium mb-10 max-w-2xl mx-auto leading-relaxed">
                        RecruitmentOS runs your entire BD pipeline — sourcing, enrichment, outreach, reply handling — as a service. Your recruiters only step in when a hiring manager replies &ldquo;yes, send me candidates.&rdquo;
                    </p>

                    {/* CTAs */}
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8">
                        <Link
                            href="/fit-call"
                            onClick={() => trackCTAClick('Book a fit call', 'Hero')}
                            className="inline-flex items-center justify-center bg-[#0A0A0A] text-white px-7 py-3.5 sm:px-9 sm:py-4 rounded-full font-semibold hover:bg-[#222222] hover:-translate-y-1 hover:shadow-xl active:scale-95 transition-all duration-300 text-base sm:text-lg group"
                        >
                            Book a 30-min fit call
                            <svg className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M5 12h14M12 5l7 7-7 7" />
                            </svg>
                        </Link>
                        <Link
                            href="/calculator"
                            onClick={() => trackCTAClick('Calculate volume gap', 'Hero')}
                            className="inline-flex items-center justify-center bg-white text-[#0A0A0A] border border-[#e5e5e5] px-7 py-3.5 sm:px-9 sm:py-4 rounded-full text-base sm:text-lg font-medium hover:bg-[#f9fafb] hover:-translate-y-1 hover:shadow-md active:scale-95 transition-all duration-300"
                        >
                            Calculate my volume gap →
                        </Link>
                    </div>

                    {/* Trust line */}
                    <p className="text-sm text-[#6B7280] font-medium">
                        Build from $500 &middot; Run from $1,300/mo &middot; 100 contacts in 60 days or we work free
                    </p>
                </div>
            </div>
        </section>
    );
}
