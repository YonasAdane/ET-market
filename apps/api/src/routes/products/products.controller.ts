import { Request, Response } from "express";
import {createProduct, DeleteProduct, FindAllProduct, FindSingleProduct, UpdateProduct} from "./products.service"
import { createProductType } from "./products.schema";
 /**
     * @GET /products: Retrieve a list of all products.

    Usage: To display all products on the website, often used with pagination and filtering.
     */

export async function getProductsHandler(req:Request,res:Response){
    const product=await FindAllProduct();
    return res.json(product);
};
/**
     * @POST /products: Create a new product.

    Usage: To add a new product to the catalog.
    Payload: { name, description, price, stock, categoryId, productId, imageUrl }
     */

export async function postProductsHandler(req:Request<{},{},createProductType>,res:Response){
    const data=req.body;
    const brand=await createProduct(data);
    return res.json(brand);

};
   /**
     * @GET /products/:id: Get product details by ID.

    Usage: To display a specific product's details.
    Parameter: id (Product ID)
     */
export async function getSingleProductsHandler(req:Request<{id:string}>,res:Response){
    const id=parseInt(req.params.id);
    const product=await FindSingleProduct(id);
    return res.json(product)
};
/**
 * @PUT /products/:id: Update product details.

Usage: To modify details of an existing product.
Parameter: id (Product ID)
Payload: { name, description, price, stock, categoryId, productId, imageUrl }
    */

export async function putProductsHandler(req:Request<{id:string},{},createProductType>,res:Response){
    const id=parseInt(req.params.id);
    const data=req.body;
    const product=await UpdateProduct(id,data);
    return res.json(product)

};
/**
     * @DELETE /products/:id: Delete a product.

    Usage: To remove a product from the catalog.
    Parameter: id (Product ID)
     */

export async function deleteProductHandler(req:Request<{id:string}>,res:Response){
    const id=parseInt(req.params.id);
    const product=await DeleteProduct(id);
    return res.json(product)
};