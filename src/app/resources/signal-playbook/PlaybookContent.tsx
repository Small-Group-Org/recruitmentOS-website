'use client';

import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui';
import SkillsGateModal from '@/components/SkillsGateModal';

const sections = [
    {
        number: "01",
        title: "THE PROBLEM",
        body: "Most recruitment agencies start business development at the wrong point. A company posts: 'We're hiring a Senior Software Engineer.' The agency sees the job, finds the hiring manager, sends an email, calls, competes with other agencies, and tries to win the mandate. By that point, everyone can see the opportunity. The better question is: what happened before the job was posted? Maybe the company raised funding. Hired a new VP. Entered a new market. Opened an office. Launched a product. Acquired another company. Lost a senior employee. Changed its technology strategy. Won a major contract. Those events can create hiring demand. The job posting is simply where some of that demand becomes public. Stop only asking: 'What companies are hiring?' Start asking: 'What is happening inside companies that could create hiring demand?' That's the foundation of signal-led BD."
    },
    {
        number: "02",
        title: "THE THREE JOBS OF A RECRUITMENT AGENCY",
        body: "Every agency fundamentally has three jobs: 1. Win clients — generate conversations and turn them into mandates. Where will our next job order come from? 2. Fill roles — turn mandates into qualified candidates and placements. How do we fill this role faster and better? 3. Run the agency — make the business visible, repeatable and manageable. How do we grow without creating the same amount of management complexity? This playbook focuses primarily on the first — and specifically on discover: how do you find companies that could become your next client before everyone else sees the vacancy?"
    },
    {
        number: "03",
        title: "THE SIGNAL-LED BD MODEL",
        body: "A signal is not a job order. It's an indication that something changed inside a company that may create a future hiring requirement.\n\n• Discover → find companies experiencing relevant events\n• Qualify → confirm the company and signal actually matter\n• Identify → find the person who could influence the hiring decision\n• Approach → contact them with a reason connected to what's happening inside the company\n• Follow up → keep the conversation moving\n• Convert → turn it into a hiring discussion, a preferred-supplier relationship, or a job order\n\nThe objective isn't 'generate leads.' It's generate conversations that can become job orders."
    },
    {
        number: "04",
        title: "JOB BOARDS ARE NOT THE ENEMY",
        body: "This isn't about abandoning Indeed, LinkedIn, or Reed. They're useful — they show which companies are hiring, which roles are active, which skills are in demand, which functions are expanding. The problem is depending on them as your only source of demand. Three sources of opportunity: Existing relationships, Visible demand, and Early demand signals. The goal isn't to abandon one source. It's to stop depending on only one."
    },
    {
        number: "05",
        title: "THE LIFE OF A JOB ORDER",
        body: "A job order rarely appears out of nowhere: Company event → Business decision → Organizational change → Potential hiring requirement → Job posting → Agency involvement → Candidate → Placement → Revenue. Most agencies start at 'job posting.' Signal-led BD moves upstream — the objective is to identify company event → potential hiring requirement before the vacancy becomes public."
    },
    {
        number: "06",
        title: "THE 10 SIGNALS TO WATCH",
        body: "The best signal gives you timing, relevance, and a reason to contact someone.\n\n01 — Funding. Don't stop at 'raised $20M.' Ask what they're building, which teams are growing, what leadership said, whether related roles are already appearing.\n02 — New leadership. A new VP Sales often builds under themselves. A new CTO often does the same for engineering.\n03 — Expansion. New geography, market, or business unit. Don't ask 'are you hiring?' Ask: 'What does this expansion require you to build?'\n04 — Product launch. Can create requirements across engineering, product, sales, and support.\n05 — M&A / acquisition. Investigate integration, technology consolidation, duplicate functions.\n06 — Major contract / new customer. Ask: 'What does winning this contract change operationally?'\n07 — Organizational growth. Rapid headcount growth is much stronger stacked with another signal.\n08 — Employee departures. Can trigger backfill, restructuring, or hiring underneath a replacement.\n09 — Technology / organizational change. AI initiative → AI/ML/data talent. Cloud migration → cloud/DevOps talent.\n10 — Job postings. Still worth monitoring — but reframe their role. A posting can be a demand signal on its own, or a confirmation signal that earlier signals were pointing in the right direction."
    },
    {
        number: "07",
        title: "THE SIGNAL STACK",
        body: "One signal is interesting. Multiple independent signals are stronger. Company A raised funding. Interesting. Company B raised funding and hired a VP Engineering. More interesting. Company C raised funding, hired a VP Engineering, is growing headcount, and has open engineering roles. Now investigate. The more independent signals point toward the same outcome, the higher the priority."
    },
    {
        number: "08",
        title: "SIGNAL ≠ HIRING DEMAND",
        body: "This distinction matters most. Funding doesn't automatically mean 'they need recruiters.' A new CTO doesn't automatically mean 'they're building a 20-person team.' An expansion doesn't automatically mean 'there are 15 vacancies.' Signals are clues. Combine evidence. Signal → Context → Evidence → Opportunity. Not: Signal → Pitch."
    },
    {
        number: "09",
        title: "THE SIGNAL SCORING MODEL",
        body: "Score every opportunity across five dimensions, 0–5 each:\n\n• Relevance — does the company fit your industry, geography, size, niche?\n• Signal strength — how strongly could the event indicate future hiring?\n• Recency — how recently did it happen?\n• Hiring evidence — is there additional evidence hiring is underway?\n• Relationship potential — can you reach the decision-maker?\n\nAn 80-person SaaS company that recently raised funding, hired a new VP Sales, and is visibly hiring Sales Engineers might score 23/25 — deserving more attention than a company with one weak signal alone."
    },
    {
        number: "10",
        title: "DON'T CONTACT THE SIGNAL",
        body: "Most agencies detect 'company raised funding' and send 'Hi, I noticed you raised funding, are you hiring?' That's just a generic pitch. Instead: signal → business consequence → person. Signal: company entered Germany. Consequence: they may need to build a German commercial organization. Relevant people: Country Manager, VP Sales, CRO, Head of Talent. The signal gives you the reason to start the conversation. It isn't the pitch itself."
    },
    {
        number: "11",
        title: "WHAT IF THERE IS NO JOB POSTING?",
        body: "This is where the model earns its value. You don't need to pretend you know they're hiring — you're investigating. Instead of 'I saw you're hiring…' try: 'Noticed you've just expanded into the UK…' 'Saw the funding announcement…' 'Noticed you brought in a new VP Engineering…' Then ask about the implication: 'Curious whether building the team out is already part of the next phase.' You're not claiming knowledge you don't have — you're opening a relevant conversation."
    },
    {
        number: "12",
        title: "THE SIGNAL → JOB ORDER WORKFLOW",
        body: "1. Detect the signal (e.g. Series B funding)\n2. Check fit — industry, geography, headcount, niche, existing relationship\n3. Find supporting signals — leadership, employee growth, expansion, product activity\n4. Identify the relevant person — founder, CEO, hiring manager, VP, Head of Talent\n5. Create the reason — lead with why this event matters to their business, not with 'we're a recruitment agency'\n6. Open the conversation using the signal as context\n7. Follow up — observation → insight → question → resource → check-in\n8. Qualify — are they hiring, what roles, how many, when, how are they sourcing, do they use agencies\n9. Convert — requirement → contract → job order"
    },
    {
        number: "13",
        title: "THE OUTREACH SEQUENCE",
        body: "Message 1 — Observation. Mention what changed, connect it to a possible consequence.\nMessage 2 — Insight. Give them something useful before asking anything.\nMessage 3 — Specificity. If they engage, move toward roles, timing, volume, current sourcing, hard-to-fill positions.\nMessage 4 — Proof. Show relevance through similar roles, companies, and markets.\nMessage 5 — Conversion. 'Would it be useful to compare notes on the roles you're planning to build?' The goal is a conversation about hiring, not a demo."
    },
    {
        number: "14",
        title: "WINNING CLIENTS DOESN'T START AND END WITH SIGNALS",
        body: "Signal-led BD is one source among several: New companies (signal-led BD), Visible demand (job boards), Existing clients, Warm leads, Past clients, Placed candidates, and Partners / vendors. Winning clients means generating the next mandate from every viable source of opportunity, not just cold outreach."
    },
    {
        number: "15",
        title: "THE WARM LEAD CONVERSION LAYER",
        body: "A common bottleneck is what happens after someone shows interest. A warm lead may still need follow-up, a candidate presentation, contract terms, supplier onboarding, or internal approval on their side. Track the transition explicitly: Lead → Conversation → Qualified → Contract requested → Contract signed → Job order → Candidate sourcing."
    },
    {
        number: "16",
        title: "THEN COMES FILLING THE ROLE",
        body: "Once the client gives you the mandate, the question changes from 'how do we find the next client' to 'how do we fill this role.' This is the second job: fill roles. A job description needs to become structured requirements — skills, seniority, salary, location, industry, must-haves, nice-to-haves. Strong candidates often match on more than keywords: similar environment, similar problem, similar scale, similar trajectory."
    },
    {
        number: "17",
        title: "THE THIRD JOB: RUN THE AGENCY",
        body: "As an agency wins more mandates and fills more roles, visibility becomes the constraint. Owners need to see client acquisition activity, recruitment pipeline, recruiter capacity, and revenue in one place. The right question isn't 'how many more recruiters should we hire?' It's 'can we add capacity without adding the same amount of management complexity?' The goal is more productive capacity through better systems, not more people at any cost."
    },
    {
        number: "18",
        title: "THE AGENCY OPERATING LOOP",
        body: "Win clients: Discover → Qualify → Reach → Follow up → Contract → Mandate\nFill roles: Understand → Match → Rank → Shortlist → Place\nRun the agency: See → Diagnose → Automate → Improve\nBetter operations create more capacity, which supports better service, which creates more client opportunities, more mandates, more placements, more revenue — and the loop continues."
    },
    {
        number: "19",
        title: "BUILD YOUR OWN SIGNAL MAP",
        body: "Every agency should rank its own top 10 by niche.\n\nTechnology recruitment: funding, CTO hire, VP Engineering hire, product launch, engineering growth, tech migration, new office, major contract, M&A, job postings.\nAccountancy recruitment: new office, acquisition, partner hire, new service line, client growth, regional expansion, leadership changes, employee growth, funding, job postings."
    },
    {
        number: "20",
        title: "A SIGNAL SYSTEM, NOT A SIGNAL LIST",
        body: "A spreadsheet of Company | Signal | Date is not a BD system. A real system answers seven questions: what happened (signal detection), does it matter (qualification), who should we contact (decision-maker ID), why now (signal-specific context), what happens if they don't reply (follow-up), did it become a job (pipeline tracking), did the job become revenue (revenue attribution). That's the difference between collecting signals and turning signals into mandates."
    },
    {
        number: "21",
        title: "IF YOU RUN IT MANUALLY",
        body: "Monday — review new signals. Tuesday — qualify companies. Wednesday — research decision-makers. Thursday — launch outreach. Friday — review signals detected, contacts found, replies, meetings, job orders. As a rough operational estimate, this typically runs 4–6 hours a week of manual research and list-building at modest signal volume, before outreach even starts."
    },
    {
        number: "22",
        title: "THE METRIC THAT MATTERS",
        body: "Don't measure only emails sent, open rates, or connections. Track the full chain: Signal → Company → Qualification → Decision-maker → Conversation → Follow-up → Hiring discussion → Contract → Mandate → Placement → Revenue. That's how you understand whether BD is actually working."
    },
    {
        number: "23",
        title: "SIGNAL TRACKER TEMPLATE",
        body: "Track Company | Signal | Date | Supporting Signal | Decision Maker | Fit Score | Signal Score | Status | Reply | Hiring Opportunity | Job Order. Add signal source, outreach sequence, meeting date, requirement, placement, and revenue over time — that's how you learn which signals actually matter for your agency."
    },
    {
        number: "24",
        title: "THE SIGNAL CHECKLIST",
        body: "• Company: Fits ICP? Right geography and size? Fits our niche?\n• Signal: What changed? Plausible hiring link? Supporting evidence?\n• Person: Who owns the function? Who influences hiring? Can we reach them?\n• Message: Explains why now? About their situation, not ours?\n• Follow-up: Sequence in place? Each step adds value? Tracked?\n• Conversion: Hiring intent revealed? Real requirement? Can it become a mandate?"
    },
    {
        number: "25",
        title: "WHERE RECRUITMENTOS FITS",
        body: "RecruitmentOS isn't best framed as 'AI software for recruitment agencies' — that's too broad. The clearer story: RecruitmentOS is the operating layer for the three jobs of a recruitment agency.\n\n• Win clients — find and activate opportunities, including signals ahead of the job posting\n• Fill roles — turn requirements into structured matching and find strong candidates\n• Run the agency — visibility into pipeline, recruiter activity, and revenue to spot the bottleneck"
    }
];

export default function PlaybookContent() {
    const [isUnlocked, setIsUnlocked] = useState(false);
    const [showModal, setShowModal] = useState(false);
    
    useEffect(() => {
        if (typeof window !== 'undefined') {
            setIsUnlocked(localStorage.getItem('rOS_unlocked') === 'true');
        }
    }, []);

    const visibleSections = isUnlocked ? sections : sections.slice(0, 3);

    return (
        <div className="relative">
            {showModal && (
                <SkillsGateModal 
                    onClose={() => setShowModal(false)} 
                    redirectUrl="" 
                    source="resource_signal_playbook" 
                />
            )}

            <div className="space-y-16 mb-28">
                {visibleSections.map((section) => (
                    <div key={section.number} className="grid grid-cols-1 lg:grid-cols-[80px_1fr] gap-6 lg:gap-12 border-t border-[#E5E5E5] pt-10">
                        <div>
                            <span className="text-4xl font-black text-[#F3F4F6] select-none">{section.number}</span>
                        </div>
                        <div>
                            <h3 className="text-xl font-bold text-[#0A0A0A] mb-4">{section.title}</h3>
                            <div className="text-[#6B7280] text-sm leading-relaxed max-w-3xl space-y-4">
                                {section.body.split('\n').map((paragraph, idx) => (
                                    <p key={idx}>{paragraph}</p>
                                ))}
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {!isUnlocked && (
                <div className="absolute bottom-0 left-0 right-0 h-80 bg-gradient-to-t from-white via-white/90 to-transparent flex flex-col items-center justify-end pb-12">
                    <div className="text-center bg-white shadow-[0_10px_40px_rgba(0,0,0,0.1)] border border-[#E5E5E5] p-8 rounded-2xl max-w-lg mx-auto transform translate-y-8">
                        <h3 className="text-2xl font-bold text-[#0A0A0A] mb-2">Keep reading for free</h3>
                        <p className="text-[#6B7280] text-sm mb-6 font-medium">
                            Unlock the full 25-step playbook and our entire library of templates, AI workflows, and tools. One form, forever free access.
                        </p>
                        <Button onClick={() => setShowModal(true)} className="w-full">
                            Unlock Full Playbook
                        </Button>
                    </div>
                </div>
            )}
        </div>
    );
}
