import { Button } from "@repo/ui/components/ui/button";
import { Skeleton } from "@repo/ui/components/ui/skeleton";
import TryAgainButton from "app/components/try-again-button";
import { Plus } from "lucide-react";
import Link from "next/link";
import { Suspense } from "react";
import { getCategories } from "../_actions/categoryAction";
import AddCategoryForm from "../_components/form-elements/add-category";
import CategoriesTableClient from "./CategoriesTableClient";

// Loading skeleton component
function CategoriesLoadingSkeleton() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="space-y-2">
          <Skeleton className="h-8 w-48" />
          <Skeleton className="h-4 w-96" />
        </div>
        <Skeleton className="h-10 w-32" />
      </div>
      
      <div className="space-y-4">
        <Skeleton className="h-12 w-full" />
        <Skeleton className="h-64 w-full" />
      </div>
    </div>
  );
}

export default async function CategoriesPage() {
  return (
    <Suspense fallback={<CategoriesLoadingSkeleton />}>
      <CategoriesContent />
    </Suspense>
  );
}

async function CategoriesContent() {
  const result = await getCategories();
  
  if (!result.success) {
    return (
      <div className="flex flex-col items-center justify-center py-12 space-y-4">
        <div className="text-center space-y-2">
          <h3 className="text-lg font-semibold">Failed to load categories</h3>
          <p className="text-muted-foreground max-w-md">{result.error}</p>
        </div>
        <TryAgainButton/>
      </div>
    );
  }

  const { data: categories } = result;

  return (
    <div className="space-y-6 p-6">
      {/* Header */}
      <div className="flex flex-col space-y-4 sm:flex-row sm:items-center sm:justify-between sm:space-y-0">
        <div className="space-y-1">
          <h1 className="text-3xl font-bold tracking-tight">Categories</h1>
          <p className="text-muted-foreground">
            Manage your product categories and organization
          </p>
        </div>
        <Button asChild className="w-fit">
          <Link href="/admin/add-category">
            <Plus className="mr-2 h-4 w-4" />
            Add Category
          </Link>
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-6 gap-6">
        {/* Categories Table */}
        <div className="lg:col-span-4">
          <CategoriesTableClient categories={categories||[]} />

        </div>

        {/* Add Category Form */}
        <div className="lg:col-span-2">
          <div className="sticky top-6">
            <h3 className="text-lg font-semibold mb-4">Add New Category</h3>
            <AddCategoryForm />
          </div>
        </div>
      </div>
    </div>
  );
}
