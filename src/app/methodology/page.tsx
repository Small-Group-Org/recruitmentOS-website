import Link from 'next/link';
import { Button } from '@/components/ui';
import Footer from '@/components/Footer';
import {
    methodologySteps,
    buildDeliverables,
    runCadence,
    sixQuestionInterview,
    nonCompromises,
    ownership,
} from '@/lib/methodology-data';
import { buildCanonical } from '@/lib/seo';
import { JsonLd } from '@/components/JsonLd';
import { serviceWithOffersSchema } from '@/lib/schemas';

export const metadata = {
    title: 'How RecruitmentOS Works — 5-Phase Process',
    description: 'From discovery and ICP to daily outreach, analysis, and scaling — a clear five-phase process that takes you from zero to a self-sustaining BD pipeline.',
    alternates: { canonical: buildCanonical('/methodology') },
};

export default function MethodologyPage() {
    return (
        <main className="min-h-screen bg-white">
            <JsonLd data={serviceWithOffersSchema} />
            <div className="pt-12 pb-24">
                <div className="max-w-[1100px] mx-auto px-6 sm:px-10">

                    <Link
                        href="/"
                        className="inline-flex items-center text-sm text-black hover:text-[#FF6A00] transition-colors mb-12"
                    >
                        <svg className="mr-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                        </svg>
                        BACK TO HOME
                    </Link>

                    {/* Hero */}
                    <div className="mb-20 max-w-3xl">
                        <p className="text-xs font-bold text-[#FF6A00] uppercase tracking-widest mb-3">Methodology</p>
                        <h1 className="text-[#0A0A0A] text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight leading-[1.05] mb-6">
                            How RecruitmentOS works.
                        </h1>
                        <p className="hero-sub mb-8">
                            Five phases. Ready in <strong className="font-semibold text-[#0A0A0A]">2 weeks</strong>. Outreach live by <strong className="font-semibold text-[#0A0A0A]">Week 2</strong>. A self-sustaining pipeline by <strong className="font-semibold text-[#0A0A0A]">Month 3</strong> — and running indefinitely after that.
                        </p>

                        {/* 5-phase timeline strip */}
                        <div className="bg-[#F9FAFB] border border-[#E5E5E5] rounded-2xl p-6">
                            <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
                                {[
                                    { timing: 'Week 0–2',  label: 'Setup & Foundation' },
                                    { timing: 'Week 2–3',  label: 'Campaign Live' },
                                    { timing: 'Week 3–4',  label: 'First Analysis' },
                                    { timing: 'Month 2–3', label: 'Scale & Optimise' },
                                    { timing: 'Always',    label: 'Ongoing' },
                                ].map((p, i) => (
                                    <div key={i} className="bg-white border border-[#E5E5E5] rounded-xl p-4">
                                        <p className="text-[10px] font-bold tracking-widest uppercase text-[#FF6A00] mb-1">{p.timing}</p>
                                        <p className="text-sm font-bold text-[#0A0A0A] leading-snug">{p.label}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* 4 steps */}
                    <section className="mb-24 space-y-16">
                        {methodologySteps.map((step) => (
                            <div key={step.number} className="grid grid-cols-1 lg:grid-cols-[100px_1fr] gap-6 lg:gap-12 border-t border-[#E5E5E5] pt-10">
                                <div>
                                    <span className="text-4xl sm:text-5xl font-black text-[#F3F4F6] select-none">{step.number}</span>
                                </div>
                                <div>
                                    <p className="text-[10px] font-bold tracking-widest uppercase text-[#9CA3AF] mb-2">{step.phase}</p>
                                    <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#0A0A0A] leading-tight mb-6">
                                        {step.name}
                                    </h2>
                                    <div className="space-y-3">
                                        {step.subComponents.map((sc) => (
                                            <div key={sc.title} className="flex items-start gap-3">
                                                <span className="w-1.5 h-1.5 rounded-full bg-[#FF6A00] mt-2.5 flex-shrink-0" />
                                                <div>
                                                    <span className="text-sm font-bold text-[#0A0A0A]">{sc.title}</span>
                                                    <span className="text-sm text-[#6B7280] font-medium"> — {sc.description}</span>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </section>

                    {/* Build deliverables */}
                    <section className="mb-20 bg-[#0A0A0A] rounded-2xl px-8 sm:px-12 py-12">
                        <p className="text-[10px] font-bold tracking-widest uppercase text-[#FF6A00] mb-3">What's ready by Week 2</p>
                        <h2 className="text-white text-2xl sm:text-3xl font-bold mb-2 leading-tight">What's live before the first email goes out.</h2>
                        <p className="text-white/50 text-sm mb-8 leading-relaxed">Everything below is built, tested, and handed over during Setup & Foundation — so Campaign Live starts at full speed.</p>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                            {buildDeliverables.map((d) => (
                                <div key={d} className="flex items-center gap-3 py-2 border-b border-white/10">
                                    <span className="text-[#FF6A00] font-bold text-sm">✓</span>
                                    <span className="text-white text-sm font-medium">{d}</span>
                                </div>
                            ))}
                        </div>
                    </section>

                    {/* Run cadence */}
                    <section className="mb-20">
                        <p className="text-[10px] font-bold tracking-widest uppercase text-[#FF6A00] mb-3">Ongoing cadence</p>
                        <h2 className="text-[#0A0A0A] text-2xl sm:text-3xl font-bold mb-8 leading-tight">What happens every day, week, month, quarter.</h2>
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                            {runCadence.map((c) => (
                                <div key={c.period} className="bg-white border border-[#E5E5E5] rounded-xl p-5">
                                    <p className="text-[10px] font-bold tracking-widest uppercase text-[#FF6A00] mb-3">{c.period}</p>
                                    <ul className="space-y-2">
                                        {c.items.map((i) => (
                                            <li key={i} className="text-sm text-[#374151] font-medium leading-snug">{i}</li>
                                        ))}
                                    </ul>
                                </div>
                            ))}
                        </div>
                    </section>

                    {/* What you own / what we operate */}
                    <section className="mb-20 border-t border-[#E5E5E5] pt-12">
                        <p className="text-[10px] font-bold tracking-widest uppercase text-[#FF6A00] mb-3">Ownership</p>
                        <h2 className="text-[#0A0A0A] text-2xl sm:text-3xl font-bold mb-8 leading-tight">Your stack stays yours. We operate it.</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="bg-[#F9FAFB] border border-[#E5E5E5] rounded-xl p-6">
                                <p className="text-[10px] font-bold tracking-widest uppercase text-[#0A0A0A] mb-3">You own</p>
                                <ul className="space-y-2">
                                    {ownership.you.map((item) => (
                                        <li key={item} className="text-sm text-[#374151] font-medium flex items-start gap-2">
                                            <span className="text-[#0A0A0A] font-bold flex-shrink-0">✓</span>
                                            <span>{item}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                            <div className="bg-[#F9FAFB] border border-[#E5E5E5] rounded-xl p-6">
                                <p className="text-[10px] font-bold tracking-widest uppercase text-[#FF6A00] mb-3">We operate</p>
                                <ul className="space-y-2">
                                    {ownership.we.map((item) => (
                                        <li key={item} className="text-sm text-[#374151] font-medium flex items-start gap-2">
                                            <span className="text-[#FF6A00] font-bold flex-shrink-0">✓</span>
                                            <span>{item}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </section>

                    {/* 6-question fit interview */}
                    <section className="mb-20 border-t border-[#E5E5E5] pt-12">
                        <p className="text-[10px] font-bold tracking-widest uppercase text-[#FF6A00] mb-3">The fit interview</p>
                        <h2 className="text-[#0A0A0A] text-2xl sm:text-3xl font-bold mb-3 leading-tight">6 questions we ask on the fit call.</h2>
                        <p className="section-sub mb-8 max-w-2xl">
                            You are being interviewed. You know it. Pass = we sign. Fail = we don&#39;t, even if you want to.
                        </p>
                        <ol className="space-y-4">
                            {sixQuestionInterview.map((q, i) => (
                                <li key={i} className="flex items-start gap-4 bg-white border border-[#E5E5E5] rounded-xl p-5">
                                    <span className="text-2xl font-black text-[#FF6A00] leading-none">{i + 1}</span>
                                    <p className="text-base text-[#0A0A0A] font-medium leading-relaxed pt-0.5">{q}</p>
                                </li>
                            ))}
                        </ol>
                    </section>

                    {/* Three non-compromises */}
                    <section className="mb-20 border-t border-[#E5E5E5] pt-12">
                        <p className="text-[10px] font-bold tracking-widest uppercase text-[#FF6A00] mb-3">The three things we won&#39;t compromise on</p>
                        <h2 className="text-[#0A0A0A] text-2xl sm:text-3xl font-bold mb-8 leading-tight">Selectivity is the product.</h2>
                        <div className="space-y-5">
                            {nonCompromises.map((nc) => (
                                <div key={nc.title} className="border-l-4 border-[#FF6A00] pl-6 py-2">
                                    <h3 className="text-lg font-bold text-[#0A0A0A] mb-2 leading-snug">{nc.title}</h3>
                                    <p className="text-sm text-[#6B7280] font-medium leading-relaxed">{nc.body}</p>
                                </div>
                            ))}
                        </div>
                    </section>

                    {/* CTA */}
                    <section className="border-t border-[#E5E5E5] pt-12 text-center max-w-2xl mx-auto">
                        <h2 className="text-2xl sm:text-3xl font-bold text-[#0A0A0A] mb-3 leading-tight">
                            Think your agency passes the fit interview?
                        </h2>
                        <p className="section-sub mb-8">
                            On the fit call we open the 180-point BD scorecard live, score your agency together, run your volume math, and identify the 1–3 highest-leverage things we&#39;d build first.
                        </p>
                        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                            <Button href="https://cal.com/tusharm/30min?user=tusharm" target="_blank" variant="dark" size="lg" pill>
                                Book a fit call
                            </Button>
                            <Button href="/services" variant="secondary" size="lg" pill>
                                See the 5 services →
                            </Button>
                        </div>
                    </section>

                </div>
            </div>
            <Footer />
        </main>
    );
}
