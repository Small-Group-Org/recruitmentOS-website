'use client';

import React from 'react';
import Link from 'next/link';
import { caseStudies } from '@/lib/case-studies-data';

export default function CaseStudiesListPage() {
  return (
    <div className="min-h-screen bg-[#F9FAFB] pt-24 pb-32">
      <div className="max-w-[1200px] mx-auto px-6 sm:px-10">

        {/* Header */}
        <div className="mb-16">
          <p className="text-xs font-medium text-[#6b7280] uppercase tracking-widest mb-3">Real results</p>
          <h1 className="text-3xl md:text-5xl font-extrabold text-[#0A0A0A] tracking-tight mb-4">
            Case Studies
          </h1>
          <p className="text-lg text-[#6b7280] max-w-xl">
            How recruitment agencies scaled placements and freed up founder time using RecruitmentOS.
          </p>
        </div>

        {/* Card Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {caseStudies.map((study) => (
            <Link
              key={study.slug}
              href={`/case-studies/${study.slug}`}
              className="group bg-white rounded-[16px] border border-[#e5e5e5] overflow-hidden hover:shadow-lg hover:-translate-y-1 transition-all duration-300 flex flex-col"
            >
              {/* Image */}
              <div className="relative overflow-hidden h-56 bg-[#F5F5F5]">
                <img
                  src={study.image}
                  alt={study.title}
                  className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-500"
                />
                {/* Stat badge */}
                <div className="absolute top-4 left-4 bg-[#0A0A0A] text-white text-[11px] font-bold uppercase tracking-widest px-3 py-1.5 rounded-full">
                  {study.cardStats}
                </div>
              </div>

              {/* Content */}
              <div className="p-7 flex flex-col flex-1">
                <h2 className="text-lg md:text-xl font-bold text-[#0A0A0A] leading-snug mb-3 group-hover:text-[#F97316] transition-colors">
                  {study.cardTitle}
                </h2>

                <p className="text-[14px] text-[#6b7280] leading-relaxed line-clamp-3 mb-6 flex-1">
                  {study.problem.split('\n')[0]}
                </p>

                <div className="inline-flex items-center gap-2 text-[13px] font-bold text-[#0A0A0A] group-hover:text-[#F97316] transition-colors">
                  Read full case study
                  <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </div>
              </div>
            </Link>
          ))}
        </div>

      </div>
    </div>
  );
}
