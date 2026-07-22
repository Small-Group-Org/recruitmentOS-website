import { buildCanonical } from '@/lib/seo';
import JobsFeed from './JobsFeed';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export const metadata = {
    title: 'Job Feed — Live Scraped Openings | RecruitmentOS',
    description:
        'Browse thousands of freshly scraped job postings from LinkedIn, Indeed, StepStone, and more. Filter by industry, location, experience level, and remote eligibility.',
    alternates: { canonical: buildCanonical('/jobs') },
    openGraph: {
        title: 'Job Feed — Live Scraped Openings | RecruitmentOS',
        description:
            'Browse thousands of freshly scraped job postings from LinkedIn, Indeed, StepStone, and more.',
        url: buildCanonical('/jobs'),
        siteName: 'RecruitmentOS',
        type: 'website',
    },
};

export default function JobsPage() {
    return (
        <main className="min-h-screen bg-[var(--background)]">
            <JobsFeed />
            <Footer />
        </main>
    );
}
