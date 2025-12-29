"use client"

import { addToCart, toggleWishlist } from "@/actions/products"
import { useToast } from "@repo/ui/hooks/use-toast"
import { addToCartSchema, ProductItem } from "@/lib/schemas/product"
import { zodResolver } from "@hookform/resolvers/zod"
import { Badge } from "@repo/ui/components/ui/badge"
import { Button } from "@repo/ui/components/ui/button"
import { Card, CardFooter, CardHeader } from "@repo/ui/components/ui/card"
import { Eye, Heart, ShoppingCart } from "lucide-react"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { useForm } from "react-hook-form"
import { Spinner } from "@/admin/_components/spinnerLoader"

interface ProductCardProps {
  product: ProductItem
}

export default function ProductCard({ product }: ProductCardProps) {
  const router = useRouter()
  const { toast } = useToast()
  const [isWishlisted, setIsWishlisted] = useState(false)
  const [isAddingToCart, setIsAddingToCart] = useState(false)

  const addToCartForm = useForm({
    resolver: zodResolver(addToCartSchema),
    defaultValues: {
      productId: product.id,
      quantity: 1,
    },
  })

  async function handleAddToCart() {
    try {
      setIsAddingToCart(true)
      await addToCart({
        productId: product.id,
        quantity: 1,
      })
      toast({
        title: "Added to cart",
        description: `${product.name} has been added to your cart.`,
      })
    } catch (error) {
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to add to cart",
        variant: "destructive",
      })
    } finally {
      setIsAddingToCart(false)
    }
  }

  async function handleToggleWishlist() {
    try {
      const result = await toggleWishlist({
        productId: product.product.id,
      })
      setIsWishlisted(result.added)
      toast({
        title: result.added ? "Added to wishlist" : "Removed from wishlist",
        description: result.added 
          ? "Product added to your wishlist" 
          : "Product removed from your wishlist",
      })
    } catch (error) {
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to update wishlist",
        variant: "destructive",
      })
    }
  }

  const stockStatus = product.stock > 10 ? "in-stock" : product.stock > 0 ? "low-stock" : "out-of-stock"

  return (
    <Card className="group flex flex-col border border-border rounded-lg overflow-hidden hover:shadow-lg hover:border-primary/30 transition-all duration-300">
      <div className="relative aspect-square overflow-hidden bg-muted">
        <div className="absolute top-3 right-3 z-10 flex gap-2">
          <Button
            variant="secondary"
            size="icon"
            className="size-8 rounded-full bg-background/90 hover:bg-destructive hover:text-destructive-foreground"
            onClick={handleToggleWishlist}
          >
            <Heart className={`h-4 w-4 ${isWishlisted ? "fill-current" : ""}`} />
          </Button>
          <Button
            variant="secondary"
            size="icon"
            className="size-8 rounded-full bg-background/90"
            onClick={() => router.push(`/products/${product.id}`)}
          >
            <Eye className="h-4 w-4" />
          </Button>
        </div>
        
        {stockStatus === "in-stock" && (
          <Badge className="absolute top-3 left-3 z-10 bg-green-100 text-green-800 hover:bg-green-100">
            In Stock
          </Badge>
        )}
        {stockStatus === "low-stock" && (
          <Badge className="absolute top-3 left-3 z-10 bg-orange-100 text-orange-800 hover:bg-orange-100">
            Low Stock
          </Badge>
        )}
        {stockStatus === "out-of-stock" && (
          <div className="absolute inset-0 bg-background/60 z-0 pointer-events-none" />
        )}
        
        {(product.images?.length && product.images[0]) && (
          <Image
            src={product.images[0].url}
            alt={product.images[0].altText || product.name}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-500"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
          />
        )}
        
        {stockStatus === "out-of-stock" && (
          <Badge className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10 bg-gray-800 text-white">
            Out of Stock
          </Badge>
        )}
      </div>
      
      <CardHeader className="p-4 flex-1">
        <div className="text-xs text-muted-foreground mb-1">
          {product.product?.brand?.name || "No Brand"}
        </div>
        <h3 className="font-bold text-base leading-tight line-clamp-2 min-h-[2.5em]">
          {product.name}
        </h3>
      </CardHeader>
      
      <CardFooter className="p-4 pt-0">
        <div className="flex w-full items-end justify-between gap-2">
          <div className="flex flex-col">
            <span className="text-lg font-bold text-primary">
              ${product?.price?.toFixed(2)}
            </span>
            {product.prevPrice && (
              <span className="text-xs text-muted-foreground line-through">
                ${product.prevPrice.toFixed(2)}
              </span>
            )}
          </div>
          <Button
            size="icon"
            className="rounded-full size-9"
            onClick={handleAddToCart}
            disabled={stockStatus === "out-of-stock" || isAddingToCart}
            // loading={isAddingToCart}
          >
						{isAddingToCart&&<Spinner/>}
            {stockStatus === "out-of-stock" ? (
              <ShoppingCart className="h-4 w-4" />
            ) : (
              <ShoppingCart className="h-4 w-4" />
            )}
          </Button>
        </div>
      </CardFooter>
    </Card>
  )
}