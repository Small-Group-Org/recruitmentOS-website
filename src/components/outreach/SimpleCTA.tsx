'use client';

import Link from 'next/link';
import { trackCTAClick } from '@/lib/analytics';

export default function SimpleCTA() {
    return (
        <section className="py-16 md:py-24 bg-gradient-to-br from-[#1F2937] to-[#0A0A0A] text-white">
            <div className="max-w-[900px] mx-auto px-5 text-center">
                {/* Headline */}
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-black mb-4 tracking-tight leading-tight">
                    Ready to Scale Your Pipeline?
                </h2>
                <p className="text-base sm:text-lg md:text-xl text-slate-300 mb-10 font-bold max-w-[700px] mx-auto leading-relaxed">
                    Get 1,000 verified leads delivered automatically every month. Starting at just $0.50 per lead.
                </p>

                {/* Two Options */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                    {/* Option 1: Low Friction */}
                    <div className="bg-white text-[#1F2937] p-6 sm:p-8 rounded-2xl border-2 border-[#1F2937]">
                        <div className="text-3xl mb-3">📧</div>
                        <h3 className="text-xl sm:text-2xl font-black mb-3">Get Sample Leads</h3>
                        <p className="text-sm sm:text-base text-[#4B5563] font-bold mb-6">
                            We&#39;ll send you 10 real leads from your niche to see the quality firsthand
                        </p>
                        <a
                            href="mailto:tushar@smallgrp.com?subject=Send%20Me%20Sample%20Leads&body=Hi%2C%20I'd%20like%20to%20see%20sample%20leads%20for%20my%20recruiting%20agency."
                            onClick={() => trackCTAClick('Request Sample Leads', 'Simple CTA')}
                            className="bg-orange-500 text-white px-6 py-3 rounded-xl font-black transition-all hover:translate-y-[-2px] btn-shadow text-base inline-block w-full"
                        >
                            Send Me Samples
                        </a>
                    </div>

                    {/* Option 2: High Intent */}
                    <div className="bg-[#E0F2FE] text-[#1F2937] p-6 sm:p-8 rounded-2xl border-2 border-[#1F2937] relative">
                        <div className="absolute -top-3 right-4 bg-[#FDE047] text-[#1F2937] px-3 py-1 rounded-full text-xs font-black border-2 border-[#1F2937]">
                            MOST POPULAR
                        </div>
                        <div className="text-3xl mb-3">📞</div>
                        <h3 className="text-xl sm:text-2xl font-black mb-3">Book a 15-Min Call</h3>
                        <p className="text-sm sm:text-base text-[#4B5563] font-bold mb-6">
                            Let&#39;s discuss your specific needs and show you the full system
                        </p>
                        <Link
                            href="https://cal.com/tusharm/30min?user=tusharm"
                            target="_blank"
                            onClick={() => trackCTAClick('Book Call - CTA', 'Simple CTA')}
                            className="bg-[#1F2937] text-white px-6 py-3 rounded-xl font-black transition-all hover:translate-y-[-2px] btn-shadow text-base inline-block w-full"
                        >
                            Book My Call →
                        </Link>
                    </div>
                </div>

                {/* Trust Line */}
                <p className="text-xs sm:text-sm text-slate-400 font-bold">
                    No credit card required • Cancel anytime • 100% transparent pricing
                </p>
            </div>
        </section>
    );
}
