import { PrismaClient, $Enums } from "@prisma/client";

// Export the CategoryType enum type
export type CategoryType = $Enums.CategoryType;

// Export PrismaClient for use in other files
export { PrismaClient };
