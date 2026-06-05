'use client';

import { useState, FormEvent } from 'react';

const ACCESS_KEY = '0e7ac89b-a20a-4df5-a7b9-b5fc081df584';

type RevenueBand = 'Under $500K' | '$500K–$1M' | '$1M–$2M' | '$2M–$5M' | '$5M+';
const REVENUE_BANDS: RevenueBand[] = [
    'Under $500K',
    '$500K–$1M',
    '$1M–$2M',
    '$2M–$5M',
    '$5M+',
];

type FormState = {
    name: string;
    agency: string;
    website: string;
    email: string;
    niche: string;
    revenue: RevenueBand | '';
    placementTarget: string;
    currentEffort: string;
};

const INITIAL: FormState = {
    name: '',
    agency: '',
    website: '',
    email: '',
    niche: '',
    revenue: '',
    placementTarget: '',
    currentEffort: '',
};

const MIN_NICHE_CHARS = 30;

export default function ApplyForm() {
    const [data, setData] = useState<FormState>(INITIAL);
    const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
    const [errorMsg, setErrorMsg] = useState('');
    const [nicheWarning, setNicheWarning] = useState('');

    const update = (key: keyof FormState) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        setData(prev => ({ ...prev, [key]: e.target.value }));
        if (key === 'niche') {
            const v = e.target.value.trim();
            if (v.toLowerCase() === 'recruitment' || v.length < MIN_NICHE_CHARS) {
                setNicheWarning(`Be specific — at least ${MIN_NICHE_CHARS} characters. "Recruitment" or "all sectors" won't pass our verification.`);
            } else {
                setNicheWarning('');
            }
        }
    };

    async function onSubmit(e: FormEvent) {
        e.preventDefault();
        if (data.niche.trim().length < MIN_NICHE_CHARS) {
            setNicheWarning(`Be specific — at least ${MIN_NICHE_CHARS} characters.`);
            return;
        }
        setStatus('submitting');
        setErrorMsg('');

        try {
            const res = await fetch('https://api.web3forms.com/submit', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
                body: JSON.stringify({
                    access_key: ACCESS_KEY,
                    subject: `[FreeLeadsCampaign] ${data.niche.slice(0, 60)} · ${data.agency}`,
                    from_name: data.name,
                    name: data.name,
                    agency: data.agency,
                    website: data.website,
                    email: data.email,
                    niche: data.niche,
                    revenue_band: data.revenue,
                    placement_target: data.placementTarget,
                    current_effort: data.currentEffort,
                }),
            });

            if (!res.ok) throw new Error('web3forms returned non-200');

            if (typeof window !== 'undefined') {
                const w = window as Window & { analytics?: { track: (name: string, props: Record<string, unknown>) => void } };
                w.analytics?.track('free_leads_form_submitted', {
                    niche: data.niche,
                    revenue_band: data.revenue,
                    placement_target: data.placementTarget,
                });
            }

            setStatus('success');
        } catch (err) {
            console.error(err);
            setErrorMsg('Something went wrong. Email tushar.mangla1120@gmail.com directly.');
            setStatus('error');
        }
    }

    if (status === 'success') {
        return (
            <div className="max-w-2xl mx-auto text-center bg-[#F9FAFB] border border-[#E5E5E5] rounded-2xl p-10 sm:p-14">
                <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-[#FFF4EB] mb-6">
                    <svg className="w-7 h-7 text-[#FF6A00]" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M5 13l4 4L19 7" />
                    </svg>
                </div>
                <h3 className="text-2xl sm:text-3xl font-bold text-[#0A0A0A] mb-3">Got it.</h3>
                <p className="section-sub max-w-md mx-auto mb-4">
                    We'll come back within 24 hours with a yes/no on fit.
                </p>
                <p className="text-xs text-[#9CA3AF]">
                    Approved applicants receive their first 10 contacts the morning after approval.
                </p>
            </div>
        );
    }

    return (
        <form onSubmit={onSubmit} className="bg-white border border-[#E5E5E5] rounded-2xl p-6 sm:p-10 space-y-5 max-w-2xl mx-auto">
            <Field label="Your name" required>
                <input type="text" required value={data.name} onChange={update('name')} className={inputClass} />
            </Field>

            <Field label="Agency name" required>
                <input type="text" required value={data.agency} onChange={update('agency')} className={inputClass} />
            </Field>

            <Field label="Agency website" required hint="Used for fit verification">
                <input type="url" required value={data.website} onChange={update('website')} className={inputClass} placeholder="https://" />
            </Field>

            <Field label="Your work email" required hint="We deliver to this email">
                <input type="email" required value={data.email} onChange={update('email')} className={inputClass} />
            </Field>

            <Field label="Your niche — be specific" required hint={`At least ${MIN_NICHE_CHARS} characters. "Biotech clinical hires at Series B+ companies in the US" passes; "recruitment" doesn't.`}>
                <textarea required rows={3} value={data.niche} onChange={update('niche')} className={inputClass} />
                {nicheWarning && (
                    <p className="text-xs text-[#FF6A00] font-medium mt-2">{nicheWarning}</p>
                )}
            </Field>

            <Field label="Annual revenue band" required>
                <select required value={data.revenue} onChange={update('revenue')} className={inputClass}>
                    <option value="" disabled>Pick one</option>
                    {REVENUE_BANDS.map(b => <option key={b} value={b}>{b}</option>)}
                </select>
            </Field>

            <Field label="Monthly placement target" required>
                <input type="number" min="0" required value={data.placementTarget} onChange={update('placementTarget')} className={inputClass} />
            </Field>

            <Field label="What's your current BD effort?" hint="Optional — but it speeds up our review">
                <textarea rows={3} value={data.currentEffort} onChange={update('currentEffort')} className={inputClass} />
            </Field>

            <button
                type="submit"
                disabled={status === 'submitting'}
                className="w-full inline-flex items-center justify-center bg-[#0A0A0A] text-white px-8 py-4 rounded-full font-medium hover:bg-[#222222] active:scale-95 transition-all text-base sm:text-lg disabled:opacity-60 disabled:cursor-not-allowed group"
            >
                {status === 'submitting' ? 'Submitting…' : 'Submit application'}
                {status !== 'submitting' && (
                    <svg className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M5 12h14M12 5l7 7-7 7" />
                    </svg>
                )}
            </button>

            {status === 'error' && (
                <p className="text-sm text-red-600 font-medium">{errorMsg}</p>
            )}
        </form>
    );
}

const inputClass = "w-full px-4 py-3 bg-[#FAFAFA] border border-[#E5E5E5] rounded-lg text-[#0A0A0A] placeholder-[#9CA3AF] focus:outline-none focus:border-[#0A0A0A] focus:bg-white transition-colors text-base";

function Field({ label, required, hint, children }: { label: string; required?: boolean; hint?: string; children: React.ReactNode }) {
    return (
        <label className="block">
            <span className="block text-xs font-bold uppercase tracking-widest text-[#0A0A0A] mb-2">
                {label}
                {required && <span className="text-[#FF6A00] ml-1">*</span>}
            </span>
            {hint && <p className="text-xs text-[#9CA3AF] font-medium mb-2 -mt-1">{hint}</p>}
            {children}
        </label>
    );
}
