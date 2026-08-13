import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { buildCanonical } from '@/lib/seo';

import PlaybookContent from './PlaybookContent';

export const metadata = {
    title: 'The Recruitment Agency Signal Playbook',
    description: 'Stop waiting for hiring demand to become visible. Start looking for what creates it. How to find your next job order before the job is posted.',
    alternates: { canonical: buildCanonical('/resources/signal-playbook') },
    openGraph: {
        title: 'The Recruitment Agency Signal Playbook',
        description: 'Stop waiting for hiring demand to become visible. Start looking for what creates it. How to find your next job order before the job is posted.',
        url: buildCanonical('/resources/signal-playbook'),
        siteName: 'RecruitmentOS',
        type: 'article',
        images: [
            {
                url: '/resources/signal-playbook.webp',
                width: 1200,
                height: 630,
                alt: 'The Recruitment Agency Signal Playbook',
            }
        ],
    },
};

export default function SignalPlaybookPage() {
    return (
        <main className="min-h-screen bg-white">
            <div className="pt-12 pb-24">
                <div className="max-w-[1100px] mx-auto px-6 sm:px-10">

                    {/* Back Link */}
                    <Link
                        href="/resources"
                        className="inline-flex items-center text-sm text-black hover:text-[#FF6A00] transition-colors mb-16"
                    >
                        <svg className="mr-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                        </svg>
                        BACK TO RESOURCES
                    </Link>

                    {/* Badge */}
                    <div className="mb-6">
                        <span className="text-[10px] font-bold tracking-widest uppercase text-[#FF6A00] bg-[#FFF4EB] px-3 py-1.5 rounded-md">
                            Playbook · Business Development
                        </span>
                    </div>

                    {/* Title */}
                    <h1 className="text-3xl md:text-5xl font-bold text-[#0A0A0A] leading-[1.1] tracking-tight mb-6 max-w-4xl">
                        The Recruitment Agency Signal Playbook
                    </h1>

                    <p className="text-[#6B7280] text-lg max-w-3xl mb-16 leading-relaxed">
                        Stop waiting for hiring demand to become visible. Start looking for what creates it. How to find your next job order <strong className="text-[#0A0A0A]">before the job is posted</strong>.
                    </p>

                    {/* Image Hero */}
                    <div className="rounded-2xl overflow-hidden border border-[#E5E5E5] mb-20 bg-[#FAFAFA] flex justify-center py-10 px-4">
                        <Image
                            src="/resources/signal-playbook.webp"
                            alt="The Recruitment Agency Signal Playbook Cover"
                            width={600}
                            height={600}
                            className="w-full max-w-md h-auto object-contain rounded-lg shadow-xl"
                            sizes="(max-width: 1024px) 100vw, 600px"
                        />
                    </div>

                    {/* Content introduction */}
                    <div className="border-l-4 border-[#FF6A00] pl-8 py-2 mb-20">
                        <p className="text-xs font-bold uppercase tracking-widest text-[#FF6A00] mb-3">Core Idea</p>
                        <p className="text-[#0A0A0A] text-xl font-bold leading-snug max-w-3xl mb-4">
                            &ldquo;What is happening inside companies that could create our next job order, before the job is posted?&rdquo;
                        </p>
                        <p className="text-[#6B7280] text-sm">
                            A job posting isn't the start of hiring demand. It's the finish line.
                        </p>
                    </div>

                    <PlaybookContent />

                    {/* CTA */}
                    <div className="flex flex-col sm:flex-row gap-4">
                        <Button href="/resources">
                            Explore All Resources
                        </Button>
                        <Button
                            href="/"
                            variant="secondary"
                        >
                            Learn about RecruitmentOS
                        </Button>
                    </div>

                </div>
            </div>
            <Footer />
        </main>
    );
}
