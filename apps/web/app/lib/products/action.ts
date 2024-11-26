"use server"

import axios from "axios";
import { z } from "zod";
import { CategoryType } from "../types";

export const createProductSchema = z.object({
    name: z.string().min(2).max(100),
    description: z.string().optional(),
    price:z.number().positive(),
    prevprice:z.number().positive(),
    stock:z.number().int().positive(),
    imageUrl:z.string().optional()
  });

export async function createProduct(data:z.infer<typeof createProductSchema>,category:CategoryType){
    try{
    const response=await axios.post(`${process.env.BACKEND_URL}/products/${category}`,data,{withCredentials:true})
    if(response.status!==200){
        throw new Error('Failed to create product');
    }

    return await response.data();
  } catch (error) {
    throw new Error('An error occurred while creating the product');
  }
}