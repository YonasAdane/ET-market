"use server";

import axios from "axios";

export async function findProducts(categoryType:string,queryParams:any){
    try {
        console.log("request param obj: ",queryParams);
        
        let baseUrl=`${process.env.BACKEND_URL}/api/v1/products/${categoryType}`
        const products=await axios.get(baseUrl, {
            params: queryParams,
            headers: {
              'Content-Type': 'application/json'
            }
          })
        return products.data;
        
    } catch (error) {
        console.log(error);
    }
}
export async function findProductsBrand(categoryType:string){
    try {
        const brands=await fetch(`${process.env.BACKEND_URL}/api/v1/products/${categoryType}/brands-categories`);
        return brands.json();
        
    } catch (error) {
        console.log(error);
    }
}

// server action
/**
 * 'use server';

import { db } from '@repo/ui/lib/db';
import { CategoryType, ProductType, ProductQueryType } from '@repo/ui/types';

export async function findProducts(categoryType: string, queryParams: ProductQueryType) {
  const category = categoryType.toUpperCase();
  const filters: any = {};

  if (category) {
    filters.categoryType = category as CategoryType;
  }

  if (queryParams.brandId) {
    filters.brandId = {
      in: Array.isArray(queryParams.brandId)
        ? queryParams.brandId.map((id) => parseInt(id as string))
        : [parseInt(queryParams.brandId as string)],
    };
  }

  if (queryParams.size) {
    filters.size = Array.isArray(queryParams.size) ? { in: queryParams.size } : { in: [queryParams.size] };
  }

  if (queryParams.material) {
    filters.material = Array.isArray(queryParams.material) ? { in: queryParams.material } : { in: [queryParams.material] };
  }

  if (queryParams.price) {
    filters.price = { lte: parseFloat(queryParams.price as string) };
  }

  const products = await db.product.findMany({ where: filters, include: { brand: true } });
  console.log('findProducts query:', queryParams);

  return products;
}

 */