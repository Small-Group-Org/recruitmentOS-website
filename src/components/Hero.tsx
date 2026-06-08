'use client';

import Link from 'next/link';
import { trackCTAClick } from '@/lib/analytics';
import { useState, useEffect } from 'react';
import RetroGrid from './RetroGrid';

export default function Hero() {
    const fullText = "FOR RECRUITMENT AGENCIES";
    const [typedText, setTypedText] = useState("");

    useEffect(() => {
        let i = 0;
        const interval = setInterval(() => {
            setTypedText(fullText.slice(0, i));
            i++;
            if (i > fullText.length) {
                clearInterval(interval);
            }
        }, 60);

        return () => clearInterval(interval);
    }, []);

    return (
        <section className="relative overflow-hidden pt-3 pb-16 md:pb-24 bg-[#F9FAFB]" id="hero">
            <RetroGrid />
            <div className="relative z-10 max-w-[1280px] mx-auto px-4 sm:px-6 text-center">
                <div className="flex flex-col items-center justify-center">
                    <div className="relative group mb-8 inline-flex">
                        <div className="inline-flex items-center justify-center gap-2.5 bg-[#0A0A0A] border border-white/10 rounded-full px-4 py-1.5 text-[0.7rem] font-semibold text-white uppercase tracking-widest relative">
                            <div className="w-3.5 h-3.5 text-white/90 animate-spin-slow shrink-0 flex items-center justify-center">
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="w-full h-full">
                                    <path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z" />
                                    <circle cx="12" cy="12" r="3" />
                                </svg>
                            </div>
                            <span className="relative z-10 min-h-[1em]">
                                {typedText}
                            </span>
                        </div>

                        <style jsx global>{`
                            @keyframes spin-slow {
                                from { transform: rotate(0deg); }
                                to { transform: rotate(360deg); }
                            }
                            .animate-spin-slow {
                                animation: spin-slow 4s linear infinite;
                            }
                        `}</style>
                    </div>

                    <h1
                        className="text-[2.5rem] sm:text-5xl md:text-7xl lg:text-[7.6rem] xl:text-[8.3rem] tracking-[-0.04em] mb-6 leading-[0.9] mx-auto"
                        style={{ fontFamily: "'Inter', 'Helvetica Neue', sans-serif" }}
                    >
                        <span className="block mb-2 font-semibold text-[#0A0A0A]">
                            We replace your BD function.
                        </span>
                        <span className="block font-bold scale-y-105 text-[#FF6A00]">
                            You stop being the bottleneck.
                        </span>
                    </h1>

                    <p className="hero-sub mb-8 max-w-3xl mx-auto">
                        The outsourced BD function for established recruitment agencies. We handle sourcing, enrichment, outreach, and reply filtering on your stack your team steps in when a hiring manager replies &ldquo;yes, send me candidates.&rdquo;
                    </p>

                    <p className="text-sm sm:text-base font-semibold text-[#FF6A00] mb-12 max-w-2xl mx-auto leading-relaxed">
                        20k+ verified hiring-manager contacts + 10 positive replies in 60 days — or we keep working, free.
                    </p>

                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                        <Link
                            href="/fit-call"
                            onClick={() => trackCTAClick('Book a strategy call', 'Hero')}
                            className="inline-flex items-center justify-center bg-[#0A0A0A] text-white px-6 py-3 sm:px-8 sm:py-4 rounded-full font-medium hover:bg-[#0A0A0A] hover:-translate-y-1 hover:shadow-xl active:scale-95 transition-all duration-300 text-base sm:text-lg group"
                        >
                            Book a strategy call
                            <svg className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M5 12h14M12 5l7 7-7 7" />
                            </svg>
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    );
}
