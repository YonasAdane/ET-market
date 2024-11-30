"use server";

import { db } from "app/lib/config/prisma-config";
import { uploadToCloudinary } from "app/lib/config/uploadtoCloud";
import { accessoriesSchema, bagsSchema, CategoryType, clothingSchema, footwearSchema, jewellerySchema, outerwearSchema, ProductType, underwearSchema, watchesSchema } from "app/lib/types/product";
import { z } from "zod";
interface ImageType{
        publicId:string
        url:string
        format:string
        width: number,
        height: number,
        bytes: number,
}
const schemas: Record<string, z.ZodSchema> = {
    'CLOTHING': clothingSchema,
    'FOOTWEAR': footwearSchema,
    'ACCESSORY':accessoriesSchema,
    'BAG':bagsSchema,
    'OUTERWEAR':outerwearSchema,
    'JEWELLERY':jewellerySchema,
    'WATCH':watchesSchema,
    'UNDERWEAR':underwearSchema,
};
// const fileSizeLimit = 10 * 1024 * 1024; 

const WatchesSchema = z.object({
    name: z.string().min(1),
    price: z.coerce.number().positive(),
    prevprice: z.coerce.number().positive(),
    description: z.string().optional(), 
    strapMaterial: z.string().optional(), // e.g., Leather, Metal
    dialShape: z.string().optional(),     // e.g., Round, Square
    waterResistance: z.string().optional(), // e.g., 50m, 100m
    brandId: z.coerce.number().optional(),       // Foreign key reference to Brand
    colour:z.string().optional(), 
    categoryId: z.coerce.number().array(),               // Foreign key reference to Category
    categoryType:CategoryType,
    gender:z.string().optional(),
    size:z.string().optional(),
    stock: z.coerce.number().int().nonnegative(),
    // images:z.any().array()
    images:  z
    .instanceof(File).array()
    .refine((list) => list.length === 0, "No files selected")
    .refine((list) => list.length <= 5, "Maximum 5 files allowed")
    .transform((list) => Array.from(list))
    .refine(
      (files) => {
        const allowedTypes: { [key: string]: boolean } = {
          "image/jpeg": true,
          "image/png": true,
          "image/jpg": true,
          "image/gif": true,
        };
        return files.every((file) => allowedTypes[file.type]);
      },
      { message: "Invalid file type. Allowed types: JPG, PNG, JPEG, GIF" }
    )
    .refine(
      (files) => {
        return files.every((file) => file.size <= 10 * 1024 * 1024 );
      },
      {
        message: "File size should not exceed 5MB",
      }
    ),
})
type watchType=z.infer<typeof watchesSchema >;

export async function createProduct(ParsedData:watchType){

    const schema = schemas[ParsedData.categoryType];
    if (!schema) throw new Error('Invalid categoryType');
    
    // const parsedData = schema.parse(ParsedData);
    // console.log("backend parsedData",ParsedData);

    
    const uploadedFiles=[];
    for(const file of ParsedData.images){
        const result=await uploadToCloudinary(file,"product-pictures")
        
        uploadedFiles.push(result)
    }
    // Example using Prisma Client
// const product = await db.product.create({
//     data: {
//       name: "Example Product",
//       price: 100,
//       description: "Example description",
//       categoryType: "CLOTHING",
//       images: {
//         create: [
//           {
//             publicId: "ET-market/product-pictures/hma5dxjkqu3kf4hrikfp",
//             url: "https://res.cloudinary.com/dpxbxdrt2/image/upload/v1732992593/ET-market/product-pictures/hma5dxjkqu3kf4hrikfp.png",
//             format: "png",
//             width: 204,
//             height: 192,
//             bytes: 1984,
//           },
//           {
//             publicId: "ET-market/product-pictures/f4skdb6nhz3qp5ngeut4",
//             url: "https://res.cloudinary.com/dpxbxdrt2/image/upload/v1732992596/ET-market/product-pictures/f4skdb6nhz3qp5ngeut4.png",
//             format: "png",
//             width: 225,
//             height: 225,
//             bytes: 16508,
//           },
//         ],
//       },
//     },
//   });
  
    console.log("uploadedFiles",uploadedFiles);
    
}
















// export async function addProduct(input: AddProductInput) {
//   try {
//     const newProduct = await db.product.create({
//       data: {
//         name: input.name,
//         description: input.description,
//         price: input.price,
//         categoryId: input.categoryId,
//         brandId: input.brandId, // Optional
//       },
//     });

//     return newProduct; // Can be returned to confirm or show data
//   } catch (error) {
//     console.error("Error inserting product:", error);
//     throw new Error("Failed to add product");
//   }
// }
