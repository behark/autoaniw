/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: [
      'images.unsplash.com',
      'storage.googleapis.com',
      'autoani-media.netlify.app',
      'autoani-staging.netlify.app'
    ],
    unoptimized: process.env.NODE_ENV === 'production'
  },
  output: 'standalone',
  experimental: {
    optimizeCss: true,
    largePageDataBytes: 128 * 1000, // 128KB
  },
  i18n: {
    locales: ['en', 'es', 'fr', 'de', 'it'],
    defaultLocale: 'en',
  }
}

module.exports = nextConfig
