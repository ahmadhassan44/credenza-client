/** @type {import('next').NextConfig} */
const nextConfig = {
  // Ensure env variables are accessible
  env: {
    NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000',
    NEXT_PUBLIC_TOKEN_EXPIRY: process.env.NEXT_PUBLIC_TOKEN_EXPIRY || '3600'
  }
};

module.exports = nextConfig;
