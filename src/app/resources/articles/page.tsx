import Image from 'next/image';
import Link from 'next/link';
import Footer from '@/components/Footer';
import { articles } from '@/lib/articles-data';
import { buildCanonical } from '@/lib/seo';

export const metadata = {
  title: 'Articles — RecruitmentOS',
  description: 'Deep-dives on recruitment lead generation, ICP, outreach, KPIs, and the AI stack — built for specialist staffing agencies.',
  alternates: { canonical: buildCanonical('/resources/articles') },
};

export default function ArticlesPage() {
  const sorted = [...articles].sort((a, b) => (a.publishedAt < b.publishedAt ? 1 : -1));

  return (
    <main className="min-h-screen bg-white">
      <div className="pt-12 pb-24">
        <div className="max-w-[1280px] mx-auto px-6 sm:px-10">
          <Link
            href="/resources"
            className="inline-flex items-center text-sm text-black hover:text-[#FF6A00] transition-colors mb-12"
          >
            <svg className="mr-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            BACK TO RESOURCES
          </Link>

          <div className="mb-10 sm:mb-12 max-w-3xl">
            <p className="text-xs font-bold text-[#FF6A00] uppercase tracking-widest mb-3">Articles</p>
            <h1 className="text-[#0A0A0A] text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight leading-[1.05] mb-5">
              Recruitment lead gen, decoded.
            </h1>
            <p className="text-[#6B7280] text-base sm:text-lg leading-relaxed">
              Frameworks, case studies, and AI workflows from 60+ specialist recruitment agencies — what&#39;s working in 2026, and what&#39;s wasting your time.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-10">
            {sorted.map((article) => {
              const href = article.customRoute || `/resources/articles/${article.slug}`;
              return (
                <Link
                  key={article.slug}
                  href={href}
                  className="flex flex-col group"
                >
                  <div className="relative aspect-[4/3] bg-[#FAFAFA] border border-[#E5E5E5] rounded-2xl sm:rounded-2xl mb-5 overflow-hidden flex items-center justify-center group-hover:border-[#FF6A00]/20 transition-all duration-300">
                    <div className="absolute inset-0 opacity-[0.04] group-hover:opacity-[0.08] transition-opacity duration-300">
                      <div className="absolute inset-0 bg-[radial-gradient(#FF6A00_1.5px,transparent_1.5px)] [background-size:24px_24px]" />
                    </div>
                    {article.image ? (
                      <Image
                        src={article.image}
                        alt={article.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-700"
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 380px"
                      />
                    ) : (
                      <div className="text-center px-8">
                        <p className="text-[10px] font-bold tracking-widest uppercase text-[#FF6A00] mb-3">{article.category}</p>
                        <p className="text-[#9CA3AF] text-xs font-mono">{article.readTime}</p>
                      </div>
                    )}
                  </div>
                  <div className="flex items-center gap-3 mb-3">
                    <span className="text-[10px] font-bold tracking-widest uppercase text-[#FF6A00] bg-[#FFF4EB] px-2 py-1 rounded-md">
                      {article.category}
                    </span>
                    <span className="text-[10px] font-bold tracking-widest uppercase text-[#9CA3AF]">
                      {article.readTime}
                    </span>
                  </div>
                  <h3 className="text-lg sm:text-xl font-bold text-[#0A0A0A] mb-2 leading-snug group-hover:text-[#FF6A00] transition-colors">
                    {article.title}
                  </h3>
                  <p className="text-[#6B7280] text-sm leading-relaxed font-medium">
                    {article.description}
                  </p>
                </Link>
              );
            })}
          </div>
        </div>
      </div>
      <Footer />
    </main>
  );
}
