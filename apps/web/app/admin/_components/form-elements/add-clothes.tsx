"use client";
import { MultiSelect } from '@/components/multi-select';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command";
import { Input } from '@/components/ui/input';
import { Popover, PopoverContent, PopoverTrigger, } from "@/components/ui/popover";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { cn } from "@/lib/utils";
import { zodResolver } from '@hookform/resolvers/zod';
import { getCategories } from 'app/admin/_actions/categoryAction';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from 'app/components/form';
import { filterProduct } from 'app/lib/consts';
import { clothingSchema } from 'app/lib/types/product';
import { Check, ChevronsUpDown, Upload } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import z from 'zod';
import { createProduct } from "../../_actions/productAction";
import { Spinner } from '../spinnerLoader';
import Gender from './gender';
import Size from './size';
 
export default function AddClothForm() {
    const [categoryArray,setCategoryArray]=useState<{label:string,value:string}[] >();
    useEffect(()=>{
        getCategories()
        .then(res=>{
            const categories=res.map((category)=>({
                label:category.name,
                value:`${category.id}`
            }));
        setCategoryArray(categories);
        })
        .catch(e=>console.log(e))
    },[]);
    const [open, setOpen] = useState(false)
    const [value, setValue] = useState("")

    const [images, setImages] = useState<File[]>([]);
    const [imageUrl,setImageUrl]=useState<string[]>([])
   
    type clothingType=z.infer<typeof clothingSchema >;
    const form=useForm<clothingType>({
        resolver:zodResolver(clothingSchema),
        defaultValues:{
                name: "",
                description: "",
                gender:"",
                size: "",
                price:1,
                prevprice:1,
                material: "",
                colour: "",
                pattern: "",
                fit: "",
                occasion: "",
                season: "",
                brandId:1,
                categoryId:[],
                categoryType:"CLOTHING",
                stock:1,
                images:[]
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
  return (
<Form {...form}>
    <form onSubmit={form.handleSubmit(async data=>await createProduct(data))}>
        <div className='w-full grid grid-cols-3 gap-5 h-full '>
            <div className="col-span-2 bg-muted/50 overflow-scroll rounded-lg p-5">
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
                <div className="grid grid-cols-2  gap-5">
                    <div className="w-full ">
                        <Size values={["2XS","XS","S","M","L","XL","2XL"]} control={form.control} name="size"/>
                    </div>
                    <div className="w-full ">
                        <Gender name='gender' control={form.control}/>
                    </div>
                        <FormField
                            name="material"
                            control={form.control}
                            render={({field})=>(
                                <FormItem>
                                    <FormLabel className='text-sm block'>Material</FormLabel>
                                    <FormControl>
                                    <Popover  open={open} onOpenChange={setOpen}>
                                        <PopoverTrigger asChild {...field}>
                                            <Button
                                                variant="outline"
                                                role="combobox"
                                                aria-expanded={open}
                                                className="w-full justify-between"
                                                >
                                                {value
                                                    ? filterProduct.CLOTHING[1]?.value.find((material) => material === value)
                                                    : "Select Material"}
                                                <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                                            </Button>
                                        </PopoverTrigger>
                                        <PopoverContent className="p-0" side="bottom" align="start">
                                        <Command>
                                            <CommandInput placeholder="Change status..." />
                                            <CommandList>
                                                <CommandEmpty>No results found.</CommandEmpty>
                                                <CommandGroup>
                                                    {filterProduct.CLOTHING[1]?.value.map((material) => (
                                                        <CommandItem
                                                        key={material+"12"}
                                                        value={material}
                                                        onSelect={(currentValue) => {
                                                            setValue(currentValue === value ? "" : currentValue)
                                                            setOpen(false)
                                                        }}
                                                        >
                                                        <Check
                                                            className={cn(
                                                            "mr-2 h-4 w-4",
                                                            value === material ? "opacity-100" : "opacity-0"
                                                            )}
                                                        />
                                                        {material}
                                                        </CommandItem>
                                                    ))}
                                                    </CommandGroup>
                                            </CommandList>
                                        </Command>
                                        </PopoverContent>
                                    </Popover>
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
                                            <SelectGroup>
                                                <SelectLabel>Brands of Products</SelectLabel>
                                                <SelectItem value="1">Adidas</SelectItem>
                                                <SelectItem value="2">puma</SelectItem>
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
                                    <FormLabel className='text-sm'>Color</FormLabel>
                                    <FormControl>
                                        <Input {...field} type="text"/>
                                    </FormControl>
                                    <FormMessage/>
                                </FormItem>
                            )}
                        />
                        <FormField
                            name="fit"
                            control={form.control}
                            render={({field})=>(
                            <FormItem>
                                <FormLabel className='text-sm'>Fit</FormLabel>
                                    <Select {...field}>
                                        <FormControl>
                                            <SelectTrigger>
                                                <SelectValue placeholder="select Fit Types" />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            <SelectGroup>
                                                <SelectLabel>Tops e.g.,Shirts, T-Shirts, Jackets</SelectLabel>
                                                <SelectItem value="slim Fit">Slim Fit </SelectItem>
                                                <SelectItem value="regular Fit"> Regular Fit</SelectItem>
                                                <SelectItem value="relaxed Fit">Relaxed Fit </SelectItem>
                                                <SelectItem value="Oversized Fit">Oversized Fit </SelectItem>
                                                <SelectItem value="Tailored Fit">Tailored Fit </SelectItem>
                                                <SelectItem value="Boxy Fit"> Boxy Fit</SelectItem>
                                            </SelectGroup>
                                            <SelectGroup>
                                                <SelectLabel>Bottoms e.g., Trousers, Jeans, Shorts</SelectLabel>
                                                <SelectItem value="Skinny Fit">Skinny Fit </SelectItem>
                                                <SelectItem value="Slim Fit">Slim Fit </SelectItem>
                                                <SelectItem value="Regular Fit">Regular Fit </SelectItem>
                                                <SelectItem value="Relaxed Fit">Relaxed Fit </SelectItem>
                                                <SelectItem value="Tapered Fit"> Tapered Fit</SelectItem>
                                                <SelectItem value="Bootcut Fit">Bootcut Fit </SelectItem>
                                                <SelectItem value="Wide Leg Fit">Wide Leg Fit </SelectItem>
                                                <SelectItem value="Cropped Fit">Cropped Fit </SelectItem>

                                            </SelectGroup>
                                            <SelectGroup>
                                                <SelectLabel>Dresses</SelectLabel>
                                                <SelectItem value="Bodycon Fit">Bodycon Fit </SelectItem>
                                                <SelectItem value="A-line Fit"> A-line Fit</SelectItem>
                                                <SelectItem value="Shift Fit">Shift Fit </SelectItem>
                                                <SelectItem value="Fit and Flare">Fit and Flare </SelectItem>
                                                <SelectItem value="Wrap Fit">Wrap Fit </SelectItem>
                                                <SelectItem value="Empire Fit">Empire Fit </SelectItem>
                                            </SelectGroup>
                                        </SelectContent>
                                    </Select>
                                <FormMessage/>
                            </FormItem>
                        )}
                        />
                        <FormField
                            name="occasion"
                            control={form.control}
                            render={({field})=>(
                            <FormItem>
                                <FormLabel className='text-sm'>Occasion</FormLabel>
                                    <Select {...field}>
                                        <FormControl>
                                            <SelectTrigger>
                                                <SelectValue placeholder="select Occasion Types" />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            <SelectGroup>
                                                <SelectLabel>Everyday and Relaxed Occasions</SelectLabel>
                                                <SelectItem value="Casual">Casual </SelectItem>
                                                <SelectItem value="Smart Casual"> Smart Casual</SelectItem>
                                                <SelectItem value="Loungewear">Loungewear </SelectItem>
                                            </SelectGroup>
                                            <SelectGroup>
                                                <SelectLabel>Professional and Formal Settings</SelectLabel>
                                                <SelectItem value="Business Casual">Business Casual </SelectItem>
                                                <SelectItem value="Business Formal">Business Formal </SelectItem>
                                                <SelectItem value="Formal/Black Tie"> Formal/Black Tie</SelectItem>
                                            </SelectGroup>
                                            <SelectGroup>
                                                <SelectLabel>Festive and Cultural Occasions</SelectLabel>
                                                <SelectItem value="Festive/Party Wear">Festive/Party Wear </SelectItem>
                                                <SelectItem value="Ethnic/Traditional">Ethnic/Traditional </SelectItem>
                                            </SelectGroup>
                                            <SelectGroup>
                                                <SelectLabel>Seasonal and Outdoor Activities</SelectLabel>
                                                <SelectItem value="Beachwear/Resort Wear">Beachwear/Resort Wear </SelectItem>
                                                <SelectItem value="Activewear/Sportswear">Relaxed Fit </SelectItem>
                                                <SelectItem value="Outerwear/Weather-Specific"> Outerwear/Weather-Specific</SelectItem>
                                            </SelectGroup>
                                            <SelectGroup>
                                                <SelectLabel>Specialised Occasions</SelectLabel>
                                                <SelectItem value="Wedding Attire">Wedding Attire </SelectItem>
                                                <SelectItem value="Evening Wear">Wide Leg Fit </SelectItem>
                                            </SelectGroup>
                                        </SelectContent>
                                    </Select>
                                <FormMessage/>
                            </FormItem>
                        )}
                        />
                        <FormField
                            name='pattern'
                            control={form.control}
                            render={({field})=>(
                                <FormItem>
                                    <FormLabel className='text-sm'>Pattern</FormLabel>
                                    <FormControl>
                                         <Input type="text" {...field}/>
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
                                    categoryArray?categoryArray:
                                    [
                                        {label:'clothing',value:"1"},
                                        {label:'footwear',value:"2"},
                                        {label:'accessory',value:"3"},
                                        {label:'jewellery',value:"4"},
                                        {label:'bag',value:"5"},
                                        {label:'outerwear',value:"6"},
                                        {label:'watches',value:"7"},
                                        {label:'underwear',value:"8"},
                                    ]
                                }
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
                <Card className="h-fit border-none bg-muted/50" >
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
