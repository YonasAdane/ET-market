'use client'

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import z from 'zod';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { CategoryType as PrismaCategoryType } from '@repo/database/index';
import { createCategory } from 'app/admin/_actions/categoryAction';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from 'app/components/form';
import { Spinner } from '../spinnerLoader';
import { SortableImageUpload, UploadMultipleImage, UploadSingleImage } from '../uploadImages';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Check } from 'lucide-react';

// Validation schema
const MAX_FILE_SIZE = 5_000_000; // 5MB
const ACCEPTED_IMAGE_TYPES = ["image/jpeg", "image/jpg", "image/png", "image/webp"];

const fileSchema = z
  .instanceof(File)
  .refine((file) => file.size <= MAX_FILE_SIZE, `Max image size is ${MAX_FILE_SIZE / 1024 / 1024}MB.`)
  .refine(
    (file) => ACCEPTED_IMAGE_TYPES.includes(file.type),
    "Only .jpg, .jpeg, .png and .webp formats are supported."
  );

export const categorySchema = z.object({
  name: z.string().min(2, { message: 'Category name must be at least 2 characters.' }),
  description: z.string().min(1, { message: 'Description is required.' }),
  categoryType: z.string().min(1, { message: 'Category type is required.' }),
  bannerImage: fileSchema.refine((file) => file !== undefined, "Banner image is required"),
  sampleImages: z.array(fileSchema).min(1, { message: 'At least one sample image is required.' })
});

const categoryTypes: PrismaCategoryType[] = [
  'CLOTHING',
  'FOOTWEAR',
  'ACCESSORY',
  'BAG',
  'OUTERWEAR',
  'WATCH',
  'UNDERWEAR'
];

type CategoryFormType = z.infer<typeof categorySchema>;

export default function AddCategoryForm() {
  const { toast } = useToast();

  const form = useForm<CategoryFormType>({
    resolver: zodResolver(categorySchema),
    defaultValues: {
      name: "",
      description: "",
      categoryType: "CLOTHING",
      sampleImages: []
    },
    mode: "onChange"
  });

  const { isSubmitting, isDirty, isValid } = form.formState;

  const onSubmit = async (values: CategoryFormType) => {
    try {
      console.log('Form values:', values);
      
      const formData = new FormData();
      
      // Append text fields
      formData.append('name', values.name);
      formData.append('description', values.description);
      formData.append('categoryType', values.categoryType);
  
      // Append banner image
      if (values.bannerImage) {
        formData.append('bannerImage', values.bannerImage);
      }

      // Append sample images
      values.sampleImages.forEach((file) => {
        formData.append('sampleImages', file);
      });

      // Log FormData contents for debugging
      console.log('FormData contents:');
      for (let [key, value] of formData.entries()) {
        console.log(key, value instanceof File ? `${value.name} (${value.size} bytes)` : value);
      }

      const result = await createCategory(formData);
      
      if (!result.success) {
        throw new Error(result.error);
      }
  
      toast({ 
        title: 'Success', 
        description: 'Category created successfully' 
      });
      
      // Reset form
      form.reset();
      
    } catch (error: any) {
      console.error('Error creating category:', error);
      toast({ 
        title: 'Error', 
        variant: 'destructive', 
        description: error.message || 'Failed to create category' 
      });
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Add New Category</CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Left Column - Basic Info */}
              <div className="space-y-4">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Category Name *</FormLabel>
                      <FormControl>
                        <Input 
                          placeholder="Enter category name" 
                          {...field} 
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="categoryType"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Category Type *</FormLabel>
                      <FormControl>
                        <Select onValueChange={field.onChange} value={field.value}>
                          <SelectTrigger>
                            <SelectValue placeholder="Select Category Type" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectGroup>
                              <SelectLabel>Product Categories</SelectLabel>
                              {categoryTypes.map((category) => (
                                <SelectItem key={category} value={category} className="uppercase">
                                  {category.toLowerCase().replace(/_/g, ' ')}
                                </SelectItem>
                              ))}
                            </SelectGroup>
                          </SelectContent>
                        </Select>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              {/* Right Column - Description */}
              <div className="space-y-4">
                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem className="h-full">
                      <FormLabel>Description *</FormLabel>
                      <FormControl>
                        <Textarea 
                          placeholder="Enter category description" 
                          className="h-32 resize-none"
                          {...field} 
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>

            {/* Image Upload Sections */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <UploadSingleImage
                // form={form}
                name="bannerImage"
                title="Banner Image"
                description="Upload category banner image (required)"
              />

              <SortableImageUpload
                form={form}
                name="sampleImages"
                label="Sample Images"
                description="Upload sample product images (at least one required)"
              />
            </div>

            {/* Debug Information - Remove in production */}
            <Card className="bg-muted/50">
              <CardContent className="pt-6">
                <h4 className="text-sm font-medium mb-2">Form State:</h4>
                <div className="text-xs space-y-1">
                  <div>Valid: {isValid ? 'Yes' : 'No'}</div>
                  <div>Dirty: {isDirty ? 'Yes' : 'No'}</div>
                  <div>Submitting: {isSubmitting ? 'Yes' : 'No'}</div>
                  <div>Errors: {JSON.stringify(form.formState.errors)}</div>
                  <div className="mt-2">
                    Values: {JSON.stringify({
                      name: form.watch('name'),
                      description: form.watch('description'),
                      categoryType: form.watch('categoryType'),
                      bannerImage: form.watch('bannerImage') ? 'File selected' : 'No file',
                      sampleImages: form.watch('sampleImages')?.length || 0 + ' files'
                    })}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Submit Button */}
            <Button 
              type="submit" 
              disabled={isSubmitting || !isValid || !isDirty}
              className="w-full"
              size="lg"
            >
              {isSubmitting ? (
                <>
                  <Spinner className="mr-2 h-4 w-4 animate-spin" />
                  Creating Category...
                </>
              ) : (
                <>
                  <Check className="mr-2 h-4 w-4" />
                  Create Category
                </>
              )}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}