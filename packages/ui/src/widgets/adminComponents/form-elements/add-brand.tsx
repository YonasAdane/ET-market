"use client"

import { Button } from "@/components/ui/button";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import z from "zod";

 const createBrandSchema = z.object({
    name: z.string().min(2).max(100),
    description:z.string().optional(),
    bannerImage:z.string(),
    logoUrl: z.string().optional(),
  });
   type BrandType=z.infer<typeof createBrandSchema>;
export default function CreateBrandForm() {
    const form =useForm<BrandType>({
        resolver:zodResolver(createBrandSchema)
    })
    function addBrand(data:BrandType){
        console.log(data);

        alert(JSON.stringify(data))
    }
  return (
    <div >
        <Form {...form}>
            <form onSubmit={form.handleSubmit(addBrand)}>
                <FormField
                    name="name"
                    control={form.control}
                    render={({field})=>(
                        <FormItem>
                            <FormLabel>Brand Name</FormLabel>
                            <FormControl>
                                <Input {...field} type="txt" />
                            </FormControl>
                            <FormMessage/>
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="description"
                    render={({field})=>(
                        <FormItem>
                            <FormDescription>Brand Description</FormDescription>
                            <FormControl>
                                <Textarea {...field}  />
                            </FormControl>
                            <FormMessage/>
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="logoUrl"
                    render={({field})=>(
                        <FormItem>
                            <FormDescription>Brand Description</FormDescription>
                            <FormControl>
                                <Input type="file" {...field}  />
                            </FormControl>
                            <FormMessage/>
                        </FormItem>
                    )}
                />
                <Button className="rounded-full m-5" type="submit">
                    Submit
                </Button>
            </form>
        </Form>
    </div>
  )
}
