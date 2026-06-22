'use client';

import { useEffect, useRef, useState } from 'react';

const phases = [
    {
        number: '01',
        timing: 'Week 0–2',
        label: 'Setup & Foundation',
        description:
            'We run discovery, define your ICP, configure domains, warm up infrastructure, build sequences, and analyse your existing lead data — so day one of outreach hits the ground running.',
        badge: 'Foundation',
        badgeColor: 'rgba(139,92,246,0.15)',
        badgeBorder: 'rgba(139,92,246,0.30)',
        badgeText: '#a78bfa',
    },
    {
        number: '02',
        timing: 'Week 2–3',
        label: 'Campaign Live',
        description:
            'Daily cold email and LinkedIn sequences go live. Outreach is signal-triggered, personalised to each hiring manager. Replies route directly to your inbox — ready to close.',
        badge: 'Active',
        badgeColor: 'rgba(255,106,0,0.12)',
        badgeBorder: 'rgba(255,106,0,0.30)',
        badgeText: '#FF6A00',
    },
    {
        number: '03',
        timing: 'Week 3–4',
        label: 'First Analysis',
        description:
            'We review open and reply rates, run A/B tests on subject lines and copy, and refine targeting based on live data. Every iteration tightens the system.',
        badge: 'Data',
        badgeColor: 'rgba(59,130,246,0.12)',
        badgeBorder: 'rgba(59,130,246,0.30)',
        badgeText: '#60a5fa',
    },
    {
        number: '04',
        timing: 'Month 2–3',
        label: 'Scale & Optimise',
        description:
            'Volume increases, targeting sharpens, and copy stays fresh. Your pipeline grows without adding headcount — the engine compounds on itself.',
        badge: 'Growth',
        badgeColor: 'rgba(26,107,74,0.15)',
        badgeBorder: 'rgba(26,107,74,0.30)',
        badgeText: '#34d399',
    },
    {
        number: '05',
        timing: 'Always',
        label: 'Ongoing',
        description:
            'You close. We keep the pipeline full. Daily outreach continues, signals stay monitored, and the system evolves with your market — indefinitely.',
        badge: 'Permanent',
        badgeColor: 'rgba(255,106,0,0.08)',
        badgeBorder: 'rgba(255,106,0,0.20)',
        badgeText: '#FF6A00',
    },
];

export default function Timeline() {
    const sectionRef = useRef<HTMLDivElement>(null);
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setVisible(true);
                    observer.disconnect();
                }
            },
            { rootMargin: '60px' }
        );
        if (sectionRef.current) observer.observe(sectionRef.current);
        return () => observer.disconnect();
    }, []);

    return (
        <section
            id="how-it-works"
            ref={sectionRef}
            className="py-20 md:py-28 relative overflow-hidden"
            style={{ background: '#0A0A0A' }}
        >
            {/* Ambient top glow */}
            <div
                className="absolute top-0 left-1/2 -translate-x-1/2 pointer-events-none"
                style={{
                    width: 700,
                    height: 280,
                    background:
                        'radial-gradient(ellipse at 50% 0%, rgba(255,106,0,0.07) 0%, transparent 70%)',
                }}
            />

            <div className="max-w-[1100px] mx-auto px-4 sm:px-6 relative z-10">

                {/* Heading */}
                <div
                    className="text-center mb-16"
                    style={{
                        opacity: visible ? 1 : 0,
                        transform: visible ? 'translateY(0)' : 'translateY(20px)',
                        transition: 'opacity 0.6s ease, transform 0.6s ease',
                    }}
                >
                    <p
                        className="text-xs font-bold uppercase tracking-widest mb-3"
                        style={{ color: '#FF6A00', fontFamily: 'var(--font-mono)' }}
                    >
                        How it works
                    </p>
                    <h2
                        className="text-3xl sm:text-4xl font-bold tracking-tight text-white mb-4"
                    >
                        Ready in 7 days. Results by day&nbsp;60.
                    </h2>
                    <p
                        className="max-w-xl mx-auto text-base"
                        style={{ color: '#6b7280', lineHeight: 1.7 }}
                    >
                        Five phases that take you from zero to a self-sustaining pipeline — without lifting a finger on BD.
                    </p>
                </div>

                {/* ── Desktop: horizontal stepper ── */}
                <div className="hidden lg:block">
                    {/* Step number row */}
                    <div className="relative flex items-start justify-between">

                        {/* Connecting line behind the circles */}
                        <div
                            className="absolute top-[22px] left-[22px] right-[22px] h-px pointer-events-none"
                            style={{ background: 'rgba(255,255,255,0.06)', zIndex: 0 }}
                        >
                            {/* Animated orange fill */}
                            <div
                                style={{
                                    position: 'absolute',
                                    inset: 0,
                                    background: 'linear-gradient(90deg, #FF6A00 0%, rgba(255,106,0,0.2) 100%)',
                                    transformOrigin: 'left',
                                    transform: visible ? 'scaleX(1)' : 'scaleX(0)',
                                    transition: 'transform 1.4s cubic-bezier(0.4,0,0.2,1) 0.3s',
                                }}
                            />
                        </div>

                        {phases.map((phase, i) => (
                            <div
                                key={phase.number}
                                className="flex flex-col items-center"
                                style={{
                                    flex: 1,
                                    opacity: visible ? 1 : 0,
                                    transform: visible ? 'translateY(0)' : 'translateY(16px)',
                                    transition: `opacity 0.5s ease ${0.1 + i * 0.12}s, transform 0.5s ease ${0.1 + i * 0.12}s`,
                                }}
                            >
                                {/* Circle */}
                                <div
                                    className="relative z-10 flex items-center justify-center rounded-full text-xs font-bold"
                                    style={{
                                        width: 44,
                                        height: 44,
                                        background: i === 0 ? '#FF6A00' : '#181818',
                                        border: `2px solid ${i === 0 ? '#FF6A00' : 'rgba(255,255,255,0.10)'}`,
                                        color: i === 0 ? '#fff' : '#6b7280',
                                        boxShadow: i === 0 ? '0 0 20px rgba(255,106,0,0.45)' : 'none',
                                        fontFamily: 'var(--font-mono)',
                                        transition: 'all 0.3s ease',
                                    }}
                                >
                                    {phase.number}
                                </div>

                                {/* Timing label */}
                                <p
                                    className="mt-3 text-[11px] font-mono"
                                    style={{ color: '#4b5563' }}
                                >
                                    {phase.timing}
                                </p>
                            </div>
                        ))}
                    </div>

                    {/* Cards row */}
                    <div className="flex items-start justify-between gap-3 mt-6">
                        {phases.map((phase, i) => (
                            <div
                                key={phase.number}
                                className="flex-1 rounded-2xl p-5 group cursor-default"
                                style={{
                                    background: 'linear-gradient(145deg, #161616 0%, #111111 100%)',
                                    border: '1px solid rgba(255,255,255,0.06)',
                                    opacity: visible ? 1 : 0,
                                    transform: visible ? 'translateY(0)' : 'translateY(20px)',
                                    transition: `opacity 0.5s ease ${0.2 + i * 0.12}s, transform 0.5s ease ${0.2 + i * 0.12}s`,
                                    minHeight: 200,
                                    position: 'relative',
                                    overflow: 'hidden',
                                }}
                            >
                                {/* Hover glow overlay */}
                                <div
                                    className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 pointer-events-none"
                                    style={{
                                        background: 'linear-gradient(135deg, rgba(255,106,0,0.06) 0%, transparent 60%)',
                                        border: '1px solid rgba(255,106,0,0.15)',
                                        transition: 'opacity 0.3s ease',
                                    }}
                                />

                                {/* Badge */}
                                <span
                                    className="inline-block text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full mb-3"
                                    style={{
                                        background: phase.badgeColor,
                                        border: `1px solid ${phase.badgeBorder}`,
                                        color: phase.badgeText,
                                        fontFamily: 'var(--font-mono)',
                                    }}
                                >
                                    {phase.badge}
                                </span>

                                {/* Title */}
                                <h3
                                    className="text-[13.5px] font-bold text-white leading-snug mb-2"
                                >
                                    {phase.label}
                                </h3>

                                {/* Description */}
                                <p
                                    className="text-[12px] leading-relaxed"
                                    style={{ color: '#6b7280' }}
                                >
                                    {phase.description}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* ── Mobile: vertical stepper ── */}
                <div className="lg:hidden flex flex-col gap-0">
                    {phases.map((phase, i) => (
                        <div
                            key={phase.number}
                            className="flex gap-5"
                            style={{
                                opacity: visible ? 1 : 0,
                                transform: visible ? 'translateX(0)' : 'translateX(-16px)',
                                transition: `opacity 0.5s ease ${0.1 + i * 0.1}s, transform 0.5s ease ${0.1 + i * 0.1}s`,
                            }}
                        >
                            {/* Spine: circle + line */}
                            <div className="flex flex-col items-center">
                                <div
                                    className="flex items-center justify-center rounded-full text-xs font-bold shrink-0"
                                    style={{
                                        width: 40,
                                        height: 40,
                                        background: i === 0 ? '#FF6A00' : '#181818',
                                        border: `2px solid ${i === 0 ? '#FF6A00' : 'rgba(255,255,255,0.10)'}`,
                                        color: i === 0 ? '#fff' : '#6b7280',
                                        boxShadow: i === 0 ? '0 0 18px rgba(255,106,0,0.40)' : 'none',
                                        fontFamily: 'var(--font-mono)',
                                    }}
                                >
                                    {phase.number}
                                </div>
                                {i < phases.length - 1 && (
                                    <div
                                        className="flex-1 w-px mt-1 mb-1"
                                        style={{
                                            background: 'linear-gradient(180deg, rgba(255,106,0,0.35) 0%, rgba(255,255,255,0.05) 100%)',
                                            minHeight: 32,
                                        }}
                                    />
                                )}
                            </div>

                            {/* Card */}
                            <div
                                className="flex-1 rounded-2xl p-5 mb-4"
                                style={{
                                    background: 'linear-gradient(145deg, #161616 0%, #111111 100%)',
                                    border: '1px solid rgba(255,255,255,0.06)',
                                }}
                            >
                                <div className="flex items-center gap-2 mb-3">
                                    <span
                                        className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full"
                                        style={{
                                            background: phase.badgeColor,
                                            border: `1px solid ${phase.badgeBorder}`,
                                            color: phase.badgeText,
                                            fontFamily: 'var(--font-mono)',
                                        }}
                                    >
                                        {phase.badge}
                                    </span>
                                    <span
                                        className="text-[10px]"
                                        style={{ color: '#4b5563', fontFamily: 'var(--font-mono)' }}
                                    >
                                        {phase.timing}
                                    </span>
                                </div>
                                <h3 className="text-[14px] font-bold text-white mb-2">{phase.label}</h3>
                                <p className="text-[12px] leading-relaxed" style={{ color: '#6b7280' }}>
                                    {phase.description}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Bottom CTA strip */}
                <div
                    className="mt-14 text-center"
                    style={{
                        opacity: visible ? 1 : 0,
                        transition: 'opacity 0.6s ease 0.9s',
                    }}
                >
                    <p className="text-sm" style={{ color: '#4b5563' }}>
                        From kickoff to consistent pipeline in under 60 days.{' '}
                        <a
                            href="#contact"
                            className="font-semibold"
                            style={{ color: '#FF6A00' }}
                        >
                            Start today →
                        </a>
                    </p>
                </div>
            </div>
        </section>
    );
}
