import type { LostAnimal, Prisma } from '@prisma/client'

export interface findManyParams {
  state?: string
  city?: string
}

export interface LostAnimalsRepository {
  findById(id: string): Promise<LostAnimal | null>
  findMany(page: number, params?: findManyParams): Promise<LostAnimal[]>
  create(data: Prisma.LostAnimalCreateInput): Promise<LostAnimal>
}
