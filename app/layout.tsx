import type { Metadata } from "next";
import "./globals.css";
import { profile } from "@/config/personal";

export const metadata: Metadata = {
  title:       profile.siteTitle,
  description: profile.siteDescription,
  openGraph: {
    title:       profile.siteTitle,
    description: profile.siteDescription,
    type:        "website",
  },
  icons: {
    icon: "/favicon.svg",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <div className="grain" aria-hidden="true" />
        {children}
      </body>
    </html>
  );
}
