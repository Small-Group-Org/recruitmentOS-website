export type Service = {
    slug: string;
    number: string;
    name: string;
    oneLine: string;
    deepDive: string;
    outcome: string;
    tagColor: string;
};

export const services: Service[] = [
    {
        slug: 'bd-strategy-niche-mapping',
        number: '01',
        name: 'BD Strategy & Niche Mapping',
        oneLine: 'We define who you should be selling to.',
        deepDive: "A written, niche-specific ICP map: titles, geographies, headcount bands, decision-maker patterns, signal sources, and disqualification rules. Output is a doc your recruiters can read in 20 minutes and trust.",
        outcome: 'ICP map delivered Week 2',
        tagColor: 'bg-[#e8f5ef] text-[#1a6b4a]',
    },
    {
        slug: 'signal-triggered-lead-generation',
        number: '02',
        name: 'Signal-Triggered Lead Generation',
        oneLine: 'We find hiring managers before the job post exists.',
        deepDive: 'Daily scrape of departure signals, funding announcements, leadership changes, restructures, and hiring intent. Enriched, ranked, niche-filtered. Drops into your CRM every morning.',
        outcome: '2,500–25,000 verified leads/mo',
        tagColor: 'bg-[#eeebfb] text-[#3d2e7c]',
    },
    {
        slug: 'multi-channel-outreach-engine',
        number: '03',
        name: 'Multi-Channel Outreach Engine',
        oneLine: 'We run the sequences — email + LinkedIn — on your stack.',
        deepDive: 'Niche-aware copy, trigger-specific openers, 4-touch cold + 3-touch warm cadences. Built on your Smartlead, your domains, your inboxes. We operate it daily. You own everything.',
        outcome: '100+ verified replies in 60 days',
        tagColor: 'bg-[#fdf6e8] text-[#b8862a]',
    },
    {
        slug: 'reply-triage-handover',
        number: '04',
        name: 'Reply Filtering & Handoff',
        oneLine: 'We filter the replies. You only see the ones worth your time.',
        deepDive: 'Every reply gets sorted. Interested ones land in your inbox within 4 business hours. Everything else — not-now, wrong-person, unsubscribes — gets handled on our side.',
        outcome: '10–30 booked meetings in 60 days',
        tagColor: 'bg-[#fcecea] text-[#c0412b]',
    },
    {
        slug: 'reporting-iteration',
        number: '05',
        name: 'Reporting & Iteration',
        oneLine: 'We close the loop weekly and tune monthly.',
        deepDive: 'Weekly pipeline reports, monthly sequence iteration, quarterly business reviews. Every metric tied back to your placement target.',
        outcome: 'Monthly iteration log + QBR',
        tagColor: 'bg-[#e3f2fd] text-[#0d47a1]',
    },
];
