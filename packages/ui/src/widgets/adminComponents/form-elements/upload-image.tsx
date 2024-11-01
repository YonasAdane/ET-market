"use client";
import { Card, CardContent } from '@/components/ui/card';
import { Upload } from 'lucide-react';
import { FormEvent, useRef, useState } from 'react';

interface ImageFile {
    name: string;
    url: string;
}

export default function UploadImage() {
    const [images, setImages] = useState<ImageFile[]>([]);
    const [isDragging, setIsDragging] = useState<boolean>(false);
    const fileInputRef = useRef<HTMLInputElement | null>(null);

    function selectFiles() {
        fileInputRef.current?.click();
    }

    function onFileSelect(event: React.ChangeEvent<HTMLInputElement>) {
        const files = event.target.files;
        if (!files || files==null) return;
        if(files.length===0) return;
        for (let i = 0; i < files.length; i++) {
            if(files[i].type.split("/")[0] !== 'image') continue;
            if(!images.some((e)=>e.name===files[i].name)){
                setImages((prevImages)=>[
                    ...prevImages,
                    {
                        name:files[i].name,
                        url:URL.createObjectURL(files[i]),

                    }
                ])
            }
            
        }
    }
  return (
    <Card className="overflow-hidden border-none bg-muted/50" >
        <h2 className="m-5">Product Images</h2>
        <CardContent>
        <div className="grid gap-2">
            <img
            alt="Product image"
            className="aspect-square w-full rounded-md object-cover"
            height="300"
            src="https://ui.shadcn.com/placeholder.svg"
            width="300"
            />
            <div className="grid grid-cols-3 gap-2">
            <button>
                <img
                alt="Product image"
                className="aspect-square w-full rounded-md object-cover"
                height="84"
                src="https://ui.shadcn.com/placeholder.svg"
                width="84"
                />
            </button>
            <button>
                <img
                alt="Product image"
                className="aspect-square w-full rounded-md object-cover"
                height="84"
                src="https://ui.shadcn.com/placeholder.svg"
                width="84"
                />
            </button>
            <input name="picture" className='hidden' type="file" ref={fileInputRef} onChange={onFileSelect}/>
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
