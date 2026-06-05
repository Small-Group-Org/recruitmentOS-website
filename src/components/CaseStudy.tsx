export default function CaseStudy() {
    return (
        <section className="py-16 md:py-24 bg-white border-t border-[#E5E5E5]" id="case-study">
            <div className="max-w-[1280px] mx-auto px-6">
                <div className="mb-12 md:mb-16">
                    <p className="text-xs font-medium text-[#6B7280] uppercase tracking-widest mb-3">Case Study</p>
                    <h2 className="text-[#0A0A0A] max-w-[500px]">From struggling pipeline to predictable revenue.</h2>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.2fr] gap-10 lg:gap-16 items-start">
                    {/* Left — Results */}
                    <div>
                        <div className="mb-8">
                            <div className="text-6xl md:text-7xl font-bold text-[#0A0A0A] tracking-tight leading-none">+30%</div>
                            <div className="text-xl text-[#0A0A0A] font-medium mt-2">Revenue Growth</div>
                            <div className="text-sm text-[#9CA3AF]">In just 90 days</div>
                        </div>

                        <div className="space-y-0">
                            {[
                                { label: 'Lead Generation', result: '100% automated' },
                                { label: 'Pipeline Predictability', result: 'First time achieved' },
                                { label: 'Recruiter Time Saved', result: '4+ hrs/day per person' },
                                { label: 'Reply Rate', result: 'From < 1%' },
                            ].map((item) => (
                                    <div key={item.label} className="flex items-center justify-between py-4 border-b border-[#F3F4F6] last:border-0">
                                        <span className="text-sm text-[#6B7280]">{item.label}</span>
                                        <span className="text-sm font-semibold text-[#0A0A0A]">{item.result}</span>
                                    </div>
                                ))}
                        </div>
                    </div>

                    {/* Right — Testimonial */}
                    <div className="bg-[#FAFAFA] border border-[#E5E5E5] rounded-xl p-8 md:p-10">
                        <svg className="w-8 h-8 text-[#E5E5E5] mb-4" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                        </svg>

                        <blockquote className="text-xl md:text-2xl text-[#0A0A0A] leading-relaxed mb-8 font-light tracking-tight">
                            We stopped cold calling. RecruitmentOS now sends matched candidate pitches to hiring managers for us. We went from inconsistent deals to a predictable pipeline — revenue is up 30% in just 60 days.
                        </blockquote>

                        <div className="flex items-center gap-3 mb-8">
                            <div className="w-10 h-10 bg-[#0A0A0A] rounded-full flex items-center justify-center text-white text-sm font-semibold">
                                M
                            </div>
                            <div>
                                <div className="text-sm font-semibold text-[#0A0A0A]">Marcus</div>
                                <div className="text-xs text-[#9CA3AF]">Tech Recruiting Agency, Berlin</div>
                            </div>
                        </div>

                        <div className="border-t border-[#E5E5E5] pt-6">
                            <p className="text-[11px] text-[#9CA3AF] mb-5 uppercase tracking-widest font-medium">Timeline</p>
                            <div className="space-y-0">
                                {[
                                    { day: 'Day 0', event: 'Manual sourcing eating 4+ hours/day' },
                                    { day: 'Day 1–7', event: 'RecruitmentOS deployed and configured' },
                                    { day: 'Week 1', event: 'First warm replies received' },
                                    { day: 'Day 30', event: 'Predictable pipeline established' },
                                    { day: 'Day 60', event: '+30% revenue growth achieved' },
                                ].map((step, i) => (
                                    <div key={i} className="flex items-start gap-4 py-2.5">
                                        <span className="text-[11px] font-mono text-[#9CA3AF] w-16 shrink-0 pt-0.5">{step.day}</span>
                                        <div className="flex items-start gap-2.5">
                                            <div className={`w-1.5 h-1.5 rounded-full mt-1.5 shrink-0 ${i === 4 ? 'bg-[#1A6B4A]' : 'bg-[#D1D5DB]'}`} />
                                            <span className={`text-sm ${i === 4 ? 'text-[#1A6B4A] font-medium' : 'text-[#6B7280]'}`}>{step.event}</span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
