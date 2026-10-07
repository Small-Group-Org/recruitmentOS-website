import { MetadataRoute } from 'next';
import { SITE_URL } from '@/lib/seo';

export default function robots(): MetadataRoute.Robots {
    return {
        rules: [
            {
                userAgent: ['OAI-SearchBot', 'PerplexityBot', 'Claude-SearchBot'],
                allow: '/',
                disallow: ['/tools/gate', '/api/'],
            },
            {
                userAgent: ['GPTBot', 'ClaudeBot'],
                allow: '/',
                disallow: ['/tools/gate', '/api/'],
            },
            {
                userAgent: ['Googlebot', 'Bingbot'],
                allow: '/',
                disallow: ['/tools/gate', '/api/'],
            },
            {
                userAgent: '*',
                allow: '/',
                disallow: ['/tools/gate', '/api/'],
            },
        ],
        sitemap: `${SITE_URL}/sitemap.xml`,
    };
}
