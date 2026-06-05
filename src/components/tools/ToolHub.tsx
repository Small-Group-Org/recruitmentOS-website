'use client';

import Link from 'next/link';
import { Tool } from '@/lib/tools-data';
import { useToolGate } from '@/hooks/useToolGate';

export default function ToolHub({ tools }: { tools: Tool[] }) {
  const { isUnlocked, isHydrated } = useToolGate();

  return (
    <main className="min-h-screen bg-[#F9FAFB]">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 pt-8 pb-12 sm:pt-10 sm:pb-16">

        <div className="mb-6">
          <p className="text-xs font-bold text-[#FF6A00] uppercase tracking-widest mb-3">
            Free tools
          </p>
          <h1 className="text-[#0A0A0A] text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight leading-[1.1]">
            Calculators, scorecards, and advisors.
          </h1>
          <p className="text-[#6B7280] text-base sm:text-lg mt-3 max-w-xl font-medium">
            Built for established recruitment agencies. Browse what&rsquo;s inside each tool freely — one email unlocks all of them when you&rsquo;re ready to use one.
          </p>
          {isHydrated && isUnlocked && (
            <p className="mt-4 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest px-3 py-1.5 rounded-md bg-[#e7f9ee] text-[#128c5e]">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              All tools unlocked
            </p>
          )}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {tools.map((tool) => (
            <Link
              key={tool.slug}
              href={`/tools/${tool.slug}`}
              className="group flex flex-col bg-white border border-[#E5E5E5] rounded-2xl p-6 hover:border-[#FF6A00]/40 hover:shadow-sm transition-all"
            >
              <div className="flex items-center gap-2 mb-3 flex-wrap">
                <span className="text-[10px] font-bold uppercase tracking-widest px-2 py-1 rounded-md bg-[#FFF4EB] text-[#FF6A00]">
                  {tool.category}
                </span>
                <span className="text-[10px] font-bold uppercase tracking-widest px-2 py-1 rounded-md text-[#9CA3AF] bg-[#F3F4F6]">
                  {tool.badge}
                </span>
                {tool.isNew && (
                  <span className="text-[10px] font-bold uppercase tracking-widest px-2 py-1 rounded-md text-white bg-[#FF6A00]">
                    New
                  </span>
                )}
              </div>
              <h3 className="text-lg font-bold text-[#0A0A0A] mb-2 leading-snug group-hover:text-[#FF6A00] transition-colors">
                {tool.title}
              </h3>
              <p className="text-sm text-[#6B7280] font-medium leading-relaxed line-clamp-4 mb-5 flex-grow">
                {tool.description}
              </p>
              <span className="mt-auto inline-flex items-center text-sm font-bold text-[#0A0A0A] group-hover:gap-1 transition-all">
                See what&rsquo;s inside
                <svg className="ml-2 w-4 h-4 opacity-0 group-hover:opacity-100 -translate-x-3 group-hover:translate-x-0 transition-all" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </span>
            </Link>
          ))}
        </div>

      </div>
    </main>
  );
}
