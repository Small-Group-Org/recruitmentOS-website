import { Metadata } from 'next';
import Link from 'next/link';
import Footer from '@/components/Footer';
import { buildCanonical } from '@/lib/seo';

export const metadata: Metadata = {
    title: "Privacy Policy | RecruitmentOS",
    description: "Privacy Policy for RecruitmentOS. Learn how we collect, use, and protect your data for B2B outbound lead generation services.",
    alternates: { canonical: buildCanonical('/privacy') },
};

export default function PrivacyPolicy() {
    return (
        <>
            <main className="min-h-screen bg-[#FAFAFA] pt-32 pb-24 font-sans antialiased text-neutral-800">
                <div className="max-w-[800px] mx-auto px-6 sm:px-8">
                    <div className="mb-12 border-b border-[#E5E5E5] pb-8">
                        <h1 className="text-4xl sm:text-5xl font-black text-black tracking-tight mb-4">
                            Privacy Policy
                        </h1>
                        <p className="text-sm text-gray-500 font-medium">
                            Last Updated: July 27, 2026
                        </p>
                    </div>

                    <div className="prose prose-neutral max-w-none space-y-8 text-base leading-relaxed text-gray-600">
                        <section className="space-y-3">
                            <h2 className="text-xl sm:text-2xl font-bold text-black tracking-tight">
                                1. Introduction
                            </h2>
                            <p>
                                RecruitmentOS ("we," "us," or "our") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website <Link href="/" className="text-black font-semibold hover:underline">hirerecruitmentos.com</Link> and use our AI-powered B2B outbound lead generation and business development services.
                            </p>
                            <p>
                                Please read this Privacy Policy carefully. By using our website or services, you consent to the data practices described in this policy.
                            </p>
                        </section>

                        <section className="space-y-3">
                            <h2 className="text-xl sm:text-2xl font-bold text-black tracking-tight">
                                2. Data We Collect
                            </h2>
                            <p>
                                We collect information that identifies, relates to, describes, or could reasonably be linked with you or your household ("personal information"). We collect this information in several ways:
                            </p>
                            <ul className="list-disc pl-6 space-y-2">
                                <li>
                                    <strong className="text-black">Information You Provide:</strong> When you contact us, book a consultation call, sign up for our services, or use our free tools (such as the Cold Email Writer or Volume Gap Calculator), we may collect your name, email address, phone number, company name, and job title.
                                </li>
                                <li>
                                    <strong className="text-black">Automatically Collected Data:</strong> When you navigate our website, we automatically collect technical details such as your IP address, browser type, operating system, referring URLs, pages viewed, and access times. We use standard tracking technologies like cookies and UTM parameters to analyze traffic patterns.
                                </li>
                                <li>
                                    <strong className="text-black">B2B Enrichment Data:</strong> To perform our outbound business development services for our clients, we source and enrich publicly available corporate contact information (such as LinkedIn profile data, corporate email addresses, and professional histories) using third-party databases.
                                </li>
                            </ul>
                        </section>

                        <section className="space-y-3">
                            <h2 className="text-xl sm:text-2xl font-bold text-black tracking-tight">
                                3. How We Use Your Information
                            </h2>
                            <p>
                                We use the collected data for the following business and operational purposes:
                            </p>
                            <ul className="list-disc pl-6 space-y-2">
                                <li>To deliver, maintain, and optimize our B2B lead generation services.</li>
                                <li>To customize outreach campaigns, reply handling, and contact enrichment for our clients.</li>
                                <li>To respond to your inquiries, schedule consultation calls, and send transactional updates.</li>
                                <li>To analyze website usage statistics to improve user experience and page load performance.</li>
                                <li>To prevent fraudulent activities and ensure system security.</li>
                            </ul>
                        </section>

                        <section className="space-y-3">
                            <h2 className="text-xl sm:text-2xl font-bold text-black tracking-tight">
                                4. Compliance and Data Privacy Rights
                            </h2>
                            <p>
                                We operate in compliance with major global privacy frameworks, including the General Data Protection Regulation (GDPR) and the California Consumer Privacy Act (CCPA).
                            </p>
                            <p>
                                Depending on your location, you may have the right to request access to, correction of, or deletion of the personal information we hold about you. You can opt out of any future marketing communications or request that we remove your professional contact data from our business development enrichment lists by emailing us at <span className="text-black font-semibold">tushar.mangla1120@gmail.com</span>.
                            </p>
                        </section>

                        <section className="space-y-3">
                            <h2 className="text-xl sm:text-2xl font-bold text-black tracking-tight">
                                5. Security & Data Retention
                            </h2>
                            <p>
                                We implement appropriate technical and organizational measures to secure your personal information against unauthorized access, loss, or alteration. We retain your personal information only for as long as necessary to fulfill the purposes outlined in this policy or to comply with legal, tax, or regulatory obligations.
                            </p>
                        </section>

                        <section className="space-y-3">
                            <h2 className="text-xl sm:text-2xl font-bold text-black tracking-tight">
                                6. Changes to This Policy
                            </h2>
                            <p>
                                We reserve the right to modify this Privacy Policy at any time. We will notify you of any changes by posting the new policy on this page with an updated "Last Updated" date. We encourage you to review this page periodically to stay informed about how we protect your data.
                            </p>
                        </section>

                        <section className="space-y-3">
                            <h2 className="text-xl sm:text-2xl font-bold text-black tracking-tight">
                                7. Contact Us
                            </h2>
                            <p>
                                If you have any questions or concerns regarding this Privacy Policy or our data practices, please contact us at:
                            </p>
                            <div className="bg-white border border-[#E5E5E5] rounded-2xl p-6 mt-4 space-y-1">
                                <p className="font-bold text-black">RecruitmentOS</p>
                                <p className="text-gray-600">Email: tushar.mangla1120@gmail.com</p>
                                <p className="text-gray-600">Website: <Link href="/" className="text-black hover:underline font-medium">www.hirerecruitmentos.com</Link></p>
                            </div>
                        </section>
                    </div>
                </div>
            </main>
            <Footer />
        </>
    );
}
