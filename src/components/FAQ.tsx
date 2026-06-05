'use client';

import { useState } from 'react';
import { JsonLd } from './JsonLd';
import { faqSchema } from '@/lib/schemas';

const faqs = [
    {
        question: 'How do we know the ROI makes sense?',
        answer: "We run the math live on the fit call. You give us your average placement fee, your close rate, and your current lead-to-meeting ratio. We map those against the volume the engine produces and the retainer cost. If the numbers don't work at your fee level, we'll tell you on the call — we'd rather lose the sale than set up a system that can't pay for itself.",
    },
    {
        question: 'How quickly does this pay for itself?',
        answer: "For most agencies a single placement covers months of the retainer. We size the math to your fee on the fit call — at typical placement fees, one closed role from the pipeline usually pays back the engagement several times over. The guarantee (below) means you carry almost none of the downside while it ramps.",
    },
    {
        question: 'What does the 60-day guarantee mean?',
        answer: '20,000+ verified hiring-manager contacts in your pipeline and 10 positive replies within 60 days, or we keep working free until we deliver. A positive reply = an on-brief reply from a hiring manager that matches your agreed Qualified Meeting Definition.',
    },
    {
        question: 'How is this different from hiring another BD rep?',
        answer: "A BD rep costs $60K+/year and handles maybe 50 prospects a day. The engine processes thousands of verified, signal-triggered leads a month, runs daily, and costs a fraction. It doesn't replace your recruiters — it replaces the prospecting layer so they only ever see qualified replies.",
    },
    {
        question: 'How does the engagement work — what do we actually pay for?',
        answer: "Two parts. First, a one-time setup (30–60 days) where we design and stand up your BD engine: ICP map, signal sourcing, sequences, CRM mapping, deliverability, reply SOPs, and team handover. Then a monthly retainer where we operate it for you — daily list curation, outreach, reply filtering, weekly reporting, and ongoing iteration. We walk through exact pricing for your situation on the fit call.",
    },
    {
        question: 'How are the leads sourced?',
        answer: 'Daily signal scraping — departures, funding announcements, leadership changes, restructures, hiring intent — enriched across 20+ data sources, ranked by signal recency and niche fit, and filtered to match your ICP. You only get companies with a live, current need.',
    },
    {
        question: 'What data do we get with each lead?',
        answer: 'Hiring manager name, direct email, job title, LinkedIn URL, company name, company size, the signal that triggered the lead (departure, funding, hiring trigger), and how recent that signal is. Everything you need to send a relevant first touch.',
    },
    {
        question: 'What counts as a "qualified meeting"?',
        answer: 'A qualified meeting is defined in a 7-component template signed before the retainer starts: correct title, correct authority level, correct niche, confirmed interest, confirmed budget band, defined next step, and a scheduled call. Every client gets a customised definition — so "qualified" means the same thing to both of us.',
    },
    {
        question: 'How long until we see results?',
        answer: 'Setup runs 30–60 days end-to-end. Most agencies see their first verified replies during week 4–5 as deliverability ramps and the signal engine starts surfacing real opportunities. Full handover at day 60.',
    },
    {
        question: 'What if we cancel mid-month?',
        answer: '30-day notice to cancel. No 3, 6, or 12-month minimums. At exit, you receive full handover documentation — every sequence, every domain config, every contact list. The pipeline keeps working without us.',
    },
    {
        question: 'Who owns the data and infrastructure?',
        answer: "You do. Every domain, inbox, sequence, CRM record, and contact list stays in your accounts. We configure and operate on your stack. If you fire us, everything keeps running.",
    },
    {
        question: 'What if we only need outreach — not the full system?',
        answer: "Most agencies need all five services together (BD strategy, signal sourcing, outreach, reply triage, reporting). But if you have a working ICP and just need execution, we can scope a leaner engagement. We decide on the fit call.",
    },
    {
        question: 'Do you really turn agencies down?',
        answer: "Yes. Three non-compromises: no outreach without niche-specific filtering, no promised meetings without a written Qualified Meeting Definition, and no setup for an agency whose delivery isn't ready. If you don't pass the 6-question fit interview, we won't take you on — even if you want to proceed.",
    },
    {
        question: 'How do you handle niche specificity?',
        answer: 'Each agency gets their own ICP map and signal sources. A biotech recruiter and an accounting recruiter share zero source data — we don\'t pretend they do. Niche specificity is the single biggest predictor of whether the engine performs.',
    },
    {
        question: 'What agencies do you work with?',
        answer: "Established recruitment agencies where the owner is the current BD bottleneck. Specifically: you have a delivery team that can handle more clients, you've placed at least a handful of clients in the last 12 months, you have a defined niche (not \"all industries\"), and you've already tried at least one BD method that didn't scale. We don't require a specific revenue band — we require that your delivery is ready for more volume before we start generating it.",
    },
    {
        question: 'How does the 10-Leads-a-Day campaign work?',
        answer: 'Apply at /free-leads-campaign with your niche, agency website, and monthly revenue. We verify fit within 24 hours. If approved, you receive 10 hand-verified hiring-manager contacts in your niche every day at 09:00 UTC for 30 days. 300 leads total. No commitment, no upsell during the campaign.',
    },
];

// Adapter for JSON-LD schema (uses {q, a} shape)
const faqsForSchema = faqs.map((f) => ({ q: f.question, a: f.answer }));

export default function FAQ() {
    const [openIndex, setOpenIndex] = useState<number | null>(0);

    return (
        <section className="py-16 md:py-24 bg-white border-t border-[#E5E5E5]" id="faq">
            <JsonLd data={faqSchema(faqsForSchema)} />
            <div className="max-w-[700px] mx-auto px-6">
                <div className="mb-12">
                    <p className="text-xs font-medium text-[#6B7280] uppercase tracking-widest mb-3">FAQ</p>
                    <h2 className="text-[#0A0A0A]">Common questions</h2>
                </div>

                <div>
                    {faqs.map((faq, index) => (
                        <div key={index} className="border-b border-[#E5E5E5]">
                            <button
                                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                                className="w-full flex items-center justify-between py-5 text-left group"
                            >
                                <span className="text-[15px] font-medium text-[#0A0A0A] pr-4 group-hover:text-[#6B7280] transition-colors">
                                    {faq.question}
                                </span>
                                <span className="text-[#9CA3AF] text-xl shrink-0 w-6 h-6 flex items-center justify-center rounded-full border border-[#E5E5E5] group-hover:border-[#D1D5DB] transition-colors">
                                    <svg
                                        className={`w-3 h-3 transition-transform duration-200 ${openIndex === index ? 'rotate-45' : ''}`}
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                        strokeWidth="2"
                                        strokeLinecap="round"
                                    >
                                        <path d="M12 5v14M5 12h14" />
                                    </svg>
                                </span>
                            </button>
                            <div
                                className={`overflow-hidden transition-all duration-200 ${
                                    openIndex === index ? 'max-h-[500px] pb-5' : 'max-h-0'
                                }`}
                            >
                                <p className="text-sm text-[#6B7280] leading-relaxed pr-10">{faq.answer}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
