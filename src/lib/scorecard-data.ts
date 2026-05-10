// 180-point BD Bottleneck Scorecard
// Source: linkedin strategy/new-gtm-strategy/findings/PACKAGING_DELIVERABLES.md Asset 1
// Each item scored 1–5. Section maxes are derived from item count × 5.

export type ScorecardItem = { id: string; text: string };
export type ScorecardSection = {
    id: string;
    title: string;
    primary?: boolean; // BD section is the primary focus
    items: ScorecardItem[];
};

export const sections: ScorecardSection[] = [
    {
        id: 'business',
        title: 'Business Overview',
        items: [
            { id: 'b1', text: 'You can state your monthly placement target and the math behind it' },
            { id: 'b2', text: 'You know your average placement fee and what drives it' },
            { id: 'b3', text: 'You can explain why a hiring manager picks you over an internal recruiter' },
            { id: 'b4', text: 'Your repeat-client revenue % is known and tracked' },
            { id: 'b5', text: 'You have a clear margin model per placement' },
        ],
    },
    {
        id: 'brand',
        title: 'Brand & Online Presence',
        items: [
            { id: 'br1', text: 'Your founder LinkedIn profile makes the niche obvious in 5 seconds' },
            { id: 'br2', text: 'You publish content on at least one channel weekly' },
            { id: 'br3', text: 'Your website passes the "would a hiring manager call you?" test' },
            { id: 'br4', text: 'You have a logo wall or named-client proof somewhere public' },
        ],
    },
    {
        id: 'bd',
        title: 'Business Development — primary focus',
        primary: true,
        items: [
            { id: 'bd1', text: 'You know exactly how many touchpoints/month your placement target requires' },
            { id: 'bd2', text: 'You currently hit that volume (not "we try" — you actually hit it)' },
            { id: 'bd3', text: 'Outreach goes through a documented multi-step sequence (not 1-shot)' },
            { id: 'bd4', text: 'You filter outreach by niche-specific signals (funding, departures, restructures), not just job posts' },
            { id: 'bd5', text: 'Your average cold reply rate is ≥ 3%' },
            { id: 'bd6', text: 'You separate sender domains from your main domain (deliverability hygiene)' },
            { id: 'bd7', text: 'BD is not owned by your most expensive recruiter' },
            { id: 'bd8', text: 'BD is not owned by you (the founder) on Monday morning' },
            { id: 'bd9', text: 'You have a deduplication system to prevent same-prospect double-touching' },
            { id: 'bd10', text: 'You log every reply and every objection — not just the wins' },
            { id: 'bd11', text: 'You know which lead source produces the best meetings (not just the most replies)' },
            { id: 'bd12', text: 'You have a written reply-triage SOP (who responds, in what time, with what)' },
        ],
    },
    {
        id: 'crm',
        title: 'CRM & Pipeline',
        items: [
            { id: 'c1', text: 'Every lead has a `source` tag — you can attribute meetings to channels' },
            { id: 'c2', text: 'You log "buying signals" (BD hire, funding, restructure) on each lead' },
            { id: 'c3', text: 'You have stages: New → Researching → Contacted → Engaged → Discovery → Proposal → Won/Lost/Nurturing' },
            { id: 'c4', text: '"Next Follow-up Date" is a required field, not optional' },
        ],
    },
    {
        id: 'delivery',
        title: 'Candidate Delivery Readiness',
        items: [
            { id: 'd1', text: 'You can fulfil 25 hiring-manager meetings/month with current pipeline' },
            { id: 'd2', text: 'You have a named owner for every inbound lead within 4 hours' },
            { id: 'd3', text: 'You can articulate who handles candidate sourcing if BD volume doubles' },
        ],
    },
    {
        id: 'ops',
        title: 'Operations & Tech',
        items: [
            { id: 'o1', text: 'Your tech stack is documented (Smartlead/ZoomInfo/CRM, who pays for what)' },
            { id: 'o2', text: 'You have weekly numbers — not monthly review of last month' },
            { id: 'o3', text: 'You\'ve A/B tested at least one outreach sequence in the last quarter' },
            { id: 'o4', text: 'You know your sender reputation status across all sending domains' },
        ],
    },
    {
        id: 'strategy',
        title: 'Strategic Goals',
        items: [
            { id: 's1', text: 'You have a 12-month revenue target with monthly milestones' },
            { id: 's2', text: 'You know what would have to be true for BD to NOT be the limiting function' },
            { id: 's3', text: 'You have a clear "we don\'t sell to" list (sectors, sizes, fee bands)' },
            { id: 's4', text: 'You\'ve burned $5K+ on a previous BD tool/agency that didn\'t work' },
        ],
    },
];

export const totalItems = sections.reduce((s, sec) => s + sec.items.length, 0);
export const totalMax = totalItems * 5;
