export type Tool = {
  slug: string;
  title: string;
  source: 'tool_cold_email_writer' | 'tool_volume_gap_calculator' | 'tool_general_roi' | 'tool_bd_scorecard';
  description: string;
  category: string;
  badge: string;
  isNew?: boolean;
  /** External URL for the tool. Required unless `interactive` is true (component-rendered). */
  resourceUrl?: string;
  embedUrl?: string;
  communityUrl?: string;
  videoUrl?: string;
  /** When true, ToolPageClient renders an inline React component instead of an external CTA. */
  interactive?: boolean;
  whatsInside: string[];
};

export const tools: Tool[] = [
  {
    slug: 'cold-email-writer',
    title: 'AI Cold Email Writer',
    source: 'tool_cold_email_writer',
    description:
      'AI Cold Email Writer Agent — powered by Claude — uses a 48-law psychology system to write hyper-personalized outreach that books calls. Not templates. Not blasts. Emails that feel human.',
    category: 'Outreach',
    badge: 'Tool',
    isNew: true,
    resourceUrl: 'https://claude.ai/public/artifacts/c876e9cb-c44e-45ab-ae00-9ebc8c951c1f',
    embedUrl: 'https://claude.site/public/artifacts/c876e9cb-c44e-45ab-ae00-9ebc8c951c1f/embed',
    communityUrl: 'https://chat.whatsapp.com/I9PLSmDMJ06B6qYYVsRb0q?mode=gi_t',
    whatsInside: [
      'AI Cold Email Writer Agent powered by Claude',
      'Paste a candidate or client profile — get a personalized, psychology-backed cold email in seconds',
      '48-law psychology system for 3× reply rate lift',
      '4 email types built for different outreach scenarios',
    ],
  },
  {
    slug: 'volume-gap-calculator',
    title: 'Volume Gap Calculator',
    source: 'tool_volume_gap_calculator',
    description:
      'Plug in your placement target, fee, close rate, reply rate. Get the monthly outreach your math actually requires — and the gap between that and what you do today.',
    category: 'Strategy',
    badge: 'Tool',
    isNew: true,
    interactive: true,
    whatsInside: [
      'See the exact outreach volume your numbers demand',
      'Compare to what you actually do today',
      'Tier yourself: Starter / Growth / Pro outreach load',
      'Built on real Sheet 1 funnel math (7.5% reply → 10% meeting → 20% close)',
    ],
  },
  {
    slug: 'general-roi',
    title: 'Recruitment Lead-Gen ROI Calculator',
    source: 'tool_general_roi',
    description:
      'See what your prospecting actually costs today — and what RecruitmentOS would cost. Get a recommended tier + payback period in days.',
    category: 'Strategy',
    badge: 'Tool',
    isNew: true,
    interactive: true,
    whatsInside: [
      'See what your current prospecting actually costs',
      'Compare against the RecruitmentOS retainer for your volume',
      'Get a recommended tier + payback period in days',
      'Powered by the same math we use on the fit call',
    ],
  },
  {
    slug: 'bd-scorecard',
    title: '180-Point BD Bottleneck Scorecard',
    source: 'tool_bd_scorecard',
    description:
      'The same diagnostic Tushar runs on every fit call. 36 questions across 7 sections. Self-scored in 12 minutes. Tells you exactly where your BD function is leaking.',
    category: 'Scorecard',
    badge: 'Scorecard',
    isNew: true,
    interactive: true,
    whatsInside: [
      '36 questions across 7 sections (ICP, brand, BD, CRM, delivery, ops, strategy)',
      'Section-by-section scoring + benchmark band per section',
      'Overall verdict + 4-tier synthesis paragraph based on BD-automation score',
      'Personalised Top 3 Fixes with recommended actions',
    ],
  },
];
