"use client"

import { Button } from "@repo/ui/components/ui/button";
import { Card, CardContent } from "@repo/ui/components/ui/card";
import { Input } from "@repo/ui/components/ui/input";
import { useFileUpload } from "@repo/ui/hooks/use-file-upload.ts";
import { FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "app/components/form";
import { AlertCircleIcon, CheckCircle2Icon, ImageIcon, Upload, UploadIcon, XIcon } from "lucide-react";
import { useEffect, useState } from "react";
import Cropper, { Area, Point } from "react-easy-crop";
import type { Path } from "react-hook-form";
import { FieldValues, useFormContext } from "react-hook-form";


// import { <Alert, AlertContent, AlertDescription, AlertIcon, AlertTitle } from '@repo/ui/components/ui/alert';
import { Alert, AlertDescription, AlertTitle } from "@repo/ui/components/ui/alert";
import { Progress } from '@repo/ui/components/ui/progress';
import { Sortable, SortableItem, SortableItemHandle } from '@repo/ui/components/ui/sortable';
import { useToast } from "@repo/ui/hooks/use-toast";
import { cn } from '@repo/ui/lib/utils';
import { CircleX, CloudUpload, GripVertical } from 'lucide-react';
import { useCallback } from 'react';
// import { toast

interface ImageFile {
  id: string;
  file: File;
  preview: string;
  progress: number;
  status: 'uploading' | 'completed' | 'error';
  error?: string;
}

interface SortableImageUploadProps<T extends FieldValues> {
  name: Path<T>;
  maxFiles?: number;
  maxSize?: number;
  accept?: string;
  className?: string;
  label?: string;
  description?: string;
  form?: any; // For compatibility with your existing pattern
}

export function SortableImageUpload<T extends FieldValues>({
  name,
  maxFiles = 5,
  maxSize = 10 * 1024 * 1024, // 10MB
  accept = 'image/*',
  className,
  label,
  description,
  form: formProp,
}: SortableImageUploadProps<T>) {
  const formContext = useFormContext<T>();
  const form = formProp || formContext;

  if (!form) {
    throw new Error('SortableImageUpload must be used within a Form component or receive form prop');
  }

  const [images, setImages] = useState<ImageFile[]>([]);
  const [isDragging, setIsDragging] = useState(false);
  const [errors, setErrors] = useState<string[]>([]);
  const [activeId, setActiveId] = useState<string | null>(null);
  const {toast}=useToast();
  // Initialize from form values
  useEffect(() => {
    const currentValue = form.getValues(name);
    if (currentValue && Array.isArray(currentValue) && currentValue.length > 0) {
      const initialImages: ImageFile[] = currentValue.map((file: File) => ({
        id: `${Date.now()}-${Math.random()}`,
        file,
        preview: URL.createObjectURL(file),
        progress: 100,
        status: 'completed',
      }));
      setImages(initialImages);
    }
  }, [form, name]);

  // Sync with form
  useEffect(() => {
    const fileArray = images.map(img => img.file);
    form.setValue(name, fileArray, { shouldValidate: true });
  }, [images, name, form]);

  // Clean up object URLs
  useEffect(() => {
    return () => {
      images.forEach(image => {
        URL.revokeObjectURL(image.preview);
      });
    };
  }, [images]);

  const validateFile = (file: File): string | null => {
    if (!file.type.startsWith('image/')) {
      return 'File must be an image';
    }
    if (file.size > maxSize) {
      return `File size must be less than ${(maxSize / 1024 / 1024).toFixed(1)}MB`;
    }
    if (images.length >= maxFiles) {
      return `Maximum ${maxFiles} files allowed`;
    }
    return null;
  };

  const addImages = useCallback((files: FileList | File[]) => {
    const newImages: ImageFile[] = [];
    const newErrors: string[] = [];

    Array.from(files).forEach((file) => {
      const error = validateFile(file);
      if (error) {
        newErrors.push(`${file.name}: ${error}`);
        return;
      }

      const imageFile: ImageFile = {
        id: `${Date.now()}-${Math.random()}`,
        file,
        preview: URL.createObjectURL(file),
        progress: 0,
        status: 'uploading',
      };

      newImages.push(imageFile);
    });

    if (newErrors.length > 0) {
      setErrors((prev) => [...prev, ...newErrors]);
      newErrors.forEach(error => toast({title:"Error",description:error,variant:"destructive"}));
    }

    if (newImages.length > 0) {
      const updatedImages = [...images, ...newImages];
      setImages(updatedImages);

      // Simulate upload progress (remove this in real implementation)
      newImages.forEach((imageFile) => {
        simulateUpload(imageFile);
      });

      toast({description:`Added ${newImages.length} image(s)`});
    }
  }, [images, maxSize, maxFiles]);

  const simulateUpload = (imageFile: ImageFile) => {
    let progress = 0;
    const interval = setInterval(() => {
      progress += Math.random() * 20;
      if (progress >= 100) {
        progress = 100;
        clearInterval(interval);

        setImages((prev) =>
          prev.map((img) => 
            img.id === imageFile.id ? { ...img, progress: 100, status: 'completed' } : img
          ),
        );
      } else {
        setImages((prev) => 
          prev.map((img) => 
            img.id === imageFile.id ? { ...img, progress } : img
          )
        );
      }
    }, 100);
  };

  const removeImage = useCallback((id: string) => {
    const imageToRemove = images.find(img => img.id === id);
    if (imageToRemove) {
      URL.revokeObjectURL(imageToRemove.preview);
      const updatedImages = images.filter(img => img.id !== id);
      setImages(updatedImages);
      toast({description:"Image removed"});
      console.log('Image removed');
    }
  }, [images]);

  const handleDragEnter = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  }, []);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);

    const files = e.dataTransfer.files;
    if (files.length > 0) {
      addImages(files);
    }
  }, [addImages]);

  const openFileDialog = useCallback(() => {
    const input = document.createElement('input');
    input.type = 'file';
    input.multiple = true;
    input.accept = accept;
    input.onchange = (e) => {
      const target = e.target as HTMLInputElement;
      if (target.files) {
        addImages(target.files);
      }
    };
    input.click();
  }, [accept, addImages]);

  const formatBytes = (bytes: number): string => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + ' ' + sizes[i];
  };

  const handleReorder = useCallback((newOrderIds: string[]) => {
    // Reorder images based on new order
    const newOrder = newOrderIds
      .map(id => images.find(img => img.id === id))
      .filter((img): img is ImageFile => img !== undefined);
    
    setImages(newOrder);
    toast({description:'Images reordered successfully!'});
  }, [images]);

  return (
    <FormField
      control={form.control}
      name={name}
      render={({ fieldState }) => (
        <FormItem className={cn('w-full', className)}>
          {label && <FormLabel>{label}</FormLabel>}
          {description && <FormDescription>{description}</FormDescription>}
          
          <FormControl>
            <div className="space-y-4">
              {/* Instructions */}
              <div className="text-center">
                <p className="text-sm text-muted-foreground">
                  Upload up to {maxFiles} images. Drag and drop to reorder.
                  {images.length > 0 && ` ${images.length}/${maxFiles} uploaded.`}
                </p>
              </div>

              {/* Image Grid with Sortable */}
              {images.length > 0 && (
                <div className="mb-6">
                  <Sortable
                    value={images.map(img => img.id)}
                    onValueChange={handleReorder}
                    getItemValue={(item:any) => item}
                    strategy="grid"
                    className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2.5 auto-rows-fr"
                    onDragStart={(event:any) => setActiveId(event.active.id as string)}
                    onDragEnd={() => setActiveId(null)}
                  >
                    {images.map((image) => (
                      <SortableItem key={image.id} value={image.id}>
                        <div className="flex items-center justify-center rounded-md bg-accent/50 shadow-none shrink-0 relative group border border-border hover:z-10 data-[dragging=true]:z-50 transition-all duration-200 hover:bg-accent/70">
                          <img
                            src={image.preview}
                            className="h-[120px] w-full object-cover rounded-md pointer-events-none"
                            alt={image.file.name}
                          />

                          {/* Drag Handle */}
                          <SortableItemHandle className="absolute top-2 start-2 opacity-0 group-hover:opacity-100 cursor-grab active:cursor-grabbing">
                            <Button variant="outline" size="icon" className="size-6 rounded-full">
                              <GripVertical className="size-3.5" />
                            </Button>
                          </SortableItemHandle>

                          {/* Remove Button Overlay */}
                          <Button
                            onClick={() => removeImage(image.id)}
                            variant="outline"
                            size="icon"
                            className="shadow-sm absolute top-2 end-2 size-6 opacity-0 group-hover:opacity-100 rounded-full"
                          >
                            <XIcon className="size-3.5" />
                          </Button>

                          {/* Upload Progress Overlay */}
                          {image.status === 'uploading' && (
                            <div className="absolute inset-0 bg-black/50 rounded-md flex items-center justify-center">
                              <Progress
                                value={image.progress}
                                className="w-3/4 [&>div]:bg-white"
                              />
                            </div>
                          )}
                        </div>
                      </SortableItem>
                    ))}
                  </Sortable>
                </div>
              )}

              {/* Upload Area - Only show if we haven't reached max files */}
              {images.length < maxFiles && (
                <Card
                  className={cn(
                    'border-dashed shadow-none rounded-md transition-colors cursor-pointer',
                    isDragging ? 'border-primary bg-primary/5' : 'border-muted-foreground/25 hover:border-muted-foreground/50',
                  )}
                  onClick={openFileDialog}
                  onDragEnter={handleDragEnter}
                  onDragLeave={handleDragLeave}
                  onDragOver={handleDragOver}
                  onDrop={handleDrop}
                >
                  <CardContent className="text-center p-6">
                    <div className="flex items-center justify-center size-[32px] rounded-full border border-border mx-auto mb-3">
                      <CloudUpload className="size-4" />
                    </div>
                    <h3 className="text-sm font-semibold mb-1">Choose files or drag & drop here</h3>
                    <span className="text-xs text-muted-foreground block mb-3">
                      JPEG, PNG, WebP up to {formatBytes(maxSize)}
                    </span>
                    <Button size="sm" variant="outline" type="button">
                      Select Images
                    </Button>
                  </CardContent>
                </Card>
              )}

              {/* Upload Progress List */}
              {images.filter(img => img.status === 'uploading').length > 0 && (
                <div className="space-y-3">
                  <h4 className="text-sm font-medium">Uploading...</h4>
                  {images.filter(img => img.status === 'uploading').map((image) => (
                    <Card key={image.id} className="shadow-none rounded-md">
                      <CardContent className="flex items-center gap-3 p-3">
                        <div className="flex items-center justify-center size-10 rounded-md border border-border shrink-0">
                          <ImageIcon className="size-4 text-muted-foreground" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between mb-1">
                            <span className="text-sm font-medium truncate">{image.file.name}</span>
                            <span className="text-xs text-muted-foreground">
                              {Math.round(image.progress)}%
                            </span>
                          </div>
                          <Progress
                            value={image.progress}
                            className="h-2 [&>div]:bg-primary"
                          />
                          <div className="flex justify-between text-xs text-muted-foreground mt-1">
                            <span>{formatBytes(image.file.size)}</span>
                            <span>Uploading...</span>
                          </div>
                        </div>
                        <Button 
                          onClick={() => removeImage(image.id)} 
                          variant="ghost" 
                          size="icon" 
                          className="size-8"
                        >
                          <CircleX className="size-4" />
                        </Button>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
            </div>
          </FormControl>

          <FormMessage>{fieldState.error?.message}</FormMessage>

          {/* Error Messages */}
          {errors.length > 0 && (
            <Alert variant={"destructive"}>
            <CheckCircle2Icon />
            <AlertTitle>Upload errors</AlertTitle>
            <AlertDescription>
            {errors.map((error, index) => (
                    <div key={index}>{error}</div>
                  ))}
            </AlertDescription>
          </Alert>
          )}
            {/* <Alert variant="destructive" className="mt-4">
                <TriangleAlert />
              <AlertCircleIcon>
              </AlertCircleIcon>
              <AlertC>
                <AlertTitle>Upload errors</AlertTitle>
                <AlertDescription>
                  {errors.map((error, index) => (
                    <div key={index}>{error}</div>
                  ))}
                </AlertDescription>
              </AlertC>
            </Alert> */}

          {/* Debug info - remove in production */}
          <div className="mt-2 text-xs text-muted-foreground">
            {images.length} images selected • {maxFiles - images.length} remaining
          </div>
        </FormItem>
      )}
    />
  );
}

export function UploadMultipleImage({ form, ...props }: FieldValues) {
    const [images, setImages] = useState<File[]>([]);
    const [imageUrl, setImageUrl] = useState<string[]>([]);

    // Sync with form initial values
    useEffect(() => {
        const currentValue = form.getValues(props.name);
        if (currentValue && Array.isArray(currentValue)) {
            setImages(currentValue);
            setImageUrl(currentValue.map(file => URL.createObjectURL(file)));
        }
    }, [form, props.name]);

    function onFileSelect(event: React.ChangeEvent<HTMLInputElement>) {
        const files = event.target.files;
        if (!files || !files.length) return;

        const fileArray = Array.from(files);
        const newImages = [...images, ...fileArray];
        const newImageUrls = [...imageUrl, ...fileArray.map(file => URL.createObjectURL(file))];

        setImages(newImages);
        setImageUrl(newImageUrls);
        
        // Update form value
        form.setValue(props.name, newImages, { shouldValidate: true });
    }

    function removeImage(index: number) {
        const newImages = images.filter((_, i) => i !== index);
        const newImageUrls = imageUrl.filter((_, i) => i !== index);
        
        // Revoke object URL to prevent memory leaks
        
        if( typeof imageUrl[index]=== "string"){
          URL.revokeObjectURL(imageUrl[index]);
        }
        
        setImages(newImages);
        setImageUrl(newImageUrls);
        form.setValue(props.name, newImages, { shouldValidate: true });
    }

    return (
        <Card className="overflow-hidden border-none bg-muted/50">
            <h2 className="m-5">{props.description}</h2>
            <CardContent>
                <div className="grid gap-2">
                    {imageUrl[0] && (
                        <img
                            alt={"Product image"}
                            className="aspect-square w-full rounded-md object-cover"
                            height="300"
                            src={imageUrl[0]}
                            width="300"
                        />
                    )}
                    <div className="grid grid-cols-3 gap-2">
                        {imageUrl.map((img, index) => (
                            <div key={index} className="relative">
                                <img
                                    alt="Uploaded image"
                                    className="border aspect-square w-full rounded-md object-cover"
                                    height="84"
                                    src={img}
                                    width="84"
                                />
                                <button
                                    type="button"
                                    onClick={() => removeImage(index)}
                                    className="absolute -top-2 -right-2 bg-destructive text-destructive-foreground rounded-full p-1"
                                >
                                    <XIcon className="h-3 w-3" />
                                </button>
                            </div>
                        ))}
                        <FormField
                            name={props.name}
                            control={form.control}
                            render={({ field: { value, onChange, ...fieldProps } }) => (
                                <FormItem>
                                    <FormLabel className="cursor-pointer hover:bg-foreground/10 ease-in duration-100 flex aspect-square w-full items-center justify-center rounded-md border border-dashed">
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
                                            onChange={onFileSelect}
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
    );
}

type Props<T extends FieldValues> = {
    name: Path<T>;
    title?: string;
    description?: string;
};

export function UploadSingleImage<T extends FieldValues>({
    name,
    title = "Logo picture",
    description,
}: Props<T>) {
    const { setValue, control, watch } = useFormContext<T>();
    const maxSizeMB = 5; // Match your server validation
    const maxSize = maxSizeMB * 1024 * 1024;

    const [
        { files, isDragging, errors },
        {
            handleDragEnter,
            handleDragLeave,
            handleDragOver,
            handleDrop,
            openFileDialog,
            removeFile,
            getInputProps,
        },
    ] = useFileUpload({
        accept: "image/png,image/jpeg,image/jpg,image/webp",
        maxSize,
        maxFiles: 1,
    });

    // Sync with form value
    useEffect(() => {
        const file = files[0]?.file;
        if (file) {
            setValue(name, file as any, { shouldValidate: true });
        }
    }, [files, name, setValue]);

    // Clean up object URLs
    useEffect(() => {
        return () => {
            files.forEach(file => {
                if (file.preview) {
                    URL.revokeObjectURL(file.preview);
                }
            });
        };
    }, [files]);

    const previewUrl = files[0]?.preview || null;
    const currentValue = watch(name);

    return (
        <FormField
            control={control}
            name={name}
            render={({ fieldState }) => (
                <FormItem>
                    {description && <FormDescription>{description}</FormDescription>}
                    <FormControl>
                        <div className="flex flex-col gap-2">
                            <div className="relative">
                                <div
                                    onDragEnter={handleDragEnter}
                                    onDragLeave={handleDragLeave}
                                    onDragOver={handleDragOver}
                                    onDrop={handleDrop}
                                    data-dragging={isDragging || undefined}
                                    className="border-input data-[dragging=true]:bg-accent/50 has-[input:focus]:border-ring has-[input:focus]:ring-ring/50 relative flex min-h-52 flex-col items-center justify-center overflow-hidden rounded-xl border border-dashed p-4 transition-colors has-[input:focus]:ring-[3px]"
                                >
                                    <input
                                        {...getInputProps()}
                                        className="sr-only"
                                        aria-label="Upload image file"
                                    />

                                    {previewUrl ? (
                                        <div className="absolute inset-0 flex items-center justify-center p-4">
                                            <img
                                                src={previewUrl}
                                                alt={files[0]?.file.name || "Uploaded image"}
                                                className="mx-auto max-h-full rounded object-contain"
                                            />
                                        </div>
                                    ) : (
                                        <div className="flex flex-col items-center justify-center px-4 py-3 text-center">
                                            <div
                                                className="bg-background mb-2 flex size-11 shrink-0 items-center justify-center rounded-full border"
                                                aria-hidden="true"
                                            >
                                                <ImageIcon className="size-4 opacity-60" />
                                            </div>
                                            <p className="mb-1.5 text-sm font-medium">
                                                Drop your image here
                                            </p>
                                            <p className="text-muted-foreground text-xs">
                                                PNG, JPG, WebP (max. {maxSizeMB} MB)
                                            </p>
                                            <Button
                                                variant="outline"
                                                className="mt-4"
                                                type="button"
                                                onClick={openFileDialog}
                                            >
                                                <UploadIcon
                                                    className="-ms-1 size-4 opacity-60"
                                                    aria-hidden="true"
                                                />
                                                Select image
                                            </Button>
                                        </div>
                                    )}
                                </div>

                                {previewUrl && (
                                    <div className="absolute top-4 right-4">
                                        <button
                                            type="button"
                                            className="focus-visible:border-ring focus-visible:ring-ring/50 z-50 flex size-8 cursor-pointer items-center justify-center rounded-full bg-black/60 text-white transition-[color,box-shadow] outline-none hover:bg-black/80 focus-visible:ring-[3px]"
                                            onClick={() => {
                                                if (files[0]?.id) {
                                                    removeFile(files[0].id);
                                                    setValue(name, null as any, { shouldValidate: true });
                                                }
                                            }}
                                            aria-label="Remove image"
                                        >
                                            <XIcon className="size-4" aria-hidden="true" />
                                        </button>
                                    </div>
                                )}
                            </div>

                            {/* Debug info - remove in production */}
                            <div className="text-xs text-muted-foreground">
                                Current value: {currentValue ? currentValue.name : 'No file selected'}
                            </div>

                            {errors.length > 0 && (
                                <div
                                    className="text-destructive flex items-center gap-1 text-xs"
                                    role="alert"
                                >
                                    <AlertCircleIcon className="size-3 shrink-0" />
                                    <span>{errors[0]}</span>
                                </div>
                            )}
                        </div>
                    </FormControl>
                    <FormMessage>{fieldState.error?.message}</FormMessage>
                </FormItem>
            )}
        />
    );
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
