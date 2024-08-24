import { Request, Response } from "express";
import { createBrand, DeleteBrand, FindAllBrand, FindSingleBrand, UpdateBrand } from "./brands.service";
import { createBrandType } from "./brands.schema";

/**
     * @POST /brands: Create a new brand.

    Usage: To add a new brand for products.
    Payload: { name, logoUrl }
*/
export async function postBrandHandler(req:Request<{},{},createBrandType>,res:Response){
    const data=req.body;
    const brand=await createBrand(data);
    return res.json(brand);

};
 /**
 * @GET /brands: Retrieve a list of all brands.

Usage: To display all brands.
    */
export async function getBrandHandler(req:Request,res:Response){
    const brands=await FindAllBrand();
    return res.json(brands);
};

export async function getSingleBrandHandler(req:Request<{id:string}>,res:Response){
    const id=parseInt(req.params.id);
    const brand=await FindSingleBrand(id);
    return res.json(brand)

};
/**
 * @PUT /brands/:id: Update brand details.

Usage: To modify details of an existing brand.
Parameter: id (Brand ID)
Payload: { name, logoUrl }
*/
export async function putBrandHandler(req:Request<{id:string},{},createBrandType>,res:Response){
    const id=parseInt(req.params.id);
    const data=req.body;
    const brand=await UpdateBrand(id,data);
    return res.json(brand)

};
/**
 * @DELETE /brands/:id: Delete a brand.

Usage: To remove a brand.
Parameter: id (Brand ID)
*/
export async function deleteBrandHandler(req:Request<{id:string}>,res:Response){
    const id=parseInt(req.params.id);
    const brand=await DeleteBrand(id);
    return res.json(brand)
};