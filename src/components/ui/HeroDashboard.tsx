'use client';

import React, { useEffect, useRef, useState, useCallback } from 'react';

/* ─── Stage definitions ─────────────────────────────────────── */
const STAGES = [
  {
    title: 'Lead Sourced',
    finalValue: 20342,
    unit: 'leads',
    icon: (
      <svg className="w-4 h-4 text-[#FF6B00]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
      </svg>
    ),
  },
  {
    title: 'Hiring Manager Found',
    finalValue: 8731,
    unit: 'profiles',
    icon: (
      <svg className="w-4 h-4 text-[#FF6B00]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    ),
  },
  {
    title: 'Outreach Sent',
    finalValue: 6521,
    unit: 'emails',
    icon: (
      <svg className="w-4 h-4 text-[#FF6B00]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    ),
  },
  {
    title: 'Positive Reply',
    finalValue: 312,
    unit: 'replies',
    icon: (
      <svg className="w-4 h-4 text-[#FF6B00]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
      </svg>
    ),
  },
  {
    title: 'Meeting Booked',
    finalValue: 48,
    unit: 'meetings',
    isLast: true,
    icon: (
      <svg className="w-4 h-4 text-[#FF6B00]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
      </svg>
    ),
  },
];

/* ─── Timing constants ──────────────────────────────────────── */
// Each stage = 1800ms (pulse travel to card + number count up)
const STAGE_DURATION = 1800;
// How long to hold the completed state before resetting
const HOLD_DURATION  = 1200;
const TOTAL_ACTIVE   = STAGES.length * STAGE_DURATION; // time for all stages
const TOTAL_CYCLE    = TOTAL_ACTIVE + HOLD_DURATION;

/* ─── Helpers ───────────────────────────────────────────────── */
function formatNum(n: number): string {
  return Math.round(n).toLocaleString('en-US');
}

function easeOutExpo(t: number): number {
  return t === 1 ? 1 : 1 - Math.pow(2, -10 * t);
}

/* ─── Stage card component ──────────────────────────────────── */
interface StageCardProps {
  stage: typeof STAGES[0];
  isActive: boolean;
  isDone: boolean;
  displayValue: number;
}

function StageCard({ stage, isActive, isDone, displayValue }: StageCardProps) {
  const showCheck = isActive || isDone;

  return (
    <div
      className="relative z-10 flex items-center gap-4 p-3 rounded-2xl border"
      style={{
        background: isActive ? '#0A0A0A' : 'white',
        borderColor: isActive
          ? 'rgba(255,107,0,0.5)'
          : isDone
          ? 'rgba(255,107,0,0.15)'
          : '#f3f4f6',
        boxShadow: isActive
          ? '0 12px 32px -6px rgba(0,0,0,0.5), 0 0 0 1px rgba(255,107,0,0.2)'
          : stage.isLast && isDone
          ? '0 8px 32px -6px rgba(255,107,0,0.3)'
          : '0 1px 4px rgba(0,0,0,0.04)',
        transform: isActive ? 'translateY(-4px)' : 'translateY(0)',
        transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
      }}
    >
      {/* Icon */}
      <div
        className="w-12 h-12 shrink-0 rounded-xl flex items-center justify-center"
        style={{
          background: isActive ? 'rgba(255,107,0,0.15)' : 'rgb(255,247,237)',
          border: isActive ? '2px solid rgba(255,107,0,0.6)' : '2px solid transparent',
          boxShadow: isActive ? '0 0 16px rgba(255,107,0,0.3)' : 'none',
          transform: isActive ? 'scale(1.06)' : 'scale(1)',
          transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
        }}
      >
        {stage.icon}
      </div>

      {/* Text */}
      <div className="flex-1 min-w-0">
        <h4
          className="text-sm font-bold"
          style={{ color: isActive ? '#ffffff' : '#111827', transition: 'color 0.4s ease' }}
        >
          {stage.title}
        </h4>
        <p
          className="text-[11px] font-medium"
          style={{ color: isActive ? 'rgba(255,255,255,0.65)' : '#6b7280', transition: 'color 0.4s ease' }}
        >
          {formatNum(displayValue)} {stage.unit}
        </p>
      </div>

      {/* Check / dot */}
      {showCheck ? (
        <div
          className="w-6 h-6 rounded-full bg-green-500 flex items-center justify-center shrink-0"
          style={{
            transform: isActive ? 'scale(1.15)' : 'scale(1)',
            boxShadow: isActive ? '0 0 10px rgba(34,197,94,0.45)' : 'none',
            transition: 'all 0.3s ease',
          }}
        >
          <svg className="w-3.5 h-3.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
        </div>
      ) : (
        <div className="w-6 h-6 rounded-full bg-orange-100 flex items-center justify-center shrink-0">
          <div className="w-2 h-2 rounded-full bg-[#FF6B00]" />
        </div>
      )}
    </div>
  );
}

/* ─── Main component ────────────────────────────────────────── */
export default function HeroDashboard() {
  // cycleMs: 0 → TOTAL_CYCLE, then wraps
  const [cycleMs, setCycleMs] = useState(0);
  // displayValues[i] = what to show for stage i right now
  const [displayValues, setDisplayValues] = useState<number[]>(STAGES.map(() => 0));

  const startRef        = useRef<number | null>(null);
  const rafRef          = useRef<number | null>(null);
  const countRafsRef    = useRef<number[]>([]);
  const prevActiveRef   = useRef<number>(-1);   // which stage was active last frame
  const prevInHoldRef   = useRef<boolean>(false);

  /* ── animate a number count-up for a single stage ── */
  const animateCount = useCallback((stageIdx: number) => {
    // cancel any existing count for this stage
    if (countRafsRef.current[stageIdx]) {
      cancelAnimationFrame(countRafsRef.current[stageIdx]);
    }
    const target   = STAGES[stageIdx].finalValue;
    const duration = 1000; // ms
    const startTime = performance.now();

    const tick = (now: number) => {
      const t = Math.min((now - startTime) / duration, 1);
      const val = target * easeOutExpo(t);
      setDisplayValues(prev => {
        const next = [...prev];
        next[stageIdx] = val;
        return next;
      });
      if (t < 1) {
        countRafsRef.current[stageIdx] = requestAnimationFrame(tick);
      }
    };
    countRafsRef.current[stageIdx] = requestAnimationFrame(tick);
  }, []);

  /* ── reset all display values to 0 ── */
  const resetAll = useCallback(() => {
    countRafsRef.current.forEach(id => id && cancelAnimationFrame(id));
    countRafsRef.current = [];
    setDisplayValues(STAGES.map(() => 0));
  }, []);

  /* ── main RAF loop ── */
  const tick = useCallback((now: number) => {
    if (startRef.current === null) startRef.current = now;
    const elapsed = (now - startRef.current) % TOTAL_CYCLE;
    setCycleMs(elapsed);

    const inHold    = elapsed >= TOTAL_ACTIVE;
    const activeIdx = inHold
      ? STAGES.length - 1
      : Math.floor(elapsed / STAGE_DURATION);

    // Stage just changed → start number count for newly active stage
    if (!inHold && activeIdx !== prevActiveRef.current) {
      // If we're looping back to stage 0, reset everything first
      if (activeIdx === 0 && prevActiveRef.current !== -1) {
        resetAll();
      }
      animateCount(activeIdx);
      prevActiveRef.current = activeIdx;
    }

    // Entering hold → make sure last stage is at final value
    if (inHold && !prevInHoldRef.current) {
      setDisplayValues(STAGES.map(s => s.finalValue));
    }

    // Leaving hold (new cycle starts) → reset
    if (!inHold && prevInHoldRef.current) {
      resetAll();
      prevActiveRef.current = -1;
    }

    prevInHoldRef.current = inHold;
    rafRef.current = requestAnimationFrame(tick);
  }, [animateCount, resetAll]);

  useEffect(() => {
    rafRef.current = requestAnimationFrame(tick);
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      countRafsRef.current.forEach(id => id && cancelAnimationFrame(id));
    };
  }, [tick]);

  /* ─── Derived values for rendering ─── */
  const inHold    = cycleMs >= TOTAL_ACTIVE;
  const activeIdx = inHold
    ? STAGES.length - 1
    : Math.floor(cycleMs / STAGE_DURATION);

  // Orange line fill: grows from 0% (very start) → 100% (end of last stage)
  // We map elapsed time 0→TOTAL_ACTIVE to 0→100%
  const rawFill   = Math.min(cycleMs / TOTAL_ACTIVE, 1); // 0 → 1
  const lineFill  = inHold ? 100 : rawFill * 100; // percentage

  // Pulse dot position (same coordinate as lineFill)
  const pulsePct  = lineFill;

  return (
    <div className="relative w-full max-w-[640px] mx-auto lg:ml-auto">
      {/* Ambient glow */}
      <div className="absolute -inset-10 bg-gradient-to-r from-[#FF6B00]/20 to-transparent blur-3xl opacity-50 rounded-full z-0 pointer-events-none" />

      {/* Main Dashboard Card */}
      <div
        className="relative z-10 bg-white rounded-3xl p-6 md:p-8 border border-neutral-100 transition-all duration-700 hover:scale-[1.02] hover:-translate-y-2 hover:shadow-2xl"
        style={{ boxShadow: '0 20px 60px -15px rgba(255,107,0,0.05), 0 30px 100px -20px rgba(0,0,0,0.08)' }}
      >
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <h3 className="text-xl md:text-2xl font-bold text-neutral-900 tracking-tight">
            Your Pipeline. On Autopilot.
          </h3>
          <div className="flex items-center gap-2 bg-neutral-50 px-3 py-1.5 rounded-full border border-neutral-100">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500" />
            </span>
            <span className="text-[11px] font-semibold text-neutral-600 uppercase tracking-wider">Live Campaign</span>
          </div>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
          {/* Left: animated pipeline */}
          <div className="md:col-span-3 space-y-4 relative">

            {/* Grey base line (full height, always visible) */}
            <div
              className="absolute left-[23px] top-[24px] bottom-[24px] w-0.5 bg-neutral-100 z-0"
            />

            {/* Orange fill line — grows from top (0%) to bottom (100%) */}
            <div
              className="absolute left-[23px] top-[24px] w-0.5 z-[1] rounded-full"
              style={{
                height: `calc(${lineFill / 100} * (100% - 48px))`,
                background: 'linear-gradient(to bottom, #FF6B00 0%, #FF9A40 100%)',
                boxShadow: '0 0 8px 1px rgba(255,107,0,0.35)',
                transition: 'height 60ms linear',
              }}
            />

            {/* Glowing pulse dot — rides the tip of the orange fill */}
            <div
              className="absolute left-[19px] w-2.5 h-2.5 rounded-full z-[2]"
              style={{
                top: `calc(24px + ${pulsePct / 100} * (100% - 48px))`,
                background: '#FF6B00',
                boxShadow: '0 0 0 4px rgba(255,107,0,0.2), 0 0 16px 4px rgba(255,107,0,0.35)',
                transform: 'translateY(-50%)',
                transition: 'top 60ms linear',
              }}
            />

            {/* Stage cards */}
            {STAGES.map((stage, idx) => (
              <StageCard
                key={idx}
                stage={stage}
                isActive={!inHold && idx === activeIdx}
                isDone={inHold || idx < activeIdx}
                displayValue={displayValues[idx]}
              />
            ))}
          </div>

          {/* Right: charts */}
          <div className="md:col-span-2 space-y-4">
            {/* Positive Reply Rate */}
            <div className="bg-white p-4 rounded-2xl border border-neutral-100 shadow-sm h-[160px] flex flex-col justify-between">
              <div>
                <p className="text-[11px] font-bold text-neutral-500 uppercase tracking-wide">Positive Reply Rate</p>
                <div className="flex items-baseline gap-2 mt-1">
                  <span className="text-3xl font-black text-[#FF6B00]">6.2%</span>
                </div>
                <p className="text-[10px] text-green-600 font-semibold flex items-center mt-1">
                  <svg className="w-3 h-3 mr-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 10l7-7m0 0l7 7m-7-7v18" />
                  </svg>
                  24% vs last 30 days
                </p>
              </div>
              <div className="mt-2 relative h-12 w-full flex items-end">
                <svg className="w-full h-full overflow-visible" viewBox="0 0 100 40" preserveAspectRatio="none">
                  <path d="M0 35 L15 25 L30 30 L45 15 L60 20 L75 5 L90 10 L100 0" fill="none" stroke="rgba(255,107,0,0.2)" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M0 35 L15 25 L30 30 L45 15 L60 20 L75 5 L90 10 L100 0" fill="none" stroke="#FF6B00" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  <circle cx="100" cy="0" r="3" fill="#FF6B00" />
                </svg>
                <div className="absolute inset-0 bg-gradient-to-t from-white via-white/80 to-transparent bottom-0 h-1/2" />
              </div>
            </div>

            {/* Top Industries */}
            <div className="bg-white p-4 rounded-2xl border border-neutral-100 shadow-sm flex-1">
              <p className="text-[11px] font-bold text-neutral-500 uppercase tracking-wide mb-3">Top Industries</p>
              <div className="space-y-3">
                {[
                  { name: 'IT Services', pct: 32 },
                  { name: 'Healthcare', pct: 24 },
                  { name: 'Finance', pct: 18 },
                  { name: 'Manufacturing', pct: 12 },
                  { name: 'Others', pct: 14 },
                ].map((ind, i) => (
                  <div key={i} className="flex items-center text-xs">
                    <span className="w-20 font-semibold text-neutral-700 truncate">{ind.name}</span>
                    <div className="flex-1 h-1.5 bg-neutral-100 rounded-full mx-2 overflow-hidden">
                      <div className="h-full bg-[#FF6B00] rounded-full" style={{ width: `${ind.pct}%` }} />
                    </div>
                    <span className="w-7 text-right font-medium text-neutral-500">{ind.pct}%</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
}
