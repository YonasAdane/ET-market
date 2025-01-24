import type { CategoryType as PrismaCategoryType } from "@prisma/client";
import { Prisma, PrismaClient } from "@prisma/client";

// Export the CategoryType enum type
export type CategoryType = PrismaCategoryType;

// Export PrismaClient for use in other files
export { Prisma, PrismaClient };

