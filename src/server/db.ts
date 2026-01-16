import { PrismaClient } from "@prisma/client";

declare global {
  // eslint-disable-next-line no-var
  var prisma: PrismaClient | undefined;
}

let prismaClientInstance: PrismaClient | undefined;

function getPrismaClient(): PrismaClient {
  if (prismaClientInstance) {
    return prismaClientInstance;
  }

  // In production with Turso, we need to use the adapter
  // But since the adapter causes build issues, we'll use direct HTTP for now
  // The adapter will be loaded at runtime via a separate initialization
  prismaClientInstance = new PrismaClient({
    log: ["error", "warn"]
  });

  return prismaClientInstance;
}

// Prevent hot-reload from creating extra clients in dev
export const prisma = global.prisma || getPrismaClient();

if (process.env.NODE_ENV !== "production") global.prisma = prisma;
