import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Transpile Dynamic.xyz packages so they work in Next.js App Router
  transpilePackages: ["@dynamic-labs/sdk-react-core", "@dynamic-labs/ethereum"],

  // Use Turbopack (default in Next.js 16) with empty config to acknowledge
  turbopack: {},
};

export default nextConfig;
