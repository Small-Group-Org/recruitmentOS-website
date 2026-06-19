'use client';

import Link from 'next/link';
import React from 'react';
import { trackCTAClick } from '@/lib/analytics';
import HeroDashboard from './ui/HeroDashboard';

export default function Hero() {
    return (
        <section className="relative overflow-hidden pt-12 md:pt-20 pb-16 md:pb-24 bg-white font-sans" id="hero">
            {/* Background elements */}
            <div className="absolute inset-0 z-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-orange-50 via-white to-white pointer-events-none" />
            <div className="absolute top-0 right-0 w-full h-[600px] bg-[url('/noise.png')] opacity-[0.03] pointer-events-none mix-blend-overlay" />
            
            <div className="relative z-10 max-w-[1280px] mx-auto px-4 sm:px-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-8 items-center">
                    
                    {/* Left Column: Content */}
                    <div className="flex flex-col items-start text-left max-w-2xl">
                        {/* Badge */}
                        <div className="inline-flex items-center gap-2 bg-white border border-orange-100 rounded-full px-4 py-1.5 text-[11px] font-bold text-neutral-800 uppercase tracking-widest shadow-sm mb-6 md:mb-8">
                            <svg className="w-4 h-4 text-[#FF6B00]" fill="currentColor" viewBox="0 0 20 20">
                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                            </svg>
                            FOR RECRUITMENT AGENCIES
                        </div>

                        {/* Headline */}
                        <h1 className="text-5xl sm:text-6xl lg:text-[4.5rem] font-black tracking-[-0.04em] text-neutral-900 leading-[1.05] mb-6">
                            <span className="block mb-1">We replace your BD function.</span>
                            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-[#FF6B00] to-[#FF8C33]">
                                You stop being the bottleneck.
                            </span>
                        </h1>

                        {/* Subheadline */}
                        <p className="text-lg text-neutral-500 mb-10 leading-relaxed max-w-lg font-medium">
                            We source prospects, enrich data, run outreach, and qualify replies. Your team only steps in when a hiring manager is ready to talk.
                        </p>

                        {/* Process Flow */}
                        <div className="flex items-start gap-2 mb-10 overflow-x-auto pb-4 w-full scrollbar-hide max-w-full">
                            {[
                                { 
                                    icon: (
                                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                        </svg>
                                    ), 
                                    label: 'Lead\nDiscovery' 
                                },
                                { 
                                    icon: (
                                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                        </svg>
                                    ), 
                                    label: 'Hiring Manager\nData' 
                                },
                                { 
                                    icon: (
                                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                        </svg>
                                    ), 
                                    label: 'Personalized\nOutreach' 
                                },
                                { 
                                    icon: (
                                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
                                        </svg>
                                    ), 
                                    label: 'Positive Reply\nFiltering' 
                                },
                                { 
                                    icon: (
                                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                        </svg>
                                    ), 
                                    label: 'Meeting Ready\nPipeline' 
                                }
                            ].map((step, idx) => (
                                <React.Fragment key={idx}>
                                    <div className="flex flex-col items-center min-w-[70px] group">
                                        <div className="w-12 h-12 rounded-2xl bg-white border border-neutral-100 shadow-sm flex items-center justify-center text-[#FF6B00] mb-2 group-hover:scale-110 group-hover:shadow-md transition-all">
                                            {step.icon}
                                        </div>
                                        <span className="text-[10px] font-bold text-center text-neutral-600 whitespace-pre-line leading-tight">
                                            {step.label}
                                        </span>
                                    </div>
                                    {idx < 4 && (
                                        <div className="flex-shrink-0 w-6 h-12 flex items-center justify-center text-neutral-300">
                                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                                            </svg>
                                        </div>
                                    )}
                                </React.Fragment>
                            ))}
                        </div>

                        {/* CTAs */}
                        <div className="flex flex-col sm:flex-row items-center gap-4 w-full">
                            <a
                                href="https://cal.com/tusharm/30min?user=tusharm"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-[#FF6B00] text-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-[#e66000] shadow-lg shadow-[#FF6B00]/20 transition-all hover:scale-105"
                            >
                                Book a strategy call
                                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                                </svg>
                            </a>

                            <Link
                                href="#solution-overview"
                                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-white text-neutral-800 px-8 py-4 rounded-xl font-bold text-lg border border-neutral-200 hover:bg-neutral-50 shadow-sm transition-all"
                            >
                                See how it works
                                <div className="w-6 h-6 rounded-full border-2 border-current flex items-center justify-center">
                                    <svg className="w-2.5 h-2.5 ml-0.5" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M8 5v14l11-7z" />
                                    </svg>
                                </div>
                            </Link>
                        </div>
                        
                        {/* Trust items */}
                        <div className="flex flex-wrap items-center gap-x-6 gap-y-3 mt-8 text-sm font-semibold text-neutral-600">
                            <span className="flex items-center gap-1.5">
                                <svg className="w-4 h-4 text-[#FF6B00]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                                </svg>
                                No long-term contracts
                            </span>
                            <span className="flex items-center gap-1.5">
                                <svg className="w-4 h-4 text-[#FF6B00]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                                </svg>
                                Done-for-you system
                            </span>
                            <span className="flex items-center gap-1.5">
                                <svg className="w-4 h-4 text-[#FF6B00]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                                </svg>
                                Results in 60 days
                            </span>
                        </div>

                    </div>

                    {/* Right Column: Dashboard Visual */}
                    <div className="w-full mt-12 lg:mt-0 lg:pl-10 relative">
                        <HeroDashboard />
                    </div>
                    
                </div>
            </div>
        </section>
    );
}
