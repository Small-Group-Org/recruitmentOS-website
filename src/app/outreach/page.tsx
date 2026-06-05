import { Suspense } from 'react';
import OutreachHero from '@/components/outreach/OutreachHero';
import ProofSection from '@/components/outreach/ProofSection';
import SampleLeads from '@/components/outreach/SampleLeads';
import SimpleCTA from '@/components/outreach/SimpleCTA';
import QuickFAQ from '@/components/outreach/QuickFAQ';
import Analytics from '@/components/Analytics';

export const metadata = {
    title: 'Get 1,000 Quality Leads Every Month | RecruitmentOS',
    description: 'Done-for-you lead generation for recruitment agencies. Verified 6%+ reply rates. 1,000 quality leads delivered monthly.',
};

function OutreachContent() {
    return (
        <>
            <Suspense fallback={<div className="min-h-screen bg-white" />}>
                <OutreachHero />
            </Suspense>
            <ProofSection />
            <SampleLeads />
            <SimpleCTA />
            <QuickFAQ />
        </>
    );
}

export default function OutreachPage() {
    return (
        <main className="min-h-screen bg-white">
            <Analytics />
            <OutreachContent />
        </main>
    );
}
