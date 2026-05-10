import type { Metadata } from 'next';
import Link from 'next/link';
import Pricing from '@/components/Pricing';
import QualityGuarantee from '@/components/QualityGuarantee';
import YourStack from '@/components/YourStack';
import FAQ from '@/components/FAQ';
import FinalCTA from '@/components/FinalCTA';
import Footer from '@/components/Footer';
import JsonLd, { serviceSchema } from '@/components/JsonLd';

export const metadata: Metadata = {
    title: 'Pricing — Build + Run',
    description:
        'Transparent USD pricing. Build from $500. Run from $1,300/mo. 60-day guarantee — 100 hiring-manager contacts + 10 verified replies, or we work free until delivered. 30-day notice to cancel.',
    alternates: { canonical: '/pricing' },
    openGraph: {
        title: 'Pricing — RecruitmentOS Build + Run',
        description: 'Build from $500. Run from $1,300/mo. 60-day guarantee. 30-day notice. No long-term lock-in.',
        url: 'https://recruitmentos.smallgrp.com/pricing',
    },
};

const includedEveryTier = [
    'Niche-specific ICP map and signal engine',
    'Multi-step outreach sequences (email + LinkedIn)',
    'CRM mapping, deliverability config, inbox routing',
    'Reply triage and SLA',
    'Monthly reporting + Quarterly Business Review',
    '60-day guarantee — 100 hiring-manager contacts + 10 verified replies, or we work free',
];

const notIncluded = [
    { tool: 'ZoomInfo / Apollo / Sales Nav (or equivalent enrichment)', range: '$300–$1,000/mo' },
    { tool: 'Smartlead / Instantly (sequencing tool)', range: '$39–$200/mo' },
    { tool: 'Sending domains', range: '$10–$15 each, one-time' },
    { tool: 'ATS / CRM (HubSpot, Bullhorn, Vincere — your existing one)', range: 'free–$300/mo' },
];

const roiScenarios = [
    { fee: '$5,000', breakeven: '0.26', placements2: '$10,000', placements7: '$35,000', placements20: '$100,000' },
    { fee: '$10,000', breakeven: '0.13', placements2: '$20,000', placements7: '$70,000', placements20: '$200,000' },
    { fee: '$15,000', breakeven: '0.087', placements2: '$30,000', placements7: '$105,000', placements20: '$300,000' },
];

const nonCompromises = [
    {
        title: 'No outreach without niche-specific filtering.',
        body: 'Spray-and-pray sends and your domains burn in 90 days — and your brand burns with them. Even when a client pushes for "just send more," we don\'t.',
    },
    {
        title: 'No promised meetings without a written Qualified Meeting Definition.',
        body: 'Title list, geography, company size, show-up rate — defined and signed before contracts. So month 6 isn\'t a fight about which meetings counted.',
    },
    {
        title: 'No Build for an agency whose delivery isn\'t ready.',
        body: 'If your candidate pipeline can\'t fulfil the meetings we\'ll book, we tell you to fix that first and come back. Lost revenue. Worth it.',
    },
];

export default function PricingPage() {
    return (
        <main className="min-h-screen">
            <JsonLd data={serviceSchema} />

            {/* Hero */}
            <section className="pt-12 pb-16 md:pt-20 md:pb-24 bg-[#F9FAFB] border-b border-[#e5e5e5]">
                <div className="max-w-[1100px] mx-auto px-4 sm:px-6 text-center">
                    <p className="text-xs font-semibold text-[#6b7280] uppercase tracking-widest mb-4">Pricing</p>
                    <h1 className="text-[2.4rem] sm:text-5xl md:text-6xl font-extrabold tracking-[-0.03em] leading-[1.05] text-[#0A0A0A] mb-6 max-w-3xl mx-auto">
                        Build the BD function.
                        <br />
                        <span className="text-[#F97316]">Run it for less than the cost of one BD analyst.</span>
                    </h1>
                    <p className="text-lg md:text-xl text-[#4B5563] max-w-2xl mx-auto leading-relaxed">
                        Two parts: a one-time <strong>Build</strong> to design and stand up the engine on your stack, then a monthly <strong>Run</strong> to operate it. 30-day notice to cancel. No long-term lock-in.
                    </p>
                </div>
            </section>

            {/* Tier cards */}
            <Pricing />

            {/* What's included */}
            <section className="py-16 md:py-24 bg-[#FAFAFA] border-t border-[#e5e5e5]">
                <div className="max-w-[1100px] mx-auto px-4 sm:px-6 grid grid-cols-1 md:grid-cols-2 gap-10">
                    <div className="bg-white rounded-[14px] border border-[#e5e5e5] p-8">
                        <p className="text-xs font-bold uppercase tracking-widest text-[#16a34a] mb-4">✓ Included in every tier</p>
                        <ul className="space-y-3">
                            {includedEveryTier.map((item) => (
                                <li key={item} className="flex items-start gap-3">
                                    <span className="mt-1 w-4 h-4 rounded-full bg-[#16a34a] text-white flex items-center justify-center shrink-0 text-[9px] font-bold">✓</span>
                                    <span className="text-[15px] text-[#0A0A0A] leading-snug">{item}</span>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div className="bg-white rounded-[14px] border border-[#e5e5e5] p-8">
                        <p className="text-xs font-bold uppercase tracking-widest text-[#dc2626] mb-4">× NOT included — you pay these directly</p>
                        <ul className="space-y-3 mb-4">
                            {notIncluded.map((item) => (
                                <li key={item.tool} className="flex items-start justify-between gap-3 border-b border-[#f3f4f6] pb-3 last:border-0">
                                    <span className="text-[14px] text-[#0A0A0A] leading-snug">{item.tool}</span>
                                    <span className="text-[12px] text-[#6b7280] font-mono shrink-0">{item.range}</span>
                                </li>
                            ))}
                        </ul>
                        <p className="text-[13px] text-[#6b7280] italic leading-snug">
                            You own the accounts, the data, the sequences. We operate them. If you ever leave, the pipeline keeps working without us.
                        </p>
                    </div>
                </div>
            </section>

            {/* ROI math */}
            <section className="py-16 md:py-24 bg-white border-t border-[#e5e5e5]">
                <div className="max-w-[1100px] mx-auto px-4 sm:px-6">
                    <div className="mb-10">
                        <p className="text-xs font-medium text-[#6b7280] uppercase tracking-widest mb-3">ROI math (transparent)</p>
                        <h2 className="text-[#0A0A0A] text-3xl md:text-4xl font-extrabold tracking-tight mb-3">
                            Plug in your real numbers. The math is the math.
                        </h2>
                        <p className="text-[16px] text-[#6b7280] max-w-2xl">
                            Monthly revenue at the placement targets per tier, at three different placement-fee assumptions. Break-even is the placements/month needed to cover the Run retainer.
                        </p>
                    </div>

                    <div className="overflow-x-auto rounded-[14px] border border-[#e5e5e5] bg-white">
                        <table className="w-full text-sm">
                            <thead>
                                <tr className="bg-[#F5F5F5] border-b border-[#e5e5e5]">
                                    <th className="text-left px-5 py-3.5 text-[11px] font-bold uppercase tracking-widest text-[#6b7280]">Avg placement fee</th>
                                    <th className="text-center px-5 py-3.5 text-[11px] font-bold uppercase tracking-widest text-[#9ca3af]">Starter break-even (plc/mo)</th>
                                    <th className="text-center px-5 py-3.5 text-[11px] font-bold uppercase tracking-widest text-[#9ca3af]">Starter @ 2 plc</th>
                                    <th className="text-center px-5 py-3.5 text-[11px] font-bold uppercase tracking-widest text-[#F97316]">Growth @ 7 plc</th>
                                    <th className="text-center px-5 py-3.5 text-[11px] font-bold uppercase tracking-widest text-[#9ca3af]">Pro @ 20 plc</th>
                                </tr>
                            </thead>
                            <tbody>
                                {roiScenarios.map((row) => (
                                    <tr key={row.fee} className="border-b border-[#e5e5e5] last:border-0">
                                        <td className="px-5 py-3.5 font-bold text-[#0A0A0A]">{row.fee}</td>
                                        <td className="px-5 py-3.5 text-center font-mono text-[#6b7280]">{row.breakeven}</td>
                                        <td className="px-5 py-3.5 text-center font-mono text-[#6b7280]">{row.placements2}</td>
                                        <td className="px-5 py-3.5 text-center font-mono font-bold text-[#F97316]">{row.placements7}</td>
                                        <td className="px-5 py-3.5 text-center font-mono text-[#6b7280]">{row.placements20}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    <p className="mt-5 text-[13px] text-[#9ca3af] italic">
                        Don&apos;t lead with these multiples — lead with your real numbers. Run yours live in the fit call.
                    </p>

                    <div className="mt-6 flex flex-col sm:flex-row gap-3">
                        <Link
                            href="/calculator"
                            className="inline-flex items-center justify-center bg-[#0A0A0A] text-white px-6 py-3 rounded-full text-sm font-semibold hover:bg-[#1f1f1f] transition-colors"
                        >
                            Run the Volume Gap Calculator →
                        </Link>
                        <Link
                            href="/scorecard"
                            className="inline-flex items-center justify-center bg-white text-[#0A0A0A] border border-[#e5e5e5] px-6 py-3 rounded-full text-sm font-semibold hover:bg-[#FAFAFA] transition-colors"
                        >
                            Score your BD function →
                        </Link>
                    </div>
                </div>
            </section>

            <QualityGuarantee />

            {/* Three non-compromises */}
            <section className="py-16 md:py-24 bg-white border-t border-[#e5e5e5]">
                <div className="max-w-[1100px] mx-auto px-4 sm:px-6">
                    <div className="mb-10">
                        <p className="text-xs font-medium text-[#6b7280] uppercase tracking-widest mb-3">What we won&apos;t do</p>
                        <h2 className="text-[#0A0A0A] text-3xl md:text-4xl font-extrabold tracking-tight">
                            Three things we won&apos;t compromise on.
                        </h2>
                        <p className="text-[15px] text-[#6b7280] mt-3 max-w-2xl">
                            These cost real money. They&apos;re also why our retention beats the category average.
                        </p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                        {nonCompromises.map((c, i) => (
                            <div key={c.title} className="bg-[#FAFAFA] rounded-[14px] border border-[#e5e5e5] p-7">
                                <p className="text-[11px] font-mono font-bold text-[#F97316] mb-3">0{i + 1}</p>
                                <h3 className="text-[16px] font-bold text-[#0A0A0A] mb-3 leading-snug">{c.title}</h3>
                                <p className="text-[14px] text-[#6b7280] leading-relaxed">{c.body}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Cancellation terms */}
            <section className="py-16 md:py-24 bg-[#FAFAFA] border-t border-[#e5e5e5]">
                <div className="max-w-[900px] mx-auto px-4 sm:px-6">
                    <div className="mb-8">
                        <p className="text-xs font-medium text-[#6b7280] uppercase tracking-widest mb-3">Terms</p>
                        <h2 className="text-[#0A0A0A] text-3xl md:text-4xl font-extrabold tracking-tight">
                            Plain-English contract terms.
                        </h2>
                    </div>
                    <div className="space-y-3">
                        <div className="bg-white rounded-[10px] border border-[#e5e5e5] p-5">
                            <p className="text-[12px] font-bold uppercase tracking-widest text-[#9ca3af] mb-1.5">Build</p>
                            <p className="text-[15px] text-[#0A0A0A] leading-snug">50% on signing, 50% on Day 30. Build IP transfers to you at the end (sequences, ICP doc, signal map are yours).</p>
                        </div>
                        <div className="bg-white rounded-[10px] border border-[#e5e5e5] p-5">
                            <p className="text-[12px] font-bold uppercase tracking-widest text-[#9ca3af] mb-1.5">Run</p>
                            <p className="text-[15px] text-[#0A0A0A] leading-snug">Billed monthly in advance. <strong>30-day notice to cancel.</strong> No multi-month minimums. Annual review at month 12.</p>
                        </div>
                        <div className="bg-white rounded-[10px] border border-[#e5e5e5] p-5">
                            <p className="text-[12px] font-bold uppercase tracking-widest text-[#9ca3af] mb-1.5">Qualified Meeting Definition</p>
                            <p className="text-[15px] text-[#0A0A0A] leading-snug">Drafted jointly during Build week 1. Signed before Run begins. Reviewed and re-signed every quarter. So &quot;qualified&quot; means the same thing in month 6 as it did on day 1.</p>
                        </div>
                        <div className="bg-white rounded-[10px] border border-[#e5e5e5] p-5">
                            <p className="text-[12px] font-bold uppercase tracking-widest text-[#9ca3af] mb-1.5">Data + infra ownership</p>
                            <p className="text-[15px] text-[#0A0A0A] leading-snug">You own the contacts, the sequences, the domains, the inboxes. We operate them. If the engagement ends, the pipeline keeps working without us.</p>
                        </div>
                    </div>
                </div>
            </section>

            <YourStack />
            <FAQ />
            <FinalCTA />
            <Footer />
        </main>
    );
}
