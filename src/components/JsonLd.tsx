type JsonLdProps = {
    data: Record<string, unknown> | Record<string, unknown>[];
};

export default function JsonLd({ data }: JsonLdProps) {
    return (
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
        />
    );
}

export const organizationSchema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'RecruitmentOS',
    url: 'https://recruitmentos.smallgrp.com',
    logo: 'https://recruitmentos.smallgrp.com/favicon.svg',
    founder: {
        '@type': 'Person',
        name: 'Tushar Mangla',
        sameAs: 'https://www.linkedin.com/in/tusharmanglatm/',
    },
    sameAs: ['https://www.linkedin.com/in/tusharmanglatm/'],
    description:
        'Outsourced BD function for established recruitment agencies ($500K–$5M annual revenue). We replace your BD function — sourcing, enrichment, outreach, reply handling — on your stack.',
};

export const serviceSchema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: 'Done-For-You BD for Recruitment Agencies',
    provider: {
        '@type': 'Organization',
        name: 'RecruitmentOS',
        url: 'https://recruitmentos.smallgrp.com',
    },
    serviceType: 'Business Development outsourcing',
    areaServed: 'Worldwide',
    description:
        'Two-part engagement: a one-time Build to design and stand up the BD engine on the client stack, then a monthly Run that operates the system. 60-day guarantee: 100 hiring-manager contacts + 10 verified replies, or we work free until delivered.',
    offers: [
        {
            '@type': 'Offer',
            name: 'Starter (0–4 placements/month)',
            priceCurrency: 'USD',
            price: '1300',
            priceSpecification: {
                '@type': 'UnitPriceSpecification',
                price: '1300',
                priceCurrency: 'USD',
                unitText: 'MONTH',
            },
        },
        {
            '@type': 'Offer',
            name: 'Growth (5–10 placements/month)',
            priceCurrency: 'USD',
            price: '2750',
            priceSpecification: {
                '@type': 'UnitPriceSpecification',
                price: '2750',
                priceCurrency: 'USD',
                unitText: 'MONTH',
            },
        },
        {
            '@type': 'Offer',
            name: 'Pro (10–25 placements/month)',
            priceCurrency: 'USD',
            price: '6500',
            priceSpecification: {
                '@type': 'UnitPriceSpecification',
                price: '6500',
                priceCurrency: 'USD',
                unitText: 'MONTH',
            },
        },
    ],
};
