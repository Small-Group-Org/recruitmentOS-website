// ─── Pricing data — sourced from pricing-strategy.md (v2, 2026-05-29) ────────

export type LeadVolume = 1000 | 2500 | 5000 | 10000;

export const LEAD_VOLUMES: LeadVolume[] = [1000, 2500, 5000, 10000];

export function formatLeadVolume(v: number): string {
    if (v >= 1000) return `${v / 1000}K`;
    return String(v);
}

// ─── Packages ────────────────────────────────────────────────────────────────

export type PackageId = 'starter' | 'growth' | 'scale' | 'enterprise';

export type Package = {
    id: PackageId;
    name: string;
    tagline: string;
    highlight: boolean; // "Most popular" badge
    includes: string[];
    /** Price per lead-volume tier (null = contact sales) */
    prices: Partial<Record<LeadVolume, number | null>>;
    /** Annual price per lead-volume tier (10 months paid, 12 delivered) */
    annualPrices: Partial<Record<LeadVolume, number | null>>;
};

export const packages: Package[] = [
    {
        id: 'starter',
        name: 'Starter',
        tagline: 'Verified leads export — your outreach, our data.',
        highlight: false,
        includes: [
            'Verified Email + LinkedIn per lead',
            'ICP filters: industry, size, location, hiring signals',
            'CSV / JSON delivery within 72h',
            'One free re-export within 30 days',
        ],
        prices: {
            1000: 49,
            2500: 99,
            5000: 179,
            10000: 299,
        },
        annualPrices: {
            // Annual = monthly × 10 months (2 free). Approx per-volume.
            1000: 409,   // $49 × 10 − rounding
            2500: 825,
            5000: 1490,
            10000: 2490,
        },
    },
    {
        id: 'growth',
        name: 'Growth',
        tagline: 'Leads + fully-managed email outreach on your stack.',
        highlight: true,
        includes: [
            'Everything in Starter',
            'Smartlead campaign setup (sequences, warmup, SPF/DKIM)',
            '3-step AI-personalised email sequence',
            'Deliverability monitoring + inbox placement checks',
            'Weekly campaign analytics report',
            'Smartlead platform access included',
        ],
        prices: {
            1000: 149,
            2500: 249,
            5000: 399,
            10000: 699,
        },
        annualPrices: {
            1000: 1239,
            2500: 2075,
            5000: 3325,
            10000: 5990,
        },
    },
    {
        id: 'scale',
        name: 'Scale',
        tagline: 'Full multichannel BD — email AND LinkedIn, fully managed.',
        highlight: false,
        includes: [
            'Everything in Growth',
            'LinkedIn connection request campaigns',
            'LinkedIn DM sequences (3-step, timed with email)',
            'Multichannel coordination (email + LinkedIn signals synced)',
            'LinkedIn outreach tooling included',
            'Bi-weekly pipeline health report',
        ],
        prices: {
            1000: 299,
            2500: 499,
            5000: 799,
            10000: 1299,
        },
        annualPrices: {
            1000: 2490,
            2500: 4159,
            5000: 6659,
            10000: 10990,
        },
    },
    {
        id: 'enterprise',
        name: 'Enterprise',
        tagline: 'Custom scope for large staffing networks and RPO firms.',
        highlight: false,
        includes: [
            '20K, 50K, 100K+ leads / month',
            'Multi-region targeting (DACH + Nordics, Benelux, etc.)',
            'Custom ICP logic, enrichment fields, data pipeline',
            'White-label delivery option',
            'Full CRM / ATS integration (HubSpot, Salesforce, Lever, Greenhouse)',
            'Dedicated account manager + Slack channel',
            'Phone numbers included',
            'Annual contract with SLA guarantees',
        ],
        prices: {}, // contact sales
        annualPrices: {},
    },
];

// ─── Add-ons ──────────────────────────────────────────────────────────────────

export type AddOn = {
    label: string;
    price: string;
    note?: string;
};

export const addOns: AddOn[] = [
    {
        label: 'Phone number upgrade',
        price: '+$320 / 1K leads',
        note: 'Adds mobile to any package',
    },
    {
        label: 'Extra lead refresh',
        price: '40% off base price',
        note: 'Re-enrich same ICP, 30-day cache',
    },
    {
        label: 'Additional Smartlead sending domain',
        price: '+$49 / domain / mo',
    },
    {
        label: 'ATS / CRM push integration',
        price: '+$199 / mo',
        note: 'Lever, Greenhouse, HubSpot',
    },
    {
        label: 'Custom ICP workshop',
        price: '$299 one-time',
        note: '1h strategy call + ICP brief',
    },
    {
        label: 'LinkedIn automation upgrade',
        price: '+$79 / mo',
        note: 'Dedicated LinkedIn account',
    },
];

// ─── Annual prepay rows ───────────────────────────────────────────────────────

export type AnnualRow = {
    packageName: string;
    volume: string;
    monthly: number;
    annual: number;
};

export const annualRows: AnnualRow[] = [
    { packageName: 'Starter', volume: '10K leads', monthly: 299, annual: 2490 },
    { packageName: 'Growth', volume: '10K leads', monthly: 699, annual: 5990 },
    { packageName: 'Scale', volume: '10K leads', monthly: 1299, annual: 10990 },
];

// ─── Legacy bracket helpers (kept for any page that still imports them) ───────
// These will be removed in a future cleanup pass.

/** @deprecated Use packages instead */
export type Bracket = {
    id: 'starter' | 'growth' | 'pro';
    name: string;
    capacityLabel: string;
    maxPlacements: number;
    monthlyUsd: number;
    buildFeeUsd: number;
    leadsPerMo: string;
    targetPlacements: number;
    roiMultiplier: number;
    capabilityBullets: string[];
};

/** @deprecated */
export const brackets: Bracket[] = [
    {
        id: 'starter',
        name: 'Starter',
        capacityLabel: 'up to 4 placements/mo',
        maxPlacements: 4,
        monthlyUsd: 1300,
        buildFeeUsd: 500,
        leadsPerMo: '2,500',
        targetPlacements: 2,
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
        buildFeeUsd: 750,
        leadsPerMo: '8,750',
        targetPlacements: 7,
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
        buildFeeUsd: 1000,
        leadsPerMo: '25,000',
        targetPlacements: 20,
        roiMultiplier: 31,
        capabilityBullets: [
            'Everything in Growth',
            'Multi-niche signal sourcing',
            'Dedicated weekly sync with Tushar',
            'Priority handover SLA (under 4h)',
        ],
    },
];

/** @deprecated */
export function pickBracket(placementsPerMo: number): Bracket | null {
    if (!isFinite(placementsPerMo) || placementsPerMo <= 0) return null;
    if (placementsPerMo > 25) return null;
    return brackets.find((b) => placementsPerMo <= b.maxPlacements) ?? null;
}
