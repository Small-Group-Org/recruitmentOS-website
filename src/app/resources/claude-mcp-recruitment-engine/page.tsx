import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { buildCanonical } from '@/lib/seo';

export const metadata = {
    title: 'Claude MCP Recruitment Engine — 7 AI workflows for recruiters',
    description: 'A practical guide to building an AI-powered recruitment engine with Claude MCP: sourcing, enrichment, screening, outreach, and reporting workflows you can copy.',
    alternates: { canonical: buildCanonical('/resources/claude-mcp-recruitment-engine') },
    openGraph: {
        title: 'Claude MCP Recruitment Engine — 7 AI workflows for recruiters',
        description: 'A practical guide to building an AI-powered recruitment engine with Claude MCP: sourcing, enrichment, screening, outreach, and reporting workflows.',
        url: buildCanonical('/resources/claude-mcp-recruitment-engine'),
        siteName: 'RecruitmentOS',
        type: 'article',
    },
};

const steps = [
    {
        number: "01",
        title: "Finding Job & Hiring Signals",
        subtitle: "Where opportunities exist",
        body: "Most recruiters waste time chasing companies randomly. Instead, you want intent signals. Use Apify to scrape job boards, LinkedIn jobs, and company career pages. Use Exa.ai to find companies that recently raised funding, are hiring aggressively, or have new job postings in your niche.",
        example: '"Find SaaS companies in the US that raised funding in the last 90 days and are hiring SDRs"',
        output: ["List of companies", "Hiring trends", "Decision makers"],
        tools: ["Apify", "Exa.ai"],
    },
    {
        number: "02",
        title: "Lead Enrichment",
        subtitle: "Turning raw data into usable contacts",
        body: "Finding companies is step 1. Now you need decision makers. Claude takes LinkedIn profiles, extracts emails, verifies contacts, and enriches data including role, company size, and tech stack.",
        example: '"Find HR managers and founders in these companies and get verified emails"',
        output: ["Clean contact list ready for outreach", "No manual copy-paste needed"],
        tools: ["RapidAPI", "Prospeo"],
    },
    {
        number: "03",
        title: "Candidate Sourcing",
        subtitle: "Finding the right candidates",
        body: "Flip the system. Instead of companies, you search for candidates. Use Apify to scrape LinkedIn profiles. Use Claude to filter based on skills, experience, and keywords.",
        example: '"Find 50 frontend developers with React experience and 2–4 years experience in India"',
        output: ["Pre-qualified candidate list instantly", "Ranked by relevance"],
        tools: ["Apify", "Claude AI"],
    },
    {
        number: "04",
        title: "Candidate Screening",
        subtitle: "AI shortlisting",
        body: "This is where most recruiters lose time. Upload resumes and ask Claude to score candidates against the job description. Move from 100 resumes to top 10 in seconds.",
        example: '"Score these candidates based on job description and give top 10"',
        output: ["Skills matched", "Gaps identified", "Candidates ranked"],
        tools: ["Claude AI"],
    },
    {
        number: "05",
        title: "Outreach Automation",
        subtitle: "Getting replies at scale",
        body: "Generate personalized emails, send campaigns via email and LinkedIn, and track replies — all from a single instruction to Claude.",
        example: '"Create a personalized outreach for this hiring manager based on their company and job post"',
        output: ["Highly personalized message", "Context-based pitch", "Auto-added to campaign"],
        tools: ["Lemlist", "Claude AI"],
    },
    {
        number: "06",
        title: "Proposal Generation",
        subtitle: "Closing clients",
        body: "Claude understands client needs and generates custom recruitment proposals. Go from idea to ready proposal in seconds.",
        example: '"Create a proposal for hiring 3 SDRs"',
        output: ["Hiring timeline", "Candidate profile", "Pricing", "Value proposition"],
        tools: ["Claude AI"],
    },
    {
        number: "07",
        title: "Pipeline & Data Management",
        subtitle: "Your backend system",
        body: "Claude manages your entire pipeline in Airtable. Add leads, update candidate status, track outreach, and generate reports — all through plain English commands.",
        example: '"Show me all candidates in interview stage" / "Update this candidate to shortlisted"',
        output: ["No manual CRM work", "Real-time pipeline visibility"],
        tools: ["Airtable", "Claude AI"],
    },
];

const stackItems = [
    { step: "Find hiring companies", tools: "Apify + Exa" },
    { step: "Enrich contacts", tools: "RapidAPI + Prospeo" },
    { step: "Source candidates", tools: "Apify" },
    { step: "Screen candidates", tools: "Claude AI" },
    { step: "Send outreach", tools: "Lemlist" },
    { step: "Manage pipeline", tools: "Airtable" },
];

export default function ClaudeMCPPage() {
    return (
        <main className="min-h-screen bg-white">
            <div className="pt-12 pb-24">
                <div className="max-w-[1100px] mx-auto px-6 sm:px-10">

                    {/* Back Link */}
                    <Link
                        href="/resources"
                        className="inline-flex items-center text-sm text-black hover:text-[#FF6A00] transition-colors mb-16"
                    >
                        <svg className="mr-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                        </svg>
                        BACK TO RESOURCES
                    </Link>

                    {/* Badge */}
                    <div className="mb-6">
                        <span className="text-[10px] font-bold tracking-widest uppercase text-[#FF6A00] bg-[#FFF4EB] px-3 py-1.5 rounded-md">
                            Deep Dive · AI Stack
                        </span>
                    </div>

                    {/* Title */}
                    <h1 className="text-3xl md:text-5xl font-bold text-[#0A0A0A] leading-[1.1] tracking-tight mb-6 max-w-4xl">
                        How Recruiters Can Use Claude AI + MCP to Build a Full Recruitment Engine
                    </h1>

                    <p className="text-[#6B7280] text-lg max-w-3xl mb-16 leading-relaxed">
                        Think of Claude with MCP as your <span className="font-semibold text-[#0A0A0A]">&#34;AI recruiter brain&#34;</span> that connects with multiple tools and does the work for you. Instead of switching between 10 tools, you give instructions in plain English and the system executes everything.
                    </p>

                    {/* GIF / Hero visual */}
                    <div className="rounded-2xl overflow-hidden border border-[#E5E5E5] mb-24 bg-[#FAFAFA]">
                        <Image
                            src="/resources/claude-ai-mcp.webp"
                            alt="Claude AI + MCP Recruitment Engine Demo"
                            width={1600}
                            height={1001}
                            className="w-full h-auto object-cover"
                            sizes="(max-width: 1024px) 100vw, 1100px"
                        />
                    </div>

                    {/* Intro */}
                    <div className="mb-20">
                        <h2 className="text-2xl font-bold text-[#0A0A0A] mb-4">The Stack</h2>
                        <p className="text-[#6B7280] text-base leading-relaxed max-w-3xl">
                            The full stack includes <strong className="text-[#0A0A0A]">RapidAPI, Apify, Prospeo, Exa.ai, Lemlist,</strong> and <strong className="text-[#0A0A0A]">Airtable</strong>. Together, they form a complete recruitment pipeline — all orchestrated by Claude through MCP.
                        </p>
                    </div>

                    {/* Steps */}
                    <div className="space-y-20 mb-28">
                        {steps.map((step) => (
                            <div key={step.number} className="grid grid-cols-1 lg:grid-cols-[80px_1fr] gap-6 lg:gap-12 border-t border-[#E5E5E5] pt-10">
                                <div>
                                    <span className="text-4xl font-black text-[#F3F4F6] select-none">{step.number}</span>
                                </div>
                                <div>
                                    <div className="flex flex-wrap items-center gap-3 mb-3">
                                        <h3 className="text-xl font-bold text-[#0A0A0A]">{step.title}</h3>
                                        <span className="text-xs text-[#9CA3AF] font-medium">{step.subtitle}</span>
                                    </div>
                                    <p className="text-[#6B7280] text-sm leading-relaxed mb-5 max-w-2xl">{step.body}</p>

                                    {/* Tools */}
                                    <div className="flex flex-wrap gap-2 mb-6">
                                        {step.tools.map((tool) => (
                                            <span key={tool} className="text-[10px] font-bold tracking-widest uppercase bg-[#F9FAFB] border border-[#E5E5E5] text-[#374151] px-2 py-1 rounded-md">
                                                {tool}
                                            </span>
                                        ))}
                                    </div>

                                    {/* Example */}
                                    <div className="bg-[#0A0A0A] rounded-xl px-5 py-4 mb-6 font-mono text-sm text-[#FF6A00]">
                                        {step.example}
                                    </div>

                                    {/* Output */}
                                    <div>
                                        <p className="text-xs font-bold uppercase tracking-widest text-[#9CA3AF] mb-2">Output</p>
                                        <ul className="space-y-1">
                                            {step.output.map((item) => (
                                                <li key={item} className="flex items-center gap-2 text-sm text-[#374151]">
                                                    <span className="w-1 h-1 rounded-full bg-[#FF6A00] flex-shrink-0" />
                                                    {item}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Final System Flow */}
                    <div className="bg-[#0A0A0A] rounded-2xl px-8 sm:px-12 py-12 mb-20">
                        <h2 className="text-white text-2xl font-bold mb-2">Final System Flow</h2>
                        <p className="text-[#9CA3AF] text-sm mb-10">Everything controlled by Claude using simple commands.</p>
                        <div className="space-y-0">
                            {stackItems.map((item, idx) => (
                                <div key={idx} className="flex items-center gap-4 py-4 border-b border-white/10 last:border-0">
                                    <span className="text-[#FF6A00] font-black text-sm w-6 flex-shrink-0">{String(idx + 1).padStart(2, '0')}</span>
                                    <span className="text-white font-medium text-sm flex-1">{item.step}</span>
                                    <span className="text-[#6B7280] text-xs font-mono">{item.tools}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Real Insight */}
                    <div className="border-l-4 border-[#FF6A00] pl-8 py-2 mb-20">
                        <p className="text-xs font-bold uppercase tracking-widest text-[#FF6A00] mb-3">Real Insight</p>
                        <p className="text-[#0A0A0A] text-xl font-bold leading-snug max-w-2xl mb-4">
                            Most recruiters think tools = advantage. But real advantage is speed, personalization, and data quality.
                        </p>
                        <p className="text-[#6B7280] text-sm">
                            Claude + MCP gives all three. That&#39;s why agencies using this system scale faster.
                        </p>
                    </div>

                    {/* CTA */}
                    <div className="flex flex-col sm:flex-row gap-4">
                        <Button href="/resources">
                            Explore All Resources
                        </Button>
                        <Button
                            href="https://long-streetcar-093.notion.site/Recruitment-AI-System-Free-Audit-Resources-336434e7ef8c8037be1ed5df3f5d8f1d?pvs=73"
                            target="_blank"
                            variant="secondary"
                        >
                            Get Free AI Templates
                        </Button>
                    </div>

                </div>
            </div>
            <Footer />
        </main>
    );
}
