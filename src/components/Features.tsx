'use client';

import Link from 'next/link';
import { services } from '@/lib/services-data';

export default function Features() {
    return (
        <section className="py-16 md:py-24 bg-white border-t border-[#E5E5E5]" id="services">
            <div className="max-w-[1280px] mx-auto px-6 sm:px-10">
                <div className="grid lg:grid-cols-[0.85fr_1.4fr] gap-12 lg:gap-20">

                    {/* Left — intro (sticky on desktop) */}
                    <div className="lg:sticky lg:top-28 self-start">
                        <p
                            className="text-xs font-bold text-[#FF6A00] uppercase tracking-widest mb-4"
                            style={{ fontFamily: 'var(--font-mono)' }}
                        >
                            What we do
                        </p>
                        <h2 className="text-3xl sm:text-4xl font-bold text-[#0A0A0A] tracking-tight leading-[1.15] mb-5">
                            Five services. One outcome — your BD function, replaced.
                        </h2>
                        <p className="text-[#6B7280] text-base leading-relaxed mb-8 max-w-sm">
                            Each service maps to a specific bottleneck. Bundle them or scope individually.
                        </p>
                        <Link
                            href="/services"
                            className="inline-flex items-center justify-center bg-[#0A0A0A] text-white px-6 py-3 rounded-full font-medium hover:bg-[#0A0A0A] transition-colors text-sm group"
                        >
                            See all five services
                            <svg className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                            </svg>
                        </Link>
                    </div>

                    {/* Right — service list */}
                    <div className="border-t border-[#E5E5E5]">
                        {services.map((service) => (
                            <Link
                                key={service.slug}
                                href={`/services#service-${service.slug}`}
                                className="group grid grid-cols-[auto_1fr] md:grid-cols-[auto_1fr_auto] items-start md:items-center gap-x-5 md:gap-x-8 py-6 border-b border-[#E5E5E5] transition-colors"
                            >
                                {/* Number */}
                                <span
                                    className="text-sm font-bold text-[#D1D5DB] group-hover:text-[#FF6A00] transition-colors pt-0.5 md:pt-0"
                                    style={{ fontFamily: 'var(--font-mono)' }}
                                >
                                    {service.number}
                                </span>

                                {/* Name + one-liner */}
                                <div className="min-w-0">
                                    <h3 className="text-base md:text-lg font-bold text-[#0A0A0A] leading-snug group-hover:text-[#FF6A00] transition-colors">
                                        {service.name}
                                    </h3>
                                    <p className="text-sm text-[#6B7280] leading-snug mt-1">
                                        {service.oneLine}
                                    </p>
                                    {/* Outcome + arrow — inline on mobile */}
                                    <div className="md:hidden mt-3 flex items-center justify-between">
                                        <div className="inline-flex items-center gap-2">
                                            <span className="w-1.5 h-1.5 rounded-full bg-[#FF6A00] shrink-0" />
                                            <span className="text-[12px] font-semibold text-[#0A0A0A]">{service.outcome}</span>
                                        </div>
                                        <svg className="w-4 h-4 text-[#D1D5DB] group-hover:text-[#FF6A00] group-hover:translate-x-1 transition-all shrink-0 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                        </svg>
                                    </div>
                                </div>

                                {/* Outcome + arrow — desktop */}
                                <div className="hidden md:flex items-center gap-6 justify-self-end">
                                    <div className="flex items-center gap-2 max-w-[200px]">
                                        <span className="w-1.5 h-1.5 rounded-full bg-[#FF6A00] shrink-0" />
                                        <span className="text-[13px] font-semibold text-[#0A0A0A] leading-snug text-right">
                                            {service.outcome}
                                        </span>
                                    </div>
                                    <svg className="w-4 h-4 text-[#D1D5DB] group-hover:text-[#FF6A00] group-hover:translate-x-1 transition-all shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                    </svg>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
