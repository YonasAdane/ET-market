
"use client";
import { MultiSelect } from '@/components/multi-select';
import { Button } from '@/components/ui/button';
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from '@/components/ui/command';
import { Input } from '@/components/ui/input';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { filterProduct } from '@/lib/constants';
import { cn } from '@/lib/utils';
import { zodResolver } from '@hookform/resolvers/zod';
import { getBrands } from 'app/admin/_actions/brandAction';
import { getCategories } from 'app/admin/_actions/categoryAction';
import { createProduct } from 'app/admin/_actions/productAction';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from 'app/components/form';
import { outerwearSchema } from 'app/lib/types/product';
import { Check, ChevronsUpDown } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import z from 'zod';
import { Spinner } from '../spinnerLoader';
import { UploadMultipleImage } from '../uploadImages';
import Gender from './gender';
import ToogleElement from './toggle-element';

export default function AddOuterwearForm() {
    const [categoryArray,setCategoryArray]=useState<{label:string,value:string}[] >([]);
    const [brandArray,setBrandArray]=useState<{label:string,value:string}[] >([]);
    const { toast } = useToast()

    useEffect(()=>{
        const fetchData = async () => {
            try {
                const [categories,brands]=await Promise.all([ getCategories(),getBrands()])
        
        setCategoryArray(categories.map((category)=>({
            label:category.name,
            value:`${category.id}`})
        ));
        setBrandArray(brands.map((brand)=>({
            label:brand.name,
            value:`${brand.id}`})
        ));
        console.log(categoryArray,brandArray);
        
            } catch (error) {
                console.log("error fetching data",error);
                
            }

        }
        fetchData();
    },[]);
    const [open, setOpen] = useState(false)
    const [value, setValue] = useState("")

    type outerwearType=z.infer<typeof outerwearSchema >;
    const form=useForm<outerwearType>({
        resolver:zodResolver(outerwearSchema),
        defaultValues:{
            name: "",
            price: 1,
            prevprice: 1,
            description: "",
            material: "",
            insulationType: "",
            season: "",
            brandId: 1,
            categoryId: [],
            categoryType:"OUTERWEAR",
            stock: 1,
            images: []
        }
    });
    function addProduct(data:outerwearType){
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
    
    
  return (
<Form {...form}>
    <form onSubmit={form.handleSubmit(async data=>{
        console.log("Sending this data: ",data)
        const response=await createProduct(data)
        if(response.error){
            toast({
                variant:'destructive',
                title: "Error: something went wrong",
                description: response.error,
                })
        }
        if(response.success){
            toast({
                title: "Data sent successfully ",
                description: "product added successfully",
                })
            form.reset()
        }
        })}>
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
                        <ToogleElement control={form.control} description='select size' label='Size'  select='single' values={["S","M","L","XL","XXL"]} name="size"/>
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
                            name="season"
                            control={form.control}
                            render={({field})=>(
                                <FormItem>
                                    <FormLabel>Season</FormLabel>
                                    <FormControl>
                                        <Input {...field} type="text"/>
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
                                                {
                                                    brandArray.length>0 && brandArray.map(brand=>(
                                                        <SelectItem key={brand.label} value={`${brand.value}`}>{brand.label}</SelectItem>
                                                    ))
                                                }
                                                {/* <SelectItem value="1">Calvin Klein</SelectItem>
                                                <SelectItem value="2">Fruit of the Loom</SelectItem>
                                                <SelectItem value="3">Tommy Hilfiger</SelectItem>
                                                <SelectItem value="4">MeUndies</SelectItem>
                                                <SelectItem value="5">SAXX</SelectItem>
                                                <SelectItem value="6">Polo Ralph Lauren</SelectItem>
                                                <SelectItem value="7">Hanky Panky</SelectItem>
                                                <SelectItem value="8">Savage X Fenty</SelectItem>
                                                <SelectItem value="9">Bravado Designs</SelectItem>
                                                <SelectItem value="10">Knix</SelectItem>
                                                <SelectItem value="11">ThirdLove</SelectItem> */}
                                            </SelectGroup>
                                        </SelectContent>
                                    </Select>
                                </FormControl>
                                <FormMessage/>
                            </FormItem>
                        )}/>
                        <FormField
                            name="categoryId"
                            control={form.control}
                            render={({ field }) => (
                            <FormItem>
                            <FormLabel>Category Type</FormLabel>
                                        
                                {/* <Select onValueChange={field.onChange} defaultValue={field.value+''}> */}
                                    <FormControl>
                                    </FormControl>
                                    {/* <SelectContent> */}
                                        <MultiSelect
                                        options={
                                            categoryArray?categoryArray:
                                            [
                                                {label:'Empty',value:"1"},
                                            ]
                                        }
                                        onValueChange={field.onChange}
                                        //   defaultValue={field.value}
                                        placeholder="Select options"
                                        variant="inverted"
                                        //   animation={2}
                                        maxCount={3}
                                        />
                                        {/* <HoverCard key={category.name}>
                                            <HoverCardTrigger asChild>
                                                <SelectItem value={i+""}>{category.name}</SelectItem>
                                            </HoverCardTrigger>
                                            <HoverCardContent className="">
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
                                        </HoverCard> */}
                                    {/* </SelectContent> */}
                                {/* </Select> */}
                            <FormMessage/>
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
            <UploadMultipleImage name="images" label='picture' form={form} description='product image' />

        </div>
    </form>
</Form>
  )
}


