import Link from 'next/link';
import Footer from '@/components/Footer';
import { buildCanonical } from '@/lib/seo';

export const metadata = {
    title: 'RecruitmentOS vs Hiring a BD Rep | Outbound Growth for Agencies',
    description: 'Compare the cost, speed, data quality, and predictability of using RecruitmentOS vs. hiring a full-time in-house business development rep.',
    alternates: { canonical: buildCanonical('/recruitmentos-vs-hiring-bd-rep') },
};

const comparisonPoints = [
    {
        feature: 'Monthly Cost',
        recruitmentOS: '$224 - $1,034 / month (Fully-Managed)',
        bdRep: '$6,000 - $8,000 / month base salary + commission',
        winner: 'RecruitmentOS',
    },
    {
        feature: 'Setup & Tech Stack',
        recruitmentOS: 'Included (Clay, Instantly, n8n, custom filters)',
        bdRep: 'Extra ($500 - $1,500 / mo for databases & email tools)',
        winner: 'RecruitmentOS',
    },
    {
        feature: 'Time to First Campaign',
        recruitmentOS: '14 Days (DFY onboarding)',
        bdRep: '30 - 90 Days (Hiring, training, and database setup)',
        winner: 'RecruitmentOS',
    },
    {
        feature: 'Outbound Consistency',
        recruitmentOS: 'Automated 24/7 campaign execution & tracking',
        bdRep: 'Prone to manual fatigue, sick days, and attrition',
        winner: 'RecruitmentOS',
    },
    {
        feature: 'Sourcing Precision',
        recruitmentOS: 'Signal-based Clay enrichment (specific hiring triggers)',
        bdRep: 'Often relies on generic lists or basic LinkedIn searches',
        winner: 'RecruitmentOS',
    },
    {
        feature: 'Performance Guarantee',
        recruitmentOS: '60-Day delivery guarantee or we work free',
        bdRep: 'None (Full salary risk regardless of outcomes)',
        winner: 'RecruitmentOS',
    },
];

export default function ComparisonPage() {
    return (
        <main className="min-h-screen bg-white">
            <div className="pt-32 pb-24">
                <div className="max-w-[900px] mx-auto px-6 sm:px-10">

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
                    <div className="mb-12 sm:mb-16">
                        <p className="text-xs font-bold text-[#FF6A00] uppercase tracking-widest mb-3">Outbound Strategy</p>
                        <h1 className="text-[#0A0A0A] text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight leading-[1.05] mb-5">
                            RecruitmentOS vs. Hiring a Full-Time BD Rep
                        </h1>
                        <p className="text-gray-500 text-lg sm:text-xl font-medium max-w-2xl leading-relaxed">
                            A direct comparison of cost, setup speed, data enrichment quality, and outcomes for your recruitment agency.
                        </p>
                    </div>

                    {/* Comparison Table */}
                    <section className="mb-16">
                        <h2 className="text-[#0A0A0A] text-2xl font-bold mb-6">At a Glance</h2>
                        <div className="overflow-x-auto border border-[#E5E5E5] rounded-2xl">
                            <table className="min-w-full divide-y divide-[#E5E5E5] text-left text-sm">
                                <thead className="bg-[#FAFAFA] text-[#0A0A0A] font-bold">
                                    <tr>
                                        <th className="px-6 py-4">Capability</th>
                                        <th className="px-6 py-4">RecruitmentOS</th>
                                        <th className="px-6 py-4">Full-Time BD Rep</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-[#E5E5E5] text-[#374151] font-medium">
                                    {comparisonPoints.map((point) => (
                                        <tr key={point.feature} className="hover:bg-[#FAFAFA]/50 transition-colors">
                                            <td className="px-6 py-4 font-bold text-black">{point.feature}</td>
                                            <td className="px-6 py-4 text-[#FF6A00]">{point.recruitmentOS}</td>
                                            <td className="px-6 py-4">{point.bdRep}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </section>

                    {/* Detail Breakdown */}
                    <section className="space-y-12 border-t border-[#E5E5E5] pt-12">
                        <div className="space-y-4">
                            <h3 className="text-[#0A0A0A] text-2xl font-bold">1. The Financial Math</h3>
                            <p className="text-gray-600 leading-relaxed">
                                Hiring a full-time Business Development Representative (BDR) in the US, UK, or EU carries a base salary of $60,000–$80,000, plus commissions, taxes, healthcare benefits, and recruitment overhead. On top of that, you must pay for search databases (ZoomInfo, LinkedIn Sales Navigator) and outreach infrastructure (Instantly, Clay, Lemlist), bringing the total cost closer to $90,000–$110,000 annually.
                            </p>
                            <p className="text-gray-600 leading-relaxed">
                                **RecruitmentOS** replaces the entire infrastructure cost and BDR salary with a predictable monthly model ranging from **$224 to $1,034/month** (for fully-managed outbound campaigns), cutting your pipeline acquisition costs by 80–90% while deploying a complete data enrichment and delivery stack out of the box.
                            </p>
                        </div>

                        <div className="space-y-4">
                            <h3 className="text-[#0A0A0A] text-2xl font-bold">2. Sourcing Accuracy: Signal vs. Spray</h3>
                            <p className="text-gray-600 leading-relaxed">
                                Most human BDRs rely on basic database exports or manual LinkedIn scanning to build lists, which is slow and error-prone. This leads to broad, generic outreach campaigns that yield low response rates.
                            </p>
                            <p className="text-gray-600 leading-relaxed">
                                **RecruitmentOS** uses advanced signal-based triggers (e.g. tracking specific hiring activity, seed funding rounds, or leadership changes) combined with multiple API data sources (using Clay, n8n, and custom scripts) to enrich lists dynamically. Your outreach is highly relevant, resulting in higher reply rates and better agency placement numbers.
                            </p>
                        </div>

                        <div className="space-y-4">
                            <h3 className="text-[#0A0A0A] text-2xl font-bold">3. Execution Attrition and Reliability</h3>
                            <p className="text-gray-600 leading-relaxed">
                                BDR attrition is high, with the average rep tenure lasting less than 12 months. When a rep leaves, your pipeline halts, and you must restart the hiring, onboarding, and training cycle.
                            </p>
                            <p className="text-gray-600 leading-relaxed">
                                **RecruitmentOS** runs on fully automated and monitored cloud systems. Our team handles campaign delivery, inbox reputation, and daily system optimization so your agency outbound operations remain active and consistent 365 days a year.
                            </p>
                        </div>
                    </section>

                    {/* Guarantee Callout */}
                    <section className="my-16">
                        <div className="bg-[#0A0A0A] rounded-2xl px-8 sm:px-12 py-12 text-center">
                            <p className="text-[10px] font-bold tracking-widest uppercase text-[#FF6A00] mb-3">Our Commitment</p>
                            <h2 className="text-white text-2xl sm:text-3xl font-bold leading-tight mb-4 max-w-2xl mx-auto">
                                100 verified hiring-manager contacts in 60 days — or we work free until we do.
                            </h2>
                            <p className="text-[#9CA3AF] text-sm sm:text-base font-medium max-w-2xl mx-auto">
                                Hiring an employee is a risk. RecruitmentOS carries a contractual performance guarantee. If we don't deliver results within the first 60 days, we work free.
                            </p>
                        </div>
                    </section>

                    {/* Next Steps CTA */}
                    <section className="border-t border-[#E5E5E5] pt-12 text-center">
                        <h2 className="text-2xl sm:text-3xl font-bold text-black mb-4">
                            Score Your Agency's Outbound System
                        </h2>
                        <p className="text-gray-600 max-w-xl mx-auto mb-8 font-medium">
                            Let's map out your recruitment agency's volume math, target placement metrics, and active channels on a 30-minute fit call.
                        </p>
                        <Link
                            href="https://cal.com/tusharm/30min?user=tusharm"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center px-8 py-4 rounded-full bg-[#0A0A0A] text-white font-bold hover:bg-neutral-800 transition-colors shadow-lg"
                        >
                            Book a BD Scorecard Call
                        </Link>
                    </section>

                </div>
            </div>
            <Footer />
        </main>
    );
}
