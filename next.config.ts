import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    formats: ["image/avif", "image/webp"],
    remotePatterns: [{ protocol: "https", hostname: "images.unsplash.com" }],
  },
  experimental: {
    // Allows larger template image/video uploads through server actions.
    serverActions: { bodySizeLimit: "60mb" },
  },
};

export default nextConfig;
