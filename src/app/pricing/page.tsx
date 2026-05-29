import Pricing from '@/components/Pricing';
import Footer from '@/components/Footer';
import { buildCanonical } from '@/lib/seo';
import { JsonLd } from '@/components/JsonLd';
import { serviceWithOffersSchema } from '@/lib/schemas';

export const metadata = {
  title: 'Pricing — RecruitmentOS Lead Packages',
  description: 'Verified leads by volume. Starter from $49 · Growth from $149 · Scale from $299 · Enterprise custom. Email + LinkedIn data, managed outreach, monthly or annual.',
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
