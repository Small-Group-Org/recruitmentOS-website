import { Metadata } from 'next';
import Link from 'next/link';
import Footer from '@/components/Footer';
import { buildCanonical } from '@/lib/seo';

export const metadata: Metadata = {
    title: "Terms of Service | RecruitmentOS",
    description: "Terms of Service for RecruitmentOS. Learn about our terms, subscriptions, client responsibilities, and 60-day opportunity guarantee.",
    alternates: { canonical: buildCanonical('/terms') },
};

export default function TermsOfService() {
    return (
        <>
            <main className="min-h-screen bg-[#FAFAFA] pt-32 pb-24 font-sans antialiased text-neutral-800">
                <div className="max-w-[800px] mx-auto px-6 sm:px-8">
                    <div className="mb-12 border-b border-[#E5E5E5] pb-8">
                        <h1 className="text-4xl sm:text-5xl font-black text-black tracking-tight mb-4">
                            Terms of Service
                        </h1>
                        <p className="text-sm text-gray-500 font-medium">
                            Last Updated: July 27, 2026
                        </p>
                    </div>

                    <div className="prose prose-neutral max-w-none space-y-8 text-base leading-relaxed text-gray-600">
                        <section className="space-y-3">
                            <h2 className="text-xl sm:text-2xl font-bold text-black tracking-tight">
                                1. Services Provided
                            </h2>
                            <p>
                                RecruitmentOS offers comprehensive done-for-you outbound business development (BD) services designed specifically for recruitment agencies. Our services include prospect sourcing, data enrichment, personalized email and LinkedIn outreach, and reply handling, run on either our infrastructure or integrated into your own stack (Clay, Instantly, n8n, etc.).
                            </p>
                        </section>

                        <section className="space-y-3">
                            <h2 className="text-xl sm:text-2xl font-bold text-black tracking-tight">
                                2. Subscriptions and Billing
                            </h2>
                            <p>
                                By signing up for our services, you agree to pay the monthly subscription fees associated with your selected service tier. 
                            </p>
                            <ul className="list-disc pl-6 space-y-2">
                                <li>
                                    <strong className="text-black">Billing Cycle:</strong> All subscriptions are billed on a recurring monthly basis starting from the day your onboarding begins.
                                </li>
                                <li>
                                    <strong className="text-black">Cancellation Policy:</strong> Unless stated otherwise in your service agreement, we require a <strong className="text-black">30-day written notice</strong> to cancel or pause your subscription.
                                </li>
                                <li>
                                    <strong className="text-black">Refunds:</strong> Payments are non-refundable except under the express conditions of our 60-day opportunity guarantee.
                                </li>
                            </ul>
                        </section>

                        <section className="space-y-3">
                            <h2 className="text-xl sm:text-2xl font-bold text-black tracking-tight">
                                3. The 60-Day Opportunity Guarantee
                            </h2>
                            <p>
                                We stand by the predictability of our outbound growth system. If we do not generate <strong className="text-black">100 verified hiring-manager contacts/opportunities</strong> for your agency within the first 60 days of campaigns going live, we will work for free until that milestone is fully met.
                            </p>
                            <p>
                                To qualify for the guarantee, the client must complete onboarding within the first 14 days, provide the required workspace credentials (if campaigns are hosted on the client's stack), and maintain active campaign domains without disruption.
                            </p>
                        </section>

                        <section className="space-y-3">
                            <h2 className="text-xl sm:text-2xl font-bold text-black tracking-tight">
                                4. Client Obligations
                            </h2>
                            <p>
                                To achieve optimal results, you agree to:
                            </p>
                            <ul className="list-disc pl-6 space-y-2">
                                <li>Provide accurate information regarding your Ideal Client Profile (ICP) and services.</li>
                                <li>Respond to hand-off leads and positive replies in a timely manner (ideally within 24 hours).</li>
                                <li>Refrain from using the generated leads or outreach campaigns for spam or activities that violate platform policies (such as LinkedIn's User Agreement).</li>
                            </ul>
                        </section>

                        <section className="space-y-3">
                            <h2 className="text-xl sm:text-2xl font-bold text-black tracking-tight">
                                5. Intellectual Property
                            </h2>
                            <p>
                                All copy, outreach templates, data flows, and integrations developed by RecruitmentOS during your subscription remain the intellectual property of RecruitmentOS, unless explicitly transferred to the client in writing. Sourced lead lists and campaign results belong entirely to the client.
                            </p>
                        </section>

                        <section className="space-y-3">
                            <h2 className="text-xl sm:text-2xl font-bold text-black tracking-tight">
                                6. Limitation of Liability
                            </h2>
                            <p>
                                In no event shall RecruitmentOS, its directors, employees, or partners be liable for any indirect, incidental, special, consequential, or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses, resulting from your access to or use of (or inability to access or use) our services.
                            </p>
                        </section>

                        <section className="space-y-3">
                            <h2 className="text-xl sm:text-2xl font-bold text-black tracking-tight">
                                7. Governing Law
                            </h2>
                            <p>
                                These Terms shall be governed and construed in accordance with the laws of India, without regard to its conflict of law provisions. Any legal action or proceeding arising under these Terms will be brought exclusively in the courts located in New Delhi, India.
                            </p>
                        </section>

                        <section className="space-y-3">
                            <h2 className="text-xl sm:text-2xl font-bold text-black tracking-tight">
                                8. Contact Information
                            </h2>
                            <p>
                                If you have any questions about these Terms of Service, please contact us at:
                            </p>
                            <div className="bg-white border border-[#E5E5E5] rounded-2xl p-6 mt-4 space-y-1">
                                <p className="font-bold text-black">RecruitmentOS</p>
                                <p className="text-gray-600">Email: hello@hirerecruitmentos.com</p>
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
