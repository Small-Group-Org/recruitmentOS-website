export default function TheMath() {
    const rows = [
        { label: 'Analysts', manual2: '2', manual10: '10', ros: '0' },
        { label: 'Labour / month', manual2: '$4,400', manual10: '$22,000', ros: '$0' },
        { label: 'Service fee', manual2: '$0', manual10: '$0', ros: '$2,500' },
        { label: 'Tools + APIs', manual2: '~$400', manual10: '~$1,200', ros: '$700–1,200' },
        { label: 'Total cost', manual2: '$4,800', manual10: '$23,200', ros: '$3,200–3,700', bold: true },
        { label: 'Verified contacts', manual2: '~580', manual10: '~2,900', ros: '5,000–10,000', highlight: true },
        { label: 'Replies (at 6%)', manual2: '~35', manual10: '~175', ros: '300–600', highlight: true },
        { label: 'Est. placements', manual2: '~1', manual10: '~6', ros: '10–20', highlight: true },
        { label: 'Revenue (at $10K fee)', manual2: '~$10K', manual10: '~$60K', ros: '$100K–200K', bold: true, highlight: true },
    ];

    return (
        <section className="py-16 md:py-24 bg-[#FAFAFA] border-t border-[#e5e5e5]" id="the-math">
            <div className="max-w-[1000px] mx-auto px-4 sm:px-6">
                <div className="mb-10">
                    <p className="text-xs font-medium text-[#6b7280] uppercase tracking-widest mb-3">The Maths</p>
                    <h2 className="text-[#0A0A0A] text-3xl md:text-4xl font-extrabold tracking-tight mb-4">
                        What does it actually cost per placement?
                    </h2>
                    <p className="text-[16px] text-[#6b7280] max-w-2xl">
                        Assumptions: $2,200/month per analyst · 290 contacts/analyst/month · 6% reply rate · 20% conversion from reply to placement · $10,000 average placement fee.
                    </p>
                </div>

                {/* Table */}
                <div className="overflow-x-auto rounded-[14px] border border-[#e5e5e5] bg-white">
                    <table className="w-full text-sm">
                        <thead>
                            <tr className="bg-[#F5F5F5] border-b border-[#e5e5e5]">
                                <th className="text-left px-5 py-3.5 text-[11px] font-bold uppercase tracking-widest text-[#6b7280]">Row</th>
                                <th className="text-center px-5 py-3.5 text-[11px] font-bold uppercase tracking-widest text-[#3B82F6]">Manual · 2 Analysts</th>
                                <th className="text-center px-5 py-3.5 text-[11px] font-bold uppercase tracking-widest text-[#6B7280]">Manual · 10 Analysts</th>
                                <th className="text-center px-5 py-3.5 text-[11px] font-bold uppercase tracking-widest text-[#F97316]">RecruitmentOS</th>
                            </tr>
                        </thead>
                        <tbody>
                            {rows.map((row, i) => (
                                <tr key={row.label} className={`border-b border-[#e5e5e5] last:border-0 ${row.highlight ? 'bg-[#fffbf5]' : ''}`}>
                                    <td className={`px-5 py-3.5 text-[#6b7280] ${row.bold ? 'font-bold text-[#0A0A0A]' : ''}`}>{row.label}</td>
                                    <td className={`px-5 py-3.5 text-center font-mono ${row.bold ? 'font-bold text-[#0A0A0A]' : 'text-[#6b7280]'}`}>{row.manual2}</td>
                                    <td className={`px-5 py-3.5 text-center font-mono ${row.bold ? 'font-bold text-[#0A0A0A]' : 'text-[#6b7280]'}`}>{row.manual10}</td>
                                    <td className={`px-5 py-3.5 text-center font-mono ${row.bold ? 'font-bold text-[#F97316]' : 'text-[#F97316] font-medium'}`}>{row.ros}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* Punchline */}
                <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div className="bg-[#EBF4FF] rounded-[12px] p-7 text-center border border-[#bfdbfe]">
                        <p className="text-[11px] font-bold uppercase tracking-widest text-[#3B82F6] mb-2">Manual BD team</p>
                        <p className="text-4xl font-extrabold text-[#0A0A0A] mb-1">$3,800–$4,800</p>
                        <p className="text-sm text-[#6b7280]">cost per placement</p>
                    </div>
                    <div className="bg-[#fff7ed] rounded-[12px] p-7 text-center border border-[#fed7aa]">
                        <p className="text-[11px] font-bold uppercase tracking-widest text-[#F97316] mb-2">RecruitmentOS</p>
                        <p className="text-4xl font-extrabold text-[#F97316] mb-1">$185–$280</p>
                        <p className="text-sm text-[#6b7280]">cost per placement</p>
                    </div>
                </div>

                <p className="mt-5 text-[14px] text-[#6b7280] text-center">
                    15–25× improvement. Before counting management time, hiring overhead, sick days, churn, and founder hours spent reviewing analyst output.
                </p>
            </div>
        </section>
    );
}
