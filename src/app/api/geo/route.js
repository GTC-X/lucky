// app/api/geo/route.js
import { NextResponse } from "next/server";

function pick(data) {
  // Normalize to a consistent shape
  return {
    ok: true,
    raw: data,
    country: data?.country || data?.country_code || "",
    region: data?.region || data?.region_name || "",
    city: data?.city || "",
    org: data?.org || data?.connection?.org || "",
  };
}

export async function GET() {
  const token = process.env.IPINFO_TOKEN; // optional
  const ipinfoUrl = `https://ipinfo.io/json${token ? `?token=${token}` : ""}`;

  // Try ipinfo
  try {
    const r1 = await fetch(ipinfoUrl, {
      cache: "no-store",
      next: { revalidate: 0 },
    });
    if (r1.ok) {
      const j = await r1.json();
      return NextResponse.json(pick(j));
    }
  } catch {}

  // Fallback 1: ipwho.is
  try {
    const r2 = await fetch("https://ipwho.is/", {
      cache: "no-store",
      next: { revalidate: 0 },
    });
    if (r2.ok) {
      const j = await r2.json();
      return NextResponse.json(pick(j));
    }
  } catch {}

  // Fallback 2: ipapi.co
  try {
    const r3 = await fetch("https://ipapi.co/json/", {
      cache: "no-store",
      next: { revalidate: 0 },
    });
    if (r3.ok) {
      const j = await r3.json();
      return NextResponse.json(pick(j));
    }
  } catch {}

  return NextResponse.json({ ok: false }, { status: 502 });
}
