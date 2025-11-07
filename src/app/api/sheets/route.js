import { NextResponse } from "next/server";
import { getSheets } from "../../[locale]/lib/googleSheet";

const SPREADSHEET_ID = process.env.GOOGLE_SHEETS_SPREADSHEET_ID;
const DEFAULT_RANGE = process.env.GOOGLE_SHEETS_DEFAULT_RANGE || "Sheet1!A1:Z";

export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const range = searchParams.get("range") || DEFAULT_RANGE;

    const sheets = getSheets();
    const { data } = await sheets.spreadsheets.values.get({
      spreadsheetId: SPREADSHEET_ID,
      range,
    });

    // data.values is string[][]
    return NextResponse.json({ values: data.values ?? [] });
  } catch (err) {
    return NextResponse.json(
      { error: err.message || "Read failed" },
      { status: 500 }
    );
  }
}

export async function POST(req) {
  try {
    const body = await req.json();
    /**
     * Expect:
     * {
     *   range?: "Sheet1!A:D",      // optional, defaults below
     *   values: [ ["A","B","C"], ... ] // array of rows
     * }
     */
    const range = body.range || "Sheet1"; // append can just use sheet name
    const values = body.values;

    if (!Array.isArray(values) || values.length === 0) {
      return NextResponse.json(
        { error: "Body must include non-empty 'values' (string[][])" },
        { status: 400 }
      );
    }

    const sheets = getSheets();

    const { data } = await sheets.spreadsheets.values.append({
      spreadsheetId: SPREADSHEET_ID,
      range, // e.g. "Sheet1"
      valueInputOption: "USER_ENTERED", // respects formats & formulas
      insertDataOption: "INSERT_ROWS",
      requestBody: { values },
    });

    return NextResponse.json({ result: data.updates });
  } catch (err) {
    return NextResponse.json(
      { error: err.message || "Write failed" },
      { status: 500 }
    );
  }
}
