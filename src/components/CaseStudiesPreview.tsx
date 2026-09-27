'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { legacyCaseStudies, verifiedCaseStudies } from '@/lib/case-studies-data';

export default function CaseStudiesPreview() {
    const [activeTab, setActiveTab] = useState<'verified' | 'diagnostic'>('verified');
    const studies = activeTab === 'verified' ? verifiedCaseStudies : legacyCaseStudies;

    return (
        <section className="py-16 md:py-24 bg-[#FAFAFA] border-y border-[#E5E5E5]" id="proof">
            <div className="max-w-[1280px] mx-auto px-4 sm:px-6">
                {/* Proof of work */}
                <div className="text-center max-w-2xl mx-auto mb-12 md:mb-16">
                    <p className="text-xs font-semibold uppercase tracking-widest text-[#FF6A00] mb-3">
                        Visual proof scorecards
                    </p>
                    <h2 className="text-[#0A0A0A] text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight mb-4">
                        The calendar proof behind the claims.
                    </h2>
                    <p className="section-sub">
                        Browse verified client wins and diagnostic teardowns across all seven agency case studies.
                    </p>
                </div>

                <div className="mx-auto mb-8 flex max-w-2xl flex-col gap-2 rounded-[10px] border border-[#E5E5E5] bg-white p-2 sm:flex-row" role="tablist" aria-label="Case study categories">
                    {[
                        { id: 'verified' as const, label: '★ Verified Client Wins (3)' },
                        { id: 'diagnostic' as const, label: 'Diagnostic Audits & Teardowns (4)' },
                    ].map((tab) => (
                        <button
                            key={tab.id}
                            type="button"
                            id={`case-study-tab-${tab.id}`}
                            role="tab"
                            aria-selected={activeTab === tab.id}
                            aria-controls={`case-study-panel-${tab.id}`}
                            onClick={() => setActiveTab(tab.id)}
                            className={`flex-1 rounded-[6px] px-4 py-3 text-sm font-bold transition-all ${activeTab === tab.id ? 'bg-[#0A0A0A] text-white shadow-sm' : 'text-[#6B7280] hover:bg-[#FAFAFA] hover:text-[#0A0A0A]'}`}
                        >
                            {tab.label}
                        </button>
                    ))}
                </div>

                <div
                    id={`case-study-panel-${activeTab}`}
                    role="tabpanel"
                    aria-labelledby={`case-study-tab-${activeTab}`}
                    className={`grid grid-cols-1 gap-6 lg:gap-7 ${studies.length === 3 ? 'md:grid-cols-3' : 'md:grid-cols-2 lg:grid-cols-4'}`}
                >
                    {studies.map((study) => (
                        <Link
                            key={study.slug}
                            href={`/case-studies/${study.slug}`}
                            className="group flex flex-col h-full bg-white border border-[#E5E5E5] rounded-[10px] overflow-hidden hover:shadow-[0_20px_50px_rgba(0,0,0,0.06)] hover:border-black/10 transition-all duration-500 ease-out"
                        >
                            <div className="relative w-full aspect-[16/10] overflow-hidden bg-gray-50 border-b border-gray-100">
                                <Image
                                    src={study.image}
                                    alt={study.title}
                                    fill
                                     className="object-cover object-top group-hover:scale-[1.02] transition-all duration-700 ease-out"
                                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 400px"
                                />
                                {study.cardStats && (
                                    <div className="absolute top-3 left-3 bg-black/95 backdrop-blur-sm text-white text-[9px] font-black tracking-widest px-2.5 py-1 rounded-full uppercase">
                                        {study.cardStats}
                                    </div>
                                )}
                            </div>

                            <div className="p-5 flex flex-col flex-grow">
                                 <p className="text-xl lg:text-2xl font-bold line-clamp-2 tracking-tight text-[#0A0A0A] mb-3">
                                     {study.title}
                                 </p>
                                 {study.market ? <p className="text-sm text-[#6B7280] mb-3">{study.market}</p> : <p className="text-sm text-[#6B7280] mb-3">{study.snapshot?.industry ?? 'Advisory Teardown'}</p>}
                                 <blockquote className="border-l-2 border-brand pl-3 text-base font-bold leading-snug text-[#0A0A0A] line-clamp-3">
                                     &ldquo;{study.quotes?.result?.text ?? study.result}&rdquo;
                                 </blockquote>
                                 <div className="mt-5 grid grid-cols-2 gap-2 text-xs">
                                     <span className="rounded-[4px] bg-[#FAFAFA] px-3 py-2 text-[#6B7280] line-clamp-2">Before: {study.rootCause}</span>
                                     <span className="rounded-[4px] bg-[#E8F5EF] px-3 py-2 font-semibold text-[#1A6B4A] line-clamp-2">After: {study.result}</span>
                                 </div>
                                 <div className="mt-auto pt-5 flex items-center text-[13px] font-bold text-black group-hover:text-[#FF6A00] transition-colors">
                                     Inspect full case study & proof data →
                                 </div>
                            </div>
                        </Link>
                    ))}
                </div>

                <div className="text-center mt-12">
                    <Link
                        href="/case-studies"
                        className="inline-flex items-center justify-center text-[#6B7280] hover:text-[#0A0A0A] text-sm font-medium transition-colors duration-200 group"
                    >
                        Inspect all 7 agency case studies & teardowns
                        <svg className="ml-1.5 w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M5 12h14M12 5l7 7-7 7" />
                        </svg>
                    </Link>
                </div>
            </div>
        </section>
    );
}
