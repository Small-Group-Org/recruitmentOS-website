'use client';

import { useState, useMemo, useEffect } from 'react';
import Link from 'next/link';
import { sections, totalMax } from '@/lib/scorecard-data';
import { trackCTAClick } from '@/lib/analytics';

const STORAGE_KEY = 'rOS_scorecard_scores';

type Scores = Record<string, number>;

export default function BdScorecard() {
    const [scores, setScores] = useState<Scores>({});
    const [hydrated, setHydrated] = useState(false);
    const [submittedEmail, setSubmittedEmail] = useState(false);
    const [email, setEmail] = useState('');
    const [submitting, setSubmitting] = useState(false);

    useEffect(() => {
        try {
            const saved = localStorage.getItem(STORAGE_KEY);
            if (saved) setScores(JSON.parse(saved));
        } catch { /* ignore */ }
        setHydrated(true);
    }, []);

    useEffect(() => {
        if (!hydrated) return;
        try {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(scores));
        } catch { /* ignore */ }
    }, [scores, hydrated]);

    const totals = useMemo(() => {
        const sectionTotals = sections.map((sec) => {
            const total = sec.items.reduce((s, it) => s + (scores[it.id] || 0), 0);
            const max = sec.items.length * 5;
            return { id: sec.id, title: sec.title, total, max, primary: sec.primary };
        });
        const grand = sectionTotals.reduce((s, st) => s + st.total, 0);
        const bd = sectionTotals.find((st) => st.id === 'bd');
        return { sectionTotals, grand, bd };
    }, [scores]);

    const interpretation = useMemo(() => {
        const t = totals.grand;
        if (t === 0) return null;
        if (t >= 130) {
            return {
                tone: 'green' as const,
                title: 'Strong BD function — you probably don\'t need us.',
                detail: 'Your scoring suggests you\'ve built the function. Save the call. The resources page has a couple of things you may still find useful.',
                cta: 'Browse free resources →',
                ctaHref: '/resources',
            };
        }
        if (t >= 90) {
            return {
                tone: 'amber' as const,
                title: 'Typical for $500K–$2M agencies — specific gaps.',
                detail: 'Mixed picture. You\'ve built parts of the function and there are specific leaks. Worth a fit-call to score the leaks together.',
                cta: 'Book a fit call →',
                ctaHref: '/fit-call',
            };
        }
        return {
            tone: 'red' as const,
            title: 'BD function is a major leak — highest-leverage fix you can make.',
            detail: 'Most of your placements right now are luck-shaped, not system-shaped. The fit call is the next step — we\'ll show you the highest-leverage 1–3 fixes.',
            cta: 'Book a fit call →',
            ctaHref: '/fit-call',
        };
    }, [totals.grand]);

    const bdFlag = useMemo(() => {
        const bd = totals.bd;
        if (!bd || bd.total === 0) return null;
        if (bd.total < 25) {
            return { tone: 'red' as const, label: 'BD math is the bottleneck. Volume problem, not skill.' };
        }
        if (bd.total <= 45) {
            return { tone: 'amber' as const, label: 'Mixed BD picture. Some structural fixes, some operational.' };
        }
        return { tone: 'green' as const, label: 'Strong BD function. Leverage point is probably elsewhere.' };
    }, [totals.bd]);

    const setScore = (itemId: string, value: number) => {
        setScores((s) => ({ ...s, [itemId]: value }));
    };

    const reset = () => {
        setScores({});
        try { localStorage.removeItem(STORAGE_KEY); } catch { /* ignore */ }
    };

    const handleEmailSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!email) return;
        setSubmitting(true);
        try {
            await fetch('https://api.web3forms.com/submit', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    access_key: '0e7ac89b-a20a-4df5-a7b9-b5fc081df584',
                    subject: `[Scorecard] Score ${totals.grand}/${totalMax} — ${email}`,
                    email,
                    grand_total: totals.grand,
                    grand_max: totalMax,
                    bd_total: totals.bd?.total ?? 0,
                    bd_max: totals.bd?.max ?? 0,
                    page: 'scorecard',
                }),
            });
            trackCTAClick('Scorecard email captured', 'BdScorecard');
            setSubmittedEmail(true);
        } catch { /* ignore */ } finally {
            setSubmitting(false);
        }
    };

    return (
        <section className="py-12 md:py-16 bg-white">
            <div className="max-w-[1100px] mx-auto px-4 sm:px-6 grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Sections (scored items) */}
                <div className="lg:col-span-2 space-y-5">
                    {sections.map((sec) => {
                        const st = totals.sectionTotals.find((x) => x.id === sec.id);
                        return (
                            <div
                                key={sec.id}
                                className={`rounded-[14px] border p-6 ${sec.primary ? 'bg-[#fffbf5] border-[#fed7aa]' : 'bg-white border-[#e5e5e5]'}`}
                            >
                                <div className="flex items-baseline justify-between mb-4 gap-3">
                                    <h2 className="text-[16px] font-bold text-[#0A0A0A]">
                                        {sec.title}
                                        {sec.primary && (
                                            <span className="ml-2 text-[10px] font-mono uppercase tracking-widest text-[#F97316] bg-[#fff7ed] border border-[#fed7aa] rounded-full px-2 py-0.5">
                                                Primary
                                            </span>
                                        )}
                                    </h2>
                                    {st && (
                                        <span className="text-[12px] font-mono text-[#9ca3af] shrink-0">
                                            {st.total}/{st.max}
                                        </span>
                                    )}
                                </div>
                                <ul className="space-y-3">
                                    {sec.items.map((item) => (
                                        <li key={item.id} className="grid grid-cols-1 md:grid-cols-[1fr_auto] md:items-center gap-2">
                                            <span className="text-[14px] text-[#4B5563] leading-snug pr-2">{item.text}</span>
                                            <div className="flex gap-1.5">
                                                {[1, 2, 3, 4, 5].map((n) => (
                                                    <button
                                                        key={n}
                                                        type="button"
                                                        onClick={() => setScore(item.id, n)}
                                                        aria-label={`Score ${n}`}
                                                        className={`w-8 h-8 rounded-full text-[12px] font-bold transition-colors ${
                                                            scores[item.id] === n
                                                                ? 'bg-[#0A0A0A] text-white'
                                                                : 'bg-[#F5F5F5] text-[#9ca3af] hover:bg-[#e5e5e5]'
                                                        }`}
                                                    >
                                                        {n}
                                                    </button>
                                                ))}
                                            </div>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        );
                    })}
                </div>

                {/* Sidebar — score + interpretation */}
                <aside className="lg:col-span-1">
                    <div className="lg:sticky lg:top-24 space-y-4">
                        <div className="bg-[#0A0A0A] text-white rounded-[16px] p-6">
                            <p className="text-xs font-bold uppercase tracking-widest text-[#F97316] mb-3">Total score</p>
                            <p className="text-6xl font-extrabold leading-none mb-1">{totals.grand}<span className="text-2xl text-[#9ca3af] font-bold">/{totalMax}</span></p>
                            <p className="text-[12px] text-[#9ca3af] mt-2">Score everything to see your interpretation.</p>
                        </div>

                        {bdFlag && (
                            <div
                                className={`rounded-[12px] border p-5 ${
                                    bdFlag.tone === 'green'
                                        ? 'bg-[#f0fdf4] border-[#bbf7d0]'
                                        : bdFlag.tone === 'amber'
                                        ? 'bg-[#fffbeb] border-[#fde68a]'
                                        : 'bg-[#fef2f2] border-[#fecaca]'
                                }`}
                            >
                                <p className="text-[10px] font-bold uppercase tracking-widest text-[#9ca3af] mb-2">BD section flag</p>
                                <p className={`text-[14px] font-bold ${
                                    bdFlag.tone === 'green' ? 'text-[#166534]' : bdFlag.tone === 'amber' ? 'text-[#92400e]' : 'text-[#991b1b]'
                                }`}>{bdFlag.label}</p>
                                <p className="text-[12px] text-[#6b7280] mt-1">BD: {totals.bd?.total ?? 0}/{totals.bd?.max ?? 0}</p>
                            </div>
                        )}

                        {interpretation && (
                            <div
                                className={`rounded-[12px] border p-5 ${
                                    interpretation.tone === 'green'
                                        ? 'bg-[#f0fdf4] border-[#bbf7d0]'
                                        : interpretation.tone === 'amber'
                                        ? 'bg-[#fffbeb] border-[#fde68a]'
                                        : 'bg-[#fef2f2] border-[#fecaca]'
                                }`}
                            >
                                <p className="text-[10px] font-bold uppercase tracking-widest text-[#9ca3af] mb-2">Recommendation</p>
                                <p className={`text-[14px] font-bold mb-2 ${
                                    interpretation.tone === 'green' ? 'text-[#166534]' : interpretation.tone === 'amber' ? 'text-[#92400e]' : 'text-[#991b1b]'
                                }`}>{interpretation.title}</p>
                                <p className="text-[13px] text-[#4B5563] leading-relaxed mb-4">{interpretation.detail}</p>
                                <Link
                                    href={interpretation.ctaHref}
                                    onClick={() => trackCTAClick(`Scorecard ${interpretation.tone}`, 'BdScorecard')}
                                    className="inline-flex items-center text-[14px] font-semibold text-[#0A0A0A] underline underline-offset-4 hover:text-[#F97316] transition-colors"
                                >
                                    {interpretation.cta}
                                </Link>
                            </div>
                        )}

                        {totals.grand > 0 && !submittedEmail && (
                            <form onSubmit={handleEmailSubmit} className="bg-[#FAFAFA] rounded-[12px] border border-[#e5e5e5] p-5">
                                <p className="text-[12px] font-bold text-[#0A0A0A] mb-2">Want a copy of your score?</p>
                                <p className="text-[12px] text-[#6b7280] mb-3 leading-snug">We&apos;ll email you your scores + a 1-pager of which rows usually move the needle for $500K–$5M agencies.</p>
                                <input
                                    type="email"
                                    required
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="you@youragency.com"
                                    className="w-full border border-[#e5e5e5] rounded-[8px] px-3 py-2 text-[14px] mb-2 focus:outline-none focus:border-[#0A0A0A]"
                                />
                                <button
                                    type="submit"
                                    disabled={submitting}
                                    className="w-full bg-[#0A0A0A] text-white py-2 rounded-[8px] text-[13px] font-semibold hover:bg-[#1a1a1a] transition-colors disabled:opacity-60"
                                >
                                    {submitting ? 'Sending…' : 'Send me my score →'}
                                </button>
                            </form>
                        )}

                        {submittedEmail && (
                            <div className="bg-[#f0fdf4] border border-[#bbf7d0] rounded-[12px] p-5">
                                <p className="text-[13px] font-bold text-[#166534]">✓ On its way.</p>
                            </div>
                        )}

                        {totals.grand > 0 && (
                            <button
                                onClick={reset}
                                className="w-full text-[12px] text-[#9ca3af] hover:text-[#6b7280] transition-colors py-2"
                            >
                                Reset all scores
                            </button>
                        )}
                    </div>
                </aside>
            </div>
        </section>
    );
}
