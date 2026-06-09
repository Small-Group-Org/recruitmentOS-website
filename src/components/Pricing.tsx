'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { pricingPlans, type PricingPlan } from '@/lib/pricing-data';

export default function Pricing() {
    return (
        <section className="bg-white pt-12 pb-24" id="pricing">
            <div className="max-w-[1280px] mx-auto px-6 sm:px-10">

                {/* ── Header ── */}
                <div className="mb-10 sm:mb-12 max-w-3xl">
                    <p className="text-xs font-bold text-[#FF6A00] uppercase tracking-widest mb-3"
                        style={{ fontFamily: 'var(--font-mono)' }}>
                        Pricing
                    </p>
                    <h1 className="text-[#0A0A0A] text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight leading-[1.05] mb-4"
                        style={{ fontFamily: 'var(--font-serif)' }}>
                        Pay for pipeline, not promises.
                    </h1>
                    <p className="text-base sm:text-lg text-[#6B7280] leading-relaxed" style={{ fontFamily: 'var(--font-outfit)' }}>
                        Start with raw leads. Scale to fully-managed BD across email and LinkedIn.
                        Pick your volume on any plan. No lock-in on your data.
                    </p>
                </div>

                {/* ── Plan cards ── */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-stretch">
                    {pricingPlans.map((plan) => (
                        <PlanCard key={plan.id} plan={plan} />
                    ))}
                </div>

                <p className="mt-8 text-[13px] text-[#9CA3AF] text-center" style={{ fontFamily: 'var(--font-outfit)' }}>
                    Managed plans require a 3-month minimum contract.
                </p>

                {/* ── Custom scope CTA ── */}
                <div className="mt-20 sm:mt-28 border-t border-[#E5E5E5] pt-14 sm:pt-20 text-center max-w-2xl mx-auto">
                    <h3 className="text-xl sm:text-2xl font-bold text-[#0A0A0A] mb-3 leading-tight"
                        style={{ fontFamily: 'var(--font-serif)' }}>
                        Need something custom?
                    </h3>
                    <p className="section-sub mb-8 text-[#6B7280]" style={{ fontFamily: 'var(--font-outfit)' }}>
                        20K+ leads per month, multiple seats, custom signal sources, CRM integration,
                        or white-label, let&apos;s build a plan around your agency&apos;s specific BD needs.
                    </p>
                    <Link
                        href="/fit-call"
                        className="inline-flex items-center justify-center bg-[#0A0A0A] text-white px-7 py-4 rounded-full font-semibold hover:bg-[#0A0A0A] transition-colors text-base group"
                        style={{ fontFamily: 'var(--font-outfit)' }}
                        id="pricing-enterprise-cta"
                    >
                        Talk to sales team
                        <svg className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14M12 5l7 7-7 7" />
                        </svg>
                    </Link>
                </div>

            </div>
        </section>
    );
}

// ─── Plan card ────────────────────────────────────────────────────────────────

function PlanCard({ plan }: { plan: PricingPlan }) {
    const [index, setIndex] = useState(plan.defaultIndex);
    const option = plan.options[index];
    const isPopular = plan.highlight;
    const isExternal = plan.cta.href.startsWith('http');

    return (
        <div
            className={`relative rounded-2xl flex flex-col bg-white p-8 transition-all duration-300 ${isPopular
                ? 'border-2 border-[#FF6A00] shadow-[0_8px_40px_-12px_rgba(255,106,0,0.35)] lg:-mt-4 lg:mb-0'
                : 'border border-[#E5E5E5] shadow-sm hover:border-[#D1D5DB]'
                }`}
        >
            {isPopular && (
                <span className="absolute -top-3 left-8 bg-[#FF6A00] text-white text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-full shadow-sm"
                    style={{ fontFamily: 'var(--font-mono)' }}>
                    Most popular
                </span>
            )}

            {/* Category pill */}
            <div className="mb-5">
                <span className="inline-flex items-center gap-1.5 rounded-full bg-[#FFF4EB] text-[#C2511C] text-[11px] font-bold px-3 py-1"
                    style={{ fontFamily: 'var(--font-mono)' }}>
                    <CategoryIcon icon={plan.icon} />
                    {plan.category}
                </span>
            </div>

            {/* Name + tagline */}
            <h2 className="text-[#0A0A0A] text-2xl font-normal tracking-tight mb-2"
                style={{ fontFamily: 'var(--font-serif)' }}>
                {plan.name}
            </h2>
            <p className="text-[13px] leading-relaxed text-[#6B7280] mb-6 min-h-[40px]"
                style={{ fontFamily: 'var(--font-outfit)' }}>
                {plan.tagline}
            </p>

            {/* Price */}
            <div className="mb-5">
                <div className="flex items-baseline gap-1.5 flex-wrap">
                    <span className="text-[44px] leading-none font-normal tracking-tight text-[#0A0A0A]"
                        style={{ fontFamily: 'var(--font-serif)' }}>
                        ${option.price.toLocaleString()}
                    </span>
                    <span className="text-sm text-[#6B7280] font-medium" style={{ fontFamily: 'var(--font-outfit)' }}>
                        {plan.billing === 'one-off' ? 'one-off' : '/mo'}
                    </span>
                </div>
                <p className="text-[12px] text-[#9CA3AF] mt-2" style={{ fontFamily: 'var(--font-outfit)' }}>
                    {`${option.label.replace('/mo', '')} · ${option.detail}`}
                </p>
                {plan.minMonths && (
                    <div className="mt-3 flex items-center gap-2 flex-wrap">
                        <span className="inline-flex items-center gap-1.5 rounded-full border border-[#E5E5E5] bg-[#FAFAFA] text-[#6B7280] text-[11px] font-semibold px-2.5 py-1"
                            style={{ fontFamily: 'var(--font-mono)' }}>
                            <svg className="w-3 h-3 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2.5}>
                                <rect x="3" y="4" width="18" height="18" rx="2" />
                                <path strokeLinecap="round" d="M16 2v4M8 2v4M3 10h18" />
                            </svg>
                            {plan.minMonths}-month minimum
                        </span>
                    </div>
                )}
            </div>

            {/* Volume dropdown */}
            <VolumeDropdown plan={plan} index={index} onSelect={setIndex} />

            {/* Divider */}
            <hr className="border-t border-[#E5E5E5] my-6" />

            {/* Features */}
            <ul className="space-y-3.5 mb-8 flex-1">
                {plan.features.map((feat) => (
                    <li key={feat} className="flex items-start gap-3 text-[13px] font-medium leading-snug">
                        <span className="w-5 h-5 rounded-full bg-[#FF6A00]/10 text-[#FF6A00] flex items-center justify-center shrink-0 mt-0.5">
                            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={3.5}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                            </svg>
                        </span>
                        <span className="text-[#374151]" style={{ fontFamily: 'var(--font-outfit)' }}>{feat}</span>
                    </li>
                ))}
            </ul>

            {/* CTA */}
            <Link
                href={plan.cta.href}
                {...(isExternal ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                className={`block text-center py-3.5 rounded-full text-sm font-bold transition-all duration-300 ${isPopular
                    ? 'bg-[#FF6A00] text-white hover:bg-[#E55F00]'
                    : 'border border-[#0A0A0A] text-[#0A0A0A] hover:bg-[#0A0A0A] hover:text-white'
                    }`}
                style={{ fontFamily: 'var(--font-outfit)' }}
                id={`pricing-card-${plan.id}`}
            >
                {plan.cta.label}
            </Link>
        </div>
    );
}

// ─── Volume dropdown ──────────────────────────────────────────────────────────

function VolumeDropdown({
    plan,
    index,
    onSelect,
}: {
    plan: PricingPlan;
    index: number;
    onSelect: (i: number) => void;
}) {
    const [open, setOpen] = useState(false);
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!open) return;
        function handleClick(e: MouseEvent) {
            if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
        }
        function handleKey(e: KeyboardEvent) {
            if (e.key === 'Escape') setOpen(false);
        }
        document.addEventListener('mousedown', handleClick);
        document.addEventListener('keydown', handleKey);
        return () => {
            document.removeEventListener('mousedown', handleClick);
            document.removeEventListener('keydown', handleKey);
        };
    }, [open]);

    return (
        <div className="relative" ref={ref}>
            <button
                type="button"
                onClick={() => setOpen((v) => !v)}
                aria-haspopup="listbox"
                aria-expanded={open}
                className="w-full flex items-center justify-between gap-2 px-4 py-3 rounded-xl border border-[#E5E5E5] bg-white text-left text-sm font-semibold text-[#0A0A0A] hover:border-[#D1D5DB] transition-colors"
                style={{ fontFamily: 'var(--font-outfit)' }}
            >
                <div className="flex flex-col items-start gap-0">
                    <span>{plan.options[index].label}</span>
                </div>
                <svg
                    className={`w-4 h-4 text-[#9CA3AF] shrink-0 transition-transform ${open ? 'rotate-180' : ''}`}
                    fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2.5}
                >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                </svg>
            </button>

            {open && (
                <ul
                    role="listbox"
                    className="absolute z-20 mt-2 w-full rounded-xl border border-[#E5E5E5] bg-white shadow-lg overflow-hidden py-1"
                >
                    {plan.options.map((opt, i) => (
                        <li key={opt.leads} role="option" aria-selected={i === index}>
                            <button
                                type="button"
                                onClick={() => {
                                    onSelect(i);
                                    setOpen(false);
                                }}
                                className={`w-full flex items-center justify-between gap-3 px-4 py-2.5 text-left text-sm transition-colors ${i === index
                                    ? 'bg-[#FFF4EB] text-[#C2511C] font-bold'
                                    : 'text-[#374151] hover:bg-[#FAFAFA]'
                                    }`}
                                style={{ fontFamily: 'var(--font-outfit)' }}
                            >
                                <div className="flex flex-col items-start gap-0.5 text-left">
                                    <span>{opt.label}</span>
                                    <span className={`text-[10px] font-normal ${i === index ? 'text-[#C2511C]/80' : 'text-[#9CA3AF]'}`}>
                                        {opt.detail}
                                    </span>
                                </div>
                                <span className={`text-[12px] font-semibold ${i === index ? 'text-[#C2511C]' : 'text-[#9CA3AF]'}`}>
                                    ${opt.price.toLocaleString()}{plan.billing === 'monthly' ? '/mo' : ''}
                                </span>
                            </button>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}

// ─── Category icons ───────────────────────────────────────────────────────────

function CategoryIcon({ icon }: { icon: PricingPlan['icon'] }) {
    const cls = 'w-3 h-3';
    if (icon === 'data') {
        return (
            <svg className={cls} fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                <ellipse cx="12" cy="5" rx="8" ry="3" />
                <path strokeLinecap="round" d="M4 5v6c0 1.66 3.58 3 8 3s8-1.34 8-3V5M4 11v6c0 1.66 3.58 3 8 3s8-1.34 8-3v-6" />
            </svg>
        );
    }
    if (icon === 'mail') {
        return (
            <svg className={cls} fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                <rect x="3" y="5" width="18" height="14" rx="2" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 7l9 6 9-6" />
            </svg>
        );
    }
    // network / multichannel
    return (
        <svg className={cls} fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
            <circle cx="6" cy="6" r="2.5" />
            <circle cx="18" cy="6" r="2.5" />
            <circle cx="12" cy="18" r="2.5" />
            <path strokeLinecap="round" d="M7.7 7.7l3 7.5M16.3 7.7l-3 7.5" />
        </svg>
    );
}
