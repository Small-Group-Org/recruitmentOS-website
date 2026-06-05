import { buildCanonical } from '@/lib/seo';
import SkillsGateClient from './SkillsGateClient';

export const metadata = {
  title: '6 Free AI Skills for Recruiters — RecruitmentOS',
  description: 'Unlock a free GitHub repo of 6 AI workflows recruiters can run today: sourcing, enrichment, screening, outreach, qualification, reporting.',
  alternates: { canonical: buildCanonical('/resources/skills-gate') },
  robots: { index: false, follow: true },
};

export default function SkillsGatePage() {
  return <SkillsGateClient />;
}
