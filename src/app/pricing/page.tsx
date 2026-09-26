import Pricing from '@/components/Pricing';
import Footer from '@/components/Footer';
import { buildCanonical } from '@/lib/seo';
import { JsonLd } from '@/components/JsonLd';
import { serviceWithOffersSchema } from '@/lib/schemas';

export const metadata = {
  title: 'Pricing — $1,000/mo Managed Acquisition Sprint or $200/Reply',
  description: 'Choose a $1,500 setup plus $1,000/mo managed acquisition sprint with at least 12 verified positive replies per month, or a $1,000 setup plus $200 per verified positive reply.',
  alternates: { canonical: buildCanonical('/pricing') },
};

export default function PricingPage() {
  return (
    <main className="min-h-screen">
      <JsonLd data={serviceWithOffersSchema} />
      <Pricing />
      <Footer />
    </main>
  );
}
