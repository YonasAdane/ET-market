"use client"

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { zodResolver } from "@hookform/resolvers/zod";
import { createBrand } from "app/admin/_actions/brandAction";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from 'app/components/form';
import { Check } from "lucide-react";
import { useState } from 'react';
import { Area, Point } from 'react-easy-crop';
import { useForm } from "react-hook-form";
import z from "zod";
import { Spinner } from "../spinnerLoader";
import { UploadMultipleImage, UploadSingleImage } from "../uploadImages";
const MAX_FILE_SIZE = 5000000;
const ACCEPTED_IMAGE_TYPES = ["image/jpeg", "image/jpg", "image/png", "image/webp"];

 const createBrandSchema = z.object({
    name: z.string().min(2).max(100),
    description:z.string().optional(),
    BannerImage:z.array(z.any()
      .refine((file) => file?.size <= MAX_FILE_SIZE, `Max image size is 5MB.`)
      .refine(
        (file) => ACCEPTED_IMAGE_TYPES.includes(file?.type),
        "Only .jpg, .jpeg, .png and .webp formats are supported."
      ),),
    brandImage:z.array(z.any()
    .refine((file) => file?.size <= MAX_FILE_SIZE, `Max image size is 5MB.`)
    .refine(
      (file) => ACCEPTED_IMAGE_TYPES.includes(file?.type),
      "Only .jpg, .jpeg, .png and .webp formats are supported."
    ),),
    logoImage:z.any()
    .refine((file) => file?.size <= MAX_FILE_SIZE, `Max image size is 5MB.`)
    .refine(
      (file) => ACCEPTED_IMAGE_TYPES.includes(file?.type),
      "Only .jpg, .jpeg, .png and .webp formats are supported."
    ).optional(),
  });
   type BrandType=z.infer<typeof createBrandSchema>;
export default function CreateBrandForm() {
    const [crop, setCrop] = useState<Point>({ x: 0, y: 0 })
  const [zoom, setZoom] = useState(1)

  const onCropComplete = (croppedArea:Area, croppedAreaPixels:Area) => {
    console.log(croppedArea, croppedAreaPixels)
  }

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
            <form onSubmit={form.handleSubmit(
                async data=>await createBrand(
                    data.name,
                    data.BannerImage,
                    data.brandImage,
                    data.description,
                    data.logoImage)
            )}>
                <div className=" w-full gap-5 mx-auto ">
                    <div className="col-span-2 space-y-3">
                        <h2 className="text-xl">Add brand</h2>
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
                            name="description"
                            control={form.control}
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
                        {/* <div className="relative w-full h-48">
                            <Cropper
                                classes={{containerClassName:"  "}}
                                image="https://img.huffingtonpost.com/asset/5ab4d4ac2000007d06eb2c56.jpeg?cache=sih0jwle4e&ops=1910_1000"
                                crop={crop}
                                zoom={zoom}
                                aspect={3 / 1}
                                onCropChange={setCrop}
                                onCropComplete={onCropComplete}
                                onZoomChange={setZoom}
                                />
                        </div> */}
                        <UploadSingleImage name="logoImage" description="Logo Picture"  form={form} title="Logo Picture"/>
                        <UploadMultipleImage name="BannerImage" label='picture' form={form} description='Banner Image' />
                        <UploadMultipleImage name="brandImage" label='picture' form={form} description='Brand Image' />
                        <Button className="rounded-full m-5" type="submit">
                        {!form.formState.isSubmitting ? 
                        <Check size={18} className="mr-1"/> 
                        :
                        <Spinner className="mr-1 size-5" />
                        }
                        Submit
                        </Button>
                    </div>
                </div>
            </form>
        </Form>
    </div>
  )
}