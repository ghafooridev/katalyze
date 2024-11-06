/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  images: {
    domains: ['localhost', 'rmc.katalyzeai-stg.com'],
  },
  output: 'standalone',
  basePath: '/app'
};

export default nextConfig;
