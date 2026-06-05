'use client';

import { useState, FormEvent } from 'react';

const ACCESS_KEY = '0e7ac89b-a20a-4df5-a7b9-b5fc081df584';

type Source = 'LinkedIn' | 'Cold email' | 'Referral' | 'Search' | 'Other';
const SOURCES: Source[] = ['LinkedIn', 'Cold email', 'Referral', 'Search', 'Other'];

type FormState = {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    company: string;
    project: string;
    source: Source | '';
};

const INITIAL: FormState = {
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    company: '',
    project: '',
    source: '',
};

export default function ContactForm({ variant = 'embed' }: { variant?: 'embed' | 'page' }) {
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
            const res = await fetch('https://api.web3forms.com/submit', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
                body: JSON.stringify({
                    access_key: ACCESS_KEY,
                    subject: `[Contact] ${data.company} · ${data.source || 'unspecified'}`,
                    from_name: `${data.firstName} ${data.lastName}`.trim(),
                    first_name: data.firstName,
                    last_name: data.lastName,
                    email: data.email,
                    phone: data.phone || '(not provided)',
                    company: data.company,
                    project: data.project,
                    source: data.source,
                }),
            });

            if (!res.ok) throw new Error('web3forms returned non-200');

            if (typeof window !== 'undefined') {
                const w = window as Window & { analytics?: { track: (name: string, props: Record<string, unknown>) => void } };
                w.analytics?.track('contact_form_submitted', { source: data.source, company: data.company });
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
            <div className={`${variant === 'page' ? 'max-w-2xl mx-auto' : 'max-w-3xl mx-auto'} text-center bg-[#F9FAFB] border border-[#E5E5E5] rounded-2xl p-10 sm:p-14`}>
                <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-[#FFF4EB] mb-6">
                    <svg className="w-7 h-7 text-[#FF6A00]" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M5 13l4 4L19 7" />
                    </svg>
                </div>
                <h3 className="text-2xl sm:text-3xl font-bold text-[#0A0A0A] mb-3">Got it.</h3>
                <p className="section-sub max-w-md mx-auto">Tushar will respond within 48 hours.</p>
            </div>
        );
    }

    return (
        <div className={variant === 'page' ? 'max-w-2xl mx-auto' : 'max-w-3xl mx-auto'}>
            {variant === 'embed' && (
                <div className="mb-8 sm:mb-10 text-center max-w-2xl mx-auto">
                    <p className="text-xs font-bold text-[#FF6A00] uppercase tracking-widest mb-3">Not ready for a call?</p>
                    <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#0A0A0A] tracking-tight leading-tight mb-3">
                        Submit the form and Tushar will get in touch.
                    </h2>
                    <p className="section-sub">
                        Tell us about your agency and what you&#39;re trying to fix. We&#39;ll come back within 48 hours.
                    </p>
                </div>
            )}

            <form onSubmit={onSubmit} className="bg-white border border-[#E5E5E5] rounded-2xl p-6 sm:p-10 space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <Field label="First name" required>
                        <input type="text" required value={data.firstName} onChange={update('firstName')} className={inputClass} />
                    </Field>
                    <Field label="Last name" required>
                        <input type="text" required value={data.lastName} onChange={update('lastName')} className={inputClass} />
                    </Field>
                </div>

                <Field label="Email" required>
                    <input type="email" required value={data.email} onChange={update('email')} className={inputClass} />
                </Field>

                <Field label="Phone (optional)">
                    <input type="tel" value={data.phone} onChange={update('phone')} className={inputClass} />
                </Field>

                <Field label="Company / Agency" required>
                    <input type="text" required value={data.company} onChange={update('company')} className={inputClass} />
                </Field>

                <Field label="Tell us about your project" required>
                    <textarea required rows={4} value={data.project} onChange={update('project')} className={inputClass} />
                </Field>

                <Field label="How did you hear about us?" required>
                    <select required value={data.source} onChange={update('source')} className={inputClass}>
                        <option value="" disabled>Pick one</option>
                        {SOURCES.map(s => <option key={s} value={s}>{s}</option>)}
                    </select>
                </Field>

                <button
                    type="submit"
                    disabled={status === 'submitting'}
                    className="w-full sm:w-auto inline-flex items-center justify-center bg-[#0A0A0A] text-white px-8 py-4 rounded-full font-medium hover:bg-[#0A0A0A] active:scale-95 transition-all text-base sm:text-lg disabled:opacity-60 disabled:cursor-not-allowed group"
                >
                    {status === 'submitting' ? 'Sending…' : 'Submit'}
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
        </div>
    );
}

const inputClass = "w-full px-4 py-3 bg-[#FAFAFA] border border-[#E5E5E5] rounded-lg text-[#0A0A0A] placeholder-[#9CA3AF] focus:outline-none focus:border-[#0A0A0A] focus:bg-white transition-colors text-base";

function Field({ label, required, children }: { label: string; required?: boolean; children: React.ReactNode }) {
    return (
        <label className="block">
            <span className="block text-xs font-bold uppercase tracking-widest text-[#0A0A0A] mb-2">
                {label}
                {required && <span className="text-[#FF6A00] ml-1">*</span>}
            </span>
            {children}
        </label>
    );
}
