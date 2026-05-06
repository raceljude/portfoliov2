import { createClient } from "@supabase/supabase-js";

// Strip trailing slashes — PGRST125 is caused by URLs like "https://xyz.supabase.co/"
const rawUrl = process.env.NEXT_PUBLIC_SUPABASE_URL ?? "";
const url    = rawUrl.replace(/\/+$/, "");
const anon   = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? "";

if (!url)  console.error("[supabase] NEXT_PUBLIC_SUPABASE_URL is not set");
if (!anon) console.error("[supabase] NEXT_PUBLIC_SUPABASE_ANON_KEY is not set");

// Public read-only client (anon key)
export const supabase = createClient(url, anon);

// Server-side admin client (service role key — bypasses RLS)
export function supabaseAdmin() {
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY ?? "";
  if (!serviceKey) console.error("[supabase] SUPABASE_SERVICE_ROLE_KEY is not set");
  return createClient(url, serviceKey, {
    auth: { persistSession: false },
  });
}
