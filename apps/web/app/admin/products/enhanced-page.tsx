'use client';
import { Badge } from "@repo/ui/components/ui/badge";
import { Button } from "@repo/ui/components/ui/button";
import AdminActionButton from "@repo/ui/components/admin/AdminActionButton";
import AdminPagination from "@repo/ui/components/admin/AdminPagination";
import AdminSearchBar from "@repo/ui/components/admin/AdminSearchBar";
import AdminTable from "@repo/ui/components/admin/AdminTable";
import { Plus } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { getBrands } from "../_actions/brandAction";
import { getCategories } from "../_actions/categoryAction";
import { getProducts } from "../_actions/productAction";
import TryAgainButton from "app/components/try-again-button";
import { Prisma } from "@repo/database/index";

interface EnhancedProductsPageProps {
  searchParams: any;
}

interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  stock: number;
  categoryType: string;
  createdAt: Date;
  brand: {
    name: string;
  };
  images: Array<{
    id: number;
    url: string;
  }>;
  category: Array<{
    id: number;
    name: string;
  }>;
}

// Loading skeleton component
function ProductsLoadingSkeleton() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="space-y-2">
          <div className="h-8 w-48 bg-muted animate-pulse rounded" />
          <div className="h-4 w-96 bg-muted animate-pulse rounded" />
        </div>
        <div className="h-10 w-32 bg-muted animate-pulse rounded" />
      </div>
      
      <div className="space-y-4">
        <div className="h-12 w-full bg-muted animate-pulse rounded" />
        <div className="h-64 w-full bg-muted animate-pulse rounded" />
      </div>
    </div>
  );
}

// Error component
function ProductsError({ error, onRetry }: { error: string; onRetry: () => void }) {
  return (
    <div className="flex flex-col items-center justify-center py-12 space-y-4">
      <div className="text-center space-y-2">
        <h3 className="text-lg font-semibold">Failed to load products</h3>
        <p className="text-muted-foreground max-w-md">{error}</p>
      </div>
      <TryAgainButton/>
    </div>
  );
}

// Main component
export default async function EnhancedProductsPage({ 
  searchParams 
}: EnhancedProductsPageProps) {
  const page = Number(searchParams.page) || 1;
  const pageSize = Number(searchParams.pageSize) || 10;
  const search = searchParams.search || "";
  const categoryType = searchParams.categoryType || "";
  const brandId = searchParams.brandId ? Number(searchParams.brandId) : undefined;
  const sortBy = searchParams.sortBy || "createdAt";
  const sortOrder = (searchParams.sortOrder as "asc" | "desc") || "desc";

  // Fetch data in parallel
  const [productsResult, brandsResult, categoriesResult] = await Promise.all([
    getProducts({
      page,
      pageSize,
      search,
      categoryType: categoryType as any,
      brandId,
      sortBy: sortBy as any,
      sortOrder
    }),
    getBrands(),
    getCategories()
  ]);
  type BrandWithImages = Prisma.BrandGetPayload<{
    include: { 
      logoImage: true, 
      BannerImage: true, 
      brandImage: true,
      _count: {
        select: { products: true }
      }
    },
  }>
  // Handle errors
  if (!productsResult.success) {
    return (
      <ProductsError 
        error={productsResult.error||"Something went wrong"} 
        onRetry={() => window.location.reload()} 
      />
    );
  }

  const { data: products, pagination } = productsResult;

  // Define table columns
  const columns = [
    {
      key: "image" as keyof Product,
      header: "Image",
      cell: (product: Product) => (
        <div className="relative w-16 h-16 rounded-lg overflow-hidden bg-muted">
          {product.images[0] ? (
            <Image
              src={product.images[0].url}
              alt={product.name}
              fill
              className="object-cover transition-transform duration-200 hover:scale-105"
            />
          ) : (
            <div className="w-full h-full bg-muted flex items-center justify-center">
              <span className="text-xs text-muted-foreground">No image</span>
            </div>
          )}
        </div>
      ),
      className: "w-20"
    },
    {
      key: "name" as keyof Product,
      header: "Product",
      cell: (product: Product) => (
        <div className="space-y-1">
          <p className="font-medium">{product.name}</p>
          <p className="text-sm text-muted-foreground line-clamp-2">
            {product.description}
          </p>
          <div className="flex items-center space-x-2">
            <Badge variant="outline" className="text-xs">
              {product.brand.name}
            </Badge>
            {product.category.map((cat) => (
              <Badge key={cat.id} variant="secondary" className="text-xs">
                {cat.name}
              </Badge>
            ))}
          </div>
        </div>
      ),
      className: "min-w-64"
    },
    {
      key: "categoryType" as keyof Product,
      header: "Type",
      cell: (product: Product) => (
        <Badge variant="outline" className="uppercase">
          {product.categoryType}
        </Badge>
      ),
      className: "w-24"
    },
    {
      key: "price" as keyof Product,
      header: "Price",
      cell: (product: Product) => (
        <div className="text-right">
          <p className="font-semibold">${product.price.toFixed(2)}</p>
        </div>
      ),
      className: "w-24 text-right"
    },
    {
      key: "stock" as keyof Product,
      header: "Stock",
      cell: (product: Product) => (
        <div className="text-center">
          <Badge 
            variant={product.stock > 10 ? "default" : product.stock > 0 ? "secondary" : "destructive"}
            className="w-fit"
          >
            {product.stock}
          </Badge>
        </div>
      ),
      className: "w-20 text-center"
    },
    {
      key: "actions" as keyof Product,
      header: "Actions",
      cell: (product: Product) => (
        <AdminActionButton
          onEdit={() => console.log("Edit product", product.id)}
          onDelete={() => console.log("Delete product", product.id)}
          onView={() => console.log("View product", product.id)}
        />
      ),
      className: "w-20"
    }
  ];

  // Filter options
  const filterOptions = [
    {
      key: "categoryType",
      label: "Category Type",
      options: [
        { value: "CLOTHING", label: "Clothing" },
        { value: "FOOTWEAR", label: "Footwear" },
        { value: "ACCESSORY", label: "Accessory" },
        { value: "BAG", label: "Bag" },
        { value: "OUTERWEAR", label: "Outerwear" },
        { value: "WATCH", label: "Watch" },
        { value: "UNDERWEAR", label: "Underwear" }
      ]
    },
    {
      key: "brandId",
      label: "Brand",
      options: brandsResult?.data?.map(brand => ({
        value: brand.id.toString(),
        label: brand.name
      })) || []
    }    
  ];

  return (
    <div className="space-y-6 p-6">
      {/* Header */}
      <div className="flex flex-col space-y-4 sm:flex-row sm:items-center sm:justify-between sm:space-y-0">
        <div className="space-y-1">
          <h1 className="text-3xl font-bold tracking-tight">Products</h1>
          <p className="text-muted-foreground">
            Manage your product catalog with ease
          </p>
        </div>
        <Button asChild className="w-fit">
          <Link href="/admin/add-product">
            <Plus className="mr-2 h-4 w-4" />
            Add Product
          </Link>
        </Button>
      </div>

      {/* Search and Filters */}
      <AdminSearchBar
        onSearch={(searchTerm) => {
          const params = new URLSearchParams(searchParams);
          if (searchTerm) {
            params.set("search", searchTerm);
          } else {
            params.delete("search");
          }
          params.set("page", "1"); // Reset to first page
          window.location.href = `?${params.toString()}`;
        }}
        onFilterChange={(filters) => {
          const params = new URLSearchParams(searchParams);
          Object.entries(filters).forEach(([key, value]) => {
            if (value) {
              params.set(key, value);
            } else {
              params.delete(key);
            }
          });
          params.set("page", "1"); // Reset to first page
          window.location.href = `?${params.toString()}`;
        }}
        placeholder="Search products..."
        filters={filterOptions||[]}
      />

      {/* Products Table */}
      <AdminTable
        data={products||[]}
        columns={columns}
        cardTitle="Products"
        cardDescription="Your complete product catalog"
        emptyMessage="No products found. Create your first product to get started."
      />

      {/* Pagination */}
      {pagination && pagination.totalPages > 1 && (
        <AdminPagination
          currentPage={pagination.currentPage}
          totalPages={pagination.totalPages}
          totalCount={pagination.totalCount}
          pageSize={pagination.pageSize}
          onPageChange={(page) => {
            const params = new URLSearchParams(searchParams);
            params.set("page", page.toString());
            window.location.href = `?${params.toString()}`;
          }}
          onPageSizeChange={(pageSize) => {
            const params = new URLSearchParams(searchParams);
            params.set("pageSize", pageSize.toString());
            params.set("page", "1"); // Reset to first page
            window.location.href = `?${params.toString()}`;
          }}
        />
      )}
    </div>
  );
}
