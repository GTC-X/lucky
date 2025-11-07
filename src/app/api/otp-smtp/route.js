import nodemailer from "nodemailer";
import { NextResponse } from "next/server";
import otpGenerator from "otp-generator";
import {
  MAILGUN_DOMAIN,
  MAILGUN_FROM,
  mailgunClient,
  transporter,
} from "../../config/nodemailer";
import { generateArabicTemplate, generateEnglishTemplate } from "./template";

export async function POST(req) {
  const { email, first_name, locale } = await req.json();
  const otp = otpGenerator.generate(6, {
    upperCaseAlphabets: false,
    specialChars: false,
    digits: true,
    lowerCaseAlphabets: false,
  });
  const mailData = {
    from: MAILGUN_FROM,
    to: email,
    subject:
      locale == "ar"
        ? "رمز التحقق (OTP) للحصول على 5,000 USC للتداول"
        : "GTC Lucky Draw OTP",
    text:
      locale == "ar" ? `رمز التحقق الخاص بك هو ${otp}` : `Your OTP is ${otp}`,
    html:
      locale == "ar"
        ? generateArabicTemplate(otp, first_name)
        : generateEnglishTemplate(otp, first_name),
  };
  try {
    const res = await mailgunClient.messages.create(MAILGUN_DOMAIN, mailData);
    return NextResponse.json({ message: `5649${otp}632` }, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ message: "Error Sending OTP" }, { status: 500 });
  }
}
