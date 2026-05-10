import Navbar from '@/components/Navbar';
import TheBottleneck from '@/components/TheBottleneck';
import TheMath from '@/components/TheMath';
import BeforeAfter from '@/components/BeforeAfter';
import YourStack from '@/components/YourStack';
import Pricing from '@/components/Pricing';
import QualityGuarantee from '@/components/QualityGuarantee';
import FinalCTA from '@/components/FinalCTA';
import Footer from '@/components/Footer';

export default function PricingPage() {
    return (
        <main className="min-h-screen">
            <Pricing />
            <TheBottleneck />
            <TheMath />
            <BeforeAfter />
            <YourStack />
            <QualityGuarantee />
            <FinalCTA />
            <Footer />
        </main>
    );
}
