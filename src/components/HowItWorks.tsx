'use client';

import React from 'react';

const steps = [
    {
        timing: 'Week 1',
        title: 'Kickoff & stack setup',
        description: 'Single onboarding call. We configure your sender accounts, connect to your data sources, and define your target verticals. Nothing to install.',
    },
    {
        timing: 'Week 2',
        title: 'First outreach batch',
        description: 'First verified hiring-manager contacts enriched. First personalised emails out. You start seeing replies in your inbox.',
    },
    {
        timing: 'Month 1',
        title: '50+ contacts in your pipeline',
        description: 'Milestone 1: 50 verified hiring-manager contacts in your target verticals. System is optimising on live reply data.',
    },
    {
        timing: 'Month 2+',
        title: '100 contacts. 10 replies. Guaranteed.',
        description: 'Milestone 2: 100 verified contacts + 10 verified replies from hiring managers. If we miss either milestone, we keep working at zero cost until both hit.',
        highlighted: true,
    },
];

export default function HowItWorks() {
    return (
        <section className="py-16 md:py-24 bg-white border-t border-[#e5e5e5]" id="how-it-works">
            <div className="max-w-[900px] mx-auto px-4 sm:px-6">
                <div className="mb-12">
                    <p className="text-xs font-medium text-[#6b7280] uppercase tracking-widest mb-3">How It Works</p>
                    <h2 className="text-[#0A0A0A] text-3xl md:text-4xl font-extrabold tracking-tight">
                        From kickoff to 100 contacts in 60 days.
                    </h2>
                </div>

                <div className="relative">
                    {/* Vertical line */}
                    <div className="absolute left-[19px] top-5 bottom-5 w-px bg-[#e5e5e5] hidden md:block" />

                    <div className="space-y-5">
                        {steps.map((step, i) => (
                            <div
                                key={i}
                                className={`relative md:pl-14 rounded-[14px] border p-6 md:p-7 ${
                                    step.highlighted
                                        ? 'bg-[#0A0A0A] border-[#0A0A0A] text-white'
                                        : 'bg-white border-[#e5e5e5]'
                                }`}
                            >
                                {/* Dot on timeline */}
                                <div
                                    className={`hidden md:flex absolute left-0 top-7 w-10 h-10 rounded-full items-center justify-center text-xs font-bold border-2 ${
                                        step.highlighted
                                            ? 'bg-[#F97316] border-[#F97316] text-white'
                                            : 'bg-white border-[#e5e5e5] text-[#9ca3af]'
                                    }`}
                                >
                                    {i + 1}
                                </div>

                                <div className="flex flex-col md:flex-row md:items-start gap-3 md:gap-6">
                                    <span className={`text-[11px] font-bold uppercase tracking-widest shrink-0 ${step.highlighted ? 'text-[#F97316]' : 'text-[#9ca3af]'}`}>
                                        {step.timing}
                                    </span>
                                    <div>
                                        <h3 className={`text-lg font-bold mb-1.5 ${step.highlighted ? 'text-white' : 'text-[#0A0A0A]'}`}>
                                            {step.title}
                                        </h3>
                                        <p className={`text-[15px] leading-relaxed ${step.highlighted ? 'text-[#9ca3af]' : 'text-[#6b7280]'}`}>
                                            {step.description}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
