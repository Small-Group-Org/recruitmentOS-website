'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { leadService } from '@/services/lead.service';

const NOTION_URL =
    'https://long-streetcar-093.notion.site/AI-Recruiter-System-built-with-Claude-Code-cee434e7ef8c8353956a0125a26cc1b6';

const STORAGE_KEY = 'rOS_unlocked';

const HEADACHES = [
    'Sourcing candidates',
    'Finding new clients',
    'Writing outreach emails',
    'Admin & manual tasks',
    'Something else',
];

const WHAT_YOU_GET = [
    { label: '5 AI Agent Architecture', desc: 'Specialized agents that run sourcing, outreach, interviews, reports, and pipeline tracking.' },
    { label: '15 Recruiting Skills', desc: 'Reusable Claude skills covering the full recruiting workflow end-to-end.' },
    { label: 'Claude Code Setup', desc: 'Step-by-step guide to configure Claude Code for your recruiting stack.' },
    { label: 'MCP Configuration', desc: 'Connect Claude to ATS, LinkedIn, Apollo, Gmail, Calendar, Slack, and more.' },
    { label: 'Recruiting Workflows', desc: 'Documented SOPs for sourcing, screening, outreach, interviews, and client reporting.' },
    { label: 'Installation Guide', desc: 'Full setup instructions so you can deploy the system in your own environment.' },
    { label: 'Prompt Library', desc: 'Battle-tested prompts for every recruiting task — ready to use immediately.' },
];

const SYSTEM_LAYERS = [
    {
        title: 'Knowledge Base',
        desc: 'Stores recruiting SOPs, hiring playbooks, company context, and reusable documentation.',
    },
    {
        title: 'MCP Connectors',
        desc: 'Connects Claude to ATS, LinkedIn, Apollo, Gmail, Calendar, Slack, and other recruiting tools.',
    },
    {
        title: 'Recruiting Skills',
        desc: 'Reusable workflows for sourcing, resume analysis, outreach, interview prep, reporting, and more.',
    },
    {
        title: 'AI Agents',
        desc: 'Specialized agents that execute recruiting tasks together instead of acting like a single chatbot.',
    },
];

const CAPABILITIES = [
    'Parse and analyze resumes',
    'Source and match candidates',
    'Scrape live job openings',
    'Find hiring managers',
    'Generate personalized outreach',
    'Create interview questions',
    'Build hiring scorecards',
    'Schedule interviews',
    'Generate client-ready PDF reports',
    'Track recruiting pipelines',
];

declare global {
    interface Window {
        fbq?: (...args: unknown[]) => void;
    }
}

export default function AIRecruitingOSClient() {
    const [unlocked, setUnlocked] = useState(false);
    const [checking, setChecking] = useState(true);

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
                source: 'resource_ai_recruiting_os',
                headaches: selected,
            });
            localStorage.setItem(STORAGE_KEY, 'true');
            window.fbq?.('track', 'Lead', {
                content_name: 'AI Recruiting OS',
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

    // UNLOCKED VIEW
    if (unlocked) {
        return (
            <section className="min-h-screen bg-white">
                <div className="max-w-3xl mx-auto px-4 pt-4 pb-14 sm:pt-6 sm:pb-20">

                    <div className="flex items-center justify-between mb-8">
                        <Link
                            href="/resources"
                            className="text-xs font-bold uppercase tracking-widest text-[#9CA3AF] hover:text-[#FF6A00] transition-colors"
                        >
                            &larr; All Resources
                        </Link>
                        <span className="inline-flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest px-3 py-1.5 rounded-full bg-[#FFF4EB] border border-[#FFD9B8] text-[#FF6A00]">
                            <span className="w-1.5 h-1.5 rounded-full bg-[#FF6A00] animate-pulse" />
                            Access Unlocked
                        </span>
                    </div>

                    <p className="text-xs font-bold text-[#FF6A00] uppercase tracking-widest mb-3">AI Recruiting OS</p>
                    <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#0A0A0A] tracking-tight leading-[1.1] mb-4">
                        I built an AI Recruiting Operating System with Claude Code
                    </h1>
                    <p className="text-[#6B7280] text-base sm:text-lg leading-relaxed mb-8 max-w-2xl">
                        Not another chatbot. A system. Claude Code, MCP, Knowledge Base, Recruiting Skills, and AI Agents working together as one complete recruiting operating system.
                    </p>

                    <div className="mb-10">
                        <a
                            href={NOTION_URL}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 px-6 py-3 bg-[#0A0A0A] hover:bg-[#FF6A00] text-white text-sm font-bold rounded-xl transition-all duration-300 shadow-sm hover:shadow-md hover:-translate-y-0.5 group"
                        >
                            Open Full System in Notion
                            <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                            </svg>
                        </a>
                    </div>

                    <div className="relative w-full sm:w-2/3 mx-auto rounded-2xl overflow-hidden border border-[#E5E5E5] shadow-sm mb-12 bg-[#0A0A0A]">
                        <Image
                            src="/resources/ai-recruiting-os.webp"
                            alt="AI Recruiting Operating System architecture diagram"
                            width={900}
                            height={900}
                            className="w-full h-auto"
                            priority
                        />
                    </div>

                    {/* What the system can do */}
                    <div className="bg-[#FAFAFA] border border-[#E5E5E5] rounded-2xl p-6 sm:p-8 mb-8">
                        <p className="text-[10px] font-bold tracking-widest uppercase text-[#FF6A00] mb-5">
                            What The System Can Do
                        </p>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                            {CAPABILITIES.map((cap, idx) => (
                                <div key={cap} className="flex items-start gap-3 text-sm text-[#374151]">
                                    <span className="mt-0.5 flex-shrink-0 w-6 h-6 rounded-full bg-[#FFF4EB] border border-[#FFD9B8] flex items-center justify-center text-[10px] font-bold text-[#FF6A00]">
                                        {String(idx + 1).padStart(2, '0')}
                                    </span>
                                    <span className="font-medium pt-0.5">{cap}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* 4 Architecture layers */}
                    <div className="mb-8">
                        <p className="text-[10px] font-bold tracking-widest uppercase text-[#FF6A00] mb-5">
                            The 4 Core Layers
                        </p>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            {SYSTEM_LAYERS.map((layer, idx) => (
                                <div key={layer.title} className="bg-white border border-[#E5E5E5] rounded-2xl p-5 hover:border-[#FF6A00]/30 hover:shadow-sm transition-all">
                                    <span className="inline-block text-[10px] font-bold text-[#FF6A00] bg-[#FFF4EB] border border-[#FFD9B8] rounded-full w-6 h-6 flex items-center justify-center mb-3">
                                        {String(idx + 1)}
                                    </span>
                                    <h3 className="text-sm font-bold text-[#0A0A0A] mb-1">{layer.title}</h3>
                                    <p className="text-xs text-[#6B7280] leading-relaxed">{layer.desc}</p>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* What's included */}
                    <div className="bg-[#FAFAFA] border border-[#E5E5E5] rounded-2xl p-6 sm:p-8 mb-8">
                        <p className="text-[10px] font-bold tracking-widest uppercase text-[#FF6A00] mb-5">
                            What&apos;s Included
                        </p>
                        <ul className="space-y-4">
                            {WHAT_YOU_GET.map((item, idx) => (
                                <li key={item.label} className="flex items-start gap-3 text-sm text-[#374151]">
                                    <span className="mt-0.5 flex-shrink-0 w-6 h-6 rounded-full bg-[#FFF4EB] border border-[#FFD9B8] flex items-center justify-center text-[10px] font-bold text-[#FF6A00]">
                                        {String(idx + 1).padStart(2, '0')}
                                    </span>
                                    <div>
                                        <span className="font-semibold text-[#0A0A0A] block">{item.label}</span>
                                        <span className="text-[#6B7280]">{item.desc}</span>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div className="bg-white border border-[#E5E5E5] rounded-2xl p-6 mb-10">
                        <h3 className="text-sm font-bold text-[#0A0A0A] uppercase tracking-wider mb-2">The Result</h3>
                        <p className="text-sm text-[#4B5563]">
                            Recruiters spend less time on repetitive admin work and more time building relationships with candidates and clients. One recruiter can manage the workload that previously required an entire team.
                        </p>
                    </div>

                    <a
                        href={NOTION_URL}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-full flex items-center justify-center gap-2 px-6 py-4 bg-[#0A0A0A] hover:bg-[#FF6A00] text-white text-sm font-bold rounded-xl transition-all duration-300 shadow-sm hover:shadow-md hover:-translate-y-0.5 group"
                    >
                        Open Full AI Recruiting OS in Notion
                        <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                        </svg>
                    </a>
                </div>
            </section>
        );
    }

    // GATE VIEW
    const inputCls =
        'w-full border border-[#E5E5E5] rounded-xl px-4 py-2.5 text-sm outline-none focus:border-[#0A0A0A] focus:ring-2 focus:ring-black/5 transition-all text-[#0A0A0A] bg-white placeholder:text-[#9CA3AF]';

    return (
        <section className="min-h-screen bg-[#F9FAFB]">
            <div className="max-w-2xl mx-auto px-4 pt-4 pb-10 sm:pt-6 sm:pb-14">

                <div className="mb-8">
                    <div className="flex items-center justify-between mb-5">
                        <Link
                            href="/resources"
                            className="text-xs font-bold uppercase tracking-widest text-[#9CA3AF] hover:text-[#FF6A00] transition-colors"
                        >
                            &larr; All Resources
                        </Link>
                        <div className="inline-flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest px-3 py-1.5 rounded-full bg-[#FFF4EB] border border-[#FFD9B8] text-[#FF6A00]">
                            <span className="w-1.5 h-1.5 rounded-full bg-[#FF6A00] animate-pulse" />
                            Free Access
                        </div>
                    </div>

                    <p className="text-xs font-bold text-[#FF6A00] uppercase tracking-widest mb-2">AI Recruiting OS</p>
                    <h1 className="text-2xl sm:text-3xl font-bold text-[#0A0A0A] mb-4 leading-tight tracking-tight">
                        I built an AI Recruiting Operating System with Claude Code. Not another chatbot. A system.
                    </h1>

                    <div className="relative w-full rounded-2xl overflow-hidden border border-[#E5E5E5] shadow-sm mb-6 bg-[#0A0A0A]">
                        <Image
                            src="/resources/ai-recruiting-os.webp"
                            alt="AI Recruiting Operating System powered by Claude Code"
                            width={900}
                            height={900}
                            className="w-full h-auto"
                            priority
                        />
                    </div>

                    <p className="text-[#6B7280] text-sm sm:text-base leading-relaxed mb-5">
                        This system combines Claude Code, MCP, Knowledge Base, Recruiting Skills, and AI Agents into one complete recruiting operating system.
                    </p>

                    <ul className="space-y-2 mb-6">
                        {[
                            'Parse resumes, source & match candidates automatically',
                            '5 specialized AI agents working together as a team',
                            '15 recruiting skills — from outreach to client reports',
                            'MCP connectors for ATS, LinkedIn, Gmail, Apollo & more',
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

                    <p className="text-[#6B7280] text-sm font-semibold">
                        Enter your details to get free access to the complete AI Recruiter System and Skills Pack.
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
                                Continue &rarr;
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
                                {loading ? 'Unlocking…' : 'Get Free Access →'}
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
