/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    // Make these variables available to the application
    MAX_RECOMMENDATIONS: process.env.MAX_RECOMMENDATIONS || '10',
    API_BASE_URL: process.env.API_BASE_URL || 'http://localhost:3000',
    ENABLE_VALIDATION_LOGS: process.env.ENABLE_VALIDATION_LOGS || 'false',
  },
  // Updated configuration for Next.js 15
  serverExternalPackages: [],
}

module.exports = nextConfig 