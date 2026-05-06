import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

export async function GET() {
  const rawUrl  = process.env.NEXT_PUBLIC_SUPABASE_URL ?? "";
  const service = process.env.SUPABASE_SERVICE_ROLE_KEY ?? "";
  const anon    = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? "";
  const adminPw = process.env.ADMIN_PASSWORD;
  const jwtSec  = process.env.ADMIN_JWT_SECRET;

  // Sanitize: remove trailing slashes
  const url = rawUrl.replace(/\/+$/, "");

  const envStatus = {
    NEXT_PUBLIC_SUPABASE_URL:      url     ? "✓ set → " + url : "✗ MISSING",
    NEXT_PUBLIC_SUPABASE_ANON_KEY: anon    ? "✓ set (length " + anon.length + ")" : "✗ MISSING",
    SUPABASE_SERVICE_ROLE_KEY:     service ? "✓ set (length " + service.length + ")" : "✗ MISSING",
    ADMIN_PASSWORD:                adminPw ? "✓ set" : "✗ MISSING",
    ADMIN_JWT_SECRET:              jwtSec  ? "✓ set" : "✗ MISSING",
    sanitizedUrl: url,
    urlHadTrailingSlash: rawUrl !== url,
  };

  if (!url || !service) {
    return NextResponse.json({ envStatus, error: "Missing env vars" }, { status: 500 });
  }

  const db = createClient(url, service, { auth: { persistSession: false } });
  const results: Record<string, unknown> = {};

  const tables = ["profile", "experiences", "projects", "skill_groups", "skills", "sidebar_skills"];
  for (const table of tables) {
    const { data, error } = await db.from(table).select("*").limit(3);
    results[table] = error
      ? { error: error.message, code: error.code, hint: error.hint }
      : { rowCount: Array.isArray(data) ? data.length : 0, sample: data };
  }

  return NextResponse.json({ envStatus, tables: results }, { status: 200 });
}
