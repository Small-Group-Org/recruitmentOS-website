import { notFound } from 'next/navigation';
import { tools } from '@/lib/tools-data';
import ToolPageClient from '@/components/tools/ToolPageClient';
import { JsonLd } from '@/components/JsonLd';
import { webApplicationSchema } from '@/lib/schemas';
import { buildCanonical } from '@/lib/seo';

export function generateStaticParams() {
  return tools.map((t) => ({ slug: t.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const tool = tools.find((t) => t.slug === slug);
  if (!tool) return {};
  return {
    title: `${tool.title} | RecruitmentOS`,
    description: tool.description,
    alternates: { canonical: buildCanonical(`/tools/${slug}`) },
  };
}

export default async function ToolPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const tool = tools.find((t) => t.slug === slug);
  if (!tool) notFound();
  return (
    <>
      {tool.interactive && (
        <JsonLd data={webApplicationSchema(tool.title, tool.slug, tool.description)} />
      )}
      <ToolPageClient tool={tool} />
    </>
  );
}
