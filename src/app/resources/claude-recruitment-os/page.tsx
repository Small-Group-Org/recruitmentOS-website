import ClaudeSystemClient from './ClaudeSystemClient'; // Force IDE update
import Footer from '@/components/Footer';
import { buildCanonical } from '@/lib/seo';

export const metadata = {
    title: 'Recruitment OS powered by Claude Code — RecruitmentOS',
    description: 'We\'ve built AI systems that automate the repetitive work behind recruitment. Claude Code books interviews before you even see the job.',
    alternates: { canonical: buildCanonical('/resources/claude-recruitment-os') },
};

export default function ClaudeSystemPage() {
    return (
        <main className="min-h-screen bg-white">
            <ClaudeSystemClient />
            <Footer />
        </main>
    );
}
