export default function WhoItIsFor() {
    const forItems = [
        '$500K–$5M annual revenue (≥ $50K/month floor)',
        'Clear, specific niche — biotech, accounting, tech, finance, healthcare, exec search',
        'Permanent placements with average fee $5K+',
        'Bottleneck is client acquisition, not candidates',
        'You\'d rather rent a function than hire and manage a BD team',
        'Founder / MD / Commercial Director on the call',
    ];

    const notForItems = [
        'Solo recruiter or below $50K/month',
        '"We do recruitment in general" — no specific niche',
        'Bottleneck is candidate scarcity, not client acquisition',
        'Sub-$2K placement fees (the math doesn\'t work)',
        'You want a self-serve tool you operate yourself',
        'You want a deliverable to hand to your VA, not a partner',
    ];

    return (
        <section className="py-16 md:py-24 bg-white border-t border-[#e5e5e5]" id="who-its-for">
            <div className="max-w-[1100px] mx-auto px-4 sm:px-6">
                <div className="mb-10 md:mb-14">
                    <p className="text-xs font-medium text-[#6b7280] uppercase tracking-widest mb-3">Fit Filter</p>
                    <h2 className="text-[#0A0A0A] text-3xl md:text-4xl font-extrabold tracking-tight">
                        Is this for you?
                    </h2>
                    <p className="text-[16px] text-[#6b7280] mt-3 max-w-2xl">
                        We work with one buyer archetype: the <strong className="text-[#0A0A0A]">&ldquo;done-with-it owner.&rdquo;</strong> You&apos;ve burned $5K–$25K on a previous tool or agency. You don&apos;t want to learn another tool. You want someone to take BD off your desk entirely.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* For column */}
                    <div className="bg-[#f0fdf4] rounded-[14px] p-7 md:p-9 border border-[#bbf7d0]">
                        <p className="text-xs font-bold uppercase tracking-widest text-[#16a34a] mb-5">✓ This is for you if</p>
                        <ul className="space-y-3.5">
                            {forItems.map((item) => (
                                <li key={item} className="flex items-start gap-3">
                                    <span className="mt-0.5 w-5 h-5 rounded-full bg-[#16a34a] text-white flex items-center justify-center shrink-0 text-[10px] font-bold">✓</span>
                                    <span className="text-[15px] text-[#166534] leading-snug font-medium">{item}</span>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Not for column */}
                    <div className="bg-[#fff1f2] rounded-[14px] p-7 md:p-9 border border-[#fecdd3]">
                        <p className="text-xs font-bold uppercase tracking-widest text-[#dc2626] mb-5">× This is not for you if</p>
                        <ul className="space-y-3.5">
                            {notForItems.map((item) => (
                                <li key={item} className="flex items-start gap-3">
                                    <span className="mt-0.5 w-5 h-5 rounded-full bg-[#dc2626] text-white flex items-center justify-center shrink-0 text-[10px] font-bold">×</span>
                                    <span className="text-[15px] text-[#991b1b] leading-snug font-medium">{item}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                <p className="mt-8 text-sm text-[#6b7280] italic text-center md:text-left">
                    If the right column describes you, please don&apos;t book a call. We&apos;ll waste each other&apos;s time — and we&apos;ll point you at someone who does what you actually need.
                </p>
            </div>
        </section>
    );
}
