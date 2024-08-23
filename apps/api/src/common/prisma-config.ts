// import { PrismaClient } from '@repo/database/src/index';
// const prisma = new PrismaClient();
// export default prisma;
import { PrismaClient } from "@repo/database/src/index";

let db: PrismaClient;

declare global {
  var __db: PrismaClient | undefined;
}

if (!global.__db) {
  global.__db = new PrismaClient();
}

db = global.__db;

export { db };