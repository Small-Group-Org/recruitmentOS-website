import Link from 'next/link';
import Footer from '@/components/Footer';

import { buildCanonical } from '@/lib/seo';
import { JsonLd } from '@/components/JsonLd';
import { personSchema } from '@/lib/schemas';

export const metadata = {
    title: 'Tushar Mangla — Founder, RecruitmentOS',
    description: 'Why RecruitmentOS exists. The 60-day guarantee. How to reach me.',
    alternates: { canonical: buildCanonical('/about') },
};

const contactMethods = [
    {
        label: 'Book a fit call',
        href: 'https://cal.com/tusharm/30min?user=tusharm',
        description: 'Free 30 minutes. We open the BD scorecard live.',
        external: true,
    },
    {
        label: 'WhatsApp',
        href: 'https://wa.me/919667353913',
        description: 'I reply personally — usually same day.',
        external: true,
    },
    {
        label: 'LinkedIn',
        href: 'https://www.linkedin.com/in/tusharmanglatm/',
        description: '@tusharmanglatm — connect, message, follow.',
        external: true,
    },
    {
        label: 'Email',
        href: 'mailto:tushar.mangla1120@gmail.com',
        description: '48-hour response — slower than WhatsApp.',
        external: false,
    },
];

export default function AboutPage() {
    return (
        <main className="min-h-screen bg-white">
            <JsonLd data={personSchema} />
            <div className="pt-24 pb-32">
                <div className="max-w-[900px] mx-auto px-6 sm:px-10">

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
                    <div className="mb-12 sm:mb-16">
                        <p className="text-xs font-bold text-[#FF6A00] uppercase tracking-widest mb-3">Founder</p>
                        <h1 className="text-[#0A0A0A] text-3xl sm:text-5xl md:text-6xl font-bold tracking-tight leading-[1.05] mb-5">
                            Tushar Mangla.
                        </h1>
                        <p className="hero-sub">
                            Founder, RecruitmentOS. I run the BD function for established recruitment agencies.
                        </p>
                    </div>

                    {/* Why I built this */}
                    <section className="mb-16">
                        <h2 className="text-[#0A0A0A] text-2xl sm:text-3xl font-bold mb-6 leading-tight">Why I built this.</h2>
                        <div className="prose prose-lg max-w-none space-y-5 text-[#374151] leading-relaxed text-base sm:text-lg font-medium">
                            <p>
                                I spoke to 60+ recruitment agency owners in 3 days. US, UK, Australia, Belgium, Singapore, Nigeria. I asked one question: what's your biggest pain right now?
                            </p>
                            <p>
                                Every single one — solo founders to 27-year veterans — said the same five things. Can't find new clients fast enough. The team spends all day on manual tasks. Tools don't talk to each other. By the time they reach a job post, it's too late. They tried automation before and it didn't work.
                            </p>
                            <p>
                                What struck me wasn't the list. It was that a solo founder in Nigeria and a 27-year veteran in Australia had the same problem. Different markets. Different niches. Different experience levels. The same problem.
                            </p>
                            <p>
                                I watched one agency spend <strong className="font-bold text-[#0A0A0A]">$25,000 on a generic automation system</strong>. Four months. Zero placements. The system wasn't built for their business — it was built for "recruitment agencies in general." Accounting in a practice and accounting in a commercial business are completely different markets. The generic tool didn't know that.
                            </p>
                            <p>
                                I built RecruitmentOS because <strong className="font-bold text-[#0A0A0A]">generic systems fail specific businesses</strong>. Every time. The fix isn't another tool — it's an outsourced BD function built for your niche, your stack, your placement target.
                            </p>
                        </div>
                    </section>

                    {/* What I actually do */}
                    <section className="mb-16 border-t border-[#E5E5E5] pt-12">
                        <h2 className="text-[#0A0A0A] text-2xl sm:text-3xl font-bold mb-6 leading-tight">What I actually do.</h2>
                        <ul className="space-y-4">
                            <li className="flex items-start gap-4">
                                <span className="text-[#FF6A00] font-bold flex-shrink-0 mt-1">→</span>
                                <p className="text-base sm:text-lg text-[#374151] font-medium leading-relaxed">
                                    I run your BD function for the first 60 days myself. Niche immersion, signal engine, outreach, reply triage — on your stack, with you watching every step.
                                </p>
                            </li>
                            <li className="flex items-start gap-4">
                                <span className="text-[#FF6A00] font-bold flex-shrink-0 mt-1">→</span>
                                <p className="text-base sm:text-lg text-[#374151] font-medium leading-relaxed">
                                    I open the 180-point BD scorecard live on every fit call. We score your agency together. We run your volume math against your actual placement target.
                                </p>
                            </li>
                            <li className="flex items-start gap-4">
                                <span className="text-[#FF6A00] font-bold flex-shrink-0 mt-1">→</span>
                                <p className="text-base sm:text-lg text-[#374151] font-medium leading-relaxed">
                                    I turn down 7 in 10 agencies that ask. The 3 non-compromises (no outreach without niche-specific filtering · no promised meetings without a written QMD · no Setup for an agency whose delivery isn't ready) <Link href="/methodology" className="text-[#FF6A00] font-bold underline underline-offset-2 hover:text-[#0A0A0A]">explain why</Link>.
                                </p>
                            </li>
                        </ul>
                    </section>

                    {/* 60-day guarantee */}
                    <section className="mb-16 border-t border-[#E5E5E5] pt-12">
                        <div className="bg-[#0A0A0A] rounded-2xl px-8 sm:px-12 py-12 text-center">
                            <p className="text-[10px] font-bold tracking-widest uppercase text-[#FF6A00] mb-3">The 60-day guarantee</p>
                            <h2 className="text-white text-2xl sm:text-4xl font-bold leading-tight mb-4 max-w-2xl mx-auto">
                                100 hiring-manager contacts and 10 verified replies in 60 days — or we work free until we do.
                            </h2>
                            <p className="text-[#9CA3AF] text-sm sm:text-base font-medium max-w-2xl mx-auto">
                                Why I can promise this: niche specificity + signal-first sourcing + daily operation. The system doesn't work on volume alone; it works because every signal is filtered to your niche before a single email goes out.
                            </p>
                        </div>
                    </section>

                    {/* How to reach me */}
                    <section className="mb-16 border-t border-[#E5E5E5] pt-12">
                        <h2 className="text-[#0A0A0A] text-2xl sm:text-3xl font-bold mb-3 leading-tight">How to reach me.</h2>
                        <p className="section-sub mb-8">
                            WhatsApp is fastest. Email is slowest. Fit call is best.
                        </p>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            {contactMethods.map((c) => (
                                <Link
                                    key={c.label}
                                    href={c.href}
                                    target={c.external ? '_blank' : undefined}
                                    rel={c.external ? 'noopener noreferrer' : undefined}
                                    className="block bg-white border border-[#E5E5E5] rounded-xl p-5 hover:border-[#FF6A00]/40 hover:bg-[#FFF4EB]/30 transition-all group"
                                >
                                    <div className="flex items-center justify-between mb-2">
                                        <span className="text-base font-bold text-[#0A0A0A] group-hover:text-[#FF6A00] transition-colors">
                                            {c.label}
                                        </span>
                                        <svg className="w-4 h-4 text-[#9CA3AF] group-hover:text-[#FF6A00] group-hover:translate-x-1 transition-all" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                        </svg>
                                    </div>
                                    <p className="text-sm text-[#6B7280] font-medium">{c.description}</p>
                                </Link>
                            ))}
                        </div>
                    </section>

                    {/* Trust footer (small row of credibility lines) */}
                    <section className="border-t border-[#E5E5E5] pt-10 text-sm text-[#9CA3AF] font-medium flex flex-wrap items-center justify-center gap-x-6 gap-y-2">
                        <span>60+ agencies advised across 6 countries</span>
                        <span className="hidden sm:inline">·</span>
                        <span>Founder, Small Group</span>
                        <span className="hidden sm:inline">·</span>
                        <span>Based in India · serving US / UK / EU / APAC</span>
                    </section>

                </div>
            </div>
            <Footer />
        </main>
    );
}
