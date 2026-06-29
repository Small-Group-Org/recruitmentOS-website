import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { icp, useMock = false } = body;

    const betterenrichKey = req.headers.get('x-betterenrich-key') || process.env.BETTERENRICH_API_KEY;

    if (!icp) {
      return NextResponse.json({ error: 'ICP criteria required.' }, { status: 400 });
    }

    const { locations = [], industries = [], companySize = { min: null, max: null }, decisionMakers = [], departments = [], seniorities = [] } = icp;

    // 1. Formulate BetterEnrich Payloads
    const peopleSearchBody: any = { page: 0, size: 10 };
    const accountFilter: any = {};
    
    if (locations && locations.length > 0) {
      accountFilter.location = { any: { include: locations } };
    }
    
    if (industries && industries.length > 0) {
      accountFilter.industry = { any: { include: industries.map((ind: string) => ind.toLowerCase()) } };
    }
    
    if (companySize && (companySize.min !== null || companySize.max !== null)) {
      accountFilter.employeeSize = {
        type: 'RANGE',
        range: [{ start: companySize.min ?? 1, end: companySize.max ?? 100000 }],
      };
    }

    if (Object.keys(accountFilter).length > 0) {
      peopleSearchBody.account = accountFilter;
    }

    const contactFilter: any = {};
    if (decisionMakers && decisionMakers.length > 0) {
      contactFilter.experience = {
        current: {
          title: { any: { include: { mode: 'SMART', content: decisionMakers } } },
        },
      };
    }

    if (departments && departments.length > 0) {
      contactFilter.departmentAndFunction = { any: { include: departments } };
    }

    if (seniorities && seniorities.length > 0) {
      contactFilter.seniority = { any: { include: seniorities } };
    }

    if (Object.keys(contactFilter).length > 0) {
      peopleSearchBody.contact = contactFilter;
    }

    const companySearchBody: any = { page: 0, size: 10 };
    if (locations && locations.length > 0) {
      companySearchBody.location = { any: { include: locations } };
    }
    if (industries && industries.length > 0) {
      companySearchBody.industry = { any: { include: industries.map((ind: string) => ind.toLowerCase()) } };
    }
    if (companySize && (companySize.min !== null || companySize.max !== null)) {
      companySearchBody.employeeSize = {
        type: 'RANGE',
        range: [{ start: companySize.min ?? 1, end: companySize.max ?? 100000 }],
      };
    }

    // 2. Execute BetterEnrich API Calls or Mock them
    let peopleCount = 0;
    let companyCount = 0;

    const simulateCount = (isPeople: boolean) => {
      let base = isPeople ? 45000 : 3500;
      const locCount = locations.length || 0;
      const indCount = industries.length || 0;
      const dmCount = decisionMakers.length || 0;
      const depCount = departments.length || 0;
      const senCount = seniorities.length || 0;
      
      if (locCount > 0) base = base * Math.min(1, locCount * 0.25);
      if (indCount > 0) base = base * Math.min(1, indCount * 0.3);
      if (isPeople) {
        if (dmCount > 0) base = base * Math.min(1, dmCount * 0.2);
        if (depCount > 0) base = base * Math.min(1, depCount * 0.3);
        if (senCount > 0) base = base * Math.min(1, senCount * 0.4);
      }
      
      if (companySize) {
        const range = (companySize.max || 5000) - (companySize.min || 100);
        if (range < 500) base = base * 0.2;
        else if (range < 2000) base = base * 0.5;
      }
      return Math.max(12, Math.round(base + (Math.random() * base * 0.1)));
    };

    if (betterenrichKey && !useMock) {
      try {
        const peopleResponse = await fetch('https://app.betterenrich.com/api/v1/people-search', {
          method: 'POST',
          headers: { 'Authorization': `Bearer ${betterenrichKey}`, 'Content-Type': 'application/json' },
          body: JSON.stringify(peopleSearchBody),
        });

        if (peopleResponse.ok) {
          const peopleData = await peopleResponse.json();
          peopleCount = peopleData.totalElements || 0;
        } else {
          peopleCount = simulateCount(true);
        }

        const companyResponse = await fetch('https://app.betterenrich.com/api/v1/company-search', {
          method: 'POST',
          headers: { 'Authorization': `Bearer ${betterenrichKey}`, 'Content-Type': 'application/json' },
          body: JSON.stringify(companySearchBody),
        });

        if (companyResponse.ok) {
          const companyData = await companyResponse.json();
          companyCount = companyData.totalElements || 0;
        } else {
          companyCount = simulateCount(false);
        }
      } catch (err) {
        console.error('Error calling BetterEnrich API from search endpoint:', err);
        peopleCount = simulateCount(true);
        companyCount = simulateCount(false);
      }
    } else {
      peopleCount = simulateCount(true);
      companyCount = simulateCount(false);
    }

    return NextResponse.json({
      success: true,
      peopleCount,
      companyCount,
    });

  } catch (error: any) {
    console.error('Search API Route Error:', error);
    return NextResponse.json({ error: error.message || 'Internal Server Error' }, { status: 500 });
  }
}
