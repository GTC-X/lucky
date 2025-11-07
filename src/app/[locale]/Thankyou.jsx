"use client"
import Image from "next/image";
const CelebrationPanel = ({ name = "Trader" }) => {
    return (

      <>
        <div className="flex items-center justify-center w-full gap-4 md:mb-10">
                                <Image
                                  src="/new-logo.webp"
                                  width={260}
                                  height={93}
                                  alt="GTCFX"
                                  className="lg:w-[260px] lg:h-[93px] md:w-[110px] md:h-[40px] w-[130px] h-[47px] cursor-pointer"
                                />
                              </div>

                                <div
            className="relative rounded-2xl overflow-hidden max-w-3xl mx-auto shadow-2xl w-full md:w-auto h-[600px]"
            style={{ background: "linear-gradient(135deg, #23307f 0%, #1d2257 100%)" }}
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

             

            <div className="relative h-full w-full p-6 md:p-8 flex flex-col justify-center text-white text-center animate-[fadeIn_.5s_ease-out] bg-gradient-to-b from-[#132F47] to-[#000021] rounded-2xl">
  {/* animated headline */}
  <div className="mb-5">
    <p className="text-sm tracking-[0.25em] uppercase text-[#E77831] font-semibold opacity-90">
      Thank You for Registering!
    </p>
   <h1 className="mt-3 text-3xl md:text-5xl font-extrabold leading-tight relative overflow-hidden">
  <span className="block bg-gradient-to-r from-[#B68756] via-[#E9C891] to-[#B68756] bg-clip-text text-transparent animate-shine">
    {name}
  </span>
</h1>
    <p className="mt-4 text-base md:text-lg opacity-90 max-w-lg mx-auto">
      Your registration for the <span className="font-semibold text-[#E77831]">GTC Lucky Draw</span> has been
      successfully received!  
      We’ve sent a confirmation email to your inbox containing your <strong>unique Lucky Number</strong>.
    </p>
  </div>

  {/* celebratory highlights */}
  <div className="grid gap-3 text-sm mt-6 mx-auto text-left md:text-center">
    <div className="inline-flex items-center justify-center gap-2">
      <span className="inline-block w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
      Entry confirmed successfully 🎉
    </div>
    <div className="inline-flex items-center justify-center gap-2">
      <span className="inline-block w-2.5 h-2.5 rounded-full bg-blue-400 animate-pulse" />
      Check your email for your Lucky Number ✉️
    </div>
    <div className="inline-flex items-center justify-center gap-2">
      <span className="inline-block w-2.5 h-2.5 rounded-full bg-yellow-400 animate-pulse" />
      Winners will be announced on <b>7 December 2025</b> 🏆
    </div>
  </div>

  {/* CTA */}
  <div className="pt-8">
    <a
      href="https://www.gtcfx.com"
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-[#E77831] to-[#F29120] text-white font-semibold hover:opacity-90 transition-all duration-300 shadow-lg"
    >
      Visit GTC Website
      <svg
        viewBox="0 0 24 24"
        className="w-4 h-4"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M5 12h14M12 5l7 7-7 7" />
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
      </>
      
    );
};

export default CelebrationPanel