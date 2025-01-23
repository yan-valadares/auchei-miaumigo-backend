import { env } from '@/env'
import { PrismaClient } from '@prisma/client'
import { execSync } from 'node:child_process'
import { randomUUID } from 'node:crypto'

const prisma = new PrismaClient()

if (!env.DATABASE_URL)
  throw new Error('Please provide a DATABASE_URL environment variable')

function generateUniqueDatabaseUrl(schemaId: string) {
  const url = new URL(env.DATABASE_URL)

  url.searchParams.set('schema', schemaId)

  return url.toString()
}

const schemaId = randomUUID()

beforeAll(async () => {
  const databaseUrl = generateUniqueDatabaseUrl(schemaId)

  env.DATABASE_URL = databaseUrl

  execSync('npx prisma migrate deploy')
})

afterAll(async () => {
  await prisma.$executeRawUnsafe(`DROP SCHEMA IF EXISTS "${schemaId}" CASCADE`)
  await prisma.$disconnect()
})
