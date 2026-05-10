import Hero from '@/components/Hero';
import TrustBar from '@/components/TrustBar';
import ClientLogos from '@/components/ClientLogos';
import CoreMessages from '@/components/CoreMessages';
import WhoItIsFor from '@/components/WhoItIsFor';
import TheBottleneck from '@/components/TheBottleneck';
import WhatWeDo from '@/components/WhatWeDo';
import HowItWorks from '@/components/HowItWorks';
import YourStack from '@/components/YourStack';
import CaseStudyTeaser from '@/components/CaseStudyTeaser';
import QualityGuarantee from '@/components/QualityGuarantee';
import Pricing from '@/components/Pricing';
import NonCompromises from '@/components/NonCompromises';
import FAQ from '@/components/FAQ';
import FinalCTA from '@/components/FinalCTA';
import Footer from '@/components/Footer';

export default function Home() {
    return (
        <main className="min-h-screen">
            <Hero />
            <TrustBar />
            <ClientLogos />
            <CoreMessages />
            <WhoItIsFor />
            <TheBottleneck />
            <WhatWeDo />
            <HowItWorks />
            <YourStack />
            <CaseStudyTeaser />
            <QualityGuarantee />
            <Pricing />
            <NonCompromises />
            <FAQ />
            <FinalCTA />
            <Footer />
        </main>
    );
}
