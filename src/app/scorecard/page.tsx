import type { Metadata } from 'next';
import BdScorecard from '@/components/BdScorecard';
import Footer from '@/components/Footer';

export const metadata: Metadata = {
    title: 'BD Bottleneck Scorecard — 180-Point Diagnostic',
    description:
        '12-minute self-scored diagnostic for $500K–$5M recruitment agencies. Tells you what is actually leaking in your BD function. Free.',
    alternates: { canonical: '/scorecard' },
    openGraph: {
        title: 'BD Bottleneck Scorecard — RecruitmentOS',
        description: '180-point diagnostic. 12 minutes. Tells you what\'s actually leaking in your BD function.',
        url: 'https://recruitmentos.smallgrp.com/scorecard',
    },
};

export default function ScorecardPage() {
    return (
        <main className="min-h-screen">
            <section className="pt-12 pb-8 md:pt-20 md:pb-12 bg-[#F9FAFB] border-b border-[#e5e5e5]">
                <div className="max-w-[900px] mx-auto px-4 sm:px-6 text-center">
                    <p className="text-xs font-semibold text-[#6b7280] uppercase tracking-widest mb-4">Free Instrument</p>
                    <h1 className="text-[2.4rem] sm:text-5xl md:text-6xl font-extrabold tracking-[-0.03em] leading-[1.05] text-[#0A0A0A] mb-5 max-w-3xl mx-auto">
                        BD Bottleneck Scorecard
                    </h1>
                    <p className="text-lg md:text-xl text-[#4B5563] max-w-2xl mx-auto leading-relaxed mb-3">
                        180-point diagnostic for recruitment agencies $500K–$5M. 12 minutes. Tells you what&apos;s actually leaking.
                    </p>
                    <p className="text-[14px] text-[#6b7280]">Score yourself 1–5 on each item. The total auto-calculates.</p>
                </div>
            </section>

            <BdScorecard />

            <Footer />
        </main>
    );
}
