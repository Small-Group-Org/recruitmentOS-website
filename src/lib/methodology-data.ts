export type MethodologyStep = {
    number: string;
    name: string;
    phase: string;
    body: string;
    subComponents: { title: string; description: string }[];
};

export const methodologySteps: MethodologyStep[] = [
    {
        number: '01',
        name: 'Niche Immersion',
        phase: 'Build · Week 1–2',
        body: 'Before a single email goes out, we map your niche in depth: titles that buy, geographies you win in, signals that fire 4–8 weeks before a hire happens. The output is a written ICP map and a signal-source list specific to your niche.',
        subComponents: [
            { title: 'ICP map', description: 'Titles, headcount bands, geography' },
            { title: 'Signal sources', description: 'Departures, funding, restructures, job-board triggers, news triggers' },
            { title: 'Disqualification rules', description: 'Who we explicitly skip' },
        ],
    },
    {
        number: '02',
        name: 'Signal Engine',
        phase: 'Build · Week 2–3',
        body: 'We build the data layer that turns niche signals into ranked hiring-manager contacts. Apify/Phantombuster scrapes feed a daily list; ZoomInfo/Apollo enriches; Clay or Smartlead handles routing.',
        subComponents: [
            { title: 'Daily scrape jobs', description: 'Runs at 06:00 UTC, posts new list to your CRM' },
            { title: 'Enrichment', description: 'Verified email, mobile, LinkedIn' },
            { title: 'Ranking', description: 'Recency of signal, fit to niche, decision-maker title' },
        ],
    },
    {
        number: '03',
        name: 'Outreach Engine',
        phase: 'Build · Week 3–5 → Run · ongoing',
        body: 'Multi-step sequences across email + LinkedIn, niche-aware copy, and trigger-specific openers. Built on your sending infrastructure (Smartlead, your domains, your inboxes — you own the deliverability).',
        subComponents: [
            { title: 'Sequence design', description: '4-touch cold + 3-touch warm' },
            { title: 'Trigger openers', description: '"Saw the [BD role] you posted yesterday…"' },
            { title: 'Deliverability', description: 'Domain warming, inbox rotation, reply detection' },
        ],
    },
    {
        number: '04',
        name: 'Reply Triage + Handover',
        phase: 'Run · ongoing',
        body: 'Replies get classified into 6 buckets. Only positive-intent replies go to your recruiters. Everything else gets routed: objections to nurture, wrong-person to LinkedIn, not-now to long-cycle, unsubscribes to suppression.',
        subComponents: [
            { title: '6-bucket triage', description: 'Yes / objection / wrong person / not now / unsub / spam' },
            { title: 'Recruiter handover SLA', description: 'Qualified replies in your inbox within 4 business hours' },
            { title: 'Weekly reporting', description: 'Pipeline, reply rate, meeting count, qualified-meeting count' },
        ],
    },
];

export const buildDeliverables: string[] = [
    'ICP map',
    'Signal source list',
    'Sequence library',
    'Domain/inbox config',
    'CRM mapping',
    'Reply triage SOP',
    'Weekly report template',
    '30-day handover walkthrough',
];

export const runCadence: { period: string; items: string[] }[] = [
    { period: 'Daily', items: ['List curation', 'Sequence execution', 'Reply triage (4h SLA)'] },
    { period: 'Weekly', items: ['Pipeline report', 'Reply-rate review', 'Domain health check'] },
    { period: 'Monthly', items: ['Sequence iteration', 'ICP refinement', 'Signal-source tuning'] },
    { period: 'Quarterly', items: ['QBR with placement attribution', 'Strategy reset if needed'] },
];

export const sixQuestionInterview: string[] = [
    "What's your monthly placement target, and is it backed by a candidate pipeline that can deliver it?",
    'Who, on your team — name, role, weekly hours — will own the inbox we hand off?',
    'What did your previous BD attempt look like and what specifically went wrong?',
    'If we book you 25 qualified meetings in month 4, what happens to your business?',
    'What would make you want to fire us in month 6?',
    'Are you willing to be honest with me when something isn\'t working — within a week of noticing?',
];

export const nonCompromises: { title: string; body: string }[] = [
    {
        title: 'No outreach without niche-specific filtering.',
        body: 'Spray-and-pray sends domains burn in 90 days and the client\'s brand burns with them. Even when the client pushes for "just send more," we don\'t.',
    },
    {
        title: 'No promised meetings without a written Qualified Meeting Definition.',
        body: 'Title list, geography, company size, show-up rate — defined and signed before contracts.',
    },
    {
        title: 'No Build for an agency whose delivery isn\'t ready.',
        body: 'If they can\'t articulate who handles the inbound or candidate pipeline, we tell them to fix that first and come back. Lost revenue. Worth it.',
    },
];

export const ownership: { you: string[]; we: string[] } = {
    you: [
        'Your domains, sending IPs, inboxes',
        'Your CRM (Bullhorn, Vincere, HubSpot, etc.) and its data',
        'Your ATS and candidate database',
        'Every contact, every sequence, every report — full export at any time',
    ],
    we: [
        'Daily operation of the engine',
        'Sequence design, copy, signal sourcing',
        'Reply triage and handover',
        'Reporting and iteration',
    ],
};
