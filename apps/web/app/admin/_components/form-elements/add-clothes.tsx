"use client";
import Size from './size'
import Gender from './gender'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button';
import { Check } from 'lucide-react';
import ImageNcategory from './imageNcategory';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from 'app/components/form';
import z from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
// import {toast} from "sonner"
// 
import { Textarea } from '@/components/ui/textarea';
import UploadImage from './upload-image';
const clothingSchema = z.object({
    name: z.string().min(1),
    description: z.string().optional(), 
    imageUrl:z.string(),
    gender:z.string().optional(),
    price: z.coerce.number().positive(),
    prevprice:z.coerce.number().positive(),
    size: z.string().optional(),         // e.g., S, M, L, XL
    material: z.string().optional(),     // e.g., Cotton, Polyester
    colour: z.string().optional(),       // e.g., Red, Blue
    pattern: z.string().optional(),      // e.g., Solid, Striped
    fit: z.string().optional(),          // e.g., Slim, Regular
    occasion: z.string().optional(),     // e.g., Casual, Formal
    season: z.string().optional(),       // e.g., Summer, Winter
    brandId: z.number().optional(),      // Foreign key reference to Brand
    categoryId: z.coerce.number(),              // Foreign key reference to Category
    categoryType:z.string(),
    stock: z.coerce.number().int().nonnegative()
  
  });
export default function AddClothForm() {
    type clothingType=z.infer<typeof clothingSchema >;
    const form=useForm<clothingType>({
        resolver:zodResolver(clothingSchema),
    });
    function addProduct(data:clothingType){
        console.log(data);

        alert(JSON.stringify(data))
    }
    
  return (
<Form {...form}>
    <form onSubmit={form.handleSubmit(addProduct)}>
        <div className='w-full grid grid-cols-3 gap-5 h-full '>
            <div className="col-span-2 bg-muted/50 rounded-lg p-5">
                <h2>General Information</h2>
                <FormField
                name="name"
                control={form.control}
                render={({field})=>(
                    <FormItem>
                        <FormLabel className='text-sm'>Product Name</FormLabel>
                        <FormControl>
                            <Input {...field} className="bg-slate-200 dark:bg-slate-600 focus:outline-transparent my-2 focus:shadow-outline focus:border-none appearance-none" type="text"/>
                        </FormControl>
                        <FormMessage/>
                    </FormItem>
                )}
                />
                <FormField
                    name="description"
                    control={form.control}
                    render={({field})=>(
                        <FormItem>
                            <FormLabel className='text-sm'>Product Description</FormLabel>
                            <FormControl>
                                <Textarea {...field} className="bg-slate-200 dark:bg-slate-600 focus:outline-transparent my-2 focus:shadow-outline focus:border-none appearance-none h-32" />
                            </FormControl>
                            <FormMessage/>
                        </FormItem>
                    )}
                />
                <div className="flex justify-between gap-5">
                    <div className="w-full ">
                        <Size values={["2XS","XS","S","M","L","XL","2XL"]} control={form.control} name="size"/>
                    </div>
                    <div className="w-full ">
                        <Gender name='gender' control={form.control}/>
                    </div>
                </div>
                <div className="w-full bg-muted/50 mt-5 rounded-lg p-5">
                    <h2>Pricing And Stock</h2>
                    
                    <div className="flex justify-between gap-5">
                    <div className="w-full">
                        <FormField
                        name="prevprice"
                        control={form.control}
                        render={({field})=>(
                            <FormItem>
                                <FormLabel className="text-sm">Base Pricing</FormLabel>
                                <FormControl>
                                    <Input {...field} className="bg-slate-200 dark:bg-slate-600 focus:outline-transparent my-2 focus:shadow-outline focus:border-none appearance-none" type="number"/>
                                </FormControl>
                                <FormMessage/>
                            </FormItem>
                        )}
                        />
                        <FormField
                        name="price"
                        control={form.control}
                        render={({field})=>(
                            <FormItem>
                                <FormLabel className="text-sm">Current Price</FormLabel>
                                <FormControl>
                                    <Input {...field} className="bg-slate-200 dark:bg-slate-600 focus:outline-transparent my-2 focus:shadow-outline focus:border-none appearance-none" type="number"/>
                                </FormControl>
                            </FormItem>
                        )}
                        />

                    </div>
                    <div className="w-full">
                        <FormField
                        name="stock"
                        control={form.control}
                        render={({field})=>(
                            <FormItem>
                                <FormLabel className='text-sm'>Stock</FormLabel>
                                <FormControl>
                                    <Input {...field}  className="bg-slate-200 dark:bg-slate-600 focus:outline-transparent my-2 focus:shadow-outline focus:border-none appearance-none" type={"number"}/>
                                </FormControl>
                                <FormMessage/>
                            </FormItem>
                        )}
                        />
                    </div>
                    </div>
                </div>
                <div className="row-span-1 ">
                <div className="w-fit ml-auto mt-3">
                    <Button type='submit' className="p-3 rounded-full mr-0" variant="default"><Check size={18} className="mr-1"/> Add Product</Button>
                </div>            
            </div>
            </div>
            {/* <UploadImage name="images" control={form.control}/> */}
            {/* <FormField
                name="images"
                control={form.control}
                render={({field})=>(
                    <FormItem>
                        <FormControl>
                            <UploadImage {...field}/>
                        </FormControl>
                        <FormMessage/>
                    </FormItem>
                )}
                /> */}
        </div>
    </form>
</Form>
  )
}
