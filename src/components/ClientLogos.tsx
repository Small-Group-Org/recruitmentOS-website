'use client';

const agencies = [
    { name: 'Scout Talent', initials: 'ST' },
    { name: 'PeakHire', initials: 'PH' },
    { name: 'NexGen Recruit', initials: 'NG' },
    { name: 'HireIQ', initials: 'HQ' },
    { name: 'TalentBridge', initials: 'TB' },
];

export default function ClientLogos() {
    return (
        <section className="border-b border-[#e5e5e5] bg-white">
            <div className="max-w-[1000px] mx-auto px-4 sm:px-6 py-10">
                <p
                    className="text-center text-[11px] uppercase tracking-widest text-[#9ca3af] mb-8"
                    style={{ fontFamily: 'var(--font-mono)' }}
                >
                    Trusted by 12+ recruitment agencies
                </p>
                <div className="flex flex-wrap items-center justify-center gap-x-10 gap-y-5">
                    {agencies.map((a) => (
                        <div key={a.name} className="flex items-center gap-2.5 opacity-50 hover:opacity-75 transition-opacity">
                            <div
                                className="w-8 h-8 rounded-[6px] bg-[#0A0A0A] flex items-center justify-center text-white text-[10px] font-bold shrink-0"
                                style={{ fontFamily: 'var(--font-mono)' }}
                            >
                                {a.initials}
                            </div>
                            <span
                                className="text-[15px] font-semibold text-[#0A0A0A] whitespace-nowrap"
                                style={{ fontFamily: 'var(--font-outfit)' }}
                            >
                                {a.name}
                            </span>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
