export interface FAQItem {
    question: string;
    answer: string;
}

export const homeFaqs: FAQItem[] = [
    {
        question: 'How do recruitment agencies acquire client fee agreements without cold calling?',
        answer: 'Recruitment agencies secure client fee agreements without cold calling by deploying signal-based automated outreach targeting hiring executives at the exact moment a hiring need occurs. RecruitmentOS monitors 19+ platforms for executive departures, stealth openings, and funding rounds, then routes verified positive replies directly to billing recruiters.',
    },
    {
        question: 'What is the cost of done-for-you recruitment agency BD vs hiring a full-time BD rep?',
        answer: 'Done-for-you outbound through RecruitmentOS costs $1,000/month on a 3-month sprint (or $200 per verified positive reply), compared to $6,000–$8,000/month plus commission for a full-time internal BD hire. In addition, RecruitmentOS eliminates software subscription fees, data tool costs, and ramp-up failure risks.',
    },
    {
        question: 'How does signal-based outbound prospecting work for recruitment agencies?',
        answer: 'Signal-based outbound detects verifiable corporate events—such as senior departures, active job board postings, funding rounds, and expansion triggers—before initiating contact. Instead of emailing static lists, messages reference specific, real-time hiring context, driving 8.5%–24% positive reply rates across target accounts.',
    },
    {
        question: 'What guarantee does RecruitmentOS provide for recruitment agencies?',
        answer: 'RecruitmentOS provides a 60-day delivery guarantee: we place at least 100 verified hiring-manager contacts in your active pipeline within 60 days, or we continue operating the entire outbound engine free of charge until fulfilled. Furthermore, under our zero-risk invariant, you pay $0 on non-buyers, bounces, or out-of-office replies.',
    },
    {
        question: 'What constitutes a verified positive reply under the Qualified Meeting Definition?',
        answer: 'A positive reply is an unambiguous response from a hiring decision-maker expressing genuine interest in exploring recruiting terms or reviewing relevant candidate profiles. Every qualified lead must satisfy our 7-component contract: correct executive title, verified hiring authority, vertical niche fit, active hiring need, confirmed compensation floor, agreed next step, and scheduled calendar briefing.',
    },
    {
        question: "What's the difference between a positive reply and a booked meeting?",
        answer: 'A positive reply is the verified moment a hiring manager says "yes, let\'s talk" or "send across relevant profiles." RecruitmentOS filters all non-buyers, spam, and out-of-office messages so recruiters receive only warm, on-brief leads; your team then steps in to conduct the call, present candidates, and sign the fee agreement.',
    },
    {
        question: 'Why do recruitment agency cold email campaigns suffer high bounce rates and deliverability issues?',
        answer: 'Cold outreach fails when agencies send unverified contact lists directly from their primary business domain without secondary-domain isolation. RecruitmentOS insulates your brand using 3–5 dedicated mirror sending domains, automated SPF/DKIM/DMARC records, and 20+ waterfall verification checks that keep bounce rates strictly below 2%.',
    },
    {
        question: 'Who owns the outbound infrastructure, sending domains, and prospect data?',
        answer: 'The client owns 100% of all domains, warmed mailboxes, DNS configurations, sequences, and enriched prospect databases. RecruitmentOS configures and operates the system on your behalf; if the engagement ever concludes, all assets and pipelines remain in your accounts and continue functioning.',
    },
    {
        question: 'How quickly does the RecruitmentOS outbound engine pay for itself?',
        answer: 'For most search and staffing agencies, closing a single candidate placement ($15,000–$25,000 / £12,000–£20,000 fee) pays for 2–3 months of the entire outbound engine. Our performance safeguards ensure your downside is protected while campaign volume ramps to consistent discovery calls.',
    },
    {
        question: 'What recruitment agencies qualify for the RecruitmentOS outbound engine?',
        answer: 'We partner exclusively with established recruitment, staffing, and executive search agencies ($500K–$5M ARR) where agency leadership is the primary business development bottleneck. Agencies must have a dedicated candidate delivery team, at least one defined industry vertical, and proven placement track records.',
    },
    {
        question: "Why not set up Clay, Instantly, and Apollo in-house?",
        answer: 'Building an in-house outbound engine requires stitching together 5+ complex platforms, continuous API maintenance, mailbox warmup monitoring, sequence copywriting, and daily human reply triage. RecruitmentOS gives you a turnkey, proven acquisition engine operated by outbound specialists at a fraction of the cost of dedicated internal operations.',
    },
    {
        question: 'What happens if a prospect replies but turns out not to have hiring authority?',
        answer: 'Under our 5-day lead dispute window and Zero-Risk Invariant, non-qualifying replies are immediately credited at $0. If an inbound response fails any standard of the signed 7-Component Qualified Meeting Definition, you are never charged for the lead.',
    },
];

export function getHomeFaqsForSchema(): { q: string; a: string }[] {
    return homeFaqs.map((f) => ({ q: f.question, a: f.answer }));
}
