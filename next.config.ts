import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // No dependency on Vercel's paid image optimizer (it returned 402 on this project).
  images: { unoptimized: true },
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
