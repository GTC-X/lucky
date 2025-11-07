"use client";

import { useEffect, useCallback } from "react";
import Image from "next/image";

export default function CelebrationPanel({ values }) {
  // Confetti animation using canvas-confetti
  const confettiExplosion = useCallback(async (origin) => {
    const confetti = (await import("canvas-confetti")).default;

    const defaults = { disableForReducedMotion: true };

    function fire(particleRatio, opts) {
      confetti(
        Object.assign({}, defaults, opts, {
          particleCount: Math.floor(200 * particleRatio),
        })
      );
    }

    const base = origin || { x: 0.5, y: 0.25 };

    fire(0.25, { spread: 26, startVelocity: 55, origin: base });
    fire(0.2, { spread: 60, origin: base });
    fire(0.35, { spread: 100, decay: 0.91, origin: base });
    fire(0.1, { spread: 120, startVelocity: 25, decay: 0.92, origin: base });
    fire(0.1, { spread: 120, startVelocity: 45, origin: base });
    // extra side bursts for fun
    fire(0.2, { spread: 70, startVelocity: 45, origin: { x: 0.15, y: 0.7 } });
    fire(0.2, { spread: 70, startVelocity: 45, origin: { x: 0.85, y: 0.7 } });
  }, []);

  // Trigger confetti on mount
  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.matchMedia?.("(prefers-reduced-motion: reduce)").matches) return;

    const t = setTimeout(() => confettiExplosion(), 400);
    return () => clearTimeout(t);
  }, [confettiExplosion]);

  return (
    <>
      {/* Logo */}
      <div className="flex items-center justify-center w-full gap-4 md:mb-10">
        <Image
          src="/new-logo.webp"
          width={260}
          height={93}
          alt="GTCFX"
          className="lg:w-[260px] lg:h-[93px] md:w-[110px] md:h-[40px] w-[130px] h-[47px]"
        />
      </div>

      {/* Main Card */}
      <div
        className="relative rounded-2xl overflow-hidden max-w-3xl mx-auto shadow-2xl w-full md:w-auto h-[600px]"
        style={{ background: "linear-gradient(135deg, #23307f 0%, #1d2257 100%)" }}
      >
        {/* Soft spotlight */}
        <div
          className="pointer-events-none absolute inset-0 opacity-40"
          style={{
            background:
              "radial-gradient(600px 300px at 80% 20%, rgba(255,255,255,.15), transparent 60%)",
          }}
        />

        {/* Content */}
        <div className="relative h-full w-full p-6 md:p-8 flex flex-col justify-center text-white text-center bg-gradient-to-b from-[#132F47] to-[#000021] rounded-2xl animate-[fadeIn_.5s_ease-out]">
          {/* Headline */}
          <div className="mb-5">
            <p className="text-sm tracking-[0.25em] pb-5 uppercase text-[#E77831] font-semibold opacity-90">
              Thank You for Registering!
            </p>
            <p className="text-sm tracking-[0.25em] mt-2 text-left uppercase text-[#fff] font-semibold opacity-90">
              Dear {values?.nickname||"dsfdasf"},
            </p>

               <p className="text-base tracking-[0.25em] mt-2 capitalize text-[#fff] font-semibold opacity-90">
             Your Lucky Number 
            </p>

            <h1 className="mt-3 text-3xl md:text-5xl font-extrabold leading-tight relative overflow-hidden">
              <span className="block bg-gradient-to-r from-[#B68756] via-[#E9C891] to-[#B68756] bg-clip-text text-transparent animate-shine">
                {values?.token || "dasfadsf"}
              </span>
            </h1>

            <p className="mt-4 text-base md:text-lg opacity-90 max-w-lg mx-auto">
              Your registration for the{" "}
              <span className="font-semibold text-[#E77831]">GTC Lucky Draw</span> has been
              successfully received! We’ve sent a confirmation email to your inbox containing your{" "}
              <strong>unique Lucky Number</strong>.
            </p>
          </div>

          {/* Highlights */}
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

          {/* CTAs */}
          <div className="pt-8 flex items-center justify-center gap-3">
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
      </div>

      {/* Local style for gold shine animation */}
      <style jsx>{`
        @keyframes shine {
          0% {
            background-position: -200% 0;
          }
          100% {
            background-position: 200% 0;
          }
        }
        .animate-shine {
          background-size: 200% 100%;
          animation: shine 2.8s linear infinite;
          text-shadow: 0 1px 2px rgba(0, 0, 0, 0.15);
        }
      `}</style>
    </>
  );
}
