import { Request, Response } from "express";

export function getManyProducts(req:Request,res:Response){
    return res.json({message:"api/products/getManyProducts"})
}