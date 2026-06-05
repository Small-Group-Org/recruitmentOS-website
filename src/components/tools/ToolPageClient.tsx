'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useToolGate } from '@/hooks/useToolGate';
import { Tool } from '@/lib/tools-data';
import VolumeGapCalculator from './VolumeGapCalculator';
import GeneralROICalculator from './GeneralROICalculator';
import BDScorecard from './BDScorecard';
import ToolGateModal from './ToolGateModal';

const INTERACTIVE_COMPONENTS: Record<string, React.ComponentType> = {
  'volume-gap-calculator': VolumeGapCalculator,
  'general-roi': GeneralROICalculator,
  'bd-scorecard': BDScorecard,
};

export default function ToolPageClient({ tool }: { tool: Tool }) {
  const { isUnlocked, isHydrated } = useToolGate();
  const [gateOpen, setGateOpen] = useState(false);
  const [hasStarted, setHasStarted] = useState(false);

  function handlePrimaryCta() {
    if (tool.interactive) {
      if (isUnlocked) {
        setHasStarted(true);
      } else {
        setGateOpen(true);
      }
    } else if (tool.embedUrl) {
      const url = tool.embedUrl.replace('/embed', '');
      if (isUnlocked) {
        window.open(url, '_blank', 'noopener,noreferrer');
      } else {
        setGateOpen(true);
      }
    } else if (tool.resourceUrl) {
      if (isUnlocked) {
        window.open(tool.resourceUrl, '_blank', 'noopener,noreferrer');
      } else {
        setGateOpen(true);
      }
    }
  }

  function handleUnlock() {
    if (tool.interactive) {
      setHasStarted(true);
    } else {
      const url = tool.embedUrl?.replace('/embed', '') || tool.resourceUrl;
      if (url) window.open(url, '_blank', 'noopener,noreferrer');
    }
  }

  const InteractiveComponent = tool.interactive ? INTERACTIVE_COMPONENTS[tool.slug] : null;
  const showInteractive = tool.interactive && isHydrated && isUnlocked && hasStarted && !!InteractiveComponent;

  const ctaLabel = tool.interactive
    ? `Start the ${tool.title} →`
    : `Launch ${tool.title} →`;

  return (
    <>
      {gateOpen && (
        <ToolGateModal
          toolTitle={tool.title}
          onClose={() => setGateOpen(false)}
          onUnlock={handleUnlock}
        />
      )}

      <main className="min-h-screen bg-[#F9FAFB]">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 py-16 sm:py-24">

          <Link href="/tools"
            className="inline-flex items-center text-sm font-medium text-[#6B7280] hover:text-[#0A0A0A] transition-colors mb-10">
            <svg className="mr-1.5 w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
            All Tools
          </Link>

          <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">

            {/* Left — always visible */}
            <div className="lg:col-span-3">
              <div className="flex items-center gap-2 mb-5">
                <span className="text-[10px] font-bold uppercase tracking-widest px-2 py-1 rounded-md"
                  style={{ background: '#FFF4EB', color: '#FF6A00' }}>
                  {tool.category}
                </span>
                <span className="text-[10px] font-bold uppercase tracking-widest px-2 py-1 rounded-md text-[#9CA3AF]"
                  style={{ background: '#F3F4F6' }}>
                  {tool.badge}
                </span>
                {tool.isNew && (
                  <span className="text-[10px] font-bold uppercase tracking-widest px-2 py-1 rounded-md"
                    style={{ background: '#FF6A00', color: '#fff' }}>
                    New
                  </span>
                )}
              </div>

              <h1 className="text-4xl sm:text-5xl font-bold text-[#0A0A0A] mb-4 tracking-tight leading-[1.1]">
                {tool.title}
              </h1>
              <p className="text-lg text-[#6B7280] leading-relaxed mb-8 font-medium">
                {tool.description}
              </p>

              <div className="bg-white border border-[#E5E5E5] rounded-3xl p-6 mb-8">
                <h2 className="text-base font-bold text-[#0A0A0A] mb-4 tracking-tight">
                  What&rsquo;s inside
                </h2>
                <ul className="space-y-3">
                  {tool.whatsInside.map((item, i) => (
                    <li key={i} className="flex items-start gap-3 text-sm text-[#374151] font-medium">
                      <span className="mt-0.5 flex-shrink-0 w-4 h-4 rounded-full flex items-center justify-center"
                        style={{ background: '#FFF4EB' }}>
                        <svg className="w-2.5 h-2.5 text-[#FF6A00]" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      </span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Action area — CTA-to-gate, or rendered interactive component */}
              {!showInteractive && (
                <div className="bg-white border border-[#E5E5E5] rounded-3xl p-8 sm:p-10 text-center mb-10">
                  <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-[#FFF4EB] mb-5">
                    <svg className="w-7 h-7 text-[#FF6A00]" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.8}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09z" />
                    </svg>
                  </div>
                  <h3 className="text-xl sm:text-2xl font-bold text-[#0A0A0A] mb-2 leading-tight">
                    Ready to use it?
                  </h3>
                  <p className="text-sm text-[#6B7280] font-medium mb-6 max-w-md mx-auto">
                    {isHydrated && isUnlocked
                      ? `Click below to ${tool.interactive ? 'start the tool' : 'open the resource'}.`
                      : 'One quick form unlocks every RecruitmentOS tool — forever. We only ask once.'}
                  </p>
                  <button
                    onClick={handlePrimaryCta}
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-bold text-white bg-[#0A0A0A] hover:bg-[#FF6A00] transition-colors"
                  >
                    {ctaLabel}
                  </button>
                </div>
              )}

              {/* Inline interactive component (after unlock + start) */}
              {showInteractive && InteractiveComponent && (
                <div className="mb-10">
                  <InteractiveComponent />
                </div>
              )}
            </div>

            {/* Right — sidebar */}
            <div className="lg:col-span-2">
              <div className="bg-white border border-[#E5E5E5] rounded-3xl p-6 sticky top-28">
                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest mb-5 px-3 py-2 rounded-xl"
                  style={{
                    background: isHydrated && isUnlocked ? '#e7f9ee' : '#FFF4EB',
                    color: isHydrated && isUnlocked ? '#128c5e' : '#FF6A00',
                  }}>
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d={isHydrated && isUnlocked
                      ? "M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      : "M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"} clipRule="evenodd" />
                  </svg>
                  {isHydrated && isUnlocked ? 'Access unlocked' : 'Email required to launch'}
                </div>

                {tool.videoUrl && (
                  <a href={tool.videoUrl} target="_blank" rel="noopener noreferrer"
                    className="block w-full text-center py-3 rounded-xl text-sm font-bold border border-[#E5E5E5] text-[#374151] hover:border-[#0A0A0A] transition-colors mb-3">
                    Watch walkthrough
                  </a>
                )}

                <div className="border-t border-[#E5E5E5] pt-4 flex flex-col gap-2">
                  {tool.communityUrl && (
                    <a href={tool.communityUrl} target="_blank" rel="noopener noreferrer"
                      className="flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-sm font-bold"
                      style={{ background: '#e7f9ee', color: '#128c5e' }}>
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="#25d366">
                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z"/>
                      </svg>
                      Join WhatsApp community
                    </a>
                  )}
                  <a href="https://www.linkedin.com/in/tusharmanglatm/" target="_blank" rel="noopener noreferrer"
                    className="flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-sm font-bold"
                    style={{ background: '#e8f0fb', color: '#0a66c2' }}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="#0a66c2">
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                    </svg>
                    Connect on LinkedIn
                  </a>
                </div>
              </div>
            </div>

          </div>
        </div>
      </main>
    </>
  );
}
