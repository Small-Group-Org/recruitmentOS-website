'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { leadService } from '@/services/lead.service';

const PDF_URL = '/resources/the-founders-guide-16-steps.pdf';
const CAL_URL = 'https://cal.com/tusharm/30min?user=tusharm';

declare global {
    interface Window {
        fbq?: (...args: unknown[]) => void;
    }
}

interface AuditItem {
    id: string;
    label: string;
    description: string;
}

const AUDIT_CRITERIA: AuditItem[] = [
    {
        id: 'domains',
        label: 'Domain Isolation & DNS Shielding',
        description: 'Outbound runs strictly through 3–5 secondary mirror domains with strict SPF, DKIM, and DMARC. Agency root domain is completely protected.',
    },
    {
        id: 'signals',
        label: 'Signal-Led Targeting Triggers',
        description: 'Prospect lists are generated from event triggers (60+ day aged vacancies, new executive hires, funding rounds), not static scraping.',
    },
    {
        id: 'hygiene',
        label: 'Waterfall Email Verification',
        description: 'Every contact undergoes multi-stage API and SMTP handshake verification before sending, maintaining bounce rates strictly below 2%.',
    },
    {
        id: 'protection',
        label: 'Recruiter Time Protection',
        description: 'Recruiters spend zero hours per week on manual lead generation, directory browsing, or cold messaging.',
    },
    {
        id: 'handoff',
        label: 'Strict Qualified Handoff Protocol',
        description: 'Consultants and recruiters engage only after a vetted hiring manager books a call or explicitly requests a candidate shortlist.',
    },
];

export default function FoundersGuideClient() {
    // Audit checklist state
    const [checkedItems, setCheckedItems] = useState<Record<string, boolean>>({});

    // Lead capture form state
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [website, setWebsite] = useState('');
    const [headache, setHeadache] = useState('');
    const [submitting, setSubmitting] = useState(false);
    const [submitted, setSubmitted] = useState(false);
    const [formError, setFormError] = useState('');

    const toggleAudit = (id: string) => {
        setCheckedItems(prev => ({
            ...prev,
            [id]: !prev[id],
        }));
    };

    const auditScore = Object.values(checkedItems).filter(Boolean).length;

    const trackDownload = (action: string) => {
        try {
            if (typeof window !== 'undefined' && window.fbq) {
                window.fbq('track', 'Lead', {
                    content_name: 'the_founders_guide_16_steps',
                    content_category: 'resource_download',
                    action_type: action,
                });
            }
        } catch {
            // non-blocking
        }
    };

    const handleFormSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!name.trim() || !email.trim()) return;

        setSubmitting(true);
        setFormError('');

        try {
            await leadService.createLead({
                name: name.trim(),
                email: email.trim(),
                company: website.trim() || undefined,
                source: 'resource_founders_guide',
                headaches: headache ? [headache] : ['Architecture Consultation Request'],
            });

            try {
                localStorage.setItem('rOS_unlocked', 'true');
            } catch {
                // non-blocking
            }

            trackDownload('audit_request');
            setSubmitted(true);
        } catch {
            setFormError('Unable to send request. Please schedule directly via Cal.com.');
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <article className="min-h-screen bg-white">
            {/* Top Announcement Bar */}
            <div className="bg-[#0A0A0A] text-white py-2.5 px-4 text-center text-xs sm:text-sm font-medium border-b border-[#262626]">
                <div className="max-w-[1200px] mx-auto flex flex-wrap items-center justify-center gap-2">
                    <span className="inline-flex items-center gap-1.5 text-[#FF6A00] font-mono text-xs uppercase tracking-wider font-semibold">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#FF6A00] animate-pulse" />
                        Confidential Strategic Asset
                    </span>
                    <span className="text-[#A1A1AA] hidden sm:inline">|</span>
                    <span className="text-gray-300">
                        Boutique Search & Staffing Blueprint (£30K–£500K/mo)
                    </span>
                    <a
                        href={PDF_URL}
                        download="The_Founders_Guide_16_Steps.pdf"
                        onClick={() => trackDownload('top_bar_download')}
                        className="text-[#FF6A00] hover:text-white font-semibold underline decoration-[#FF6A00] ml-1 transition-colors"
                    >
                        Download PDF (8 Pages) →
                    </a>
                </div>
            </div>

            <div className="pt-8 sm:pt-12 pb-24 max-w-[1140px] mx-auto px-4 sm:px-6 md:px-8">
                {/* Back Link */}
                <Link
                    href="/resources"
                    className="inline-flex items-center text-xs font-mono font-bold tracking-wider uppercase text-[#0A0A0A] hover:text-[#FF6A00] transition-colors mb-8 sm:mb-12 group"
                >
                    <svg className="mr-2 w-4 h-4 transform group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                    </svg>
                    ALL RESOURCES
                </Link>

                {/* Eyebrow & Metadata */}
                <div className="flex flex-wrap items-center gap-2 sm:gap-3 mb-6">
                    <span className="text-[11px] font-mono font-bold uppercase tracking-widest text-[#FF6A00] bg-[#FFF4EB] px-3 py-1.5 rounded-[4px] border border-[#FF6A00]/20">
                        Architecture Series · Asset #01A
                    </span>
                    <span className="text-[11px] font-mono font-medium text-[#6B7280] bg-[#FAFAFA] px-2.5 py-1.5 rounded-[4px] border border-[#E5E5E5]">
                        8-Page Implementation Blueprint
                    </span>
                    <span className="text-[11px] font-mono font-medium text-[#1A6B4A] bg-[#E8F5EF] px-2.5 py-1.5 rounded-[4px] border border-[#1A6B4A]/20">
                        100% Free · No Paywall
                    </span>
                </div>

                {/* Main Hero Header */}
                <header className="mb-10 sm:mb-14">
                    <h1
                        className="text-3xl sm:text-5xl md:text-6xl font-normal text-[#0A0A0A] leading-[1.08] tracking-tight mb-6"
                        style={{ fontFamily: 'var(--font-serif)' }}
                    >
                        The Founder&apos;s Guide to Finding New Clients Every Week
                    </h1>
                    <p className="text-lg sm:text-xl text-[#6B7280] max-w-3xl leading-relaxed mb-8">
                        A 16-step outbound architecture that takes boutique recruitment agencies from cold, manual BD to a systematic, autonomous client-acquisition engine.
                    </p>

                    {/* Primary Action Buttons */}
                    <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 pt-2">
                        <a
                            href={PDF_URL}
                            download="The_Founders_Guide_16_Steps.pdf"
                            onClick={() => trackDownload('hero_download_button')}
                            className="inline-flex items-center justify-center gap-2.5 px-6 py-4 bg-[#FF6A00] hover:bg-[#E55F00] text-white font-medium text-base rounded-[4px] shadow-sm hover:shadow-md transition-all active:scale-[0.99] text-center"
                        >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                            </svg>
                            <span>Download 16-Step PDF</span>
                            <span className="text-xs bg-black/20 px-2 py-0.5 rounded font-mono">20 KB</span>
                        </a>

                        <a
                            href={PDF_URL}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={() => trackDownload('hero_read_browser')}
                            className="inline-flex items-center justify-center gap-2 px-6 py-4 bg-[#FAFAFA] hover:bg-gray-100 text-[#0A0A0A] font-medium text-base border border-[#E5E5E5] rounded-[4px] transition-all text-center"
                        >
                            <svg className="w-5 h-5 text-[#6B7280]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                            </svg>
                            <span>Read in Browser</span>
                        </a>

                        <a
                            href={CAL_URL}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center justify-center gap-2 px-6 py-4 bg-white hover:bg-[#FFF4EB] text-[#FF6A00] font-medium text-base border border-[#FF6A00]/30 rounded-[4px] transition-all text-center"
                        >
                            <span>Book Architecture Call</span>
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                            </svg>
                        </a>
                    </div>
                </header>

                {/* Hero PDF Card Showcase */}
                <div className="bg-[#FAFAFA] border border-[#E5E5E5] rounded-[10px] p-6 sm:p-10 mb-16 relative overflow-hidden">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                        <div className="lg:col-span-7 space-y-5">
                            <div className="inline-flex items-center gap-2 text-xs font-mono font-bold uppercase text-[#FF6A00] tracking-wider">
                                <span className="w-2 h-2 rounded-full bg-[#FF6A00]" />
                                Asset Specifications
                            </div>
                            <h2
                                className="text-2xl sm:text-3xl font-normal text-[#0A0A0A] leading-tight"
                                style={{ fontFamily: 'var(--font-serif)' }}
                            >
                                What makes this guide different from generic recruitment BD advice?
                            </h2>
                            <p className="text-[#6B7280] text-sm sm:text-base leading-relaxed">
                                Most guides tell agency founders to &ldquo;build relationships and work harder.&rdquo; Not a single one gives you the actual infrastructure blueprint: the DNS configuration, the waterfall enrichment cascade, the live hiring signals, and the qualification firewall required to generate clients every single week without taking billers off placements.
                            </p>

                            <div className="grid grid-cols-2 gap-3 sm:gap-4 pt-2">
                                <div className="border border-[#E5E5E5] bg-white p-3.5 rounded-[4px]">
                                    <div className="text-xs font-mono text-[#6B7280] uppercase">Target Scope</div>
                                    <div className="text-sm font-bold text-[#0A0A0A] mt-0.5">£30K → £500K/mo</div>
                                </div>
                                <div className="border border-[#E5E5E5] bg-white p-3.5 rounded-[4px]">
                                    <div className="text-xs font-mono text-[#6B7280] uppercase">Delivery Format</div>
                                    <div className="text-sm font-bold text-[#0A0A0A] mt-0.5">Vector PDF (8 Pages)</div>
                                </div>
                                <div className="border border-[#E5E5E5] bg-white p-3.5 rounded-[4px]">
                                    <div className="text-xs font-mono text-[#6B7280] uppercase">Phases Included</div>
                                    <div className="text-sm font-bold text-[#0A0A0A] mt-0.5">4 Core Engines</div>
                                </div>
                                <div className="border border-[#E5E5E5] bg-white p-3.5 rounded-[4px]">
                                    <div className="text-xs font-mono text-[#6B7280] uppercase">Recruiter Prospecting</div>
                                    <div className="text-sm font-bold text-[#1A6B4A] mt-0.5">0 Hours Required</div>
                                </div>
                            </div>
                        </div>

                        {/* Visual PDF cover preview */}
                        <div className="lg:col-span-5 flex justify-center">
                            <div className="relative group max-w-[320px] w-full">
                                <div className="relative rounded-[6px] overflow-hidden border border-[#D1D5DB] shadow-lg transition-transform duration-300 group-hover:-translate-y-1">
                                    <Image
                                        src="/resources/founders-guide.webp"
                                        alt="The Founder's Guide to Finding New Clients Every Week - PDF Cover"
                                        width={600}
                                        height={780}
                                        className="w-full h-auto object-cover"
                                        priority
                                    />
                                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center p-4">
                                        <a
                                            href={PDF_URL}
                                            download="The_Founders_Guide_16_Steps.pdf"
                                            onClick={() => trackDownload('cover_hover_download')}
                                            className="px-4 py-2.5 bg-[#FF6A00] hover:bg-[#E55F00] text-white font-medium text-xs rounded-[4px] shadow font-mono tracking-wider uppercase flex items-center gap-2"
                                        >
                                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                                            </svg>
                                            Download Free PDF
                                        </a>
                                    </div>
                                </div>
                                <p className="text-center text-xs font-mono text-[#6B7280] mt-3">
                                    Official RecruitmentOS Strategy Document ROS-ENG-01A
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Evidence Registry: Real Audited Proof Cases */}
                <section className="mb-20">
                    <div className="mb-8">
                        <div className="text-xs font-mono font-bold uppercase tracking-wider text-[#FF6A00] mb-2">
                            Evidence Registry
                        </div>
                        <h2
                            className="text-2xl sm:text-3xl font-normal text-[#0A0A0A]"
                            style={{ fontFamily: 'var(--font-serif)' }}
                        >
                            Audited benchmarks from agencies running this exact architecture
                        </h2>
                        <p className="text-[#6B7280] text-sm mt-1">
                            Real operating metrics from live boutique search and staffing firms — not hypothetical projections.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                        <div className="border border-[#E5E5E5] bg-[#FAFAFA] p-5 rounded-[8px] flex flex-col justify-between">
                            <div>
                                <span className="text-[10px] font-mono uppercase tracking-wider text-[#6B7280] block mb-2">case_uk_01</span>
                                <div className="text-2xl font-bold text-[#0A0A0A] font-mono leading-tight mb-1">
                                    24 Meetings
                                </div>
                                <div className="text-sm font-semibold text-[#1A6B4A] mb-3">
                                    £180K Pipeline Created
                                </div>
                                <p className="text-xs text-[#6B7280] leading-relaxed">
                                    Generated across 60 days with £0 ad spend for a boutique UK Tech & Data Search firm.
                                </p>
                            </div>
                            <div className="mt-4 pt-3 border-t border-[#E5E5E5] text-[11px] font-mono text-[#0A0A0A]">
                                Verified 60-Day Sprint
                            </div>
                        </div>

                        <div className="border border-[#E5E5E5] bg-[#FAFAFA] p-5 rounded-[8px] flex flex-col justify-between">
                            <div>
                                <span className="text-[10px] font-mono uppercase tracking-wider text-[#6B7280] block mb-2">case_de_01</span>
                                <div className="text-2xl font-bold text-[#0A0A0A] font-mono leading-tight mb-1">
                                    169 Opps
                                </div>
                                <div className="text-sm font-semibold text-[#1A6B4A] mb-3">
                                    42 Booked Calls · 3–4x Impact
                                </div>
                                <p className="text-xs text-[#6B7280] leading-relaxed">
                                    10,000 verified tech leads yielding 1,300 email replies and 3–4x net revenue impact in DACH tech search.
                                </p>
                            </div>
                            <div className="mt-4 pt-3 border-t border-[#E5E5E5] text-[11px] font-mono text-[#0A0A0A]">
                                DACH Search Firm
                            </div>
                        </div>

                        <div className="border border-[#E5E5E5] bg-[#FAFAFA] p-5 rounded-[8px] flex flex-col justify-between">
                            <div>
                                <span className="text-[10px] font-mono uppercase tracking-wider text-[#6B7280] block mb-2">case_justin_orion</span>
                                <div className="text-2xl font-bold text-[#0A0A0A] font-mono leading-tight mb-1">
                                    4 Hrs/Day
                                </div>
                                <div className="text-sm font-semibold text-[#1A6B4A] mb-3">
                                    Saved for Agency Founder
                                </div>
                                <p className="text-xs text-[#6B7280] leading-relaxed">
                                    Automated core outbound sourcing and qualification workflows for Orion Search, unlocking biller bandwidth.
                                </p>
                            </div>
                            <div className="mt-4 pt-3 border-t border-[#E5E5E5] text-[11px] font-mono text-[#0A0A0A]">
                                Orion Search
                            </div>
                        </div>

                        <div className="border border-[#E5E5E5] bg-[#FAFAFA] p-5 rounded-[8px] flex flex-col justify-between">
                            <div>
                                <span className="text-[10px] font-mono uppercase tracking-wider text-[#6B7280] block mb-2">case_uk_02</span>
                                <div className="text-2xl font-bold text-[#0A0A0A] font-mono leading-tight mb-1">
                                    3 Mandates
                                </div>
                                <div className="text-sm font-semibold text-[#1A6B4A] mb-3">
                                    7 Executive Dialogues
                                </div>
                                <p className="text-xs text-[#6B7280] leading-relaxed">
                                    Generated from an dormant client database reactivation sprint in under 14 days.
                                </p>
                            </div>
                            <div className="mt-4 pt-3 border-t border-[#E5E5E5] text-[11px] font-mono text-[#0A0A0A]">
                                UK IT Staffing
                            </div>
                        </div>
                    </div>
                </section>

                {/* The Paradigm Shift: Full-Desk Trap vs. Decoupled 16-Step Engine */}
                <section className="mb-20">
                    <div className="mb-8">
                        <div className="text-xs font-mono font-bold uppercase tracking-wider text-[#FF6A00] mb-2">
                            Structural Diagnosis
                        </div>
                        <h2
                            className="text-2xl sm:text-3xl font-normal text-[#0A0A0A]"
                            style={{ fontFamily: 'var(--font-serif)' }}
                        >
                            The Full-Desk Trap vs. The Decoupled 16-Step Engine
                        </h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Old Way */}
                        <div className="border border-red-200 bg-[#FFFDFD] p-6 sm:p-8 rounded-[8px] relative">
                            <div className="flex items-center gap-2 mb-4">
                                <span className="w-5 h-5 rounded-full bg-red-100 text-red-600 flex items-center justify-center font-bold text-xs">✕</span>
                                <span className="font-mono text-xs font-bold uppercase tracking-wider text-red-700">The Traditional Full-Desk Trap</span>
                            </div>
                            <p className="text-sm text-[#0A0A0A] font-medium mb-4">
                                Recruiters burning 12–15 hours every week scraping stale directories, copy-pasting InMails, and chasing cold leads.
                            </p>
                            <ul className="space-y-3 text-xs sm:text-sm text-[#6B7280]">
                                <li className="flex items-start gap-2">
                                    <span className="text-red-500 mt-0.5">•</span>
                                    <span><strong>Severe feast-or-famine cycles:</strong> Whenever billers get placements, BD stops. Two months later, pipeline dries up.</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <span className="text-red-500 mt-0.5">•</span>
                                    <span><strong>Root domain destruction:</strong> Blasting cold emails from the company website damages primary Google/Outlook inbox health.</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <span className="text-red-500 mt-0.5">•</span>
                                    <span><strong>Expensive recruiter burnout:</strong> High-commission billers waste half their working hours doing low-leverage research.</span>
                                </li>
                            </ul>
                        </div>

                        {/* New Way */}
                        <div className="border border-[#1A6B4A]/30 bg-[#F6FAF7] p-6 sm:p-8 rounded-[8px] relative">
                            <div className="flex items-center gap-2 mb-4">
                                <span className="w-5 h-5 rounded-full bg-[#E8F5EF] text-[#1A6B4A] flex items-center justify-center font-bold text-xs">✓</span>
                                <span className="font-mono text-xs font-bold uppercase tracking-wider text-[#1A6B4A]">The Decoupled 16-Step Engine</span>
                            </div>
                            <p className="text-sm text-[#0A0A0A] font-medium mb-4">
                                Zero hours of recruiter prospecting. Live hiring signals feed an isolated, multi-mailbox outbound infrastructure automatically.
                            </p>
                            <ul className="space-y-3 text-xs sm:text-sm text-[#6B7280]">
                                <li className="flex items-start gap-2">
                                    <span className="text-[#1A6B4A] mt-0.5">•</span>
                                    <span><strong>Predictable weekly meetings:</strong> Signal triggers (60+ day reqs, new hires) keep outreach timely and relevant.</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <span className="text-[#1A6B4A] mt-0.5">•</span>
                                    <span><strong>100% domain insulation:</strong> Outbound runs through secondary mirror domains, keeping root deliverability flawless.</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <span className="text-[#1A6B4A] mt-0.5">•</span>
                                    <span><strong>Pure recruiter handoff:</strong> Recruiters step in <em>only</em> when a vetted hiring manager books a call or requests a shortlist.</span>
                                </li>
                            </ul>
                        </div>
                    </div>
                </section>

                {/* The 4 Foundation Questions */}
                <section className="mb-20 bg-[#FAFAFA] border border-[#E5E5E5] rounded-[10px] p-6 sm:p-10">
                    <div className="max-w-2xl mb-8">
                        <div className="text-xs font-mono font-bold uppercase tracking-wider text-[#FF6A00] mb-2">
                            First-Principles Architecture
                        </div>
                        <h2
                            className="text-2xl sm:text-3xl font-normal text-[#0A0A0A]"
                            style={{ fontFamily: 'var(--font-serif)' }}
                        >
                            The 4 questions every scaling agency must solve
                        </h2>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        <div className="bg-white border border-[#E5E5E5] p-5 rounded-[6px]">
                            <div className="font-mono text-xs font-bold text-[#FF6A00] uppercase mb-1">Question 01</div>
                            <h3 className="text-base font-bold text-[#0A0A0A] mb-2">Which accounts are hiring right now?</h3>
                            <p className="text-xs sm:text-sm text-[#6B7280] leading-relaxed">
                                Don&apos;t wait for vacancies to become public job boards. Monitor 60+ day aged unfilled seats, newly appointed VPs in their first 90 days, and capital raises.
                            </p>
                        </div>

                        <div className="bg-white border border-[#E5E5E5] p-5 rounded-[6px]">
                            <div className="font-mono text-xs font-bold text-[#FF6A00] uppercase mb-1">Question 02</div>
                            <h3 className="text-base font-bold text-[#0A0A0A] mb-2">How do you protect domain health?</h3>
                            <p className="text-xs sm:text-sm text-[#6B7280] leading-relaxed">
                                Never send cold outbound from your primary corporate domain. Route volume through 3–5 mirror domains with 2048-bit DKIM, SPF, and DMARC enforcement.
                            </p>
                        </div>

                        <div className="bg-white border border-[#E5E5E5] p-5 rounded-[6px]">
                            <div className="font-mono text-xs font-bold text-[#FF6A00] uppercase mb-1">Question 03</div>
                            <h3 className="text-base font-bold text-[#0A0A0A] mb-2">What signal makes your email timely?</h3>
                            <p className="text-xs sm:text-sm text-[#6B7280] leading-relaxed">
                                Avoid generic &ldquo;we are a premier staffing firm&rdquo; pitches. Use the 3-part formula: (1) Trigger context, (2) Business cost observation, (3) Diagnostic invite.
                            </p>
                        </div>

                        <div className="bg-white border border-[#E5E5E5] p-5 rounded-[6px]">
                            <div className="font-mono text-xs font-bold text-[#FF6A00] uppercase mb-1">Question 04</div>
                            <h3 className="text-base font-bold text-[#0A0A0A] mb-2">Who qualifies replies before recruiters see them?</h3>
                            <p className="text-xs sm:text-sm text-[#6B7280] leading-relaxed">
                                Triage responses on a &lt;24h SLA. Positive replies get routed to calendar booking; noise is filtered out so recruiters only touch high-intent opportunities.
                            </p>
                        </div>
                    </div>
                </section>

                {/* The 16 Steps Broken Down across 4 Phases */}
                <section className="mb-20">
                    <div className="mb-10">
                        <div className="text-xs font-mono font-bold uppercase tracking-wider text-[#FF6A00] mb-2">
                            The 16-Step Blueprint
                        </div>
                        <h2
                            className="text-2xl sm:text-4xl font-normal text-[#0A0A0A]"
                            style={{ fontFamily: 'var(--font-serif)' }}
                        >
                            The Complete 4-Phase System Architecture
                        </h2>
                        <p className="text-[#6B7280] text-base mt-2 max-w-3xl">
                            Each phase builds directly upon the previous one. Follow this sequence to replace manual prospecting with a reliable client engine.
                        </p>
                    </div>

                    <div className="space-y-12">
                        {/* Phase 1 */}
                        <div className="border border-[#E5E5E5] rounded-[10px] overflow-hidden bg-white">
                            <div className="bg-[#FAFAFA] border-b border-[#E5E5E5] p-5 sm:p-6 flex flex-wrap items-center justify-between gap-4">
                                <div>
                                    <div className="text-xs font-mono font-bold uppercase tracking-wider text-[#FF6A00]">
                                        Phase 1 of 4 · Steps 01–04
                                    </div>
                                    <h3
                                        className="text-xl sm:text-2xl font-normal text-[#0A0A0A] mt-1"
                                        style={{ fontFamily: 'var(--font-serif)' }}
                                    >
                                        Input Engine: Intent & Signal Sourcing
                                    </h3>
                                </div>
                                <span className="text-xs font-mono px-3 py-1 bg-white border border-[#E5E5E5] rounded text-[#6B7280]">
                                    Live Event Triggers
                                </span>
                            </div>
                            <div className="p-6 sm:p-8 grid grid-cols-1 sm:grid-cols-2 gap-6">
                                <div className="border-l-2 border-[#FF6A00] pl-4">
                                    <div className="text-xs font-mono font-bold text-[#FF6A00]">STEP 01</div>
                                    <h4 className="text-base font-bold text-[#0A0A0A] mt-0.5 mb-1.5">Track 60+ Day Aged Vacancies</h4>
                                    <p className="text-xs sm:text-sm text-[#6B7280] leading-relaxed">
                                        Scrape open technical requisitions that have sat unfilled for 60+ days. Focuses on the acute operational bottleneck of an empty seat.
                                    </p>
                                </div>
                                <div className="border-l-2 border-[#FF6A00] pl-4">
                                    <div className="text-xs font-mono font-bold text-[#FF6A00]">STEP 02</div>
                                    <h4 className="text-base font-bold text-[#0A0A0A] mt-0.5 mb-1.5">Monitor Leadership Appointments</h4>
                                    <p className="text-xs sm:text-sm text-[#6B7280] leading-relaxed">
                                        Identify newly appointed VPs of Engineering and Heads of Talent within their first 90 days in seat — their prime window to evaluate new agency partners.
                                    </p>
                                </div>
                                <div className="border-l-2 border-[#FF6A00] pl-4">
                                    <div className="text-xs font-mono font-bold text-[#FF6A00]">STEP 03</div>
                                    <h4 className="text-base font-bold text-[#0A0A0A] mt-0.5 mb-1.5">Flag Series A/B Capital Rounds</h4>
                                    <p className="text-xs sm:text-sm text-[#6B7280] leading-relaxed">
                                        Monitor fresh capital deployments carrying urgent 12–18 month hiring milestones committed to investors.
                                    </p>
                                </div>
                                <div className="border-l-2 border-[#FF6A00] pl-4">
                                    <div className="text-xs font-mono font-bold text-[#FF6A00]">STEP 04</div>
                                    <h4 className="text-base font-bold text-[#0A0A0A] mt-0.5 mb-1.5">Detect Tech Modernization Shifts</h4>
                                    <p className="text-xs sm:text-sm text-[#6B7280] leading-relaxed">
                                        Watch for cloud, data, and AI stack transitions — a leading indicator of specialized headcount need before reqs go public.
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Phase 2 */}
                        <div className="border border-[#E5E5E5] rounded-[10px] overflow-hidden bg-white">
                            <div className="bg-[#FAFAFA] border-b border-[#E5E5E5] p-5 sm:p-6 flex flex-wrap items-center justify-between gap-4">
                                <div>
                                    <div className="text-xs font-mono font-bold uppercase tracking-wider text-[#FF6A00]">
                                        Phase 2 of 4 · Steps 05–08
                                    </div>
                                    <h3
                                        className="text-xl sm:text-2xl font-normal text-[#0A0A0A] mt-1"
                                        style={{ fontFamily: 'var(--font-serif)' }}
                                    >
                                        Hygiene Engine: Verification & DNS Protection
                                    </h3>
                                </div>
                                <span className="text-xs font-mono px-3 py-1 bg-white border border-[#E5E5E5] rounded text-[#6B7280]">
                                    Sub-2% Bounce Guarantee
                                </span>
                            </div>
                            <div className="p-6 sm:p-8 grid grid-cols-1 sm:grid-cols-2 gap-6">
                                <div className="border-l-2 border-[#0A0A0A] pl-4">
                                    <div className="text-xs font-mono font-bold text-[#0A0A0A]">STEP 05</div>
                                    <h4 className="text-base font-bold text-[#0A0A0A] mt-0.5 mb-1.5">Run 3-Stage Waterfall Verification</h4>
                                    <p className="text-xs sm:text-sm text-[#6B7280] leading-relaxed">
                                        Cascade API lookups into a deep SMTP handshake check on every contact prior to any send. Enforces bounce rates strictly under 2%.
                                    </p>
                                </div>
                                <div className="border-l-2 border-[#0A0A0A] pl-4">
                                    <div className="text-xs font-mono font-bold text-[#0A0A0A]">STEP 06</div>
                                    <h4 className="text-base font-bold text-[#0A0A0A] mt-0.5 mb-1.5">Deploy Secondary Mirror Domains</h4>
                                    <p className="text-xs sm:text-sm text-[#6B7280] leading-relaxed">
                                        Route all outbound traffic through 3–5 dedicated lookalike domains. Zero cold volume ever touches the agency&apos;s primary website.
                                    </p>
                                </div>
                                <div className="border-l-2 border-[#0A0A0A] pl-4">
                                    <div className="text-xs font-mono font-bold text-[#0A0A0A]">STEP 07</div>
                                    <h4 className="text-base font-bold text-[#0A0A0A] mt-0.5 mb-1.5">Lock In Cryptographic Protocols</h4>
                                    <p className="text-xs sm:text-sm text-[#6B7280] leading-relaxed">
                                        Enforce SPF, 2048-bit DKIM, DMARC at quarantine/reject, and custom SSL CNAME tracking records on every outbound inbox.
                                    </p>
                                </div>
                                <div className="border-l-2 border-[#0A0A0A] pl-4">
                                    <div className="text-xs font-mono font-bold text-[#0A0A0A]">STEP 08</div>
                                    <h4 className="text-base font-bold text-[#0A0A0A] mt-0.5 mb-1.5">Warm Up and Throttle Sending</h4>
                                    <p className="text-xs sm:text-sm text-[#6B7280] leading-relaxed">
                                        Ramp new mailboxes over a 14–21 day window, capping volume at 25–30 sends per inbox daily before scaling to full capacity.
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Phase 3 */}
                        <div className="border border-[#E5E5E5] rounded-[10px] overflow-hidden bg-white">
                            <div className="bg-[#FAFAFA] border-b border-[#E5E5E5] p-5 sm:p-6 flex flex-wrap items-center justify-between gap-4">
                                <div>
                                    <div className="text-xs font-mono font-bold uppercase tracking-wider text-[#FF6A00]">
                                        Phase 3 of 4 · Steps 09–12
                                    </div>
                                    <h3
                                        className="text-xl sm:text-2xl font-normal text-[#0A0A0A] mt-1"
                                        style={{ fontFamily: 'var(--font-serif)' }}
                                    >
                                        Conversion Engine: Outreach & Qualified Handoff
                                    </h3>
                                </div>
                                <span className="text-xs font-mono px-3 py-1 bg-white border border-[#E5E5E5] rounded text-[#6B7280]">
                                    Multichannel Aircover
                                </span>
                            </div>
                            <div className="p-6 sm:p-8 grid grid-cols-1 sm:grid-cols-2 gap-6">
                                <div className="border-l-2 border-[#FF6A00] pl-4">
                                    <div className="text-xs font-mono font-bold text-[#FF6A00]">STEP 09</div>
                                    <h4 className="text-base font-bold text-[#0A0A0A] mt-0.5 mb-1.5">Rotate Across a Multi-Inbox Engine</h4>
                                    <p className="text-xs sm:text-sm text-[#6B7280] leading-relaxed">
                                        Distribute sending across 10–15 mailboxes, delivering 250–400 touches daily without concentrating sender risk on any single account.
                                    </p>
                                </div>
                                <div className="border-l-2 border-[#FF6A00] pl-4">
                                    <div className="text-xs font-mono font-bold text-[#FF6A00]">STEP 10</div>
                                    <h4 className="text-base font-bold text-[#0A0A0A] mt-0.5 mb-1.5">Write Signal-Led Copy</h4>
                                    <p className="text-xs sm:text-sm text-[#6B7280] leading-relaxed">
                                        Execute the 3-part framework: (1) Context around the trigger, (2) Observation of operational cost, (3) Low-friction diagnostic invite.
                                    </p>
                                </div>
                                <div className="border-l-2 border-[#FF6A00] pl-4">
                                    <div className="text-xs font-mono font-bold text-[#FF6A00]">STEP 11</div>
                                    <h4 className="text-base font-bold text-[#0A0A0A] mt-0.5 mb-1.5">Layer Multichannel Aircover</h4>
                                    <p className="text-xs sm:text-sm text-[#6B7280] leading-relaxed">
                                        Pair email delivery with soft LinkedIn profile touches and content warming so your name is recognized before the message arrives.
                                    </p>
                                </div>
                                <div className="border-l-2 border-[#FF6A00] pl-4">
                                    <div className="text-xs font-mono font-bold text-[#FF6A00]">STEP 12</div>
                                    <h4 className="text-base font-bold text-[#0A0A0A] mt-0.5 mb-1.5">Triage Replies on a &lt;24h SLA</h4>
                                    <p className="text-xs sm:text-sm text-[#6B7280] leading-relaxed">
                                        Positive replies get tagged and routed immediately into booking flows; out-of-office and negative responses are cleanly suppressed.
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Phase 4 */}
                        <div className="border border-[#E5E5E5] rounded-[10px] overflow-hidden bg-white">
                            <div className="bg-[#FAFAFA] border-b border-[#E5E5E5] p-5 sm:p-6 flex flex-wrap items-center justify-between gap-4">
                                <div>
                                    <div className="text-xs font-mono font-bold uppercase tracking-wider text-[#FF6A00]">
                                        Phase 4 of 4 · Steps 13–16
                                    </div>
                                    <h3
                                        className="text-xl sm:text-2xl font-normal text-[#0A0A0A] mt-1"
                                        style={{ fontFamily: 'var(--font-serif)' }}
                                    >
                                        Handoff & Audit: Recruiter Protection & Continuous Review
                                    </h3>
                                </div>
                                <span className="text-xs font-mono px-3 py-1 bg-white border border-[#E5E5E5] rounded text-[#6B7280]">
                                    Zero Recruiter Admin
                                </span>
                            </div>
                            <div className="p-6 sm:p-8 grid grid-cols-1 sm:grid-cols-2 gap-6">
                                <div className="border-l-2 border-[#1A6B4A] pl-4">
                                    <div className="text-xs font-mono font-bold text-[#1A6B4A]">STEP 13</div>
                                    <h4 className="text-base font-bold text-[#0A0A0A] mt-0.5 mb-1.5">Set the Recruiter Engagement Trigger</h4>
                                    <p className="text-xs sm:text-sm text-[#6B7280] leading-relaxed">
                                        Recruiters engage ONLY when: [1] a vetted meeting is booked on their calendar, or [2] a hiring manager requests a candidate shortlist.
                                    </p>
                                </div>
                                <div className="border-l-2 border-[#1A6B4A] pl-4">
                                    <div className="text-xs font-mono font-bold text-[#1A6B4A]">STEP 14</div>
                                    <h4 className="text-base font-bold text-[#0A0A0A] mt-0.5 mb-1.5">Run the 5-Point Self-Audit</h4>
                                    <p className="text-xs sm:text-sm text-[#6B7280] leading-relaxed">
                                        Score domain isolation, signal targeting, waterfall hygiene, recruiter protection, and handoff protocol to spot architecture leaks.
                                    </p>
                                </div>
                                <div className="border-l-2 border-[#1A6B4A] pl-4">
                                    <div className="text-xs font-mono font-bold text-[#1A6B4A]">STEP 15</div>
                                    <h4 className="text-base font-bold text-[#0A0A0A] mt-0.5 mb-1.5">Book the Growth Assessment</h4>
                                    <p className="text-xs sm:text-sm text-[#6B7280] leading-relaxed">
                                        Participate in a 20-minute consultative audit across deliverability, signal volume, recruiter capacity, and a custom 90-day plan.
                                    </p>
                                </div>
                                <div className="border-l-2 border-[#1A6B4A] pl-4">
                                    <div className="text-xs font-mono font-bold text-[#1A6B4A]">STEP 16</div>
                                    <h4 className="text-base font-bold text-[#0A0A0A] mt-0.5 mb-1.5">Track Benchmarks Against Proof Cases</h4>
                                    <p className="text-xs sm:text-sm text-[#6B7280] leading-relaxed">
                                        Compare your response and meeting rates against canonical audited data to pinpoint exactly where pipeline drop-off occurs.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Interactive 5-Point Self-Audit & Scorecard (Step 14) */}
                <section className="mb-20 bg-white border-2 border-[#0A0A0A] rounded-[10px] p-6 sm:p-10 shadow-sm" id="audit">
                    <div className="max-w-3xl mb-8">
                        <div className="flex items-center gap-2 mb-2">
                            <span className="w-2.5 h-2.5 rounded-full bg-[#FF6A00]" />
                            <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#FF6A00]">
                                Step 14 Interactive Diagnostic
                            </span>
                        </div>
                        <h2
                            className="text-2xl sm:text-3xl font-normal text-[#0A0A0A]"
                            style={{ fontFamily: 'var(--font-serif)' }}
                        >
                            The 5-Point Agency Outbound Architecture Scorecard
                        </h2>
                        <p className="text-[#6B7280] text-sm sm:text-base mt-2">
                            Check off each infrastructure requirement your agency currently has live and functioning today:
                        </p>
                    </div>

                    <div className="space-y-3 mb-8">
                        {AUDIT_CRITERIA.map((criterion, index) => {
                            const isChecked = !!checkedItems[criterion.id];
                            return (
                                <button
                                    key={criterion.id}
                                    type="button"
                                    onClick={() => toggleAudit(criterion.id)}
                                    className={`w-full text-left p-4 sm:p-5 rounded-[6px] border transition-all flex items-start gap-4 ${
                                        isChecked
                                            ? 'border-[#1A6B4A] bg-[#F6FAF7]'
                                            : 'border-[#E5E5E5] bg-[#FAFAFA] hover:border-[#D1D5DB]'
                                    }`}
                                >
                                    <div className={`w-5 h-5 rounded-[4px] border mt-0.5 flex items-center justify-center font-bold text-xs transition-colors shrink-0 ${
                                        isChecked
                                            ? 'bg-[#1A6B4A] border-[#1A6B4A] text-white'
                                            : 'border-[#D1D5DB] bg-white text-transparent'
                                    }`}>
                                        ✓
                                    </div>
                                    <div className="flex-1">
                                        <div className="flex flex-wrap items-center justify-between gap-2">
                                            <div className="text-sm font-bold text-[#0A0A0A]">
                                                {index + 1}. {criterion.label}
                                            </div>
                                            <span className="text-[11px] font-mono font-medium text-[#6B7280]">
                                                {isChecked ? '1 Point Earned' : '0 Points'}
                                            </span>
                                        </div>
                                        <p className="text-xs text-[#6B7280] mt-1 leading-relaxed">
                                            {criterion.description}
                                        </p>
                                    </div>
                                </button>
                            );
                        })}
                    </div>

                    {/* Score Output Banner */}
                    <div className="bg-[#0A0A0A] text-white p-6 sm:p-8 rounded-[8px]">
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 border-b border-[#262626] pb-6 mb-6">
                            <div>
                                <div className="text-xs font-mono uppercase tracking-wider text-[#FF6A00] mb-1">
                                    Your Architecture Maturity Score
                                </div>
                                <div className="text-3xl sm:text-4xl font-mono font-bold">
                                    {auditScore} <span className="text-lg text-[#6B7280]">/ 5 Points</span>
                                </div>
                            </div>
                            <div className="sm:text-right">
                                <div className="text-xs font-mono uppercase tracking-wider text-[#A1A1AA] mb-1">
                                    Diagnostic Status
                                </div>
                                <div className="text-lg sm:text-xl font-bold">
                                    {auditScore <= 2 && (
                                        <span className="text-red-400">Critical Friction (Feast & Famine)</span>
                                    )}
                                    {(auditScore === 3 || auditScore === 4) && (
                                        <span className="text-amber-400">Leaky Architecture (Sub-optimal Conversion)</span>
                                    )}
                                    {auditScore === 5 && (
                                        <span className="text-[#34D399]">Modern Client Engine (Autonomous)</span>
                                    )}
                                </div>
                            </div>
                        </div>

                        <p className="text-sm text-[#A1A1AA] leading-relaxed mb-6">
                            {auditScore <= 2 && (
                                'Your agency suffers from manual recruiter BD bottlenecks. Whenever recruitment billing peaks, pipeline collapses. Fixing domain isolation and signal-led input is your highest-leverage priority.'
                            )}
                            {(auditScore === 3 || auditScore === 4) && (
                                'Your agency has active outbound motion, but unshielded domains or missing intent signals are leaking response rate and burning valuable recruiter time.'
                            )}
                            {auditScore === 5 && (
                                'You run a fully decoupled client acquisition engine. Your primary lever is now scaling signal volume, fine-tuning copy angles, and expanding into adjacent niche reqs.'
                            )}
                        </p>

                        <div className="flex flex-wrap items-center gap-3">
                            <a
                                href={CAL_URL}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="px-5 py-3 bg-[#FF6A00] hover:bg-[#E55F00] text-white text-xs font-mono font-bold uppercase tracking-wider rounded-[4px] transition-colors"
                            >
                                Discuss Your Score on a 20-Min Call →
                            </a>
                            <a
                                href={PDF_URL}
                                download="The_Founders_Guide_16_Steps.pdf"
                                onClick={() => trackDownload('audit_score_download')}
                                className="px-5 py-3 bg-[#262626] hover:bg-[#333] text-gray-200 text-xs font-mono font-bold uppercase tracking-wider rounded-[4px] transition-colors"
                            >
                                Download Full Guide PDF
                            </a>
                        </div>
                    </div>
                </section>

                {/* Consultation & Done-For-You Architecture Section */}
                <section className="bg-[#FAFAFA] border border-[#E5E5E5] rounded-[10px] p-6 sm:p-12 mb-16">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                        <div className="lg:col-span-7 space-y-6">
                            <div>
                                <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#FF6A00]">
                                    Implementation Service
                                </span>
                                <h2
                                    className="text-2xl sm:text-4xl font-normal text-[#0A0A0A] mt-1"
                                    style={{ fontFamily: 'var(--font-serif)' }}
                                >
                                    Want this client acquisition engine built and running in 14 days?
                                </h2>
                            </div>

                            <p className="text-[#6B7280] text-sm sm:text-base leading-relaxed">
                                RecruitmentOS deploys and operates the entire 16-step decoupled engine for boutique recruitment firms. We provision mirror domains, configure waterfall enrichment, scrape live hiring signals, and write high-converting copy.
                            </p>

                            <div className="space-y-4 pt-2">
                                <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-[#0A0A0A]">
                                    What we cover on your 20-minute Growth Assessment:
                                </h3>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs sm:text-sm">
                                    <div className="border border-[#E5E5E5] bg-white p-3.5 rounded-[4px]">
                                        <div className="font-mono font-bold text-[#FF6A00] mb-0.5">01 · Deliverability</div>
                                        <div className="text-[#6B7280]">Full audit of SPF, DKIM, DMARC records, and mirror isolation.</div>
                                    </div>
                                    <div className="border border-[#E5E5E5] bg-white p-3.5 rounded-[4px]">
                                        <div className="font-mono font-bold text-[#FF6A00] mb-0.5">02 · Signal Volume</div>
                                        <div className="text-[#6B7280]">Live analysis of 60+ day aged reqs and funding in your niche.</div>
                                    </div>
                                    <div className="border border-[#E5E5E5] bg-white p-3.5 rounded-[4px]">
                                        <div className="font-mono font-bold text-[#FF6A00] mb-0.5">03 · Capacity Audit</div>
                                        <div className="text-[#6B7280]">Quantify exact recruiter billing hours lost to manual BD tasks.</div>
                                    </div>
                                    <div className="border border-[#E5E5E5] bg-white p-3.5 rounded-[4px]">
                                        <div className="font-mono font-bold text-[#FF6A00] mb-0.5">04 · 90-Day Plan</div>
                                        <div className="text-[#6B7280]">Custom technical roadmap, inbox allocation, and launch timeline.</div>
                                    </div>
                                </div>
                            </div>

                            <div className="pt-2">
                                <a
                                    href={CAL_URL}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center gap-2 px-6 py-3.5 bg-[#FF6A00] hover:bg-[#E55F00] text-white font-medium text-sm rounded-[4px] transition-colors"
                                >
                                    <span>Schedule 20-Min Growth Assessment with Tushar</span>
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                                    </svg>
                                </a>
                            </div>
                        </div>

                        {/* Direct Request Form */}
                        <div className="lg:col-span-5 bg-white border border-[#E5E5E5] p-6 sm:p-8 rounded-[8px] shadow-sm">
                            <h3 className="text-base font-bold text-[#0A0A0A] mb-1">
                                Request Custom BD Audit
                            </h3>
                            <p className="text-xs text-[#6B7280] mb-5">
                                Prefer an async review first? Enter your agency details and we&apos;ll audit your niche pipeline.
                            </p>

                            {submitted ? (
                                <div className="bg-[#E8F5EF] border border-[#1A6B4A]/30 p-5 rounded-[4px] text-center space-y-3">
                                    <div className="w-8 h-8 rounded-full bg-[#1A6B4A] text-white flex items-center justify-center mx-auto text-sm font-bold">
                                        ✓
                                    </div>
                                    <h4 className="text-sm font-bold text-[#1A6B4A]">Audit Request Received</h4>
                                    <p className="text-xs text-[#0A0A0A]">
                                        We&apos;re analyzing your agency domain and niche reqs. We&apos;ll be in touch within 24 hours.
                                    </p>
                                    <a
                                        href={CAL_URL}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-block text-xs font-mono font-bold text-[#1A6B4A] underline pt-1"
                                    >
                                        Skip wait and book call now →
                                    </a>
                                </div>
                            ) : (
                                <form onSubmit={handleFormSubmit} className="space-y-3.5">
                                    {formError && (
                                        <div className="text-xs text-red-600 bg-red-50 p-2.5 rounded border border-red-200">
                                            {formError}
                                        </div>
                                    )}

                                    <div>
                                        <label className="block text-xs font-mono uppercase text-[#6B7280] mb-1">
                                            Founder / Leader Name *
                                        </label>
                                        <input
                                            type="text"
                                            required
                                            value={name}
                                            onChange={(e) => setName(e.target.value)}
                                            placeholder="e.g. Sarah Jenkins"
                                            className="w-full text-xs sm:text-sm px-3.5 py-2.5 border border-[#D1D5DB] rounded-[4px] focus:outline-none focus:border-[#FF6A00]"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-xs font-mono uppercase text-[#6B7280] mb-1">
                                            Work Email *
                                        </label>
                                        <input
                                            type="email"
                                            required
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            placeholder="sarah@agencysearch.com"
                                            className="w-full text-xs sm:text-sm px-3.5 py-2.5 border border-[#D1D5DB] rounded-[4px] focus:outline-none focus:border-[#FF6A00]"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-xs font-mono uppercase text-[#6B7280] mb-1">
                                            Agency Website / URL
                                        </label>
                                        <input
                                            type="text"
                                            value={website}
                                            onChange={(e) => setWebsite(e.target.value)}
                                            placeholder="agencysearch.com"
                                            className="w-full text-xs sm:text-sm px-3.5 py-2.5 border border-[#D1D5DB] rounded-[4px] focus:outline-none focus:border-[#FF6A00]"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-xs font-mono uppercase text-[#6B7280] mb-1">
                                            Primary Acquisition Bottleneck
                                        </label>
                                        <select
                                            value={headache}
                                            onChange={(e) => setHeadache(e.target.value)}
                                            className="w-full text-xs sm:text-sm px-3.5 py-2.5 border border-[#D1D5DB] rounded-[4px] focus:outline-none focus:border-[#FF6A00] bg-white text-[#0A0A0A]"
                                        >
                                            <option value="">Select biggest BD friction...</option>
                                            <option value="Recruiters waste hours on manual BD">Recruiters waste hours on manual BD</option>
                                            <option value="Domain deliverability / emails landing in spam">Domain deliverability / spam issues</option>
                                            <option value="Feast-or-famine pipeline cycles">Feast-or-famine pipeline cycles</option>
                                            <option value="Low reply rates on cold outreach">Low reply rates on cold outreach</option>
                                            <option value="Finding active hiring signals">Finding active hiring signals</option>
                                        </select>
                                    </div>

                                    <button
                                        type="submit"
                                        disabled={submitting}
                                        className="w-full py-3 bg-[#0A0A0A] hover:bg-[#262626] text-white text-xs font-mono font-bold uppercase tracking-wider rounded-[4px] transition-colors disabled:opacity-50 mt-2"
                                    >
                                        {submitting ? 'Analyzing...' : 'Request Agency BD Audit →'}
                                    </button>
                                </form>
                            )}
                        </div>
                    </div>
                </section>

                {/* Final Sticky / Bottom Download Bar */}
                <div className="border-t border-[#E5E5E5] pt-10 flex flex-col sm:flex-row items-center justify-between gap-4">
                    <div>
                        <div className="text-sm font-bold text-[#0A0A0A]">
                            The Founder&apos;s Guide to Finding New Clients Every Week
                        </div>
                        <div className="text-xs text-[#6B7280]">
                            16-Step Outbound Architecture · 8-Page PDF · Free Instant Download
                        </div>
                    </div>
                    <div className="flex items-center gap-3">
                        <a
                            href={PDF_URL}
                            download="The_Founders_Guide_16_Steps.pdf"
                            onClick={() => trackDownload('bottom_bar_download')}
                            className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#FF6A00] hover:bg-[#E55F00] text-white text-xs font-mono font-bold uppercase tracking-wider rounded-[4px] transition-colors"
                        >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                            </svg>
                            Download PDF
                        </a>
                        <a
                            href={CAL_URL}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 px-5 py-2.5 border border-[#E5E5E5] hover:bg-[#FAFAFA] text-[#0A0A0A] text-xs font-mono font-bold uppercase tracking-wider rounded-[4px] transition-colors"
                        >
                            Book Call
                        </a>
                    </div>
                </div>
            </div>
        </article>
    );
}
