import { Prisma, PrismaClient } from "@prisma/client";

// Export the CategoryType enum type
export type CategoryType = Prisma.$CategoryPayload;

// Export PrismaClient for use in other files
export { Prisma, PrismaClient };

