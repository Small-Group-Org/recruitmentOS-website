import type { MetadataRoute } from 'next';
import { tools } from '@/lib/tools-data';

const SITE_URL = 'https://recruitmentos.smallgrp.com';

export default function sitemap(): MetadataRoute.Sitemap {
    const now = new Date();

    const staticRoutes: MetadataRoute.Sitemap = [
        { url: `${SITE_URL}/`, lastModified: now, changeFrequency: 'weekly', priority: 1.0 },
        { url: `${SITE_URL}/pricing`, lastModified: now, changeFrequency: 'monthly', priority: 0.9 },
        { url: `${SITE_URL}/fit-call`, lastModified: now, changeFrequency: 'monthly', priority: 0.9 },
        { url: `${SITE_URL}/scorecard`, lastModified: now, changeFrequency: 'monthly', priority: 0.8 },
        { url: `${SITE_URL}/calculator`, lastModified: now, changeFrequency: 'monthly', priority: 0.8 },
        { url: `${SITE_URL}/case-studies`, lastModified: now, changeFrequency: 'monthly', priority: 0.7 },
        { url: `${SITE_URL}/tools`, lastModified: now, changeFrequency: 'weekly', priority: 0.6 },
        { url: `${SITE_URL}/resources`, lastModified: now, changeFrequency: 'weekly', priority: 0.6 },
    ];

    const toolRoutes: MetadataRoute.Sitemap = tools.map((t) => ({
        url: `${SITE_URL}/tools/${t.slug}`,
        lastModified: now,
        changeFrequency: 'monthly',
        priority: 0.5,
    }));

    return [...staticRoutes, ...toolRoutes];
}
