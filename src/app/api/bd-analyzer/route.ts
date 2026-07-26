import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const {
      leadGen = '',
      outreach = '',
      bottlenecks = '',
      metrics = '',
      goals = '',
      email = '',
      name = '',
      website = '',
      useMock = false,
      clientReport = null,
      marketData = null,
    } = body;

    const openrouterKey = req.headers.get('x-openrouter-key') || process.env.OPENROUTER_API_KEY;

    // Prompt definition
    const systemPrompt = `You are a world-class B2B Outbound Growth Architect and Business Development Auditor who specialises in the recruitment and staffing industry.
Your job is to analyze the user's business development (BD) system, score its maturity, diagnose critical leaks, and design a custom 5-phase outbound blueprint. CRITICALLY: for each bottleneck the user mentions, you must describe SPECIFICALLY how RecruitmentOS solves it.

Return ONLY a valid JSON object matching this exact TypeScript interface:
{
  overallScore: number; // 0 to 100
  verdict: string; // A high-level, hard-hitting diagnosis (2-3 sentences) summarizing their situation and how we can fix it. If they provide very sparse inputs (e.g. "no clients", "nothing"), focus on the challenge of starting from zero and building a foundation, rather than hallucinating specific tools they use.
  categories: [
    {
      name: "Lead Data & Targeting";
      score: number; // 0 to 100
      critique: string; // Detailed analysis of what is wrong with their data source/targeting method based on their inputs.
      fix: string; // Actionable advice on how to implement high-fidelity database mapping and live API verification using BetterEnrich.
    },
    {
      name: "Infrastructure & Deliverability";
      score: number; // 0 to 100
      critique: string; // Analysis of domain burning, spam risks, warming, or volume risks.
      fix: string; // How to set up secondary domains, configure SPF/DKIM/DMARC, and warming cadences.
    },
    {
      name: "Messaging & Personalization";
      score: number; // 0 to 100
      critique: string; // Analysis of copy quality, generic blasting, templates, or lack of personalization.
      fix: string; // How to write hyper-personalized, psychology-backed sequences that book meetings.
    },
    {
      name: "Operations & Team Overhead";
      score: number; // 0 to 100
      critique: string; // Critique of manual overhead, VA management, time lost, or follow-up leaks.
      fix: string; // How to automate technical steps and only spend time on warm calls.
    }
  ];
  topBottlenecks: string[]; // 1 to 3 key performance leaks identified in their current setup. Be specific to their inputs. If their inputs are empty or very sparse, focus on the lack of a system/foundation. DO NOT hallucinate that they are doing bulk emailing or scraping if they didn't say so.
  bottleneckFixes: Array<{
    bottleneck: string; // The specific bottleneck (quote or closely paraphrase what the user said, or describe their blank-slate situation)
    recruitmentOSFix: string; // Exactly how RecruitmentOS solves this specific problem for them (2-3 sentences, specific and actionable)
    expectedResult: string; // A measurable outcome they can expect
  }>; // One fix per top bottleneck — same count as topBottlenecks
  roadmap: [
    {
      phase: string; // e.g. "Phase 1"
      timeline: string; // e.g. "Week 1-2"
      title: string; // e.g. "Technical Foundation"
      actions: string[]; // 3 precise bullet points of what gets done
    }
    // EXACTLY 5 phases total
  ];
  recommendedPlan: string; // Recommends "Growth Setup", "Revenue Booster", or "Market Dominator" based on their goals/volume
  paybackPeriod: string; // e.g. "30-45 Days", "60 Days" based on their ticket size vs our plan cost
  icp: {
    locations: string[]; // e.g. ["United Kingdom", "United States"] inferred from their inputs. Default to [] if unspecified.
    industries: string[]; // e.g. ["Software Engineering", "Renewables"] inferred from their inputs. Default to [] if unspecified.
    companySize: { min: number | null, max: number | null }; // inferred from inputs, default {min: null, max: null}
    decisionMakers: string[]; // e.g. ["Founder", "VP of Engineering"]. Default to [] if unspecified.
    departments: string[]; // e.g. ["Engineering", "Sales"]. Default to [] if unspecified.
    seniorities: string[]; // e.g. ["C-Suite", "Director"]. Default to [] if unspecified.
  }
}
------------------------------
    `;

    const userBrief = `
--- USER BD INPUTS ---
1. ICP & LEAD GEN:
${leadGen || 'Not provided'}

2. OUTREACH INFRASTRUCTURE & VOLUME:
${outreach || 'Not provided'}

3. CURRENT PAIN POINTS & BOTTLENECKS:
${bottlenecks || 'Not provided'}

4. CURRENT METRICS (OPEN/REPLY/MEETINGS):
${metrics || 'Not provided'}

5. GOALS (target clients/revenue/meetings per month):
${goals || 'Not provided'}
------------------------------
    `;

    let report: any = clientReport;

    if (!report) {
      if (openrouterKey && !useMock) {
        try {
          const orResponse = await fetch('https://openrouter.ai/api/v1/chat/completions', {
            method: 'POST',
            headers: {
              'Authorization': `Bearer ${openrouterKey}`,
              'Content-Type': 'application/json',
              'HTTP-Referer': 'https://www.hirerecruitmentos.com',
              'X-Title': 'RecruitmentOS AI BD Analyzer',
            },
            body: JSON.stringify({
              model: 'google/gemini-2.5-flash',
              messages: [
                { role: 'system', content: systemPrompt },
                { role: 'user', content: userBrief },
              ],
              response_format: { type: 'json_object' },
              temperature: 0.2,
            }),
          });

          if (!orResponse.ok) {
            const errText = await orResponse.text();
            throw new Error(`OpenRouter error: ${orResponse.status} - ${errText}`);
          }

          const orData = await orResponse.json();
          const contentStr = orData.choices?.[0]?.message?.content?.trim() || '{}';
          report = JSON.parse(contentStr);
        } catch (err: any) {
          console.error('Error calling OpenRouter for BD Analyzer:', err);
          return NextResponse.json({ error: `AI Analysis Failed: ${err.message || 'Unknown Error'}` }, { status: 500 });
        }
      } else if (useMock) {
        report = getMockReport(leadGen, outreach, bottlenecks, metrics, goals);
      } else {
        return NextResponse.json({ error: 'OPENROUTER_API_KEY is missing. Add it to your .env file or enable demo mode (useMock: true).' }, { status: 400 });
      }
    }

    // Dispatch log to Express backend database & email sender if email provided
    if (email && email.includes('@')) {
      try {
        const backendUrl = process.env.BACKEND_API_URL || 'http://localhost:4000';
        await fetch(`${backendUrl}/api/v1/bd-analyzer/report`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            email,
            name,
            website,
            inputs: { leadGen, outreach, bottlenecks, metrics, goals },
            report,
            marketData,
          }),
        });
      } catch (dbErr) {
        console.error('Error logging BD report to backend database:', dbErr);
      }
    }

    return NextResponse.json({ success: true, report });
  } catch (err: any) {
    console.error('BD Analyzer API Route error:', err);
    return NextResponse.json({ error: err.message || 'Internal Server Error' }, { status: 500 });
  }
}

function getMockReport(leadGen: string, outreach: string, bottlenecks: string, metrics: string, goals: string = '') {
  // Extract a few target keywords to make the mock report dynamic
  const lowercaseLead = leadGen.toLowerCase();
  const location = lowercaseLead.includes('uk') || lowercaseLead.includes('london') ? 'United Kingdom' : 'United States';
  const industry = lowercaseLead.includes('staffing') || lowercaseLead.includes('recruit') ? 'Staffing & Recruiting' : 'Software Development';
  const title = lowercaseLead.includes('ceo') || lowercaseLead.includes('founder') ? 'Founder / CEO' : 'VP of Engineering';

  // Return a beautiful, structured fallback mock report in case LLM fails or is disabled
  return {
    overallScore: 58,
    verdict: "Your outreach engine is operating below peak efficiency. Leaking pipeline due to manual VA list compilation and unconfigured deliverability protocols. Automating data enrichment and implementing strict domain warming will yield a 3x lift in positive meetings.",
    categories: [
      {
        name: "Lead Data & Targeting",
        score: 65,
        critique: "Relying on manual VAs or static directories introduces high bounce rates and stale contact data.",
        fix: "Transition to live API lookups with real-time SMTP validation. Filter strictly by active hiring signals to focus budget only on high-intent targets."
      },
      {
        name: "Infrastructure & Deliverability",
        score: 45,
        critique: "Sending bulk messages from primary domains or un-warmed secondary domains poses a severe spam risk.",
        fix: "Register 3-5 secondary .co/.com domains, configure SPF, DKIM, and DMARC records, and initiate a 14-day automated warmup sequence before sending."
      },
      {
        name: "Messaging & Personalization",
        score: 60,
        critique: "Generic sales messaging templates result in low reply rates. Need to speak directly to the target's open roles or candidate gaps.",
        fix: "Implement a 3-step personalization framework using Claude to draft context-rich value propositions matching the target hiring profile."
      },
      {
        name: "Operations & Team Overhead",
        score: 62,
        critique: "Your recruiters spend too much time managing scrapers and VAs instead of talking to warm candidates.",
        fix: "Delegate list building and inbox monitoring to automated systems, freeing up 15+ hours per week for live interviews."
      }
    ],
    topBottlenecks: [
      bottlenecks && bottlenecks.length > 5 ? bottlenecks : "Lack of a predictable, automated lead generation system",
      "Need to build a scalable outreach infrastructure from scratch",
      "Manual processes or zero processes bottlenecking revenue growth"
    ],
    bottleneckFixes: [
      {
        bottleneck: bottlenecks && bottlenecks.length > 5 ? bottlenecks : "Lack of a predictable, automated lead generation system",
        recruitmentOSFix: "We implement a complete, end-to-end outbound system for you. We source live, verified decision-maker contacts in real time — no stale CSVs. Every lead is SMTP-validated before entering your outreach pipeline.",
        expectedResult: "A consistent, automated flow of qualified leads matching your exact ICP."
      },
      {
        bottleneck: "Need to build a scalable outreach infrastructure from scratch",
        recruitmentOSFix: "We register 3–5 secondary sending domains on your behalf, configure SPF, DKIM, and DMARC records, and run a 14-day automated warming sequence using Smartlead. Your primary domain is fully protected while you scale.",
        expectedResult: "Outreach domains achieve 70%+ inbox placement within 3 weeks of warming."
      },
      {
        bottleneck: "Manual processes or zero processes bottlenecking revenue growth",
        recruitmentOSFix: "All list building, enrichment, follow-up sequencing, and positive reply triage is handled by our automated systems. You only spend time speaking to warm, interested prospects.",
        expectedResult: "Recovers 15+ hours per week, allowing you to focus purely on closing deals."
      }
    ],
    roadmap: [
      {
        phase: "Phase 1",
        timeline: "Week 1–2",
        title: "Foundation & Deliverability",
        actions: [
          "Register 3 new secondary domains for outreach (e.g., recruit-agency.co)",
          "Set up strict SPF, DKIM, DMARC records on all new domains",
          "Hook domains to an automated warming tool to build sender reputation"
        ]
      },
      {
        phase: "Phase 2",
        timeline: "Week 2–3",
        title: "Targeting & Data Integration",
        actions: [
          "Connect to a live B2B database API to extract target hiring manager leads",
          "Implement real-time email verification to eliminate hard bounces",
          "Map specific job titles to precise decision-maker personas"
        ]
      },
      {
        phase: "Phase 3",
        timeline: "Week 3–4",
        title: "Messaging Architecture",
        actions: [
          "Write 4 customized outreach variations based on target company size",
          "Implement a 3-step multi-channel touch sequence (Email + LinkedIn)",
          "Incorporate psychology-backed hooks using recent hiring news"
        ]
      },
      {
        phase: "Phase 4",
        timeline: "Month 2",
        title: "Campaign Launch & Optimization",
        actions: [
          "Initiate low-volume sending (20 per domain/day) on warmed domains",
          "A/B test subject lines to hit a target 70%+ open rate",
          "Optimize call-to-actions to shift replies from neutral to positive"
        ]
      },
      {
        phase: "Phase 5",
        timeline: "Month 3+",
        title: "Scale & Automated Operations",
        actions: [
          "Increase outreach volume across all inboxes to reach full capacity",
          "Automate positive reply categorization and calendar booking",
          "Conduct monthly audits to maintain domain health and high deliverability"
        ]
      }
    ],
    recommendedPlan: "Revenue Booster",
    paybackPeriod: "30–45 Days",
    icp: {
      locations: [location],
      industries: [industry],
      companySize: { min: 50, max: 1000 },
      decisionMakers: [title, 'Director of Talent'],
      departments: [],
      seniorities: []
    }
  };
}
