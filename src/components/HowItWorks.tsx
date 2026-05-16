'use client';

import React, { useEffect, useState, useRef } from 'react';

const steps = [
  {
    id: 1,
    title: 'AI Audit',
    description: 'We audit your business to map out the highest ROI AI implementations.',
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
      </svg>
    ),
  },
  {
    id: 2,
    title: 'Prototype',
    description: 'We prototype your AI system before the project and define the scope.',
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
      </svg>
    ),
  },
  {
    id: 3,
    title: 'Deployment',
    description: 'We deploy our AI system and test it rigorously on real world benchmarks.',
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  },
];

export default function HowItWorks() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="py-8 bg-white" id="how-it-works">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6">
        <div className="text-center mb-6">
          <h2 className="text-3xl font-bold text-[#111] tracking-tight" style={{ fontFamily: "'Inter', sans-serif" }}>
            How its Work

          </h2>
        </div>

        {/* Desktop: Horizontal layout with SVG connector */}
        <div className="hidden md:block w-full h-[191px] relative">
          <div className="absolute inset-0 z-0 pointer-events-none">
            <svg width="100%" height="100%" viewBox="0 0 1128 191" fill="none" preserveAspectRatio="none">
              <path
                d="M188,95 Q423,135 564,95 T940,95"
                stroke="#FF6A00"
                strokeWidth="1.2"
                strokeOpacity="0.1"
                fill="none"
              />
              <path
                d="M188,95 Q423,135 564,95 T940,95"
                stroke="#FF6A00"
                strokeWidth="2.5"
                strokeOpacity="0.7"
                strokeDasharray="30, 200"
                fill="none"
              >
                <animate
                  attributeName="stroke-dashoffset"
                  from="230"
                  to="0"
                  dur="2.5s"
                  repeatCount="indefinite"
                />
              </path>
            </svg>
          </div>

          <div className="w-full grid grid-cols-3 relative z-10 h-full items-center">
            {steps.map((step) => (
              <div key={step.id} className="flex flex-col items-center justify-center">
                <div className="w-[72px] h-[72px] rounded-full border border-[#FF6A00]/25 bg-white flex items-center justify-center text-[#FF6A00] shadow-sm relative overflow-hidden group hover:scale-105 transition-transform duration-300">
                  <div className="absolute inset-0 bg-[#FF6A00]/5 group-hover:bg-[#FF6A00]/10 transition-colors" />
                  <div className="relative z-10 scale-[0.65]">
                    {step.icon}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Desktop: Text row */}
        <div className="hidden md:grid max-w-[1280px] mx-auto grid-cols-3 gap-0 mt-2">
          {steps.map((step) => (
            <div key={step.id} className="text-center px-6">
              <h3 className="text-lg font-bold text-[#111] mb-2 leading-none">
                {step.id}. {step.title}
              </h3>
              <p className="text-[#666] leading-snug text-xs max-w-[240px] mx-auto">
                {step.description}
              </p>
            </div>
          ))}
        </div>

        {/* Mobile: Vertical stacked layout */}
        <div className="md:hidden flex flex-col gap-6 mt-2">
          {steps.map((step) => (
            <div key={step.id} className="flex items-start gap-4">
              <div className="w-14 h-14 rounded-full border border-[#FF6A00]/25 bg-white flex items-center justify-center text-[#FF6A00] shadow-sm shrink-0 relative overflow-hidden">
                <div className="absolute inset-0 bg-[#FF6A00]/5" />
                <div className="relative z-10 scale-[0.6]">
                  {step.icon}
                </div>
              </div>
              <div className="pt-1">
                <h3 className="text-base font-bold text-[#111] mb-1 leading-none">
                  {step.id}. {step.title}
                </h3>
                <p className="text-[#666] leading-snug text-sm">
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
