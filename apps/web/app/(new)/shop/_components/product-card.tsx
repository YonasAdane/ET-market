// app/shop/components/product-card.tsx
import { Card, CardContent } from "@repo/ui/components/ui/card";
import Image from "next/image";

export default function ProductCard({ product }: any) {
  return (
    <Card className="hover:shadow-xl transition">
      <div className="relative aspect-[3/4]">
        <Image
          src={product.image}
          alt={product.name}
          fill
          className="object-cover"
        />
      </div>

      <CardContent className="p-4 space-y-2">
        <p className="text-xs text-muted-foreground">
          {product.brand}
        </p>
        <h4 className="font-semibold line-clamp-1">
          {product.name}
        </h4>
        <div className="font-bold">${product.price}</div>
      </CardContent>
    </Card>
  );
}
