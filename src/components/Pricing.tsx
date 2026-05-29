'use client';

import { useState } from 'react';
import Link from 'next/link';
import LeadCostCalculator from '@/components/tools/LeadCostCalculator';
import {
    packages,
    addOns,
    annualRows,
    LEAD_VOLUMES,
    type LeadVolume,
    type PackageId,
} from '@/lib/pricing-data';

const VOLUME_LABELS: Record<LeadVolume, string> = {
    1000: '1,000',
    2500: '2,500',
    5000: '5,000',
    10000: '10,000',
};

export default function Pricing() {
    const [billing, setBilling] = useState<'monthly' | 'annual'>('monthly');
    const [selectedVolume, setSelectedVolume] = useState<LeadVolume>(1000);

    return (
        <section className="bg-white pt-24 pb-32" id="pricing">
            <div className="max-w-[1240px] mx-auto px-6 sm:px-10">

                {/* ── Header ── */}
                <div className="mb-14 sm:mb-20 max-w-3xl">
                    <p className="text-xs font-bold text-[#FF6A00] uppercase tracking-widest mb-3"
                        style={{ fontFamily: 'var(--font-mono)' }}>
                        Pricing
                    </p>
                    <h1 className="text-[#0A0A0A] text-3xl sm:text-5xl md:text-6xl font-bold tracking-tight leading-[1.05] mb-5"
                        style={{ fontFamily: 'var(--font-serif)' }}>
                        Pay for leads, not headcount.
                    </h1>
                    <p className="hero-sub text-[#6B7280]" style={{ fontFamily: 'var(--font-outfit)' }}>
                        Pick your lead volume and package. Starter delivers verified data —
                        Growth adds managed email outreach — Scale adds LinkedIn too.
                        No retainer. No setup fee. Cancel any time.
                    </p>
                </div>

                {/* ── Calculator ── */}
                <div className="mb-20 sm:mb-28">
                    <LeadCostCalculator embedded />
                </div>

                {/* ── Package comparison cards ── */}
                <div className="mb-20 sm:mb-28 border-t border-[#E5E5E5] pt-14 sm:pt-20">
                    <div className="flex flex-col md:flex-row md:items-end gap-6 justify-between mb-12">
                        <div>
                            <p className="text-xs font-bold text-[#FF6A00] uppercase tracking-widest mb-3"
                                style={{ fontFamily: 'var(--font-mono)' }}>
                                Compare packages
                            </p>
                            <h2 className="text-[#0A0A0A] text-2xl sm:text-4xl font-bold tracking-tight leading-tight"
                                style={{ fontFamily: 'var(--font-serif)' }}>
                                Four packages. One pipeline.
                            </h2>
                        </div>

                        {/* Controls Container */}
                        <div className="flex flex-wrap items-center gap-3 shrink-0">
                            {/* Lead Volume Tabs */}
                            <div className="flex items-center bg-[#F4F4F4] rounded-full p-1 gap-1">
                                {LEAD_VOLUMES.map((vol) => (
                                    <button
                                        key={vol}
                                        onClick={() => setSelectedVolume(vol)}
                                        className={`px-3 py-1.5 rounded-full text-xs font-bold uppercase transition-all ${
                                            selectedVolume === vol
                                                ? 'bg-[#0A0A0A] text-white shadow-sm'
                                                : 'text-[#6B7280] hover:text-[#0A0A0A]'
                                        }`}
                                        style={{ fontFamily: 'var(--font-mono)' }}
                                    >
                                        {VOLUME_LABELS[vol]}
                                    </button>
                                ))}
                            </div>

                            {/* Billing toggle */}
                            <div className="flex items-center bg-[#F4F4F4] rounded-full p-1 gap-1">
                                {(['monthly', 'annual'] as const).map((b) => (
                                    <button
                                        key={b}
                                        onClick={() => setBilling(b)}
                                        className={`px-4 py-1.5 rounded-full text-xs font-bold uppercase transition-all ${
                                            billing === b
                                                ? 'bg-[#0A0A0A] text-white shadow-sm'
                                                : 'text-[#6B7280] hover:text-[#0A0A0A]'
                                        }`}
                                        style={{ fontFamily: 'var(--font-mono)' }}
                                    >
                                        {b === 'annual' ? 'Annual −17%' : 'Monthly'}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">
                        {packages.map((pkg) => (
                            <PackageCard
                                key={pkg.id}
                                pkg={pkg}
                                billing={billing}
                                selectedVolume={selectedVolume}
                            />
                        ))}
                    </div>

                    <p className="mt-8 text-[12px] text-[#9CA3AF] text-center" style={{ fontFamily: 'var(--font-outfit)' }}>
                        All prices in USD. Email + LinkedIn verified contacts included in every package.
                        Phone numbers available as add-on (+$320 / 1K leads).
                    </p>
                </div>

                {/* ── Annual prepay strip ── */}
                <div className="mb-20 sm:mb-28 border-t border-[#E5E5E5] pt-14 sm:pt-20">
                    <div className="mb-10">
                        <p className="text-xs font-bold text-[#FF6A00] uppercase tracking-widest mb-3"
                            style={{ fontFamily: 'var(--font-mono)' }}>
                            Annual prepay
                        </p>
                        <h2 className="text-[#0A0A0A] text-2xl sm:text-3xl font-bold tracking-tight mb-2"
                            style={{ fontFamily: 'var(--font-serif)' }}>
                            Pay 10 months, get 12 free.
                        </h2>
                        <p className="section-sub max-w-xl text-[#6B7280]" style={{ fontFamily: 'var(--font-outfit)' }}>
                            Lock in your volume commitment for 12 months and save the equivalent
                            of two months — paid upfront.
                        </p>
                    </div>

                    <div className="rounded-2xl border border-[#E5E5E5] overflow-hidden bg-white shadow-sm">
                        {/* Header */}
                        <div className="grid grid-cols-4 bg-[#0A0A0A] text-white text-[10px] font-bold uppercase tracking-widest"
                            style={{ fontFamily: 'var(--font-mono)' }}>
                            <div className="px-5 py-4 text-[#9CA3AF]">Package</div>
                            <div className="px-5 py-4">Volume</div>
                            <div className="px-5 py-4">Monthly</div>
                            <div className="px-5 py-4 text-green-400">Annual (save)</div>
                        </div>
                        {annualRows.map((row, i) => (
                            <div
                                key={row.packageName}
                                className={`grid grid-cols-4 border-t border-[#E5E5E5] ${i === 1 ? 'bg-[#FFF9F4]' : 'bg-white'}`}
                            >
                                <div className="px-5 py-4 text-sm font-bold text-[#0A0A0A]"
                                    style={{ fontFamily: 'var(--font-outfit)' }}>
                                    {row.packageName}
                                </div>
                                <div className="px-5 py-4 text-sm text-[#6B7280] font-medium"
                                    style={{ fontFamily: 'var(--font-outfit)' }}>
                                    {row.volume}
                                </div>
                                <div className="px-5 py-4 text-sm text-[#374151] font-medium"
                                    style={{ fontFamily: 'var(--font-outfit)' }}>
                                    ${row.monthly.toLocaleString()}/mo
                                </div>
                                <div className="px-5 py-4 text-sm font-bold text-green-600"
                                    style={{ fontFamily: 'var(--font-outfit)' }}>
                                    ${row.annual.toLocaleString()}/yr
                                    <span className="text-[11px] font-medium text-green-500 ml-1">
                                        (save ~${(row.monthly * 12 - row.annual).toLocaleString()})
                                    </span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* ── Add-ons ── */}
                <div className="mb-20 sm:mb-28 border-t border-[#E5E5E5] pt-14 sm:pt-20">
                    <div className="mb-10">
                        <p className="text-xs font-bold text-[#FF6A00] uppercase tracking-widest mb-3"
                            style={{ fontFamily: 'var(--font-mono)' }}>
                            Add-ons
                        </p>
                        <h2 className="text-[#0A0A0A] text-2xl sm:text-3xl font-bold tracking-tight"
                            style={{ fontFamily: 'var(--font-serif)' }}>
                            Extend any package.
                        </h2>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                        {addOns.map((addon) => (
                            <div
                                key={addon.label}
                                className="flex items-start gap-4 bg-[#FAFAFA] border border-[#E5E5E5] rounded-2xl p-5 hover:border-[#FF6A00]/30 transition-colors shadow-sm"
                            >
                                <span className="text-[#FF6A00] font-black text-xl leading-none mt-0.5 shrink-0">+</span>
                                <div className="min-w-0">
                                    <p className="text-sm font-bold text-[#0A0A0A] mb-0.5"
                                        style={{ fontFamily: 'var(--font-outfit)' }}>
                                        {addon.label}
                                    </p>
                                    {addon.note && (
                                        <p className="text-[11px] text-[#9CA3AF] mb-1.5"
                                            style={{ fontFamily: 'var(--font-outfit)' }}>
                                            {addon.note}
                                        </p>
                                    )}
                                    <p className="text-sm font-black text-[#FF6A00]"
                                        style={{ fontFamily: 'var(--font-mono)' }}>
                                        {addon.price}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* ── Bottom CTA ── */}
                <div className="border-t border-[#E5E5E5] pt-14 sm:pt-20 text-center max-w-2xl mx-auto">
                    <h3 className="text-xl sm:text-2xl font-bold text-[#0A0A0A] mb-3 leading-tight"
                        style={{ fontFamily: 'var(--font-serif)' }}>
                        Need a custom scope?
                    </h3>
                    <p className="section-sub mb-8 text-[#6B7280]" style={{ fontFamily: 'var(--font-outfit)' }}>
                        Multi-region campaigns, 50K+ leads/month, white-label delivery, or ATS
                        integration? We scope Enterprise on the fit call.
                    </p>
                    <Link
                        href="/fit-call"
                        className="inline-flex items-center justify-center bg-[#0A0A0A] text-white px-7 py-4 rounded-full font-semibold hover:bg-[#222] transition-colors text-base group"
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

// ─── Package card ─────────────────────────────────────────────────────────────

interface PackageCardProps {
    pkg: (typeof packages)[number];
    billing: 'monthly' | 'annual';
    selectedVolume: LeadVolume;
}

function PackageCard({
    pkg,
    billing,
    selectedVolume,
}: PackageCardProps) {
    const isEnterprise = pkg.id === 'enterprise';
    const isDark = pkg.highlight; // "Growth" is highlighted as the dark card

    const price = isEnterprise ? null : (billing === 'annual' ? pkg.annualPrices[selectedVolume] : pkg.prices[selectedVolume]);

    return (
        <div
            className={`relative rounded-3xl flex flex-col overflow-hidden transition-all duration-300 shadow-sm ${
                isDark
                    ? 'bg-[#0A0A0A] text-white border-0 ring-4 ring-[#FF6A00]/20 scale-102 z-10'
                    : 'bg-white text-[#0A0A0A] border border-[#E5E5E5]'
            }`}
        >
            <div className="p-8 flex flex-col flex-1">
                {/* Header Name & Badges */}
                <div className="flex items-center justify-between mb-4 flex-wrap gap-2">
                    <div className="flex items-center gap-2">
                        <span className={`text-xl font-normal`}
                            style={{ fontFamily: 'var(--font-serif)' }}>
                            {pkg.name}
                        </span>
                    </div>
                    {isDark && (
                        <span className="bg-[#FF6A00] text-white text-[9px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full">
                            Spring Offer
                        </span>
                    )}
                </div>

                {/* Subtitle / Tagline */}
                <p className={`text-xs leading-relaxed mb-6 ${isDark ? 'text-[#9CA3AF]' : 'text-[#6B7280]'}`}
                    style={{ fontFamily: 'var(--font-outfit)' }}>
                    {pkg.tagline}
                </p>

                {/* Big Price Display */}
                {isEnterprise ? (
                    <div className="mb-6 flex-1 flex flex-col justify-start items-start">
                        <div className="flex items-baseline gap-1 mb-1">
                            <span className="text-4xl sm:text-[44px] font-normal tracking-tight" style={{ fontFamily: 'var(--font-serif)' }}>
                                Custom
                            </span>
                        </div>
                        <p className={`text-xs ${isDark ? 'text-[#9CA3AF]' : 'text-[#6B7280]'}`} style={{ fontFamily: 'var(--font-outfit)' }}>
                            Unlimited credits, SLA
                        </p>
                    </div>
                ) : (
                    <div className="mb-6 flex-1 flex flex-col justify-start items-start">
                        <div className="flex items-baseline gap-1 mb-1">
                            <span className="text-4xl sm:text-[44px] font-normal tracking-tight" style={{ fontFamily: 'var(--font-serif)' }}>
                                ${price != null ? price.toLocaleString() : '—'}
                            </span>
                            <span className={`text-xs ml-1 ${isDark ? 'text-[#9CA3AF]' : 'text-[#6B7280]'}`} style={{ fontFamily: 'var(--font-outfit)' }}>
                                {billing === 'annual' ? '/yr' : '/mo'}
                            </span>
                        </div>
                        <p className={`text-xs ${isDark ? 'text-[#9CA3AF]' : 'text-[#6B7280]'}`} style={{ fontFamily: 'var(--font-outfit)' }}>
                            {VOLUME_LABELS[selectedVolume]} leads / month
                        </p>
                    </div>
                )}

                {/* Features Bullets List */}
                <ul className="space-y-3.5 mb-8 flex-1">
                    {pkg.includes.map((item) => (
                        <li key={item} className="flex items-start gap-3 text-[13px] font-medium leading-snug">
                            {isDark ? (
                                <span className="w-5 h-5 rounded-full bg-[#FF6A00] text-white flex items-center justify-center shrink-0 mt-0.5 shadow-sm">
                                    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={3.5}>
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                                    </svg>
                                </span>
                            ) : (
                                <span className="w-5 h-5 rounded-full bg-[#FF6A00]/10 text-[#FF6A00] flex items-center justify-center shrink-0 mt-0.5">
                                    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={3.5}>
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                                    </svg>
                                </span>
                            )}
                            <span className={isDark ? 'text-[#E5E5E5]' : 'text-[#374151]'} style={{ fontFamily: 'var(--font-outfit)' }}>{item}</span>
                        </li>
                    ))}
                </ul>

                {/* CTA Button */}
                {isEnterprise ? (
                    <Link
                        href="/fit-call"
                        className="block text-center py-3.5 rounded-full text-sm font-bold bg-[#0A0A0A] text-white hover:bg-[#222] transition-all duration-300"
                        style={{ fontFamily: 'var(--font-outfit)' }}
                        id="pricing-card-enterprise"
                    >
                        Talk to sales
                    </Link>
                ) : isDark ? (
                    <Link
                        href="https://cal.com/tusharm/30min?user=tusharm"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block text-center py-3.5 rounded-full text-sm font-bold bg-[#FF6A00] text-white hover:bg-[#E55F00] transition-all duration-300"
                        style={{ fontFamily: 'var(--font-outfit)' }}
                        id={`pricing-card-${pkg.id}`}
                    >
                        Get started
                    </Link>
                ) : (
                    <Link
                        href="https://cal.com/tusharm/30min?user=tusharm"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block text-center py-3.5 rounded-full text-sm font-bold border border-[#0A0A0A] text-[#0A0A0A] hover:bg-[#0A0A0A] hover:text-white transition-all duration-300"
                        style={{ fontFamily: 'var(--font-outfit)' }}
                        id={`pricing-card-${pkg.id}`}
                    >
                        Get started
                    </Link>
                )}
            </div>
        </div>
    );
}

