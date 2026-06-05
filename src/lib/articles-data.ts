export type ArticleMeta = {
  slug: string;
  title: string;
  description: string;
  category: string;
  readTime: string;
  image?: string;
  publishedAt: string;
  customRoute?: string;
  file?: string;
};

export const articles: ArticleMeta[] = [
  {
    slug: 'what-is-recruitment-lead-generation',
    title: "What Is Recruitment Lead Generation — And Why Your Staffing Agency Can't Grow Without It",
    description: 'The pillar guide on building a proactive lead gen system that runs whether you are placing or not — covering the Four Ls and the 8 components every agency needs.',
    category: 'Lead Generation',
    readTime: '9 min read',
    publishedAt: '2026-05-12',
    file: '01_what_is_recruitment_lead_generation.md',
  },
  {
    slug: 'how-to-define-your-icp',
    title: 'How to Define Your Ideal Client Profile (ICP) as a Recruitment Agency',
    description: 'Why "looks relevant" is not a strategy — and a step-by-step framework for defining the exact companies your agency should chase.',
    category: 'Strategy',
    readTime: '8 min read',
    publishedAt: '2026-05-12',
    file: '02_how_to_define_your_icp.md',
  },
  {
    slug: 'smart-goals-for-recruitment-lead-gen',
    title: 'SMART Goals for Recruitment Lead Gen: How to Set Targets That Actually Drive Revenue',
    description: '"Generate more leads" is not a goal. A walkthrough on setting targets that connect outreach volume to placement revenue.',
    category: 'Strategy',
    readTime: '10 min read',
    publishedAt: '2026-05-12',
    file: '03_smart_goals_for_recruitment_lead_gen.md',
  },
  {
    slug: 'how-to-budget-for-recruitment-lead-gen',
    title: 'How to Budget for Recruitment Lead Gen (Without Wasting Money)',
    description: 'A $25K case study in what goes wrong without a framework — and how to budget for tools, time, and outreach so the spend pays back.',
    category: 'Operations',
    readTime: '9 min read',
    publishedAt: '2026-05-12',
    file: '04_how_to_budget_for_recruitment_lead_gen.md',
  },
  {
    slug: 'best-lead-gen-channels-2025',
    title: 'The Best Lead Gen Channels for Recruitment Agencies in 2025 (And Which Ones to Avoid)',
    description: 'Email vs LinkedIn vs SEO vs paid — a comparison of the channels that actually work for staffing agencies, and the right mix by stage.',
    category: 'Channels',
    readTime: '9 min read',
    publishedAt: '2026-05-12',
    file: '05_best_lead_gen_channels_2025.md',
  },
  {
    slug: 'cold-outreach-that-gets-replies',
    title: 'How to Write Cold Outreach That Actually Gets Replies From Hiring Managers',
    description: 'Hiring managers get 50+ recruitment emails a week. Here is the messaging framework that gets opened, replied to, and turned into calls.',
    category: 'Outreach',
    readTime: '10 min read',
    publishedAt: '2026-05-12',
    file: '06_cold_outreach_that_gets_replies.md',
  },
  {
    slug: 'lead-scoring-for-staffing-agencies',
    title: 'Lead Scoring for Staffing Agencies: How to Stop Wasting Time on Leads That Will Never Convert',
    description: 'A simple scoring system that tells your team who to call first — so hours stop disappearing into leads with no real intent.',
    category: 'Operations',
    readTime: '9 min read',
    publishedAt: '2026-05-12',
    file: '07_lead_scoring_for_staffing_agencies.md',
  },
  {
    slug: '8-kpis-to-track-recruitment-lead-gen',
    title: '8 KPIs Every Recruitment Agency Must Track to Know If Their Lead Gen Is Actually Working',
    description: 'Most agencies track vanity metrics. The 8 numbers that actually predict whether your BD is working — and the dashboards to track them.',
    category: 'Analytics',
    readTime: '12 min read',
    publishedAt: '2026-05-12',
    file: '08_8_kpis_to_track_recruitment_lead_gen.md',
  },
  {
    slug: 'claude-mcp-recruitment-engine',
    title: 'How Recruiters Can Use Claude AI + MCP to Build a Full Recruitment Engine',
    description: 'Think of Claude with MCP as your AI recruiter brain — a 7-step system that connects Apify, Exa, Prospeo, Lemlist, RapidAPI, and Airtable.',
    category: 'AI Stack',
    readTime: '7 min read',
    image: '/resources/claude-ai-mcp.webp',
    publishedAt: '2026-05-10',
    customRoute: '/resources/claude-mcp-recruitment-engine',
  },
];

export function getArticleBySlug(slug: string): ArticleMeta | undefined {
  return articles.find((a) => a.slug === slug);
}
