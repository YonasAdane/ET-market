"use client"

import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "app/components/form";
import { Upload } from "lucide-react";
import { useState } from "react";
import Cropper, { Area, Point } from "react-easy-crop";
import { FieldValues } from "react-hook-form"


export  function UploadProductImage ({form,...props}: FieldValues){
    const [images, setImages] = useState<File[]>([]);
    const [imageUrl,setImageUrl]=useState<string[]>([])
   
    function onFileSelect(event: React.ChangeEvent<HTMLInputElement>) {
        const files = event.target.files;
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

    <Card className="overflow-hidden border-none bg-muted/50" >
        <h2 className="m-5">{"Product"} Images</h2>
        <CardContent>
        <div className="grid gap-2">
            <img
            alt={"Product image"}
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
            name={props.name}
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

    )
}

export  function UploadCategoryImage ({form,...props}: FieldValues){
    const [images, setImages] = useState<File>();
    const [imageUrl,setImageUrl]=useState<string>('')
   
    function onFileSelect(event: React.ChangeEvent<HTMLInputElement>) {
        if (event.target.files) {
            const files = event.target.files;
            const fileArray = Array.from(event.target.files); // Convert FileList to an array
            setImages(fileArray[0])
            //@ts-ignore
            setImageUrl(URL.createObjectURL(files[0]))
          }
    }

    return (
    <Card className="overflow-hidden border-none " >
        <h3 className="p-1 text-sm">{"Category"} Image</h3>
        <CardContent>
        <div className="grid gap-2">
            <img
            alt={"Product image"}
            className="aspect-square rounded-md object-cover"
            height="150"
            src={imageUrl? imageUrl:"https://ui.shadcn.com/placeholder.svg"}
            width="150"
            />
            <div className="grid grid-cols-3 gap-2">
            <FormField
            name={props.name}
            control={form.control}
            render={({ field: { value, onChange, ...fieldProps } }) => (
                <FormItem>
                  <FormLabel  className="cursor-pointer hover:bg-foreground/10 ease-in duration-100 flex py-2 w-full items-center justify-center rounded-md border border-dashed ml-auto">
                    Upload
                    {/* <Upload className="h-4 w-4 text-muted-foreground" /> */}
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

    )
}


export  function UploadCroppedImage ({form,...props}: FieldValues){
  const [images, setImages] = useState<File>();
  const [imageUrl,setImageUrl]=useState<string>('')
  
  const [crop, setCrop] = useState<Point>({ x: 0, y: 0 })
  const [zoom, setZoom] = useState(1)

  const onCropComplete = (croppedArea:Area, croppedAreaPixels:Area) => {
    console.log(croppedArea, croppedAreaPixels)
  }
 
  function onFileSelect(event: React.ChangeEvent<HTMLInputElement>) {
      if (event.target.files) {
          const files = event.target.files;
          const fileArray = Array.from(event.target.files); 
          setImages(fileArray[0])
          // @ts-ignore
          setImageUrl(URL.createObjectURL(files[0]))
        }
  }

  return (
  <Card className="overflow-hidden border-none " >
      <h3 className="p-1 text-sm">{"Category"} Image</h3>
      <CardContent>
      <div className="grid gap-2">
          {/* <img
          alt={"Product image"}
          className="aspect-square rounded-md object-cover"
          height="150"
          src={imageUrl? imageUrl:"https://ui.shadcn.com/placeholder.svg"}
          width="150"
          /> */}
          <Cropper
              classes={{containerClassName:"  "}}
              image={imageUrl? imageUrl:"https://ui.shadcn.com/placeholder.svg"}
              crop={crop}
              zoom={zoom}
              aspect={3 / 1}
              onCropChange={setCrop}
              onCropComplete={onCropComplete}
              onZoomChange={setZoom}
              />
          <div className="grid grid-cols-3 gap-2">
          <FormField
          name={props.name}
          control={form.control}
          render={({ field: { value, onChange, ...fieldProps } }) => (
              <FormItem>
                <FormLabel  className="cursor-pointer hover:bg-foreground/10 ease-in duration-100 flex py-2 w-full items-center justify-center rounded-md border border-dashed ml-auto">
                  Upload
                  {/* <Upload className="h-4 w-4 text-muted-foreground" /> */}
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

  )
}
