import { z } from "zod";

export const createProductSchema = z.object({
  name: z.string().min(2).max(100),
  description: z.string().optional(),
  price:z.number().positive(),
  stock:z.number().int().positive(),
  imageUrl:z.string().optional()
});
export type createProductType=z.infer<typeof createProductSchema>;