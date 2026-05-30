'use client';

import React, { useEffect, useRef, useState } from 'react';

const steps = [
    {
        number: '01',
        title: 'Find Jobs That Match Your Niche',
        body: 'We scan live job boards, LinkedIn, and hiring signals across your target sectors and locations — surfacing only roles that fit your placement niche. No guesswork. No wasted effort.',
        pill: 'Signal Detection',
        icon: (
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-4.35-4.35M17 11A6 6 0 1 1 5 11a6 6 0 0 1 12 0z" />
                <circle cx="11" cy="11" r="2.5" stroke="currentColor" strokeWidth={1.8} />
            </svg>
        ),
    },
    {
        number: '02',
        title: 'Identify the Companies Behind the Roles',
        body: "Once we know what's moving in your market, we map every company actively hiring in those roles — including stealth hiring signals before the job post even goes live.",
        pill: 'Company Targeting',
        icon: (
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-4 8v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
            </svg>
        ),
    },
    {
        number: '03',
        title: 'Find the Right Decision-Maker — Not HR',
        body: "We run waterfall enrichment across 20+ data sources to surface the direct contact of the actual hiring manager — the person who controls the budget and the brief. Every contact comes email- and phone-verified. You never land in the wrong inbox.",
        pill: 'Decision-Maker Enrichment',
        icon: (
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
        ),
    },
    {
        number: '04',
        title: 'Outreach, Replies & Warm Handoff',
        body: 'We run personalised multi-channel sequences on your stack. Positive replies are filtered and handed off to you as warm leads — ready to close. You only see conversations worth having.',
        pill: 'Outreach & Handoff',
        icon: (
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
        ),
    },
];

export default function HowItWorks() {
    const [activeStep, setActiveStep] = useState<number | null>(null);
    const [visible, setVisible] = useState(false);
    const sectionRef = useRef<HTMLElement>(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setVisible(true);
                    observer.disconnect();
                }
            },
            { threshold: 0.08 }
        );
        if (sectionRef.current) observer.observe(sectionRef.current);
        return () => observer.disconnect();
    }, []);

    return (
        <section
            ref={sectionRef}
            className="py-20 sm:py-28 md:py-36 bg-[#FAFAFA] border-t border-[#E5E5E5]"
            id="how-it-works"
        >
            <div className="max-w-[1240px] mx-auto px-4 sm:px-6">

                {/* Header */}
                <div className="mb-14 md:mb-20">
                    <p className="text-xs font-bold text-[#FF6A00] uppercase tracking-widest mb-3"
                        style={{ fontFamily: 'var(--font-mono)' }}>
                        How It Works
                    </p>
                    <h2
                        className="text-[#0A0A0A] max-w-2xl tracking-tight leading-tight mb-4"
                        style={{ fontFamily: 'var(--font-serif)' }}
                    >
                        Four steps from signal&nbsp;to&nbsp;signed client.
                    </h2>
                    <p className="section-sub max-w-xl">
                        RecruitmentOS runs the entire BD pipeline for you — niche-matched,
                        data-verified, and delivered to your inbox as warm opportunities.
                    </p>
                </div>

                {/* Steps — single frame, four compact columns */}
                <div
                    className="rounded-2xl border border-[#E5E5E5] bg-white overflow-hidden shadow-[0_8px_40px_rgba(0,0,0,0.04)]"
                    style={{
                        opacity: visible ? 1 : 0,
                        transform: visible ? 'translateY(0)' : 'translateY(24px)',
                        transition: 'opacity 0.55s ease, transform 0.55s ease',
                    }}
                >
                    <div className="grid grid-cols-1 md:grid-cols-4">
                        {steps.map((step, idx) => (
                            <div
                                key={step.number}
                                className={`group relative p-6 md:p-7 cursor-default transition-colors duration-300 hover:bg-[#FFFAF5] border-[#E5E5E5] ${idx < steps.length - 1 ? 'border-b md:border-b-0 md:border-r' : ''}`}
                                onMouseEnter={() => setActiveStep(idx)}
                                onMouseLeave={() => setActiveStep(null)}
                            >
                                {/* Step number + icon */}
                                <div className="flex items-center justify-between mb-4">
                                    <span
                                        className="text-[40px] font-extrabold leading-none select-none transition-colors duration-300"
                                        style={{
                                            fontFamily: 'var(--font-mono)',
                                            color: activeStep === idx ? '#FF6A00' : '#E8E4DC',
                                            letterSpacing: '-0.04em',
                                        }}
                                    >
                                        {step.number}
                                    </span>
                                    <div className="w-9 h-9 rounded-xl bg-[#FFF4EB] flex items-center justify-center text-[#FF6A00] shrink-0 group-hover:scale-110 transition-transform duration-200">
                                        {step.icon}
                                    </div>
                                </div>

                                {/* Pill */}
                                <span
                                    className="inline-block text-[9px] font-bold uppercase tracking-widest text-[#FF6A00] bg-[#FFF4EB] px-2 py-1 rounded-full mb-3"
                                    style={{ fontFamily: 'var(--font-mono)' }}
                                >
                                    {step.pill}
                                </span>

                                {/* Title */}
                                <h3
                                    className="text-[#0A0A0A] text-base md:text-lg font-bold leading-snug mb-2"
                                    style={{ fontFamily: 'var(--font-outfit)' }}
                                >
                                    {step.title}
                                </h3>

                                {/* Body */}
                                <p
                                    className="text-[#6B7280] leading-relaxed text-[13px]"
                                    style={{ fontFamily: 'var(--font-outfit)' }}
                                >
                                    {step.body}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Bottom CTA strip */}
                <div className="mt-12 sm:mt-16 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5 border-t border-[#E5E5E5] pt-10">
                    <p
                        className="text-base sm:text-lg font-medium text-[#374151] max-w-md"
                        style={{ fontFamily: 'var(--font-outfit)' }}
                    >
                        Want to see this running on your stack before you commit?
                    </p>
                    <a
                        href="https://cal.com/tusharm/30min?user=tusharm"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center justify-center bg-[#0A0A0A] text-white px-7 py-3.5 rounded-full font-semibold text-sm hover:bg-[#222] transition-colors group"
                        style={{ fontFamily: 'var(--font-outfit)' }}
                        id="how-it-works-cta"
                    >
                        Book a free strategy call
                        <svg className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                        </svg>
                    </a>
                </div>
            </div>
        </section>
    );
}
