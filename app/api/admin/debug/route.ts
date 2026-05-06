import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase";

/**
 * GET /api/admin/debug
 * Call this to diagnose connection issues.
 * Shows which env vars are set and whether Supabase responds.
 */
export async function GET() {
  const url     = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const anon    = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  const service = process.env.SUPABASE_SERVICE_ROLE_KEY;
  const adminPw = process.env.ADMIN_PASSWORD;
  const jwtSec  = process.env.ADMIN_JWT_SECRET;

  const envStatus = {
    NEXT_PUBLIC_SUPABASE_URL:      url      ? "✓ set (" + url.slice(0, 30) + "...)" : "✗ MISSING",
    NEXT_PUBLIC_SUPABASE_ANON_KEY: anon     ? "✓ set"  : "✗ MISSING",
    SUPABASE_SERVICE_ROLE_KEY:     service  ? "✓ set"  : "✗ MISSING",
    ADMIN_PASSWORD:                adminPw  ? "✓ set"  : "✗ MISSING",
    ADMIN_JWT_SECRET:              jwtSec   ? "✓ set"  : "✗ MISSING",
  };

  if (!url || !service) {
    return NextResponse.json({ envStatus, error: "Missing env vars — cannot connect" }, { status: 500 });
  }

  // Try fetching each table
  const db = supabaseAdmin();
  const results: Record<string, unknown> = {};

  const tables = ["profile", "experiences", "projects", "skill_groups", "skills", "sidebar_skills"];
  for (const table of tables) {
    const { data, error, count } = await db
      .from(table)
      .select("*", { count: "exact", head: false })
      .limit(1);
    results[table] = error
      ? { error: error.message, code: error.code }
      : { rowCount: count ?? (Array.isArray(data) ? data.length : 0), ok: true };
  }

  return NextResponse.json({ envStatus, tables: results });
}
