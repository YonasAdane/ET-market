/** @type {import('next').NextConfig} */
const nextConfig = {
   
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
        "@prisma/client",
      ], // Ensure the database package is transpiled
};

export default nextConfig;
