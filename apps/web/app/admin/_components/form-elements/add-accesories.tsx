"use client";
import Size from './size'
import Gender from './gender'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button';
import { Check, Upload } from 'lucide-react';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from 'app/components/form';
import z from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from '@/components/ui/select';
import { MultiSelect } from '@/components/multi-select';
import { accessoriesSchema } from 'app/lib/types/product';
import { Spinner } from '../spinnerLoader';
import { Card, CardContent } from '@/components/ui/card';
import { useState } from 'react';
import { cn } from '@/lib/utils';
import { createProduct } from 'app/admin/_actions/productAcion';
import { UploadProductImage } from '../uploadImages';

  export default function AddAccesoryForm() {
    const [images, setImages] = useState<File[]>([]);
    const [imageUrl,setImageUrl]=useState<string[]>([])
   
    type accessoryType=z.infer<typeof accessoriesSchema >;
    const form=useForm<accessoryType>({
        resolver:zodResolver(accessoriesSchema),
        defaultValues:{
            name: "",
            description: "",
            colour: "",
            material: "",
            size: "",
            gender:"",
            price: 1,
            prevprice: 1,
            brandId: 1,
            categoryId: [],               
            categoryType:"ACCESSORY",
            stock: 0
        }
    });
    
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

    async function addProduct(data:accessoryType){
       try {
        createProduct(data)
       } catch (error) {
        console.log(error);
        
       }
    }
    
  return (
<Form {...form}>
    <form onSubmit={form.handleSubmit(async data=>await createProduct(data))}>
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
                        <Size control={form.control} values={["Small","Medium","Large"]} name="size"/>
                    </div>
                    <div className="w-full ">
                        <Gender name='gender' control={form.control}/>
                    </div>
                </div>
                <div className="w-full bg-muted/50 mt-5 rounded-lg p-5">
                    <h2>Properties</h2>
                    
                    <div className="grid grid-cols-2 gap-5">
                        <FormField
                        name="material"
                        control={form.control}
                        render={({field})=>(
                            <FormItem>
                                <FormLabel className="text-sm">Material</FormLabel>
                                <FormControl>
                                    <Input {...field} className="bg-slate-200 dark:bg-slate-600 focus:outline-transparent my-2 focus:shadow-outline focus:border-none appearance-none" type="text"/>
                                </FormControl>
                                <FormMessage/>
                            </FormItem>
                        )}
                        />
                        <FormField
                        name="brandId"
                        control={form.control}
                        render={({field})=>(
                            <FormItem>
                                <FormLabel className='text-sm'>Brand</FormLabel>
                                <FormControl>
                                    <Select >
                                        <SelectTrigger {...field}>
                                            <SelectValue placeholder="Select Brand"/>
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectGroup>
                                                <SelectLabel>Brands of Products</SelectLabel>
                                                <SelectItem value="asdfasdf">ROLEX</SelectItem>
                                                <SelectItem value="sdd">CASIO</SelectItem>
                                            </SelectGroup>
                                        </SelectContent>
                                    </Select>
                                </FormControl>
                                <FormMessage/>
                            </FormItem>
                        )}/>
                        <FormField
                        control={form.control}
                        name="colour"
                        render={({field})=>(
                            <FormItem>
                                <FormLabel>Colour</FormLabel>
                                <FormControl>
                                    <Input {...field} type='text'/>
                                </FormControl>
                                <FormMessage/>
                            </FormItem>
                        )}
                        />
                        
                        <FormField
                            control={form.control}
                            name="categoryId"
                            render={({ field }) => (
                            <FormItem>
                            <FormLabel>Category Type</FormLabel>
                            <FormControl>
                                <MultiSelect
                                options={
                                    [
                                        {label:'clothing',value:"1"},
                                        {label:'footwear',value:"2"},
                                        {label:'accessory',value:"3"},
                                        {label:'jewellery',value:"4"},
                                        {label:'bag',value:"5"},
                                        {label:'outerwear',value:"6"},
                                        {label:'watches',value:"7"},
                                        {label:'underwear',value:"8"},
                                    ]}
                                onValueChange={field.onChange}
                                //   defaultValue={field.value}
                                placeholder="Select options"
                                variant="inverted"
                                //   animation={2}
                                maxCount={3}
                                />
                            </FormControl>
                            <FormMessage />
                            </FormItem>
                        )}
                        />
                        <FormField
                            name="categoryType"
                            control={form.control}
                            render={({field})=>(
                                <FormItem>
                                    <FormControl>
                                        <Input type='hidden' {...field} value="ACCESSORY" />
                                    </FormControl>
                                    <FormMessage/>
                                </FormItem>
                            )}
                            />
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
                                    <Input {...field} className="bg-slate-200 dark:bg-slate-600 focus:outline-transparent my-2 focus:shadow-outline focus:border-none appearance-none" type={"number"}/>
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
                    <Button type='submit' disabled={form.formState.isSubmitting} className={cn(form.formState.isSubmitting && "cursor-not-allowed bg-muted-foreground/100"," p-3 rounded-full mr-0")} variant="default">
                        {!form.formState.isSubmitting ? 
                        <Check size={18} className="mr-1"/> 
                        :
                        <Spinner className="mr-1 size-5" />
                        }
                        Add Product
                    </Button>
                </div>            
            </div>
            </div>
            <UploadProductImage name="images" label='picture' form={form} description='product image' />
        </div>
    </form>
</Form>
  )
}