 "use client";
import { Input } from '@/components/ui/input'
import Gender from './gender'
import { Button } from '@/components/ui/button';
import {  Check, Upload } from 'lucide-react';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from 'app/components/form';
import z from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Textarea } from '@/components/ui/textarea';
import ToogleElement from './toggle-element';
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from '@/components/ui/select';
import { HoverCard, HoverCardContent, HoverCardTrigger } from '@/components/ui/hover-card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Card, CardContent } from '@/components/ui/card';
import { useState } from 'react';
import { footwearSchema } from 'app/lib/types/product';
import { Spinner } from '../spinnerLoader';
import { cn } from '@/lib/utils';
import { createProduct } from 'app/admin/_actions/productAcion';

export default function AddFootwearForm() {
    const [images, setImages] = useState<File[]>([]);
    const [imageUrl,setImageUrl]=useState<string[]>([])
   
  type footwearType=z.infer<typeof footwearSchema >;
    const form=useForm<footwearType>({
        resolver:zodResolver(footwearSchema),
        defaultValues:{
            name:"",
            description:"",
            size:"",
            gender:"",
            colour:"",
            occasion:"",
            price: 1,
            prevprice: 1,
            material:"",
            brandId: 1,
            categoryId: [],
            categoryType:"FOOTWEAR",
            stock: 1,
            images: []
        }
    });
    function addProduct(data:footwearType){
        console.log(data);

        alert(JSON.stringify(data))
    }
    const productCategories = [
        {
            name: "Sneakers",
            description: "Casual shoes designed for comfort and athletic activities.",
            image: "path/to/sneakers.jpg"
        },
        {
            name: "Boots",
            description: "Footwear that covers the ankle, suitable for various occasions.",
            image: "path/to/boots.jpg"
        },
        {
            name: "Slippers",
            description: "Soft, comfortable shoes typically worn indoors.",
            image: "https://s.alicdn.com/@sc04/kf/Ha2a27c48869047eba4b10e01dce63294k.jpg_720x720q50.jpg"
        },
        {
            name: "Sandals",
            description: "Open-toed footwear ideal for warm weather.",
            image: "path/to/sandals.jpg"
        },
        {
            name: "Loafers",
            description: "Slip-on shoes suitable for casual or semi-formal wear.",
            image: "path/to/loafers.jpg"
        },
        {
            name: "Oxfords",
            description: "Classic lace-up shoes commonly worn in formal settings.",
            image: "path/to/oxfords.jpg"
        },
        {
            name: "Brogues",
            description: "Lace-up shoes featuring decorative perforations.",
            image: "path/to/brogues.jpg"
        },
        {
            name: "Moccasins",
            description: "Soft, flexible shoes with a simple slip-on design.",
            image: "path/to/moccasins.jpg"
        },
        {
            name: "Flip-Flops",
            description: "Casual sandals with a Y-shaped strap, perfect for summer.",
            image: "path/to/flipflops.jpg"
        },
        {
            name: "Clogs",
            description: "Backless shoes with a thick sole, often made of wood.",
            image: "path/to/clogs.jpg"
        },
        {
            name: "Espadrilles",
            description: "Casual shoes with a jute rope sole, popular in summer.",
            image: "path/to/espadrilles.jpg"
        },
        {
            name: "High-tops",
            description: "Sneakers that extend above the ankle for added support.",
            image: "path/to/high-tops.jpg"
        },
        {
            name: "Platforms",
            description: "Shoes with thick soles for added height and style.",
            image: "path/to/platforms.jpg"
        },
        {
            name: "Wedges",
            description: "Shoes with wedge-shaped heels, combining height and stability.",
            image: "path/to/wedges.jpg"
        },
        {
            name: "Court Shoes",
            description: "Women’s shoes with a low-cut front and a high heel.",
            image: "path/to/court-shoes.jpg"
        }
    ];
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
                        <FormField
                        name="size"
                        control={form.control}
                        render={({field})=>(
                            <FormItem className='pt-3'>
                                <FormLabel>Size</FormLabel>
                                <FormDescription className='text-xs text-muted-foreground'>Select size</FormDescription>
                                <FormControl>
                                    <Input {...field} type="number"/>
                                </FormControl>
                                <FormMessage/>
                            </FormItem>
                        )}
                        />
                    </div>
                    <div className="w-full ">
                        <Gender name='gender' control={form.control}/>
                    </div>
                </div>
                <div className="w-full bg-muted/50 mt-5 rounded-lg p-5">
                    <h2>Properties</h2>
                    
                    <div className="grid grid-cols-2 gap-5">
                        
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
                        name="colour"
                        control={form.control}
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
                            name="categoryType"
                            control={form.control}
                            render={({ field }) => (
                            <FormItem>
                            <FormLabel>Category Type</FormLabel>
                            <FormControl>
                                <Select>
                                    <SelectTrigger {...field}>
                                        <SelectValue placeholder="select category" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {productCategories.map(category=>(

                                        <HoverCard key={category.name}>
                                            <HoverCardTrigger asChild>
                                                <SelectItem value={category.name}>{category.name}</SelectItem>
                                            </HoverCardTrigger>
                                            <HoverCardContent className="w-80">
                                                <div className="flex justify-between space-x-4">
                                                <Avatar>
                                                    <AvatarImage src={category.image}
                                                    />
                                                    <AvatarFallback>VC</AvatarFallback>
                                                </Avatar>
                                                <div className="space-y-1">
                                                    <h4 className="text-sm font-semibold">{category.name}</h4>
                                                    <p className="text-sm">
                                                        {category.description}
                                                    </p>
                                                </div>
                                                </div>
                                            </HoverCardContent>
                                        </HoverCard>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </FormControl>
                            
                            <FormMessage />
                            </FormItem>
                        )}
                        />
                        <ToogleElement select='single' label='Occasion' name="occasion" values={["Casual","Formal","Athletic","Outdoor","Office","Special Occasions","Seasonal"]} control={form.control}/>
                        <FormField
                        name="material"
                        control={form.control}
                        render={({field})=>(
                            <FormItem>
                                <FormLabel className='text-sm'>Material</FormLabel>
                                <FormControl>
                                    <Input {...field} type='text'/>
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
