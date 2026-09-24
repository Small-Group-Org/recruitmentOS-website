import { Metadata } from 'next';
import FoundersGuideClient from './FoundersGuideClient';
import Footer from '@/components/Footer';
import { buildCanonical, SITE_URL } from '@/lib/seo';

export const metadata: Metadata = {
    title: "The Founder's Guide to Finding New Clients Every Week — RecruitmentOS",
    description: "The 16-step architecture to generate new recruitment clients every week without pausing your business. Battle-tested framework that generated 10k leads and 42 meetings.",
    alternates: { canonical: buildCanonical('/resources/founders-guide') },
    openGraph: {
        title: "The Founder's Guide to Finding New Clients Every Week — RecruitmentOS",
        description: "The 16-step architecture to generate new recruitment clients every week without pausing your business. Battle-tested framework that generated 10k leads and 42 meetings.",
        url: buildCanonical('/resources/founders-guide'),
        siteName: 'RecruitmentOS',
        type: 'article',
    },
    twitter: {
        card: 'summary_large_image',
        title: "The Founder's Guide to Finding New Clients Every Week",
        description: "The 16-step architecture to generate new recruitment clients every week without pausing your business.",
    },
};

export default function FoundersGuidePage() {
    const jsonLd = {
        '@context': 'https://schema.org',
        '@type': 'TechArticle',
        headline: "The Founder's Guide to Finding New Clients Every Week",
        description: "A 16-step outbound architecture that takes boutique recruitment agencies from cold, manual BD to a systematic, autonomous client-acquisition engine.",
        url: `${SITE_URL}/resources/founders-guide`,
        publisher: {
            '@type': 'Organization',
            name: 'RecruitmentOS',
            url: SITE_URL,
        },
    };

    return (
        <main className="min-h-screen bg-white">
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />
            <FoundersGuideClient />
            <Footer />
        </main>
    );
}
