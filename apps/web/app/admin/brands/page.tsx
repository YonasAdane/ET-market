'use client'

import { useState } from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import * as z from 'zod'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Pencil, Trash } from 'lucide-react'
import { Card } from '@/components/ui/card'

// Zod schemas for form validation
const brandSchema = z.object({
  name: z.string().min(2, { message: 'Brand name must be at least 2 characters.' }),
  description: z.string().optional(),
  mobileBannerImage: z.string().url({ message: 'Please enter a valid URL for the mobile banner image.' }),
  desktopBannerImage: z.string().url({ message: 'Please enter a valid URL for the desktop banner image.' }),
  brandImage: z.string().url({ message: 'Please enter a valid URL for the brand image.' }),
  logoUrl: z.string().url({ message: 'Please enter a valid URL for the logo.' }).optional(),
})

const mockBrands = [
  { id: 1, name: 'Nike', description: 'Just Do It', logoUrl: 'https://example.com/nike-logo.png' },
  { id: 2, name: 'Adidas', description: 'Impossible Is Nothing', logoUrl: 'https://example.com/adidas-logo.png' },
]

export default function AdminDashboard() {
  const [brands, setBrands] = useState(mockBrands)

  const brandForm = useForm<z.infer<typeof brandSchema>>({
    resolver: zodResolver(brandSchema),
    defaultValues: {
      name: '',
      description: '',
      mobileBannerImage: '',
      desktopBannerImage: '',
      brandImage: '',
      logoUrl: '',
    },
  })

 
  function onBrandSubmit(values: z.infer<typeof brandSchema>) {
    console.log(values)
    // Here you would typically send this data to your API
    // setBrands([...brands, { id: brands.length + 1, ...values }])
    brandForm.reset()
  }

 
  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Brands</h1>
      <div className="space-y-4">
        
        <div  className="space-y-4 w-full grid grid-cols-3 gap-5">
          <div className='col-span-2'>
            <Table>
                <TableHeader>
                <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Description</TableHead>
                    <TableHead>Logo</TableHead>
                    <TableHead>Actions</TableHead>
                </TableRow>
                </TableHeader>
                <TableBody>
                {brands.map((brand) => (
                    <TableRow key={brand.id}>
                    <TableCell>{brand.name}</TableCell>
                    <TableCell>{brand.description}</TableCell>
                    <TableCell>
                        {brand.logoUrl && (
                        <img src={brand.logoUrl} alt={`${brand.name} logo`} className="w-10 h-10 object-contain" />
                        )}
                    </TableCell>
                    <TableCell>
                        <Button variant="ghost" size="icon">
                        <Pencil className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon">
                        <Trash className="h-4 w-4" />
                        </Button>
                    </TableCell>
                    </TableRow>
                ))}
                </TableBody>
            </Table>
          </div>
          <Card className='p-5'>
            {/* <Form {...brandForm}>
                <form onSubmit={brandForm.handleSubmit(onBrandSubmit)} className="space-y-4">
                <FormField
                    control={brandForm.control}
                    name="name"
                    render={({ field }) => (
                    <FormItem>
                        <FormLabel>Brand Name</FormLabel>
                        <FormControl>
                        <Input placeholder="Enter brand name" {...field} />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                    )}
                />
                <FormField
                    control={brandForm.control}
                    name="description"
                    render={({ field }) => (
                    <FormItem>
                        <FormLabel>Description</FormLabel>
                        <FormControl>
                        <Textarea placeholder="Enter brand description" {...field} />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                    )}
                />
                <FormField
                    control={brandForm.control}
                    name="mobileBannerImage"
                    render={({ field }) => (
                    <FormItem>
                        <FormLabel>Mobile Banner Image URL</FormLabel>
                        <FormControl>
                        <Input placeholder="Enter mobile banner image URL" {...field} />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                    )}
                />
                <FormField
                    control={brandForm.control}
                    name="desktopBannerImage"
                    render={({ field }) => (
                    <FormItem>
                        <FormLabel>Desktop Banner Image URL</FormLabel>
                        <FormControl>
                        <Input placeholder="Enter desktop banner image URL" {...field} />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                    )}
                />
                <FormField
                    control={brandForm.control}
                    name="brandImage"
                    render={({ field }) => (
                    <FormItem>
                        <FormLabel>Brand Image URL</FormLabel>
                        <FormControl>
                        <Input placeholder="Enter brand image URL" {...field} />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                    )}
                />
                <FormField
                    control={brandForm.control}
                    name="logoUrl"
                    render={({ field }) => (
                    <FormItem>
                        <FormLabel>Logo URL</FormLabel>
                        <FormControl>
                        <Input placeholder="Enter logo URL" {...field} />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                    )}
                />
                <Button type="submit">Add Brand</Button>
                </form>
            </Form> */}
          </Card>
          
        </div>
        
      </div>
    </div>
  )
}