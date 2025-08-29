import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: ["images.pexels.com"],
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    // ❌ Skip ESLint checks during build
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;
