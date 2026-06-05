export default function Proof() {
    return (
        <section className="py-16 md:py-32 bg-[#E0F2FE]" id="proof">
            <div className="max-w-[1200px] mx-auto px-5 text-center">
                <div className="inline-block bg-white text-[#1E293B] px-4 py-1.5 sm:px-6 sm:py-2 rounded-full font-black text-[10px] sm:text-xs uppercase tracking-widest mb-6 sm:mb-8 border-2 border-[#1E293B]">
                    REAL CAMPAIGN DATA
                </div>
                <h2 className="text-2xl sm:text-3xl md:text-[48px] font-black mb-4 sm:mb-6 text-[#1E293B] tracking-tight leading-none">
                    We Don't Just Promise Results—We Show You The Dashboard
                </h2>
                <p className="text-lg sm:text-xl text-[#475569] mb-10 sm:mb-16 max-w-[800px] mx-auto font-medium">
                    Live data from our active lead generation campaigns
                </p>

                {/* Dashboard Screenshot Container */}
                <div className="bg-white p-5 md:p-12 rounded-[2rem] md:rounded-[3rem] border-4 border-[#1E293B] btn-shadow mb-8 sm:mb-12 max-w-[1000px] mx-auto">
                    {/* Screenshot */}
                    <div className="relative overflow-hidden rounded-xl sm:rounded-2xl border-2 border-[#1E293B]/20 mb-4 sm:mb-6">
                        <img
                            src="/instantly.webp"
                            alt="Instantly.ai campaign showing 5.3% reply rate"
                            className="w-full h-auto"
                        />
                    </div>

                    {/* Caption below screenshot */}
                    <p className="text-center text-xs sm:text-sm text-[#475569] mb-6 sm:mb-8 font-bold leading-relaxed">
                        <span className="text-[#1E293B]">Live Campaign Dashboard</span> • Updated Daily<br />
                        <span className="text-[10px] sm:text-xs">3,543 sent • 145 replies • 5.3% rate • Active now</span>
                    </p>

                    {/* Metrics Bar */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 mb-4 sm:mb-8">
                        <div className="bg-[#E0F2FE] p-5 sm:p-6 rounded-2xl border-2 border-[#1E293B]">
                            <div className="text-2xl sm:text-3xl md:text-[48px] font-black text-[#1E293B] mb-1 leading-none tracking-tighter">3,543</div>
                            <div className="text-[10px] sm:text-sm font-black text-[#1E293B] uppercase tracking-widest">Emails Sent</div>
                        </div>
                        <div className="bg-[#E0F2FE] p-5 sm:p-6 rounded-2xl border-2 border-[#1E293B]">
                            <div className="text-2xl sm:text-3xl md:text-[48px] font-black text-[#1E293B] mb-1 leading-none tracking-tighter">145</div>
                            <div className="text-[10px] sm:text-sm font-black text-[#1E293B] uppercase tracking-widest">Direct Replies</div>
                        </div>
                        <div className="bg-[#1E293B] p-5 sm:p-6 rounded-2xl border-2 border-[#1E293B]">
                            <div className="text-2xl sm:text-3xl md:text-[48px] font-black text-white mb-1 leading-none tracking-tighter">5.3%</div>
                            <div className="text-[10px] sm:text-sm font-black text-white uppercase tracking-widest">Reply Rate</div>
                        </div>
                    </div>
                </div>

                {/* Description */}
                <p className="text-base sm:text-lg text-[#1E293B] max-w-[800px] mx-auto font-medium leading-relaxed">
                    This is one of dozens of campaigns we run 24/7. Every client gets
                    the same level of transparency and access to real-time analytics.
                </p>
            </div>
        </section>
    );
}
