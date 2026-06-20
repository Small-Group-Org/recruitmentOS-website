'use client';

import { useState, FormEvent } from 'react';
import { leadService } from '@/services/lead.service';

const ACCESS_KEY = '0e7ac89b-a20a-4df5-a7b9-b5fc081df584';
const CAL_BASE = 'https://cal.com/tusharm/30min';

type RevenueBand = 'Under $500K' | '$500K–$1M' | '$1M–$2M' | '$2M–$5M' | '$5M+';
type OutreachBand = '<100' | '100–500' | '500–2,000' | '2,000–10,000' | '10,000+';

const REVENUE_BANDS: RevenueBand[] = ['Under $500K', '$500K–$1M', '$1M–$2M', '$2M–$5M', '$5M+'];
const OUTREACH_BANDS: OutreachBand[] = ['<100', '100–500', '500–2,000', '2,000–10,000', '10,000+'];

type FormState = {
    name: string;
    agency: string;
    website: string;
    email: string;
    niche: string;
    revenue: RevenueBand | '';
    outreach: OutreachBand | '';
    placementTarget: string;
    tried: string;
};

const INITIAL: FormState = {
    name: '',
    agency: '',
    website: '',
    email: '',
    niche: '',
    revenue: '',
    outreach: '',
    placementTarget: '',
    tried: '',
};

const MIN_NICHE_CHARS = 30;

export default function FitCallForm() {
    const [data, setData] = useState<FormState>(INITIAL);
    const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
    const [errorMsg, setErrorMsg] = useState('');

    const update = (key: keyof FormState) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        setData(prev => ({ ...prev, [key]: e.target.value }));
    };

    async function onSubmit(e: FormEvent) {
        e.preventDefault();
        setStatus('submitting');
        setErrorMsg('');

        try {
            // 1. Send to RecruitmentOS backend
            await leadService.createLead({
                name: data.name,
                email: data.email,
                company: data.agency,
                source: 'fit_call',
                message: `Website: ${data.website}\nNiche: ${data.niche}\nRevenue Band: ${data.revenue}\nOutreach Band: ${data.outreach}\nPlacement Target: ${data.placementTarget}\nTried/Failed: ${data.tried}`,
            });

            if (typeof window !== 'undefined') {
                const w = window as Window & { analytics?: { track: (name: string, props: Record<string, unknown>) => void } };
                w.analytics?.track('fit_call_form_submitted', {
                    niche: data.niche,
                    revenue_band: data.revenue,
                    outreach_band: data.outreach,
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
        const calUrl = `${CAL_BASE}?name=${encodeURIComponent(data.name)}&email=${encodeURIComponent(data.email)}&notes=${encodeURIComponent(`Agency: ${data.agency} · Niche: ${data.niche}`)}`;
        return (
            <div className="max-w-3xl mx-auto">
                <div className="text-center mb-8 bg-[#F9FAFB] border border-[#E5E5E5] rounded-2xl p-8 sm:p-10">
                    <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-[#FFF4EB] mb-4">
                        <svg className="w-7 h-7 text-[#FF6A00]" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M5 13l4 4L19 7" />
                        </svg>
                    </div>
                    <h3 className="text-2xl sm:text-3xl font-bold text-[#0A0A0A] mb-2">Pick a time.</h3>
                    <p className="section-sub max-w-md mx-auto">
                        We&#39;ll open the BD scorecard live on the call and run your volume math together.
                    </p>
                </div>
                <div className="rounded-2xl overflow-hidden border border-[#E5E5E5] h-[700px] bg-white">
                    <iframe
                        src={`${calUrl}&overlayCalendar=true`}
                        width="100%"
                        height="100%"
                        frameBorder="0"
                        title="Book a fit call"
                        className="w-full h-full"
                    />
                </div>
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

            <Field label="Agency website" required>
                <input type="url" required value={data.website} onChange={update('website')} className={inputClass} placeholder="https://" />
            </Field>

            <Field label="Work email" required>
                <input type="email" required value={data.email} onChange={update('email')} className={inputClass} />
            </Field>

            <Field label="Your niche — be specific" required hint={`At least ${MIN_NICHE_CHARS} characters. "biotech clinical hires at Series B+ in the US" passes; "recruitment" doesn't.`}>
                <textarea
                    required
                    rows={3}
                    minLength={MIN_NICHE_CHARS}
                    value={data.niche}
                    onChange={update('niche')}
                    className={inputClass}
                />
            </Field>

            <Field label="Current annual revenue" required>
                <select required value={data.revenue} onChange={update('revenue')} className={inputClass}>
                    <option value="" disabled>Pick one</option>
                    {REVENUE_BANDS.map(b => <option key={b} value={b}>{b}</option>)}
                </select>
            </Field>

            <Field label="Current monthly outreach volume" required>
                <select required value={data.outreach} onChange={update('outreach')} className={inputClass}>
                    <option value="" disabled>Pick one</option>
                    {OUTREACH_BANDS.map(b => <option key={b} value={b}>{b}</option>)}
                </select>
            </Field>

            <Field label="Monthly placement target" required>
                <input type="number" min="0" required value={data.placementTarget} onChange={update('placementTarget')} className={inputClass} />
            </Field>

            <Field label="What's been tried? What went wrong?" required hint="The 'burned $5K–$25K on something that didn't work' filter.">
                <textarea required rows={3} value={data.tried} onChange={update('tried')} className={inputClass} />
            </Field>

            <button
                type="submit"
                disabled={status === 'submitting'}
                className="w-full inline-flex items-center justify-center bg-[#0A0A0A] text-white px-8 py-4 rounded-full font-medium hover:bg-[#0A0A0A] active:scale-95 transition-all text-base sm:text-lg disabled:opacity-60 disabled:cursor-not-allowed group"
            >
                {status === 'submitting' ? 'Submitting…' : 'Continue to calendar'}
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
