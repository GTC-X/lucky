// pages/api/geo.js
export default async function handler(req, res) {
  const pick = (data) => ({
    ok: true,
    raw: data,
    country: data?.country || data?.country_code || "",
    region: data?.region || data?.region_name || "",
    city: data?.city || "",
    org: data?.org || data?.connection?.org || "",
  });

  const token = process.env.IPINFO_TOKEN; // optional
  const ipinfoUrl = `https://ipinfo.io/json${token ? `?token=${token}` : ""}`;

  try {
    const r1 = await fetch(ipinfoUrl);
    if (r1.ok) {
      const j = await r1.json();
      return res.json(pick(j));
    }
  } catch {}

  try {
    const r2 = await fetch("https://ipwho.is/");
    if (r2.ok) {
      const j = await r2.json();
      return res.json(pick(j));
    }
  } catch {}

  try {
    const r3 = await fetch("https://ipapi.co/json/");
    if (r3.ok) {
      const j = await r3.json();
      return res.json(pick(j));
    }
  } catch {}

  res.status(502).json({ ok: false });
}
