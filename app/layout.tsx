import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Racel Jude Marahay — Software Developer",
  description:
    "Junior Software Developer specializing in MERN/PERN stack, Google Workspace automation, and full-stack web applications.",
  openGraph: {
    title: "Racel Jude Marahay — Software Developer",
    description:
      "Junior Software Developer specializing in MERN/PERN stack, Google Workspace automation, and full-stack web applications.",
    type: "website",
  },
  icons: {
    icon: "/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <div className="grain" aria-hidden="true" />
        {children}
      </body>
    </html>
  );
}
