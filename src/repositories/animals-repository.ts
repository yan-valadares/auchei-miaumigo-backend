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

export interface findManyByNgoIdParams {
  animalSex?: string
  animalSpecies?: string
  animalSize?: string
  animalName?: string
}

export interface AnimalsRepository {
  findById(id: string): Promise<Animal | null>
  findMany(page: number, params?: findManyParams): Promise<Animal[]>
  findManyByNgoId(
    page: number,
    id: string,
    params?: findManyByNgoIdParams
  ): Promise<Animal[]>
  create(data: Prisma.AnimalCreateInput): Promise<Animal>
  delete(id: string): void
}
