'use client';

import React, { useRef, useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Badge } from '@/components/ui';
import SkillsGateModal from './SkillsGateModal';
import { articles } from '@/lib/articles-data';
import { tools } from '@/lib/tools-data';

type TabId = 'resources' | 'tools' | 'articles';

const resources = [
    {
        title: "6 Free AI Skills for Recruiters",
        description: "6 free AI skills built to handle the most time-consuming parts of your workflow — sourcing, screening, outreach, and more.",
        type: "Tool",
        li_duration: "Free Access",
        link: "__skills_gate__",
        image: "/resources/recruitment-skills.webp",
        cta: "Get Free Skills",
        icon: undefined
    },
    {
        title: "AI Hiring Blueprint E-book ",
        description: "A complete system to automate and scale recruitment with AI. Includes 25+ frameworks and 15+ workflows.",
        type: "Guide",
        li_duration: "30+ Pages",
        link: "https://recruitement-os.netlify.app/",
        image: "/resources/ai-hiring-blueprint.webp",
        cta: "Download Free Guide",
        icon: undefined
    },
    {
        title: "Get Free Recruitment AI systems template ",
        description: "Plug-and-play templates to build and automate your AI recruitment system instantly.",
        type: "Template",
        li_duration: "Get Free Access",
        link: "https://long-streetcar-093.notion.site/Recruitment-AI-System-Free-Audit-Resources-336434e7ef8c8037be1ed5df3f5d8f1d?pvs=73",
        cta: "Get Free Access",
        image: "/resources/ai-systems-template.webp",
        icon: undefined
    },
    {
        title: "Get FREE AI Audit",
        description: "A checklist to scan your current workflow for manual bottlenecks and optimization opportunities.",
        type: "Checklist",
        li_duration: "5 min prep",
        link: "https://recruitment-audit.netlify.app/",
        cta: "Scan Now",
        image: "/resources/ai-audit.webp",
        icon: undefined
    },
];

function LazyIframe({ src, height, title, allow, allowFullScreen, className, style }: {
    src: string;
    height?: string | number;
    title: string;
    allow?: string;
    allowFullScreen?: boolean;
    className?: string;
    style?: React.CSSProperties;
}) {
    const ref = useRef<HTMLDivElement>(null);
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setVisible(true);
                    observer.disconnect();
                }
            },
            { rootMargin: '300px' }
        );
        if (ref.current) observer.observe(ref.current);
        return () => observer.disconnect();
    }, []);

    return (
        <div ref={ref} style={{ height: height ? `${height}px` : undefined }} className="w-full">
            {visible ? (
                <iframe
                    src={src}
                    height={height}
                    width="100%"
                    title={title}
                    allow={allow}
                    allowFullScreen={allowFullScreen}
                    className={className}
                    style={{ border: 'none', ...style }}
                />
            ) : (
                <div className="w-full h-full min-h-[200px] bg-[#FAFAFA] animate-pulse rounded-xl" />
            )}
        </div>
    );
}

const GITHUB_URL = 'https://github.com/tushar-mangla/recruitment-skills';
const STORAGE_KEY = 'rOS_unlocked';

const TABS: { id: TabId; label: string; count: number }[] = [
    { id: 'resources', label: 'Free Resources', count: resources.length },
    { id: 'tools', label: 'Tools', count: tools.length },
    { id: 'articles', label: 'Articles', count: articles.length },
];

const VALID_TABS: TabId[] = ['resources', 'tools', 'articles'];

function readTabFromHash(): TabId {
    if (typeof window === 'undefined') return 'resources';
    const hash = window.location.hash.replace('#', '') as TabId;
    return VALID_TABS.includes(hash) ? hash : 'resources';
}

export default function Resources() {
    const [showModal, setShowModal] = useState(false);
    const [activeTab, setActiveTab] = useState<TabId>('resources');

    // Restore tab from URL hash on mount + listen for hashchange (e.g. back button)
    useEffect(() => {
        // Intentional: restore the active tab from the URL hash on mount.
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setActiveTab(readTabFromHash());
        function onHashChange() { setActiveTab(readTabFromHash()); }
        window.addEventListener('hashchange', onHashChange);
        return () => window.removeEventListener('hashchange', onHashChange);
    }, []);

    function selectTab(id: TabId) {
        setActiveTab(id);
        if (typeof window !== 'undefined') {
            // replaceState — clicking tabs doesn't pollute history, but the hash IS in the URL,
            // so navigating away and pressing Back returns to /resources with the right tab active.
            window.history.replaceState(null, '', `#${id}`);
        }
    }

    const handleSkillsClick = useCallback((e: React.MouseEvent) => {
        e.preventDefault();
        if (typeof window !== 'undefined' && localStorage.getItem(STORAGE_KEY) === 'true') {
            window.open(GITHUB_URL, '_blank');
        } else {
            setShowModal(true);
        }
    }, []);

    const sortedArticles = [...articles].sort((a, b) => (a.publishedAt < b.publishedAt ? 1 : -1));

    return (
        <>
        {showModal && <SkillsGateModal onClose={() => setShowModal(false)} redirectUrl={GITHUB_URL} />}
        <section className="pt-8 sm:pt-10 pb-16 md:pb-24 bg-white" id="resources">
            <div className="max-w-[1280px] mx-auto px-4 sm:px-6">

                {/* Page header */}
                <div className="mb-10 sm:mb-12 md:mb-14 max-w-3xl">
                    <p className="text-xs font-bold text-[#FF6A00] uppercase tracking-widest mb-3">Knowledge Base</p>
                    <h2 className="text-[#0A0A0A] text-2xl sm:text-4xl md:text-5xl font-bold tracking-tight leading-[1.1]">
                        Resources to scale your agency
                    </h2>
                </div>

                {/* Tabs — editorial underline style */}
                <div role="tablist" aria-label="Resource categories" className="flex items-center gap-8 sm:gap-12 border-b border-[#E5E5E5] mb-10 sm:mb-14 md:mb-16">
                    {TABS.map(tab => {
                        const isActive = activeTab === tab.id;
                        return (
                            <button
                                key={tab.id}
                                role="tab"
                                aria-selected={isActive}
                                aria-controls={`panel-${tab.id}`}
                                id={`tab-${tab.id}`}
                                onClick={() => selectTab(tab.id)}
                                className={`relative pb-3 sm:pb-4 -mb-[1px] flex items-center gap-2 text-sm sm:text-base font-bold transition-colors ${
                                    isActive
                                        ? 'text-[#0A0A0A] border-b-2 border-[#FF6A00]'
                                        : 'text-[#9CA3AF] hover:text-[#0A0A0A] border-b-2 border-transparent'
                                }`}
                            >
                                {tab.label}
                                <span className={`text-[10px] font-mono ${isActive ? 'text-[#FF6A00]' : 'text-[#9CA3AF]'}`}>
                                    {tab.count}
                                </span>
                            </button>
                        );
                    })}
                </div>

                {/* Panel: Free Resources */}
                <div
                    id="panel-resources"
                    role="tabpanel"
                    aria-labelledby="tab-resources"
                    hidden={activeTab !== 'resources'}
                    className={activeTab === 'resources' ? 'mb-16 sm:mb-24 md:mb-32' : ''}
                >
                    {activeTab === 'resources' && (
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8 md:gap-10">
                            {resources.map((resource, index) => {
                                const cardInner = (
                                    <>
                                        <div className="relative aspect-[4/3] bg-[#FAFAFA] border border-[#E5E5E5] rounded-2xl sm:rounded-2xl mb-4 sm:mb-6 overflow-hidden flex items-center justify-center group-hover:border-[#FF6A00]/20 transition-all duration-300">
                                            <div className="absolute inset-0 opacity-[0.03] group-hover:opacity-[0.06] transition-opacity duration-300">
                                                <div className="absolute inset-0 bg-[radial-gradient(#FF6A00_1.5px,transparent_1.5px)] [background-size:24px_24px]" />
                                            </div>
                                            {resource.image ? (
                                                <Image
                                                    src={resource.image}
                                                    alt={resource.title}
                                                    fill
                                                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 380px"
                                                    className={`group-hover:scale-105 transition-transform duration-700 ${index === 0 ? 'object-contain p-4' : 'object-cover'}`}
                                                />
                                            ) : (
                                                <div className="p-4 bg-white rounded-2xl shadow-sm border border-[#E5E5E5] group-hover:scale-110 transition-transform duration-500">
                                                    {resource.icon}
                                                </div>
                                            )}
                                        </div>
                                        <div className="flex flex-col flex-grow">
                                            <div className="flex items-center gap-3 mb-2 sm:mb-3">
                                                <span className="text-[10px] font-bold tracking-widest uppercase text-[#FF6A00] bg-[#FFF4EB] px-2 py-1 rounded-md">
                                                    {resource.type}
                                                </span>
                                                <span className="text-[10px] font-bold tracking-widest uppercase text-[#9CA3AF]">
                                                    {resource.li_duration}
                                                </span>
                                            </div>
                                            <h3 className="text-lg sm:text-xl font-bold text-[#0A0A0A] mb-2 sm:mb-3 group-hover:text-[#FF6A00] transition-colors">
                                                {resource.title}
                                            </h3>
                                            <p className="text-[#6B7280] text-sm leading-relaxed font-medium mb-4 sm:mb-6">
                                                {resource.description}
                                            </p>
                                            <div className="mt-auto flex items-center text-sm font-bold text-[#0A0A0A] group-hover:gap-1 transition-all">
                                                {resource.cta || "Read Feature"}
                                                <svg className="ml-2 w-4 h-4 opacity-0 group-hover:opacity-100 -translate-x-3 group-hover:translate-x-0 transition-all" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                                </svg>
                                            </div>
                                        </div>
                                    </>
                                );

                                return resource.link === '__skills_gate__' ? (
                                    <div key={index} onClick={handleSkillsClick} className="flex flex-col group cursor-pointer">
                                        {cardInner}
                                    </div>
                                ) : (
                                    <Link key={index} href={resource.link} target="_blank" className="flex flex-col group">
                                        {cardInner}
                                    </Link>
                                );
                            })}
                        </div>
                    )}
                </div>

                {/* Panel: Tools */}
                <div
                    id="panel-tools"
                    role="tabpanel"
                    aria-labelledby="tab-tools"
                    hidden={activeTab !== 'tools'}
                    className={activeTab === 'tools' ? 'mb-16 sm:mb-24 md:mb-32' : ''}
                >
                    {activeTab === 'tools' && (
                        <>
                            <p className="text-sm text-[#6B7280] font-medium mb-8 max-w-2xl">
                                Free interactive tools. One email unlocks all of them.
                            </p>
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 lg:gap-10">
                                {tools.map((tool) => (
                                    <Link key={tool.slug} href={`/tools/${tool.slug}`} className="flex flex-col group">
                                        <div className="relative aspect-[4/3] bg-[#FAFAFA] border border-[#E5E5E5] rounded-2xl sm:rounded-2xl mb-4 sm:mb-5 overflow-hidden flex items-center justify-center group-hover:border-[#FF6A00]/20 transition-all duration-300 p-6">
                                            <div className="absolute inset-0 opacity-[0.04] group-hover:opacity-[0.08] transition-opacity duration-300">
                                                <div className="absolute inset-0 bg-[radial-gradient(#FF6A00_1.5px,transparent_1.5px)] [background-size:24px_24px]" />
                                            </div>
                                            <div className="relative text-center">
                                                <p className="text-[10px] font-bold tracking-widest uppercase text-[#FF6A00] mb-2">{tool.category}</p>
                                                <p className="text-2xl font-black text-[#0A0A0A] leading-tight">{tool.title}</p>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-3 mb-2 sm:mb-3">
                                            <span className="text-[10px] font-bold tracking-widest uppercase text-[#FF6A00] bg-[#FFF4EB] px-2 py-1 rounded-md">
                                                {tool.badge}
                                            </span>
                                            {tool.isNew && <Badge square>New</Badge>}
                                        </div>
                                        <h3 className="text-base sm:text-lg font-bold text-[#0A0A0A] mb-2 leading-snug group-hover:text-[#FF6A00] transition-colors">
                                            {tool.title}
                                        </h3>
                                        <p className="text-[#6B7280] text-sm leading-relaxed font-medium line-clamp-3 mb-3">
                                            {tool.description}
                                        </p>
                                        <span className="mt-auto inline-flex items-center text-sm font-bold text-[#0A0A0A] group-hover:gap-1 transition-all">
                                            Launch tool
                                            <svg className="ml-2 w-4 h-4 opacity-0 group-hover:opacity-100 -translate-x-3 group-hover:translate-x-0 transition-all" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                            </svg>
                                        </span>
                                    </Link>
                                ))}
                            </div>

                            <div className="mt-10 sm:mt-12 flex justify-center">
                                <Link
                                    href="/tools"
                                    className="inline-flex items-center text-sm font-bold text-[#0A0A0A] hover:text-[#FF6A00] transition-colors group"
                                >
                                    Open tools hub
                                    <svg className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                    </svg>
                                </Link>
                            </div>
                        </>
                    )}
                </div>

                {/* Panel: Articles */}
                <div
                    id="panel-articles"
                    role="tabpanel"
                    aria-labelledby="tab-articles"
                    hidden={activeTab !== 'articles'}
                    className={activeTab === 'articles' ? 'mb-16 sm:mb-24 md:mb-32' : ''}
                >
                    {activeTab === 'articles' && (
                        <>
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 lg:gap-10">
                                {sortedArticles.map((article) => {
                                    const href = article.customRoute || `/resources/articles/${article.slug}`;
                                    return (
                                        <Link key={article.slug} href={href} className="flex flex-col group">
                                            <div className="relative aspect-[4/3] bg-[#FAFAFA] border border-[#E5E5E5] rounded-2xl sm:rounded-2xl mb-4 sm:mb-5 overflow-hidden flex items-center justify-center group-hover:border-[#FF6A00]/20 transition-all duration-300">
                                                <div className="absolute inset-0 opacity-[0.04] group-hover:opacity-[0.08] transition-opacity duration-300">
                                                    <div className="absolute inset-0 bg-[radial-gradient(#FF6A00_1.5px,transparent_1.5px)] [background-size:24px_24px]" />
                                                </div>
                                                {article.image ? (
                                                    <Image
                                                        src={article.image}
                                                        alt={article.title}
                                                        fill
                                                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 380px"
                                                        className="object-cover group-hover:scale-105 transition-transform duration-700"
                                                    />
                                                ) : (
                                                    <div className="text-center px-6">
                                                        <p className="text-[10px] font-bold tracking-widest uppercase text-[#FF6A00] mb-2">{article.category}</p>
                                                        <p className="text-[#9CA3AF] text-xs font-mono">{article.readTime}</p>
                                                    </div>
                                                )}
                                            </div>
                                            <div className="flex items-center gap-3 mb-2 sm:mb-3">
                                                <span className="text-[10px] font-bold tracking-widest uppercase text-[#FF6A00] bg-[#FFF4EB] px-2 py-1 rounded-md">
                                                    {article.category}
                                                </span>
                                                <span className="text-[10px] font-bold tracking-widest uppercase text-[#9CA3AF]">
                                                    {article.readTime}
                                                </span>
                                            </div>
                                            <h3 className="text-base sm:text-lg font-bold text-[#0A0A0A] mb-2 leading-snug group-hover:text-[#FF6A00] transition-colors">
                                                {article.title}
                                            </h3>
                                            <p className="text-[#6B7280] text-sm leading-relaxed font-medium line-clamp-3">
                                                {article.description}
                                            </p>
                                        </Link>
                                    );
                                })}
                            </div>

                            <div className="mt-10 sm:mt-12 flex justify-center">
                                <Link
                                    href="/resources/articles"
                                    className="inline-flex items-center text-sm font-bold text-[#0A0A0A] hover:text-[#FF6A00] transition-colors group"
                                >
                                    Open full articles index
                                    <svg className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                    </svg>
                                </Link>
                            </div>
                        </>
                    )}
                </div>

                {/* YouTube Video Section */}
                <div className="mb-16 sm:mb-24 md:mb-32 pt-12 sm:pt-16 md:pt-20 border-t border-[#E5E5E5]">
                    <div className="mb-8 sm:mb-12">
                        <h2 className="text-[#0A0A0A] text-2xl sm:text-4xl md:text-5xl font-bold tracking-tight mb-4">
                            Learn how to implement AI in your business
                        </h2>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8 lg:gap-12">
                        {[
                            "https://www.youtube.com/embed/pUzira_UPoU",
                            "https://www.youtube.com/embed/IyBPV82u4FI"
                        ].map((video, idx) => (
                            <div key={idx} className="bg-white border-[0.5px] border-[#E5E5E5] rounded-2xl p-2 sm:p-3 shadow-[0_4px_25px_rgba(0,0,0,0.02)] hover:shadow-[0_25px_55px_rgba(0,0,0,0.07)] hover:-translate-y-1 sm:hover:-translate-y-3 transition-all duration-500 ease-out group">
                                <div className="relative aspect-video rounded-xl overflow-hidden border-[0.5px] border-[#F3F4F6] bg-black shadow-inner">
                                    <LazyIframe
                                        src={video}
                                        title={`YouTube video ${idx + 1}`}
                                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                        allowFullScreen
                                        className="absolute inset-0 w-full h-full opacity-90 group-hover:opacity-100 transition-opacity"
                                    />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* LinkedIn Feed Section */}
                <div className="pt-12 sm:pt-16 md:pt-20 border-t border-[#E5E5E5]">
                    <div className="mb-10 sm:mb-14 md:mb-16">
                        <p className="text-xs font-bold text-[#FF6A00] uppercase tracking-widest mb-3">Fresh Insights</p>
                        <h2 className="text-[#0A0A0A] text-2xl sm:text-4xl md:text-5xl font-bold tracking-tight leading-[1.1] mb-4 sm:mb-6">
                            Straight from LinkedIn
                        </h2>
                        <p className="text-[#6B7280] text-sm sm:text-base sm:text-lg max-w-2xl font-medium">
                            What we&#39;re building, learning, and achieving—shared openly with you.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-8">
                        {[
                            { src: "https://www.linkedin.com/embed/feed/update/urn:li:share:7444647634025406464?collapsed=1", h: "670" },
                            { src: "https://www.linkedin.com/embed/feed/update/urn:li:share:7443408167159566336?collapsed=1", h: "670" },
                            { src: "https://www.linkedin.com/embed/feed/update/urn:li:ugcPost:7434252974710878210?collapsed=1", h: "567" },
                            { src: "https://www.linkedin.com/embed/feed/update/urn:li:ugcPost:7425284186292314112?collapsed=1", h: "567" },
                            { src: "https://www.linkedin.com/embed/feed/update/urn:li:share:7429249511048491008?collapsed=1", h: "645" },
                            { src: "https://www.linkedin.com/embed/feed/update/urn:li:share:7420553911931002881?collapsed=1", h: "670" },
                            { src: "https://www.linkedin.com/embed/feed/update/urn:li:share:7445571343707910144?collapsed=1", h: "581" },
                            { src: "https://www.linkedin.com/embed/feed/update/urn:li:share:7445098631516545024?collapsed=1", h: "670" },
                            { src: "https://www.linkedin.com/embed/feed/update/urn:li:share:7446272906940284928?collapsed=1", h: "670" }
                        ].map((post, idx) => (
                            <div key={idx} className="bg-white border border-[#E5E5E5] rounded-2xl sm:rounded-[2rem] p-3 sm:p-4 shadow-[0_4px_20px_rgba(0,0,0,0.03)] hover:shadow-[0_20px_50px_rgba(0,0,0,0.08)] hover:-translate-y-1 sm:hover:-translate-y-3 transition-all duration-500 ease-out flex flex-col group">
                                <div className="rounded-xl sm:rounded-[1.5rem] overflow-hidden border border-[#F3F4F6] bg-[#FAFAFA]">
                                    <LazyIframe
                                        src={post.src}
                                        height={post.h}
                                        title={`LinkedIn post ${idx + 1}`}
                                        className="w-full opacity-90 group-hover:opacity-100 transition-opacity"
                                    />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
        </>
    );
}
