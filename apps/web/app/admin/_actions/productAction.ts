"use server";

import { CategoryType } from "@repo/database/index";
import { db } from "app/lib/config/prisma-config";
import { uploadToCloudinary } from "app/lib/config/uploadtoCloud";
import { accessoriesSchema, bagsSchema, clothingSchema, footwearSchema, jewellerySchema, outerwearSchema, underwearSchema, watchesSchema, CategoryType as ZcategoryType } from "app/lib/types/product";
import { z } from "zod";
// import {  ProductType, ProductQueryType } from '@/types/';

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

export async function createProduct(ParsedData:any){

    const schema = schemas[ParsedData.categoryType];
    if (!schema) throw new Error('Invalid categoryType');
    

    const uploadedFiles = [];
    for (const file of ParsedData.images) {
        const result = await uploadToCloudinary(file, "product-pictures");

        // Ensure the result conforms to the expected Prisma schema
        uploadedFiles.push({
            publicId: result.public_id, // Ensure this field exists in result
            url: result.secure_url,
            // format: result.format,
            // width: result.width,
            // height: result.height,
            // bytes: result.bytes,
        });
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
          create: 
          uploadedFiles, // Array of images to create
        },
      },
    });
    
  
    console.log("uploadedFiles",uploadedFiles);
    console.log("AddedFiles",AddedFiles);
    return AddedFiles;
    
}

export async function getProducts(){
  const product=await db.product.findMany({include: { brand: true,images:true }});
  return product;
}
export async function getProductById(id:number){
  const product=await db.product.findUnique({where:{id},include: { brand: true,images:true }});
  return product;
}
export async function deleteProduct(id:number){
  const product=await db.product.delete({where:{id}});
  return product;
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



export async function findProducts(categoryType: CategoryType, queryParams: any) {
  const category = categoryType.toUpperCase();
  if(ZcategoryType.safeParse(category).error){
    console.log("error validating data");
    return;
  }
  const filters: any = {};

  if (category) {
    filters.categoryType = category as CategoryType;
  }

  if (queryParams.brandId) {
    filters.brandId = {
      has: Array.isArray(queryParams.brandId)
        ? queryParams.brandId.map((id:any) => parseInt(id as string))
        : [parseInt(queryParams.brandId as string)],
    };
  }

  if (queryParams.size) {
    filters.size = Array.isArray(queryParams.size) ? { has: queryParams.size } : { has: [queryParams.size] };
  }

  if (queryParams.material) {
    filters.material = Array.isArray(queryParams.material) ? { has: queryParams.material } : { has: [queryParams.material] };
  }

  if (queryParams.price) {
    filters.price = { lte: parseFloat(queryParams.price as string) };
  }

  const products = await db.product.findMany({ where: filters, include: { brand: true,images: true } });
  console.log('findProducts query:', queryParams);

  return products;
}

 