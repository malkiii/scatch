/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  images: {
    domains: ['images.pexels.com']
  },
  env: {
    NEXTAUTH_URL: process.env.NEXTAUTH_URL,
    API_TOKEN: process.env.API_KEY
  }
};
