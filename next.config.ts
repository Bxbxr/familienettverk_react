// next.config.ts
import { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Your existing ESLint configuration
  eslint: {
    ignoreDuringBuilds: true,
  },

  // ✅ NEW: Add the images configuration block here
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "lctienjvuhwcjxqvwciv.supabase.co", // Your Supabase hostname
        port: "",
        pathname: "/storage/v1/object/public/**",
      },
    ],
  },
};

export default nextConfig;
