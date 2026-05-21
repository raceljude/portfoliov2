import type { Metadata } from "next";
import "./globals.css";
import { profile } from "@/config/personal";

// ─── Site URL (set NEXT_PUBLIC_SITE_URL in Vercel env vars) ──────────────────
const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://raceljudemarahay.vercel.app";

// ─── Metadata ─────────────────────────────────────────────────────────────────
export const metadata: Metadata = {
  // ── Core ──────────────────────────────────────────────────────────────────
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Racel Jude Marahay — Software Developer | Full-Stack & Google Workspace",
    template: "%s | Racel Jude Marahay",
  },
  description:
    "Racel Jude Marahay is a Junior Software Developer in Metro Manila, Philippines, specializing in MERN/PERN stack, React, Node.js, Google Workspace automation, and full-stack web applications.",
  keywords: [
    "Racel Jude Marahay",
    "Racel Marahay",
    "Racel Jude",
    "Software Developer Philippines",
    "Junior Software Developer Manila",
    "Full-Stack Developer Philippines",
    "React Developer Philippines",
    "MERN Stack Developer",
    "PERN Stack Developer",
    "Google Workspace Developer",
    "Node.js Developer",
    "TypeScript Developer",
    "Next.js Developer",
    "Makati Software Developer",
    "Metro Manila Developer",
  ],
  authors: [{ name: "Racel Jude Marahay", url: SITE_URL }],
  creator: "Racel Jude Marahay",
  publisher: "Racel Jude Marahay",
  category: "Technology",

  // ── Canonical URL ──────────────────────────────────────────────────────────
  alternates: {
    canonical: SITE_URL,
  },

  // ── Robots ────────────────────────────────────────────────────────────────
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },

  // ── Open Graph (Facebook, LinkedIn, WhatsApp previews) ────────────────────
  openGraph: {
    type: "profile",
    url: SITE_URL,
    siteName: "Racel Jude Marahay — Portfolio",
    title: "Racel Jude Marahay — Software Developer",
    description:
      "Junior Software Developer from Metro Manila, Philippines. Specializing in MERN/PERN stack, React, Google Workspace automation, and scalable full-stack web applications.",
    locale: "en_PH",
    firstName: "Racel Jude",
    lastName: "Marahay",
    username: "raceljude",
    images: [
      {
        url: `${SITE_URL}/og-image.png`,
        width: 1200,
        height: 630,
        alt: "Racel Jude Marahay — Software Developer Portfolio",
        type: "image/png",
      },
    ],
  },

  // ── Twitter / X Card ──────────────────────────────────────────────────────
  twitter: {
    card: "summary_large_image",
    title: "Racel Jude Marahay — Software Developer",
    description:
      "Junior Software Developer from Metro Manila, PH. MERN/PERN stack, React, Node.js, Google Workspace automation.",
    images: [`${SITE_URL}/og-image.png`],
    creator: "@raceljude",
  },

  // ── Icons & Manifest ──────────────────────────────────────────────────────
  icons: {
    icon: [
      { url: "/favicon.svg", type: "image/svg+xml" },
      { url: "/favicon-32x32.png", type: "image/png", sizes: "32x32" },
      { url: "/favicon-16x16.png", type: "image/png", sizes: "16x16" },
    ],
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180" }],
    shortcut: "/favicon.svg",
  },
  manifest: "/site.webmanifest",

  // ── Verification (add your actual codes in Vercel env vars) ───────────────
  verification: {
    google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION ?? "",
  },
};

// ─── JSON-LD Structured Data ──────────────────────────────────────────────────
// This is the most important piece for name-based search ranking.
// Google uses Person schema to understand who you are and surface your site
// when someone searches "Racel Jude Marahay".
const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Racel Jude Marahay",
  alternateName: ["Racel Marahay", "Racel Jude", "RJ Marahay"],
  url: SITE_URL,
  image: `${SITE_URL}/og-image.png`,
  jobTitle: "Junior Software Developer",
  description:
    "Junior Software Developer specializing in MERN/PERN stack, React, Node.js, Google Workspace automation, and full-stack web applications.",
  email: "mailto:raceljude@gmail.com",
  telephone: "+639683971574",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Makati City",
    addressRegion: "Metro Manila",
    addressCountry: "PH",
  },
  sameAs: [
    "https://github.com/raceljude",
    "https://www.linkedin.com/in/racel-jude-marahay-76b15a29b",
  ],
  alumniOf: {
    "@type": "CollegeOrUniversity",
    name: "National University — Manila",
    sameAs: "https://www.nu.edu.ph",
  },
  knowsAbout: [
    "React",
    "TypeScript",
    "JavaScript",
    "Node.js",
    "Express.js",
    "PostgreSQL",
    "MongoDB",
    "Google Workspace",
    "Google Apps Script",
    "BigQuery",
    "Google AppSheet",
    "Tailwind CSS",
    "Next.js",
    "Git",
    "Full-Stack Web Development",
    "REST API Design",
    "CI/CD Pipelines",
  ],
  hasOccupation: {
    "@type": "Occupation",
    name: "Software Developer",
    occupationLocation: {
      "@type": "City",
      name: "Manila",
    },
    skills:
      "React, Node.js, TypeScript, Google Workspace, PostgreSQL, MongoDB, Tailwind CSS",
  },
  worksFor: {
    "@type": "Organization",
    name: "Top Asia Management Solutions Incorporated",
  },
};

// ─── Website Schema (helps Google understand the site) ────────────────────────
const websiteJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "Racel Jude Marahay — Portfolio",
  url: SITE_URL,
  description:
    "Portfolio website of Racel Jude Marahay, a Junior Software Developer from Metro Manila, Philippines.",
  author: {
    "@type": "Person",
    name: "Racel Jude Marahay",
  },
  potentialAction: {
    "@type": "SearchAction",
    target: {
      "@type": "EntryPoint",
      urlTemplate: `${SITE_URL}/?q={search_term_string}`,
    },
    "query-input": "required name=search_term_string",
  },
};

// ─── Root Layout ──────────────────────────────────────────────────────────────
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" dir="ltr">
      <head>
        {/* ── Preconnect to Google Fonts for faster loading ── */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />

        {/* ── JSON-LD Structured Data ── */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }}
        />

        {/* ── Theme color for mobile browsers ── */}
        <meta name="theme-color" content="#0c1018" />
        <meta name="color-scheme" content="dark light" />
      </head>
      <body>
        <div className="grain" aria-hidden="true" />
        {children}
      </body>
    </html>
  );
}