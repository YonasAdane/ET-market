"use server";

import { CategoryType } from "@repo/database/index";
import { db } from "app/lib/config/prisma-config";
import { uploadToCloudinary } from "app/lib/config/uploadtoCloud";
import { accessoriesSchema, bagsSchema, clothingSchema, footwearSchema, jewellerySchema, outerwearSchema, underwearSchema, watchesSchema } from "app/lib/types/product";
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

type watchType=z.infer<typeof watchesSchema >;

export async function createProduct(ParsedData:watchType){

    const schema = schemas[ParsedData.categoryType];
    if (!schema) throw new Error('Invalid categoryType');
    
    // const parsedData = schema.parse(ParsedData);
    // console.log("backend parsedData",ParsedData);

    
    const uploadedFiles:ImageType[]=[];
    for(const file of ParsedData.images){
        const result=await uploadToCloudinary(file,"product-pictures") as ImageType;
        
        uploadedFiles.push(result)
    }
    // Example using Prisma Client
    const AddedFiles = await db.product.create({
      data: {
        name: ParsedData.name,
        price:ParsedData.price, 
        prevprice:ParsedData.prevprice,
        stock:ParsedData.stock,
        category: {
          connect: ParsedData.categoryId.map((id: number) => ({ id })),
        },
        categoryType: ParsedData.categoryType as CategoryType,
        images: {
          create: uploadedFiles, // Array of images to create
        },
      },
    });
    
  
    console.log("uploadedFiles",uploadedFiles);
    console.log("AddedFiles",AddedFiles);
    return AddedFiles;
    
}


// const AddedFiles = await db.product.create({
//   data: {
//     name: "Example Product",
//     price: 100,
//     description: "Example description",
//     categoryType: "CLOTHING",
//     images: {
//       create: [
//         {
//           publicId: "ET-market/product-pictures/hma5dxjkqu3kf4hrikfp",
//           url: "https://res.cloudinary.com/dpxbxdrt2/image/upload/v1732992593/ET-market/product-pictures/hma5dxjkqu3kf4hrikfp.png",
//           format: "png",
//           width: 204,
//           height: 192,
//           bytes: 1984,
//         },
//         {
//           publicId: "ET-market/product-pictures/f4skdb6nhz3qp5ngeut4",
//           url: "https://res.cloudinary.com/dpxbxdrt2/image/upload/v1732992596/ET-market/product-pictures/f4skdb6nhz3qp5ngeut4.png",
//           format: "png",
//           width: 225,
//           height: 225,
//           bytes: 16508,
//         },
//       ],
//     },
//   },
// });













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
