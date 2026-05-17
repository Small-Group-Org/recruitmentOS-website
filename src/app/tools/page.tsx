import { tools } from '@/lib/tools-data';
import ToolHub from '@/components/tools/ToolHub';
import { buildCanonical } from '@/lib/seo';

export const metadata = {
  title: 'Free Recruitment Tools | RecruitmentOS',
  description: 'Calculators, scorecards, and advisors built for established recruitment agencies.',
  alternates: { canonical: buildCanonical('/tools') },
};

export default function ToolsPage() {
  return <ToolHub tools={tools} />;
}
