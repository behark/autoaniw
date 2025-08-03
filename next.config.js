/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  output: 'export',  // Enable static exports for GitHub Pages
  distDir: 'out',
  images: {
    domains: [
      'images.unsplash.com',
      'storage.googleapis.com',
      'autoani-media.netlify.app',
      'autoani-staging.netlify.app'
    ],
    unoptimized: true  // Required for static export
  },
  experimental: {
    optimizeCss: true,
    largePageDataBytes: 128 * 1000, // 128KB
  },
  // GitHub Pages deployment needs a basePath if not using a custom domain
  basePath: process.env.NODE_ENV === 'production' ? '/autoaniw' : '',
  assetPrefix: process.env.NODE_ENV === 'production' ? '/autoaniw/' : '',
  // Disable i18n for static export
  i18n: undefined,
  // Add trailing slash to improve compatibility with static hosting
  trailingSlash: true,
}

module.exports = nextConfig
