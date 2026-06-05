import { MetadataRoute } from 'next';
import { SITE_URL } from '@/lib/seo';
import { articles } from '@/lib/articles-data';
import { tools } from '@/lib/tools-data';
import { caseStudies } from '@/lib/case-studies-data';
import { niches } from '@/lib/niches-data';

const STATIC_ROUTES: { path: string; priority: number; freq: MetadataRoute.Sitemap[number]['changeFrequency'] }[] = [
    { path: '/', priority: 1.0, freq: 'weekly' },
    { path: '/methodology', priority: 0.9, freq: 'monthly' },
    { path: '/services', priority: 0.9, freq: 'monthly' },
    { path: '/pricing', priority: 0.9, freq: 'monthly' },
    { path: '/about', priority: 0.7, freq: 'monthly' },
    { path: '/fit-call', priority: 0.9, freq: 'monthly' },
    { path: '/contact', priority: 0.6, freq: 'monthly' },
    { path: '/tools', priority: 0.8, freq: 'weekly' },
    { path: '/resources', priority: 0.8, freq: 'weekly' },
    { path: '/resources/articles', priority: 0.7, freq: 'weekly' },
    { path: '/case-studies', priority: 0.7, freq: 'monthly' },
    { path: '/niches', priority: 0.8, freq: 'monthly' },
    // /free-leads-campaign is intentionally NOT in the sitemap — it's noindex until delivery pipeline is staffed.
];

export default function sitemap(): MetadataRoute.Sitemap {
    const now = new Date();

    const staticEntries: MetadataRoute.Sitemap = STATIC_ROUTES.map(({ path, priority, freq }) => ({
        url: `${SITE_URL}${path}`,
        lastModified: now,
        changeFrequency: freq,
        priority,
    }));

    const articleEntries: MetadataRoute.Sitemap = articles.map((a) => ({
        url: `${SITE_URL}${a.customRoute || `/resources/articles/${a.slug}`}`,
        lastModified: new Date(a.publishedAt),
        changeFrequency: 'monthly',
        priority: 0.6,
    }));

    const toolEntries: MetadataRoute.Sitemap = tools.map((t) => ({
        url: `${SITE_URL}/tools/${t.slug}`,
        lastModified: now,
        changeFrequency: 'monthly',
        priority: 0.7,
    }));

    const caseStudyEntries: MetadataRoute.Sitemap = caseStudies.map((c) => ({
        url: `${SITE_URL}/case-studies/${c.slug}`,
        lastModified: now,
        changeFrequency: 'monthly',
        priority: 0.6,
    }));

    const nicheEntries: MetadataRoute.Sitemap = niches.map((n) => ({
        url: `${SITE_URL}/niches/${n.slug}`,
        lastModified: now,
        changeFrequency: 'monthly',
        priority: 0.7,
    }));

    return [...staticEntries, ...articleEntries, ...toolEntries, ...caseStudyEntries, ...nicheEntries];
}
