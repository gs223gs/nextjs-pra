import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'media.scout.lapras.com',
        pathname: '/**',
      },
    ],
  },
};

export default nextConfig;
