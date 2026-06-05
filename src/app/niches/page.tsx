import Link from 'next/link';
import Footer from '@/components/Footer';
import { niches } from '@/lib/niches-data';
import { buildCanonical } from '@/lib/seo';

export const metadata = {
    title: 'Niches we serve — RecruitmentOS',
    description: 'Done-for-you BD by niche: biotech, accounting, executive search, and more. Each niche gets its own ICP map and signal sources.',
    alternates: { canonical: buildCanonical('/niches') },
};

export default function NichesIndexPage() {
    return (
        <main className="min-h-screen bg-white">
            <div className="pt-24 pb-32">
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

                    <div className="mb-16 sm:mb-20 max-w-3xl">
                        <p className="text-xs font-bold text-[#FF6A00] uppercase tracking-widest mb-3">Niches</p>
                        <h1 className="text-[#0A0A0A] text-3xl sm:text-5xl md:text-6xl font-bold tracking-tight leading-[1.05] mb-5">
                            Built for your niche, not "recruitment in general".
                        </h1>
                        <p className="hero-sub">
                            A biotech recruiter and an accounting recruiter share zero source data. We don't pretend they do. Each agency gets their own ICP map and signal sources — that's the single biggest predictor of whether the engine performs.
                        </p>
                    </div>

                    {/* Niche cards */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
                        {niches.map((n) => (
                            <Link
                                key={n.slug}
                                href={`/niches/${n.slug}`}
                                className="group flex flex-col bg-white border border-[#E5E5E5] rounded-2xl p-6 sm:p-7 hover:border-[#FF6A00]/40 hover:shadow-lg hover:shadow-orange-500/5 transition-all"
                            >
                                <p className="text-[10px] font-bold tracking-widest uppercase text-[#FF6A00] mb-3">{n.shortName}</p>
                                <h2 className="text-lg font-bold text-[#0A0A0A] mb-3 leading-snug group-hover:text-[#FF6A00] transition-colors">{n.name}</h2>
                                <p className="text-sm text-[#6B7280] font-medium leading-relaxed mb-6 flex-grow">{n.oneLine}</p>
                                <span className="inline-flex items-center text-sm font-bold text-[#0A0A0A] group-hover:gap-1 transition-all">
                                    See the niche-specific BD play
                                    <svg className="ml-2 w-4 h-4 opacity-0 group-hover:opacity-100 -translate-x-3 group-hover:translate-x-0 transition-all" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                    </svg>
                                </span>
                            </Link>
                        ))}
                    </div>

                    {/* CTA — your niche not listed */}
                    <div className="mt-20 sm:mt-24 border-t border-[#E5E5E5] pt-12 sm:pt-16 text-center max-w-2xl mx-auto">
                        <h2 className="text-2xl sm:text-3xl font-bold text-[#0A0A0A] mb-3 leading-tight">
                            Your niche not listed?
                        </h2>
                        <p className="section-sub mb-6">
                            We've worked with 12+ verticals — these 3 are just the most-trafficked landing pages. Scope your specific niche on the fit call.
                        </p>
                        <Link
                            href="/fit-call"
                            className="inline-flex items-center justify-center bg-[#0A0A0A] text-white px-6 py-3 sm:px-8 sm:py-4 rounded-full font-medium hover:bg-[#222222] transition-colors text-base sm:text-lg"
                        >
                            Book a fit call
                        </Link>
                    </div>

                </div>
            </div>
            <Footer />
        </main>
    );
}
