export type ScorecardSection = {
    id: 's1' | 's2' | 's3' | 's4' | 's5' | 's6' | 's7';
    name: string;
    description: string;
    maxScore: number;
    questions: ScorecardQuestion[];
};

export type ScorecardQuestion = {
    id: number;
    text: string;
    recommendedAction: string;
};

export const scorecard: ScorecardSection[] = [
    {
        id: 's1',
        name: 'Business Overview',
        description: 'How well do you know your own numbers?',
        maxScore: 25,
        questions: [
            { id: 1, text: 'How clearly defined are your recruitment niches/sectors?', recommendedAction: 'Define 1–3 primary niches to focus BD effort.' },
            { id: 2, text: 'Do you know your monthly placement count and track it weekly?', recommendedAction: 'Track placement count weekly as a KPI.' },
            { id: 3, text: 'How disciplined are you about average placement fee tracking?', recommendedAction: 'Ensure fee benchmarked vs market.' },
            { id: 4, text: 'What % of revenue comes from repeat clients?', recommendedAction: 'Target 50%+ repeat; build nurture sequences.' },
            { id: 5, text: 'Is BD ownership clearly defined per consultant?', recommendedAction: 'Define clear BD ownership per consultant.' },
        ],
    },
    {
        id: 's2',
        name: 'Brand & Online Presence',
        description: 'Is the agency findable and credible online?',
        maxScore: 20,
        questions: [
            { id: 6, text: 'Do you have a professional, up-to-date website?', recommendedAction: 'Ensure site shows niche, case studies, contact CTA.' },
            { id: 7, text: 'Is your LinkedIn company page actively posted on (3x+ / week)?', recommendedAction: 'Build a content calendar; mix jobs + insights + wins.' },
            { id: 8, text: 'Do founders / consultants post personally on LinkedIn?', recommendedAction: 'Commit to 2–3 personal posts per week per consultant.' },
            { id: 9, text: 'Do you have case studies or placement proof points published?', recommendedAction: 'Create 3 niche-specific case studies for sales use.' },
        ],
    },
    {
        id: 's3',
        name: 'Business Development',
        description: 'The biggest section — and the one we operate in.',
        maxScore: 60,
        questions: [
            { id: 10, text: 'How do you identify companies that are actively hiring?', recommendedAction: 'Replace manual monitoring with automated hiring signal detection. Most agencies waste 5–10 hours a week here.' },
            { id: 11, text: 'How consolidated are your data sources for prospect lists?', recommendedAction: 'Consolidate to one enriched feed. Multi-source = multi-bottleneck.' },
            { id: 12, text: 'How few hours per week does your team spend manually building lists?', recommendedAction: 'Quantify this cost: hours × rate × 4 = monthly waste. Most agencies are losing $2–5K/month here without seeing it.' },
            { id: 13, text: 'How automated is your contact enrichment (emails, phone, LinkedIn)?', recommendedAction: 'Eliminate manual lookup tools; enrichment should be automatic.' },
            { id: 14, text: 'How many prospects do you add to outreach per month? (volume health)', recommendedAction: 'Set a monthly volume target; measure vs current manual output.' },
            { id: 15, text: 'How well do you personalise outreach at scale?', recommendedAction: 'Build personalisation templates tied to hiring triggers (departure, funding, restructure). Template-only = 1–2% reply. Trigger-tied = 4–6%.' },
            { id: 16, text: 'How structured are your outbound channels (email + LinkedIn + calls)?', recommendedAction: 'Move to structured 5–7 touch sequences per prospect.' },
            { id: 17, text: 'How healthy is your current email reply rate?', recommendedAction: 'If you\'re below 3%, the problem is targeting or copy — not volume. More sends won\'t fix it.' },
            { id: 18, text: 'How healthy is your meeting-booking rate from outreach?', recommendedAction: 'If below 8% reply-to-meeting, review call-to-action and follow-up cadence.' },
            { id: 19, text: 'How healthy is your close rate from discovery meetings?', recommendedAction: 'Track and benchmark; 20–30% meeting-to-brief is healthy.' },
            { id: 20, text: 'Do you have a documented outreach sequence (multi-touch)?', recommendedAction: 'Document a 5–7 touch sequence. Verbal sequences die when the BD person is busy.' },
            { id: 21, text: 'How well do you prevent duplicate or conflicting outreach?', recommendedAction: 'Implement a single source of truth for all outreach activity.' },
        ],
    },
    {
        id: 's4',
        name: 'CRM & Pipeline',
        description: 'Visibility on the deals in flight.',
        maxScore: 20,
        questions: [
            { id: 22, text: 'How fully is BD activity logged in your CRM?', recommendedAction: 'Ensure all BD activity is logged; no spreadsheet-only tracking.' },
            { id: 23, text: 'How clear are your pipeline stages?', recommendedAction: 'Define stages: Prospect → Contacted → Replied → Meeting → Brief → Placed.' },
            { id: 24, text: 'Is pipeline reviewed weekly in team or leadership meetings?', recommendedAction: 'Run a 30-min weekly BD pipeline review with clear actions.' },
            { id: 25, text: 'How disciplined are you about tracking BD KPIs weekly?', recommendedAction: 'If not tracked, start with 3 metrics: outreach volume, reply rate, meetings booked.' },
        ],
    },
    {
        id: 's5',
        name: 'Candidate Delivery',
        description: 'Can you actually deliver when a brief lands?',
        maxScore: 15,
        questions: [
            { id: 26, text: 'How quickly do you present candidates after a brief?', recommendedAction: 'Target <48hr first shortlist; track and publish to clients.' },
            { id: 27, text: 'Do you use any AI tools for candidate sourcing or CV screening?', recommendedAction: 'Identify 1–2 manual sourcing tasks to pilot AI on first.' },
            { id: 28, text: 'How active is your candidate database (contacted in last 90 days)?', recommendedAction: 'Audit database: total records, contacted last 90 days, contactable.' },
        ],
    },
    {
        id: 's6',
        name: 'Operations & Tech',
        description: 'The stack and the workflows around it.',
        maxScore: 20,
        questions: [
            { id: 29, text: 'How well-mapped is your sourcing & outreach tool stack?', recommendedAction: 'Map current stack, identify overlapping tools and cost savings.' },
            { id: 30, text: 'How clearly do you know which BD tasks are the most manual?', recommendedAction: 'Rank top 3 manual BD tasks by hours/week. Attack highest first. We typically automate these in order: list-building → enrichment → personalisation.' },
            { id: 31, text: 'How systematically have you experimented with AI in recruitment?', recommendedAction: 'Document what\'s been tried, what worked, what didn\'t.' },
            { id: 32, text: 'How well do you know which repetitive back-office tasks eat consultant time?', recommendedAction: 'List top 5 repetitive tasks; prioritise by time cost.' },
        ],
    },
    {
        id: 's7',
        name: 'Strategic Goals',
        description: 'Where is the agency trying to go?',
        maxScore: 20,
        questions: [
            { id: 33, text: 'Is your 12-month revenue target written down and monthly-broken-out?', recommendedAction: 'Break target into monthly placement numbers and required pipeline volume.' },
            { id: 34, text: 'Can you name the single biggest constraint on revenue right now?', recommendedAction: 'Name it clearly; a named constraint is solvable.' },
            { id: 35, text: 'Have you ranked the top 3 processes to automate in the next 6 months?', recommendedAction: 'Rank top 3 and assign an owner + target date to each.' },
            { id: 36, text: 'Do you have measurable success criteria for BD automation 6 months out?', recommendedAction: 'Define in measurable terms: X placements, Y meetings/week, Z reply rate.' },
        ],
    },
];

/** Maps 0-1 percent → band */
export function bandFor(pct: number): { emoji: string; label: string; color: string } {
    if (pct < 0.4) return { emoji: '🔴', label: 'Critical — Act Now', color: 'text-red-600' };
    if (pct < 0.6) return { emoji: '🟠', label: 'High Priority', color: 'text-orange-600' };
    if (pct < 0.8) return { emoji: '🟡', label: 'Improve', color: 'text-yellow-600' };
    return { emoji: '🟢', label: 'Strong', color: 'text-emerald-600' };
}

export function overallVerdict(pct: number): string {
    if (pct < 0.4) return 'Critical — Immediate Action Required. Most of the BD function is missing or ad hoc. The good news: every fix from here is high-leverage.';
    if (pct < 0.6) return 'High — Significant Gaps. You have some BD running, but the system breaks under volume. The next 60 days could 2–3x your output without hiring.';
    if (pct < 0.8) return "Moderate — Good Foundation, Key Gaps. You're past the basics. The remaining gaps are usually in personalisation, signals, and consistency.";
    return "Strong — Optimise & Scale. You're running real BD. The win from here is marginal — make sure RecruitmentOS is actually the right next investment before booking.";
}

export function bdAutoSynthesis(bdAutoPct: number): string {
    if (bdAutoPct < 0.4) return 'Your BD is running on manual effort and goodwill. Every conversation in your pipeline today is one a person had to dig up. That works until it doesn\'t — usually around month 6 of trying to grow. The fix isn\'t to hire more BD people; it\'s to put a system between the data and the conversation. That\'s the lane we operate in.';
    if (bdAutoPct < 0.6) return 'You have pieces. A sourcing tool here, a CRM there, a sequence somebody started building. What you don\'t have is one engine that runs them end-to-end every day. The gap is integration and consistency, not capability. This is where we usually move the needle the fastest — the foundation is already there to plug into.';
    if (bdAutoPct < 0.8) return "You're running a real BD operation. The remaining gains are in (a) earlier signals (catching companies before the job is posted), (b) personalisation at scale, and (c) consistency when the founder is busy delivering. Plenty to work with — and we can scope what's worth automating vs. leaving alone on the fit call.";
    return 'Honest answer: your BD is in better shape than 90% of agencies we talk to. The questions worth our time are: is your pipeline actually full, are you targeting the right ICP, and is delivery keeping up. We\'d rather tell you on the call whether we\'re the right next investment than book you regardless.';
}

/** Tie-breaker priority (highest priority first) — earlier = wins ties. */
const SECTION_TIE_PRIORITY: ScorecardSection['id'][] = ['s3', 's6', 's4', 's2', 's7', 's5', 's1'];

const BD_AUTO_QUESTION_IDS = [10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 30];
const BD_AUTO_MAX = BD_AUTO_QUESTION_IDS.length * 5;

export function computeReport(answers: Record<number, number>) {
    const sectionResults = scorecard.map((sec) => {
        const score = sec.questions.reduce((sum, q) => sum + (answers[q.id] || 0), 0);
        const pct = score / sec.maxScore;
        return { id: sec.id, name: sec.name, score, maxScore: sec.maxScore, pct };
    });
    const totalScore = sectionResults.reduce((sum, s) => sum + s.score, 0);
    const overallPct = totalScore / 180;
    const bdAutoScore = BD_AUTO_QUESTION_IDS.reduce((sum, id) => sum + (answers[id] || 0), 0);
    const bdAutoPct = bdAutoScore / BD_AUTO_MAX;

    // Top 3 fixes — lowest 3 (with tie-breaker)
    const allQuestions = scorecard.flatMap((sec) => sec.questions.map((q) => ({ ...q, sectionId: sec.id })));
    const sorted = allQuestions
        .map((q) => ({ ...q, score: answers[q.id] || 0 }))
        .sort((a, b) => {
            if (a.score !== b.score) return a.score - b.score;
            return SECTION_TIE_PRIORITY.indexOf(a.sectionId) - SECTION_TIE_PRIORITY.indexOf(b.sectionId);
        });
    const topFixes = sorted.slice(0, 3);

    return { sectionResults, totalScore, overallPct, bdAutoScore, bdAutoMax: BD_AUTO_MAX, bdAutoPct, topFixes };
}
