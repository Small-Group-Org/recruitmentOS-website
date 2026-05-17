import Resources from '@/components/Resources';
import Footer from '@/components/Footer';
import { buildCanonical } from '@/lib/seo';

export const metadata = {
    title: 'Resources — RecruitmentOS',
    description: 'Free tools, templates, audits, and long-form articles for recruitment-agency BD.',
    alternates: { canonical: buildCanonical('/resources') },
};

export default function ResourcesPage() {
    return (
        <main className="min-h-screen bg-white">
            <div className="pt-4">
                <Resources />
            </div>
            <Footer />
        </main>
    );
}
