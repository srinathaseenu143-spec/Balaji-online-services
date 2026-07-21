/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.jsdelivr.net',
        pathname: '/gh/glincker/thesvg@main/**',
      },
    ],
  },
  // Explicitly use server rendering (not static export)
  experimental: {
    optimizePackageImports: ['lucide-react'],
  },
}

export default nextConfig
