import { getPortfolioData } from "@/lib/data";
import PortfolioClient from "@/components/PortfolioClient";

// Never cache this page — always fetch fresh data from Supabase
export const revalidate = 0;
export const dynamic = "force-dynamic";

export default async function Home() {
  const data = await getPortfolioData();
  return <PortfolioClient data={data} />;
}
