import Link from 'next/link';
import Footer from '@/components/Footer';
import ContactForm from '@/components/ContactForm';

import { buildCanonical } from '@/lib/seo';

export const metadata = {
    title: 'Contact RecruitmentOS — Submit the Form',
    description: "Not ready to book a call? Send Tushar a note and he'll respond within 48 hours.",
    alternates: { canonical: buildCanonical('/contact') },
};

export default function ContactPage() {
    return (
        <main className="min-h-screen bg-white">
            <div className="pt-24 pb-32">
                <div className="max-w-[900px] mx-auto px-6 sm:px-10">

                    <Link
                        href="/"
                        className="inline-flex items-center text-sm text-black hover:text-[#FF6A00] transition-colors mb-12"
                    >
                        <svg className="mr-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                        </svg>
                        BACK TO HOME
                    </Link>

                    <div className="mb-12 sm:mb-16 max-w-2xl">
                        <p className="text-xs font-bold text-[#FF6A00] uppercase tracking-widest mb-3">Contact</p>
                        <h1 className="text-[#0A0A0A] text-3xl sm:text-5xl md:text-6xl font-bold tracking-tight leading-[1.05] mb-5">
                            Send Tushar a note.
                        </h1>
                        <p className="hero-sub">
                            Not ready to book a call? Tell us about your agency and what you're trying to fix. We'll come back within 48 hours.
                        </p>
                    </div>

                    <ContactForm variant="page" />

                    <div className="mt-12 sm:mt-16 text-center text-sm text-[#9CA3AF]">
                        <p>
                            Prefer to talk live?{' '}
                            <Link
                                href="https://cal.com/tusharm/30min?user=tusharm"
                                target="_blank"
                                className="text-[#0A0A0A] font-bold hover:text-[#FF6A00] transition-colors underline underline-offset-2"
                            >
                                Book a fit call instead →
                            </Link>
                        </p>
                    </div>

                </div>
            </div>
            <Footer />
        </main>
    );
}
