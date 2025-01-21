import type { Animal, Prisma } from '@prisma/client'

export interface findManyParams {
  state?: string
  city?: string
  animalSex?: string
  animalSpecies?: string
  animalAge?: string
  animalSize?: string
  animalNgo?: string
}

export interface AnimalsRepository {
  findById(id: string): Promise<Animal | null>
  findMany(page: number, params?: findManyParams): Promise<Animal[]>
  create(data: Prisma.AnimalCreateInput): Promise<Animal>
  delete(id: string): void
}
