/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'axstdjscrdaspqeogole.supabase.co',
      },
    ],
  },
  serverExternalPackages: ['@prisma/client', 'bcryptjs'],
  turbopack: {
    root: __dirname,
  },
}
module.exports = nextConfig