'use client';

import { useState, useEffect } from 'react';

export default function ConsultationPopup() {
    const [isVisible, setIsVisible] = useState(false);
    const [shouldRender, setShouldRender] = useState(false);

    useEffect(() => {
        const initialTimer = setTimeout(() => {
            setShouldRender(true);
            requestAnimationFrame(() => setIsVisible(true));
        }, 120000); // 2 minutes initial

        return () => clearTimeout(initialTimer);
    }, []);

    const closePopup = () => {
        setIsVisible(false);
        // Remove from DOM after transition
        setTimeout(() => {
            setShouldRender(false);
            
            // Set a second timer to show it again after 3 minutes
            setTimeout(() => {
                setShouldRender(true);
                requestAnimationFrame(() => setIsVisible(true));
            }, 180000); // 3 minutes later
        }, 300);
    };

    const handleConsultation = () => {
        window.open('https://wa.me/919667353913?text=I%20want%20to%20get%20an%20AI%20consultation', '_blank');
        closePopup();
    };

    if (!shouldRender) return null;

    return (
        <div className={`fixed bottom-4 left-4 right-4 sm:bottom-6 sm:left-auto sm:right-6 sm:w-auto z-[200] sm:p-4 transition-all duration-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}>
            {/* Popup Content */}
            <div className={`relative bg-white w-full sm:max-w-[300px] rounded-2xl shadow-[0_15px_40px_rgba(0,0,0,0.12)] border border-gray-100 overflow-hidden transition-all duration-500 ease-out p-5`}>
                {/* Close Button */}
                <button 
                    onClick={closePopup}
                    className="absolute top-6 right-6 text-[#9CA3AF] hover:text-[#0A0A0A] transition-colors"
                >
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <line x1="18" y1="6" x2="6" y2="18"></line>
                        <line x1="6" y1="6" x2="18" y2="18"></line>
                    </svg>
                </button>

                {/* Header Section */}
                <div className="flex items-center gap-4 mb-6">
                    <div className="w-12 h-12 rounded-xl bg-[#FFF4EB] flex items-center justify-center shrink-0">
                        <div className="w-7 h-7 rounded-lg bg-[#FF6A00] flex items-center justify-center">
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round">
                                <polyline points="20 6 9 17 4 12"></polyline>
                            </svg>
                        </div>
                    </div>
                    <div>
                        <h3 className="text-lg font-extrabold text-[#0A0A0A] tracking-tight leading-none mb-1">Stay Connected!</h3>
                        <p className="text-[#6B7280] font-medium text-[10px]">Get exclusive insights</p>
                    </div>
                </div>

                <div className="text-center mb-4">
                    <h2 className="text-lg font-extrabold text-[#0A0A0A] tracking-tight mb-2 border-b border-[#E5E5E5] pb-2">
                        Live chat with CEO
                    </h2>
                </div>

                {/* Testimonial Section */}
                <div className="bg-[#FFF9F4] border border-[#FF6A00]/10 rounded-none p-5 mb-6 relative">
                    <div className="absolute top-5 left-5">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="#FF6A00" className="opacity-20">
                            <path d="M14.017 21L14.017 18C14.017 16.8954 14.9124 16 16.017 16H19.017C20.1216 16 21.017 16.8954 21.017 18V21C21.017 22.1046 20.1216 23 19.017 23H16.017C14.9124 23 14.017 22.1046 14.017 21ZM14.017 13L14.017 10C14.017 8.89543 14.9124 8 16.017 8H19.017C20.1216 8 21.017 8.89543 21.017 10V13C21.017 14.1046 20.1216 15 19.017 15H16.017C14.9124 15 14.017 14.1046 14.017 13ZM3 21L3 18C3 16.8954 3.89543 16 5 16H8C9.10457 16 10 16.8954 10 18V21C10 22.1046 9.10457 23 8 23H5C3.89543 23 3 22.1046 3 21ZM3 13L3 10C3 8.89543 3.89543 8 5 8H8C9.10457 8 10 8.89543 10 10V13C10 14.1046 9.10457 15 8 15H5C3.89543 15 3 14.1046 3 13Z" />
                        </svg>
                    </div>
                    <div className="flex flex-col gap-4">
                        <p className="text-[#374151] font-medium leading-relaxed italic text-sm">
                            "The insights from our consultation were a game-changer. We identified key areas for automation that we hadn't even considered."
                        </p>
                        <div className="flex items-center gap-3">
                            <div className="relative w-8 h-8 shrink-0">
                                <img 
                                    src="/testimonials/tushar.webp" 
                                    alt="Tushar mangla" 
                                    className="w-full h-full rounded-lg object-cover border border-[#FF6A00]/10 shadow-sm"
                                />
                            </div>
                            <div>
                                <div className="font-bold text-[#0A0A0A] leading-none mb-1 text-sm">Tushar mangla</div>
                                <div className="text-[10px] text-[#6B7280] font-medium">CEO, Tech Innovators</div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Buttons Section */}
                <div className="flex flex-col gap-2 mb-4">
                    <button 
                        onClick={handleConsultation}
                        className="w-full bg-[#FF6A00] text-white py-3 rounded-xl font-bold text-base shadow-lg shadow-orange-500/10 hover:bg-[#E55F00] transition-all"
                    >
                        Get AI Consultation
                    </button>
                    <button 
                        onClick={closePopup}
                        className="w-full bg-[#F1F3F5] text-[#374151] py-3 rounded-xl font-bold text-base hover:bg-[#E9ECEF] transition-colors"
                    >
                        Maybe Later
                    </button>
                </div>

                <p className="text-[11px] text-[#9CA3AF] text-center font-medium">
                    No spam, unsubscribe at any time. We respect your privacy.
                </p>
            </div>
        </div>
    );
}
