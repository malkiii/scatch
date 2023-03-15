/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  images: {
    domains: ['images.pexels.com']
  },
  env: {
    API_TOKEN: process.env.API_KEY
  }
};
