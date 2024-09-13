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