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
        <section className="bg-[#F9FAFB] py-16 md:py-24" id="demo">
            <div className="max-w-[1280px] mx-auto px-4 sm:px-6">
                {/* Trusted By Section */}
                <div className="flex flex-col items-center justify-center mb-6 pt-2">
                    <div className="flex -space-x-3 mb-2">
                        {[
                            { id: 1, name: 'Human Capital Ventures' },
                            { id: 2, name: 'K Logo' },
                            { id: 3, name: 'Orion Placement' },
                            { id: 4, name: 'Call It Recruiting' },
                            { id: 5, name: 'Incube' }
                        ].map((company, idx) => (
                            <div 
                                key={company.id} 
                                className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-white shadow-md border-2 border-[#F9FAFB] flex items-center justify-center overflow-hidden relative hover:scale-110 hover:-translate-y-1 hover:z-50 transition-all duration-300 cursor-pointer"
                                style={{ zIndex: 10 - idx }}
                            >
                                <img src={`/logos/${company.id}.webp`} alt={company.name} className="w-full h-full object-cover" />
                            </div>
                        ))}
                    </div>
                    <p className="text-[11px] sm:text-xs font-medium text-neutral-400">
                        Trusted by top agencies
                    </p>
                </div>

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
                                <div className="absolute inset-0 w-full h-full flex items-center justify-center bg-[#0A0A0A]">
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
