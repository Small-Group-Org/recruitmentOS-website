import Link from 'next/link';
import { notFound } from 'next/navigation';
import { caseStudies } from '@/lib/case-studies-data';
import { buildCanonical } from '@/lib/seo';

export function generateStaticParams() {
  return caseStudies.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const study = caseStudies.find((s) => s.slug === slug);
  if (!study) return {};

  const description = study.problem
    .replace(/\s+/g, ' ')
    .trim()
    .slice(0, 155);

  const canonical = buildCanonical(`/case-studies/${slug}`);

  return {
    title: `${study.title} — RecruitmentOS case study`,
    description,
    alternates: { canonical },
    openGraph: {
      title: study.title,
      description,
      url: canonical,
      siteName: 'RecruitmentOS',
      type: 'article',
      images: study.image ? [{ url: study.image }] : undefined,
    },
  };
}

export default async function CaseStudyDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const study = caseStudies.find((s) => s.slug === slug);

  if (!study) notFound();

  return (
    <div className="min-h-screen bg-white pt-24 pb-32 animate-fadeIn">
      <div className="max-w-[1240px] mx-auto px-6 sm:px-10">

        <Link
          href="/case-studies"
          className="inline-flex items-center text-sm text-black hover:text-[#FF6A00] transition-colors mb-16 animate-slideUp"
        >
          <svg className="mr-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          BACK TO ALL STORIES
        </Link>

        <div className="animate-slideUp">
          <h1 className="text-2xl md:text-3xl font-bold mb-16 max-w-5xl leading-tight">
            {study.title}
          </h1>

          <div className="grid grid-cols-1 lg:grid-cols-[40fr_60fr] gap-12 lg:gap-24 items-start">

            <div className="rounded-xl overflow-hidden grayscale hover:grayscale-0 transition-all duration-700">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={study.image}
                alt={study.title}
                className="w-full h-auto object-cover"
              />
            </div>

            <div className="space-y-6 text-black text-lg leading-snug antialiased" style={{ color: '#000000' }}>

              <div>
                <p className="font-bold mb-2">THE PROBLEM</p>
                <p className="whitespace-pre-line">{study.problem}</p>
              </div>

              <div>
                <p className="font-bold mb-2">THE ROOT CAUSE</p>
                <p className="whitespace-pre-line">{study.rootCause}</p>
              </div>

              <div>
                <p className="font-bold mb-2">THE SOLUTION</p>
                <p className="whitespace-pre-line">{study.solution}</p>
              </div>

              <div>
                <p className="font-bold mb-2 text-[#FF6A00]">THE RESULT</p>
                <p className="whitespace-pre-line">{study.result}</p>
              </div>

              <div>
                <p className="font-bold mb-2">THE TAKEAWAY</p>
                <p className="whitespace-pre-line">{study.takeaway}</p>
              </div>

            </div>
          </div>
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
