import Image from 'next/image';
import Link from 'next/link';
import { Metadata } from 'next';
import Footer from '@/components/Footer';
import { buildCanonical } from '@/lib/seo';

// Lead magnet MISTAKES_11_BD (LinkedIn, Thu 19 Nov 2026). Shared by DM to people who asked for it.
// The PDF lives at /public/resources/11-bd-mistakes.pdf. Source of truth: recruitmentOS-strategy/content/current-week/assets.
const PDF_URL = '/resources/11-bd-mistakes.pdf';
const CAL_URL = 'https://cal.com/tusharm/30min?user=tusharm';
const TITLE = '11 BD Mistakes That Cost Recruitment Agencies Mandates';
const DESCRIPTION =
    'What agency owners told us on sales calls about winning new clients, with the fix next to each mistake. 14 pages, about ten minutes, free.';

export const metadata: Metadata = {
    title: `${TITLE} — RecruitmentOS`,
    description: DESCRIPTION,
    alternates: { canonical: buildCanonical('/resources/11-bd-mistakes') },
    openGraph: {
        title: TITLE,
        description: DESCRIPTION,
        url: buildCanonical('/resources/11-bd-mistakes'),
        siteName: 'RecruitmentOS',
        type: 'article',
        images: [{ url: '/resources/11-bd-mistakes.webp', width: 600, height: 750, alt: TITLE }],
    },
    twitter: { card: 'summary_large_image', title: TITLE, description: DESCRIPTION },
};

const MISTAKES = [
    'Waiting for the job ad',
    'The owner is the whole BD team',
    'Building lists by hand, every day',
    'Hire, fire, hire BD',
    'Fixing low replies with more emails',
    'A first message anyone could have sent',
    'Two touches, then silence',
    'Letting every "not now" die',
    '"I\'ll update the CRM afterwards"',
    'Tools nobody connected',
    'Living on referrals and one big client',
];

function DownloadButton() {
    return (
        <a
            href={PDF_URL}
            download="11_BD_Mistakes.pdf"
            className="inline-flex items-center justify-center rounded-[4px] bg-brand px-6 py-3 text-base font-semibold text-white transition-colors hover:bg-[var(--brand-hover)]"
        >
            Download the PDF (14 pages)
        </a>
    );
}

export default function ElevenBdMistakesPage() {
    return (
        <main className="min-h-screen bg-white">
            <section className="mx-auto grid max-w-[1100px] gap-12 px-4 pb-16 pt-24 sm:px-6 lg:grid-cols-12 lg:items-center">
                <div className="lg:col-span-7">
                    <p className="mb-4 text-xs uppercase tracking-wider text-brand" style={{ fontFamily: 'var(--font-mono)' }}>
                        Free PDF · For recruitment agency owners
                    </p>
                    <h1 className="mb-5 text-4xl leading-tight text-[var(--ink)] sm:text-5xl" style={{ fontFamily: 'var(--font-serif)' }}>
                        {TITLE}
                    </h1>
                    <p className="mb-4 text-lg text-[var(--muted)]">
                        We put the BD mistakes we kept hearing on sales calls with agency owners and BD leads into one PDF. No names, just
                        what they told us.
                    </p>
                    <p className="mb-8 text-lg text-[var(--muted)]">
                        Each mistake has the fix next to it, in a few steps you can do this week. No software needed, and nothing to buy.
                    </p>
                    <DownloadButton />
                    <p className="mt-3 text-sm text-[var(--muted)]">No email needed. About ten minutes to read.</p>
                </div>
                <div className="flex justify-center lg:col-span-5">
                    <a href={PDF_URL} download="11_BD_Mistakes.pdf" className="block w-full max-w-[340px]">
                        <Image
                            src="/resources/11-bd-mistakes.webp"
                            alt={`${TITLE}: PDF cover`}
                            width={600}
                            height={750}
                            className="h-auto w-full rounded-[10px] border border-[var(--border)] shadow-lg"
                            priority
                        />
                    </a>
                </div>
            </section>

            <section className="border-t border-[var(--border)] bg-[#FAFAFA]">
                <div className="mx-auto max-w-[1100px] px-4 py-16 sm:px-6">
                    <h2 className="mb-8 text-3xl text-[var(--ink)]" style={{ fontFamily: 'var(--font-serif)' }}>
                        What&apos;s inside
                    </h2>
                    <ol className="grid gap-3 sm:grid-cols-2">
                        {MISTAKES.map((m, i) => (
                            <li key={m} className="flex gap-4 rounded-[10px] border border-[var(--border)] bg-white p-4">
                                <span className="text-sm text-brand" style={{ fontFamily: 'var(--font-mono)' }}>
                                    {String(i + 1).padStart(2, '0')}
                                </span>
                                <span className="text-[var(--ink)]">{m}</span>
                            </li>
                        ))}
                    </ol>
                    <p className="mt-8 text-[var(--muted)]">
                        If you only fix one before Christmas, start with the &quot;not now&quot; one.
                    </p>
                    <div className="mt-8 flex flex-wrap items-center gap-6">
                        <DownloadButton />
                        <Link href={CAL_URL} className="text-base font-semibold text-[var(--ink)] underline underline-offset-4">
                            Want to talk through yours? Book 30 minutes
                        </Link>
                    </div>
                </div>
            </section>
            <Footer />
        </main>
    );
}
