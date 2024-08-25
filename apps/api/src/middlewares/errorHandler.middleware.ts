import { CustomError } from "../utils/customError"
import { ErrorRequestHandler, NextFunction, Request, Response } from "express"
import { z } from "zod";

export const errorHandler:ErrorRequestHandler=(
error:Error,
req:Request,
res:Response,
next:NextFunction
)=>{
    // return res.status(400).json({message:error.message})
    if(error instanceof CustomError){
        return res.status(error.statusCode).json(error.serialize());
    }
    if(error instanceof z.ZodError){
        return res.status(400).json({message:error.issues});
    }
    return res.status(400).json({message:error.message})
}