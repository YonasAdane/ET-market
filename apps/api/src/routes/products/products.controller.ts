import express, { Request, Response } from "express";
import {getManyProducts} from "./products.service"
 /**
     * @GET /products: Retrieve a list of all products.

    Usage: To display all products on the website, often used with pagination and filtering.
     */
export function getProductsHandler(req:Request,res:Response){
    return res.json({message:"getManyProducts"})

};
/**
     * @POST /products: Create a new product.

    Usage: To add a new product to the catalog.
    Payload: { name, description, price, stock, categoryId, brandId, imageUrl }
     */
export function postProductsHandler(req:Request,res:Response){
    return res.json({message:"postProductsHandler"})

};
   /**
     * @GET /products/:id: Get product details by ID.

    Usage: To display a specific product's details.
    Parameter: id (Product ID)
     */
export function getSingleProductsHandler(req:Request,res:Response){
    return res.json({message:"getSingleProductsHandler"})

};
/**
 * @PUT /products/:id: Update product details.

Usage: To modify details of an existing product.
Parameter: id (Product ID)
Payload: { name, description, price, stock, categoryId, brandId, imageUrl }
    */
export function putProductsHandler(req:Request,res:Response){
    return res.json({message:"putProductsHandler"})

};
/**
     * @DELETE /products/:id: Delete a product.

    Usage: To remove a product from the catalog.
    Parameter: id (Product ID)
     */
export function deleteProductHandler(req:Request,res:Response){
    return res.json({message:"deleteProductHandler"})

};
