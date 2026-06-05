import Image from 'next/image';
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

  // Split "cardStats" (e.g. "+30% Revenue Growth") into the headline metric and its label.
  const [metricValue, ...metricRest] = study.cardStats.trim().split(' ');
  const metricLabel = metricRest.join(' ');

  const sections = [
    { label: 'The Challenge', body: study.problem },
    { label: 'The Root Cause', body: study.rootCause },
    { label: 'What We Built', body: study.solution },
    { label: 'The Result', body: study.result, highlight: true },
    { label: 'Why It Matters', body: study.takeaway },
  ];

  return (
    <div className="min-h-screen bg-white animate-fadeIn">

      {/* ── Hero ─────────────────────────────────────────────── */}
      <section className="relative bg-[#FAFAFA] text-[#0A0A0A] overflow-hidden border-b border-[#E5E5E5] pt-10 pb-8 md:pb-10">
        {/* subtle orange glow */}
        <div
          className="pointer-events-none absolute -top-32 right-0 w-[480px] h-[480px] rounded-full opacity-30 blur-3xl"
          style={{ background: 'radial-gradient(circle, rgba(255,106,0,0.18) 0%, transparent 70%)' }}
          aria-hidden
        />

        <div className="relative max-w-[1100px] mx-auto px-6 sm:px-10">
          <Link
            href="/case-studies"
            className="inline-flex items-center text-[13px] font-medium text-[#9CA3AF] hover:text-[#FF6A00] transition-colors mb-8"
            style={{ fontFamily: 'var(--font-mono)' }}
          >
            <svg className="mr-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            ALL CASE STUDIES
          </Link>

          <p
            className="text-[11px] font-bold uppercase tracking-[0.25em] text-[#FF6A00] mb-3"
            style={{ fontFamily: 'var(--font-mono)' }}
          >
            Case Study
          </p>

          <h1
            className="text-xl sm:text-2xl md:text-[1.75rem] font-bold leading-[1.25] tracking-tight max-w-2xl mb-6"
            style={{ fontFamily: 'var(--font-serif)' }}
          >
            {study.title}
          </h1>

          {/* Headline metric */}
          <div className="flex items-end gap-4 border-t border-[#E5E5E5] pt-5">
            <span
              className="text-3xl md:text-4xl font-extrabold leading-none text-[#FF6A00] tracking-tight"
              style={{ fontFamily: 'var(--font-serif)' }}
            >
              {metricValue}
            </span>
            <span className="text-sm md:text-base text-[#6B7280] font-medium pb-0.5 leading-snug max-w-[260px]">
              {metricLabel}
            </span>
          </div>
        </div>
      </section>

      {/* ── Banner image ─────────────────────────────────────── */}
      {study.image && (
        <div className="bg-[#FAFAFA]">
          <div className="max-w-[1100px] mx-auto px-6 sm:px-10">
            <div className="relative -mb-16 md:-mb-24 h-[220px] sm:h-[300px] md:h-[360px] rounded-2xl overflow-hidden border border-[#E5E5E5] shadow-[0_20px_60px_rgba(0,0,0,0.12)]">
              <Image
                src={study.image}
                alt={study.title}
                fill
                className="object-cover"
                sizes="(max-width: 1100px) 100vw, 1100px"
              />
            </div>
          </div>
        </div>
      )}

      {/* ── Body ─────────────────────────────────────────────── */}
      <article className={`max-w-[760px] mx-auto px-6 sm:px-10 ${study.image ? 'pt-28 md:pt-40' : 'pt-20'} pb-24`}>
        {sections.map((section, i) =>
          !section.body ? null : (
            <section
              key={section.label}
              className={`animate-slideUp ${i > 0 ? 'mt-14 md:mt-16' : ''}`}
              style={{ animationDelay: `${i * 0.06}s` }}
            >
              {section.highlight ? (
                <div className="rounded-2xl border border-[#FF6A00]/25 bg-[#FFF4EB] p-7 md:p-9">
                  <p
                    className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#FF6A00] mb-4"
                    style={{ fontFamily: 'var(--font-mono)' }}
                  >
                    {section.label}
                  </p>
                  <p
                    className="text-[#0A0A0A] text-lg md:text-xl leading-relaxed whitespace-pre-line font-medium"
                    style={{ fontFamily: 'var(--font-outfit)' }}
                  >
                    {section.body}
                  </p>
                </div>
              ) : (
                <>
                  <p
                    className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#9CA3AF] mb-3"
                    style={{ fontFamily: 'var(--font-mono)' }}
                  >
                    {section.label}
                  </p>
                  <p
                    className="text-[#374151] text-base md:text-[17px] leading-[1.75] whitespace-pre-line"
                    style={{ fontFamily: 'var(--font-outfit)' }}
                  >
                    {section.body}
                  </p>
                </>
              )}
            </section>
          )
        )}
      </article>

      {/* ── Closing CTA ──────────────────────────────────────── */}
      <section className="border-t border-[#E5E5E5] bg-[#FAFAFA]">
        <div className="max-w-[760px] mx-auto px-6 sm:px-10 py-16 md:py-20 text-center">
          <h2
            className="text-2xl md:text-3xl font-bold text-[#0A0A0A] tracking-tight mb-4"
            style={{ fontFamily: 'var(--font-serif)' }}
          >
            Want results like this on your stack?
          </h2>
          <p className="text-[#6B7280] text-base md:text-lg mb-8 max-w-md mx-auto">
            We run the full BD function for established recruitment agencies. Book a call to see if it&apos;s a fit.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="https://cal.com/tusharm/30min?user=tusharm"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center bg-[#0A0A0A] text-white px-8 py-4 rounded-full font-semibold hover:bg-[#0A0A0A] transition-colors group"
            >
              Book a strategy call
              <svg className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </a>
            <Link
              href="/case-studies"
              className="inline-flex items-center justify-center text-[#6B7280] hover:text-[#0A0A0A] px-4 py-4 font-medium transition-colors"
            >
              Read more case studies
            </Link>
          </div>
        </div>
      </section>

      <style>{`
        @keyframes fadeIn { from { opacity: 0 } to { opacity: 1 } }
        @keyframes slideUp { from { opacity: 0; transform: translateY(24px) } to { opacity: 1; transform: translateY(0) } }
        .animate-fadeIn { animation: fadeIn 0.5s ease-out forwards }
        .animate-slideUp { opacity: 0; animation: slideUp 0.6s ease-out forwards }
      `}</style>
    </div>
  );
}
