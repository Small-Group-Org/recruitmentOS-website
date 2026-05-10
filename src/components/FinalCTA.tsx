'use client';

import { useRef, useState, useEffect } from 'react';
import Link from 'next/link';
import { trackCTAClick } from '@/lib/analytics';

const billingOptions = [
    { value: '', label: 'Monthly billing (select)' },
    { value: 'under-50k', label: 'Under $50K/month' },
    { value: '50k-100k', label: '$50K–$100K/month' },
    { value: '100k-400k', label: '$100K–$400K/month' },
    { value: 'over-400k', label: '$400K+/month' },
];

const teamSizeOptions = [
    { value: '', label: 'Team size (select)' },
    { value: '1-3', label: '1–3 people' },
    { value: '3-10', label: '3–10 people' },
    { value: '10-25', label: '10–25 people' },
    { value: '25+', label: '25+ people' },
];

export default function FinalCTA() {
    const calRef = useRef<HTMLDivElement>(null);
    const [calVisible, setCalVisible] = useState(false);
    const [formSubmitted, setFormSubmitted] = useState(false);
    const [formData, setFormData] = useState({
        agencyName: '',
        website: '',
        billing: '',
        biggerProblem: '',
        teamSize: '',
    });
    const [submitting, setSubmitting] = useState(false);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setCalVisible(true);
                    observer.disconnect();
                }
            },
            { rootMargin: '300px' }
        );
        if (calRef.current) observer.observe(calRef.current);
        return () => observer.disconnect();
    }, []);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setSubmitting(true);

        try {
            const res = await fetch('https://api.web3forms.com/submit', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    access_key: '0e7ac89b-a20a-4df5-a7b9-b5fc081df584',
                    subject: `Fit call request — ${formData.agencyName}`,
                    agency_name: formData.agencyName,
                    website: formData.website,
                    billing: formData.billing,
                    bigger_problem: formData.biggerProblem,
                    team_size: formData.teamSize,
                }),
            });

            if (res.ok) {
                trackCTAClick('Pre-qual form submitted', 'FinalCTA');
                (window as Window & { fbq?: (...args: unknown[]) => void }).fbq?.('track', 'Contact', { content_name: 'Pre-qual form' });
                setFormSubmitted(true);
            }
        } catch {
            setFormSubmitted(true);
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <section className="py-16 sm:py-28 md:py-40 bg-[#FAFAFA] border-t border-[#e5e5e5]" id="contact">
            <div className="max-w-[800px] mx-auto px-4 sm:px-6 text-center">
                <h2 className="text-3xl sm:text-5xl md:text-6xl font-extrabold text-[#0A0A0A] tracking-tight leading-[1.1] mb-4">
                    Ready to stop doing BD manually?
                </h2>
                <p className="text-lg md:text-xl text-[#6b7280] mb-12 max-w-[560px] mx-auto leading-relaxed">
                    20-minute call. No slides. No deck. No pressure. Three questions about your business, then a straight read on whether RecruitmentOS makes sense for you.
                </p>

                {!formSubmitted ? (
                    <form onSubmit={handleSubmit} className="bg-white border border-[#e5e5e5] rounded-[16px] p-8 text-left mb-10 shadow-sm">
                        <p className="text-[13px] font-bold uppercase tracking-widest text-[#6b7280] mb-6">
                            Tell us about your agency first
                        </p>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                            <div>
                                <label className="block text-[13px] font-medium text-[#4B5563] mb-1.5">Agency name</label>
                                <input
                                    type="text"
                                    required
                                    value={formData.agencyName}
                                    onChange={(e) => setFormData({ ...formData, agencyName: e.target.value })}
                                    className="w-full border border-[#e5e5e5] rounded-[8px] px-4 py-2.5 text-[15px] text-[#0A0A0A] focus:outline-none focus:border-[#0A0A0A] transition-colors"
                                    placeholder="Acme Recruitment"
                                />
                            </div>
                            <div>
                                <label className="block text-[13px] font-medium text-[#4B5563] mb-1.5">Website</label>
                                <input
                                    type="url"
                                    value={formData.website}
                                    onChange={(e) => setFormData({ ...formData, website: e.target.value })}
                                    className="w-full border border-[#e5e5e5] rounded-[8px] px-4 py-2.5 text-[15px] text-[#0A0A0A] focus:outline-none focus:border-[#0A0A0A] transition-colors"
                                    placeholder="https://yoursite.com"
                                />
                            </div>
                        </div>

                        <div className="mb-4">
                            <label className="block text-[13px] font-medium text-[#4B5563] mb-1.5">Monthly billing</label>
                            <select
                                required
                                value={formData.billing}
                                onChange={(e) => setFormData({ ...formData, billing: e.target.value })}
                                className="w-full border border-[#e5e5e5] rounded-[8px] px-4 py-2.5 text-[15px] text-[#0A0A0A] focus:outline-none focus:border-[#0A0A0A] transition-colors bg-white"
                            >
                                {billingOptions.map((o) => (
                                    <option key={o.value} value={o.value} disabled={o.value === ''}>{o.label}</option>
                                ))}
                            </select>
                            <p className="text-[12px] text-[#9ca3af] mt-1">We work with $50K+/month agencies. If you&apos;re below, we&apos;ll redirect you to a free resource.</p>
                        </div>

                        <div className="mb-4">
                            <label className="block text-[13px] font-medium text-[#4B5563] mb-2">Bigger problem this month</label>
                            <div className="flex gap-4">
                                <label className="flex items-center gap-2 cursor-pointer">
                                    <input
                                        type="radio"
                                        name="biggerProblem"
                                        value="clients"
                                        checked={formData.biggerProblem === 'clients'}
                                        onChange={(e) => setFormData({ ...formData, biggerProblem: e.target.value })}
                                        className="accent-[#0A0A0A]"
                                        required
                                    />
                                    <span className="text-[15px] text-[#0A0A0A] font-medium">Not enough clients</span>
                                </label>
                                <label className="flex items-center gap-2 cursor-pointer">
                                    <input
                                        type="radio"
                                        name="biggerProblem"
                                        value="candidates"
                                        checked={formData.biggerProblem === 'candidates'}
                                        onChange={(e) => setFormData({ ...formData, biggerProblem: e.target.value })}
                                        className="accent-[#0A0A0A]"
                                    />
                                    <span className="text-[15px] text-[#0A0A0A] font-medium">Not enough candidates</span>
                                </label>
                            </div>
                            <p className="text-[12px] text-[#9ca3af] mt-1">We solve client-side BD. If your bottleneck is candidates, we&apos;re not your fit.</p>
                        </div>

                        <div className="mb-6">
                            <label className="block text-[13px] font-medium text-[#4B5563] mb-1.5">Team size</label>
                            <select
                                required
                                value={formData.teamSize}
                                onChange={(e) => setFormData({ ...formData, teamSize: e.target.value })}
                                className="w-full border border-[#e5e5e5] rounded-[8px] px-4 py-2.5 text-[15px] text-[#0A0A0A] focus:outline-none focus:border-[#0A0A0A] transition-colors bg-white"
                            >
                                {teamSizeOptions.map((o) => (
                                    <option key={o.value} value={o.value} disabled={o.value === ''}>{o.label}</option>
                                ))}
                            </select>
                        </div>

                        <button
                            type="submit"
                            disabled={submitting}
                            onClick={() => trackCTAClick('Pre-qual submit', 'FinalCTA')}
                            className="w-full bg-[#0A0A0A] text-white py-3.5 rounded-[8px] font-semibold text-[16px] hover:bg-[#1a1a1a] transition-colors disabled:opacity-60"
                        >
                            {submitting ? 'Sending…' : 'Show me the calendar →'}
                        </button>
                    </form>
                ) : (
                    <div className="mb-10">
                        <p className="text-lg font-semibold text-[#0A0A0A] mb-3">Thanks — pick a time below.</p>
                    </div>
                )}

                {/* Cal.com embed — shown after form submit or always visible beneath */}
                {formSubmitted && (
                    <div ref={calRef} className="w-full max-w-[900px] mx-auto rounded-2xl overflow-hidden border border-[#e5e5e5] h-[700px] bg-white shadow-sm ring-1 ring-black/5 mb-10">
                        {calVisible ? (
                            <iframe
                                src="https://cal.com/tusharm/30min?overlayCalendar=true"
                                width="100%"
                                height="100%"
                                frameBorder="0"
                                title="Book a fit call"
                                className="w-full h-full"
                            />
                        ) : (
                            <div className="w-full h-full flex items-center justify-center bg-[#FAFAFA]">
                                <p className="text-[#9CA3AF] text-sm font-medium">Loading calendar…</p>
                            </div>
                        )}
                    </div>
                )}

                {/* Fallback link before form submit */}
                {!formSubmitted && (
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-10">
                        <Link
                            href="mailto:tushar.mangla1120@gmail.com"
                            className="inline-flex items-center text-base text-[#F97316] hover:text-[#EA580C] transition-colors font-medium"
                        >
                            Or email directly
                        </Link>
                    </div>
                )}

                {/* Founder signature */}
                <p className="text-sm text-[#9ca3af] italic">
                    If it doesn&apos;t fit, I&apos;ll point you at someone who does what you actually need.<br />
                    — Tushar, Founder, RecruitmentOS
                </p>
            </div>
        </section>
    );
}
