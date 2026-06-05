'use client';

import { useState } from 'react';

const faqs = [
    {
        question: 'How do you guarantee 6%+ reply rates?',
        answer: 'We don\'t just promise it—we prove it. Every lead batch comes with verified reply rate data from our own campaigns. We only deliver leads that have been tested and proven to convert. If the quality drops, you don\'t pay.'
    },
    {
        question: 'How long does setup take?',
        answer: 'Zero setup on your end. We handle everything: scraping, enrichment, verification, and delivery. You get your first 1,000 leads within 7 days of signing up. It\'s truly plug-and-play.'
    },
    {
        question: 'What if I need more than 1,000 leads per month?',
        answer: 'We can scale to 100,000+ leads per month. Our system scrapes 1M+ jobs monthly, so volume is never an issue. Just let us know your target, and we\'ll deliver.'
    },
    {
        question: 'Can I cancel anytime?',
        answer: 'Yes. No long-term contracts. Cancel anytime with 30 days notice. We earn your business every month by delivering quality leads that actually convert.'
    }
];

export default function QuickFAQ() {
    const [openIndex, setOpenIndex] = useState<number | null>(0);

    return (
        <section className="py-16 md:py-24 bg-white">
            <div className="max-w-[800px] mx-auto px-5">
                {/* Header */}
                <div className="text-center mb-10">
                    <h2 className="text-2xl sm:text-3xl md:text-4xl font-black mb-4 text-[#1F2937] tracking-tight">
                        Quick Questions?
                    </h2>
                    <p className="text-base sm:text-lg text-[#4B5563] font-bold">
                        Everything you need to know before getting started
                    </p>
                </div>

                {/* FAQ Items */}
                <div className="space-y-4">
                    {faqs.map((faq, index) => (
                        <div
                            key={index}
                            className="bg-[#F9FAFB] border-2 border-[#1F2937] rounded-2xl overflow-hidden transition-all"
                        >
                            <button
                                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                                className="w-full text-left p-5 sm:p-6 flex items-center justify-between gap-4 hover:bg-[#E0F2FE] transition-colors"
                            >
                                <span className="text-base sm:text-lg font-black text-[#1F2937]">
                                    {faq.question}
                                </span>
                                <span className="text-2xl font-black text-[#1F2937] flex-shrink-0">
                                    {openIndex === index ? '−' : '+'}
                                </span>
                            </button>
                            {openIndex === index && (
                                <div className="px-5 sm:px-6 pb-5 sm:pb-6">
                                    <p className="text-sm sm:text-base text-[#4B5563] font-medium leading-relaxed">
                                        {faq.answer}
                                    </p>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
