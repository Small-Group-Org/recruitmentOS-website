'use client';

import Link from 'next/link';
import { pricingOfferings, type PricingOffering } from '@/lib/pricing-data';
import { trackCTAClick } from '@/lib/analytics';

export default function Pricing() {
    return (
        <section className="bg-white pt-12 pb-24" id="pricing">
            <div className="max-w-[1280px] mx-auto px-6 sm:px-10">

                {/* ── Header ── */}
                <div className="mb-10 sm:mb-12 max-w-3xl">
                    <p className="text-xs font-bold text-[#FF6A00] uppercase tracking-widest mb-3"
                        style={{ fontFamily: 'var(--font-mono)' }}>
                        Client acquisition pricing
                    </p>
                    <h1 className="text-[#0A0A0A] text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight leading-[1.05] mb-4"
                        style={{ fontFamily: 'var(--font-serif)' }}>
                        Pay for verified outcomes, not promises.
                    </h1>
                    <p className="text-base sm:text-lg text-[#6B7280] leading-relaxed" style={{ fontFamily: 'var(--font-outfit)' }}>
                        Start with zero-retainer-risk performance acquisition, or choose predictable managed capacity when your team wants a fixed monthly volume.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto items-stretch">
                    {pricingOfferings.map((offering) => <OfferingCard key={offering.id} offering={offering} />)}
                </div>

                <div className="mt-8 max-w-5xl mx-auto rounded-[10px] border border-[#E5E5E5] bg-[#FAFAFA] p-5">
                    <p className="mb-4 text-xs font-bold uppercase tracking-widest text-[#6B7280]" style={{ fontFamily: 'var(--font-mono)' }}>Commercial safeguards / Zero-Risk Invariant</p>
                    <div className="grid gap-4 sm:grid-cols-3">
                    <Safeguard label="$0 on non-buyers" />
                    <Safeguard label="5-day dispute SLA" />
                    <Safeguard label="100% brand air-gap" />
                    </div>
                </div>

                {/* ── Custom scope CTA ── */}
                <div className="mt-20 sm:mt-28 border-t border-[#E5E5E5] pt-14 sm:pt-20 text-center max-w-2xl mx-auto">
                    <h3 className="text-xl sm:text-2xl font-bold text-[#0A0A0A] mb-3 leading-tight"
                        style={{ fontFamily: 'var(--font-serif)' }}>
                        Need something custom?
                    </h3>
                    <p className="section-sub mb-8 text-[#6B7280]" style={{ fontFamily: 'var(--font-outfit)' }}>
                        20K+ leads per month, multiple seats, custom signal sources, CRM integration,
                        or white-label, let&apos;s build a plan around your agency&apos;s specific BD needs.
                    </p>
                    <Link
                        href="/fit-call"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center justify-center bg-[#0A0A0A] text-white px-7 py-4 rounded-full font-semibold hover:bg-[#0A0A0A] transition-colors text-base group"
                        style={{ fontFamily: 'var(--font-outfit)' }}
                        id="pricing-enterprise-cta"
                    >
                        Talk to sales team
                        <svg className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14M12 5l7 7-7 7" />
                        </svg>
                    </Link>
                </div>

            </div>
        </section>
    );
}

function OfferingCard({ offering }: { offering: PricingOffering }) {
    return <div className={`relative flex flex-col rounded-[10px] bg-white p-7 ${offering.highlight ? 'border-2 border-brand shadow-[0_12px_44px_-10px_rgba(255,106,0,0.3)] ring-1 ring-brand/20' : 'border border-[#E5E5E5] shadow-sm'}`}>
        {offering.discountBadge && <div className="absolute -top-3.5 left-6 z-10 flex items-center shadow-md sm:left-7"><span className="rounded-[4px] bg-[#FF6A00] px-3.5 py-1 text-[11px] font-bold uppercase tracking-wider text-white ring-2 ring-white" style={{ fontFamily: 'var(--font-mono)' }}>{offering.discountBadge}</span></div>}
        <p className="mb-4 text-xs font-bold uppercase tracking-widest text-brand" style={{ fontFamily: 'var(--font-mono)' }}>{offering.category}</p>
        <h2 className="text-2xl text-[#0A0A0A]" style={{ fontFamily: 'var(--font-serif)' }}>{offering.name}</h2>
        <p className="mt-2 min-h-[48px] text-sm leading-relaxed text-[#6B7280]">{offering.tagline}</p>
        <div className="mt-6 flex items-baseline gap-2"><span className="text-5xl text-[#0A0A0A]" style={{ fontFamily: 'var(--font-serif)' }}>${offering.price.toLocaleString()}</span><span className="text-sm text-[#6B7280]">{offering.priceLabel}</span></div>
        <p className="mt-2 text-sm font-bold text-brand" style={{ fontFamily: 'var(--font-mono)' }}>+{offering.setupFeeLabel}</p>
        <p className="mt-3 text-xs text-[#6B7280]">{offering.commitment}</p>
        {offering.savingsCallout ? <div className="mt-5 rounded-[8px] border border-[#1A6B4A]/25 bg-[#E8F5EF] p-4 text-[#1A6B4A]">
            <div className="flex items-center justify-between gap-2">
                <span className="inline-flex items-center rounded-[3px] bg-[#1A6B4A] px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-white sm:text-[11px]" style={{ fontFamily: 'var(--font-mono)' }}>{offering.savingsCallout.discountTag}</span>
                <span className="text-xs font-bold text-[#1A6B4A]" style={{ fontFamily: 'var(--font-mono)' }}>{offering.savingsCallout.headline}</span>
            </div>
            <div className="mt-3 flex flex-wrap items-baseline gap-2 border-t border-[#1A6B4A]/15 pt-2.5">
                <div className="flex items-baseline gap-1"><span className="text-2xl font-bold text-[#1A6B4A]" style={{ fontFamily: 'var(--font-mono)' }}>${offering.savingsCallout.effectiveRate}</span><span className="text-xs font-semibold text-[#1A6B4A]">{offering.savingsCallout.effectiveRateLabel}</span></div>
                <span className="text-xs font-medium text-[#6B7280]">vs.</span>
                <div className="flex items-baseline gap-1"><span className="text-base font-bold text-[#9CA3AF] line-through" style={{ fontFamily: 'var(--font-mono)' }}>${offering.savingsCallout.standardRate}</span><span className="text-xs text-[#6B7280]">{offering.savingsCallout.standardRateLabel}</span></div>
            </div>
            <p className="mt-2 text-[11px] leading-relaxed text-[#2D5A43]">{offering.savingsCallout.description}</p>
        </div> : offering.discountDetail ? <div className="mt-4 rounded-[4px] bg-[#E8F5EF] px-3 py-2 text-xs font-bold text-[#1A6B4A]">Guaranteed savings<span className="mt-1 block font-normal">{offering.discountDetail}</span></div> : null}
        <div className="mt-3 space-y-1 text-xs text-[#6B7280]">{offering.details.map((detail) => <p key={detail}>{detail}</p>)}</div>
        <hr className="my-6 border-t border-[#E5E5E5]" />
        <ul className="mb-8 flex-1 space-y-3 text-sm text-[#374151]">{offering.features.map((feature) => {
            const isDiscount = feature.includes('37.5%');
            return <li key={feature} className={`flex items-start gap-2 ${isDiscount ? 'font-semibold text-[#0A0A0A]' : ''}`}><span className={isDiscount ? 'font-bold text-[#1A6B4A]' : 'text-brand'}>✓</span><span>{feature}{isDiscount && <span className="ml-1.5 inline-block rounded bg-[#E8F5EF] px-1.5 py-0.5 text-[10px] font-bold text-[#1A6B4A]">Save $2,700</span>}</span></li>;
        })}</ul>
        <a href={offering.cta.href} target="_blank" rel="noopener noreferrer" onClick={() => trackCTAClick(offering.cta.label, offering.name)} className={`block rounded-[4px] py-3.5 text-center text-sm font-bold ${offering.highlight ? 'bg-brand text-white hover:bg-brand-hover' : 'border border-[#0A0A0A] text-[#0A0A0A] hover:bg-[#0A0A0A] hover:text-white'}`}>{offering.cta.label} <span className="ml-2">→</span></a>
    </div>;
}

function Safeguard({ label }: { label: string }) {
    return <p className="text-sm font-semibold text-[#374151]"><span className="mr-2 text-brand">✓</span>{label}</p>;
}
