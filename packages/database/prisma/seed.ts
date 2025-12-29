import fs from "fs";
import path from "path";
import csv from "csv-parser";
import { PrismaClient, ImageType } from "../src/generated/client/client";

const prisma = new PrismaClient();

const csvFilePath = path.join(__dirname, "data", "lazada-products.csv");

function parseJSON(value: string) {
  try {
    return JSON.parse(value);
  } catch {
    return null;
  }
}

async function main() {
  console.log("🌱 Starting database seed...");

  const rows: any[] = [];

  await new Promise<void>((resolve, reject) => {
    fs.createReadStream(csvFilePath)
      .pipe(csv())
      .on("data", (data) => rows.push(data))
      .on("end", resolve)
      .on("error", reject);
  });

  for (const row of rows) {
    const brandName = row.brand?.trim();
    const rating = Number(row.rating) || null;

    // ---------- BRAND ----------
    let brand:any = null;
    if (brandName) {
      brand = await prisma.brand.upsert({
        where: { name: brandName },
        update: {},
        create: { name: brandName },
      });
    }

    // ---------- CATEGORY (use last breadcrumb item) ----------
    const breadcrumbs = parseJSON(row.breadcrumb);
    const categoryName =
      Array.isArray(breadcrumbs) && breadcrumbs.length
        ? breadcrumbs[breadcrumbs.length - 1]
        : "Uncategorized";

    const category = await prisma.category.upsert({
      where: { name: categoryName },
      update: {},
      create: { name: categoryName },
    });

    // ---------- PRODUCT ----------
    const product = await prisma.product.create({
      data: {
        name: row.title,
        description: row.product_description,
        rating,
        categoryId: category.id,
        brandId: brand?.id,
      },
    });

    // ---------- PRODUCT ITEM ----------
    const productItem = await prisma.productItem.create({
      data: {
        productId: product.id,
        name: row.sku || product.name,
        price: Number(row.final_price) || 0,
        prevPrice: Number(row.initial_price) || 0,
        stock: 100, // default stock
      },
    });

    // ---------- IMAGES ----------
    const images = parseJSON(row.image);
    if (Array.isArray(images)) {
      for (const imageUrl of images) {
        await prisma.image.create({
          data: {
            url: imageUrl,
            publicId: imageUrl.split("/").pop() || crypto.randomUUID(),
            type: ImageType.PRODUCT_ITEM,
            productItemId: productItem.id,
          },
        });
      }
    }

    // ---------- VARIANTS (OPTIONAL) ----------
    const variations = parseJSON(row.variations);
    if (Array.isArray(variations)) {
      for (const v of variations) {
        const variant = await prisma.variant.upsert({
          where: { name: v.name },
          update: {},
          create: {
            name: v.name,
            categoryId: category.id,
          },
        });

        for (const value of v.variations) {
          const variantValue = await prisma.values.create({
            data: {
              value,
              variantId: variant.id,
            },
          });

          await prisma.productItem.update({
            where: { id: productItem.id },
            data: {
              variationValues: {
                connect: { id: variantValue.id },
              },
            },
          });
        }
      }
    }

    console.log(`✅ Seeded product: ${product.name}`);
  }

  console.log("🌱 Seeding completed successfully!");
}

main()
  .catch((e) => {
    console.error("❌ Seeding error:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
