"use client";
import { Card, CardContent } from '@/components/ui/card';
import { useRef, useState } from 'react';

interface ImageFile {
    name: string;
    url: string;
}

export default function UploadLogo() {
    const [images, setImages] = useState<ImageFile | null>(null);
    const fileInputRef = useRef<HTMLInputElement | null>(null);

    function selectFiles() {
        fileInputRef.current?.click();
    }

    function onFileSelect(event: React.ChangeEvent<HTMLInputElement>) {
        const files = event.target.files;
        if (!files || files==null || files.length===undefined || files===undefined) {
            return;}
        setImages(
            {
                name:files[0]!.name,
                url:URL.createObjectURL(files[0]!),

            }
        )
        }
    
  return (
    <Card className="overflow-hidden border-none bg-muted/50" >
        <h2 className="mx-5">Logo Images</h2>
        <CardContent>
        <div className="grid gap-2">
            <img
            alt="Product image" onClick={selectFiles} 
            className="aspect-square w-full rounded-md object-cover"
            height="300"
            src={images ? images.url : "https://ui.shadcn.com/placeholder.svg"}
            width="300"
            />
            <div className="grid grid-cols-3 gap-2">
            
            {!images &&
            (<>
                <button>
                    <img
                    alt="Product image"
                    className=" aspect-square w-full rounded-md object-cover"
                    height="84"
                    src={"https://ui.shadcn.com/placeholder.svg"}
                    width="84"
                    />
                </button>
            </>)
            }
                <input name="picture" className='hidden' type="file" ref={fileInputRef} onChange={onFileSelect}/>
                {/* <button onClick={selectFiles} className="flex aspect-square w-full items-center justify-center rounded-md border border-dashed">
                    <Upload className="h-4 w-4 text-muted-foreground" />
                    <span className="sr-only">Upload</span>
                </button> */}
            </div>
        </div>
        </CardContent>
    </Card>
  )
}
