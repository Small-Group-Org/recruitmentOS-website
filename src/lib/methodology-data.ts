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
        body: 'We figure out exactly who to target — Which hiring managers, which sectors, which company sizes, and who to ignore.',
        subComponents: [
            { title: 'We figure out exactly who to target', description: 'Which hiring managers, which sectors, which company sizes, and who to ignore.' },
            { title: 'We set up your sending infrastructure', description: 'Domains bought, warmed up, and configured so emails land in inboxes not spam.' },
            { title: 'We write your email sequences', description: '6–7 emails written specifically for your niche and the hiring managers you\'re going after.' },
            { title: 'We find where your buyers are', description: 'Job boards, LinkedIn signals, and hiring intent sources mapped for your market.' },
        ],
    },
    {
        number: '02',
        name: 'Campaign Live',
        phase: 'Week 2–3',
        body: 'We find the right person at each company, send personalised emails, and forward the positive replies to your inbox.',
        subComponents: [
            { title: 'We find the right person at each company', description: 'Verified direct email, correct title, actively hiring right now.' },
            { title: 'Emails go out, personalised', description: 'Every hiring manager gets an email relevant to what they\'re actually hiring for.' },
            { title: 'Positive replies land in your inbox', description: 'We sort every reply and forward the good ones to you within 4 hours.' },
        ],
    },
    {
        number: '03',
        name: 'First Analysis',
        phase: 'Week 3–4',
        body: 'We check what\'s working, test improvements, and cut low-probability targets.',
        subComponents: [
            { title: 'We check what\'s working', description: 'Reply rates broken down by role type, seniority, and sector.' },
            { title: 'We test and improve', description: 'Subject lines, openers, and CTAs tested in parallel to find what gets the most replies.' },
            { title: 'We cut what\'s not working', description: 'Low-probability targets removed so you\'re only hitting the right companies.' },
        ],
    },
    {
        number: '04',
        name: 'Scale & Optimise',
        phase: 'Month 2–3',
        body: 'We safely increase volume, expand to new desks, and refresh copy to keep reply rates high.',
        subComponents: [
            { title: 'We send more', description: 'Volume increases safely as your domain reputation builds.' },
            { title: 'We expand to new desks', description: 'Once the first desk is proven, we roll out to adjacent roles or seniorities.' },
            { title: 'We keep copy fresh', description: 'Sequences rewritten every 30 days so reply rates don\'t drop off.' },
        ],
    },
    {
        number: '05',
        name: 'Ongoing',
        phase: 'Always',
        body: 'Every day, week, month, and quarter we execute the system and review the strategy.',
        subComponents: [
            { title: 'Every day', description: 'New hiring manager contacts sourced and emails sent.' },
            { title: 'Every week', description: 'Sequences adjusted, domain health monitored, pipeline summary sent to you.' },
            { title: 'Every month', description: 'Copy refreshed, targeting tightened, lead sources reviewed.' },
            { title: 'Every quarter', description: 'Full review, placements traced back to campaigns, strategy adjusted.' },
        ],
    },
];

export const buildDeliverables: string[] = [
    'Exactly who we\'re targeting — written down and agreed',
    'All signal sources confirmed',
    'Sending domains bought and warmed',
    'Inbox rotation set up',
    '6–7 email sequences written and ready',
    'Lead source analysis done',
    'Reply process documented',
    'Weekly report template ready',
    'Full walkthrough recorded and handed over',
];

export const runCadence: { period: string; items: string[] }[] = [
    { period: 'Daily', items: ['New contacts sourced', 'Emails sent', 'Replies sorted within 4 hours'] },
    { period: 'Weekly', items: ['Pipeline summary sent', 'Reply rates reviewed', 'Domain health checked'] },
    { period: 'Monthly', items: ['Copy refreshed', 'Targeting tightened', 'Lead sources reviewed'] },
    { period: 'Quarterly', items: ['Full review', 'Placements traced back', 'Strategy adjusted'] },
];

export const sixQuestionInterview: string[] = [
    "What's your monthly placement target — and do you have the candidates to deliver it?",
    "Who on your team will own the inbox we hand replies to? Name, role, hours per week.",
    "What did your last BD attempt look like — and what went wrong?",
    "If we get you 25 qualified meetings in month 4, what does that do to your business?",
    "What would make you want to fire us in month 6?",
    "Will you tell us within a week if something isn't working?",
];

export const nonCompromises: { title: string; body: string }[] = [
    {
        title: 'We only send to the right people.',
        body: 'Blasting generic lists burns your domain and your brand in 90 days. We\'d rather send fewer, better emails — even when clients push for more volume.',
    },
    {
        title: 'We define "qualified meeting" in writing before we start.',
        body: 'Job title, location, company size, show-up rate — agreed and signed before contracts. No ambiguity.',
    },
    {
        title: 'We won\'t onboard an agency that isn\'t ready to handle replies.',
        body: 'If you don\'t have someone to manage inbound or a candidate pipeline behind you, we\'ll tell you to sort that first and come back. We lose the revenue. Worth it.',
    },
];

export const ownership: { you: string[]; we: string[] } = {
    you: [
        'Your sending domains and inboxes',
        'Every contact, sequence, and report — yours to export anytime',
        'Your CRM and all its data — we never hold it hostage',
    ],
    we: [
        'Running the system every day',
        'Writing and improving the sequences',
        'Sorting replies and handing over the good ones',
        'Weekly reports and monthly optimisation',
    ],
};
