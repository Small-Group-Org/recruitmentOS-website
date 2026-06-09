import Link from 'next/link';

const comparisons = [
    {
        aspect: 'Lead sourcing',
        diy: '4+ hrs/day scanning job boards & LinkedIn manually',
        ros: 'Signal-detected daily — companies actively hiring, right now',
    },
    {
        aspect: 'List quality',
        diy: 'Static lists, fast decay, high bounce rates',
        ros: '20+ enrichment sources, email-verified, signal-fresh',
    },
    {
        aspect: 'Deliverability',
        diy: 'You monitor SPF/DKIM, inbox placement, warmup yourself',
        ros: 'We monitor, fix, and iterate — daily',
    },
    {
        aspect: 'Sequence iteration',
        diy: 'You A/B test and rewrite copy between campaigns',
        ros: 'Account manager handles it — weekly iteration loop',
    },
    {
        aspect: 'Reply triage',
        diy: 'You read every reply to find the 10% that matter',
        ros: 'Only positive, on-brief replies reach your inbox',
    },
    {
        aspect: 'Your time',
        diy: 'You become the bottleneck again',
        ros: 'You respond to "yes" — nothing else',
    },
];

export default function WhyNotDIY() {
    return (
        <section className="py-16 md:py-24 bg-white border-t border-[#E5E5E5]" id="why-not-diy">
            <div className="max-w-[1100px] mx-auto px-4 sm:px-6">

                {/* Header */}
                <div className="max-w-2xl mb-12 md:mb-16">
                    <p className="text-xs font-semibold uppercase tracking-widest text-[#FF6A00] mb-3">
                        For the experienced buyer
                    </p>
                    <h2 className="text-[#0A0A0A] text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight mb-4 leading-snug">
                        &ldquo;I&rsquo;ve used Instantly before. Why not just do this myself?&rdquo;
                    </h2>
                    <p className="text-base text-[#6B7280] leading-relaxed">
                        Honest answer: you could. The agencies who come to us usually have tried. Here&rsquo;s what the comparison actually looks like in practice.
                    </p>
                </div>

                {/* Comparison table */}
                <div className="rounded-2xl border border-[#E5E5E5] overflow-hidden shadow-sm mb-12">
                    {/* Table header */}
                    <div className="grid grid-cols-[1.2fr_2fr_2fr] bg-[#FAFAFA] border-b border-[#E5E5E5]">
                        <div className="px-5 py-3.5 text-[11px] font-bold uppercase tracking-widest text-[#9CA3AF]" />
                        <div className="px-5 py-3.5 text-[11px] font-bold uppercase tracking-widest text-[#9CA3AF] border-l border-[#E5E5E5]">
                            DIY with Instantly / Clay / etc.
                        </div>
                        <div className="px-5 py-3.5 text-[11px] font-bold uppercase tracking-widest text-[#FF6A00] border-l border-[#E5E5E5]">
                            With RecruitmentOS
                        </div>
                    </div>

                    {/* Rows */}
                    {comparisons.map((row, i) => (
                        <div
                            key={row.aspect}
                            className={`grid grid-cols-[1.2fr_2fr_2fr] ${i < comparisons.length - 1 ? 'border-b border-[#E5E5E5]' : ''}`}
                        >
                            {/* Aspect label */}
                            <div className="px-5 py-4 flex items-center">
                                <span className="text-[12px] font-bold uppercase tracking-wider text-[#0A0A0A]">
                                    {row.aspect}
                                </span>
                            </div>

                            {/* DIY column */}
                            <div className="px-5 py-4 border-l border-[#E5E5E5] flex items-start gap-2.5">
                                <span className="mt-0.5 shrink-0 w-4 h-4 rounded-full bg-[#F3F4F6] flex items-center justify-center">
                                    <svg className="w-2.5 h-2.5 text-[#9CA3AF]" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2.5}>
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                </span>
                                <span className="text-[13px] text-[#6B7280] leading-relaxed">{row.diy}</span>
                            </div>

                            {/* RecruitmentOS column */}
                            <div className="px-5 py-4 border-l border-[#E5E5E5] bg-[#FFFBF7] flex items-start gap-2.5">
                                <span className="mt-0.5 shrink-0 w-4 h-4 rounded-full bg-[#FF6A00]/15 flex items-center justify-center">
                                    <svg className="w-2.5 h-2.5 text-[#FF6A00]" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={3}>
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                                    </svg>
                                </span>
                                <span className="text-[13px] text-[#374151] leading-relaxed font-medium">{row.ros}</span>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Outcome callout */}
                <div className="rounded-2xl bg-[#0A0A0A] px-8 py-8 flex flex-col md:flex-row items-start md:items-center gap-6 md:gap-10">
                    <div className="flex-1">
                        <p className="text-white text-lg md:text-xl font-bold leading-snug mb-2">
                            We built this once — and run it for 10+ agencies.
                        </p>
                        <p className="text-[#9CA3AF] text-sm leading-relaxed">
                            From a 7,550-lead campaign: 11.38% reply rate, 36 positive opportunities. One client closed 20+ contracts from that pipeline. That&rsquo;s what a signal-first engine vs. a blind list looks like in practice.
                        </p>
                    </div>
                    <Link
                        href="/fit-call"
                        className="shrink-0 inline-flex items-center justify-center bg-[#FF6A00] text-white px-6 py-3.5 rounded-full font-semibold hover:bg-[#E55F00] transition-colors text-sm group whitespace-nowrap"
                        id="why-not-diy-cta"
                    >
                        See if it fits your agency
                        <svg className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14M12 5l7 7-7 7" />
                        </svg>
                    </Link>
                </div>
            </div>
        </section>
    );
}
