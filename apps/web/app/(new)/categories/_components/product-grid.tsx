// src/components/shop/product-grid.tsx
"use client";
import { useQueryStates } from 'nuqs';
import { productSearchParams } from '../validation';
import { Card, CardContent } from "@repo/ui/components/ui/card";
import { Button } from "@repo/ui/components/ui/button";
import Image from "next/image";

export default function ProductGrid({ products, total }: { products: any[], total: number }) {
  const [params, setParams] = useQueryStates(productSearchParams, { shallow: false });

  return (
    <div>
      {/* <div className="flex justify-between items-center mb-6">
        <p className="text-sm text-muted-foreground">
          Showing <span className="font-bold text-foreground">1-{products.length}</span> of {total}
        </p>
        <select 
          value={params.sort} 
          onChange={(e) => setParams({ sort: e.target.value })}
          className="border rounded p-1 text-sm"
        >
          <option value="featured">Featured</option>
          <option value="price_asc">Price: Low to High</option>
        </select>
      </div> */}

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
        {products.map((product) => (
          <Card key={product.id} className="group overflow-hidden">
            <div className="aspect-square relative overflow-hidden bg-muted">
              <Image 
                src={product.images[0]?.url || "/placeholder.png"} 
                alt={product.name}
                fill
                className="object-cover transition-transform group-hover:scale-105"
              />
            </div>
            <CardContent className="p-4">
              <p className="text-xs text-muted-foreground">{product.brand?.name}</p>
              <h3 className="font-bold line-clamp-2 h-10">{product.name}</h3>
              <div className="flex justify-between items-center mt-4">
                <span className="text-lg font-bold text-primary">
                  ${product.productItems[0]?.price.toFixed(2)}
                </span>
                <Button size="icon" className="rounded-full">
                  <span className="material-symbols-outlined">add_shopping_cart</span>
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}