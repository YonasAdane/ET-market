import { z } from "zod";

export const createBrandSchema = z.object({
  name: z.string().min(2).max(100),
  logoUrl: z.string().optional(),
});
export type createBrandType=z.infer<typeof createBrandSchema>;