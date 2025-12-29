"use client";

import { useDropzone } from "react-dropzone";
import { useCallback, useState } from "react";
import { UploadCloud, X } from "lucide-react";
import { Card, CardContent } from "@repo/ui/components/ui/card";
import { Button } from "@repo/ui/components/ui/button";
import { ImageDropzoneProps } from "@/admin/category/new/types";

export function ImageDropzone({ onImageSelected, initialImage }: ImageDropzoneProps) {
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(initialImage || null);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    if (acceptedFiles.length > 0) {
      const file = acceptedFiles[0];
      setSelectedImage(file);
      onImageSelected(file);
      
      // Create preview URL
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
    }
  }, [onImageSelected]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    maxFiles: 1,
    accept: {
      'image/*': ['.jpeg', '.jpg', '.png', '.webp']
    }
  });

  const removeImage = () => {
    setSelectedImage(null);
    setPreviewUrl(null);
    onImageSelected(null);
    
    // Clean up preview URL
    if (previewUrl) {
      URL.revokeObjectURL(previewUrl);
    }
  };

  return (
    <div className="w-full">
      <Card 
        {...getRootProps()} 
        className={`border-2 border-dashed cursor-pointer transition-colors ${
          isDragActive 
            ? "border-primary bg-primary/10" 
            : "border-border hover:border-primary/50"
        }`}
      >
        <input {...getInputProps()} />
        <CardContent className="p-6">
          {previewUrl ? (
            <div className="relative">
              <img 
                src={previewUrl} 
                alt="Preview" 
                className="w-full h-48 object-contain rounded-md"
              />
              <Button
                type="button"
                variant="destructive"
                size="sm"
                className="absolute top-2 right-2"
                onClick={(e) => {
                  e.stopPropagation();
                  removeImage();
                }}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center gap-4 p-8 text-center">
              <UploadCloud className="h-10 w-10 text-muted-foreground" />
              <div>
                <p className="font-medium text-foreground">
                  {isDragActive ? "Drop the image here" : "Drag and drop an image"}
                </p>
                <p className="text-sm text-muted-foreground">
                  or click to select a file
                </p>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}