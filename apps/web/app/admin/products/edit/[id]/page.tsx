import React from "react";
import { notFound } from "next/navigation";
import { getProductById } from "../../../_actions/productAction";
import { getBrands } from "../../../_actions/brandAction";
import { getCategories } from "../../../_actions/categoryAction";
import { Card, CardContent, CardHeader, CardTitle } from "@repo/ui/components/ui/card";
import { Button } from "@repo/ui/components/ui/button";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import EditProductForm from "./EditProductForm";

interface EditProductPageProps {
  params: {
    id: string;
  };
}

export default async function EditProductPage({ params }: EditProductPageProps) {
  const productId = parseInt(params.id);
  
  if (isNaN(productId)) {
    notFound();
  }

  // Fetch data in parallel
  const [productResult, brandsResult, categoriesResult] = await Promise.all([
    getProductById(productId),
    getBrands(),
    getCategories()
  ]);

  if (!productResult.success) {
    return (
      <div className="flex flex-col items-center justify-center py-12 space-y-4">
        <div className="text-center space-y-2">
          <h3 className="text-lg font-semibold">Product not found</h3>
          <p className="text-muted-foreground max-w-md">
            The product you're looking for doesn't exist or has been removed.
          </p>
        </div>
        <Button asChild variant="outline">
          <Link href="/admin/products">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Products
          </Link>
        </Button>
      </div>
    );
  }

  const product = productResult.data;

  return (
    <div className="space-y-6 p-6">
      {/* Header */}
      <div className="flex items-center space-x-4">
        <Button asChild variant="ghost" size="sm">
          <Link href="/admin/products">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Products
          </Link>
        </Button>
        <div className="space-y-1">
          <h1 className="text-3xl font-bold tracking-tight">Edit Product</h1>
          <p className="text-muted-foreground">
            Update product information and settings
          </p>
        </div>
      </div>

      {/* Edit Form */}
      <Card className="max-w-4xl">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <span>Edit "{product.name}"</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <EditProductForm
            product={product}
            brands={brandsResult}
            categories={categoriesResult}
          />
        </CardContent>
      </Card>
    </div>
  );
}
