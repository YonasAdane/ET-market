/*
  Warnings:

  - A unique constraint covering the columns `[name]` on the table `categories` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `bannerSampleId` to the `categories` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "categories" ADD COLUMN     "bannerSampleId" INTEGER NOT NULL,
ADD COLUMN     "sampleImagesId" INTEGER[];

-- CreateIndex
CREATE UNIQUE INDEX "categories_name_key" ON "categories"("name");
