"use server";

import { db } from "app/lib/config/prisma-config";
import { z } from "zod";
import { revalidateTag } from "next/cache";
import { AppError } from "../../lib/AppError";

// Define the schema for validating inputs
const GetProductsSchema = z.object({
  categoryType: z.string().optional(),
  brandId: z.number().optional(),
  size: z.string().optional(),
  minPrice: z.number().optional(),
  maxPrice: z.number().optional(),
});

// Define the schema for adding to cart
const AddToCartSchema = z.object({
  userId: z.string(),
  productId: z.number(),
  quantity: z.number().min(1),
});

// Server action to fetch products with optional filters
export async function getProducts(rawData: {
  categoryType?: string;
  brandId?: number;
  size?: string;
  minPrice?: number;
  maxPrice?: number;
}) {
  try {
    // Validate inputs
    const validatedData = GetProductsSchema.parse(rawData);

    // Build the query conditions
    const whereConditions: any = {};
    
    if (validatedData.categoryType) {
      whereConditions.categoryType = validatedData.categoryType;
    }
    
    if (validatedData.brandId) {
      whereConditions.brandId = validatedData.brandId;
    }
    
    if (validatedData.size) {
      whereConditions.size = {
        has: validatedData.size
      };
    }
    
    if (validatedData.minPrice !== undefined || validatedData.maxPrice !== undefined) {
      whereConditions.price = {};
      if (validatedData.minPrice !== undefined) {
        whereConditions.price.gte = validatedData.minPrice;
      }
      if (validatedData.maxPrice !== undefined) {
        whereConditions.price.lte = validatedData.maxPrice;
      }
    }

    // Fetch products with related data
    const products = await db.product.findMany({
      where: whereConditions,
      include: {
        brand: true,
        images: true,
      },
      orderBy: {
        createdAt: 'desc'
      }
    });

    // Serialize the data to make it JSON-safe
    const serializedProducts = products.map((product: any) => ({
      ...product,
      createdAt: product.createdAt.toISOString(),
      updatedAt: product.updatedAt.toISOString(),
      brand: product.brand ? {
        ...product.brand,
        createdAt: product.brand.createdAt.toISOString(),
        updatedAt: product.brand.updatedAt.toISOString(),
      } : null,
      images: product.images.map((image: any) => ({
        ...image,
        createdAt: image.createdAt.toISOString(),
        updatedAt: image.updatedAt.toISOString(),
      }))
    }));

    return {
      success: true,
      data: serializedProducts,
    };
  } catch (error) {
    console.error("Error fetching products:", error);
    
    // Handle validation errors
    if (error instanceof z.ZodError) {
      return {
        success: false,
        error: "Invalid input data",
        validationErrors: error.errors,
      };
    }
    
    // Handle AppError
    if (error instanceof AppError) {
      return {
        success: false,
        error: error.message,
      };
    }
    
    // Handle other errors
    return {
      success: false,
      error: "Failed to fetch products",
    };
  }
}

// Server action to add product to cart
export async function addToCart(rawData: {
  userId: string;
  productId: number;
  quantity: number;
}) {
  try {
    // Validate inputs
    const validatedData = AddToCartSchema.parse(rawData);

    // Check if the product already exists in the user's cart
    const existingCartItem = await db.shoppingCart.findFirst({
      where: {
        userId: validatedData.userId,
        productId: validatedData.productId,
      },
    });

    let cartItem;
    if (existingCartItem) {
      // Update quantity if item already exists
      cartItem = await db.shoppingCart.update({
        where: {
          id: existingCartItem.id,
        },
        data: {
          quantity: existingCartItem.quantity + validatedData.quantity,
        },
      });
    } else {
      // Create new cart item
      cartItem = await db.shoppingCart.create({
        data: {
          userId: validatedData.userId,
          productId: validatedData.productId,
          quantity: validatedData.quantity,
        },
      });
    }

    // Revalidate cache for cart
    revalidateTag('cart');

    return {
      success: true,
      data: cartItem,
    };
  } catch (error) {
    console.error("Error adding to cart:", error);
    
    // Handle validation errors
    if (error instanceof z.ZodError) {
      return {
        success: false,
        error: "Invalid input data",
        validationErrors: error.errors,
      };
    }
    
    // Handle AppError
    if (error instanceof AppError) {
      return {
        success: false,
        error: error.message,
      };
    }
    
    // Handle other errors
    return {
      success: false,
      error: "Failed to add product to cart",
    };
  }
}