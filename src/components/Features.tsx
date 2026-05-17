'use client';

import React from 'react';
import Link from 'next/link';
import { services } from '@/lib/services-data';

export default function Features() {
    return (
        <section className="py-24 bg-white" id="services">
            <div className="max-w-[1240px] mx-auto px-6 sm:px-10">

                {/* Section Header */}
                <div className="mb-12 sm:mb-16 max-w-2xl">
                    <p className="text-xs font-bold text-[#FF6A00] uppercase tracking-widest mb-3">What we do</p>
                    <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#0A0A0A] tracking-tight leading-tight mb-4">
                        Five services. One outcome — your BD function, replaced.
                    </h2>
                    <p className="section-sub max-w-xl">
                        Each service maps to a specific bottleneck. You can take all five together, or buy gaps individually.
                    </p>
                </div>

                {/* Timeline Container */}
                <div className="relative">

                    {/* Vertical Line */}
                    <div className="absolute left-[22px] top-0 bottom-0 w-[1px] bg-gray-200 hidden md:block"></div>

                    <div className="space-y-20 sm:space-y-24">
                        {services.map((service) => (
                            <div key={service.slug} className="relative flex flex-col md:flex-row gap-12 md:gap-20">

                                {/* Timeline Dot (Desktop only) */}
                                <div className="absolute left-0 top-2 hidden md:flex items-center justify-center w-11 h-11 bg-white border border-black rounded-full z-10">
                                    <span className="text-[10px] font-mono font-bold text-black">{service.number}</span>
                                </div>

                                {/* Content Area */}
                                <div className="flex-1 md:pl-24">
                                    {/* Badge */}
                                    <div className="mb-5">
                                        <span className={`inline-block text-[10px] font-bold uppercase tracking-[0.1em] px-3 py-1 rounded-sm ${service.tagColor}`}>
                                            {service.name}
                                        </span>
                                    </div>

                                    {/* Headline with subtle highlight */}
                                    <h3 className="text-2xl md:text-3xl lg:text-4xl font-bold tracking-tight text-gray-900 leading-tight mb-6">
                                        <span className="relative inline-block">
                                            <span className="relative z-10">{service.oneLine}</span>
                                            <span className="absolute bottom-0 left-0 right-0 h-[60%] bg-[#FDEDD3]/60 -z-0 rounded-sm transform -rotate-1"></span>
                                        </span>
                                    </h3>

                                    {/* Deep-dive description */}
                                    <p className="text-lg text-gray-600 leading-relaxed max-w-[640px] mb-6 font-medium">
                                        {service.deepDive}
                                    </p>

                                    {/* Outcome metric */}
                                    <div className="inline-flex items-center gap-2 mb-8 bg-[#F9FAFB] border border-[#E5E5E5] px-4 py-2 rounded-full">
                                        <span className="w-1.5 h-1.5 rounded-full bg-[#FF6A00]" />
                                        <span className="text-sm font-bold text-[#0A0A0A]">{service.outcome}</span>
                                    </div>

                                    {/* CTA */}
                                    <div>
                                        <Link
                                            href="https://cal.com/tusharm/30min?user=tusharm"
                                            target="_blank"
                                            className="inline-flex items-center text-base font-bold text-black group"
                                        >
                                            <span className="border-b-2 border-black pb-0.5 group-hover:border-[#FF6A00] transition-colors">
                                                Talk to Tushar about this
                                            </span>
                                        </Link>
                                    </div>
                                </div>

                            </div>
                        ))}
                    </div>

                </div>

                {/* Bottom CTA block */}
                <div className="mt-20 sm:mt-24 border-t border-[#E5E5E5] pt-12 sm:pt-16 text-center max-w-2xl mx-auto">
                    <h3 className="text-xl sm:text-2xl font-bold text-[#0A0A0A] mb-3 leading-tight">
                        Pick one, all five, or talk it through.
                    </h3>
                    <p className="section-sub mb-6">
                        Most agencies need all five together. Some need just outreach + triage. We scope on the fit call.
                    </p>
                    <Link
                        href="https://cal.com/tusharm/30min?user=tusharm"
                        target="_blank"
                        className="inline-flex items-center justify-center bg-[#0A0A0A] text-white px-6 py-3 sm:px-8 sm:py-4 rounded-full font-medium hover:bg-[#222222] transition-colors text-base sm:text-lg group"
                    >
                        Book a fit call
                        <svg className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M5 12h14M12 5l7 7-7 7" />
                        </svg>
                    </Link>
                </div>
            </div>
        </section>
    );
}
