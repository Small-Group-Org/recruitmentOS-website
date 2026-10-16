import Image from 'next/image';

const stats = [
    { value: '50+', label: 'Contracts signed in 90 days' },
    { value: '15–25', label: 'Client calls / week' },
    { value: '£180k', label: 'Pipeline with £0 ads' },
    { value: '$0', label: 'Fee on non-buyers' },
];

interface EcosystemBadge {
    name: string;
    icon?: string;
    svg?: React.ReactNode;
}

const ecosystemBadges: EcosystemBadge[] = [
    { name: 'Clay', icon: '/logos/clay.webp' },
    { name: 'Apollo', icon: '/logos/apollo.webp' },
    { name: 'Instantly', icon: '/logos/instantly.webp' },
    { name: 'Claude', icon: '/logos/claude.webp' },
    {
        name: 'Bullhorn',
        svg: (
            <svg className="w-3.5 h-3.5 text-brand" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="m3 11 18-5v12L3 14v-3z" />
                <path d="M11.6 16.8a3 3 0 1 1-5.8-1.6" />
            </svg>
        ),
    },
    {
        name: 'Vincere',
        svg: (
            <svg className="w-3.5 h-3.5 text-brand" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="m4 6 8 13 8-13" />
            </svg>
        ),
    },
    { name: 'n8n', icon: '/logos/n8n.webp' },
    { name: 'SalesNav', icon: '/logos/salesnav.webp' },
    { name: 'Hunter', icon: '/logos/hunter.webp' },
];

export default function TrustBar() {
    return (
        <section className="border-y border-[#1f1f1f] bg-[#0A0A0A]">
            <div className="max-w-[1280px] mx-auto px-4 sm:px-6 py-8 md:py-10">
                {/* 4 Performance Metrics */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6 pb-8 border-b border-neutral-800">
                    {stats.map((stat) => (
                        <div key={stat.label} className="text-center">
                            <div className="text-2xl md:text-3xl font-bold text-white tracking-tight mb-1" style={{ fontFamily: 'var(--font-mono)' }}>{stat.value}</div>
                            <div className="text-[11px] text-[#9CA3AF] uppercase tracking-wider">{stat.label}</div>
                        </div>
                    ))}
                </div>

                {/* Ecosystem Authority Strip */}
                <div className="pt-6 text-center">
                    <p className="text-[10px] sm:text-[11px] font-bold uppercase tracking-[0.18em] text-[#9CA3AF] mb-4" style={{ fontFamily: 'var(--font-mono)' }}>
                        ENGINEERED ACROSS INDUSTRY-STANDARD OUTBOUND &amp; ENRICHMENT INFRASTRUCTURE
                    </p>
                    <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-4">
                        {ecosystemBadges.map((badge) => (
                            <div
                                key={badge.name}
                                className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-neutral-900 border border-neutral-800 hover:border-neutral-700 transition-colors"
                            >
                                {badge.icon ? (
                                    <div className="relative w-4 h-4 shrink-0">
                                        <Image
                                            src={badge.icon}
                                            alt={badge.name}
                                            fill
                                            sizes="16px"
                                            className="object-contain"
                                        />
                                    </div>
                                ) : (
                                    <div className="w-4 h-4 shrink-0 flex items-center justify-center">
                                        {badge.svg}
                                    </div>
                                )}
                                <span className="text-xs font-semibold text-neutral-300">{badge.name}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
