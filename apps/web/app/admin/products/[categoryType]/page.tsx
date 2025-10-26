
import TryAgainButton from "app/components/try-again-button"
import { CategoryArray } from "app/lib/consts"
import { getProducts } from "../../_actions/productAction"
import { ProductsClientContent } from "../ProductsContent"
import { CategoryType } from "app/lib/types"

// export default async function AdminProductsPage({categoryType}:{categoryType:string}) {

interface ProductPageProps {
  params: {
    categoryType: string;
  };
}
export function generateStaticParams(){
  return CategoryArray.map(item=>item.toLowerCase())
}


export default async function ProductsCategoryPage({ params }: { params: Promise<{ categoryType: string }> }) {
  const categoryType = (await params).categoryType
  const result = await getProducts({
      page :1,
      pageSize : 10,
      search : '',
      categoryType: categoryType.toUpperCase() as CategoryType,
    })
  
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

export { ProductsCategoryPage }




