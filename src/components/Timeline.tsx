const phases = [
    {
        period: 'Days 1–7',
        title: 'Setup & Launch',
        description: 'Onboarding call, niche configuration, candidate data connected, sending infrastructure warmed up, and first campaigns deployed.',
        status: 'Setup',
        statusColor: 'bg-[#EEEBFB] text-[#3D2E7C]',
    },
    {
        period: 'Week 1–2',
        title: 'First Warm Replies',
        description: 'Outreach starts landing. Hiring managers respond to personalized candidate pitches. Your inbox fills with opportunities to close.',
        status: 'Early results',
        statusColor: 'bg-[#FDF6E8] text-[#B8862A]',
    },
    {
        period: 'Day 30',
        title: 'Pipeline Takes Shape',
        description: 'Consistent deal flow established. Targeting refined from live data. Your team focuses on closing, not sourcing.',
        status: 'Momentum',
        statusColor: 'bg-[#FCECEA] text-[#C0412B]',
    },
    {
        period: 'Day 60+',
        title: 'Revenue Compounds',
        description: 'System operates daily. Placements increase. Revenue grows predictably. You scale without adding headcount.',
        status: 'Growth',
        statusColor: 'bg-[#E8F5EF] text-[#1A6B4A]',
    },
];

export default function Timeline() {
    return (
        <section className="py-16 md:py-24 bg-white border-t border-[#E5E5E5]" id="timeline">
            <div className="max-w-[1280px] mx-auto px-6">
                <div className="mb-12 md:mb-16">
                    <p className="text-xs font-medium text-[#6B7280] uppercase tracking-widest mb-3">Implementation</p>
                    <h2 className="text-[#0A0A0A] max-w-[500px]">Ready in 7 days. Results by day 60. Yours forever.</h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-4 gap-0">
                    {phases.map((phase, index) => (
                        <div
                            key={phase.period}
                            className="relative p-6 md:p-8 border border-[#E5E5E5] md:border-r-0 md:last:border-r first:rounded-t-xl md:first:rounded-l-xl md:first:rounded-tr-none last:rounded-b-xl md:last:rounded-r-xl md:last:rounded-bl-none bg-white"
                        >
                            {/* Connector line (desktop) */}
                            {index < phases.length - 1 && (
                                <div className="hidden md:block absolute top-1/2 -right-[1px] w-[2px] h-8 -translate-y-1/2 bg-[#E5E5E5] z-10">
                                    <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-0 h-0 border-l-[3px] border-r-[3px] border-t-[4px] border-transparent border-t-[#D1D5DB]" />
                                </div>
                            )}

                            <div className="text-xs font-mono text-[#9CA3AF] mb-3">{phase.period}</div>
                            <h3 className="text-base font-semibold text-[#0A0A0A] mb-2">{phase.title}</h3>
                            <p className="text-xs text-[#6B7280] leading-relaxed mb-4">{phase.description}</p>
                            <span className={`inline-block text-[10px] font-medium uppercase tracking-wider px-2.5 py-1 rounded ${phase.statusColor}`}>
                                {phase.status}
                            </span>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
