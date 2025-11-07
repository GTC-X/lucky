"use client";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { useEffect, useState } from "react";
import PhoneInput, { isValidPhoneNumber } from "react-phone-number-input";
import { parsePhoneNumberFromString } from "libphonenumber-js";
import "react-phone-number-input/style.css";
import OtpInput from "react-otp-input";
import { countryList } from "../context/useCountriesDetails";
import { useLocationDetail } from "../context/useLocationDetail";
import { toast } from "react-toastify";
import Select from "react-select";
import { useTranslations, useLocale } from "next-intl";
import { useRouter } from "@/i18n/navigation";
import { useSearchParams } from "next/navigation";

// put above your return()
const selectStyles = {
    control: (base, state) => ({
        ...base,
        backgroundColor: '#fff',
        color: '#000',
        borderColor: state.isFocused ? '#666684' : '#d1d5db',
        boxShadow: 'none',
        ':hover': { borderColor: '#666684' },
        minHeight: 42,
    }),
    valueContainer: (base) => ({ ...base, color: '#000' }),
    singleValue: (base) => ({ ...base, color: '#000' }),
    input: (base) => ({ ...base, color: '#000' }),
    placeholder: (base) => ({ ...base, color: '#6b7280' }),
    menu: (base) => ({
        ...base,
        backgroundColor: '#fff',
        color: '#000',
        zIndex: 9999,
    }),
    menuList: (base) => ({ ...base, backgroundColor: '#fff' }),
    option: (base, state) => ({
        ...base,
        backgroundColor: state.isSelected
            ? '#e5e7eb'
            : state.isFocused
                ? '#f3f4f6'
                : '#fff',
        color: '#000',
        ':active': { backgroundColor: '#e5e7eb' },
    }),
    indicatorSeparator: (base) => ({ ...base, backgroundColor: '#e5e7eb' }),
    dropdownIndicator: (base, state) => ({
        ...base,
        color: state.isFocused ? '#666684' : '#9ca3af',
        ':hover': { color: '#666684' },
    }),
};


const CommonMainForm = ({ isMobile = false, setIsSubmitted,
    setSubmittedName }) => {
    const { countryData } = useLocationDetail();
    const [otpLoading, setOtpLoading] = useState(false);
    const params = useSearchParams()
    const token = params.get("token")
    const [showOtp, setShowOtp] = useState(false);
    const [loading, setLoading] = useState(false);
    const [storedOtp, setStoredOtp] = useState("");
    const [isDisable, setIsDisable] = useState(true);

    const router = useRouter();
    const t = useTranslations("home.form");
    const locale = useLocale();

    // prepare country options
    const options = countryList?.map((item) => ({
        value: item.alpha_2_code,
        label: (
            <div className="flex items-center gap-2">
                <img
                    src={`https://flagcdn.com/w40/${item.alpha_2_code.toLowerCase()}.png`}
                    alt={item.en_short_name}
                    className="w-5 h-4 object-cover"
                />
                <span>{item.en_short_name}</span>
            </div>
        ),
    }));

    useEffect(() => {
        if (countryData?.country) {
            const filterData = countryList.find(
                (item) => item?.en_short_name == countryData.country || item?.alpha_2_code == countryData.country
            );
            formik.setFieldValue(
                "country",
                filterData ? filterData?.alpha_2_code : ""
            );
        }
    }, [countryData?.country, countryList, params]);

    const getIso2ByCountryName = (name) => {
        const hit = countryList.find((c) => c.en_short_name === name);
        return hit?.alpha_2_code;
    };

    const api = axios.create({
        baseURL: "https://mygtcportal.com",
        timeout: 15000,
    });

    // make a token like "webword12345"
    const makeToken = () =>
        "web" + String(Math.floor(Math.random() * 100000)).padStart(5, "0");

    const isTokenAvailable = async (t) => {
        const r = await fetch(`/api/sheets?tokenCheck=${encodeURIComponent(t)}`, { cache: "no-store" });
        const { ok, formatOk, available } = await r.json();
        return !!ok && !!formatOk && !!available;
    };



    const getUniqueToken = async (maxTries = 10) => {
        for (let i = 0; i < maxTries; i++) {
            const candidate = makeToken();
            const ok = await isTokenAvailable(candidate);
            if (ok) return candidate;
        }
        throw new Error("Token check kept failing. Verify /api/sheets GET and 'token' header.");
    };

    const validationSchema = Yup.object({
        nickname: Yup.string().required(t("errors.firstNameRequired")),
        email: Yup.string()
            .email(t("errors.emailInvalid"))
            .required(t("errors.emailRequired"))
            .test("no-plus-sign", "Email address cannot contain '+'", (v) => !v || !v.includes("+")),
        phone: Yup.string()
            .required(t("errors.phoneRequired"))
            .test("is-valid-e164", t("errors.phoneInvalid"), (v) => !!v && isValidPhoneNumber(v))
            .test("matches-selected-country", "Number doesn’t match selected country", function (value) {
                const selectedCountryName = this.parent.country;
                if (!value || !selectedCountryName) return true;
                const selectedIso2 = getIso2ByCountryName(selectedCountryName);
                if (!selectedIso2) return true;
                const pn = parsePhoneNumberFromString(value);
                if (!pn) return false;
                return pn.country === selectedIso2;
            }),
        country: Yup.string().required(t("errors.countryRequired")),
        otp: Yup.string().length(6, t("errors.otpLength")).required(t("errors.otpRequired")),
        terms: Yup.bool().oneOf([true], t("errors.termsRequired")),

        isAnyone: Yup.string().oneOf(["yes", "no"]).required(),

        companionsCount: Yup.number()
            .min(0)
            .max(5)
            .when("isAnyone", {
                is: "yes",
                then: (s) => s.min(1, "Please select how many people").required("Required"),
            }),

        // Require companions ONLY when isAnyone === "yes"
        companions: Yup.array()
            .when(["isAnyone", "companionsCount"], ([isAnyone, count], schema) => {
                if (isAnyone === "yes") {
                    return schema
                        .of(
                            Yup.object({
                                first: Yup.string().required("Full name is required"),
                                last: Yup.string()
                                    .matches(/^\d+$/, "Digits only")
                                    .min(6, "MT5 must be 6–7 digits")
                                    .max(7, "MT5 must be 6–7 digits")
                                    .required("MT5 account is required"),
                            })
                        )
                        .min(count || 1, "Add names for all companions");
                }
                // if "no", don’t validate inner fields strictly
                return schema.of(
                    Yup.object({
                        first: Yup.string(),
                        last: Yup.string(),
                    })
                );
            }),
    });



    // formik setup
    // formik setup
    const formik = useFormik({
        initialValues: {
            nickname: "",
            email: "",
            phone: "",
            country: "",
            otp: "",
            terms: false,

            // NEW
            isAnyone: "no",          // "yes" | "no"
            companionsCount: 0,      // 0..5
            companions: [],          // [{first:"", last:""}, ...]
        },
        validationSchema,

        validateOnBlur: true,
        validateOnChange: true,
        // supply context for conditional rules
        context: { requireCompanions: false },
        onSubmit: async (values) => {
            setLoading(true);
            const token = await getUniqueToken();
            const companionsSummary =
                values.isAnyone === "yes" && values.companions?.length
                    ? values.companions
                        .slice(0, Number(values.companionsCount) || 0)
                        .map((p, i) => `${i + 1}) ${p.first || ""} ${p.last || ""}`.trim())
                        .join(" | ")
                    : "";

            try {
                // format companions into a single string for the 6th column
                const companionsSummary =
                    values.isAnyone === "yes" && values.companions?.length
                        ? values.companions
                            .slice(0, Number(values.companionsCount) || 0)
                            .map((p, i) => `${i + 1}) ${p.first || ""} ${p.last || ""}`.trim())
                            .join(" | ")
                        : "";

                const row = [
                    values.nickname,        // firstName
                    values.nickname,       // lastName
                    values.email,           // email
                    values.phone,           // phone
                    values.country,         // country
                    companionsSummary,      // companions (6th column)
                    token,                  // token
                ];

                const res = await fetch("/api/sheets", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ withObject: true, values: [row] }),
                });

                const json = await res.json();
                if (!json.ok) {
                    toast.error(json.error || "Failed to save.");
                    return;
                }

                // 2) build Zapier companion keys: compaign1..N
                const compCount = Number(values.companionsCount) || 0;
                const compaignPayload = {};
                if (values.isAnyone === "yes" && compCount > 0) {
                    values.companions.slice(0, compCount).forEach((p, idx) => {
                        compaignPayload[`compaign${idx + 1}`] = {
                            firstName: p.first || "",
                            account: p.last || "",
                        };
                    });
                }

                // 3) Zapier + Email
                await axios.post(
                    "https://hooks.zapier.com/hooks/catch/16420445/uskukap/",
                    JSON.stringify({
                        ...values,
                        token,
                        companionsSummary,
                        ...compaignPayload, // <- compaign1..N
                    })
                );
                await axios.post(
                    "/api/email",
                    JSON.stringify({ ...values, locale, token, companions: companionsSummary })
                );

                toast.success(`Saved! Your token: ${token}`);
                toast.success(t("thankYou1"));
                setSubmittedName((st) => ({ ...st, ...values, token, companions: companionsSummary }));
                setIsSubmitted(true);
                formik.resetForm();
                setShowOtp(false);
                setIsDisable(true);
            } catch (err) {
                console.error(err);
                toast.error(err?.message || "Something went wrong");
            } finally {
                setLoading(false);
            }
        },
    });



    // keep companions array length in sync with companionsCount
    const syncCompanionsLength = (count) => {
        const current = formik.values.companions || [];
        const next = [...current];

        if (count > current.length) {
            for (let i = current.length; i < count; i++) next.push({ first: "", last: "" });
        } else if (count < current.length) {
            next.length = count;
        }

        formik.setFieldValue("companions", next);
    };

    // whenever isAnyone or companionsCount changes, update Yup context + array length
    useEffect(() => {
        const requireCompanions = formik?.values?.isAnyone === "yes" && Number(formik?.values?.companionsCount) > 0;
        // update yup context
        (formik).validateForm(undefined, { requireCompanions });
    }, [formik?.values?.isAnyone, formik?.values?.companionsCount]);

    useEffect(() => {
        const c = (formik.values.companionsCount) || 0;
        if (formik?.values?.isAnyone === "yes") syncCompanionsLength(c);
        else if (formik.values.companions?.length) formik.setFieldValue("companions", []);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [formik?.values?.isAnyone, formik.values.companionsCount]);


    // send OTP
    const sendVerificationCode = () => {
        setOtpLoading(true);
        axios
            .post(`/api/otp-smtp`, {
                email: formik.values.email,
                first_name: formik.values.nickname,
                type: "0",
                locale,
            })
            .then((res) => {
                if (res?.data?.message) {
                    setShowOtp(true);
                    setStoredOtp(res?.data?.message?.slice(4, -3));
                    toast.success(t("otpSent"));
                } else {
                    toast.error(res?.data?.message);
                }
            })
            .finally(() => setOtpLoading(false));
    };

    // verify OTP
    const verifyOtpCode = (otp) => {
        if (otp === storedOtp) {
            toast.success(t("otpSuccess"));
            setShowOtp(false);
            setIsDisable(false);
        } else {
            toast.error(t("otpFail"));
        }
    };

    const color = isMobile ? "text-[#fff]" : "text-[#666684]"



    return (
        <>
            <form onSubmit={formik.handleSubmit} className="space-y-4 p-6">

                <p className="text-xs text-red-600">Please ensure your email and phone number are correct before submitting.
                    Both details will be verified before your lucky number and award are issued.</p>
                {/* First + Last Name */}
                <div className="grid sm:grid-cols-1 gap-4">
                    <div>
                        <label className={`text-sm ${color} mb-1`}>Full Name</label>
                        <input
                            type="text"
                            placeholder={"Enter Full Name..."}
                            {...formik.getFieldProps("nickname")}
                            className={`w-full border px-3 py-2 ${isMobile ? "bg-[#33335b]" : ""} rounded-md ${formik.touched.nickname && formik.errors.nickname
                                ? "border-red-500"
                                : "border-gray-300"
                                }`}
                        />
                        {formik.touched.nickname && formik.errors.nickname && (
                            <p className="text-xs text-red-500">{formik.errors.nickname}</p>
                        )}
                    </div>

                </div>

                {/* Email + OTP */}
                <div>
                    <label className={`text-sm ${color} mb-1`}>{t("email")}</label>
                    <div className="relative">
                        <input
                            type="email"
                            placeholder={t("email")}
                            {...formik.getFieldProps("email")}
                            className={`w-full border px-3 py-2 rounded-md ${isMobile ? "bg-[#33335b]" : ""} ${formik.touched.email && formik.errors.email
                                ? "border-red-500"
                                : "border-gray-300"
                                }`}
                        />
                        <button
                            type="button"
                            onClick={sendVerificationCode}
                            className={`absolute min-h-[41px] top-0 ${locale == "ar" ? "left-0" : "right-0"} bg-[#666684] text-white px-3 py-1 rounded-md text-xs`}
                        >
                            {otpLoading ? t("sending") : t("getCode")}
                        </button>
                    </div>
                    {formik.touched.email && formik.errors.email && (
                        <p className="text-xs text-red-500">{formik.errors.email}</p>
                    )}
                </div>

                {showOtp && (
                    <div>
                        <p className="text-sm mb-2">{t("otp")}</p>
                        <div className=" flex gap-3 items-center">
                            <OtpInput
                                value={formik.values.otp}
                                onChange={(otp) => {
                                    formik.setFieldValue("otp", otp)
                                    if (otp?.length == 6) {
                                        verifyOtpCode(otp)
                                    }

                                }}
                                numInputs={6}
                                containerStyle={{
                                    display: "flex",
                                    justifyContent: "space-between",
                                    gap: "3px"
                                }}
                                isInputNum
                                renderInput={(props) => (
                                    <input
                                        {...props}
                                        type="tel" // Triggers number pad
                                        inputMode="numeric" // Helps mobile keyboard detect numeric input
                                        pattern="[0-9]*" // Optional: enforce numeric
                                    />
                                )}

                                inputStyle={{
                                    fontSize: "16px", // ✅ critical to stop iOS zoom
                                    borderRadius: "5px",
                                    paddingBottom: "10px",
                                    paddingTop: "10px",
                                    width: "15%",
                                    backgroundColor: "#fff",
                                    color: "#666684",
                                    fontWeight: "700",
                                    outlineColor: "#666684",
                                    border:
                                        formik.touched.otp && formik.errors.otp
                                            ? "1px solid red"
                                            : "1px solid #666684",
                                }}
                            />
                        </div>
                    </div>
                )}

                {/* Phone */}
                <div>
                    <label className={`text-sm ${color} mb-1`}>{t("phone")}</label>
                    <PhoneInput
                        international
                        defaultCountry={countryData?.country_code || countryData?.country || "AE"}
                        value={formik.values.phone}
                        onChange={(phone) => formik.setFieldValue("phone", phone)}
                        className={`w-full border px-3 py-2 ${isMobile ? "bg-[#33335b]" : ""} rounded-md ${formik.touched.phone && formik.errors.phone
                            ? "border-red-500"
                            : "border-gray-300"
                            }`}
                    />
                    {formik.touched.phone && formik.errors.phone && (
                        <p className="text-xs text-red-500">{formik.errors.phone}</p>
                    )}
                </div>

                {/* Country */}
                <div>
                    <label className={`text-sm ${color} mb-1`}>{t("country")}</label>
                    <Select
                        name="country"
                        options={options}
                        styles={selectStyles}
                        onChange={(opt, e) => {
                            formik.setFieldValue("country", opt?.value)

                        }}
                        onBlur={() => formik.setFieldTouched("country", true)}
                        value={options.find((opt) => opt.value === formik.values.country)}
                    />
                    {formik.touched.country && formik.errors.country && (
                        <p className="text-xs text-red-500">{formik.errors.country}</p>
                    )}
                </div>


                {/* Is anyone with you? */}
                <div>
                    <label className={`text-sm ${color} mb-1`}>Will you attend alone or with clients?</label>
                    <select
                        className={`w-full bg-white px-4 py-2 border ${formik.touched.isAnyone && formik.errors.isAnyone ? "border-red-500" : "border-gray-300"} rounded-lg text-gray-700`}
                        value={formik.values.isAnyone}
                        onChange={(e) => {
                            const v = e.target.value;
                            formik.setFieldValue("isAnyone", v);
                            if (v === "no") {
                                formik.setFieldValue("companionsCount", 0);
                                formik.setFieldValue("companions", []);
                            }
                        }}
                        onBlur={() => formik.setFieldTouched("isAnyone", true)}
                    >
                        <option value="no">No</option>
                        <option value="yes">Yes</option>
                    </select>
                    {formik.touched.isAnyone && formik.errors.isAnyone && (
                        <p className="text-red-500 text-sm">{String(formik.errors.isAnyone)}</p>
                    )}
                </div>

                {/* If yes: how many (1-5) */}
                {formik.values.isAnyone === "yes" && (
                    <div>
                        <label className={`text-sm ${color} mb-1`}>How many clients?</label>
                        <select
                            className={`w-full bg-white px-4 py-2 border ${formik.touched.companionsCount && formik.errors.companionsCount ? "border-red-500" : "border-gray-300"} rounded-lg text-gray-700`}
                            value={formik.values.companionsCount}
                            onChange={(e) => formik.setFieldValue("companionsCount", Number(e.target.value))}
                            onBlur={() => formik.setFieldTouched("companionsCount", true)}
                        >
                            <option value={0}>Select</option>
                            {[1, 2, 3, 4, 5].map(n => <option key={n} value={n}>{n}</option>)}
                        </select>
                        {formik.touched.companionsCount && formik.errors.companionsCount && (
                            <p className="text-red-500 text-sm">{String(formik.errors.companionsCount)}</p>
                        )}
                    </div>
                )}

                {/* Render companion fields */}
                {formik.values.isAnyone === "yes" && Number(formik.values.companionsCount) > 0 && (
                    <div className="grid gap-4">
                        {Array.from({ length: Number(formik.values.companionsCount) }).map((_, idx) => (
                            <div key={idx} className="grid sm:grid-cols-2 gap-4">
                                <div>
                                    <label className={`text-sm ${color} mb-1`}>Full Name</label>
                                    <input
                                        type="text"
                                        value={formik.values.companions?.[idx]?.first || ""}
                                        onChange={(e) => {
                                            const copy = [...(formik.values.companions || [])];
                                            copy[idx] = { ...(copy[idx] || {}), first: e.target.value };
                                            formik.setFieldValue("companions", copy);
                                        }}
                                        className={`w-full border px-3 py-2 rounded-md ${isMobile ? "bg-[#33335b]" : ""} ${(formik.touched.companions && (formik.errors.companions)?.[idx]?.first) ? "border-red-500" : "border-gray-300"
                                            }`}
                                    />
                                    {(formik.touched.companions && (formik.errors.companions)?.[idx]?.first) && (
                                        <p className="text-xs text-red-500">{(formik.errors.companions)[idx].first}</p>
                                    )}
                                </div>

                                <div>
                                    <label className={`text-sm ${color} mb-1`}>MT Account No</label>
                                    <input
                                        type="text"
                                        value={formik.values.companions?.[idx]?.last || ""}
                                        onChange={(e) => {
                                            const copy = [...(formik.values.companions || [])];
                                            copy[idx] = { ...(copy[idx] || {}), last: e.target.value };
                                            formik.setFieldValue("companions", copy);
                                        }}
                                        className={`w-full border px-3 py-2 rounded-md ${isMobile ? "bg-[#33335b]" : ""} ${(formik.touched.companions && (formik.errors.companions)?.[idx]?.last) ? "border-red-500" : "border-gray-300"
                                            }`}
                                    />
                                    {(formik.touched.companions && (formik.errors.companions)?.[idx]?.last) && (
                                        <p className="text-xs text-red-500">{(formik.errors.companions)[idx].last}</p>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                )}


                {/* <div className="relative">
                    <label className={`text-sm ${color} mb-1`}>Preferred Method</label>

                    <select
                        className={`w-full bg-white px-4 py-2  border ${formik.touched.platform && formik.errors.platform ? "border-red-500" : "border-gray-300"} rounded-lg text-gray-700`}
                        {...formik.getFieldProps("preferredMethod")}
                    >
                        <option value="">Select Method</option>
                        {[
                            { id: 1, name: "Whatsapp", value: "whatsapp" },
                            { id: 2, name: "Phone", value: "phone" },
                            { id: 3, name: "Email", value: "email" },

                        ].map((item) => (
                            <option key={item.id} value={item.value}>
                                {item.name}
                            </option>
                        ))}
                    </select>
                    {formik.touched.preferredMethod && formik.errors.preferredMethod && (
                        <p className="text-red-500 text-sm">{formik.errors.preferredMethod}</p>
                    )}
                </div> */}

                {/* Terms */}
                <div className="flex items gap-2">
                    <input
                        type="checkbox"
                        id="terms"
                        {...formik.getFieldProps("terms")}
                        className="h-5 w-5"
                    />
                    <label htmlFor="terms" className="text-xs">
                        By submitting your application you confirm that you have read, understood and agreed to all the <a className="text-secondary" data-v-30779926="" href="https://www.gtcfx.com/terms-and-conditions" target="_blank" >Terms And Conditions</a>, <a className="text-secondary" data-v-30779926="" href="https://gtcfx-bucket.s3.ap-southeast-1.amazonaws.com/pdf-files/5000USC-T%26C.pdf" target="_blank">Bonus Terms and Conditions</a> and <a className="text-secondary" data-v-30779926="" href="https://www.gtcfx.com/legal-policies-client-agreements" target="_blank">Client Agreement .</a>
                    </label>
                </div>
                {formik.touched.terms && formik.errors.terms && (
                    <p className="text-xs text-red-500">{formik.errors.terms}</p>
                )}

                {/* Submit */}
                <button
                    type="submit"
                    disabled={loading}
                    className={`w-full  ${isMobile ? "text-[#000032]" : "text-white"} py-3 rounded-xl font-medium cursor-pointer text-sm disabled:opacity-50`}
                    style={{ background: isMobile ? "#fff" : "linear-gradient(135deg, #293794 0%, #000021 100%)" }}
                >
                    {loading ? "Submitting.." : "Submit"}
                </button>
            </form>
        </>
    );
};

export default CommonMainForm;


