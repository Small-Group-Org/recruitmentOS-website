'use client';

import { useState } from 'react';

interface Stage {
  number: string;
  name: string;
  category: string;
  description: string;
  metric: string;
  metricLabel: string;
  stack: string[];
}

const STAGES: Stage[] = [
  {
    number: '01',
    name: 'Real-Time Hiring Signals',
    category: 'Signal Ingestion',
    description: 'Active monitoring across 19+ job platforms, executive departures, funding rounds, and stealth headcount expansion.',
    metric: '12K+',
    metricLabel: 'Monthly Hiring Triggers',
    stack: ['Indeed', 'LinkedIn', 'Job Boards', 'SEC Filings'],
  },
  {
    number: '02',
    name: 'Waterfall Enrichment',
    category: 'Data Verification',
    description: 'Multi-provider verification cascade isolating verified hiring-manager emails, direct dials, and MX/catch-all validity.',
    metric: '98%+',
    metricLabel: 'Inbox Deliverability SLA',
    stack: ['Clay', 'Apollo', 'Hunter', 'Lusha', 'Kaspr'],
  },
  {
    number: '03',
    name: 'Secondary-Domain Air-Gap',
    category: 'Reputation Isolation',
    description: 'Dedicated sending domains with isolated SPF, DKIM, DMARC, and gradual warmup to protect your primary domain reputation.',
    metric: '100%',
    metricLabel: 'Primary Domain Air-Gap',
    stack: ['Instantly', 'Smartlead', 'Google Workspace'],
  },
  {
    number: '04',
    name: 'Guaranteed Client Meetings',
    category: 'Human Triage & SLA',
    description: 'Every reply triaged under 24h against our 7-component Qualified Meeting standard before briefing your recruiters.',
    metric: '15–25',
    metricLabel: 'Client Calls / Mo',
    stack: ['Sub-24h SLA', 'Human Qualification', 'Cal.com'],
  },
];

export default function HeroDashboard() {
  const [activeStage, setActiveStage] = useState<number>(0);

  return (
    <div className="relative w-full max-w-[640px] mx-auto lg:ml-auto">
      {/* Ambient glow */}
      <div className="absolute -inset-10 bg-gradient-to-r from-[#FF6A00]/15 via-orange-500/10 to-transparent blur-3xl opacity-60 rounded-full z-0 pointer-events-none" />

      {/* Main Architecture Schematic Card */}
      <div
        className="relative z-10 bg-white rounded-2xl md:rounded-3xl p-5 sm:p-7 border border-neutral-200 shadow-xl"
        style={{
          boxShadow: '0 20px 50px -12px rgba(0, 0, 0, 0.08), 0 0 0 1px rgba(0, 0, 0, 0.04)',
        }}
      >
        {/* Header */}
        <div className="flex flex-wrap items-center justify-between gap-3 pb-5 mb-5 border-b border-neutral-100">
          <div>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-brand" />
              <p
                className="text-[11px] font-bold uppercase tracking-widest text-brand"
                style={{ fontFamily: 'var(--font-mono)' }}
              >
                Outbound Engine Architecture
              </p>
            </div>
            <h3
              className="text-lg sm:text-xl font-bold text-neutral-900 mt-1 tracking-tight"
              style={{ fontFamily: 'var(--font-serif)' }}
            >
              The 4-Stage Agency BD Topology
            </h3>
          </div>
          <div className="inline-flex items-center gap-1.5 bg-[#E8F5EF] text-[#1A6B4A] px-3 py-1 rounded-full text-xs font-semibold">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
            </span>
            <span style={{ fontFamily: 'var(--font-mono)' }}>PRODUCTION READY</span>
          </div>
        </div>

        {/* 4 Stages Layout */}
        <div className="space-y-3">
          {STAGES.map((stage, idx) => {
            const isSelected = activeStage === idx;
            return (
              <button
                type="button"
                key={stage.number}
                aria-pressed={isSelected}
                onClick={() => setActiveStage(idx)}
                onMouseEnter={() => setActiveStage(idx)}
                className={`w-full cursor-pointer rounded-xl p-3.5 sm:p-4 border transition-all duration-200 text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2 ${
                  isSelected
                    ? 'bg-neutral-900 border-neutral-900 text-white shadow-md'
                    : 'bg-neutral-50/70 hover:bg-neutral-100/80 border-neutral-200/80 text-neutral-800'
                }`}
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <span
                      className={`text-xs font-bold px-2 py-0.5 rounded-md ${
                        isSelected
                          ? 'bg-brand text-white'
                          : 'bg-neutral-200 text-neutral-700'
                      }`}
                      style={{ fontFamily: 'var(--font-mono)' }}
                    >
                      {stage.number}
                    </span>
                    <div>
                      <span
                        role="heading"
                        aria-level={4}
                        className={`block text-sm sm:text-base font-bold ${
                          isSelected ? 'text-white' : 'text-neutral-900'
                        }`}
                      >
                        {stage.name}
                      </span>
                      <p
                        className={`text-[11px] uppercase tracking-wider font-semibold ${
                          isSelected ? 'text-brand' : 'text-neutral-500'
                        }`}
                        style={{ fontFamily: 'var(--font-mono)' }}
                      >
                        {stage.category}
                      </p>
                    </div>
                  </div>

                  <div className="text-right shrink-0">
                    <div
                      className={`text-base sm:text-lg font-extrabold ${
                        isSelected ? 'text-brand' : 'text-neutral-900'
                      }`}
                      style={{ fontFamily: 'var(--font-mono)' }}
                    >
                      {stage.metric}
                    </div>
                    <div
                      className={`text-[10px] ${
                        isSelected ? 'text-neutral-400' : 'text-neutral-500'
                      }`}
                    >
                      {stage.metricLabel}
                    </div>
                  </div>
                </div>

                {isSelected && (
                  <div className="mt-3 pt-3 border-t border-neutral-800 text-xs text-neutral-300 space-y-2 animate-fadeIn">
                    <p className="leading-relaxed">{stage.description}</p>
                    <div className="flex flex-wrap items-center gap-1.5 pt-1">
                      <span className="text-[10px] uppercase font-mono text-neutral-400 mr-1">
                        Infrastructure:
                      </span>
                      {stage.stack.map((item) => (
                        <span
                          key={item}
                          className="bg-neutral-800 text-neutral-200 px-2 py-0.5 rounded text-[11px] font-mono border border-neutral-700"
                        >
                          {item}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </button>
            );
          })}
        </div>

        {/* Footer Benchmarks */}
        <div className="mt-5 pt-4 border-t border-neutral-100 grid grid-cols-3 gap-2 text-center">
          <div className="p-2 rounded-lg bg-neutral-50 border border-neutral-100">
            <div
              className="text-sm sm:text-base font-black text-brand"
              style={{ fontFamily: 'var(--font-mono)' }}
            >
              50+ Signed
            </div>
            <div className="text-[10px] text-neutral-500 font-medium">Contracts in 90 Days</div>
          </div>
          <div className="p-2 rounded-lg bg-neutral-50 border border-neutral-100">
            <div
              className="text-sm sm:text-base font-black text-neutral-900"
              style={{ fontFamily: 'var(--font-mono)' }}
            >
              8.5%–24%
            </div>
            <div className="text-[10px] text-neutral-500 font-medium">Verified Reply Rate</div>
          </div>
          <div className="p-2 rounded-lg bg-neutral-50 border border-neutral-100">
            <div
              className="text-sm sm:text-base font-black text-emerald-600"
              style={{ fontFamily: 'var(--font-mono)' }}
            >
              $0 Fee
            </div>
            <div className="text-[10px] text-neutral-500 font-medium">On Non-Buyers</div>
          </div>
        </div>
      </div>
    </div>
  );
}
