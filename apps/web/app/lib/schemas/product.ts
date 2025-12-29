import { z } from "zod"

export const productFilterSchema = z.object({
  categories: z.array(z.string()).optional(),
  brands: z.array(z.string()).optional(),
  priceRange: z.tuple([z.number(), z.number()]).optional(),
  sortBy: z.enum(["featured", "price-low-to-high", "price-high-to-low", "newest"]).optional(),
  minPrice: z.number().optional(),
  maxPrice: z.number().optional(),
  search: z.string().optional(),
})

export const addToCartSchema = z.object({
  productId: z.number(),
  quantity: z.number().min(1).default(1),
  variantIds: z.array(z.number()).optional(),
})

export const wishlistSchema = z.object({
  productId: z.number(),
})

export type ProductFilter = z.infer<typeof productFilterSchema>
export type AddToCartInput = z.infer<typeof addToCartSchema>
export type WishlistInput = z.infer<typeof wishlistSchema>

// Database types based on Prisma schema
export type ProductItem = {
  id: number
  productId: number
  name: string
  description: string | null
  price: number
  prevPrice: number | null
  stock: number
  images: {
    url: string
    altText: string | null
  }[]
  product: {
    id: number
    name: string
    brand: {
      id: number
      name: string
    } | null
    category: {
      id: number
      name: string
    } | null
  }
}

export type Category = {
  id: number
  name: string
  description: string | null
  parentId: number | null
  childCategory: Category[]
}

export type Brand = {
  id: number
  name: string
  productCount: number
}