import { Skeleton } from "@repo/ui/components/ui/skeleton"
import { Suspense } from "react"
import { Button } from "@repo/ui/components/ui/button"
import TryAgainButton from "app/components/try-again-button"
import { CategoryArray } from "app/lib/consts"
import { Plus } from "lucide-react"
import Link from "next/link"
import { getProducts } from "../_actions/productAction"
import { ProductsClientContent } from "./ProductsContent"

function ProductsLoadingSkeleton() {
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

export default function ProductsPage() {
  return (
    <div className="space-y-6 p-6">
      {/* Header */}
      <div className="flex flex-col space-y-4 sm:flex-row sm:items-center sm:justify-between sm:space-y-0">
        <div className="space-y-1">
          <h1 className="text-3xl font-bold tracking-tight">Products</h1>
          <p className="text-muted-foreground">
            Manage your product catalog </p>
        </div>
        <Button asChild className="w-fit">
          <Link href="/admin/add-product">
            <Plus className="mr-2 h-4 w-4" />
            Add Product
          </Link>
        </Button>
      </div>

      {/* Category Navigation */}
      <div className="flex items-center space-x-2 overflow-x-auto pb-2">
        {CategoryArray.map((categoryName) => (
          <Button
            asChild
            key={categoryName}
            variant="ghost"
            size="sm"
            className="whitespace-nowrap capitalize transition-colors hover:bg-primary/10"
          >
            <Link href={`/admin/products/${categoryName.toLowerCase()}`}>
              {categoryName.toLowerCase()}
            </Link>
          </Button>
        ))}
      </div>
        <div>
          <Suspense fallback={<ProductsLoadingSkeleton />}>
            <ProductsContent />
          </Suspense>
        </div>
    </div>
  )
}




async function ProductsContent() {
  const result = await getProducts()
  
  if (!result.success) {
    return (
      <div className="flex flex-col items-center justify-center py-12 space-y-4 p-6">
        <div className="text-center space-y-2">
          <h3 className="text-lg font-semibold">Failed to load products</h3>
          <p className="text-muted-foreground max-w-md">{result.error}</p>
        </div>
        <TryAgainButton />
      </div>
    )
  }

  const products = result.data || []
  console.log(JSON.stringify(products, null, 2))
  return (
    <ProductsClientContent products={products} />
  )
}

export { ProductsContent }




