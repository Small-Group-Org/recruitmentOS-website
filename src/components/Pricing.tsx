'use client';

import { useState } from 'react';
import Link from 'next/link';
import GeneralROICalculator from '@/components/tools/GeneralROICalculator';
import { brackets, pickBracket, type Bracket } from '@/lib/pricing-data';

export default function Pricing() {
    const [placementsPerMo, setPlacementsPerMo] = useState(4);
    const activeBracket = pickBracket(placementsPerMo);

    return (
        <section className="bg-white pt-24 pb-32" id="pricing">
            <div className="max-w-[1240px] mx-auto px-6 sm:px-10">

                {/* Hero */}
                <div className="mb-12 sm:mb-16 max-w-3xl">
                    <p className="text-xs font-bold text-[#FF6A00] uppercase tracking-widest mb-3">Pricing</p>
                    <h1 className="text-[#0A0A0A] text-3xl sm:text-5xl md:text-6xl font-bold tracking-tight leading-[1.05] mb-5">
                        Your price, your numbers.
                    </h1>
                    <p className="hero-sub">
                        Plug in your placement target below. The calculator picks your bracket and shows your actual monthly price — driven by Sheet 1 math, not a brochure.
                    </p>
                </div>

                {/* Calculator — primary element */}
                <div className="mb-16 sm:mb-20">
                    <GeneralROICalculator
                        embedded
                        initialPlacements={placementsPerMo}
                        onPlacementsChange={setPlacementsPerMo}
                    />
                </div>

                {/* Bracket comparison cards */}
                <div className="mb-12 sm:mb-16 border-t border-[#E5E5E5] pt-12 sm:pt-16">
                    <div className="mb-10 sm:mb-12 max-w-2xl">
                        <p className="text-xs font-bold text-[#FF6A00] uppercase tracking-widest mb-3">Compare the brackets</p>
                        <h2 className="text-[#0A0A0A] text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight leading-tight">
                            Three packages. One outcome — your BD function, replaced.
                        </h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
                        {brackets.map((b) => (
                            <BracketCard key={b.id} bracket={b} isActive={activeBracket?.id === b.id} />
                        ))}
                    </div>
                </div>

                {/* Outside-brackets CTA */}
                <div className="border-t border-[#E5E5E5] pt-12 sm:pt-16 text-center max-w-2xl mx-auto">
                    <h3 className="text-xl sm:text-2xl font-bold text-[#0A0A0A] mb-3 leading-tight">
                        Outside these brackets?
                    </h3>
                    <p className="section-sub mb-6">
                        Sub-1 placement/mo or 25+? We scope custom on the fit call. Bracket prices stand; volume changes the conversation.
                    </p>
                    <Link
                        href="/fit-call"
                        className="inline-flex items-center justify-center bg-[#0A0A0A] text-white px-6 py-3 sm:px-8 sm:py-4 rounded-full font-medium hover:bg-[#222222] transition-colors text-base sm:text-lg group"
                    >
                        Talk to Tushar
                        <svg className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M5 12h14M12 5l7 7-7 7" />
                        </svg>
                    </Link>
                </div>

            </div>
        </section>
    );
}

function BracketCard({ bracket, isActive }: { bracket: Bracket; isActive: boolean }) {
    return (
        <div
            className={`relative rounded-2xl p-6 sm:p-7 border-2 transition-all duration-300 flex flex-col ${
                isActive
                    ? 'border-[#FF6A00] bg-[#FFF9F4] shadow-lg shadow-orange-500/10'
                    : 'border-[#E5E5E5] bg-white'
            }`}
        >
            {isActive && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[#FF6A00] text-white text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full">
                    Your bracket
                </span>
            )}

            <p className={`text-[10px] font-bold uppercase tracking-widest mb-3 ${isActive ? 'text-[#FF6A00]' : 'text-[#9CA3AF]'}`}>
                {bracket.name}
            </p>
            <p className="text-sm text-[#6B7280] font-medium mb-4">{bracket.capacityLabel}</p>

            <div className="mb-6">
                <span className="text-4xl sm:text-5xl font-black text-[#0A0A0A] tracking-tighter">
                    ${bracket.monthlyUsd.toLocaleString()}
                </span>
                <span className="text-base font-bold text-[#9CA3AF] ml-1">/mo</span>
            </div>

            <ul className="space-y-2.5 mb-6 flex-grow">
                {bracket.capabilityBullets.map((b) => (
                    <li key={b} className="flex items-start gap-2 text-sm text-[#374151] font-medium">
                        <span className="text-[#FF6A00] font-bold flex-shrink-0 mt-0.5">✓</span>
                        <span>{b}</span>
                    </li>
                ))}
            </ul>

            <div className="inline-flex items-center gap-2 self-start bg-white border border-[#E5E5E5] px-3 py-1.5 rounded-full">
                <span className="w-1.5 h-1.5 rounded-full bg-[#FF6A00]" />
                <span className="text-xs font-bold text-[#0A0A0A]">~{bracket.roiMultiplier}× ROI vs manual</span>
            </div>
        </div>
    );
}
