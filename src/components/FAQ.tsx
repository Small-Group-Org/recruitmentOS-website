'use client';

import { useState } from 'react';

const faqs = [
    {
        question: 'Will this work for my specific niche?',
        answer: 'Almost certainly yes. The system is built on job-board data and hiring-manager enrichment — both of which work across engineering, finance, legal, healthcare, supply chain, and any other professional vertical. The targeting rules are configured to your niche at onboarding. If we have worked in your exact niche before, we\'ll tell you. If we haven\'t, we\'ll tell you that too.',
    },
    {
        question: 'What about API costs (ZoomInfo, scraping, sending)?',
        answer: 'Tooling runs $700–1,200/month, paid directly on your accounts. No markup. You see every line item. You own the accounts, the data, and the sender reputation — not us.',
    },
    {
        question: 'What if my recruiters can\'t handle the volume?',
        answer: 'Good problem to have. We pace the pipeline to match your capacity. Most agencies start at 100 contacts/month and scale up as their intake process improves. We\'d rather deliver 100 well-handled replies than 500 you can\'t act on.',
    },
    {
        question: 'What if I want to cancel?',
        answer: 'After your minimum term, cancel with 30 days notice. Because we run on your accounts — your Smartlead, your Apollo, your domains — the pipeline keeps working after you leave. You don\'t lose anything.',
    },
    {
        question: 'Can I just buy the software and run it myself?',
        answer: 'You could. Apollo, Smartlead, and Clay are all available directly. If you want to spend 3–6 months learning how to configure them, write the enrichment workflows, manage deliverability, and iterate on copy — go ahead. We\'ve already done that work. The question isn\'t whether you can. It\'s whether that\'s the best use of your time.',
    },
    {
        question: 'Do you guarantee placements?',
        answer: 'No. We guarantee 100 verified hiring-manager contacts and 10 verified replies in 60 days, or we work free. Placements depend on your recruiters\' ability to close — that\'s not our function. We get the conversations started. You close them.',
    },
    {
        question: 'How is this different from Agency Leads, Apollo, or other tools?',
        answer: 'Those give you data. We run the function. Agency Leads gives you a list. Apollo gives you a database. You still have to do the targeting, enrichment, outreach, follow-up, and reply handling. RecruitmentOS does all of it — as a service, on your accounts.',
    },
    {
        question: "What's the catch?",
        answer: "We're picky about who we work with. We don't take agencies under $50K/month, agencies whose bottleneck is candidates not clients, or anyone who wants a self-serve tool they can run themselves. If you fit the profile, the service works. If you don't, we'll tell you upfront rather than take your money and underdeliver.",
    },
];

export default function FAQ() {
    const [openIndex, setOpenIndex] = useState<number | null>(0);

    return (
        <section className="py-16 md:py-24 bg-white border-t border-[#e5e5e5]" id="faq">
            <div className="max-w-[720px] mx-auto px-4 sm:px-6">
                <div className="mb-12">
                    <p className="text-xs font-medium text-[#6b7280] uppercase tracking-widest mb-3">FAQ</p>
                    <h2 className="text-[#0A0A0A] text-3xl md:text-4xl font-extrabold tracking-tight">
                        Common questions
                    </h2>
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
