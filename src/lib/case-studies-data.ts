export interface CaseStudySnapshot {
  client: string;
  industry: string;
  location: string;
  bottleneck: string;
  systemDeployed: string;
  primaryImpact: string;
}

export interface CaseStudyQuote {
  text: string;
  author: string;
  role: string;
}

export interface CaseStudyMetric {
  value: string;
  label: string;
}

export interface CaseStudyStar {
  situation: string;
  task: string;
  action: string;
  result: string;
}

export interface CaseStudy {
  id?: string;
  title: string;
  slug: string;
  client?: string;
  image: string;
  market?: string;
  headline?: string;
  heroCaption?: string;
  snapshot?: CaseStudySnapshot;
  quotes?: { challenge?: CaseStudyQuote; result?: CaseStudyQuote };
  star?: CaseStudyStar;
  cardTitle: string;
  cardStats: string;
  problem: string;
  rootCause: string;
  solution: string;
  result: string;
  takeaway: string;
  metrics?: CaseStudyMetric[];
}

export const verifiedCaseStudies: CaseStudy[] = [
  {
    slug: 'orion-placement-228-signed-agreements',
    title: '228 Signed Client Agreements in 38 Days',
    image: '/proof/calendar-august-2026.jpeg',
    headline: 'How Orion Placement Secured 228 Signed Terms in 38 Days Without Hiring an In-House BD Team',
    heroCaption: 'Unredacted August 2026 calendar showing confirmed discovery sessions and client agreements across US legal and accounting firms.',
    snapshot: { client: 'Justin, Founder @ Orion Placement', industry: 'Legal & Accounting Executive Search', location: 'United States (National)', bottleneck: 'Four hours a day of manual research and generic pitches that arrived after competitors.', systemDeployed: 'Live hiring signals, waterfall enrichment, candidate-to-company matching, and isolated follow-up infrastructure.', primaryImpact: '228 signed client agreements and 348 qualified opportunities in 38 days, with four hours reclaimed daily.' },
    quotes: { challenge: { text: 'Managing partners get ten recruiter emails before 9 AM. I was burning four hours every day manually researching firms and crafting pitches, only to find out competitors had already pitched.', author: 'Justin', role: 'Founder, Orion Placement' }, result: { text: 'The difference was night and day. Within 38 days, our calendar was stacked with partners from Beck Law, Feagans, and Frankl & Kominsky. 228 signed terms without adding a single SDR.', author: 'Justin', role: 'Founder, Orion Placement' } },
    star: { situation: 'Orion Placement needed to reach law firms and accounting practices before generic recruiter outreach crowded the market, while its founder spent three to four hours each morning researching vacancies and contacts.', task: 'Detect live vacancies across five practice areas, match pre-vetted candidates, deliver privacy-compliant profiles to decision-makers, and return founder time to interviews and negotiations.', action: 'RecruitmentOS monitored 19 job platforms, enriched managing-partner contacts through a waterfall, matched anonymized candidates to job descriptions, and sent 3,111 personalized follow-ups through isolated mailboxes.', result: 'The 38-day campaign processed 1,201 positive hiring-intent leads, delivered 2,409 tailored resumes, generated 638 replies and 348 qualified opportunities, and secured 228 signed agreements.' },
    market: 'USA · Legal & Accounting Executive Search',
    cardTitle: '228 signed terms in 38 days.',
    cardStats: '228 Signed Terms',
    problem: 'High-ticket legal and accounting firms ignored generic recruiter pitches. Orion needed specific hiring signals across five practice areas to create relevant conversations.',
    rootCause: 'Outreach was reaching firms after competitors had already pitched. The missing advantage was timing, signal quality, and consistent follow-up.',
    solution: 'We sourced 1,201 positive hiring-intent leads, generated 638 re-engagement replies, and delivered 2,409 tailored resumes across 3,111 personalized emails.',
    result: 'The campaign produced 348 qualified active opportunities and 228 signed client agreements in 38 days.',
    takeaway: 'Signal-driven outbound converted directly into signed client agreements at scale across five practice areas.',
    metrics: [
      { value: '1,201', label: 'Positive hiring-intent leads' },
      { value: '638', label: 'Re-engagement replies' },
      { value: '348', label: 'Qualified opportunities' },
      { value: '228', label: 'Signed client agreements' },
      { value: '19.0%', label: 'Lead-to-signed conversion' },
      { value: '36.7%', label: 'Reply-to-signed conversion' },
    ],
  },
  {
    slug: 'dach-tech-engineering-42-meetings',
    title: '42 Client Meetings from a Scaled Outbound Engine',
    image: '/case-studies/germany-case-study.webp',
    headline: 'How a DACH Tech Agency Generated 42 Client Meetings and 3.5x Revenue in a Cold Market',
    heroCaption: 'Strategy and pipeline review session with the founder of a specialist German technology and engineering recruitment agency.',
    snapshot: { client: 'Founder @ Specialist Tech & Engineering Agency', industry: 'High-Tech, Electrical & Mechanical Engineering', location: 'Munich & Frankfurt, Germany (DACH)', bottleneck: 'Regional privacy expectations and skeptical engineering leaders made generic outreach reputationally risky.', systemDeployed: 'Targeted job-signal scrapers, compliant messaging, isolated delivery, and technical candidate teasers.', primaryImpact: '42 verified client meetings, 169 qualified opportunities, and 3x-4x revenue growth impact.' },
    quotes: { challenge: { text: 'Generic automated outreach does not just fail in Germany; it destroys your agency reputation. Engineering leaders demand technical relevance and precision.', author: 'Founder', role: 'DACH Tech & Engineering Agency' }, result: { text: 'RecruitmentOS solved the cold-start problem in DACH. 42 qualified meetings gave us the foundation to multiply revenue by 3.5x without hiring local German sales reps.', author: 'Founder', role: 'DACH Tech & Engineering Agency' } },
    star: { situation: 'The agency had deep expertise in mechatronics, embedded software, and electrical engineering but no scalable acquisition infrastructure for a demanding DACH market.', task: 'Generate consistent discovery meetings with engineering directors without expensive local sales hires or broad campaigns that could damage the brand.', action: 'RecruitmentOS mapped 10,000 verified prospects, isolated sending domains, configured deliverability controls, and ran localized three-touch sequences tied to live vacancies.', result: 'The engine dispatched 26,000 compliant emails, generated 1,300 replies, 169 qualified opportunities, and 42 confirmed meetings, supporting a 3x-4x revenue growth impact.' },
    market: 'Germany / DACH · Specialist Tech & Engineering Recruitment',
    cardTitle: '42 meetings from 10,000 prospects.',
    cardStats: '42 Meetings Booked',
    problem: 'The agency needed a repeatable client acquisition channel in a market with strict outreach sensitivity and a high barrier to entry.',
    rootCause: 'Broad cold email lacked verified data, structured enrichment, and a reliable way to turn replies into qualified meetings.',
    solution: 'We sourced 10,000 verified prospects, dispatched 26,000 emails through domain-isolated inboxes, and captured 1,300 replies.',
    result: 'The system generated 169 qualified client opportunities and 42 client meetings, supporting 3x–4x revenue growth.',
    takeaway: 'Structured data, enrichment, and outbound created a repeatable acquisition channel at scale.',
    metrics: [
      { value: '10,000', label: 'Verified prospects sourced' },
      { value: '26,000', label: 'Emails dispatched' },
      { value: '1,300', label: 'Replies (5.0% rate)' },
      { value: '169', label: 'Qualified opportunities' },
      { value: '42', label: 'Client meetings booked' },
      { value: '3x–4x', label: 'Revenue growth impact' },
    ],
  },
  {
    slug: 'uk-tech-data-24-meetings-zero-ad-spend',
    title: '24 Hiring-Manager Meetings in 60 Days with £0 Ad Spend',
    image: '/proof/calendar-week-aug-sep-2026.jpeg',
    headline: 'How a UK Tech & Data Agency Built a £180,000 Client Pipeline in 60 Days with £0 Ad Spend',
    heroCaption: 'Weekly calendar view showing booked discovery briefings and hiring-manager conversations across UK technology firms.',
    snapshot: { client: 'Managing Director @ UK Tech & Data Recruitment Firm', industry: 'Data Science, Analytics & Software Engineering', location: 'London & South East, United Kingdom', bottleneck: 'Paid acquisition costs were rising while referrals and inbound demand became unreliable.', systemDeployed: 'Aged-vacancy, hiring-transition, and tech-stack signals connected to an owned outbound and scheduling engine.', primaryImpact: '24 qualified hiring-manager meetings and £180,000 in active pipeline in 60 days with £0 paid advertising.' },
    quotes: { challenge: { text: 'We were spending thousands every month on LinkedIn ads, but lead quality was plummeting. We needed a direct line to decision-makers with urgent, stubborn vacancies.', author: 'Managing Director', role: 'UK Tech & Data Agency' }, result: { text: 'RecruitmentOS delivered 24 direct meetings with Heads of Data and Engineering in eight weeks. Our ad spend was literally zero.', author: 'Managing Director', role: 'UK Tech & Data Agency' } },
    star: { situation: 'The agency relied on paid campaigns and referrals while senior recruiters spent more than 15 hours a week prospecting manually in a shifting UK technology market.', task: 'Replace paid-ad dependency with an owned pipeline that reached hiring leaders with active, hard-to-fill roles.', action: 'RecruitmentOS detected vacancies open for 30+ days, tracked leadership transitions, sent relevant anonymized candidate profiles, and connected positive intent directly to the calendar.', result: 'The 60-day sprint secured 24 qualified meetings, generated £180,000 in active pipeline, and used £0 in paid advertising.' },
    market: 'United Kingdom · Tech & Data Recruitment',
    cardTitle: '£180k pipeline with £0 ad spend.',
    cardStats: '£180k Pipeline',
    problem: 'The agency relied on expensive paid ads and recruiter referral networks that had plateaued.',
    rootCause: 'There was no consistent direct channel to decision-makers showing live hiring intent.',
    solution: 'We built dedicated outbound infrastructure around aged vacancies, leadership changes, direct decision-maker outreach, and multi-touch follow-up.',
    result: 'The campaign delivered 24 qualified hiring-manager meetings in 60 days and generated £180k in pipeline value with £0 paid-ad spend.',
    takeaway: 'A six-figure client pipeline can be built without burning capital on paid advertising.',
    metrics: [
      { value: '24', label: 'Qualified meetings' },
      { value: '60 days', label: 'Delivery window' },
      { value: '£0', label: 'Paid-ad spend' },
      { value: '£180k', label: 'Pipeline value generated' },
    ],
  },
];

export const legacyCaseStudies: CaseStudy[] = [
  {
    slug: 'client-growth-ai',
    title: 'Recruitment AI Case Study',
    image: '/case-studies/meeting.webp',
    headline: 'From Unpredictable Pipeline to 20+ Monthly Qualified Calls and 2x Revenue in 90 Days',
    heroCaption: 'Consultation session reviewing the client growth system and qualified pipeline.',
    snapshot: { client: 'Sarah, Recruitment Practice Lead', industry: 'Specialist Tech Recruitment', location: 'London, UK', bottleneck: 'Manual prospecting consumed three to four hours daily and timing was too late.', systemDeployed: 'Public hiring-signal tracking, candidate vector matching, and automated multi-channel sequencing.', primaryImpact: '20+ qualified discovery calls each month and 2x revenue growth in 90 days.' },
    star: { situation: 'The practice had capable recruiters but an unpredictable pipeline and no consistent way to identify hiring intent early.', task: 'Create a repeatable acquisition system that surfaced relevant opportunities before competitors.', action: 'RecruitmentOS tracked public hiring signals, matched candidates to roles, and coordinated personalized outreach and follow-up.', result: 'The same team and budget produced 20+ qualified calls each month and 2x revenue growth in 90 days.' },
    problem: 'Three months ago the client was completely stuck they spent 3–4 hours daily on manual sourcing replies were low and the pipeline was unpredictable every deal felt like luck',
    rootCause: 'The real problem was timing by the time a job posts on LinkedIn or Indeed 50+ agencies are already pitching win rate drops automatically no matter how hard you work',
    solution: 'We made them early we built an AI system that monitors job boards and company pages surfacing hiring signals before they go public 40000+ opportunities daily a filtering engine narrows these down to 150–200 real prospects finally a smart outreach system automatically sends personalized emails to the right person at the right time before competitors even know the opportunity exists',
    result: 'Same team same budget but now 20+ qualified calls every month and 2x revenue growth in 90 days the pipeline went from random to consistent',
    takeaway: 'This was not AI magic just one thing changed they started showing up first everything else improved automatically',
    cardTitle: 'From struggling pipeline to predictable revenue.',
    cardStats: '+30% Revenue Growth',
  },
  {
    slug: 'eighteen-year-recruitment-business',
    title: 'An 18-Year Recruitment Business With 1000 Clients and No Clear Way to Know When They Were Hiring',
    image: '/case-studies/dna-recruit-ai-audit.webp',
    headline: 'How an 18-Year Agency With 1,000+ Signed Clients Unlocked Real-Time Hiring Signals',
    heroCaption: 'Live AI workflow audit with Ali Wallace, CEO of DNA Recruit.',
    snapshot: { client: 'Ali Wallace, CEO @ DNA Recruit', industry: 'Creative, MarTech & Digital Agency Recruitment', location: 'London, UK, with teams in India and South Africa', bottleneck: 'More than 1,000 signed clients were not monitored for real-time hiring activity.', systemDeployed: 'Client-domain and job-board monitoring, continuous enrichment, and candidate-to-vacancy matching.', primaryImpact: 'Reactivated the existing client base around live hiring intent while removing repetitive database work.' },
    quotes: { challenge: { text: 'We have spent 18 years building relationships with over 1,000 clients. The problem was knowing the exact week a client started hiring before they posted publicly.', author: 'Ali Wallace', role: 'CEO, DNA Recruit' }, result: { text: 'AI should handle consistency problems like tracking and monitoring so our team can focus on human conversations.', author: 'Ali Wallace', role: 'CEO, DNA Recruit' } },
    problem: `Ali had been building DNA Recruit for 18 years.This was not a small operation.The business had a sourcing team in India, account managers in South Africa, and over 1000 clients with signed terms of business.There was also a structured internal system covering everything from sourcing to placement and aftercare.

Automation was not new to the business.Tools had already been explored and implemented.The real question was not whether AI should be used, but where it actually fit and where it did not.

Inside the business, one major gap stood out.Over 1000 existing clients were being managed without any system to track when they were hiring.These were long- term relationships, but re - engagement depended on manual checks, database reviews, and periodic outreach.There was no visibility into real - time hiring activity.No alert when a job was posted, and no trigger to act at the right moment.The opportunity already existed within the business, but it was not being observed when it mattered.

This led to another issue.Outreach was often going to people who were not hiring, while missing those who actively were.Regular emails helped maintain visibility, but they do not align with actual demand.Without timing based on intent, most outreach naturally landed too early or too late, resulting in lower response rates and missed opportunities.`,
    rootCause: `The operational side showed similar patterns.Multiple tools like Bullhorn, Sourcewell, Hinterview, and LinkedIn were being used, but without a unified system.The team constantly switched between platforms to manage information.While each tool worked individually, the lack of a single view created friction and wasted time across the team.

Even the database reflected this inefficiency.Years of contact data were still being reviewed and updated manually.This was work that required consistency, not judgement, yet it was consuming valuable human effort.

At the same time, candidate - to - job matching was not happening in real time.Candidates were entering the system from different sources, but there was no immediate way to connect them with companies that were actively hiring.Matches were either found manually or discovered too late.`,
    solution: `During the audit, a few clear opportunities emerged.One of the most impactful was continuous monitoring of existing clients.Instead of relying on manual effort, a system could track client websites, LinkedIn, and job boards, and instantly flag when a company starts hiring.This shifts outreach from guesswork to precise timing.

Another opportunity was identifying new companies based on hiring activity rather than broad outreach.When companies are approached at the moment they need help, the conversation becomes relevant instead of interruptive.

The database itself could be maintained continuously through automated enrichment, keeping information accurate without periodic manual effort.Similarly, the existing tool stack could function as a single system by bringing data into one interface, reducing switching and improving visibility.

Candidate matching could also be handled instantly.As soon as a candidate enters the system, their profile can be structured and matched with companies that are actively hiring, removing delays and surfacing opportunities faster.`,
    result: `One thing remained clear throughout the conversation.The goal was not to automate everything and lose the human side of recruitment.That concern is valid.The role of AI is not to replace judgement, but to remove the work that never required it in the first place.Monitoring, updating, and tracking are consistency problems.Understanding people, evaluating fit, and building relationships remain human responsibilities.`,
    takeaway: `In businesses that have spent years building strong client relationships, the biggest gap is often not lead generation.It is timing.Knowing exactly when those clients need help.

Because by the time hiring becomes visible manually, others have already reached out.

A system that continuously observes does not replace relationships.It simply ensures they are activated at the right moment.`,
    cardTitle: 'Timing is everything for 1000+ clients.',
    cardStats: '1000+ Relationships Optimized',
  },
  {
    slug: 'biotech-recruiter-zero-placements',
    title: 'How a Biotech Recruiter Spent $80,000 With Zero Placements And What Became Clear',
    image: '/case-studies/day2.webp',
    headline: 'How a Solo Biotech Recruiter Recovered an $80,000 Investment and Built a Scalable BD Engine',
    heroCaption: 'Live Day 2 audit screen reviewing Hari’s biotech recruitment workflow.',
    snapshot: { client: 'Hari, Founder & Biotech Recruiter', industry: 'Clinical & R&D Biotech Recruitment', location: 'United States', bottleneck: 'An $80,000 investment and eight months of manual outreach produced zero placements.', systemDeployed: 'Real-time vacancy scrapers, multi-touch sequencing, and candidate matching for high-value roles.', primaryImpact: 'Replaced manual prospecting with systematic outreach and activated 5,000 dormant LinkedIn connections.' },
    problem: `When Hari decided to start his recruitment business, he did not enter casually. He had a strong background in biotech, including experience at companies like Procter & Gamble, and chose to focus on clinical and R&D hiring, a space he understood deeply.

He invested $80,000 into the business. This included franchise fees, access to training, tools like ZoomInfo, and an ATS. For eight months, he worked full-time, putting in hundreds of hours into outreach and candidate conversations.

And yet, there were zero placements.

At first glance, it looked like a market issue. Biotech hiring had slowed down, and that seemed like the obvious explanation. But once the full workflow was examined, a different pattern emerged.

This was not a market problem. It was a systems problem.`,
    rootCause: `The first issue was outreach volume. Hari was sending around 200 to 300 emails per month, all manually. There were no sequences, no automation, and no structured follow-ups. In recruitment, results are heavily driven by volume and consistency. At that level of activity, even a decent response rate produces very few conversations.

Timing was working against him. His process involved finding job postings that were already a few days old, researching the company, identifying the decision maker, and then reaching out. By that time, the hiring manager had already been contacted by multiple recruiters. His message was not early, it was late.

Follow-up was another gap. While the industry typically requires multiple touchpoints across email and LinkedIn, his outreach often stopped after one or two attempts. Without a system to manage follow-ups, opportunities were being dropped too early.

There was also unused leverage inside the business. Hari had built a LinkedIn network of around 5000 connections. These were relevant, first-degree contacts. Yet they were not being used as part of a structured outreach or engagement strategy.

At the same time, candidates were coming in consistently. Around 50 to 100 candidates per month were reaching out, sharing resumes, and having conversations. But there was no system to connect these candidates to active job opportunities. Every match depended on manual effort, which meant many opportunities were either delayed or missed entirely. Basic visibility was also missing. No tracking on website activity, no data on performance.`,
    solution: `A few core shifts stood out. Instead of manually searching for jobs, there was an opportunity to continuously track new job postings across relevant platforms. This would allow outreach to happen within hours of a role being posted, not days later.

Decision-maker identification and outreach could happen in a structured way, ensuring that every relevant opportunity is acted on quickly and consistently. Follow-ups did not need to depend on memory or manual effort. A simple system could ensure that every prospect is contacted multiple times across channels.

The existing LinkedIn network could be used more intentionally, turning passive connections into active conversations. Candidate data could also be used more effectively. Instead of storing resumes, profiles could be structured and matched against active hiring needs, allowing faster and more relevant outreach. Even basic tracking, such as website analytics, could provide clarity on what is working and what is not.`,
    result: `The Numbers That Put It In Perspective: In biotech recruitment, a single placement can be significant. For example, a $150,000 role at a 20 percent fee results in a $30,000 placement.

Compared to that, the gap was not opportunity. It was the absence of a system that could convert effort into outcomes. The goal is not to work more. It is to ensure the work being done actually converts.`,
    takeaway: `For many solo recruitment founders, the instinct is to question the market when results are not coming. But often, the issue is not demand. It is structure.

Is outreach happening early enough. Is follow-up consistent enough. Is the volume sufficient for the math to work.

Without systems, even strong effort produces weak outcomes. With the right structure in place, the same effort starts compounding. A system that continuously observes does not replace relationships. It ensures they are activated at the right moment.`,
    cardTitle: 'From zero placements to structured growth.',
    cardStats: '$80,000 Investment Optimized',
  },
  {
    slug: 'recruitment-firm-scaling-reputation',
    title: 'A 15-Year Recruitment Firm With a Strong Reputation but No System to Scale What Became Clear',
    image: '/case-studies/day1.webp',
    headline: 'How a 15-Year BFSI Firm Built an Outbound Distribution Engine for 1,600 Campus Networks',
    heroCaption: 'Live Day 1 audit screen reviewing Krishna’s recruitment and campus platform operations.',
    snapshot: { client: 'Krishna, Founder @ 9to6 Consultants & BookMyCampus', industry: 'Banking, Financial Services & Campus Placement', location: 'Mumbai, India', bottleneck: 'A 15-year reputation relied on referrals, while 1,600 onboarded colleges had no corporate acquisition engine.', systemDeployed: 'Hiring-signal tracking, HR-director outbound, and first-level candidate screening.', primaryImpact: 'Created a systematic corporate acquisition path and moved the founder toward executive oversight.' },
    problem: `Krishna had been in the recruitment business for 15 years. He had built a solid firm, 9to6 Consultants, focused on the BFSI segment and working with top investment banking clients in India. Alongside this, he had spent five years and around 75 lakhs building a campus recruitment platform, BookMyCampus, with over 1600 colleges already onboarded.

By every measure, this was an established business built on experience and credibility. But during the audit, one thing became clear very quickly. The entire growth of the business had been driven by relationships, and there was no system to scale beyond them.

Client acquisition had come entirely through referrals and long-term relationships. This worked well when the BFSI market was active. But as the market slowed, inbound demand dropped, and there was no structured outbound system to compensate. Previous attempts at outreach had not worked. The issue was not the channel, but the absence of a system behind it.`,
    rootCause: `BookMyCampus stood out as a major untapped opportunity. A product with 1600 colleges, a working platform, and a clear use case had already been built. But there was no structured way to acquire corporate clients who would actually use and pay for it. Outreach to HR leaders and talent teams was still manual.

Both businesses were being managed directly by Krishna. Recruitment delivery, product decisions, sales, and operations were all dependent on one person, without any automation or delegation layer to reduce that load. If BookMyCampus scaled, handling large volumes of student applications would require screening at scale. Without a system, this would quickly become unmanageable.`,
    solution: `Instead of broad outreach, there was an opportunity to focus on companies already showing growth signals. Reaching them early changes the dynamic of the conversation. Continuous tracking of new job postings across platforms like Naukri and LinkedIn could create a steady flow of relevant opportunities.

For BookMyCampus, the gap was not product, but distribution. A structured approach to reaching HR heads and companies that run campus hiring programs could turn an existing asset into a revenue-generating system. Candidate screening could be handled at the first level through structured systems, allowing only relevant profiles to move forward. This would make scale possible without increasing team size. Introducing a layer of system management would allow the founder to focus on higher-value activities.`,
    result: `The Numbers That Put It In Perspective: The opportunity was not small. Even a modest conversion rate on targeted outreach could translate into significant revenue in recruitment. Compared to that, the cost of building and running a structured system was relatively low.

A large investment had already been made into building BookMyCampus. The missing piece was not capability, but a consistent way to bring the right users onto the platform.`,
    takeaway: `Reputation and relationships are powerful, but they are not enough to drive predictable growth on their own. When the market shifts, reliance on inbound alone becomes a limitation. The businesses that continue to grow are the ones that have a system running alongside relationships.

If a business has already proven its value over 10 or 15 years, the real question is not about capability. It is whether there is a system strong enough to consistently bring that value in front of the market.`,
    cardTitle: 'Scaling a 15-year reputation.',
    cardStats: '1600+ Colleges Leveraged',
  }
];

export const caseStudies = [...verifiedCaseStudies, ...legacyCaseStudies];
