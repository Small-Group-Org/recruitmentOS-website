import { Metadata } from 'next';
import Footer from '@/components/Footer';
import { buildCanonical } from '@/lib/seo';

export const metadata: Metadata = {
    title: 'Anti-Spam Policy | RecruitmentOS',
    description: 'RecruitmentOS anti-spam policy: our rules against using unsolicited messages to advertise getrecruitmentos.com.',
    alternates: { canonical: buildCanonical('/anti-spam-policy') },
};

const ABUSE_EMAIL = 'abuse@getrecruitmentos.com';

const h2 = 'text-xl sm:text-2xl font-bold text-black tracking-tight';
const link = 'text-black font-semibold hover:underline';

export default function AntiSpamPolicy() {
    return (
        <>
            <main className="min-h-screen bg-[#FAFAFA] pt-32 pb-24 font-sans antialiased text-neutral-800">
                <div className="max-w-[800px] mx-auto px-6 sm:px-8">
                    <div className="mb-12 border-b border-[#E5E5E5] pb-8">
                        <h1 className="text-4xl sm:text-5xl font-black text-black tracking-tight mb-4">
                            Anti-Spam Policy
                        </h1>
                        <p className="text-sm text-gray-500 font-medium">
                            Applies to: getrecruitmentos.com &middot; Operated by small GROUP &middot; Last updated: 2 November 2026
                        </p>
                    </div>

                    <div className="max-w-none space-y-8 text-base leading-relaxed text-gray-600">
                        <section className="space-y-3">
                            <p>
                                small GROUP, which operates RecruitmentOS at getrecruitmentos.com, does not permit the use of unsolicited bulk email, or any message sent in breach of this policy, to advertise or promote getrecruitmentos.com or any page of this website. This applies to us, our staff, our contractors, our affiliates and any third party acting on our behalf.
                            </p>
                        </section>

                        <section className="space-y-3">
                            <h2 className={h2}>1. What we do not allow</h2>
                            <ul className="list-disc pl-6 space-y-2">
                                <li>Sending unsolicited bulk commercial email that mentions or links to getrecruitmentos.com.</li>
                                <li>Using purchased, rented, harvested or scraped email lists.</li>
                                <li>Using deceptive subject lines, false sender names or forged headers.</li>
                                <li>Hiding or disguising the sender, or sending from addresses that are not controlled by us.</li>
                                <li>Continuing to contact anyone who has asked us to stop.</li>
                                <li>Allowing affiliates, contractors or other third parties to do any of the above for us.</li>
                            </ul>
                        </section>

                        <section className="space-y-3">
                            <h2 className={h2}>2. Standards for any business correspondence</h2>
                            <p>Any email that refers to this website must:</p>
                            <ul className="list-disc pl-6 space-y-2">
                                <li>Be sent one-to-one to a named business contact whose role is relevant to the message.</li>
                                <li>Clearly identify the sender and the organisation, with a valid physical address available on request.</li>
                                <li>Include a simple way to opt out, which we honour promptly and no later than 5 business days.</li>
                                <li>Be added to a suppression list so the recipient is not contacted again.</li>
                            </ul>
                        </section>

                        <section className="space-y-3">
                            <h2 className={h2}>3. Affiliates and third parties</h2>
                            <p>
                                We do not authorise any affiliate, reseller, contractor or other third party to send unsolicited bulk email promoting this website. Anyone found doing so will have their access removed and the activity will be stopped.
                            </p>
                        </section>

                        <section className="space-y-3">
                            <h2 className={h2}>4. Reporting abuse</h2>
                            <p>
                                If you received an unsolicited message that promotes getrecruitmentos.com, please forward it with the full headers to{' '}
                                <a href={`mailto:${ABUSE_EMAIL}`} className={link}>{ABUSE_EMAIL}</a>. We investigate every report, stop the sending source, and respond to the reporter where a reply address is provided.
                            </p>
                        </section>

                        <section className="space-y-3">
                            <h2 className={h2}>5. Opting out</h2>
                            <p>
                                To stop all contact from us, write to{' '}
                                <a href={`mailto:${ABUSE_EMAIL}`} className={link}>{ABUSE_EMAIL}</a> with the email address you want removed.
                            </p>
                        </section>

                        <section className="space-y-3">
                            <h2 className={h2}>6. Changes</h2>
                            <p>
                                We may update this policy from time to time. The date at the top of the page shows the latest version.
                            </p>
                        </section>

                        <div className="bg-white border border-[#E5E5E5] rounded-[10px] p-6 space-y-1">
                            <p className="font-bold text-black">small GROUP</p>
                            <p className="text-gray-600">I-116, 2nd Floor, South City 2, South City II, Sector 50, India.</p>
                        </div>
                    </div>
                </div>
            </main>
            <Footer />
        </>
    );
}
