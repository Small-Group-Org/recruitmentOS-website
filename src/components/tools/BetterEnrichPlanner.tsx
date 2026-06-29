'use client';

import { useState, useEffect, useMemo } from 'react';
import { Button, Card } from '@/components/ui';
import { pricingPlans, PricingPlan } from '@/lib/pricing-data';

// Helper to format numbers nicely
function formatNum(n: number): string {
  if (!isFinite(n) || n <= 0) return '0';
  if (n >= 1000000) return `${(n / 1000000).toFixed(1)}M`;
  if (n >= 1000) return `${(n / 1000).toFixed(1)}K`;
  return n.toLocaleString();
}

// Sample text for prefilling the form
const SAMPLE_TEXT = `LIST 1 — Financial Services & FinTech
Locations
London
Greater London
Manchester
Greater Manchester
Dublin
Industries
Finance & Banking
Insurance
Company Size
100–5,000 Employees
Covers
Fintech
RegTech
PayTech
InsureTech
BFSI
NBFC
Digital Banks
Challenger Banks
Hiring Roles
Data Engineer
Business Analyst
Programme Manager
Decision Makers
CTO
CIO
COO
Head of Transformation
Programme Director`;

const SENIORITY_OPTIONS = [
  "senior",
  "manager",
  "entry",
  "mid-level",
  "director",
  "c_suite",
  "intern",
  "founder",
  "owner",
  "head",
  "vp",
  "partner"
];

const DEPARTMENT_OPTIONS = [
  "c_suite",
  "executive",
  "founder",
  "engineering_technical",
  "data_science",
  "software_development",
  "technology_operations",
  "marketing",
  "design",
  "finance",
  "accounting",
  "human_resources",
  "information_technology",
  "legal",
  "operations",
  "sales",
  "business_development",
  "customer_success"
];

const DECISION_MAKER_OPTIONS = [
  "CTO",
  "CIO",
  "COO",
  "CEO",
  "CFO",
  "VP of Engineering",
  "VP of Technology",
  "Director of Engineering",
  "Director of Technology",
  "Head of Engineering",
  "Head of Technology",
  "Head of Transformation",
  "Programme Director",
  "Engineering Manager",
  "Technical Programme Manager",
  "Data Engineer",
  "Business Analyst",
  "Programme Manager"
];

const INDUSTRY_OPTIONS = [
  "alternative medicine",
  "aviation and aerospace component manufacturing",
  "biotechnology research",
  "chemical manufacturing",
  "education administration programs",
  "environmental services",
  "events services",
  "fundraising",
  "hospitality",
  "information services",
  "international affairs",
  "it services and it consulting",
  "law enforcement",
  "law practice",
  "legislative offices",
  "oil and gas",
  "packaging and containers manufacturing",
  "pharmaceutical manufacturing",
  "printing services",
  "professional training and coaching",
  "real estate",
  "research services",
  "software development",
  "strategic management services",
  "truck transportation",
  "wellness and fitness services",
  "wholesale",
  "wireless services",
  "mining",
  "accounting",
  "airlines and aviation",
  "armed forces",
  "automation machinery manufacturing",
  "business consulting and services",
  "civic and social organizations",
  "civil engineering",
  "computer hardware manufacturing",
  "computers and electronics manufacturing",
  "construction",
  "consumer services",
  "design services",
  "e-learning providers",
  "facilities services",
  "financial services",
  "fisheries",
  "food and beverage manufacturing",
  "glass, ceramics and concrete manufacturing",
  "government relations services",
  "higher education",
  "libraries",
  "machinery manufacturing",
  "medical equipment manufacturing",
  "mobile gaming apps",
  "nanotechnology research",
  "non-profit organizations",
  "outsourcing and offshoring consulting",
  "philanthropic fundraising services",
  "political organizations",
  "public relations and communications services",
  "recreational facilities",
  "religious institutions",
  "restaurants",
  "retail",
  "retail apparel and fashion",
  "semiconductor manufacturing",
  "staffing and recruiting",
  "technology, information and internet",
  "think tanks",
  "translation and localization",
  "travel arrangements",
  "veterinary services",
  "warehousing and storage",
  "wholesale building materials",
  "wholesale import and export",
  "writing and editing",
  "legal services",
  "manufacturing",
  "market research",
  "administration of justice",
  "advertising services",
  "alternative dispute resolution",
  "appliances, electrical, and electronics manufacturing",
  "architecture and planning",
  "beverage manufacturing",
  "book and periodical publishing",
  "computer and network security",
  "computer networking products",
  "dairy product manufacturing",
  "defense and space manufacturing",
  "executive offices",
  "farming",
  "food and beverage services",
  "freight and package transportation",
  "furniture and home furnishings manufacturing",
  "government administration",
  "graphic design",
  "hospitals and health care",
  "human resources services",
  "individual and family services",
  "industrial machinery manufacturing",
  "international trade and development",
  "leasing non-residential real estate",
  "maritime transportation",
  "medical practices",
  "mental health care",
  "motor vehicle manufacturing",
  "museums, historical sites, and zoos",
  "newspaper publishing",
  "paper and forest product manufacturing",
  "personal care product manufacturing",
  "plastics manufacturing",
  "primary and secondary education",
  "public policy offices",
  "public safety",
  "railroad equipment manufacturing",
  "ranching",
  "renewable energy semiconductor manufacturing",
  "retail groceries",
  "retail luxury goods and jewelry",
  "retail office equipment",
  "security and investigations",
  "shipbuilding",
  "spectator sports",
  "sporting goods manufacturing",
  "telecommunications",
  "textile manufacturing",
  "transportation, logistics, supply chain and storage",
  "utilities"
];


export default function BetterEnrichPlanner() {
  // UI states
  const [inputText, setInputText] = useState(SAMPLE_TEXT);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Session & History states
  const [sessionId, setSessionId] = useState('');
  const [recentSearches, setRecentSearches] = useState<any[]>([]);

  // Report Modal states
  const [showReportModal, setShowReportModal] = useState(false);
  const [reportEmail, setReportEmail] = useState('');
  const [reportName, setReportName] = useState('');
  const [currentProcess, setCurrentProcess] = useState('manual');
  const [painPoint, setPainPoint] = useState('time');
  const [reportGenerating, setReportGenerating] = useState(false);
  const [reportSuccess, setReportSuccess] = useState(false);

  // API keys and config states (no longer exposed to user)
  const [openrouterKey, setOpenrouterKey] = useState('');
  const [betterenrichKey, setBetterenrichKey] = useState('');
  const [selectedModel, setSelectedModel] = useState('deepseek/deepseek-chat');
  const [useMockMode, setUseMockMode] = useState(false);

  // Result states
  const [parsedData, setParsedData] = useState<any>(null);
  const [usefulRatio, setUsefulRatio] = useState(33.3); // defaults to 1/3 (33.3%)
  const [activeApiTab, setActiveApiTab] = useState<'people' | 'company' | 'response'>('people');

  // Load API keys, session, and history from localStorage on mount
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const orKey = localStorage.getItem('ro_openrouter_key') || '';
      const beKey = localStorage.getItem('ro_betterenrich_key') || '';
      const model = localStorage.getItem('ro_model') || 'deepseek/deepseek-chat';

      setOpenrouterKey(orKey);
      setBetterenrichKey(beKey);
      setSelectedModel(model);

      // Session setup
      let sessId = localStorage.getItem('betterenrich_session_id') || '';
      if (!sessId) {
        sessId = 'sess_' + Math.random().toString(36).substring(2, 15);
        localStorage.setItem('betterenrich_session_id', sessId);
      }
      setSessionId(sessId);

      // History setup
      const historyStr = localStorage.getItem('betterenrich_recent_searches') || '[]';
      try {
        setRecentSearches(JSON.parse(historyStr));
      } catch (e) {
        setRecentSearches([]);
      }
    }
  }, []);

  // Submit handler
  const handlePlan = async (textToParse = inputText, additionalPayload = {}) => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch('/api/betterenrich-planner', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-openrouter-key': openrouterKey,
          'x-betterenrich-key': betterenrichKey,
        },
        body: JSON.stringify({
          text: textToParse,
          model: selectedModel,
          useMock: useMockMode,
          sessionId: sessionId || undefined,
          ...additionalPayload,
        }),
      });

      if (!res.ok) {
        const errData = await res.json();
        throw new Error(errData.error || 'Failed to process request.');
      }

      const data = await res.json();
      setParsedData(data);

      // Save to recent searches history list (limit to 5)
      if (data && data.parsedCriteria) {
        setRecentSearches(prev => {
          const updated = [
            {
              id: Date.now().toString(),
              timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
              inputText: textToParse,
              data,
            },
            ...prev.filter(item => item.inputText !== textToParse)
          ].slice(0, 5);
          localStorage.setItem('betterenrich_recent_searches', JSON.stringify(updated));
          return updated;
        });
      }
    } catch (err: any) {
      console.error(err);
      setError(err.message || 'An error occurred.');
    } finally {
      setLoading(false);
    }
  };

  // Handler to modify parsed criteria and re-run query
  const handleUpdateCriteria = async (updatedField: string, value: any) => {
    if (!parsedData) return;
    
    const newCriteria = {
      ...parsedData.parsedCriteria,
      [updatedField]: value,
    };

    setLoading(true);
    setError(null);

    try {
      // Re-run the API using the updated structured criteria
      const reconstructedText = `Locations\n${newCriteria.locations.join('\n')}\nIndustries\n${newCriteria.industries.join('\n')}\nCompany Size\n${newCriteria.companySize.min || 100}–${newCriteria.companySize.max || 5000} Employees\nDecision Makers\n${newCriteria.decisionMakers.join('\n')}`;
      await handlePlan(reconstructedText);
    } catch (err: any) {
      setError(err.message || 'Failed to update criteria.');
      setLoading(false);
    }
  };

  const handleGenerateReport = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!reportEmail.trim() || !reportName.trim()) return;
    setReportGenerating(true);
    setError(null);
    try {
      await handlePlan(inputText, {
        email: reportEmail,
        name: reportName,
        currentProcess,
        painPoint,
        sendReport: true,
      });
      setReportSuccess(true);
    } catch (err: any) {
      console.error(err);
      setError(err.message || 'Failed to generate report.');
    } finally {
      setReportGenerating(false);
    }
  };

  // Recommendations Math
  const pricingRecommendations = useMemo(() => {
    if (!parsedData) return null;
    
    const totalLeads = parsedData.peopleCount || 0;
    const usefulLeads = Math.round(totalLeads * (usefulRatio / 100));

    // Map usefulLeads to closest brackets in our pricingPlans options
    const plansRecommendation = pricingPlans.map((plan: PricingPlan) => {
      let selectedOption = plan.options[0];
      for (const option of plan.options) {
        selectedOption = option;
        if (usefulLeads <= option.leads) {
          break;
        }
      }

      return {
        ...plan,
        matchedOption: selectedOption,
        costPerLead: selectedOption.leads > 0 ? (selectedOption.price / selectedOption.leads).toFixed(2) : '0',
      };
    });

    let recommendedPlanId = 'email'; // default
    if (usefulLeads < 300) {
      recommendedPlanId = 'leads';
    } else if (usefulLeads > 4000) {
      recommendedPlanId = 'multichannel';
    }

    return {
      totalLeads,
      usefulLeads,
      plansRecommendation,
      recommendedPlanId,
    };
  }, [parsedData, usefulRatio]);

  // Generate curl commands for developer copy-paste
  const curlCommands = useMemo(() => {
    if (!parsedData) return { people: '', company: '' };
    
    const peopleHeader = betterenrichKey ? `-H "Authorization: Bearer ${betterenrichKey}"` : `-H "Authorization: Bearer YOUR_API_KEY"`;
    const peopleCurl = `curl -X POST https://app.betterenrich.com/api/v1/people-search \\
  -H "Content-Type: application/json" \\
  ${peopleHeader} \\
  -d '${JSON.stringify(parsedData.peopleSearchBody, null, 2)}'`;

    const companyCurl = `curl -X POST https://app.betterenrich.com/api/v1/company-search \\
  -H "Content-Type: application/json" \\
  ${peopleHeader} \\
  -d '${JSON.stringify(parsedData.companySearchBody, null, 2)}'`;

    return { people: peopleCurl, company: companyCurl };
  }, [parsedData, betterenrichKey]);

  return (
    <Card as="section" padding="lg" className="w-full bg-white border border-[#E5E5E5] rounded-2xl shadow-sm relative">
      <div className="flex flex-col gap-6">
        
        {/* Title Block */}
        <div className="flex justify-between items-start gap-4 flex-wrap border-b border-[#F3F4F6] pb-5">
          <div>
            <h2 className="text-xl font-bold text-[#0A0A0A] tracking-tight flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[#FF6A00]" />
              Outbound Sizing & Campaign Planner
            </h2>
            <p className="text-xs text-[#6B7280] font-medium mt-1">
              Analyze your target list, build exact API queries, check lead counts, and match the ideal RecruitmentOS campaign tier.
            </p>
          </div>
        </div>

        {/* Recent Searches Bar (History list) */}
        {recentSearches.length > 0 && (
          <div className="bg-[#FAFAFA] border border-[#E5E5E5] rounded-xl p-3 flex flex-wrap items-center gap-2">
            <span className="text-[10px] font-bold uppercase tracking-widest text-[#6B7280]">Recent Searches:</span>
            {recentSearches.map((item: any) => {
              const loc = item.data.parsedCriteria.locations?.[0] || 'Global';
              const ind = item.data.parsedCriteria.industries?.[0] || 'B2B';
              const summary = `${loc} · ${ind} (${formatNum(item.data.peopleCount)} leads)`;
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    setInputText(item.inputText);
                    setParsedData(item.data);
                  }}
                  className="text-[10px] font-semibold bg-white border border-[#E5E5E5] px-2.5 py-1 rounded-md text-[#0A0A0A] hover:border-[#FF6A00] hover:text-[#FF6A00] transition-colors shadow-xs"
                >
                  {summary} <span className="text-[8px] text-[#9CA3AF] font-mono font-normal">@{item.timestamp}</span>
                </button>
              );
            })}
          </div>
        )}

        {/* Input Text Area and Form Submit */}
        <div className="grid grid-cols-1 gap-4">
          <label className="block">
            <span className="flex justify-between text-xs font-bold uppercase tracking-widest text-[#0A0A0A] mb-2">
              <span>Paste Targeting Brief / Criteria</span>
              <button 
                onClick={() => setInputText(SAMPLE_TEXT)}
                className="text-[10px] font-bold text-[#FF6A00] hover:underline"
              >
                Reset to Sample
              </button>
            </span>
            <textarea
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              rows={12}
              className="w-full px-4 py-3 bg-[#FAFAFA] border border-[#E5E5E5] rounded-xl text-[#0A0A0A] focus:outline-none focus:border-[#FF6A00] focus:bg-white transition-all text-sm font-mono leading-relaxed"
              placeholder="Paste your list details, locations, industries, sizes, hiring roles, decision makers..."
            />
          </label>

          <Button
            onClick={() => handlePlan()}
            variant="dark"
            disabled={loading}
            fullWidth
            className="py-3.5 text-sm font-bold bg-[#0A0A0A] text-white hover:bg-[#FF6A00] transition-all rounded-xl flex items-center justify-center gap-2"
          >
            {loading ? (
              <>
                <svg className="animate-spin h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                </svg>
                Analyzing Brief & Generating Query...
              </>
            ) : (
              'Parse Brief & Fetch Leads Count →'
            )}
          </Button>
        </div>

        {error && (
          <div className="p-4 rounded-xl bg-red-50 border border-red-200 text-xs font-semibold text-red-700 flex items-start gap-2">
            <span className="mt-0.5">⚠️</span>
            <div>
              <p className="font-bold">Error Processing Brief</p>
              <p className="mt-0.5 font-normal opacity-90">{error}</p>
            </div>
          </div>
        )}

        {/* Dashboard Results (conditional) */}
        {parsedData && (
          <div className="space-y-8 border-t border-[#F3F4F6] pt-6 animate-fadeIn">
            
            {/* Top Level Summary Pills & Metric Cards */}
            <div className="grid grid-cols-1 lg:grid-cols-[1fr_1px_1.2fr] gap-8">
              
              {/* 1. Mapped Filters */}
              <div className="space-y-4">
                <div>
                  <h3 className="text-xs font-bold uppercase tracking-widest text-[#FF6A00]">AI-Parsed Targeting Criteria</h3>
                  <p className="text-[11px] text-[#9CA3AF] mt-0.5">Edit fields to dynamically recalculate</p>
                </div>

                <div className="space-y-3.5">
                  {/* Locations */}
                  <div>
                    <span className="block text-[10px] font-bold uppercase tracking-widest text-[#6B7280] mb-1.5">Locations</span>
                    <div className="flex flex-wrap gap-1.5">
                      {parsedData.parsedCriteria.locations.map((loc: string, idx: number) => (
                        <span key={idx} className="inline-flex items-center gap-1 text-xs font-semibold bg-[#FAFAFA] border border-[#E5E5E5] px-2.5 py-1 rounded-md text-[#0A0A0A]">
                          {loc}
                          <button
                            onClick={() => handleUpdateCriteria('locations', parsedData.parsedCriteria.locations.filter((_: any, i: number) => i !== idx))}
                            className="text-[#9CA3AF] hover:text-red-500 font-bold ml-0.5"
                          >
                            ×
                          </button>
                        </span>
                      ))}
                      <button
                        onClick={() => {
                          const val = prompt('Add Location:');
                          if (val) handleUpdateCriteria('locations', [...parsedData.parsedCriteria.locations, val]);
                        }}
                        className="inline-flex items-center text-xs font-bold text-[#FF6A00] hover:underline px-2 py-1"
                      >
                        + Add
                      </button>
                    </div>
                  </div>

                  {/* Industries */}
                  <div>
                    <span className="block text-[10px] font-bold uppercase tracking-widest text-[#6B7280] mb-1.5">Industries</span>
                    <div className="flex flex-wrap gap-1.5 items-center">
                      {parsedData.parsedCriteria.industries.map((ind: string, idx: number) => (
                        <span key={idx} className="inline-flex items-center gap-1 text-xs font-semibold bg-[#FAFAFA] border border-[#E5E5E5] px-2.5 py-1 rounded-md text-[#0A0A0A]">
                          {ind}
                          <button
                            onClick={() => handleUpdateCriteria('industries', parsedData.parsedCriteria.industries.filter((_: any, i: number) => i !== idx))}
                            className="text-[#9CA3AF] hover:text-red-500 font-bold ml-0.5"
                          >
                            ×
                          </button>
                        </span>
                      ))}
                      <select
                        onChange={(e) => {
                          const val = e.target.value;
                          if (val && !parsedData.parsedCriteria.industries?.includes(val)) {
                            handleUpdateCriteria('industries', [...(parsedData.parsedCriteria.industries || []), val]);
                          }
                          e.target.value = '';
                        }}
                        className="text-xs font-bold text-[#FF6A00] bg-transparent border-none outline-none cursor-pointer focus:ring-0"
                        defaultValue=""
                      >
                        <option value="" disabled>+ Add Industry</option>
                        {INDUSTRY_OPTIONS.filter(opt => !parsedData.parsedCriteria.industries?.includes(opt)).map(opt => (
                          <option key={opt} value={opt}>{opt}</option>
                        ))}
                      </select>
                      <button
                        onClick={() => {
                          const val = prompt('Add Custom Industry:');
                          if (val) handleUpdateCriteria('industries', [...parsedData.parsedCriteria.industries, val]);
                        }}
                        className="inline-flex items-center text-xs font-bold text-[#FF6A00] hover:underline px-2 py-1"
                      >
                        + Custom
                      </button>
                    </div>
                  </div>

                  {/* Company Size */}
                  <div>
                    <span className="block text-[10px] font-bold uppercase tracking-widest text-[#6B7280] mb-1.5">Company Size (Employees)</span>
                    <div className="flex items-center gap-2">
                      <input
                        type="number"
                        placeholder="Min"
                        value={parsedData.parsedCriteria.companySize.min || ''}
                        onChange={(e) => {
                          const val = e.target.value === '' ? null : parseInt(e.target.value, 10);
                          handleUpdateCriteria('companySize', { ...parsedData.parsedCriteria.companySize, min: val });
                        }}
                        className="w-24 px-2.5 py-1.5 bg-[#FAFAFA] border border-[#E5E5E5] rounded-md text-xs font-medium focus:outline-none focus:border-[#FF6A00]"
                      />
                      <span className="text-[#9CA3AF] text-xs font-medium">to</span>
                      <input
                        type="number"
                        placeholder="Max"
                        value={parsedData.parsedCriteria.companySize.max || ''}
                        onChange={(e) => {
                          const val = e.target.value === '' ? null : parseInt(e.target.value, 10);
                          handleUpdateCriteria('companySize', { ...parsedData.parsedCriteria.companySize, max: val });
                        }}
                        className="w-24 px-2.5 py-1.5 bg-[#FAFAFA] border border-[#E5E5E5] rounded-md text-xs font-medium focus:outline-none focus:border-[#FF6A00]"
                      />
                    </div>
                  </div>

                  {/* Decision Makers */}
                  <div>
                    <span className="block text-[10px] font-bold uppercase tracking-widest text-[#6B7280] mb-1.5">Decision Makers (Titles)</span>
                    <div className="flex flex-wrap gap-1.5 items-center">
                      {parsedData.parsedCriteria.decisionMakers.map((dm: string, idx: number) => (
                        <span key={idx} className="inline-flex items-center gap-1 text-xs font-semibold bg-[#FAFAFA] border border-[#E5E5E5] px-2.5 py-1 rounded-md text-[#0A0A0A]">
                          {dm}
                          <button
                            onClick={() => handleUpdateCriteria('decisionMakers', parsedData.parsedCriteria.decisionMakers.filter((_: any, i: number) => i !== idx))}
                            className="text-[#9CA3AF] hover:text-red-500 font-bold ml-0.5"
                          >
                            ×
                          </button>
                        </span>
                      ))}
                      <select
                        onChange={(e) => {
                          const val = e.target.value;
                          if (val && !parsedData.parsedCriteria.decisionMakers?.includes(val)) {
                            handleUpdateCriteria('decisionMakers', [...(parsedData.parsedCriteria.decisionMakers || []), val]);
                          }
                          e.target.value = '';
                        }}
                        className="text-xs font-bold text-[#FF6A00] bg-transparent border-none outline-none cursor-pointer focus:ring-0"
                        defaultValue=""
                      >
                        <option value="" disabled>+ Add Title</option>
                        {DECISION_MAKER_OPTIONS.filter(opt => !parsedData.parsedCriteria.decisionMakers?.includes(opt)).map(opt => (
                          <option key={opt} value={opt}>{opt}</option>
                        ))}
                      </select>
                      <button
                        onClick={() => {
                          const val = prompt('Add Custom Job Title / Role:');
                          if (val) handleUpdateCriteria('decisionMakers', [...parsedData.parsedCriteria.decisionMakers, val]);
                        }}
                        className="inline-flex items-center text-xs font-bold text-[#FF6A00] hover:underline px-2 py-1"
                      >
                        + Custom
                      </button>
                    </div>
                  </div>

                  {/* Seniorities */}
                  <div>
                    <span className="block text-[10px] font-bold uppercase tracking-widest text-[#6B7280] mb-1.5">Seniority Levels</span>
                    <div className="flex flex-wrap gap-1.5 items-center">
                      {(parsedData.parsedCriteria.seniorities || []).map((sen: string, idx: number) => (
                        <span key={idx} className="inline-flex items-center gap-1 text-xs font-semibold bg-[#FAFAFA] border border-[#E5E5E5] px-2.5 py-1 rounded-md text-[#0A0A0A]">
                          {sen}
                          <button
                            onClick={() => handleUpdateCriteria('seniorities', parsedData.parsedCriteria.seniorities.filter((_: any, i: number) => i !== idx))}
                            className="text-[#9CA3AF] hover:text-red-500 font-bold ml-0.5"
                          >
                            ×
                          </button>
                        </span>
                      ))}
                      <select
                        onChange={(e) => {
                          const val = e.target.value;
                          if (val && !parsedData.parsedCriteria.seniorities?.includes(val)) {
                            handleUpdateCriteria('seniorities', [...(parsedData.parsedCriteria.seniorities || []), val]);
                          }
                          e.target.value = '';
                        }}
                        className="text-xs font-bold text-[#FF6A00] bg-transparent border-none outline-none cursor-pointer focus:ring-0"
                        defaultValue=""
                      >
                        <option value="" disabled>+ Add Seniority</option>
                        {SENIORITY_OPTIONS.filter(opt => !parsedData.parsedCriteria.seniorities?.includes(opt)).map(opt => (
                          <option key={opt} value={opt}>{opt}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {/* Departments */}
                  <div>
                    <span className="block text-[10px] font-bold uppercase tracking-widest text-[#6B7280] mb-1.5">Departments / Functions</span>
                    <div className="flex flex-wrap gap-1.5 items-center">
                      {(parsedData.parsedCriteria.departments || []).map((dept: string, idx: number) => (
                        <span key={idx} className="inline-flex items-center gap-1 text-xs font-semibold bg-[#FAFAFA] border border-[#E5E5E5] px-2.5 py-1 rounded-md text-[#0A0A0A]">
                          {dept.replace(/_/g, ' ')}
                          <button
                            onClick={() => handleUpdateCriteria('departments', parsedData.parsedCriteria.departments.filter((_: any, i: number) => i !== idx))}
                            className="text-[#9CA3AF] hover:text-red-500 font-bold ml-0.5"
                          >
                            ×
                          </button>
                        </span>
                      ))}
                      <select
                        onChange={(e) => {
                          const val = e.target.value;
                          if (val && !parsedData.parsedCriteria.departments?.includes(val)) {
                            handleUpdateCriteria('departments', [...(parsedData.parsedCriteria.departments || []), val]);
                          }
                          e.target.value = '';
                        }}
                        className="text-xs font-bold text-[#FF6A00] bg-transparent border-none outline-none cursor-pointer focus:ring-0"
                        defaultValue=""
                      >
                        <option value="" disabled>+ Add Department</option>
                        {DEPARTMENT_OPTIONS.filter(opt => !parsedData.parsedCriteria.departments?.includes(opt)).map(opt => (
                          <option key={opt} value={opt}>{opt.replace(/_/g, ' ')}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>
              </div>

              <div className="hidden lg:block bg-[#F3F4F6]" />

              {/* 2. Live Leads Metrics & Usefulness Slider */}
              <div className="flex flex-col gap-4">
                <div>
                  <h3 className="text-xs font-bold uppercase tracking-widest text-[#FF6A00]">Outreach Sizing Calculations</h3>
                  <p className="text-[11px] text-[#9CA3AF] mt-0.5">Real-time counts mapping from B2B Databases</p>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="bg-[#F9FAFB] border border-[#E5E5E5] rounded-xl p-4">
                    <p className="text-[9px] font-bold uppercase tracking-widest text-[#9CA3AF] mb-1">Matching Companies</p>
                    <p className="text-2xl font-black text-[#0A0A0A]">{formatNum(parsedData.companyCount)}</p>
                    <span className="text-[9px] text-[#6B7280] font-medium">Headquarters & branches</span>
                  </div>

                  <div className="bg-[#F9FAFB] border border-[#E5E5E5] rounded-xl p-4">
                    <p className="text-[9px] font-bold uppercase tracking-widest text-[#9CA3AF] mb-1">Total People Leads</p>
                    <p className="text-2xl font-black text-[#0A0A0A]">{formatNum(parsedData.peopleCount)}</p>
                    <span className="text-[9px] text-[#6B7280] font-medium">With verified contact records</span>
                  </div>
                </div>

                {/* Slider Block */}
                <div className="p-4 rounded-xl border border-[#E5E5E5] bg-[#F9FAFB]">
                  <div className="flex items-center justify-between text-xs font-bold uppercase tracking-widest text-[#0A0A0A] mb-2">
                    <span>Outreach Usefulness Ratio</span>
                    <span className="text-[#FF6A00] font-mono">{usefulRatio.toFixed(1)}%</span>
                  </div>
                  <input
                    type="range"
                    min={5}
                    max={100}
                    step={0.5}
                    value={usefulRatio}
                    onChange={(e) => setUsefulRatio(Number(e.target.value))}
                    className="w-full accent-[#FF6A00]"
                  />
                  <div className="flex justify-between text-[9px] text-[#9CA3AF] font-bold uppercase tracking-widest mt-1.5">
                    <button onClick={() => setUsefulRatio(10)} className="hover:text-[#FF6A00]">10% (Strict)</button>
                    <button onClick={() => setUsefulRatio(33.3)} className="hover:text-[#FF6A00]">33.3% (1/3)</button>
                    <button onClick={() => setUsefulRatio(50)} className="hover:text-[#FF6A00]">50% (Broad)</button>
                    <button onClick={() => setUsefulRatio(100)} className="hover:text-[#FF6A00]">100% (All)</button>
                  </div>
                </div>

                {/* Useful Leads Hero */}
                <div className="bg-[#FFF4EB] border border-[#FF6A00]/25 rounded-xl p-4 flex justify-between items-center">
                  <div>
                    <p className="text-[9px] font-bold uppercase tracking-widest text-[#FF6A00] mb-0.5">Useful Target Leads</p>
                    <p className="text-sm font-bold text-[#0A0A0A] leading-tight">
                      For RecruitmentOS Outreach Campaigns
                    </p>
                  </div>
                  <p className="text-3xl font-black text-[#FF6A00] tracking-tight">
                    {formatNum(pricingRecommendations?.usefulLeads || 0)}
                  </p>
                </div>
              </div>
            </div>

            {/* Strategy Report Generation Callout (Premium Card) */}
            <div className="bg-[#0A0A0A] text-white rounded-2xl p-6 relative overflow-hidden border border-zinc-800 shadow-lg flex flex-col md:flex-row justify-between items-center gap-6">
              <div className="absolute right-0 top-0 w-32 h-32 bg-[#FF6A00] rounded-full filter blur-[80px] opacity-20 pointer-events-none" />
              <div className="space-y-2 max-w-xl">
                <span className="inline-flex items-center text-[9px] font-bold uppercase tracking-widest px-2.5 py-0.5 rounded-full bg-[#FF6A00] text-white">
                  ✦ Custom Outbound Blueprint
                </span>
                <h3 className="text-lg font-bold tracking-tight">
                  Get a Customized recruitmentOS Strategy Report
                </h3>
                <p className="text-xs text-zinc-400 leading-relaxed">
                  Generate a comprehensive, tailored campaign blueprint for your target list of <strong className="text-white">{formatNum(parsedData.peopleCount)} decision makers</strong>. It critiques your current process, outlines domain setup, sequences copy tailored to your niche, and details a full ROI plan sent straight to your inbox.
                </p>
              </div>
              <button
                onClick={() => {
                  setShowReportModal(true);
                  setReportSuccess(false);
                }}
                className="py-3.5 px-6 text-xs font-bold bg-[#FF6A00] hover:bg-[#FF8533] text-white transition-all rounded-xl shadow-md shrink-0 flex items-center gap-2 uppercase tracking-wider"
              >
                Generate Free Report & Email Me →
              </button>
            </div>

            {/* RecruitmentOS Pricing Recommendations */}
            <div className="space-y-4 border-t border-[#F3F4F6] pt-6">
              <div>
                <h3 className="text-xs font-bold uppercase tracking-widest text-[#FF6A00]">Recommended Campaign Packages</h3>
                <p className="text-[11px] text-[#6B7280] mt-0.5">
                  Based on your estimated <span className="font-bold text-[#0A0A0A]">{formatNum(pricingRecommendations?.usefulLeads || 0)} useful leads</span> out of {formatNum(parsedData.peopleCount)} total leads.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {pricingRecommendations?.plansRecommendation.map((plan: any) => {
                  const isRecommended = plan.id === pricingRecommendations.recommendedPlanId;
                  return (
                    <div
                      key={plan.id}
                      className={`rounded-2xl border p-5 flex flex-col justify-between transition-all relative ${
                        isRecommended 
                          ? 'border-[#FF6A00] bg-[#FFF4EB]/20 shadow-sm ring-1 ring-[#FF6A00]' 
                          : 'border-[#E5E5E5] bg-white hover:border-[#FF6A00]/40'
                      }`}
                    >
                      {isRecommended && (
                        <span className="absolute -top-2.5 left-1/2 -translate-x-1/2 bg-[#FF6A00] text-white text-[9px] font-bold uppercase tracking-widest px-2.5 py-0.5 rounded-full">
                          ★ RECOMMENDED TIER
                        </span>
                      )}

                      <div>
                        <div className="flex justify-between items-start gap-2 mb-2">
                          <span className="text-[9px] font-bold uppercase tracking-widest text-[#9CA3AF]">
                            {plan.category}
                          </span>
                        </div>
                        <h4 className="text-base font-bold text-[#0A0A0A] mb-1">{plan.name}</h4>
                        <p className="text-xs text-[#6B7280] font-medium leading-relaxed mb-4 min-h-[32px]">{plan.tagline}</p>
                        
                        {/* Price Display */}
                        <div className="border-t border-[#E5E5E5]/60 pt-4 mb-4">
                          <p className="text-[9px] font-bold uppercase tracking-widest text-[#9CA3AF] mb-0.5">Matched Volume Plan</p>
                          <p className="text-xs font-bold text-[#0A0A0A] mb-2">{plan.matchedOption.label}</p>
                          <div className="flex items-baseline gap-1">
                            <span className="text-2xl font-black text-[#0A0A0A]">${plan.matchedOption.price}</span>
                            <span className="text-xs text-[#6B7280] font-semibold">{plan.billing === 'one-off' ? 'one-off' : '/mo'}</span>
                          </div>
                          <p className="text-[10px] text-[#FF6A00] font-mono mt-1 font-bold">{plan.matchedOption.detail}</p>
                        </div>

                        {/* Features List */}
                        <ul className="space-y-2 mb-6">
                          {plan.features.map((feat: string, i: number) => (
                            <li key={i} className="flex items-start gap-2 text-xs text-[#374151] font-medium">
                              <span className="text-[#FF6A00] text-xs leading-none shrink-0 mt-0.5">✓</span>
                              {feat}
                            </li>
                          ))}
                        </ul>
                      </div>

                      <Button
                        href={plan.cta.href}
                        variant={isRecommended ? 'dark' : 'secondary'}
                        fullWidth
                        className="text-xs font-bold py-2.5"
                      >
                        {plan.cta.label} →
                      </Button>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* API Request Payload & Response Explorer (Developer Drawer) */}
            <div className="space-y-3 border-t border-[#F3F4F6] pt-6">
              <div className="flex justify-between items-center flex-wrap gap-3">
                <div>
                  <h3 className="text-xs font-bold uppercase tracking-widest text-[#0A0A0A] flex items-center gap-1.5">
                    <svg className="w-4 h-4 text-[#FF6A00]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                    </svg>
                    Developer API Payload Explorer
                  </h3>
                  <p className="text-[11px] text-[#6B7280] mt-0.5">Copy structured requests ready to run on B2B Leads Finder API</p>
                </div>

                {/* Tabs */}
                <div className="flex bg-[#F3F4F6] p-0.5 rounded-lg border border-[#E5E5E5] text-[10px] font-bold uppercase tracking-wider">
                  <button
                    onClick={() => setActiveApiTab('people')}
                    className={`px-3 py-1.5 rounded-md transition-all ${activeApiTab === 'people' ? 'bg-white text-[#0A0A0A] shadow-sm' : 'text-[#6B7280] hover:text-[#0A0A0A]'}`}
                  >
                    People Search
                  </button>
                  <button
                    onClick={() => setActiveApiTab('company')}
                    className={`px-3 py-1.5 rounded-md transition-all ${activeApiTab === 'company' ? 'bg-white text-[#0A0A0A] shadow-sm' : 'text-[#6B7280] hover:text-[#0A0A0A]'}`}
                  >
                    Company Search
                  </button>
                  <button
                    onClick={() => setActiveApiTab('response')}
                    className={`px-3 py-1.5 rounded-md transition-all ${activeApiTab === 'response' ? 'bg-white text-[#0A0A0A] shadow-sm' : 'text-[#6B7280] hover:text-[#0A0A0A]'}`}
                  >
                    API Response
                  </button>
                </div>
              </div>

              {/* Tab Contents */}
              <div className="bg-[#0A0A0A] rounded-xl overflow-hidden border border-zinc-800 text-xs font-mono text-zinc-300 relative shadow-inner">
                {/* Copy Buttons Row */}
                <div className="absolute right-3 top-3 flex gap-2 z-10">
                  {activeApiTab !== 'response' && (
                    <button
                      onClick={() => {
                        const code = activeApiTab === 'people' ? curlCommands.people : curlCommands.company;
                        navigator.clipboard.writeText(code);
                        alert('cURL command copied to clipboard.');
                      }}
                      className="px-2.5 py-1 bg-zinc-800 hover:bg-zinc-700 text-white font-bold rounded text-[10px] uppercase tracking-wider transition-colors border border-zinc-700"
                    >
                      Copy cURL
                    </button>
                  )}
                  <button
                    onClick={() => {
                      let code = '';
                      if (activeApiTab === 'people') code = JSON.stringify(parsedData.peopleSearchBody, null, 2);
                      else if (activeApiTab === 'company') code = JSON.stringify(parsedData.companySearchBody, null, 2);
                      else code = JSON.stringify(parsedData.apiRawResponse, null, 2);
                      navigator.clipboard.writeText(code);
                      alert('JSON payload copied to clipboard.');
                    }}
                    className="px-2.5 py-1 bg-[#FF6A00] hover:bg-[#FF6A00]/90 text-white font-bold rounded text-[10px] uppercase tracking-wider transition-colors"
                  >
                    Copy JSON
                  </button>
                </div>

                <div className="p-4 pt-12 overflow-x-auto max-h-[360px] leading-relaxed select-all scrollbar-thin">
                  {activeApiTab === 'people' && (
                    <pre className="text-emerald-400">{JSON.stringify(parsedData.peopleSearchBody, null, 2)}</pre>
                  )}
                  {activeApiTab === 'company' && (
                    <pre className="text-sky-400">{JSON.stringify(parsedData.companySearchBody, null, 2)}</pre>
                  )}
                  {activeApiTab === 'response' && (
                    <pre className="text-amber-400">{JSON.stringify(parsedData.apiRawResponse, null, 2)}</pre>
                  )}
                </div>
              </div>
            </div>

          </div>
        )}

      </div>

      {/* STRATEGY REPORT MODAL (OVERLAY) */}
      {showReportModal && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-4" style={{ background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(8px)' }}>
          <div className="w-full max-w-2xl bg-white rounded-2xl shadow-2xl overflow-hidden relative border border-[#E5E5E5] flex flex-col max-h-[90vh] animate-fadeIn">
            {/* Close Button */}
            <button
              onClick={() => setShowReportModal(false)}
              className="absolute top-4 right-4 text-[#9CA3AF] hover:text-[#0A0A0A] transition-colors z-10"
              aria-label="Close modal"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>

            {/* Modal Header */}
            <div className="px-6 py-5 border-b border-[#E5E5E5] bg-[#FAFAFA]">
              <div className="flex items-center gap-2 mb-1.5">
                <span className="text-[9px] font-bold uppercase tracking-widest px-2 py-0.5 rounded bg-[#FFF4EB] text-[#FF6A00]">
                  Campaign Blueprint
                </span>
                <span className="text-xs text-[#9CA3AF] font-semibold">Custom Outbound Report</span>
              </div>
              <h3 className="text-lg font-bold text-[#0A0A0A] tracking-tight">
                {reportSuccess ? 'Your recruitmentOS Campaign Blueprint' : 'Configure Your Outbound Strategy Report'}
              </h3>
            </div>

            {/* Modal Scrollable Body */}
            <div className="p-6 overflow-y-auto scrollbar-thin flex-1">
              {!reportSuccess ? (
                <form onSubmit={handleGenerateReport} className="space-y-5">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-[#0A0A0A] mb-1.5">Full Name</label>
                      <input
                        type="text"
                        required
                        value={reportName}
                        onChange={(e) => setReportName(e.target.value)}
                        placeholder="John Smith"
                        className="w-full border border-[#E5E5E5] rounded-xl px-4 py-2.5 text-sm outline-none focus:border-[#FF6A00] transition-colors text-[#0A0A0A]"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-[#0A0A0A] mb-1.5">Work Email</label>
                      <input
                        type="email"
                        required
                        value={reportEmail}
                        onChange={(e) => setReportEmail(e.target.value)}
                        placeholder="john@youragency.com"
                        className="w-full border border-[#E5E5E5] rounded-xl px-4 py-2.5 text-sm outline-none focus:border-[#FF6A00] transition-colors text-[#0A0A0A]"
                      />
                    </div>
                  </div>

                  {/* Current Process radio selector */}
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-[#0A0A0A] mb-2">How do you currently run BD / Outreach?</label>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                      {[
                        { id: 'manual', label: 'Manual Email / LinkedIn Touchpoints' },
                        { id: 'freelancers', label: 'Hire Virtual Assistants / Freelancers' },
                        { id: 'list_blasting', label: 'Buy static lists & blast templates' },
                        { id: 'referrals', label: 'Referrals & Word-of-mouth only' },
                      ].map((item) => {
                        const isSelected = currentProcess === item.id;
                        return (
                          <button
                            key={item.id}
                            type="button"
                            onClick={() => setCurrentProcess(item.id)}
                            className={`text-left px-4 py-3 rounded-xl border text-xs font-bold transition-all ${
                              isSelected
                                ? 'border-[#FF6A00] bg-[#FFF4EB]/30 text-[#FF6A00]'
                                : 'border-[#E5E5E5] hover:border-[#FF6A00]/40 text-[#374151] bg-white'
                            }`}
                          >
                            {item.label}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Main Pain Point Selector */}
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-[#0A0A0A] mb-2">What is your biggest outreach bottleneck?</label>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                      {[
                        { id: 'time', label: 'Takes too much time / manual effort' },
                        { id: 'replies', label: 'Low response rates / emails ignored' },
                        { id: 'spam', label: 'Deliverability issues / going to spam' },
                        { id: 'dirty_data', label: 'Dirty databases / outdated job titles' },
                      ].map((item) => {
                        const isSelected = painPoint === item.id;
                        return (
                          <button
                            key={item.id}
                            type="button"
                            onClick={() => setPainPoint(item.id)}
                            className={`text-left px-4 py-3 rounded-xl border text-xs font-bold transition-all ${
                              isSelected
                                ? 'border-[#FF6A00] bg-[#FFF4EB]/30 text-[#FF6A00]'
                                : 'border-[#E5E5E5] hover:border-[#FF6A00]/40 text-[#374151] bg-white'
                            }`}
                          >
                            {item.label}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={reportGenerating}
                    className="w-full py-3.5 text-sm font-bold bg-[#0A0A0A] text-white hover:bg-[#FF6A00] transition-colors rounded-xl flex items-center justify-center gap-2 disabled:opacity-50"
                  >
                    {reportGenerating ? (
                      <>
                        <svg className="animate-spin h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                        </svg>
                        Building Custom Blueprint...
                      </>
                    ) : (
                      'Generate & Email My Campaign Blueprint →'
                    )}
                  </button>
                </form>
              ) : (
                /* HIGH-FIDELITY SCROLLABLE REPORT PREVIEW (STEP 2) */
                <div className="space-y-6 animate-fadeIn">
                  {/* Success Alert Banner */}
                  <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-xs font-bold text-emerald-800 flex items-center gap-3">
                    <span className="flex items-center justify-center w-6 h-6 rounded-full bg-emerald-500 text-white font-black text-sm">✓</span>
                    <div>
                      <p className="font-extrabold">Campaign Blueprint Sent Successfully!</p>
                      <p className="mt-0.5 font-medium text-emerald-700 font-sans">
                        We have dispatched a beautifully formatted strategy report to <strong className="underline">{reportEmail}</strong>.
                      </p>
                    </div>
                  </div>

                  {/* Report Body Container (renders premium document design) */}
                  <div className="bg-[#FAFAFA] border border-[#E5E5E5] rounded-2xl p-6 shadow-inner font-sans text-xs text-zinc-700 leading-relaxed space-y-6">
                    {/* Header */}
                    <div className="border-b border-[#E5E5E5] pb-4 flex justify-between items-start gap-4">
                      <div>
                        <span className="text-[8px] font-black uppercase tracking-widest text-[#FF6A00]">Outbound Strategy Document</span>
                        <h4 className="text-sm font-black text-[#0A0A0A] tracking-tight uppercase mt-0.5">
                          Campaign Blueprint for {reportName}
                        </h4>
                      </div>
                      <span className="text-[8px] font-mono bg-zinc-200 px-2 py-0.5 rounded text-zinc-500">CONFIDENTIAL</span>
                    </div>

                    {/* Section: Sizing */}
                    <div>
                      <h5 className="text-[10px] font-extrabold uppercase tracking-wider text-[#0A0A0A] mb-2 border-b-2 border-[#FF6A00] pb-0.5 inline-block">
                        1. Target Market Sizing
                      </h5>
                      <div className="grid grid-cols-2 gap-3 mb-3">
                        <div className="bg-white border border-[#E5E5E5] rounded-lg p-3 text-center">
                          <p className="text-lg font-black text-[#0A0A0A]">{formatNum(parsedData.peopleCount)}</p>
                          <p className="text-[9px] font-bold uppercase tracking-widest text-[#FF6A00] mt-0.5">Total Leads</p>
                        </div>
                        <div className="bg-white border border-[#E5E5E5] rounded-lg p-3 text-center">
                          <p className="text-lg font-black text-[#0A0A0A]">{formatNum(pricingRecommendations?.usefulLeads || 0)}</p>
                          <p className="text-[9px] font-bold uppercase tracking-widest text-[#FF6A00] mt-0.5">Useful Leads</p>
                        </div>
                      </div>
                      <ul className="space-y-1.5 text-[11px] font-medium pl-1">
                        <li><strong>Locations:</strong> {parsedData.parsedCriteria.locations.join(', ')}</li>
                        <li><strong>Industries:</strong> {parsedData.parsedCriteria.industries.join(', ')}</li>
                        <li><strong>Job Titles:</strong> {parsedData.parsedCriteria.decisionMakers.join(', ')}</li>
                        <li><strong>Target Size:</strong> {parsedData.parsedCriteria.companySize.min || 100} to {parsedData.parsedCriteria.companySize.max || 5000} staff</li>
                      </ul>
                    </div>

                    {/* Section: Process Critique */}
                    <div>
                      <h5 className="text-[10px] font-extrabold uppercase tracking-wider text-[#0A0A0A] mb-2 border-b-2 border-[#FF6A00] pb-0.5 inline-block">
                        2. Workflow Diagnosis & Critique
                      </h5>
                      <div className="bg-[#FFF7F0] border-l-4 border-[#FF6A00] p-4 rounded-r-xl rounded-l-md">
                        <p className="font-extrabold text-[#0A0A0A] mb-1 text-[11px]">Constraint identified in your current process:</p>
                        <p className="text-[11px] text-zinc-600 mb-3">
                          {currentProcess === 'manual' && "Running outreach manually on LinkedIn or Gmail is highly personalized but suffers from major scale limitations. A single rep can only send 50–100 messages a day, meaning your pipeline depends entirely on individual hours worked."}
                          {currentProcess === 'freelancers' && "Relying on virtual assistants or freelancers to scrape lists and send messages introduces human error, high management overhead, and high churn. VAs often struggle with technical deliverability, leading to your domains burning."}
                          {currentProcess === 'list_blasting' && "Buying static lists (Apollo/ZoomInfo) and blasting them at high volume is the fastest way to land in the spam folder. Without continuous verification, deliverability suffers, and your replies dwindle to less than 0.5%."}
                          {currentProcess === 'referrals' && "Without a proactive, outbound pipeline, your business depends entirely on referrals and word-of-mouth. While these leads close at high rates, they are unpredictable, making it impossible to forecast growth."}
                        </p>
                        <p className="font-extrabold text-[#FF6A00] mb-0.5 text-[11px]">Recommended Solution Action Plan:</p>
                        <p className="text-[11px] text-zinc-600 font-medium">
                          {painPoint === 'time' && "By automating data enrichment and outreach cadences, we save you 15+ hours per week. Your team only spends time talking to warm candidates/clients who reply positively."}
                          {painPoint === 'replies' && "Our multi-channel sequence writing guarantees highly relevant, context-rich messages. By speaking directly to what the hiring manager is hiring for, we boost positive reply rates by 3–4x."}
                          {painPoint === 'spam' && "We build custom outreach domains and run a strict 14-day inbox warm-up cycle before sending a single message. This keeps your primary domain completely clean and ensures 98%+ deliverability."}
                          {painPoint === 'dirty_data' && "We use live API lookups to verify every decision-maker's direct email and LinkedIn profile in real time. You will never pay for or message dead, bounced, or outdated contacts."}
                        </p>
                      </div>
                    </div>

                    {/* Section: recruitmentOS 5-Phase Timeline */}
                    <div>
                      <h5 className="text-[10px] font-extrabold uppercase tracking-wider text-[#0A0A0A] mb-3 border-b-2 border-[#FF6A00] pb-0.5 inline-block">
                        3. The recruitmentOS 5-Phase Blueprint
                      </h5>
                      <div className="space-y-3 pl-1">
                        {[
                          { timing: 'Week 0–2: Setup & Foundation', desc: `Pull verified list of ${formatNum(parsedData.peopleCount)} decision makers. Register secondary domains and warm up inboxes.` },
                          { timing: 'Week 2–3: Campaign Live', desc: `Launch highly tailored multi-channel sequences (combining direct email, LinkedIn touches, and value assets) speaking to the ${parsedData.parsedCriteria.industries[0] || 'target'} open roles.` },
                          { timing: 'Week 3–4: First Analysis', desc: 'Analyze response metrics, split-test subject lines, optimize sequence copy, and refine targeting criteria.' },
                          { timing: 'Month 2–3: Scale & Optimise', desc: 'Scale volume safely across multiple warmed-up accounts. Stabilize meeting booking rates to hit predictable revenue targets.' }
                        ].map((phase, idx) => (
                          <div key={idx} className="relative pl-5 border-l border-zinc-200">
                            <span className="absolute left-[-4px] top-1.5 w-2 h-2 rounded-full bg-[#FF6A00]" />
                            <p className="font-extrabold text-[#0A0A0A] text-[11px] leading-tight">{phase.timing}</p>
                            <p className="text-[10px] text-zinc-500 mt-0.5 leading-snug">{phase.desc}</p>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Section: Matched Campaign Package */}
                    <div className="border-t border-[#E5E5E5] pt-4 flex flex-col sm:flex-row justify-between items-center gap-4">
                      <div className="text-center sm:text-left">
                        <p className="text-[9px] font-extrabold uppercase tracking-widest text-zinc-400">Recommended outreach tier</p>
                        <h6 className="text-sm font-black text-[#0A0A0A] uppercase">{pricingRecommendations?.recommendedPlanId === 'multichannel' ? 'Scale Accelerator' : (pricingRecommendations?.recommendedPlanId === 'leads' ? 'Growth Seed' : 'Revenue Booster')}</h6>
                      </div>
                      <a
                        href="https://cal.com/tusharm/30min?user=tusharm"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="py-2.5 px-5 text-[10px] font-extrabold bg-[#FF6A00] hover:bg-[#FF8533] text-white transition-colors rounded-xl uppercase tracking-wider"
                      >
                        Book Your Fit Call & Launch →
                      </a>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Modal Footer */}
            <div className="px-6 py-4 border-t border-[#E5E5E5] bg-[#FAFAFA] flex justify-end">
              <button
                onClick={() => setShowReportModal(false)}
                className="py-2 px-4 text-xs font-bold bg-[#0A0A0A] text-white hover:bg-zinc-800 transition-colors rounded-xl"
              >
                {reportSuccess ? 'Done, Close Preview' : 'Cancel & Go Back'}
              </button>
            </div>
          </div>
        </div>
      )}
    </Card>
  );
}

