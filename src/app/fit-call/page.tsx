import Link from 'next/link';
import Footer from '@/components/Footer';
import FitCallForm from '@/components/fit-call/FitCallForm';
import { sixQuestionInterview } from '@/lib/methodology-data';
import { buildCanonical } from '@/lib/seo';

export const metadata = {
    title: 'Book a 20-min Fit Call — RecruitmentOS',
    description: 'Free. Mandatory 5-question pre-call form. We run the BD scorecard live and check your volume math.',
    alternates: { canonical: buildCanonical('/fit-call') },
};

export default function FitCallPage() {
    return (
        <main className="min-h-screen bg-white">
            <div className="pt-12 pb-24">
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

                    {/* Hero */}
                    <div className="mb-12 sm:mb-16">
                        <p className="text-xs font-bold text-[#FF6A00] uppercase tracking-widest mb-3">Fit call</p>
                        <h1 className="text-[#0A0A0A] text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight leading-[1.05] mb-5">
                            Book a 20-min fit call.
                        </h1>
                        <p className="hero-sub mb-6">
                            Free. Tushar runs the call personally. Pre-call form is mandatory — it sets up everything we'll cover live.
                        </p>
                    </div>

                    {/* What to expect */}
                    <section className="mb-12 bg-[#F9FAFB] border border-[#E5E5E5] rounded-2xl p-6 sm:p-8">
                        <h2 className="text-lg font-bold text-[#0A0A0A] mb-4">What happens on the call</h2>
                        <p className="text-sm sm:text-base text-[#374151] font-medium leading-relaxed">
                            We open the <strong className="text-[#0A0A0A] font-bold">180-point BD scorecard</strong> live, score your agency together, run your <strong className="text-[#0A0A0A] font-bold">volume math</strong> against your actual placement target, and identify the 1–3 highest-leverage things we'd set up first. Either we agree this is a fit and you get a Setup proposal, or Tushar tells you honestly it's not a fit and points you somewhere useful.
                        </p>
                    </section>

                    {/* Form */}
                    <section className="mb-16">
                        <FitCallForm />
                    </section>

                    {/* 6-question interview */}
                    <section className="border-t border-[#E5E5E5] pt-12">
                        <h2 className="text-[#0A0A0A] text-2xl sm:text-3xl font-bold mb-3 leading-tight">
                            6 questions you'll be asked live.
                        </h2>
                        <p className="section-sub mb-8 max-w-2xl">
                            You are being interviewed. You know it. Pass = we sign. Fail = we don't, even if you want to.
                        </p>
                        <ol className="space-y-3">
                            {sixQuestionInterview.map((q, i) => (
                                <li key={i} className="flex items-start gap-4 bg-white border border-[#E5E5E5] rounded-xl p-5">
                                    <span className="text-xl font-black text-[#FF6A00] leading-none">{i + 1}</span>
                                    <p className="text-base text-[#0A0A0A] font-medium leading-relaxed pt-0.5">{q}</p>
                                </li>
                            ))}
                        </ol>
                    </section>

                </div>
            </div>
            <Footer />
        </main>
    );
}
