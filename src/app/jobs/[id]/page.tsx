import { buildCanonical } from '@/lib/seo';
import JobDetailClient from './JobDetailClient';

interface PageProps {
    params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: PageProps) {
    const { id } = await params;
    const canonical = buildCanonical(`/jobs/${id}`);

    return {
        title: 'Job Details | RecruitmentOS',
        description:
            'View full job details, requirements, skills, and company information. Apply directly to the original posting.',
        alternates: { canonical },
        openGraph: {
            title: 'Job Details | RecruitmentOS',
            description:
                'View full job details, requirements, skills, and company information.',
            url: canonical,
            siteName: 'RecruitmentOS',
            type: 'website',
        },
        robots: {
            index: false,
            follow: true,
        },
    };
}

export default async function JobDetailPage({ params }: PageProps) {
    const { id } = await params;

    return (
        <main
            className="min-h-screen"
            style={{ background: 'var(--background)' }}
        >
            <JobDetailClient jobId={id} />
        </main>
    );
}
