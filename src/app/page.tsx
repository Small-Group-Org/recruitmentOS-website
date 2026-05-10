import Hero from '@/components/Hero';
import TrustBar from '@/components/TrustBar';
import ClientLogos from '@/components/ClientLogos';
import WhoItIsFor from '@/components/WhoItIsFor';
import WhatWeDo from '@/components/WhatWeDo';
import HowItWorks from '@/components/HowItWorks';
import CaseStudyTeaser from '@/components/CaseStudyTeaser';
import QualityGuarantee from '@/components/QualityGuarantee';
import Pricing from '@/components/Pricing';
import FAQ from '@/components/FAQ';
import FinalCTA from '@/components/FinalCTA';
import Footer from '@/components/Footer';

export default function Home() {
    return (
        <main className="min-h-screen">
            <Hero />
            <TrustBar />
            <ClientLogos />
            <WhoItIsFor />
            <WhatWeDo />
            <HowItWorks />
            <CaseStudyTeaser />
            <QualityGuarantee />
            <Pricing />
            <FAQ />
            <FinalCTA />
            <Footer />
        </main>
    );
}
