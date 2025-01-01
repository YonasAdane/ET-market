-- DropForeignKey
ALTER TABLE "product_images" DROP CONSTRAINT "product_images_categorySampleId_fkey";

-- AlterTable
ALTER TABLE "product_images" ALTER COLUMN "categorySampleId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "product_images" ADD CONSTRAINT "product_images_categorySampleId_fkey" FOREIGN KEY ("categorySampleId") REFERENCES "categories"("id") ON DELETE SET NULL ON UPDATE CASCADE;
