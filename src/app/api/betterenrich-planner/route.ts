import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { text, model = 'deepseek/deepseek-chat', useMock = false } = body;

    // Retrieve API keys from headers or fallback to environment variables
    const openrouterKey = req.headers.get('x-openrouter-key') || process.env.OPENROUTER_API_KEY;
    const betterenrichKey = req.headers.get('x-betterenrich-key') || process.env.BETTERENRICH_API_KEY;

    if (!text || text.trim() === '') {
      return NextResponse.json({ error: 'Targeting requirements text is required.' }, { status: 400 });
    }

    let parsedCriteria = {
      locations: [] as string[],
      industries: [] as string[],
      companySize: { min: null as number | null, max: null as number | null },
      decisionMakers: [] as string[],
      seniorities: [] as string[],
      departments: [] as string[],
    };

    let apiRawResponse: any = null;
    let isActualApiCall = false;

    // 1. Parse text using OpenRouter or fallback to Mock Parser
    if (openrouterKey && !useMock) {
      try {
        const systemPrompt = `You are a B2B targeting data engineer. Your task is to parse unstructured recruitment/sales targeting requirements into structured search criteria.
Return ONLY a valid JSON object matching this TypeScript type:
{
  locations: string[]; // cities, regions, or countries, e.g. ["London", "Dublin"]
  industries: string[]; // e.g. ["Finance & Banking", "Insurance"]
  companySize: {
    min: number | null; // e.g. 100
    max: number | null; // e.g. 5000
  };
  decisionMakers: string[]; // job titles, e.g. ["CTO", "CIO", "Head of Transformation"]
  seniorities: string[]; // Must ONLY contain values from this exact enum: ["senior", "manager", "entry", "mid-level", "director", "c_suite", "intern", "founder", "owner", "head", "vp", "partner"]
  departments: string[]; // Must ONLY contain values from this exact enum: ["c_suite", "executive", "founder", "engineering_technical", "data_science", "software_development", "technology_operations", "marketing", "design", "finance", "accounting", "human_resources", "information_technology", "legal", "operations", "sales", "business_development", "customer_success"]
}
Do not include any explanation, markdown formatting, or markdown code block syntax. Output ONLY valid, minified JSON.`;

        const orResponse = await fetch('https://openrouter.ai/api/v1/chat/completions', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${openrouterKey}`,
            'Content-Type': 'application/json',
            'HTTP-Referer': 'https://hirerecruitmentos.com',
            'X-Title': 'RecruitmentOS Outbound Sizing Planner',
          },
          body: JSON.stringify({
            model: model,
            messages: [
              { role: 'system', content: systemPrompt },
              { role: 'user', content: `Parse the following targeting text:\n\n${text}` },
            ],
            response_format: { type: 'json_object' },
            temperature: 0.1,
          }),
        });

        if (!orResponse.ok) {
          const errText = await orResponse.text();
          throw new Error(`OpenRouter error: ${orResponse.status} - ${errText}`);
        }

        const orData = await orResponse.json();
        const contentStr = orData.choices?.[0]?.message?.content?.trim() || '{}';
        parsedCriteria = JSON.parse(contentStr);
      } catch (err: any) {
        console.error('Error calling OpenRouter:', err);
        // Fallback to local parsing if LLM call fails
        parsedCriteria = fallbackParse(text);
      }
    } else {
      // Local fallback parsing (simulate LLM)
      parsedCriteria = fallbackParse(text);
    }

    // Ensure companySize and array structures exist
    if (!parsedCriteria.companySize) {
      parsedCriteria.companySize = { min: null, max: null };
    }
    if (!parsedCriteria.seniorities) parsedCriteria.seniorities = [];
    if (!parsedCriteria.departments) parsedCriteria.departments = [];

    // 2. Formulate BetterEnrich Payloads
    // People Search Payload
    const peopleSearchBody: any = {
      page: 0,
      size: 10,
    };

    const accountFilter: any = {};
    if (parsedCriteria.locations && parsedCriteria.locations.length > 0) {
      accountFilter.location = {
        any: {
          include: parsedCriteria.locations,
        },
      };
    }
    if (parsedCriteria.industries && parsedCriteria.industries.length > 0) {
      // Map to lowercase to match BetterEnrich IndustryEnum
      accountFilter.industry = {
        any: {
          include: parsedCriteria.industries.map(ind => ind.toLowerCase()),
        },
      };
    }
    if (parsedCriteria.companySize && (parsedCriteria.companySize.min !== null || parsedCriteria.companySize.max !== null)) {
      accountFilter.employeeSize = {
        type: 'RANGE',
        range: [
          {
            start: parsedCriteria.companySize.min ?? 1,
            end: parsedCriteria.companySize.max ?? 100000,
          },
        ],
      };
    }

    if (Object.keys(accountFilter).length > 0) {
      peopleSearchBody.account = accountFilter;
    }

    const contactFilter: any = {};
    
    // Map job titles (decisionMakers)
    if (parsedCriteria.decisionMakers && parsedCriteria.decisionMakers.length > 0) {
      contactFilter.experience = {
        current: {
          title: {
            any: {
              include: {
                mode: 'SMART',
                content: parsedCriteria.decisionMakers,
              },
            },
          },
        },
      };
    }

    // Map Seniority Level
    if (parsedCriteria.seniorities && parsedCriteria.seniorities.length > 0) {
      contactFilter.seniority = {
        any: {
          include: parsedCriteria.seniorities,
        },
      };
    }

    // Map Department / Function
    if (parsedCriteria.departments && parsedCriteria.departments.length > 0) {
      contactFilter.departmentAndFunction = {
        any: {
          include: parsedCriteria.departments,
        },
      };
    }

    if (Object.keys(contactFilter).length > 0) {
      peopleSearchBody.contact = contactFilter;
    }

    // Company Search Payload
    const companySearchBody: any = {
      page: 0,
      size: 10,
    };
    if (parsedCriteria.locations && parsedCriteria.locations.length > 0) {
      companySearchBody.location = {
        any: {
          include: parsedCriteria.locations,
        },
      };
    }
    if (parsedCriteria.industries && parsedCriteria.industries.length > 0) {
      companySearchBody.industry = {
        any: {
          include: parsedCriteria.industries.map(ind => ind.toLowerCase()),
        },
      };
    }
    if (parsedCriteria.companySize && (parsedCriteria.companySize.min !== null || parsedCriteria.companySize.max !== null)) {
      companySearchBody.employeeSize = {
        type: 'RANGE',
        range: [
          {
            start: parsedCriteria.companySize.min ?? 1,
            end: parsedCriteria.companySize.max ?? 100000,
          },
        ],
      };
    }

    // 3. Execute BetterEnrich API Calls or Mock them
    let peopleCount = 0;
    let companyCount = 0;

    if (betterenrichKey && !useMock) {
      try {
        isActualApiCall = true;
        // Call People Search API
        const peopleResponse = await fetch('https://app.betterenrich.com/api/v1/people-search', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${betterenrichKey}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(peopleSearchBody),
        });

        if (peopleResponse.ok) {
          const peopleData = await peopleResponse.json();
          peopleCount = peopleData.totalElements || 0;
          apiRawResponse = peopleData;
        } else {
          const errText = await peopleResponse.text();
          console.error(`BetterEnrich People Search Error: ${peopleResponse.status} - ${errText}`);
          peopleCount = simulateCount(parsedCriteria, true);
        }

        // Call Company Search API
        const companyResponse = await fetch('https://app.betterenrich.com/api/v1/company-search', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${betterenrichKey}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(companySearchBody),
        });

        if (companyResponse.ok) {
          const companyData = await companyResponse.json();
          companyCount = companyData.totalElements || 0;
        } else {
          companyCount = simulateCount(parsedCriteria, false);
        }
      } catch (err) {
        console.error('Error calling BetterEnrich API:', err);
        // Fallback to simulation
        peopleCount = simulateCount(parsedCriteria, true);
        companyCount = simulateCount(parsedCriteria, false);
      }
    } else {
      // Simulate counts based on parsed parameters
      peopleCount = simulateCount(parsedCriteria, true);
      companyCount = simulateCount(parsedCriteria, false);
    }

    // 4. Dispatch log to Express backend database
    try {
      const backendUrl = process.env.BACKEND_API_URL || 'http://localhost:4000';
      const ipAddress = req.headers.get('x-forwarded-for') || req.headers.get('x-real-ip') || '';
      const userAgent = req.headers.get('user-agent') || '';

      await fetch(`${backendUrl}/api/v1/betterenrich-planner/searches`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          rawText: text,
          parsedCriteria,
          peopleCount,
          companyCount,
          isActualApiCall,
          sessionId: body.sessionId || null,
          ipAddress,
          userAgent,
          email: body.email || null,
          name: body.name || null,
          currentProcess: body.currentProcess || null,
          painPoint: body.painPoint || null,
          sendReport: !!body.sendReport,
        }),
      });
    } catch (dbErr) {
      console.error('Failed to dispatch search record to backend database:', dbErr);
    }

    return NextResponse.json({
      parsedCriteria,
      peopleSearchBody,
      companySearchBody,
      peopleCount,
      companyCount,
      isActualApiCall,
      apiRawResponse: apiRawResponse || {
        message: "Simulated response (Enter B2B Database API Key in settings to fetch live data)",
        totalElements: peopleCount,
        content: [
          {
            id: "simulated-lead-1",
            fullName: "Alex Mercer",
            title: parsedCriteria.decisionMakers[0] || "Chief Technology Officer",
            companyName: "Fintech Dynamics",
            email: "alex.mercer@fintechdynamics.co.uk",
            linkedin: "https://www.linkedin.com/in/alex-mercer-fintech",
            location: parsedCriteria.locations[0] || "London",
            companySize: `${parsedCriteria.companySize.min || 100}-${parsedCriteria.companySize.max || 5000} staff`,
            industry: parsedCriteria.industries[0] || "Financial Services",
          },
          {
            id: "simulated-lead-2",
            fullName: "Sarah Jenkins",
            title: parsedCriteria.decisionMakers[1] || parsedCriteria.decisionMakers[0] || "Head of Transformation",
            companyName: "Apex Insurance Group",
            email: "s.jenkins@apex-insure.com",
            linkedin: "https://www.linkedin.com/in/sarah-jenkins-transformation",
            location: parsedCriteria.locations[1] || parsedCriteria.locations[0] || "Dublin",
            companySize: `${parsedCriteria.companySize.min || 100}-${parsedCriteria.companySize.max || 5000} staff`,
            industry: parsedCriteria.industries[1] || parsedCriteria.industries[0] || "Insurance",
          }
        ]
      }
    });

  } catch (error: any) {
    console.error('Planner API Route Error:', error);
    return NextResponse.json({ error: error.message || 'Internal Server Error' }, { status: 500 });
  }
}

// Simple deterministic rule-based parser as a fallback if LLM is unavailable or keys are missing
function fallbackParse(text: string) {
  const lowercaseText = text.toLowerCase();
  
  // Extract locations
  const locationsList = ['london', 'greater london', 'manchester', 'greater manchester', 'dublin', 'ireland', 'uk', 'united kingdom', 'new york', 'san francisco'];
  const locations = locationsList
    .filter(loc => lowercaseText.includes(loc))
    .map(loc => loc.split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' '));

  // Extract industries
  const industriesList = ['finance', 'banking', 'insurance', 'fintech', 'regtech', 'paytech', 'insuretech', 'bfsi', 'nbfc', 'technology', 'manufacturing', 'retail'];
  const industries = industriesList
    .filter(ind => lowercaseText.includes(ind))
    .map(ind => {
      if (ind === 'bfsi') return 'BFSI';
      if (ind === 'nbfc') return 'NBFC';
      return ind.charAt(0).toUpperCase() + ind.slice(1);
    });

  // Extract company size
  let minSize: number | null = null;
  let maxSize: number | null = null;
  const sizeMatch = text.match(/(\d+)\s*[–-]\s*(\d+,?\d*)/);
  if (sizeMatch) {
    minSize = parseInt(sizeMatch[1].replace(/,/g, ''), 10);
    maxSize = parseInt(sizeMatch[2].replace(/,/g, ''), 10);
  } else {
    // defaults
    if (lowercaseText.includes('100')) { minSize = 100; maxSize = 5000; }
  }

  // Extract decision makers
  const dmList = ['cto', 'cio', 'coo', 'head of transformation', 'programme director', 'director', 'vice president', 'vp', 'founder', 'ceo', 'cfo', 'data engineer', 'business analyst', 'programme manager'];
  const decisionMakers = dmList
    .filter(dm => lowercaseText.includes(dm))
    .map(dm => {
      if (dm.length <= 3) return dm.toUpperCase();
      return dm.split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
    });

  return {
    locations: locations.length > 0 ? locations : ['London', 'Dublin'],
    industries: industries.length > 0 ? industries : ['Finance & Banking', 'Insurance'],
    companySize: { min: minSize || 100, max: maxSize || 5000 },
    decisionMakers: decisionMakers.length > 0 ? decisionMakers : ['CTO', 'CIO', 'Head of Transformation'],
    seniorities: lowercaseText.includes('director') ? ['director'] : lowercaseText.includes('head') ? ['head'] : ['c_suite'],
    departments: lowercaseText.includes('tech') || lowercaseText.includes('engineer') ? ['engineering_technical'] : ['finance']
  };
}

// Generate realistic simulated counts based on targeting strictness
function simulateCount(criteria: any, isPeople: boolean): number {
  let base = isPeople ? 45000 : 3500;
  
  // Strictness multipliers
  const locCount = criteria.locations?.length || 0;
  const indCount = criteria.industries?.length || 0;
  const dmCount = criteria.decisionMakers?.length || 0;
  
  if (locCount > 0) base = base * Math.min(1, locCount * 0.25);
  if (indCount > 0) base = base * Math.min(1, indCount * 0.3);
  if (dmCount > 0 && isPeople) base = base * Math.min(1, dmCount * 0.2);
  
  // Filter by size
  if (criteria.companySize) {
    const range = (criteria.companySize.max || 5000) - (criteria.companySize.min || 100);
    if (range < 500) base = base * 0.2;
    else if (range < 2000) base = base * 0.5;
  }

  return Math.max(12, Math.round(base + (Math.random() * base * 0.1)));
}
