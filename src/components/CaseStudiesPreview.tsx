import Link from 'next/link';
import { caseStudies } from '@/lib/case-studies-data';

const proofStats = [
    { value: '50+', label: 'recruitment agencies consulted' },
    { value: '12+', label: 'verticals worked across' },
    { value: '300+', label: 'hours of agency interviews' },
];

export default function CaseStudiesPreview() {
    return (
        <section className="py-20 md:py-28 bg-[#FAFAFA] border-y border-[#e5e5e5]" id="proof">
            <div className="max-w-[1280px] mx-auto px-4 sm:px-6">
                {/* Proof of work */}
                <div className="text-center max-w-2xl mx-auto mb-12 md:mb-16">
                    <p className="text-xs font-semibold uppercase tracking-widest text-[#FF6A00] mb-3">
                        Built with the industry, not in a vacuum
                    </p>
                    <h2 className="text-[#0A0A0A] text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight mb-4">
                        We built this after talking to 50+ recruitment agencies.
                    </h2>
                    <p className="section-sub">
                        Every part of the engine comes from hundreds of hours of conversations with agency owners about
                        what actually breaks their BD. Here&rsquo;s what changed when we put it to work.
                    </p>
                </div>

                {/* Proof stats */}
                <div className="grid grid-cols-3 gap-4 max-w-2xl mx-auto mb-14 md:mb-16">
                    {proofStats.map((stat) => (
                        <div key={stat.label} className="text-center">
                            <div className="text-2xl md:text-4xl font-bold text-[#0A0A0A] tracking-tight mb-1">{stat.value}</div>
                            <div className="text-[11px] md:text-xs text-[#9ca3af] uppercase tracking-wider leading-tight">{stat.label}</div>
                        </div>
                    ))}
                </div>

                {/* 4 case studies */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-7">
                    {caseStudies.slice(0, 4).map((study) => (
                        <Link
                            key={study.slug}
                            href={`/case-studies/${study.slug}`}
                            className="group flex flex-col h-full bg-white border border-[#E5E5E5] rounded-[1.5rem] overflow-hidden hover:shadow-[0_20px_50px_rgba(0,0,0,0.06)] hover:border-black/10 transition-all duration-500 ease-out"
                        >
                            <div className="relative w-full aspect-[16/10] overflow-hidden bg-gray-50 border-b border-gray-100">
                                {/* eslint-disable-next-line @next/next/no-img-element */}
                                <img
                                    src={study.image}
                                    alt={study.title}
                                    className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-[1.02] transition-all duration-700 ease-out"
                                    loading="lazy"
                                />
                                {study.cardStats && (
                                    <div className="absolute top-3 left-3 bg-black/95 backdrop-blur-sm text-white text-[9px] font-black tracking-widest px-2.5 py-1 rounded-full uppercase">
                                        {study.cardStats}
                                    </div>
                                )}
                            </div>

                            <div className="p-5 flex flex-col flex-grow">
                                <h3 className="text-[15px] font-bold text-[#0A0A0A] group-hover:text-[#FF6A00] transition-colors leading-snug mb-3 tracking-tight">
                                    {study.cardTitle}
                                </h3>
                                <div className="mt-auto pt-3 flex items-center text-[13px] font-bold text-black group-hover:text-[#FF6A00] transition-colors">
                                    Read case study
                                    <svg className="ml-2 w-4 h-4 transform group-hover:translate-x-1.5 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                    </svg>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>

                <div className="text-center mt-12">
                    <Link
                        href="/case-studies"
                        className="inline-flex items-center justify-center text-[#6b7280] hover:text-[#0A0A0A] text-sm font-medium transition-colors duration-200 group"
                    >
                        See all case studies
                        <svg className="ml-1.5 w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M5 12h14M12 5l7 7-7 7" />
                        </svg>
                    </Link>
                </div>
            </div>
        </section>
    );
}
