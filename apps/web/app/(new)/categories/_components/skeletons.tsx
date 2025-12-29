// src/components/shop/skeletons.tsx
import { Skeleton } from "@repo/ui/components/ui/skeleton";
import { Card, CardContent } from "@repo/ui/components/ui/card";

export function ProductSkeleton() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
      {Array.from({ length: 6 }).map((_, i) => (
        <Card key={i} className="overflow-hidden">
          <Skeleton className="aspect-square w-full" />
          <CardContent className="p-4 space-y-3">
            <Skeleton className="h-4 w-1/4" />
            <Skeleton className="h-6 w-full" />
            <div className="flex justify-between items-center pt-4">
              <Skeleton className="h-8 w-20" />
              <Skeleton className="h-10 w-10 rounded-full" />
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}