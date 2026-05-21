/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Next.js 15: explicitly set dynamic rendering for pages that use
  // dynamic APIs (cookies, headers, searchParams)
  experimental: {
    // React 19 is now stable with Next.js 15
    reactCompiler: false,
  },
};

module.exports = nextConfig;