'use client';

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { trackCTAClick } from '@/lib/analytics';

const revenueOptions = [
    { value: '', label: 'Select annual revenue band' },
    { value: 'under-500k', label: 'Under $500K (we may not be the right fit)' },
    { value: '500k-1m', label: '$500K – $1M' },
    { value: '1m-2.5m', label: '$1M – $2.5M' },
    { value: '2.5m-5m', label: '$2.5M – $5M' },
    { value: 'over-5m', label: 'Over $5M' },
];

export default function FitCallForm() {
    const [submitted, setSubmitted] = useState(false);
    const [submitting, setSubmitting] = useState(false);
    const [calVisible, setCalVisible] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const calRef = useRef<HTMLDivElement>(null);

    const [form, setForm] = useState({
        firstName: '',
        email: '',
        revenueBand: '',
        nicheGeo: '',
        currentVolume: '',
        placementTarget: '',
        whatsBeenTried: '',
    });

    useEffect(() => {
        if (!submitted) return;
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
    }, [submitted]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setSubmitting(true);
        setError(null);

        try {
            const res = await fetch('https://api.web3forms.com/submit', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    access_key: '0e7ac89b-a20a-4df5-a7b9-b5fc081df584',
                    subject: `[Fit Call] ${form.firstName} — ${form.revenueBand}`,
                    first_name: form.firstName,
                    email: form.email,
                    revenue_band: form.revenueBand,
                    niche_geography: form.nicheGeo,
                    current_outreach_volume: form.currentVolume,
                    monthly_placement_target: form.placementTarget,
                    whats_been_tried: form.whatsBeenTried,
                    page: 'fit-call',
                }),
            });

            if (res.ok) {
                trackCTAClick('Fit-call form submitted', 'FitCallForm');
                setSubmitted(true);
            } else {
                setError('Something went wrong. Try again or email tushar directly.');
            }
        } catch {
            setError('Network issue. Try again or email tushar directly.');
        } finally {
            setSubmitting(false);
        }
    };

    if (submitted) {
        return (
            <section className="py-16 md:py-24 bg-[#FAFAFA] border-t border-[#e5e5e5]">
                <div className="max-w-[900px] mx-auto px-4 sm:px-6 text-center">
                    <p className="text-xs font-bold uppercase tracking-widest text-[#16a34a] mb-4">✓ Pre-call form received</p>
                    <h2 className="text-[#0A0A0A] text-3xl md:text-4xl font-extrabold tracking-tight mb-4">
                        Pick a time below.
                    </h2>
                    <p className="text-[15px] text-[#6b7280] mb-10 max-w-xl mx-auto">
                        Tushar will read your responses before the call. The first 10 minutes are not wasted on intros — we go straight to the math and the scorecard.
                    </p>

                    <div ref={calRef} className="w-full max-w-[900px] mx-auto rounded-2xl overflow-hidden border border-[#e5e5e5] h-[700px] bg-white shadow-sm">
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

                    <p className="mt-8 text-sm text-[#9ca3af] italic">
                        — Tushar, Founder, RecruitmentOS
                    </p>
                </div>
            </section>
        );
    }

    return (
        <section className="py-16 md:py-24 bg-[#FAFAFA] border-t border-[#e5e5e5]">
            <div className="max-w-[760px] mx-auto px-4 sm:px-6">
                <div className="mb-8 text-center">
                    <p className="text-xs font-medium text-[#6b7280] uppercase tracking-widest mb-3">Pre-call form</p>
                    <h2 className="text-[#0A0A0A] text-2xl md:text-3xl font-extrabold tracking-tight mb-3">
                        Five questions. Two minutes.
                    </h2>
                    <p className="text-[15px] text-[#6b7280] max-w-lg mx-auto">
                        Required before the calendar opens. Saves us 8–10 minutes on the call so we can spend it on what actually moves your business.
                    </p>
                </div>

                <form onSubmit={handleSubmit} className="bg-white border border-[#e5e5e5] rounded-[16px] p-6 md:p-8 shadow-sm space-y-5">
                    {/* Identity */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label htmlFor="firstName" className="block text-[13px] font-medium text-[#4B5563] mb-1.5">First name</label>
                            <input
                                id="firstName"
                                type="text"
                                required
                                value={form.firstName}
                                onChange={(e) => setForm({ ...form, firstName: e.target.value })}
                                className="w-full border border-[#e5e5e5] rounded-[8px] px-4 py-2.5 text-[15px] text-[#0A0A0A] focus:outline-none focus:border-[#0A0A0A] transition-colors"
                                placeholder="Your first name"
                            />
                        </div>
                        <div>
                            <label htmlFor="email" className="block text-[13px] font-medium text-[#4B5563] mb-1.5">Work email</label>
                            <input
                                id="email"
                                type="email"
                                required
                                value={form.email}
                                onChange={(e) => setForm({ ...form, email: e.target.value })}
                                className="w-full border border-[#e5e5e5] rounded-[8px] px-4 py-2.5 text-[15px] text-[#0A0A0A] focus:outline-none focus:border-[#0A0A0A] transition-colors"
                                placeholder="you@youragency.com"
                            />
                        </div>
                    </div>

                    {/* Q1 — Revenue band */}
                    <div>
                        <label htmlFor="revenueBand" className="block text-[13px] font-medium text-[#4B5563] mb-1.5">
                            <span className="text-[#F97316] font-bold mr-1">1.</span>
                            Annual revenue band
                        </label>
                        <select
                            id="revenueBand"
                            required
                            value={form.revenueBand}
                            onChange={(e) => setForm({ ...form, revenueBand: e.target.value })}
                            className="w-full border border-[#e5e5e5] rounded-[8px] px-4 py-2.5 text-[15px] text-[#0A0A0A] focus:outline-none focus:border-[#0A0A0A] transition-colors bg-white"
                        >
                            {revenueOptions.map((o) => (
                                <option key={o.value} value={o.value} disabled={o.value === ''}>{o.label}</option>
                            ))}
                        </select>
                    </div>

                    {/* Q2 — Niche + geography */}
                    <div>
                        <label htmlFor="nicheGeo" className="block text-[13px] font-medium text-[#4B5563] mb-1.5">
                            <span className="text-[#F97316] font-bold mr-1">2.</span>
                            Specific niche + geography
                        </label>
                        <input
                            id="nicheGeo"
                            type="text"
                            required
                            value={form.nicheGeo}
                            onChange={(e) => setForm({ ...form, nicheGeo: e.target.value })}
                            className="w-full border border-[#e5e5e5] rounded-[8px] px-4 py-2.5 text-[15px] text-[#0A0A0A] focus:outline-none focus:border-[#0A0A0A] transition-colors"
                            placeholder="e.g. biotech recruitment in Boston"
                        />
                        <p className="text-[12px] text-[#9ca3af] mt-1">&quot;Recruitment in general&quot; isn&apos;t specific enough — we don&apos;t take generic agencies.</p>
                    </div>

                    {/* Q3 — Current volume */}
                    <div>
                        <label htmlFor="currentVolume" className="block text-[13px] font-medium text-[#4B5563] mb-1.5">
                            <span className="text-[#F97316] font-bold mr-1">3.</span>
                            Current monthly outreach volume (touchpoints/month)
                        </label>
                        <input
                            id="currentVolume"
                            type="number"
                            min="0"
                            required
                            value={form.currentVolume}
                            onChange={(e) => setForm({ ...form, currentVolume: e.target.value })}
                            className="w-full border border-[#e5e5e5] rounded-[8px] px-4 py-2.5 text-[15px] text-[#0A0A0A] focus:outline-none focus:border-[#0A0A0A] transition-colors"
                            placeholder="e.g. 400"
                        />
                    </div>

                    {/* Q4 — Placement target */}
                    <div>
                        <label htmlFor="placementTarget" className="block text-[13px] font-medium text-[#4B5563] mb-1.5">
                            <span className="text-[#F97316] font-bold mr-1">4.</span>
                            Monthly placement target (placements/month)
                        </label>
                        <input
                            id="placementTarget"
                            type="number"
                            min="0"
                            required
                            value={form.placementTarget}
                            onChange={(e) => setForm({ ...form, placementTarget: e.target.value })}
                            className="w-full border border-[#e5e5e5] rounded-[8px] px-4 py-2.5 text-[15px] text-[#0A0A0A] focus:outline-none focus:border-[#0A0A0A] transition-colors"
                            placeholder="e.g. 5"
                        />
                    </div>

                    {/* Q5 — What's been tried */}
                    <div>
                        <label htmlFor="whatsBeenTried" className="block text-[13px] font-medium text-[#4B5563] mb-1.5">
                            <span className="text-[#F97316] font-bold mr-1">5.</span>
                            What have you tried for BD?
                        </label>
                        <textarea
                            id="whatsBeenTried"
                            required
                            rows={3}
                            value={form.whatsBeenTried}
                            onChange={(e) => setForm({ ...form, whatsBeenTried: e.target.value })}
                            className="w-full border border-[#e5e5e5] rounded-[8px] px-4 py-2.5 text-[15px] text-[#0A0A0A] focus:outline-none focus:border-[#0A0A0A] transition-colors resize-none"
                            placeholder="Tools, agencies, internal hires, founder-led — what worked, what didn't."
                        />
                    </div>

                    {error && (
                        <p className="text-[14px] text-[#dc2626] bg-[#fef2f2] border border-[#fecaca] rounded-[8px] px-4 py-3">{error}</p>
                    )}

                    <button
                        type="submit"
                        disabled={submitting}
                        className="w-full bg-[#0A0A0A] text-white py-3.5 rounded-[8px] font-semibold text-[16px] hover:bg-[#1a1a1a] transition-colors disabled:opacity-60"
                    >
                        {submitting ? 'Submitting…' : 'Show me the calendar →'}
                    </button>

                    <p className="text-[12px] text-[#9ca3af] text-center pt-2">
                        Bookings without form completed are auto-cancelled. We don&apos;t run discovery calls — we run fit calls.
                    </p>
                </form>

                <p className="mt-6 text-center text-sm text-[#6b7280]">
                    Or just <Link href="mailto:tushar.mangla1120@gmail.com" className="underline underline-offset-2 hover:text-[#0A0A0A]">email Tushar</Link> directly.
                </p>
            </div>
        </section>
    );
}
