'use client';

import React from 'react';

const features = [
    {
        title: 'Detect Hiring Signals Early',
        description: 'We surface hiring intent 4–8 weeks before the job post goes live',
        icon: (
            <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
        ),
    },
    {
        title: 'Find & Enrich Decision-Makers',
        description: 'Direct email + LinkedIn of the hiring manager, not the HR inbox',
        icon: (
            <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-4.35-4.35M17 11A6 6 0 1 1 5 11a6 6 0 0 1 12 0z" />
            </svg>
        ),
    },
    {
        title: 'Run Multi-Channel BD Outreach',
        description: 'Email + LinkedIn sequences operated daily on your stack',
        icon: (
            <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
        ),
    },
    {
        title: 'Filter Replies, Hand Off Hot Leads',
        description: 'You only see positive-intent replies — nothing else lands in your inbox',
        icon: (
            <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
            </svg>
        ),
    },
];

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
                             {features.map((feature, i) => (
                                <div key={feature.title} className="bg-white border border-[#E5E5E5] rounded-2xl p-4 shadow-[0_4px_16px_rgba(0,0,0,0.04)] z-20">
                                    <div className="w-10 h-10 rounded-xl bg-[#FFF4EB] flex items-center justify-center text-[#FF6A00] mb-3">
                                        {feature.icon}
                                    </div>
                                    <h4 className="text-sm font-bold text-[#0A0A0A] leading-snug mb-1">{feature.title}</h4>
                                    <p className="text-[10px] text-[#9CA3AF] font-medium leading-tight">{feature.description}</p>
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
                            return (
                                <div key={feature.title} className={`absolute ${positionClasses[i]} z-20 w-[180px] lg:w-[220px] group`}>
                                    <div className="bg-white border border-[#E5E5E5] rounded-[2rem] p-6 shadow-[0_4px_16px_rgba(0,0,0,0.04)] hover:shadow-xl transition-all duration-300">
                                        <div className="w-12 h-12 rounded-2xl bg-[#FFF4EB] flex items-center justify-center text-[#FF6A00] mb-4 group-hover:scale-110 transition-transform">
                                            {feature.icon}
                                        </div>
                                        <h4 className="text-lg font-bold text-[#0A0A0A] leading-tight mb-2">{feature.title}</h4>
                                        <p className="text-sm text-[#9CA3AF] font-medium leading-relaxed">{feature.description}</p>
                                    </div>
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
