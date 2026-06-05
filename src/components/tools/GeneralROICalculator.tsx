'use client';

import { useState, useMemo, useEffect } from 'react';
import Link from 'next/link';
import { pickBracket } from '@/lib/pricing-data';

type Props = {
    /** When true, removes the gate-language hint — used on /pricing where there's no email gate. */
    embedded?: boolean;
    /** Initial placements value (for prefill from URL params or pricing page state). */
    initialPlacements?: number;
    /** Initial fee value. */
    initialFee?: number;
    /** Fires when the placements input changes — lets /pricing highlight the matching bracket card live. */
    onPlacementsChange?: (n: number) => void;
};

function formatCurrency(n: number): string {
    if (!isFinite(n) || n <= 0) return '—';
    return `$${Math.round(n).toLocaleString()}`;
}

export default function GeneralROICalculator({ embedded = false, initialPlacements = 4, initialFee = 10000, onPlacementsChange }: Props) {
    const [fee, setFee] = useState(initialFee);
    const [placements, setPlacements] = useState(initialPlacements);
    const [hours, setHours] = useState(84);
    const [hourly, setHourly] = useState(10);

    useEffect(() => {
        onPlacementsChange?.(placements);
    }, [placements, onPlacementsChange]);

    const bracket = useMemo(() => pickBracket(placements), [placements]);

    const calc = useMemo(() => {
        const manualCost = hours * hourly;
        if (!bracket) {
            return { manualCost, savings: 0, roi: 0, paybackDays: 0 };
        }
        const savings = manualCost - bracket.monthlyUsd;
        const monthlyRevenue = placements * fee;
        const roi = monthlyRevenue > 0 ? monthlyRevenue / bracket.monthlyUsd : 0;
        const paybackDays = monthlyRevenue > 0 ? (bracket.monthlyUsd / monthlyRevenue) * 30 : 0;
        return { manualCost, savings, roi, paybackDays };
    }, [bracket, fee, placements, hours, hourly]);

    return (
        <section className="bg-white border border-[#E5E5E5] rounded-2xl p-6 sm:p-10">
            <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.1fr] gap-8 lg:gap-12">

                {/* Inputs */}
                <div className="space-y-5">
                    <h3 className="text-sm font-bold uppercase tracking-widest text-[#FF6A00] mb-2">Your inputs</h3>
                    <NumberField label="Average placement fee" prefix="$" value={fee} setValue={setFee} step={500} min={0} />
                    <SliderField
                        label="Placements per month (target)"
                        value={placements}
                        setValue={setPlacements}
                        min={0}
                        max={30}
                        step={1}
                    />
                    <NumberField label="Hours/month you spend on prospecting" value={hours} setValue={setHours} step={4} min={0} max={400} />
                    <NumberField label="Hourly cost of that time" prefix="$" value={hourly} setValue={setHourly} step={1} min={0} />
                    {!embedded && (
                        <p className="text-xs text-[#9CA3AF] font-medium mt-2">
                            Defaults from Sheet 1: $10,000 placement fee · 84 hrs/mo at $10/hr.
                        </p>
                    )}
                </div>

                {/* Outcome card */}
                <div className="bg-[#0A0A0A] rounded-2xl p-6 sm:p-8 text-white">
                    {!bracket && placements === 0 && (
                        <EmptyState message="Adjust your inputs to see your price." />
                    )}

                    {!bracket && placements > 25 && (
                        <EmptyState
                            title="You're above the Pro bracket."
                            message="Custom volume — talk to Tushar to scope a bespoke retainer."
                            cta
                        />
                    )}

                    {bracket && (
                        <>
                            <p className="text-xs font-bold uppercase tracking-widest text-[#FF6A00] mb-2">Your monthly price</p>
                            <p className="text-5xl sm:text-6xl font-black tracking-tighter leading-none mb-3">
                                {formatCurrency(bracket.monthlyUsd)}<span className="text-2xl font-bold opacity-60">/mo</span>
                            </p>
                            <div className="inline-flex items-center gap-2 bg-[#FF6A00]/10 border border-[#FF6A00]/30 rounded-full px-3 py-1 mb-6">
                                <span className="w-1.5 h-1.5 rounded-full bg-[#FF6A00]" />
                                <span className="text-xs font-bold text-[#FF6A00]">You're in the {bracket.name} bracket · {bracket.capacityLabel}</span>
                            </div>

                            <div className="grid grid-cols-3 gap-3 mb-6">
                                <Stat label="Savings / mo" value={formatCurrency(calc.savings)} hint="vs manual cost" />
                                <Stat label="ROI" value={`${calc.roi.toFixed(1)}×`} hint="revenue / retainer" />
                                <Stat label="Payback" value={`${Math.max(1, Math.round(calc.paybackDays))}d`} hint="from one placement" />
                            </div>

                            <Link
                                href="/fit-call"
                                className="block w-full text-center py-3 rounded-xl text-sm font-bold bg-[#FF6A00] text-white hover:bg-[#E55F00] transition-colors"
                            >
                                Book a fit call to walk through your numbers →
                            </Link>
                        </>
                    )}
                </div>
            </div>
        </section>
    );
}

function EmptyState({ title, message, cta }: { title?: string; message: string; cta?: boolean }) {
    return (
        <div className="text-center py-8">
            {title && <p className="text-2xl font-bold mb-3">{title}</p>}
            <p className="text-base font-medium opacity-80 mb-6">{message}</p>
            {cta && (
                <Link
                    href="/fit-call"
                    className="inline-block py-3 px-6 rounded-xl text-sm font-bold bg-[#FF6A00] text-white hover:bg-[#E55F00] transition-colors"
                >
                    Talk to Tushar →
                </Link>
            )}
        </div>
    );
}

function NumberField({ label, prefix, value, setValue, step = 1, min, max }: { label: string; prefix?: string; value: number; setValue: (n: number) => void; step?: number; min?: number; max?: number }) {
    return (
        <label className="block">
            <span className="block text-xs font-bold uppercase tracking-widest text-[#0A0A0A] mb-2">{label}</span>
            <div className="relative">
                {prefix && (
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[#9CA3AF] font-medium pointer-events-none">{prefix}</span>
                )}
                <input
                    type="number"
                    value={value}
                    onChange={(e) => setValue(Number(e.target.value))}
                    step={step}
                    min={min}
                    max={max}
                    className={`w-full ${prefix ? 'pl-8' : 'pl-4'} pr-4 py-3 bg-[#FAFAFA] border border-[#E5E5E5] rounded-lg text-[#0A0A0A] focus:outline-none focus:border-[#0A0A0A] focus:bg-white transition-colors text-base font-medium`}
                />
            </div>
        </label>
    );
}

function SliderField({ label, value, setValue, min, max, step = 1 }: { label: string; value: number; setValue: (n: number) => void; min: number; max: number; step?: number }) {
    return (
        <label className="block">
            <span className="flex items-center justify-between text-xs font-bold uppercase tracking-widest text-[#0A0A0A] mb-2">
                <span>{label}</span>
                <span className="text-[#FF6A00] font-mono">{value}</span>
            </span>
            <input
                type="range"
                value={value}
                onChange={(e) => setValue(Number(e.target.value))}
                min={min}
                max={max}
                step={step}
                className="w-full accent-[#FF6A00]"
            />
        </label>
    );
}

function Stat({ label, value, hint }: { label: string; value: string; hint?: string }) {
    return (
        <div className="bg-white/10 border border-white/10 rounded-lg p-3">
            <p className="text-[10px] font-bold uppercase tracking-widest opacity-70 mb-1">{label}</p>
            <p className="text-xl font-bold leading-tight">{value}</p>
            {hint && <p className="text-[10px] opacity-60 mt-0.5">{hint}</p>}
        </div>
    );
}
