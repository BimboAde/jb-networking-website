import type { NextConfig } from 'next';
const nextConfig: NextConfig = {
  reactCompiler: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'storage.googleapis.com',
      },
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
      },
    ],
  },
  async redirects() {
    return [
      // Redirect category roots to homepage (language-aware)
      { source: '/:lang/solutions/individuals', destination: '/:lang', permanent: true },
      { source: '/:lang/solutions/businesses', destination: '/:lang', permanent: true },
      // Fallback without language prefix
      { source: '/solutions/individuals', destination: '/', permanent: true },
      { source: '/solutions/businesses', destination: '/', permanent: true },
      // // Individuals → new slugs
      // { source: '/:lang/solutions/individuals/tax-accounting', destination: '/:lang/solutions/individuals/tax-client-intake', permanent: true },
      // { source: '/:lang/solutions/individuals/financial-planning', destination: '/:lang/solutions/individuals/financial-insurance-planning', permanent: true },
      // { source: '/:lang/solutions/individuals/credit-debt-resolution', destination: '/:lang/solutions/individuals/credit-debt-resolutions', permanent: true },
      // { source: '/:lang/solutions/individuals/real-estate-insurance', destination: '/:lang/solutions/individuals/real-estate-mortgage', permanent: true },

      // // Businesses → new slugs
      // { source: '/:lang/solutions/businesses/business-tax', destination: '/:lang/solutions/businesses/business-accountant-services', permanent: true },
      // { source: '/:lang/solutions/businesses/credit-building', destination: '/:lang/solutions/businesses/executive-services', permanent: true },
      // { source: '/:lang/solutions/businesses/corporate-services', destination: '/:lang/solutions/businesses/real-estate-mortgage', permanent: true },
      // { source: '/:lang/solutions/businesses/franchise-opportunities', destination: '/:lang/solutions/individuals/credit-debt-resolutions', permanent: true },
    ];
  },
};

export default nextConfig;
