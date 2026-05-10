import type { MetadataRoute } from 'next';

const SITE_URL = 'https://recruitmentos.smallgrp.com';

export default function robots(): MetadataRoute.Robots {
    return {
        rules: [
            {
                userAgent: '*',
                allow: '/',
                disallow: ['/tools/gate', '/api/'],
            },
        ],
        sitemap: `${SITE_URL}/sitemap.xml`,
    };
}
