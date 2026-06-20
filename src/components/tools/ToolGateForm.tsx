'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useToolGate } from '@/hooks/useToolGate';
import { leadService } from '@/services/lead.service';

const HEADACHES = [
  'Finding candidates',
  'Finding customers',
  'Outreach & follow-ups',
  'Screening resumes',
  'Something else',
];

const WEB3FORMS_KEY = '0e7ac89b-a20a-4df5-a7b9-b5fc081df584';

import { CreateLeadPayload } from '@/services/lead.service';

export default function ToolGateForm({ toolTitle = 'Free Recruitment Tools', redirectUrl, source = 'tools_gate' }: { toolTitle?: string; redirectUrl?: string; source?: CreateLeadPayload['source'] }) {
  const { unlock } = useToolGate();
  const router = useRouter();

  const [step, setStep] = useState<1 | 2>(1);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [website, setWebsite] = useState('');
  const [selected, setSelected] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  function handleStep1(e: React.FormEvent) {
    e.preventDefault();
    if (!name.trim() || !email.trim() || !website.trim()) return;
    setStep(2);
  }

  function toggle(h: string) {
    setSelected((prev) => prev.includes(h) ? prev.filter((x) => x !== h) : [...prev, h]);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!selected.length) return;
    setLoading(true);
    setError('');
    try {
      // 1. Send to local/production RecruitmentOS backend
      await leadService.createLead({
        name,
        email,
        company: website,
        source,
        headaches: selected,
      });

      unlock();
      if (redirectUrl) {
        window.location.href = redirectUrl;
      } else {
        router.push('/resources#tools');
      }
    } catch {
      setError('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-16 bg-[#F9FAFB]">
      <div className="w-full max-w-md">

        {/* Logo */}
        <div className="text-center mb-8">
          <span className="font-bold text-2xl tracking-tight text-[#0A0A0A]">
            Recruitment<span className="text-[#FF6A00]">OS</span>
          </span>
          <p className="text-xs uppercase tracking-widest mt-1 text-[#9CA3AF] font-medium">
            Intelligent Hiring Infrastructure
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-sm overflow-hidden border border-[#E5E5E5]">

          {/* Step indicator */}
          <div className="px-8 pt-7 pb-5 border-b border-[#E5E5E5]">
            <div className="flex items-center gap-2 mb-3">
              <span className="text-[10px] font-bold uppercase tracking-widest px-2 py-1 rounded-md"
                style={{ background: '#FFF4EB', color: '#FF6A00' }}>
                Free Access
              </span>
              {step === 2 && (
                <span className="text-xs font-medium text-[#9CA3AF]">
                  Step 2 of 2
                </span>
              )}
            </div>
            <h2 className="text-2xl font-bold text-[#0A0A0A] tracking-tight leading-tight">
              {step === 1 ? 'Unlock Free Access' : "What's your biggest headache?"}
            </h2>
            <p className="text-sm text-[#6B7280] mt-1 font-medium">
              {step === 1
                ? 'Fill in your details once to unlock all tools — forever.'
                : 'Select all that apply — we tailor resources to what matters most.'}
            </p>
          </div>

          <div className="px-8 py-6">

            {/* ── Step 1 ── */}
            {step === 1 && (
              <form onSubmit={handleStep1} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wide mb-1.5 text-[#0A0A0A]">
                    Full Name
                  </label>
                  <input
                    type="text" required value={name} onChange={(e) => setName(e.target.value)}
                    placeholder="Jane Smith" autoComplete="name"
                    className="w-full border border-[#E5E5E5] rounded-xl px-4 py-2.5 text-sm outline-none focus:border-[#0A0A0A] transition-colors text-[#0A0A0A]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wide mb-1.5 text-[#0A0A0A]">
                    Work Email
                  </label>
                  <input
                    type="email" required value={email} onChange={(e) => setEmail(e.target.value)}
                    placeholder="jane@youragency.com" autoComplete="email"
                    className="w-full border border-[#E5E5E5] rounded-xl px-4 py-2.5 text-sm outline-none focus:border-[#0A0A0A] transition-colors text-[#0A0A0A]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wide mb-1.5 text-[#0A0A0A]">
                    Website
                  </label>
                  <input
                    type="text" required value={website} onChange={(e) => setWebsite(e.target.value)}
                    placeholder="e.g. youragency.com or linkedin.com/in/yourname" autoComplete="url"
                    className="w-full border border-[#E5E5E5] rounded-xl px-4 py-2.5 text-sm outline-none focus:border-[#0A0A0A] transition-colors text-[#0A0A0A]"
                  />
                </div>
                <button type="submit"
                  className="w-full py-3 rounded-xl text-sm font-bold text-white bg-[#0A0A0A] hover:bg-[#0A0A0A] transition-colors">
                  Continue →
                </button>
                <p className="text-center text-xs text-[#9CA3AF]">
                  No spam. Unsubscribe anytime.
                </p>
              </form>
            )}

            {/* ── Step 2 ── */}
            {step === 2 && (
              <form onSubmit={handleSubmit} className="space-y-2.5">
                {HEADACHES.map((h) => {
                  const active = selected.includes(h);
                  return (
                    <button key={h} type="button" onClick={() => toggle(h)}
                      className="w-full text-left px-4 py-3 rounded-xl border text-sm font-medium transition-all"
                      style={{
                        borderColor: active ? '#FF6A00' : '#E5E5E5',
                        background: active ? '#FFF4EB' : '#fff',
                        color: active ? '#FF6A00' : '#374151',
                      }}>
                      {active ? '✓ ' : ''}{h}
                    </button>
                  );
                })}

                {error && <p className="text-xs text-red-500 pt-1">{error}</p>}

                <button type="submit" disabled={loading || selected.length === 0}
                  className="w-full py-3 rounded-xl text-sm font-bold text-white bg-[#0A0A0A] hover:bg-[#0A0A0A] transition-colors disabled:opacity-40 !mt-4">
                  {loading ? 'Unlocking…' : 'Get My Free Access →'}
                </button>

                <p className="text-center text-xs pt-1 text-[#9CA3AF]">
                  Select at least one option to continue
                </p>
              </form>
            )}

          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-4 mt-4 border border-[#E5E5E5] rounded-2xl overflow-hidden bg-white">
          {[
            { num: '10+', lbl: 'Agencies using this' },
            { num: '500+', lbl: 'Jobs tracked daily' },
            { num: '5.3%', lbl: 'Avg reply rate' },
            { num: '+30%', lbl: 'Revenue growth' },
          ].map((s) => (
            <div key={s.lbl} className="py-3 px-2 text-center border-r border-[#E5E5E5] last:border-r-0">
              <span className="block text-sm font-bold text-[#0A0A0A]">
                {s.num}
              </span>
              <span className="text-[10px] leading-tight block mt-0.5 text-[#6B7280] font-medium">
                {s.lbl}
              </span>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}
