"use client";
import { Input } from '@/components/ui/input'
import { filterProduct } from '@/lib/constants'
import ToggleGroupComponent from './toggle-group'
import Gender from './gender'
import Size from './size'
import { Button } from '@/components/ui/button';
import { CalendarDays, Check } from 'lucide-react';
import ImageNcategory from './imageNcategory';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from 'app/components/form';
import z from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Textarea } from '@/components/ui/textarea';
import ToogleElement from './toggle-element';
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from '@/components/ui/select';
import { MultiSelect } from '@/components/multi-select';
import { HoverCard, HoverCardContent, HoverCardTrigger } from '@/components/ui/hover-card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

const underwearSchema = z.object({
  name: z.string().min(1),
  price: z.number().positive(),
  prevprice: z.number().positive(),
  description: z.string().optional(), 
  size: z.string().optional(),          // e.g., S, M, L, XL
  gender:z.string().optional(), 
  material: z.string().optional(),      // e.g., Cotton, Polyester
  style: z.string().optional(),         // e.g., Briefs, Boxers
  brandId: z.number().optional(),       // Foreign key reference to Brand
  categoryId: z.number(),               // Foreign key reference to Category
  categoryType:z.string(),
  imageUrl:z.string(),
  stock: z.number().int().nonnegative()

});
export default function AddUnderwearForm() {
  type underwearType=z.infer<typeof underwearSchema >;
    const form=useForm<underwearType>({
        resolver:zodResolver(underwearSchema),
    });
    function addProduct(data:underwearType){
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
    <form onSubmit={form.handleSubmit(addProduct)}>
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
                                                <SelectItem value="asdfasdf">Calvin Klein</SelectItem>
                                                <SelectItem value="sdd1">Fruit of the Loom</SelectItem>
                                                <SelectItem value="sdd2">Tommy Hilfiger</SelectItem>
                                                <SelectItem value="sdd3">MeUndies</SelectItem>
                                                <SelectItem value="sdd4">SAXX</SelectItem>
                                                <SelectItem value="sdd5">Polo Ralph Lauren</SelectItem>
                                                <SelectItem value="sdd6">Hanky Panky</SelectItem>
                                                <SelectItem value="sdd7">Savage X Fenty</SelectItem>
                                                <SelectItem value="sdd8">Bravado Designs</SelectItem>
                                                <SelectItem value="sdd9">Knix</SelectItem>
                                                <SelectItem value="sdd0">ThirdLove</SelectItem>
                                            </SelectGroup>
                                        </SelectContent>
                                    </Select>
                                </FormControl>
                                <FormMessage/>
                            </FormItem>
                        )}/>
                        <FormField
                            control={form.control}
                            name="categoryType"
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
                    <Button type='submit' className="p-3 rounded-full mr-0" variant="default"><Check size={18} className="mr-1"/> Add Product</Button>
                </div>            
            </div>
            </div>
            <ImageNcategory/>
                
        </div>
    </form>
</Form>
  )
}

