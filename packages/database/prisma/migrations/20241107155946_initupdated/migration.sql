/*
  Warnings:

  - The `size` column on the `products` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - Added the required column `bannerImage` to the `categories` table without a default value. This is not possible if the table is not empty.
  - Added the required column `prevprice` to the `products` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "brands" ADD COLUMN     "brandImage" TEXT[],
ADD COLUMN     "description" TEXT,
ADD COLUMN     "desktopBannerImage" TEXT[],
ADD COLUMN     "mobileBannerImage" TEXT[];

-- AlterTable
ALTER TABLE "categories" ADD COLUMN     "bannerImage" TEXT NOT NULL,
ADD COLUMN     "sampleImages" TEXT[];

-- AlterTable
ALTER TABLE "products" ADD COLUMN     "prevprice" DOUBLE PRECISION NOT NULL,
DROP COLUMN "size",
ADD COLUMN     "size" TEXT[];
