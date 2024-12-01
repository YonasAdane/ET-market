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
import ToogleElement from './toggle-element';
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from '@/components/ui/select';
import { MultiSelect } from '@/components/multi-select';
import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { bagsSchema } from 'app/lib/types/product';
import { createProduct } from 'app/admin/_actions/productAcion';
import { Spinner } from '../spinnerLoader';
import { cn } from '@/lib/utils';


export default function AddBagForm() {
    const [images, setImages] = useState<File[]>([]);
    const [imageUrl,setImageUrl]=useState<string[]>([])
   
    type bagType=z.infer<typeof bagsSchema >;
    const form=useForm<bagType>({
        resolver:zodResolver(bagsSchema),
        defaultValues:{
            name: "",
            description: "",
            price: 1,
            prevprice: 1,
            colour: "",
            size: "",
            gender:"",
            material: "",
            purpose: "",
            brandId: 1,
            categoryId: [],
            categoryType:"BAG",
            stock: 1,
            images
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
    function addProduct(data:bagType){
        console.log(data);

        alert(JSON.stringify(data))
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
                        <ToogleElement label='Purpose' name="purpose" values={["Travel","Daily","School"]} control={form.control}/>
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
                            name="categoryId"
                            control={form.control}
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
                                        <Input type='hidden' {...field} value="CLOTHING" />
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
            <Card className="overflow-hidden border-none bg-muted/50" >
                <h2 className="m-5">{"Product"} Images</h2>
                <CardContent>
                <div className="grid gap-2">
                    <img
                    alt={"Product"+"image"}
                    className="aspect-square w-full rounded-md object-cover"
                    height="300"
                    src={imageUrl[0] ? imageUrl[0]:"https://ui.shadcn.com/placeholder.svg"}
                    width="300"
                    />
                    <div className="grid grid-cols-3 gap-2">
                    {imageUrl.filter(image=>image!==imageUrl[0]).map((img)=>(
                        
                    <button key={img}>
                        <img
                        alt=" image"
                        className="border aspect-square w-full rounded-md object-cover"
                        height="84"
                        src={img??"https://ui.shadcn.com/placeholder.svg"}
                        width="84"
                        />
                    </button>
                    ))}
                    {!images &&
                    (<>
                        <button>
                            <img
                            alt=" image"
                            className=" aspect-square w-full rounded-md object-cover"
                            height="84"
                            src={"https://ui.shadcn.com/placeholder.svg"}
                            width="84"
                            />
                        </button>
                    </>)
                    }
                        <FormField
                        name="images"
                        control={form.control}
                        render={({ field: { value, onChange, ...fieldProps } }) => (
                            <FormItem>
                            <FormLabel  className="cursor-pointer hover:bg-foreground/10 ease-in duration-100 flex aspect-square w-full items-center justify-center rounded-md border border-dashed">
                                <Upload className="h-4 w-4 text-muted-foreground" />
                                <span className="sr-only">Upload</span>
                            </FormLabel>
                            <FormControl>
                                <Input
                                {...fieldProps}
                                type="file"
                                className='hidden'
                                multiple
                                accept='image/*'
                                onChange={async(event) =>{
                                    onFileSelect(event)
                                    console.log(event.target.files)
                                    console.log("BLOB instance of",images[0] instanceof File );
                                    
                                    console.log("event file",event.target.files);
                                    
                                    return onChange(images)
                                }}
                                />
                            </FormControl>
                            <FormDescription />
                            <FormMessage />
                            </FormItem>
                    )}
                    />
                    
                        
                    </div>
                </div>
                </CardContent>
            </Card>
                
        </div>
    </form>
</Form>
  )
}