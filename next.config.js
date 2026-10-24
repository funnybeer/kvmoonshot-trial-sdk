/** @type {import('next').NextConfig} */
try {
  require('./config/platform-bindings.cjs').syncNativeRuntime();
} catch {
  /* optional native module - mock feeds when absent */
}

const nextConfig = {
  reactStrictMode: true,
  trailingSlash: true,
  images: { unoptimized: true },
  eslint: { ignoreDuringBuilds: true },
  typescript: { ignoreBuildErrors: false },
};

module.exports = nextConfig;
