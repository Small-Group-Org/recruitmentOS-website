'use client';

const beforeItems = [
    {
        text: 'Growth only happens by hiring more recruiters and sourcers',
        icon: (
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
        ),
    },
    {
        text: 'Relying on job boards and blind outreach',
        icon: (
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
        ),
    },
    {
        text: 'Hard to differentiate from other agencies',
        icon: (
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
        ),
    },
    {
        text: 'Spend hours screening candidates manually',
        icon: (
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
        ),
    },
    {
        text: 'Lost in hiring manager inboxes',
        icon: (
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
        ),
    },
    {
        text: 'Always one step behind competitors',
        icon: (
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M13 17h8m0 0V9m0 8l-8-8-4 4-6-6" />
            </svg>
        ),
    },
];

const afterItems = [
    {
        text: 'Same team: 10,000 → 60,000+ outbound touches/month',
        icon: (
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
            </svg>
        ),
    },
    {
        text: 'Jobs scraped within hours of posting, not days',
        icon: (
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
            </svg>
        ),
    },
    {
        text: '100+ hiring-manager contacts in your pipeline/month',
        icon: (
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
            </svg>
        ),
    },
    {
        text: 'Candidate-to-job matching surfaced in minutes',
        icon: (
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
        ),
    },
    {
        text: 'Hiring managers, not HR. Enriched email on every role.',
        icon: (
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
            </svg>
        ),
    },
    {
        text: 'Founder hours: 60 → 25/week. Same headcount.',
        icon: (
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
            </svg>
        ),
    },
];

export default function BeforeAfter() {
    return (
        <section className="py-14 md:py-32 bg-[#FAFAFA]" id="before-after">
            <div className="max-w-[1280px] mx-auto px-4 sm:px-6">
                {/* Section Header */}
                <div className="text-center mb-10 md:mb-20">
                    <p className="text-xs font-semibold text-[#6B7280] uppercase tracking-[0.2em] mb-4">
                        The Transformation
                    </p>
                    <h2 className="text-3xl md:text-[44px] font-extrabold text-[#111] tracking-tight leading-tight">
                        Recruiting has changed. Your systems should too.
                    </h2>
                </div>

                {/* Comparison Container */}
                <div className="relative">
                    {/* Floating Pills — outside overflow-hidden container */}
                    <div className="absolute top-0 left-0 right-0 z-20 flex justify-between pointer-events-none px-4 md:px-12 -translate-y-1/2">
                        <span className="bg-[#3B82F6] text-white text-[11px] font-bold uppercase tracking-widest px-4 py-1.5 rounded-full shadow-md">
                            Before
                        </span>
                        <span className="bg-[#F97316] text-white text-[11px] font-bold uppercase tracking-widest px-4 py-1.5 rounded-full shadow-md">
                            After
                        </span>
                    </div>

                <div className="rounded-[28px] border-2 border-[#E2E8F0] bg-white shadow-[0_8px_40px_rgba(0,0,0,0.06)] overflow-hidden">

                    {/* Center Arrow Button */}
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20 hidden md:flex">
                        <div className="w-12 h-12 rounded-full bg-white border-2 border-[#E2E8F0] shadow-lg flex items-center justify-center hover:scale-110 hover:shadow-xl transition-all duration-300 cursor-default">
                            <svg className="w-5 h-5 text-[#111]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                            </svg>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2">
                        {/* LEFT — Before */}
                        <div className="relative bg-[#EBF4FF] p-6 md:p-12 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_8px_30px_rgba(59,130,246,0.08)] group">
                            {/* Vertical Divider (desktop) */}
                            <div className="hidden md:block absolute right-0 top-8 bottom-8 w-px bg-[#CBD5E1]" />

                            <h3 className="text-[22px] md:text-[34px] font-extrabold text-[#1A1A1A] leading-snug mb-6 md:mb-8 tracking-tight">
                                Old Way of Recruiting
                            </h3>

                            <div className="space-y-3 md:space-y-5">
                                {beforeItems.map((item) => (
                                    <div key={item.text} className="flex items-start gap-3.5">
                                        <div className="w-8 h-8 rounded-lg bg-[#DBEAFE] flex items-center justify-center shrink-0 mt-0.5 text-[#6B7280] group-hover:text-[#3B82F6] transition-colors duration-300">
                                            {item.icon}
                                        </div>
                                        <span className="text-[15px] md:text-[16px] text-[#4B5563] leading-relaxed font-medium">
                                            {item.text}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Mobile Divider */}
                        <div className="md:hidden flex items-center justify-center py-2 bg-white">
                            <div className="w-10 h-10 rounded-full bg-white border-2 border-[#E2E8F0] shadow-md flex items-center justify-center">
                                <svg className="w-4 h-4 text-[#111] rotate-90" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                                </svg>
                            </div>
                        </div>

                        {/* RIGHT — After */}
                        <div className="bg-[#FFF4EB] p-6 md:p-12 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_8px_30px_rgba(249,115,22,0.08)] group">
                            <h3 className="text-[22px] md:text-[34px] font-extrabold text-[#1A1A1A] leading-snug mb-6 md:mb-8 tracking-tight">
                                With Recruitment<span className="text-[#F97316]">OS</span>
                            </h3>

                            <div className="space-y-3 md:space-y-5">
                                {afterItems.map((item) => (
                                    <div key={item.text} className="flex items-start gap-3.5">
                                        <div className="w-8 h-8 rounded-lg bg-[#FFEDD5] flex items-center justify-center shrink-0 mt-0.5 text-[#9A6B3A] group-hover:text-[#F97316] transition-colors duration-300">
                                            {item.icon}
                                        </div>
                                        <span className="text-[15px] md:text-[16px] text-[#1A1A1A] leading-relaxed font-medium">
                                            {item.text}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
                </div>
            </div>
        </section>
    );
}
