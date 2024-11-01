"use client";
import { Input } from '@/components/ui/input'
import { filterProduct } from '@/lib/constants'
import ToggleGroupComponent from './toggle-group'
import Gender from './gender'
import Size from './size'
import { Button } from '@/components/ui/button';
import { Check } from 'lucide-react';
import ImageNcategory from './imageNcategory';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import z from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Textarea } from '@/components/ui/textarea';
import ToogleElement from './toggle-element';
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from '@/components/ui/select';
import { MultiSelect } from '@/components/multi-select';

const watchesSchema = z.object({
    name: z.string().min(1),
    price: z.number().positive(),
    prevprice: z.number().positive(),
    description: z.string().optional(), 
    imageUrl:z.array(z.string()), 
    strapMaterial: z.string().optional(), // e.g., Leather, Metal
    dialShape: z.string().optional(),     // e.g., Round, Square
    waterResistance: z.string().optional(), // e.g., 50m, 100m
    brandId: z.number().optional(),       // Foreign key reference to Brand
    colour:z.string().optional(), 
    categoryId: z.number(),               // Foreign key reference to Category
    categoryType:z.string(),
    stock: z.number().int().nonnegative()

  
  });
export default function AddWatchForm() {
    type bagType=z.infer<typeof watchesSchema >;
    const form=useForm<bagType>({
        resolver:zodResolver(watchesSchema),
    });
    function addProduct(data:bagType){
        console.log(data);

        alert(JSON.stringify(data))
    }
    
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
                                    <Select>
                                        <SelectTrigger {...field}>
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
                        control={form.control}
                        name="dialShape"
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
                                    <Select>
                                        <SelectTrigger {...field}>
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
                            control={form.control}
                            name="categoryType"
                            render={({ field }) => (
                            <FormItem>
                            <FormLabel>Category Type</FormLabel>
                            <FormControl>
                                <MultiSelect
                                options={
                                    [
                                        {label:"Apple",value:"Apple"},
                                        {label:"Banana",value:"Banana"},
                                        {label:"Orange",value:"Orange"},
                                        {label:"Pineapple",value:"Pineapple"},
                                        {label:"Mango",value:"Mango"},
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