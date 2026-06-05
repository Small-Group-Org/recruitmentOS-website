'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';

const REPLY_TO_MEETING_DEFAULT = 15; // % of replies that become booked meetings

function formatNum(n: number): string {
    if (!isFinite(n) || n <= 0) return '—';
    if (n >= 100000) return `${Math.round(n / 1000)}K`;
    if (n >= 10000) return `${(n / 1000).toFixed(1)}K`;
    return Math.round(n).toLocaleString();
}

// Maps required monthly lead volume → recommended plan from pricingPlans
// Tiers are based on the Revenue Booster (email) plan options: 2k, 5k, 10k, 20k leads
type TierMatch = {
    name: string;       // Plan name
    leadsLabel: string; // e.g. "2,000 leads/mo"
    platformFee: number; // Monthly platform fee
    leadsCost: number;  // One-off leads cost
    detail: string;     // e.g. "6K emails · Smartlead Basic"
};

function pickTierFromLeads(leadsNeeded: number): TierMatch | null {
    if (!isFinite(leadsNeeded) || leadsNeeded <= 0) return null;
    if (leadsNeeded <= 2000)  return { name: 'Revenue Booster', leadsLabel: '2,000 leads/mo',  platformFee: 226,  leadsCost: 149, detail: '6K emails · Smartlead Basic' };
    if (leadsNeeded <= 5000)  return { name: 'Revenue Booster', leadsLabel: '5,000 leads/mo',  platformFee: 400,  leadsCost: 299, detail: '15K emails · Smartlead Pro' };
    if (leadsNeeded <= 10000) return { name: 'Revenue Booster', leadsLabel: '10,000 leads/mo', platformFee: 499,  leadsCost: 500, detail: '30K emails · Smartlead Custom' };
    if (leadsNeeded <= 20000) return { name: 'Revenue Booster', leadsLabel: '20,000 leads/mo', platformFee: 659,  leadsCost: 840, detail: '60K emails · Smartlead Custom' };
    // Above 20k → Scale Accelerator / Enterprise
    return { name: 'Scale Accelerator', leadsLabel: '20,000+ leads/mo', platformFee: 1159, leadsCost: 840, detail: 'email + LinkedIn · Book a call' };
}

export default function VolumeGapCalculator() {
    const [fee, setFee] = useState(10000);
    const [closeRate, setCloseRate] = useState(15);
    const [replyRate, setReplyRate] = useState(4);
    const [replyToMeeting, setReplyToMeeting] = useState(REPLY_TO_MEETING_DEFAULT);
    const [targetPlacements, setTargetPlacements] = useState(7);
    const [currentOutreach, setCurrentOutreach] = useState(500);

    const calc = useMemo(() => {
        const cr = closeRate / 100;
        const rr = replyRate / 100;
        const rtm = replyToMeeting / 100;

        const requiredMeetings = targetPlacements / cr;
        const requiredReplies = requiredMeetings / rtm;
        const requiredOutreach = requiredReplies / rr;
        const gapMultiplier = currentOutreach > 0 ? requiredOutreach / currentOutreach : Infinity;
        const recommendedTier = pickTierFromLeads(requiredOutreach);
        const targetRevenue = targetPlacements * fee;

        return { requiredMeetings, requiredReplies, requiredOutreach, gapMultiplier, recommendedTier, targetRevenue };
    }, [fee, closeRate, replyRate, replyToMeeting, targetPlacements, currentOutreach]);

    return (
        <section className="bg-white border border-[#E5E5E5] rounded-2xl p-6 sm:p-10">
            <div className="grid grid-cols-1 lg:grid-cols-[1fr_1px_1fr] gap-8 lg:gap-12">

                {/* Inputs */}
                <div className="space-y-4">
                    <div>
                        <h3 className="text-xs font-bold uppercase tracking-widest text-[#FF6A00]">Your numbers</h3>
                        <p className="text-[11px] text-[#9CA3AF] mt-0.5">Adjust to match your agency</p>
                    </div>
                    <NumberField label="Average placement fee" prefix="$" value={fee} setValue={setFee} step={500} />
                    <SliderField label="Close rate (meetings → placements)" value={closeRate} setValue={setCloseRate} min={1} max={50} suffix="%" />
                    <SliderField label="Reply rate (outreach → replies)" value={replyRate} setValue={setReplyRate} min={0.5} max={15} step={0.5} suffix="%" />
                    <SliderField label="Reply → booking rate" value={replyToMeeting} setValue={setReplyToMeeting} min={1} max={60} suffix="%" />
                    <div className="grid grid-cols-2 gap-3">
                        <NumberField label="Placements / mo" value={targetPlacements} setValue={setTargetPlacements} step={1} min={1} max={50} />
                        <NumberField label="Current outreach / mo" value={currentOutreach} setValue={setCurrentOutreach} step={100} min={0} />
                    </div>
                </div>

                <div className="hidden lg:block bg-[#E5E5E5]" />

                {/* Outputs */}
                <div className="flex flex-col gap-3">
                    <div>
                        <h3 className="text-xs font-bold uppercase tracking-widest text-[#FF6A00]">Your math</h3>
                        <p className="text-[11px] text-[#6B7280] mt-0.5">Updates live as you change inputs</p>
                    </div>

                    {/* Hero number card */}
                    <div className="bg-[#F9FAFB] border border-[#E5E5E5] rounded-xl p-4">
                        <p className="text-[10px] font-bold uppercase tracking-widest text-[#9CA3AF] mb-1">Emails needed / month</p>
                        <p className="text-4xl font-black tracking-tight leading-none text-[#0A0A0A]">{formatNum(calc.requiredOutreach)}</p>
                        <p className="text-[11px] text-[#6B7280] mt-1.5">to reach {targetPlacements} placements at {closeRate}% close rate</p>
                    </div>

                    {/* Gap alert */}
                    {currentOutreach > 0 && calc.gapMultiplier > 1.1 && (
                        <div className="p-3 rounded-xl bg-orange-50 border border-orange-200 flex items-start gap-2">
                            <span className="text-orange-500 text-sm leading-none mt-0.5 shrink-0">⚠</span>
                            <p className="text-xs font-semibold text-[#0A0A0A] leading-snug">
                                You&apos;re <span className="text-[#FF6A00] font-black">{calc.gapMultiplier.toFixed(1)}×</span> below what your target demands.
                            </p>
                        </div>
                    )}
                    {currentOutreach > 0 && calc.gapMultiplier <= 1.1 && (
                        <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200 flex items-start gap-2">
                            <span className="text-emerald-600 text-sm leading-none mt-0.5 shrink-0">✓</span>
                            <p className="text-xs font-semibold text-[#0A0A0A] leading-snug">
                                Volume looks sufficient — the leak is in close rate, reply rate, or niche fit.
                            </p>
                        </div>
                    )}

                    {/* 4-stat grid */}
                    <div className="grid grid-cols-2 gap-2">
                        <Stat label="Meetings needed" value={formatNum(calc.requiredMeetings)} />
                        <Stat label="Replies needed" value={formatNum(calc.requiredReplies)} />
                        <Stat label="Revenue target / mo" value={`$${formatNum(calc.targetRevenue)}`} />
                        <Stat label="Leads needed / mo" value={formatNum(calc.requiredOutreach)} />
                    </div>

                    {/* Recommended plan */}
                    {calc.recommendedTier && (
                        <div className="rounded-xl border border-[#FF6A00]/25 bg-orange-50 p-4">
                            <p className="text-[9px] font-bold uppercase tracking-widest text-[#FF6A00] mb-1">Recommended · {calc.recommendedTier.name}</p>
                            <p className="text-[10px] text-[#6B7280] mb-2">{calc.recommendedTier.leadsLabel} · {calc.recommendedTier.detail}</p>
                            <div className="flex items-baseline gap-1.5 flex-wrap">
                                <span className="text-xl font-black text-[#0A0A0A]">${calc.recommendedTier.platformFee}<span className="text-xs font-medium text-[#6B7280]">/mo</span></span>
                                <span className="text-xs font-bold text-[#9CA3AF]">+</span>
                                <span className="text-xl font-black text-[#0A0A0A]">${calc.recommendedTier.leadsCost}<span className="text-xs font-medium text-[#6B7280]"> leads</span></span>
                            </div>
                            <p className="text-[9px] text-[#9CA3AF] mt-1">Platform fee (monthly) + one-off leads package</p>
                        </div>
                    )}

                    <Link
                        href="/fit-call"
                        className="block w-full text-center py-2.5 rounded-xl text-sm font-bold bg-[#0A0A0A] text-white hover:bg-[#FF6A00] transition-colors"
                    >
                        Book a fit call →
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
