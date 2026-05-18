'use client';

import Link from 'next/link';
import { services } from '@/lib/services-data';

export default function Features() {
    return (
        <section className="py-24 bg-white" id="services">
            <div className="max-w-[1240px] mx-auto px-6 sm:px-10">

                <div className="mb-12 sm:mb-16 max-w-2xl">
                    <p className="text-xs font-bold text-[#FF6A00] uppercase tracking-widest mb-3">What we do</p>
                    <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#0A0A0A] tracking-tight leading-tight mb-4">
                        Five services. One outcome — your BD function, replaced.
                    </h2>
                    <p className="section-sub max-w-xl">
                        Each service maps to a specific bottleneck. Bundle them or scope individually.
                    </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-12">
                    {services.map((service) => (
                        <Link
                            key={service.slug}
                            href={`/services#service-${service.slug}`}
                            className="group flex flex-col bg-white border border-[#E5E5E5] rounded-2xl p-6 hover:border-[#FF6A00]/40 hover:shadow-sm transition-all"
                        >
                            <div className="flex items-center gap-2 mb-4">
                                <span className="text-[10px] font-mono font-bold text-[#9CA3AF]">{service.number}</span>
                                <span className={`inline-block text-[10px] font-bold uppercase tracking-[0.1em] px-2.5 py-1 rounded-sm ${service.tagColor}`}>
                                    {service.name}
                                </span>
                            </div>
                            <h3 className="text-lg sm:text-xl font-bold text-[#0A0A0A] leading-snug mb-3 group-hover:text-[#FF6A00] transition-colors">
                                {service.oneLine}
                            </h3>
                            <span className="mt-auto inline-flex items-center text-sm font-bold text-[#0A0A0A]">
                                Details
                                <svg className="ml-1.5 w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2.5}>
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                </svg>
                            </span>
                        </Link>
                    ))}
                </div>

                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-t border-[#E5E5E5] pt-8">
                    <p className="text-base sm:text-lg text-[#374151] font-medium max-w-xl">
                        Want the full breakdown of every service — deep-dive, outcome, what we deliver?
                    </p>
                    <div className="flex flex-col sm:flex-row gap-3">
                        <Link
                            href="/services"
                            className="inline-flex items-center justify-center bg-[#0A0A0A] text-white px-6 py-3 rounded-full font-medium hover:bg-[#222222] transition-colors text-base group"
                        >
                            See all five services
                            <svg className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                            </svg>
                        </Link>
                        <Link
                            href="https://cal.com/tusharm/30min?user=tusharm"
                            target="_blank"
                            className="inline-flex items-center justify-center bg-white text-[#0A0A0A] border border-[#E5E5E5] px-6 py-3 rounded-full font-medium hover:bg-[#F9FAFB] transition-colors text-base"
                        >
                            Book a fit call
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    );
}
