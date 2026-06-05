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

// ─── Pricing plans (3-tier card layout) ───────────────────────────────────────
// Self-serve leads → managed email → full multichannel BD. Each plan exposes a
// set of volume options the buyer picks from a dropdown on the card.

export type PlanId = 'leads' | 'email' | 'multichannel';

export type PlanVolumeOption = {
    /** Raw lead count, e.g. 500, 2000 */
    leads: number;
    /** Collapsed dropdown label, e.g. "500 leads" / "2,000 leads/mo" */
    label: string;
    /** Price in USD for leads */
    price: number;
    /** Fixed monthly platform fee (if applicable) */
    monthlyPlatformFee?: number;
    /** Sub-line under the price, e.g. "$0.09 / lead" or "6K emails · Smartlead Basic" */
    detail: string;
};

export type PricingPlan = {
    id: PlanId;
    /** Top pill, e.g. "Data only" */
    category: string;
    /** Pill icon key */
    icon: 'data' | 'mail' | 'network';
    name: string;
    tagline: string;
    billing: 'one-off' | 'monthly';
    /** Marks the "Most popular" card */
    highlight: boolean;
    options: PlanVolumeOption[];
    /** Index of the volume option selected by default */
    defaultIndex: number;
    features: string[];
    cta: { label: string; href: string };
};

const CAL_LINK = 'https://cal.com/tusharm/30min?user=tusharm';

export const pricingPlans: PricingPlan[] = [
    {
        id: 'leads',
        category: 'Data only',
        icon: 'data',
        name: 'Growth Seed',
        tagline: 'Signal-detected, enriched contacts. You handle outreach.',
        billing: 'one-off',
        highlight: false,
        defaultIndex: 0,
        options: [
            { leads: 500, label: '500 leads', price: 45, detail: '$0.09 / lead' },
            { leads: 2000, label: '2,000 leads', price: 149, detail: '$0.07 / lead' },
            { leads: 5000, label: '5,000 leads', price: 299, detail: '$0.06 / lead' },
            { leads: 10000, label: '10,000 leads', price: 500, detail: '$0.05 / lead' },
            { leads: 20000, label: '20,000 leads', price: 840, detail: '$0.04 / lead' },
        ],
        features: [
            'Hiring signal detection',
            'Decision-maker enrichment',
            'CSV export',
            'Top-up anytime',
        ],
        cta: { label: 'Get leads', href: CAL_LINK },
    },
    {
        id: 'email',
        category: 'Leads + email',
        icon: 'mail',
        name: 'Revenue Booster',
        tagline: 'We run the campaigns end-to-end. You take the replies.',
        billing: 'monthly',
        highlight: true,
        defaultIndex: 0,
        options: [
            { leads: 2000, label: '2,000 leads', price: 149, monthlyPlatformFee: 226, detail: '6K emails · Smartlead Basic' },
            { leads: 5000, label: '5,000 leads', price: 299, monthlyPlatformFee: 400, detail: '15K emails · Smartlead Pro' },
            { leads: 10000, label: '10,000 leads', price: 500, monthlyPlatformFee: 499, detail: '30K emails · Smartlead Custom' },
            { leads: 20000, label: '20,000 leads', price: 840, monthlyPlatformFee: 659, detail: '60K emails · Smartlead Custom' },
        ],
        features: [
            'Everything in Leads',
            '3-step AI-personalised email per lead',
            'Client dashboard to track every email',
            'Weekly connect with your account manager',
            'Smartlead plan included',
        ],
        cta: { label: 'Book a call', href: CAL_LINK },
    },
    {
        id: 'multichannel',
        category: 'Full BD',
        icon: 'network',
        name: 'Scale Accelerator',
        tagline: 'Email + LinkedIn. Full outsourced BD function.',
        billing: 'monthly',
        highlight: false,
        defaultIndex: 0,
        options: [
            { leads: 2000, label: '2,000 leads', price: 149, monthlyPlatformFee: 350, detail: 'email + LinkedIn sequences' },
            { leads: 5000, label: '5,000 leads', price: 299, monthlyPlatformFee: 550, detail: 'email + LinkedIn sequences' },
            { leads: 10000, label: '10,000 leads', price: 500, monthlyPlatformFee: 799, detail: 'email + LinkedIn sequences' },
            { leads: 20000, label: '20,000 leads', price: 840, monthlyPlatformFee: 1159, detail: 'email + LinkedIn sequences' },
        ],
        features: [
            'Everything in Email outreach',
            'LinkedIn DM sequences',
            'Multi-touch follow-up',
            'Dedicated account manager',
        ],
        cta: { label: 'Book a call', href: CAL_LINK },
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
