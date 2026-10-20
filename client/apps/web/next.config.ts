import type { NextConfig } from 'next';
import path from 'node:path';

const nextConfig: NextConfig = {
  reactStrictMode: true,
  transpilePackages: ['@bayes/ui'],
  output: 'standalone',
  outputFileTracingRoot: path.join(__dirname, '../../..'),
  agentRules: false,
};

export default nextConfig;
