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

  const boxStyle = {
    background:
      "linear-gradient(to bottom, rgba(182,135,86,.65) 40%, rgba(5,3,49,1) 60%)",
    borderRadius: "8px",
  };

  return (
    <>
      <Meta
        title="Register for the Lucky Draw"
        description="On submit, they get assigned a unique Lucky Number and an OTP is sent to their email for verification."
      />
      <section className="bg-[url('/banner22.webp')] bg-cover bg-center h-screen">
        {/* Hero Section with gradient bg, candles overlay, and bottom curve */}
        <section className="relative">
          {/* Gradient base */}

          {/* Candles image on the right */}
          <div />

          {/* Content */}
          <div>
            <div className="mx-auto relative z-10 max-w-6xl grid grid-cols-1 lg:grid-cols-1 gap-12 px-4 pt-10 pb-10 lg:pb-20">
              {/* Right (desktop form card) */}

              {isSubmitted ? (
                <CelebrationPanel name={submittedName || "Trader"} />
              ) : (
                <div className="">
                  <div className="flex items-center justify-center w-full gap-4 md:mb-20">
                    <Image
                      src="/new-logo.webp"
                      width={260}
                      height={93}
                      alt="GTCFX"
                      className="lg:w-[260px] lg:h-[93px] md:w-[110px] md:h-[40px] w-[130px] h-[47px] cursor-pointer"
                    />
                  </div>
                  <div className="bg-white max-w-lg mx-auto text-[#4D4D70] rounded-2xl shadow-2xl">
                    <div
                      className="relative py-[1px] px-[1px]"
                      style={boxStyle}
                    >
                      <h2 className="text-center py-4 bg-gradient-to-b from-[#202d7bdb] via-[#050331] to-[#050331] rounded-t-xl rounded-b-xl text-lg  text-white font-semibold capitalize">
                        Please provide your details
                      </h2>
                    </div>
                    <CommonMainForm
                      zapierUrl="https://hooks.zapier.com/hooks/catch/16420445/umhcnx7/"
                      successPath="/success"
                      setIsSubmitted={setIsSubmitted}
                      setSubmittedName={setSubmittedName}
                    />
                  </div>
                </div>
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
      </section>
    </>
  );
}
