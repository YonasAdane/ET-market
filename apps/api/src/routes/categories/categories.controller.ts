import { Request, Response } from "express";
import { createCategoryType } from "./categories.schema";
import { CreateCategory, FindAllCategories, FindSingleCategory, UpdateCategory } from "./categories.service";
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
export async function getCategoriesHandler(req:Request,res:Response){
    const allCategory=await FindAllCategories();
    return res.json(allCategory);

};
/**
 * @GET /categories/:id: Get category details by ID.

Usage: To view a specific category's details.
Parameter: id (Category ID)
    */
export async function getSingleCategoryHandler(req:Request,res:Response){
    const cid=parseInt(req.params.id);
    const category=await FindSingleCategory(cid);
    return res.json(category);

};
 /**
     * @PUT /categories/:id: Update category details.

    Usage: To modify details of an existing category.
    Parameter: id (Category ID)
    Payload: { name, description }
     */
export async function putCategoryHandler(req:Request<{id:string},{},createCategoryType>,res:Response){
    let id=parseInt(req.params.id);
    let data=req.body;
    const category=await UpdateCategory(id,data);
    return res.json(category);

};
  /**
     * @DELETE /categories/:id: Delete a category.

    Usage: To remove a category.
    Parameter: id (Category ID)
     */
export function deleteCategoryHandler(req:Request,res:Response){
    return res.json({message:"deleteProductHandler"})

};