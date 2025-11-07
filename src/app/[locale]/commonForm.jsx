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
        formik.setFieldValue(
            "invitation",
            token || "8owwwwwwzcowwwww"
        );
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
        "webword" + String(Math.floor(Math.random() * 100000)).padStart(5, "0");

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


    // formik setup
    const formik = useFormik({
        initialValues: {
            nickname: "",
            last_name: "",
            email: "",
            phone: "",
            country: "",
            otp: "",
            preferredMethod: "",
            terms: false,
        },
        validationSchema: Yup.object({
            nickname: Yup.string().required(t("errors.firstNameRequired")),
            last_name: Yup.string().required(t("errors.lastNameRequired")),
            preferredMethod: Yup.string().required("Preferred method required"),
            email: Yup.string()
                .email(t("errors.emailInvalid"))
                .required(t("errors.emailRequired"))
                .test(
                    "no-plus-sign",
                    "Email address cannot contain '+'",
                    (value) => !value || !value.includes("+")
                ),
            phone: Yup.string()
                .required(t("errors.phoneRequired"))
                .test("is-valid-e164", t("errors.phoneInvalid"), (value) => {
                    if (!value) return false;
                    return isValidPhoneNumber(value);
                })
                .test(
                    "matches-selected-country",
                    "Number doesn’t match selected country",
                    function (value) {
                        const selectedCountryName = this.parent.country;
                        if (!value || !selectedCountryName) return true;
                        const selectedIso2 = getIso2ByCountryName(selectedCountryName);
                        if (!selectedIso2) return true;
                        const pn = parsePhoneNumberFromString(value);
                        if (!pn) return false;
                        return pn.country === selectedIso2;
                    }
                ),
            country: Yup.string().required(t("errors.countryRequired")),
            otp: Yup.string()
                .length(6, t("errors.otpLength"))
                .required(t("errors.otpRequired")),
            terms: Yup.bool().oneOf([true], t("errors.termsRequired")),
        }),
        onSubmit: async (values) => {
            setLoading(true)
            const token = await getUniqueToken();

            try {

                const row = [
                    values?.nickname,                      // firstName
                    values?.last_name,                     // lastName
                    values?.email, // email
                    values?.phone,              // phone
                    values?.country,                   // country
                    values?.preferredMethod,                   // source
                    token                         // token (last column named 'token')
                ];

                // 4) save to sheet (POST just appends; no server validation)
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
                await axios.post("https://hooks.zapier.com/hooks/catch/16420445/uskukap/", JSON.stringify({ ...values, token: token }));
                await axios.post("/api/email", JSON.stringify({
                    ...values,
                    locale,
                    token: token
                }));

                toast.success(`Saved! Your token: ${token}`);
                // inside onSubmit success block (after both requests resolve)
                toast.success(t("thankYou1"));
                setSubmittedName(st => ({
                    ...st,
                    ...values,
                    token: token
                }));
                setIsSubmitted(true);             // ← show right-side thank-you
                formik.resetForm();
                setShowOtp(false);
                setIsDisable(true);

            } catch (err) {
                console.error(err);
                toast.error(err || "Something went wrong");
            } finally {
                setLoading(false);
            }

        },
    });

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
                <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                        <label className={`text-sm ${color} mb-1`}>{t("firstName")}</label>
                        <input
                            type="text"
                            placeholder={t("firstName")}
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
                    <div>
                        <label className={`text-sm ${color} mb-1`}>{t("lastName")}</label>
                        <input
                            type="text"
                            placeholder={t("lastName")}
                            {...formik.getFieldProps("last_name")}
                            className={`w-full border px-3 py-2 rounded-md ${isMobile ? "bg-[#33335b]" : ""} ${formik.touched.last_name && formik.errors.last_name
                                ? "border-red-500"
                                : "border-gray-300"
                                }`}
                        />
                        {formik.touched.last_name && formik.errors.last_name && (
                            <p className="text-xs text-red-500">{formik.errors.last_name}</p>
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

                <div className="relative">
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
                </div>

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


