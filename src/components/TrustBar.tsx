const stats = [
    { value: '20k+', label: 'Verified contacts in 60 days' },
    { value: '4%', label: 'Reply rate on BD outreach' },
    { value: '60-day', label: 'Results guarantee' },
];

export default function TrustBar() {
    return (
        <section className="border-y border-[#E5E5E5] bg-[#FAFAFA]">
            <div className="max-w-[1280px] mx-auto px-4 sm:px-6 py-8 md:py-10">
                <div className="grid grid-cols-3 gap-4">
                    {stats.map((stat) => (
                        <div key={stat.label} className="text-center">
                            <div className="text-2xl md:text-3xl font-bold text-[#0A0A0A] tracking-tight mb-1">{stat.value}</div>
                            <div className="text-[11px] text-[#9CA3AF] uppercase tracking-wider">{stat.label}</div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
