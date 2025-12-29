import {
  createSearchParamsCache,
  parseAsArrayOf,
  parseAsInteger,
  parseAsString,
} from "nuqs/server";

/**
 * Parsers object for shop filters.
 * These define how URL parameters are parsed and validated.
 * Using .withDefault() ensures your application always has valid 
 * initial values even if the URL is empty.
 */
export const productParsers = {
  // Array of strings for categories and brands
  categories: parseAsArrayOf(parseAsString).withDefault([]),
  brands: parseAsArrayOf(parseAsString).withDefault([]),
  
  // Numeric ranges for pricing
  minPrice: parseAsInteger.withDefault(0),
  maxPrice: parseAsInteger.withDefault(2000),
  
  // Sorting options (popular, newest, low-high, high-low)
  sort: parseAsString.withDefault("popular"),
  
  // Pagination (starts at 1)
  page: parseAsInteger.withDefault(1),
  limit: parseAsInteger.withDefault(12),
  // Search query string
  search: parseAsString.withDefault(""),
};

/**
 * Search Params Cache for Server Components.
 * This allows you to parse the searchParams in your page.tsx 
 * without having to manually validate every key.
 */
export const searchParamsCache = createSearchParamsCache(productParsers);