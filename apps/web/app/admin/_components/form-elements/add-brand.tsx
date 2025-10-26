"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useRouter } from "next/navigation";
import { useToast } from "@repo/ui/hooks/use-toast";
import { createBrand } from "app/admin/_actions/brandAction";
import { UploadSingleImage, SortableImageUpload } from "../uploadImages"; // Updated import
import { Button } from "@repo/ui/components/ui/button";
import { Input } from "@repo/ui/components/ui/input";
import { Textarea } from "@repo/ui/components/ui/textarea";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "app/components/form";
import { Check } from "lucide-react";
import { Spinner } from "../spinnerLoader";

const MAX_FILE_SIZE = 5_000_000;
const ACCEPTED_TYPES = ["image/jpeg", "image/jpg", "image/png", "image/webp"];

const file = () =>
  z
    .instanceof(File)
    .refine((f) => f.size <= MAX_FILE_SIZE, "Max 5 MB")
    .refine((f) => ACCEPTED_TYPES.includes(f.type), "Unsupported format");

const schema = z.object({
  name: z.string().min(2).max(100),
  description: z.string().optional(),
  BannerImage: z.array(file()).min(1, "At least one banner image is required"),
  brandImage: z.array(file()).min(1, "At least one brand image is required"),
  logoImage: file().optional(),
});

type BrandType = z.infer<typeof schema>;

export default function CreateBrandForm() {
  const { toast } = useToast();
  const router = useRouter();

  const form = useForm<BrandType>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: "",
      description: "",
      BannerImage: [],
      brandImage: [],
    },
  });

  const { isSubmitting } = form.formState;

  async function onSubmit(data: BrandType) {
    const fd = new FormData();
    fd.append("name", data.name);
    fd.append("description", data.description ?? "");
    
    // Append banner images
    data.BannerImage.forEach((f) => fd.append("bannerImages", f));
    
    // Append brand images  
    data.brandImage.forEach((f) => fd.append("brandImages", f));
    
    // Append logo image
    if (data.logoImage) {
      fd.append("logoImage", data.logoImage);
    }

    const res = await createBrand({}, fd);
    
    if ("error" in res) {
      toast({ variant: "destructive", title: "Error", description: res.error });
    } else {
      toast({ title: "Brand created" });
      router.push("/admin/brands");
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          name="name"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Brand Name</FormLabel>
              <FormControl>
                <Input {...field} />
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
                <Textarea {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <UploadSingleImage
          // form={form}
          name="logoImage"
          title="Logo Picture"
          description="Upload your brand logo"
        />

        <SortableImageUpload
          form={form}
          name="BannerImage"
          label="Banner Images"
          description="Upload and reorder banner images (drag to sort)"
          maxFiles={5}
          maxSize={5_000_000}
        />

        <SortableImageUpload
          form={form}
          name="brandImage"
          label="Brand Images"
          description="Upload and reorder brand images (drag to sort)"
          maxFiles={5}
          maxSize={5_000_000}
        />

        <Button type="submit" disabled={isSubmitting} className="rounded-full w-full">
          {form.formState.isSubmitting ? (
            <Spinner className="mr-2 h-4 w-4 animate-spin" />
          ) : (
            <Check className="mr-2 h-4 w-4" />
          )}
          Create Brand
        </Button>
      </form>
    </Form>
  );
}