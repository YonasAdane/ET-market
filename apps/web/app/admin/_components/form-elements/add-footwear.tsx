"use client";
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { cn } from "@/lib/utils";
import { zodResolver } from '@hookform/resolvers/zod';
import { getBrands } from 'app/admin/_actions/brandAction';
import { getCategories } from 'app/admin/_actions/categoryAction';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from 'app/components/form';
import { Check, X } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import z from 'zod';
import { createProduct } from "../../_actions/productAction";
import { Spinner } from '../spinnerLoader';
import { UploadMultipleImage } from '../uploadImages';
import Gender from './gender';
 
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { HoverCard, HoverCardContent, HoverCardTrigger } from '@/components/ui/hover-card';
import { footwearSchema } from 'app/lib/types/product';
import ToogleElement from './toggle-element';
import { MultiSelect } from '@/components/multi-select';

export default function AddFootwearForm() {
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

    type footwearType = z.infer<typeof footwearSchema>;
    const form = useForm<footwearType>({
        resolver: zodResolver(footwearSchema),
        defaultValues: {
            name: "",
            description: "",
            size: [],
            gender: "",
            colour: "",
            occasion: "",
            price: 1,
            prevprice: 1,
            material: "",
            brandId: undefined,
            categoryId: [],
            categoryType: "FOOTWEAR",
            stock: 1,
            images: [],
            soleType: "",
            closureType: ""
        }
    });

    const onSubmit = async (data: footwearType) => {
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
            formData.append('soleType', data.soleType || '');
            formData.append('closureType', data.closureType || '');
            formData.append('brandId', data.brandId?.toString() || '');
            formData.append('colour', data.colour || '');
            formData.append('categoryType', data.categoryType);
            formData.append('gender', data.gender || '');
            formData.append('stock', data.stock.toString());
            
            // Append arrays as JSON strings
            formData.append('categoryId', JSON.stringify(data.categoryId));
            formData.append('size', JSON.stringify(data.size));
            formData.append('occasion', JSON.stringify(data.occasion));
            
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
                    description: "Footwear added successfully",
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
            description: "Women's shoes with a low-cut front and a high heel.",
            image: "path/to/court-shoes.jpg"
        }
    ];

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
                                 <ShoeSizeTagInput
                                    control={form.control}
                                    name="size"
                                    label="Shoe Sizes"
                                    description="Press Enter or Comma to add each size."
                                    />
                                {/* <FormField
                                    name="size"
                                    control={form.control}
                                    render={({ field }) => (
                                        <FormItem className='pt-3'>
                                            <FormLabel>Size</FormLabel>
                                            <FormDescription className='text-xs text-muted-foreground'>Select size</FormDescription>
                                            <FormControl>
                                                <Input 
                                                    {...field} 
                                                    type="number"
                                                    onChange={(e) => field.onChange([e.target.value])}
                                                    value={field.value?.[0] || ''}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                /> */}
                            </div>
                            <div className="w-full">
                                <Gender name='gender' control={form.control} />
                            </div>
                        </div>
                        <div className="w-full bg-muted/50 mt-5 rounded-lg p-5">
                            <h2>Properties</h2>
                            <div className="grid grid-cols-2 gap-5">
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
                                {/* <FormField
                                    name="categoryId"
                                    control={form.control}
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Category Type</FormLabel>
                                            <FormControl>
                                                <Select onValueChange={field.onChange} value={String(field.value || '')}>
                                                    <SelectTrigger>
                                                        <SelectValue placeholder="Select category" />
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                        {productCategories.map(category => (
                                                            <HoverCard openDelay={500} key={category.name}>
                                                                <HoverCardTrigger asChild>
                                                                    <SelectItem value={category.name}>{category.name}</SelectItem>
                                                                </HoverCardTrigger>
                                                                <HoverCardContent className="w-80">
                                                                    <div className="flex justify-between space-x-4 z-2">
                                                                        <Avatar>
                                                                            <AvatarImage src={category.image} />
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
                                /> */}
                                <ToogleElement 
                                    select='single' 
                                    label='Occasion' 
                                    name="occasion" 
                                    values={["Casual", "Formal", "Athletic", "Outdoor", "Office", "Special Occasions", "Seasonal"]} 
                                    control={form.control} 
                                />
                                <FormField
                                    name="material"
                                    control={form.control}
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel className='text-sm'>Material</FormLabel>
                                            <FormControl>
                                                <Input {...field} type='text' />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    name="soleType"
                                    control={form.control}
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel className='text-sm'>Sole Type</FormLabel>
                                            <FormControl>
                                                <Input {...field} type='text' />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    name="closureType"
                                    control={form.control}
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel className='text-sm'>Closure Type</FormLabel>
                                            <FormControl>
                                                <Input {...field} type='text' />
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
                                                <Input type='hidden' {...field} value="FOOTWEAR" />
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
                                    Add Footwear
                                </Button>
                            </div>
                        </div>
                    </div>
                    <div className="col-span-1 flex flex-col gap-5 justify-start">
                        <UploadMultipleImage 
                            name="images" 
                            label='Footwear Images' 
                            form={form} 
                            description='Upload footwear images' 
                        />
                    </div>
                </div>
            </form>
        </Form>
    );
}


type ShoeSizeTagInputProps = {
  control: any;
  name: string;
  label?: string;
  description?: string;
};

export function ShoeSizeTagInput({
  control,
  name,
  label = "Shoe Sizes",
  description = "Type a shoe size and press Enter or Comma to add it.",
}: ShoeSizeTagInputProps) {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => {
        const [inputValue, setInputValue] = React.useState("");

        // Always treat the field value as an array
        const values: string[] = Array.isArray(field.value)
          ? field.value
          : [];

        const addValue = (val: string) => {
          const newValue = val.trim();
          if (!newValue || values.includes(newValue)) return;
          const updated = [...values, newValue];
          field.onChange(updated); // ✅ now storing as an array
        };

        const removeValue = (val: string) => {
          const updated = values.filter((v) => v !== val);
          field.onChange(updated);
        };

        const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
          if (e.key === "Enter" || e.key === ",") {
            e.preventDefault();
            addValue(inputValue);
            setInputValue("");
          }
        };

        return (
          <FormItem className="mt-2">
            <FormLabel>{label}</FormLabel>
            <FormDescription className="text-xs">{description}</FormDescription>
            <FormControl>
              <div className="flex flex-wrap gap-2 p-2 border rounded-lg min-h-[44px]">
                {values.map((val) => (
                  <Badge
                    key={val}
                    variant="secondary"
                    className="flex items-center gap-1 px-2 py-1 text-sm"
                  >
                    {val}
                    <X
                      className="w-3 h-3 cursor-pointer hover:text-destructive"
                      onClick={() => removeValue(val)}
                    />
                  </Badge>
                ))}
                <input
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="Type and press Enter"
                  className="flex-1 bg-transparent outline-none min-w-[80px]"
                />
              </div>
            </FormControl>
            <FormMessage />
          </FormItem>
        );
      }}
    />
  );
}