'use client';

import { useState, useEffect, useMemo, useRef } from 'react';
import { Card, Button } from '@/components/ui';
import { pricingPlans } from '@/lib/pricing-data';
import { methodologySteps } from '@/lib/methodology-data';

interface Category {
  name: string;
  score: number;
  critique: string;
  fix: string;
}

interface BottleneckFix {
  bottleneck: string;
  recruitmentOSFix: string;
  expectedResult: string;
}

interface RoadmapPhase {
  phase: string;
  timeline: string;
  title: string;
  actions: string[];
}

interface AnalysisReport {
  overallScore: number;
  verdict: string;
  categories: Category[];
  topBottlenecks: string[];
  bottleneckFixes?: BottleneckFix[];
  roadmap: RoadmapPhase[];
  recommendedPlan: string;
  paybackPeriod: string;
  icp?: {
    locations: string[];
    industries: string[];
    companySize: { min: number | null; max: number | null };
    decisionMakers: string[];
    departments?: string[];
    seniorities?: string[];
  };
}

const DECISION_MAKER_OPTIONS = [
  "CTO", "CIO", "COO", "CEO", "CFO", "Founder", "VP of Engineering", "VP of Technology", 
  "Director of Engineering", "Director of Technology", "Head of Engineering", 
  "Head of Technology", "Engineering Manager", "Data Engineer", "Business Analyst"
];

const INDUSTRY_OPTIONS = [
  "alternative medicine", "aviation and aerospace component manufacturing", "biotechnology research",
  "chemical manufacturing", "education administration programs", "environmental services",
  "events services", "hospitality", "information services", "it services and it consulting",
  "law practice", "oil and gas", "pharmaceutical manufacturing", "real estate", "software development",
  "accounting", "airlines and aviation", "construction", "consumer services", "financial services",
  "higher education", "non-profit organizations", "staffing and recruiting"
];

const DEPARTMENT_OPTIONS = [
  "C-Suite", "Executive", "Founder", "Engineering / Technical", "Data Science", 
  "Software Development", "Technology Operations", "Marketing", "Design", "Finance", 
  "Accounting", "Human Resources", "Information Technology", "Legal", "Operations", 
  "Sales", "Business Development", "Customer Success"
];

const SENIORITY_OPTIONS = [
  "Senior", "Manager", "Entry", "Mid-Level", "Director", "C-Suite", "Intern", 
  "Founder", "Owner", "Head", "VP", "Partner"
];
const formatNum = (n: number) => {
  if (!isFinite(n) || n <= 0) return '0';
  if (n >= 1000000) return `${(n / 1000000).toFixed(1)}M`;
  if (n >= 1000) return `${(n / 1000).toFixed(1)}K`;
  return n.toLocaleString();
};
// ──────────────────────────────────────────────────────────────────────────────
// Helper: map each methodology phase to the bottleneck it fixes
// ──────────────────────────────────────────────────────────────────────────────
const PHASE_BOTTLENECK_MAP: Record<string, string> = {
  '01': 'Stale / un-targeted lead data',
  '02': 'Deliverability & low reply rate',
  '03': 'No data on what works',
  '04': 'Can\'t scale safely',
  '05': 'Manual ops stealing recruiter time',
};

export default function BDAnalyzer() {
  const [step, setStep] = useState<'input' | 'loading' | 'results'>('input');
  const [leadGen, setLeadGen] = useState('');
  const [outreach, setOutreach] = useState('');
  const [bottlenecks, setBottlenecks] = useState('');
  const [metrics, setMetrics] = useState('');
  const [goals, setGoals] = useState('');
  const [loadingStep, setLoadingStep] = useState(0);
  const [apiDone, setApiDone] = useState(false); // tracks when the real API call finishes
  const [report, setReport] = useState<AnalysisReport | null>(null);
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [website, setWebsite] = useState('');
  const [sendingEmail, setSendingEmail] = useState(false);
  const [emailSent, setEmailSent] = useState(false);

  // Inline location input instead of prompt()
  const [locationInputValue, setLocationInputValue] = useState('');
  const locationInputRef = useRef<HTMLInputElement>(null);

  // Animated score counter
  const [displayedScore, setDisplayedScore] = useState(0);

  // Collapsible fix panels per category
  const [expandedFix, setExpandedFix] = useState<number | null>(null);

  const [isEditingIcp, setIsEditingIcp] = useState(false);
  const [editableIcp, setEditableIcp] = useState<AnalysisReport['icp']>({
    locations: [],
    industries: [],
    companySize: { min: null, max: null },
    decisionMakers: [],
    departments: [],
    seniorities: []
  });

  const [error, setError] = useState<string | null>(null);

  // Sync editableIcp when report comes in
  useEffect(() => {
    if (report?.icp) {
      setEditableIcp(report.icp);
    }
  }, [report]);

  // Animate score counter when report loads
  useEffect(() => {
    if (!report) return;
    setDisplayedScore(0);
    const target = report.overallScore;
    const duration = 1200;
    const steps = 60;
    const increment = target / steps;
    let current = 0;
    const interval = setInterval(() => {
      current = Math.min(current + increment, target);
      setDisplayedScore(Math.round(current));
      if (current >= target) clearInterval(interval);
    }, duration / steps);
    return () => clearInterval(interval);
  }, [report]);

  const [simulatedLeadsCount, setSimulatedLeadsCount] = useState(0);
  const [simulatedCompanyCount, setSimulatedCompanyCount] = useState(0);
  const [loadingStats, setLoadingStats] = useState(false);

  // Fetch live stats when ICP changes
  useEffect(() => {
    const activeIcp = editableIcp || report?.icp || { locations: [], industries: [], decisionMakers: [], departments: [], seniorities: [], companySize: {min:null, max:null} };
    
    const isEmpty = (!activeIcp.locations || activeIcp.locations.length === 0) &&
                    (!activeIcp.industries || activeIcp.industries.length === 0) &&
                    (!activeIcp.decisionMakers || activeIcp.decisionMakers.length === 0) &&
                    (!activeIcp.departments || activeIcp.departments.length === 0) &&
                    (!activeIcp.seniorities || activeIcp.seniorities.length === 0) &&
                    (!activeIcp.companySize || (activeIcp.companySize.min === null && activeIcp.companySize.max === null));

    if (isEmpty) {
      setSimulatedLeadsCount(0);
      setSimulatedCompanyCount(0);
      return;
    }

    // Add debouncing to avoid spamming the API
    const timer = setTimeout(async () => {
      setLoadingStats(true);
      try {
        const beKey = localStorage.getItem('ro_betterenrich_key') || '';
        const res = await fetch('/api/betterenrich-search', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', 'x-betterenrich-key': beKey },
          body: JSON.stringify({ icp: activeIcp, useMock: false }),
        });
        const data = await res.json();
        if (res.ok && data.success) {
          setSimulatedLeadsCount(data.peopleCount || 0);
          setSimulatedCompanyCount(data.companyCount || 0);
        }
      } catch (err) {
        console.error('Error fetching live stats:', err);
      } finally {
        setLoadingStats(false);
      }
    }, 600);
    
    return () => clearTimeout(timer);
  }, [editableIcp, report?.icp]);

  // 1/3 campaign plan
  const leadsPerMonth = useMemo(() => Math.round(simulatedLeadsCount / 3), [simulatedLeadsCount]);
  
  const emailsPerDay = useMemo(() => {
    if (leadsPerMonth <= 0) return 0;
    const emailsPerMonth = leadsPerMonth * 3;
    const days = leadsPerMonth <= 500 ? 20 : 22;
    return Math.round(emailsPerMonth / days);
  }, [leadsPerMonth]);

  const emailPlan = useMemo(() => {
    const boosterPlan = pricingPlans.find((p) => p.id === 'email');
    if (!boosterPlan) return null;
    
    // Calculate dynamic price based on exact leadsPerMonth
    let price = 195;
    if (leadsPerMonth <= 500) {
      price = 195;
    } else if (leadsPerMonth <= 3000) {
      const pct = (leadsPerMonth - 500) / 2500;
      price = Math.round(195 + pct * (360 - 195));
    } else if (leadsPerMonth <= 10000) {
      const pct = (leadsPerMonth - 3000) / 7000;
      price = Math.round(360 + pct * (750 - 360));
    } else {
      price = Math.round(750 + (leadsPerMonth - 10000) * 0.05);
    }

    // Determine the tier matching emailsPerDay for visual features
    let matchedOption = boosterPlan.options[0];
    for (const opt of boosterPlan.options) {
      matchedOption = opt;
      if (emailsPerDay <= opt.leads) break;
    }

    // Create a custom option with calculated price and actual stats
    const customOption = {
      ...matchedOption,
      price,
      label: `${emailsPerDay} emails / day`,
      detail: `${formatNum(leadsPerMonth)} leads/mo · All infra included`,
    };

    return { plan: boosterPlan, option: customOption };
  }, [leadsPerMonth, emailsPerDay]);



  const loadingSteps = [
    'Reading your BD system inputs...',
    'Analyzing outreach infrastructure & deliverability...',
    'Auditing lead list quality and targeting precision...',
    'Estimating the number of leads available for your business...',
    'Sizing your addressable market...',
    'Mapping your bottlenecks to RecruitmentOS methodology...',
    'Building your custom campaign plan & pricing...',
  ];

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (step === 'loading') {
      setApiDone(false);
      interval = setInterval(() => {
        setLoadingStep((prev) => {
          // Hold at second-to-last step until API signals done
          const holdAt = loadingSteps.length - 2;
          if (prev < holdAt) return prev + 1;
          return prev; // freeze here until apiDone
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [step]);

  // Advance to final loading step once API responds
  useEffect(() => {
    if (apiDone) {
      setLoadingStep(loadingSteps.length - 1);
    }
  }, [apiDone]);

  const handleAnalyze = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!leadGen || !outreach || !bottlenecks) return;
    setError(null);
    setStep('loading');
    setLoadingStep(0);
    try {
      const openrouterKey = typeof window !== 'undefined' ? localStorage.getItem('ro_openrouter_key') || '' : '';
      const res = await fetch('/api/bd-analyzer', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'x-openrouter-key': openrouterKey },
        body: JSON.stringify({ leadGen, outreach, bottlenecks, metrics, goals, useMock: false }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Analysis request failed');

      if (data.success && data.report) {
        setApiDone(true); // advance loading bar to final step
        setReport(data.report);

        // Auto-send report email if user provided their email upfront
        if (email && email.includes('@')) {
          try {
            await fetch('/api/bd-analyzer', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                leadGen, outreach, bottlenecks, metrics, goals,
                email, name, website,
                clientReport: data.report,
                marketData: {
                  simulatedCompanyCount,
                  simulatedLeadsCount,
                  leadsPerMonth,
                  emailsPerDay,
                },
              }),
            });
            setEmailSent(true);
          } catch (emailErr) {
            console.error('Auto-email send failed:', emailErr);
          }
        }

        setTimeout(() => setStep('results'), 900);
      } else throw new Error(data.error || 'Failed to parse report');
    } catch (err: any) {
      console.error('BD Analyzer error:', err);
      setApiDone(true);
      setTimeout(() => {
        setError(err.message || 'An error occurred during analysis.');
        setStep('input');
      }, 900);
    }
  };

  const handleSendReport = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !report) return;
    setSendingEmail(true);
    try {
      const marketData = {
        simulatedCompanyCount,
        simulatedLeadsCount,
        leadsPerMonth,
        emailsPerDay,
        pricingPlan: emailPlan?.option,
        planGroup: emailPlan?.plan,
      };

      const updatedReport = {
        ...report,
        icp: editableIcp,
      };

      const res = await fetch('/api/bd-analyzer', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          leadGen, outreach, bottlenecks, metrics, goals, 
          email, name, useMock: false,
          clientReport: updatedReport,
          marketData
        }),
      });
      if (res.ok) setEmailSent(true);
    } catch (err) {
      console.error('Error sending report email:', err);
    } finally {
      setSendingEmail(false);
    }
  };

  const handleReset = () => {
    setLeadGen(''); setOutreach(''); setBottlenecks(''); setMetrics(''); setGoals('');
    setReport(null); setEmailSent(false); setEmail(''); setName(''); setWebsite('');
    setStep('input');
  };

  const scoreColor = (s: number) => s >= 80 ? 'text-emerald-600' : s >= 60 ? 'text-amber-500' : 'text-red-500';

  // ─────────────────────────────────────────────────────────────────────────────
  // INPUT STEP
  // ─────────────────────────────────────────────────────────────────────────────
  if (step === 'input') {
    const missingFields = !leadGen || !outreach || !bottlenecks;
    return (
      <Card as="section" padding="lg" className="w-full bg-white border border-[#E5E5E5] rounded-2xl shadow-sm">
        <div className="flex flex-col gap-6">
          <div className="border-b border-[#F3F4F6] pb-5">
            <div className="flex items-center gap-2 mb-1">
              <span className="w-2.5 h-2.5 rounded-full bg-[#FF6A00]" />
              <h2 className="text-xl font-bold text-[#0A0A0A] tracking-tight">AI BD System Analyzer</h2>
            </div>
            <p className="text-xs text-[#6B7280] font-medium">
              Tell us about your current setup. We'll analyze it, search the BetterEnrich people database for your ICP, compare against our proven methodology, and show you exactly how RecruitmentOS fixes your bottlenecks — with pricing.
            </p>
          </div>

          {/* Error banner */}
          {error && (
            <div className="flex items-start gap-3 bg-red-50 border border-red-200 rounded-xl px-4 py-3">
              <span className="text-red-500 font-bold text-sm leading-none mt-0.5 flex-shrink-0">⚠</span>
              <div>
                <p className="text-xs font-bold text-red-700">Analysis Failed</p>
                <p className="text-[11px] text-red-600 font-medium mt-0.5">{error}</p>
                <p className="text-[10px] text-red-400 mt-1">Check your OpenRouter API key in Settings, then try again.</p>
              </div>
              <button onClick={() => setError(null)} className="ml-auto text-red-400 hover:text-red-600 font-bold text-xs flex-shrink-0">✕</button>
            </div>
          )}

          <form onSubmit={handleAnalyze} className="space-y-5">
            <div>
              <label htmlFor="leadGen" className="block text-xs font-bold uppercase tracking-wider text-[#0A0A0A] mb-1">
                1. Your ICP & Lead Generation Setup <span className="text-[#FF6A00]">*</span>
              </label>
              <p className="text-[10px] text-[#9CA3AF] font-medium mb-2">Who do you target? Industry, location, company size, job titles you go after. How do you currently build lists?</p>
              <textarea id="leadGen" required rows={3}
                placeholder="e.g. We target Founders and Heads of HR at UK-based staffing agencies with 50–500 staff. We use Apollo and LinkedIn Sales Nav exports, manually cleaned in Google Sheets by a VA."
                value={leadGen} onChange={(e) => setLeadGen(e.target.value)}
                className={`w-full px-4 py-3 bg-white border rounded-xl text-xs font-medium text-[#0A0A0A] placeholder-[#9CA3AF] focus:outline-none focus:border-[#FF6A00] transition-colors resize-y ${!leadGen && error ? 'border-red-300' : 'border-[#E5E5E5]'}`}
              />
            </div>

            <div>
              <label htmlFor="outreach" className="block text-xs font-bold uppercase tracking-wider text-[#0A0A0A] mb-1">
                2. Outreach Infrastructure & Volume <span className="text-[#FF6A00]">*</span>
              </label>
              <p className="text-[10px] text-[#9CA3AF] font-medium mb-2">How do you send emails? Which tools? How many per day? Separate sending domains set up?</p>
              <textarea id="outreach" required rows={3}
                placeholder="e.g. We send cold emails directly from our main company domain using HubSpot. About 80 emails/day. No secondary domains. 10–15 manual LinkedIn requests daily."
                value={outreach} onChange={(e) => setOutreach(e.target.value)}
                className={`w-full px-4 py-3 bg-white border rounded-xl text-xs font-medium text-[#0A0A0A] placeholder-[#9CA3AF] focus:outline-none focus:border-[#FF6A00] transition-colors resize-y ${!outreach && error ? 'border-red-300' : 'border-[#E5E5E5]'}`}
              />
            </div>

            <div>
              <label htmlFor="bottlenecks" className="block text-xs font-bold uppercase tracking-wider text-[#0A0A0A] mb-1">
                3. Current Bottlenecks & Frustrations <span className="text-[#FF6A00]">*</span>
              </label>
              <p className="text-[10px] text-[#9CA3AF] font-medium mb-2">What's broken right now? What's costing your team time? What results are disappointing?</p>
              <textarea id="bottlenecks" required rows={3}
                placeholder="e.g. Emails keep landing in spam (less than 1% reply rate). High bounce rates from bad list data. VA spends 10+ hours a week cleaning lists instead of helping with interviews."
                value={bottlenecks} onChange={(e) => setBottlenecks(e.target.value)}
                className={`w-full px-4 py-3 bg-white border rounded-xl text-xs font-medium text-[#0A0A0A] placeholder-[#9CA3AF] focus:outline-none focus:border-[#FF6A00] transition-colors resize-y ${!bottlenecks && error ? 'border-red-300' : 'border-[#E5E5E5]'}`}
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label htmlFor="metrics" className="block text-xs font-bold uppercase tracking-wider text-[#0A0A0A] mb-1">
                  4. Current Metrics <span className="font-normal text-[#9CA3AF] normal-case tracking-normal">(optional)</span>
                </label>
                <input id="metrics" type="text"
                  placeholder="e.g. 28% open rate, 0.6% reply, 1–2 meetings/mo"
                  value={metrics} onChange={(e) => setMetrics(e.target.value)}
                  className="w-full px-4 py-3 bg-white border border-[#E5E5E5] rounded-xl text-xs font-medium text-[#0A0A0A] placeholder-[#9CA3AF] focus:outline-none focus:border-[#FF6A00] transition-colors"
                />
              </div>
              <div>
                <label htmlFor="goals" className="block text-xs font-bold uppercase tracking-wider text-[#0A0A0A] mb-1">
                  5. Your Goals <span className="font-normal text-[#9CA3AF] normal-case tracking-normal">(optional)</span>
                </label>
                <input id="goals" type="text"
                  placeholder="e.g. 10 qualified meetings/mo, place 5 candidates, £30K revenue in 3 months"
                  value={goals} onChange={(e) => setGoals(e.target.value)}
                  className="w-full px-4 py-3 bg-white border border-[#E5E5E5] rounded-xl text-xs font-medium text-[#0A0A0A] placeholder-[#9CA3AF] focus:outline-none focus:border-[#FF6A00] transition-colors"
                />
              </div>
            </div>

            {/* ── Lead Capture ── */}
            <div className="pt-5 border-t border-[#F3F4F6]">
              <div className="flex items-center gap-2 mb-3">
                <div className="w-5 h-5 rounded-full bg-[#FFF4EB] border border-[#FF6A00]/30 flex items-center justify-center flex-shrink-0">
                  <span className="text-[#FF6A00] text-[9px] font-black">✉</span>
                </div>
                <p className="text-xs font-bold text-[#0A0A0A]">Where should we send your report?</p>
              </div>
              <p className="text-[10px] text-[#9CA3AF] font-medium mb-3">
                Enter your details and we'll email the full BD audit — including market sizing, roadmap, and campaign pricing — straight to your inbox the moment the analysis is done.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label htmlFor="lead-name" className="block text-[10px] font-bold uppercase tracking-wider text-[#6B7280] mb-1">Your Name <span className="text-[#FF6A00]">*</span></label>
                  <input
                    id="lead-name"
                    type="text"
                    required
                    placeholder="e.g. Sarah Mitchell"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full px-3 py-2.5 bg-white border border-[#E5E5E5] rounded-xl text-xs font-medium text-[#0A0A0A] placeholder-[#9CA3AF] focus:outline-none focus:border-[#FF6A00] transition-colors"
                  />
                </div>
                <div>
                  <label htmlFor="lead-email" className="block text-[10px] font-bold uppercase tracking-wider text-[#6B7280] mb-1">Work Email <span className="text-[#FF6A00]">*</span></label>
                  <input
                    id="lead-email"
                    type="email"
                    required
                    placeholder="e.g. sarah@youragency.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-3 py-2.5 bg-white border border-[#E5E5E5] rounded-xl text-xs font-medium text-[#0A0A0A] placeholder-[#9CA3AF] focus:outline-none focus:border-[#FF6A00] transition-colors"
                  />
                </div>
                <div>
                  <label htmlFor="lead-website" className="block text-[10px] font-bold uppercase tracking-wider text-[#6B7280] mb-1">Agency Website <span className="font-normal text-[#9CA3AF] normal-case tracking-normal">(optional)</span></label>
                  <input
                    id="lead-website"
                    type="url"
                    placeholder="e.g. https://youragency.com"
                    value={website}
                    onChange={(e) => setWebsite(e.target.value)}
                    className="w-full px-3 py-2.5 bg-white border border-[#E5E5E5] rounded-xl text-xs font-medium text-[#0A0A0A] placeholder-[#9CA3AF] focus:outline-none focus:border-[#FF6A00] transition-colors"
                  />
                </div>
              </div>
              <p className="text-[10px] text-[#C4C4C4] font-medium mt-2">🔒 No spam, ever. We only use this to deliver your report and follow up if you'd like to talk.</p>
            </div>

            <div className="flex items-center justify-between gap-4 flex-wrap">
              <div>
                <p className="text-[10px] text-[#9CA3AF] font-medium">AI analysis takes ~20 seconds. We'll search the BetterEnrich people database and map your ICP.</p>
                {missingFields && (
                  <p className="text-[10px] text-[#FF6A00] font-semibold mt-1">⚠ Fields 1, 2 and 3 are required to run the analysis.</p>
                )}
              </div>
              <Button type="submit" variant="dark"
                disabled={missingFields || !name || !email}
                className="bg-[#0A0A0A] text-white hover:bg-[#1C1C1C] rounded-full px-8 py-3 text-xs font-bold transition-all disabled:opacity-50"
              >
                Analyze My BD System →
              </Button>
            </div>
          </form>
        </div>
      </Card>
    );
  }

  // ─────────────────────────────────────────────────────────────────────────────
  // LOADING STEP
  // ─────────────────────────────────────────────────────────────────────────────
  if (step === 'loading') {
    return (
      <Card as="section" padding="lg" className="w-full bg-white border border-[#E5E5E5] rounded-2xl shadow-sm min-h-[440px] flex items-center justify-center">
        <div className="text-center max-w-lg mx-auto space-y-6 py-8">
          <div className="relative w-14 h-14 mx-auto">
            <div className="absolute inset-0 border-4 border-[#FFF4EB] rounded-full" />
            <div className="absolute inset-0 border-4 border-[#FF6A00] rounded-full border-t-transparent animate-spin" />
          </div>
          <div>
            <h3 className="text-base font-bold text-[#0A0A0A] mb-2">Building Your Personalized BD Report</h3>
            <p className="text-xs text-[#FF6A00] font-mono font-bold animate-pulse">{loadingSteps[loadingStep]}</p>
          </div>
          <div className="w-full bg-[#F3F4F6] h-1.5 rounded-full overflow-hidden">
            <div className="bg-[#FF6A00] h-full transition-all duration-1000 ease-out rounded-full"
              style={{ width: `${((loadingStep + 1) / loadingSteps.length) * 100}%` }}
            />
          </div>
          {/* Steps checklist */}
          <div className="text-left space-y-2 max-w-xs mx-auto">
            {loadingSteps.map((ls, i) => (
              <div key={i} className="flex items-center gap-2.5">
                <span className={`w-4 h-4 rounded-full flex-shrink-0 flex items-center justify-center text-[9px] font-bold border ${i < loadingStep ? 'bg-emerald-500 border-emerald-500 text-white' : i === loadingStep ? 'border-[#FF6A00] bg-[#FFF4EB] text-[#FF6A00]' : 'border-[#E5E5E5] text-[#9CA3AF]'}`}>
                  {i < loadingStep ? '✓' : i + 1}
                </span>
                <span className={`text-[10px] font-medium ${i < loadingStep ? 'text-emerald-600 line-through' : i === loadingStep ? 'text-[#0A0A0A] font-bold' : 'text-[#9CA3AF]'}`}>{ls}</span>
              </div>
            ))}
          </div>
        </div>
      </Card>
    );
  }

  // ─────────────────────────────────────────────────────────────────────────────
  // RESULTS — unified narrative report
  // ─────────────────────────────────────────────────────────────────────────────
  if (!report) return null;

  const fixes = report.bottleneckFixes || [];

  return (
    <div className="space-y-5">

      {/* ── HEADER ── */}
      <div className="flex justify-between items-start gap-4">
        <div>
          <h2 className="text-xl font-bold text-[#0A0A0A] tracking-tight">Your BD Audit Report</h2>
          <p className="text-xs text-[#6B7280] font-medium mt-0.5">
            AI-generated · Lead pool estimated from your ICP · RecruitmentOS methodology mapped
          </p>
        </div>
        <button onClick={handleReset} className="text-xs font-bold text-[#FF6A00] hover:text-[#E05E00] transition-colors flex-shrink-0">
          ← New Audit
        </button>
      </div>

      {/* ═══════════════════════════════════════════════════════════════════════
          STEP 1: YOUR CURRENT SITUATION
      ══════════════════════════════════════════════════════════════════════════ */}
      <Card as="section" padding="lg" className="w-full bg-white border border-[#E5E5E5] rounded-2xl">
        <div className="flex items-center gap-2 border-b border-[#F3F4F6] pb-4 mb-5">
          <span className="text-[10px] font-extrabold uppercase tracking-widest bg-[#0A0A0A] text-white px-2.5 py-1 rounded-full">Step 1</span>
          <h3 className="text-sm font-bold text-[#0A0A0A]">Your Current BD Situation</h3>
        </div>

        {/* Score + Verdict */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 bg-[#FAFAFA] border border-[#E5E5E5] rounded-xl p-5 mb-5">
          <div className="text-center md:border-r border-[#E5E5E5] md:pr-5 flex flex-col justify-center items-center gap-2">
            <span className="text-[10px] font-extrabold uppercase tracking-widest text-[#6B7280]">BD Maturity Score</span>
            <p className="text-6xl font-black text-[#0A0A0A] tracking-tighter leading-none tabular-nums transition-all duration-100">
              {displayedScore}<span className="text-2xl font-bold text-[#9CA3AF]">/100</span>
            </p>
            <span className={`inline-flex items-center text-[9px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full border ${report.overallScore >= 80 ? 'bg-emerald-50 text-emerald-700 border-emerald-200' : report.overallScore >= 60 ? 'bg-amber-50 text-amber-700 border-amber-200' : 'bg-red-50 text-red-700 border-red-200'}`}>
              {report.overallScore >= 80 ? '✦ Optimal' : report.overallScore >= 60 ? '⚡ Needs Optimization' : '⚠️ Critical Leaks'}
            </span>
          </div>
          <div className="md:col-span-2 flex flex-col justify-center">
            <p className="text-[10px] font-extrabold uppercase tracking-widest text-[#FF6A00] mb-1.5">Diagnosis</p>
            <p className="text-xs text-[#374151] font-medium leading-relaxed">{report.verdict}</p>
          </div>
        </div>

        {/* 4 Pillars */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {report.categories.map((cat, i) => (
            <div key={i} className="border border-[#E5E5E5] rounded-xl p-4">
              <div className="flex justify-between items-center mb-2">
                <span className="text-xs font-bold text-[#0A0A0A]">{cat.name}</span>
                <span className={`text-xs font-mono font-black ${scoreColor(cat.score)}`}>{cat.score}/100</span>
              </div>
              <div className="w-full bg-[#F3F4F6] h-1 rounded-full mb-3">
                <div className={`h-full rounded-full transition-all duration-700 ${cat.score >= 80 ? 'bg-emerald-500' : cat.score >= 60 ? 'bg-amber-400' : 'bg-red-500'}`} style={{ width: `${cat.score}%` }} />
              </div>
              <p className="text-[11px] text-[#6B7280] leading-relaxed">{cat.critique}</p>
              {cat.fix && (
                <div className="mt-3">
                  <button
                    onClick={() => setExpandedFix(expandedFix === i ? null : i)}
                    className="flex items-center gap-1.5 text-[10px] font-bold text-[#FF6A00] hover:text-[#E05E00] transition-colors"
                  >
                    <span className={`transition-transform duration-200 ${expandedFix === i ? 'rotate-90' : ''}`}>▶</span>
                    {expandedFix === i ? 'Hide Fix' : 'See Fix →'}
                  </button>
                  {expandedFix === i && (
                    <div className="mt-2 bg-[#FFF4EB] border border-[#FF6A00]/20 rounded-lg px-3 py-2.5">
                      <p className="text-[11px] text-[#374151] font-medium leading-relaxed">{cat.fix}</p>
                    </div>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      </Card>

      {/* ═══════════════════════════════════════════════════════════════════════
          STEP 2: PEOPLE API SEARCH — YOUR ADDRESSABLE MARKET
      ══════════════════════════════════════════════════════════════════════════ */}
      <Card as="section" padding="lg" className="w-full bg-white border border-[#E5E5E5] rounded-2xl transition-all duration-300">
        <div className="flex items-center justify-between border-b border-[#F3F4F6] pb-4 mb-5">
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-extrabold uppercase tracking-widest bg-[#0A0A0A] text-white px-2.5 py-1 rounded-full">Step 2</span>
            <h3 className="text-sm font-bold text-[#0A0A0A]">Lead Opportunity Sizing — Your Market</h3>
          </div>
          <button 
            onClick={() => setIsEditingIcp(!isEditingIcp)}
            className="text-[10px] font-bold uppercase tracking-widest text-[#FF6A00] hover:text-[#0A0A0A] transition-colors flex items-center gap-1"
          >
            {isEditingIcp ? '✓ Done Editing' : '⚙ Edit Criteria'}
          </button>
        </div>

        <p className="text-xs text-[#6B7280] font-medium mb-4">
          We used your ICP description to estimate the number of qualified leads available for your business. You can adjust the parameters below to see how it affects your market size.
        </p>

        {/* ICP filters used */}
        <div className="bg-[#FAFAFA] border border-[#E5E5E5] rounded-xl p-4 mb-5 transition-all duration-300 overflow-hidden">
          {isEditingIcp ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="sm:col-span-2">
                <label className="block text-[10px] font-bold uppercase tracking-widest text-[#9CA3AF] mb-1.5">Locations</label>
                <div className="flex flex-wrap items-center gap-1.5 p-2 bg-white border border-[#E5E5E5] rounded-lg min-h-[42px]">
                  {editableIcp?.locations?.map((loc, idx) => (
                    <span key={idx} className="inline-flex items-center gap-1 text-xs font-semibold bg-[#FAFAFA] border border-[#E5E5E5] px-2.5 py-1 rounded-md text-[#0A0A0A]">
                      {loc}
                      <button onClick={() => setEditableIcp({...editableIcp!, locations: editableIcp!.locations.filter((_, i) => i !== idx)})} className="text-[#9CA3AF] hover:text-red-500 font-bold ml-0.5">×</button>
                    </span>
                  ))}
                  <form
                    className="flex items-center gap-1"
                    onSubmit={(e) => {
                      e.preventDefault();
                      const val = locationInputValue.trim();
                      if (val && !editableIcp?.locations?.includes(val)) {
                        setEditableIcp({...editableIcp!, locations: [...(editableIcp?.locations || []), val]});
                      }
                      setLocationInputValue('');
                    }}
                  >
                    <input
                      ref={locationInputRef}
                      type="text"
                      value={locationInputValue}
                      onChange={(e) => setLocationInputValue(e.target.value)}
                      placeholder="Add location…"
                      className="text-xs font-medium text-[#0A0A0A] placeholder-[#9CA3AF] bg-transparent border-none outline-none w-28"
                    />
                    {locationInputValue.trim() && (
                      <button type="submit" className="text-[10px] font-bold text-[#FF6A00] hover:text-[#E05E00] px-1.5 py-0.5 rounded bg-[#FFF4EB] border border-[#FF6A00]/20 transition-colors">
                        + Add
                      </button>
                    )}
                  </form>
                </div>
              </div>

              <div className="sm:col-span-2">
                <label className="block text-[10px] font-bold uppercase tracking-widest text-[#9CA3AF] mb-1.5">Industries</label>
                <div className="flex flex-wrap items-center gap-1.5 p-2 bg-white border border-[#E5E5E5] rounded-lg min-h-[42px]">
                  {editableIcp?.industries?.map((ind, idx) => (
                    <span key={idx} className="inline-flex items-center gap-1 text-xs font-semibold bg-[#FAFAFA] border border-[#E5E5E5] px-2.5 py-1 rounded-md text-[#0A0A0A]">
                      {ind}
                      <button onClick={() => setEditableIcp({...editableIcp!, industries: editableIcp!.industries.filter((_, i) => i !== idx)})} className="text-[#9CA3AF] hover:text-red-500 font-bold ml-0.5">×</button>
                    </span>
                  ))}
                  <select
                    onChange={(e) => {
                      const val = e.target.value;
                      if (val && !editableIcp?.industries?.includes(val)) {
                        setEditableIcp({...editableIcp!, industries: [...(editableIcp?.industries || []), val]});
                      }
                      e.target.value = '';
                    }}
                    className="text-xs font-bold text-[#FF6A00] bg-transparent border-none outline-none cursor-pointer focus:ring-0 max-w-[120px]"
                    defaultValue=""
                  >
                    <option value="" disabled>+ Add Industry</option>
                    {INDUSTRY_OPTIONS.filter(opt => !editableIcp?.industries?.includes(opt)).map(opt => (
                      <option key={opt} value={opt}>{opt}</option>
                    ))}
                  </select>
                  <button onClick={() => {
                    const val = window.prompt('Add Custom Industry:');
                    if (val) setEditableIcp({...editableIcp!, industries: [...(editableIcp?.industries || []), val]});
                  }} className="text-[10px] font-bold text-[#9CA3AF] hover:text-[#0A0A0A] hover:underline px-1">+ Custom</button>
                </div>
              </div>

              <div className="sm:col-span-2">
                <label className="block text-[10px] font-bold uppercase tracking-widest text-[#9CA3AF] mb-1.5">Decision Makers</label>
                <div className="flex flex-wrap items-center gap-1.5 p-2 bg-white border border-[#E5E5E5] rounded-lg min-h-[42px]">
                  {editableIcp?.decisionMakers?.map((dm, idx) => (
                    <span key={idx} className="inline-flex items-center gap-1 text-xs font-semibold bg-[#FAFAFA] border border-[#E5E5E5] px-2.5 py-1 rounded-md text-[#0A0A0A]">
                      {dm}
                      <button onClick={() => setEditableIcp({...editableIcp!, decisionMakers: editableIcp!.decisionMakers.filter((_, i) => i !== idx)})} className="text-[#9CA3AF] hover:text-red-500 font-bold ml-0.5">×</button>
                    </span>
                  ))}
                  <select
                    onChange={(e) => {
                      const val = e.target.value;
                      if (val && !editableIcp?.decisionMakers?.includes(val)) {
                        setEditableIcp({...editableIcp!, decisionMakers: [...(editableIcp?.decisionMakers || []), val]});
                      }
                      e.target.value = '';
                    }}
                    className="text-xs font-bold text-[#FF6A00] bg-transparent border-none outline-none cursor-pointer focus:ring-0 max-w-[140px]"
                    defaultValue=""
                  >
                    <option value="" disabled>+ Add Decision Maker</option>
                    {DECISION_MAKER_OPTIONS.filter(opt => !editableIcp?.decisionMakers?.includes(opt)).map(opt => (
                      <option key={opt} value={opt}>{opt}</option>
                    ))}
                  </select>
                  <button onClick={() => {
                    const val = window.prompt('Add Custom Role:');
                    if (val) setEditableIcp({...editableIcp!, decisionMakers: [...(editableIcp?.decisionMakers || []), val]});
                  }} className="text-[10px] font-bold text-[#9CA3AF] hover:text-[#0A0A0A] hover:underline px-1">+ Custom</button>
                </div>
              </div>

              <div className="sm:col-span-2">
                <label className="block text-[10px] font-bold uppercase tracking-widest text-[#9CA3AF] mb-1.5">Departments</label>
                <div className="flex flex-wrap items-center gap-1.5 p-2 bg-white border border-[#E5E5E5] rounded-lg min-h-[42px]">
                  {editableIcp?.departments?.map((dep, idx) => (
                    <span key={idx} className="inline-flex items-center gap-1 text-xs font-semibold bg-[#FAFAFA] border border-[#E5E5E5] px-2.5 py-1 rounded-md text-[#0A0A0A]">
                      {dep}
                      <button onClick={() => setEditableIcp({...editableIcp!, departments: editableIcp!.departments!.filter((_, i) => i !== idx)})} className="text-[#9CA3AF] hover:text-red-500 font-bold ml-0.5">×</button>
                    </span>
                  ))}
                  <select
                    onChange={(e) => {
                      const val = e.target.value;
                      if (val && !editableIcp?.departments?.includes(val)) {
                        setEditableIcp({...editableIcp!, departments: [...(editableIcp?.departments || []), val]});
                      }
                      e.target.value = '';
                    }}
                    className="text-xs font-bold text-[#FF6A00] bg-transparent border-none outline-none cursor-pointer focus:ring-0 max-w-[140px]"
                    defaultValue=""
                  >
                    <option value="" disabled>+ Add Department</option>
                    {DEPARTMENT_OPTIONS.filter(opt => !editableIcp?.departments?.includes(opt)).map(opt => (
                      <option key={opt} value={opt}>{opt}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="sm:col-span-2">
                <label className="block text-[10px] font-bold uppercase tracking-widest text-[#9CA3AF] mb-1.5">Seniorities</label>
                <div className="flex flex-wrap items-center gap-1.5 p-2 bg-white border border-[#E5E5E5] rounded-lg min-h-[42px]">
                  {editableIcp?.seniorities?.map((sen, idx) => (
                    <span key={idx} className="inline-flex items-center gap-1 text-xs font-semibold bg-[#FAFAFA] border border-[#E5E5E5] px-2.5 py-1 rounded-md text-[#0A0A0A]">
                      {sen}
                      <button onClick={() => setEditableIcp({...editableIcp!, seniorities: editableIcp!.seniorities!.filter((_, i) => i !== idx)})} className="text-[#9CA3AF] hover:text-red-500 font-bold ml-0.5">×</button>
                    </span>
                  ))}
                  <select
                    onChange={(e) => {
                      const val = e.target.value;
                      if (val && !editableIcp?.seniorities?.includes(val)) {
                        setEditableIcp({...editableIcp!, seniorities: [...(editableIcp?.seniorities || []), val]});
                      }
                      e.target.value = '';
                    }}
                    className="text-xs font-bold text-[#FF6A00] bg-transparent border-none outline-none cursor-pointer focus:ring-0 max-w-[140px]"
                    defaultValue=""
                  >
                    <option value="" disabled>+ Add Seniority</option>
                    {SENIORITY_OPTIONS.filter(opt => !editableIcp?.seniorities?.includes(opt)).map(opt => (
                      <option key={opt} value={opt}>{opt}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="sm:col-span-2">
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[10px] font-bold uppercase tracking-widest text-[#9CA3AF] mb-1">Min Staff</label>
                    <input type="number"
                      className="w-full text-xs font-medium bg-white border border-[#E5E5E5] rounded-lg px-3 py-2 focus:outline-none focus:border-[#FF6A00]"
                      value={editableIcp?.companySize?.min || ''}
                      onChange={(e) => setEditableIcp({...editableIcp!, companySize: { ...editableIcp!.companySize, min: parseInt(e.target.value) || 0 }})}
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold uppercase tracking-widest text-[#9CA3AF] mb-1">Max Staff</label>
                    <input type="number"
                      className="w-full text-xs font-medium bg-white border border-[#E5E5E5] rounded-lg px-3 py-2 focus:outline-none focus:border-[#FF6A00]"
                      value={editableIcp?.companySize?.max || ''}
                      onChange={(e) => setEditableIcp({...editableIcp!, companySize: { ...editableIcp!.companySize, max: parseInt(e.target.value) || 0 }})}
                    />
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {[
                { label: 'Locations', value: editableIcp?.locations?.join(', ') || 'Global' },
                { label: 'Industries', value: editableIcp?.industries?.join(', ') || 'Any Industry' },
                { label: 'Decision Makers', value: editableIcp?.decisionMakers?.join(', ') || 'Any Job Title' },
                { label: 'Departments', value: editableIcp?.departments?.join(', ') || 'Any Department' },
                { label: 'Seniorities', value: editableIcp?.seniorities?.join(', ') || 'Any Seniority' },
                { label: 'Company Size', value: editableIcp?.companySize?.min || editableIcp?.companySize?.max ? `${editableIcp.companySize.min || 1}–${editableIcp.companySize.max || 5000} staff` : 'All Sizes' },
              ].map((f, i) => (
                <div key={i}>
                  <span className="block text-[10px] font-bold uppercase tracking-widest text-[#9CA3AF]">{f.label}</span>
                  <p className="text-xs font-bold text-[#0A0A0A] mt-1">{f.value}</p>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Search result numbers */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-4">
          <div className="border border-[#E5E5E5] rounded-xl p-5 text-center">
            <span className="text-[10px] font-extrabold uppercase tracking-widest text-[#6B7280] block">Companies Found</span>
            <p className="text-4xl font-black text-[#0A0A0A] my-2">{formatNum(simulatedCompanyCount)}</p>
            <span className="text-[10px] text-[#9CA3AF] font-medium">Matching your ICP criteria</span>
          </div>
          <div className="bg-emerald-50 border border-emerald-200/60 rounded-xl p-5 text-center">
            <span className="text-[10px] font-extrabold uppercase tracking-widest text-emerald-600 block">Verified Decision-Maker Leads</span>
            <p className="text-4xl font-black text-[#0A0A0A] my-2">{formatNum(simulatedLeadsCount)}</p>
            <span className="text-[10px] text-emerald-600/70 font-medium">Verified email + LinkedIn per lead</span>
          </div>
          <div className="bg-[#FFF4EB] border border-[#FF6A00]/20 rounded-xl p-5 text-center">
            <span className="text-[10px] font-extrabold uppercase tracking-widest text-[#FF6A00] block">Reachable This Month</span>
            <p className="text-4xl font-black text-[#0A0A0A] my-2">{formatNum(leadsPerMonth)}</p>
            <span className="text-[10px] text-[#FF6A00]/70 font-medium">1/3 of market · optimal cadence</span>
          </div>
        </div>

        <p className="text-[10px] text-[#9CA3AF] font-medium">
          Lead counts estimated from your ICP criteria · Contacts SMTP-validated before delivery · Updated in real time
        </p>
      </Card>

      {/* ═══════════════════════════════════════════════════════════════════════
          STEP 3: HOW RECRUITMENTOS WORKS (from methodology page)
      ══════════════════════════════════════════════════════════════════════════ */}
      <div className="w-full bg-[#0A0A0A] rounded-2xl p-6 sm:p-8">
        <div className="flex items-center gap-2 border-b border-white/10 pb-4 mb-5">
          <span className="text-[10px] font-extrabold uppercase tracking-widest bg-white/10 text-white px-2.5 py-1 rounded-full">Step 3</span>
          <h3 className="text-sm font-bold text-white">How RecruitmentOS Works</h3>
        </div>

        <p className="text-xs text-white/50 font-medium mb-5">
          Our 5-phase system — from "zero" to a self-sustaining BD pipeline. Outreach starts by Week 2. Steady pipeline by Month 3.
        </p>

        {/* Proof stat */}
        <div className="inline-flex items-center gap-2.5 bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 mb-6">
          <span className="w-2 h-2 rounded-full bg-[#FF6A00] flex-shrink-0" />
          <p className="text-xs text-white/70 font-medium">
            From one campaign: <strong className="text-white">7,550 leads</strong> → <strong className="text-white">11.38% reply rate</strong> → <strong className="text-[#FF6A00]">36 positive opportunities</strong>
          </p>
        </div>

        <div className="space-y-3">
          {report.roadmap.map((phase, i) => (
            <div key={i} className="bg-white/5 border border-white/10 rounded-xl p-5">
              <div className="flex items-start gap-4">
                <span className="text-3xl font-black text-white/10 leading-none flex-shrink-0 select-none">0{i + 1}</span>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap mb-2">
                    <span className="text-[9px] font-bold uppercase tracking-widest text-[#FF6A00]">{phase.timeline}</span>
                    <h4 className="text-xs font-bold text-white">{phase.title}</h4>
                    <span className="text-[10px] text-emerald-400 font-bold bg-emerald-400/10 border border-emerald-400/20 px-2 py-0.5 rounded-full ml-auto">
                      {phase.phase}
                    </span>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {phase.actions.map((act, j) => (
                      <div key={j} className="flex items-start gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#FF6A00] mt-1.5 flex-shrink-0" />
                        <p className="text-[11px] text-white/60 leading-relaxed">
                          {act}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* What's ready by week 2 */}
        <div className="mt-5 bg-white/5 border border-white/10 rounded-xl p-4">
          <p className="text-[10px] font-bold uppercase tracking-widest text-[#FF6A00] mb-2">What's ready before the first email goes out (Week 2)</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5">
            {['ICP defined and agreed in writing', 'Sending domains bought and warmed', 'SPF/DKIM/DMARC configured', '6–7 email sequences written', 'Inbox rotation set up', 'Reply process documented', 'Weekly report template ready'].map((d, i) => (
              <div key={i} className="flex items-center gap-2">
                <span className="text-[#FF6A00] font-bold text-xs">✓</span>
                <span className="text-[11px] text-white/60 font-medium">{d}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ═══════════════════════════════════════════════════════════════════════
          STEP 4: HOW RECRUITMENTOS WILL HELP YOU SPECIFICALLY
      ══════════════════════════════════════════════════════════════════════════ */}
      <Card as="section" padding="lg" className="w-full bg-white border border-[#E5E5E5] rounded-2xl">
        <div className="flex items-center gap-2 border-b border-[#F3F4F6] pb-4 mb-5">
          <span className="text-[10px] font-extrabold uppercase tracking-widest bg-[#0A0A0A] text-white px-2.5 py-1 rounded-full">Step 4</span>
          <h3 className="text-sm font-bold text-[#0A0A0A]">How RecruitmentOS Will Help <em>You</em></h3>
        </div>

        <p className="text-xs text-[#6B7280] font-medium mb-5">
          Based on what you told us, here's exactly how our system addresses each of your specific bottlenecks — with measurable outcomes.
        </p>

        <div className="space-y-4">
          {fixes.length > 0 ? fixes.map((fix, i) => (
            <div key={i} className="border border-[#E5E5E5] rounded-xl overflow-hidden">
              {/* Their bottleneck */}
              <div className="flex items-start gap-3 bg-[#FFF7F0] border-b border-[#FF6A00]/10 px-5 py-3">
                <span className="flex-shrink-0 w-5 h-5 rounded-full bg-[#FF6A00] text-white font-black text-[10px] flex items-center justify-center mt-0.5">{i + 1}</span>
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-widest text-[#FF6A00]">Your Bottleneck</span>
                  <p className="text-xs text-[#0A0A0A] font-semibold mt-0.5">{fix.bottleneck}</p>
                </div>
              </div>
              {/* How RecruitmentOS fixes it */}
              <div className="px-5 py-4 space-y-2.5">
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-widest text-emerald-600 block mb-1">How RecruitmentOS Fixes It</span>
                  <p className="text-xs text-[#374151] font-medium leading-relaxed">{fix.recruitmentOSFix}</p>
                </div>
                <div className="flex items-start gap-2 bg-emerald-50 border border-emerald-200/60 rounded-lg px-3 py-2.5">
                  <span className="text-emerald-500 font-bold text-sm leading-none mt-0.5">↗</span>
                  <p className="text-[11px] text-emerald-700 font-semibold leading-relaxed">{fix.expectedResult}</p>
                </div>
              </div>
            </div>
          )) : (
            /* Fallback if AI doesn't return bottleneckFixes */
            <div className="space-y-3">
              {[
                { b: report.topBottlenecks[0] || 'Lead data quality', f: 'We search BetterEnrich\'s live people database to pull SMTP-validated contacts for your exact ICP — no stale exports, no manual VA work.', r: 'Bounce rate drops below 2% from first campaign.' },
                { b: report.topBottlenecks[1] || 'Deliverability', f: 'We buy secondary sending domains, configure SPF/DKIM/DMARC, and run 14-day automated warmup before a single email is sent.', r: '70%+ inbox placement within 3 weeks.' },
                { b: report.topBottlenecks[2] || 'Manual ops overhead', f: 'All list building, follow-up sequences, and positive reply triage is automated. Your team only sees warm replies.', r: '12–20 recruiter hours per week recovered.' },
              ].map((item, i) => (
                <div key={i} className="border border-[#E5E5E5] rounded-xl overflow-hidden">
                  <div className="flex items-start gap-3 bg-[#FFF7F0] border-b border-[#FF6A00]/10 px-5 py-3">
                    <span className="flex-shrink-0 w-5 h-5 rounded-full bg-[#FF6A00] text-white font-black text-[10px] flex items-center justify-center mt-0.5">{i + 1}</span>
                    <div>
                      <span className="text-[10px] font-bold uppercase tracking-widest text-[#FF6A00]">Your Bottleneck</span>
                      <p className="text-xs text-[#0A0A0A] font-semibold mt-0.5">{item.b}</p>
                    </div>
                  </div>
                  <div className="px-5 py-4 space-y-2.5">
                    <div>
                      <span className="text-[10px] font-bold uppercase tracking-widest text-emerald-600 block mb-1">How RecruitmentOS Fixes It</span>
                      <p className="text-xs text-[#374151] font-medium leading-relaxed">{item.f}</p>
                    </div>
                    <div className="flex items-start gap-2 bg-emerald-50 border border-emerald-200/60 rounded-lg px-3 py-2.5">
                      <span className="text-emerald-500 font-bold text-sm leading-none mt-0.5">↗</span>
                      <p className="text-[11px] text-emerald-700 font-semibold">{item.r}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Ownership split */}
        <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div className="bg-[#FAFAFA] border border-[#E5E5E5] rounded-xl p-4">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-6 h-6 rounded bg-[#0A0A0A] flex items-center justify-center"><span className="text-white text-[10px] font-black">Y</span></div>
              <p className="text-xs font-bold text-[#0A0A0A] uppercase tracking-wider">You own</p>
            </div>
            <ul className="space-y-1.5">
              {['Your sending domains and inboxes', 'Every contact, sequence, and report', 'Your CRM and all its data'].map((it, i) => (
                <li key={i} className="text-[11px] text-[#374151] font-medium flex items-start gap-2"><span className="font-bold text-[#0A0A0A]">✓</span> {it}</li>
              ))}
            </ul>
          </div>
          <div className="bg-[#FFFDFB] border border-[#FFD9C0] rounded-xl p-4">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-6 h-6 rounded bg-[#FF6A00] flex items-center justify-center"><span className="text-white text-[10px] font-black">W</span></div>
              <p className="text-xs font-bold text-[#FF6A00] uppercase tracking-wider">We operate</p>
            </div>
            <ul className="space-y-1.5">
              {['Running the system every day', 'Writing and improving the sequences', 'Sorting replies, handing over the good ones', 'Weekly reports and monthly optimisation'].map((it, i) => (
                <li key={i} className="text-[11px] text-[#374151] font-medium flex items-start gap-2"><span className="font-bold text-[#FF6A00]">✓</span> {it}</li>
              ))}
            </ul>
          </div>
        </div>
      </Card>

      {/* ═══════════════════════════════════════════════════════════════════════
          STEP 5: PRICING & PLAN
      ══════════════════════════════════════════════════════════════════════════ */}
      <Card as="section" padding="lg" className="w-full bg-white border border-[#E5E5E5] rounded-2xl">
        <div className="flex items-center gap-2 border-b border-[#F3F4F6] pb-4 mb-5">
          <span className="text-[10px] font-extrabold uppercase tracking-widest bg-[#0A0A0A] text-white px-2.5 py-1 rounded-full">Step 5</span>
          <h3 className="text-sm font-bold text-[#0A0A0A]">Your Campaign Plan & Pricing</h3>
        </div>

        {/* The math */}
        <div className="bg-[#FAFAFA] border border-[#E5E5E5] rounded-xl p-5 mb-5">
          <p className="text-[10px] font-bold uppercase tracking-widest text-[#6B7280] mb-3">The 1/3 Outreach Strategy — Your Numbers</p>
          <p className="text-xs text-[#4B5563] font-medium leading-relaxed mb-4">
            We recommend outreaching to <strong className="text-[#0A0A0A]">1/3 of your total addressable market per month</strong> — the proven cadence that keeps deliverability high while scaling volume sustainably.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {[
              { label: 'Total Addressable Leads', value: formatNum(simulatedLeadsCount), sub: 'in your ICP', bg: 'bg-white border-[#E5E5E5]', lc: 'text-[#6B7280]' },
              { label: 'Monthly Campaign Target', value: formatNum(leadsPerMonth), sub: '1/3 of total · per month', bg: 'bg-[#FFF4EB] border-[#FF6A00]/20', lc: 'text-[#FF6A00]' },
              { label: 'Email Volume Required', value: `~${formatNum(emailsPerDay)}/day`, sub: 'monthly target ÷ 22 working days', bg: 'bg-emerald-50 border-emerald-200/60', lc: 'text-emerald-600' },
            ].map((stat, i) => (
              <div key={i} className={`border rounded-xl p-4 text-center ${stat.bg}`}>
                <span className={`text-[10px] font-bold uppercase tracking-widest ${stat.lc} block`}>{stat.label}</span>
                <p className="text-2xl font-black text-[#0A0A0A] my-1.5">{stat.value}</p>
                <span className="text-[10px] text-[#9CA3AF] font-medium">{stat.sub}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Recommended plan */}
        {emailPlan && (
          <div className="mb-5">
            <p className="text-[10px] font-bold uppercase tracking-widest text-[#6B7280] mb-3">Best-Match Plan for Your Volume ({emailsPerDay} emails/day)</p>
            <div className="border-2 border-[#FF6A00] rounded-xl bg-[#FFFBF7] p-5 relative">
              <span className="absolute top-3 right-3 text-[9px] font-bold bg-[#FF6A00] text-white px-2.5 py-1 rounded-full">Recommended</span>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <span className="text-[9px] font-extrabold uppercase tracking-widest text-[#FF6A00]">{emailPlan.plan.category}</span>
                  <h4 className="text-lg font-bold text-[#0A0A0A] mt-0.5">{emailPlan.plan.name}</h4>
                  <p className="text-xs text-[#6B7280] font-medium">{emailPlan.plan.tagline}</p>
                  <div className="mt-3">
                    <p className="text-4xl font-black text-[#0A0A0A]">
                      ${emailPlan.option.price}<span className="text-sm font-normal text-[#6B7280]">/mo</span>
                    </p>
                    <p className="text-[10px] font-mono text-[#FF6A00] font-bold mt-0.5">{emailPlan.option.label}</p>
                    <p className="text-[10px] text-[#6B7280] mt-0.5">{emailPlan.option.detail}</p>
                  </div>
                </div>
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-widest text-[#6B7280] mb-2">Included</p>
                  <ul className="space-y-1.5">
                    {emailPlan.plan.features.map((feat, fIdx) => (
                      <li key={fIdx} className="text-[11px] text-[#4B5563] font-medium flex items-center gap-2">
                        <span className="text-emerald-500 font-bold flex-shrink-0">✓</span> {feat}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              <div className="mt-4 pt-4 border-t border-[#FF6A00]/10 flex flex-col sm:flex-row gap-3 sm:items-center sm:justify-between">
                <p className="text-xs text-[#374151] font-medium">
                  <strong className="text-[#0A0A0A]">Projected:</strong> {formatNum(leadsPerMonth)} contacts/mo → at 2–3% reply rate = <strong className="text-[#0A0A0A]">{Math.round(leadsPerMonth * 0.025)} qualified conversations/mo</strong>. Payback: <strong className="text-[#FF6A00]">{report.paybackPeriod}</strong>.
                </p>
                <a href="https://cal.com/tusharm/30min?user=tusharm" target="_blank" rel="noopener noreferrer"
                  className="flex-shrink-0 inline-flex items-center justify-center bg-[#FF6A00] hover:bg-[#E05E00] text-white rounded-full px-5 py-2.5 text-xs font-bold transition-all">
                  Book Strategy Call →
                </a>
              </div>
            </div>
          </div>
        )}

        {/* All 3 tiers */}
        <div>
          <p className="text-[10px] font-bold uppercase tracking-widest text-[#6B7280] mb-3">All Plans</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {pricingPlans.map((plan) => {
              let matchedOption = plan.options[0];
              for (const opt of plan.options) { matchedOption = opt; if (emailsPerDay <= opt.leads) break; }
              const isRecommended = emailPlan?.plan.id === plan.id;
              return (
                <div key={plan.id} className={`border rounded-xl p-4 flex flex-col justify-between transition-all hover:shadow-sm ${isRecommended ? 'border-[#FF6A00] bg-[#FFFBF7]' : 'border-[#E5E5E5] bg-white'}`}>
                  <div>
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-[9px] font-extrabold uppercase tracking-widest text-[#FF6A00]">{plan.category}</span>
                      {isRecommended && <span className="text-[8px] font-bold bg-[#FF6A00] text-white px-1.5 py-0.5 rounded-full">Best Match</span>}
                    </div>
                    <h5 className="text-xs font-bold text-[#0A0A0A]">{plan.name}</h5>
                    <p className="text-2xl font-black text-[#0A0A0A] mt-2">${matchedOption.price}<span className="text-[10px] font-normal text-[#6B7280]">{plan.billing === 'monthly' ? '/mo' : ' one-off'}</span></p>
                    <p className="text-[9px] font-mono text-[#FF6A00] font-bold">{matchedOption.label}</p>
                    <ul className="mt-3 space-y-1.5">
                      {plan.features.slice(0, 3).map((feat, fIdx) => (
                        <li key={fIdx} className="text-[10px] text-[#4B5563] font-medium flex items-center gap-1.5">
                          <span className="text-emerald-500 font-bold">✓</span> {feat}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <a href={plan.cta.href} target="_blank" rel="noopener noreferrer"
                    className="mt-3 w-full text-center py-2 rounded-lg text-[10px] font-bold border transition-colors block"
                    style={{ background: plan.highlight ? '#FF6A00' : '#0A0A0A', color: '#fff', borderColor: plan.highlight ? '#FF6A00' : '#0A0A0A' }}>
                    {plan.cta.label}
                  </a>
                </div>
              );
            })}
          </div>
        </div>
      </Card>

      {/* ── CTA BANNER ── */}
      <div className="bg-[#0A0A0A] text-white rounded-2xl p-6 sm:p-8 flex flex-col md:flex-row justify-between items-center gap-6">
        <div className="space-y-1.5 text-center md:text-left">
          <span className="text-[9px] font-extrabold uppercase tracking-widest text-[#FF6A00]">Recommended</span>
          <h4 className="text-xl font-bold tracking-tight text-white">{report.recommendedPlan} Campaign</h4>
          <p className="text-xs text-[#9CA3AF] font-medium max-w-md">
            Structured to resolve your targeting, deliverability, and ops bottlenecks. Target payback: <strong className="text-white">{report.paybackPeriod}</strong>.
          </p>
        </div>
        <a href="https://cal.com/tusharm/30min?user=tusharm" target="_blank" rel="noopener noreferrer"
          className="inline-flex items-center justify-center bg-[#FF6A00] hover:bg-[#E05E00] text-white rounded-full px-6 py-3 text-xs font-bold transition-all flex-shrink-0">
          Book Strategy Call & Launch →
        </a>
      </div>

      {/* ── EMAIL CONFIRMATION / GATE ── */}
      <Card as="section" padding="lg" className="w-full bg-white border border-[#E5E5E5] rounded-2xl">
        <div className="max-w-lg mx-auto text-center space-y-5 py-2">
          {emailSent ? (
            /* Report already sent — show confirmation */
            <>
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-emerald-50 border border-emerald-200">
                <svg className="w-6 h-6 text-emerald-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <div>
                <h3 className="text-sm font-bold text-[#0A0A0A]">Report Sent to Your Inbox{name ? `, ${name.split(' ')[0]}` : ''}!</h3>
                <p className="text-xs text-[#6B7280] font-medium mt-1">
                  We've emailed the full BD audit — including your market sizing, 5-phase roadmap, and personalised pricing — to{' '}
                  <strong className="text-[#0A0A0A]">{email}</strong>.
                </p>
              </div>
              <div className="bg-[#FAFAFA] border border-[#E5E5E5] rounded-xl p-4 text-left space-y-1.5">
                <p className="text-[10px] font-bold uppercase tracking-widest text-[#6B7280]">Your report includes</p>
                {['BD Maturity Score & full diagnosis', 'Lead market sizing for your exact ICP', '5-phase outbound roadmap', 'Personalised bottleneck fixes', 'Custom pricing based on your volume'].map((item, i) => (
                  <div key={i} className="flex items-center gap-2">
                    <span className="text-emerald-500 font-bold text-xs">✓</span>
                    <span className="text-[11px] text-[#374151] font-medium">{item}</span>
                  </div>
                ))}
              </div>
              <a href="https://cal.com/tusharm/30min?user=tusharm" target="_blank" rel="noopener noreferrer"
                className="inline-flex items-center justify-center bg-[#FF6A00] hover:bg-[#E05E00] text-white rounded-full px-6 py-3 text-xs font-bold transition-all">
                Book a Free Strategy Call →
              </a>
            </>
          ) : (
            /* Fallback — email wasn't provided upfront */
            <>
              <div className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-[#FFF4EB]">
                <svg className="w-5 h-5 text-[#FF6A00]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 19v-8.93a2 2 0 01.89-1.664l8-5.333a2 2 0 012.22 0l8 5.333A2 2 0 0121 10.07V19M3 19a2 2 0 002 2h14a2 2 0 002-2M3 19l6.75-4.5M21 19l-6.75-4.5M3 10l6.75 4.5M21 10l-6.75 4.5m0 0l-1.14.76a2 2 0 01-2.22 0l-1.14-.76" />
                </svg>
              </div>
              <div>
                <h3 className="text-sm font-bold text-[#0A0A0A]">Email This Full Report</h3>
                <p className="text-xs text-[#6B7280] font-medium mt-1">Get the complete audit, market sizing, and campaign plan delivered to your inbox.</p>
              </div>
              <form onSubmit={handleSendReport} className="space-y-3 text-left">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label htmlFor="report-name" className="block text-[10px] font-bold uppercase tracking-wider text-[#6B7280] mb-1">Your Name</label>
                    <input id="report-name" type="text" required placeholder="e.g. John Doe" value={name} onChange={(e) => setName(e.target.value)}
                      className="w-full px-4 py-2.5 bg-white border border-[#E5E5E5] rounded-xl text-xs font-medium text-[#0A0A0A] placeholder-[#9CA3AF] focus:outline-none focus:border-[#FF6A00] transition-colors" />
                  </div>
                  <div>
                    <label htmlFor="report-email" className="block text-[10px] font-bold uppercase tracking-wider text-[#6B7280] mb-1">Work Email</label>
                    <input id="report-email" type="email" required placeholder="e.g. john@youragency.com" value={email} onChange={(e) => setEmail(e.target.value)}
                      className="w-full px-4 py-2.5 bg-white border border-[#E5E5E5] rounded-xl text-xs font-medium text-[#0A0A0A] placeholder-[#9CA3AF] focus:outline-none focus:border-[#FF6A00] transition-colors" />
                  </div>
                </div>
                <Button type="submit" variant="dark" disabled={sendingEmail || !email || !name}
                  className="w-full bg-[#0A0A0A] hover:bg-[#1C1C1C] text-white rounded-xl py-3 text-xs font-bold transition-all disabled:opacity-50">
                  {sendingEmail ? 'Sending...' : 'Send Full Report →'}
                </Button>
              </form>
            </>
          )}
        </div>
      </Card>

    </div>
  );
}
