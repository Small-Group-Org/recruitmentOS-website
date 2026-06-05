'use client';

import { useState, useMemo } from 'react';
import { Button, Card } from '@/components/ui';
import {
    scorecard,
    computeReport,
    bandFor,
    overallVerdict,
    bdAutoSynthesis,
} from '@/lib/scorecard-data';

const SCALE_LABELS = ['Not in place', 'Ad hoc', 'Partial', 'Mostly done', 'Excellent'];

export default function BDScorecard() {
    const [sectionIdx, setSectionIdx] = useState(0); // 0..6 = sections, 7 = results
    const [answers, setAnswers] = useState<Record<number, number>>({});

    const totalSections = scorecard.length;
    const onResults = sectionIdx === totalSections;
    const currentSection = onResults ? null : scorecard[sectionIdx];
    const answered = currentSection ? currentSection.questions.every((q) => !!answers[q.id]) : false;

    const report = useMemo(() => computeReport(answers), [answers]);

    function setAnswer(qid: number, score: number) {
        setAnswers((prev) => ({ ...prev, [qid]: score }));
    }

    function next() {
        if (sectionIdx < totalSections) setSectionIdx((i) => i + 1);
        if (typeof window !== 'undefined') window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    function back() {
        if (sectionIdx > 0) setSectionIdx((i) => i - 1);
        if (typeof window !== 'undefined') window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    function reset() {
        setAnswers({});
        setSectionIdx(0);
    }

    if (onResults) {
        return <Results report={report} onReset={reset} />;
    }

    if (!currentSection) return null;

    const totalQs = scorecard.reduce((sum, s) => sum + s.questions.length, 0);
    const answeredQs = Object.keys(answers).length;
    const progressPct = Math.round((answeredQs / totalQs) * 100);

    return (
        <Card as="section" padding="lg">

            {/* Progress */}
            <div className="mb-8">
                <div className="flex items-center justify-between mb-2 text-xs font-bold uppercase tracking-widest">
                    <span className="text-[#0A0A0A]">Section {sectionIdx + 1} of {totalSections}</span>
                    <span className="text-[#FF6A00] font-mono">{progressPct}% complete</span>
                </div>
                <div className="h-1.5 bg-[#F3F4F6] rounded-full overflow-hidden">
                    <div
                        className="h-full bg-[#FF6A00] transition-all duration-300"
                        style={{ width: `${progressPct}%` }}
                    />
                </div>
            </div>

            {/* Section header */}
            <div className="mb-8">
                <h3 className="text-2xl sm:text-3xl font-bold text-[#0A0A0A] mb-2 leading-tight">{currentSection.name}</h3>
                <p className="section-sub">{currentSection.description}</p>
            </div>

            {/* Questions */}
            <div className="space-y-6 mb-10">
                {currentSection.questions.map((q) => (
                    <fieldset key={q.id}>
                        <legend className="block text-base font-bold text-[#0A0A0A] mb-3 leading-snug">{q.text}</legend>
                        <div className="grid grid-cols-5 gap-2">
                            {[1, 2, 3, 4, 5].map((score) => {
                                const isSelected = answers[q.id] === score;
                                return (
                                    <button
                                        key={score}
                                        type="button"
                                        onClick={() => setAnswer(q.id, score)}
                                        className={`py-3 px-2 rounded-lg text-sm font-bold border transition-all ${
                                            isSelected
                                                ? 'bg-[#FF6A00] text-white border-[#FF6A00]'
                                                : 'bg-white text-[#374151] border-[#E5E5E5] hover:border-[#0A0A0A]'
                                        }`}
                                    >
                                        <span className="block text-lg leading-none mb-1">{score}</span>
                                        <span className="block text-[10px] uppercase tracking-wider opacity-80 leading-tight">{SCALE_LABELS[score - 1]}</span>
                                    </button>
                                );
                            })}
                        </div>
                    </fieldset>
                ))}
            </div>

            {/* Navigation */}
            <div className="flex items-center justify-between gap-4 pt-6 border-t border-[#E5E5E5]">
                <button
                    type="button"
                    onClick={back}
                    disabled={sectionIdx === 0}
                    className="text-sm font-bold text-[#9CA3AF] hover:text-[#0A0A0A] disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                >
                    ← Back
                </button>
                <button
                    type="button"
                    onClick={next}
                    disabled={!answered}
                    className="inline-flex items-center bg-[#0A0A0A] text-white px-6 py-3 rounded-full text-sm font-bold hover:bg-[#0A0A0A] disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                >
                    {sectionIdx === totalSections - 1 ? 'See your score →' : 'Next section →'}
                </button>
            </div>

        </Card>
    );
}

function Results({ report, onReset }: { report: ReturnType<typeof computeReport>; onReset: () => void }) {
    const overallBand = bandFor(report.overallPct);
    const verdict = overallVerdict(report.overallPct);
    const synthesis = bdAutoSynthesis(report.bdAutoPct);

    return (
        <Card as="section" padding="lg">

            {/* Overall score */}
            <div className="text-center mb-10 pb-10 border-b border-[#E5E5E5]">
                <p className="text-xs font-bold uppercase tracking-widest text-[#FF6A00] mb-3">Your overall score</p>
                <p className="text-6xl sm:text-7xl font-black text-[#0A0A0A] tracking-tighter leading-none mb-2">
                    {report.totalScore}<span className="text-3xl font-bold text-[#9CA3AF]">/180</span>
                </p>
                <p className="text-sm font-mono text-[#9CA3AF] mb-5">{Math.round(report.overallPct * 100)}%</p>
                <p className={`inline-flex items-center gap-2 text-base font-bold ${overallBand.color} mb-5`}>
                    <span className="text-2xl">{overallBand.emoji}</span>
                    {overallBand.label}
                </p>
                <p className="max-w-2xl mx-auto text-base text-[#374151] font-medium leading-relaxed">{verdict}</p>
            </div>

            {/* Section breakdown */}
            <div className="mb-10">
                <h3 className="text-lg font-bold text-[#0A0A0A] mb-5 uppercase tracking-widest text-sm">Section breakdown</h3>
                <div className="space-y-3">
                    {report.sectionResults.map((s) => {
                        const sb = bandFor(s.pct);
                        return (
                            <div key={s.id} className="flex items-center justify-between gap-4 p-4 bg-[#FAFAFA] border border-[#E5E5E5] rounded-lg">
                                <div className="flex items-center gap-3 flex-1 min-w-0">
                                    <span className="text-xl">{sb.emoji}</span>
                                    <span className="text-sm font-bold text-[#0A0A0A] truncate">{s.name}</span>
                                </div>
                                <div className="flex items-center gap-4 flex-shrink-0">
                                    <span className="text-sm font-mono text-[#9CA3AF]">{s.score}/{s.maxScore}</span>
                                    <span className="text-sm font-bold text-[#0A0A0A] w-12 text-right">{Math.round(s.pct * 100)}%</span>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>

            {/* Top 3 fixes */}
            <div className="mb-10">
                <h3 className="text-lg font-bold text-[#0A0A0A] mb-5 uppercase tracking-widest text-sm">Top 3 fixes</h3>
                <ol className="space-y-4">
                    {report.topFixes.map((fix, i) => (
                        <li key={fix.id} className="flex items-start gap-4 p-5 bg-white border border-[#E5E5E5] rounded-xl">
                            <span className="text-xl font-black text-[#FF6A00] leading-none flex-shrink-0">{i + 1}</span>
                            <div>
                                <p className="text-sm text-[#9CA3AF] font-mono mb-1">Q{fix.id} · scored {fix.score}/5</p>
                                <p className="text-base font-bold text-[#0A0A0A] mb-2 leading-snug">{fix.text}</p>
                                <p className="text-sm text-[#374151] font-medium leading-relaxed">{fix.recommendedAction}</p>
                            </div>
                        </li>
                    ))}
                </ol>
            </div>

            {/* Synthesis */}
            <div className="mb-10 p-6 sm:p-8 bg-[#0A0A0A] rounded-2xl text-white">
                <p className="text-xs font-bold uppercase tracking-widest text-[#FF6A00] mb-3">What this means for you</p>
                <p className="text-base sm:text-lg leading-relaxed font-medium">{synthesis}</p>
            </div>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Button href="/fit-call" size="lg" pill>
                    Book a fit call to walk through your score →
                </Button>
                <button
                    onClick={onReset}
                    type="button"
                    className="text-sm font-bold text-[#9CA3AF] hover:text-[#0A0A0A] transition-colors"
                >
                    Reset and re-score
                </button>
            </div>

        </Card>
    );
}
