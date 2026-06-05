'use client';

import Image from 'next/image';

const tools = [
  { name: 'n8n', icon: '/logos/n8n.webp' },
  { name: 'Claude', icon: '/logos/claude.webp' },
  { name: 'Instantly', icon: '/logos/instantly.webp' },
  { name: 'Lemlist', icon: '/logos/lemlist.webp' },
  { name: 'LinkedIn', icon: '/logos/linkedin.webp' },
  { name: 'Lusha', icon: '/logos/lusha.webp' },
  { name: 'Hunter', icon: '/logos/hunter.webp' },
  { name: 'Indeed', icon: '/logos/indeed.webp' },
  { name: 'Stepstone', icon: '/logos/stepstone.webp' },
  { name: 'Clay', icon: '/logos/clay.webp' },
  { name: 'Apify', icon: '/logos/kaspr.webp' },
  { name: 'Glassdoor', icon: '/logos/salesnav.webp' },
  { name: 'Gemini', icon: '/logos/gemini.webp' },
  { name: 'Airtable', icon: '/logos/airtable.webp' },
];

export default function ToolTicker() {
  return (
    <section className="py-16 md:py-24 bg-white overflow-hidden" id="workflow-tools">
      <div className="max-w-[1100px] mx-auto px-6 mb-12 text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-[#0A0A0A] tracking-tight" style={{ fontFamily: "'Inter', sans-serif" }}>
          Your workflow deserves better tools.
        </h2>
      </div>

      <div className="relative flex overflow-hidden group">
        {/* Gradient Mask for Edge Fade (15%) */}
        <div className="absolute inset-0 z-10 pointer-events-none bg-gradient-to-r from-white via-transparent to-white opacity-100"
          style={{ maskImage: 'linear-gradient(to right, white, transparent 15%, transparent 85%, white)' }} />

        <div className="absolute inset-0 z-10 pointer-events-none">
          <div className="w-full h-full bg-gradient-to-r from-white via-transparent to-white"
            style={{ background: 'linear-gradient(90deg, #fff 0%, rgba(255,255,255,0) 15%, rgba(255,255,255,0) 85%, #fff 100%)' }} />
        </div>

        {/* Marquee Wrapper */}
        <div className="flex whitespace-nowrap animate-marquee py-4">
          {[...tools, ...tools, ...tools, ...tools].map((tool, index) => (
            <div key={index} className="flex items-center gap-4 mx-[30px]">
              <div className="relative w-10 h-10 rounded-lg overflow-hidden flex items-center justify-center bg-transparent shrink-0">
                <Image src={tool.icon} alt={tool.name} fill sizes="40px" className="object-contain" />
              </div>
              <span className="text-xl font-bold text-[#0A0A0A] tracking-tight">{tool.name}</span>
            </div>
          ))}
        </div>

        {/* Duplicate for seamless loop */}
        <div className="flex whitespace-nowrap animate-marquee py-4" aria-hidden="true">
          {[...tools, ...tools, ...tools, ...tools].map((tool, index) => (
            <div key={index} className="flex items-center gap-4 mx-[30px]">
              <div className="relative w-10 h-10 rounded-lg overflow-hidden flex items-center justify-center bg-transparent shrink-0">
                <Image src={tool.icon} alt={tool.name} fill sizes="40px" className="object-contain" />
              </div>
              <span className="text-xl font-bold text-[#0A0A0A] tracking-tight">{tool.name}</span>
            </div>
          ))}
        </div>
      </div>

      <style jsx global>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-100%); }
        }
        .animate-marquee {
          animation: marquee 45s linear infinite;
        }
      `}</style>
    </section>
  );
}
