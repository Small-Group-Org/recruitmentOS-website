import React from 'react';

export default function HeroMetrics() {
  const metrics = [
    {
      value: '20K+',
      label: 'Verified Contacts\nSourced',
      icon: (
        <svg className="w-6 h-6 text-[#FF6B00]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
        </svg>
      )
    },
    {
      value: '95%',
      label: 'Deliverability\nRate',
      icon: (
        <svg className="w-6 h-6 text-[#FF6B00]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
        </svg>
      )
    },
    {
      value: '10+',
      label: 'Positive Replies\nEvery Month',
      icon: (
        <svg className="w-6 h-6 text-[#FF6B00]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
        </svg>
      )
    },
    {
      value: '100%',
      label: 'Done-For-You\nSystem',
      icon: (
        <svg className="w-6 h-6 text-[#FF6B00]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      )
    }
  ];

  return (
    <div className="w-full max-w-[1280px] mx-auto mt-16 px-4 sm:px-6 relative z-10">
      <div className="bg-white/80 backdrop-blur-md rounded-3xl border border-neutral-100 p-6 md:p-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-4 shadow-sm">
        {metrics.map((metric, idx) => (
          <div key={idx} className="flex items-center gap-4 group">
            <div className="w-14 h-14 rounded-full bg-orange-50 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform duration-300">
              {metric.icon}
            </div>
            <div>
              <p className="text-2xl font-black text-neutral-900 tracking-tight">{metric.value}</p>
              <p className="text-sm font-semibold text-neutral-500 whitespace-pre-line leading-snug">
                {metric.label}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
