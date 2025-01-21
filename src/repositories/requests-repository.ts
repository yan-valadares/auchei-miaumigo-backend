import type { Prisma, Request } from '@prisma/client'

export interface RequestsRepository {
  create(data: Prisma.RequestCreateInput): Promise<Request>
  deleteManyByAnimalId(animalId: string): void
}
