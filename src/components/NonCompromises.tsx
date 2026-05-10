const items = [
    {
        n: '01',
        title: 'No outreach without niche-specific filtering.',
        body: 'Spray-and-pray sends and your domains burn in 90 days — and your brand burns with them. Even when a client pushes for "just send more," we don\'t.',
    },
    {
        n: '02',
        title: 'No promised meetings without a written Qualified Meeting Definition.',
        body: 'Title list, geography, company size, show-up rate — defined and signed before contracts. So month 6 isn\'t a fight about which meetings counted.',
    },
    {
        n: '03',
        title: 'No Build for an agency whose delivery isn\'t ready.',
        body: 'If your candidate pipeline can\'t fulfil the meetings we\'ll book, we tell you to fix that first and come back. Lost revenue. Worth it.',
    },
];

export default function NonCompromises() {
    return (
        <section className="py-16 md:py-24 bg-white border-t border-[#e5e5e5]" id="non-compromises">
            <div className="max-w-[1100px] mx-auto px-4 sm:px-6">
                <div className="mb-12">
                    <p className="text-xs font-medium text-[#6b7280] uppercase tracking-widest mb-3">What we won&apos;t do</p>
                    <h2 className="text-[#0A0A0A] text-3xl md:text-4xl font-extrabold tracking-tight max-w-3xl">
                        Three things we won&apos;t compromise on.
                    </h2>
                    <p className="text-[15px] text-[#6b7280] mt-3 max-w-2xl">
                        These cost real money. They&apos;re also why our retention beats the category average.
                    </p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                    {items.map((c) => (
                        <div key={c.n} className="bg-[#0A0A0A] text-white rounded-[14px] p-7 flex flex-col">
                            <p className="text-[11px] font-mono font-bold text-[#F97316] mb-4">{c.n}</p>
                            <h3 className="text-[16px] font-bold mb-3 leading-snug">{c.title}</h3>
                            <p className="text-[14px] text-[#9ca3af] leading-relaxed">{c.body}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
