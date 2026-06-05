'use client';

import React from 'react';

const features = [
    {
        step: '01',
        pill: 'Signal-Triggered Sourcing',
        title: 'We spot hiring before your competitors do',
        body: 'We monitor live job boards, LinkedIn, and hiring signals across your target sectors — surfacing roles in your niche the moment demand appears, often before the job post goes live.',
        icon: (
            <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
        ),
    },
    {
        step: '02',
        pill: 'Identify Hiring Companies',
        title: 'Pinpoint the companies actually hiring',
        body: "We map every company actively hiring for those roles — including stealth hiring signals — so your outreach only ever targets companies with a live, current need.",
        icon: (
            <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-4 8v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
            </svg>
        ),
    },
    {
        step: '03',
        pill: 'Find the Hiring Manager',
        title: 'Reach the decision-maker, not HR',
        body: 'Waterfall enrichment across 20+ sources surfaces the direct contact of the actual hiring manager — the person who owns the budget. Every contact is email- and phone-verified.',
        icon: (
            <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
        ),
    },
    {
        step: '04',
        pill: 'Outreach & Reply Filtering',
        title: 'Outreach, replies & warm handoff',
        body: 'We run personalised multi-channel sequences on your stack, then filter every reply. Only positive, on-brief replies reach you — ready to close. You step in when they say "yes."',
        icon: (
            <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
        ),
    },
];

// Detailed step card — full content always visible (no hover).
function StepCard({ feature }: { feature: (typeof features)[number] }) {
    return (
        <div className="relative bg-white border border-[#E5E5E5] rounded-[1.5rem] p-5 shadow-[0_4px_16px_rgba(0,0,0,0.04)] hover:shadow-xl hover:border-[#FF6A00]/40 hover:-translate-y-0.5 transition-all duration-300">
            <span
                className="absolute top-4 right-5 text-xl font-bold text-[#EFEFEF] leading-none"
                style={{ fontFamily: 'var(--font-mono)' }}
            >
                {feature.step}
            </span>
            <div className="flex items-center gap-3 mb-3">
                <div className="w-11 h-11 rounded-2xl bg-[#FFF4EB] flex items-center justify-center text-[#FF6A00] shrink-0">
                    {feature.icon}
                </div>
                <span
                    className="text-[10px] font-bold uppercase tracking-widest text-[#FF6A00] leading-tight pr-6"
                    style={{ fontFamily: 'var(--font-mono)' }}
                >
                    {feature.pill}
                </span>
            </div>
            <h3 className="text-[14px] font-bold text-[#0A0A0A] leading-snug mb-1.5">{feature.title}</h3>
            <p className="text-[12.5px] text-[#6B7280] leading-relaxed">{feature.body}</p>
        </div>
    );
}

// Center hub — robot with soft glow (no muddy blend mode).
function Hub({ size = 'lg' }: { size?: 'lg' | 'sm' }) {
    const robot = size === 'lg' ? 'w-32 h-32' : 'w-24 h-24';
    const wrap = size === 'lg' ? 'w-44 h-44' : 'w-32 h-32';
    return (
        <div className="flex flex-col items-center justify-center">
            <div className={`text-xl font-extrabold text-[#0A0A0A] tracking-tight leading-none mb-1`}>
                Recruitment<span className="text-[#FF6A00]">OS</span>
            </div>
            <div className={`relative flex items-center justify-center ${wrap}`}>
                <div
                    aria-hidden
                    className="absolute inset-0 rounded-full"
                    style={{ background: 'radial-gradient(circle, rgba(255,106,0,0.18) 0%, rgba(255,106,0,0) 66%)' }}
                />
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                    src="/logos/robot.webp"
                    alt="RecruitmentOS AI assistant"
                    className={`relative ${robot} object-contain animate-float`}
                    style={{ filter: 'drop-shadow(0 10px 16px rgba(10,10,10,0.16))' }}
                />
            </div>
        </div>
    );
}

const connectorPaths = [
    { d: 'M500 300 C 380 250, 260 185, 165 155', delay: '0s' },    // top-left
    { d: 'M500 300 C 620 250, 740 185, 835 155', delay: '0.4s' },  // top-right
    { d: 'M500 300 C 380 350, 260 415, 165 445', delay: '0.8s' },  // bottom-left
    { d: 'M500 300 C 620 350, 740 415, 835 445', delay: '1.2s' },  // bottom-right
];

export default function FeaturesDiagram() {
    return (
        <section className="py-12 sm:py-20 md:py-28 bg-white" id="solution-overview">
            <div className="max-w-[1280px] mx-auto px-4 sm:px-6">
                <div className="text-center mb-12 md:mb-16">
                    <p className="text-xs font-semibold uppercase tracking-widest text-[#FF6A00] mb-3">
                        How the engine runs
                    </p>
                    <h2 className="text-[#0A0A0A] text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight">
                        The BD engine, running in the background.
                    </h2>
                    <p className="section-sub max-w-2xl mx-auto mt-3">
                        Four steps that turn live hiring signals into warm replies — handled for you, on your stack.
                    </p>
                </div>

                {/* ── Desktop: animated hub-and-spoke ─────────────────────────── */}
                <div className="hidden md:block relative max-w-[1100px] mx-auto">
                    {/* Animated connector lines (decorative) */}
                    <svg
                        viewBox="0 0 1000 600"
                        preserveAspectRatio="none"
                        fill="none"
                        className="absolute inset-0 w-full h-full pointer-events-none z-0"
                    >
                        {connectorPaths.map((arrow, i) => (
                            <g key={i}>
                                <path d={arrow.d} stroke="#EDEDED" strokeWidth="2" fill="none" />
                                <path
                                    d={arrow.d}
                                    stroke="#FF6A00"
                                    strokeWidth="2.5"
                                    fill="none"
                                    strokeDasharray="12 20"
                                    className="animate-flow"
                                    style={{ animationDelay: arrow.delay }}
                                />
                                <circle r="4" fill="#FF6A00">
                                    <animateMotion dur="2.6s" repeatCount="indefinite" begin={arrow.delay} path={arrow.d} />
                                </circle>
                            </g>
                        ))}
                    </svg>

                    {/* Grid: cards in the four corners, hub centered */}
                    <div className="relative z-10 grid grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)] grid-rows-2 items-center gap-x-10 lg:gap-x-16 gap-y-10">
                        <div className="w-full max-w-[300px]">
                            <StepCard feature={features[0]} />
                        </div>
                        <div className="col-start-2 row-span-2 px-2">
                            <Hub size="lg" />
                        </div>
                        <div className="w-full max-w-[300px] justify-self-end">
                            <StepCard feature={features[1]} />
                        </div>
                        <div className="w-full max-w-[300px]">
                            <StepCard feature={features[2]} />
                        </div>
                        <div className="w-full max-w-[300px] justify-self-end">
                            <StepCard feature={features[3]} />
                        </div>
                    </div>
                </div>

                {/* ── Mobile: hub on top, detailed cards stacked ──────────────── */}
                <div className="md:hidden">
                    <div className="mb-8">
                        <Hub size="sm" />
                    </div>
                    <div className="grid grid-cols-1 gap-4">
                        {features.map((feature) => (
                            <StepCard key={feature.step} feature={feature} />
                        ))}
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
