export default function EmailMockup() {
    return (
        <section className="py-16 md:py-32 bg-white" id="email-example">
            <div className="max-w-[1280px] mx-auto px-5">
                <div className="text-center mb-12 sm:mb-20">
                    <div className="inline-block bg-orange-100 text-orange-600 px-4 py-1.5 sm:px-6 sm:py-2 rounded-full font-black text-[10px] sm:text-xs uppercase tracking-widest mb-6 sm:mb-8 border-2 border-orange-200">
                        📬 Why It Works
                    </div>
                    <h2 className="text-2xl sm:text-3xl md:text-[48px] font-black mb-4 sm:mb-6 text-[#1E293B] tracking-tight leading-tight">
                        The Email Your Competitors<br className="hidden sm:inline" /> Can&apos;t Send
                    </h2>
                    <p className="text-lg sm:text-xl text-[#475569] max-w-[620px] mx-auto font-medium leading-relaxed">
                        Because we know which of your candidates fits their open role before we reach out — the email becomes a solution, not a pitch. That&apos;s why it hits 6%+.
                    </p>
                </div>

                {/* Email Window */}
                <div className="max-w-[680px] mx-auto">
                    <div className="bg-white border-2 border-[#1E293B] rounded-[2rem] overflow-hidden btn-shadow">

                        {/* Browser / Mail topbar */}
                        <div className="bg-[#F8FAFC] border-b-2 border-[#1E293B] px-5 py-3 flex items-center gap-2">
                            <div className="w-3 h-3 rounded-full bg-[#FF5F56]"></div>
                            <div className="w-3 h-3 rounded-full bg-[#FFBD2E]"></div>
                            <div className="w-3 h-3 rounded-full bg-[#27C93F]"></div>
                            <div className="ml-4 text-xs text-[#94A3B8] font-bold uppercase tracking-widest">Inbox — Gmail</div>
                        </div>

                        {/* Email fields */}
                        <div className="px-6 sm:px-10 pt-8 pb-2">
                            <div className="flex gap-3 text-sm border-b border-slate-100 pb-3 mb-3">
                                <span className="text-slate-400 font-bold w-14 shrink-0">FROM</span>
                                <span className="text-[#1E293B] font-semibold">Sarah @ RecruitmentOS Agency &lt;sarah@agencyname.com&gt;</span>
                            </div>
                            <div className="flex gap-3 text-sm border-b border-slate-100 pb-3 mb-3">
                                <span className="text-slate-400 font-bold w-14 shrink-0">TO</span>
                                <span className="text-[#475569]">thomas.m@techcompany.de</span>
                            </div>
                            <div className="flex gap-3 text-sm pb-6 mt-2">
                                <span className="text-slate-400 font-bold w-14 shrink-0">RE</span>
                                <span className="text-[#1E293B] font-black text-base">Already have your Senior Python Engineer</span>
                            </div>
                        </div>

                        {/* Email body */}
                        <div className="px-6 sm:px-10 pb-10 text-[#475569] text-sm sm:text-base leading-relaxed font-medium space-y-4">
                            <p>
                                Saw TechCompany just posted for a Senior Python Engineer — we have a pre-screened candidate with{' '}
                                <span className="text-orange-500 font-black">6 years of backend Python and FastAPI experience</span>{' '}
                                who&apos;s actively looking.
                            </p>
                            <p>
                                They&apos;re based in Munich, available immediately, and their last role was building data pipelines at scale — looks like a strong match for what you&apos;re hiring for.
                            </p>
                            <p>Worth sending over their profile?</p>
                            <p className="text-[#94A3B8]">— Sarah</p>

                            {/* Tag */}
                            <div className="pt-2">
                                <span className="inline-flex items-center gap-2 bg-[#DCFCE7] border border-[#86EFAC] text-[#166534] text-xs font-black px-4 py-2 rounded-full uppercase tracking-wider">
                                    <span>✓</span> AI-generated from candidate match · sent automatically by RecruitmentOS
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* Below card callout */}
                    <div className="mt-8 grid grid-cols-3 gap-4 text-center">
                        {[
                            { label: 'Time to send', value: '0 min', sub: 'operated for you' },
                            { label: 'Reply rate', value: '5.3%', sub: 'vs 1% industry avg' },
                            { label: 'Why it works', value: 'Solution', sub: 'not a pitch' },
                        ].map((item, i) => (
                            <div key={i} className="bg-[#F8FAFC] border-2 border-[#1E293B] rounded-2xl p-4 sm:p-6 btn-shadow">
                                <div className="text-lg sm:text-2xl font-black text-[#1E293B] tracking-tight">{item.value}</div>
                                <div className="text-[10px] sm:text-xs text-[#475569] font-bold uppercase tracking-widest mt-1">{item.label}</div>
                                <div className="text-[10px] sm:text-xs text-[#94A3B8] font-medium mt-0.5">{item.sub}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
