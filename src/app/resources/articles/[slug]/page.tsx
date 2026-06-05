import Link from 'next/link';
import { notFound, redirect } from 'next/navigation';
import Footer from '@/components/Footer';
import { articles, getArticleBySlug } from '@/lib/articles-data';
import { getArticleBody } from '@/lib/articles-server';
import { renderMarkdown } from '@/lib/markdown';
import { JsonLd } from '@/components/JsonLd';
import { articleSchema } from '@/lib/schemas';
import { buildCanonical } from '@/lib/seo';

export function generateStaticParams() {
  return articles
    .filter((a) => !a.customRoute)
    .map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const article = getArticleBySlug(slug);
  if (!article) return {};
  return {
    title: `${article.title} — RecruitmentOS`,
    description: article.description,
    alternates: { canonical: buildCanonical(`/resources/articles/${slug}`) },
  };
}

export default async function ArticleDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const article = getArticleBySlug(slug);

  if (!article) notFound();
  if (article.customRoute) redirect(article.customRoute);

  const body = getArticleBody(slug);
  if (!body) notFound();

  const sorted = [...articles].filter((a) => a.slug !== slug).slice(0, 3);

  return (
    <main className="min-h-screen bg-white">
      <JsonLd data={articleSchema(article)} />
      <div className="pt-24 pb-32">
        <div className="max-w-[820px] mx-auto px-6 sm:px-10">
          <Link
            href="/resources/articles"
            className="inline-flex items-center text-sm text-black hover:text-[#FF6A00] transition-colors mb-12"
          >
            <svg className="mr-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            BACK TO ARTICLES
          </Link>

          <div className="flex items-center gap-3 mb-5">
            <span className="text-[10px] font-bold tracking-widest uppercase text-[#FF6A00] bg-[#FFF4EB] px-2.5 py-1 rounded-md">
              {article.category}
            </span>
            <span className="text-[10px] font-bold tracking-widest uppercase text-[#9CA3AF]">
              {article.readTime}
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#0A0A0A] leading-[1.1] tracking-tight mb-6">
            {article.title}
          </h1>

          <p className="text-[#6B7280] text-lg sm:text-xl leading-relaxed mb-12">
            {article.description}
          </p>

          {article.image && (
            <div className="rounded-3xl overflow-hidden border border-[#E5E5E5] mb-16 bg-[#FAFAFA]">
              <img src={article.image} alt={article.title} className="w-full h-auto object-cover" />
            </div>
          )}

          <article className="mb-20">
            {renderMarkdown(body)}
          </article>

          <div className="border-t border-[#E5E5E5] pt-10 mb-20">
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="https://cal.com/tusharm/30min?user=tusharm"
                target="_blank"
                className="inline-flex items-center justify-center px-6 py-3 rounded-xl bg-[#FF6A00] text-white text-sm font-bold hover:bg-[#e05e00] transition-colors"
              >
                Book a Free 20-min Agency Audit
              </Link>
              <Link
                href="/resources/articles"
                className="inline-flex items-center justify-center px-6 py-3 rounded-xl border border-[#E5E5E5] text-[#0A0A0A] text-sm font-bold hover:border-[#FF6A00] transition-colors"
              >
                More Articles
              </Link>
            </div>
          </div>

          {sorted.length > 0 && (
            <div className="border-t border-[#E5E5E5] pt-12">
              <h2 className="text-[#0A0A0A] text-xl sm:text-2xl font-bold mb-8">Keep reading</h2>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                {sorted.map((other) => {
                  const href = other.customRoute || `/resources/articles/${other.slug}`;
                  return (
                    <Link key={other.slug} href={href} className="group flex flex-col">
                      <span className="text-[10px] font-bold tracking-widest uppercase text-[#FF6A00] mb-2">
                        {other.category}
                      </span>
                      <h3 className="text-sm font-bold text-[#0A0A0A] leading-snug group-hover:text-[#FF6A00] transition-colors">
                        {other.title}
                      </h3>
                    </Link>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </div>
      <Footer />
    </main>
  );
}
