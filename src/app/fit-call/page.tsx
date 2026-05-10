import type { Metadata } from 'next';
import FitCallForm from '@/components/FitCallForm';
import Footer from '@/components/Footer';

export const metadata: Metadata = {
    title: 'Book a 30-min Fit Call',
    description:
        'Free 30-min fit call. Mandatory 5-question pre-call form. We open the 180-pt BD scorecard live and run your math against your real placement target. By minute 28 — three options and an honest recommendation.',
    alternates: { canonical: '/fit-call' },
    openGraph: {
        title: 'Book a Fit Call — RecruitmentOS',
        description: 'Free 30-min fit call. Same call for everyone. We score your BD function live and run your real volume math.',
        url: 'https://recruitmentos.smallgrp.com/fit-call',
    },
};

const onTheCall = [
    {
        time: '0–10 min',
        title: 'Your state',
        body: 'We walk through what you submitted in the form. We probe deeper on what you\'ve already tried.',
    },
    {
        time: '10–15 min',
        title: 'The math',
        body: 'We open the Volume Gap Calculator on screen and run your real numbers. You see your gap multiplier live.',
    },
    {
        time: '15–22 min',
        title: 'The scorecard',
        body: 'We open the 180-point BD scorecard and score 4–5 highest-leverage rows together. You leave with a clear picture.',
    },
    {
        time: '22–30 min',
        title: 'The honest read',
        body: 'Three options: do nothing, fix it yourself, work with us. We tell you which one we\'d pick — and why.',
    },
];

export default function FitCallPage() {
    return (
        <main className="min-h-screen">
            {/* Hero */}
            <section className="pt-12 pb-12 md:pt-20 md:pb-16 bg-[#F9FAFB] border-b border-[#e5e5e5]">
                <div className="max-w-[900px] mx-auto px-4 sm:px-6 text-center">
                    <p className="text-xs font-semibold text-[#6b7280] uppercase tracking-widest mb-4">Fit Call</p>
                    <h1 className="text-[2.4rem] sm:text-5xl md:text-6xl font-extrabold tracking-[-0.03em] leading-[1.05] text-[#0A0A0A] mb-5 max-w-3xl mx-auto">
                        Free 30-min fit call.
                        <br />
                        <span className="text-[#F97316]">Same call for everyone.</span>
                    </h1>
                    <p className="text-lg md:text-xl text-[#4B5563] max-w-2xl mx-auto leading-relaxed">
                        We don&apos;t run discovery calls. We run fit calls. By minute 28 you&apos;ll know whether RecruitmentOS makes sense for you — and if it doesn&apos;t, we&apos;ll point you at someone who does what you actually need.
                    </p>
                </div>
            </section>

            {/* What happens on the call */}
            <section className="py-12 md:py-16 bg-white border-b border-[#e5e5e5]">
                <div className="max-w-[900px] mx-auto px-4 sm:px-6">
                    <p className="text-xs font-medium text-[#6b7280] uppercase tracking-widest mb-3">What happens on the call</p>
                    <h2 className="text-[#0A0A0A] text-2xl md:text-3xl font-extrabold tracking-tight mb-8">
                        Four blocks. Time-boxed. No drift.
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {onTheCall.map((item) => (
                            <div key={item.time} className="bg-[#FAFAFA] rounded-[12px] border border-[#e5e5e5] p-6">
                                <p className="text-[11px] font-mono font-bold text-[#F97316] mb-2">{item.time}</p>
                                <h3 className="text-[16px] font-bold text-[#0A0A0A] mb-2">{item.title}</h3>
                                <p className="text-[14px] text-[#6b7280] leading-relaxed">{item.body}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* The form */}
            <FitCallForm />

            <Footer />
        </main>
    );
}
