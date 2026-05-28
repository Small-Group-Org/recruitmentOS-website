import Link from 'next/link';

const rows = [
    {
        aspect: 'Lead Sourcing',
        oldWay: '4+ hrs/day manually searching LinkedIn & job boards',
        RecruitmentOS: 'AI scrapes 1M+ jobs automatically — every single day',
    },
    {
        aspect: 'Candidate Matching',
        oldWay: 'Hours cross-referencing CVs with open roles manually',
        RecruitmentOS: 'Instant AI match from your candidate database in seconds',
    },
    {
        aspect: 'Cold Outreach',
        oldWay: 'Generic "Hi, we\'re a great agency" emails — 1% reply rate',
        RecruitmentOS: '"We already have your hire" — hyper-personalized, 5.3% reply rate',
    },
    {
        aspect: 'Cost',
        oldWay: '$60,000+/year per senior Recruiter + commission',
        RecruitmentOS: 'From $500/mo — a fraction of one Recruiter\'s salary',
    },
    {
        aspect: 'Working Hours',
        oldWay: '8 hours/day, 5 days/week — misses weekend job postings',
        RecruitmentOS: '24/7/365 operation — catches every role the moment it posts',
    },
    {
        aspect: 'Scalability',
        oldWay: 'Want 2x volume? Hire 2x recruiters',
        RecruitmentOS: 'Turn up the dial — no headcount increase required',
    },
];

export default function ComparisonTable() {
    return (
        <section className="py-16 md:py-32 bg-[#F8FAFC]" id="comparison">
            <div className="max-w-[1280px] mx-auto px-5">
                <div className="text-center mb-12 sm:mb-16">
                    <div className="inline-block bg-[#1E293B] text-white px-4 py-1.5 sm:px-6 sm:py-2 rounded-full font-black text-[10px] sm:text-xs uppercase tracking-widest mb-6">
                        📊 Side by Side
                    </div>
                    <h2 className="text-2xl sm:text-3xl md:text-[48px] font-black mb-4 text-[#1E293B] tracking-tight leading-tight">
                        Why most recruitment agencies are stuck — and what actually fixes it.
                    </h2>
                    <p className="text-lg text-[#475569] font-medium max-w-[560px] mx-auto">
                        Find where you sit.
                    </p>
                </div>

                {/* Table */}
                <div className="rounded-[2rem] border-2 border-[#1E293B] overflow-hidden btn-shadow">
                    {/* Header */}
                    <div className="grid grid-cols-3 bg-[#1E293B] text-white">
                        <div className="px-5 py-4 text-xs font-black uppercase tracking-widest text-slate-400"></div>
                        <div className="px-5 py-4 text-xs font-black uppercase tracking-widest text-slate-300 border-l border-white/10">
                            ❌ The Old Way
                        </div>
                        <div className="px-5 py-4 text-xs font-black uppercase tracking-widest text-orange-300 border-l border-white/10">
                            ✅ RecruitmentOS
                        </div>
                    </div>

                    {/* Rows */}
                    {rows.map((row, i) => (
                        <div
                            key={i}
                            className={`grid grid-cols-3 border-t-2 border-[#1E293B]/10 ${i % 2 === 0 ? 'bg-white' : 'bg-[#F8FAFC]'}`}
                        >
                            <div className="px-5 py-5 text-xs sm:text-sm font-black text-[#475569] uppercase tracking-wider border-r-2 border-[#1E293B]/10 flex items-center">
                                {row.aspect}
                            </div>
                            <div className="px-5 py-5 text-sm text-[#94A3B8] font-medium leading-snug border-r-2 border-[#1E293B]/10 flex items-center">
                                {row.oldWay}
                            </div>
                            <div className="px-5 py-5 text-sm text-[#1E293B] font-bold leading-snug flex items-center">
                                {row.RecruitmentOS}
                            </div>
                        </div>
                    ))}

                    {/* ROI Summary Row */}
                    <div className="grid grid-cols-3 border-t-4 border-[#1E293B] bg-[#E0F2FE]">
                        <div className="px-5 py-5 text-sm sm:text-base font-black text-[#1E293B] uppercase tracking-wider border-r-2 border-[#1E293B]/10 flex flex-col justify-center">
                            Total Cost & Savings
                        </div>
                        <div className="px-5 py-5 text-sm sm:text-base text-[#475569] font-bold leading-snug border-r-2 border-[#1E293B]/10 flex flex-col justify-center">
                            $60,000+ /year per Recruiter
                        </div>
                        <div className="px-5 py-5 text-sm sm:text-base text-[#1E293B] font-black leading-snug flex flex-col justify-center gap-1">
                            <div>$6,000-$8,328/year (Full Service)</div>
                            <div className="text-orange-500 text-base sm:text-lg">Save $52,000+/year (87% reduction)</div>
                        </div>
                    </div>
                </div>

                {/* CTA below table */}
                <div className="text-center mt-10 sm:mt-12 flex flex-col sm:flex-row gap-4 justify-center">
                    <Link
                        href="https://cal.com/tusharm/30min?user=tusharm"
                        target="_blank"
                        className="bg-orange-500 text-white px-8 py-4 rounded-xl font-black transition-all hover:translate-y-[-2px] btn-shadow text-lg inline-flex items-center justify-center gap-2"
                    >
                        See Live Demo →
                    </Link>
                    <Link
                        href="https://cal.com/tusharm/30min?user=tusharm"
                        target="_blank"
                        className="bg-white text-[#1E293B] px-8 py-4 rounded-xl font-black transition-all hover:translate-y-[-2px] border-2 border-[#1E293B] text-lg inline-flex items-center justify-center gap-2"
                    >
                        Get the BD System
                    </Link>
                </div>
            </div>
        </section>
    );
}
