import Image from 'next/image';

export default function ProofSection() {
    return (
        <section className="py-16 md:py-24 bg-white" id="proof">
            <div className="max-w-[1000px] mx-auto px-5">
                {/* Badge */}
                <div className="text-center mb-8">
                    <div className="inline-block bg-[#E0F2FE] text-[#1F2937] px-4 py-2 rounded-full font-black text-xs sm:text-sm uppercase tracking-widest border-2 border-[#1F2937]">
                        ✅ REAL CAMPAIGN DATA
                    </div>
                </div>

                {/* Headline */}
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-black mb-4 text-center text-[#1F2937] tracking-tight leading-tight">
                    We Don&#39;t Just Promise Results—<br className="hidden sm:inline" />We Show You The Proof
                </h2>

                {/* Dashboard Container */}
                <div className="bg-white p-5 md:p-8 rounded-[2rem] border-4 border-[#1F2937] btn-shadow mb-8">
                    {/* Screenshot */}
                    <div className="relative overflow-hidden rounded-xl border-2 border-[#1F2937]/20 mb-6">
                        <Image
                            src="/instantly.webp"
                            alt="Live campaign showing 5.3% reply rate"
                            width={2740}
                            height={346}
                            className="w-full h-auto"
                            sizes="(max-width: 1024px) 100vw, 1000px"
                        />
                    </div>

                    {/* Metrics Grid */}
                    <div className="grid grid-cols-3 gap-3 sm:gap-4">
                        <div className="bg-[#E0F2FE] p-4 sm:p-6 rounded-xl sm:rounded-2xl border-2 border-[#1F2937] text-center">
                            <div className="text-2xl sm:text-3xl md:text-4xl font-black text-[#1F2937] mb-1 leading-none tracking-tighter">3,543</div>
                            <div className="text-[10px] sm:text-xs font-black text-[#1F2937] uppercase tracking-widest">Sent</div>
                        </div>
                        <div className="bg-[#E0F2FE] p-4 sm:p-6 rounded-xl sm:rounded-2xl border-2 border-[#1F2937] text-center">
                            <div className="text-2xl sm:text-3xl md:text-4xl font-black text-[#1F2937] mb-1 leading-none tracking-tighter">145</div>
                            <div className="text-[10px] sm:text-xs font-black text-[#1F2937] uppercase tracking-widest">Replies</div>
                        </div>
                        <div className="bg-[#1F2937] p-4 sm:p-6 rounded-xl sm:rounded-2xl border-2 border-[#1F2937] text-center">
                            <div className="text-2xl sm:text-3xl md:text-4xl font-black text-white mb-1 leading-none tracking-tighter">5.3%</div>
                            <div className="text-[10px] sm:text-xs font-black text-white uppercase tracking-widest">Rate</div>
                        </div>
                    </div>
                </div>

                {/* Bottom Text */}
                <p className="text-center text-base sm:text-lg text-[#4B5563] font-bold max-w-[700px] mx-auto leading-relaxed">
                    This is <span className="text-[#1F2937] font-black">one of dozens</span> of campaigns we run 24/7.
                    Every client gets the same verified quality and full transparency.
                </p>
            </div>
        </section>
    );
}
