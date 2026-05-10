import Link from 'next/link';

const tiers = [
    {
        name: 'Starter',
        range: '0–4 placements/mo',
        setup: '$500',
        monthly: '$1,300',
        bestFor: 'Smaller agencies testing the engine. Lowest-friction entry into the Run programme.',
        leads: '2,500 verified leads/mo',
        features: [
            'Niche-specific ICP map + signal engine',
            '7 sending inboxes · 4 domains',
            'Reply triage to your recruiters',
            'Weekly reporting + monthly iteration',
        ],
        featured: false,
        roi: '24×',
    },
    {
        name: 'Growth',
        range: '5–10 placements/mo',
        setup: '$750',
        monthly: '$2,750',
        bestFor: 'Where ~95% of $500K–$5M agencies land. The recommended tier.',
        leads: '8,750 verified leads/mo',
        features: [
            'Everything in Starter',
            '22 sending inboxes · 11 domains',
            'Quarterly Business Review',
            'Sequence A/B testing',
        ],
        featured: true,
        roi: '26×',
    },
    {
        name: 'Pro',
        range: '10–25 placements/mo',
        setup: '$1,000',
        monthly: '$6,500',
        bestFor: 'Multi-niche or multi-geography agencies running BD at scale.',
        leads: '25,000 verified leads/mo',
        features: [
            'Everything in Growth',
            '63 sending inboxes · 32 domains',
            'Multi-niche / multi-geo support',
            'Priority support + custom reporting',
        ],
        featured: false,
        roi: '31×',
    },
];

export default function Pricing() {
    return (
        <section className="py-16 md:py-24 bg-white border-t border-[#e5e5e5]" id="pricing">
            <div className="max-w-[1100px] mx-auto px-4 sm:px-6">
                <div className="mb-12">
                    <p className="text-xs font-medium text-[#6b7280] uppercase tracking-widest mb-3">Pricing — Build + Run</p>
                    <h2 className="text-[#0A0A0A] text-3xl md:text-4xl font-extrabold tracking-tight">
                        Two parts. Both transparent.
                    </h2>
                    <p className="text-[16px] text-[#6b7280] mt-4 max-w-2xl">
                        A one-time <strong className="text-[#0A0A0A]">Build</strong> to design and stand up the BD engine on your stack. A monthly <strong className="text-[#0A0A0A]">Run</strong> retainer that operates it. 30-day notice to cancel — no minimum-term lock-in.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-8">
                    {tiers.map((tier) => (
                        <div
                            key={tier.name}
                            className={`rounded-[14px] border p-7 flex flex-col relative ${
                                tier.featured
                                    ? 'bg-[#0A0A0A] border-[#0A0A0A] text-white'
                                    : 'bg-white border-[#e5e5e5] text-[#0A0A0A]'
                            }`}
                        >
                            {tier.featured && (
                                <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[#F97316] text-white text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full">
                                    Recommended
                                </span>
                            )}

                            <div className="mb-5">
                                <p className={`text-[11px] font-bold uppercase tracking-widest mb-2 ${tier.featured ? 'text-[#F97316]' : 'text-[#9ca3af]'}`}>
                                    {tier.name}
                                </p>
                                <p className={`text-[12px] font-medium mb-3 ${tier.featured ? 'text-[#9ca3af]' : 'text-[#6b7280]'}`}>
                                    {tier.range}
                                </p>
                                <div className="flex items-baseline gap-1 mb-1">
                                    <span className="text-4xl font-extrabold">{tier.monthly}</span>
                                    <span className={`text-[14px] ${tier.featured ? 'text-[#9ca3af]' : 'text-[#6b7280]'}`}>/mo</span>
                                </div>
                                <p className={`text-[13px] ${tier.featured ? 'text-[#6b7280]' : 'text-[#9ca3af]'}`}>
                                    + <strong className={tier.featured ? 'text-white' : 'text-[#0A0A0A]'}>{tier.setup}</strong> one-time Build setup
                                </p>
                            </div>

                            <p className={`text-[14px] leading-snug mb-3 ${tier.featured ? 'text-[#9ca3af]' : 'text-[#6b7280]'}`}>
                                {tier.bestFor}
                            </p>

                            <p className={`text-[13px] font-bold mb-4 ${tier.featured ? 'text-[#F97316]' : 'text-[#1a6b4a]'}`}>
                                {tier.leads}
                            </p>

                            <ul className="space-y-2.5 mb-7 flex-1">
                                {tier.features.map((f) => (
                                    <li key={f} className="flex items-start gap-2.5">
                                        <span className={`mt-0.5 shrink-0 text-[11px] ${tier.featured ? 'text-[#F97316]' : 'text-[#1a6b4a]'}`}>✓</span>
                                        <span className={`text-[14px] leading-snug ${tier.featured ? 'text-[#d1d5db]' : 'text-[#4B5563]'}`}>{f}</span>
                                    </li>
                                ))}
                            </ul>

                            <div className={`flex items-center justify-between mb-4 pt-4 border-t ${tier.featured ? 'border-[#1f1f1f]' : 'border-[#f3f4f6]'}`}>
                                <span className={`text-[11px] font-bold uppercase tracking-widest ${tier.featured ? 'text-[#9ca3af]' : 'text-[#9ca3af]'}`}>ROI @ $10K placement</span>
                                <span className={`text-[16px] font-extrabold ${tier.featured ? 'text-[#F97316]' : 'text-[#0A0A0A]'}`}>{tier.roi}</span>
                            </div>

                            <Link
                                href="/fit-call"
                                className={`w-full text-center py-3 rounded-[8px] text-[14px] font-semibold transition-colors ${
                                    tier.featured
                                        ? 'bg-[#F97316] text-white hover:bg-[#ea6c0f]'
                                        : 'bg-[#F5F5F5] text-[#0A0A0A] hover:bg-[#e5e5e5]'
                                }`}
                            >
                                Book a fit call
                            </Link>
                        </div>
                    ))}
                </div>

                {/* Tooling note */}
                <div className="bg-[#FAFAFA] rounded-[12px] border border-[#e5e5e5] px-6 py-5">
                    <p className="text-[14px] text-[#6b7280] leading-relaxed">
                        <strong className="text-[#0A0A0A]">Client-owned infrastructure (not included):</strong> ZoomInfo / Apollo / Sales Nav, Smartlead / Instantly, sending domains, ATS / CRM. You own the accounts, the data, and the sender reputation. If you ever leave, the entire pipeline keeps working without us.
                    </p>
                </div>

                <div className="mt-6 text-center">
                    <Link href="/pricing" className="text-[14px] text-[#6b7280] hover:text-[#0A0A0A] transition-colors underline underline-offset-2">
                        See full ROI math, what&apos;s included, and the 60-day guarantee →
                    </Link>
                </div>
            </div>
        </section>
    );
}
