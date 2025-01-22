import type { Request } from '@prisma/client'

export interface findManyParams {
  animalName?: string
  animalSpecies?: string
  tutorName?: string
  status?: string
}

export interface CreateRequestProps {
  tutorId: string
  animalId: string
  status: string
}

export interface RequestsRepository {
  approve(requestId: string): Promise<void>
  refuse(requestId: string): Promise<void>
  findById(requestId: string): Promise<Request | null>
  findMany(
    page: number,
    ngoId: string,
    params?: findManyParams
  ): Promise<Request[]>
  create({ animalId, tutorId, status }: CreateRequestProps): Promise<Request>
  deleteManyByAnimalId(animalId: string): void
}
