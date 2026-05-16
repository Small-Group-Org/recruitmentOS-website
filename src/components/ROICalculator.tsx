'use client';

import { useState, useCallback } from 'react';
import Link from 'next/link';

const fmtInt = (n: number) => Math.round(n).toLocaleString('en-US');
const fmtMoney = (n: number) => '$' + Math.round(n).toLocaleString('en-US');
const fmtPct = (n: number) => n.toFixed(n % 1 === 0 ? 0 : 1) + '%';

function compute(placements: number, fee: number, replyPct: number, meetingPct: number, closePct: number) {
    const r = replyPct / 100;
    const m = meetingPct / 100;
    const c = closePct / 100;
    const conversionProduct = r * m * c;

    const leads = conversionProduct > 0 ? Math.ceil(placements / conversionProduct) : 0;
    const responses = Math.round(leads * r);
    const meetings = Math.round(responses * m);
    const closedPlacements = Math.round(meetings * c);

    const inboxes = Math.max(1, Math.ceil(leads / 400));
    const domains = Math.max(1, Math.ceil(inboxes / 2));

    const leadCost = leads * 0.20;
    const inboxCost = inboxes * 4;
    const domainCost = domains * 10;
    const smartleadCost = leads <= 2500 ? 39 : 78;
    const monthlyCost = leadCost + inboxCost + domainCost + smartleadCost;

    const monthlyRev = placements * fee;
    const annualRev = monthlyRev * 12;
    const roi = monthlyCost > 0 ? monthlyRev / monthlyCost : 0;

    const manualHours = Math.ceil(leads / 20);
    const manualCost = manualHours * 10;

    return {
        leads, responses, meetings, closedPlacements,
        inboxes, domains,
        leadCost, inboxCost, domainCost, smartleadCost, monthlyCost,
        monthlyRev, annualRev, roi,
        manualHours, manualCost,
    };
}

interface SliderProps {
    label: string;
    id: string;
    min: number;
    max: number;
    step: number;
    value: number;
    display: string;
    onChange: (v: number) => void;
}

function Slider({ label, id, min, max, step, value, display, onChange }: SliderProps) {
    return (
        <div className="mb-6">
            <div className="flex justify-between items-center mb-2">
                <label htmlFor={id} className="text-sm text-[#4b5563] font-medium">{label}</label>
                <span className="text-sm font-bold text-[#0A0A0A] font-mono">{display}</span>
            </div>
            <input
                id={id}
                type="range"
                min={min}
                max={max}
                step={step}
                value={value}
                onChange={e => onChange(parseFloat(e.target.value))}
                className="w-full h-1.5 rounded-full appearance-none cursor-pointer"
                style={{
                    background: `linear-gradient(to right, #FF6A00 0%, #FF6A00 ${((value - min) / (max - min)) * 100}%, #e5e5e5 ${((value - min) / (max - min)) * 100}%, #e5e5e5 100%)`,
                    WebkitAppearance: 'none',
                }}
            />
        </div>
    );
}

export default function ROICalculator() {
    const [placements, setPlacements] = useState(2);
    const [fee, setFee] = useState(10000);
    const [replyPct, setReplyPct] = useState(4);
    const [meetingPct, setMeetingPct] = useState(10);
    const [closePct, setClosePct] = useState(20);

    const result = compute(placements, fee, replyPct, meetingPct, closePct);

    const roiStr = result.roi >= 1
        ? result.roi.toFixed(result.roi >= 10 ? 0 : 1) + 'x'
        : result.roi.toFixed(2) + 'x';

    return (
        <section className="py-20 bg-[#F9FAFB] border-t border-[#e5e5e5]" id="roi-calculator">
            <style>{`
                input[type=range]::-webkit-slider-thumb {
                    -webkit-appearance: none;
                    width: 18px;
                    height: 18px;
                    border-radius: 50%;
                    background: #FF6A00;
                    cursor: pointer;
                    border: 2px solid #fff;
                    box-shadow: 0 1px 4px rgba(0,0,0,0.15);
                }
                input[type=range]::-moz-range-thumb {
                    width: 18px;
                    height: 18px;
                    border-radius: 50%;
                    background: #FF6A00;
                    cursor: pointer;
                    border: 2px solid #fff;
                }
            `}</style>

            <div className="max-w-[1240px] mx-auto px-6 sm:px-10">

                {/* Header */}
                <div className="text-center max-w-2xl mx-auto mb-14">
                    <p className="text-xs font-bold tracking-widest text-[#FF6A00] uppercase mb-4">ROI Calculator</p>
                    <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0A0A0A] tracking-tight mb-4">
                        What should BD cost your agency?
                    </h2>
                    <p className="text-[#6b7280] text-lg">
                        Plug in your numbers. See what running BD properly should cost in infrastructure — and what it should return.
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

                    {/* LEFT — Inputs */}
                    <div className="bg-white rounded-2xl border border-[#e5e5e5] shadow-sm p-8">
                        <p className="text-xs font-bold tracking-widest text-[#9ca3af] uppercase mb-8">Your Numbers</p>

                        <Slider
                            label="Target placements per month"
                            id="placements"
                            min={1} max={25} step={1}
                            value={placements}
                            display={String(placements)}
                            onChange={setPlacements}
                        />
                        <Slider
                            label="Average placement fee"
                            id="fee"
                            min={2000} max={50000} step={500}
                            value={fee}
                            display={fmtMoney(fee)}
                            onChange={setFee}
                        />
                        <Slider
                            label="Email reply rate"
                            id="reply"
                            min={1} max={15} step={0.5}
                            value={replyPct}
                            display={fmtPct(replyPct)}
                            onChange={setReplyPct}
                        />
                        <Slider
                            label="Reply → meeting rate"
                            id="meeting"
                            min={5} max={50} step={1}
                            value={meetingPct}
                            display={fmtPct(meetingPct)}
                            onChange={setMeetingPct}
                        />
                        <Slider
                            label="Meeting → close rate"
                            id="close"
                            min={5} max={60} step={1}
                            value={closePct}
                            display={fmtPct(closePct)}
                            onChange={setClosePct}
                        />

                        <div className="mt-2 bg-[#F9FAFB] border border-[#e5e5e5] rounded-xl p-4 text-xs text-[#9ca3af] leading-relaxed">
                            <strong className="text-[#6b7280]">Defaults from real benchmarks:</strong> 4% reply, 10% meeting, 20% close.
                            Lead cost $0.20. Inbox $4/mo. Domain $10/mo. Smartlead $39 (≤2,500 leads) or $78.
                        </div>
                    </div>

                    {/* RIGHT — Results */}
                    <div className="flex flex-col gap-4">

                        {/* ROI Hero */}
                        <div className="bg-[#0A0A0A] rounded-2xl p-7 text-center">
                            <p className="text-xs font-bold tracking-widest text-[#6b7280] uppercase mb-2">Your ROI on BD Investment</p>
                            <p
                                className="text-6xl font-extrabold text-white tracking-tight"
                                style={{ textShadow: '0 0 30px rgba(255,106,0,0.6)' }}
                            >
                                {roiStr}
                            </p>
                            <p className="text-sm text-[#6b7280] mt-2">on your monthly infrastructure cost</p>
                        </div>

                        {/* Funnel */}
                        <div className="bg-white rounded-2xl border border-[#e5e5e5] shadow-sm p-6">
                            <p className="text-xs font-bold tracking-widest text-[#9ca3af] uppercase mb-4">Your Monthly Funnel</p>
                            <div className="space-y-2">
                                {[
                                    { label: 'Leads sent', value: fmtInt(result.leads) },
                                    { label: `Responses (${fmtPct(replyPct)})`, value: fmtInt(result.responses) },
                                    { label: `Meetings booked (${fmtPct(meetingPct)})`, value: fmtInt(result.meetings) },
                                    { label: `Placements (${fmtPct(closePct)})`, value: fmtInt(result.closedPlacements) },
                                ].map((row, i) => (
                                    <div key={i} className="flex justify-between items-center py-1.5 border-b border-[#f3f4f6] last:border-0">
                                        <span className="text-sm text-[#6b7280]">{row.label}</span>
                                        <span className="text-sm font-bold text-[#0A0A0A] font-mono">{row.value}</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Two cols: Investment + Revenue */}
                        <div className="grid grid-cols-2 gap-4">
                            <div className="bg-white rounded-2xl border border-[#e5e5e5] shadow-sm p-5">
                                <p className="text-xs font-bold tracking-widest text-[#9ca3af] uppercase mb-3">Monthly Investment</p>
                                <div className="space-y-1.5">
                                    {[
                                        { label: 'Lead data', value: fmtMoney(result.leadCost) },
                                        { label: `Inboxes (${result.inboxes})`, value: fmtMoney(result.inboxCost) },
                                        { label: `Domains (${result.domains})`, value: fmtMoney(result.domainCost) },
                                        { label: 'Smartlead', value: fmtMoney(result.smartleadCost) },
                                    ].map((row, i) => (
                                        <div key={i} className="flex justify-between">
                                            <span className="text-xs text-[#9ca3af]">{row.label}</span>
                                            <span className="text-xs font-semibold text-[#4b5563] font-mono">{row.value}</span>
                                        </div>
                                    ))}
                                    <div className="pt-2 mt-1 border-t border-[#e5e5e5] flex justify-between">
                                        <span className="text-xs font-bold text-[#0A0A0A]">Total</span>
                                        <span className="text-sm font-extrabold text-[#FF6A00] font-mono">{fmtMoney(result.monthlyCost)}</span>
                                    </div>
                                </div>
                            </div>
                            <div className="bg-white rounded-2xl border border-[#e5e5e5] shadow-sm p-5">
                                <p className="text-xs font-bold tracking-widest text-[#9ca3af] uppercase mb-3">Revenue at Target</p>
                                <div className="space-y-2">
                                    <div className="flex justify-between">
                                        <span className="text-xs text-[#9ca3af]">Monthly</span>
                                        <span className="text-sm font-bold text-[#0A0A0A] font-mono">{fmtMoney(result.monthlyRev)}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-xs text-[#9ca3af]">Annual</span>
                                        <span className="text-sm font-extrabold text-[#1a6b4a] font-mono">{fmtMoney(result.annualRev)}</span>
                                    </div>
                                    <div className="mt-3 pt-3 border-t border-[#e5e5e5]">
                                        <p className="text-xs font-bold text-[#9ca3af] uppercase tracking-wider mb-1">Manual alternative</p>
                                        <div className="flex justify-between">
                                            <span className="text-xs text-[#9ca3af]">Hours/mo</span>
                                            <span className="text-xs font-semibold text-[#4b5563]">{fmtInt(result.manualHours)} hrs</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span className="text-xs text-[#9ca3af]">Labour cost</span>
                                            <span className="text-xs font-semibold text-[#c0412b] font-mono">{fmtMoney(result.manualCost)}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* CTA */}
                        <div className="bg-[#FFF9F4] border border-[#FF6A00]/20 rounded-2xl p-6 text-center">
                            <p className="text-sm text-[#4b5563] mb-4">
                                Want this scored against your actual niche, team, and reply rates?
                            </p>
                            <Link
                                href="https://cal.com/tusharm/30min?user=tusharm"
                                target="_blank"
                                className="inline-flex items-center justify-center bg-[#0A0A0A] text-white px-6 py-3 rounded-xl font-semibold hover:bg-[#1a1a1a] transition-all text-sm hover:-translate-y-0.5 hover:shadow-lg"
                            >
                                Book a Fit Call — it's free
                                <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14M12 5l7 7-7 7" />
                                </svg>
                            </Link>
                        </div>

                    </div>
                </div>

                <p className="text-center text-xs text-[#d1d5db] mt-8">
                    Calculator math: agency-side only. Operational infrastructure costs shown — no service fees included.
                </p>
            </div>
        </section>
    );
}
