import { NextRequest, NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase";
import { getAdminSession } from "@/lib/auth";
import { revalidatePortfolio } from "@/lib/revalidate";

export async function GET() {
  const db = supabaseAdmin();
  const { data, error } = await db
    .from("experiences")
    .select("*")
    .order("sort_order", { ascending: true });
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json(data);
}

export async function POST(req: NextRequest) {
  if (!(await getAdminSession()))
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const body = await req.json();
  const db = supabaseAdmin();
  const { data, error } = await db.from("experiences").insert(body).select().single();
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  revalidatePortfolio();
  return NextResponse.json(data, { status: 201 });
}
