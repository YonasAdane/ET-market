'use client'

import { useState } from 'react'
import z from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from 'app/components/form'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'

const categorySchema = z.object({
    name: z.string().min(2, { message: 'Category name must be at least 2 characters.' }),
    description: z.string(),
    bannerImage: z.string().url({ message: 'Please enter a valid URL for the banner image.' }),
    sampleImages: z.array(z.string().url({ message: 'Please enter valid URLs for sample images.' })).min(1, { message: 'At least one sample image is required.' }),
  })

export default function AddCategoryForm() {
    type categoryType= z.infer<typeof categorySchema>;
    const mockCategories = [
        { id: 1, name: 'Shoes', description: 'Footwear for all occasions', bannerImage: 'https://example.com/shoes-banner.jpg' },
        { id: 2, name: 'Apparel', description: 'Clothing for men and women', bannerImage: 'https://example.com/apparel-banner.jpg' },
      ]
      const [categories, setCategories] = useState(mockCategories)
      const form = useForm<categoryType>({
        resolver: zodResolver(categorySchema),
       
      })
      function onCategorySubmit(values: categoryType) {
        console.log(values)
        // Here you would typically send this data to your API
        setCategories([...categories, { id: categories.length + 1, ...values }])
        form.reset()
      }
  return (
    <div>
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onCategorySubmit)} className="">
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
                <FormField
                    control={form.control}
                    name="bannerImage"
                    render={({ field }) => (
                    <FormItem>
                        <FormLabel>Banner Image URL</FormLabel>
                        <FormControl>
                        <Input placeholder="Enter banner image URL" {...field} />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="sampleImages"
                    render={({ field }) => (
                    <FormItem>
                        <FormLabel>Sample Image URLs</FormLabel>
                        <FormControl>
                        <Input placeholder="Enter sample image URLs (comma-separated)" {...field} onChange={(e) => field.onChange(e.target.value.split(','))} />
                        </FormControl>
                        <FormDescription>Enter URLs separated by commas</FormDescription>
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
