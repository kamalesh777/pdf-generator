/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['ik.imagekit.io'],
  },
  env: {
    API_BASE_URL: 'https://lazy-worm-umbrella.cyclic.app',
  },
  async redirects() {
    return [
      {
        source: '/',
        destination: '/sign-in',
        permanent: true,
      },
    ]
  },
  reactStrictMode: true,
  swcMinify: true,
}
module.exports = nextConfig
