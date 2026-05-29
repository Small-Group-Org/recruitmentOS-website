'use client';

import Link from 'next/link';

export default function FinalCTA() {
    return (
        <section className="py-16 sm:py-28 md:py-40 bg-[#FAFAFA] border-t border-[#e5e5e5]" id="contact">
            <div className="max-w-[900px] mx-auto px-4 sm:px-6 text-center">
                <h2 className="text-3xl sm:text-5xl md:text-6xl font-extrabold text-[#0A0A0A] tracking-tight leading-[1.1] mb-6">Ready to take BD off your desk for good?</h2>
                <p className="text-lg md:text-xl text-[#6b7280] mb-12 max-w-[560px] mx-auto leading-relaxed">
                    10+ established recruitment agencies already on retainer. We run the full BD function on your stack — your team steps in when a hiring manager replies yes.
                </p>

                <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-10">
                    <Link
                        href="https://cal.com/tusharm/30min?user=tusharm"
                        target="_blank"
                        onClick={() => (window as Window & { fbq?: (...args: unknown[]) => void }).fbq?.('track', 'Contact', { content_name: 'Book a fit call' })}
                        className="inline-flex items-center bg-[#0A0A0A] text-white px-8 py-4 sm:px-10 sm:py-5 rounded-xl font-semibold hover:bg-[#1a1a1a] transition-colors text-base sm:text-lg"
                    >
                        Book a fit call
                        <svg className="ml-3 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M5 12h14M12 5l7 7-7 7" />
                        </svg>
                    </Link>
                    <Link
                        href="mailto:tushar.mangla1120@gmail.com"
                        className="inline-flex items-center text-lg text-[#F97316] hover:text-[#EA580C] transition-colors px-6 py-5 font-medium"
                    >
                        Or email us directly
                    </Link>
                </div>

                <p className="text-sm text-[#9ca3af]">
                    Live in &lt;7 days &middot; 60-day guarantee &middot; 30-day notice to cancel
                </p>
            </div>
        </section>
    );
}
