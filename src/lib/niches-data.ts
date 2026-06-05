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

// Openers are signal-anchored and intentionally avoid quoting placement counts
// we can't yet defend with case-study data. Re-introduce concrete numbers per
// niche once the case-studies page carries the matching evidence.

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
        sampleOpener: '[First name] — saw [Company] disclosed Phase 2 readouts for [program] in the latest 10-Q. Congrats on the data. In our work with Series B/C biotech, that milestone reliably triggers a clinical-ops scale-up 3–4 months out — Directors of Clinical Operations, Trial Managers, plus a CRA bench. We track that pattern across the sector and can have a shortlist for [therapeutic area] in front of you inside two weeks. Worth 20 minutes to walk through the candidate map?',
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
        sampleOpener: '[First name] — saw [Company] announced the acquisition of [target] last month. Post-deal, the pattern we see is a senior finance integration hire (Controller or Director of Finance) inside 8 weeks, often followed by an FP&A backfill. The [city] market for that band is in a good window right now — strong passive supply, fee pressure still reasonable. Happy to share a no-commitment longlist if it\'s useful. 20-minute call this week or next?',
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
        sampleOpener: '[First name] — your last 10-Q referenced "evaluating leadership succession" around the CFO seat. In our experience that language reliably precedes a retained search mandate inside 60 days. We map executive talent in [sector] continuously and could put a confidential longlist in front of you before the mandate even formally opens. No deck, no pitch — just the market view. Worth a 20-minute conversation?',
    },
];

export function getNicheBySlug(slug: string): Niche | undefined {
    return niches.find((n) => n.slug === slug);
}
