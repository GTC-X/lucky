"use client"
const CelebrationPanel = ({ name = "Trader" }) => {
    return (
        <div
            className="relative rounded-2xl overflow-hidden"
            style={{ background: "linear-gradient(135deg, #293794 0%, #000021 100%)" }}
        >
            {/* soft spotlight */}
            <div
                className="pointer-events-none absolute inset-0 opacity-40"
                style={{
                    background:
                        "radial-gradient(600px 300px at 80% 20%, rgba(255,255,255,.15), transparent 60%)",
                }}
            />

            {/* confetti-ish sparkles */}
            <div className="absolute inset-0 overflow-hidden">
                <div className="sparkles pointer-events-none" />
            </div>

            <div className="relative h-full w-full p-6 md:p-8 flex flex-col justify-center text-white animate-[fadeIn_.5s_ease-out]">
                {/* animated headline */}
                <div className="mb-5">
                    <p className="text-sm tracking-widest opacity-90">THANK YOU</p>
                    <h1 className="mt-2 text-3xl md:text-5xl font-extrabold leading-tight">
                        <span className="block text-gradient-shimmer">{name}</span>
                    </h1>
                    <p className="mt-3 md:mt-4 text-base md:text-lg opacity-90">
                        Your request has been received. A confirmation email is on the way.
                    </p>
                </div>

                {/* badges */}
                <div className="grid gap-2 text-sm mt-2">
                    <div className="inline-flex items-center gap-2">
                        <span className="inline-block w-2 h-2 rounded-full bg-emerald-400" />
                        Verification completed successfully
                    </div>
                    <div className="inline-flex items-center gap-2">
                        <span className="inline-block w-2 h-2 rounded-full bg-blue-300" />
                        Expect a response within 1–2 business days
                    </div>
                </div>

                {/* CTA */}
                <div className="pt-6">
                    <a
                        href="https://www.gtcfx.com"
                        target="_blank"
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 transition"
                    >
                        Visit Website
                        <svg viewBox="0 0 24 24" className="w-4 h-4">
                            <path
                                fill="currentColor"
                                d="M14 3h7v7h-2V6.41l-9.29 9.3-1.42-1.42 9.3-9.29H14V3Z"
                            />
                        </svg>
                    </a>
                </div>
            </div>

            {/* styles */}
            <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(6px); }
          to { opacity: 1; transform: translateY(0); }
        }
        /* animated gradient text with moving shimmer line */
        .text-gradient-shimmer {
          position: relative;
          display: inline-block;
          background: linear-gradient(90deg, #8ab4ff, #e1cfbb, #8ab4ff);
          background-size: 200% 100%;
          -webkit-background-clip: text;
          background-clip: text;
          color: transparent;
          animation: gradientSlide 4.5s ease-in-out infinite;
        }
        .text-gradient-shimmer::after {
          content: "";
          position: absolute;
          inset: 0;
          background: linear-gradient(
            120deg,
            transparent 0%,
            rgba(255,255,255,0.65) 40%,
            transparent 70%
          );
          mix-blend-mode: screen;
          transform: translateX(-120%);
          animation: shine 2.8s ease-in-out infinite;
        }
        @keyframes gradientSlide {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        @keyframes shine {
          0% { transform: translateX(-120%); }
          50% { transform: translateX(120%); }
          100% { transform: translateX(120%); }
        }
        /* subtle sparkles */
        .sparkles {
          width: 200%;
          height: 200%;
          position: absolute;
          top: -50%;
          left: -50%;
          background:
            radial-gradient(2px 2px at 20% 30%, rgba(255,255,255,0.9) 50%, transparent 51%),
            radial-gradient(2px 2px at 80% 40%, rgba(255,255,255,0.8) 50%, transparent 51%),
            radial-gradient(2px 2px at 50% 70%, rgba(255,255,255,0.85) 50%, transparent 51%),
            radial-gradient(2px 2px at 30% 85%, rgba(255,255,255,0.7) 50%, transparent 51%),
            radial-gradient(2px 2px at 65% 25%, rgba(255,255,255,0.75) 50%, transparent 51%);
          animation: drift 12s linear infinite;
          opacity: 0.25;
        }
        @keyframes drift {
          0% { transform: translateY(0) rotate(0deg); }
          100% { transform: translateY(30px) rotate(15deg); }
        }
      `}</style>
        </div>
    );
};

export default CelebrationPanel