// import { NextResponse } from "next/server";
// import { getSheets } from "../../[locale]/lib/googleSheet";

// const SPREADSHEET_ID = process.env.GOOGLE_SHEETS_SPREADSHEET_ID;
// const DEFAULT_RANGE = process.env.GOOGLE_SHEETS_DEFAULT_RANGE || "Sheet1!A1:Z";

// export async function GET(req) {
//   try {
//     const { searchParams } = new URL(req.url);
//     const range = searchParams.get("range") || DEFAULT_RANGE;

//     const sheets = getSheets();
//     const { data } = await sheets.spreadsheets.values.get({
//       spreadsheetId: SPREADSHEET_ID,
//       range,
//     });

//     // data.values is string[][]
//     return NextResponse.json({ values: data.values ?? [] });
//   } catch (err) {
//     return NextResponse.json(
//       { error: err.message || "Read failed" },
//       { status: 500 }
//     );
//   }
// }

// export async function POST(req) {
//   try {
//     const body = await req.json();
//     /**
//      * Expect:
//      * {
//      *   range?: "Sheet1!A:D",      // optional, defaults below
//      *   values: [ ["A","B","C"], ... ] // array of rows
//      * }
//      */
//     const range = body.range || "Sheet1"; // append can just use sheet name
//     const values = body.values;

//     if (!Array.isArray(values) || values.length === 0) {
//       return NextResponse.json(
//         { error: "Body must include non-empty 'values' (string[][])" },
//         { status: 400 }
//       );
//     }

//     const sheets = getSheets();

//     const { data } = await sheets.spreadsheets.values.append({
//       spreadsheetId: SPREADSHEET_ID,
//       range, // e.g. "Sheet1"
//       valueInputOption: "USER_ENTERED", // respects formats & formulas
//       insertDataOption: "INSERT_ROWS",
//       requestBody: { values },
//     });

//     return NextResponse.json({ result: data.updates });
//   } catch (err) {
//     return NextResponse.json(
//       { error: err.message || "Write failed" },
//       { status: 500 }
//     );
//   }
// }

export const runtime = "nodejs";
import { NextResponse } from "next/server";

const GAS_URL = process.env.GAS_SHEETS_URL;     // https://script.google.com/macros/s/XXX/exec
const GAS_SECRET = "gtcfx_9f3c9dce7";

async function safeJson(res) {
  const ct = res.headers.get("content-type") || "";
  if (!ct.includes("application/json")) {
    const text = await res.text(); // helpful for debugging
    throw new Error(`Expected JSON, got: ${ct}. Body: ${text.slice(0, 300)}...`);
  }
  return res.json();
}

export async function GET(req) {
  const url = new URL(req.url);
  const range = url.searchParams.get("range") || "A1:Z";
  // token must be in query for doGet
  const target = `${GAS_URL}?range=${encodeURIComponent(range)}&token=${encodeURIComponent(GAS_SECRET)}`;
  const res = await fetch(target, { cache: "no-store" });
  const data = await safeJson(res);
  return NextResponse.json(data, { status: data?.ok ? 200 : 500 });
}

export async function POST(req) {
  const body = await req.json(); // { action, range?, values }
  const res = await fetch(GAS_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    // token must be in body for doPost
    body: JSON.stringify({ ...body, token: GAS_SECRET }),
  });
  const data = await safeJson(res);
  return NextResponse.json(data, { status: data?.ok ? 200 : 500 });
}
