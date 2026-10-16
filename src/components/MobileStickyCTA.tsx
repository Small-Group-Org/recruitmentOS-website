'use client';

import { useState, useEffect } from 'react';

export default function MobileStickyCTA() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 350) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (!isVisible) return null;

  return (
    <div
      className="fixed bottom-0 left-0 right-0 z-40 p-3 bg-white/95 backdrop-blur-md border-t border-neutral-200 shadow-2xl md:hidden pb-[max(0.75rem,env(safe-area-inset-bottom))] animate-in fade-in slide-in-from-bottom duration-200"
    >
      <div className="flex items-center gap-2.5 max-w-md mx-auto">
        <a
          href="https://cal.com/tusharm/30min?user=tusharm"
          target="_blank"
          rel="noopener noreferrer"
          className="flex-1 inline-flex items-center justify-center gap-1.5 bg-brand text-white text-sm font-bold py-3 px-4 rounded-[4px] shadow-sm hover:bg-brand-hover transition-colors"
        >
          <span>Book Fit Call</span>
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
          </svg>
        </a>

        <a
          href="https://wa.me/919667353913"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center gap-1.5 bg-[#1A6B4A] text-white text-sm font-bold py-3 px-4 rounded-[4px] shadow-sm hover:bg-[#145339] transition-colors"
        >
          <span>WhatsApp</span>
        </a>
      </div>
    </div>
  );
}
