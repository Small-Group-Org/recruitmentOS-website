import Link from 'next/link';
import { caseStudies } from '@/lib/case-studies-data';
import { buildCanonical } from '@/lib/seo';

export const metadata = {
  title: 'Case Studies — RecruitmentOS',
  description: 'Real recruitment agencies we\'ve worked with. How we replaced their BD function and what changed — problem, root cause, solution, result.',
  alternates: { canonical: buildCanonical('/case-studies') },
  openGraph: {
    title: 'Case Studies — RecruitmentOS',
    description: 'Real recruitment agencies we\'ve worked with. How we replaced their BD function and what changed.',
    url: buildCanonical('/case-studies'),
    siteName: 'RecruitmentOS',
    type: 'website',
  },
};

export default function CaseStudiesListPage() {
  return (
    <div className="min-h-screen bg-[#FAFAFA] pt-24 pb-32 animate-fadeIn">
      <div className="max-w-[1240px] mx-auto px-6 sm:px-10">

        <div className="mb-20 animate-slideUp">
          <p className="text-xs font-bold text-[#FF6A00] uppercase tracking-widest mb-3">Proof of Results</p>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-black tracking-tighter mb-4">
            Case Studies
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl">
            What We Discovered During Free AI Audit Sessions with Recruitment Agencies
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 lg:gap-12">
          {caseStudies.map((study, index) => (
            <Link
              key={study.slug}
              href={`/case-studies/${study.slug}`}
              className="group flex flex-col h-full bg-white border border-[#E5E5E5] rounded-[2rem] overflow-hidden hover:shadow-[0_20px_50px_rgba(0,0,0,0.06)] hover:border-black/10 transition-all duration-500 ease-out animate-slideUp"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              {/* Image Container with hover scale and grayscale transition */}
              <div className="relative w-full aspect-[16/10] overflow-hidden bg-gray-50 border-b border-gray-100">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={study.image}
                  alt={study.title}
                  className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-[1.02] transition-all duration-700 ease-out"
                  loading="lazy"
                />
                {study.cardStats && (
                  <div className="absolute top-4 left-4 bg-black/95 backdrop-blur-sm text-white text-[10px] font-black tracking-widest px-3 py-1.5 rounded-full uppercase">
                    {study.cardStats}
                  </div>
                )}
              </div>

              {/* Card Body */}
              <div className="p-8 flex flex-col flex-grow">
                {/* Title */}
                <h2 className="text-xl lg:text-2xl font-black text-[#0A0A0A] group-hover:text-[#FF6A00] transition-colors leading-tight mb-4 tracking-tight">
                  {study.title}
                </h2>

                {/* Short Excerpt */}
                <p className="text-gray-600 text-base leading-relaxed line-clamp-3 mb-6">
                  {study.problem}
                </p>

                {/* Read Link */}
                <div className="mt-auto pt-6 border-t border-gray-100 flex items-center text-sm font-bold text-black group-hover:text-[#FF6A00] transition-colors">
                  READ CASE STUDY
                  <svg className="ml-2 w-4 h-4 transform group-hover:translate-x-1.5 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </div>
              </div>
            </Link>
          ))}
        </div>

      </div>

      <style>{`
        @keyframes fadeIn { from { opacity: 0 } to { opacity: 1 } }
        @keyframes slideUp { from { opacity: 0; transform: translateY(30px) } to { opacity: 1; transform: translateY(0) } }
        .animate-fadeIn { animation: fadeIn 0.5s ease-out forwards }
        .animate-slideUp { opacity: 0; animation: slideUp 0.6s ease-out forwards }
      `}</style>
    </div>
  );
}
