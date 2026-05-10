import Link from 'next/link';

export default function CaseStudyTeaser() {
    return (
        <section className="py-16 md:py-24 bg-white border-t border-[#e5e5e5]" id="case-study">
            <div className="max-w-[900px] mx-auto px-4 sm:px-6">
                <div className="mb-10">
                    <p className="text-xs font-medium text-[#6b7280] uppercase tracking-widest mb-3">Case Study</p>
                    <h2 className="text-[#0A0A0A] text-3xl md:text-4xl font-extrabold tracking-tight">
                        Same team. 4× the placements.
                    </h2>
                </div>

                {/* Quote */}
                <blockquote className="bg-[#F9FAFB] rounded-[14px] border-l-4 border-[#F97316] px-7 py-6 mb-8">
                    <p className="text-xl md:text-2xl font-semibold text-[#0A0A0A] leading-snug mb-4">
                        &ldquo;People are still doing all of this manually. I want everything automated. I want the money, not the work.&rdquo;
                    </p>
                    <footer className="text-[13px] text-[#6b7280]">
                        — Founder, 6-person electronics recruitment agency, Germany
                    </footer>
                </blockquote>

                {/* Numbers */}
                <div className="grid grid-cols-3 gap-4 mb-8">
                    <div className="text-center bg-[#fff7ed] rounded-[12px] border border-[#fed7aa] p-6">
                        <p className="text-3xl md:text-4xl font-extrabold text-[#F97316] mb-1">10→40+</p>
                        <p className="text-[12px] text-[#6b7280] uppercase tracking-wide font-medium">placements / month</p>
                    </div>
                    <div className="text-center bg-[#fff7ed] rounded-[12px] border border-[#fed7aa] p-6">
                        <p className="text-3xl md:text-4xl font-extrabold text-[#F97316] mb-1">57</p>
                        <p className="text-[12px] text-[#6b7280] uppercase tracking-wide font-medium">peak month</p>
                    </div>
                    <div className="text-center bg-[#fff7ed] rounded-[12px] border border-[#fed7aa] p-6">
                        <p className="text-3xl md:text-4xl font-extrabold text-[#F97316] mb-1">60→25</p>
                        <p className="text-[12px] text-[#6b7280] uppercase tracking-wide font-medium">founder hrs / week</p>
                    </div>
                </div>

                {/* Summary */}
                <p className="text-[16px] text-[#4B5563] leading-relaxed mb-6">
                    Same team. Same recruiters. The two BD analysts moved into candidate-side work where they&apos;d wanted to spend more time anyway. Outbound touches went from 10,000 to 60,000+ a month. Founder hours dropped from 60 to 25 a week.
                </p>

                <Link
                    href="/case-studies"
                    className="inline-flex items-center gap-2 text-[15px] font-semibold text-[#0A0A0A] border-b-2 border-[#0A0A0A] pb-0.5 hover:border-[#F97316] hover:text-[#F97316] transition-colors"
                >
                    Read the full case study →
                </Link>
            </div>
        </section>
    );
}
