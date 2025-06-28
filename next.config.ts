import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  env: {
    // Make these variables available to the application
    MAX_RECOMMENDATIONS: process.env.MAX_RECOMMENDATIONS || '10',
    API_BASE_URL: process.env.API_BASE_URL || 'http://localhost:3000',
    ENABLE_VALIDATION_LOGS: process.env.ENABLE_VALIDATION_LOGS || 'false',
  },
  
  // Configuration for external images
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'via.placeholder.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'picsum.photos',
        port: '',
        pathname: '/**',
      }
    ],
  },
  
  // Updated configuration for Next.js 15
  serverExternalPackages: [],
};

export default nextConfig;
