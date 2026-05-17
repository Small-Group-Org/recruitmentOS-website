export type Bracket = {
    id: 'starter' | 'growth' | 'pro';
    name: string;
    capacityLabel: string;
    maxPlacements: number;
    monthlyUsd: number;
    roiMultiplier: number;
    capabilityBullets: string[];
};

export const brackets: Bracket[] = [
    {
        id: 'starter',
        name: 'Starter',
        capacityLabel: 'up to 4 placements/mo',
        maxPlacements: 4,
        monthlyUsd: 1300,
        roiMultiplier: 24,
        capabilityBullets: [
            'Qualified hiring-manager meetings, booked',
            'Outreach engine operated on your stack',
            'Weekly pipeline reporting',
            'Reply triage — only positive intent reaches your recruiters',
        ],
    },
    {
        id: 'growth',
        name: 'Growth',
        capacityLabel: 'up to 10 placements/mo',
        maxPlacements: 10,
        monthlyUsd: 2750,
        roiMultiplier: 26,
        capabilityBullets: [
            'Everything in Starter',
            'Daily list curation at higher volume',
            'A/B sequence testing + monthly iteration',
            'Quarterly Business Review with placement attribution',
        ],
    },
    {
        id: 'pro',
        name: 'Pro',
        capacityLabel: 'up to 25 placements/mo',
        maxPlacements: 25,
        monthlyUsd: 6500,
        roiMultiplier: 31,
        capabilityBullets: [
            'Everything in Growth',
            'Multi-niche signal sourcing',
            'Dedicated weekly sync with Tushar',
            'Priority handover SLA (under 4h)',
        ],
    },
];

/** Pick the bracket whose capacity covers `placementsPerMo`. Returns null at edges. */
export function pickBracket(placementsPerMo: number): Bracket | null {
    if (!isFinite(placementsPerMo) || placementsPerMo <= 0) return null;
    if (placementsPerMo > 25) return null;
    return brackets.find((b) => placementsPerMo <= b.maxPlacements) ?? null;
}
