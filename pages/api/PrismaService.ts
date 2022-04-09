// @ts-ignore
import { PrismaClient } from "@prisma/client";

/**
 * Single PrismaClient instance used by the whole application.
 */
const PrismaService = new PrismaClient({
    log: ['query', 'error', 'warn'],
    errorFormat: 'pretty',
});

export default PrismaService;