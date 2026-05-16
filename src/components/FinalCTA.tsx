'use client';

import { useRef, useState, useEffect } from 'react';
import Link from 'next/link';

export default function FinalCTA() {
    const calRef = useRef<HTMLDivElement>(null);
    const [calVisible, setCalVisible] = useState(false);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setCalVisible(true);
                    observer.disconnect();
                }
            },
            { rootMargin: '300px' }
        );
        if (calRef.current) observer.observe(calRef.current);
        return () => observer.disconnect();
    }, []);

    return (
        <section className="py-16 sm:py-28 md:py-40 bg-[#FAFAFA] border-t border-[#e5e5e5]" id="contact">
            <div className="max-w-[900px] mx-auto px-4 sm:px-6 text-center">
                <h2 className="text-3xl sm:text-5xl md:text-6xl font-extrabold text-[#0A0A0A] tracking-tight leading-[1.1] mb-6">Ready to Scale Your Pipeline Fast?</h2>
                <p className="text-lg md:text-xl text-[#6b7280] mb-12 max-w-[560px] mx-auto leading-relaxed">
                    Join 10+ agencies already using RecruitmentOS to automate their pipeline and grow revenue — without hiring more people.
                </p>

                <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-10">
                    <Link
                        href="https://cal.com/tusharm/30min?user=tusharm"
                        target="_blank"
                        onClick={() => (window as Window & { fbq?: (...args: unknown[]) => void }).fbq?.('track', 'Contact', { content_name: 'Book a Demo' })}
                        className="inline-flex items-center bg-[#0A0A0A] text-white px-8 py-4 sm:px-10 sm:py-5 rounded-xl font-semibold hover:bg-[#1a1a1a] transition-colors text-base sm:text-lg"
                    >
                        Book a Demo
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

                <p className="text-sm text-[#9ca3af] mb-12">
                    Setup in &lt;7 days &middot; No long-term contract &middot; First warm reply within 2 weeks
                </p>

                {/* Cal.com Embed — lazy loaded */}
                <div ref={calRef} className="w-full max-w-[1000px] mx-auto rounded-2xl overflow-hidden border border-[#e5e5e5] h-[700px] bg-white shadow-sm ring-1 ring-black/5">
                    {calVisible ? (
                        <iframe
                            src="https://cal.com/tusharm/30min?overlayCalendar=true"
                            width="100%"
                            height="100%"
                            frameBorder="0"
                            title="Schedule a Demo"
                            className="w-full h-full"
                        />
                    ) : (
                        <div className="w-full h-full flex items-center justify-center bg-[#FAFAFA]">
                            <p className="text-[#9CA3AF] text-sm font-medium">Loading calendar…</p>
                        </div>
                    )}
                </div>
            </div>
        </section>
    );
}
