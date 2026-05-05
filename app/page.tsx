import { getPortfolioData } from "@/lib/data";
import PortfolioClient from "@/components/PortfolioClient";

// Server Component — fetches data once per request, passes to client
export default async function Home() {
  const data = await getPortfolioData();
  return <PortfolioClient data={data} />;
}
