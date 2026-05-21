import { getPortfolioData } from "@/lib/data";
import PortfolioClient from "@/components/PortfolioClient";

// Next.js 15: dynamic = "force-dynamic" still works the same way.
// fetch() no longer caches by default (cache: 'no-store' is now default),
// so we keep force-dynamic to ensure fresh Supabase data on every request.
export const dynamic = "force-dynamic";

export default async function Home() {
  const data = await getPortfolioData();
  return <PortfolioClient data={data} />;
}