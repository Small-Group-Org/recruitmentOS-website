const solutions = [
    {
        number: '01',
        title: 'Candidate-to-Job Matching & Ranking Engine',
        description: 'Parses job specs and CVs, ranks mandatory and preferred criteria, and produces an objective fit score with an executive-ready candidate memo.',
        impact: 'Cut CV screening time by up to 75%',
    },
    {
        number: '02',
        title: 'Interview Intelligence & Scorecard Automation',
        description: 'Turns Zoom, Teams, and phone interviews into structured competency summaries, red-flag checks, and client-branded scorecards.',
        impact: 'Save 45 minutes per candidate interview',
    },
    {
        number: '03',
        title: 'Automated Headhunting & Boolean Workflow',
        description: 'Extracts technical requirements, hidden keywords, and competitor talent pools, then generates platform-ready searches and personalized outreach.',
        impact: 'Build longlists in under 15 minutes',
    },
    {
        number: '04',
        title: 'Executive Search Dossier & Market Mapping',
        description: 'Maps competitor structures, compensation benchmarks, and candidate mobility into client-facing market intelligence for retained search.',
        impact: 'Support premium retained-search positioning',
    },
];

const atsPlatforms = ['Bullhorn', 'Vincere', 'Mercury', 'Loxo'];

export default function InternalOperationsAI() {
    return (
        <section id="internal-operations" className="relative overflow-hidden bg-[#0A0A0A] py-20 text-white md:py-28">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,106,0,0.2),transparent_38%)]" />
            <div className="relative mx-auto max-w-[1280px] px-6 sm:px-10">
                <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
                    <div className="lg:sticky lg:top-28 lg:self-start">
                        <p className="mb-5 font-mono text-xs font-bold uppercase tracking-[0.18em] text-brand">BEYOND OUTBOUND BD: CUSTOM AI SYSTEMS</p>
                        <h2 className="max-w-xl font-serif text-4xl leading-[1.05] sm:text-5xl">Custom AI systems for your agency&apos;s internal operations.</h2>
                        <p className="mt-6 max-w-xl text-base leading-relaxed text-gray-300 sm:text-lg">Client acquisition is half the battle. We also engineer custom internal AI agents and workflow automations that eliminate recruiter admin, accelerate candidate shortlisting, and connect directly with your ATS.</p>
                        <div className="mt-8">
                            <p className="mb-3 font-mono text-[11px] font-bold uppercase tracking-widest text-gray-400">ATS integrations</p>
                            <div className="flex flex-wrap gap-2">
                                {atsPlatforms.map((platform) => (
                                    <span key={platform} className="rounded-full border border-white/15 bg-white/5 px-4 py-2 text-sm font-semibold text-white">{platform}</span>
                                ))}
                            </div>
                        </div>
                        <a href="https://cal.com/tusharm/30min?user=tusharm" target="_blank" rel="noopener noreferrer" className="mt-9 inline-flex items-center rounded-[4px] bg-brand px-6 py-3.5 text-sm font-bold text-white transition-colors hover:bg-brand-hover">
                            Scope a Custom Internal AI System →
                        </a>
                    </div>

                    <div className="grid gap-4 sm:grid-cols-2">
                        {solutions.map((solution) => (
                            <article key={solution.number} className="group rounded-[10px] border border-white/10 bg-white/[0.04] p-6 transition-all duration-300 hover:-translate-y-1 hover:border-brand/70 hover:bg-white/[0.07]">
                                <div className="mb-8 flex items-center justify-between">
                                    <span className="font-mono text-xs font-bold text-brand">{solution.number}</span>
                                    <span className="h-2 w-2 rounded-full bg-success shadow-[0_0_12px_rgba(26,107,74,0.9)]" />
                                </div>
                                <h3 className="text-xl font-bold leading-tight text-white">{solution.title}</h3>
                                <p className="mt-4 text-sm leading-relaxed text-gray-300">{solution.description}</p>
                                <p className="mt-6 border-t border-white/10 pt-4 font-mono text-[11px] font-bold uppercase tracking-wide text-[#A7E0C5]">{solution.impact}</p>
                            </article>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
