export default function QualityGuarantee() {
    return (
        <section className="py-16 md:py-24 bg-[#0A0A0A] text-white" id="guarantee">
            <div className="max-w-[900px] mx-auto px-4 sm:px-6">
                <div className="mb-10">
                    <p className="text-xs font-medium text-[#6b7280] uppercase tracking-widest mb-3">The Guarantee</p>
                    <h2 className="text-white text-3xl md:text-[42px] font-extrabold tracking-tight leading-tight mb-4">
                        100 hiring-manager contacts<br />
                        and 10 verified replies in 60 days,<br />
                        <span className="text-[#F97316]">or we work free.</span>
                    </h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-8">
                    <div className="bg-white/5 border border-white/10 rounded-[14px] p-7">
                        <div className="text-[#F97316] text-[11px] font-bold uppercase tracking-widest mb-3">Day 30</div>
                        <p className="text-white text-[17px] leading-relaxed">
                            50 verified hiring-manager contacts in your pipeline, in your target verticals, on your stack.
                        </p>
                    </div>
                    <div className="bg-white/5 border border-white/10 rounded-[14px] p-7">
                        <div className="text-[#F97316] text-[11px] font-bold uppercase tracking-widest mb-3">Day 60</div>
                        <p className="text-white text-[17px] leading-relaxed">
                            100 verified contacts plus 10 verified replies from hiring managers.
                        </p>
                    </div>
                </div>

                <div className="bg-white/5 border border-white/10 rounded-[12px] px-7 py-5">
                    <p className="text-[#9ca3af] text-[15px] leading-relaxed">
                        If we miss either milestone, we keep working at zero cost until both hit. No fine print, no clawback fights, no proving-it terms.
                    </p>
                </div>
            </div>
        </section>
    );
}
