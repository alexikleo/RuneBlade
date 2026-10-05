import type { NextConfig } from 'next';
const nextConfig: NextConfig = {
  output: 'export',
  assetPrefix: process.env.PAGES_BASE_PATH || '',
};
export default nextConfig;
