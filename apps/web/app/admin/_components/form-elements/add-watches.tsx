"use client";
import { MultiSelect } from '@/components/multi-select';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';
import { cn } from '@/lib/utils';
import { zodResolver } from '@hookform/resolvers/zod';
import { ListBrands } from 'app/admin/_actions/listBrandsAction';
import { createProduct } from 'app/admin/_actions/productAction';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from 'app/components/form';
import { CategoryType } from 'app/lib/types/product';
import { Check, Upload } from 'lucide-react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import z from 'zod';
import { Spinner } from '../spinnerLoader';
import Size from './size';
const fileSizeLimit = 5 * 1024 * 1024; // 5MB
const watchesSchema = z.object({
    name: z.string().min(1),
    price: z.coerce.number().positive(),
    prevprice: z.coerce.number().positive(),
    description: z.string().optional(), 
    strapMaterial: z.string().optional(), // e.g., Leather, Metal
    dialShape: z.string().optional(),     // e.g., Round, Square
    waterResistance: z.string().optional(), // e.g., 50m, 100m
    brandId: z.coerce.number().optional(),       // Foreign key reference to Brand
    colour:z.string().optional(), 
    categoryId: z.coerce.number().array(),               // Foreign key reference to Category
    categoryType:CategoryType,
    gender:z.string().optional(),
    size:z.string().optional(),
    stock: z.coerce.number().int().nonnegative(),
    images:z.any().array()
})

export default function AddWatchForm() {
    const [images, setImages] = useState<File[]>([]);
    const [imageUrl,setImageUrl]=useState<string[]>([])

    type watchType=z.infer<typeof watchesSchema >;
    const form=useForm<watchType>({
        resolver:zodResolver(watchesSchema),
        // mode: 'onChange',
        defaultValues: {
    name: "",
    price: 0,
    prevprice: 0,
    description: "",
    images: [],
    strapMaterial: "",
    dialShape: "",
    waterResistance: "",
    brandId: undefined,
    gender:"",
    size:"",
    colour: "",
    categoryId: [],
    categoryType:"WATCH",
    stock: 0,
  },
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
                        {/* <Gender name='gender' control={form.control}/> */}
                        <div className='pt-3'>
                            <FormField
                                name={"gender"}
                                control={form.control}
                                render={({field})=>(
                                    <FormItem>
                                        <FormLabel>Gender</FormLabel>
                                        <FormDescription className="text-xs text-muted-foreground">pick Available Gender</FormDescription>
                                        <FormControl>
                                            <ToggleGroup {...field} variant="outline" type="single" className='w-full flex justify-around'>
                                                <ToggleGroupItem value="Men" aria-label="Toggle underline">
                                                    Men
                                                </ToggleGroupItem>
                                                <ToggleGroupItem value="Women" aria-label="Toggle bold">
                                                    Women
                                                </ToggleGroupItem>
                                                <ToggleGroupItem value="Unisex" aria-label="Toggle italic">
                                                    Unisex
                                                </ToggleGroupItem>
                                            </ToggleGroup>
                                        </FormControl>
                                    </FormItem>
                                )}
                            />
                        </div> 
                    </div>
                </div>
                <div className="w-full bg-muted/50 mt-5 rounded-lg p-5">
                    <h2>Properties</h2>
                    
                    <div className="grid grid-cols-2 gap-5">
                        <FormField
                        name="strapMaterial"
                        control={form.control}
                        render={({field})=>(
                            <FormItem>
                                <FormLabel className="text-sm">Material</FormLabel>
                                <FormControl>
                                    <Select onValueChange={field.onChange}>
                                        <SelectTrigger >
                                            <SelectValue placeholder="Select Strap Material"/>
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectGroup>
                                                <SelectLabel>Strap Materials</SelectLabel>
                                                <SelectItem value="Plastic">Plastic</SelectItem>
                                                <SelectItem value="Rubber">Rubber</SelectItem>
                                                <SelectItem value="Leather">Leather</SelectItem>
                                                <SelectItem value="Metal">Metal</SelectItem>
                                            </SelectGroup>
                                        </SelectContent>
                                    </Select>
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
                                    <Select onValueChange={field.onChange}>
                                        <SelectTrigger >
                                            <SelectValue placeholder="Select Brand"/>
                                        </SelectTrigger>
                                        <SelectContent>
                                            <ListBrands/>
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
                        name="dialShape"
                        control={form.control}
                        render={({field})=>(
                            <FormItem>
                                <FormLabel>Dial Shape</FormLabel>
                                <FormControl>
                                    <Select>
                                        <SelectTrigger {...field}>
                                            <SelectValue placeholder="Select Dial Shape"/>
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectGroup>
                                                <SelectItem value='rounded'>Rounded</SelectItem>
                                                <SelectItem value="rectangle">Rectangle</SelectItem>
                                                <SelectItem value="square">Square</SelectItem>
                                            </SelectGroup>
                                        </SelectContent>
                                    </Select>
                                </FormControl>
                            </FormItem>
                        )}
                        />
                        <FormField
                        name="waterResistance"
                        control={form.control}
                        render={({field})=>(
                            <FormItem>
                                <FormLabel>Water Resistance</FormLabel>
                                <FormControl>
                                    <Select onValueChange={field.onChange} >
                                        <SelectTrigger >
                                            <SelectValue placeholder="Select Water Resistance" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectGroup>
                                                <SelectItem value="70m">70m</SelectItem>
                                                <SelectItem value="50m">50m</SelectItem>
                                                <SelectItem value='30m'>30m</SelectItem>
                                            </SelectGroup>
                                        </SelectContent>
                                    </Select>
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
            <div className="col-span-1 flex flex-col gap-5 justify-start">
            
                {/* <UploadImage name="images" control={form.control}/> */}
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
                        
                            {/* <button onClick={selectFiles} className="flex aspect-square w-full items-center justify-center rounded-md border border-dashed">
                                <Upload className="h-4 w-4 text-muted-foreground" />
                                <span className="sr-only">Upload</span>
                            </button> */}
                        </div>
                    </div>
                    </CardContent>
                </Card>
            <FormField
                name="categoryType"
                control={form.control}
                render={({field})=>(
                    <FormItem>
                        <FormControl>
                            <Input type='hidden' {...field} value="WATCH" />
                        </FormControl>
                        <FormMessage/>
                    </FormItem>
                )}
                />
               
            </div>
        </div>
    </form>
</Form>
  )
}


