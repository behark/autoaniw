/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  output: 'export',  // Enable static exports
  distDir: 'out',
  images: {
    domains: [
      'images.unsplash.com',
      'storage.googleapis.com',
      'autoani-media.netlify.app',
      'autoani-staging.netlify.app'
    ],
    unoptimized: true,  // Required for static export
    // Add remote patterns for additional image sources
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
  },
  // Simple configuration for Netlify
  // No basePath or assetPrefix needed for Netlify
  // Disable experimental features that might cause issues
  experimental: {
    // Disable optimizeCss as it can cause issues with static export
    optimizeCss: false,
    largePageDataBytes: 128 * 1000, // 128KB
  },
  // Add trailing slash to improve compatibility with static hosting
  trailingSlash: true,
}

module.exports = nextConfig
