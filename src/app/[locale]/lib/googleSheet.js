import { google } from "googleapis";

export function getSheets() {
  const auth = new google.auth.JWT(
    process.env.GOOGLE_SHEETS_CLIENT_EMAIL,
    undefined,
    // Next puts envs as single line; convert \n to real newlines if needed:
    (process.env.GOOGLE_SHEETS_PRIVATE_KEY || "").replace(/\\n/g, "\n"),
    ["https://www.googleapis.com/auth/spreadsheets"] // read+write scope
  );
  return google.sheets({ version: "v4", auth });
}
