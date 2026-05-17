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
    <div className="min-h-screen bg-white pt-24 pb-32 animate-fadeIn">
      <div className="max-w-[1240px] mx-auto px-6 sm:px-10">

        <div className="mb-20 animate-slideUp">
          <h1 className="text-3xl font-black text-black tracking-tighter mb-4">
            Case Studies
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl">
            What We Discovered During Free AI Audit Sessions with Recruitment Agencies
          </p>
        </div>

        <div className="space-y-16">
          {caseStudies.map((study, index) => (
            <div
              key={study.slug}
              className="border-b border-gray-100 pb-16 last:border-0 animate-slideUp"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="max-w-4xl">
                <h2 className="text-xl md:text-2xl font-bold mb-4 leading-tight">
                  {study.title}
                </h2>

                <p className="text-gray-600 text-lg leading-relaxed line-clamp-3 mb-6">
                  {study.problem}
                </p>

                <Link
                  href={`/case-studies/${study.slug}`}
                  className="inline-flex items-center text-sm font-bold text-[#FF6A00] hover:translate-x-1 transition-transform"
                >
                  LEARN MORE
                  <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </Link>
              </div>
            </div>
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
