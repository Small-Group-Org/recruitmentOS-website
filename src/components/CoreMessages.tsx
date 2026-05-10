import Link from 'next/link';

const messages = [
    {
        n: '01',
        title: 'You\'re being outrun by volume — not skill.',
        body: 'Your pitch is fine. Your reply rate is fine. Your volume is 5–15× below what your placement target actually requires. Fixable.',
        cta: 'Run my volume math →',
        href: '/calculator',
    },
    {
        n: '02',
        title: 'By the time you see the job post, the race is over.',
        body: 'Agencies winning the brief reach companies 4–8 weeks before job posts exist — by tracking signals: BD hires, funding, restructures, departures.',
        cta: 'How the signal layer works →',
        href: '/fit-call',
    },
    {
        n: '03',
        title: 'Generic systems fail specific businesses.',
        body: 'A BD system built for "all recruitment agencies" is built for none. Specialise to the niche, geography, and trigger — or burn $25K like the 40 agencies who tried generic.',
        cta: 'Score your BD function →',
        href: '/scorecard',
    },
];

export default function CoreMessages() {
    return (
        <section className="py-16 md:py-24 bg-[#FAFAFA] border-t border-[#e5e5e5]" id="core-messages">
            <div className="max-w-[1100px] mx-auto px-4 sm:px-6">
                <div className="mb-12">
                    <p className="text-xs font-medium text-[#6b7280] uppercase tracking-widest mb-3">What we&apos;ve learned</p>
                    <h2 className="text-[#0A0A0A] text-3xl md:text-4xl font-extrabold tracking-tight max-w-3xl">
                        Three things every $500K+ agency we&apos;ve worked with had wrong.
                    </h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                    {messages.map((m) => (
                        <div key={m.n} className="bg-white rounded-[14px] border border-[#e5e5e5] p-7 flex flex-col">
                            <p className="text-[11px] font-mono font-bold text-[#F97316] mb-4">{m.n}</p>
                            <h3 className="text-[19px] font-bold text-[#0A0A0A] tracking-tight leading-snug mb-3">{m.title}</h3>
                            <p className="text-[14px] text-[#6b7280] leading-relaxed flex-1 mb-5">{m.body}</p>
                            <Link
                                href={m.href}
                                className="inline-flex items-center text-[14px] font-semibold text-[#0A0A0A] underline underline-offset-4 hover:text-[#F97316] transition-colors"
                            >
                                {m.cta}
                            </Link>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
