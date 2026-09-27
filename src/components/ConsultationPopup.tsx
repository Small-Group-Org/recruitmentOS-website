'use client';

import { useEffect, useRef, useState } from 'react';
import { Button } from '@/components/ui';

const INITIAL_DELAY_MS = 120000;
const RESHOW_DELAY_MS = 180000;
const DISMISSED_UNTIL_KEY = 'rOS_consultation_dismissed_until';

export default function ConsultationPopup() {
    const [isVisible, setIsVisible] = useState(false);
    const [shouldRender, setShouldRender] = useState(false);
    const showTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
    const hideTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

    useEffect(() => {
        const showPopup = () => {
            sessionStorage.removeItem(DISMISSED_UNTIL_KEY);
            setShouldRender(true);
            requestAnimationFrame(() => setIsVisible(true));
        };

        const dismissedUntil = Number(sessionStorage.getItem(DISMISSED_UNTIL_KEY) ?? 0);
        const delay = dismissedUntil > Date.now()
            ? dismissedUntil - Date.now()
            : INITIAL_DELAY_MS;

        showTimerRef.current = setTimeout(showPopup, delay);

        return () => {
            if (showTimerRef.current) clearTimeout(showTimerRef.current);
            if (hideTimerRef.current) clearTimeout(hideTimerRef.current);
        };
    }, []);

    const closePopup = () => {
        const dismissedUntil = Date.now() + RESHOW_DELAY_MS;
        sessionStorage.setItem(DISMISSED_UNTIL_KEY, String(dismissedUntil));
        if (showTimerRef.current) clearTimeout(showTimerRef.current);
        setIsVisible(false);
        // Remove from DOM after transition
        hideTimerRef.current = setTimeout(() => {
            setShouldRender(false);

            // Set a second timer to show it again after 3 minutes
            showTimerRef.current = setTimeout(() => {
                sessionStorage.removeItem(DISMISSED_UNTIL_KEY);
                setShouldRender(true);
                requestAnimationFrame(() => setIsVisible(true));
            }, RESHOW_DELAY_MS);
        }, 300);
    };

    const handleConsultation = () => {
        window.open('https://wa.me/919667353913?text=I%20want%20to%20get%20an%20AI%20consultation', '_blank');
        closePopup();
    };

    if (!shouldRender) return null;

    return (
        <div className={`fixed bottom-24 left-4 right-4 sm:bottom-6 sm:left-auto sm:right-6 sm:w-auto z-[200] sm:p-4 transition-all duration-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}>
            {/* Popup Content */}
            <div className={`relative bg-white w-full sm:max-w-[300px] rounded-2xl shadow-[0_15px_40px_rgba(0,0,0,0.12)] border border-gray-100 overflow-hidden transition-all duration-500 ease-out p-5`}>
                {/* Close Button */}
                <button 
                    onClick={closePopup}
                    aria-label="Close"
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

                <div className="text-center mb-6">
                    <h2 className="text-lg font-extrabold text-[#0A0A0A] tracking-tight mb-2 border-b border-[#E5E5E5] pb-2">
                        Chat with Expert
                    </h2>
                </div>

                {/* Buttons Section */}
                <div className="flex flex-col gap-2 mb-4">
                    <Button
                        onClick={handleConsultation}
                        fullWidth
                        className="text-base shadow-lg shadow-orange-500/10"
                    >
                        Get AI Consultation
                    </Button>
                    <button 
                        onClick={closePopup}
                        className="w-full bg-[#F3F4F6] text-[#374151] py-3 rounded-xl font-bold text-base hover:bg-[#F3F4F6] transition-colors"
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
