/*
  Warnings:

  - You are about to drop the column `sampleImagesId` on the `categories` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[name]` on the table `brands` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `categoryType` to the `categories` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "categories" DROP COLUMN "sampleImagesId",
ADD COLUMN     "categoryType" "CategoryType" NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "brands_name_key" ON "brands"("name");
