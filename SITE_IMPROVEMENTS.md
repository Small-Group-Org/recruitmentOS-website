# RecruitmentOS — Site Improvement Plan
> Sources: `recruitmentos-site/` (5 HTML files) · Automindz Solutions · Paiger · Firefish · Recruitment Coach · Enginy

---

## 1. The Core Problem

Two versions of RecruitmentOS exist with two fundamentally different value propositions:

| | `recruitmentos-site/` HTML (reference) | `src/` Next.js (live) |
|---|---|---|
| **Offer framing** | "We replace your BD function — as a service" | "AI-Powered Placement Engine" (tool framing) |
| **Hero** | Single pain-led headline, static | Two rotating slides, two different promises |
| **Pricing** | Transparent: $2,500/mo + $5,000 setup | Hidden, commented out of nav |
| **Guarantee** | 100 contacts + 10 replies in 60 days or work free | None |
| **Proof** | Full case study: 10→40+ placements, 60→25 hrs/week | Zero testimonials anywhere |
| **Objection handling** | 8-question FAQ, lock-in answer, "not for you" section | None |
| **Qualification** | Pre-qual form (revenue + problem + team size) before calendar | Raw Cal.com embed |
| **Tone** | Founder-direct, editorial, personal — "I'll redirect you if it doesn't fit" | Generic SaaS startup |

**The live site sells a tool. The HTML site sells a service. These attract different buyers.**  
The HTML site's structure and copy is the correct version. The live site has the better design system.  
The task is to merge them.

---

## 2. Competitor Content Map

### Automindz Solutions — closest competitor (uses "RecruitingOS" branding)

| Section | What they say |
|---|---|
| Hero | "We Build AI Systems That Generate Pipelines" — done-for-you, no ambiguity |
| Metrics bar | $8.2M+ pipeline · 15%+ avg reply rate · 40+ agencies served |
| Products | 3 named products (RecruitingOS / BuildOS / TalentOS) each with a metric |
| Process | 4 steps: Strategy Session → Build & Launch → Meetings Flow → Close Deals |
| Proof | "$184K pipeline and 146 qualified leads in our first campaign" (specific, named) |
| Resources | Free playbooks + templates at the bottom for cold traffic |

**Narrative:** Credibility → metrics → how it works → proof → convert

---

### Paiger — BD platform built for recruiters (£199–£699/mo)

| Section | What they say |
|---|---|
| Hero | "Complete Business Development Platform For Recruiters" — dark background |
| Pain-first | 3 recruiter problems named *before* any feature is shown |
| Features | Sequential: Job Alerts → Research → CV Presentation → Outreach → Daily Email |
| Social proof | "5,000+ Recruiters" + Randstad, Franklin Fitch, NES Fircroft logos |
| Pricing | 4 tiers, fully transparent, on the homepage |

**Narrative:** Pain → solution per pain → scale proof → price → convert  
**Differentiator:** Pain named before product — most effective opener in this category.

---

### Firefish — Recruitment CRM with BD module

| Section | What they say |
|---|---|
| Hero | "The recruitment CRM that turns data into revenue" — 7-word outcome claim |
| 3 metrics | 15% cost reduction · 30% revenue increase per recruiter |
| Old Way vs New | Two-column comparison: manual process vs Firefish |
| Features | 6 modules with icons |
| Blog | Thought leadership: BD / AI / Agency Leadership / Industry Insights |

**Narrative:** Outcome → prove it → contrast table → features → educate → convert  
**Differentiator:** Old Way vs New Way comparison (RecruitmentOS already has BeforeAfter — but Firefish attaches numbers to it).

---

### Recruitment Coach — coaching/consulting for agency owners

| Section | What they say |
|---|---|
| Hero | "Build a Recruitment Business You Love" — aspirational |
| Audience tiers | 3 cards: Solo Recruiters · Firm Owners · 7-Figure Owners — each with own copy |
| Testimonials | "$134,000 billed in one month" · "300% increase, $315,000 in 9 months" |
| Community | "600+ years of collective recruitment experience" — unique proof format |
| Content | Podcast + blog integrated into homepage |

**Narrative:** Aspiration → who are you → specific revenue proof → community → content → convert  
**Differentiator:** Audience segmentation cards placed early — routes different buyers without making them work for it.

---

### Enginy (formerly Genesy) — AI outbound for BD teams

| Section | What they say |
|---|---|
| Hero | "Where sales begin — from finding prospects to booking meetings" |
| Logos | Notion, OpenAI, Google, Slack — aggressive early credibility |
| Features | Find → Enrich → Engage → Meetings → Smart Inbox |
| ROI Calculator | Inline: "calculate your return before you book" |
| Stats | x4.5 reply rate · 4 hrs saved per SDR · x2 conversion rate |
| Integrations | 12+ tool logos shown |

**Narrative:** Full-funnel promise → credibility → mechanics → ROI proof → convert  
**Differentiator:** ROI calculator shown inline — visitors see the maths without being asked to trust claims.

---

## 3. Section-by-Section Gap Table

Every content block across all sources. ✅ = present and good · ⚠️ = exists but weak · ❌ = missing

| Content Block | Live Site | HTML Site | Automindz | Paiger | Firefish | R.Coach | Enginy |
|---|---|---|---|---|---|---|---|
| Targeted eyebrow / audience qualifier | ⚠️ vague | ✅ "$500K–$5M" | ✅ | ✅ | ✅ | ✅ | ✅ |
| Single unambiguous offer sentence | ❌ 2 rotating slides | ✅ "We run your BD" | ✅ | ✅ | ✅ | ⚠️ | ✅ |
| Problem / pain section | ❌ | ✅ "The Wall §02" | ❌ | ✅ 3 pain cards | ⚠️ implied | ❌ | ❌ |
| Failed alternatives listed | ❌ | ✅ 3 specific fails | ❌ | ❌ | ❌ | ❌ | ❌ |
| Cost / maths comparison table | ❌ | ✅ full table §04 | ❌ | ❌ | ⚠️ 3 stats | ❌ | ✅ ROI calc |
| Real case study with numbers | ❌ | ✅ full case study | ✅ $184K quote | ❌ | ❌ | ✅ $315K | ❌ |
| Aggregate proof (total clients / metric) | ⚠️ "10+ agencies" | ❌ | ✅ $8.2M / 40+ | ✅ 5,000+ | ✅ | ❌ | ✅ |
| How it works process / timeline | ❌ | ✅ 5 phases | ✅ 4 steps | ✅ sequential | ❌ | ❌ | ✅ flow |
| Who it's for / not for section | ❌ | ✅ §07 | ❌ | ❌ | ❌ | ✅ 3 tiers | ❌ |
| No lock-in / your stack section | ❌ | ✅ §06 | ❌ | ❌ | ❌ | ❌ | ❌ |
| Guarantee with named milestones | ❌ | ✅ §08 | ❌ | ❌ | ❌ | ❌ | ❌ |
| Transparent pricing on site | ❌ | ✅ 3 tiers | ❌ | ✅ | ❌ | ❌ | ❌ |
| FAQ answering real objections | ❌ | ✅ 8 Qs §10 | ❌ | ❌ | ❌ | ❌ | ❌ |
| Client / agency logo row | ❌ | ❌ | ✅ | ✅ | ✅ | ❌ | ✅ |
| Named revenue testimonials | ❌ | ⚠️ anonymised | ✅ | ❌ | ❌ | ✅ | ❌ |
| Free tools / lead magnets | ✅ | ❌ | ✅ playbooks | ❌ | ✅ blog | ✅ podcast | ❌ |
| Interactive calculator | ✅ /calculator | ❌ | ❌ | ❌ | ❌ | ❌ | ✅ |
| Pre-qualified booking form | ❌ | ✅ book.html | ❌ | ❌ | ❌ | ❌ | ❌ |
| Founder-signed personal CTA | ❌ | ✅ "— Tushar" | ❌ | ❌ | ❌ | ✅ | ❌ |
| BeforeAfter comparison | ✅ visual | ✅ copy | ❌ | ❌ | ✅ | ❌ | ❌ |
| Cal.com embed (zero-friction) | ✅ | ❌ redirect | ❌ | ❌ | ❌ | ❌ | ❌ |
| Animated product diagram | ✅ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ |

---

## 4. What the HTML Site Has That No Competitor Does

These are unique advantages that exist in the HTML files but are absent from every competitor site reviewed:

### 1. The "failed alternatives" paragraph
From `index.html §02`:
> "Hire more sourcers → margin compresses, capacity grows linearly, leverage doesn't.  
> Buy an AI tool → your team doesn't use it, £15–25K written off.  
> Push harder → your best recruiter leaves, pipeline still depends on you."

This pre-empts the three most common objections before the product is introduced. Nothing in Automindz, Paiger, Firefish, Recruitment Coach, or Enginy does this.

### 2. Full cost-per-placement maths with visible assumptions
From `index.html §04` — not a claim, a transparent calculation:
- 2-analyst scenario: $4,800/month · ~580 contacts · ~1 placement · ~$10K revenue
- vs RecruitmentOS: $3,200–3,700/month · 5,000–10,000 contacts · 10–20 placements · $100K–200K revenue
- Punchline: **$3,800–4,800 cost per placement manually vs $185–280 with RecruitmentOS**

Enginy has an ROI calculator that requires the user to input numbers. The HTML site shows the maths unconditionally, which is more persuasive for cold visitors.

### 3. Guarantee with named milestones
From `index.html §08`:
> "100 hiring-manager contacts and 10 verified replies in 60 days, or we work free.  
> Day 30: 50 verified contacts. Day 60: 100 contacts + 10 replies.  
> No fine print, no clawback fights, no proving-it terms."

Zero competitors offer a guarantee of any kind. This is the strongest risk-removal mechanism in the category.

### 4. "Your Stack / No Lock-in" section
From `index.html §06`:
> "Your ZoomInfo / Apollo / Lusha account. Your Smartlead / Instantly sender. Your domains. Your CRM.  
> If you ever leave, the entire pipeline keeps working without us."

At $2,500–4,500/month with a 6–12 month minimum, fear of being trapped is the most common unstated objection for a managed service. No competitor addresses it directly.

### 5. Pre-qualified booking form
From `book.html` — 4 fields before calendar access:
- Agency name + website
- Monthly billing (dropdown: with inline note "We work with $50K+/month agencies")
- Bigger problem: clients or candidates (with inline note "We solve client-side BD only")
- Team size

Filters unqualified leads before they book time. Signals curation and seriousness to qualified ones. No competitor has this.

### 6. Founder-signed final CTA
From `index.html` final section:
> "20-minute call. No slides. No deck. No pressure. Three questions about your business, then a straight read on whether RecruitmentOS makes sense for you. If it doesn't, I'll point you at someone who does what you actually need.  
> — Tushar, Founder, RecruitmentOS"

Named, personal, honest, lower-pressure. Only Recruitment Coach does something similar. In a category full of generic "Book a Demo" CTAs, this is a differentiator.

---

## 5. What Competitors Have That the HTML Site (and Live Site) Lack

These are gaps the HTML site does not fill, identified from competitor analysis:

### 1. Aggregate social proof number (Automindz, Paiger, Firefish, Enginy)
- Automindz: "$8.2M+ pipeline generated · 40+ agencies"
- Paiger: "5,000+ Recruiters · Randstad · Franklin Fitch"
- Firefish: "15% cost reduction · 30% revenue increase per recruiter" (across all clients)

The HTML site has one anonymised case study. One story signals anecdote; a total signals repeatability. Even a modest aggregate ("12 agencies · 3 industries · $Xm pipeline generated") is more credible than one story.

**Fix:** Build a trust bar with total numbers derived from all engagements and the maths in §04.

### 2. Early audience segmentation (Recruitment Coach, Paiger)
- Recruitment Coach: 3 explicit cards — Solo Recruiters / Firm Owners / 7-Figure Owners — placed in the first 30% of the page
- Paiger: Sub-personas named in features section

The HTML site's "Who it's for" (§07) appears after the hero, problem, services, math, and proof — 5+ minutes into a first visit. By that point a solo recruiter under $50K/month has wasted both their time and yours.

**Fix:** Move the ✓/× fit section to position 3 on the homepage — after hero and trust bar, before the problem section.

### 3. Free educational content for cold traffic (Automindz, Firefish, Recruitment Coach)
- Automindz: free playbooks and templates at the bottom
- Firefish: blog across 4 categories
- Recruitment Coach: podcast

Someone who visits the site and is not ready to book has no reason to return. The live site already has lead magnets (calculator, scorecards, playbooks) — this is a strength the HTML site lacks entirely.

**Fix:** Link the lead magnets from the HTML site's footer and CTA sections. They already exist at `/calculator`, `/signal-system`, etc.

### 4. Named client logos (Automindz, Paiger, Firefish, Enginy)
Every competitor shows named logos — agencies, companies, or both. The HTML site has zero logos. One anonymised case study does not substitute for visual quantity-of-trust.

**Fix:** Add a logo row of agencies worked with (anonymised or named, whatever clients permit). Even 4–5 logos transforms the first-scroll credibility signal.

---

## 6. The Changes — Prioritised

### Priority 1 — Fix the hero

**Current (live site):**
- Slide 1: "5x your placements per Recruiter without Hiring more people"
- Slide 2: "We Build AI Systems That Scale Revenue"
- Subtext: "RecruitmentOS scrapes 1M+ jobs, matches candidates to open roles, and sends personalized outreach to Hiring managers all on Autopilot."

**Problem:** Two slides, two different category promises. Subtext describes a feature, not a benefit. No audience qualifier. No price signal.

**Replacement (from `index.html §01`):**
```
Eyebrow:  For recruitment agencies billing $500K–$5M

H1:       Stop hunting for hiring companies
          with a team of analysts.
          We do it for you.

Sub:      RecruitmentOS runs your entire BD pipeline —
          sourcing, enrichment, outreach, reply handling —
          as a service. Your recruiters only step in when a
          hiring manager replies "yes, send me candidates."

CTA 1:    Book a 20-min fit call →
CTA 2:    Calculate my revenue gap →   (links to /calculator)

Trust:    $2,500/mo · Setup in 7 days · 100 contacts in 60 days or we work free
```

---

### Priority 2 — Add trust bar with aggregate numbers

**Current:** 10+ agencies · 500+ jobs/day · 5.3% reply rate · +30% revenue growth

**Problem:** "10+ agencies" signals small scale. "5.3% reply rate" is below the 6% referenced in the HTML maths. "+30% revenue growth" is vague and unverifiable.

**Replacement:**
```
[X] agencies automated  ·  1M+ jobs monitored daily  ·  6%+ avg reply rate  ·  $185 cost per placement
```
Use the real numbers from the maths table in `index.html §04`. If exact client aggregate isn't available, use the modelled numbers with a note.

---

### Priority 3 — Move "Who it's for / Not for" to position 3

**Current position:** §07 of index.html — after hero, problem, services, math, proof.

**Target position:** Section 3 of the homepage — after hero and trust bar.

**Copy (from `index.html §07`, use as-is):**

✓ This is for you if:
- You bill $50K–$400K per month
- You have 3–25 recruiters
- Permanent placements, average fee $5K+
- Your bottleneck is client acquisition, not candidates
- You'd rather pay one fixed monthly cost than hire a BD team

× This is not for you if:
- You're a solo recruiter or under $50K/month
- Your bottleneck is candidates, not clients
- You only do success-fee or pure performance deals
- You want a self-serve tool you operate yourself

Keep the closing line: *"If the right column describes you, please don't book a call. We'll waste each other's time."*

---

### Priority 4 — Add "The Bottleneck" section (failed alternatives)

**Source:** `index.html §02`

**Core copy to preserve:**
> "The BD function in most $1M–$5M recruitment agencies looks the same: a founder still doing 30% of outreach personally, a BD analyst who can't keep up, recruiters who half-help with sourcing when delivery slows down."
> 
> "The math doesn't work. To hit consistent placements at scale, you need 5,000–10,000 verified hiring-manager contacts a month. Manual gets you 300–500."

Three failed alternatives (keep all three, keep the specific failure for each):
- **Hire more sourcers** → margin compresses, capacity grows linearly, leverage doesn't
- **Buy an AI tool** → team doesn't use it, £15–25K written off
- **Push harder** → best recruiter leaves, pipeline still depends on you

Closing line: *"The actual fix isn't more effort. It's removing BD from the human entirely."*

**Position:** Section 4, after the "Who it's for" filter.

---

### Priority 5 — Add The Math section

**Source:** `index.html §04`

Two full comparison tables: 2-analyst scenario and 10-analyst scenario. Both tables have identical structure:

| Row | Manual BD | RecruitmentOS |
|---|---|---|
| Analysts | 2 / 10 | 0 |
| Labour / month | $4,400 / $22,000 | $0 |
| Service fee | $0 | $2,500 |
| Tools + APIs | ~$400 / ~$1,200 | $700–1,200 |
| **Total cost** | **$4,800 / $23,200** | **$3,200–3,700** |
| Verified contacts | ~580 / ~2,900 | 5,000–10,000 |
| Replies (at 6%) | ~35 / ~175 | 300–600 |
| Estimated placements | ~1 / 6 | 10–20 |
| **Revenue (at $10K fee)** | **~$10K / ~$60K** | **$100K–200K** |

Punchline section:
```
Cost per placement in labour and tooling alone:

Manual BD team          RecruitmentOS
$3,800–$4,800    vs     $185–$280

15–25× improvement. Before counting management time,
hiring overhead, sick days, churn, and founder hours
spent reviewing analyst output.
```

Keep the assumptions paragraph verbatim — it is what makes the numbers credible rather than promotional.

**Position:** Section 6, after "What We Do."

---

### Priority 6 — Add case study teaser to homepage

**Source:** `case-studies.html`

Homepage teaser block (3 components):

**Quote:**
> "People are still doing all of this manually. I want everything automated. I want the money, not the work."
> — Founder, 6-person electronics recruitment agency, Germany

**Numbers:**
```
10 → 40+          57              60 → 25
placements/month  peak month      founder hrs/week
```

**Summary (1 paragraph):**
> Same team. Same recruiters. The two BD analysts moved into candidate-side work where they'd wanted to spend more time anyway. Outbound touches went from 10,000 to 60,000+ a month. Founder hours dropped from 60 to 25 a week.

**Link:** "Read the full case study →" → `/case-studies`

**Position:** Section 8, after How-it-works.

---

### Priority 7 — Add "Your Stack / No Lock-in" section

**Source:** `index.html §06`

```
Your data. Your tools. Your sender reputation.

RecruitmentOS runs on:
- Your ZoomInfo / Apollo / Lusha account
- Your Smartlead / Instantly / Snobio sender
- Your domains
- Your CRM (Bullhorn, Loxo, JobAdder, custom)
- Your dashboard, your data, your sequences

If you ever leave, the entire pipeline keeps working
without us. No lock-in. No hostage taking.
```

**Position:** Section 7, between How-it-works and the case study teaser.

---

### Priority 8 — Add the Guarantee section

**Source:** `index.html §08`

```
100 hiring-manager contacts
and 10 verified replies in 60 days,
or we work free.

Day 30: 50 verified hiring-manager contacts in your
        pipeline, in your target verticals, on your stack.

Day 60: 100 verified contacts plus 10 verified replies
        from hiring managers.

If we miss either milestone, we keep working at zero cost
until both hit. No fine print, no clawback fights,
no proving-it terms.
```

**Position:** Section 9, after the case study teaser — the last thing read before pricing and CTA.

---

### Priority 9 — Add pricing to the live site

**Source:** `pricing.html`

Three tiers. All numbers visible. No "contact for pricing."

| Tier | Price | Setup | Minimum | Best for |
|---|---|---|---|---|
| Pilot | $1,500/mo | $2,500 | 3 months | Agencies under $50K/mo |
| **Operate** | **$2,500/mo** | **$5,000** | **6 months** | **$50K–$400K/mo (recommended)** |
| Scale | $4,500/mo | $10,000 | 12 months | $400K+/mo, multi-office |

Plus tooling costs note: $700–1,200/month, paid directly on your accounts, no markup.

**Position:** Section 10, after the guarantee. Full detail on `/pricing`.

---

### Priority 10 — Add FAQ section

**Source:** `index.html §10` — use all 8 questions unchanged:

1. Will this work for my specific niche?
2. What about API costs (ZoomInfo, scraping, sending)?
3. What if my recruiters can't handle the volume?
4. What if I want to cancel?
5. Can I just buy the software and run it myself?
6. Do you guarantee placements?
7. How is this different from Agency Leads, Apollo, or other tools?
8. What's the catch?

Question 7 ("Those give you data. We run the function.") is a direct answer to the Automindz and Enginy comparison that visitors will make. Question 8 ("We're picky about who we work with.") turns a suspicious question into a confidence signal.

**Position:** Section 11, before the final CTA.

---

### Priority 11 — Replace raw Cal.com embed with pre-qualification form

**Source:** `book.html`

Currently the live site sends every visitor directly to the Cal.com calendar. The HTML site shows 4 questions first:

1. Agency name and website
2. Monthly billing — dropdown with note: *"We work with agencies billing $50K+/month. If you're below, we'll redirect you to a free resource."*
3. Bigger problem this month — clients or candidates — with note: *"We solve client-side BD. If your bottleneck is candidates, we're not your fit."*
4. Team size

Calendar reveals after form submission.

**Effect:** Filters unqualified leads. Signals real curation to qualified ones. Reduces wasted calls.

**Position:** Replace the current FinalCTA Cal.com embed, or precede it.

---

### Priority 12 — Update the BeforeAfter section with real numbers

**Current After column** uses vague statements. Replace with numbers from the case study:

| Current (vague) | Replace with (from case study) |
|---|---|
| Same team = 5-10x sourcing capacity | Same team: 10,000 → 60,000+ outbound touches/month |
| Spot hidden hiring signals before jobs go public | Jobs scraped within hours of posting, not days |
| Win more clients with data-driven insights | 100+ hiring-manager contacts in your pipeline/month |
| Screen thousands of candidates instantly | Candidate-to-job matching surfaced in minutes |
| Reach decision makers first | Hiring managers, not HR. Enriched email on every role. |
| Stay ahead with AI as a competitive advantage | Founder hours: 60 → 25/week. Same headcount. |

---

## 7. Final Page Structure

```
01  HERO
    ├── Eyebrow: "For agencies billing $500K–$5M"
    ├── H1: single pain-led headline (from index.html §01)
    ├── Sub: one sentence on the service
    ├── CTA 1: "Book a 20-min fit call"
    ├── CTA 2: "Calculate my revenue gap →" → /calculator
    └── Trust line: price + setup time + guarantee headline

02  TRUST BAR
    └── [X] agencies · 1M+ jobs/day · 6%+ reply rate · $185 cost/placement

03  WHO IT'S FOR / NOT FOR   ← moved early from HTML §07
    └── ✓ / × two columns · keep "don't book if right column" line

04  THE BOTTLENECK   ← from HTML §02
    └── The Wall · 3 failed alternatives · "remove BD from the human entirely"

05  WHAT WE DO   ← from HTML §03
    └── 3 cards: find jobs → find right person → write outreach that replies

06  THE MATH   ← from HTML §04
    └── Two comparison tables · $185 cost-per-placement punchline

07  HOW IT WORKS
    ├── Condensed 4-step on homepage
    └── Full 5-phase timeline on /how-it-works

08  YOUR STACK / NO LOCK-IN   ← from HTML §06
    └── Your tools · your data · "pipeline keeps working if you leave"

09  CASE STUDY TEASER   ← from case-studies.html
    └── Quote · 3 numbers · 1 paragraph · "Read full case study →"

10  GUARANTEE   ← from HTML §08
    └── 100 contacts + 10 replies · Day 30 + Day 60 milestones · or work free

11  FREE RESOURCES   ← current live site (unique strength)
    └── Calculator · Scorecard · Playbooks — keep as-is

12  PRICING SNAPSHOT   ← from pricing.html
    └── 3 tiers visible · tooling costs note · full detail on /pricing

13  FAQ   ← from HTML §10
    └── All 8 questions unchanged

14  FINAL CTA
    ├── Pre-qualification form (book.html 4 questions)
    ├── Cal.com embed (keep — it's the best format in the category)
    └── Signed: "— Tushar, Founder, RecruitmentOS"

15  FOOTER
```

---

## 8. Nav Changes

**Current nav:** (no pricing link — commented out)

**Target nav** (from HTML site):
```
How it works  ·  Case studies  ·  Pricing  ·  [Book a fit call]
```

The HTML site's nav is correct. Four items. "Book a fit call" instead of "Book a Demo" — more specific, lower pressure, signals a real conversation not a sales pitch.

---

## 9. Copy Tone Reference

The live site uses generic SaaS language. The HTML site uses a founder voice. Apply this to every piece of copy written:

| Live site (change) | HTML site (target) |
|---|---|
| "Book a Demo" | "Book a 20-minute fit call" |
| "AI-Powered Placement Engine" | "BD as a service" |
| "Scale your pipeline" | "You just take the calls" |
| "Setup in <7 days · No long-term contract · Cancel anytime" | "$2,500/mo · $5,000 setup · 100 contacts in 60 days or we work free" |
| "Join 10+ agencies already using RecruitmentOS" | "12 agencies. One promise: pipeline that runs without you." |
| "Our Services" | "What we actually do" |

The HTML tone rule: **be more specific, be more direct, be more honest about what it costs and what it won't do.** That combination — specificity + honesty + directness — is what makes the HTML site convert better than any competitor site reviewed.

---

## 10. Things to Keep from the Live Site

Not everything needs to change. These are current live site strengths no competitor matches:

| Element | Why it works |
|---|---|
| Cal.com embed in FinalCTA | Zero-friction booking — calendar on the page, no redirect |
| BeforeAfter visual component | More polished than any competitor's comparison section |
| FeaturesDiagram (animated robot) | Shows system complexity visually without walls of text |
| Lead magnets (/calculator, /signal-system, etc.) | Top-of-funnel content no competitor has — unique strength |
| ProductDemo section | Working demo beats static description every time |
| Visual design system (orange + dark palette) | More modern and credible at first glance than HTML site |

---

*Last updated: May 2026*  
*Based on: recruitmentos-site/ HTML files · Automindz Solutions · Paiger · Firefish · Recruitment Coach · Enginy*
