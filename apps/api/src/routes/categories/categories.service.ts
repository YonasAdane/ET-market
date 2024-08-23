import  { db } from "../../common/prisma-config";
import {createCategoryType } from "./categories.schema";
export async function CreateCategory(data:createCategoryType){
    const product = await db.category.create({
         data,
      });
      return product;
}
 