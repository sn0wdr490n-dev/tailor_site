/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  basePath: '/tailor_site',
  images: {
    unoptimized: true,
    domains: [],
  },
  allowedDevOrigins: ['*.ngrok-free.app', '*.ngrok-free.dev'],
}

module.exports = nextConfig
