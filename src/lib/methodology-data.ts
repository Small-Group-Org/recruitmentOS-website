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
        name: 'Setup & Foundation',
        phase: 'Week 0–2',
        body: 'We run discovery, define your ICP, configure domains, warm up infrastructure, build sequences, and analyse your existing lead data — so day one of outreach hits the ground running.',
        subComponents: [
            { title: 'ICP & Targeting', description: 'Titles, headcount bands, geography, and disqualification rules' },
            { title: 'Email infra setup', description: 'Sending domains purchased, inbox rotation, and DNS configured' },
            { title: 'Email warmup', description: 'Initial sending rotation to build inbox reputation' },
            { title: 'Sequence build', description: 'Multi-touch outbound templates and trigger-based openers' },
            { title: 'Lead analysis', description: 'Existing pipeline reviewed and signal sources mapped' },
        ],
    },
    {
        number: '02',
        name: 'Campaign Live',
        phase: 'Week 2–3',
        body: 'Daily cold email and LinkedIn sequences go live. Outreach is signal-triggered, personalised to each hiring manager. Replies route directly to your inbox — ready to close.',
        subComponents: [
            { title: 'Signal-triggered outreach', description: 'Job posts, funding rounds, leadership changes — contacted within 48h' },
            { title: 'Multi-channel sequences', description: 'Cold email + LinkedIn, coordinated and de-duplicated' },
            { title: 'Reply routing', description: 'Positive replies filtered and forwarded within 4 business hours' },
        ],
    },
    {
        number: '03',
        name: 'First Analysis',
        phase: 'Week 3–4',
        body: 'We review open and reply rates, run A/B tests on subject lines and copy, and refine targeting based on live data. Every iteration tightens the system.',
        subComponents: [
            { title: 'Performance review', description: 'Open rates, reply rates, meeting-booked rate benchmarked' },
            { title: 'A/B testing', description: 'Subject lines, openers, and CTAs tested in parallel' },
            { title: 'Targeting refinement', description: 'ICP tightened or expanded based on which signals converted' },
        ],
    },
    {
        number: '04',
        name: 'Scale & Optimise',
        phase: 'Month 2–3',
        body: 'Volume increases, targeting sharpens, and copy stays fresh. Your pipeline grows without adding headcount — the engine compounds on itself.',
        subComponents: [
            { title: 'Volume scale', description: 'Daily send count increased as domain reputation builds' },
            { title: 'Audience expansion', description: 'Additional niches or geographies layered in where data supports it' },
            { title: 'Copy refresh', description: 'Sequences rewritten monthly to avoid reply-rate decay' },
        ],
    },
    {
        number: '05',
        name: 'Ongoing',
        phase: 'Always',
        body: 'You close. We keep the pipeline full. Daily outreach continues, signals stay monitored, and the system evolves with your market — indefinitely.',
        subComponents: [
            { title: 'Daily operation', description: 'Fresh lead list built and sent every morning' },
            { title: 'Weekly reporting', description: 'Pipeline summary, reply rates, domain health' },
            { title: 'Monthly iteration', description: 'Copy updated, audience tightened, lead sources reviewed' },
            { title: 'Quarterly strategy', description: 'Full review with placements traced back, strategy adjusted' },
        ],
    },
];

export const buildDeliverables: string[] = [
    'Written ICP map & disqualification rules',
    'Signal source list (job boards, funding, news)',
    'Sending domains purchased & warmed',
    'Inbox rotation configured',
    'Cold email + LinkedIn sequences built',
    'Lead source analysis completed',
    'CRM mapping & routing confirmed',
    'Reply triage SOP documented',
    'Weekly report template ready',
    'Handover walkthrough recorded',
];

export const runCadence: { period: string; items: string[] }[] = [
    { period: 'Daily', items: ['Fresh lead list built', 'Emails + LinkedIn sent', 'Replies sorted (4h turnaround)'] },
    { period: 'Weekly', items: ['Pipeline summary sent', 'Reply rates checked', 'Email domain health checked'] },
    { period: 'Monthly', items: ['Outreach copy updated', 'Target audience tightened', 'Lead sources reviewed'] },
    { period: 'Quarterly', items: ['Full review with placements traced back', 'Strategy adjusted if needed'] },
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
        title: 'No Setup for an agency whose delivery isn\'t ready.',
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
