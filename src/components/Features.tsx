'use client';

import React from 'react';
import Link from 'next/link';

const services = [
  {
    id: 'lead-gen',
    tag: 'LEAD GENERATION',
    tagColor: 'bg-[#e8f5ef] text-[#1a6b4a]',
    headline: 'Find real hiring managers automatically',
    description: "AI identifies and ranks the actual decision makers tied to each departed candidate. Enriches their contact info (email, LinkedIn) and generates personalized outreach messages that don't sound like AI.",
    cta: 'Get sample leads →'
  },
  {
    id: 'job-intel',
    tag: 'JOB INTELLIGENCE',
    tagColor: 'bg-[#eeebfb] text-[#3d2e7c]',
    headline: 'Only high-intent job opportunities',
    description: 'Filters out Recruiter spam and duplicates so you only see real openings with a direct path to hiring managers.',
    cta: 'Explore jobs →'
  },
  {
    id: 'candidate-match',
    tag: 'CANDIDATE MATCHING',
    tagColor: 'bg-[#fdf6e8] text-[#b8862a]',
    headline: 'Match candidates to roles in seconds',
    description: 'AI ranks candidates against job requirements and builds ready-to-send shortlists instantly.',
    cta: 'Explore jobs →'
  },
  {
    id: 'outreach',
    tag: 'OUTREACH ENGINE',
    tagColor: 'bg-[#fcecea] text-[#c0412b]',
    headline: 'Emails that actually get replies',
    description: 'Hyper-personalized outreach based on role, company, and company context that feels human, not automated.',
    cta: 'View demo →'
  },
  {
    id: 'custom-ai',
    tag: 'CUSTOM AI SOLUTIONS',
    tagColor: 'bg-[#e3f2fd] text-[#0d47a1]',
    headline: 'Custom AI built around your recruitment workflow',
    description: "We dig into your agency's specific bottlenecks — whether it's sourcing, screening, or client reporting — and engineer AI solutions tailored to how you actually work, not generic templates.",
    cta: 'Book a discovery call →'
  }
];

export default function Features() {
  return (
    <section className="py-24 bg-white" id="services">
      <div className="max-w-[1240px] mx-auto px-6 sm:px-10">

        {/* Section Header */}
        <div className="mb-20">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-[#0A0A0A] tracking-tighter">
            Our Services
          </h2>
        </div>

        {/* Timeline Container */}
        <div className="relative">

          {/* Vertical Line */}
          <div className="absolute left-[22px] top-0 bottom-0 w-[1px] bg-gray-200 hidden md:block"></div>

          <div className="space-y-24">
            {services.map((service, index) => (
              <div key={service.id} className="relative flex flex-col md:flex-row gap-12 md:gap-20">

                {/* Timeline Dot (Desktop only) */}
                <div className="absolute left-0 top-2 hidden md:flex items-center justify-center w-11 h-11 bg-white border border-black rounded-full z-10">
                  <div className="w-1.5 h-1.5 bg-black rounded-full"></div>
                </div>

                {/* Content Area */}
                <div className="flex-1 md:pl-24">
                  {/* Badge */}
                  <div className="mb-6">
                    <span className={`inline-block text-[10px] font-bold uppercase tracking-[0.1em] px-3 py-1 rounded-sm ${service.tagColor}`}>
                      {service.tag}
                    </span>
                  </div>

                  {/* Headline with Highlight */}
                  <div className="mb-6">
                    <h3 className="text-2xl md:text-3xl lg:text-4xl font-bold tracking-tight text-gray-900 leading-tight">
                      <span className="relative inline-block">
                        <span className="relative z-10">{service.headline}</span>
                        <span className="absolute bottom-0 left-0 right-0 h-[60%] bg-[#FDEDD3]/60 -z-0 rounded-sm transform -rotate-1"></span>
                      </span>
                    </h3>
                  </div>

                  {/* Description */}
                  <p className="text-lg text-gray-600 leading-relaxed max-w-[640px] mb-8 font-medium italic">
                    {service.description}
                  </p>

                  {/* CTA */}
                  <Link
                    href="https://cal.com/tusharm/30min?user=tusharm"
                    target="_blank"
                    className="inline-flex items-center text-base font-bold text-black group"
                  >
                    <span className="border-b-2 border-black pb-0.5 group-hover:border-[#FF6A00] transition-colors">
                      {service.cta}
                    </span>
                  </Link>
                </div>

              </div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}
