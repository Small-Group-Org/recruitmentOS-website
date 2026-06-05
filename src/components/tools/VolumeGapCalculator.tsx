'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';

const REPLY_TO_MEETING = 0.5;

function formatNum(n: number): string {
    if (!isFinite(n) || n <= 0) return '—';
    if (n >= 100000) return `${Math.round(n / 1000)}K`;
    if (n >= 10000) return `${(n / 1000).toFixed(1)}K`;
    return Math.round(n).toLocaleString();
}

function pickTierFromOutreach(monthly: number): { name: string; band: string } | null {
    if (!isFinite(monthly) || monthly <= 0) return null;
    if (monthly <= 2500) return { name: 'Starter', band: 'up to 4 placements/mo' };
    if (monthly <= 8750) return { name: 'Growth', band: '5–10 placements/mo' };
    if (monthly <= 25000) return { name: 'Pro', band: '11–25 placements/mo' };
    return null;
}

export default function VolumeGapCalculator() {
    const [fee, setFee] = useState(10000);
    const [closeRate, setCloseRate] = useState(20);
    const [replyRate, setReplyRate] = useState(4);
    const [targetPlacements, setTargetPlacements] = useState(7);
    const [currentOutreach, setCurrentOutreach] = useState(500);

    const calc = useMemo(() => {
        const cr = closeRate / 100;
        const rr = replyRate / 100;

        const requiredMeetings = targetPlacements / cr;
        const requiredReplies = requiredMeetings / REPLY_TO_MEETING;
        const requiredOutreach = requiredReplies / rr;
        const gapMultiplier = currentOutreach > 0 ? requiredOutreach / currentOutreach : Infinity;
        const recommendedTier = pickTierFromOutreach(requiredOutreach);
        const targetRevenue = targetPlacements * fee;

        return { requiredMeetings, requiredReplies, requiredOutreach, gapMultiplier, recommendedTier, targetRevenue };
    }, [fee, closeRate, replyRate, targetPlacements, currentOutreach]);

    return (
        <section className="bg-white border border-[#E5E5E5] rounded-2xl p-6 sm:p-10">
            <div className="grid grid-cols-1 lg:grid-cols-[1fr_1px_1fr] gap-8 lg:gap-12">

                {/* Inputs */}
                <div className="space-y-5">
                    <h3 className="text-sm font-bold uppercase tracking-widest text-[#FF6A00] mb-2">Your numbers</h3>
                    <NumberField label="Average placement fee" prefix="$" value={fee} setValue={setFee} step={500} />
                    <SliderField label="Close rate (% meetings → placements)" value={closeRate} setValue={setCloseRate} min={1} max={50} suffix="%" />
                    <SliderField label="Reply rate (% outreach → replies)" value={replyRate} setValue={setReplyRate} min={0.5} max={15} step={0.5} suffix="%" />
                    <NumberField label="Monthly placement target" value={targetPlacements} setValue={setTargetPlacements} step={1} min={1} max={50} />
                    <NumberField label="Current monthly outreach volume" value={currentOutreach} setValue={setCurrentOutreach} step={100} min={0} />
                </div>

                <div className="hidden lg:block bg-[#E5E5E5]" />

                {/* Outputs */}
                <div className="bg-[#0A0A0A] rounded-2xl p-6 sm:p-8 text-white lg:bg-transparent lg:text-[#0A0A0A] lg:p-0">
                    <h3 className="text-sm font-bold uppercase tracking-widest text-[#FF6A00] mb-5">Your math</h3>

                    <div className="mb-6">
                        <p className="text-xs font-bold uppercase tracking-widest opacity-70 mb-2">Required outreach</p>
                        <p className="text-5xl sm:text-6xl font-black tracking-tighter leading-none">{formatNum(calc.requiredOutreach)}</p>
                        <p className="text-sm opacity-70 mt-2">emails / month to hit {targetPlacements} placements</p>
                    </div>

                    {currentOutreach > 0 && calc.gapMultiplier > 1.1 && (
                        <div className="mb-6 p-4 rounded-xl bg-[#FF6A00]/10 border border-[#FF6A00]/30">
                            <p className="text-sm font-bold leading-snug">
                                You're <span className="text-[#FF6A00] text-lg">{calc.gapMultiplier.toFixed(1)}×</span> below the volume your math demands.
                            </p>
                        </div>
                    )}

                    {currentOutreach > 0 && calc.gapMultiplier <= 1.1 && (
                        <div className="mb-6 p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/30">
                            <p className="text-sm font-bold leading-snug">
                                You're at or above the volume your math demands. The leak is somewhere else (close rate? reply rate? niche fit?).
                            </p>
                        </div>
                    )}

                    <div className="grid grid-cols-2 gap-3 mb-6">
                        <Stat label="Meetings needed" value={formatNum(calc.requiredMeetings)} />
                        <Stat label="Positive replies needed" value={formatNum(calc.requiredReplies)} />
                        <Stat label="Target revenue / mo" value={`$${formatNum(calc.targetRevenue)}`} />
                        <Stat label="Recommended tier" value={calc.recommendedTier?.name ?? 'Above Pro'} sub={calc.recommendedTier?.band ?? 'Talk to Tushar'} />
                    </div>

                    <Link
                        href="/fit-call"
                        className="block w-full text-center py-3 rounded-xl text-sm font-bold bg-[#FF6A00] text-white hover:bg-[#E55F00] transition-colors"
                    >
                        Book a fit call to plan the lift →
                    </Link>
                </div>
            </div>
        </section>
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

function SliderField({ label, value, setValue, min, max, step = 1, suffix }: { label: string; value: number; setValue: (n: number) => void; min: number; max: number; step?: number; suffix?: string }) {
    return (
        <label className="block">
            <span className="flex items-center justify-between text-xs font-bold uppercase tracking-widest text-[#0A0A0A] mb-2">
                <span>{label}</span>
                <span className="text-[#FF6A00] font-mono">{value}{suffix}</span>
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

function Stat({ label, value, sub }: { label: string; value: string; sub?: string }) {
    return (
        <div className="bg-white/10 lg:bg-[#F9FAFB] border border-white/10 lg:border-[#E5E5E5] rounded-lg p-3">
            <p className="text-[10px] font-bold uppercase tracking-widest opacity-70 mb-1">{label}</p>
            <p className="text-lg font-bold leading-tight">{value}</p>
            {sub && <p className="text-[10px] opacity-60 mt-0.5">{sub}</p>}
        </div>
    );
}
