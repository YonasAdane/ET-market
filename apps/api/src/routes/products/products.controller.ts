import { Request, Response } from 'express';
import { z } from 'zod';
import { accessoriesSchema, bagsSchema, CategoryTypeEnum, clothingSchema, cosmeticsSchema, footwearSchema, /* , other schemas */ 
jewellerySchema,
outerwearSchema,
ProductQueryType,
ProductType,
underwearSchema,
watchesSchema} from './products.schema'; // Assume schemas are exported from here
import { BaseError } from '../../utils/baseError';
import { createProduct, DeleteProduct, FindAllProductInCategory, UpdateProduct } from './products.service';
import { db } from '../../common/prisma-config';
// import Manyproduct from "./sample-product.json"
import {  CategoryType } from '@repo/database/src';

// Define schemas for validation based on category
const schemas: Record<string, z.ZodSchema> = {
    'clothing': clothingSchema,
    'footwear': footwearSchema,
    'accessory':accessoriesSchema,
    'jewellery':jewellerySchema,
    'bag':bagsSchema,
    'outerwear':outerwearSchema,
    'watches':watchesSchema,
    'underwear':underwearSchema,
};

// Create a product
export async function postProduct(req:Request<{ category:string },{},ProductType>, res:Response){
  const { category } = req.params;

    const schema = schemas[category];
    if (!schema) throw new BaseError('Invalid category',400);

    const parsedData = schema.parse(req.body);
    parsedData.categoryType=category.toUpperCase();
    
    const product = await createProduct(parsedData);
    return res.json(product);
};

// Get all products in a category ++++
export async function getAllProducts (req:Request<{ category:string },{},ProductType,ProductQueryType>, res:Response){
  const category = req.params.category.toUpperCase();
  const queryParams=req.query;
  const filters: any = {};
  if(category){
    filters.categoryType=category as CategoryType;
  }
  if (queryParams.brandId) {
    filters.brandId = {
      in: Array.isArray(queryParams.brandId)
        ? queryParams.brandId.map((id) => parseInt(id as string)) // Convert all elements to integers
        : [parseInt(queryParams.brandId as string)], // Convert a single element to an integer array
    };
  }
    // if (queryParams.gender) {
    //   filters.gender = Array.isArray(gender) ? { in: gender } : { in: [gender] };
    // }
    if (queryParams.size) {
      filters.size = Array.isArray(queryParams.size) ? { in: queryParams.size } : { in: [queryParams.size] };
    }
    if (queryParams.material) {
      filters.material = Array.isArray(queryParams.material) ? { in: queryParams.material } : { in: [queryParams.material] };
    }
    if (queryParams.price) {
      filters.price = { lte: parseFloat(queryParams.price as string) };
    }

  const product= await db.product.findMany({where: filters,include:{brand:true}})
  console.log("request",queryParams);

   return res.json(product);
};

export async function getAllProductsBrandsCategories (req:Request<{ category:string },{},ProductType>, res:Response){
  const category = req.params.category.toUpperCase();
  const brands=await db.product.findMany({
    where:{
    categoryType:category as CategoryType,
  },
  select:{brand:true,category:true}
});
return res.json(brands);
}

// Update a product
export async function putProduct(req:Request<{ category:string, id:string },{},ProductType>, res:Response){
    const category = req.params.category;
    const id=Number(req.params.id);
    const schema = schemas[category];
    
    if (!schema) throw new BaseError('Invalid category',400);
    const parsedData = schema.parse(req.body);

    const updatedProduct = await UpdateProduct(id,parsedData)

    res.json(updatedProduct);
};

// Delete a product
export async function deleteProduct(req:Request<{ category:string, id:string },{}>, res:Response){
  const id = Number(req.params.id);
    const product =await DeleteProduct(id);
    res.send(product);
};

