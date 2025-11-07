"use client";
import Image from "next/image";
import CommonMainForm from "./commonForm";
import { useState } from "react";
import { useTranslations } from "next-intl";
import { renderSvg } from "../config/svgs";
import LanguageSelect from "./LanguageSelect";
import Header from "./header";
import Meta from "./components/Meta";
import CelebrationPanel from "./Thankyou";

export default function GTCRegisterWithDesign() {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const t = useTranslations("home.banner");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submittedName, setSubmittedName] = useState("");
  return (
    <>
      <Meta
        title="Get 5,000 USC to Trade. No Deposit Needed!"
        description="Fill in your details, activate your GTC Cent trading account, and start trading with a 5,000 USC bonus today."
      />
      <div className="min-h-screen bg-[#0F143A] text-white">
        {/* Top Bar */}
        <Header />

        {/* Hero Section with gradient bg, candles overlay, and bottom curve */}
        <section className="relative">
          {/* Gradient base */}
          <div
            className="absolute inset-0 -z-10"
            style={{
              background: "linear-gradient(135deg,#293794 0%,#000021 100%)",
            }}
          />

          {/* Candles image on the right */}
          <div
            className="pointer-events-none absolute inset-y-0 right-0 w-full opacity-70"
            style={{
              backgroundImage: `url(/new-banner.webp)`,
              backgroundRepeat: "no-repeat",
              backgroundPosition: "right center",
              maskImage:
                "linear-gradient(90deg, rgba(0,0,0,0) 0%, rgba(0,0,0,.6) 20%, rgba(0,0,0,1) 60%)",
              WebkitMaskImage:
                "linear-gradient(90deg, rgba(0,0,0,0) 0%, rgba(0,0,0,.6) 20%, rgba(0,0,0,1) 60%)",
            }}
          />

          {/* Content */}
          <div className="bg-[linear-gradient(135deg,#293794,#00002f)]">
            <div className="mx-auto relative z-10 max-w-6xl grid grid-cols-1 lg:grid-cols-2 gap-12 px-4 pt-10 pb-10 lg:pb-20">
              {/* Right (desktop form card) */}
              <div className="hidden md:block">
                <div className="bg-white max-w-lg mx-auto text-[#4D4D70] p-6 rounded-2xl shadow-2xl">
                  <h3 className="mb-4 text-xl font-semibold text-[#000032] text-center">
                    Register Now
                  </h3>
                  <CommonMainForm
                    zapierUrl="https://hooks.zapier.com/hooks/catch/16420445/umhcnx7/"
                    successPath="/success"
                    setIsSubmitted={setIsSubmitted}
                    setSubmittedName={setSubmittedName}
                  />
                </div>
              </div>
              {isSubmitted ? (
                <CelebrationPanel name={submittedName || "Trader"} />
              ) : (
                <div className="hidden md:block" />
              )}
            </div>
          </div>
        </section>

        {/* Drawer (mobile) */}
        <div
          className={`fixed inset-0 z-50 flex justify-end bg-black/50 transition-opacity duration-300 ${
            drawerOpen ? "opacity-100" : "opacity-0 pointer-events-none"
          }`}
          onClick={() => setDrawerOpen(false)}
        >
          <div
            className={`w-full sm:w-[480px] h-full bg-[#000032] text-[#fff] p-6 overflow-auto transform transition-transform duration-500 ease-in-out ${
              drawerOpen ? "translate-x-0" : "translate-x-full"
            }`}
            onClick={(e) => e.stopPropagation()}
          >
            <div className=" justify-between mb-6">
              <button
                aria-label="Close"
                className="rounded-full p-2 text-[#fff] flex justify-end w-full hover:bg-slate-100"
                onClick={() => setDrawerOpen(false)}
              >
                ✕
              </button>
              <h3 className="text-3xl font-semibold text-[#fff] text-center">
                Register Now
              </h3>
            </div>
            <CommonMainForm
              zapierUrl="https://hooks.zapier.com/hooks/catch/16420445/umhcnx7/"
              successPath="/success"
              isMobile={true}
            />
          </div>
        </div>
      </div>
    </>
  );
}
