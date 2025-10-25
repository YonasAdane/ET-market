import { ProductGridSkeleton } from "../_components/ProductGrid";

export default function Loading() {
  return (
    <div className="container mx-auto py-8">
      <div className="h-8 w-1/3 mb-8 bg-muted animate-pulse rounded-md" />
      <ProductGridSkeleton />
    </div>
  );
}