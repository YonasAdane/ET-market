"use server";

import axios from "axios";

export async function findProducts(categoryType:string,queryParams:any){
    try {
        console.log("request param obj: ",queryParams);
        
        let baseUrl=`http://localhost:4000/api/v1/products/${categoryType}`
        const products=await axios.get(baseUrl, {
            params: queryParams,
            headers: {
              'Content-Type': 'application/json'
            }
          })

          
        // const products=await fetch(`http://localhost:4000/api/v1/products/${categoryType}${queryParams}`,{cache:"no-store"});
        return products.data;
        
    } catch (error) {
        console.log(error);
    }
}
export async function findProductsBrand(categoryType:string){
    try {
        const brands=await fetch(`http://localhost:4000/api/v1/products/${categoryType}/brands-categories`);
        return brands.json();
        
    } catch (error) {
        console.log(error);
    }
}