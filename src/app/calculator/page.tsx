import type { Metadata } from 'next';
import VolumeGapCalculator from '@/components/VolumeGapCalculator';
import Footer from '@/components/Footer';

export const metadata: Metadata = {
    title: 'Volume Gap Calculator — How Much Outreach Do You Actually Need?',
    description:
        'Plug in your placement target, average fee, close rate, and reply rate. Get the monthly outreach volume your math actually requires — and your gap multiplier vs current.',
    alternates: { canonical: '/calculator' },
    openGraph: {
        title: 'Volume Gap Calculator — RecruitmentOS',
        description: 'See exactly how much outreach your placement target requires. Free. No pricing in the UI.',
        url: 'https://recruitmentos.smallgrp.com/calculator',
    },
};

export default function CalculatorPage() {
    return (
        <main className="min-h-screen">
            <section className="pt-12 pb-8 md:pt-20 md:pb-12 bg-[#F9FAFB] border-b border-[#e5e5e5]">
                <div className="max-w-[900px] mx-auto px-4 sm:px-6 text-center">
                    <p className="text-xs font-semibold text-[#6b7280] uppercase tracking-widest mb-4">Free Instrument</p>
                    <h1 className="text-[2.4rem] sm:text-5xl md:text-6xl font-extrabold tracking-[-0.03em] leading-[1.05] text-[#0A0A0A] mb-5 max-w-3xl mx-auto">
                        Volume Gap Calculator
                    </h1>
                    <p className="text-lg md:text-xl text-[#4B5563] max-w-2xl mx-auto leading-relaxed">
                        How much monthly outreach does your placement target actually require? Plug in your real numbers. We won&apos;t store them — they live only in your browser.
                    </p>
                </div>
            </section>

            <VolumeGapCalculator />

            <Footer />
        </main>
    );
}
