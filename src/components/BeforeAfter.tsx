'use client';

type Item = {
    text: string;
    icon: React.ReactNode;
};

const manualItems: Item[] = [
    {
        text: 'Manually scanning LinkedIn, job boards & company pages — 4+ hrs/day',
        icon: (
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
        ),
    },
    {
        text: 'Searching with ChatGPT or Claude web search — still manual prompting, no system',
        icon: (
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
            </svg>
        ),
    },
    {
        text: 'Generic blind outreach — 1% reply rate',
        icon: (
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
        ),
    },
    {
        text: 'Hours cross-referencing CVs to open roles',
        icon: (
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
        ),
    },
    {
        text: 'Growth only comes from hiring more recruiters',
        icon: (
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
        ),
    },
];

const softwareItems: Item[] = [
    {
        text: 'ATS/CRM (Bullhorn, Vincere) stores data — but doesn\'t generate pipeline',
        icon: (
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 7v10a2 2 0 002 2h12a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H6a2 2 0 00-2 2z" />
            </svg>
        ),
    },
    {
        text: 'Sales Navigator and similar tools — still manual filtering at scale',
        icon: (
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
            </svg>
        ),
    },
    {
        text: 'Email tools (Instantly, Smartlead) — no niche-specific signal layer feeding them',
        icon: (
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" />
            </svg>
        ),
    },
    {
        text: 'You react to public job posts — not to leading hiring signals',
        icon: (
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
        ),
    },
    {
        text: 'Tools don\'t talk to each other — your team becomes the integration',
        icon: (
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M10 14L21 3m0 0h-7m7 0v7M14 4H4v16h16V10" />
            </svg>
        ),
    },
];

const osItems: Item[] = [
    {
        text: 'AI signal engine surfaces hiring 4–8 weeks before the job-post goes public',
        icon: (
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
        ),
    },
    {
        text: 'Trigger-specific personalized openers — 4% reply rate at scale',
        icon: (
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
            </svg>
        ),
    },
    {
        text: 'Niche-filtered enrichment delivers verified hiring-manager contacts daily',
        icon: (
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
            </svg>
        ),
    },
    {
        text: '4-touch cold + 3-touch warm cadences run daily on your stack',
        icon: (
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
        ),
    },
    {
        text: 'Same team, 10× pipeline — turn up the dial, no headcount needed',
        icon: (
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
            </svg>
        ),
    },
];

type Column = {
    pill: string;
    pillBg: string;
    pillText: string;
    bg: string;
    iconBg: string;
    iconText: string;
    iconHover: string;
    title: React.ReactNode;
    items: Item[];
    textColor: string;
};

const columns: Column[] = [
    {
        pill: 'Manual',
        pillBg: 'bg-[#9CA3AF]',
        pillText: 'text-white',
        bg: 'bg-[#F3F4F6]',
        iconBg: 'bg-white',
        iconText: 'text-[#9CA3AF]',
        iconHover: 'group-hover:text-[#4B5563]',
        title: 'Manual recruiting',
        items: manualItems,
        textColor: 'text-[#4B5563]',
    },
    {
        pill: 'Modern software',
        pillBg: 'bg-[#3B82F6]',
        pillText: 'text-white',
        bg: 'bg-[#EBF4FF]',
        iconBg: 'bg-[#DBEAFE]',
        iconText: 'text-[#6B7280]',
        iconHover: 'group-hover:text-[#3B82F6]',
        title: 'Modern recruiting software',
        items: softwareItems,
        textColor: 'text-[#4B5563]',
    },
    {
        pill: '10× better',
        pillBg: 'bg-[#FF6A00]',
        pillText: 'text-white',
        bg: 'bg-[#FFF4EB]',
        iconBg: 'bg-[#FFEDD5]',
        iconText: 'text-[#9A6B3A]',
        iconHover: 'group-hover:text-[#FF6A00]',
        title: (<>With Recruitment<span className="text-[#FF6A00]">OS</span></>),
        items: osItems,
        textColor: 'text-[#0A0A0A]',
    },
];

export default function BeforeAfter() {
    return (
        <section className="py-16 md:py-24 bg-[#FAFAFA]" id="before-after">
            <div className="max-w-[1280px] mx-auto px-4 sm:px-6">
                <div className="text-center mb-10 md:mb-20 max-w-3xl mx-auto">
                    <p className="text-xs font-semibold text-[#6B7280] uppercase tracking-[0.2em] mb-4">
                        The Transformation
                    </p>
                    <h2 className="text-3xl md:text-[44px] font-extrabold text-[#0A0A0A] tracking-tight leading-tight mb-4">
                        Manual recruiting fails. Modern software falls short. Our AI system is 10× better.
                    </h2>
                    <p className="text-base md:text-lg text-[#4B5563] font-medium">
                        Most agencies are stuck between two broken options. Here&apos;s the third one.
                    </p>
                </div>

                <div className="relative">
                    <div className="absolute top-0 left-0 right-0 z-20 flex justify-between pointer-events-none px-4 md:px-8 -translate-y-1/2">
                        {columns.map((col, idx) => (
                            <span
                                key={col.pill}
                                className={`${col.pillBg} ${col.pillText} text-[10px] sm:text-[11px] font-bold uppercase tracking-widest px-3 sm:px-4 py-1.5 rounded-full shadow-md`}
                                style={{ marginLeft: idx === 0 ? '0' : 'auto', marginRight: idx === columns.length - 1 ? '0' : 'auto' }}
                            >
                                {col.pill}
                            </span>
                        ))}
                    </div>

                    <div className="rounded-[28px] border-2 border-[#E5E5E5] bg-white shadow-[0_8px_40px_rgba(0,0,0,0.06)] overflow-hidden">
                        <div className="grid grid-cols-1 md:grid-cols-3">
                            {columns.map((col, idx) => (
                                <div
                                    key={col.pill}
                                    className={`relative ${col.bg} p-6 md:p-8 lg:p-10 transition-all duration-300 hover:-translate-y-1 group ${idx < columns.length - 1 ? 'md:border-r md:border-[#D1D5DB]/40' : ''} ${idx > 0 ? 'border-t md:border-t-0 border-[#D1D5DB]/40' : ''}`}
                                >
                                    <h3 className="text-[20px] md:text-[24px] font-extrabold text-[#0A0A0A] leading-snug mb-6 md:mb-8 tracking-tight">
                                        {col.title}
                                    </h3>

                                    <div className="space-y-3 md:space-y-5">
                                        {col.items.map((item) => (
                                            <div key={item.text} className="flex items-start gap-3">
                                                <div className={`w-8 h-8 rounded-lg ${col.iconBg} flex items-center justify-center shrink-0 mt-0.5 ${col.iconText} ${col.iconHover} transition-colors duration-300`}>
                                                    {item.icon}
                                                </div>
                                                <span className={`text-[14px] md:text-[15px] ${col.textColor} leading-relaxed font-medium`}>
                                                    {item.text}
                                                </span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
