import type { NextConfig } from "next";

// Tailwind runs through PostCSS (postcss.config.mjs).
const nextConfig: NextConfig = {
  images: {
    // App captures are flat UI with small text: AVIF first keeps them small,
    // and 90 keeps the text crisp. Next.js 16 only serves qualities listed here.
    formats: ["image/avif", "image/webp"],
    qualities: [75, 90],
  },
};

export default nextConfig;
