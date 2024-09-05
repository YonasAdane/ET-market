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
import Manyproduct from "./sample-product.json"
import { Category, CategoryType } from '@repo/database/src';

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
  // const watches = [
  //   {
  //     name: "Timex MacBook Pro 13", // Sample name
  //     price: 999.99,
  //     description: "Timex MacBook Pro 13-inch watch, combining timeless design with modern technology.",
  //     imageUrl: "https://cdn.shopify.com/s/files/1/0046/3454/2129/files/TW2V44700U9_1.jpg?v=1708690089&width=1000",
  //     strapMaterial: "Leather", // Assuming strap material
  //     dialShape: "Round", // Assuming the dial shape
  //     waterResistance: "50m", // Assuming water resistance
  //     brandId: 27, // TIMEX brand ID from your data
  //     categoryId: 1, // Assuming category ID for watches
  //     categoryType: "ACCESSORY", // Assuming watches are under accessories
  //     stock: 50, // Sample stock value
  //   },
  //   {
  //     name: "Timex Men Black Round Dial Analog Watch",
  //     price: 12995,
  //     description: "A classic Timex men's watch with a black round dial and analog display.",
  //     imageUrl: "https://www.justwatches.com/cdn/shop/files/TWEG20208.jpg?v=1718772043&width=1000",
  //     strapMaterial: "Metal",
  //     dialShape: "Round",
  //     waterResistance: "100m",
  //     brandId: 27, // TIMEX brand ID
  //     categoryId: 1,
  //     categoryType: "ACCESSORY",
  //     stock: 100,
  //   },
  //   {
  //     name: "Gc Tiara Women Round Dial Quartz Analog Watch",
  //     price: 38995,
  //     description: "Elegant Gc Tiara watch for women with a round dial and quartz movement.",
  //     imageUrl: "https://www.justwatches.com/cdn/shop/files/Z41002L1MF_7.jpg?v=1709643466&width=1000",
  //     strapMaterial: "Leather",
  //     dialShape: "Round",
  //     waterResistance: "30m",
  //     brandId: 28, // GC brand ID
  //     categoryId: 1,
  //     categoryType: "ACCESSORY",
  //     stock: 70,
  //   },
  //   {
  //     name: "Gc Prodigy Men Round Dial Quartz Analog Watch",
  //     price: 38995,
  //     description: "Stylish Gc Prodigy watch for men with a round dial and quartz analog display.",
  //     imageUrl: "https://www.justwatches.com/cdn/shop/files/Z39005G3MF_7.jpg?v=1709643209&width=1000",
  //     strapMaterial: "Metal",
  //     dialShape: "Round",
  //     waterResistance: "50m",
  //     brandId: 28, // GC brand ID
  //     categoryId: 1,
  //     categoryType: "ACCESSORY",
  //     stock: 30,
  //   },
  //   {
  //     name: "Guess Lotus Women Round Dial Quartz Analog Watch",
  //     price: 11897,
  //     description: "Guess Lotus watch for women with a stylish round dial and quartz movement.",
  //     imageUrl: "https://www.justwatches.com/cdn/shop/files/GW0667L1_1.jpg?v=1709641243&width=1000",
  //     strapMaterial: "Metal",
  //     dialShape: "Round",
  //     waterResistance: "30m",
  //     brandId: 29, // GUESS brand ID
  //     categoryId: 1,
  //     categoryType: "ACCESSORY",
  //     stock: 40,
  //   },
  //   {
  //     name: "Nautica Clearwater Beach Black Dial Round Case Quartz Analog",
  //     price: 13995,
  //     description: "Nautica Clearwater Beach watch with a black dial and quartz analog display.",
  //     imageUrl: "https://www.justwatches.com/cdn/shop/files/NAPCWS303.jpg?v=1693570172&width=1000",
  //     strapMaterial: "Rubber",
  //     dialShape: "Round",
  //     waterResistance: "100m",
  //     brandId: 30, // Nautica brand ID
  //     categoryId: 1,
  //     categoryType: "ACCESSORY",
  //     stock: 60,
  //   },
  //   {
  //     name: "Nautica KOH May Bay Black Dial Round Case Quartz Analog",
  //     price: 15995,
  //     description: "Nautica KOH May Bay watch with a black dial and quartz analog movement.",
  //     imageUrl: "https://www.justwatches.com/cdn/shop/files/NAPKMS301_11.jpg?v=1724757856&width=1000",
  //     strapMaterial: "Rubber",
  //     dialShape: "Round",
  //     waterResistance: "200m",
  //     brandId: 30, // Nautica brand ID
  //     categoryId: 1,
  //     categoryType: "ACCESSORY",
  //     stock: 75,
  //   },
  //   {
  //     name: "United Colors of Benetton Social Black Dial Round Case Quartz Analog",
  //     price: 4797,
  //     description: "United Colors of Benetton Social watch with a black dial and quartz analog display.",
  //     imageUrl: "https://www.justwatches.com/cdn/shop/products/UWUCG0101_1.jpg?v=1639658902&width=1000",
  //     strapMaterial: "Leather",
  //     dialShape: "Round",
  //     waterResistance: "30m",
  //     brandId: 31, // UNITED COLORS OF BENETTON brand ID
  //     categoryId: 1,
  //     categoryType: "ACCESSORY",
  //     stock: 90,
  //   },
  //   {
  //     name: "Ladies Baby-G Blue Watch BG-169PB-2ER",
  //     price: 38995,
  //     description: "Ladies Baby-G watch in blue with digital display.",
  //     imageUrl: "https://www.houseofwatches.co.uk/media/catalog/product/cache/34b4a13777517e40e5b794fdc3ecddeb/2/1/21-52-233_01_dropshadow.jpg",
  //     strapMaterial: "Plastic",
  //     dialShape: "Round",
  //     waterResistance: "100m",
  //     brandId: 32, // CASIO brand ID
  //     categoryId: 1,
  //     categoryType: "ACCESSORY",
  //     stock: 35,
  //   },
  //   {
  //     name: "Baby-G Transparent Blue Digital Watch BGD-565SJ-2ER",
  //     price: 66.95,
  //     description: "Baby-G transparent blue digital watch with multiple functionalities.",
  //     imageUrl: "https://www.houseofwatches.co.uk/media/catalog/product/2/1/21-52-25121847_casio_05.jpg",
  //     strapMaterial: "Plastic",
  //     dialShape: "Square",
  //     waterResistance: "200m",
  //     brandId: 32, // CASIO brand ID
  //     categoryId: 1,
  //     categoryType: "ACCESSORY",
  //     stock: 25,
  //   },
  // ];
//  const transformedProducts = watches.map(product => ({
//     ...product,
//     categoryType: "WATCH" as CategoryType, // Ensure the categoryType matches the enum
//   }));
// try {
  
//   const products = await db.product.createMany({ data: transformedProducts });
//   return res.json(products);
// } catch (error) {
//   console.log(error);
  
// }
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

