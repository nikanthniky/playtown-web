import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  trailingSlash: true,
  async redirects() {
    return [
      { source: "/products", destination: "/platform/", permanent: true },
      { source: "/products/playtown", destination: "/", permanent: true },
      { source: "/playtown", destination: "/", permanent: true },
      { source: "/privacy-policy", destination: "/privacy/", permanent: true },
      {
        source: "/terms-and-conditions",
        destination: "/terms/",
        permanent: true,
      },
    ];
  },
  experimental: {
    agentFeedback: true,
  },
  cacheComponents: true,
  partialPrefetching: true,
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
