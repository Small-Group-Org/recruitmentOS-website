'use client';

import React from 'react';

const features = [
    {
        label: 'Detect Hiring Signals',
        pill: 'Signal Detection',
        title: 'Find Jobs That Match Your Niche',
        body: 'We scan live job boards, LinkedIn, and hiring signals across your target sectors and locations — surfacing only roles that fit your placement niche. No guesswork. No wasted effort.',
        icon: (
            <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
        ),
    },
    {
        label: 'Target Companies',
        pill: 'Company Targeting',
        title: 'Identify the Companies Behind the Roles',
        body: "Once we know what's moving in your market, we map every company actively hiring in those roles — including stealth hiring signals before the job post even goes live.",
        icon: (
            <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-4 8v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
            </svg>
        ),
    },
    {
        label: 'Enrich Decision-Makers',
        pill: 'Decision-Maker Enrichment',
        title: 'Find the Right Decision-Maker — Not HR',
        body: 'We run waterfall enrichment across 20+ data sources to surface the direct contact of the actual hiring manager — the person who controls the budget and the brief. Every contact comes email- and phone-verified. You never land in the wrong inbox.',
        icon: (
            <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
        ),
    },
    {
        label: 'Outreach & Handoff',
        pill: 'Outreach & Handoff',
        title: 'Outreach, Replies & Warm Handoff',
        body: 'We run personalised multi-channel sequences on your stack. Positive replies are filtered and handed off to you as warm leads — ready to close. You only see conversations worth having.',
        icon: (
            <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
        ),
    },
];

// Reusable hover detail popover shown on each diagram card.
function DetailPopover({
    feature,
    placement,
    align = 'left',
}: {
    feature: (typeof features)[number];
    placement: 'top' | 'bottom';
    align?: 'left' | 'right';
}) {
    const vertical = placement === 'bottom' ? 'top-full mt-3' : 'bottom-full mb-3';
    const horizontal = align === 'right' ? 'right-0' : 'left-0';
    return (
        <div
            className={`absolute ${vertical} ${horizontal} w-[300px] max-w-[90vw] z-40 opacity-0 invisible translate-y-1 group-hover:opacity-100 group-hover:visible group-hover:translate-y-0 transition-all duration-200 pointer-events-none`}
        >
            <div className="bg-white border border-[#E5E5E5] rounded-2xl p-5 shadow-[0_16px_48px_rgba(0,0,0,0.14)]">
                <h4 className="text-[15px] font-bold text-[#0A0A0A] leading-snug mb-2">{feature.title}</h4>
                <p className="text-[13px] text-[#6B7280] leading-relaxed">{feature.body}</p>
            </div>
        </div>
    );
}

export default function FeaturesDiagram() {
    // We'll use two sets of paths - one for mobile, one for desktop
    const desktopPaths = [
        { d: 'M 400 250 C 300 250, 200 180, 140 120', delay: '0s' },      // top-left
        { d: 'M 400 250 C 500 250, 600 180, 660 120', delay: '0.4s' },    // top-right
        { d: 'M 400 250 C 300 250, 200 320, 140 380', delay: '0.8s' },    // bottom-left
        { d: 'M 400 250 C 500 250, 600 320, 660 380', delay: '1.2s' },    // bottom-right
    ];

    const mobilePaths = [
        { d: 'M 200 80 C 180 150, 150 180, 100 220', delay: '0s' },     // card 1
        { d: 'M 200 80 C 220 150, 250 180, 300 220', delay: '0.4s' },   // card 2
        { d: 'M 200 80 C 180 250, 150 350, 100 420', delay: '0.8s' },   // card 3
        { d: 'M 200 80 C 220 250, 250 350, 300 420', delay: '1.2s' },   // card 4
    ];

    return (
        <section className="py-12 sm:py-20 md:py-28 bg-white" id="solution-overview">
            <div className="max-w-[1280px] mx-auto px-4 sm:px-6">
                <div className="text-center mb-12 md:mb-16">
                    <h2 className="text-[#0A0A0A] text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight">
                        The BD engine, running in the background.
                    </h2>
                    <p className="hidden md:block text-sm text-[#9CA3AF] mt-3">
                        Hover any step to see how it works.
                    </p>
                </div>

                {/* Unified Diagram Container */}
                <div className="relative w-full overflow-visible">
                    
                    {/* Mobile Architecture (Vertical) */}
                    <div className="md:hidden relative w-full h-[650px] mx-auto">
                        <svg viewBox="0 0 400 600" fill="none" className="absolute inset-0 w-full h-full pointer-events-none z-10">
                            <defs>
                                <marker id="arrowhead-mob" markerWidth="6" markerHeight="4" refX="5" refY="2" orient="auto">
                                    <polygon points="0 0, 6 2, 0 4" fill="#FF6A00" />
                                </marker>
                            </defs>
                            {mobilePaths.map((arrow, i) => (
                                <g key={i}>
                                    <path d={arrow.d} stroke="#E5E5E5" strokeWidth="1.5" fill="none" markerEnd="url(#arrowhead-mob)" />
                                    <path d={arrow.d} stroke="#FF6A00" strokeWidth="2" fill="none" strokeDasharray="8 12" className="animate-flow" style={{ animationDelay: arrow.delay }} />
                                    <circle r="3" fill="#FF6A00" className="animate-dot" style={{ animationDelay: arrow.delay }}>
                                        <animateMotion dur="2.5s" repeatCount="indefinite" begin={arrow.delay} path={arrow.d} />
                                    </circle>
                                </g>
                            ))}
                        </svg>

                        {/* Top Robot */}
                        <div className="absolute top-0 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center">
                            <div className="text-sm font-extrabold text-[#0A0A0A] tracking-tight mb-0.5">
                                Recruitment<span className="text-[#FF6A00]">OS</span>
                            </div>
                            <img src="/logos/robot.webp" alt="RecruitmentOS AI Bot" className="w-24 h-24 object-contain animate-float mix-blend-multiply" />
                        </div>

                        {/* 4 Cards in 2x2 Grid using absolute positions to match SVG paths */}
                        <div className="absolute top-[200px] left-0 w-full grid grid-cols-2 gap-x-4 gap-y-16 px-2">
                             {features.map((feature) => (
                                <div key={feature.label} className="bg-white border border-[#E5E5E5] rounded-2xl p-4 shadow-[0_4px_16px_rgba(0,0,0,0.04)] z-20 flex items-center gap-3">
                                    <div className="w-9 h-9 rounded-xl bg-[#FFF4EB] flex items-center justify-center text-[#FF6A00] shrink-0">
                                        {feature.icon}
                                    </div>
                                    <span
                                        className="text-[10px] font-bold uppercase tracking-widest text-[#FF6A00] leading-tight"
                                        style={{ fontFamily: 'var(--font-mono)' }}
                                    >
                                        {feature.pill}
                                    </span>
                                </div>
                             ))}
                        </div>
                    </div>

                    {/* Desktop Architecture (Horizontal Diagram) */}
                    <div className="hidden md:block relative w-full max-w-[800px] mx-auto" style={{ aspectRatio: '800 / 500' }}>
                        <svg viewBox="0 0 800 500" fill="none" className="absolute inset-0 w-full h-full z-10 pointer-events-none">
                            <defs>
                                <marker id="arrowhead-desk" markerWidth="8" markerHeight="6" refX="7" refY="3" orient="auto">
                                    <polygon points="0 0, 8 3, 0 6" fill="#FF6A00" />
                                </marker>
                            </defs>
                            {desktopPaths.map((arrow, i) => (
                                <g key={i}>
                                    <path d={arrow.d} stroke="#E5E5E5" strokeWidth="2" fill="none" markerEnd="url(#arrowhead-desk)" />
                                    <path d={arrow.d} stroke="#FF6A00" strokeWidth="2.5" fill="none" strokeDasharray="12 20" className="animate-flow" style={{ animationDelay: arrow.delay }} />
                                    <circle r="4" fill="#FF6A00">
                                        <animateMotion dur="2.5s" repeatCount="indefinite" begin={arrow.delay} path={arrow.d} />
                                    </circle>
                                </g>
                            ))}
                        </svg>

                        {/* Center Hub */}
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20">
                            <div className="flex flex-col items-center justify-center">
                                <div className="text-xl font-extrabold text-[#0A0A0A] tracking-tight leading-none mb-1">
                                    Recruitment<span className="text-[#FF6A00]">OS</span>
                                </div>
                                <img src="/logos/robot.webp" alt="RecruitmentOS AI Bot" className="w-32 h-32 object-contain animate-float mix-blend-multiply" />
                            </div>
                        </div>

                        {/* Feature Cards positioned absolutely around center */}
                        {features.map((feature, i) => {
                            const positionClasses = ['top-0 left-0', 'top-0 right-0', 'bottom-0 left-0', 'bottom-0 right-0'];
                            const placement: 'top' | 'bottom' = i < 2 ? 'bottom' : 'top';
                            const align: 'left' | 'right' = i % 2 === 1 ? 'right' : 'left';
                            return (
                                <div key={feature.label} className={`absolute ${positionClasses[i]} z-20 w-[180px] lg:w-[220px] group`}>
                                    <div className="relative bg-white border border-[#E5E5E5] rounded-[1.5rem] p-5 shadow-[0_4px_16px_rgba(0,0,0,0.04)] cursor-default hover:shadow-xl hover:border-[#FF6A00]/40 transition-all duration-300 flex items-center gap-3 group-hover:-translate-y-0.5">
                                        <div className="w-11 h-11 rounded-2xl bg-[#FFF4EB] flex items-center justify-center text-[#FF6A00] shrink-0 group-hover:scale-110 transition-transform">
                                            {feature.icon}
                                        </div>
                                        <span
                                            className="text-[11px] font-bold uppercase tracking-widest text-[#FF6A00] leading-tight"
                                            style={{ fontFamily: 'var(--font-mono)' }}
                                        >
                                            {feature.pill}
                                        </span>
                                    </div>
                                    <DetailPopover feature={feature} placement={placement} align={align} />
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>

            <style jsx>{`
                @keyframes flowDash {
                    0% { stroke-dashoffset: 0; }
                    100% { stroke-dashoffset: -64; }
                }
                .animate-flow {
                    animation: flowDash 1.5s linear infinite;
                }
                @keyframes float {
                    0%, 100% { transform: translateY(0); }
                    50% { transform: translateY(-10px); }
                }
                .animate-float {
                    animation: float 4s ease-in-out infinite;
                }
            `}</style>
        </section>
    );
}
