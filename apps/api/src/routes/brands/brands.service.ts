import { db } from "../../common/prisma-config";
import { createBrandType } from "./brands.schema";

export async function createBrand(data:createBrandType){
    const brand=await db.brand.create({data});
    return brand;
}
export async function FindAllBrand(){
    const brands=await db.brand.findMany();
    return brands;
}
export async function FindSingleBrand(bid:number){
    const brand=await db.brand.findUnique({where:{id:bid}});
    return brand;
}
export async function UpdateBrand(bid:number,data:createBrandType){
    const brand=await db.brand.update({where:{id:bid},data})
    return brand;
}
export async function DeleteBrand(bid:number){
    const brand=await db.brand.delete({where:{id:bid}});
    return brand;
}