"use server";

import { db as prisma } from "@/lib/config/prisma-config";
import { FilterValues } from "./validation";
import { Prisma } from "node_modules/@repo/database/src/generated/client/client";

export async function getProducts(filters: FilterValues) {
  try {
    const itemsPerPage = filters?.limit ?? 12;
    const skip = (filters.page - 1) * itemsPerPage;

    // Build the Where Clause
    const where: Prisma.ProductItemWhereInput = {
      price: {
        gte: filters.minPrice,
        lte: filters.maxPrice,
      },
      product: {
        // Filter by Category Name
        ...(filters.categories.length > 0 && {
          category: {
            name: { in: filters.categories },
          },
        }),
        // Filter by Brand Name
        ...(filters.brands.length > 0 && {
          brand: {
            name: { in: filters.brands },
          },
        }),
        // Search by Product Name
        ...(filters.search && {
          name: { contains: filters.search, mode: 'insensitive' },
        }),
      },
    };

    // Build OrderBy
    let orderBy: Prisma.ProductItemOrderByWithRelationInput = { createdAt: 'desc' };
    if (filters.sort === "low-high") orderBy = { price: 'asc' };
    if (filters.sort === "high-low") orderBy = { price: 'desc' };

    // Execute Transaction to get count and data in one go
    const [count, items] = await prisma.$transaction([
      prisma.productItem.count({ where }),
      prisma.productItem.findMany({
        where,
        take: itemsPerPage,
        skip,
        orderBy,
        include: {
          images: true,
          product: {
            include: {
              brand: true,
              category: true,
            },
          },
        },
      }),
    ]);

    return {
      data: items,
      total: count,
      error: null,
    };
  } catch (err) {
    console.error("Database Error:", err);
    return { 
      data: [], 
      total: 0, 
      error: "We encountered an error connecting to the store. Please try again later." 
    };
  }
}