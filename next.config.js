/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  images: {
    domains: ['images.pexels.com']
  },
  env: {
    HOSTNAME: process.env.HOSTNAME,
    API_TOKEN: process.env.API_KEY
  }
};
