'use client';

import { useState, useMemo } from 'react';
import { Button } from '@/components/ui';
import { packages, addOns, LEAD_VOLUMES, type LeadVolume, type PackageId } from '@/lib/pricing-data';

type Props = {
    embedded?: boolean;
};

const VOLUME_LABELS: Record<LeadVolume, string> = {
    1000: '1,000',
    2500: '2,500',
    5000: '5,000',
    10000: '10,000',
};

// Phone add-on cost per lead volume
const PHONE_ADDON_COST: Record<LeadVolume, number> = {
    1000: 320,
    2500: 800,
    5000: 1600,
    10000: 3200,
};

export default function LeadCostCalculator({ embedded = false }: Props) {
    const [volume, setVolume] = useState<LeadVolume>(2500);
    const [packageId, setPackageId] = useState<PackageId>('growth');
    const [withPhone, setWithPhone] = useState(false);
    const [billing, setBilling] = useState<'monthly' | 'annual'>('monthly');

    const selectedPkg = useMemo(() => packages.find((p) => p.id === packageId)!, [packageId]);

    const basePrice = useMemo(() => {
        if (packageId === 'enterprise') return null;
        const priceMap = billing === 'annual' ? selectedPkg.annualPrices : selectedPkg.prices;
        return priceMap[volume] ?? null;
    }, [packageId, selectedPkg, volume, billing]);

    const totalPrice = useMemo(() => {
        if (basePrice === null) return null;
        return withPhone ? basePrice + PHONE_ADDON_COST[volume] : basePrice;
    }, [basePrice, withPhone, volume]);

    const costPerLead = useMemo(() => {
        if (totalPrice === null) return null;
        return (totalPrice / volume).toFixed(3);
    }, [totalPrice, volume]);

    const annualSaving = useMemo(() => {
        if (packageId === 'enterprise') return null;
        const monthly = selectedPkg.prices[volume];
        const annual = selectedPkg.annualPrices[volume];
        if (!monthly || !annual) return null;
        return monthly * 12 - annual;
    }, [packageId, selectedPkg, volume]);

    return (
        <div className="bg-white border border-[#E5E5E5] rounded-2xl overflow-hidden">
            {/* Top bar */}
            <div className="bg-[#0A0A0A] px-6 sm:px-8 py-5 flex flex-col sm:flex-row sm:items-center gap-4 justify-between">
                <div>
                    <p className="text-xs font-bold text-[#FF6A00] uppercase tracking-widest mb-0.5"
                        style={{ fontFamily: 'var(--font-mono)' }}>
                        Pricing calculator
                    </p>
                    <p className="text-white font-semibold text-base" style={{ fontFamily: 'var(--font-outfit)' }}>
                        Pick your volume and package — see your price instantly.
                    </p>
                </div>
                {/* Monthly / Annual toggle */}
                <div className="flex items-center bg-white/10 rounded-full p-1 gap-1 self-start sm:self-auto shrink-0">
                    {(['monthly', 'annual'] as const).map((b) => (
                        <button
                            key={b}
                            onClick={() => setBilling(b)}
                            className={`px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest transition-all ${
                                billing === b
                                    ? 'bg-[#FF6A00] text-white'
                                    : 'text-white/60 hover:text-white'
                            }`}
                            style={{ fontFamily: 'var(--font-mono)' }}
                        >
                            {b === 'annual' ? 'Annual (2 mo free)' : 'Monthly'}
                        </button>
                    ))}
                </div>
            </div>

            <div className="p-6 sm:p-8 grid grid-cols-1 lg:grid-cols-[1fr_1.1fr] gap-8 lg:gap-12">

                {/* — Left: inputs — */}
                <div className="space-y-7">

                    {/* Volume selector */}
                    <div>
                        <p className="text-xs font-bold uppercase tracking-widest text-[#0A0A0A] mb-3"
                            style={{ fontFamily: 'var(--font-mono)' }}>
                            Lead volume / campaign
                        </p>
                        <div className="grid grid-cols-4 gap-2">
                            {LEAD_VOLUMES.map((v) => (
                                <button
                                    key={v}
                                    onClick={() => setVolume(v)}
                                    id={`calc-volume-${v}`}
                                    className={`py-2.5 rounded-xl text-sm font-bold border-2 transition-all ${
                                        volume === v
                                            ? 'bg-[#0A0A0A] text-white border-[#0A0A0A]'
                                            : 'bg-white text-[#374151] border-[#E5E5E5] hover:border-[#0A0A0A]'
                                    }`}
                                    style={{ fontFamily: 'var(--font-outfit)' }}
                                >
                                    {VOLUME_LABELS[v]}
                                </button>
                            ))}
                        </div>
                        <p className="text-[11px] text-[#9CA3AF] mt-2">leads per campaign (Email + LinkedIn, verified)</p>
                    </div>

                    {/* Package selector */}
                    <div>
                        <p className="text-xs font-bold uppercase tracking-widest text-[#0A0A0A] mb-3"
                            style={{ fontFamily: 'var(--font-mono)' }}>
                            Package
                        </p>
                        <div className="space-y-2">
                            {packages.filter((p) => p.id !== 'enterprise').map((pkg) => (
                                <button
                                    key={pkg.id}
                                    onClick={() => setPackageId(pkg.id)}
                                    id={`calc-pkg-${pkg.id}`}
                                    className={`w-full flex items-start gap-3 px-4 py-3.5 rounded-xl border-2 text-left transition-all ${
                                        packageId === pkg.id
                                            ? 'border-[#FF6A00] bg-[#FFF4EB]'
                                            : 'border-[#E5E5E5] bg-white hover:border-[#D1D5DB]'
                                    }`}
                                >
                                    <div className="flex-1 min-w-0">
                                        <div className="flex items-center gap-2">
                                            <span className="text-sm font-bold text-[#0A0A0A]"
                                                style={{ fontFamily: 'var(--font-outfit)' }}>
                                                {pkg.name}
                                            </span>
                                            {pkg.highlight && (
                                                <span className="text-[9px] font-bold uppercase tracking-widest bg-[#FF6A00] text-white px-2 py-0.5 rounded-full"
                                                    style={{ fontFamily: 'var(--font-mono)' }}>
                                                    Most popular
                                                </span>
                                            )}
                                        </div>
                                        <p className="text-[11px] text-[#6B7280] mt-0.5 leading-tight"
                                            style={{ fontFamily: 'var(--font-outfit)' }}>
                                            {pkg.tagline}
                                        </p>
                                    </div>
                                    {packageId === pkg.id && pkg.prices[volume] != null && (
                                        <span className="text-sm font-black text-[#FF6A00] shrink-0"
                                            style={{ fontFamily: 'var(--font-outfit)' }}>
                                            ${(billing === 'annual' ? pkg.annualPrices[volume] : pkg.prices[volume])?.toLocaleString()}
                                        </span>
                                    )}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Phone add-on toggle */}
                    <label className="flex items-center gap-3 cursor-pointer group select-none">
                        <div
                            onClick={() => setWithPhone((p) => !p)}
                            className={`relative w-10 h-6 rounded-full transition-colors ${
                                withPhone ? 'bg-[#FF6A00]' : 'bg-[#E5E5E5]'
                            }`}
                        >
                            <span className={`absolute top-1 left-1 w-4 h-4 rounded-full bg-white shadow transition-transform ${
                                withPhone ? 'translate-x-4' : ''
                            }`} />
                        </div>
                        <div>
                            <span className="text-sm font-bold text-[#0A0A0A]"
                                style={{ fontFamily: 'var(--font-outfit)' }}>
                                Add phone numbers
                            </span>
                            <span className="ml-2 text-xs text-[#9CA3AF]">
                                +${PHONE_ADDON_COST[volume].toLocaleString()} for {VOLUME_LABELS[volume]} leads
                            </span>
                        </div>
                    </label>
                </div>

                {/* — Right: output — */}
                <div className="bg-[#0A0A0A] rounded-2xl p-6 sm:p-8 text-white flex flex-col">

                    {packageId === 'enterprise' ? (
                        <div className="flex flex-col items-center justify-center flex-1 text-center py-6">
                            <p className="text-3xl font-black mb-3">Custom</p>
                            <p className="text-white/60 text-sm mb-6 max-w-[240px]">
                                20K–100K+ leads/month, multi-region, white-label, dedicated AM.
                                Typical entry: $5,000–$8,000/mo.
                            </p>
                            <Button href="/fit-call">
                                Talk to us about Enterprise →
                            </Button>
                        </div>
                    ) : (
                        <>
                            <p className="text-xs font-bold uppercase tracking-widest text-[#FF6A00] mb-2"
                                style={{ fontFamily: 'var(--font-mono)' }}>
                                Your price
                            </p>

                            <div className="mb-1">
                                <span className="text-5xl sm:text-6xl font-black tracking-tighter leading-none">
                                    {totalPrice != null ? `$${totalPrice.toLocaleString()}` : '—'}
                                </span>
                                <span className="text-xl font-bold opacity-50 ml-1">
                                    {billing === 'annual' ? '/yr' : '/mo'}
                                </span>
                            </div>

                            {billing === 'annual' && annualSaving != null && (
                                <div className="inline-flex items-center gap-1.5 bg-green-500/10 border border-green-500/20 rounded-full px-3 py-1 mb-4 self-start">
                                    <span className="w-1.5 h-1.5 rounded-full bg-green-400" />
                                    <span className="text-[11px] font-bold text-green-400">
                                        Save ${annualSaving.toLocaleString()} vs monthly
                                    </span>
                                </div>
                            )}

                            <div className="inline-flex items-center gap-2 bg-[#FF6A00]/10 border border-[#FF6A00]/30 rounded-full px-3 py-1 mb-6 self-start mt-2">
                                <span className="w-1.5 h-1.5 rounded-full bg-[#FF6A00]" />
                                <span className="text-xs font-bold text-[#FF6A00]">
                                    {selectedPkg.name} · {VOLUME_LABELS[volume]} leads
                                    {withPhone ? ' + Phone' : ''}
                                </span>
                            </div>

                            {/* Stats row */}
                            <div className="grid grid-cols-3 gap-2 mb-6">
                                <StatBox
                                    label="Cost / lead"
                                    value={costPerLead != null ? `$${costPerLead}` : '—'}
                                    hint="Email + LinkedIn"
                                />
                                <StatBox
                                    label="Email outreach"
                                    value={packageId !== 'starter' ? 'Included' : 'Not incl.'}
                                    hint="via Smartlead"
                                />
                                <StatBox
                                    label="LinkedIn outreach"
                                    value={packageId === 'scale' ? 'Included' : 'Not incl.'}
                                    hint="automated DMs"
                                />
                            </div>

                            {/* What's included */}
                            <div className="mb-6 flex-1">
                                <p className="text-[10px] font-bold uppercase tracking-widest opacity-50 mb-3"
                                    style={{ fontFamily: 'var(--font-mono)' }}>
                                    What&#39;s included
                                </p>
                                <ul className="space-y-2">
                                    {selectedPkg.includes.map((item) => (
                                        <li key={item} className="flex items-start gap-2 text-xs text-white/80">
                                            <span className="text-[#FF6A00] font-bold shrink-0 mt-0.5">✓</span>
                                            <span style={{ fontFamily: 'var(--font-outfit)' }}>{item}</span>
                                        </li>
                                    ))}
                                    {withPhone && (
                                        <li className="flex items-start gap-2 text-xs text-white/80">
                                            <span className="text-[#FF6A00] font-bold shrink-0 mt-0.5">✓</span>
                                            <span style={{ fontFamily: 'var(--font-outfit)' }}>
                                                Phone numbers (Email + Mobile + LinkedIn)
                                            </span>
                                        </li>
                                    )}
                                </ul>
                            </div>

                            <Button
                                href="https://cal.com/tusharm/30min?user=tusharm"
                                target="_blank"
                                rel="noopener noreferrer"
                                fullWidth
                                id="calc-cta"
                            >
                                Book a free strategy call →
                            </Button>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
}

function StatBox({ label, value, hint }: { label: string; value: string; hint?: string }) {
    return (
        <div className="bg-white/8 border border-white/10 rounded-xl p-3">
            <p className="text-[9px] font-bold uppercase tracking-widest opacity-60 mb-1"
                style={{ fontFamily: 'var(--font-mono)' }}>
                {label}
            </p>
            <p className="text-sm font-bold leading-tight" style={{ fontFamily: 'var(--font-outfit)' }}>
                {value}
            </p>
            {hint && (
                <p className="text-[9px] opacity-50 mt-0.5" style={{ fontFamily: 'var(--font-outfit)' }}>
                    {hint}
                </p>
            )}
        </div>
    );
}
