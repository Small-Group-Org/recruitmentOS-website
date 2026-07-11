import Pricing from '@/components/Pricing';
import Footer from '@/components/Footer';
import { buildCanonical } from '@/lib/seo';
import { JsonLd } from '@/components/JsonLd';
import { serviceWithOffersSchema } from '@/lib/schemas';

export const metadata = {
  title: 'Pricing — RecruitmentOS Lead Packages',
  description: 'Pay for pipeline, not promises. Leads from $52 one-off · Managed email outreach from $431/mo · Full multichannel BD from $574/mo. Pick your volume on any plan.',
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
