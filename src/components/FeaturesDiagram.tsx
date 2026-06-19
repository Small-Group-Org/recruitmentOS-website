'use client';

import React, { useEffect, useRef, useState } from 'react';

const features = [
    {
        id: 'sourcing',
        step: '01',
        pill: 'Signal-Triggered Sourcing',
        title: 'We spot hiring before your competitors do',
        body: 'We monitor live job boards, LinkedIn, and hiring signals across your target sectors — surfacing roles in your niche the moment demand appears, often before the job post goes live.',
        icon: (
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
        ),
    },
    {
        id: 'companies',
        step: '02',
        pill: 'Identify Hiring Companies',
        title: 'Pinpoint the companies actually hiring',
        body: "We map every company actively hiring for those roles — including stealth hiring signals — so your outreach only ever targets companies with a live, current need.",
        icon: (
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-4 8v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
            </svg>
        ),
    },
    {
        id: 'decision-maker',
        step: '03',
        pill: 'Find the Hiring Manager',
        title: 'Reach the decision-maker, not HR',
        body: 'Waterfall enrichment across 20+ sources surfaces the direct contact of the actual hiring manager — the person who owns the budget. Every contact is email- and phone-verified.',
        icon: (
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
        ),
    },
    {
        id: 'outreach',
        step: '04',
        pill: 'Outreach & Reply Filtering',
        title: 'Outreach, replies & warm handoff',
        body: 'We run personalised multi-channel sequences on your stack, then filter every reply. Only positive, on-brief replies reach you — ready to close. You step in when they say "yes."',
        icon: (
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
        ),
    },
];

// Straight diagonal paths forming a perfect X through centre (500,300) in a 1000×600 viewBox
// Endpoints shifted ~10% further out to match increased card-to-centre gap
const xPaths = [
    { d: 'M 175,128 L 500,300', delay: '0s',    dur: '1.1s' },  // top-left  → centre
    { d: 'M 825,128 L 500,300', delay: '0.275s', dur: '1.1s' }, // top-right → centre
    { d: 'M 175,472 L 500,300', delay: '0.55s',  dur: '1.1s' }, // bot-left  → centre
    { d: 'M 825,472 L 500,300', delay: '0.825s', dur: '1.1s' }, // bot-right → centre
];

function StepCard({ feature, visible, delay }: { feature: (typeof features)[number]; visible: boolean; delay: string }) {
    return (
        <div
            className="relative rounded-2xl p-5 border transition-all duration-300 hover:-translate-y-1 group flex flex-col"
            style={{
                width: 230,
                height: 230,
                background: 'linear-gradient(145deg, #1e1e1e 0%, #181818 100%)',
                borderColor: '#2d2d2d',
                boxShadow: '0 2px 20px rgba(0,0,0,0.5)',
                overflow: 'hidden',
                opacity: visible ? 1 : 0,
                transform: visible ? 'scale(1)' : 'scale(0.94)',
                transition: `opacity 0.6s ease ${delay}, transform 0.6s ease ${delay}`,
            }}
        >
            {/* Hover orange gradient overlay */}
            <div
                className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                style={{ background: 'linear-gradient(135deg, rgba(255,106,0,0.08) 0%, transparent 55%)', border: '1px solid rgba(255,106,0,0.22)' }}
            />

            {/* Icon badge */}
            <div className="mb-3 shrink-0">
                <div
                    className="w-9 h-9 rounded-xl flex items-center justify-center text-[#FF6A00]"
                    style={{
                        background: 'rgba(255,106,0,0.13)',
                        border: '1px solid rgba(255,106,0,0.22)',
                        boxShadow: '0 0 14px rgba(255,106,0,0.18)',
                    }}
                >
                    {feature.icon}
                </div>
            </div>

            <h3 className="text-[13px] font-bold text-white leading-snug mb-2 shrink-0">{feature.title}</h3>
            <p
                className="text-[11.5px] leading-relaxed flex-1 overflow-hidden"
                style={{
                    color: '#6b7280',
                    display: '-webkit-box',
                    WebkitLineClamp: 5,
                    WebkitBoxOrient: 'vertical',
                    overflow: 'hidden',
                }}
            >
                {feature.body}
            </p>
        </div>
    );
}

function Hub() {
    return (
        <div className="flex flex-col items-center justify-center gap-3 select-none">
            <div className="relative flex items-center justify-center" style={{ width: 160, height: 160 }}>
                {/* Pulse ring */}
                <div
                    className="absolute rounded-full animate-bd-ping"
                    style={{
                        inset: 0,
                        background: 'radial-gradient(circle, rgba(255,106,0,0.10) 0%, transparent 70%)',
                        border: '1px solid rgba(255,106,0,0.14)',
                    }}
                />
                {/* Steady inner ring */}
                <div
                    className="absolute rounded-full"
                    style={{
                        width: 112,
                        height: 112,
                        border: '1px solid rgba(255,106,0,0.28)',
                        boxShadow: '0 0 24px rgba(255,106,0,0.20), inset 0 0 20px rgba(255,106,0,0.06)',
                    }}
                />
                {/* Logo circle */}
                <div
                    className="relative z-10 rounded-full overflow-hidden flex items-center justify-center"
                    style={{
                        width: 88,
                        height: 88,
                        background: '#ffffff',
                        border: '2.5px solid rgba(255,106,0,0.50)',
                        boxShadow: '0 0 32px rgba(255,106,0,0.60), 0 0 64px rgba(255,106,0,0.25)',
                        padding: 5,
                    }}
                >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                        src="/os-logo.png"
                        alt="RecruitmentOS logo"
                        className="w-full h-full object-contain"
                    />
                </div>
            </div>
            <div className="text-center leading-tight">
                <div className="text-[12px] font-bold tracking-wide" style={{ color: '#e5e7eb' }}>
                    Recruitment<span style={{ color: '#FF6A00' }}>OS</span>
                </div>
                <div className="text-[10px] mt-0.5" style={{ color: '#4b5563' }}>one connected engine</div>
            </div>
        </div>
    );
}

export default function FeaturesDiagram() {
    const sectionRef = useRef<HTMLDivElement>(null);
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => { if (entry.isIntersecting) { setVisible(true); observer.disconnect(); } },
            { rootMargin: '80px' }
        );
        if (sectionRef.current) observer.observe(sectionRef.current);
        return () => observer.disconnect();
    }, []);

    return (
        <section
            id="solution-overview"
            ref={sectionRef}
            className="py-20 md:py-28 relative overflow-hidden"
            style={{ background: '#0D0D0D' }}
        >
            {/* Ambient glow */}
            <div
                className="absolute inset-0 pointer-events-none"
                style={{ background: 'radial-gradient(ellipse 60% 50% at 50% 52%, rgba(255,106,0,0.05) 0%, transparent 70%)' }}
            />

            <div className="max-w-[1100px] mx-auto px-4 sm:px-6 relative z-10">

                {/* Heading */}
                <div
                    className="text-center mb-14"
                    style={{
                        opacity: visible ? 1 : 0,
                        transform: visible ? 'translateY(0)' : 'translateY(24px)',
                        transition: 'opacity 0.7s ease, transform 0.7s ease',
                    }}
                >
                    <p
                        className="text-xs font-bold uppercase tracking-widest mb-3"
                        style={{ color: '#FF6A00', fontFamily: 'var(--font-mono)' }}
                    >
                        How the engine runs
                    </p>
                    <h2
                        className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white mb-4"
                        style={{ fontFamily: "'Inter','Helvetica Neue',sans-serif" }}
                    >
                        The BD engine, running in the background.
                    </h2>
                    <p className="max-w-2xl mx-auto text-base" style={{ color: '#6b7280', lineHeight: 1.7 }}>
                        Four steps that turn live hiring signals into warm replies — handled for you, on your stack.
                    </p>
                </div>

                {/* ── Desktop: 4 cards absolutely at corners, hub at centre ── */}
                <div className="hidden md:block relative mx-auto" style={{ height: 580, maxWidth: 920 }}>

                    {/* SVG X-cross connector lines */}
                    <svg
                        viewBox="0 0 920 580"
                        preserveAspectRatio="none"
                        fill="none"
                        className="absolute inset-0 w-full h-full pointer-events-none"
                        style={{ zIndex: 1 }}
                        aria-hidden="true"
                    >
                        <defs>
                            <filter id="bd-glow2" x="-60%" y="-60%" width="220%" height="220%">
                                <feGaussianBlur stdDeviation="3.5" result="blur" />
                                <feMerge>
                                    <feMergeNode in="blur" />
                                    <feMergeNode in="SourceGraphic" />
                                </feMerge>
                            </filter>
                        </defs>

                        {/*
                          × symbol paths — geometrically exact:
                          Container 920×580, cards 230×230, hub at (460, 290).
                          Each line starts at the point where the card→hub diagonal
                          crosses the card's inner-facing edge (right edge for TL/BL,
                          left edge for TR/BR), giving a clean × at the hub.

                          TL card (x:0-230, y:0-230):  right edge (x=230), y = 290 - (460-230)*(290-115)/(460-115) = 173
                          TR card (x:690-920, y:0-230): left edge (x=690), y = 290 - (690-460)*(290-115)/(460-115) = 173
                          BL card (x:0-230, y:350-580): right edge (x=230), y = 290 + (460-230)*(465-290)/(460-115) = 407
                          BR card (x:690-920, y:350-580):left edge (x=690), y = 290 + (690-460)*(465-290)/(460-115) = 407
                        */}
                        {[
                            { d: 'M 460,290 L 230,173', delay: '0s',    dur: '1.0s' }, // centre → TL card edge
                            { d: 'M 460,290 L 690,173', delay: '0.25s', dur: '1.0s' }, // centre → TR card edge
                            { d: 'M 460,290 L 230,407', delay: '0.5s',  dur: '1.0s' }, // centre → BL card edge
                            { d: 'M 460,290 L 690,407', delay: '0.75s', dur: '1.0s' }, // centre → BR card edge
                        ].map((p, i) => (
                            <g key={i}>
                                {/* Dim static base line */}
                                <path d={p.d} stroke="rgba(255,106,0,0.10)" strokeWidth="1.5" />
                                {/* Glowing dash — flows from hub outward */}
                                <path
                                    d={p.d}
                                    stroke="#FF6A00"
                                    strokeWidth="2"
                                    strokeDasharray="8 16"
                                    filter="url(#bd-glow2)"
                                    style={{
                                        animation: `xDash ${p.dur} linear infinite`,
                                        animationDelay: p.delay,
                                    }}
                                />
                            </g>
                        ))}
                    </svg>

                    {/* TOP-LEFT card */}
                    <div className="absolute" style={{ top: 0, left: 0, zIndex: 2 }}>
                        <StepCard feature={features[0]} visible={visible} delay="0.1s" />
                    </div>
                    {/* TOP-RIGHT card */}
                    <div className="absolute" style={{ top: 0, right: 0, zIndex: 2 }}>
                        <StepCard feature={features[1]} visible={visible} delay="0.25s" />
                    </div>
                    {/* BOTTOM-LEFT card */}
                    <div className="absolute" style={{ bottom: 0, left: 0, zIndex: 2 }}>
                        <StepCard feature={features[2]} visible={visible} delay="0.4s" />
                    </div>
                    {/* BOTTOM-RIGHT card */}
                    <div className="absolute" style={{ bottom: 0, right: 0, zIndex: 2 }}>
                        <StepCard feature={features[3]} visible={visible} delay="0.55s" />
                    </div>

                    {/* Centre hub */}
                    <div
                        className="absolute"
                        style={{ top: '50%', left: '50%', transform: 'translate(-50%, -50%)', zIndex: 10 }}
                    >
                        <Hub />
                    </div>
                </div>

                {/* ── Mobile: hub + stacked cards ── */}
                <div className="md:hidden">
                    <div className="flex justify-center mb-10">
                        <Hub />
                    </div>
                    <div className="grid grid-cols-1 gap-4">
                        {features.map((f) => (
                            <StepCard key={f.id} feature={f} visible={visible} delay="0s" />
                        ))}
                    </div>
                </div>
            </div>

            <style>{`
                /* Dashes flow outward: hub → card */
                @keyframes xDash {
                    0%   { stroke-dashoffset: 0; }
                    100% { stroke-dashoffset: -48; }
                }
                /* Slow outer ring pulse */
                @keyframes bd-ping {
                    0%, 100% { transform: scale(1);    opacity: 0.55; }
                    50%       { transform: scale(1.16); opacity: 0.15; }
                }
                .animate-bd-ping {
                    animation: bd-ping 2.6s ease-in-out infinite;
                }
            `}</style>
        </section>
    );
}
