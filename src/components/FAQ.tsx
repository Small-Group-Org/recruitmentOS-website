'use client';

import { useState } from 'react';
import { homeFaqs } from '@/lib/faq-data';

export default function FAQ() {
    const [openIndex, setOpenIndex] = useState<number | null>(0);

    return (
        <section className="py-16 md:py-24 bg-white border-t border-[#E5E5E5]" id="faq">
            <div className="max-w-[700px] mx-auto px-6">
                <div className="mb-12">
                    <p className="text-xs font-medium text-[#6B7280] uppercase tracking-widest mb-3">FAQ</p>
                    <h2 className="text-[#0A0A0A]">Common questions</h2>
                </div>

                <div>
                    {homeFaqs.map((faq, index) => (
                        <div key={index} className="border-b border-[#E5E5E5]">
                            <button
                                id={`faq-button-${index}`}
                                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                                aria-expanded={openIndex === index}
                                aria-controls={`faq-panel-${index}`}
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
                                id={`faq-panel-${index}`}
                                role="region"
                                aria-labelledby={`faq-button-${index}`}
                                className={`grid transition-[grid-template-rows] duration-200 ${openIndex === index ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'
                                    }`}
                            >
                                <div className="overflow-hidden">
                                    <p className="pb-5 text-sm text-[#6B7280] leading-relaxed pr-10">{faq.answer}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
