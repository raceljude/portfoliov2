import { NextRequest, NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase";
import { getAdminSession } from "@/lib/auth";
import { revalidatePortfolio } from "@/lib/revalidate";

type UpdateBody = Record<string, unknown>;

// Next.js 15: params is now a Promise — must be awaited
export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  if (!(await getAdminSession()))
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { id } = await params;

  const raw: UpdateBody = await req.json();
  const updateData: UpdateBody = {};
  const skip = new Set(["id", "created_at", "updated_at"]);
  for (const key of Object.keys(raw)) {
    if (!skip.has(key)) updateData[key] = raw[key];
  }
  updateData.updated_at = new Date().toISOString();

  const db = supabaseAdmin();
  const { data, error } = await db
    .from("projects")
    .update(updateData)
    .eq("id", id)
    .select()
    .single();

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  revalidatePortfolio();
  return NextResponse.json(data);
}

export async function DELETE(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  if (!(await getAdminSession()))
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { id } = await params;

  const db = supabaseAdmin();
  const { error } = await db.from("projects").delete().eq("id", id);
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  revalidatePortfolio();
  return NextResponse.json({ ok: true });
}