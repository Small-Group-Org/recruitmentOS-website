import AIRecruitingOSClient from './AIRecruitingOSClient';
import Footer from '@/components/Footer';
import { buildCanonical } from '@/lib/seo';

export const metadata = {
    title: 'AI Recruiting Operating System with Claude Code — RecruitmentOS',
    description: 'Not another chatbot. A system. 5 AI agents, 15 recruiting skills, MCP connectors, and a knowledge base working together as a complete recruiting OS.',
    alternates: { canonical: buildCanonical('/resources/ai-recruiting-os') },
};

export default function AIRecruitingOSPage() {
    return (
        <main className="min-h-screen bg-white">
            <AIRecruitingOSClient />
            <Footer />
        </main>
    );
}
