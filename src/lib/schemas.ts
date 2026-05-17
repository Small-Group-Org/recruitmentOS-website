import { SITE_URL, SITE_NAME } from './seo';
import { socialLinks } from './social-links';
import { brackets } from './pricing-data';
import type { ArticleMeta } from './articles-data';

export const organizationSchema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: SITE_NAME,
    url: SITE_URL,
    logo: `${SITE_URL}/og-image.png`,
    description: 'Done-for-you BD function for established recruitment agencies billing $500K–$5M annually.',
    founder: {
        '@type': 'Person',
        name: 'Tushar Mangla',
        jobTitle: 'Founder',
        sameAs: 'https://www.linkedin.com/in/tusharmanglatm/',
    },
    sameAs: [
        'https://www.linkedin.com/in/tusharmanglatm/',
        ...socialLinks.map((l) => l.url),
    ],
    areaServed: { '@type': 'Place', name: 'Global' },
    knowsAbout: [
        'Recruitment agency business development',
        'Done-for-you BD outsourcing',
        'Hiring manager outreach',
        'Recruitment lead generation',
    ],
};

export function faqSchema(faqs: { q: string; a: string }[]) {
    return {
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: faqs.map(({ q, a }) => ({
            '@type': 'Question',
            name: q,
            acceptedAnswer: { '@type': 'Answer', text: a },
        })),
    };
}

export const serviceWithOffersSchema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: 'Done-For-You BD for Recruitment Agencies',
    description: 'We replace your entire BD function — niche immersion, signal engine, outreach engine, reply triage — on your stack.',
    provider: { '@type': 'Organization', name: SITE_NAME, url: SITE_URL },
    areaServed: 'Global',
    serviceType: 'Business Development Outsourcing',
    offers: brackets.map((b) => ({
        '@type': 'Offer',
        name: b.name,
        price: String(b.monthlyUsd),
        priceCurrency: 'USD',
        description: b.capabilityBullets.join('. '),
        url: `${SITE_URL}/pricing`,
    })),
};

export const personSchema = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: 'Tushar Mangla',
    jobTitle: 'Founder, RecruitmentOS',
    url: `${SITE_URL}/about`,
    sameAs: ['https://www.linkedin.com/in/tusharmanglatm/'],
    worksFor: { '@type': 'Organization', name: SITE_NAME, url: SITE_URL },
};

export function webApplicationSchema(name: string, slug: string, description: string) {
    return {
        '@context': 'https://schema.org',
        '@type': 'WebApplication',
        name,
        url: `${SITE_URL}/tools/${slug}`,
        description,
        applicationCategory: 'BusinessApplication',
        operatingSystem: 'Any (web)',
        offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
    };
}

export function articleSchema(a: ArticleMeta) {
    return {
        '@context': 'https://schema.org',
        '@type': 'Article',
        headline: a.title,
        description: a.description,
        datePublished: a.publishedAt,
        author: { '@type': 'Person', name: 'Tushar Mangla' },
        publisher: { '@type': 'Organization', name: SITE_NAME, url: SITE_URL },
        mainEntityOfPage: `${SITE_URL}${a.customRoute || `/resources/articles/${a.slug}`}`,
    };
}
