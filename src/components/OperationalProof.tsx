'use client';

import Image from 'next/image';
import { useState } from 'react';
import { proofCalendarViews, proofFunnel } from '@/lib/proof-funnel';

export default function OperationalProof() {
  const [activeView, setActiveView] = useState<(typeof proofCalendarViews)[number]['id']>(proofCalendarViews[0].id);
  const activeCalendar = proofCalendarViews.find((view) => view.id === activeView) ?? proofCalendarViews[0];

  return (
    <section className="border-y border-[#E5E5E5] bg-white py-16 md:py-24" id="operational-proof">
      <div className="mx-auto max-w-[1280px] px-4 sm:px-6">
        <div className="mb-10 max-w-3xl">
          <p className="mb-3 text-xs font-bold uppercase tracking-widest text-brand" style={{ fontFamily: 'var(--font-mono)' }}>Verified production evidence</p>
          <h2 className="mb-4 text-3xl text-[#0A0A0A] sm:text-4xl" style={{ fontFamily: 'var(--font-serif)' }}>The calendar and funnel tell the same story.</h2>
          <p className="section-sub">Real August and September 2026 booking views, paired with a weekly sourcing-to-reply conversion snapshot.</p>
        </div>

        <div className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr]">
          <div className="rounded-[10px] border border-[#E5E5E5] bg-[#FAFAFA] p-4 sm:p-6">
            <div className="mb-5 flex flex-wrap gap-2" role="tablist" aria-label="Calendar proof views">
              {proofCalendarViews.map((view) => (
                <button key={view.id} type="button" role="tab" aria-selected={activeView === view.id} onClick={() => setActiveView(view.id)} className={`rounded-[4px] border px-3 py-2 text-xs font-semibold transition-colors ${activeView === view.id ? 'border-brand bg-brand text-white' : 'border-[#E5E5E5] bg-white text-[#6B7280] hover:border-[#0A0A0A]'}`}>
                  {view.label}
                </button>
              ))}
            </div>
            <div className="relative aspect-[16/10] overflow-hidden rounded-[4px] border border-[#E5E5E5] bg-white">
              <Image src={activeCalendar.image} alt={`${activeCalendar.label} discovery call calendar proof`} fill className="object-contain" sizes="(max-width: 1024px) 100vw, 60vw" />
            </div>
            <p className="mt-4 text-sm text-[#6B7280]">Real client calendars: 15–25 qualified hiring-manager discovery calls booked every week across US and European markets.</p>
          </div>

          <div className="rounded-[10px] bg-[#0A0A0A] p-5 text-white sm:p-7">
            <p className="mb-2 text-xs font-bold uppercase tracking-widest text-brand" style={{ fontFamily: 'var(--font-mono)' }}>Weekly funnel</p>
            <h3 className="mb-6 text-2xl" style={{ fontFamily: 'var(--font-serif)' }}>128 leads to a 56% emailed reply rate.</h3>
            <div className="space-y-3">
              {proofFunnel.map((step, index) => (
                <div key={step.label} className="border-b border-white/15 pb-3 last:border-0">
                  <div className="flex items-baseline justify-between gap-3"><span className="text-3xl font-semibold text-brand">{step.value}</span><span className="text-right text-sm font-semibold">{step.label}</span></div>
                  <p className="mt-1 text-xs text-[#9CA3AF]">{step.detail}</p>
                  {index < proofFunnel.length - 1 && <div className="mt-3 h-1 rounded-full bg-brand" style={{ width: `${Math.max(42, 100 - index * 18)}%` }} />}
                </div>
              ))}
            </div>
            <div className="mt-7 border-t border-white/15 pt-5"><p className="text-sm font-semibold">Zero-risk invariant</p><p className="mt-1 text-sm text-[#9CA3AF]">You pay for confirmed discovery briefings and positive buying intent. OOO, negative replies, bounces, and non-buyers are $0.</p></div>
          </div>
        </div>
      </div>
    </section>
  );
}
