"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useRouter } from "next/navigation";
import { useToast } from "@/hooks/use-toast";
import { updateBrand, getBrandById } from "app/admin/_actions/brandAction";
import { UploadSingleImage,UploadMultipleImage, SortableImageUpload } from "app/admin/_components/uploadImages"; 
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "app/components/form";
import { Check, ArrowLeft } from "lucide-react";
import { Spinner } from "app/admin/_components/spinnerLoader"; 
import { useEffect, useState } from "react";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";
import { cn } from "@/lib/utils";

/* -------------------------------------------------
   Schema for editing (similar to create but all fields optional except name)
-------------------------------------------------- */
const MAX_FILE_SIZE = 5_000_000;
const ACCEPTED_TYPES = ["image/jpeg", "image/jpg", "image/png", "image/webp"];

const file = () =>
  z
    .instanceof(File)
    .refine((f) => f.size <= MAX_FILE_SIZE, "Max 5 MB")
    .refine((f) => ACCEPTED_TYPES.includes(f.type), "Unsupported format")
    .optional();

const editSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters").max(100),
  description: z.string().optional(),
  BannerImage: z.array(file()).optional().default([]),
  brandImage: z.array(file()).optional().default([]),
  logoImage: file(),
});

type EditBrandType = z.infer<typeof editSchema>;

interface EditBrandFormProps {
  brandId: number;
  initialData?: {
    id: number;
    name: string;
    description?: string | null;
    logoImage?: {
      id: number;
      url: string;
      publicId: string;
    } | null;
    BannerImage: Array<{
      id: number;
      url: string;
      publicId: string;
    }>;
    brandImage: Array<{
      id: number;
      url: string;
      publicId: string;
    }>;
    _count: {
      products: number;
    };
  };
}

// Helper function to convert URL to File (for existing images)
async function urlToFile(url: string, filename: string): Promise<File> {
  const response = await fetch(url);
  const blob = await response.blob();
  return new File([blob], filename, { type: blob.type });
}

export default function EditBrandForm({ brandId, initialData }: EditBrandFormProps) {
  const { toast } = useToast();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(!initialData);
  const [brandData, setBrandData] = useState(initialData);
  const [existingImages, setExistingImages] = useState({
    logo: initialData?.logoImage,
    banners: initialData?.BannerImage || [],
    brandImages: initialData?.brandImage || [],
  });

  // Fetch brand data if not provided
  useEffect(() => {
    if (!initialData) {
      const fetchBrand = async () => {
        try {
          setIsLoading(true);
          const result = await getBrandById(brandId);
          if (result.success && result.data) {
            setBrandData(result.data);
            setExistingImages({
              logo: result.data.logoImage,
              banners: result.data.BannerImage || [],
              brandImages: result.data.brandImage || [],
            });
          } else {
            toast({
              variant: "destructive",
              title: "Error",
              description: result.error || "Failed to load brand data",
            });
            router.push("/admin/brands");
          }
        } catch (error) {
          toast({
            variant: "destructive",
            title: "Error",
            description: "Failed to load brand data",
          });
        } finally {
          setIsLoading(false);
        }
      };
      fetchBrand();
    }
  }, [brandId, initialData, router, toast]);

  const form = useForm<EditBrandType>({
    resolver: zodResolver(editSchema),
    defaultValues: {
      name: brandData?.name || "",
      description: brandData?.description || "",
      BannerImage: [],
      brandImage: [],
      logoImage: undefined,
    },
    mode: "onChange",
  });

  const { isSubmitting, isValid, isDirty } = form.formState;

  // Debug: log form values and errors
  useEffect(() => {
    const subscription = form.watch((value) => {
      console.log("Edit Form values:", value);
      console.log("Edit Form errors:", form.formState.errors);
    });
    return () => subscription.unsubscribe();
  }, [form]);

  // Set form values when brand data is loaded
  useEffect(() => {
    if (brandData) {
      form.reset({
        name: brandData.name,
        description: brandData.description || "",
        BannerImage: [],
        brandImage: [],
        logoImage: undefined,
      });
    }
  }, [brandData, form]);

  async function onSubmit(data: EditBrandType) {
    console.log("Submitting edit data:", data);
    
    try {
      const fd = new FormData();
      fd.append("name", data.name);
      fd.append("description", data.description ?? "");
      
      // Append new banner images
      data.BannerImage?.forEach((f) => {
        if (f) fd.append("bannerImages", f);
      });
      
      // Append new brand images  
      data.brandImage?.forEach((f) => {
        if (f) fd.append("brandImages", f);
      });
      
      // Append new logo image if provided
      if (data.logoImage) {
        fd.append("logoImage", data.logoImage);
      }

      // Log FormData contents for debugging
      for (let [key, value] of fd.entries()) {
        console.log(key, value);
      }

      const res = await updateBrand(brandId, fd);
      
      if ("error" in res) {
        console.error("Server error:", res);
        toast({ 
          variant: "destructive", 
          title: "Error", 
          description: res.error 
        });
      } else {
        toast({ 
          title: "Success", 
          description: "Brand updated successfully" 
        });
        router.push("/admin/brands");
        router.refresh();
      }
    } catch (error) {
      console.error("Submission error:", error);
      toast({
        variant: "destructive",
        title: "Submission Error",
        description: "Failed to update brand. Please try again."
      });
    }
  }

  if (isLoading) {
    return (
      <div className="space-y-6 p-6">
        <div className="flex items-center gap-4">
          <Button variant="outline" size="icon" asChild>
            <Link href="/admin/brands">
              <ArrowLeft className="h-4 w-4" />
            </Link>
          </Button>
          <div className="space-y-1">
            <Skeleton className="h-8 w-48" />
            <Skeleton className="h-4 w-96" />
          </div>
        </div>
        <Card>
          <CardContent className="p-6">
            <div className="space-y-4">
              <Skeleton className="h-10 w-full" />
              <Skeleton className="h-24 w-full" />
              <Skeleton className="h-40 w-full" />
              <Skeleton className="h-40 w-full" />
              <Skeleton className="h-40 w-full" />
              <Skeleton className="h-10 w-32" />
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (!brandData) {
    return (
      <div className="flex flex-col items-center justify-center py-12 space-y-4">
        <div className="text-center space-y-2">
          <h3 className="text-lg font-semibold">Brand not found</h3>
          <p className="text-muted-foreground">The brand you're trying to edit doesn't exist.</p>
        </div>
        <Button asChild>
          <Link href="/admin/brands">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Brands
          </Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-6 p-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Button variant="outline" size="icon" asChild>
          <Link href="/admin/brands">
            <ArrowLeft className="h-4 w-4" />
          </Link>
        </Button>
        <div className="space-y-1">
          <h1 className="text-3xl font-bold tracking-tight">Edit Brand</h1>
          <p className="text-muted-foreground">
            Update brand information and images
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Edit Form */}
        <div className="lg:col-span-3">
          <Card>
            <CardHeader>
              <CardTitle>Brand Details</CardTitle>
            </CardHeader>
            <CardContent>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  <FormField
                    name="name"
                    control={form.control}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Brand Name *</FormLabel>
                        <FormControl>
                          <Input 
                            {...field} 
                            placeholder="Enter brand name" 
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    name="description"
                    control={form.control}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Brand Description</FormLabel>
                        <FormControl>
                          <Textarea 
                            {...field} 
                            placeholder="Enter brand description"
                            rows={4}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* Current Logo Display */}
                  {existingImages.logo && (
                    <div className="space-y-2">
                      <FormLabel>Current Logo</FormLabel>
                      <div className="flex items-center gap-4 p-4 border rounded-lg">
                        <div className="relative w-16 h-16 rounded-lg overflow-hidden bg-muted">
                          <Image
                            src={existingImages.logo.url}
                            alt={`${brandData.name} logo`}
                            fill
                            className="object-contain"
                          />
                        </div>
                        <div>
                          <p className="text-sm font-medium">Current logo</p>
                          <p className="text-xs text-muted-foreground">
                            Upload a new logo to replace this one
                          </p>
                        </div>
                      </div>
                    </div>
                  )}

                  <UploadSingleImage
                    // form={form}
                    name="logoImage"
                    title="New Logo Picture"
                    description="Upload a new logo to replace the current one (optional)"
                  />

                  {/* Current Banner Images Display */}
                  {existingImages.banners.length > 0 && (
                    <div className="space-y-2">
                      <FormLabel>Current Banner Images</FormLabel>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-4 border rounded-lg">
                        {existingImages.banners.map((banner, index) => (
                          <div key={banner.id} className="relative group">
                            <div className="relative aspect-video rounded-md overflow-hidden bg-muted">
                              <Image
                                src={banner.url}
                                alt={`Banner ${index + 1}`}
                                fill
                                className="object-cover"
                              />
                            </div>
                            <Badge variant="secondary" className="absolute top-2 right-2">
                              {index + 1}
                            </Badge>
                          </div>
                        ))}
                      </div>
                      <p className="text-xs text-muted-foreground">
                        Add new banner images to supplement the existing ones
                      </p>
                    </div>
                  )}

                  <SortableImageUpload
                    form={form}
                    name="BannerImage"
                    label="New Banner Images"
                    description="Upload additional banner images (optional)"
                    maxFiles={5}
                    maxSize={5_000_000}
                  />

                  {/* Current Brand Images Display */}
                  {existingImages.brandImages.length > 0 && (
                    <div className="space-y-2">
                      <FormLabel>Current Brand Images</FormLabel>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-4 border rounded-lg">
                        {existingImages.brandImages.map((image, index) => (
                          <div key={image.id} className="relative group">
                            <div className="relative aspect-square rounded-md overflow-hidden bg-muted">
                              <Image
                                src={image.url}
                                alt={`Brand image ${index + 1}`}
                                fill
                                className="object-cover"
                              />
                            </div>
                            <Badge variant="secondary" className="absolute top-2 right-2">
                              {index + 1}
                            </Badge>
                          </div>
                        ))}
                      </div>
                      <p className="text-xs text-muted-foreground">
                        Add new brand images to supplement the existing ones
                      </p>
                    </div>
                  )}

                  <SortableImageUpload
                    form={form}
                    name="brandImage"
                    label="New Brand Images"
                    description="Upload additional brand images (optional)"
                    maxFiles={5}
                    maxSize={5_000_000}
                  />

                  <div className="flex gap-4 pt-4">
                    <Button 
                      type="submit" 
                      disabled={isSubmitting || !isValid || !isDirty}
                      className="flex-1"
                    >
                      {isSubmitting ? (
                        <>
                          <Spinner className="mr-2 h-4 w-4 animate-spin" />
                          Updating Brand...
                        </>
                      ) : (
                        <>
                          <Check className="mr-2 h-4 w-4" />
                          Update Brand
                        </>
                      )}
                    </Button>
                    <Button variant="outline" asChild>
                      <Link href="/admin/brands">
                        Cancel
                      </Link>
                    </Button>
                  </div>

                  {/* Debug info - remove in production */}
                  <div className="p-4 border rounded-lg bg-muted/50">
                    <h4 className="text-sm font-medium mb-2">Debug Info:</h4>
                    <pre className="text-xs">
                      {JSON.stringify({
                        values: form.watch(),
                        errors: form.formState.errors,
                        isValid: form.formState.isValid,
                        isDirty: form.formState.isDirty,
                        isSubmitting: form.formState.isSubmitting,
                        existingImagesCount: {
                          banners: existingImages.banners.length,
                          brandImages: existingImages.brandImages.length,
                          logo: existingImages.logo ? 1 : 0
                        }
                      }, null, 2)}
                    </pre>
                  </div>
                </form>
              </Form>
            </CardContent>
          </Card>
        </div>

        {/* Brand Summary Sidebar */}
        <div className="lg:col-span-1">
          <div className="sticky top-6 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Brand Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-3">
                  {existingImages.logo && (
                    <div className="relative w-12 h-12 rounded-lg overflow-hidden bg-muted">
                      <Image
                        src={existingImages.logo.url}
                        alt={`${brandData.name} logo`}
                        fill
                        className="object-contain"
                      />
                    </div>
                  )}
                  <div>
                    <p className="font-semibold">{brandData.name}</p>
                    <Badge variant="outline">
                      {brandData._count.products} products
                    </Badge>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Banner Images:</span>
                    <span>{existingImages.banners.length}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Brand Images:</span>
                    <span>{existingImages.brandImages.length}</span>
                  </div>
                </div>

                <div className="pt-4 border-t">
                  <p className="text-sm text-muted-foreground">
                    Changes will be applied immediately after saving.
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <Button variant="outline" className="w-full justify-start" asChild>
                  <Link href={`/admin/brands/${brandId}/products`}>
                    View Products
                  </Link>
                </Button>
                <Button variant="outline" className="w-full justify-start" asChild>
                  <Link href={`/admin/brands/${brandId}/analytics`}>
                    View Analytics
                  </Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}

// Loading skeleton component
function Skeleton({ className }: { className?: string }) {
  return (
    <div className={cn("animate-pulse rounded-md bg-muted", className)} />
  );
}