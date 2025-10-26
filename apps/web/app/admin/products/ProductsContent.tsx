"use client"
import { Badge } from "@repo/ui/components/ui/badge"
import AdminActionButton from "@repo/ui/components/admin/AdminActionButton"
import AdminSearchBar from "@repo/ui/components/admin/AdminSearchBar"
import AdminTable from "@repo/ui/components/admin/AdminTable"
import { CategoryArray } from "app/lib/consts"
import Image from "next/image"
import { useMemo } from "react"
import { deleteProduct } from "../_actions/productAction"
import { useToast } from "@repo/ui/hooks/use-toast"
import { getErrorMessage } from "app/lib/get-error-message"

function ProductsClientContent({products}: {products?: any}) {
  console.log({products})
  const {toast}=useToast();
  const columns = useMemo(() => [
    {
      key: "image",
      header: "Image",
      cell: (value: any, product: any) => (
        <div className="relative w-16 h-16 rounded-lg overflow-hidden bg-muted">
          {product?.images?.[0] ? (
            <Image
              src={product.images[0].url}
              alt={product.name}
              fill
              className="object-cover transition-transform duration-200 hover:scale-105"
              sizes="64px"
            />
          ) : (
            <div className="w-full h-full bg-muted flex items-center justify-center">
              <span className="text-xs text-muted-foreground">No image</span>
            </div>
          )}
        </div>
      ),
      className: "w-20",
      sortable: false,
    },
    {
      key: "name",
      header: "Product",
      cell: (value: any, product: any) => (
        <div className="space-y-1">
          <p className="font-medium line-clamp-1">{product.name}</p>
          <p className="text-sm text-muted-foreground line-clamp-2">{product.description}</p>
          <div className="flex items-center space-x-2">
            <Badge variant="outline" className="text-xs">
              {product.brand?.name || "No brand"}
            </Badge>
            {product.category?.map((cat: any) => (
              <Badge key={cat.id} variant="secondary" className="text-xs">
                {cat.name}
              </Badge>
            ))}
          </div>
        </div>
      ),
      className: "min-w-64",
      sortable: true,
    },
    {
      key: "categoryType",
      header: "Type",
      cell: (value: any, product: any) => (
        <Badge variant="outline" className="uppercase">
          {product.categoryType}
        </Badge>
      ),
      className: "w-24",
      sortable: true,
    },
    {
      key: "price",
      header: "Price",
      cell: (value: any, product: any) => (
        <div className="text-right">
          <p className="font-semibold">${product.price?.toFixed(2)}</p>
          {product.prevprice > product.price && (
            <p className="text-sm text-muted-foreground line-through">
              ${product.prevprice?.toFixed(2)}
            </p>
          )}
        </div>
      ),
      className: "w-24 text-right",
      sortable: true,
    },
    {
      key: "stock",
      header: "Stock",
      cell: (value: any, product: any) => (
        <div className="text-center">
          <Badge
            variant={
              product.stock > 10
                ? "default"
                : product.stock > 0
                ? "secondary"
                : "destructive"
            }
            className="w-fit"
          >
            {product.stock}
          </Badge>
        </div>
      ),
      className: "w-20 text-center",
      sortable: true,
    },
    {
      key: "actions",
      header: "Actions",
      cell: (value: any, product: any) =>{
        const { id, name } = product;
        return(
        <AdminActionButton
          onEdit={() => (window.location.href = `/admin/products/edit/${product.id}`)}
          onDelete={async () => {
              try {
                const res = await deleteProduct(id);
                if(res.error){
                  throw new Error(res.error);
                }
                toast({title:"sucess",description:"Brand deleted successfully"});
              } catch (err){
                toast({variant:"destructive",title:"error",description:getErrorMessage(err)});
              }
            }}
          // onDelete={() => {
          //   if (confirm(`Are you sure you want to delete "${product.name}"?`)) {
              
          //   }
          // }}
          onView={() => (window.location.href = `/products/${product.id}`)}
        />
      )},
      className: "w-20",
      sortable: false,
    },
  ], [])

  const filterOptions = [
    {
      key: "categoryType",
      label: "Category Type",
      options: CategoryArray.map((cat) => ({
        value: cat.toUpperCase(),
        label: cat.charAt(0).toUpperCase() + cat.slice(1),
      })),
    },
    {
      key: "stockStatus",
      label: "Stock Status",
      options: [
        { value: "in_stock", label: "In Stock" },
        { value: "low_stock", label: "Low Stock" },
        { value: "out_of_stock", label: "Out of Stock" },
      ],
    },
  ]

  return (
      <div className="space-y-4">
        {/* Search and Filters */}
        <AdminSearchBar
          onSearch={(searchTerm) => console.log("Search:", searchTerm)}
          onFilterChange={(filters) => console.log("Filters:", filters)}
          placeholder="Search products by name, brand, or description..."
          filters={filterOptions}
        />

        {/* Products Table */}
        <AdminTable
          data={products || []}
          columns={columns}
          cardTitle="Products"
          cardDescription={`Your complete product catalog - ${products?.length || 0} items`}
          emptyMessage="No products found. Create your first product to get started."
        />
      </div>
  )
}

export { ProductsClientContent }
