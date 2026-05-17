import Pricing from '@/components/Pricing';
import Footer from '@/components/Footer';
import { buildCanonical } from '@/lib/seo';
import { JsonLd } from '@/components/JsonLd';
import { serviceWithOffersSchema } from '@/lib/schemas';

export const metadata = {
  title: 'Pricing — RecruitmentOS Build + Run',
  description: 'Bundled packages priced by an on-page calculator. Starter $1,300 · Growth $2,750 · Pro $6,500/mo. 60-day guarantee.',
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
