import Link from 'next/link';

const tiers = [
    {
        name: 'Pilot',
        price: '$1,500',
        setup: '$2,500 setup',
        minimum: '3-month minimum',
        bestFor: 'Agencies under $50K/month. Test the system before committing.',
        features: [
            '500–1,000 verified contacts/month',
            'Outreach setup on your stack',
            'Reply handling included',
            'Weekly reporting',
        ],
        featured: false,
    },
    {
        name: 'Operate',
        price: '$2,500',
        setup: '$5,000 setup',
        minimum: '6-month minimum',
        bestFor: 'The recommended tier for $50K–$400K/month agencies.',
        features: [
            '2,000–5,000 verified contacts/month',
            'Full BD pipeline — find, enrich, outreach, reply',
            'Reply handling + inbox management',
            'Bi-weekly strategy calls',
            'Dedicated account manager',
        ],
        featured: true,
    },
    {
        name: 'Scale',
        price: '$4,500',
        setup: '$10,000 setup',
        minimum: '12-month minimum',
        bestFor: '$400K+/month agencies. Multi-office or multi-vertical.',
        features: [
            '10,000+ verified contacts/month',
            'Multiple niches / geographies',
            'Custom reporting + CRM integration',
            'Weekly strategy calls',
            'Priority support',
        ],
        featured: false,
    },
];

export default function Pricing() {
    return (
        <section className="py-16 md:py-24 bg-white border-t border-[#e5e5e5]" id="pricing">
            <div className="max-w-[1000px] mx-auto px-4 sm:px-6">
                <div className="mb-12">
                    <p className="text-xs font-medium text-[#6b7280] uppercase tracking-widest mb-3">Pricing</p>
                    <h2 className="text-[#0A0A0A] text-3xl md:text-4xl font-extrabold tracking-tight">
                        Transparent. No &ldquo;contact for pricing.&rdquo;
                    </h2>
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
                                <div className="flex items-baseline gap-1 mb-1">
                                    <span className="text-4xl font-extrabold">{tier.price}</span>
                                    <span className={`text-[14px] ${tier.featured ? 'text-[#9ca3af]' : 'text-[#6b7280]'}`}>/mo</span>
                                </div>
                                <p className={`text-[13px] ${tier.featured ? 'text-[#6b7280]' : 'text-[#9ca3af]'}`}>
                                    {tier.setup} · {tier.minimum}
                                </p>
                            </div>

                            <p className={`text-[14px] leading-snug mb-5 ${tier.featured ? 'text-[#9ca3af]' : 'text-[#6b7280]'}`}>
                                {tier.bestFor}
                            </p>

                            <ul className="space-y-2.5 mb-7 flex-1">
                                {tier.features.map((f) => (
                                    <li key={f} className="flex items-start gap-2.5">
                                        <span className={`mt-0.5 shrink-0 text-[11px] ${tier.featured ? 'text-[#F97316]' : 'text-[#1a6b4a]'}`}>✓</span>
                                        <span className={`text-[14px] leading-snug ${tier.featured ? 'text-[#d1d5db]' : 'text-[#4B5563]'}`}>{f}</span>
                                    </li>
                                ))}
                            </ul>

                            <Link
                                href="https://cal.com/tusharm/30min?user=tusharm"
                                target="_blank"
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
                        <strong className="text-[#0A0A0A]">Tooling costs:</strong> $700–1,200/month paid directly on your accounts. No markup. You own the accounts, the data, and the sender reputation.
                    </p>
                </div>

                <div className="mt-6 text-center">
                    <Link href="/pricing" className="text-[14px] text-[#6b7280] hover:text-[#0A0A0A] transition-colors underline underline-offset-2">
                        See cost-per-placement breakdown & guarantee →
                    </Link>
                </div>
            </div>
        </section>
    );
}
