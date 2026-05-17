export type Niche = {
    slug: string;
    name: string;
    shortName: string;
    oneLine: string;
    icpDetail: {
        titles: string[];
        headcount: string;
        geo: string;
        fundingStage: string;
    };
    signals: string[];
    disqualify: string[];
    sampleOpener: string;
};

// NOTE: initial 3 niches are placeholders per README open decision #8.
// Tushar to confirm which 3 should ship first (could be tech/finance/healthcare instead).
// `sampleOpener` for each should be reviewed/rewritten by Tushar — generic openers kill the page's quality signal.

export const niches: Niche[] = [
    {
        slug: 'biotech',
        name: 'Biotech & life sciences recruitment',
        shortName: 'Biotech',
        oneLine: 'Clinical, R&D, regulatory and commercial hires for biotech, pharma, and medical-device companies — sourced before the job post exists.',
        icpDetail: {
            titles: ['Director of Clinical Operations', 'VP Regulatory Affairs', 'Head of Translational Medicine', 'Director of Manufacturing', 'CSO / CMO'],
            headcount: '50–500 FTEs',
            geo: 'US (Boston · SF · RTP) · UK (Cambridge · Oxford) · CH (Basel)',
            fundingStage: 'Series B onwards (pre-clinical → commercial)',
        },
        signals: [
            'FDA milestone announcements (IND filings, Phase 2/3 entries, BLA submissions)',
            'Clinical trial registrations on ClinicalTrials.gov',
            'Funding rounds from biotech-focused VCs (ARCH, Flagship, Third Rock, Atlas)',
            'Executive departures from comparable-stage companies',
            'Manufacturing site expansions or new facility leases',
        ],
        disqualify: [
            'Pre-clinical-only with under 50 FTEs — signal layer can\'t see them',
            'Generic "biotech" agencies serving any therapeutic area — niche is too broad to filter',
            'Companies primarily hiring through retained executive search firms',
        ],
        sampleOpener: 'Saw [Company] just disclosed Phase 2 readouts for [program] in their last 10-Q — congrats on the data. Typically when a program hits Phase 2, our biotech clients are scaling clinical ops 3–4 months out. We\'ve placed 12 Directors of Clinical Operations across Series B/C biotechs this year, average time-to-shortlist 6 days. Worth a 20-minute look at the candidate map for [therapeutic area]?',
    },
    {
        slug: 'accounting',
        name: 'Accounting & finance recruitment',
        shortName: 'Accounting',
        oneLine: 'Practice and commercial finance hires for accounting agencies serving mid-market — Controllers, FP&A, audit managers, partners.',
        icpDetail: {
            titles: ['Controller', 'FP&A Manager', 'Director of Finance', 'Audit Manager', 'Tax Senior Manager', 'Partner (audit / tax / advisory)'],
            headcount: '100–2,000 FTEs',
            geo: 'UK (London · Manchester · Birmingham) · US (NYC · Chicago · Atlanta)',
            fundingStage: 'Established mid-market and PE-backed firms',
        },
        signals: [
            'Audit cycle timing (Q3/Q4 hiring surge for January starts)',
            'M&A activity — acquirer needs integration finance team within 60 days',
            'Senior finance departures filed in 8-K disclosures',
            'Practice partner moves between Big 4 and mid-tier firms',
            'PE acquisition announcements — new CFO mandates within 90 days',
        ],
        disqualify: [
            'Generalist staffing agencies without sector specialism',
            'Sub-$50K placement-fee markets — math doesn\'t support our retainer',
            'Bookkeeping / AP-AR-only hires — too low-fee for our cost structure',
        ],
        sampleOpener: 'Saw [Company] announced the acquisition of [target] last month — based on similar deals you\'ll be hiring a senior finance integration lead within 8 weeks. We\'ve placed 9 Controllers post-PE-acquisition this year in your sector. The candidate map for [city] looks pretty strong right now — 14 actively-interested profiles in the Director / Senior Manager band. Worth a look?',
    },
    {
        slug: 'executive-search',
        name: 'Executive search & C-suite recruitment',
        shortName: 'Executive search',
        oneLine: 'Board, C-suite, and senior VP retained search across tech, biotech, financial services, and PE-backed portfolios.',
        icpDetail: {
            titles: ['CEO', 'CFO', 'CTO / CIO', 'COO', 'Chief People Officer', 'SVP / Board Director'],
            headcount: '500+ FTEs (typically PE-backed or PLC)',
            geo: 'Global — US / UK / EU / APAC',
            fundingStage: 'PE-backed mid-market · PLC · pre-IPO',
        },
        signals: [
            'Executive departures filed in 8-K, SEC, or LinkedIn disclosures',
            'PE acquisition announcements — typically trigger CFO / COO mandates within 90 days',
            'Earnings calls signalling leadership-change language ("transition", "succession plan")',
            'Board appointments and chair changes (LinkedIn + corporate filings)',
            'Failed exec hires (departures within 12 months) — repeat search opportunity',
        ],
        disqualify: [
            'Sub-Director-level roles — wrong fee economics for retained search',
            'Companies under $50M revenue — our signal layer fires too rarely',
            'Family-owned businesses without external board governance — buying signals are too opaque',
        ],
        sampleOpener: 'Saw your last 10-Q referenced "evaluating leadership succession" around the CFO seat. Typically when that language shows up, an executive search mandate follows within 60 days. We\'ve closed 7 CFO retained searches in your sector this year — average time-to-offer 42 days. Worth opening the longlist for [sector] to see what the market looks like?',
    },
];

export function getNicheBySlug(slug: string): Niche | undefined {
    return niches.find((n) => n.slug === slug);
}
