"use client";

import { useState, useTransition } from "react";
import { Card, CardContent, CardFooter, CardHeader } from "@repo/ui/components/ui/card";
import { Skeleton } from "@repo/ui/components/ui/skeleton";
import { Button } from "@repo/ui/components/ui/button";
import Image from "next/image";
import { addToCart } from "../_actions/productActions";

interface Product {
  id: number;
  name: string;
  price: number;
  prevprice?: number;
  brand: {
    id: number;
    name: string;
    createdAt: string;
    updatedAt: string;
  } | null;
  images: {
    id: number;
    url: string;
    createdAt: string;
    updatedAt: string;
  }[];
  createdAt: string;
  updatedAt: string;
}

interface ProductGridProps {
  products: Product[];
  userId?: string;
}

export function ProductGrid({ products, userId }: ProductGridProps) {
  const [isPending, startTransition] = useTransition();
  const [cartMessages, setCartMessages] = useState<{[key: number]: string}>({});

  const handleAddToCart = (productId: number) => {
    if (!userId) {
      setCartMessages(prev => ({ ...prev, [productId]: "Please log in to add items to cart" }));
      return;
    }

    startTransition(async () => {
      try {
        const result = await addToCart({
          userId,
          productId,
          quantity: 1
        });
        if (result.success) {
          setCartMessages(prev => ({ ...prev, [productId]: "Added to cart!" }));
          // Clear message after 3 seconds
          setTimeout(() => {
            setCartMessages(prev => {
              const newMessages = { ...prev };
              delete newMessages[productId];
              return newMessages;
            });
          }, 3000);
        } else {
          setCartMessages(prev => ({ ...prev, [productId]: result.error || "Failed to add to cart" }));
        }
      } catch (error) {
        setCartMessages(prev => ({ ...prev, [productId]: "An error occurred" }));
      }
    });
  };

  if (!products || products.length === 0) {
    return (
      <div className="text-center py-12">
        <h3 className="text-lg font-medium">No products found</h3>
        <p className="text-muted-foreground">Try adjusting your filters to find what you're looking for.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {products.map((product) => (
        <Card key={product.id} className="flex flex-col">
          <CardHeader className="p-0">
            {product.images && product.images.length > 0 ? (
              <div className="relative aspect-square">
                <Image
                  src={product.images[0]?.url || ""}
                  alt={product.name}
                  fill
                  className="object-cover rounded-t-lg"
                />
              </div>
            ) : (
              <div className="aspect-square bg-muted flex items-center justify-center rounded-t-lg">
                <span className="text-muted-foreground">No image</span>
              </div>
            )}
          </CardHeader>
          <CardContent className="flex-1 p-4">
            {product.brand && (
              <p className="text-sm text-muted-foreground">{product.brand.name}</p>
            )}
            <h3 className="text-lg font-medium mt-1">{product.name}</h3>
            <div className="flex items-center mt-2">
              <p className="text-lg font-bold">${product.price.toFixed(2)}</p>
              {product.prevprice && product.prevprice > product.price && (
                <p className="ml-2 text-sm text-muted-foreground line-through">
                  ${product.prevprice.toFixed(2)}
                </p>
              )}
            </div>
          </CardContent>
          <CardFooter className="p-4 pt-0">
            <div className="w-full">
              <Button 
                className="w-full"
                onClick={() => handleAddToCart(product.id)}
                disabled={isPending}
              >
                {isPending ? "Adding..." : "Add to Cart"}
              </Button>
              {cartMessages[product.id] && (
                <p className="text-sm text-center mt-2 text-green-600">
                  {cartMessages[product.id]}
                </p>
              )}
            </div>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
}

// Skeleton loader for product grid
export function ProductGridSkeleton() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {Array.from({ length: 8 }).map((_, index) => (
        <Card key={index} className="flex flex-col">
          <CardHeader className="p-0">
            <Skeleton className="aspect-square rounded-t-lg" />
          </CardHeader>
          <CardContent className="flex-1 p-4">
            <Skeleton className="h-4 w-1/3 mb-2" />
            <Skeleton className="h-6 w-3/4 mb-2" />
            <Skeleton className="h-6 w-1/2" />
          </CardContent>
          <CardFooter className="p-4 pt-0">
            <Skeleton className="h-10 w-full" />
          </CardFooter>
        </Card>
      ))}
    </div>
  );
}