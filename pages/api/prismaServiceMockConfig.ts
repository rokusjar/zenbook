// @ts-ignore
import { PrismaClient } from '@prisma/client'
import { mockDeep, mockReset, DeepMockProxy } from 'jest-mock-extended'
import PrismaService from "./PrismaService";

/**
 * Used to mock PrismaService for the API unit tests.
 * Test want be calling database, they will call mock service instead.
 * @see https://www.prisma.io/docs/guides/testing/unit-testing
 */
jest.mock('./PrismaService', () => ({
    __esModule: true,
    default: mockDeep<PrismaClient>(),
}))

beforeEach(() => {
    mockReset(prismaMock)
})

export const prismaMock = PrismaService as unknown as DeepMockProxy<PrismaClient>