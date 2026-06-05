export default function QualityGuarantee() {
    return (
        <section className="py-16 md:py-24 bg-[#1F2937] text-white text-center rounded-[2rem] sm:rounded-[4rem] mx-4 relative overflow-hidden my-8 sm:my-12">
            {/* Background Accent */}
            <div className="absolute top-0 right-0 w-[300px] h-[300px] sm:w-[400px] sm:h-[400px] bg-blue-500/10 blur-[80px] sm:blur-[100px] rounded-full"></div>

            <div className="max-w-[1280px] mx-auto px-5 relative z-10">
                <h2 className="text-2xl sm:text-4xl md:text-[56px] font-black mb-4 sm:mb-6 tracking-tight leading-loose sm:leading-none text-[#E0F2FE]">Proven 6%+ Reply Rates</h2>
                <p className="text-base sm:text-xl mb-8 sm:mb-12 text-slate-300 font-medium">We don&#39;t just promise quality. We prove it with every lead batch.</p>
                <div className="text-4xl sm:text-6xl md:text-[120px] font-black my-8 sm:my-12 tracking-tighter text-white drop-shadow-[0_10px_10px_rgba(0,0,0,0.3)] leading-none uppercase">6%+ Reply Rate</div>
                <p className="text-base sm:text-xl text-slate-300 max-w-[800px] mx-auto leading-relaxed font-medium">
                    Our campaigns consistently achieve 6%+ reply rates. <br />
                    You get full transparency with verified reply rate data for every batch.
                </p>
            </div>
        </section>
    );
}
