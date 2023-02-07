/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['ik.imagekit.io'],
  },
  env: {
    API_URL: 'https://lazy-worm-umbrella.cyclic.app',
  },
  reactStrictMode: true,
  swcMinify: true,
}
module.exports = nextConfig
