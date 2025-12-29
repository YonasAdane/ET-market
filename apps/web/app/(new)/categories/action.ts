// src/app/actions/products.ts
"use server";
import { db as prisma } from "@/lib/config/prisma-config"; // Adjust to your prisma path

export async function getProducts(params: any) {
  try {
    const { q, page, limit, brands, minPrice, maxPrice, sort } = params;
    const skip = (page - 1) * limit;

    const where = {
      name: { contains: q, mode: 'insensitive' as const },
      brand: brands.length > 0 ? { name: { in: brands } } : undefined,
      productItems: {
        some: {
          price: { gte: minPrice, lte: maxPrice }
        }
      }
    };

    const [items, total] = await Promise.all([
      prisma.product.findMany({
        where,
        take: limit,
        skip,
        include: {
          brand: true,
          images: true,
          productItems: { orderBy: { price: 'asc' }, take: 1 }
        },
        orderBy: sort === 'price_asc' ? { productItems: { _count: 'asc' } } : { createdAt: 'desc' }
      }),
      prisma.product.count({ where })
    ]);

    return { data: items, total, error: null };
  } catch (error) {
    return { data: [], total: 0, error: "Failed to fetch products. Please try again." };
  }
}