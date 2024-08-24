import { db } from "../../common/prisma-config";
import { createProductType } from "./products.schema";

export async function createProduct(data:createProductType){
    const product=await db.product.create({data});
    return product;
}
export async function FindAllProduct(){
    const products=await db.product.findMany();
    return products;
}
export async function FindSingleProduct(pid:number){
    const product=await db.product.findUnique({where:{id:pid}});
    return product;
}
export async function UpdateProduct(pid:number,data:createProductType){
    const product=await db.product.update({where:{id:pid},data})
    return product;
}
export async function DeleteProduct(pid:number){
    const product=await db.product.delete({where:{id:pid}});
    return product;
}