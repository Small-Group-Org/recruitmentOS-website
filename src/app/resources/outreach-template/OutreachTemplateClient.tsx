'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { leadService } from '@/services/lead.service';

const NOTION_URL =
    'https://long-streetcar-093.notion.site/Final-Outbound-Campaign-Plan-UK-Accountancy-Recruitment-39e434e7ef8c8184a591e980132c9b5b?pvs=73';

const STORAGE_KEY = 'rOS_unlocked';

const HEADACHES = [
    'Finding clients',
    'Cold outreach',
    'Lead follow-up',
    'Writing BD emails',
    'Something else',
];

declare global {
    interface Window {
        fbq?: (...args: unknown[]) => void;
    }
}

export default function OutreachTemplateClient() {
    const [unlocked, setUnlocked] = useState(false);
    const [checking, setChecking] = useState(true);

    // Gate state
    const [step, setStep] = useState<1 | 2>(1);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [website, setWebsite] = useState('');
    const [selected, setSelected] = useState<string[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    useEffect(() => {
        if (typeof window !== 'undefined') {
            setUnlocked(localStorage.getItem(STORAGE_KEY) === 'true');
        }
        setChecking(false);
    }, []);

    function handleStep1(e: React.FormEvent) {
        e.preventDefault();
        if (!name.trim() || !email.trim()) return;
        setStep(2);
    }

    function toggle(h: string) {
        setSelected((prev) =>
            prev.includes(h) ? prev.filter((x) => x !== h) : [...prev, h]
        );
    }

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        if (!selected.length) return;
        setLoading(true);
        setError('');
        try {
            await leadService.createLead({
                name,
                email,
                company: website || undefined,
                source: 'resource_email_outreach_template',
                headaches: selected,
            });
            localStorage.setItem(STORAGE_KEY, 'true');
            window.fbq?.('track', 'Lead', {
                content_name: 'BD Outreach Template',
                email,
            });
            setUnlocked(true);
        } catch {
            setError('Something went wrong. Please try again.');
        } finally {
            setLoading(false);
        }
    }

    if (checking) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-white">
                <div className="w-6 h-6 rounded-full border-2 border-[#FF6A00] border-t-transparent animate-spin" />
            </div>
        );
    }

    // ── UNLOCKED VIEW ──────────────────────────────────────────────────────────
    if (unlocked) {
        return (
            <section className="min-h-screen bg-white">
                <div className="max-w-3xl mx-auto px-4 pt-4 pb-14 sm:pt-6 sm:pb-20">
                    <div className="flex items-center justify-between mb-6">
                        <Link
                            href="/resources"
                            className="text-xs font-bold uppercase tracking-widest text-[#9CA3AF] hover:text-[#FF6A00] transition-colors"
                        >
                            ← All Resources
                        </Link>
                        <span className="inline-flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest px-3 py-1.5 rounded-full bg-[#FFF4EB] border border-[#FFD9B8] text-[#FF6A00]">
                            <span className="w-1.5 h-1.5 rounded-full bg-[#FF6A00] animate-pulse" />
                            Access Unlocked
                        </span>
                    </div>

                    <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#0A0A0A] tracking-tight leading-[1.1] mb-4">
                        BD Outreach Email Template & Funnel
                    </h1>
                    <p className="text-[#6B7280] text-base sm:text-lg leading-relaxed mb-6 max-w-2xl">
                        The exact email template and outreach funnel that gets replies — without chasing.
                        One email landed a{' '}
                        <span className="font-semibold text-[#0A0A0A]">
                            &quot;This candidate sounds exactly what we need&quot;
                        </span>{' '}
                        reply from a hiring director.
                    </p>

                    <div className="mb-10">
                        <a
                            href={NOTION_URL}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#0A0A0A] hover:bg-[#FF6A00] text-white text-sm font-semibold rounded-lg transition-all duration-300 shadow-sm hover:shadow-md hover:-translate-y-0.5 group"
                        >
                            Open Template in Notion
                            <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                            </svg>
                        </a>
                    </div>

                    {/* Preview image */}
                    <div className="relative w-full sm:w-1/2 mx-auto rounded-2xl overflow-hidden border border-[#E5E5E5] shadow-sm mb-10">
                        <Image
                            src="/resources/email-outreach-template.webp"
                            alt="Real email replies received from the BD outreach template"
                            width={900}
                            height={600}
                            className="w-full h-auto"
                            priority
                        />
                    </div>

                    {/* What's inside */}
                    <div className="bg-[#FAFAFA] border border-[#E5E5E5] rounded-2xl p-6 sm:p-8 mb-8">
                        <p className="text-[10px] font-bold tracking-widest uppercase text-[#FF6A00] mb-4">
                            What&apos;s Inside
                        </p>
                        <ul className="space-y-3">
                            {[
                                'The exact email copy that generated these replies',
                                'How to find the decision-maker (not HR) before writing anything',
                                'The full outreach funnel — from research to follow-up',
                                'Why leading with a candidate beats any pitch',
                                '4 rules that made one email do what 50 average ones couldn\'t',
                            ].map((item) => (
                                <li key={item} className="flex items-start gap-3 text-sm text-[#374151]">
                                    <span className="mt-0.5 flex-shrink-0 w-4 h-4 rounded-full bg-[#FFF4EB] border border-[#FFD9B8] flex items-center justify-center">
                                        <svg width="8" height="8" viewBox="0 0 10 8" fill="none">
                                            <path d="M1 4l3 3 5-6" stroke="#FF6A00" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                        </svg>
                                    </span>
                                    {item}
                                </li>
                            ))}
                        </ul>
                    </div>


                </div>
            </section>
        );
    }

    // ── GATE VIEW ──────────────────────────────────────────────────────────────
    const inputCls =
        'w-full border border-[#E5E5E5] rounded-xl px-4 py-2.5 text-sm outline-none focus:border-[#0A0A0A] focus:ring-2 focus:ring-black/5 transition-all text-[#0A0A0A] bg-white placeholder:text-[#9CA3AF]';

    return (
        <section className="min-h-screen bg-[#F9FAFB]">
            <div className="max-w-2xl mx-auto px-4 pt-4 pb-10 sm:pt-6 sm:pb-14">

                {/* Hero */}
                <div className="mb-8">
                    <div className="flex items-center justify-between mb-4">
                        <Link
                            href="/resources"
                            className="text-xs font-bold uppercase tracking-widest text-[#9CA3AF] hover:text-[#FF6A00] transition-colors"
                        >
                            ← All Resources
                        </Link>
                        <div className="inline-flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest px-3 py-1.5 rounded-full bg-[#FFF4EB] border border-[#FFD9B8] text-[#FF6A00]">
                            <span className="w-1.5 h-1.5 rounded-full bg-[#FF6A00] animate-pulse" />
                            Free Access
                        </div>
                    </div>
                    <h1 className="text-2xl sm:text-3xl font-bold text-[#0A0A0A] mb-3 leading-tight tracking-tight">
                        Get the BD Outreach Email Template That Got This Reply
                    </h1>

                    {/* Proof image */}
                    <div className="relative w-full sm:w-1/2 mx-auto rounded-2xl overflow-hidden border border-[#E5E5E5] shadow-sm mb-5">
                        <Image
                            src="/resources/email-outreach-template.webp"
                            alt="Real email reply: This candidate sounds exactly what we need"
                            width={800}
                            height={500}
                            className="w-full h-auto"
                            priority
                        />
                    </div>

                    <p className="text-[#6B7280] text-sm sm:text-base leading-relaxed mb-5">
                        One email. The reply came back within days:{' '}
                        <span className="font-semibold text-[#0A0A0A]">
                            &quot;This candidate sounds exactly what we need.&quot;
                        </span>{' '}
                        Enter your details to get the exact template and outreach funnel we used.
                    </p>

                    <ul className="space-y-2 mb-2">
                        {[
                            'Find the decision-maker — not HR — before writing',
                            'Lead with a candidate, not a pitch',
                            'Send one great email instead of fifty average ones',
                        ].map((t) => (
                            <li key={t} className="flex items-start gap-2.5 text-sm text-[#4B5563]">
                                <span className="mt-0.5 flex-shrink-0 w-4 h-4 rounded-full bg-[#FFF4EB] border border-[#FFD9B8] flex items-center justify-center">
                                    <svg width="8" height="8" viewBox="0 0 10 8" fill="none">
                                        <path d="M1 4l3 3 5-6" stroke="#FF6A00" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                    </svg>
                                </span>
                                {t}
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Form card */}
                <div className="bg-white border border-[#E5E5E5] rounded-2xl p-6 sm:p-8 shadow-sm">

                    {step === 1 && (
                        <form onSubmit={handleStep1} className="space-y-4">
                            <div className="grid sm:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-xs font-bold uppercase tracking-wide mb-1.5 text-[#0A0A0A]">
                                        Full Name <span className="text-[#FF6A00]">*</span>
                                    </label>
                                    <input
                                        type="text"
                                        required
                                        placeholder="Jane Smith"
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                        autoComplete="name"
                                        className={inputCls}
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs font-bold uppercase tracking-wide mb-1.5 text-[#0A0A0A]">
                                        Work Email <span className="text-[#FF6A00]">*</span>
                                    </label>
                                    <input
                                        type="email"
                                        required
                                        placeholder="jane@youragency.com"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        autoComplete="email"
                                        className={inputCls}
                                    />
                                </div>
                            </div>
                            <div>
                                <label className="block text-xs font-bold uppercase tracking-wide mb-1.5 text-[#0A0A0A]">
                                    Agency / Website{' '}
                                    <span className="text-[10px] font-normal text-[#9CA3AF] ml-1">optional</span>
                                </label>
                                <input
                                    type="text"
                                    placeholder="youragency.com or linkedin.com/in/yourname"
                                    value={website}
                                    onChange={(e) => setWebsite(e.target.value)}
                                    autoComplete="url"
                                    className={inputCls}
                                />
                            </div>
                            <button
                                type="submit"
                                className="w-full py-3.5 bg-[#0A0A0A] hover:bg-[#FF6A00] text-white text-sm font-bold rounded-xl transition-all flex items-center justify-center gap-2 shadow-sm hover:shadow-md hover:-translate-y-0.5"
                            >
                                Continue →
                            </button>
                            <p className="text-center text-xs text-[#9CA3AF]">
                                🔒 No spam. Unsubscribe anytime.
                            </p>
                        </form>
                    )}

                    {step === 2 && (
                        <form onSubmit={handleSubmit} className="space-y-3">
                            <div className="mb-4">
                                <p className="text-xs font-bold uppercase tracking-wide text-[#0A0A0A] mb-1">
                                    Step 2 of 2
                                </p>
                                <h2 className="text-lg font-bold text-[#0A0A0A]">
                                    What&apos;s your biggest BD challenge?
                                </h2>
                                <p className="text-sm text-[#6B7280] mt-1">
                                    Select all that apply — we tailor resources to what matters most.
                                </p>
                            </div>
                            {HEADACHES.map((h) => {
                                const active = selected.includes(h);
                                return (
                                    <button
                                        key={h}
                                        type="button"
                                        onClick={() => toggle(h)}
                                        className="w-full text-left px-4 py-3 rounded-xl border text-sm font-medium transition-all"
                                        style={{
                                            borderColor: active ? '#FF6A00' : '#E5E5E5',
                                            background: active ? '#FFF4EB' : '#fff',
                                            color: active ? '#FF6A00' : '#374151',
                                        }}
                                    >
                                        {active ? '✓ ' : ''}{h}
                                    </button>
                                );
                            })}
                            {error && <p className="text-xs text-red-500 pt-1">{error}</p>}
                            <button
                                type="submit"
                                disabled={loading || selected.length === 0}
                                className="w-full py-3.5 bg-[#0A0A0A] hover:bg-[#FF6A00] text-white text-sm font-bold rounded-xl transition-all flex items-center justify-center gap-2 disabled:opacity-40 disabled:cursor-not-allowed shadow-sm hover:shadow-md hover:-translate-y-0.5 !mt-5"
                            >
                                {loading ? 'Unlocking…' : 'Get My Free Template →'}
                            </button>
                            <p className="text-center text-xs text-[#9CA3AF]">
                                Select at least one option to continue
                            </p>
                        </form>
                    )}
                </div>
            </div>
        </section>
    );
}
