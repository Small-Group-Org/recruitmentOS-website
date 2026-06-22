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
        body: 'We connect to your CRM/ATS, map your target hiring managers, provision domain infrastructure, start deliverability warm-ups, and structure your client-acquisition sequences — all tailored to your specific recruiting niches.',
        subComponents: [
            { title: 'Niche & Vacancy Mapping', description: 'Define target hiring managers, tech stacks, salary ranges, and disqualification rules.' },
            { title: 'Deliverability Setup', description: 'Register sending domains, configure inbox rotation, and set up SPF/DKIM/DMARC records.' },
            { title: 'Deliverability Warmup', description: 'Place sending accounts in an automated warm-up rotation to build high sender reputation.' },
            { title: 'Spec Pitch & Sequence Design', description: 'Craft candidate-led spec templates, active vacancy response campaigns, and lapsed client sequences.' },
            { title: 'ATS/CRM Database Review', description: 'Clean and segment your historic client/lead database, matching dormant accounts to live signals.' },
        ],
    },
    {
        number: '02',
        name: 'Campaign Live',
        phase: 'Week 2–3',
        body: 'We activate real-time scraping on 20+ job boards and company careers pages. The moment an employer posts a vacancy matching your desk, our system maps the exact Hiring Manager and launches a multi-channel campaign with candidate matching.',
        subComponents: [
            { title: 'Active Vacancy Scraping', description: 'Match newly posted job ads to candidate profiles and trigger outreach within 24–48 hours.' },
            { title: 'Multi-Touch Outbound', description: 'Orchestrate cold email, LinkedIn connections, and follow-ups to maximize response rates.' },
            { title: 'Positive Lead Forwarding', description: 'Push positive replies directly to your recruitment consultants\' inbox or ATS/CRM within 4 business hours.' },
        ],
    },
    {
        number: '03',
        name: 'First Analysis',
        phase: 'Week 3–4',
        body: 'We audit the open, response, and conversion rates of your campaigns, comparing performance by sub-niche. We run A/B copy tests on candidate-led vs. authority-led pitches to find the highest-converting angle.',
        subComponents: [
            { title: 'Conversion Audit', description: 'Compare reply rates and meeting-booked rates by job type, seniorities, and industries.' },
            { title: 'Pitch Strategy Tests', description: 'Run parallel tests comparing spec-candidate hooks against general recruitment agency pitches.' },
            { title: 'Signal Filtering', description: 'Tighten job scraper parameters to exclude low-probability vacancies or low-fee employers.' },
        ],
    },
    {
        number: '04',
        name: 'Scale & Optimise',
        phase: 'Month 2–3',
        body: 'We scale up sending volume across more warmed domains and layer in adjacent recruitment niches. We rewrite and refresh copy to prevent response decay and maintain high-conversion rates.',
        subComponents: [
            { title: 'Infrastructure Expansion', description: 'Safely increase daily email volume as domain reputation matures.' },
            { title: 'Desk Expansion', description: 'Deploy campaigns for adjacent desks or seniorities once the initial desk is proven.' },
            { title: 'Message Rotation', description: 'Refresh candidate pitches and vacancy hooks every 30 days to sustain inbox response rates.' },
        ],
    },
    {
        number: '05',
        name: 'Ongoing',
        phase: 'Always',
        body: 'Your consultants handle the calls and win the jobs. We manage the engine. We monitor domain health, source fresh job signals every morning, rotate templates, and audit placements to align targeting.',
        subComponents: [
            { title: 'Signal-to-Outbound Execution', description: 'Feed new job openings and mapped hiring managers into the outreach sequence daily.' },
            { title: 'Campaign & Domain Health', description: 'Full reporting on deliverability metrics, response rates, and meeting outcomes.' },
            { title: 'Sourcing & Copy Refresh', description: 'Update target employer lists, rewrite candidate specs, and optimize sequences based on placement data.' },
            { title: 'Desk & Margin Review', description: 'Run deep audits on closed-won job orders to double down on your highest-margin desks.' },
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
