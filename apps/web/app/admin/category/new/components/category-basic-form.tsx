"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@repo/ui/components/ui/form";
import { Input } from "@repo/ui/components/ui/input";
import { Textarea } from "@repo/ui/components/ui/textarea";
import { Button } from "@repo/ui/components/ui/button";
import { useTransition } from "react";
import { toast } from "sonner";
import { createCategory } from "../actions/category-actions";
import { ImageDropzone } from "./image-dropzone";
import { CategoryBasicFormProps } from "../types";

const formSchema = z.object({
  name: z.string().min(1, "Category name is required"),
  description: z.string().optional(),
});

type FormValues = z.infer<typeof formSchema>;

export function CategoryBasicForm({ onSubmit }: CategoryBasicFormProps) {
  const [bannerImage, setBannerImage] = useState<File | null>(null);
  const [isPending, startTransition] = useTransition();
  
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      description: "",
    },
  });

  const handleSubmit = (data: FormValues) => {
    startTransition(async () => {
      try {
        const formData = new FormData();
        formData.append('name', data.name);
        formData.append('description', data.description || '');
        if (bannerImage) {
          formData.append('bannerImage', bannerImage);
        }

        const result = await createCategory(formData);
        
        if (result.success && result.data?.categoryId) {
          toast.success("Category created successfully");
          onSubmit(result.data.categoryId);
        } else {
          toast.error(result.error || "Failed to create category");
        }
      } catch (error) {
        toast.error("Failed to create category");
      }
    });
  };

  return (
    // @ts-ignore - Ignore TypeScript errors for Form component
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
        <FormField
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name *</FormLabel>
              <FormControl>
                <Input 
                  placeholder="Enter category name" 
                  disabled={isPending}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <FormField
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Enter category description"
                  className="resize-none"
                  disabled={isPending}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <div className="space-y-2">
          <FormLabel>Banner Image</FormLabel>
          <ImageDropzone 
            onImageSelected={setBannerImage}
          />
        </div>
        
        <div className="flex justify-end">
          <Button 
            type="submit" 
            disabled={isPending}
          >
            {isPending ? "Saving..." : "Save and continue"}
          </Button>
        </div>
      </form>
    </Form>
  );
}