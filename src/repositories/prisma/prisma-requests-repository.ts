import type { Request } from '@prisma/client'
import type {
  CreateRequestProps,
  findManyParams,
  RequestsRepository,
} from '../requests-repository'
import { prisma } from '@/lib/prisma'

export class PrismaRequestsRepository implements RequestsRepository {
  async create({
    animalId,
    tutorId,
    status,
  }: CreateRequestProps): Promise<Request> {
    const request = await prisma.request.create({
      data: {
        animal_id: animalId,
        tutor_id: tutorId,
        status,
      },
    })

    return request
  }
  async approve(requestId: string): Promise<void> {
    await prisma.request.update({
      where: { id: requestId },
      data: {
        status: 'approved',
      },
    })
  }
  async refuse(requestId: string): Promise<void> {
    await prisma.request.update({
      where: { id: requestId },
      data: {
        status: 'refused',
      },
    })
  }
  async findById(requestId: string): Promise<Request | null> {
    const request = await prisma.request.findUnique({
      where: { id: requestId },
    })

    return request
  }
  async findMany(
    page: number,
    ngoId: string,
    params?: findManyParams
  ): Promise<Request[]> {
    const animals = await prisma.request.findMany({
      where: {
        status: params?.status ? params.status : undefined,
        tutor: {
          firstName: params?.tutorName ? params?.tutorName : undefined,
        },
        animal: {
          ngo_id: ngoId,
          name: params?.animalName ? params.animalName : undefined,
          species: params?.animalSpecies ? params?.animalSpecies : undefined,
        },
      },
      take: 20,
      skip: (page - 1) * 20,
    })

    return animals
  }

  async deleteManyByAnimalId(animalId: string): Promise<void> {
    await prisma.request.deleteMany({
      where: {
        animal_id: animalId,
      },
    })
  }
}
