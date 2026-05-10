export default function WhoItIsFor() {
    const forItems = [
        'You bill $50K–$400K per month',
        'You have 3–25 recruiters',
        'Permanent placements, average fee $5K+',
        'Your bottleneck is client acquisition, not candidates',
        "You'd rather pay one fixed monthly cost than hire a BD team",
    ];

    const notForItems = [
        "You're a solo recruiter or under $50K/month",
        'Your bottleneck is candidates, not clients',
        'You only do success-fee or pure performance deals',
        'You want a self-serve tool you operate yourself',
    ];

    return (
        <section className="py-16 md:py-24 bg-white border-t border-[#e5e5e5]" id="who-its-for">
            <div className="max-w-[1000px] mx-auto px-4 sm:px-6">
                <div className="mb-10 md:mb-14">
                    <p className="text-xs font-medium text-[#6b7280] uppercase tracking-widest mb-3">Fit Filter</p>
                    <h2 className="text-[#0A0A0A] text-3xl md:text-4xl font-extrabold tracking-tight">
                        Is this for you?
                    </h2>
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
                    If the right column describes you, please don&apos;t book a call. We&apos;ll waste each other&apos;s time.
                </p>
            </div>
        </section>
    );
}
