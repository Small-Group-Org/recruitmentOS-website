'use client';

import { useState, useEffect } from 'react';
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

export type ToolGateModalProps = {
    /** Title used in the email subject + heading. e.g. "BD Scorecard" → "Unlock BD Scorecard". */
    toolTitle?: string;
    /** Dynamic source value. */
    source: CreateLeadPayload['source'];
    /** Called when user closes without unlocking. */
    onClose: () => void;
    /** Called after successful unlock — before the modal closes. Use it to open URLs or set state. */
    onUnlock?: () => void;
};

export default function ToolGateModal({ toolTitle = 'Free Recruitment Tools', source, onClose, onUnlock }: ToolGateModalProps) {
    const { unlock } = useToolGate();

    const [step, setStep] = useState<1 | 2>(1);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [website, setWebsite] = useState('');
    const [selected, setSelected] = useState<string[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    useEffect(() => {
        document.body.style.overflow = 'hidden';
        return () => { document.body.style.overflow = ''; };
    }, []);

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
            if (typeof window !== 'undefined') {
                const w = window as Window & { fbq?: (...args: unknown[]) => void };
                w.fbq?.('track', 'Lead', { content_name: `Tool Gate · ${toolTitle}`, email });
            }
            onUnlock?.();
            onClose();
        } catch {
            setError('Something went wrong. Please try again.');
        } finally {
            setLoading(false);
        }
    }

    return (
        <div
            className="fixed inset-0 z-[200] flex items-center justify-center px-4 py-8"
            style={{ background: 'rgba(0,0,0,0.5)', backdropFilter: 'blur(4px)' }}
            onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
        >
            <div className="w-full max-w-md bg-white rounded-2xl shadow-2xl overflow-hidden relative">
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 text-[#9CA3AF] hover:text-[#0A0A0A] transition-colors z-10"
                    aria-label="Close"
                >
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                        <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
                    </svg>
                </button>

                <div className="px-8 pt-7 pb-5 border-b border-[#E5E5E5]">
                    <div className="flex items-center gap-2 mb-3">
                        <span className="text-[10px] font-bold uppercase tracking-widest px-2 py-1 rounded-md bg-[#FFF4EB] text-[#FF6A00]">
                            Free access
                        </span>
                        {step === 2 && <span className="text-xs font-medium text-[#9CA3AF]">Step 2 of 2</span>}
                    </div>
                    <h2 className="text-2xl font-bold text-[#0A0A0A] tracking-tight leading-tight">
                        {step === 1 ? `Unlock ${toolTitle}` : "What's your biggest headache?"}
                    </h2>
                    <p className="text-sm text-[#6B7280] mt-1 font-medium">
                        {step === 1
                            ? 'One quick form unlocks every RecruitmentOS tool — forever.'
                            : 'Select all that apply — we tailor what we send you.'}
                    </p>
                </div>

                <div className="px-8 py-6">
                    {step === 1 && (
                        <form onSubmit={handleStep1} className="space-y-4">
                            <Field label="Full name">
                                <input type="text" required value={name} onChange={(e) => setName(e.target.value)} placeholder="Jane Smith" autoComplete="name" className={inputClass} />
                            </Field>
                            <Field label="Work email">
                                <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} placeholder="jane@youragency.com" autoComplete="email" className={inputClass} />
                            </Field>
                            <Field label="Website or LinkedIn">
                                <input type="text" required value={website} onChange={(e) => setWebsite(e.target.value)} placeholder="youragency.com" autoComplete="url" className={inputClass} />
                            </Field>
                            <button type="submit" className="w-full py-3 rounded-xl text-sm font-bold text-white bg-[#0A0A0A] hover:bg-[#FF6A00] transition-colors">
                                Continue →
                            </button>
                            <p className="text-center text-xs text-[#9CA3AF]">No spam. Unsubscribe anytime.</p>
                        </form>
                    )}

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
                                className="w-full py-3 rounded-xl text-sm font-bold text-white bg-[#0A0A0A] hover:bg-[#FF6A00] transition-colors disabled:opacity-40 !mt-4">
                                {loading ? 'Unlocking…' : 'Unlock now →'}
                            </button>
                            <p className="text-center text-xs pt-1 text-[#9CA3AF]">Select at least one to continue</p>
                        </form>
                    )}
                </div>
            </div>
        </div>
    );
}

const inputClass = "w-full border border-[#E5E5E5] rounded-xl px-4 py-2.5 text-sm outline-none focus:border-[#0A0A0A] transition-colors text-[#0A0A0A]";

function Field({ label, children }: { label: string; children: React.ReactNode }) {
    return (
        <div>
            <label className="block text-xs font-bold uppercase tracking-wide mb-1.5 text-[#0A0A0A]">{label}</label>
            {children}
        </div>
    );
}
