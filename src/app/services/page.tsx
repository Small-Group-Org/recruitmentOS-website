import Link from 'next/link';
import Footer from '@/components/Footer';
import { services } from '@/lib/services-data';

import { buildCanonical } from '@/lib/seo';

export const metadata = {
    title: 'What We Do — 5 BD Services | RecruitmentOS',
    description: 'Five clearly-named services. One outcome: your BD function, replaced. Built for established recruitment agencies.',
    alternates: { canonical: buildCanonical('/services') },
};

export default function ServicesPage() {
    return (
        <main className="min-h-screen bg-white">
            <div className="pt-12 pb-24">
                <div className="max-w-[1100px] mx-auto px-6 sm:px-10">

                    <Link
                        href="/"
                        className="inline-flex items-center text-sm text-black hover:text-[#FF6A00] transition-colors mb-12"
                    >
                        <svg className="mr-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                        </svg>
                        BACK TO HOME
                    </Link>

                    {/* Hero */}
                    <div className="mb-16 sm:mb-20 max-w-3xl">
                        <p className="text-xs font-bold text-[#FF6A00] uppercase tracking-widest mb-3">Services</p>
                        <h1 className="text-[#0A0A0A] text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight leading-[1.05] mb-5">
                            What we actually do.
                        </h1>
                        <p className="hero-sub">
                            Five services. One outcome — your BD function, replaced. Each one maps to a specific bottleneck. You can buy them as a bundle (most common) or scope individual gaps.
                        </p>
                    </div>

                    {/* Service cards — denser deep-dive layout */}
                    <div className="space-y-16 sm:space-y-20 mb-20">
                        {services.map((service) => (
                            <section key={service.slug} id={`service-${service.slug}`} className="grid grid-cols-1 lg:grid-cols-[120px_1fr] gap-6 lg:gap-12 border-t border-[#E5E5E5] pt-10 sm:pt-12">
                                <div>
                                    <span className="text-5xl sm:text-6xl font-black text-[#F3F4F6] select-none">{service.number}</span>
                                </div>
                                <div>
                                    <span className={`inline-block text-[10px] font-bold uppercase tracking-[0.1em] px-3 py-1 rounded-sm mb-4 ${service.tagColor}`}>
                                        {service.name}
                                    </span>
                                    <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#0A0A0A] leading-tight mb-5">
                                        {service.oneLine}
                                    </h2>
                                    <p className="text-base sm:text-lg text-[#374151] leading-relaxed max-w-3xl mb-6 font-medium">
                                        {service.deepDive}
                                    </p>
                                    <div className="inline-flex items-center gap-2 bg-[#F9FAFB] border border-[#E5E5E5] px-4 py-2 rounded-full">
                                        <span className="w-1.5 h-1.5 rounded-full bg-[#FF6A00]" />
                                        <span className="text-sm font-bold text-[#0A0A0A]">{service.outcome}</span>
                                    </div>
                                </div>
                            </section>
                        ))}
                    </div>

                    {/* CTA */}
                    <div className="border-t border-[#E5E5E5] pt-12 sm:pt-16 text-center max-w-2xl mx-auto">
                        <h2 className="text-2xl sm:text-3xl font-bold text-[#0A0A0A] mb-3 leading-tight">
                            Pick one, all five, or talk it through.
                        </h2>
                        <p className="section-sub mb-8">
                            Most agencies need all five together. Some need just outreach + triage. We scope on the fit call.
                        </p>
                        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                            <Link
                                href="https://cal.com/tusharm/30min?user=tusharm"
                                target="_blank"
                                className="inline-flex items-center justify-center bg-[#0A0A0A] text-white px-6 py-3 sm:px-8 sm:py-4 rounded-full font-medium hover:bg-[#222222] transition-colors text-base sm:text-lg"
                            >
                                Book a fit call
                            </Link>
                            <Link
                                href="/methodology"
                                className="inline-flex items-center justify-center bg-white text-[#0A0A0A] border border-[#e5e5e5] px-6 py-3 sm:px-8 sm:py-4 rounded-full text-base sm:text-lg font-medium hover:bg-[#f9fafb] transition-colors"
                            >
                                See the full methodology →
                            </Link>
                        </div>
                    </div>

                </div>
            </div>
            <Footer />
        </main>
    );
}
