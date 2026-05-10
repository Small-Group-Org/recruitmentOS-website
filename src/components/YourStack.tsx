const tools = [
    { category: 'Data', examples: 'ZoomInfo · Apollo · Lusha' },
    { category: 'Sender', examples: 'Smartlead · Instantly · Snobio' },
    { category: 'Domains', examples: 'Your sending domains' },
    { category: 'CRM', examples: 'Bullhorn · Loxo · JobAdder · custom' },
    { category: 'Dashboard', examples: 'Your data, your sequences, your view' },
];

export default function YourStack() {
    return (
        <section className="py-16 md:py-24 bg-[#FAFAFA] border-t border-[#e5e5e5]" id="your-stack">
            <div className="max-w-[900px] mx-auto px-4 sm:px-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 items-start">
                    <div>
                        <p className="text-xs font-medium text-[#6b7280] uppercase tracking-widest mb-3">No Lock-in</p>
                        <h2 className="text-[#0A0A0A] text-3xl md:text-4xl font-extrabold tracking-tight mb-5">
                            Your data. Your tools. Your sender reputation.
                        </h2>
                        <p className="text-[16px] text-[#4B5563] leading-relaxed mb-6">
                            RecruitmentOS runs on your accounts, not ours. If you ever leave, the entire pipeline keeps working without us.
                        </p>
                        <div className="bg-[#0A0A0A] rounded-[12px] px-6 py-5">
                            <p className="text-white text-[15px] font-medium leading-relaxed">
                                No lock-in. No hostage taking. We&apos;re confident enough in the results that we don&apos;t need contracts to keep clients.
                            </p>
                        </div>
                    </div>

                    <div className="space-y-3">
                        {tools.map((tool) => (
                            <div key={tool.category} className="bg-white rounded-[10px] border border-[#e5e5e5] px-5 py-4 flex items-center gap-4">
                                <div className="w-2 h-2 rounded-full bg-[#F97316] shrink-0" />
                                <div>
                                    <span className="text-[12px] font-bold uppercase tracking-widest text-[#9ca3af] mr-2">{tool.category}</span>
                                    <span className="text-[14px] text-[#4B5563]">{tool.examples}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
