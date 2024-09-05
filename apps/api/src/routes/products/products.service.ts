import { CategoryType } from "@repo/database/src";
import { db } from "../../common/prisma-config";
import { CategoryTypeEnum, createProductType, ProductQueryType, ProductType } from "./products.schema";

export async function createProduct(parsedData:ProductType){

    const product=await db.product.create({data: parsedData});
    return product;
}
export async function FindAllProduct(){
    const products=await db.product.findMany();
    return products;
}
export async function FindAllProductInCategory(category:string){
    const products=await db.product.findMany({
        where: {
            categoryType: category as CategoryType,
            // role: Role[role as keyof typeof Role], // Convert string to enum
          },
      });
    return products;
    }
export async function FindSingleProduct(pid:number){
    const product=await db.product.findUnique({where:{id:pid}});
    return product;
}
export async function UpdateProduct(id:number,data:ProductType){
    const product=await db.product.update({
        where: { id: Number(id) },
        data
      });
    return product;
}
export async function DeleteProduct(pid:number){
    const product=await db.product.delete({where:{id:pid}});
    return product;
}

// export async function queryFilter(CategoryType:CategoryTypeEnum,queryParams:ProductQueryType){
//     switch (CategoryType) {
//         case "CLOTHING":
//             const product=await db.product.findMany({where:{
//                 price: {
//                     lte: parseInt(queryParams?.price)
//                   },
//                   starRating: {
//                     gte:parseInt(queryParams?.star)
//                   },
//             }

//             })
//             return product;
//             break;
    
//         default:
//             break;
//     }
// }