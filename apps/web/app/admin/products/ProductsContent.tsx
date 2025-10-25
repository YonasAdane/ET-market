<<<<<<< HEAD
"use client"
import { Badge } from "@/components/ui/badge"
import AdminActionButton from "@repo/ui/components/admin/AdminActionButton"
import AdminSearchBar from "@repo/ui/components/admin/AdminSearchBar"
import AdminTable from "@repo/ui/components/admin/AdminTable"
import { CategoryArray } from "app/lib/consts"
import Image from "next/image"
import { useMemo } from "react"
import { deleteProduct } from "../_actions/productAction"
import { useToast } from "@/hooks/use-toast"
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
=======
'use client'

import { useEffect, useState } from "react"
import { Plus } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { CategoryArray } from "app/lib/consts"
import AdminTable from "@repo/ui/components/admin/AdminTable"
import AdminSearchBar from "@repo/ui/components/admin/AdminSearchBar"
import AdminActionButton from "@repo/ui/components/admin/AdminActionButton"
import { getProducts } from "../_actions/productAction"
import TryAgainButton from "app/components/try-again-button"

export function ProductsContent() {
  const [products, setProducts] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // Load data client-side to avoid handler errors
  useEffect(() => {
    async function load() {
      const result = await getProducts()
      if (result.success) setProducts(result.data||[])
      else setError(result.error || "Failed to load products")
      setLoading(false)
    }
    load()
  }, []);

  if (loading) return <p>Loading products...</p>

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center py-12 space-y-4">
        <div className="text-center space-y-2">
          <h3 className="text-lg font-semibold">Failed to load products</h3>
          <p className="text-muted-foreground max-w-md">{error}</p>
        </div>
        <TryAgainButton/>
      </div>
    )
  }

  // Define table columns
  const columns = [
    {
      key: "image",
      header: "Image",
      cell: (product: any) => (
        <div className="relative w-16 h-16 rounded-lg overflow-hidden bg-muted">
          {product.images?.[0] ? (
>>>>>>> 352d9d8e773d213e19842bf445d5e00ccc67a7e7
            <Image
              src={product.images[0].url}
              alt={product.name}
              fill
              className="object-cover transition-transform duration-200 hover:scale-105"
<<<<<<< HEAD
              sizes="64px"
=======
>>>>>>> 352d9d8e773d213e19842bf445d5e00ccc67a7e7
            />
          ) : (
            <div className="w-full h-full bg-muted flex items-center justify-center">
              <span className="text-xs text-muted-foreground">No image</span>
            </div>
          )}
        </div>
      ),
      className: "w-20",
<<<<<<< HEAD
      sortable: false,
=======
>>>>>>> 352d9d8e773d213e19842bf445d5e00ccc67a7e7
    },
    {
      key: "name",
      header: "Product",
<<<<<<< HEAD
      cell: (value: any, product: any) => (
        <div className="space-y-1">
          <p className="font-medium line-clamp-1">{product.name}</p>
=======
      cell: (product: any) => (
        <div className="space-y-1">
          <p className="font-medium">{product.name}</p>
>>>>>>> 352d9d8e773d213e19842bf445d5e00ccc67a7e7
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
<<<<<<< HEAD
      sortable: true,
=======
>>>>>>> 352d9d8e773d213e19842bf445d5e00ccc67a7e7
    },
    {
      key: "categoryType",
      header: "Type",
<<<<<<< HEAD
      cell: (value: any, product: any) => (
=======
      cell: (product: any) => (
>>>>>>> 352d9d8e773d213e19842bf445d5e00ccc67a7e7
        <Badge variant="outline" className="uppercase">
          {product.categoryType}
        </Badge>
      ),
      className: "w-24",
<<<<<<< HEAD
      sortable: true,
=======
>>>>>>> 352d9d8e773d213e19842bf445d5e00ccc67a7e7
    },
    {
      key: "price",
      header: "Price",
<<<<<<< HEAD
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
=======
      cell: (product: any) => (
        <div className="text-right">
          <p className="font-semibold">${product.price.toFixed(2)}</p>
        </div>
      ),
      className: "w-24 text-right",
>>>>>>> 352d9d8e773d213e19842bf445d5e00ccc67a7e7
    },
    {
      key: "stock",
      header: "Stock",
<<<<<<< HEAD
      cell: (value: any, product: any) => (
=======
      cell: (product: any) => (
>>>>>>> 352d9d8e773d213e19842bf445d5e00ccc67a7e7
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
<<<<<<< HEAD
      sortable: true,
=======
>>>>>>> 352d9d8e773d213e19842bf445d5e00ccc67a7e7
    },
    {
      key: "actions",
      header: "Actions",
<<<<<<< HEAD
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
=======
      cell: (product: any) => (
        <AdminActionButton
          onEdit={() => (window.location.href = `/admin/products/edit/${product.id}`)}
          onDelete={async () => {
            if (confirm(`Are you sure you want to delete "${product.name}"?`)) {
              const res = await fetch(`/api/admin/products/${product.id}`, { method: "DELETE" })
              if (res.ok) window.location.reload()
              else alert("Failed to delete product")
            }
          }}
          onView={() => (window.location.href = `/products/${product.id}`)}
        />
      ),
      className: "w-20",
    },
  ]
>>>>>>> 352d9d8e773d213e19842bf445d5e00ccc67a7e7

  const filterOptions = [
    {
      key: "categoryType",
      label: "Category Type",
      options: CategoryArray.map((cat) => ({
        value: cat.toUpperCase(),
        label: cat.charAt(0).toUpperCase() + cat.slice(1),
      })),
    },
<<<<<<< HEAD
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
=======
  ]

  return (
    <div className="space-y-6 p-6">
      {/* Header */}
      <div className="flex flex-col space-y-4 sm:flex-row sm:items-center sm:justify-between sm:space-y-0">
        <div className="space-y-1">
          <h1 className="text-3xl font-bold tracking-tight">Products</h1>
          <p className="text-muted-foreground">Manage your product catalog with ease</p>
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

      {/* Search and Filters */}
      <AdminSearchBar
        onSearch={(searchTerm) => console.log("Search:", searchTerm)}
        onFilterChange={(filters) => console.log("Filters:", filters)}
        placeholder="Search products..."
        filters={filterOptions}
      />

      {/* Products Table */}
      <AdminTable
        data={products}
        columns={columns}
        cardTitle="Products"
        cardDescription="Your complete product catalog"
        emptyMessage="No products found. Create your first product to get started."
      />
    </div>
  )
}
>>>>>>> 352d9d8e773d213e19842bf445d5e00ccc67a7e7
