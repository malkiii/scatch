/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  images: {
    domains: ['images.pexels.com']
  },
  experimental: {
    serverComponentsExternalPackages: ['@prisma/client']
  },
  env: {
    API_TOKEN: process.env.API_KEY
  }
};
