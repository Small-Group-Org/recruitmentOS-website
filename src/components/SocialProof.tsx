export default function SocialProof() {
    return (
        <section className="py-16 md:py-24 bg-[#0A0A0A]" id="proof">
            <div className="max-w-[1280px] mx-auto px-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16 items-center">
                    <div>
                        <p className="text-xs font-medium text-[#6B7280] uppercase tracking-widest mb-3">Results</p>
                        <div className="text-5xl md:text-6xl font-bold text-white mb-2 tracking-tight">+30%</div>
                        <div className="text-xl text-white/90 font-medium mb-2">Revenue Growth</div>
                        <div className="text-sm text-[#6B7280] mb-8">In just 60 days</div>

                        <div className="grid grid-cols-3 gap-4">
                            <div className="border border-white/10 rounded-lg p-4">
                                <div className="text-lg font-semibold text-white">5.3%</div>
                                <div className="text-[11px] text-[#6B7280]">Reply rate</div>
                            </div>
                            <div className="border border-white/10 rounded-lg p-4">
                                <div className="text-lg font-semibold text-white">500+</div>
                                <div className="text-[11px] text-[#6B7280]">Jobs/day</div>
                            </div>
                            <div className="border border-white/10 rounded-lg p-4">
                                <div className="text-lg font-semibold text-white">10+</div>
                                <div className="text-[11px] text-[#6B7280]">Agencies</div>
                            </div>
                        </div>
                    </div>

                    <div className="border border-white/10 rounded-xl p-8 md:p-10">
                        <blockquote className="text-lg text-white/90 leading-relaxed mb-8 font-light italic">
                            &ldquo;We stopped cold calling. RecruitmentOS now sends matched candidate pitches to hiring managers for us. Revenue is up 30% in just 60 days.&rdquo;
                        </blockquote>
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-[#1A6B4A] rounded-full flex items-center justify-center text-white text-sm font-semibold">
                                M
                            </div>
                            <div>
                                <div className="text-sm font-medium text-white">Marcus</div>
                                <div className="text-xs text-[#6B7280]">Tech Recruiting, Berlin</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
