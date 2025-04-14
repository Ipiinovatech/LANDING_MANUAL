/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  images: { 
    unoptimized: true,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  swcMinify: false, // Disable SWC minification
  experimental: {
    appDir: true
  },
  // Add assetPrefix for static assets in production
  assetPrefix: process.env.NODE_ENV === 'production' ? '.' : '',
  // Configure base path
  basePath: '',
  // Enable trailing slashes
  trailingSlash: true,
};

module.exports = nextConfig;