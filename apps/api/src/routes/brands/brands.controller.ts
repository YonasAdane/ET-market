import { Request, Response } from "express";

/**
     * @POST /brands: Create a new brand.

    Usage: To add a new brand for products.
    Payload: { name, logoUrl }
*/
export function postBrandHandler(req:Request,res:Response){
    return res.json({message:"postBrandHandler"})

};
 /**
 * @GET /brands: Retrieve a list of all brands.

Usage: To display all brands.
    */
export function getBrandHandler(req:Request,res:Response){
    return res.json({message:"getManyBrand"})

};

export function getSingleBrandHandler(req:Request,res:Response){
    return res.json({message:"getSingleBrandHandler"})

};
/**
 * @PUT /brands/:id: Update brand details.

Usage: To modify details of an existing brand.
Parameter: id (Brand ID)
Payload: { name, logoUrl }
*/
export function putBrandHandler(req:Request,res:Response){
    return res.json({message:"putBrandHandler"})

};
/**
 * @DELETE /brands/:id: Delete a brand.

Usage: To remove a brand.
Parameter: id (Brand ID)
*/
export function deleteBrandHandler(req:Request,res:Response){
    return res.json({message:"deleteProductHandler"})

};