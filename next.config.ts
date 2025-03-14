import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  experimental: {
    serverActions: {
        allowedOrigins: ['localhost:3000', '*.github.dev', 'localhost:3001'],
    }
  }
};

export default nextConfig;
