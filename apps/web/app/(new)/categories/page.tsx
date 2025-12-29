// src/app/shop/page.tsx
import { Alert, AlertDescription } from "@repo/ui/components/ui/alert";
import { Suspense } from "react";
import ProductGrid from "./_components/product-grid";
import SidebarFilters from "./_components/sidebar-filters";
import { ProductSkeleton } from "./_components/skeletons";
import { getProducts } from "./action";
import { searchParamsCache } from "./validation";
// apps/web/app/(new)/categories/page.tsx

// Components
import { Pagination } from "./_components/pagination";
import { SortControls } from "./_components/sort-controls";
import { SearchInput } from "./_components/search-input";

export default async function CategoriesPage({ 
  searchParams 
}: { 
  searchParams: Promise<any> // Next.js 15 searchParams is a Promise
}) {
  // 1. Parse and validate URL params
  const resolvedParams = await searchParams;
  const params = searchParamsCache.parse(resolvedParams);

  // 2. Fetch data via Server Action
  const { data, total, error } = await getProducts(params);

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <header className="sticky top-0 z-50 bg-white border-b px-6 py-3">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
            <h2 className="text-xl font-bold text-primary">TechStore</h2>
            <SearchInput defaultValue={params.q} />
            {/* <div className="flex gap-4"> 
               </div> */}
        </div>
      </header>
      <main className="flex-1 max-w-7xl mx-auto w-full px-4 md:px-6 py-6 lg:py-8 flex flex-col lg:flex-row gap-8">
        {/* Sidebar - Always visible */}
        <aside className="w-full lg:w-64 shrink-0">
          <SidebarFilters />
        </aside>

        <main className="flex-1 min-w-0">
          {/* Error Handling (Displayed within the layout as requested) */}
          {error ? (
            <Alert variant="destructive" className="mb-6">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          ) : (
            <>
              {/* Sort & View Controls */}
              <SortControls total={total} />

              {/* Product Grid with Loading State */}
              <Suspense key={JSON.stringify(params)} fallback={<ProductSkeleton />}>
                <ProductGrid products={data} total={total} />
                
                {/* Pagination */}
                <Pagination 
                  totalItems={total} 
                  itemsPerPage={params.limit} 
                />
              </Suspense>

              {/* Empty State */}
              {data.length === 0 && !error && (
                <div className="text-center py-20 bg-muted/30 rounded-xl">
                  <p className="text-muted-foreground">No products found matching your criteria.</p>
                </div>
              )}
            </>
          )}
        </main>
      </main>
      </div>
  );
}