/**
 * lib/revalidate.ts
 * Call this after any admin write (POST/PATCH/DELETE) to immediately
 * purge Next.js's cached version of the public portfolio page.
 */
import { revalidatePath } from "next/cache";

export function revalidatePortfolio() {
  revalidatePath("/");           // bust the homepage cache
  revalidatePath("/", "layout"); // also bust layout-level cache
}
