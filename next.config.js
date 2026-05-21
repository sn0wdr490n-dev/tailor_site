/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  basePath: process.env.NEXT_PUBLIC_BASE_PATH || undefined,
  images: {
    unoptimized: true,
    domains: [],
  },
  allowedDevOrigins: ['*.ngrok-free.app', '*.ngrok-free.dev'],
  poweredByHeader: false,
  reactStrictMode: true,
}

module.exports = nextConfig
