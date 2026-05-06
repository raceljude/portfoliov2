import { NextRequest, NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase";
import { getAdminSession } from "@/lib/auth";
import { revalidatePortfolio } from "@/lib/revalidate";

export async function GET() {
  const db = supabaseAdmin();
  const { data, error } = await db
    .from("skill_groups")
    .select("*, skills(*)")
    .order("sort_order", { ascending: true });
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json(data);
}

export async function POST(req: NextRequest) {
  if (!(await getAdminSession()))
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const body = await req.json();
  const db = supabaseAdmin();

  if (body.type === "group") {
    const { data, error } = await db.from("skill_groups").insert(body.data).select().single();
    if (error) return NextResponse.json({ error: error.message }, { status: 500 });
    revalidatePortfolio();
    return NextResponse.json(data, { status: 201 });
  }

  if (body.type === "skill") {
    const { data, error } = await db.from("skills").insert(body.data).select().single();
    if (error) return NextResponse.json({ error: error.message }, { status: 500 });
    revalidatePortfolio();
    return NextResponse.json(data, { status: 201 });
  }

  return NextResponse.json({ error: "type must be 'group' or 'skill'" }, { status: 400 });
}
