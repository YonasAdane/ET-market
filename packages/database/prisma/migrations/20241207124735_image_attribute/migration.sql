/*
  Warnings:

  - You are about to drop the column `brandImage` on the `brands` table. All the data in the column will be lost.
  - You are about to drop the column `desktopBannerImage` on the `brands` table. All the data in the column will be lost.
  - You are about to drop the column `logoUrl` on the `brands` table. All the data in the column will be lost.
  - You are about to drop the column `mobileBannerImage` on the `brands` table. All the data in the column will be lost.
  - You are about to drop the column `bannerImage` on the `categories` table. All the data in the column will be lost.
  - You are about to drop the column `sampleImages` on the `categories` table. All the data in the column will be lost.
  - You are about to drop the column `bytes` on the `product_images` table. All the data in the column will be lost.
  - You are about to drop the column `format` on the `product_images` table. All the data in the column will be lost.
  - You are about to drop the column `height` on the `product_images` table. All the data in the column will be lost.
  - You are about to drop the column `width` on the `product_images` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[brandLogoId]` on the table `brands` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[bannerImageId]` on the table `categories` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[brandId]` on the table `product_images` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `categorySampleId` to the `product_images` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "product_images" DROP CONSTRAINT "product_images_productId_fkey";

-- AlterTable
ALTER TABLE "brands" DROP COLUMN "brandImage",
DROP COLUMN "desktopBannerImage",
DROP COLUMN "logoUrl",
DROP COLUMN "mobileBannerImage",
ADD COLUMN     "brandLogoId" INTEGER;

-- AlterTable
ALTER TABLE "categories" DROP COLUMN "bannerImage",
DROP COLUMN "sampleImages",
ADD COLUMN     "bannerImageId" INTEGER;

-- AlterTable
ALTER TABLE "product_images" DROP COLUMN "bytes",
DROP COLUMN "format",
DROP COLUMN "height",
DROP COLUMN "width",
ADD COLUMN     "bannerImageId" INTEGER,
ADD COLUMN     "brandId" INTEGER,
ADD COLUMN     "categorySampleId" INTEGER NOT NULL,
ALTER COLUMN "productId" DROP NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "brands_brandLogoId_key" ON "brands"("brandLogoId");

-- CreateIndex
CREATE UNIQUE INDEX "categories_bannerImageId_key" ON "categories"("bannerImageId");

-- CreateIndex
CREATE UNIQUE INDEX "product_images_brandId_key" ON "product_images"("brandId");

-- AddForeignKey
ALTER TABLE "categories" ADD CONSTRAINT "categories_bannerImageId_fkey" FOREIGN KEY ("bannerImageId") REFERENCES "product_images"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "brands" ADD CONSTRAINT "brands_brandLogoId_fkey" FOREIGN KEY ("brandLogoId") REFERENCES "product_images"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "product_images" ADD CONSTRAINT "product_images_productId_fkey" FOREIGN KEY ("productId") REFERENCES "products"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "product_images" ADD CONSTRAINT "product_images_brandId_fkey" FOREIGN KEY ("brandId") REFERENCES "brands"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "product_images" ADD CONSTRAINT "product_images_bannerImageId_fkey" FOREIGN KEY ("bannerImageId") REFERENCES "brands"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "product_images" ADD CONSTRAINT "product_images_categorySampleId_fkey" FOREIGN KEY ("categorySampleId") REFERENCES "categories"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
