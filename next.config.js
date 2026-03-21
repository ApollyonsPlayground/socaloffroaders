/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  compilerOptions: {
    // These are SWC compiler options
  },
  experimental: {
    appDir: true, // Ensure app directory is enabled
  },
  // Configure paths for TypeScript aliases (if needed, but already set in tsconfig)
  // experimental: { appDir: true },
  // reactStrictMode: true,
  // swcMinify: true,
  // output: 'export', // Needed for static export deployment if required later
  // // Needed to configure the /src directory for Next.js App Router
  // experimental: { appDir: true, },
  // sassOptions: {
  //   includePaths: ['./src'], 
  // },
};

module.exports = nextConfig;
