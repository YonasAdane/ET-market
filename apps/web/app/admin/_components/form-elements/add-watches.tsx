"use client";
import { MultiSelect } from '@/components/multi-select';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';
import { zodResolver } from '@hookform/resolvers/zod';
import { getBrands } from 'app/admin/_actions/brandAction';
import { getCategories } from 'app/admin/_actions/categoryAction';
import { createProduct } from 'app/admin/_actions/productAction';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from 'app/components/form';
import { CategoryType } from 'app/lib/types/product';
import { Check } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import z from 'zod';
import { Spinner } from '../spinnerLoader';
<<<<<<< HEAD
import { SortableImageUpload, UploadMultipleImage } from '../uploadImages';
=======
import { UploadMultipleImage } from '../uploadImages';
>>>>>>> 352d9d8e773d213e19842bf445d5e00ccc67a7e7
import Gender from './gender';
import Size from './size';

const watchesSchema = z.object({
    name: z.string().min(1, "Product name is required"),
    price: z.coerce.number().positive("Price must be positive"),
    prevprice: z.coerce.number().positive("Previous price must be positive"),
    description: z.string().optional(), 
<<<<<<< HEAD
    strapMaterial: z.string().optional(),
    dialShape: z.string().optional(),
    waterResistance: z.string().optional(),
    brandId: z.coerce.number().optional(),
    colour: z.string().optional(), 
    categoryId: z.array(z.coerce.number()).min(1, "At least one category is required"),
    categoryType: CategoryType,
    gender: z.string().optional(),
    size: z.array(z.string()).min(1, "At least one size is required"),
    stock: z.coerce.number().int().nonnegative("Stock must be a non-negative integer"),
    images: z.array(z.any()).min(1, "At least one image is required")
});

export default function AddWatchForm() {
    const [categoryArray, setCategoryArray] = useState<{label: string, value: string}[]>([]);
    const [brandArray, setBrandArray] = useState<{label: string, value: string}[]>([]);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const { toast } = useToast();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [categories, brands] = await Promise.all([getCategories(), getBrands()]);
                setCategoryArray(
                    categories.success && categories.data 
                        ? categories.data.map((category) => ({
                            label: category.name,
                            value: `${category.id}`
                        }))
                        : []
                );
                setBrandArray(
                    brands.success && brands.data 
                        ? brands.data.map((brand) => ({
                            label: brand.name,
                            value: `${brand.id}`
                        }))
                        : []
                );
            } catch (error) {
                console.log("Error fetching data", error);
                toast({
                    variant: 'destructive',
                    title: "Error fetching data",
                    description: "Failed to load categories and brands",
                });
            }
        };
        fetchData();
    }, [toast]);

    type watchType = z.infer<typeof watchesSchema>;
    const form = useForm<watchType>({
        resolver: zodResolver(watchesSchema),
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
            gender: "",
            size: [],
            colour: "",
            categoryId: [],
            categoryType: "WATCH",
            stock: 0,
        },
    });

    const onSubmit = async (data: watchType) => {
        setIsSubmitting(true);
        
        try {
            // Create FormData object
            const formData = new FormData();
            
            // Append all form fields
            formData.append('name', data.name);
            formData.append('price', data.price.toString());
            formData.append('prevprice', data.prevprice.toString());
            formData.append('description', data.description || '');
            formData.append('strapMaterial', data.strapMaterial || '');
            formData.append('dialShape', data.dialShape || '');
            formData.append('waterResistance', data.waterResistance || '');
            formData.append('brandId', data.brandId?.toString() || '');
            formData.append('colour', data.colour || '');
            formData.append('categoryType', data.categoryType);
            formData.append('gender', data.gender || '');
            formData.append('stock', data.stock.toString());
            
            // Append arrays as JSON strings
            formData.append('categoryId', JSON.stringify(data.categoryId));
            formData.append('size', JSON.stringify(data.size));
            
            // Append images
            data.images.forEach((image, index) => {
                if (image instanceof File) {
                    formData.append(`images`, image);
                } else if (image.file) {
                    formData.append(`images`, image.file);
                }
            });

            console.log("Submitting FormData with:", {
                name: data.name,
                price: data.price,
                categoryId: data.categoryId,
                imagesCount: data.images.length
            });

            const response = await createProduct(formData);

            if (response.error) {
                toast({
                    variant: 'destructive',
                    title: "Error submitting product",
                    description: response.error,
                });
            } else if (response.success) {
                toast({
                    title: "Success!",
                    description: "Product added successfully",
                });
                form.reset();
            }
        } catch (error) {
            console.error("Submission error:", error);
            toast({
                variant: 'destructive',
                title: "Submission failed",
                description: "An unexpected error occurred",
            });
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
                <div className='w-full grid grid-cols-3 gap-5 h-full'>
                    <div className="col-span-2 bg-muted/50 rounded-lg p-5">
                        <h2>General Information</h2>
                        <FormField
                            name="name"
                            control={form.control}
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className='text-sm'>Product Name</FormLabel>
                                    <FormControl>
                                        <Input 
                                            {...field} 
                                            className="bg-slate-200 dark:bg-slate-600 focus:outline-transparent my-2 focus:shadow-outline focus:border-none appearance-none" 
                                            type="text"
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            name="description"
                            control={form.control}
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className='text-sm'>Product Description</FormLabel>
                                    <FormControl>
                                        <Textarea 
                                            {...field} 
                                            className="bg-slate-200 dark:bg-slate-600 focus:outline-transparent my-2 focus:shadow-outline focus:border-none appearance-none h-32" 
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <div className="flex justify-between gap-5">
                            <div className="w-full">
                                <Size control={form.control} values={["Small", "Medium", "Large"]} name="size" />
                            </div>
                            <div className="w-full">
                                <Gender name='gender' control={form.control} />
                            </div>
                        </div>
                        <div className="w-full bg-muted/50 mt-5 rounded-lg p-5">
                            <h2>Properties</h2>
                            <div className="grid grid-cols-2 gap-5">
                                <FormField
                                    name="strapMaterial"
                                    control={form.control}
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel className="text-sm">Material</FormLabel>
                                            <FormControl>
                                                <Select onValueChange={field.onChange} value={field.value}>
                                                    <SelectTrigger>
                                                        <SelectValue placeholder="Select Strap Material" />
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
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    name="brandId"
                                    control={form.control}
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel className='text-sm'>Brand</FormLabel>
                                            <FormControl>
                                                <Select onValueChange={field.onChange} value={String(field.value || '')}>
                                                    <SelectTrigger>
                                                        <SelectValue placeholder="Select Brand" />
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                        <SelectGroup>
                                                            <SelectLabel>Brands of Products</SelectLabel>
                                                            {brandArray.length > 0 && brandArray.map(brand => (
                                                                <SelectItem key={brand.label} value={brand.value}>{brand.label}</SelectItem>
                                                            ))}
                                                        </SelectGroup>
                                                    </SelectContent>
                                                </Select>
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    name="colour"
                                    control={form.control}
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Colour</FormLabel>
                                            <FormControl>
                                                <Input {...field} type='text' />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    name="dialShape"
                                    control={form.control}
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Dial Shape</FormLabel>
                                            <FormControl>
                                                <Select onValueChange={field.onChange} value={field.value}>
                                                    <SelectTrigger>
                                                        <SelectValue placeholder="Select Dial Shape" />
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
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    name="waterResistance"
                                    control={form.control}
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Water Resistance</FormLabel>
                                            <FormControl>
                                                <Select onValueChange={field.onChange} value={field.value}>
                                                    <SelectTrigger>
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
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    name="categoryId"
                                    control={form.control}
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Category (collection)</FormLabel>
                                            <FormControl>
                                                <MultiSelect
                                                    options={categoryArray.length > 0 ? categoryArray : [{ label: 'Empty', value: "1" }]}
                                                    onValueChange={field.onChange}
                                                    placeholder="Select options"
                                                    variant="inverted"
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
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel className="text-sm">Base Pricing</FormLabel>
                                                <FormControl>
                                                    <Input 
                                                        {...field} 
                                                        className="bg-slate-200 dark:bg-slate-600 focus:outline-transparent my-2 focus:shadow-outline focus:border-none appearance-none" 
                                                        type="number" 
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        name="price"
                                        control={form.control}
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel className="text-sm">Current Price</FormLabel>
                                                <FormControl>
                                                    <Input 
                                                        {...field} 
                                                        className="bg-slate-200 dark:bg-slate-600 focus:outline-transparent my-2 focus:shadow-outline focus:border-none appearance-none" 
                                                        type="number" 
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </div>
                                <div className="w-full">
                                    <FormField
                                        name="stock"
                                        control={form.control}
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel className='text-sm'>Stock</FormLabel>
                                                <FormControl>
                                                    <Input 
                                                        {...field} 
                                                        className="bg-slate-200 dark:bg-slate-600 focus:outline-transparent my-2 focus:shadow-outline focus:border-none appearance-none" 
                                                        type="number" 
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="row-span-1">
                            <div className="w-fit ml-auto mt-3">
                                <Button 
                                    type='submit' 
                                    disabled={isSubmitting || !form.formState.isValid}
                                    className={cn(
                                        (isSubmitting || !form.formState.isValid) && "cursor-not-allowed bg-muted-foreground/100",
                                        "p-3 rounded-full mr-0"
                                    )} 
                                    variant="default"
                                >
                                    {!isSubmitting ? 
                                        <Check size={18} className="mr-1" /> 
                                        : 
                                        <Spinner className="mr-1 size-5" />
                                    }
                                    Add Product
                                </Button>
                            </div>
                        </div>
                    </div>
                    <div className="col-span-1 flex flex-col gap-5 justify-start">
                        <SortableImageUpload 
                            form={form} 
                            name="images"
                            label="Brand Images"
                            description="Upload and reorder brand images (drag to sort)"
                            maxFiles={5}
                            maxSize={5_000_000}
                        />
                        <FormField
                            name="categoryType"
                            control={form.control}
                            render={({ field }) => (
                                <FormItem>
                                    <FormControl>
                                        <Input type='hidden' {...field} value="WATCH" />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>
                </div>
            </form>
        </Form>
    );
}
=======
    strapMaterial: z.string().optional(), // e.g., Leather, Metal
    dialShape: z.string().optional(),     // e.g., Round, Square
    waterResistance: z.string().optional(), // e.g., 50m, 100m
    brandId: z.coerce.number().optional(),       // Foreign key reference to Brand
    colour:z.string().optional(), 
    categoryId: z.coerce.number().array(),               // Foreign key reference to Category
    categoryType:CategoryType,
    gender:z.string().optional(),
    size:z.array(z.string()),
    stock: z.coerce.number().int().nonnegative(),
    images:z.any().array()
})

export default function AddWatchForm() {
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
    size:[],
    colour: "",
    categoryId: [],
    categoryType:"WATCH",
    stock: 0,
        },
            });
    
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
                                            <SelectGroup>
                                                <SelectLabel>Brands of Products</SelectLabel>
                                                {
                                                    brandArray.length>0 && brandArray.map(brand=>(
                                                        <SelectItem key={brand.label} value={`${brand.value}`}>{brand.label}</SelectItem>
                                                    ))
                                                }
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
                            <FormLabel>Category (collection)</FormLabel>
                            <FormControl>
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
                <UploadMultipleImage name="images" label='Product' form={form} description='Brand Image' />
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


>>>>>>> 352d9d8e773d213e19842bf445d5e00ccc67a7e7
