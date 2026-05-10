import Link from 'next/link';

export default function FinalCTA() {
    return (
        <section className="py-16 sm:py-28 md:py-40 bg-[#FAFAFA] border-t border-[#e5e5e5]" id="contact">
            <div className="max-w-[800px] mx-auto px-4 sm:px-6 text-center">
                <p className="text-xs font-semibold text-[#6b7280] uppercase tracking-widest mb-5">Last call</p>
                <h2 className="text-3xl sm:text-5xl md:text-6xl font-extrabold text-[#0A0A0A] tracking-tight leading-[1.05] mb-5">
                    Stop being the bottleneck.
                </h2>
                <p className="text-lg md:text-xl text-[#6b7280] mb-10 max-w-[560px] mx-auto leading-relaxed">
                    Free 30-min fit call. We open the BD scorecard live, run your real volume math, and tell you — honestly — whether RecruitmentOS is the right fix.
                </p>

                <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-10">
                    <Link
                        href="/fit-call"
                        className="inline-flex items-center justify-center bg-[#0A0A0A] text-white px-8 py-4 rounded-full font-semibold hover:bg-[#1a1a1a] transition-all duration-300 text-base sm:text-lg group"
                    >
                        Book a 30-min fit call
                        <svg className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M5 12h14M12 5l7 7-7 7" />
                        </svg>
                    </Link>
                    <Link
                        href="/scorecard"
                        className="inline-flex items-center justify-center bg-white text-[#0A0A0A] border border-[#e5e5e5] px-8 py-4 rounded-full text-base sm:text-lg font-medium hover:bg-[#f9fafb] transition-colors"
                    >
                        Score your BD function first →
                    </Link>
                </div>

                <p className="text-sm text-[#9ca3af] italic max-w-[460px] mx-auto leading-relaxed">
                    30-minute call. No slides. No deck. No pressure. Three questions about your business, then a straight read on whether RecruitmentOS makes sense for you. If it doesn&apos;t, I&apos;ll point you at someone who does what you actually need.
                    <br />
                    <span className="block mt-3 text-[#6b7280] font-medium not-italic">— Tushar, Founder, RecruitmentOS</span>
                </p>
            </div>
        </section>
    );
}
