import Link from 'next/link';
import { MapPinIcon, BuildingIcon, BriefcaseIcon } from 'lucide-react';

async function fetchRecentJobs() {
    try {
        const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000';
        const res = await fetch(`${apiUrl}/api/v1/public-jobs?limit=3`, { next: { revalidate: 3600 } });
        if (!res.ok) return [];
        const json = await res.json();
        return json.data?.data || [];
    } catch (e) {
        return [];
    }
}

const COMPANY_COLORS = [
    '#FF6A00', '#3B82F6', '#8B5CF6', '#EC4899', '#14B8A6',
    '#F59E0B', '#EF4444', '#6366F1', '#10B981', '#F97316',
];

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

export default async function JobsPreview() {
    const jobs = await fetchRecentJobs();

    if (!jobs || jobs.length === 0) {
        return null; // Don't show the section if no jobs are available
    }

    return (
        <section className="py-16 md:py-24 bg-white border-y border-[#E5E5E5]" id="jobs-preview">
            <div className="max-w-[1280px] mx-auto px-4 sm:px-6">
                <div className="text-center max-w-2xl mx-auto mb-12 md:mb-16">
                    <p className="text-xs font-semibold uppercase tracking-widest text-[#FF6A00] mb-3">
                        Live Job Feed
                    </p>
                    <h2 className="text-[#0A0A0A] text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight mb-4">
                        We scrape 10,000+ new roles weekly.
                    </h2>
                    <p className="text-[#6B7280] text-[15px] sm:text-base leading-relaxed">
                        Access our live database of freshly scraped job postings from LinkedIn, Indeed, StepStone, and more.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {jobs.map((job: any) => {
                        const companyName = job.company?.name || job.source || 'Company';
                        const companyColor = getCompanyColor(companyName);
                        const initials = getCompanyInitials(companyName);
                        
                        return (
                            <Link
                                key={job.id}
                                href={`/jobs/${job.id}`}
                                className="group flex flex-col bg-white border border-[#E5E5E5] rounded-[1.2rem] p-6 hover:shadow-[0_10px_40px_rgba(0,0,0,0.06)] hover:border-black/10 transition-all duration-300"
                            >
                                <div className="flex items-center gap-4 mb-4">
                                    <div
                                        className="w-12 h-12 rounded-xl flex-shrink-0 flex items-center justify-center text-sm font-bold mt-1"
                                        style={{
                                            backgroundColor: `${companyColor}12`,
                                            border: `1px solid ${companyColor}20`,
                                            color: companyColor,
                                        }}
                                    >
                                        {initials}
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-[#0A0A0A] group-hover:text-[#FF6A00] transition-colors leading-tight line-clamp-2">
                                            {job.title}
                                        </h3>
                                        <div className="text-xs text-[#6B7280] mt-1 flex items-center gap-1.5 font-medium">
                                            <BuildingIcon className="w-3.5 h-3.5" />
                                            {companyName}
                                        </div>
                                    </div>
                                </div>

                                {(job.job_location || job.experience_level) && (
                                    <div className="flex items-center gap-3 mt-auto pt-4 border-t border-[#F3F4F6] text-xs text-[#6B7280] font-medium">
                                        {job.job_location && (
                                            <div className="flex items-center gap-1.5 truncate">
                                                <MapPinIcon className="w-3.5 h-3.5 flex-shrink-0" />
                                                <span className="truncate">{job.job_location}</span>
                                            </div>
                                        )}
                                        {job.experience_level && (
                                            <div className="flex items-center gap-1.5 flex-shrink-0">
                                                <BriefcaseIcon className="w-3.5 h-3.5 flex-shrink-0" />
                                                {job.experience_level}
                                            </div>
                                        )}
                                    </div>
                                )}
                            </Link>
                        );
                    })}
                </div>

                <div className="text-center mt-12">
                    <Link
                        href="/jobs"
                        className="inline-flex items-center justify-center px-6 py-3 rounded-full bg-[#0A0A0A] text-white text-sm font-medium hover:bg-neutral-800 transition-colors shadow-[0_4px_14px_0_rgba(0,0,0,0.2)] group"
                    >
                        Browse 10,000+ Jobs
                        <svg className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M5 12h14M12 5l7 7-7 7" />
                        </svg>
                    </Link>
                </div>
            </div>
        </section>
    );
}
