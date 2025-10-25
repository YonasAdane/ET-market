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
import { accessoriesSchema } from 'app/lib/types/product';
import { Check } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import z from 'zod';
import { Spinner } from '../spinnerLoader';
import { UploadMultipleImage } from '../uploadImages';
import Gender from './gender';
import Size from './size';

<<<<<<< HEAD
export default function AddAccessoryForm() {
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

    type accessoryType = z.infer<typeof accessoriesSchema>;
    const form = useForm<accessoryType>({
        resolver: zodResolver(accessoriesSchema),
        defaultValues: {
=======
  export default function AddAccesoryForm() {
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
    type accessoryType=z.infer<typeof accessoriesSchema >;
    const form=useForm<accessoryType>({
        resolver:zodResolver(accessoriesSchema),
        defaultValues:{
>>>>>>> 352d9d8e773d213e19842bf445d5e00ccc67a7e7
            name: "",
            description: "",
            colour: "",
            material: "",
            size: [],
<<<<<<< HEAD
            gender: "",
            price: 1,
            prevprice: 1,
            brandId: undefined,
            categoryId: [],
            categoryType: "ACCESSORY",
            stock: 0,
            images: []
        }
    });
=======
            gender:"",
            price: 1,
            prevprice: 1,
            brandId: 1,
            categoryId: [],
            categoryType:"ACCESSORY",
            stock: 0
        }
    });
    
>>>>>>> 352d9d8e773d213e19842bf445d5e00ccc67a7e7

    const onSubmit = async (data: accessoryType) => {
        setIsSubmitting(true);
        
<<<<<<< HEAD
        try {
            // Create FormData object
            const formData = new FormData();
            
            // Append all form fields
            formData.append('name', data.name);
            formData.append('price', data.price.toString());
            formData.append('prevprice', data.prevprice.toString());
            formData.append('description', data.description || '');
            formData.append('material', data.material || '');
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
                    description: "Accessory added successfully",
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
=======
       }
    }
    
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
                        
>>>>>>> 352d9d8e773d213e19842bf445d5e00ccc67a7e7
                        <FormField
                            name="name"
                            control={form.control}
                            render={({ field }) => (
<<<<<<< HEAD
=======
                            <FormItem>
                            <FormLabel>Category Type</FormLabel>
                            <FormControl>
                                <MultiSelect
                                options={categoryArray}
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
>>>>>>> 352d9d8e773d213e19842bf445d5e00ccc67a7e7
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
                                    name="material"
                                    control={form.control}
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel className="text-sm">Material</FormLabel>
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
                                                            {brandArray.length > 0 ? (
                                                                brandArray.map(brand => (
                                                                    <SelectItem key={brand.label} value={brand.value}>
                                                                        {brand.label}
                                                                    </SelectItem>
                                                                ))
                                                            ) : (
                                                                <SelectItem value="1">Loading brands...</SelectItem>
                                                            )}
                                                        </SelectGroup>
                                                    </SelectContent>
                                                </Select>
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="colour"
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
                                    name="categoryId"
                                    control={form.control}
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Category Type</FormLabel>
                                            <FormControl>
                                                <MultiSelect
                                                    options={
                                                        categoryArray.length > 0 
                                                            ? categoryArray 
                                                            : [
                                                                {label: 'clothing', value: "1"},
                                                                {label: 'footwear', value: "2"},
                                                                {label: 'accessory', value: "3"},
                                                                {label: 'jewellery', value: "4"},
                                                                {label: 'bag', value: "5"},
                                                                {label: 'outerwear', value: "6"},
                                                                {label: 'watches', value: "7"},
                                                                {label: 'underwear', value: "8"},
                                                            ]
                                                    }
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
                                <FormField
                                    name="categoryType"
                                    control={form.control}
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormControl>
                                                <Input type='hidden' {...field} value="ACCESSORY" />
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
                                    Add Accessory
                                </Button>
                            </div>
                        </div>
                    </div>
                    <div className="col-span-1 flex flex-col gap-5 justify-start">
                        <UploadMultipleImage 
                            name="images" 
                            label='Accessory Images' 
                            form={form} 
                            description='Upload accessory images' 
                        />
                    </div>
                </div>
<<<<<<< HEAD
            </form>
        </Form>
    );
=======
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
>>>>>>> 352d9d8e773d213e19842bf445d5e00ccc67a7e7
}