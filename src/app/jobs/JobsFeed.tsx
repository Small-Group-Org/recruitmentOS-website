'use client';

import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import Link from 'next/link';

// ─── Types ──────────────────────────────────────────────────────────────────

interface JobCompany {
    id: string | null;
    name: string | null;
    short_name: string | null;
    website: string | null;
    linkedin_url: string | null;
    industry: string | null;
    location_country: string | null;
    location_city: string | null;
}

interface Job {
    id: string;
    title: string;
    short_title: string | null;
    job_url: string;
    summary: string | null;
    job_location: string | null;
    source: string;
    job_description: string | null;
    requirements: string | null;
    required_skills: string[] | null;
    required_certifications: string[] | null;
    required_education: string | null;
    min_experience: number | null;
    max_experience: number | null;
    experience_level: string | null;
    remote_allowed: boolean | null;
    salary_range_min: string | null;
    salary_range_max: string | null;
    job_category: string | null;
    job_sub_category: string | null;
    job_type: string | null;
    date_posted: string | null;
    scraped_at: string | null;
    created_at: string;
    campaign_id: string;
    company: JobCompany;
}

interface Pagination {
    currentPage: number;
    totalPages: number;
    totalCount: number;
    limit: number;
    hasNextPage: boolean;
    hasPrevPage: boolean;
}

interface Filters {
    title?: string;
    sources?: string;
    industry?: string;
    location?: string;
    experienceLevel?: string;
    remoteAllowed?: string;
    sortBy?: string;
    sortOrder?: string;
    page?: number;
    limit?: number;
    isProcessed?: string;
}

// ─── Constants ──────────────────────────────────────────────────────────────

const SOURCE_OPTIONS = [
    { value: '', label: 'All Sources' },
    { value: 'linkedin', label: 'LinkedIn' },
    { value: 'indeed', label: 'Indeed' },
    { value: 'stepstone', label: 'StepStone' },
    { value: 'xing', label: 'XING' },
    { value: 'reed', label: 'Reed' },
];

const INDUSTRY_OPTIONS = [
    { value: '', label: 'All Industries' },
    { value: 'accounting', label: 'Accounting' },
    { value: 'aerospace_defense', label: 'Aerospace & Defense' },
    { value: 'agriculture', label: 'Agriculture' },
    { value: 'automotive', label: 'Automotive' },
    { value: 'biotech', label: 'Biotech' },
    { value: 'chemicals', label: 'Chemicals' },
    { value: 'construction', label: 'Construction' },
    { value: 'consumer_goods', label: 'Consumer Goods' },
    { value: 'consumer_services', label: 'Consumer Services' },
    { value: 'education', label: 'Education' },
    { value: 'energy_utilities', label: 'Energy & Utilities' },
    { value: 'finance', label: 'Finance' },
    { value: 'food_beverage', label: 'Food & Beverage' },
    { value: 'government', label: 'Government' },
    { value: 'healthcare', label: 'Healthcare' },
    { value: 'hospitality', label: 'Hospitality' },
    { value: 'insurance', label: 'Insurance' },
    { value: 'legal', label: 'Legal' },
    { value: 'logistics_transportation', label: 'Logistics & Transport' },
    { value: 'manufacturing', label: 'Manufacturing' },
    { value: 'marketing_advertising', label: 'Marketing & Advertising' },
    { value: 'media_entertainment', label: 'Media & Entertainment' },
    { value: 'mining_metals', label: 'Mining & Metals' },
    { value: 'non_profit', label: 'Non-Profit' },
    { value: 'professional_services', label: 'Professional Services' },
    { value: 'real_estate', label: 'Real Estate' },
    { value: 'retail', label: 'Retail' },
    { value: 'saas', label: 'SaaS' },
    { value: 'staffing_recruitment', label: 'Staffing & Recruitment' },
    { value: 'telecom', label: 'Telecom' },
    { value: 'wholesale_distribution', label: 'Wholesale Distribution' },
];

const EXPERIENCE_OPTIONS = [
    { value: '', label: 'All Levels' },
    { value: 'Junior', label: 'Junior' },
    { value: 'Mid', label: 'Mid-Level' },
    { value: 'Senior', label: 'Senior' },
    { value: 'Lead', label: 'Lead' },
    { value: 'Executive', label: 'Executive' },
];

const SORT_OPTIONS = [
    { value: 'scraped_at', label: 'Recently Scraped' },
    { value: 'date_posted', label: 'Date Posted' },
    { value: 'created_at', label: 'Date Added' },
];

const SOURCE_COLORS: Record<string, { bg: string; text: string; dot: string }> = {
    linkedin: { bg: '#EFF6FF', text: '#1D4ED8', dot: '#3B82F6' },
    indeed: { bg: '#EEF2FF', text: '#4338CA', dot: '#6366F1' },
    stepstone: { bg: '#ECFDF5', text: '#047857', dot: '#10B981' },
    xing: { bg: '#F0FDFA', text: '#0F766E', dot: '#14B8A6' },
    reed: { bg: '#FEF2F2', text: '#B91C1C', dot: '#EF4444' },
};

const COMPANY_COLORS = [
    '#FF6A00', '#3B82F6', '#8B5CF6', '#EC4899', '#14B8A6',
    '#F59E0B', '#EF4444', '#6366F1', '#10B981', '#F97316',
];

const CLIENT_RATE_LIMIT = 30;
const CLIENT_RATE_WINDOW_MS = 15 * 60 * 1000;

// ─── Helpers ────────────────────────────────────────────────────────────────

function timeAgo(dateStr: string | null): string {
    if (!dateStr) return '';
    const diff = Date.now() - new Date(dateStr).getTime();
    const mins = Math.floor(diff / 60000);
    if (mins < 1) return 'Just now';
    if (mins < 60) return `${mins}m ago`;
    const hrs = Math.floor(mins / 60);
    if (hrs < 24) return `${hrs}h ago`;
    const days = Math.floor(hrs / 24);
    if (days < 30) return `${days}d ago`;
    return new Date(dateStr).toLocaleDateString('en-GB', { day: 'numeric', month: 'short' });
}

function formatSalary(min: string | null, max: string | null): string | null {
    if (!min && !max) return null;
    const fmt = (v: string) => {
        const n = parseFloat(v);
        if (n >= 1000) return `${(n / 1000).toFixed(n % 1000 === 0 ? 0 : 1)}k`;
        return v;
    };
    if (min && max) return `${fmt(min)} – ${fmt(max)}`;
    if (min) return `From ${fmt(min)}`;
    return `Up to ${fmt(max!)}`;
}

function capitalise(s: string): string {
    return s.charAt(0).toUpperCase() + s.slice(1).replace(/_/g, ' ');
}

function getCompanyColor(name: string): string {
    let hash = 0;
    for (let i = 0; i < name.length; i++) hash = name.charCodeAt(i) + ((hash << 5) - hash);
    return COMPANY_COLORS[Math.abs(hash) % COMPANY_COLORS.length];
}

function getCompanyInitials(name: string): string {
    return name
        .split(/\s+/)
        .slice(0, 2)
        .map(w => w[0])
        .join('')
        .toUpperCase();
}

function stripHtml(html: string): string {
    return html.replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim();
}

function getDescriptionSnippet(job: Job): string | null {
    const raw = job.job_description || job.summary || null;
    if (!raw) return null;
    const clean = stripHtml(raw);
    if (clean.length <= 180) return clean;
    return clean.slice(0, 180).replace(/\s+\S*$/, '') + '…';
}

// ─── Client-Side Rate Limiter ───────────────────────────────────────────────

function useClientRateLimit() {
    const getState = useCallback(() => {
        try {
            const raw = localStorage.getItem('ros_pj_ratelimit');
            if (!raw) return { count: 0, windowStart: Date.now() };
            const parsed = JSON.parse(raw);
            if (Date.now() - parsed.windowStart > CLIENT_RATE_WINDOW_MS) {
                return { count: 0, windowStart: Date.now() };
            }
            return parsed as { count: number; windowStart: number };
        } catch {
            return { count: 0, windowStart: Date.now() };
        }
    }, []);

    const recordRequest = useCallback(() => {
        const state = getState();
        state.count += 1;
        localStorage.setItem('ros_pj_ratelimit', JSON.stringify(state));
    }, [getState]);

    const isLimited = useCallback(() => getState().count >= CLIENT_RATE_LIMIT, [getState]);

    const resetTime = useCallback(() => {
        const state = getState();
        const elapsed = Date.now() - state.windowStart;
        return Math.max(1, Math.ceil((CLIENT_RATE_WINDOW_MS - elapsed) / 60000));
    }, [getState]);

    return useMemo(() => ({ recordRequest, isLimited, resetTime }), [recordRequest, isLimited, resetTime]);
}

// ─── Main Component ─────────────────────────────────────────────────────────

export default function JobsFeed() {
    // State
    const [jobs, setJobs] = useState<Job[]>([]);
    const [pagination, setPagination] = useState<Pagination | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [expandedJob, setExpandedJob] = useState<string | null>(null);

    // Filters
    const [searchText, setSearchText] = useState('');
    const [source, setSource] = useState('');
    const [industry, setIndustry] = useState('');
    const [location, setLocation] = useState('');
    const [experienceLevel, setExperienceLevel] = useState('');
    const [remoteOnly, setRemoteOnly] = useState(false);
    const [sortBy, setSortBy] = useState('scraped_at');
    const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');
    const [page, setPage] = useState(1);
    const [showFilters, setShowFilters] = useState(false);
    const [rateLimited, setRateLimited] = useState(false);

    const debounceRef = useRef<ReturnType<typeof setTimeout>>(null);
    const rateLimit = useClientRateLimit();

    const activeFilterCount = useMemo(() => {
        let c = 0;
        if (source) c++;
        if (industry) c++;
        if (location.trim()) c++;
        if (experienceLevel) c++;
        if (remoteOnly) c++;
        return c;
    }, [source, industry, location, experienceLevel, remoteOnly]);

    // ── Fetch ───────────────────────────────────────────────────────────────

    const fetchJobs = useCallback(async (filters: Filters) => {
        if (rateLimit.isLimited()) {
            setRateLimited(true);
            setLoading(false);
            return;
        }
        setRateLimited(false);
        setLoading(true);
        setError(null);

        try {
            rateLimit.recordRequest();
            const params = new URLSearchParams();
            for (const [k, v] of Object.entries(filters)) {
                if (v !== undefined && v !== '' && v !== null) params.set(k, String(v));
            }

            const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000';
            const res = await fetch(`${apiUrl}/api/v1/public-jobs?${params.toString()}`);
            if (res.status === 429) {
                setRateLimited(true);
                setLoading(false);
                return;
            }
            if (!res.ok) throw new Error('Failed to load jobs');

            const json = await res.json();
            setJobs(json.data?.data ?? []);
            setPagination(json.data?.pagination ?? null);
        } catch (err: any) {
            setError(err?.message ?? 'Something went wrong');
        } finally {
            setLoading(false);
        }
    }, [rateLimit]);

    const triggerFetch = useCallback(
        (p?: number, immediate = false) => {
            const filters: Filters = {
                title: searchText.trim() || undefined,
                sources: source || undefined,
                industry: industry || undefined,
                location: location.trim() || undefined,
                experienceLevel: experienceLevel || undefined,
                remoteAllowed: remoteOnly ? 'true' : undefined,
                sortBy,
                sortOrder,
                page: p ?? page,
                limit: 20,
            };

            if (immediate) {
                fetchJobs(filters);
            } else {
                if (debounceRef.current) clearTimeout(debounceRef.current);
                debounceRef.current = setTimeout(() => fetchJobs(filters), 800);
            }
        },
        [page, sortBy, sortOrder, searchText, source, industry, location, experienceLevel, remoteOnly, fetchJobs],
    );

    useEffect(() => {
        setPage(1);
        triggerFetch(1);
        return () => { if (debounceRef.current) clearTimeout(debounceRef.current); };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [searchText, source, industry, location, experienceLevel, remoteOnly, sortBy, sortOrder]);

    const handlePageChange = useCallback((p: number) => {
        setPage(p);
        triggerFetch(p, true);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }, [triggerFetch]);

    const clearFilters = () => {
        setSearchText('');
        setSource('');
        setIndustry('');
        setLocation('');
        setExperienceLevel('');
        setRemoteOnly(false);
    };

    // ── Render ──────────────────────────────────────────────────────────────

    return (
        <>
            {/* ─── Compact Header + Search ──────────────────────────────────── */}
            <div className="sticky-job-header" style={{
                position: 'sticky',
                top: 80,
                zIndex: 40,
                background: 'rgba(255,255,255,0.92)',
                backdropFilter: 'blur(12px)',
                borderBottom: '1px solid var(--border)',
            }}>
                <div className="px-4 md:px-6" style={{ maxWidth: 1280, margin: '0 auto', paddingTop: 12, paddingBottom: 12 }}>
                    {/* Row 1: Title + Search + Sort */}
                    <div style={{ display: 'flex', alignItems: 'center', gap: 16, flexWrap: 'wrap' }}>
                        {/* Left: Title + count */}
                        <div style={{ display: 'flex', alignItems: 'center', gap: 10, flexShrink: 0 }}>
                            <h1 style={{
                                fontSize: 20,
                                fontWeight: 800,
                                letterSpacing: '-0.02em',
                                margin: 0,
                                lineHeight: 1.2,
                            }}>
                                Job Feed
                            </h1>
                            {pagination && !loading && (
                                <span style={{
                                    fontSize: 12,
                                    fontWeight: 600,
                                    color: 'var(--brand)',
                                    background: 'var(--brand-tint)',
                                    padding: '2px 8px',
                                    borderRadius: 12,
                                }}>
                                    {pagination.totalCount.toLocaleString()} jobs
                                </span>
                            )}
                        </div>

                        {/* Center: Search */}
                        <div style={{
                            flex: 1,
                            minWidth: 200,
                            maxWidth: 480,
                            display: 'flex',
                            alignItems: 'center',
                            gap: 8,
                            padding: '7px 12px',
                            borderRadius: 8,
                            border: '1px solid var(--border)',
                            background: 'var(--gray-50)',
                            transition: 'border-color 0.2s, box-shadow 0.2s',
                        }}>
                            <SearchIcon />
                            <input
                                id="job-search-input"
                                type="text"
                                placeholder="Search by job title…"
                                value={searchText}
                                onChange={e => setSearchText(e.target.value)}
                                style={{
                                    flex: 1,
                                    border: 'none',
                                    outline: 'none',
                                    background: 'transparent',
                                    fontSize: 13,
                                    color: 'var(--foreground)',
                                }}
                            />
                            {searchText && (
                                <button
                                    onClick={() => setSearchText('')}
                                    style={{
                                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                                        width: 20, height: 20, borderRadius: 4,
                                        background: 'var(--gray-200)', border: 'none', cursor: 'pointer',
                                        color: 'var(--muted)', padding: 0,
                                    }}
                                >
                                    <XIcon size={10} />
                                </button>
                            )}
                        </div>

                        {/* Right: Filters toggle + Sort */}
                        <div style={{ display: 'flex', alignItems: 'center', gap: 6, flexShrink: 0 }}>
                            <button
                                id="toggle-filters-btn"
                                onClick={() => setShowFilters(v => !v)}
                                style={{
                                    display: 'inline-flex', alignItems: 'center', gap: 5,
                                    padding: '6px 10px', borderRadius: 6,
                                    border: activeFilterCount > 0 ? '1px solid var(--brand)' : '1px solid var(--border)',
                                    background: activeFilterCount > 0 ? 'var(--brand-tint)' : 'white',
                                    color: activeFilterCount > 0 ? 'var(--brand)' : 'var(--foreground)',
                                    fontSize: 12, fontWeight: 600, cursor: 'pointer',
                                    transition: 'all 0.15s',
                                }}
                            >
                                <FilterIcon />
                                Filters
                                {activeFilterCount > 0 && (
                                    <span style={{
                                        display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                                        width: 16, height: 16, borderRadius: '50%',
                                        background: 'var(--brand)', color: 'white',
                                        fontSize: 9, fontWeight: 700,
                                    }}>
                                        {activeFilterCount}
                                    </span>
                                )}
                                <ChevronIcon rotated={showFilters} />
                            </button>

                            {activeFilterCount > 0 && (
                                <button
                                    onClick={clearFilters}
                                    style={{
                                        display: 'inline-flex', alignItems: 'center', gap: 3,
                                        padding: '5px 8px', border: 'none', background: 'none',
                                        color: 'var(--muted)', fontSize: 11, fontWeight: 500,
                                        cursor: 'pointer',
                                    }}
                                >
                                    <XIcon size={10} /> Clear
                                </button>
                            )}

                            <div style={{ width: 1, height: 20, background: 'var(--border)', margin: '0 2px' }} />

                            <select
                                id="sort-select"
                                value={sortBy}
                                onChange={e => setSortBy(e.target.value)}
                                disabled={loading}
                                style={{
                                    padding: '6px 26px 6px 8px', borderRadius: 6,
                                    border: '1px solid var(--border)', background: 'white',
                                    fontSize: 12, fontWeight: 500, color: 'var(--foreground)',
                                    cursor: 'pointer', outline: 'none',
                                    appearance: 'none' as const,
                                    backgroundImage: `url("data:image/svg+xml,%3Csvg width='8' height='5' viewBox='0 0 10 6' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M1 1L5 5L9 1' stroke='%236B7280' stroke-width='1.5' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E")`,
                                    backgroundRepeat: 'no-repeat',
                                    backgroundPosition: 'right 8px center',
                                }}
                            >
                                {SORT_OPTIONS.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
                            </select>

                            <button
                                id="sort-order-btn"
                                onClick={() => setSortOrder(o => o === 'desc' ? 'asc' : 'desc')}
                                title={sortOrder === 'desc' ? 'Newest first' : 'Oldest first'}
                                style={{
                                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                                    width: 30, height: 30, borderRadius: 6,
                                    border: '1px solid var(--border)', background: 'white',
                                    fontSize: 13, cursor: 'pointer', color: 'var(--foreground)',
                                    transition: 'background 0.15s',
                                }}
                            >
                                {sortOrder === 'desc' ? '↓' : '↑'}
                            </button>
                        </div>
                    </div>

                    {/* Row 2: Expandable filters */}
                    {showFilters && (
                        <div style={{
                            display: 'grid',
                            gridTemplateColumns: 'repeat(auto-fill, minmax(160px, 1fr))',
                            gap: 10,
                            marginTop: 10,
                            padding: '12px 14px',
                            borderRadius: 8,
                            border: '1px solid var(--border)',
                            background: 'white',
                            animation: 'fadeSlide 0.2s ease',
                        }}>
                            <FilterField label="Source" icon={<GlobeIcon />}>
                                <FilterSelect id="source-filter" value={source} onChange={setSource} options={SOURCE_OPTIONS} disabled={loading} />
                            </FilterField>
                            <FilterField label="Industry" icon={<BuildingIcon />}>
                                <FilterSelect id="industry-filter" value={industry} onChange={setIndustry} options={INDUSTRY_OPTIONS} disabled={loading} />
                            </FilterField>
                            <FilterField label="Location" icon={<MapPinIcon />}>
                                <input
                                    id="location-filter"
                                    type="text"
                                    placeholder="e.g. London, Berlin…"
                                    value={location}
                                    onChange={e => setLocation(e.target.value)}
                                    disabled={loading}
                                    style={{
                                        width: '100%', padding: '5px 8px', borderRadius: 6,
                                        border: '1px solid var(--border)', background: 'white',
                                        fontSize: 12, color: 'var(--foreground)', outline: 'none',
                                    }}
                                />
                            </FilterField>
                            <FilterField label="Experience" icon={<BriefcaseIcon />}>
                                <FilterSelect id="experience-filter" value={experienceLevel} onChange={setExperienceLevel} options={EXPERIENCE_OPTIONS} disabled={loading} />
                            </FilterField>
                            <FilterField label="Remote" icon={<LaptopIcon />}>
                                <label style={{ display: 'flex', alignItems: 'center', gap: 8, cursor: 'pointer', paddingTop: 3 }}>
                                    <button
                                        type="button"
                                        role="switch"
                                        aria-checked={remoteOnly}
                                        onClick={() => !loading && setRemoteOnly(v => !v)}
                                        style={{
                                            position: 'relative',
                                            width: 32, height: 18, borderRadius: 9,
                                            background: remoteOnly ? 'var(--brand)' : 'var(--gray-300)',
                                            border: 'none', cursor: 'pointer',
                                            transition: 'background 0.2s', flexShrink: 0, padding: 0,
                                        }}
                                    >
                                        <span style={{
                                            position: 'absolute', top: 2,
                                            left: remoteOnly ? 16 : 2,
                                            width: 14, height: 14, borderRadius: '50%',
                                            background: 'white', boxShadow: '0 1px 2px rgba(0,0,0,0.15)',
                                            transition: 'left 0.2s',
                                        }} />
                                    </button>
                                    <span style={{ fontSize: 11, fontWeight: 500, color: remoteOnly ? 'var(--brand)' : 'var(--muted)' }}>
                                        {remoteOnly ? 'Remote only' : 'All'}
                                    </span>
                                </label>
                            </FilterField>
                        </div>
                    )}
                </div>
            </div>

            {/* ─── Main Content ──────────────────────────────────────────────── */}
            <div className="px-4 md:px-6" style={{ maxWidth: 1280, margin: '0 auto', paddingTop: 16, paddingBottom: 32 }}>

                {/* Rate Limit */}
                {rateLimited && (
                    <div style={{
                        display: 'flex', alignItems: 'center', gap: 10,
                        padding: '10px 14px', borderRadius: 8,
                        background: '#FFFBEB', border: '1px solid #FDE68A',
                        color: '#92400E', fontSize: 13, marginBottom: 12,
                    }}>
                        <ClockIcon />
                        <p style={{ margin: 0 }}>
                            <strong>Slow down!</strong> Too many requests. Please wait <strong>{rateLimit.resetTime()} min</strong> before searching again.
                        </p>
                    </div>
                )}

                {/* Error */}
                {error && !loading && (
                    <div style={{
                        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                        padding: '10px 14px', borderRadius: 8,
                        background: '#FEF2F2', border: '1px solid #FECACA',
                        color: '#991B1B', fontSize: 13, marginBottom: 12,
                    }}>
                        <span>⚠️ {error}</span>
                        <button
                            onClick={() => triggerFetch(page, true)}
                            style={{
                                padding: '4px 12px', borderRadius: 6,
                                background: 'white', border: '1px solid #FECACA',
                                color: '#991B1B', fontSize: 12, fontWeight: 500,
                                cursor: 'pointer',
                            }}
                        >
                            Retry
                        </button>
                    </div>
                )}

                {/* Loading Skeletons */}
                {loading && (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                        {Array.from({ length: 8 }).map((_, i) => (
                            <div key={i} style={{
                                background: 'white', border: '1px solid var(--border)',
                                borderRadius: 10, padding: '14px 18px',
                            }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                                    <div style={{ width: 36, height: 36, borderRadius: 8, background: 'var(--gray-100)' }} className="animate-pulse" />
                                    <div style={{ flex: 1 }}>
                                        <div style={{ height: 14, width: '40%', borderRadius: 4, background: 'var(--gray-100)' }} className="animate-pulse" />
                                        <div style={{ height: 10, width: '25%', borderRadius: 3, background: 'var(--gray-100)', marginTop: 6 }} className="animate-pulse" />
                                    </div>
                                    <div style={{ height: 10, width: 50, borderRadius: 3, background: 'var(--gray-100)' }} className="animate-pulse" />
                                </div>
                                <div style={{ height: 10, width: '80%', borderRadius: 3, background: 'var(--gray-100)', marginTop: 10 }} className="animate-pulse" />
                            </div>
                        ))}
                    </div>
                )}

                {/* Empty State */}
                {!loading && !error && !rateLimited && jobs.length === 0 && (
                    <div style={{
                        display: 'flex', flexDirection: 'column', alignItems: 'center',
                        justifyContent: 'center', padding: '64px 0', textAlign: 'center',
                    }}>
                        <BriefcaseIcon className="w-10 h-10" style={{ color: 'var(--gray-300)' }} />
                        <h3 style={{ fontSize: 16, fontWeight: 600, marginTop: 12, color: 'var(--foreground)' }}>No jobs found</h3>
                        <p style={{ fontSize: 13, color: 'var(--muted)', marginTop: 4 }}>Try adjusting your filters or search terms</p>
                        {activeFilterCount > 0 && (
                            <button
                                onClick={clearFilters}
                                style={{
                                    marginTop: 12, padding: '6px 16px', borderRadius: 6,
                                    background: 'var(--gray-100)', border: '1px solid var(--border)',
                                    fontSize: 12, fontWeight: 500, cursor: 'pointer',
                                }}
                            >
                                Clear all filters
                            </button>
                        )}
                    </div>
                )}

                {/* Job List — Dense Single Column */}
                {!loading && !error && !rateLimited && jobs.length > 0 && (
                    <>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                            {jobs.map(job => (
                                <JobRow
                                    key={job.id}
                                    job={job}
                                />
                            ))}
                        </div>

                        {/* Pagination */}
                        {pagination && pagination.totalPages > 1 && (
                            <PaginationBar
                                pagination={pagination}
                                currentPage={page}
                                onPageChange={handlePageChange}
                            />
                        )}
                    </>
                )}
            </div>

            {/* Animations */}
            <style>{`
                @keyframes fadeSlide {
                    from { opacity: 0; transform: translateY(-4px); }
                    to { opacity: 1; transform: translateY(0); }
                }
                .job-row { transition: border-color 0.15s, box-shadow 0.15s; }
                .job-row:hover { border-color: var(--gray-300) !important; box-shadow: 0 1px 4px rgba(0,0,0,0.04); }
                .job-row-expanded { border-color: var(--brand) !important; box-shadow: 0 2px 8px rgba(255,106,0,0.08); }
            `}</style>
        </>
    );
}

// ─── Job Row Component ──────────────────────────────────────────────────────

function JobRow({ job }: { job: Job }) {
    const sourceStyle = SOURCE_COLORS[job.source] ?? { bg: 'var(--gray-100)', text: 'var(--gray-600)', dot: 'var(--gray-400)' };
    const salary = formatSalary(job.salary_range_min, job.salary_range_max);
    const snippet = getDescriptionSnippet(job);
    const companyName = job.company?.name || capitalise(job.source);
    const companyColor = getCompanyColor(companyName);
    const initials = getCompanyInitials(companyName);

    return (
        <Link
            href={`/jobs/${job.id}`}
            className="job-row"
            onClick={() => {
                try {
                    sessionStorage.setItem(`job_${job.id}`, JSON.stringify(job));
                } catch (e) {
                    console.error('Failed to cache job in sessionStorage', e);
                }
            }}
            style={{
                display: 'block',
                background: 'white',
                border: '1px solid var(--border)',
                borderRadius: 10,
                padding: '14px 18px',
                cursor: 'pointer',
                textDecoration: 'none',
                color: 'inherit',
            }}
        >
            {/* Main row */}
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: 12 }}>
                {/* Company avatar */}
                <div style={{
                    width: 38, height: 38, borderRadius: 8, flexShrink: 0,
                    background: `${companyColor}12`,
                    border: `1px solid ${companyColor}20`,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: 13, fontWeight: 700, color: companyColor,
                    marginTop: 1,
                }}>
                    {initials}
                </div>

                {/* Content */}
                <div style={{ flex: 1, minWidth: 0 }}>
                    {/* Title row */}
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap' }}>
                        <h3 style={{
                            fontSize: 14, fontWeight: 650, color: 'var(--foreground)',
                            margin: 0, lineHeight: 1.3,
                            overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap',
                            maxWidth: '100%',
                        }}>
                            {job.title}
                        </h3>
                    </div>

                    {/* Meta row: company, location, source */}
                    <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginTop: 3, flexWrap: 'wrap' }}>
                        {job.company?.name && (
                            <span style={{ fontSize: 12, color: 'var(--muted)', fontWeight: 500, display: 'flex', alignItems: 'center', gap: 3 }}>
                                <BuildingIcon className="w-3 h-3" />
                                {job.company.name}
                            </span>
                        )}
                        {job.job_location && (
                            <span style={{ fontSize: 12, color: 'var(--muted)', display: 'flex', alignItems: 'center', gap: 3 }}>
                                <MapPinIcon className="w-3 h-3" />
                                {job.job_location}
                            </span>
                        )}
                        <span style={{
                            fontSize: 10, fontWeight: 600, letterSpacing: '0.02em',
                            padding: '1px 6px', borderRadius: 4,
                            background: sourceStyle.bg, color: sourceStyle.text,
                        }}>
                            {capitalise(job.source)}
                        </span>
                        {job.remote_allowed && (
                            <span style={{
                                fontSize: 10, fontWeight: 600,
                                padding: '1px 6px', borderRadius: 4,
                                background: '#ECFDF5', color: '#047857',
                            }}>
                                Remote
                            </span>
                        )}
                        {job.experience_level && (
                            <span style={{
                                fontSize: 10, fontWeight: 500,
                                padding: '1px 6px', borderRadius: 4,
                                background: 'var(--gray-50)', color: 'var(--gray-600)',
                            }}>
                                {job.experience_level}
                            </span>
                        )}
                        {salary && (
                            <span style={{
                                fontSize: 10, fontWeight: 600,
                                padding: '1px 6px', borderRadius: 4,
                                background: '#EEF2FF', color: '#4338CA',
                            }}>
                                {salary}
                            </span>
                        )}
                    </div>

                    {/* Description snippet */}
                    {snippet && (
                        <p style={{
                            fontSize: 12, color: 'var(--gray-500)', lineHeight: 1.5,
                            margin: '6px 0 0', maxWidth: 700,
                        }}>
                            {snippet}
                        </p>
                    )}

                    {/* Skills — compact */}
                    {job.required_skills && job.required_skills.length > 0 && (
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 4, marginTop: 6 }}>
                            {job.required_skills.slice(0, 3).map((skill, i) => (
                                <span key={i} style={{
                                    fontSize: 10, fontWeight: 500,
                                    padding: '1px 7px', borderRadius: 10,
                                    background: 'var(--brand-tint)', color: 'var(--brand-hover)',
                                    border: '1px solid rgba(255,106,0,0.1)',
                                }}>
                                    {skill}
                                </span>
                            ))}
                            {job.required_skills.length > 3 && (
                                <span style={{ fontSize: 10, color: 'var(--muted)', padding: '1px 4px' }}>
                                    +{job.required_skills.length - 3}
                                </span>
                            )}
                        </div>
                    )}
                </div>

                {/* Right side: time + actions */}
                <div style={{
                    display: 'flex', flexDirection: 'column', alignItems: 'flex-end',
                    gap: 8, flexShrink: 0,
                }}>
                    <span style={{ fontSize: 11, color: 'var(--gray-400)', whiteSpace: 'nowrap', display: 'flex', alignItems: 'center', gap: 3 }}>
                        <ClockIcon size={10} />
                        {timeAgo(job.scraped_at || job.date_posted)}
                    </span>
                    <a
                        href={job.job_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={e => e.stopPropagation()}
                        style={{
                            display: 'inline-flex', alignItems: 'center', gap: 4,
                            padding: '5px 12px', borderRadius: 6,
                            background: 'var(--brand)', color: 'white',
                            fontSize: 11, fontWeight: 600, textDecoration: 'none',
                            transition: 'background 0.15s', whiteSpace: 'nowrap',
                        }}
                    >
                        View
                        <ExternalLinkIcon size={10} />
                    </a>
                </div>
            </div>
        </Link>
    );
}

// ─── Sub-Components ─────────────────────────────────────────────────────────

function FilterSelect({ id, value, onChange, options, disabled }: {
    id: string; value: string; onChange: (v: string) => void;
    options: { value: string; label: string }[]; disabled?: boolean;
}) {
    return (
        <select
            id={id}
            value={value}
            onChange={e => onChange(e.target.value)}
            disabled={disabled}
            style={{
                width: '100%', padding: '5px 24px 5px 8px', borderRadius: 6,
                border: '1px solid var(--border)', background: 'white',
                fontSize: 12, color: 'var(--foreground)', cursor: 'pointer', outline: 'none',
                appearance: 'none' as const,
                backgroundImage: `url("data:image/svg+xml,%3Csvg width='8' height='5' viewBox='0 0 10 6' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M1 1L5 5L9 1' stroke='%236B7280' stroke-width='1.5' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E")`,
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'right 8px center',
            }}
        >
            {options.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
        </select>
    );
}

function FilterField({ label, icon, children }: { label: string; icon: React.ReactNode; children: React.ReactNode }) {
    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
            <label style={{ fontSize: 10, fontWeight: 600, color: 'var(--muted)', display: 'flex', alignItems: 'center', gap: 4, textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                {icon}
                {label}
            </label>
            {children}
        </div>
    );
}

function PaginationBar({ pagination, currentPage, onPageChange }: {
    pagination: Pagination; currentPage: number; onPageChange: (p: number) => void;
}) {
    const maxPage = Math.min(pagination.totalPages, 50);
    const pages = useMemo(() => {
        const result: (number | '...')[] = [];
        if (maxPage <= 7) {
            for (let i = 1; i <= maxPage; i++) result.push(i);
        } else {
            result.push(1);
            if (currentPage > 3) result.push('...');
            for (let i = Math.max(2, currentPage - 1); i <= Math.min(maxPage - 1, currentPage + 1); i++) result.push(i);
            if (currentPage < maxPage - 2) result.push('...');
            result.push(maxPage);
        }
        return result;
    }, [maxPage, currentPage]);

    const btnBase: React.CSSProperties = {
        display: 'inline-flex', alignItems: 'center', gap: 4,
        padding: '5px 12px', borderRadius: 6,
        border: '1px solid var(--border)', background: 'white',
        fontSize: 12, fontWeight: 500, cursor: 'pointer',
        transition: 'all 0.15s',
    };

    return (
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6, marginTop: 20, paddingBottom: 12 }}>
            <button
                onClick={() => onPageChange(currentPage - 1)}
                disabled={!pagination.hasPrevPage}
                style={{ ...btnBase, color: pagination.hasPrevPage ? 'var(--foreground)' : 'var(--gray-300)', cursor: pagination.hasPrevPage ? 'pointer' : 'default' }}
            >
                ← Prev
            </button>

            <div style={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                {pages.map((p, i) =>
                    p === '...' ? (
                        <span key={`e-${i}`} style={{ padding: '0 4px', color: 'var(--muted)', fontSize: 12 }}>…</span>
                    ) : (
                        <button
                            key={p}
                            onClick={() => onPageChange(p)}
                            style={{
                                width: 30, height: 30, borderRadius: 6,
                                border: p === currentPage ? '1px solid var(--brand)' : '1px solid var(--border)',
                                background: p === currentPage ? 'var(--brand)' : 'white',
                                color: p === currentPage ? 'white' : 'var(--foreground)',
                                fontSize: 12, fontWeight: 500, cursor: 'pointer',
                                display: 'flex', alignItems: 'center', justifyContent: 'center',
                                transition: 'all 0.15s',
                            }}
                        >
                            {p}
                        </button>
                    )
                )}
            </div>

            <button
                onClick={() => onPageChange(currentPage + 1)}
                disabled={!pagination.hasNextPage || currentPage >= 50}
                style={{
                    ...btnBase,
                    color: pagination.hasNextPage && currentPage < 50 ? 'var(--foreground)' : 'var(--gray-300)',
                    cursor: pagination.hasNextPage && currentPage < 50 ? 'pointer' : 'default',
                }}
            >
                Next →
            </button>
        </div>
    );
}

// ─── SVG Icons (inline, no deps) ────────────────────────────────────────────

function SearchIcon() {
    return <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--gray-400)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8" /><path d="m21 21-4.3-4.3" /></svg>;
}

function XIcon({ size = 12 }: { size?: number }) {
    return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18" /><path d="m6 6 12 12" /></svg>;
}

function FilterIcon() {
    return <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3" /></svg>;
}

function ChevronIcon({ rotated }: { rotated: boolean }) {
    return <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ transition: 'transform 0.2s', transform: rotated ? 'rotate(180deg)' : 'none' }}><path d="m6 9 6 6 6-6" /></svg>;
}

function ClockIcon({ size = 12 }: { size?: number }) {
    return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" /></svg>;
}

function ExternalLinkIcon({ size = 12 }: { size?: number }) {
    return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" /><polyline points="15 3 21 3 21 9" /><line x1="10" y1="14" x2="21" y2="3" /></svg>;
}

function GlobeIcon({ className = 'w-3 h-3' }: { className?: string }) {
    return <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20" /><path d="M2 12h20" /></svg>;
}

function BuildingIcon({ className = 'w-3 h-3', style }: { className?: string; style?: React.CSSProperties }) {
    return <svg className={className} style={style} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M6 22V4a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v18Z" /><path d="M6 12H4a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h2" /><path d="M18 9h2a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2h-2" /><path d="M10 6h4" /><path d="M10 10h4" /><path d="M10 14h4" /><path d="M10 18h4" /></svg>;
}

function MapPinIcon({ className = 'w-3 h-3' }: { className?: string }) {
    return <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" /><circle cx="12" cy="10" r="3" /></svg>;
}

function BriefcaseIcon({ className = 'w-3 h-3', style }: { className?: string; style?: React.CSSProperties }) {
    return <svg className={className} style={style} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="14" x="2" y="7" rx="2" ry="2" /><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" /></svg>;
}

function LaptopIcon({ className = 'w-3 h-3' }: { className?: string }) {
    return <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 16V7a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v9m16 0H4m16 0 1.28 2.55a1 1 0 0 1-.9 1.45H3.62a1 1 0 0 1-.9-1.45L4 16" /></svg>;
}
