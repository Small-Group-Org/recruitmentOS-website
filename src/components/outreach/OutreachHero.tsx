'use client';

import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { trackCTAClick } from '@/lib/analytics';

export default function OutreachHero() {
    const searchParams = useSearchParams();
    const name = searchParams.get('name') || 'there';
    const company = searchParams.get('company') || 'your agency';

    return (
        <section className="pt-8 pb-16 md:pt-16 md:pb-24 relative overflow-hidden bg-gradient-to-br from-white to-[#E0F2FE]/30" id="hero">
            <div className="max-w-[1100px] mx-auto px-5">
                <div className="text-center max-w-[800px] mx-auto">
                    {/* Personalized Greeting */}
                    <div className="inline-block bg-[#FDE047] text-[#1F2937] px-4 py-2 rounded-full font-black text-xs sm:text-sm uppercase tracking-widest mb-6 border-2 border-[#1F2937]">
                        👋 Hi {name}!
                    </div>

                    {/* Main Headline */}
                    <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black leading-tight mb-6 text-[#1F2937] tracking-tight">
                        What if {company} could get <span className="text-orange-500">1,000 quality leads</span> every month—automatically?
                    </h1>

                    {/* Subheadline */}
                    <p className="text-lg sm:text-xl md:text-2xl text-[#4B5563] mb-10 font-bold leading-relaxed">
                        No manual scraping. No guesswork. Just verified leads with <span className="text-[#1F2937] font-black">proven 6%+ reply rates</span>.
                    </p>

                    {/* Dual CTA */}
                    <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
                        <Link
                            href="#sample-leads"
                            onClick={() => trackCTAClick('See Sample Leads', 'Outreach Hero')}
                            className="bg-orange-500 text-white px-8 py-4 rounded-xl font-black transition-all hover:translate-y-[-2px] btn-shadow text-lg flex items-center justify-center gap-2"
                        >
                            Show Me Sample Leads 👀
                        </Link>
                        <Link
                            href="https://cal.com/tusharm/30min?user=tusharm"
                            target="_blank"
                            onClick={() => trackCTAClick('Book Call - Hero', 'Outreach Hero')}
                            className="bg-[#1F2937] text-white px-8 py-4 rounded-xl font-black transition-all hover:translate-y-[-2px] btn-shadow text-lg flex items-center justify-center gap-2"
                        >
                            Book 15-Min Call →
                        </Link>
                    </div>

                    {/* Trust Line */}
                    <p className="text-sm sm:text-base text-[#4B5563] font-bold">
                        Join agencies scaling to <span className="text-[#1F2937] font-black">100K+ leads/month</span> — operated for them
                    </p>
                </div>
            </div>
        </section>
    );
}
