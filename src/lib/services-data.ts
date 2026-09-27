export type Service = {
    slug: string;
    number: string;
    name: string;
    oneLine: string;
    deepDive: string;
    outcome: string;
    tagColor: string;
    deliverables: string[];
    slaOrGuarantee: string;
};

export const services: Service[] = [
    {
        slug: 'hiring-signal-intelligence',
        number: '01',
        name: 'Hiring-Signal Intelligence',
        oneLine: 'We detect active hiring demand before competitors reach the account.',
        deepDive: 'Real-time monitoring across job boards, career hubs, leadership moves, expansion signals, and stealth vacancies isolates companies with live budgets and urgent hiring needs.',
        outcome: 'Live Signal Map Delivered Week 1',
        tagColor: 'bg-brand-tint text-brand',
        deliverables: ['Live hiring-signal map', 'Aged vacancy detection', 'Executive departure alerts', 'Expansion and stealth-hiring radar'],
        slaOrGuarantee: 'Live Signal Map Delivered Week 1',
    },
    {
        slug: 'waterfall-enrichment-verification',
        number: '02',
        name: 'Waterfall Enrichment & Verification',
        oneLine: 'We verify decision-maker emails and direct dials through a multi-provider cascade.',
        deepDive: 'Contacts pass through premium enrichment providers, catch-all checks, MX validation, and bounce-prevention filters before entering an outreach queue.',
        outcome: '98%+ Deliverability SLA',
        tagColor: 'bg-accent-light text-success',
        deliverables: ['Verified work emails', 'Direct dials when available', 'Double SMTP verification', 'Catch-all bounce filtering'],
        slaOrGuarantee: '98%+ Deliverability SLA',
    },
    {
        slug: 'domain-isolated-outreach-engine',
        number: '03',
        name: 'Domain-Isolated Outreach Engine',
        oneLine: 'We scale personalized outreach without exposing your primary agency domain.',
        deepDive: 'Dedicated secondary domains, warmed mailboxes, SPF/DKIM/DMARC configuration, and trigger-specific multi-touch sequences create a strict reputation air-gap.',
        outcome: '100% Brand Reputation Air-Gap',
        tagColor: 'bg-[#EEEBFB] text-[#3D2E7C]',
        deliverables: ['Secondary domain setup', 'Mailbox warm-up', 'SPF, DKIM and DMARC controls', 'Personalized multi-touch sequences'],
        slaOrGuarantee: '100% Brand Reputation Air-Gap',
    },
    {
        slug: 'human-reply-triage-sla',
        number: '04',
        name: 'Human Reply Triage & SLA',
        oneLine: 'Humans classify every response and route genuine buying intent within the SLA.',
        deepDive: 'Our operations team filters out-of-office messages, non-buyers, unsubscribes, and irrelevant replies, then hands qualified conversations to your recruiters with an account brief.',
        outcome: '$0 Fee on Non-Buyers & OOO',
        tagColor: 'bg-[#FDF6E8] text-[#B8862A]',
        deliverables: ['Human reply classification', 'Buying-intent qualification', 'Account and CRM briefing', 'Objection-routing playbooks'],
        slaOrGuarantee: '$0 Fee on Non-Buyers & OOO',
    },
    {
        slug: 'discovery-meetings-signed-fee-agreements',
        number: '05',
        name: 'Discovery Meetings & Signed Fee Agreements',
        oneLine: 'We move qualified hiring managers from positive intent to calendar and terms.',
        deepDive: 'Qualified prospects receive calendar routing, vacancy context, and a briefing handoff designed to accelerate discovery meetings and signed terms of business.',
        outcome: '5-Day Dispute Window Protection',
        tagColor: 'bg-[#E3F2FD] text-[#0D47A1]',
        deliverables: ['Calendar-direct booking', 'Pre-call briefing dossier', 'ICP qualification', 'Fee-agreement handoff support'],
        slaOrGuarantee: '5-Day Dispute Window Protection',
    },
];
