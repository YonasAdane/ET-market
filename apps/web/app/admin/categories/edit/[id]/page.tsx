import React from "react";
import { notFound } from "next/navigation";
import { getCategoryById } from "../../../_actions/categoryAction";
import { Card, CardContent, CardHeader, CardTitle } from "@repo/ui/components/ui/card";
import { Button } from "@repo/ui/components/ui/button";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import EditCategoryForm from "./EditCategoryForm";

interface EditCategoryPageProps {
  params: {
    id: string;
  };
}

export default async function EditCategoryPage({ params }: EditCategoryPageProps) {
  const categoryId = parseInt(params.id);
  
  if (isNaN(categoryId)) {
    notFound();
  }

  const categoryResult = await getCategoryById(categoryId);

  if (!categoryResult.success) {
    return (
      <div className="flex flex-col items-center justify-center py-12 space-y-4">
        <div className="text-center space-y-2">
          <h3 className="text-lg font-semibold">Category not found</h3>
          <p className="text-muted-foreground max-w-md">
            The category you're looking for doesn't exist or has been removed.
          </p>
        </div>
        <Button asChild variant="outline">
          <Link href="/admin/categories">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Categories
          </Link>
        </Button>
      </div>
    );
  }

  const category = categoryResult.data;

  return (
    <div className="space-y-6 p-6">
      {/* Header */}
      <div className="flex items-center space-x-4">
        <Button asChild variant="ghost" size="sm">
          <Link href="/admin/categories">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Categories
          </Link>
        </Button>
        <div className="space-y-1">
          <h1 className="text-3xl font-bold tracking-tight">Edit Category</h1>
          <p className="text-muted-foreground">
            Update category information and images
          </p>
        </div>
      </div>

      {/* Edit Form */}
      <Card className="max-w-4xl">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <span>Edit "{category.name}"</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <EditCategoryForm category={category} />
        </CardContent>
      </Card>
    </div>
  );
}
