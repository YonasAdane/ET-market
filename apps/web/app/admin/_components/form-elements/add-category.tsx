'use client'

import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import z from 'zod';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { CategoryType, CategoryType as PrismaCategoryType } from '@repo/database/index';
import { createCategory } from 'app/admin/_actions/categoryAction';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from 'app/components/form';
import { UploadSingleImage } from '../uploadImages';
const MAX_FILE_SIZE = 10000000;
const ACCEPTED_IMAGE_TYPES = ["image/jpeg", "image/jpg", "image/png", "image/webp"];
const categoryTypes:PrismaCategoryType[]=[
  'CLOTHING',
  'FOOTWEAR',
  'ACCESSORY',
  'BAG',
  'OUTERWEAR',
  'JEWELLERY',
  'WATCH',
  'UNDERWEAR'
]
const categorySchema = z.object({
  name: z.string().min(2, { message: 'Category name must be at least 2 characters.' }),
  description: z.string(),
  categoryType:z.string(),
  bannerImage:  z.any()
  .refine((file) => file?.size <= MAX_FILE_SIZE, `Max image size is 5MB.`)
  .refine(
    (file) => ACCEPTED_IMAGE_TYPES.includes(file?.type),
    "Only .jpg, .jpeg, .png and .webp formats are supported."
  ),
  sampleImages: z.array(
    z.any()
    .refine((file) => file?.size <= MAX_FILE_SIZE, `Max image size is 5MB.`)
    .refine(
      (file) => ACCEPTED_IMAGE_TYPES.includes(file?.type),
      "Only .jpg, .jpeg, .png and .webp formats are supported."
    )
  )

  // z.array(z.instanceof(File).refine(file => file.size > 0, { message: 'Please upload valid sample images.' })).min(1, { message: 'At least one sample image is required.' }),
})

export default function AddCategoryForm() {
  const [images, setImages] = useState<File[]>([]);
  const [imageUrl,setImageUrl]=useState<string[]>([])
 
    type categoryType= z.infer<typeof categorySchema>;
      const form = useForm<categoryType>({
        resolver: zodResolver(categorySchema),
        defaultValues:{
          name:"",
          description:"",
          categoryType:"CLOTHING",
          bannerImage:null,
          sampleImages:[]
        }
      })
      
    function onFileSelect(event: React.ChangeEvent<HTMLInputElement>) {
      const files = event.target.files;
      console.log("onFileSelect files: ",files );
      
      if (!files || files==null || !files.length || files===undefined) {
          return;
      }
      if (event.target.files) {
          const fileArray = Array.from(event.target.files); // Convert FileList to an array
          setImages((prevImages) => [...prevImages, ...fileArray]);
        }
      for (let i = 0; i < files.length; i++) {
          if(files[i]){
              setImageUrl((prevUrls)=>[...prevUrls,URL.createObjectURL(files[i]!)])
          }
      }
  }
  return (
    <div>
        <Form {...form}>
            <form onSubmit={form.handleSubmit(
              async data=>await createCategory(
                data.categoryType as CategoryType,
                data.name,
                data.description,
                data.bannerImage,
                data.sampleImages))} className="">
                <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                    <FormItem>
                        <FormLabel>Category Name</FormLabel>
                        <FormControl>
                        <Input placeholder="Enter category name" {...field} />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="description"
                    render={({ field }) => (
                    <FormItem>
                        <FormLabel>Description</FormLabel>
                        <FormControl>
                        <Textarea placeholder="Enter category description" {...field} />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                    )}
                />
                {JSON.stringify(form.formState.errors)}
                <FormField
                    name="categoryType"
                    control={form.control}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-sm">Category Type</FormLabel>
                        <FormControl>
                          <Select onValueChange={field.onChange} value={field.value}>
                            <SelectTrigger>
                              <SelectValue placeholder="Select Category" />
                            </SelectTrigger>
                            <SelectContent className="mb-5">
                              <SelectGroup>
                                <SelectLabel>Categories of Products</SelectLabel>
                                {categoryTypes.map((Category) => (
                                  <SelectItem key={Category} value={Category} className="uppercase">
                                    {Category}
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

                <UploadSingleImage name="bannerImage" description="Banner Picture" form={form}/>
                <FormField
                        control={form.control}
                        name="sampleImages"
                        render={({ field: { value, onChange, ...fieldProps } }) => (
                          <FormItem>
                                <FormLabel>Sample Images</FormLabel>
                                <FormControl>
                                    <Input
                                        type="file"
                                        multiple
                                        accept="image/*"
                                        onChange={async(event) =>{
                                          onFileSelect(event)
                                          return onChange(images)
                                        }}
                                        {...fieldProps}
                                    />
                                </FormControl>
                                <FormDescription>Upload one or more sample images</FormDescription>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                <Button type="submit">Add Category</Button>
            </form>
        </Form>
    </div>
  )
}
