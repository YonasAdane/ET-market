import { CategoryType as PrismaCategoryType, PrismaClient } from "@prisma/client";

// Export the CategoryType enum type
export type CategoryType = PrismaCategoryType;

// Export PrismaClient for use in other files
export { PrismaClient };
