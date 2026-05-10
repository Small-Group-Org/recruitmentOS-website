'use client';

import { useState, useMemo, useEffect } from 'react';
import Link from 'next/link';
import { trackCTAClick } from '@/lib/analytics';

const STORAGE_KEY = 'rOS_volume_gap_inputs';

type Inputs = {
    placementTarget: number;
    avgFee: number;
    closeRate: number; // % from qualified meeting → placement
    replyRate: number; // % from cold outreach → reply
    replyToMeeting: number; // % from reply → meeting
    currentVolume: number;
};

const defaultInputs: Inputs = {
    placementTarget: 5,
    avgFee: 10000,
    closeRate: 25,
    replyRate: 4,
    replyToMeeting: 25,
    currentVolume: 400,
};

function fmtNum(n: number) {
    if (!isFinite(n) || isNaN(n)) return '—';
    return Math.round(n).toLocaleString();
}

function fmtMultiplier(n: number) {
    if (!isFinite(n) || isNaN(n)) return '—';
    return `${n.toFixed(1)}×`;
}

export default function VolumeGapCalculator() {
    const [inputs, setInputs] = useState<Inputs>(defaultInputs);
    const [hydrated, setHydrated] = useState(false);

    // Load saved inputs from localStorage
    useEffect(() => {
        try {
            const saved = localStorage.getItem(STORAGE_KEY);
            if (saved) {
                const parsed = JSON.parse(saved);
                setInputs({ ...defaultInputs, ...parsed });
            }
        } catch {
            // ignore
        }
        setHydrated(true);
    }, []);

    // Persist on change (after hydration)
    useEffect(() => {
        if (!hydrated) return;
        try {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(inputs));
        } catch {
            // ignore
        }
    }, [inputs, hydrated]);

    const result = useMemo(() => {
        const closeRateDecimal = inputs.closeRate / 100;
        const replyRateDecimal = inputs.replyRate / 100;
        const replyToMeetingDecimal = inputs.replyToMeeting / 100;

        const meetingsRequired = inputs.placementTarget / closeRateDecimal;
        const repliesRequired = meetingsRequired / replyToMeetingDecimal;
        const outreachRequired = repliesRequired / replyRateDecimal;
        const gapMultiplier = inputs.currentVolume > 0 ? outreachRequired / inputs.currentVolume : Infinity;

        return {
            meetingsRequired,
            repliesRequired,
            outreachRequired,
            gapMultiplier,
        };
    }, [inputs]);

    const interpretation = useMemo(() => {
        const m = result.gapMultiplier;
        if (!isFinite(m) || isNaN(m)) {
            return { label: 'Set your current volume to see your gap.', tone: 'neutral' as const };
        }
        if (m < 2) {
            return {
                label: 'Probably a copy/sequence problem, not volume.',
                detail: 'You\'re close to the volume your math requires. Fix the copy first — we\'re probably not your fix.',
                cta: 'Read why volume isn\'t always the answer →',
                ctaHref: '/#core-messages',
                tone: 'green' as const,
            };
        }
        if (m < 5) {
            return {
                label: 'Borderline. Could go either way.',
                detail: 'You could solve this in-house or with a partner. Worth a fit-call diagnosis to figure out which.',
                cta: 'Book a fit call →',
                ctaHref: '/fit-call',
                tone: 'amber' as const,
            };
        }
        return {
            label: 'Structural volume problem. Hiring more people won\'t fix it.',
            detail: `Your placement target requires ${fmtNum(result.outreachRequired)} touchpoints/month. You\'re at ${fmtNum(inputs.currentVolume)}. That gap doesn\'t close manually.`,
            cta: 'Book a fit call →',
            ctaHref: '/fit-call',
            tone: 'red' as const,
        };
    }, [result, inputs.currentVolume]);

    const update = (key: keyof Inputs) => (e: React.ChangeEvent<HTMLInputElement>) => {
        const v = parseFloat(e.target.value);
        setInputs((s) => ({ ...s, [key]: isNaN(v) ? 0 : v }));
    };

    return (
        <section className="py-12 md:py-16 bg-white">
            <div className="max-w-[1100px] mx-auto px-4 sm:px-6 grid grid-cols-1 lg:grid-cols-5 gap-8">
                {/* Inputs */}
                <div className="lg:col-span-3 bg-white border border-[#e5e5e5] rounded-[16px] p-6 md:p-8">
                    <p className="text-xs font-bold uppercase tracking-widest text-[#9ca3af] mb-5">Your numbers</p>

                    <div className="space-y-5">
                        <Field label="Monthly placement target (placements/month)" value={inputs.placementTarget} onChange={update('placementTarget')} step="1" />
                        <Field label="Average placement fee ($)" value={inputs.avgFee} onChange={update('avgFee')} step="500" prefix="$" />
                        <Field label="Realistic close rate (qualified meeting → placement) %" value={inputs.closeRate} onChange={update('closeRate')} step="1" suffix="%" />
                        <Field label="Realistic reply rate (cold outreach → reply) %" value={inputs.replyRate} onChange={update('replyRate')} step="0.1" suffix="%" />
                        <Field label="Reply → qualified-meeting rate %" value={inputs.replyToMeeting} onChange={update('replyToMeeting')} step="1" suffix="%" />
                        <Field label="Current monthly outreach volume (touchpoints)" value={inputs.currentVolume} onChange={update('currentVolume')} step="50" />
                    </div>

                    <p className="text-[12px] text-[#9ca3af] mt-6 italic">
                        Defaults are realistic for $500K–$5M agencies. Plug in YOUR numbers — that&apos;s when this gets useful.
                    </p>
                </div>

                {/* Outputs */}
                <div className="lg:col-span-2 space-y-4">
                    <div className="bg-[#0A0A0A] text-white rounded-[16px] p-6 md:p-7">
                        <p className="text-xs font-bold uppercase tracking-widest text-[#F97316] mb-3">Your gap multiplier</p>
                        <p className="text-6xl md:text-7xl font-extrabold leading-none mb-2">{fmtMultiplier(result.gapMultiplier)}</p>
                        <p className="text-[14px] text-[#9ca3af]">required ÷ current outreach</p>
                    </div>

                    <div className="bg-[#FAFAFA] rounded-[16px] p-6 border border-[#e5e5e5] space-y-3">
                        <Row label="Qualified meetings required / mo" value={fmtNum(result.meetingsRequired)} />
                        <Row label="Replies required / mo" value={fmtNum(result.repliesRequired)} />
                        <Row label="Outreach required / mo" value={fmtNum(result.outreachRequired)} bold />
                        <Row label="Outreach you&apos;re running / mo" value={fmtNum(inputs.currentVolume)} muted />
                    </div>

                    <div
                        className={`rounded-[16px] p-6 border ${
                            interpretation.tone === 'green'
                                ? 'bg-[#f0fdf4] border-[#bbf7d0]'
                                : interpretation.tone === 'amber'
                                ? 'bg-[#fffbeb] border-[#fde68a]'
                                : interpretation.tone === 'red'
                                ? 'bg-[#fef2f2] border-[#fecaca]'
                                : 'bg-white border-[#e5e5e5]'
                        }`}
                    >
                        <p className={`text-[15px] font-bold mb-2 ${
                            interpretation.tone === 'green'
                                ? 'text-[#166534]'
                                : interpretation.tone === 'amber'
                                ? 'text-[#92400e]'
                                : interpretation.tone === 'red'
                                ? 'text-[#991b1b]'
                                : 'text-[#0A0A0A]'
                        }`}>{interpretation.label}</p>
                        {interpretation.detail && (
                            <p className="text-[13px] text-[#4B5563] leading-relaxed mb-4">{interpretation.detail}</p>
                        )}
                        {interpretation.cta && interpretation.ctaHref && (
                            <Link
                                href={interpretation.ctaHref}
                                onClick={() => trackCTAClick(`Calculator interpretation ${interpretation.tone}`, 'VolumeGapCalculator')}
                                className="inline-flex items-center text-[14px] font-semibold text-[#0A0A0A] underline underline-offset-4 hover:text-[#F97316] transition-colors"
                            >
                                {interpretation.cta}
                            </Link>
                        )}
                    </div>
                </div>
            </div>

            {/* CTA strip */}
            <div className="max-w-[1100px] mx-auto px-4 sm:px-6 mt-12">
                <div className="bg-[#FAFAFA] rounded-[14px] border border-[#e5e5e5] p-6 md:p-7 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                    <div>
                        <p className="text-[15px] font-bold text-[#0A0A0A] mb-1">Want to run this on the call with us?</p>
                        <p className="text-[13px] text-[#6b7280]">We open this calculator on every fit call and walk through your real numbers — live, with you.</p>
                    </div>
                    <Link
                        href="/fit-call"
                        className="inline-flex items-center justify-center bg-[#0A0A0A] text-white px-6 py-3 rounded-full text-[14px] font-semibold hover:bg-[#1a1a1a] transition-colors whitespace-nowrap"
                    >
                        Book a fit call →
                    </Link>
                </div>
            </div>
        </section>
    );
}

function Field({
    label,
    value,
    onChange,
    step,
    prefix,
    suffix,
}: {
    label: string;
    value: number;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    step: string;
    prefix?: string;
    suffix?: string;
}) {
    return (
        <div>
            <label className="block text-[13px] font-medium text-[#4B5563] mb-1.5">{label}</label>
            <div className="relative">
                {prefix && (
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[15px] text-[#9ca3af] pointer-events-none">{prefix}</span>
                )}
                <input
                    type="number"
                    min="0"
                    step={step}
                    value={value}
                    onChange={onChange}
                    className={`w-full border border-[#e5e5e5] rounded-[8px] py-2.5 text-[15px] text-[#0A0A0A] focus:outline-none focus:border-[#0A0A0A] transition-colors ${prefix ? 'pl-8' : 'pl-4'} ${suffix ? 'pr-10' : 'pr-4'}`}
                />
                {suffix && (
                    <span className="absolute right-4 top-1/2 -translate-y-1/2 text-[15px] text-[#9ca3af] pointer-events-none">{suffix}</span>
                )}
            </div>
        </div>
    );
}

function Row({ label, value, bold, muted }: { label: string; value: string; bold?: boolean; muted?: boolean }) {
    return (
        <div className="flex items-baseline justify-between gap-3">
            <span
                className={`text-[13px] ${muted ? 'text-[#9ca3af]' : 'text-[#6b7280]'}`}
                dangerouslySetInnerHTML={{ __html: label }}
            />
            <span className={`font-mono ${bold ? 'text-[18px] font-bold text-[#0A0A0A]' : 'text-[15px] text-[#0A0A0A]'}`}>
                {value}
            </span>
        </div>
    );
}
