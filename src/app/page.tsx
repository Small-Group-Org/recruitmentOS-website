import Hero from '@/components/Hero';
import TrustBar from '@/components/TrustBar';
import FeaturesDiagram from '@/components/FeaturesDiagram';
import BeforeAfter from '@/components/BeforeAfter';
import WhyNotDIY from '@/components/WhyNotDIY';
import Features from '@/components/Features';
import ToolTicker from '@/components/ToolTicker';
import Pricing from '@/components/Pricing';
import FinalCTA from '@/components/FinalCTA';
import Footer from '@/components/Footer';
import CaseStudiesPreview from '@/components/CaseStudiesPreview';
import OperationalProof from '@/components/OperationalProof';
import FAQ from '@/components/FAQ';
import InternalOperationsAI from '@/components/InternalOperationsAI';
import { buildCanonical } from '@/lib/seo';
import { JsonLd } from '@/components/JsonLd';
import { faqSchema, webPageSchema, serviceWithOffersSchema } from '@/lib/schemas';
import { getHomeFaqsForSchema } from '@/lib/faq-data';

export const metadata = {
    title: 'RecruitmentOS — Done-For-You BD for Recruitment Agencies',
    description: 'We replace your BD function — sourcing, enrichment, outreach, reply handling on your stack. 100 hiring-manager contacts in 60 days or we work free.',
    alternates: { canonical: buildCanonical('/') },
    openGraph: {
        title: 'RecruitmentOS — Done-For-You BD for Recruitment Agencies',
        description: 'We replace your BD function — sourcing, enrichment, outreach, reply handling on your stack. 100 hiring-manager contacts in 60 days or we work free.',
        url: buildCanonical('/'),
        siteName: 'RecruitmentOS',
        type: 'website',
    },
};

export default function Home() {
    return (
        <main className="min-h-screen">
            <JsonLd
                data={webPageSchema({
                    title: 'RecruitmentOS — Done-For-You BD for Recruitment Agencies',
                    description: 'We replace your BD function — sourcing, enrichment, outreach, reply handling on your stack. 100 hiring-manager contacts in 60 days or we work free.',
                    url: buildCanonical('/'),
                })}
            />
            <JsonLd data={faqSchema(getHomeFaqsForSchema(), buildCanonical('/'))} />
            <JsonLd data={serviceWithOffersSchema} />
            <Hero />
            <TrustBar />
            <OperationalProof />
            <CaseStudiesPreview />
            <FeaturesDiagram />
            <BeforeAfter />
            <WhyNotDIY />
            <Features />
            <InternalOperationsAI />
            <ToolTicker />
            <Pricing />
            <FinalCTA />
            <FAQ />
            <Footer />
        </main>
    );
}
