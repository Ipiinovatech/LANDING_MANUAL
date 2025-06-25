/** @type {import('next').NextConfig} */
const nextConfig = {
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
  swcMinify: false,
  experimental: {
    appDir: true
  },
  assetPrefix: process.env.NODE_ENV === 'production' ? '/' : '/',
  basePath: '',
  trailingSlash: true,
};

module.exports = nextConfig;
