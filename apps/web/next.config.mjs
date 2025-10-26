/** @type {import('next').NextConfig} */
const nextConfig = {
    experimental: {
      serverActions: {
        bodySizeLimit: '2mb',
      },
    },
    images: {
        domains: ['images.pexels.com',
          "g-iff6oyrytat.vusercontent.net",
          "justwatches.com",
          "www.justwatches.com",
          "https://res.cloudinary.com",
          "res.cloudinary.com"
        ],
      },
      transpilePackages: [
        "@repo/database",
        "@repo/ui",
        "@prisma/client",
        "bcryptjs",
      ], // Ensure the database package is transpiled
};

export default nextConfig;
