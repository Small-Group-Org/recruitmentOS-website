'use client';

import Link from 'next/link';

export default function FinalCTA() {
    return (
        <section className="py-16 md:py-24 bg-[#FAFAFA] border-t border-[#E5E5E5]" id="contact">
            <div className="max-w-[900px] mx-auto px-4 sm:px-6 text-center">
                <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#0A0A0A] tracking-tight leading-[1.1] mb-6" style={{ fontFamily: 'var(--font-serif)' }}>
                    Ready to take BD off your desk for good?
                </h2>
                <p className="text-lg md:text-xl text-[#6B7280] mb-10 max-w-[620px] mx-auto leading-relaxed">
                    10+ established recruitment agencies already on retainer. We engineer and operate your outbound engine on your stack — your team only steps in when a decision-maker says yes.
                </p>

                {/* Primary Action Row */}
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-6">
                    <a
                        href="https://cal.com/tusharm/30min?user=tusharm"
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={() => (window as Window & { fbq?: (...args: unknown[]) => void }).fbq?.('track', 'Contact', { content_name: 'Book a fit call' })}
                        className="inline-flex items-center justify-center bg-brand text-white px-8 py-4 sm:px-10 sm:py-5 rounded-[4px] font-bold hover:bg-brand-hover shadow-lg shadow-brand/20 transition-all text-base sm:text-lg w-full sm:w-auto"
                    >
                        Book a 30-Min Fit Call
                        <svg className="ml-3 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round">
                            <path d="M5 12h14M12 5l7 7-7 7" />
                        </svg>
                    </a>
                    <a
                        href="mailto:tushar.mangla1120@gmail.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center justify-center text-base sm:text-lg text-neutral-700 hover:text-brand transition-colors px-6 py-4 font-semibold w-full sm:w-auto"
                    >
                        Or email us directly →
                    </a>
                </div>

                <p className="text-xs sm:text-sm text-[#9CA3AF] mb-12" style={{ fontFamily: 'var(--font-mono)' }}>
                    Live in &lt;7 days · 60-day delivery guarantee · 100% brand air-gap
                </p>

                {/* Secondary Intent Lead Magnet Block */}
                <div className="max-w-2xl mx-auto rounded-2xl border border-neutral-200 bg-white p-6 sm:p-8 text-left shadow-sm">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
                        <div className="space-y-2">
                            <span className="inline-block text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded bg-[#FFF4EB] text-brand border border-[#FFD9B8]" style={{ fontFamily: 'var(--font-mono)' }}>
                                Free Resource · No Call Required
                            </span>
                            <h3 className="text-lg sm:text-xl font-bold text-neutral-900" style={{ fontFamily: 'var(--font-serif)' }}>
                                The 16-Step Outbound Architecture Playbook
                            </h3>
                            <p className="text-sm text-neutral-600 leading-relaxed">
                                Not ready for a call? Download the complete 24-page PDF architecture guide detailing our exact signal ingestion, waterfall enrichment cascade, and deliverability protocols.
                            </p>
                        </div>
                        <div className="shrink-0 flex flex-col gap-2">
                            <a
                                href="/resources/the-founders-guide-16-steps.pdf"
                                download="The-Founders-Guide-16-Steps.pdf"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center justify-center gap-2 bg-neutral-900 text-white px-5 py-3 rounded-[4px] font-bold text-sm hover:bg-neutral-800 transition-colors whitespace-nowrap shadow-sm"
                            >
                                <svg className="w-4 h-4 text-brand" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                                </svg>
                                Download PDF
                            </a>
                            <Link
                                href="/resources/founders-guide"
                                className="text-xs text-center text-neutral-500 hover:text-brand transition-colors"
                            >
                                View guide summary →
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
