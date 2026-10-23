/** @type {import('next').NextConfig} */
const path = require('path');
const webpack = require('webpack');

try {
  require('./config/platform-bindings.cjs').syncNativeRuntime();
} catch (err) {
  console.warn('[next.config] platform-bindings skipped:', err.message);
}

const x402Stub = path.join(__dirname, 'config', 'webpack-empty-stub.js');

const nextConfig = {
  reactStrictMode: true,
  trailingSlash: true,
  images: { unoptimized: true },
  eslint: { ignoreDuringBuilds: true },
  typescript: { ignoreBuildErrors: false },
  webpack: (config) => {
    config.resolve.alias = {
      ...config.resolve.alias,
      '@x402/core/client': x402Stub,
      '@x402/evm': x402Stub,
      '@x402/evm/upto/client': x402Stub,
      '@x402/evm/exact/client': x402Stub,
      '@x402/svm/exact/client': x402Stub,
    };
    config.plugins.push(
      new webpack.IgnorePlugin({
        checkResource(resource) {
          return resource.startsWith('@x402/');
        },
      }),
    );
    return config;
  },
};

module.exports = nextConfig;
