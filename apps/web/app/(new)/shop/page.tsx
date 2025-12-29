import { Suspense } from "react";
// import { searchParamsCache } from "../categories/validation";
import { ProductGrid } from "./_components/product-grid";
import { SidebarFilters } from "./_components/sidebar-filters";
import { Alert, AlertDescription } from "@repo/ui/components/ui/alert";
import { Pagination } from "../categories/_components/pagination";
import { ProductGridSkeleton } from "@/collections/_components/ProductGrid";
import { getProducts } from "./actions";
import { searchParamsCache } from "./search-params";
import { SortControls } from "./_components/sort-controls";
// import { getProducts } from "../categories/action";

export default async function ShopPage({ searchParams }: { searchParams: Promise<any> }) {
  // nuqs handles parsing and validation of URL params based on your schema
  const filters = searchParamsCache.parse(await searchParams);
  
  // Real Prisma database call via Server Action
  const { data, total, error } = await getProducts(filters);

  return (
    <div className="max-w-[1440px] mx-auto w-full px-6 py-10">
      <div className="flex flex-col lg:flex-row gap-8">
        <SidebarFilters />
        
        <main className="flex-1">
					<SortControls totalResults={total} />
          {error ? (
            <Alert variant="destructive" className="mb-6">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          ) : (
            <Suspense key={JSON.stringify(filters)} fallback={<ProductGridSkeleton />}>
              <>
								{/* <SortControls  */}
								<ProductGrid products={data} />
								<Pagination itemsPerPage={filters.limit} totalItems={total} />
							</>
            </Suspense>
          )}
        </main>
      </div>
    </div>
  );
}