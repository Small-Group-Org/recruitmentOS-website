'use client';

import { useState } from 'react';

const sampleLeads = [
    {
        id: 1,
        company: 'TechStaff Solutions',
        position: 'Senior DevOps Engineer',
        location: 'San Francisco, CA',
        contact: 'Sarah Johnson',
        title: 'VP of Engineering',
        email: 's.johnson@techstaff.com',
        phone: '+1 (415) 555-0123'
    },
    {
        id: 2,
        company: 'CloudHire Inc',
        position: 'Full Stack Developer',
        location: 'Austin, TX',
        contact: 'Michael Chen',
        title: 'Head of Talent',
        email: 'm.chen@cloudhire.io',
        phone: '+1 (512) 555-0456'
    },
    {
        id: 3,
        company: 'DataRecruit Pro',
        position: 'Data Scientist',
        location: 'Boston, MA',
        contact: 'Emily Rodriguez',
        title: 'Recruiting Director',
        email: 'e.rodriguez@datarecruit.com',
        phone: '+1 (617) 555-0789'
    }
];

export default function SampleLeads() {
    const [revealed, setRevealed] = useState(false);

    return (
        <section className="py-16 md:py-24 bg-[#F9FAFB]" id="sample-leads">
            <div className="max-w-[1000px] mx-auto px-5">
                {/* Header */}
                <div className="text-center mb-10">
                    <h2 className="text-2xl sm:text-3xl md:text-4xl font-black mb-4 text-[#1F2937] tracking-tight leading-tight">
                        Here&#39;s What You Get: <span className="text-orange-500">Real Leads</span>
                    </h2>
                    <p className="text-base sm:text-lg text-[#4B5563] font-bold max-w-[600px] mx-auto">
                        Every lead includes job data, company intel, and verified decision-maker contacts
                    </p>
                </div>

                {/* Sample Leads Grid */}
                <div className="space-y-4 mb-8">
                    {sampleLeads.map((lead) => (
                        <div key={lead.id} className="bg-white p-5 sm:p-6 rounded-2xl border-2 border-[#1F2937] btn-shadow relative overflow-hidden">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {/* Left: Job Info */}
                                <div>
                                    <div className="text-xs font-black text-orange-500 uppercase tracking-widest mb-2">Active Job Opening</div>
                                    <h3 className="text-lg sm:text-xl font-black text-[#1F2937] mb-2">{lead.position}</h3>
                                    <div className="space-y-1 text-sm text-[#4B5563] font-bold">
                                        <div>🏢 {lead.company}</div>
                                        <div>📍 {lead.location}</div>
                                    </div>
                                </div>

                                {/* Right: Contact Info */}
                                <div className="relative">
                                    <div className="text-xs font-black text-[#1F2937] uppercase tracking-widest mb-2">Decision Maker</div>
                                    <div className={`space-y-1 text-sm font-bold ${!revealed ? 'blur-sm select-none' : ''}`}>
                                        <div className="text-[#1F2937] font-black">{lead.contact}</div>
                                        <div className="text-[#4B5563]">{lead.title}</div>
                                        <div className="text-[#4B5563]">✉️ {lead.email}</div>
                                        <div className="text-[#4B5563]">📞 {lead.phone}</div>
                                    </div>

                                    {!revealed && (
                                        <div className="absolute inset-0 flex items-center justify-center">
                                            <div className="bg-[#1F2937] text-white px-3 py-1 rounded-lg text-xs font-black">
                                                🔒 LOCKED
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Unlock CTA */}
                {!revealed ? (
                    <div className="text-center bg-white p-6 sm:p-8 rounded-2xl border-2 border-[#1F2937] btn-shadow">
                        <p className="text-base sm:text-lg font-bold text-[#4B5563] mb-4">
                            Want to see the full contact details?
                        </p>
                        <button
                            onClick={() => setRevealed(true)}
                            className="bg-orange-500 text-white px-8 py-4 rounded-xl font-black transition-all hover:translate-y-[-2px] btn-shadow text-lg inline-flex items-center gap-2"
                        >
                            Unlock Sample Leads 🔓
                        </button>
                        <p className="text-xs sm:text-sm text-[#4B5563] font-bold mt-4">
                            No email required • Instant access
                        </p>
                    </div>
                ) : (
                    <div className="text-center bg-[#E0F2FE] p-6 sm:p-8 rounded-2xl border-2 border-[#1F2937]">
                        <div className="text-3xl sm:text-4xl mb-3">🎉</div>
                        <p className="text-lg sm:text-xl font-black text-[#1F2937] mb-2">
                            Now imagine getting 1,000 of these every month
                        </p>
                        <p className="text-sm sm:text-base text-[#4B5563] font-bold">
                            All verified. All automated. All proven to convert at 6%+.
                        </p>
                    </div>
                )}
            </div>
        </section>
    );
}
