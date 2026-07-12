'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { leadService } from '@/services/lead.service';


const CHALLENGES = [
  { id: 'finding_clients',    label: 'Finding clients' },
  { id: 'finding_candidates', label: 'Finding candidates' },
  { id: 'resume_screening',   label: 'Resume screening' },
  { id: 'cold_outreach',      label: 'Cold outreach' },
  { id: 'follow_up',          label: 'Lead follow-up' },
  { id: 'admin',              label: 'Admin & data entry' },
  { id: 'conversion',         label: 'Converting leads to clients' },
  { id: 'other',              label: 'Something else' },
];

declare global {
  interface Window {
    Cal?: (...args: unknown[]) => void;
    fbq?: (...args: unknown[]) => void;
  }
}

export default function AuditClient() {
  const [step, setStep] = useState<1 | 2>(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Form state
  const [name, setName]             = useState('');
  const [email, setEmail]           = useState('');
  const [phone, setPhone]           = useState('');
  const [website, setWebsite]       = useState('');
  const [teamSize, setTeamSize]     = useState('');
  const [placements, setPlacements] = useState('');
  const [revenue, setRevenue]       = useState('');
  const [tools, setToolsVal]        = useState('');
  const [challenges, setChallenges] = useState<string[]>([]);
  const [followUp, setFollowUp]     = useState('');
  const [goal, setGoal]             = useState('');
  const [triedBefore, setTriedBefore] = useState('');
  const [decisionMaker, setDecisionMaker] = useState('');
  const [readiness, setReadiness]   = useState('');
  const [extraFocus, setExtraFocus] = useState('');

  // Inline Cal.com embed once on step 2
  useEffect(() => {
    if (step !== 2) return;

    // Load Cal embed script if not already present
    if (!window.Cal) {
      const s = document.createElement('script');
      s.src = 'https://app.cal.com/embed/embed.js';
      s.async = true;
      s.onload = () => initCal();
      document.head.appendChild(s);
    } else {
      initCal();
    }

    function initCal() {
      if (!window.Cal) return;
      window.Cal('init', { origin: 'https://cal.com' });
      window.Cal('inline', {
        elementOrSelector: '#cal-embed',
        calLink: 'tusharm/recruitment-os-audit',
        config: { name, email },
      });
      window.Cal('ui', {
        theme: 'light',
        styles: { branding: { brandColor: '#0A0A0A' } },
        hideEventTypeDetails: false,
      });
    }
  }, [step, name, email]);

  function toggleChallenge(id: string) {
    setChallenges(prev =>
      prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]
    );
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!teamSize) { alert('Please select your team size.'); return; }
    if (!challenges.length) { alert('Please select at least one challenge.'); return; }
    if (!decisionMaker) { alert('Please select your decision-maker status.'); return; }
    if (!readiness) { alert('Please select your readiness level.'); return; }

    setLoading(true);
    setError('');

    const challengeLabels = challenges.map(
      id => CHALLENGES.find(c => c.id === id)?.label ?? id
    );

    // Compose the detailed message for the backend `message` field
    const messageLines = [
      `Team size: ${teamSize}`,
      `Monthly placements: ${placements}`,
      `Avg revenue/placement: ${revenue}`,
      `Tools used: ${tools}`,
      `Challenges: ${challengeLabels.join(', ')}`,
      `Follow-up process: ${followUp}`,
      `Main goal (90 days): ${goal}`,
      triedBefore ? `Tried before: ${triedBefore}` : null,
      `Decision maker: ${decisionMaker}`,
      `Readiness: ${readiness}`,
      extraFocus ? `Extra focus: ${extraFocus}` : null,
    ].filter(Boolean).join('\n');

    try {
      // 1. Save to RecruitmentOS backend DB
      await leadService.createLead({
        name,
        email,
        phone,
        company: website || undefined,
        source: 'resource_ai_audit',
        headaches: challengeLabels,
        message: messageLines,
      });


      // 3. FB pixel
      window.fbq?.('track', 'Lead', { content_name: 'AI Audit', email });

      setStep(2);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch {
      setError('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  }

  // ─── STEP 2 — success + calendar ───────────────────────────────────────────
  if (step === 2) {
    return (
      <main className="min-h-screen bg-[#F9FAFB]">
        {/* Minimal header */}
        <header className="border-b border-[#E5E5E5] bg-white px-6 py-4 flex items-center justify-between">
          <Link href="/" className="font-bold text-[#0A0A0A] text-lg tracking-tight">
            Recruitment<span className="text-[#1a6b4a]">OS</span>
          </Link>
          <span className="text-xs font-mono uppercase tracking-widest text-[#9CA3AF]">Free AI Audit</span>
        </header>

        <div className="max-w-3xl mx-auto px-4 py-10 sm:py-14">
          {/* Success header */}
          <div className="text-center mb-10">
            <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-[#f0fdf4] border border-[#bbf7d0] mb-5">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#10b981" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="20 6 9 17 4 12" />
              </svg>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold text-[#0A0A0A] mb-2 tracking-tight">Details received — secure your slot</h1>
            <p className="text-[#6B7280] text-sm sm:text-base max-w-md mx-auto">
              Pick a time below to lock in your free 30-min recruitment AI audit.
            </p>
          </div>

          {/* Cal.com embed */}
          <div
            id="cal-embed"
            className="bg-white border border-[#E5E5E5] rounded-2xl overflow-hidden"
            style={{ minHeight: 700 }}
          >
            <div className="flex flex-col items-center justify-center py-12 text-[#9CA3AF]">
              <svg width="44" height="44" viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" className="mb-4 opacity-40">
                <rect x="6" y="10" width="36" height="32" rx="4"/>
                <path d="M6 18h36M16 6v8M32 6v8"/>
              </svg>
              <p className="text-sm">Loading calendar…</p>
            </div>
          </div>
        </div>
      </main>
    );
  }

  // ─── STEP 1 — audit form ────────────────────────────────────────────────────
  const inputCls = "w-full border border-[#E5E5E5] rounded-xl px-4 py-2.5 text-sm outline-none focus:border-[#0A0A0A] focus:ring-2 focus:ring-black/5 transition-all text-[#0A0A0A] bg-white placeholder:text-[#9CA3AF]";
  const selectCls = inputCls + " appearance-none cursor-pointer";
  const sectionLabel = "text-[10px] font-bold tracking-widest uppercase text-[#9CA3AF] mb-4 mt-8 first:mt-0 pb-2 border-b border-[#E5E5E5] block";

  return (
    <main className="min-h-screen bg-[#F9FAFB]">
      {/* Minimal header */}
      <header className="border-b border-[#E5E5E5] bg-white px-6 py-4 flex items-center justify-between sticky top-0 z-10">
        <Link href="/" className="font-bold text-[#0A0A0A] text-lg tracking-tight">
          Recruitment<span className="text-[#1a6b4a]">OS</span>
        </Link>
        <span className="text-xs font-mono uppercase tracking-widest text-[#9CA3AF]">Free AI Audit</span>
      </header>

      <div className="max-w-2xl mx-auto px-4 py-10 sm:py-14">

        {/* Hero */}
        <div className="mb-8">
          <div className="inline-flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest px-3 py-1.5 rounded-full bg-amber-50 border border-amber-200 text-amber-700 mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
            Only 7 Slots Monthly
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-[#0A0A0A] mb-3 leading-tight tracking-tight">
            Find Out Where Your Hiring Pipeline Is Leaking
          </h1>
          <p className="text-[#6B7280] text-sm sm:text-base leading-relaxed mb-6">
            Book a free 30-minute audit — we'll show you exactly where your agency is losing time and revenue, and build a custom AI workflow to fix it.
          </p>
          <ul className="space-y-2 mb-2">
            {[
              'We review your pipeline, tools, and follow-up process',
              'We identify your biggest time and money leaks with real numbers',
              'You leave with a custom AI workflow map — whether we work together or not',
            ].map(t => (
              <li key={t} className="flex items-start gap-2.5 text-sm text-[#4B5563]">
                <span className="mt-0.5 flex-shrink-0 w-4 h-4 rounded-full bg-[#f0fdf4] border border-[#bbf7d0] flex items-center justify-center">
                  <svg width="8" height="8" viewBox="0 0 10 8" fill="none"><path d="M1 4l3 3 5-6" stroke="#10b981" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                </span>
                {t}
              </li>
            ))}
          </ul>
        </div>

        {/* Form card */}
        <div className="bg-white border border-[#E5E5E5] rounded-2xl p-6 sm:p-8 shadow-sm">
          <form onSubmit={handleSubmit} noValidate>

            {/* ── About you ── */}
            <span className={sectionLabel}>About you</span>
            <div className="grid sm:grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-xs font-semibold text-[#0A0A0A] mb-1.5">Full name <span className="text-[#3b82f6]">*</span></label>
                <input type="text" required placeholder="Jane Smith" value={name} onChange={e => setName(e.target.value)} className={inputCls} />
              </div>
              <div>
                <label className="block text-xs font-semibold text-[#0A0A0A] mb-1.5">Email address <span className="text-[#3b82f6]">*</span></label>
                <input type="email" required placeholder="jane@agency.com" value={email} onChange={e => setEmail(e.target.value)} className={inputCls} />
              </div>
            </div>
            <div className="grid sm:grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-xs font-semibold text-[#0A0A0A] mb-1.5">Phone / WhatsApp <span className="text-[#3b82f6]">*</span></label>
                <input type="tel" required placeholder="+1 555 000 0000" value={phone} onChange={e => setPhone(e.target.value)} className={inputCls} />
              </div>
              <div>
                <label className="block text-xs font-semibold text-[#0A0A0A] mb-1.5">
                  Agency website <span className="text-[10px] font-normal text-[#9CA3AF] ml-1">optional</span>
                </label>
                <input type="text" placeholder="youragency.com" value={website} onChange={e => setWebsite(e.target.value)} className={inputCls} />
              </div>
            </div>

            {/* ── Your agency ── */}
            <span className={sectionLabel}>Your agency</span>
            <div className="mb-4">
              <label className="block text-xs font-semibold text-[#0A0A0A] mb-2">Team size <span className="text-[#3b82f6]">*</span></label>
              <div className="grid grid-cols-4 gap-2">
                {[
                  { v: 'solo',  n: '1',    s: 'Solo' },
                  { v: '2-5',   n: '2–5',  s: 'Small' },
                  { v: '6-15',  n: '6–15', s: 'Mid' },
                  { v: '16+',   n: '16+',  s: 'Large' },
                ].map(o => (
                  <button
                    key={o.v} type="button"
                    onClick={() => setTeamSize(o.v)}
                    className={`flex flex-col items-center py-2.5 px-2 border rounded-xl text-xs font-medium transition-all ${
                      teamSize === o.v
                        ? 'border-[#3b82f6] bg-[#eff6ff] text-[#2563eb]'
                        : 'border-[#E5E5E5] text-[#6B7280] hover:border-[#0A0A0A]'
                    }`}
                  >
                    <span className={`text-lg font-bold leading-none mb-1 ${teamSize === o.v ? 'text-[#3b82f6]' : 'text-[#9CA3AF]'}`}>{o.n}</span>
                    {o.s}
                  </button>
                ))}
              </div>
            </div>
            <div className="grid sm:grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-xs font-semibold text-[#0A0A0A] mb-1.5">Monthly placements <span className="text-[#3b82f6]">*</span></label>
                <div className="relative">
                  <select required value={placements} onChange={e => setPlacements(e.target.value)} className={selectCls}>
                    <option value="" disabled>Select a range…</option>
                    {['1–2','3–5','6–10','11–20','21–50','50+'].map(v => (
                      <option key={v} value={v}>{v} placements</option>
                    ))}
                  </select>
                  <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-[#9CA3AF]">▾</span>
                </div>
                <p className="text-[11px] text-[#9CA3AF] mt-1">Approx. hires you close monthly</p>
              </div>
              <div>
                <label className="block text-xs font-semibold text-[#0A0A0A] mb-1.5">Avg. revenue per placement <span className="text-[#3b82f6]">*</span></label>
                <div className="relative">
                  <select required value={revenue} onChange={e => setRevenue(e.target.value)} className={selectCls}>
                    <option value="" disabled>Select a range…</option>
                    {['Under $1,000','$1,000 – $2,500','$2,500 – $5,000','$5,000 – $10,000','$10,000 – $20,000','Over $20,000'].map(v => (
                      <option key={v} value={v}>{v}</option>
                    ))}
                  </select>
                  <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-[#9CA3AF]">▾</span>
                </div>
                <p className="text-[11px] text-[#9CA3AF] mt-1">Used to calculate your ROI opportunity</p>
              </div>
            </div>
            <div className="mb-4">
              <label className="block text-xs font-semibold text-[#0A0A0A] mb-1.5">Tools you currently use <span className="text-[#3b82f6]">*</span></label>
              <input type="text" required placeholder="e.g. LinkedIn, Bullhorn, HubSpot, spreadsheets…" value={tools} onChange={e => setToolsVal(e.target.value)} className={inputCls} />
              <p className="text-[11px] text-[#9CA3AF] mt-1">ATS, CRM, sourcing, or comms tools</p>
            </div>

            {/* ── Biggest challenges ── */}
            <span className={sectionLabel}>Your biggest challenges</span>
            <div className="mb-4">
              <label className="block text-xs font-semibold text-[#0A0A0A] mb-2">Primary bottlenecks <span className="text-[#3b82f6]">*</span></label>
              <div className="grid sm:grid-cols-2 gap-2">
                {CHALLENGES.map(c => {
                  const active = challenges.includes(c.id);
                  return (
                    <button
                      key={c.id} type="button"
                      onClick={() => toggleChallenge(c.id)}
                      className={`flex items-center gap-2.5 px-3 py-2.5 border rounded-xl text-sm text-left transition-all ${
                        active
                          ? 'border-[#3b82f6] bg-[#eff6ff] text-[#2563eb] font-medium'
                          : 'border-[#E5E5E5] text-[#6B7280] hover:border-[#0A0A0A]'
                      }`}
                    >
                      <span className={`w-3.5 h-3.5 rounded border flex-shrink-0 flex items-center justify-center transition-all ${
                        active ? 'bg-[#3b82f6] border-[#3b82f6]' : 'border-[#D1D5DB] bg-white'
                      }`}>
                        {active && <svg width="8" height="8" viewBox="0 0 10 8" fill="none"><path d="M1 4l3 3 5-6" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>}
                      </span>
                      {c.label}
                    </button>
                  );
                })}
              </div>
            </div>
            <div className="mb-4">
              <label className="block text-xs font-semibold text-[#0A0A0A] mb-1.5">
                What does your follow-up process look like after a lead shows interest? <span className="text-[#3b82f6]">*</span>
              </label>
              <textarea
                required rows={3}
                placeholder="e.g. We send one email then follow up manually a few days later…"
                value={followUp} onChange={e => setFollowUp(e.target.value)}
                className={inputCls + ' resize-none leading-relaxed'}
              />
              <p className="text-[11px] text-[#9CA3AF] mt-1">Be specific — this is where we find the biggest leaks</p>
            </div>

            {/* ── Goals & readiness ── */}
            <span className={sectionLabel}>Goals & readiness</span>
            <div className="mb-4">
              <label className="block text-xs font-semibold text-[#0A0A0A] mb-1.5">
                If we could fix ONE thing in the next 90 days, what would make the biggest difference? <span className="text-[#3b82f6]">*</span>
              </label>
              <textarea
                required rows={3}
                placeholder="e.g. Automate candidate screening so we can handle 3× the volume…"
                value={goal} onChange={e => setGoal(e.target.value)}
                className={inputCls + ' resize-none leading-relaxed'}
              />
            </div>

            {/* Tried before */}
            <div className="mb-4">
              <label className="block text-xs font-semibold text-[#0A0A0A] mb-2">Have you tried solving this before?</label>
              <div className="space-y-2">
                {[
                  { v: 'no',      l: 'No — this is a new problem we\'re tackling' },
                  { v: 'failed',  l: 'Yes, but it didn\'t work out' },
                  { v: 'partial', l: 'Yes, partial solution in place but not enough' },
                ].map(o => (
                  <button
                    key={o.v} type="button"
                    onClick={() => setTriedBefore(o.v)}
                    className={`w-full flex items-center gap-2.5 px-3 py-2.5 border rounded-xl text-sm text-left transition-all ${
                      triedBefore === o.v
                        ? 'border-[#3b82f6] bg-[#eff6ff] text-[#2563eb]'
                        : 'border-[#E5E5E5] text-[#6B7280] hover:border-[#0A0A0A]'
                    }`}
                  >
                    <span className={`w-3.5 h-3.5 rounded-full border flex-shrink-0 transition-all ${
                      triedBefore === o.v ? 'border-[#3b82f6] bg-gradient-to-b from-[#3b82f6] to-[#3b82f6] shadow-[inset_0_0_0_3px_white]' : 'border-[#D1D5DB] bg-white'
                    }`} />
                    {o.l}
                  </button>
                ))}
              </div>
            </div>

            {/* Decision maker */}
            <div className="mb-4">
              <label className="block text-xs font-semibold text-[#0A0A0A] mb-2">Are you the main decision-maker for tools and systems? <span className="text-[#3b82f6]">*</span></label>
              <div className="space-y-2">
                {[
                  { v: 'yes',    l: 'Yes — it\'s my call' },
                  { v: 'shared', l: 'Shared — there are 2 of us who decide' },
                  { v: 'no',     l: 'No — someone else approves' },
                ].map(o => (
                  <button
                    key={o.v} type="button"
                    onClick={() => setDecisionMaker(o.v)}
                    className={`w-full flex items-center gap-2.5 px-3 py-2.5 border rounded-xl text-sm text-left transition-all ${
                      decisionMaker === o.v
                        ? 'border-[#3b82f6] bg-[#eff6ff] text-[#2563eb]'
                        : 'border-[#E5E5E5] text-[#6B7280] hover:border-[#0A0A0A]'
                    }`}
                  >
                    <span className={`w-3.5 h-3.5 rounded-full border flex-shrink-0 transition-all ${
                      decisionMaker === o.v ? 'border-[#3b82f6] shadow-[inset_0_0_0_3px_white] bg-[#3b82f6]' : 'border-[#D1D5DB] bg-white'
                    }`} />
                    {o.l}
                  </button>
                ))}
              </div>
            </div>

            {/* Readiness */}
            <div className="mb-4">
              <label className="block text-xs font-semibold text-[#0A0A0A] mb-2">If the audit shows a clear ROI, are you open to investing in a solution? <span className="text-[#3b82f6]">*</span></label>
              <div className="space-y-2">
                {[
                  { v: 'ready',     l: 'Yes — ready to move fast if it makes sense' },
                  { v: 'exploring', l: 'Exploring options, not committed yet' },
                  { v: 'learning',  l: 'Just learning right now' },
                ].map(o => (
                  <button
                    key={o.v} type="button"
                    onClick={() => setReadiness(o.v)}
                    className={`w-full flex items-center gap-2.5 px-3 py-2.5 border rounded-xl text-sm text-left transition-all ${
                      readiness === o.v
                        ? 'border-[#3b82f6] bg-[#eff6ff] text-[#2563eb]'
                        : 'border-[#E5E5E5] text-[#6B7280] hover:border-[#0A0A0A]'
                    }`}
                  >
                    <span className={`w-3.5 h-3.5 rounded-full border flex-shrink-0 transition-all ${
                      readiness === o.v ? 'border-[#3b82f6] shadow-[inset_0_0_0_3px_white] bg-[#3b82f6]' : 'border-[#D1D5DB] bg-white'
                    }`} />
                    {o.l}
                  </button>
                ))}
              </div>
            </div>

            {/* Extra focus — optional */}
            <div className="mb-6">
              <label className="block text-xs font-semibold text-[#0A0A0A] mb-1.5">
                Anything specific to focus on during the audit?
                <span className="text-[10px] font-normal text-[#9CA3AF] ml-1.5">optional</span>
              </label>
              <textarea
                rows={2}
                placeholder="Any context, specific workflows, or problems you'd like us to dig into…"
                value={extraFocus} onChange={e => setExtraFocus(e.target.value)}
                className={inputCls + ' resize-none leading-relaxed'}
              />
            </div>

            {error && <p className="text-sm text-red-500 mb-4">{error}</p>}

            <button
              type="submit" disabled={loading}
              className="w-full py-3.5 bg-[#0A0A0A] hover:bg-[#FF6A00] text-white text-sm font-bold rounded-xl transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed shadow-sm hover:shadow-md hover:-translate-y-0.5"
            >
              {loading ? 'Submitting…' : 'Submit Details & Book My Audit →'}
              {!loading && (
                <svg width="15" height="15" viewBox="0 0 16 16" fill="none">
                  <path d="M3 8h10M8.5 4l4.5 4-4.5 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              )}
            </button>
            <p className="text-center text-xs text-[#9CA3AF] mt-3">🔒 100% Free. No commitment required.</p>
          </form>
        </div>
      </div>
    </main>
  );
}
