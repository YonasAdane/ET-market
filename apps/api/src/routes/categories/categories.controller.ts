import { Request, Response } from "express";
import { createCategoryType } from "./categories.schema";
import { CreateCategory } from "./categories.service";
  /**
     * @POST /categories: Create a new category.

    Usage: To add a new category for products.
    Payload: { name, description }
     */

export async function postCategoriesHandler(req:Request<{},{},createCategoryType>,res:Response){
    
    const category=await CreateCategory(req.body);
    return res.json(category);
};
 /**
     * @GET /categories: Retrieve a list of all categories.

    Usage: To display all product categories.
     */
export function getCategoriesHandler(req:Request,res:Response){
    return res.json({message:"getManyCategory"})

};
/**
 * @GET /categories/:id: Get category details by ID.

Usage: To view a specific category's details.
Parameter: id (Category ID)
    */
export function getSingleCategoryHandler(req:Request,res:Response){
    return res.json({message:"getSingleCategoryHandler"})

};
 /**
     * @PUT /categories/:id: Update category details.

    Usage: To modify details of an existing category.
    Parameter: id (Category ID)
    Payload: { name, description }
     */
export function putCategoryHandler(req:Request,res:Response){
    return res.json({message:"putCategoryHandler"})

};
  /**
     * @DELETE /categories/:id: Delete a category.

    Usage: To remove a category.
    Parameter: id (Category ID)
     */
export function deleteCategoryHandler(req:Request,res:Response){
    return res.json({message:"deleteProductHandler"})

};