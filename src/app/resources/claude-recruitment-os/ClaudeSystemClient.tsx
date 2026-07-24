'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { leadService } from '@/services/lead.service';

const BREAKDOWN_URL = 'https://drive.google.com/file/d/1a4XG6ucSWX0oTiERsfT7PZHqqyqOOJmh/view';

const STORAGE_KEY = 'rOS_claude_unlocked';

const HEADACHES = [
    'Sourcing candidates',
    'Finding new clients',
    'Writing outreach emails',
    'Admin & manual tasks',
    'Something else',
];

const FEATURES = [
    { title: 'Demand Intelligence', desc: 'Identify hiring demand before vacancies become public.' },
    { title: 'Job Discovery', desc: 'Monitor job boards, filter qualified opportunities, and identify hiring managers automatically.' },
    { title: 'AI Candidate Sourcing', desc: 'Source and match candidates in real time.' },
    { title: 'CV Screening', desc: 'Screen, score, and rank applicants instantly.' },
    { title: 'Candidate Reactivation', desc: 'Reconnect with qualified candidates already in your database.' },
    { title: 'Client Updates', desc: 'Automatically send progress reports and hiring updates.' },
    { title: 'Interview Scheduling', desc: 'Coordinate interviews without manual back and forth.' },
    { title: 'Reference Checking', desc: 'Collect and organize references automatically.' },
    { title: 'Recruitment Dashboard', desc: 'Track pipeline, performance, and forecasting with live analytics.' }
];

declare global {
    interface Window {
        fbq?: (...args: unknown[]) => void;
    }
}

export default function ClaudeSystemClient() {
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
                source: 'resource_claude_recruitment_os',
                headaches: selected,
            });
            localStorage.setItem(STORAGE_KEY, 'true');
            window.fbq?.('track', 'Lead', {
                content_name: 'Claude Recruitment OS',
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
                        Recruitment Operating System powered by Claude Code
                    </h1>
                    <p className="text-[#6B7280] text-base sm:text-lg leading-relaxed mb-10 max-w-2xl">
                        We&apos;ve built AI systems that automate the repetitive work behind recruitment, so recruiters can spend more time building relationships, placing candidates, and growing revenue instead of handling admin.
                    </p>

                    <div className="relative w-full rounded-2xl overflow-hidden border border-[#E5E5E5] shadow-sm mb-10 bg-gray-50">
                        <Image
                            src="/resources/claude-automate-ROS.webp"
                            alt="Claude Automation"
                            width={900}
                            height={600}
                            className="w-full h-auto object-cover"
                            priority
                        />
                    </div>

                    {/* What's inside */}
                    <div className="bg-[#FAFAFA] border border-[#E5E5E5] rounded-2xl p-6 sm:p-8 mb-8">
                        <p className="text-[10px] font-bold tracking-widest uppercase text-[#FF6A00] mb-4">
                            What The System Automates
                        </p>
                        <ul className="space-y-4 mb-8">
                            {FEATURES.map((item, idx) => (
                                <li key={item.title} className="flex items-start gap-3 text-sm text-[#374151]">
                                    <span className="mt-0.5 flex-shrink-0 w-6 h-6 rounded-full bg-[#FFF4EB] border border-[#FFD9B8] flex items-center justify-center text-[10px] font-bold text-[#FF6A00]">
                                        {String(idx + 1).padStart(2, '0')}
                                    </span>
                                    <div>
                                        <span className="font-semibold text-[#0A0A0A] block">{item.title}</span>
                                        <span className="text-[#6B7280]">{item.desc}</span>
                                    </div>
                                </li>
                            ))}
                        </ul>

                        <div className="border-t border-[#E5E5E5] pt-6 mb-6">
                            <h3 className="text-lg font-bold text-[#0A0A0A] mb-2">Humans Still Win</h3>
                            <p className="text-sm text-[#4B5563] mb-2">
                                AI handles the repetitive work.
                            </p>
                            <p className="text-sm text-[#4B5563]">
                                Recruiters handle the conversations, judgement, negotiation, and placements.
                            </p>
                        </div>
                        
                        <div className="bg-white border border-[#E5E5E5] rounded-xl p-5">
                            <h3 className="text-sm font-bold text-[#0A0A0A] uppercase tracking-wider mb-2">The Result</h3>
                            <p className="text-sm text-[#4B5563]">
                                One recruiter can manage the workload that previously required an entire team.
                            </p>
                        </div>
                    </div>

                    <a
                        href={BREAKDOWN_URL}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-3 w-full sm:w-auto justify-center px-8 py-4 bg-[#0A0A0A] hover:bg-[#FF6A00] text-white text-sm font-bold rounded-xl transition-all duration-300 shadow-sm hover:shadow-lg hover:-translate-y-0.5 group"
                    >
                        Access The Full Breakdown
                        <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                        </svg>
                    </a>
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
                        Claude Code books interviews before you even see the job.
                    </h1>

                    <div className="relative w-full rounded-2xl overflow-hidden border border-[#E5E5E5] shadow-sm mb-5 bg-gray-50">
                        <Image
                            src="/resources/claude-automate-ROS.webp"
                            alt="Claude Code automates the recruitment operating system"
                            width={800}
                            height={500}
                            className="w-full h-auto object-cover"
                            priority
                        />
                    </div>

                    <p className="text-[#6B7280] text-sm sm:text-base leading-relaxed mb-5">
                        We&apos;ve built AI systems that automate the repetitive work behind recruitment, so recruiters can spend more time building relationships, placing candidates, and growing revenue instead of handling admin.
                    </p>

                    <ul className="space-y-2 mb-2">
                        {[
                            'Discover jobs & hiring demand before they are public',
                            'Source & screen candidates automatically',
                            'Coordinate interviews without manual back-and-forth',
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
                    
                    <p className="text-[#6B7280] text-sm mt-5 font-semibold">
                        Enter your details to get the full breakdown of how these AI systems connect into a complete Recruitment OS.
                    </p>
                </div>

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
                                    What&apos;s your biggest recruitment challenge?
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
                                {loading ? 'Unlocking…' : 'Get The Breakdown →'}
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
