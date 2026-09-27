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
                        <h2 className="text-3xl sm:text-4xl text-[#0A0A0A] tracking-tight leading-[1.15] mb-5 font-serif">
                            Five services. One outcome — your BD function, replaced.
                        </h2>
                        <p className="text-[#6B7280] text-base leading-relaxed mb-8 max-w-sm">
                            Each service maps to a specific bottleneck. Bundle them or scope individually.
                        </p>
                        <Link
                            href="/services"
                            className="inline-flex items-center justify-center bg-[#0A0A0A] text-white px-6 py-3 rounded-full font-medium hover:bg-neutral-800 transition-colors text-sm group"
                        >
                            See all five services
                            <svg className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                            </svg>
                        </Link>
                    </div>

                    {/* Right — service list */}
                    <div className="space-y-4">
                        {services.map((service) => (
                            <Link
                                key={service.slug}
                                href={`/services#service-${service.slug}`}
                                className="group grid grid-cols-[auto_1fr] gap-x-5 md:gap-x-8 p-5 md:p-6 border border-[#E5E5E5] rounded-[10px] bg-white hover:border-brand hover:shadow-[0_18px_45px_rgba(0,0,0,0.06)] transition-all duration-300"
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
                                    <div className="mt-4 flex flex-wrap gap-2">
                                        {service.deliverables.slice(0, 3).map((deliverable) => (
                                            <span key={deliverable} className="rounded-full border border-[#E5E5E5] bg-[#FAFAFA] px-2.5 py-1 text-[11px] font-medium text-[#6B7280]">
                                                {deliverable}
                                            </span>
                                        ))}
                                    </div>
                                    <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
                                        <span className="inline-flex items-center gap-2 rounded-full bg-accent-light px-3 py-1.5 text-[12px] font-semibold text-success">
                                            <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M12 3l7.5 3v5.25c0 4.1-2.65 7.79-7.5 9.75-4.85-1.96-7.5-5.65-7.5-9.75V6L12 3Z" />
                                            </svg>
                                            {service.slaOrGuarantee}
                                        </span>
                                        <span className="inline-flex items-center text-[12px] font-bold text-[#0A0A0A] group-hover:text-brand">
                                            Explore service
                                            <span className="ml-2 transition-transform group-hover:translate-x-1">→</span>
                                        </span>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
