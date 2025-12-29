"use server"

import { revalidatePath } from "next/cache"
import { productFilterSchema, addToCartSchema, wishlistSchema } from "@/lib/schemas/product"
import { db as prisma } from "@/lib/config/prisma-config"
import { currentUser } from "@/lib/auth"
import { ProductFilter } from "@/lib/schemas/product"

export async function getProducts(filters: ProductFilter) {
  try {
    const validatedFilters = productFilterSchema.parse(filters)
    
    const where: any = {}
    
    // Category filter
    if (validatedFilters.categories && validatedFilters.categories.length > 0) {
      where.product = {
        category: {
          name: {
            in: validatedFilters.categories,
          },
        },
      }
    }
    
    // Brand filter
    if (validatedFilters.brands && validatedFilters.brands.length > 0) {
      where.product = {
        ...where.product,
        brand: {
          name: {
            in: validatedFilters.brands,
          },
        },
      }
    }
    
    // Price range filter
    if (validatedFilters.priceRange) {
      const [min, max] = validatedFilters.priceRange
      where.price = {
        gte: min,
        lte: max,
      }
    }
    
    // Search filter
    if (validatedFilters.search) {
      where.OR = [
        { name: { contains: validatedFilters.search, mode: "insensitive" } },
        { description: { contains: validatedFilters.search, mode: "insensitive" } },
        { product: { name: { contains: validatedFilters.search, mode: "insensitive" } } },
        { product: { brand: { name: { contains: validatedFilters.search, mode: "insensitive" } } } },
      ]
    }
    
    // Sort options
    let orderBy: any = { createdAt: "desc" }
    if (validatedFilters.sortBy === "price-low-to-high") {
      orderBy = { price: "asc" }
    } else if (validatedFilters.sortBy === "price-high-to-low") {
      orderBy = { price: "desc" }
    } else if (validatedFilters.sortBy === "newest") {
      orderBy = { createdAt: "desc" }
    }
    
    const products = await prisma.product.findMany({
      where,
      include: {
        images: {
          select: {
            url: true,
            altText: true,
          },
        },
        brand:true,
        category:true,
        productItems:true,
      },
      // orderBy,
      take: 12, // Pagination
    })
    
    // Get total count for pagination
    const totalCount = await prisma.productItem.count({ where })
    
    return {
      products,
      totalCount,
      page: 1,
      totalPages: Math.ceil(totalCount / 12),
    }
  } catch (error) {
    console.error("Error fetching products:", error)
    throw new Error("Failed to fetch products")
  }
}

export async function getCategories() {
  try {
    const categories = await prisma.category.findMany({
      where: {
        parentId: null, // Get only parent categories
      },
      include: {
        childCategory: true,
      },
    })
    
    return categories
  } catch (error) {
    console.error("Error fetching categories:", error)
    throw new Error("Failed to fetch categories")
  }
}

export async function getBrands() {
  try {
    const brands = await prisma.brand.findMany({
      include: {
        _count: {
          select: {
            products: true,
          },
        },
      },
    })
    
    return brands.map(brand => ({
      id: brand.id,
      name: brand.name,
      productCount: brand._count.products,
    }))
  } catch (error) {
    console.error("Error fetching brands:", error)
    throw new Error("Failed to fetch brands")
  }
}

export async function addToCart(data: any) {
  try {
    const validatedData = addToCartSchema.parse(data)
    const user = await currentUser()
    
    if (!user) {
      throw new Error("You must be logged in to add items to cart")
    }
    
    // Check if product exists
    const productItem = await prisma.productItem.findUnique({
      where: { id: validatedData.productId },
    })
    
    if (!productItem) {
      throw new Error("Product not found")
    }
    
    // Check stock
    if (productItem.stock < validatedData.quantity) {
      throw new Error("Insufficient stock")
    }
    
    // Add to cart (upsert logic)
    const existingCartItem = await prisma.shoppingCart.findFirst({
      where: {
        userId: user.id,
        productId: productItem.productId,
      },
    })
    
    if (existingCartItem) {
      await prisma.shoppingCart.update({
        where: { id: existingCartItem.id },
        data: {
          quantity: existingCartItem.quantity + validatedData.quantity,
        },
      })
    } else {
      await prisma.shoppingCart.create({
        data: {
          userId: user.id,
          productId: productItem.productId,
          quantity: validatedData.quantity,
        },
      })
    }
    
    revalidatePath("/")
    return { success: true, message: "Added to cart successfully" }
  } catch (error) {
    console.error("Error adding to cart:", error)
    throw error
  }
}

export async function toggleWishlist(data: any) {
  try {
    const validatedData = wishlistSchema.parse(data)
    const user = await currentUser()
    
    if (!user) {
      throw new Error("You must be logged in to manage wishlist")
    }
    
    const existingWishlistItem = await prisma.wishlist.findFirst({
      where: {
        userId: user.id,
        productId: validatedData.productId,
      },
    })
    
    if (existingWishlistItem) {
      await prisma.wishlist.delete({
        where: { id: existingWishlistItem.id },
      })
      revalidatePath("/")
      return { success: true, added: false }
    } else {
      await prisma.wishlist.create({
        data: {
          userId: user.id,
          productId: validatedData.productId,
        },
      })
      revalidatePath("/")
      return { success: true, added: true }
    }
  } catch (error) {
    console.error("Error toggling wishlist:", error)
    throw error
  }
}