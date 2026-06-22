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
                        <p className="hero-sub mb-5">
                            Most agencies guess with their BD. We build a clear system. Outreach starts by <strong className="font-semibold text-[#0A0A0A]">Week 2</strong>. Steady pipeline by <strong className="font-semibold text-[#0A0A0A]">Month 3</strong>.
                        </p>

                        {/* Proof stat callout */}
                        <div className="inline-flex items-center gap-2.5 bg-[#FFF7F0] border border-[#FFD9C0] rounded-lg px-4 py-2.5 mb-8">
                            <span className="w-2 h-2 rounded-full bg-[#FF6A00] flex-shrink-0" />
                            <p className="text-sm text-[#374151] font-medium">
                                From one campaign: <strong className="text-[#0A0A0A]">7,550 leads</strong> → <strong className="text-[#0A0A0A]">11.38% reply rate</strong> → <strong className="text-[#FF6A00]">36 positive opportunities</strong>
                            </p>
                        </div>

                        <div className="mb-10">
                            <Button href="https://cal.com/tusharm/30min?user=tusharm" target="_blank" variant="dark" size="lg" pill>
                                Book a fit call
                            </Button>
                        </div>

                        {/* 5-phase timeline strip */}
                        <div className="bg-[#F9FAFB] border border-[#E5E5E5] rounded-2xl p-6">
                            <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
                                {[
                                    { timing: 'Week 0–2', label: 'Setup & Foundation' },
                                    { timing: 'Week 2–3', label: 'Campaign Live' },
                                    { timing: 'Week 3–4', label: 'First Analysis' },
                                    { timing: 'Month 2–3', label: 'Scale & Optimise' },
                                    { timing: 'Always', label: 'Ongoing' },
                                ].map((p, i) => (
                                    <div key={i} className="bg-white border border-[#E5E5E5] rounded-xl p-4 hover:border-[#FF6A00]/40 transition-colors">
                                        <p className="text-[10px] font-bold tracking-widest uppercase text-[#FF6A00] mb-1">{p.timing}</p>
                                        <p className="text-sm font-bold text-[#0A0A0A] leading-snug">{p.label}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Why RecruitmentOS is different */}
                    <section className="mb-24 border-t border-[#E5E5E5] pt-16">
                        <p className="text-[10px] font-bold tracking-widest uppercase text-[#FF6A00] mb-3">The Recruitment Difference</p>
                        <h2 className="text-[#0A0A0A] text-2xl sm:text-3xl font-bold mb-4 leading-tight">
                            Built for recruiters. Not a generic email agency.
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                            {/* Left Big Card (Bad) */}
                            <div className="bg-[#FAFAFA] border border-[#E5E5E5] rounded-2xl p-6 md:p-8">
                                <p className="text-[10px] font-bold tracking-widest uppercase text-[#9CA3AF] mb-6">Generic Lead Gen / Cold Email Agencies</p>
                                <div className="space-y-6">
                                    {[
                                        { title: 'Random contact lists', desc: 'They buy a list, blast it, hope something sticks.' },
                                        { title: 'Copy-paste pitches', desc: 'Same "can we help you scale?" email to everyone. Feels like spam.' },
                                        { title: 'They email HR', desc: 'Who forwards it to no one.' },
                                        { title: 'One template for everyone', desc: 'No context, no relevance, no replies.' },
                                        { title: 'A spreadsheet dump', desc: 'Here\'s your CSV, good luck.' },
                                    ].map((bad, idx) => (
                                        <div key={idx} className="flex items-start gap-3">
                                            <span className="text-red-400 font-bold text-base leading-none mt-0.5 flex-shrink-0">✕</span>
                                            <div>
                                                <p className="text-sm font-bold text-[#374151]">{bad.title}</p>
                                                <p className="text-xs text-[#9CA3AF] mt-1 leading-relaxed">{bad.desc}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Right Big Card (Good) */}
                            <div className="bg-[#FFFDFB] border border-[#FFD9C0] rounded-2xl p-6 md:p-8 shadow-sm">
                                <p className="text-[10px] font-bold tracking-widest uppercase text-[#FF6A00] mb-6">RecruitmentOS</p>
                                <div className="space-y-6">
                                    {[
                                        { title: 'We research your exact buyer first', desc: 'Industry, seniority, company size, location. No email goes out until we know who we\'re targeting.' },
                                        { title: 'Your inbox lands, not your spam folder', desc: 'Domains set up properly so emails actually get delivered.' },
                                        { title: 'We find the actual decision-maker', desc: 'The person with the open role and the budget. Direct email, verified.' },
                                        { title: 'Every email feels personal', desc: '6–7 sequences written for your niche, tailored to what each hiring manager is actually hiring for.' },
                                        { title: 'Clean leads, ready to use', desc: 'Every contact exported and ready to drop into whatever CRM you use.' },
                                    ].map((good, idx) => (
                                        <div key={idx} className="flex items-start gap-3">
                                            <span className="text-[#FF6A00] font-bold text-base leading-none mt-0.5 flex-shrink-0">✓</span>
                                            <div>
                                                <p className="text-sm font-bold text-[#0A0A0A]">{good.title}</p>
                                                <p className="text-xs text-[#374151] mt-1 leading-relaxed">{good.desc}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* 5 phases */}
                    <section className="mb-24 space-y-12">
                        {methodologySteps.map((step) => (
                            <div key={step.number} className="grid grid-cols-1 lg:grid-cols-[80px_1fr] gap-6 lg:gap-10 border-t border-[#E5E5E5] pt-10">
                                <div className="flex items-start">
                                    <span className="text-4xl sm:text-5xl font-black text-[#E5E7EB] select-none leading-none">{step.number}</span>
                                </div>
                                <div>
                                    <p className="text-[10px] font-bold tracking-widest uppercase text-[#FF6A00] mb-2">{step.phase}</p>
                                    <h2 className="text-2xl sm:text-3xl font-bold text-[#0A0A0A] leading-tight mb-4">
                                        {step.name}
                                    </h2>
                                    <div className="bg-[#FAFAFA] border border-[#E5E5E5] rounded-2xl p-6 md:p-8">
                                        <div className="space-y-4">
                                            {step.subComponents.map((sc, idx) => (
                                                <div key={idx} className="flex items-start gap-3">
                                                    <span className="w-1.5 h-1.5 rounded-full bg-[#FF6A00] mt-2 flex-shrink-0" />
                                                    <div>
                                                        <span className="text-sm font-bold text-[#0A0A0A]">{sc.title}</span>
                                                        <span className="text-sm text-[#6B7280] font-medium"> — {sc.description}</span>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </section>

                    {/* The Recruitment Intelligence Engine */}
                    <section className="mb-24 border-t border-[#E5E5E5] pt-16">
                        <p className="text-[10px] font-bold tracking-widest uppercase text-[#FF6A00] mb-3">Core Infrastructure</p>
                        <h2 className="text-[#0A0A0A] text-2xl sm:text-3xl font-bold mb-4 leading-tight">
                            The Recruitment Intelligence Engine
                        </h2>
                        <p className="text-[#6B7280] text-sm max-w-2xl mb-10 leading-relaxed">
                            We don&#39;t buy lists and blast them. We detect live hiring intent, find the actual decision-maker, and send something worth reading.
                        </p>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                            {[
                                {
                                    step: '01',
                                    title: 'We spot who\'s hiring',
                                    desc: '20+ job boards, LinkedIn, and careers pages monitored daily.',
                                    icon: <svg className="w-5 h-5 text-[#FF6A00]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}><path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>,
                                },
                                {
                                    step: '02',
                                    title: 'We find the right person',
                                    desc: 'The line manager with the open role, not HR.',
                                    icon: <svg className="w-5 h-5 text-[#FF6A00]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}><path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>,
                                },
                                {
                                    step: '03',
                                    title: 'We write emails that get replies',
                                    desc: '6–7 sequences built for your desk, tested and improved weekly.',
                                    icon: <svg className="w-5 h-5 text-[#FF6A00]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}><path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>,
                                },
                                {
                                    step: '04',
                                    title: 'We hand you clean data',
                                    desc: 'Every contact verified and exported as a CSV ready for your CRM.',
                                    icon: <svg className="w-5 h-5 text-[#FF6A00]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}><path strokeLinecap="round" strokeLinejoin="round" d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4" /></svg>,
                                }
                            ].map((item, idx) => (
                                <div key={idx} className="bg-white border border-[#E5E5E5] rounded-2xl p-6 relative overflow-hidden hover:border-[#FF6A00]/40 hover:shadow-md transition-all duration-200">
                                    <div className="flex items-center gap-2 mb-3">
                                        <span className="text-lg">{item.icon}</span>
                                        <span className="text-[10px] font-bold tracking-widest uppercase text-[#FF6A00]">Step {item.step}</span>
                                    </div>
                                    <h3 className="text-sm font-bold text-[#0A0A0A] mb-2">{item.title}</h3>
                                    <p className="text-xs text-[#6B7280] leading-relaxed">{item.desc}</p>
                                </div>
                            ))}
                        </div>
                    </section>

                    {/* Build deliverables */}
                    <section className="mb-20 bg-[#0A0A0A] rounded-2xl px-8 sm:px-12 py-12">
                        <p className="text-[10px] font-bold tracking-widest uppercase text-[#FF6A00] mb-3">What&#39;s ready by Week 2</p>
                        <h2 className="text-white text-2xl sm:text-3xl font-bold mb-2 leading-tight">What&#39;s ready before the first email goes out.</h2>
                        <p className="text-white/50 text-sm mb-8 leading-relaxed">Everything below is built, tested, and signed off during Setup & Foundation — so Campaign Live starts at full speed.</p>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                            {buildDeliverables.map((d) => (
                                <div key={d} className="flex items-center gap-3 py-2.5 border-b border-white/10">
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
                            {runCadence.map((c, idx) => (
                                <div key={c.period} className="bg-white border border-[#E5E5E5] rounded-xl p-5 hover:border-[#FF6A00]/30 transition-colors">
                                    <div className="flex items-center gap-2 mb-4">
                                        <div className="w-8 h-8 rounded-lg bg-[#FFF7F0] flex items-center justify-center">
                                            <span className="text-[#FF6A00] text-xs font-black">{['D', 'W', 'M', 'Q'][idx]}</span>
                                        </div>
                                        <p className="text-[10px] font-bold tracking-widest uppercase text-[#FF6A00]">{c.period}</p>
                                    </div>
                                    <ul className="space-y-2.5">
                                        {c.items.map((i) => (
                                            <li key={i} className="text-sm text-[#374151] font-medium leading-snug flex items-start gap-2">
                                                <span className="w-1 h-1 rounded-full bg-[#D1D5DB] mt-2 flex-shrink-0" />
                                                {i}
                                            </li>
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
                                <div className="flex items-center gap-2 mb-4">
                                    <div className="w-7 h-7 rounded-md bg-[#0A0A0A] flex items-center justify-center">
                                        <span className="text-white text-xs font-black">Y</span>
                                    </div>
                                    <p className="text-xs font-bold tracking-widest uppercase text-[#0A0A0A]">You own</p>
                                </div>
                                <ul className="space-y-3">
                                    {ownership.you.map((item) => (
                                        <li key={item} className="text-sm text-[#374151] font-medium flex items-start gap-2">
                                            <span className="text-[#0A0A0A] font-bold flex-shrink-0">✓</span>
                                            <span>{item}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                            <div className="bg-[#FFFDFB] border border-[#FFD9C0] rounded-xl p-6 shadow-sm">
                                <div className="flex items-center gap-2 mb-4">
                                    <div className="w-7 h-7 rounded-md bg-[#FF6A00] flex items-center justify-center">
                                        <span className="text-white text-xs font-black">W</span>
                                    </div>
                                    <p className="text-xs font-bold tracking-widest uppercase text-[#FF6A00]">We operate</p>
                                </div>
                                <ul className="space-y-3">
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
                        <p className="section-sub mb-3 max-w-2xl">
                            We turn down more agencies than we take on. Here&#39;s what we&#39;re looking for.
                        </p>
                        <p className="text-sm text-[#374151] italic mb-8 max-w-2xl">
                            You are being interviewed. You know it. Pass = we sign. Fail = we don&#39;t, even if you want to.
                        </p>
                        <div className="space-y-2.5">
                            {sixQuestionInterview.map((q, i) => (
                                <div key={i} className="flex items-center gap-4 bg-white border border-[#E5E5E5] rounded-xl px-5 py-3 hover:border-[#FF6A00]/30 transition-colors">
                                    <span className="w-8 h-8 rounded-lg bg-[#FFF7F0] flex items-center justify-center flex-shrink-0">
                                        <span className="text-base font-black text-[#FF6A00] leading-none">{i + 1}</span>
                                    </span>
                                    <p className="text-sm text-[#0A0A0A] font-medium">{q}</p>
                                </div>
                            ))}
                        </div>
                    </section>

                    {/* Three non-compromises */}
                    <section className="mb-20 border-t border-[#E5E5E5] pt-12">
                        <p className="text-[10px] font-bold tracking-widest uppercase text-[#FF6A00] mb-3">The three things we won&#39;t compromise on</p>
                        <h2 className="text-[#0A0A0A] text-2xl sm:text-3xl font-bold mb-8 leading-tight">The three things we won&#39;t budge on.</h2>
                        <div className="space-y-4">
                            {nonCompromises.map((nc, idx) => (
                                <div key={nc.title} className="border-l-4 border-[#FF6A00] bg-[#FFFDFB] rounded-r-xl pl-6 pr-6 py-5">
                                    <div className="flex items-center gap-2 mb-2">
                                        <span className="text-xs font-black text-[#FF6A00]">0{idx + 1}</span>
                                        <h3 className="text-base font-bold text-[#0A0A0A] leading-snug">{nc.title}</h3>
                                    </div>
                                    <p className="text-sm text-[#6B7280] font-medium leading-relaxed">{nc.body}</p>
                                </div>
                            ))}
                        </div>
                    </section>

                    {/* CTA */}
                    <section className="bg-[#F9FAFB] border border-[#E5E5E5] rounded-2xl px-8 sm:px-12 py-14 text-center max-w-3xl mx-auto">
                        <h2 className="text-2xl sm:text-3xl font-bold text-[#0A0A0A] mb-3 leading-tight">
                            Think your agency passes?
                        </h2>
                        <p className="section-sub mb-8 max-w-xl mx-auto">
                            On the fit call, we dig into your agency, discuss where BD is breaking down, and map out exactly what we&#39;d build first — and how fast you&#39;d see results.
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
