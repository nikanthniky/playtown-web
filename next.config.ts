import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: true,
  // Pages serves the original local assets; there is no Next image server.
  images: { unoptimized: true },
  // Cache Components and partial prefetching require a Next server.
  cacheComponents: false,
};

export default nextConfig;
