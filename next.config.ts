import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  experimental: {
    serverActions: {
      allowedOrigins: ["localhost:3000", "*.github.dev"],
    },
    optimizePackageImports: ['drizzle-orm','drizzle-orm/node-postgres'], 
  },
};

export default nextConfig;
