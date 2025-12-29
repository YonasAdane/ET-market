import { z } from "zod";

export const filterSchema = z.object({
  categories: z.array(z.string()).default([]),
  brands: z.array(z.string()).default([]),
  minPrice: z.number().min(0).default(0),
  maxPrice: z.number().min(0).default(2000),
  // sort: z.enum(["popular", "newest", "low-high", "high-low"]).default("popular"),
  page: z.number().min(1).default(1),
  search: z.string().optional(),
  sort: z.string().optional(),
  limit: z.number().optional(),
});

export type FilterValues = z.infer<typeof filterSchema>;