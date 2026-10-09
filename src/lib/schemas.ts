import { SITE_URL, SITE_NAME, CONTACT_EMAIL } from './seo';
import { socialLinks } from './social-links';
import { pricingOfferings } from './pricing-data';
import type { ArticleMeta } from './articles-data';

export const organizationSchema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    '@id': `${SITE_URL}/#organization`,
    name: SITE_NAME,
    url: SITE_URL,
    logo: `${SITE_URL}/og-image.webp`,
    description: 'Done-for-you BD function for established recruitment agencies.',
    email: CONTACT_EMAIL,
    contactPoint: [
        {
            '@type': 'ContactPoint',
            contactType: 'customer support',
            email: CONTACT_EMAIL,
            url: `${SITE_URL}/contact`,
            availableLanguage: ['English'],
        },
    ],
    founder: {
        '@type': 'Person',
        '@id': `${SITE_URL}/#founder`,
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

export function faqSchema(faqs: { q: string; a: string }[], pageUrl: string = `${SITE_URL}/`) {
    return {
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        '@id': `${pageUrl}#faq`,
        isPartOf: {
            '@type': 'WebPage',
            '@id': `${pageUrl}#webpage`,
        },
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
    '@id': `${SITE_URL}/#service`,
    name: 'Done-For-You BD for Recruitment Agencies',
    description: 'We replace your entire BD function — niche immersion, signal engine, outreach engine, reply triage — on your stack.',
    provider: { '@type': 'Organization', '@id': `${SITE_URL}/#organization`, name: SITE_NAME, url: SITE_URL },
    areaServed: 'Global',
    serviceType: 'Business Development Outsourcing',
    offers: pricingOfferings.map((offering) => ({
        '@type': 'Offer',
        name: offering.name,
        price: String(offering.price),
        priceCurrency: 'USD',
        description: `${offering.tagline} Setup fee: $${offering.setupFee.toLocaleString()}. ${offering.commitment}. ${offering.details.join('. ')}.`,
        url: `${SITE_URL}/pricing`,
    })),
};

export const personSchema = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    '@id': `${SITE_URL}/#founder`,
    name: 'Tushar Mangla',
    jobTitle: 'Founder, RecruitmentOS',
    email: CONTACT_EMAIL,
    url: `${SITE_URL}/about`,
    sameAs: ['https://www.linkedin.com/in/tusharmanglatm/'],
    worksFor: { '@type': 'Organization', '@id': `${SITE_URL}/#organization`, name: SITE_NAME, url: SITE_URL },
};

export interface WebPageSchemaOptions {
    title: string;
    description: string;
    url: string;
    breadcrumbs?: { name: string; url: string }[];
    datePublished?: string;
    dateModified?: string;
}

export function webPageSchema({
    title,
    description,
    url,
    breadcrumbs,
    datePublished,
    dateModified,
}: WebPageSchemaOptions) {
    const schema: Record<string, unknown> = {
        '@context': 'https://schema.org',
        '@type': 'WebPage',
        '@id': `${url}#webpage`,
        url,
        name: title,
        description,
        isPartOf: {
            '@type': 'WebSite',
            '@id': `${SITE_URL}/#website`,
            name: SITE_NAME,
            url: SITE_URL,
        },
        about: { '@id': `${SITE_URL}/#organization` },
        publisher: { '@id': `${SITE_URL}/#organization` },
        author: { '@id': `${SITE_URL}/#founder` },
    };
    if (datePublished) schema.datePublished = datePublished;
    if (dateModified) schema.dateModified = dateModified;
    if (breadcrumbs && breadcrumbs.length > 0) {
        schema.breadcrumb = {
            '@type': 'BreadcrumbList',
            '@id': `${url}#breadcrumb`,
            itemListElement: breadcrumbs.map((crumb, idx) => ({
                '@type': 'ListItem',
                position: idx + 1,
                name: crumb.name,
                item: crumb.url,
            })),
        };
    }
    return schema;
}

export function buildPageSchemaGraph(nodes: Record<string, unknown>[]) {
    return {
        '@context': 'https://schema.org',
        '@graph': nodes,
    };
}

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
