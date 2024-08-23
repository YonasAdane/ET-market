import  { db } from "../../common/prisma-config";
import {createCategoryType } from "./categories.schema";
export async function CreateCategory(data:createCategoryType){
    const category = await db.category.create({
         data,
      });
      return category;
}
export async function UpdateCategory(id:number,data:createCategoryType){
    const category=await db.category.update({where:{id},data});
    return category;
}
export async function FindAllCategories(){
    const allCategory=await db.category.findMany({});
    return allCategory;
}
export async function FindSingleCategory(id:number){
    const singleCategory=await db.category.findUnique({
        where:{
            id
        }
    });
    return singleCategory;
}