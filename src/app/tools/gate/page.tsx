import { buildCanonical } from '@/lib/seo';
import GatePageClient from './GatePageClient';

export const metadata = {
  title: 'Unlock — RecruitmentOS Tools',
  description: 'Quick unlock for the RecruitmentOS tool library.',
  alternates: { canonical: buildCanonical('/tools/gate') },
  robots: { index: false, follow: false },
};

export default function GatePage() {
  return <GatePageClient />;
}
