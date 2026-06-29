'use client';

import { useState, useMemo, useEffect } from 'react';
import { Button, Card } from '@/components/ui';
import { pricingPlans } from '@/lib/pricing-data';

// Pick tier index based on monthly placement target: rough heuristic maps placements → leads needed
// Assumes ~1 placement per ~400–500 leads at average funnel rates
function pickOptionIndexFromPlacements(placements: number): number | null {
    if (!isFinite(placements) || placements <= 0) return null;
    if (placements <= 1)  return 0; // ~500 leads
    if (placements <= 7)  return 1; // ~3,000 leads
    if (placements <= 25) return 2; // ~10,000 leads
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
    if (!isFinite(n)) return '—';
    const abs = Math.abs(n);
    const formatted = `$${Math.round(abs).toLocaleString()}`;
    return n < 0 ? `-${formatted}` : formatted;
}

export default function GeneralROICalculator({ embedded = false, initialPlacements = 4, initialFee = 10000, onPlacementsChange }: Props) {
    const [fee, setFee] = useState(initialFee);
    const [placements, setPlacements] = useState(initialPlacements);
    const [hours, setHours] = useState(84);
    const [hourly, setHourly] = useState(10);
    const [activePlanId, setActivePlanId] = useState<string>('email');

    useEffect(() => {
        onPlacementsChange?.(placements);
    }, [placements, onPlacementsChange]);

    const optionIndex = useMemo(() => pickOptionIndexFromPlacements(placements), [placements]);

    const planData = useMemo(() => {
        const activePlan = pricingPlans.find(p => p.id === activePlanId);
        const leadsPlan = pricingPlans.find(p => p.id === 'leads');
        
        if (!activePlan || optionIndex === null || optionIndex >= activePlan.options.length) {
            return null;
        }

        const activeOption = activePlan.options[optionIndex];
        const leadsOption = leadsPlan?.options[optionIndex];

        const totalCost = activeOption.price;
        const leadsCost = leadsOption ? leadsOption.price : totalCost;
        const platformFee = activePlanId === 'leads' ? 0 : totalCost - leadsCost;

        // Build a display capacity label
        // E.g. "Growth Seed" (data only) uses option.label, others use detailed option.detail
        const capacityLabel = activePlanId === 'leads' 
            ? `${activeOption.label} only`
            : `${activeOption.label.replace('/mo', '')} · ${activeOption.detail}`;

        return {
            name: activePlan.name,
            billing: activePlan.billing,
            capacityLabel,
            platformFee,
            leadsCost,
            totalCost
        };
    }, [activePlanId, optionIndex]);

    const calc = useMemo(() => {
        const manualCost = hours * hourly;
        if (!planData) {
            return { manualCost, savings: 0, roi: 0, paybackDays: 0 };
        }
        const savings = manualCost - planData.totalCost;
        const monthlyRevenue = placements * fee;
        const roi = monthlyRevenue > 0 ? monthlyRevenue / planData.totalCost : 0;
        const paybackDays = monthlyRevenue > 0 ? (planData.totalCost / monthlyRevenue) * 30 : 0;
        return { manualCost, savings, roi, paybackDays };
    }, [planData, fee, placements, hours, hourly]);

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
                <div className="bg-[#0A0A0A] rounded-2xl p-6 sm:p-8 text-white flex flex-col justify-between">
                    <div>
                        {/* Plan Selector Tabs */}
                        <div className="mb-6">
                            <p className="text-[10px] font-bold uppercase tracking-widest text-white/50 mb-2.5">Service tier</p>
                            <div className="grid grid-cols-3 gap-1 bg-white/10 p-1 rounded-xl">
                                {pricingPlans.map((plan) => (
                                    <button
                                        key={plan.id}
                                        type="button"
                                        onClick={() => setActivePlanId(plan.id)}
                                        className={`py-2 px-1 text-[10px] sm:text-[11px] font-bold rounded-lg transition-all text-center cursor-pointer ${
                                            activePlanId === plan.id
                                                ? 'bg-[#FF6A00] text-white shadow-sm'
                                                : 'text-white/60 hover:text-white hover:bg-white/5'
                                        }`}
                                    >
                                        {plan.name}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {optionIndex === null && placements === 0 && (
                            <EmptyState message="Adjust your inputs to see your price." />
                        )}

                        {optionIndex === null && placements > 25 && (
                            <EmptyState
                                title="You're above the standard tiers."
                                message="Custom volume — talk to Tushar to scope a bespoke retainer."
                                cta
                            />
                        )}

                        {planData && (
                            <>
                                <p className="text-[10px] font-bold uppercase tracking-widest text-[#FF6A00] mb-2">Recommended plan</p>

                                {/* Plan name + capacity */}
                                <div className="inline-flex items-center gap-2 bg-[#FF6A00]/10 border border-[#FF6A00]/30 rounded-full px-3 py-1 mb-4">
                                    <span className="w-1.5 h-1.5 rounded-full bg-[#FF6A00]" />
                                    <span className="text-xs font-bold text-[#FF6A00]">{planData.name} · {planData.capacityLabel}</span>
                                </div>

                                {/* Price */}
                                <div className="mb-5">
                                    <p className="text-[10px] uppercase tracking-widest opacity-50 mb-1">
                                        Your cost
                                    </p>
                                    <div className="flex items-baseline gap-1.5 flex-wrap">
                                        <span className="text-4xl font-black tracking-tight">${planData.totalCost}</span>
                                        <span className="text-sm font-semibold opacity-50">
                                            {planData.billing === 'one-off' ? 'one-off' : '/mo'}
                                        </span>
                                    </div>
                                    <p className="text-[10px] opacity-40 mt-1">
                                        {planData.billing === 'one-off' 
                                            ? 'Data-only leads package' 
                                            : 'Fully-managed campaign retainer'}
                                    </p>
                                </div>

                                <div className="grid grid-cols-3 gap-3 mb-6">
                                    <Stat label="Savings / mo" value={formatCurrency(calc.savings)} hint={planData.billing === 'one-off' ? 'vs manual data prep' : 'vs manual prospecting'} />
                                    <Stat label="ROI" value={`${calc.roi.toFixed(1)}×`} hint="revenue / cost" />
                                    <Stat label="Payback" value={`${Math.max(1, Math.round(calc.paybackDays))}d`} hint="from one placement" />
                                </div>
                            </>
                        )}
                    </div>

                    {planData && (
                        <Button href="/fit-call" fullWidth variant="primary">
                            Book a fit call to walk through your numbers →
                        </Button>
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
