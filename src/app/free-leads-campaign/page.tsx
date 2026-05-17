import Link from 'next/link';
import Footer from '@/components/Footer';
import ApplyForm from '@/components/free-leads/ApplyForm';
import { buildCanonical } from '@/lib/seo';

export const metadata = {
    title: '10 Verified Hiring-Manager Contacts a Day — Free | RecruitmentOS',
    description: 'Apply with your niche. If you\'re a fit, we send 10 hand-verified hiring-manager contacts in your niche every day for 30 days. 300 leads. No commitment.',
    alternates: { canonical: buildCanonical('/free-leads-campaign') },
};

const howItWorks = [
    { n: '1', body: 'Apply with your agency website + niche + monthly revenue (60 seconds)' },
    { n: '2', body: 'We verify fit (24h) — niche must be specific, revenue ≥ $50K/mo' },
    { n: '3', body: 'Day 1: first 10 contacts in your inbox by 09:00 UTC' },
    { n: '4', body: 'Day 30: campaign ends — we email you a fit-call invite (no pressure)' },
];

const whatYouGet = [
    '300 hand-verified hiring-manager contacts in your niche',
    'Names, titles, verified emails, LinkedIn URLs, company context',
    'Daily delivery for 30 days — no batch dumps',
];

const notForYou = [
    'Sub-$50K/mo agencies (we can\'t help yet)',
    'Generalists with no clear niche (we can\'t filter without one)',
    'Outside the $500K–$5M revenue band',
    'Agencies whose bottleneck is candidates, not clients',
];

export default function FreeLeadsCampaignPage() {
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

                    {/* Hero */}
                    <div className="mb-16 sm:mb-20 max-w-3xl">
                        <p className="text-xs font-bold text-[#FF6A00] uppercase tracking-widest mb-3">
                            Limited campaign · 3 agencies per niche per month
                        </p>
                        <h1 className="text-[#0A0A0A] text-3xl sm:text-5xl md:text-6xl font-bold tracking-tight leading-[1.05] mb-6">
                            Get 10 verified hiring-manager contacts a day. For 30 days. Free.
                        </h1>
                        <p className="hero-sub mb-8">
                            Apply with your niche and revenue band. If you're a fit, we send you 10 hand-verified hiring-manager contacts in your niche, every day for the next month. 300 leads. No commitment. No upsell during the campaign.
                        </p>
                        <a
                            href="#apply"
                            className="inline-flex items-center justify-center bg-[#0A0A0A] text-white px-6 py-3 sm:px-8 sm:py-4 rounded-full font-medium hover:bg-[#222222] transition-colors text-base sm:text-lg group"
                        >
                            Apply now
                            <svg className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M19 14l-7 7-7-7M12 3v18" />
                            </svg>
                        </a>
                    </div>

                    {/* How it works */}
                    <section className="mb-20 border-t border-[#E5E5E5] pt-12">
                        <h2 className="text-[#0A0A0A] text-2xl sm:text-3xl font-bold mb-8 leading-tight">How it works</h2>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                            {howItWorks.map((s) => (
                                <div key={s.n} className="bg-[#F9FAFB] border border-[#E5E5E5] rounded-xl p-5">
                                    <span className="text-3xl font-black text-[#FF6A00] block mb-3 leading-none">{s.n}</span>
                                    <p className="text-sm text-[#374151] font-medium leading-snug">{s.body}</p>
                                </div>
                            ))}
                        </div>
                    </section>

                    {/* What you get */}
                    <section className="mb-20 border-t border-[#E5E5E5] pt-12">
                        <h2 className="text-[#0A0A0A] text-2xl sm:text-3xl font-bold mb-8 leading-tight">What you get</h2>
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
                            {whatYouGet.map((item) => (
                                <div key={item} className="bg-white border border-[#E5E5E5] rounded-xl p-5 flex items-start gap-3">
                                    <span className="text-[#FF6A00] font-bold flex-shrink-0">✓</span>
                                    <p className="text-sm text-[#0A0A0A] font-medium leading-snug">{item}</p>
                                </div>
                            ))}
                        </div>
                    </section>

                    {/* Who this isn't for */}
                    <section className="mb-20 border-t border-[#E5E5E5] pt-12">
                        <h2 className="text-[#0A0A0A] text-2xl sm:text-3xl font-bold mb-3 leading-tight">Who this isn't for</h2>
                        <p className="section-sub mb-8 max-w-2xl">
                            We'd rather say no upfront than waste your time. If any of these describe your agency, the campaign isn't a fit.
                        </p>
                        <ul className="space-y-3">
                            {notForYou.map((item) => (
                                <li key={item} className="flex items-start gap-3 text-base text-[#374151] font-medium">
                                    <span className="text-[#9CA3AF] flex-shrink-0">✗</span>
                                    <span>{item}</span>
                                </li>
                            ))}
                        </ul>
                    </section>

                    {/* Apply form */}
                    <section id="apply" className="border-t border-[#E5E5E5] pt-12 sm:pt-16">
                        <div className="text-center mb-10">
                            <p className="text-xs font-bold text-[#FF6A00] uppercase tracking-widest mb-3">Apply</p>
                            <h2 className="text-[#0A0A0A] text-2xl sm:text-3xl md:text-4xl font-bold leading-tight">
                                60 seconds. We respond in 24 hours.
                            </h2>
                        </div>
                        <ApplyForm />
                    </section>

                </div>
            </div>
            <Footer />
        </main>
    );
}
