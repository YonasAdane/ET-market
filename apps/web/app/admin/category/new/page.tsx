"use client";

import { Card, CardHeader, CardTitle, CardContent } from "@repo/ui/components/ui/card";
import { CategoryWizard } from "@/admin/category/new/components/category-wizard";

export default function NewCategoryPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-10">
      <Card className="bg-card text-card-foreground shadow-sm rounded-lg border">
        <CardHeader>
          <CardTitle className="text-2xl font-bold">Create New Category</CardTitle>
        </CardHeader>
        <CardContent>
          <CategoryWizard />
        </CardContent>
      </Card>
    </div>
  );
}