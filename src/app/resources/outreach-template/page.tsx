import OutreachTemplateClient from './OutreachTemplateClient';
import Footer from '@/components/Footer';
import { buildCanonical } from '@/lib/seo';

export const metadata = {
    title: 'BD Outreach Email Template & Funnel — RecruitmentOS',
    description: 'The exact email template and outreach funnel that gets replies. One email. One reply: "This candidate sounds exactly what we need."',
    alternates: { canonical: buildCanonical('/resources/outreach-template') },
};

export default function OutreachTemplatePage() {
    return (
        <main className="min-h-screen bg-white">
            <OutreachTemplateClient />
            <Footer />
        </main>
    );
}
