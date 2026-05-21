/** @type {import('next').NextConfig} */
const isProd = process.env.NODE_ENV === 'production';

const nextConfig = {
  output: 'export',
  basePath: isProd ? '/tailor_site' : undefined,
  images: {
    unoptimized: true,
    domains: [],
  },
  allowedDevOrigins: ['*.ngrok-free.app', '*.ngrok-free.dev'],
  poweredByHeader: false,
  reactStrictMode: true,
}

module.exports = nextConfig
