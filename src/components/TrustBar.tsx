const stats = [
    { value: '20k+', label: 'Verified contacts in 60 days' },
    { value: '7.5%+', label: 'Reply rate on BD outreach' },
    { value: '36+', label: 'Positive opportunities per campaign' },
    { value: '60-day', label: 'Results guarantee' },
];

export default function TrustBar() {
    return (
        <section className="border-y border-[#1f1f1f] bg-[#0A0A0A]">
            <div className="max-w-[1280px] mx-auto px-4 sm:px-6 py-8 md:py-10">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {stats.map((stat) => (
                        <div key={stat.label} className="text-center">
                            <div className="text-2xl md:text-3xl font-bold text-white tracking-tight mb-1">{stat.value}</div>
                            <div className="text-[11px] text-[#6B7280] uppercase tracking-wider">{stat.label}</div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
