// src/lib/searchparams.ts
import {
	createSearchParamsCache,
	parseAsArrayOf,
	parseAsInteger,
	parseAsString,
} from 'nuqs/server';
import * as z from "zod";

export const productSearchParams = {
  page: parseAsInteger.withDefault(1),
  limit: parseAsInteger.withDefault(12),
  q: parseAsString.withDefault(''),
  category: parseAsString,
  brands: parseAsArrayOf(parseAsString).withDefault([]),
  minPrice: parseAsInteger.withDefault(0),
  maxPrice: parseAsInteger.withDefault(2000),
  sort: parseAsString.withDefault('featured'),
};


export const filterSchema = z.object({
  q: z.string().optional(),
  minPrice: z.number().min(0),
  maxPrice: z.number().max(10000),
  brands: z.array(z.string()),
  sort: z.string()
});

export type FilterValues = z.infer<typeof filterSchema>;
export const searchParamsCache = createSearchParamsCache(productSearchParams);