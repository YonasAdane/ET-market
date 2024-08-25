import { z } from "zod";
import { Request, Response, NextFunction } from "express";

export const validateRequest = (schema: z.ZodTypeAny) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const result = schema.safeParse(req.body);
    if (!result.success) {
        console.log(result.error);
      return res.status(400).json({
        error: result.error.errors[0].message,
      });
    }
       next();
  };
};
