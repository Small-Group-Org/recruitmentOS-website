export default function TheBottleneck() {
    const alternatives = [
        {
            label: 'Hire more sourcers',
            consequence: 'Margin compresses, capacity grows linearly, leverage doesn\'t.',
            icon: '👥',
        },
        {
            label: 'Buy an AI tool',
            consequence: 'Your team doesn\'t use it, £15–25K written off.',
            icon: '🛠',
        },
        {
            label: 'Push harder',
            consequence: 'Your best recruiter leaves, pipeline still depends on you.',
            icon: '🔥',
        },
    ];

    return (
        <section className="py-16 md:py-24 bg-[#FAFAFA] border-t border-[#e5e5e5]" id="the-bottleneck">
            <div className="max-w-[900px] mx-auto px-4 sm:px-6">
                <div className="mb-10">
                    <p className="text-xs font-medium text-[#6b7280] uppercase tracking-widest mb-3">The Problem</p>
                    <h2 className="text-[#0A0A0A] text-3xl md:text-[42px] font-extrabold tracking-tight leading-tight mb-6">
                        The BD function in most $1M–$5M recruitment agencies looks the same.
                    </h2>
                    <p className="text-[17px] text-[#4B5563] leading-relaxed mb-4">
                        A founder still doing 30% of outreach personally. A BD analyst who can&apos;t keep up. Recruiters who half-help with sourcing when delivery slows down.
                    </p>
                    <p className="text-[17px] text-[#4B5563] leading-relaxed">
                        The math doesn&apos;t work. To hit consistent placements at scale, you need 5,000–10,000 verified hiring-manager contacts a month. Manual gets you 300–500.
                    </p>
                </div>

                <div className="mb-10">
                    <p className="text-sm font-semibold text-[#0A0A0A] uppercase tracking-widest mb-5">The three things agencies try. None of them work.</p>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        {alternatives.map((alt) => (
                            <div key={alt.label} className="bg-white rounded-[12px] border border-[#e5e5e5] p-6">
                                <div className="text-2xl mb-3">{alt.icon}</div>
                                <div className="text-[15px] font-bold text-[#0A0A0A] mb-2">{alt.label}</div>
                                <div className="text-[14px] text-[#dc2626] leading-snug">{alt.consequence}</div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="bg-[#0A0A0A] text-white rounded-[12px] px-7 py-6">
                    <p className="text-[17px] font-medium leading-relaxed">
                        The actual fix isn&apos;t more effort. It&apos;s removing BD from the human entirely.
                    </p>
                </div>
            </div>
        </section>
    );
}
