"use client";
import { MultiSelect } from '@/components/multi-select';
import { Button } from '@/components/ui/button';
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command";
import {
    FormDescription
} from "@/components/ui/form";
import { Input } from '@/components/ui/input';
import { Popover, PopoverContent, PopoverTrigger, } from "@/components/ui/popover";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { cn } from "@/lib/utils";
import { zodResolver } from '@hookform/resolvers/zod';
import { getBrands } from 'app/admin/_actions/brandAction';
import { getCategories } from 'app/admin/_actions/categoryAction';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from 'app/components/form';
import { filterProduct } from 'app/lib/consts';
import { clothingSchema } from 'app/lib/types/product';
import { Check, ChevronsUpDown } from 'lucide-react';
<<<<<<< HEAD
import React, { useEffect, useState } from 'react';
=======
import { useEffect, useState } from 'react';
>>>>>>> 352d9d8e773d213e19842bf445d5e00ccc67a7e7
import { useForm } from 'react-hook-form';
import z from 'zod';
import { createProduct } from "../../_actions/productAction";
import { Spinner } from '../spinnerLoader';
import { UploadMultipleImage } from '../uploadImages';
import Gender from './gender';
import Size from './size';
import { Badge } from "@/components/ui/badge";
import { X } from "lucide-react";

export default function AddClothForm() {
<<<<<<< HEAD
    const [categoryArray, setCategoryArray] = useState<{label: string, value: string}[]>([]);
    const [brandArray, setBrandArray] = useState<{label: string, value: string}[]>([]);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [materialOpen, setMaterialOpen] = useState(false);
    const [materialValue, setMaterialValue] = useState("");
    const { toast } = useToast();

    useEffect(() => {
=======
    const [categoryArray,setCategoryArray]=useState<{label:string,value:string}[] >([]);
    const [brandArray,setBrandArray]=useState<{label:string,value:string}[] >([]);
    const { toast } = useToast()

    useEffect(()=>{
>>>>>>> 352d9d8e773d213e19842bf445d5e00ccc67a7e7
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

<<<<<<< HEAD
    type clothingType = z.infer<typeof clothingSchema>;
    const form = useForm<clothingType>({
        resolver: zodResolver(clothingSchema),
        defaultValues: {
            name: "",
            description: "",
            gender: "",
            size: [],
            price: 1,
            prevprice: 1,
            material: "",
            colour: "",
            pattern: "",
            fit: "",
            occasion: "",
            season: "",
            brandId: undefined,
            categoryId: [],
            categoryType: "CLOTHING",
            stock: 1,
            images: []
        }
    });

    const onSubmit = async (data: clothingType) => {
        setIsSubmitting(true);
        
        try {
            // Create FormData object
            const formData = new FormData();
            
            // Append all form fields
            formData.append('name', data.name);
            formData.append('price', data.price.toString());
            formData.append('prevprice', data.prevprice.toString());
            formData.append('description', data.description || '');
            formData.append('material', data.material || '');
            formData.append('colour', data.colour || '');
            formData.append('pattern', data.pattern || '');
            formData.append('fit', data.fit || '');
            formData.append('occasion', data.occasion || '');
            formData.append('season', data.season || '');
            formData.append('brandId', data.brandId?.toString() || '');
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
                    description: "Clothing added successfully",
                });
                form.reset();
                setMaterialValue("");
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
                    <div className="col-span-2 bg-muted/50 overflow-scroll rounded-lg p-5">
                        <h2>General Information</h2>
                        <FormField
                            name="name"
=======
    type clothingType=z.infer<typeof clothingSchema >;
    const form=useForm<clothingType>({
        resolver:zodResolver(clothingSchema),
        defaultValues:{
                name: "",
                description: "",
                gender:"",
                size: [],
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
                        <Size values={["2XS","XS","S","M","L","XL","2XL"]}  control={form.control} name="size"/>
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
                                    <Select>
                                        <FormControl>
                                            <SelectTrigger {...field}>
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
>>>>>>> 352d9d8e773d213e19842bf445d5e00ccc67a7e7
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
                        <div className="grid grid-cols-2 gap-5">
                            <div className="w-full">
                                <Size values={["2XS", "XS", "S", "M", "L", "XL", "2XL"]} control={form.control} name="size"  />
                            </div>
                            <div className="w-full">
                                <Gender name='gender' control={form.control} />
                            </div>
                            <FormField
                                name="material"
                                control={form.control}
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className='text-sm block'>Material</FormLabel>
                                        <FormControl>
                                            <Popover open={materialOpen} onOpenChange={setMaterialOpen}>
                                                <PopoverTrigger asChild>
                                                    <Button
                                                        variant="outline"
                                                        role="combobox"
                                                        aria-expanded={materialOpen}
                                                        className="w-full justify-between"
                                                    >
                                                        {materialValue
                                                            ? filterProduct.CLOTHING[1]?.value.find((material) => material === materialValue)
                                                            : "Select Material"}
                                                        <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                                                    </Button>
                                                </PopoverTrigger>
                                                <PopoverContent className="p-0" side="bottom" align="start">
                                                    <Command>
                                                        <CommandInput placeholder="Search materials..." />
                                                        <CommandList>
                                                            <CommandEmpty>No results found.</CommandEmpty>
                                                            <CommandGroup>
                                                                {filterProduct.CLOTHING[1]?.value.map((material) => (
                                                                    <CommandItem
                                                                        key={material + "12"}
                                                                        value={material}
                                                                        onSelect={(currentValue) => {
                                                                            setMaterialValue(currentValue === materialValue ? "" : currentValue);
                                                                            field.onChange(currentValue);
                                                                            setMaterialOpen(false);
                                                                        }}
                                                                    >
                                                                        <Check
                                                                            className={cn(
                                                                                "mr-2 h-4 w-4",
                                                                                materialValue === material ? "opacity-100" : "opacity-0"
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
                                name="colour"
                                control={form.control}
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className='text-sm'>Color</FormLabel>
                                        <FormControl>
                                            <Input {...field} type="text" />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                name="fit"
                                control={form.control}
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className='text-sm'>Fit</FormLabel>
                                        <Select onValueChange={field.onChange} value={field.value}>
                                            <FormControl>
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Select Fit Types" />
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent>
                                                <SelectGroup>
                                                    <SelectLabel>Tops e.g.,Shirts, T-Shirts, Jackets</SelectLabel>
                                                    <SelectItem value="slim Fit">Slim Fit</SelectItem>
                                                    <SelectItem value="regular Fit">Regular Fit</SelectItem>
                                                    <SelectItem value="relaxed Fit">Relaxed Fit</SelectItem>
                                                    <SelectItem value="Oversized Fit">Oversized Fit</SelectItem>
                                                    <SelectItem value="Tailored Fit">Tailored Fit</SelectItem>
                                                    <SelectItem value="Boxy Fit">Boxy Fit</SelectItem>
                                                </SelectGroup>
                                                <SelectGroup>
                                                    <SelectLabel>Bottoms e.g., Trousers, Jeans, Shorts</SelectLabel>
                                                    <SelectItem value="Skinny Fit">Skinny Fit</SelectItem>
                                                    <SelectItem value="Slim Fit">Slim Fit</SelectItem>
                                                    <SelectItem value="Regular Fit">Regular Fit</SelectItem>
                                                    <SelectItem value="Relaxed Fit">Relaxed Fit</SelectItem>
                                                    <SelectItem value="Tapered Fit">Tapered Fit</SelectItem>
                                                    <SelectItem value="Bootcut Fit">Bootcut Fit</SelectItem>
                                                    <SelectItem value="Wide Leg Fit">Wide Leg Fit</SelectItem>
                                                    <SelectItem value="Cropped Fit">Cropped Fit</SelectItem>
                                                </SelectGroup>
                                                <SelectGroup>
                                                    <SelectLabel>Dresses</SelectLabel>
                                                    <SelectItem value="Bodycon Fit">Bodycon Fit</SelectItem>
                                                    <SelectItem value="A-line Fit">A-line Fit</SelectItem>
                                                    <SelectItem value="Shift Fit">Shift Fit</SelectItem>
                                                    <SelectItem value="Fit and Flare">Fit and Flare</SelectItem>
                                                    <SelectItem value="Wrap Fit">Wrap Fit</SelectItem>
                                                    <SelectItem value="Empire Fit">Empire Fit</SelectItem>
                                                </SelectGroup>
                                            </SelectContent>
                                        </Select>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                name="occasion"
                                control={form.control}
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className='text-sm'>Occasion</FormLabel>
                                        <Select onValueChange={field.onChange} value={field.value}>
                                            <FormControl>
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Select Occasion Types" />
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent>
                                                <SelectGroup>
                                                    <SelectLabel>Everyday and Relaxed Occasions</SelectLabel>
                                                    <SelectItem value="Casual">Casual</SelectItem>
                                                    <SelectItem value="Smart Casual">Smart Casual</SelectItem>
                                                    <SelectItem value="Loungewear">Loungewear</SelectItem>
                                                </SelectGroup>
                                                <SelectGroup>
                                                    <SelectLabel>Professional and Formal Settings</SelectLabel>
                                                    <SelectItem value="Business Casual">Business Casual</SelectItem>
                                                    <SelectItem value="Business Formal">Business Formal</SelectItem>
                                                    <SelectItem value="Formal/Black Tie">Formal/Black Tie</SelectItem>
                                                </SelectGroup>
                                                <SelectGroup>
                                                    <SelectLabel>Festive and Cultural Occasions</SelectLabel>
                                                    <SelectItem value="Festive/Party Wear">Festive/Party Wear</SelectItem>
                                                    <SelectItem value="Ethnic/Traditional">Ethnic/Traditional</SelectItem>
                                                </SelectGroup>
                                                <SelectGroup>
                                                    <SelectLabel>Seasonal and Outdoor Activities</SelectLabel>
                                                    <SelectItem value="Beachwear/Resort Wear">Beachwear/Resort Wear</SelectItem>
                                                    <SelectItem value="Activewear/Sportswear">Activewear/Sportswear</SelectItem>
                                                    <SelectItem value="Outerwear/Weather-Specific">Outerwear/Weather-Specific</SelectItem>
                                                </SelectGroup>
                                                <SelectGroup>
                                                    <SelectLabel>Specialised Occasions</SelectLabel>
                                                    <SelectItem value="Wedding Attire">Wedding Attire</SelectItem>
                                                    <SelectItem value="Evening Wear">Evening Wear</SelectItem>
                                                </SelectGroup>
                                            </SelectContent>
                                        </Select>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                name='pattern'
                                control={form.control}
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className='text-sm'>Pattern</FormLabel>
                                        <FormControl>
                                            <Input type="text" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                name="season"
                                control={form.control}
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className='text-sm'>Season</FormLabel>
                                        <FormControl>
                                            <Input type="text" {...field} />
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
                                                options={
                                                    categoryArray.length > 0 
                                                        ? categoryArray 
                                                        : [{label: 'Empty', value: "1"}]
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
                                            <Input type='hidden' {...field} value="CLOTHING" />
                                        </FormControl>
                                        <FormMessage />
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
                                    Add Clothing
                                </Button>
                            </div>
                        </div>
                    </div>
                    <div className="col-span-1 flex flex-col gap-5 justify-start">
                        <UploadMultipleImage 
                            name="images" 
                            label='Clothing Images' 
                            form={form} 
                            description='Upload clothing images' 
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
            <UploadMultipleImage name="images" label='Product' form={form} description='Brand Image' />
        </div>
    </form>
</Form>
  )
>>>>>>> 352d9d8e773d213e19842bf445d5e00ccc67a7e7
}
