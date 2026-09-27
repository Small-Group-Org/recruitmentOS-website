'use client';

import { useEffect, useRef, useState } from 'react';

/* ─── Stage definitions ─────────────────────────────────────── */
const STAGES = [
  {
    title: 'Hiring Signals Detected',
    finalValue: 12010,
    unit: 'leads',
    icon: (
      <svg className="w-4 h-4 text-[#FF6A00]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
      </svg>
    ),
  },
  {
    title: 'Waterfall Enriched',
    finalValue: 9840,
    unit: 'profiles',
    icon: (
      <svg className="w-4 h-4 text-[#FF6A00]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    ),
  },
  {
    title: 'Air-Gapped Outreach Sent',
    finalValue: 6520,
    unit: 'emails',
    icon: (
      <svg className="w-4 h-4 text-[#FF6A00]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    ),
  },
  {
    title: 'Positive Reply (<24h SLA)',
    finalValue: 638,
    unit: 'replies',
    icon: (
      <svg className="w-4 h-4 text-[#FF6A00]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
      </svg>
    ),
  },
  {
    title: 'Discovery Meetings & Signed Terms',
    finalValue: 228,
    unit: 'signed agreements',
    isLast: true,
    icon: (
      <svg className="w-4 h-4 text-[#FF6A00]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
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
  valueRef: (element: HTMLSpanElement | null) => void;
}

function StageCard({ stage, isActive, isDone, valueRef }: StageCardProps) {
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
          <span ref={valueRef}>0</span> {stage.unit}
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
          <div className="w-2 h-2 rounded-full bg-[#FF6A00]" />
        </div>
      )}
    </div>
  );
}

/* ─── Main component ────────────────────────────────────────── */
export default function HeroDashboard() {
  const [visualState, setVisualState] = useState({ activeIdx: 0, inHold: false });
  const rootRef = useRef<HTMLDivElement | null>(null);
  const lineFillRef = useRef<HTMLDivElement | null>(null);
  const pulseDotRef = useRef<HTMLDivElement | null>(null);
  const valueRefs = useRef<Array<HTMLSpanElement | null>>([]);
  const rafRef = useRef<number | null>(null);
  const elapsedRef = useRef(0);
  const visualStateRef = useRef(visualState);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    let reducedMotion = motionQuery.matches;
    let isIntersecting = false;
    let isDocumentVisible = document.visibilityState === 'visible';
    let startTimestamp = 0;

    const setVisualStateIfChanged = (activeIdx: number, inHold: boolean) => {
      const previous = visualStateRef.current;
      if (previous.activeIdx === activeIdx && previous.inHold === inHold) return;
      const next = { activeIdx, inHold };
      visualStateRef.current = next;
      setVisualState(next);
    };

    const updateLine = (percentage: number) => {
      if (lineFillRef.current) {
        lineFillRef.current.style.height = `calc(${percentage / 100} * (100% - 48px))`;
      }
      if (pulseDotRef.current) {
        pulseDotRef.current.style.top = `calc(24px + ${percentage / 100} * (100% - 48px))`;
      }
    };

    const updateValues = (elapsed: number, activeIdx: number, inHold: boolean) => {
      STAGES.forEach((stage, index) => {
        const element = valueRefs.current[index];
        if (!element) return;

        let value = 0;
        if (inHold || index < activeIdx) {
          value = stage.finalValue;
        } else if (index === activeIdx) {
          const stageElapsed = elapsed - index * STAGE_DURATION;
          const progress = Math.min(Math.max(stageElapsed / 1000, 0), 1);
          value = stage.finalValue * easeOutExpo(progress);
        }
        element.textContent = formatNum(value);
      });
    };

    const renderFinalState = () => {
      elapsedRef.current = TOTAL_ACTIVE;
      updateLine(100);
      STAGES.forEach((stage, index) => {
        const element = valueRefs.current[index];
        if (element) element.textContent = formatNum(stage.finalValue);
      });
      setVisualStateIfChanged(STAGES.length - 1, true);
    };

    const stopAnimation = () => {
      if (rafRef.current !== null) {
        cancelAnimationFrame(rafRef.current);
        rafRef.current = null;
      }
    };

    const tick = (now: number) => {
      const elapsed = (now - startTimestamp) % TOTAL_CYCLE;
      elapsedRef.current = elapsed;
      const inHold = elapsed >= TOTAL_ACTIVE;
      const activeIdx = inHold ? STAGES.length - 1 : Math.floor(elapsed / STAGE_DURATION);
      const lineFill = inHold ? 100 : Math.min(elapsed / TOTAL_ACTIVE, 1) * 100;

      updateLine(lineFill);
      updateValues(elapsed, activeIdx, inHold);
      setVisualStateIfChanged(activeIdx, inHold);
      rafRef.current = requestAnimationFrame(tick);
    };

    const startAnimation = () => {
      if (reducedMotion || !isIntersecting || !isDocumentVisible || rafRef.current !== null) return;
      startTimestamp = performance.now() - elapsedRef.current;
      rafRef.current = requestAnimationFrame(tick);
    };

    const observer = new IntersectionObserver(([entry]) => {
      isIntersecting = entry.isIntersecting;
      if (isIntersecting) startAnimation();
      else stopAnimation();
    }, { threshold: 0.1 });

    const handleVisibilityChange = () => {
      isDocumentVisible = document.visibilityState === 'visible';
      if (isDocumentVisible) startAnimation();
      else stopAnimation();
    };

    const handleMotionChange = (event: MediaQueryListEvent) => {
      reducedMotion = event.matches;
      stopAnimation();
      if (reducedMotion) {
        renderFinalState();
        return;
      }

      elapsedRef.current = 0;
      updateLine(0);
      valueRefs.current.forEach((element) => {
        if (element) element.textContent = '0';
      });
      setVisualStateIfChanged(0, false);
      startAnimation();
    };

    observer.observe(root);
    document.addEventListener('visibilitychange', handleVisibilityChange);
    motionQuery.addEventListener('change', handleMotionChange);

    if (reducedMotion) renderFinalState();

    return () => {
      stopAnimation();
      observer.disconnect();
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      motionQuery.removeEventListener('change', handleMotionChange);
    };
  }, []);

  const { activeIdx, inHold } = visualState;

  return (
    <div ref={rootRef} className="relative w-full max-w-[640px] mx-auto lg:ml-auto">
      {/* Ambient glow */}
      <div className="absolute -inset-10 bg-gradient-to-r from-[#FF6A00]/20 to-transparent blur-3xl opacity-50 rounded-full z-0 pointer-events-none" />

      {/* Main Dashboard Card */}
      <div
        className="relative z-10 bg-white rounded-3xl p-6 md:p-8 border border-neutral-100 transition-all duration-700 hover:scale-[1.02] hover:-translate-y-2 hover:shadow-2xl"
        style={{ boxShadow: '0 20px 60px -15px rgba(255,107,0,0.05), 0 30px 100px -20px rgba(0,0,0,0.08)' }}
      >
        {/* Header */}
        <div className="flex justify-between items-start gap-4 mb-8">
          <div>
            <p className="text-[10px] font-mono font-semibold uppercase tracking-[0.18em] text-brand mb-1">Live Acquisition Funnel</p>
            <h3 className="text-xl md:text-2xl text-neutral-900 tracking-tight font-serif">Your Outbound BD Engine.</h3>
          </div>
          <div className="flex items-center gap-2 bg-neutral-50 px-3 py-1.5 rounded-full border border-neutral-100">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500" />
            </span>
            <span className="text-[11px] font-mono font-semibold text-neutral-600 uppercase tracking-wider">Live Engine Active</span>
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
              ref={lineFillRef}
              className="absolute left-[23px] top-[24px] w-0.5 z-[1] rounded-full"
              style={{
                height: 0,
                background: 'linear-gradient(to bottom, #FF6A00 0%, #FF9A40 100%)',
                boxShadow: '0 0 8px 1px rgba(255,107,0,0.35)',
              }}
            />

            {/* Glowing pulse dot — rides the tip of the orange fill */}
            <div
              ref={pulseDotRef}
              className="absolute left-[19px] w-2.5 h-2.5 rounded-full z-[2]"
              style={{
                top: '24px',
                background: '#FF6A00',
                boxShadow: '0 0 0 4px rgba(255,107,0,0.2), 0 0 16px 4px rgba(255,107,0,0.35)',
                transform: 'translateY(-50%)',
              }}
            />

            {/* Stage cards */}
            {STAGES.map((stage, idx) => (
              <StageCard
                key={idx}
                stage={stage}
                isActive={!inHold && idx === activeIdx}
                isDone={inHold || idx < activeIdx}
                valueRef={(element) => {
                  valueRefs.current[idx] = element;
                }}
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
                  <span className="text-2xl font-black text-[#FF6A00]">5.0%–56%</span>
                </div>
                <p className="text-[10px] text-green-600 font-semibold flex items-center mt-1">
                  <svg className="w-3 h-3 mr-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 10l7-7m0 0l7 7m-7-7v18" />
                  </svg>
                  Verified reply-rate range
                </p>
              </div>
              <div className="mt-2 relative h-12 w-full flex items-end">
                <svg className="w-full h-full overflow-visible" viewBox="0 0 100 40" preserveAspectRatio="none">
                  <path d="M0 35 L15 25 L30 30 L45 15 L60 20 L75 5 L90 10 L100 0" fill="none" stroke="rgba(255,107,0,0.2)" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M0 35 L15 25 L30 30 L45 15 L60 20 L75 5 L90 10 L100 0" fill="none" stroke="#FF6A00" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  <circle cx="100" cy="0" r="3" fill="#FF6A00" />
                </svg>
                <div className="absolute inset-0 bg-gradient-to-t from-white via-white/80 to-transparent bottom-0 h-1/2" />
              </div>
            </div>

            {/* Top Industries */}
            <div className="bg-white p-4 rounded-2xl border border-neutral-100 shadow-sm flex-1">
              <p className="text-[11px] font-bold text-neutral-500 uppercase tracking-wide mb-3">Top Industries</p>
              <div className="space-y-3">
                {[
                  { name: 'Legal & Professional', pct: 38 },
                  { name: 'Tech & Engineering', pct: 28 },
                  { name: 'Data & AI', pct: 18 },
                  { name: 'Healthcare', pct: 16 },
                ].map((ind, i) => (
                  <div key={i} className="flex items-center text-xs">
                    <span className="w-28 font-semibold text-neutral-700 truncate">{ind.name}</span>
                    <div className="flex-1 h-1.5 bg-neutral-100 rounded-full mx-2 overflow-hidden">
                      <div className="h-full bg-[#FF6A00] rounded-full" style={{ width: `${ind.pct}%` }} />
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
