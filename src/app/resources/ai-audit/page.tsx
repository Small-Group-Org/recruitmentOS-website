import { buildCanonical } from '@/lib/seo';
import AuditClient from '@/app/resources/ai-audit/AuditClient';

export const metadata = {
  title: 'Free AI Recruitment Audit — RecruitmentOS',
  description: 'Book a free 30-minute audit. We identify exactly where your agency is losing time and revenue, and map a custom AI workflow to fix it.',
  alternates: { canonical: buildCanonical('/resources/ai-audit') },
  robots: { index: false, follow: true },
};

export default function AuditPage() {
  return <AuditClient />;
}
