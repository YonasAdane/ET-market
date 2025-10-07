import { Suspense } from "react"
import { ProductsContent } from "./ProductsContent"

function ProductsLoadingSkeleton() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="space-y-2">
          <div className="h-8 w-48 bg-muted rounded" />
          <div className="h-4 w-96 bg-muted rounded" />
        </div>
        <div className="h-10 w-32 bg-muted rounded" />
      </div>

      <div className="space-y-4">
        <div className="h-12 w-full bg-muted rounded" />
        <div className="h-64 w-full bg-muted rounded" />
      </div>
    </div>
  )
}

export default function ProductsPage() {
  return (
    <Suspense fallback={<ProductsLoadingSkeleton />}>
      <ProductsContent />
    </Suspense>
  )
}
