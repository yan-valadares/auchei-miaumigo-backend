import type { Ngo, Prisma } from '@prisma/client'

export interface findManyParams {
  state?: string
  city?: string
}

export interface NgosRepository {
  findById(id: string): Promise<Ngo | null>
  findByEmail(email: string): Promise<Ngo | null>
  findMany(page: number, params?: findManyParams): Promise<Ngo[]>
  create(data: Prisma.NgoCreateInput): Promise<Ngo>
}
