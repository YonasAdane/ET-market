"use client";

import { Plus } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@repo/ui/components/ui/button";
import { Badge } from "@repo/ui/components/ui/badge";
import TryAgainButton from "app/components/try-again-button";
import CreateBrandForm from "../_components/form-elements/add-brand";
import AdminTable, { AdminColumnDef } from "@repo/ui/components/admin/AdminTable";
import AdminActionButton from "@repo/ui/components/admin/AdminActionButton";
import { Prisma } from "@repo/database/index";
import { Skeleton } from "@repo/ui/components/ui/skeleton";
import { useRouter } from "next/navigation";
import { deleteBrand } from "../_actions/brandAction";
import { useToast } from "@repo/ui/hooks/use-toast";
import { getErrorMessage } from "app/lib/get-error-message";

interface BrandsContentProps {
  result: Awaited<ReturnType<typeof import("../_actions/brandAction").getBrands>>;
}

export default function BrandsContent({ result }: BrandsContentProps) {
  const router = useRouter();
  const {toast}=useToast();
  // type BrandWithCount = Prisma.BrandGetPayload<{
  //   include: {
  //     logoImage: true;
  //     BannerImage: true;
  //     brandImage: true;
  //     _count: { select: { products: true } };
  //   };
  // }>;

  if (!result.success) {
    return (
      <div className="flex flex-col items-center justify-center py-12 space-y-4">
        <div className="text-center space-y-2">
          <h3 className="text-lg font-semibold">Failed to load brands</h3>
          <p className="text-muted-foreground max-w-md">{result.error}</p>
        </div>
        <TryAgainButton />
      </div>
    );
  }

  const { data: brands } = result;

  console.log({ brands });
  const columns: AdminColumnDef<any>[] = [
    {
      key: "logo",
      header: "Logo",
      cell: (value, item) => { // Use the original signature
        if (!item) return null;
        const { logoImage, name } = item;
        return (
          <div className="relative w-12 h-12 rounded-lg overflow-hidden bg-muted flex items-center justify-center">
            {logoImage ? (
              <Image
                src={logoImage.url}
                alt={`${name} logo`}
                fill
                className="object-contain transition-transform duration-200 hover:scale-105"
              />
            ) : (
              <span className="text-xs text-muted-foreground">No logo</span>
            )}
          </div>
        );
      },
    },
    {
      key: "name",
      header: "Brand",
      cell: (value, item) => { // Use the original signature
        if (!item) return null;
        const { name, description, _count } = item;
        return (
          <div className="space-y-1">
            <p className="font-medium">{name}</p>
            <p className="text-sm text-muted-foreground line-clamp-2">
              {description || "No description"}
            </p>
            <Badge variant="outline" className="text-xs">
              {_count.products} products
            </Badge>
          </div>
        );
      },
    },
    {
      key: "images",
      header: "Images",
      cell: (value, item) => { // Use the original signature
        if (!item) return null;
        const { BannerImage, brandImage } = item;
        return (
          <div className="flex items-center space-x-2">
            <Badge variant="secondary" className="text-xs">
              {BannerImage.length} banners
            </Badge>
            <Badge variant="secondary" className="text-xs">
              {brandImage.length} brand
            </Badge>
          </div>
        );
      },
    },
    {
      key: "actions",
      header: "Actions",
      cell: (value, item) => { // Use the original signature
        if (!item) return null;
        const { id, name } = item;
        return (
          <AdminActionButton
            onEdit={() => {
              router.push(`/admin/brands/edit/${id}`);
              // window.location.href = `/admin/brands/edit/${id}`;
            }}
            onDelete={async () => {
              try {
                const res = await deleteBrand(id);
                if(res.error){
                  throw new Error(res.error);
                }
                toast({title:"sucess",description:"Brand deleted successfully"});
              } catch (err){
                toast({variant:"destructive",title:"error",description:getErrorMessage(err)});
              }
            }}
            onView={() => console.log("View brand", id)}
          />
        );
      },
    },
  ];

  return (
    <div className="space-y-6 p-6">
      {/* Header */}
      <div className="flex flex-col space-y-4 sm:flex-row sm:items-center sm:justify-between sm:space-y-0">
        <div className="space-y-1">
          <h1 className="text-3xl font-bold tracking-tight">Brands</h1>
          <p className="text-muted-foreground">
            Manage your brand portfolio and images
          </p>
        </div>
        <Button asChild className="w-fit">
          <Link href="/admin/add-brand">
            <Plus className="mr-2 h-4 w-4" />
            Add Brand
          </Link>
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Brands Table */}
        <div className="lg:col-span-3">
          <AdminTable
            data={brands || []}
            columns={columns}
            cardTitle="Brands"
            cardDescription="Your brand portfolio"
            emptyMessage="No brands found. Create your first brand to get started."
          />
        </div>

        {/* Add Brand Form */}
        <div className="lg:col-span-1">
          <div className="sticky top-6">
            <h3 className="text-lg font-semibold mb-4">Add New Brand</h3>
            <CreateBrandForm />
          </div>
        </div>
      </div>
    </div>
  );
}

export function BrandsLoadingSkeleton() {
  return (
    <div className="space-y-6 p-8">
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