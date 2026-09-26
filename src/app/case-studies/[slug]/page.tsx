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

  const metrics = study.metrics ?? [];

  // Split "cardStats" (e.g. "+30% Revenue Growth") into the headline metric and its label.
  const [metricValue, ...metricRest] = study.cardStats.trim().split(' ');
  const metricLabel = metricRest.join(' ');

  const star = study.star ?? {
    situation: study.problem,
    task: study.rootCause,
    action: study.solution,
    result: study.result,
  };

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
            {study.headline ?? study.title}
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
                 className="object-cover object-top"
                 sizes="(max-width: 1100px) 100vw, 1100px"
               />
             </div>
             {study.heroCaption && (
               <p className="mt-3 text-center text-xs italic text-[#6B7280]">{study.heroCaption}</p>
             )}
           </div>
         </div>
       )}

      {/* ── Body ─────────────────────────────────────────────── */}
      <article className={`max-w-[760px] mx-auto px-6 sm:px-10 ${study.image ? 'pt-28 md:pt-40' : 'pt-20'} pb-24`}>
        {study.snapshot && (
          <section className="mb-12 rounded-[10px] border border-[#E5E5E5] bg-[#FAFAFA] p-6 md:p-8">
            <p className="mb-5 text-[11px] font-bold uppercase tracking-[0.2em] text-[#FF6A00]" style={{ fontFamily: 'var(--font-mono)' }}>
              Executive snapshot
            </p>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3">
              {[
                ['Client', study.snapshot.client],
                ['Industry', study.snapshot.industry],
                ['Location', study.snapshot.location],
                ['Core challenge', study.snapshot.bottleneck],
                ['System deployed', study.snapshot.systemDeployed],
                ['Primary impact', study.snapshot.primaryImpact],
              ].map(([label, value]) => (
                <div key={label}>
                  <p className="mb-1 text-xs font-semibold uppercase tracking-wide text-[#9CA3AF]">{label}</p>
                  <p className="text-sm leading-relaxed text-[#374151]">{value}</p>
                </div>
              ))}
            </div>
          </section>
        )}
        {metrics.length > 0 && (
          <div className="mb-14 grid grid-cols-2 gap-3 border-y border-[#E5E5E5] py-6 sm:grid-cols-3">
            {metrics.map((metric) => (
              <div key={metric.label} className="rounded-[10px] bg-[#FAFAFA] p-4">
                <p className="text-2xl text-[#FF6A00]" style={{ fontFamily: 'var(--font-serif)' }}>{metric.value}</p>
                <p className="mt-1 text-xs leading-snug text-[#6B7280]">{metric.label}</p>
              </div>
            ))}
          </div>
        )}
        {[
          ['Situation', star.situation],
          ['Task', star.task],
          ['Action', star.action],
          ['Result', star.result],
        ].map(([label, body], i) => (
          <section key={label} className={`animate-slideUp ${i > 0 ? 'mt-14 md:mt-16' : ''}`} style={{ animationDelay: `${i * 0.06}s` }}>
            <p className="mb-3 text-[11px] font-bold uppercase tracking-[0.2em] text-[#9CA3AF]" style={{ fontFamily: 'var(--font-mono)' }}>{label}</p>
            <p className={`whitespace-pre-line text-base leading-[1.75] md:text-[17px] ${label === 'Result' ? 'rounded-2xl border border-[#FF6A00]/25 bg-[#FFF4EB] p-7 font-medium text-[#0A0A0A] md:p-9' : 'text-[#374151]'}`}>{body}</p>
            {label === 'Task' && study.quotes?.challenge && <blockquote className="my-6 rounded-r-[8px] border-l-4 border-[#FF6A00] bg-[#FAFAFA] p-5 text-[#374151]">“{study.quotes.challenge.text}”<footer className="mt-3 text-xs font-semibold text-[#6B7280]">{study.quotes.challenge.author}, {study.quotes.challenge.role}</footer></blockquote>}
            {label === 'Result' && study.quotes?.result && <blockquote className="my-6 rounded-2xl border border-[#FF6A00]/20 bg-[#FFF4EB] p-6 text-[#374151]">“{study.quotes.result.text}”<footer className="mt-3 text-xs font-semibold text-[#6B7280]">{study.quotes.result.author}, {study.quotes.result.role}</footer></blockquote>}
          </section>
        ))}
        <section className="mt-14 md:mt-16">
          <p className="mb-3 text-[11px] font-bold uppercase tracking-[0.2em] text-[#9CA3AF]" style={{ fontFamily: 'var(--font-mono)' }}>Strategic takeaway</p>
          <p className="whitespace-pre-line text-base leading-[1.75] text-[#374151] md:text-[17px]">{study.takeaway}</p>
        </section>
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
