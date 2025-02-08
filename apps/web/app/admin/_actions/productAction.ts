"use server";

import { CategoryType } from "@repo/database/index";
import { db } from "app/lib/config/prisma-config";
import { uploadToCloudinary } from "app/lib/config/uploadtoCloud";
import { accessoriesSchema, bagsSchema, clothingSchema, footwearSchema, outerwearSchema, underwearSchema, watchesSchema, CategoryType as ZcategoryType } from "app/lib/types/product";
import { revalidatePath } from "next/cache";
import { z, ZodError } from "zod";
// import {  ProductType, ProductQueryType } from '@/types/';

const schemas: Record<CategoryType, z.ZodSchema> = {
  CLOTHING: clothingSchema,
  FOOTWEAR: footwearSchema,
  ACCESSORY: accessoriesSchema,
  BAG: bagsSchema,
  OUTERWEAR: outerwearSchema,
  WATCH: watchesSchema,
  UNDERWEAR: underwearSchema,
};

export async function createProduct(ParsedData: any) {
  console.log("Received product data:", ParsedData);
  try {
    
    // Validate using Zod
    const schema = schemas[ParsedData.categoryType as CategoryType];
    if (!schema) throw new Error("Invalid categoryType");
  
    const parsedResult = await schema.parse(ParsedData);
  
    // Parallelize image uploads
    const uploadedFiles = await Promise.all(
      ParsedData.images.map((file: any) => uploadToCloudinary(file, "product-pictures"))
    );
  
    // Format images for Prisma
    const formattedImages = uploadedFiles.map(result => ({
      publicId: result.public_id,
      url: result.secure_url,
    }));
  
    // Use a transaction for better reliability
    const AddedProduct = await db.$transaction(async (prisma) => {
      return prisma.product.create({
        data: {
          name: ParsedData.name,
          description: ParsedData.description,
          size: ParsedData.size,
          gender: ParsedData.gender,
          material: ParsedData.material || ParsedData.strapMaterial,
          price: ParsedData.price,
          colour: ParsedData.colour,
          prevprice: ParsedData.prevprice,
          stock: ParsedData.stock,
          pattern: ParsedData.pattern,
          fit: ParsedData.fit,
          occasion: ParsedData.occasion,
          season: ParsedData.season,
          brandId: ParsedData.brandId,
          dialShape:ParsedData.dialShape,
          waterResistance:ParsedData.waterResistance,
          category: {
            connect: Array.isArray(ParsedData.categoryId)
              ? ParsedData.categoryId.map((id: number) => ({ id }))
              : [{ id: ParsedData.categoryId }],
          },
          categoryType: ParsedData.categoryType as CategoryType,
          images: {
            create: formattedImages,
          },
        },
      });
    });
    revalidatePath("/category/clothing");
    return {success:true,product:AddedProduct};

  } catch (error:any) {
    if(error instanceof ZodError){
      return {
        error:"Invalid product data"
      }
    }
     if (error?.message?.includes("Can't reach database") || error.code === "ECONNREFUSED") {
      return { type: "network", error: "⚠️ Unable to connect to the database. Please check your network." };
    }

    return { type: "other", error: "❌ Something went wrong. Please try again later." };
  }

}

export async function getProducts(){
  try {
    const product=await db.product.findMany({include: { brand: true,images:true }});
    return {success:true,product};
    
  } catch (error:any) {
    if (error?.message?.includes("Can't reach database") || error.code === "ECONNREFUSED") {
      return { type: "network", error: "⚠️ Unable to connect to the database. Please check your network." };
    }

    return { type: "other", error: "❌ Something went wrong. Please try again later." };
  }
  
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

 