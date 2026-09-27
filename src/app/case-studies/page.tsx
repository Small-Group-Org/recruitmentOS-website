import Image from 'next/image';
import Link from 'next/link';
import { legacyCaseStudies, verifiedCaseStudies } from '@/lib/case-studies-data';
import { buildCanonical } from '@/lib/seo';
import OperationalProof from '@/components/OperationalProof';

export const metadata = {
  title: 'Case studies: Recruitment Agency Case Studies & BD Results | RecruitmentOS',
  description: 'Real recruitment agencies we\'ve worked with. How we replaced their BD function and what changed — problem, root cause, solution, result.',
  alternates: { canonical: buildCanonical('/case-studies') },
  openGraph: {
    title: 'Case studies: Recruitment Agency Case Studies & BD Results | RecruitmentOS',
    description: 'Real recruitment agencies we\'ve worked with. How we replaced their BD function and what changed.',
    url: buildCanonical('/case-studies'),
    siteName: 'RecruitmentOS',
    type: 'website',
  },
};

export default function CaseStudiesListPage() {
  return (
    <div className="min-h-screen bg-[#FAFAFA] pt-12 pb-24 animate-fadeIn">
      <div className="max-w-[1280px] mx-auto px-6 sm:px-10">

        <div className="mb-20 animate-slideUp">
          <p className="text-xs font-bold text-[#FF6A00] uppercase tracking-widest mb-3">Verified production evidence</p>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-normal text-black tracking-tighter mb-4" style={{ fontFamily: 'var(--font-serif)' }}>
            Verified Client Acquisition Wins
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl">
            Production client acquisition outcomes with visible calendar and pipeline proof.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 lg:gap-12">
          {verifiedCaseStudies.map((study, index) => (
            <Link
              key={study.slug}
              href={`/case-studies/${study.slug}`}
               className="group flex flex-col h-full bg-white border border-[#E5E5E5] rounded-[10px] overflow-hidden hover:shadow-[0_20px_50px_rgba(0,0,0,0.06)] hover:border-black/10 transition-all duration-500 ease-out animate-slideUp"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              {/* Image Container with hover scale and grayscale transition */}
              <div className="relative w-full aspect-[16/10] overflow-hidden bg-gray-50 border-b border-gray-100">
                <Image
                  src={study.image}
                  alt={study.title}
                  fill
                  className="object-cover object-top grayscale group-hover:grayscale-0 group-hover:scale-[1.02] transition-all duration-700 ease-out"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 400px"
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

                <blockquote className="mb-6 border-l-2 border-brand pl-3 text-base font-bold leading-snug">&ldquo;{study.quotes?.result?.text ?? study.result}&rdquo;</blockquote>
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

        <div className="mt-24 border-t border-[#E5E5E5] pt-16">
          <p className="mb-3 text-xs font-bold uppercase tracking-widest text-[#FF6A00]">Advisory only</p>
          <h2 className="mb-4 text-3xl font-normal text-black" style={{ fontFamily: 'var(--font-serif)' }}>Diagnostic Audits &amp; Advisory Teardowns</h2>
          <p className="mb-10 max-w-2xl text-lg text-gray-600">Useful operating teardowns and system diagnostics, kept separate from verified production acquisition wins.</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {legacyCaseStudies.map((study) => <Link key={study.slug} href={`/case-studies/${study.slug}`} className="group border border-[#E5E5E5] bg-white p-6 rounded-[10px]"><span className="mb-4 inline-block rounded-[4px] bg-[#FFF4EB] px-2 py-1 text-[10px] font-bold uppercase tracking-widest text-[#FF6A00]">Advisory teardown</span><h3 className="mb-3 text-xl font-bold group-hover:text-[#FF6A00]">{study.title}</h3><p className="text-sm text-gray-600">{study.cardTitle}</p></Link>)}
          </div>
        </div>
        <OperationalProof />

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
