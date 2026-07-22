'use client';

import { useCallback, useEffect, useMemo, useState } from 'react';
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

// ─── Constants ──────────────────────────────────────────────────────────────

const SOURCE_COLORS: Record<string, { bg: string; text: string; border: string }> = {
    linkedin: { bg: '#EFF6FF', text: '#1D4ED8', border: '#BFDBFE' },
    indeed: { bg: '#EEF2FF', text: '#4338CA', border: '#C7D2FE' },
    stepstone: { bg: '#ECFDF5', text: '#047857', border: '#A7F3D0' },
    xing: { bg: '#F0FDFA', text: '#0F766E', border: '#99F6E4' },
    reed: { bg: '#FEF2F2', text: '#B91C1C', border: '#FECACA' },
};

const COMPANY_COLORS = [
    '#FF6A00', '#3B82F6', '#8B5CF6', '#EC4899', '#14B8A6',
    '#F59E0B', '#EF4444', '#6366F1', '#10B981', '#F97316',
];

// ─── Helpers ────────────────────────────────────────────────────────────────

function capitalise(s: string): string {
    return s.charAt(0).toUpperCase() + s.slice(1).replace(/_/g, ' ');
}

function getCompanyColor(name: string): string {
    let hash = 0;
    for (let i = 0; i < name.length; i++) hash = name.charCodeAt(i) + ((hash << 5) - hash);
    return COMPANY_COLORS[Math.abs(hash) % COMPANY_COLORS.length];
}

function getCompanyInitials(name: string): string {
    return name.split(/\s+/).slice(0, 2).map(w => w[0]).join('').toUpperCase();
}

function stripHtml(html: string): string {
    if (!html) return '';
    // 1. Replace block-level tags and lists with corresponding newlines/bullets
    let clean = html
        .replace(/<\/p>/gi, '\n\n')
        .replace(/<br\s*\/?>/gi, '\n')
        .replace(/<li>/gi, '\n• ')
        .replace(/<\/li>/gi, '')
        .replace(/<\/div>/gi, '\n')
        .replace(/<\/h[1-6]>/gi, '\n\n');

    // 2. Strip all remaining tags
    clean = clean.replace(/<[^>]*>/g, '');

    // 3. Decode HTML entities
    clean = clean
        .replace(/&nbsp;/g, ' ')
        .replace(/&amp;/g, '&')
        .replace(/&lt;/g, '<')
        .replace(/&gt;/g, '>')
        .replace(/&quot;/g, '"')
        .replace(/&#39;/g, "'");

    // 4. Collapse consecutive spaces, but preserve newlines
    clean = clean
        .split('\n')
        .map(line => line.replace(/[ \t]+/g, ' ').trim())
        .join('\n')
        .replace(/\n{3,}/g, '\n\n') // Collapse 3+ consecutive newlines to double newlines
        .trim();

    return clean;
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
    return new Date(dateStr).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' });
}

function formatDate(dateStr: string | null): string {
    if (!dateStr) return 'Unknown';
    return new Date(dateStr).toLocaleDateString('en-GB', {
        day: 'numeric', month: 'long', year: 'numeric',
    });
}

// ─── Main Component ─────────────────────────────────────────────────────────

export default function JobDetailClient({ jobId }: { jobId: string }) {
    const [job, setJob] = useState<Job | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [copied, setCopied] = useState(false);

    const fetchJob = useCallback(async () => {
        setLoading(true);
        setError(null);
        try {
            // Try loading from sessionStorage first (covers click navigation)
            try {
                const cached = sessionStorage.getItem(`job_${jobId}`);
                if (cached) {
                    const parsed = JSON.parse(cached);
                    if (parsed && parsed.id === jobId) {
                        setJob(parsed);
                        setLoading(false);
                        return;
                    }
                }
            } catch (e) {
                console.warn('Failed to read from sessionStorage', e);
            }

            const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000';
            const res = await fetch(`${apiUrl}/api/v1/public-jobs/${encodeURIComponent(jobId)}`);
            if (res.status === 404) {
                setError('not_found');
                return;
            }
            if (!res.ok) throw new Error('Failed to load job details');
            const json = await res.json();
            const jobData = json.data ?? json;
            setJob(jobData);
            
            // Cache it in sessionStorage for future back-and-forth navigation
            try {
                sessionStorage.setItem(`job_${jobId}`, JSON.stringify(jobData));
            } catch {}
        } catch (err: any) {
            setError(err?.message ?? 'Something went wrong');
        } finally {
            setLoading(false);
        }
    }, [jobId]);

    useEffect(() => { fetchJob(); }, [fetchJob]);

    const handleShare = useCallback(async () => {
        const url = window.location.href;
        try {
            await navigator.clipboard.writeText(url);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        } catch {
            // Fallback
            const input = document.createElement('input');
            input.value = url;
            document.body.appendChild(input);
            input.select();
            document.execCommand('copy');
            document.body.removeChild(input);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        }
    }, []);

    // Derived data
    const companyName = job?.company?.name || (job ? capitalise(job.source) : '');
    const companyColor = companyName ? getCompanyColor(companyName) : '#999';
    const initials = companyName ? getCompanyInitials(companyName) : '?';
    const sourceStyle = job ? (SOURCE_COLORS[job.source] ?? { bg: 'var(--gray-100)', text: 'var(--gray-600)', border: 'var(--gray-200)' }) : { bg: '', text: '', border: '' };
    const salary = job ? formatSalary(job.salary_range_min, job.salary_range_max) : null;
    const description = job?.job_description ? stripHtml(job.job_description) : null;
    const requirements = job?.requirements ? stripHtml(job.requirements) : null;

    // Quick-info pills
    const infoPills = useMemo(() => {
        if (!job) return [];
        const pills: { icon: React.ReactNode; label: string; color: string; bg: string }[] = [];
        if (job.experience_level) pills.push({ icon: <BriefcaseIcon />, label: job.experience_level, color: '#4338CA', bg: '#EEF2FF' });
        if (job.remote_allowed) pills.push({ icon: <LaptopIcon />, label: 'Remote', color: '#047857', bg: '#ECFDF5' });
        if (job.job_type) pills.push({ icon: <ClockIcon />, label: capitalise(job.job_type), color: '#6B7280', bg: 'var(--gray-50)' });
        if (salary) pills.push({ icon: <CurrencyIcon />, label: salary, color: '#047857', bg: '#ECFDF5' });
        if (job.min_experience != null || job.max_experience != null) {
            const exp = job.min_experience != null && job.max_experience != null
                ? `${job.min_experience}–${job.max_experience} yrs`
                : job.min_experience != null ? `${job.min_experience}+ yrs` : `Up to ${job.max_experience} yrs`;
            pills.push({ icon: <CalendarIcon />, label: exp, color: '#92400E', bg: '#FFFBEB' });
        }
        if (job.job_category) pills.push({ icon: <TagIcon />, label: capitalise(job.job_category), color: '#6B7280', bg: 'var(--gray-50)' });
        return pills;
    }, [job, salary]);

    // ── Loading ─────────────────────────────────────────────────────────────

    if (loading) return <LoadingSkeleton />;

    // ── Error / Not Found ───────────────────────────────────────────────────

    if (error === 'not_found') return <NotFoundState />;
    if (error) return <ErrorState message={error} onRetry={fetchJob} />;
    if (!job) return <NotFoundState />;

    // ── Render ──────────────────────────────────────────────────────────────

    return (
        <>
            <style>{`
                @keyframes fadeInUp {
                    from { opacity: 0; transform: translateY(12px); }
                    to { opacity: 1; transform: translateY(0); }
                }
                .detail-fadein { animation: fadeInUp 0.4s ease both; }
                .detail-fadein-d1 { animation: fadeInUp 0.4s 0.05s ease both; }
                .detail-fadein-d2 { animation: fadeInUp 0.4s 0.1s ease both; }
                .detail-fadein-d3 { animation: fadeInUp 0.4s 0.15s ease both; }
                .apply-btn { transition: all 0.2s ease; }
                .apply-btn:hover { transform: translateY(-1px); box-shadow: 0 6px 20px rgba(255,106,0,0.3); }
                .sidebar-card { transition: box-shadow 0.2s ease; }
                .sidebar-card:hover { box-shadow: 0 4px 16px rgba(0,0,0,0.06); }
                .skill-tag { transition: all 0.15s ease; }
                .skill-tag:hover { transform: translateY(-1px); box-shadow: 0 2px 8px rgba(255,106,0,0.12); }
                .share-btn { transition: all 0.15s ease; }
                .share-btn:hover { background: var(--gray-100) !important; }
            `}</style>

            <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 24px' }}>
                {/* ─── Breadcrumb ─────────────────────────────────────────────── */}
                <nav className="detail-fadein" style={{ padding: '20px 0 16px', display: 'flex', alignItems: 'center', gap: 6 }}>
                    <Link
                        href="/jobs"
                        style={{
                            fontSize: 13, color: 'var(--brand)', fontWeight: 500,
                            textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 4,
                        }}
                    >
                        <ArrowLeftIcon /> Job Feed
                    </Link>
                    <span style={{ color: 'var(--gray-300)', fontSize: 12 }}>›</span>
                    <span style={{ fontSize: 13, color: 'var(--muted)', fontWeight: 500, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', maxWidth: 400 }}>
                        {job.title}
                    </span>
                </nav>

                {/* ─── Hero Header ────────────────────────────────────────────── */}
                <div className="detail-fadein" style={{
                    background: 'white',
                    border: '1px solid var(--border)',
                    borderRadius: 16,
                    padding: '28px 32px',
                    marginBottom: 20,
                    position: 'relative',
                    overflow: 'hidden',
                }}>
                    {/* Subtle gradient accent */}
                    <div style={{
                        position: 'absolute', top: 0, left: 0, right: 0, height: 4,
                        background: `linear-gradient(90deg, ${companyColor}, var(--brand))`,
                        borderRadius: '16px 16px 0 0',
                    }} />

                    <div style={{ display: 'flex', alignItems: 'flex-start', gap: 20, flexWrap: 'wrap' }}>
                        {/* Company avatar */}
                        <div style={{
                            width: 64, height: 64, borderRadius: 14, flexShrink: 0,
                            background: `${companyColor}14`,
                            border: `2px solid ${companyColor}28`,
                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                            fontSize: 22, fontWeight: 800, color: companyColor,
                        }}>
                            {initials}
                        </div>

                        {/* Title & meta */}
                        <div style={{ flex: 1, minWidth: 0 }}>
                            <h1 style={{
                                fontSize: 'clamp(1.25rem, 2.5vw, 1.75rem)',
                                fontWeight: 800,
                                letterSpacing: '-0.025em',
                                lineHeight: 1.2,
                                margin: '0 0 8px',
                                color: 'var(--foreground)',
                            }}>
                                {job.title}
                            </h1>

                            <div style={{ display: 'flex', alignItems: 'center', gap: 12, flexWrap: 'wrap' }}>
                                {job.company?.name && (
                                    <span style={{ fontSize: 14, color: 'var(--foreground)', fontWeight: 600, display: 'flex', alignItems: 'center', gap: 5 }}>
                                        <BuildingIcon size={14} />
                                        {job.company.name}
                                    </span>
                                )}
                                {job.job_location && (
                                    <span style={{ fontSize: 13, color: 'var(--muted)', display: 'flex', alignItems: 'center', gap: 4 }}>
                                        <MapPinIcon size={13} />
                                        {job.job_location}
                                    </span>
                                )}
                                <span style={{
                                    fontSize: 11, fontWeight: 600, letterSpacing: '0.02em',
                                    padding: '3px 10px', borderRadius: 6,
                                    background: sourceStyle.bg, color: sourceStyle.text,
                                    border: `1px solid ${sourceStyle.border}`,
                                }}>
                                    {capitalise(job.source)}
                                </span>
                                <span style={{ fontSize: 12, color: 'var(--gray-400)', display: 'flex', alignItems: 'center', gap: 4 }}>
                                    <ClockIcon size={12} />
                                    {timeAgo(job.scraped_at || job.date_posted)}
                                </span>
                            </div>
                        </div>

                        {/* Actions */}
                        <div style={{ display: 'flex', gap: 8, flexShrink: 0, alignItems: 'flex-start' }}>
                            <button
                                className="share-btn"
                                onClick={handleShare}
                                title={copied ? 'Copied!' : 'Copy link'}
                                style={{
                                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                                    width: 40, height: 40, borderRadius: 10,
                                    border: '1px solid var(--border)', background: 'white',
                                    cursor: 'pointer', color: copied ? 'var(--brand)' : 'var(--muted)',
                                }}
                            >
                                {copied ? <CheckIcon size={16} /> : <ShareIcon size={16} />}
                            </button>
                            <a
                                href={job.job_url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="apply-btn"
                                style={{
                                    display: 'inline-flex', alignItems: 'center', gap: 8,
                                    padding: '10px 24px', borderRadius: 10,
                                    background: 'var(--brand)', color: 'white',
                                    fontSize: 14, fontWeight: 700, textDecoration: 'none',
                                    whiteSpace: 'nowrap',
                                }}
                            >
                                Apply on {capitalise(job.source)}
                                <ExternalLinkIcon size={14} />
                            </a>
                        </div>
                    </div>

                    {/* Quick info pills */}
                    {infoPills.length > 0 && (
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginTop: 20, paddingTop: 20, borderTop: '1px solid var(--border)' }}>
                            {infoPills.map((pill, i) => (
                                <span key={i} style={{
                                    display: 'inline-flex', alignItems: 'center', gap: 5,
                                    fontSize: 12, fontWeight: 600,
                                    padding: '5px 12px', borderRadius: 8,
                                    background: pill.bg, color: pill.color,
                                }}>
                                    {pill.icon}
                                    {pill.label}
                                </span>
                            ))}
                        </div>
                    )}
                </div>

                {/* ─── Two-Column Layout ──────────────────────────────────────── */}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 360px', gap: 20, alignItems: 'start' }} className="detail-content-grid">
                    {/* Left: Main content */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                        {/* Description */}
                        {description && (
                            <ContentCard title="Job Description" icon={<FileTextIcon />} delay="detail-fadein-d1">
                                <div style={{ wordBreak: 'break-word' }}>
                                    {formatDescriptionText(description)}
                                </div>
                            </ContentCard>
                        )}

                        {/* Requirements */}
                        {requirements && (
                            <ContentCard title="Requirements" icon={<ChecklistIcon />} delay="detail-fadein-d2">
                                <div style={{ wordBreak: 'break-word' }}>
                                    {formatDescriptionText(requirements)}
                                </div>
                            </ContentCard>
                        )}

                        {/* Skills */}
                        {job.required_skills && job.required_skills.length > 0 && (
                            <ContentCard title="Required Skills" icon={<SparklesIcon />} delay="detail-fadein-d2">
                                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                                    {job.required_skills.map((skill, i) => (
                                        <span key={i} className="skill-tag" style={{
                                            fontSize: 13, fontWeight: 500,
                                            padding: '6px 14px', borderRadius: 20,
                                            background: 'var(--brand-tint)', color: 'var(--brand-hover)',
                                            border: '1px solid rgba(255,106,0,0.12)',
                                            cursor: 'default',
                                        }}>
                                            {skill}
                                        </span>
                                    ))}
                                </div>
                            </ContentCard>
                        )}

                        {/* Education & Certifications */}
                        {(job.required_education || (job.required_certifications && job.required_certifications.length > 0)) && (
                            <ContentCard title="Education & Certifications" icon={<GraduationIcon />} delay="detail-fadein-d3">
                                {job.required_education && (
                                    <div style={{ marginBottom: job.required_certifications?.length ? 16 : 0 }}>
                                        <h4 style={{ fontSize: 12, fontWeight: 700, color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: '0.05em', margin: '0 0 6px' }}>Education</h4>
                                        <p style={{ fontSize: 14, color: 'var(--gray-600)', lineHeight: 1.6, margin: 0 }}>{job.required_education}</p>
                                    </div>
                                )}
                                {job.required_certifications && job.required_certifications.length > 0 && (
                                    <div>
                                        <h4 style={{ fontSize: 12, fontWeight: 700, color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: '0.05em', margin: '0 0 8px' }}>Certifications</h4>
                                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                                            {job.required_certifications.map((cert, i) => (
                                                <span key={i} style={{
                                                    fontSize: 12, fontWeight: 500,
                                                    padding: '4px 12px', borderRadius: 6,
                                                    background: '#EEF2FF', color: '#4338CA',
                                                    border: '1px solid #C7D2FE',
                                                }}>
                                                    {cert}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </ContentCard>
                        )}

                        {/* Summary fallback if no description */}
                        {!description && job.summary && (
                            <ContentCard title="Summary" icon={<FileTextIcon />} delay="detail-fadein-d1">
                                <div style={{ wordBreak: 'break-word' }}>
                                    {formatDescriptionText(job.summary)}
                                </div>
                            </ContentCard>
                        )}
                    </div>

                    {/* Right: Sidebar */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 16, position: 'sticky', top: 90 }}>
                        {/* Company Card */}
                        <div className="sidebar-card detail-fadein-d1" style={{
                            background: 'white', border: '1px solid var(--border)',
                            borderRadius: 14, padding: '24px', overflow: 'hidden',
                        }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 20 }}>
                                <div style={{
                                    width: 48, height: 48, borderRadius: 12, flexShrink: 0,
                                    background: `${companyColor}14`,
                                    border: `2px solid ${companyColor}28`,
                                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                                    fontSize: 17, fontWeight: 800, color: companyColor,
                                }}>
                                    {initials}
                                </div>
                                <div>
                                    <h3 style={{ fontSize: 15, fontWeight: 700, margin: 0, color: 'var(--foreground)' }}>
                                        {companyName}
                                    </h3>
                                    {job.company?.industry && (
                                        <span style={{ fontSize: 12, color: 'var(--muted)' }}>{capitalise(job.company.industry)}</span>
                                    )}
                                </div>
                            </div>

                            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                                {job.company?.location_city && (
                                    <InfoRow icon={<MapPinIcon size={14} />} label="Location" value={`${job.company.location_city}${job.company.location_country ? `, ${job.company.location_country}` : ''}`} />
                                )}
                                {job.company?.industry && (
                                    <InfoRow icon={<BuildingIcon size={14} />} label="Industry" value={capitalise(job.company.industry)} />
                                )}
                                {job.company?.website && (
                                    <InfoRow icon={<GlobeIcon size={14} />} label="Website" value={
                                        <a href={job.company.website} target="_blank" rel="noopener noreferrer" style={{ color: 'var(--brand)', textDecoration: 'none', fontSize: 13, fontWeight: 500 }}>
                                            {job.company.website.replace(/^https?:\/\/(www\.)?/, '').replace(/\/$/, '')}
                                        </a>
                                    } />
                                )}
                                {job.company?.linkedin_url && (
                                    <InfoRow icon={<LinkedInIcon size={14} />} label="LinkedIn" value={
                                        <a href={job.company.linkedin_url} target="_blank" rel="noopener noreferrer" style={{ color: '#1D4ED8', textDecoration: 'none', fontSize: 13, fontWeight: 500 }}>
                                            View Profile
                                        </a>
                                    } />
                                )}
                            </div>
                        </div>

                        {/* Job Meta Card */}
                        <div className="sidebar-card detail-fadein-d2" style={{
                            background: 'white', border: '1px solid var(--border)',
                            borderRadius: 14, padding: '24px',
                        }}>
                            <h3 style={{ fontSize: 13, fontWeight: 700, color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: '0.05em', margin: '0 0 16px' }}>
                                Job Details
                            </h3>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                                <InfoRow icon={<CalendarIcon size={14} />} label="Posted" value={formatDate(job.date_posted)} />
                                <InfoRow icon={<ClockIcon size={14} />} label="Scraped" value={timeAgo(job.scraped_at)} />
                                {job.job_category && <InfoRow icon={<TagIcon size={14} />} label="Category" value={capitalise(job.job_category)} />}
                                {job.job_sub_category && <InfoRow icon={<TagIcon size={14} />} label="Sub-category" value={capitalise(job.job_sub_category)} />}
                                <InfoRow icon={<GlobeIcon size={14} />} label="Source" value={
                                    <span style={{
                                        fontSize: 11, fontWeight: 600,
                                        padding: '2px 8px', borderRadius: 5,
                                        background: sourceStyle.bg, color: sourceStyle.text,
                                        border: `1px solid ${sourceStyle.border}`,
                                    }}>
                                        {capitalise(job.source)}
                                    </span>
                                } />
                            </div>
                        </div>

                        {/* Apply CTA Card */}
                        <div className="sidebar-card detail-fadein-d3" style={{
                            background: 'linear-gradient(135deg, var(--brand-tint), #FFF)',
                            border: '1px solid rgba(255,106,0,0.15)',
                            borderRadius: 14, padding: '24px',
                            textAlign: 'center',
                        }}>
                            <p style={{ fontSize: 14, fontWeight: 600, color: 'var(--foreground)', margin: '0 0 4px' }}>
                                Interested in this role?
                            </p>
                            <p style={{ fontSize: 12, color: 'var(--muted)', margin: '0 0 16px' }}>
                                Apply directly on {capitalise(job.source)}
                            </p>
                            <a
                                href={job.job_url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="apply-btn"
                                style={{
                                    display: 'inline-flex', alignItems: 'center', gap: 8,
                                    padding: '12px 32px', borderRadius: 10,
                                    background: 'var(--brand)', color: 'white',
                                    fontSize: 14, fontWeight: 700, textDecoration: 'none',
                                    width: '100%', justifyContent: 'center',
                                }}
                            >
                                Apply Now
                                <ExternalLinkIcon size={14} />
                            </a>
                        </div>
                    </div>
                </div>

                {/* ─── Bottom bar ─────────────────────────────────────────────── */}
                <div style={{ padding: '32px 0 48px', display: 'flex', justifyContent: 'center' }}>
                    <Link
                        href="/jobs"
                        style={{
                            display: 'inline-flex', alignItems: 'center', gap: 6,
                            padding: '10px 24px', borderRadius: 10,
                            border: '1px solid var(--border)', background: 'white',
                            color: 'var(--foreground)', fontSize: 13, fontWeight: 600,
                            textDecoration: 'none', transition: 'all 0.15s',
                        }}
                    >
                        <ArrowLeftIcon /> Back to Job Feed
                    </Link>
                </div>
            </div>

            {/* Responsive grid */}
            <style>{`
                @media (max-width: 860px) {
                    .detail-content-grid {
                        grid-template-columns: 1fr !important;
                    }
                }
            `}</style>
        </>
    );
}

function formatDescriptionText(text: string) {
    if (!text) return null;
    const lines = text.split('\n');
    return lines.map((line, idx) => {
        const trimmed = line.trim();
        if (!trimmed) {
            return <div key={idx} style={{ height: 12 }} />;
        }

        // 1. Detect list/bullet items
        const isBullet = trimmed.startsWith('•') || trimmed.startsWith('-') || trimmed.startsWith('*');
        if (isBullet) {
            const content = trimmed.replace(/^[-•*]\s*/, '');
            return (
                <div key={idx} style={{
                    display: 'flex',
                    alignItems: 'flex-start',
                    gap: 8,
                    margin: '6px 0',
                    paddingLeft: 12,
                    fontSize: 14,
                    color: 'var(--gray-600)',
                }}>
                    <span style={{ color: 'var(--brand)', fontWeight: 700, transform: 'scale(1.2)', userSelect: 'none' }}>•</span>
                    <span style={{ flex: 1, lineHeight: 1.6 }}>{content}</span>
                </div>
            );
        }

        // 2. Detect headings
        const endsWithColon = trimmed.endsWith(':');
        const isCommonHeading = /^(what|who|key|role|core|duties|education|experience|about|responsibilities|qualifications|skills|benefits|requirements|nice to have|preferred|require|your|our|my|candidate|successful)/i.test(trimmed);
        
        const isHeading = (endsWithColon && trimmed.length < 60) || isCommonHeading;

        if (isHeading) {
            return (
                <div key={idx} style={{
                    fontSize: 15,
                    fontWeight: 700,
                    color: 'var(--foreground)',
                    marginTop: 22,
                    marginBottom: 10,
                    letterSpacing: '-0.01em',
                    borderLeft: '3px solid var(--brand)',
                    paddingLeft: 10,
                    lineHeight: 1.3,
                }}>
                    {trimmed}
                </div>
            );
        }

        const words = trimmed.split(/\s+/);
        const isTitleCase = words.length > 1 && words.length < 12 && words.every(w => {
            if (/^(in|on|at|to|for|with|and|or|a|an|the|of|our|your|us)$/i.test(w)) return true;
            return w.length > 0 && w[0] === w[0].toUpperCase();
        });

        if (isTitleCase && trimmed.length < 60) {
            return (
                <div key={idx} style={{
                    fontSize: 14,
                    fontWeight: 700,
                    color: 'var(--foreground)',
                    marginTop: 14,
                    marginBottom: 6,
                    lineHeight: 1.4,
                }}>
                    {trimmed}
                </div>
            );
        }

        // 3. Normal paragraph lines
        return (
            <p key={idx} style={{ margin: '0 0 10px 0', fontSize: 14, color: 'var(--gray-600)', lineHeight: 1.7 }}>
                {trimmed}
            </p>
        );
    });
}

// ─── Sub-Components ─────────────────────────────────────────────────────────

function ContentCard({ title, icon, delay, children }: {
    title: string; icon: React.ReactNode; delay?: string; children: React.ReactNode;
}) {
    return (
        <div className={`sidebar-card ${delay ?? 'detail-fadein'}`} style={{
            background: 'white', border: '1px solid var(--border)',
            borderRadius: 14, padding: '28px 32px',
        }}>
            <h2 style={{
                fontSize: 16, fontWeight: 700,
                color: 'var(--foreground)',
                margin: '0 0 16px',
                display: 'flex', alignItems: 'center', gap: 8,
                letterSpacing: '-0.01em',
            }}>
                <span style={{ color: 'var(--brand)' }}>{icon}</span>
                {title}
            </h2>
            {children}
        </div>
    );
}

function InfoRow({ icon, label, value }: { icon: React.ReactNode; label: string; value: React.ReactNode }) {
    return (
        <div style={{ display: 'flex', alignItems: 'flex-start', gap: 10 }}>
            <span style={{ color: 'var(--gray-400)', flexShrink: 0, marginTop: 2 }}>{icon}</span>
            <div style={{ flex: 1, minWidth: 0 }}>
                <span style={{ fontSize: 11, fontWeight: 600, color: 'var(--gray-400)', textTransform: 'uppercase', letterSpacing: '0.04em' }}>{label}</span>
                <div style={{ fontSize: 13, color: 'var(--foreground)', fontWeight: 500, marginTop: 1 }}>{value}</div>
            </div>
        </div>
    );
}

// ─── Loading Skeleton ───────────────────────────────────────────────────────

function LoadingSkeleton() {
    const pulse = { background: 'var(--gray-100)', borderRadius: 6 };
    return (
        <div style={{ maxWidth: 1280, margin: '0 auto', padding: '20px 24px' }}>
            {/* Breadcrumb skeleton */}
            <div style={{ display: 'flex', gap: 8, marginBottom: 20 }}>
                <div className="animate-pulse" style={{ ...pulse, width: 80, height: 16 }} />
                <div className="animate-pulse" style={{ ...pulse, width: 200, height: 16 }} />
            </div>
            {/* Hero skeleton */}
            <div style={{ background: 'white', border: '1px solid var(--border)', borderRadius: 16, padding: '28px 32px', marginBottom: 20 }}>
                <div style={{ display: 'flex', gap: 20 }}>
                    <div className="animate-pulse" style={{ width: 64, height: 64, borderRadius: 14, background: 'var(--gray-100)' }} />
                    <div style={{ flex: 1 }}>
                        <div className="animate-pulse" style={{ ...pulse, width: '60%', height: 24, marginBottom: 10 }} />
                        <div style={{ display: 'flex', gap: 12 }}>
                            <div className="animate-pulse" style={{ ...pulse, width: 120, height: 16 }} />
                            <div className="animate-pulse" style={{ ...pulse, width: 150, height: 16 }} />
                            <div className="animate-pulse" style={{ ...pulse, width: 70, height: 16 }} />
                        </div>
                    </div>
                </div>
                <div style={{ display: 'flex', gap: 8, marginTop: 24, paddingTop: 20, borderTop: '1px solid var(--border)' }}>
                    {[90, 70, 100, 80].map((w, i) => (
                        <div key={i} className="animate-pulse" style={{ ...pulse, width: w, height: 28, borderRadius: 8 }} />
                    ))}
                </div>
            </div>
            {/* Content skeleton */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 360px', gap: 20 }}>
                <div style={{ background: 'white', border: '1px solid var(--border)', borderRadius: 14, padding: '28px 32px' }}>
                    <div className="animate-pulse" style={{ ...pulse, width: 160, height: 20, marginBottom: 20 }} />
                    {[1, 2, 3, 4, 5].map(i => (
                        <div key={i} className="animate-pulse" style={{ ...pulse, width: `${70 + Math.random() * 30}%`, height: 14, marginBottom: 12 }} />
                    ))}
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                    <div style={{ background: 'white', border: '1px solid var(--border)', borderRadius: 14, padding: 24 }}>
                        <div style={{ display: 'flex', gap: 14, marginBottom: 20 }}>
                            <div className="animate-pulse" style={{ width: 48, height: 48, borderRadius: 12, background: 'var(--gray-100)' }} />
                            <div>
                                <div className="animate-pulse" style={{ ...pulse, width: 140, height: 16, marginBottom: 6 }} />
                                <div className="animate-pulse" style={{ ...pulse, width: 90, height: 12 }} />
                            </div>
                        </div>
                        {[1, 2, 3].map(i => (
                            <div key={i} className="animate-pulse" style={{ ...pulse, width: '80%', height: 14, marginBottom: 12 }} />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

// ─── Error States ───────────────────────────────────────────────────────────

function NotFoundState() {
    return (
        <div style={{
            maxWidth: 1280, margin: '0 auto', padding: '80px 24px',
            display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center',
        }}>
            <div style={{
                width: 80, height: 80, borderRadius: 20,
                background: 'var(--gray-50)', border: '1px solid var(--border)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: 36, marginBottom: 20,
            }}>
                🔍
            </div>
            <h2 style={{ fontSize: 22, fontWeight: 700, margin: '0 0 8px', color: 'var(--foreground)' }}>Job not found</h2>
            <p style={{ fontSize: 14, color: 'var(--muted)', margin: '0 0 24px', maxWidth: 400 }}>
                This job may have been removed or the link may be incorrect. Try browsing the job feed instead.
            </p>
            <Link
                href="/jobs"
                style={{
                    display: 'inline-flex', alignItems: 'center', gap: 6,
                    padding: '10px 24px', borderRadius: 10,
                    background: 'var(--brand)', color: 'white',
                    fontSize: 14, fontWeight: 600, textDecoration: 'none',
                }}
            >
                <ArrowLeftIcon /> Back to Job Feed
            </Link>
        </div>
    );
}

function ErrorState({ message, onRetry }: { message: string; onRetry: () => void }) {
    return (
        <div style={{
            maxWidth: 1280, margin: '0 auto', padding: '80px 24px',
            display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center',
        }}>
            <div style={{
                width: 80, height: 80, borderRadius: 20,
                background: '#FEF2F2', border: '1px solid #FECACA',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: 36, marginBottom: 20,
            }}>
                ⚠️
            </div>
            <h2 style={{ fontSize: 22, fontWeight: 700, margin: '0 0 8px', color: 'var(--foreground)' }}>Something went wrong</h2>
            <p style={{ fontSize: 14, color: 'var(--muted)', margin: '0 0 24px', maxWidth: 400 }}>
                {message}
            </p>
            <div style={{ display: 'flex', gap: 10 }}>
                <button
                    onClick={onRetry}
                    style={{
                        display: 'inline-flex', alignItems: 'center', gap: 6,
                        padding: '10px 24px', borderRadius: 10,
                        background: 'var(--brand)', color: 'white',
                        fontSize: 14, fontWeight: 600, border: 'none', cursor: 'pointer',
                    }}
                >
                    Try Again
                </button>
                <Link
                    href="/jobs"
                    style={{
                        display: 'inline-flex', alignItems: 'center', gap: 6,
                        padding: '10px 24px', borderRadius: 10,
                        border: '1px solid var(--border)', background: 'white',
                        color: 'var(--foreground)', fontSize: 14, fontWeight: 600,
                        textDecoration: 'none',
                    }}
                >
                    Back to Feed
                </Link>
            </div>
        </div>
    );
}

// ─── SVG Icons ──────────────────────────────────────────────────────────────

function ArrowLeftIcon() {
    return <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m12 19-7-7 7-7" /><path d="M19 12H5" /></svg>;
}

function ExternalLinkIcon({ size = 14 }: { size?: number }) {
    return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" /><polyline points="15 3 21 3 21 9" /><line x1="10" y1="14" x2="21" y2="3" /></svg>;
}

function BuildingIcon({ size = 14 }: { size?: number }) {
    return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M6 22V4a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v18Z" /><path d="M6 12H4a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h2" /><path d="M18 9h2a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2h-2" /><path d="M10 6h4" /><path d="M10 10h4" /><path d="M10 14h4" /><path d="M10 18h4" /></svg>;
}

function MapPinIcon({ size = 14 }: { size?: number }) {
    return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" /><circle cx="12" cy="10" r="3" /></svg>;
}

function ClockIcon({ size = 14 }: { size?: number }) {
    return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" /></svg>;
}

function BriefcaseIcon() {
    return <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="14" x="2" y="7" rx="2" ry="2" /><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" /></svg>;
}

function LaptopIcon() {
    return <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 16V7a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v9m16 0H4m16 0 1.28 2.55a1 1 0 0 1-.9 1.45H3.62a1 1 0 0 1-.9-1.45L4 16" /></svg>;
}

function CurrencyIcon() {
    return <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><path d="M16 8h-6a2 2 0 1 0 0 4h4a2 2 0 1 1 0 4H8" /><path d="M12 18V6" /></svg>;
}

function CalendarIcon({ size = 14 }: { size?: number }) {
    return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="18" height="18" x="3" y="4" rx="2" ry="2" /><line x1="16" y1="2" x2="16" y2="6" /><line x1="8" y1="2" x2="8" y2="6" /><line x1="3" y1="10" x2="21" y2="10" /></svg>;
}

function TagIcon({ size = 14 }: { size?: number }) {
    return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2H2v10l9.29 9.29c.94.94 2.48.94 3.42 0l6.58-6.58c.94-.94.94-2.48 0-3.42L12 2Z" /><path d="M7 7h.01" /></svg>;
}

function ShareIcon({ size = 14 }: { size?: number }) {
    return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="18" cy="5" r="3" /><circle cx="6" cy="12" r="3" /><circle cx="18" cy="19" r="3" /><line x1="8.59" y1="13.51" x2="15.42" y2="17.49" /><line x1="15.41" y1="6.51" x2="8.59" y2="10.49" /></svg>;
}

function CheckIcon({ size = 14 }: { size?: number }) {
    return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12" /></svg>;
}

function GlobeIcon({ size = 14 }: { size?: number }) {
    return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20" /><path d="M2 12h20" /></svg>;
}

function LinkedInIcon({ size = 14 }: { size?: number }) {
    return <svg width={size} height={size} viewBox="0 0 24 24" fill="#1D4ED8" stroke="none"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" /></svg>;
}

function FileTextIcon() {
    return <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" /><polyline points="14 2 14 8 20 8" /><line x1="16" y1="13" x2="8" y2="13" /><line x1="16" y1="17" x2="8" y2="17" /><polyline points="10 9 9 9 8 9" /></svg>;
}

function ChecklistIcon() {
    return <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M11 18H3" /><path d="M11 12H3" /><path d="M11 6H3" /><path d="m15 18 2 2 4-4" /><path d="m15 12 2 2 4-4" /><path d="m15 6 2 2 4-4" /></svg>;
}

function SparklesIcon() {
    return <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z" /><path d="M5 3v4" /><path d="M19 17v4" /><path d="M3 5h4" /><path d="M17 19h4" /></svg>;
}

function GraduationIcon() {
    return <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 10v6M2 10l10-5 10 5-10 5z" /><path d="M6 12v5c3 3 10 3 12 0v-5" /></svg>;
}
