import Link from 'next/link';

const services = [
    {
        step: '01',
        tag: 'Find jobs',
        headline: 'Every relevant job — before your competitors see it',
        description: 'We monitor 1M+ postings daily, filtered to your exact niche. Hiring manager name, direct email, and company context enriched within hours of posting.',
        metric: '1M+ jobs scanned daily',
        accentColor: '#1a6b4a',
        bgColor: '#e8f5ef',
        borderColor: '#6bcf9f',
    },
    {
        step: '02',
        tag: 'Match candidates',
        headline: 'AI shortlists your bench against every open role',
        description: 'Your candidate pool ranked against each live job in minutes. Your recruiters review a ranked shortlist — they never source again.',
        metric: 'Shortlist ready in < 5 min',
        accentColor: '#3d2e7c',
        bgColor: '#eeebfb',
        borderColor: '#9b8fdf',
    },
    {
        step: '03',
        tag: 'Send outreach',
        headline: 'Personalised emails sent — replies land in your inbox',
        description: 'Every email references the specific role and matched candidate. Hiring manager replies come straight to you. You only step in when someone says yes.',
        metric: '6%+ average reply rate',
        accentColor: '#b8862a',
        bgColor: '#fdf6e8',
        borderColor: '#f5c96a',
    },
];

export default function WhatWeDo() {
    return (
        <section className="py-16 md:py-24 bg-white border-t border-[#e5e5e5]" id="services">
            <div className="max-w-[1080px] mx-auto px-4 sm:px-6">

                <div className="mb-12 flex flex-col md:flex-row md:items-end md:justify-between gap-4">
                    <div>
                        <p
                            className="text-[11px] font-medium text-[#9ca3af] uppercase tracking-widest mb-3"
                            style={{ fontFamily: 'var(--font-mono)' }}
                        >
                            What We Actually Do
                        </p>
                        <h2
                            className="text-[#0A0A0A] text-3xl md:text-[40px] font-extrabold tracking-tight leading-[1.1]"
                            style={{ fontFamily: 'var(--font-serif)' }}
                        >
                            Three functions.<br className="hidden md:block" /> All done for you.
                        </h2>
                    </div>
                    <Link
                        href="https://cal.com/tusharm/30min?user=tusharm"
                        target="_blank"
                        className="inline-flex items-center gap-1.5 text-[14px] font-semibold text-[#0A0A0A] border-b-2 border-[#0A0A0A] pb-0.5 hover:border-[#F97316] hover:text-[#F97316] transition-colors whitespace-nowrap self-start md:self-end"
                        style={{ fontFamily: 'var(--font-outfit)' }}
                    >
                        See exactly how →
                    </Link>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                    {services.map((s) => (
                        <div
                            key={s.step}
                            className="relative rounded-[16px] border border-[#e5e5e5] bg-white overflow-hidden flex flex-col"
                            style={{ borderTopColor: s.borderColor, borderTopWidth: '3px' }}
                        >
                            {/* Decorative step number */}
                            <div
                                className="absolute top-4 right-5 text-[72px] font-black leading-none select-none pointer-events-none"
                                style={{ color: s.bgColor, fontFamily: 'var(--font-outfit)' }}
                            >
                                {s.step}
                            </div>

                            <div className="p-7 flex flex-col flex-1 relative z-10">
                                {/* Tag */}
                                <span
                                    className="inline-block self-start text-[10px] font-bold uppercase tracking-widest px-3 py-1.5 rounded-full mb-5"
                                    style={{ backgroundColor: s.bgColor, color: s.accentColor, fontFamily: 'var(--font-mono)' }}
                                >
                                    {s.tag}
                                </span>

                                {/* Headline */}
                                <h3
                                    className="text-[19px] font-bold text-[#0A0A0A] tracking-tight leading-snug mb-3"
                                    style={{ fontFamily: 'var(--font-outfit)' }}
                                >
                                    {s.headline}
                                </h3>

                                {/* Description */}
                                <p
                                    className="text-[14px] text-[#6b7280] leading-relaxed flex-1"
                                    style={{ fontFamily: 'var(--font-outfit)' }}
                                >
                                    {s.description}
                                </p>

                                {/* Metric */}
                                <div className="mt-6 pt-5 border-t border-[#e5e5e5]">
                                    <span
                                        className="text-[12px] font-bold"
                                        style={{ color: s.accentColor, fontFamily: 'var(--font-mono)' }}
                                    >
                                        ↗ {s.metric}
                                    </span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
