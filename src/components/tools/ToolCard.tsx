'use client';

import Link from 'next/link';
import { Tool } from '@/lib/tools-data';

export default function ToolCard({ tool }: { tool: Tool }) {
  return (
    <Link
      href={`/tools/${tool.slug}`}
      className="group flex items-center gap-4 bg-white border border-[#E5E5E5] rounded-2xl px-5 py-4 hover:border-[#FF6A00]/40 hover:shadow-sm transition-all duration-200 cursor-pointer"
    >
      <div className="flex-shrink-0 w-11 h-11 rounded-xl flex items-center justify-center" style={{ background: '#FFF4EB' }}>
        <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="#FF6A00" strokeWidth={1.8}>
          <path strokeLinecap="round" strokeLinejoin="round"
            d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
        </svg>
      </div>

      <div className="flex-grow min-w-0">
        <div className="flex items-center gap-1.5 mb-0.5">
          <span className="text-[10px] font-bold uppercase tracking-widest" style={{ color: '#FF6A00' }}>
            {tool.category}
          </span>
          {tool.isNew && (
            <span className="text-[9px] font-bold uppercase tracking-widest px-1.5 py-0.5 rounded" style={{ background: '#FF6A00', color: '#fff' }}>
              New
            </span>
          )}
        </div>
        <p className="text-sm font-bold text-[#0A0A0A] truncate leading-tight">
          {tool.title}
        </p>
      </div>

      <div className="flex-shrink-0 flex items-center gap-2">
        <span className="text-[10px] font-bold uppercase tracking-widest px-2 py-1 rounded" style={{ background: '#FFF4EB', color: '#FF6A00' }}>
          Free
        </span>
        <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold text-white bg-[#0A0A0A] group-hover:bg-[#FF6A00] transition-colors">
          View
          <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
          </svg>
        </span>
      </div>
    </Link>
  );
}
