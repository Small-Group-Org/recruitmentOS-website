import Hero from '@/components/Hero';
import TrustBar from '@/components/TrustBar';
import FeaturesDiagram from '@/components/FeaturesDiagram';
import BeforeAfter from '@/components/BeforeAfter';
import WhyNotDIY from '@/components/WhyNotDIY';
import Features from '@/components/Features';
import ToolTicker from '@/components/ToolTicker';
import FinalCTA from '@/components/FinalCTA';
import Footer from '@/components/Footer';
import ProductDemo from '@/components/ProductDemo';
import CaseStudiesPreview from '@/components/CaseStudiesPreview';
import FAQ from '@/components/FAQ';
import { buildCanonical } from '@/lib/seo';

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
            <Hero />
            <ProductDemo />
            <TrustBar />
            <CaseStudiesPreview />
            <FeaturesDiagram />
            <BeforeAfter />
            <WhyNotDIY />
            <Features />
            <ToolTicker />
            <FinalCTA />
            <FAQ />
            <Footer />
        </main>
    );
}
