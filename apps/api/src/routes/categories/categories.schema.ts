import { z } from "zod";

export const createCategorySchema = z.object({
  name: z.string().min(2).max(100),
  description: z.string().optional(),
});
export type createCategoryType=z.infer<typeof createCategorySchema>;