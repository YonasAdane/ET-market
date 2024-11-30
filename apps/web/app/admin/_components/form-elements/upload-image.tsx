"use client";
import { Card, CardContent } from '@/components/ui/card';
import { FormControl, FormField, FormItem, FormMessage } from 'app/components/form';
import { Upload } from 'lucide-react';
import { FormEvent, useRef, useState } from 'react';

interface ImageFile {
    name: string;
    url: string;
}

export default function UploadImage({title,name,control}:{title?:string,name:string,control:any}) {
    const [images, setImages] = useState<ImageFile[]>([]);
    const fileInputRef = useRef<HTMLInputElement | null>(null);

    function selectFiles() {
        fileInputRef.current?.click();
    }

    function onFileSelect(event: React.ChangeEvent<HTMLInputElement>) {
        const files = event.target.files;
        console.log("files: ",files);
        
        if (!files || files==null || !files.length || files===undefined) {
            return;
        }
        for (let i = 0; i < files.length; i++) {

            if(files[i].type.split("/")[0] !== 'image') continue;

            if (!images.some((e) => e.name === files[i].name)) {
                setImages((prevImages) => [
                    ...prevImages,
                    {
                        name: files[i].name,
                        url: URL.createObjectURL(files[i]),
                    },
                ]);
            }
            
            
        }
    }
  return (
    <Card className="overflow-hidden border-none bg-muted/50" >
        <h2 className="m-5">{title??"Product"} Images</h2>
        <CardContent>
        <div className="grid gap-2">
            <img
            alt={title??"Product"+"image"}
            className="aspect-square w-full rounded-md object-cover"
            height="300"
            src={images[0]?images[0].url:"https://ui.shadcn.com/placeholder.svg"}
            width="300"
            />
            <div className="grid grid-cols-3 gap-2">
            {images.filter(image=>image!==images[0]).map(img=>(
                
            <button key={img.name}>
                <img
                alt=" image"
                className="border aspect-square w-full rounded-md object-cover"
                height="84"
                src={img.url ??"https://ui.shadcn.com/placeholder.svg"}
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
           
                <input className='hidden' multiple type="file" ref={fileInputRef} onChange={onFileSelect}/>
               
                <button onClick={selectFiles} className="flex aspect-square w-full items-center justify-center rounded-md border border-dashed">
                    <Upload className="h-4 w-4 text-muted-foreground" />
                    <span className="sr-only">Upload</span>
                </button>
            </div>
        </div>
        </CardContent>
    </Card>
  )
}
