import Link from 'next/link';
import { notFound } from 'next/navigation';
import Footer from '@/components/Footer';
import { niches, getNicheBySlug } from '@/lib/niches-data';
import { buildCanonical } from '@/lib/seo';

export function generateStaticParams() {
    return niches.map((n) => ({ niche: n.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ niche: string }> }) {
    const { niche: slug } = await params;
    const n = getNicheBySlug(slug);
    if (!n) return {};
    return {
        title: `BD for ${n.shortName} Recruitment Agencies — RecruitmentOS`,
        description: n.oneLine,
        alternates: { canonical: buildCanonical(`/niches/${slug}`) },
    };
}

export default async function NicheDetailPage({ params }: { params: Promise<{ niche: string }> }) {
    const { niche: slug } = await params;
    const n = getNicheBySlug(slug);
    if (!n) notFound();

    return (
        <main className="min-h-screen bg-white">
            <div className="pt-12 pb-24">
                <div className="max-w-[1100px] mx-auto px-6 sm:px-10">

                    <Link
                        href="/niches"
                        className="inline-flex items-center text-sm text-black hover:text-[#FF6A00] transition-colors mb-12"
                    >
                        <svg className="mr-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                        </svg>
                        ALL NICHES
                    </Link>

                    {/* Hero */}
                    <div className="mb-16 sm:mb-20 max-w-3xl">
                        <p className="text-xs font-bold text-[#FF6A00] uppercase tracking-widest mb-3">
                            BD for {n.shortName.toLowerCase()} agencies
                        </p>
                        <h1 className="text-[#0A0A0A] text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight leading-[1.05] mb-5">
                            {n.name}
                        </h1>
                        <p className="hero-sub">{n.oneLine}</p>
                    </div>

                    {/* ICP detail block */}
                    <section className="mb-16 border-t border-[#E5E5E5] pt-12">
                        <p className="text-[10px] font-bold tracking-widest uppercase text-[#FF6A00] mb-3">ICP map</p>
                        <h2 className="text-[#0A0A0A] text-2xl sm:text-3xl font-bold mb-8 leading-tight">Who we target for {n.shortName.toLowerCase()} clients.</h2>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <ICPCard label="Titles" items={n.icpDetail.titles} />
                            <ICPCard label="Geography" items={[n.icpDetail.geo]} />
                            <ICPCard label="Headcount band" items={[n.icpDetail.headcount]} />
                            <ICPCard label="Stage / funding" items={[n.icpDetail.fundingStage]} />
                        </div>
                    </section>

                    {/* Signal sources */}
                    <section className="mb-16 border-t border-[#E5E5E5] pt-12">
                        <p className="text-[10px] font-bold tracking-widest uppercase text-[#FF6A00] mb-3">Signals we track</p>
                        <h2 className="text-[#0A0A0A] text-2xl sm:text-3xl font-bold mb-8 leading-tight">What fires the engine for {n.shortName.toLowerCase()}.</h2>
                        <ul className="space-y-3">
                            {n.signals.map((s) => (
                                <li key={s} className="flex items-start gap-3 text-base text-[#374151] font-medium">
                                    <span className="w-1.5 h-1.5 rounded-full bg-[#FF6A00] mt-2.5 flex-shrink-0" />
                                    <span className="leading-relaxed">{s}</span>
                                </li>
                            ))}
                        </ul>
                    </section>

                    {/* Sample opener */}
                    <section className="mb-16 border-t border-[#E5E5E5] pt-12">
                        <p className="text-[10px] font-bold tracking-widest uppercase text-[#FF6A00] mb-3">Sample sequence opener</p>
                        <h2 className="text-[#0A0A0A] text-2xl sm:text-3xl font-bold mb-3 leading-tight">A real first touch for {n.shortName.toLowerCase()}.</h2>
                        <p className="section-sub mb-6 max-w-2xl">This is what a niche-aware, signal-tied opener actually looks like.</p>
                        <blockquote className="border-l-4 border-[#FF6A00] pl-6 py-2 text-base sm:text-lg text-[#0A0A0A] font-medium leading-relaxed max-w-3xl">
                            {n.sampleOpener}
                        </blockquote>
                    </section>

                    {/* Disqualifications */}
                    <section className="mb-16 border-t border-[#E5E5E5] pt-12">
                        <p className="text-[10px] font-bold tracking-widest uppercase text-[#FF6A00] mb-3">Disqualifications</p>
                        <h2 className="text-[#0A0A0A] text-2xl sm:text-3xl font-bold mb-3 leading-tight">When we say no for {n.shortName.toLowerCase()}.</h2>
                        <p className="section-sub mb-8 max-w-2xl">
                            We'd rather decline upfront than waste your retainer on a niche where our signal layer can't see opportunities.
                        </p>
                        <ul className="space-y-3">
                            {n.disqualify.map((d) => (
                                <li key={d} className="flex items-start gap-3 text-base text-[#374151] font-medium">
                                    <span className="text-[#9CA3AF] flex-shrink-0">✗</span>
                                    <span className="leading-relaxed">{d}</span>
                                </li>
                            ))}
                        </ul>
                    </section>

                    {/* CTA */}
                    <section className="border-t border-[#E5E5E5] pt-12 sm:pt-16 text-center max-w-2xl mx-auto">
                        <h2 className="text-2xl sm:text-3xl font-bold text-[#0A0A0A] mb-3 leading-tight">
                            See the candidate map for {n.shortName.toLowerCase()}.
                        </h2>
                        <p className="section-sub mb-6">
                            On the fit call we'll open the live signal feed and your specific ICP filter so you see what's possible before any commitment.
                        </p>
                        <Link
                            href={`/fit-call?niche=${encodeURIComponent(n.shortName.toLowerCase())}`}
                            className="inline-flex items-center justify-center bg-[#0A0A0A] text-white px-6 py-3 sm:px-8 sm:py-4 rounded-full font-medium hover:bg-[#222222] transition-colors text-base sm:text-lg"
                        >
                            Book a fit call
                        </Link>
                    </section>

                </div>
            </div>
            <Footer />
        </main>
    );
}

function ICPCard({ label, items }: { label: string; items: string[] }) {
    return (
        <div className="bg-[#F9FAFB] border border-[#E5E5E5] rounded-xl p-5">
            <p className="text-[10px] font-bold tracking-widest uppercase text-[#FF6A00] mb-3">{label}</p>
            <ul className="space-y-1.5">
                {items.map((item) => (
                    <li key={item} className="text-sm text-[#0A0A0A] font-medium leading-snug">{item}</li>
                ))}
            </ul>
        </div>
    );
}
