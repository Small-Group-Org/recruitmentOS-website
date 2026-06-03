'use client';

import { useRef, useState, useEffect } from 'react';

export default function ProductDemo() {
    const containerRef = useRef<HTMLDivElement>(null);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                    observer.disconnect();
                }
            },
            { rootMargin: '200px' }
        );
        if (containerRef.current) observer.observe(containerRef.current);
        return () => observer.disconnect();
    }, []);

    return (
        <section className="bg-[#F9FAFB] py-20 md:py-28" id="demo">
            <div className="max-w-[1280px] mx-auto px-4 sm:px-6">
                {/* Heading */}
                <div className="text-center mb-12">
                    <p className="text-xs font-semibold uppercase tracking-widest text-[#FF6A00] mb-3">
                        Walkthrough
                    </p>
                    <h2
                        className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-[#0A0A0A] mb-4"
                        style={{ fontFamily: "'Inter', 'Helvetica Neue', sans-serif" }}
                    >
                        See the system in action.
                    </h2>
                    <p className="section-sub max-w-2xl mx-auto">
                        A 60-second look at how the engine works end to end — niche immersion, signal sourcing, outreach, and reply triage.
                    </p>
                </div>

                {/* Video Container */}
                <div className="w-full" ref={containerRef}>
                    <div className="bg-white border border-[#E5E5E5] rounded-2xl p-3 shadow-[0_4px_25px_rgba(0,0,0,0.04)] hover:shadow-[0_25px_55px_rgba(0,0,0,0.08)] hover:-translate-y-1 transition-all duration-500 ease-out">
                        <div className="relative w-full rounded-xl overflow-hidden bg-black" style={{ paddingTop: '56.25%' }}>
                            {isVisible ? (
                                <iframe
                                    src="https://fast.wistia.com/embed/iframe/qimej8fhke?seo=true&videoFoam=true"
                                    className="absolute inset-0 w-full h-full"
                                    title="RecruitmentOS Product Demo"
                                    allow="autoplay; fullscreen"
                                    allowFullScreen
                                />
                            ) : (
                                <div className="absolute inset-0 w-full h-full flex items-center justify-center bg-[#111]">
                                    <div className="w-16 h-16 rounded-full bg-white/10 flex items-center justify-center">
                                        <svg className="w-7 h-7 text-white ml-1" fill="currentColor" viewBox="0 0 24 24">
                                            <path d="M8 5v14l11-7z" />
                                        </svg>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
