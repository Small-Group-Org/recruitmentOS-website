'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function AnnouncementBanner() {
    const [isVisible, setIsVisible] = useState(true);

    if (!isVisible) return null;

    return (
        <div className="relative z-[100] border-b border-white/10 overflow-hidden bg-black">
            <div
                aria-hidden
                className="absolute inset-0 pointer-events-none opacity-30"
                style={{
                    background:
                        'radial-gradient(60% 100% at 50% 0%, rgba(255,106,0,0.35) 0%, rgba(255,106,0,0) 60%)',
                }}
            />

            <div className="relative max-w-[1280px] mx-auto px-4 sm:px-6 py-2.5 sm:py-3 flex items-center justify-center gap-3 sm:gap-6 text-center pr-10 sm:pr-12">
                <Link
                    href="/free-leads-campaign"
                    className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 group cursor-pointer"
                >
                    <span className="bg-[#00D47E] text-[#001D3D] text-[9px] sm:text-[10px] font-extrabold uppercase tracking-widest px-2 py-0.5 rounded-full flex-shrink-0 shadow-[0_0_12px_rgba(0,212,126,0.5)] animate-pulse">
                        Free offer
                    </span>
                    <span className="text-white text-xs sm:text-sm font-medium tracking-tight leading-snug">
                        <span className="hidden sm:inline">Free for recruitment agencies: </span>
                        <span className="font-bold text-[#FF6A00]">10 verified hiring-manager contacts in your niche, every day, for 30 days</span>
                        <span className="hidden sm:inline">,  300 leads. No commitment.</span>
                        <span className="sm:hidden"> · 300 leads, free</span>
                        <span className="ml-2 inline-flex items-center gap-1 font-bold text-[#00D47E] group-hover:gap-2 transition-all">
                            Apply now
                            <span aria-hidden>→</span>
                        </span>
                    </span>
                </Link>

                <button
                    onClick={() => setIsVisible(false)}
                    aria-label="Dismiss announcement"
                    className="absolute right-3 sm:right-4 top-1/2 -translate-y-1/2 text-white/50 hover:text-white transition-colors p-1"
                >
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <line x1="18" y1="6" x2="6" y2="18"></line>
                        <line x1="6" y1="6" x2="18" y2="18"></line>
                    </svg>
                </button>
            </div>
        </div>
    );
}
