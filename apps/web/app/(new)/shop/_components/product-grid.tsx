"use client";

import Image from "next/image";
import { Button } from "@repo/ui/components/ui/button";
import { Star, ShoppingBag, Heart } from "lucide-react";

export function ProductGrid({ products }: { products: any[] }) {
  if (products.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center">
        <h3 className="text-lg font-semibold">No items found</h3>
        <p className="text-muted-foreground">Try adjusting your filters or search query.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-6 gap-y-10">
      {products.map((item) => (
        <div key={item.id} className="group relative flex flex-col bg-card rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-all border border-transparent hover:border-border">
          <div className="relative aspect-[3/4] bg-muted overflow-hidden">
            <Image 
              src={item.images[0]?.url || "/placeholder.png"} 
              alt={item.name} 
              fill 
              className="object-cover transition-transform duration-700 group-hover:scale-105"
            />
            {item.prevPrice > item.price && (
              <span className="absolute top-3 left-3 bg-red-500 text-white px-2 py-1 text-[10px] font-bold uppercase rounded">
                Sale
              </span>
            )}
            <Button variant="secondary" size="icon" className="absolute top-3 right-3 rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
              <Heart className="size-4" />
            </Button>
          </div>
          
          <div className="p-4 flex flex-col gap-1.5">
            <p className="text-xs text-muted-foreground uppercase">
              {item.product?.brand?.name || "Generic"}
            </p>
            <h3 className="font-bold line-clamp-1 group-hover:text-primary transition-colors">
              {item.name}
            </h3>
            <div className="flex items-center justify-between mt-1">
              <div className="flex gap-2 items-center">
                <span className="font-bold text-foreground">${item?.price?.toFixed(2)}</span>
                {item?.prevPrice > 0 && (
                  <span className="text-xs text-muted-foreground line-through">${item?.prevPrice?.toFixed(2)}</span>
                )}
              </div>
              <div className="flex items-center gap-1">
                <Star className="size-3 fill-yellow-400 text-yellow-400" />
                <span className="text-xs font-semibold">{item.product?.rating || 0}</span>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}