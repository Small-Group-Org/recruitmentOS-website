import Link from 'next/link';
import { Button } from '@/components/ui';
import Footer from '@/components/Footer';
import { buildCanonical } from '@/lib/seo';
import { JsonLd } from '@/components/JsonLd';
import { serviceWithOffersSchema } from '@/lib/schemas';

export const metadata = {
    title: 'Client Onboarding Guide — RecruitmentOS',
    description: 'A 3-week launch process for recruitment agencies: strategy, infrastructure, campaign preparation, and continuous optimisation. See exactly how RecruitmentOS works.',
    alternates: { canonical: buildCanonical('/methodology') },
};

export default function MethodologyPage() {
    return (
        <main className="min-h-screen" style={{ backgroundColor: '#FAF8F5' }}>
            <JsonLd data={serviceWithOffersSchema} />

            {/* ─── Back link ─── */}
            <div className="max-w-[900px] mx-auto px-6 sm:px-10 pt-10 pb-2">
                <Link
                    href="/"
                    className="inline-flex items-center gap-2 text-sm font-medium transition-colors"
                    style={{ color: '#A8A29E' }}
                >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                    </svg>
                    Back to home
                </Link>
            </div>

            {/* ─── HERO ─── */}
            <section className="max-w-[900px] mx-auto px-6 sm:px-10 pt-14 pb-20">
                <div className="max-w-2xl">
                    <span className="inline-block text-[11px] font-bold tracking-[0.18em] uppercase mb-5" style={{ color: '#FF6A00' }}>
                        Client Onboarding Guide
                    </span>
                    <h1 className="text-[#1C1917] font-bold leading-[1.08] tracking-tight mb-6" style={{ fontSize: 'clamp(2.4rem, 5vw, 3.5rem)' }}>
                        Welcome to<br />RecruitmentOS.
                    </h1>
                    <p className="text-lg leading-relaxed mb-4" style={{ color: '#57534E' }}>
                        Thank you for choosing RecruitmentOS. Our mission is to build a predictable client acquisition engine for your recruitment agency.
                    </p>
                    <p className="text-base leading-relaxed mb-10" style={{ color: '#A8A29E' }}>
                        While your consultants focus on speaking with interested hiring managers and winning new business, RecruitmentOS handles the prospecting, outreach, deliverability, and continuous optimisation behind the scenes.
                    </p>
                    <Button href="https://cal.com/tusharm/30min?user=tusharm" target="_blank" variant="dark" size="lg" pill>
                        Book a fit call →
                    </Button>
                </div>
            </section>

            {/* ─── PROVEN RESULTS ─── */}
            <section style={{ backgroundColor: '#F3F4F6' }} className="py-20">
                <div className="max-w-[900px] mx-auto px-6 sm:px-10">
                    <span className="inline-block text-[11px] font-bold tracking-[0.18em] uppercase mb-4" style={{ color: '#FF6A00' }}>Proven Results</span>
                    <h2 className="text-[#1C1917] text-2xl sm:text-3xl font-bold mb-3 leading-tight">Built on a proven outbound methodology.</h2>
                    <p className="text-sm leading-relaxed mb-12 max-w-xl" style={{ color: '#57534E' }}>
                        RecruitmentOS is designed specifically for recruitment agencies. Every market and niche is different, but these results show what's possible when the right infrastructure, targeting, and optimisation come together.
                    </p>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-0 divide-y sm:divide-y-0 sm:divide-x divide-[#E8DDD0]" style={{ border: '1px solid #E8DDD0', borderRadius: '1.25rem', overflow: 'hidden' }}>
                        {[
                            { value: '7,550', label: 'Targeted prospects contacted' },
                            { value: '11.38%', label: 'Reply rate' },
                            { value: '36', label: 'Qualified opportunities generated' },
                        ].map((stat, i) => (
                            <div key={stat.label} className="px-8 py-10" style={{ backgroundColor: '#FAF8F5' }}>
                                <p className="font-black mb-2 leading-none" style={{ fontSize: '3.5rem', color: '#FF6A00' }}>{stat.value}</p>
                                <p className="text-sm font-medium leading-snug" style={{ color: '#A8A29E' }}>{stat.label}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ─── 3-WEEK LAUNCH PROCESS ─── */}
            <section className="max-w-[900px] mx-auto px-6 sm:px-10 py-20">
                <span className="inline-block text-[11px] font-bold tracking-[0.18em] uppercase mb-4" style={{ color: '#FF6A00' }}>Our 3-Week Launch Process</span>
                <h2 className="text-[#1C1917] text-2xl sm:text-3xl font-bold mb-4 leading-tight">Two weeks to build. One week to launch.</h2>
                <p className="text-sm leading-relaxed mb-4 max-w-xl" style={{ color: '#57534E' }}>
                    The first two weeks are dedicated to building the foundation. Rather than rushing into sending emails, we ensure everything is configured, tested, and ready before launch.
                </p>
                <div className="inline-flex items-center gap-2.5 mb-14 px-4 py-2 rounded-full" style={{ backgroundColor: '#FFF3EB', border: '1px solid #FFD9BA' }}>
                    <span className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ backgroundColor: '#FF6A00' }} />
                    <p className="text-sm font-semibold" style={{ color: '#1C1917' }}>
                        Campaign outreach begins at the start of <span style={{ color: '#FF6A00' }}>Week 3</span>
                    </p>
                </div>

                {/* Week 1 */}
                <div className="mb-8 rounded-2xl overflow-hidden" style={{ border: '1px solid #E8DDD0' }}>
                    <div className="px-8 py-5 flex items-center gap-4" style={{ backgroundColor: '#F5F0E8', borderBottom: '1px solid #E8DDD0' }}>
                        <span className="text-[11px] font-black tracking-[0.18em] uppercase px-3 py-1 rounded-full" style={{ backgroundColor: '#FFF3EB', color: '#FF6A00', border: '1px solid #FFD9BA' }}>Week 1</span>
                        <h3 className="text-lg font-bold" style={{ color: '#1C1917' }}>Strategy & Infrastructure</h3>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-0 divide-y sm:divide-y-0 sm:divide-x divide-[#E8DDD0]">
                        <div className="px-8 py-7" style={{ backgroundColor: '#FAF8F5', borderRight: '1px solid #E8DDD0' }}>
                            <p className="text-[10px] font-black tracking-[0.15em] uppercase mb-5" style={{ color: '#A8A29E' }}>Strategy</p>
                            <ul className="space-y-3">
                                {['Define your Ideal Client Profile (ICP)', 'Finalise target industries', 'Finalise target locations', 'Identify decision-maker titles', 'Define campaign success metrics'].map(item => (
                                    <li key={item} className="flex items-start gap-2.5 text-sm font-medium" style={{ color: '#57534E' }}>
                                        <span className="mt-1 w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ backgroundColor: '#FF6A00' }} />
                                        {item}
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div className="px-8 py-7" style={{ backgroundColor: '#FAF8F5' }}>
                            <p className="text-[10px] font-black tracking-[0.15em] uppercase mb-5" style={{ color: '#A8A29E' }}>Infrastructure</p>
                            <ul className="space-y-3">
                                {['Domain setup', 'Mailbox setup', 'SPF, DKIM & DMARC configuration', 'Domain warm-up', 'Sending infrastructure configuration'].map(item => (
                                    <li key={item} className="flex items-start gap-2.5 text-sm font-medium" style={{ color: '#57534E' }}>
                                        <span className="mt-1 w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ backgroundColor: '#FF6A00' }} />
                                        {item}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                    <div className="px-8 py-4 flex items-center gap-2" style={{ backgroundColor: '#FFF3EB', borderTop: '1px solid #FFD9BA' }}>
                        <span className="text-[10px] font-black tracking-[0.15em] uppercase" style={{ color: '#FF6A00' }}>Outcome —</span>
                        <span className="text-sm font-medium" style={{ color: '#57534E' }}>A documented strategy and healthy email infrastructure ready for campaign preparation.</span>
                    </div>
                </div>

                {/* Week 2 */}
                <div className="mb-8 rounded-2xl overflow-hidden" style={{ border: '1px solid #E8DDD0' }}>
                    <div className="px-8 py-5 flex items-center gap-4" style={{ backgroundColor: '#F5F0E8', borderBottom: '1px solid #E8DDD0' }}>
                        <span className="text-[11px] font-black tracking-[0.18em] uppercase px-3 py-1 rounded-full" style={{ backgroundColor: '#FFF3EB', color: '#FF6A00', border: '1px solid #FFD9BA' }}>Week 2</span>
                        <h3 className="text-lg font-bold" style={{ color: '#1C1917' }}>Campaign Preparation</h3>
                    </div>
                    <div className="px-8 py-7" style={{ backgroundColor: '#FAF8F5' }}>
                        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-12 gap-y-3">
                            {['Building targeted prospect lists', 'Finding verified decision-makers', 'Contact enrichment', 'Creating personalised email sequences', 'Configuring automated follow-up sequences', 'Internal quality assurance and testing'].map(item => (
                                <li key={item} className="flex items-start gap-2.5 text-sm font-medium" style={{ color: '#57534E' }}>
                                    <span className="text-sm font-bold flex-shrink-0" style={{ color: '#FF6A00' }}>✓</span>
                                    {item}
                                </li>
                            ))}
                        </ul>
                        <p className="text-xs mt-5 italic" style={{ color: '#A8A29E' }}>Every campaign is reviewed and tested before launch.</p>
                    </div>
                    <div className="px-8 py-4 flex items-center gap-2" style={{ backgroundColor: '#FFF3EB', borderTop: '1px solid #FFD9BA' }}>
                        <span className="text-[10px] font-black tracking-[0.15em] uppercase" style={{ color: '#FF6A00' }}>Outcome —</span>
                        <span className="text-sm font-medium" style={{ color: '#57534E' }}>Campaigns fully prepared and approved for launch.</span>
                    </div>
                </div>

                {/* Week 3 */}
                <div className="rounded-2xl overflow-hidden" style={{ border: '1px solid #FF6A00' }}>
                    <div className="px-8 py-5 flex items-center gap-4" style={{ backgroundColor: '#FF6A00' }}>
                        <span className="text-[11px] font-black tracking-[0.18em] uppercase px-3 py-1 rounded-full bg-white" style={{ color: '#FF6A00' }}>Week 3</span>
                        <h3 className="text-lg font-bold text-white">Campaign Launch & Optimisation</h3>
                    </div>
                    <div className="px-8 py-7" style={{ backgroundColor: '#FAF8F5' }}>
                        <p className="text-sm leading-relaxed mb-6" style={{ color: '#57534E' }}>At the beginning of Week 3, your outbound campaigns go live. From this point onward, RecruitmentOS continuously:</p>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                            {['Launches new prospect batches', 'Monitors deliverability', 'Optimises email sequences', 'Improves messaging', 'Expands prospect lists', 'Tracks campaign performance', 'Identifies optimisation opportunities'].map(item => (
                                <div key={item} className="flex items-center gap-2.5 rounded-xl px-4 py-2.5" style={{ backgroundColor: '#F5F0E8', border: '1px solid #E8DDD0' }}>
                                    <span className="font-bold text-sm flex-shrink-0" style={{ color: '#FF6A00' }}>→</span>
                                    <span className="text-sm font-medium" style={{ color: '#57534E' }}>{item}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* ─── WEEKLY CADENCE ─── */}
            <section style={{ backgroundColor: '#F5F0E8' }} className="py-20">
                <div className="max-w-[900px] mx-auto px-6 sm:px-10">
                    <span className="inline-block text-[11px] font-bold tracking-[0.18em] uppercase mb-4" style={{ color: '#FF6A00' }}>Operating Cadence</span>
                    <h2 className="text-[#1C1917] text-2xl sm:text-3xl font-bold mb-12 leading-tight">What happens every day, week, and month.</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
                        {[
                            { period: 'Daily', badge: 'D', items: ['New prospects sourced', 'Campaigns running', 'Replies monitored', 'Deliverability checked'] },
                            { period: 'Every Saturday', badge: 'W', note: "We'll meet to review:", items: ['Campaign performance', 'Reply rates', 'Positive opportunities', 'Deliverability health', 'Optimisation ideas', "Next week's action plan"] },
                            { period: 'Monthly', badge: 'M', items: ['Refresh email copy', 'Improve targeting', 'Review lead sources', 'Optimise campaign performance'] },
                        ].map(c => (
                            <div key={c.period} className="rounded-2xl p-7" style={{ backgroundColor: '#FAF8F5', border: '1px solid #E8DDD0' }}>
                                <div className="flex items-center gap-3 mb-6">
                                    <div className="w-10 h-10 rounded-full flex items-center justify-center font-black text-white text-sm" style={{ backgroundColor: '#FF6A00' }}>{c.badge}</div>
                                    <p className="text-sm font-bold" style={{ color: '#1C1917' }}>{c.period}</p>
                                </div>
                                {c.note && <p className="text-xs italic mb-3" style={{ color: '#A8A29E' }}>{c.note}</p>}
                                <ul className="space-y-2.5">
                                    {c.items.map(item => (
                                        <li key={item} className="flex items-start gap-2.5 text-sm font-medium" style={{ color: '#57534E' }}>
                                            <span className="mt-1.5 w-1 h-1 rounded-full flex-shrink-0" style={{ backgroundColor: '#A8A29E' }} />
                                            {item}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ─── WHAT WE NEED FROM YOU ─── */}
            <section className="max-w-[900px] mx-auto px-6 sm:px-10 py-20">
                <span className="inline-block text-[11px] font-bold tracking-[0.18em] uppercase mb-4" style={{ color: '#FF6A00' }}>What We Need From You</span>
                <h2 className="text-[#1C1917] text-2xl sm:text-3xl font-bold mb-3 leading-tight">To ensure a successful launch, please provide:</h2>
                <p className="text-sm leading-relaxed mb-10" style={{ color: '#57534E' }}>The sooner we receive everything, the sooner we can begin onboarding.</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {['Company website', 'LinkedIn company page', 'Ideal Client Profile (if available)', 'Target industries', 'Target locations', 'Case studies', 'Testimonials', 'Brand assets', 'Domain/DNS access (if required)'].map(item => (
                        <div key={item} className="flex items-center gap-3 rounded-xl px-5 py-3.5 transition-colors" style={{ backgroundColor: '#F5F0E8', border: '1px solid #E8DDD0' }}>
                            <span className="font-bold flex-shrink-0" style={{ color: '#FF6A00' }}>✓</span>
                            <span className="text-sm font-medium" style={{ color: '#57534E' }}>{item}</span>
                        </div>
                    ))}
                </div>
            </section>

            {/* ─── ROLES & RESPONSIBILITIES ─── */}
            <section style={{ backgroundColor: '#F5F0E8' }} className="py-20">
                <div className="max-w-[900px] mx-auto px-6 sm:px-10">
                    <span className="inline-block text-[11px] font-bold tracking-[0.18em] uppercase mb-4" style={{ color: '#FF6A00' }}>Roles & Responsibilities</span>
                    <h2 className="text-[#1C1917] text-2xl sm:text-3xl font-bold mb-12 leading-tight">Clear roles. Clean handoffs.</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                        <div className="rounded-2xl overflow-hidden" style={{ border: '1px solid #E8DDD0' }}>
                            <div className="px-7 py-5 flex items-center gap-3" style={{ backgroundColor: '#FF6A00' }}>
                                <div className="w-7 h-7 rounded-lg bg-white flex items-center justify-center">
                                    <span className="text-xs font-black" style={{ color: '#FF6A00' }}>R</span>
                                </div>
                                <p className="text-[11px] font-black tracking-[0.15em] uppercase text-white">RecruitmentOS Manages</p>
                            </div>
                            <ul className="px-7 py-6 space-y-3" style={{ backgroundColor: '#FAF8F5' }}>
                                {['Domain & mailbox setup', 'Prospect sourcing', 'Contact enrichment', 'Email sequence creation', 'Campaign management', 'Deliverability monitoring', 'Follow-up automation', 'Weekly optimisation', 'Performance reporting'].map(item => (
                                    <li key={item} className="flex items-start gap-2.5 text-sm font-medium" style={{ color: '#57534E' }}>
                                        <span className="font-bold flex-shrink-0" style={{ color: '#FF6A00' }}>✓</span>
                                        {item}
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div className="rounded-2xl overflow-hidden" style={{ border: '1px solid #E8DDD0' }}>
                            <div className="px-7 py-5 flex items-center gap-3" style={{ backgroundColor: '#1C1917' }}>
                                <div className="w-7 h-7 rounded-lg flex items-center justify-center" style={{ backgroundColor: '#F5F0E8' }}>
                                    <span className="text-xs font-black" style={{ color: '#1C1917' }}>Y</span>
                                </div>
                                <p className="text-[11px] font-black tracking-[0.15em] uppercase text-white">Your Team Manages</p>
                            </div>
                            <ul className="px-7 py-6 space-y-3" style={{ backgroundColor: '#FAF8F5' }}>
                                {['Responding to interested prospects', 'Booking meetings', 'Running discovery calls', 'Closing new recruitment clients', 'Providing campaign feedback during weekly reviews'].map(item => (
                                    <li key={item} className="flex items-start gap-2.5 text-sm font-medium" style={{ color: '#57534E' }}>
                                        <span className="font-bold flex-shrink-0" style={{ color: '#1C1917' }}>✓</span>
                                        {item}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
            </section>

            {/* ─── OWNERSHIP ─── */}
            <section className="max-w-[900px] mx-auto px-6 sm:px-10 py-20">
                <span className="inline-block text-[11px] font-bold tracking-[0.18em] uppercase mb-4" style={{ color: '#FF6A00' }}>Ownership</span>
                <h2 className="text-[#1C1917] text-2xl sm:text-3xl font-bold mb-3 leading-tight">Everything we build belongs to you.</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-10">
                    <div className="rounded-2xl p-7" style={{ backgroundColor: '#F5F0E8', border: '1px solid #E8DDD0' }}>
                        <p className="text-[10px] font-black tracking-[0.15em] uppercase mb-6" style={{ color: '#A8A29E' }}>You Own</p>
                        <ul className="space-y-3">
                            {['Sending domains', 'Mailboxes', 'Prospect database', 'Email sequences', 'Campaign reports', 'CRM data'].map(item => (
                                <li key={item} className="flex items-start gap-2.5 text-sm font-medium" style={{ color: '#57534E' }}>
                                    <span className="font-bold flex-shrink-0" style={{ color: '#1C1917' }}>✓</span>
                                    {item}
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div className="rounded-2xl p-7" style={{ backgroundColor: '#FFF3EB', border: '1px solid #FFD9BA' }}>
                        <p className="text-[10px] font-black tracking-[0.15em] uppercase mb-6" style={{ color: '#FF6A00' }}>RecruitmentOS Operates</p>
                        <ul className="space-y-3">
                            {['Daily campaign management', 'Prospect research', 'Outreach', 'Sequence optimisation', 'Deliverability monitoring', 'Weekly reporting'].map(item => (
                                <li key={item} className="flex items-start gap-2.5 text-sm font-medium" style={{ color: '#374151' }}>
                                    <span className="font-bold flex-shrink-0" style={{ color: '#FF6A00' }}>✓</span>
                                    {item}
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </section>

            {/* ─── WHY DIFFERENT ─── */}
            <section style={{ backgroundColor: '#F5F0E8' }} className="py-20">
                <div className="max-w-[900px] mx-auto px-6 sm:px-10">
                    <span className="inline-block text-[11px] font-bold tracking-[0.18em] uppercase mb-4" style={{ color: '#FF6A00' }}>Why RecruitmentOS Is Different</span>
                    <h2 className="text-[#1C1917] text-2xl sm:text-3xl font-bold mb-12 leading-tight">Built for recruitment agencies.<br />Not a generic email agency.</h2>
                    <div className="rounded-2xl overflow-hidden" style={{ border: '1px solid #E8DDD0' }}>
                        <div className="grid grid-cols-2" style={{ backgroundColor: '#F5F0E8', borderBottom: '1px solid #E8DDD0' }}>
                            <div className="px-7 py-4 text-[10px] font-black tracking-[0.15em] uppercase" style={{ color: '#A8A29E', borderRight: '1px solid #E8DDD0' }}>Generic Cold Email Agency</div>
                            <div className="px-7 py-4 text-[10px] font-black tracking-[0.15em] uppercase" style={{ color: '#FF6A00' }}>RecruitmentOS</div>
                        </div>
                        {[
                            ['Generic contact lists', 'ICP-driven prospect research'],
                            ['One email for everyone', 'Personalised sequences for your niche'],
                            ['Targets HR', 'Targets verified hiring managers and decision-makers'],
                            ['Focuses on volume', 'Focuses on qualified opportunities'],
                            ['Sends spreadsheets', 'Operates your outbound engine'],
                        ].map(([generic, ros], idx) => (
                            <div key={idx} className="grid grid-cols-2" style={{ borderBottom: idx < 4 ? '1px solid #E8DDD0' : undefined, backgroundColor: idx % 2 === 0 ? '#FAF8F5' : '#F5F0E8' }}>
                                <div className="px-7 py-4 text-sm font-medium flex items-start gap-2" style={{ color: '#A8A29E', borderRight: '1px solid #E8DDD0' }}>
                                    <span className="font-bold flex-shrink-0 text-red-400">✕</span>
                                    {generic}
                                </div>
                                <div className="px-7 py-4 text-sm font-medium flex items-start gap-2" style={{ color: '#1C1917' }}>
                                    <span className="font-bold flex-shrink-0" style={{ color: '#FF6A00' }}>✓</span>
                                    {ros}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ─── THREE NON-NEGOTIABLES ─── */}
            <section className="max-w-[900px] mx-auto px-6 sm:px-10 py-20">
                <span className="inline-block text-[11px] font-bold tracking-[0.18em] uppercase mb-4" style={{ color: '#FF6A00' }}>Our Three Non-Negotiables</span>
                <h2 className="text-[#1C1917] text-2xl sm:text-3xl font-bold mb-12 leading-tight">The three things we won't budge on.</h2>
                <div className="space-y-5">
                    {[
                        {
                            num: '01',
                            title: 'We Only Target the Right People',
                            body: 'Relevant, high-quality outreach always outperforms high-volume spam. We prioritise accuracy, relevance, and long-term deliverability.',
                        },
                        {
                            num: '02',
                            title: 'We Define Success Before We Launch',
                            body: "Before sending the first email, we'll agree on target industries, company sizes, decision-maker titles, locations, qualified opportunity criteria, and campaign success metrics. This ensures everyone measures success the same way.",
                        },
                        {
                            num: '03',
                            title: 'Fast Follow-Up Wins Clients',
                            body: 'Generating an interested reply is only the beginning. Respond within 24 hours, make at least 5 follow-up attempts for every interested lead, and keep RecruitmentOS informed of outcomes so we can continue optimising campaigns.',
                        },
                    ].map(nc => (
                        <div key={nc.num} className="rounded-2xl p-8 flex items-start gap-6" style={{ backgroundColor: '#F5F0E8', border: '1px solid #E8DDD0' }}>
                            <span className="text-4xl font-black leading-none flex-shrink-0 select-none" style={{ color: '#E8DDD0' }}>{nc.num}</span>
                            <div>
                                <h3 className="text-base font-bold mb-2" style={{ color: '#1C1917' }}>{nc.title}</h3>
                                <p className="text-sm leading-relaxed" style={{ color: '#57534E' }}>{nc.body}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* ─── COLD EMAIL PATIENCE ─── */}
            <section style={{ backgroundColor: '#F5F0E8' }} className="py-20">
                <div className="max-w-[900px] mx-auto px-6 sm:px-10">
                    <span className="inline-block text-[11px] font-bold tracking-[0.18em] uppercase mb-4" style={{ color: '#FF6A00' }}>Important</span>
                    <h2 className="text-[#1C1917] text-2xl sm:text-3xl font-bold mb-4 leading-tight">Cold email requires patience.</h2>
                    <p className="text-sm leading-relaxed mb-10 max-w-2xl" style={{ color: '#57534E' }}>
                        Cold email is a long-term client acquisition channel—not an instant lead source. The first two weeks are intentionally dedicated to domain warm-up, building sender reputation, campaign preparation, and deliverability testing.
                    </p>
                    <div className="rounded-2xl p-8" style={{ backgroundColor: '#1C1917' }}>
                        <p className="text-sm leading-relaxed mb-6" style={{ color: 'rgba(255,255,255,0.6)' }}>
                            Campaigns launch in <strong className="text-white">Week 3</strong>, but the strongest results come from continuous optimisation over time. This is why RecruitmentOS is delivered with a{' '}
                            <strong style={{ color: '#FF6A00' }}>minimum 3-month engagement</strong>.
                        </p>
                        <p className="text-sm leading-relaxed mb-6" style={{ color: 'rgba(255,255,255,0.5)' }}>The first three months allow us to:</p>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
                            {['Build domain reputation', 'Reach a meaningful number of prospects', 'Collect campaign data', 'Optimise messaging', 'Improve reply rates', 'Create a predictable pipeline of qualified opportunities'].map(item => (
                                <div key={item} className="flex items-start gap-2.5 text-sm font-medium" style={{ color: 'rgba(255,255,255,0.7)' }}>
                                    <span className="font-bold flex-shrink-0" style={{ color: '#FF6A00' }}>✓</span>
                                    {item}
                                </div>
                            ))}
                        </div>
                        <p className="text-xs italic" style={{ color: 'rgba(255,255,255,0.3)' }}>Cold email compounds over time. The longer the system runs, the stronger and more predictable the results become.</p>
                    </div>
                </div>
            </section>

            {/* ─── REPLY MANAGEMENT ─── */}
            <section className="max-w-[900px] mx-auto px-6 sm:px-10 py-20">
                <span className="inline-block text-[11px] font-bold tracking-[0.18em] uppercase mb-4" style={{ color: '#FF6A00' }}>Reply Management</span>
                <h2 className="text-[#1C1917] text-2xl sm:text-3xl font-bold mb-4 leading-tight">Success comes from converting replies into meetings.</h2>
                <p className="text-sm leading-relaxed mb-10 max-w-xl" style={{ color: '#57534E' }}>For every interested lead:</p>
                <div className="space-y-3">
                    {[
                        { highlight: '24 hours', text: 'Send the first follow-up within 24 hours' },
                        { highlight: '5+ attempts', text: 'Make at least 5 follow-up attempts before considering the opportunity lost' },
                        { highlight: 'Keep us informed', text: 'Keep RecruitmentOS informed of the outcome' },
                    ].map(item => (
                        <div key={item.text} className="flex items-start gap-4 rounded-2xl px-6 py-5" style={{ backgroundColor: '#F5F0E8', border: '1px solid #E8DDD0' }}>
                            <span className="text-xs font-black px-3 py-1.5 rounded-full flex-shrink-0 mt-0.5 whitespace-nowrap" style={{ backgroundColor: '#FFF3EB', color: '#FF6A00', border: '1px solid #FFD9BA' }}>{item.highlight}</span>
                            <p className="text-sm font-medium leading-relaxed pt-1" style={{ color: '#57534E' }}>{item.text}</p>
                        </div>
                    ))}
                </div>
                <p className="text-xs mt-5 italic" style={{ color: '#A8A29E' }}>Fast, consistent follow-up significantly improves meeting bookings and conversion rates.</p>
            </section>

            {/* ─── SUCCESS METRICS ─── */}
            <section style={{ backgroundColor: '#F5F0E8' }} className="py-20">
                <div className="max-w-[900px] mx-auto px-6 sm:px-10">
                    <span className="inline-block text-[11px] font-bold tracking-[0.18em] uppercase mb-4" style={{ color: '#FF6A00' }}>Success Metrics</span>
                    <h2 className="text-[#1C1917] text-2xl sm:text-3xl font-bold mb-10 leading-tight">We'll review performance together.</h2>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                        {['Email deliverability', 'Reply rate', 'Positive reply rate', 'Qualified opportunities generated', 'Meetings booked', 'Pipeline growth'].map(metric => (
                            <div key={metric} className="rounded-xl px-5 py-4 text-sm font-semibold" style={{ backgroundColor: '#FAF8F5', border: '1px solid #E8DDD0', color: '#1C1917' }}>
                                {metric}
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ─── CTA ─── */}
            <section className="max-w-[900px] mx-auto px-6 sm:px-10 py-20">
                <div className="rounded-3xl px-10 sm:px-14 py-16 text-center" style={{ backgroundColor: '#F5F0E8', border: '1px solid #E8DDD0' }}>
                    <h2 className="text-2xl sm:text-3xl font-bold mb-4 leading-tight" style={{ color: '#1C1917' }}>
                        Your outsourced Business Development engine.
                    </h2>
                    <p className="text-sm leading-relaxed mb-10 max-w-xl mx-auto" style={{ color: '#57534E' }}>
                        We build the infrastructure, identify the right prospects, run outbound campaigns, optimise performance every week, and help create a predictable pipeline of qualified opportunities — so your team can focus on what they do best.
                    </p>
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                        <a
                            href="https://cal.com/tusharm/30min?user=tusharm"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full font-bold text-sm transition-opacity hover:opacity-90"
                            style={{ backgroundColor: '#FF6A00', color: '#FFFFFF' }}
                        >
                            Book a fit call
                        </a>
                        <a
                            href="/services"
                            className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full font-bold text-sm transition-opacity hover:opacity-80"
                            style={{ backgroundColor: 'transparent', color: '#57534E', border: '1px solid #E8DDD0' }}
                        >
                            See our services →
                        </a>
                    </div>
                </div>
            </section>

            <Footer />
        </main>
    );
}
