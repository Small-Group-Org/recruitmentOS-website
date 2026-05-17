'use client';

import { useState } from 'react';
import { JsonLd } from './JsonLd';
import { faqSchema } from '@/lib/schemas';

const faqs = [
    {
        question: "What's the difference between Build and Run?",
        answer: "Build is a one-time 30–60 day engagement where we design and stand up your BD engine — ICP map, signal engine, sequences, CRM mapping, deliverability config, reply SOPs, and team handover. Run is the monthly retainer where we operate it: daily list curation, sequence execution, reply triage, weekly reporting, and monthly iteration.",
    },
    {
        question: 'How are the leads sourced?',
        answer: 'Daily signal scraping — departures, funding announcements, leadership changes, restructures, hiring intent — via Apify/Phantombuster, enriched via ZoomInfo or Apollo, ranked by signal recency and niche fit, and filtered to match your ICP map.',
    },
    {
        question: 'Do you really turn agencies down?',
        answer: "Yes. Three non-compromises: no outreach without niche-specific filtering, no promised meetings without a written Qualified Meeting Definition, and no Build for an agency whose delivery isn't ready. If you don't pass the 6-question fit interview, we won't take you on — even if you want to proceed.",
    },
    {
        question: 'What does the 60-day guarantee mean?',
        answer: '100 hiring-manager contacts in your pipeline and 10 verified replies within 60 days, or we work free until we deliver. Verified reply = a positive-intent reply from a hiring manager that matches your Qualified Meeting Definition.',
    },
    {
        question: 'What counts as a "qualified meeting"?',
        answer: 'A qualified meeting is defined in a 7-component template signed before the Run contract executes: correct title, correct authority level, correct niche, confirmed interest, confirmed budget band, defined next step, and a scheduled call. Every client gets a customised definition.',
    },
    {
        question: 'How does the 10-Leads-a-Day campaign work?',
        answer: 'Apply at /free-leads-campaign with your niche, agency website, and monthly revenue. We verify fit within 24 hours. If approved, you receive 10 hand-verified hiring-manager contacts in your niche every day at 09:00 UTC for 30 days. 300 leads total. No commitment, no upsell during the campaign.',
    },
    {
        question: 'What if we cancel Run mid-month?',
        answer: '30-day notice to cancel. No 3, 6, or 12-month minimums. At exit, you receive full handover documentation — every sequence, every domain config, every contact list. The pipeline keeps working without us.',
    },
    {
        question: 'How long does setup take?',
        answer: 'The Build is 30–60 days end-to-end. Most agencies see their first verified replies during week 4–5 as deliverability ramps and the signal engine starts surfacing real opportunities. Full handover at day 60.',
    },
    {
        question: 'Who owns the data and infrastructure?',
        answer: "You do. Every domain, inbox, sequence, CRM record, and contact list stays in your accounts. We configure and operate on your stack. If you fire us, everything keeps running.",
    },
    {
        question: 'What if we only need outreach — not the full system?',
        answer: "Most agencies need all five services together (BD strategy, signal sourcing, outreach, reply triage, reporting). But if you have a working ICP and just need execution, we can scope a leaner Run engagement. We decide on the fit call.",
    },
    {
        question: 'How is this different from hiring another BD rep?',
        answer: "A BD rep costs $60K+/year and handles maybe 50 prospects a day. The engine processes 2,500–25,000 verified leads/month, runs daily, and costs a fraction. It doesn't replace your recruiters — it replaces the prospecting layer so they only see qualified replies.",
    },
    {
        question: 'How do you handle niche specificity?',
        answer: 'Each agency gets their own ICP map and signal sources. A biotech recruiter and an accounting recruiter share zero source data — we don\'t pretend they do. Niche specificity is the single biggest predictor of whether the engine performs.',
    },
    {
        question: 'Why WhatsApp?',
        answer: 'Tushar replies personally to questions there. The floating button bottom-right of every page opens a chat directly with him. Most queries get a same-day reply — faster than email.',
    },
    {
        question: 'What data do we get with each lead?',
        answer: 'Hiring manager name, direct email, job title, LinkedIn URL, company name, company size, signal that triggered the lead (departure, funding, hiring trigger), and recency of the signal. Everything you need to send a relevant first touch.',
    },
];

// Adapter for JSON-LD schema (uses {q, a} shape)
const faqsForSchema = faqs.map((f) => ({ q: f.question, a: f.answer }));

export default function FAQ() {
    const [openIndex, setOpenIndex] = useState<number | null>(0);

    return (
        <section className="py-20 md:py-28 bg-white border-t border-[#e5e5e5]" id="faq">
            <JsonLd data={faqSchema(faqsForSchema)} />
            <div className="max-w-[720px] mx-auto px-6">
                <div className="mb-12">
                    <p className="text-xs font-medium text-[#6b7280] uppercase tracking-widest mb-3">FAQ</p>
                    <h2 className="text-[#0A0A0A]">Common questions</h2>
                </div>

                <div>
                    {faqs.map((faq, index) => (
                        <div key={index} className="border-b border-[#e5e5e5]">
                            <button
                                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                                className="w-full flex items-center justify-between py-5 text-left group"
                            >
                                <span className="text-[15px] font-medium text-[#0A0A0A] pr-4 group-hover:text-[#6b7280] transition-colors">
                                    {faq.question}
                                </span>
                                <span className="text-[#9ca3af] text-xl shrink-0 w-6 h-6 flex items-center justify-center rounded-full border border-[#e5e5e5] group-hover:border-[#d4d4d4] transition-colors">
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
                                <p className="text-sm text-[#6b7280] leading-relaxed pr-10">{faq.answer}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
