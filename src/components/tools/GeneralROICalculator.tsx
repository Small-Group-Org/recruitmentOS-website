'use client';

import { useState, useMemo, useEffect } from 'react';
import { Button, Card } from '@/components/ui';

// Tiers pulled from pricingPlans → Revenue Booster (email plan), matching the pricing page exactly
// Each tier = platformFee (monthly) + leadsCost (one-off leads)
type Tier = {
    name: string;
    leadsLabel: string;
    platformFee: number;   // monthly platform fee
    leadsCost: number;     // one-off leads package
    totalMonthly: number;  // combined cost treated as monthly for ROI calc
    capacityLabel: string;
};

const TIERS: Tier[] = [
    { name: 'Revenue Booster',   leadsLabel: '500 leads/mo',  platformFee: 150,  leadsCost: 45,  totalMonthly: 195,  capacityLabel: '500 leads · 100 emails/day' },
    { name: 'Revenue Booster',   leadsLabel: '3,000 leads/mo',  platformFee: 150,  leadsCost: 210, totalMonthly: 360,  capacityLabel: '3K leads · 500 emails/day' },
    { name: 'Revenue Booster',   leadsLabel: '10,000 leads/mo', platformFee: 250,  leadsCost: 500, totalMonthly: 750,  capacityLabel: '10K leads · 2,000 emails/day' },
];

// Pick tier based on monthly placement target: rough heuristic maps placements → leads needed
// Assumes ~1 placement per ~400–500 leads at average funnel rates
function pickTierFromPlacements(placements: number): Tier | null {
    if (!isFinite(placements) || placements <= 0) return null;
    if (placements <= 1)  return TIERS[0]; // ~500 leads
    if (placements <= 7)  return TIERS[1]; // ~3,000 leads
    if (placements <= 25) return TIERS[2]; // ~10,000 leads
    return null; // above 25 → enterprise, prompt to call
}

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

    const tier = useMemo(() => pickTierFromPlacements(placements), [placements]);

    const calc = useMemo(() => {
        const manualCost = hours * hourly;
        if (!tier) {
            return { manualCost, savings: 0, roi: 0, paybackDays: 0 };
        }
        const savings = manualCost - tier.totalMonthly;
        const monthlyRevenue = placements * fee;
        const roi = monthlyRevenue > 0 ? monthlyRevenue / tier.totalMonthly : 0;
        const paybackDays = monthlyRevenue > 0 ? (tier.totalMonthly / monthlyRevenue) * 30 : 0;
        return { manualCost, savings, roi, paybackDays };
    }, [tier, fee, placements, hours, hourly]);


    return (
        <Card as="section" padding="lg">
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
                    {!tier && placements === 0 && (
                        <EmptyState message="Adjust your inputs to see your price." />
                    )}

                    {!tier && placements > 25 && (
                        <EmptyState
                            title="You're above the standard tiers."
                            message="Custom volume — talk to Tushar to scope a bespoke retainer."
                            cta
                        />
                    )}

                    {tier && (
                        <>
                            <p className="text-[10px] font-bold uppercase tracking-widest text-[#FF6A00] mb-2">Recommended plan</p>

                            {/* Plan name + capacity */}
                            <div className="inline-flex items-center gap-2 bg-[#FF6A00]/10 border border-[#FF6A00]/30 rounded-full px-3 py-1 mb-4">
                                <span className="w-1.5 h-1.5 rounded-full bg-[#FF6A00]" />
                                <span className="text-xs font-bold text-[#FF6A00]">{tier.name} · {tier.capacityLabel}</span>
                            </div>

                            {/* Price split */}
                            <div className="mb-5">
                                <p className="text-[10px] uppercase tracking-widest opacity-50 mb-1">Your monthly cost</p>
                                <div className="flex items-baseline gap-1.5 flex-wrap">
                                    <span className="text-4xl font-black tracking-tight">${tier.platformFee}<span className="text-lg font-semibold opacity-50">/mo</span></span>
                                    <span className="text-base font-bold opacity-40">+</span>
                                    <span className="text-4xl font-black tracking-tight">${tier.leadsCost}<span className="text-lg font-semibold opacity-50"> leads</span></span>
                                </div>
                                <p className="text-[10px] opacity-40 mt-1">Platform fee (monthly) + one-off leads package</p>
                            </div>

                            <div className="grid grid-cols-3 gap-3 mb-5">
                                <Stat label="Savings / mo" value={formatCurrency(calc.savings)} hint="vs manual cost" />
                                <Stat label="ROI" value={`${calc.roi.toFixed(1)}×`} hint="revenue / retainer" />
                                <Stat label="Payback" value={`${Math.max(1, Math.round(calc.paybackDays))}d`} hint="from one placement" />
                            </div>

                            <Button href="/fit-call" fullWidth>
                                Book a fit call to walk through your numbers →
                            </Button>
                        </>
                    )}
                </div>
            </div>
        </Card>
    );
}

function EmptyState({ title, message, cta }: { title?: string; message: string; cta?: boolean }) {
    return (
        <div className="text-center py-8">
            {title && <p className="text-2xl font-bold mb-3">{title}</p>}
            <p className="text-base font-medium opacity-80 mb-6">{message}</p>
            {cta && (
                <Button href="/fit-call">
                    Talk to Tushar →
                </Button>
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
