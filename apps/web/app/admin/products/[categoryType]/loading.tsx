import { Skeleton } from "@repo/ui/components/ui/skeleton"

export default function ProductsLoadingSkeleton() {
  return (
    <div className="space-y-6 p-6">

      {/* Table Skeleton */}
      <div className="space-y-4">
        <Skeleton className="h-12 w-full" />
        {Array.from({ length: 5 }).map((_, i) => (
          <Skeleton key={i} className="h-16 w-full" />
        ))}
      </div>
    </div>
  )
}