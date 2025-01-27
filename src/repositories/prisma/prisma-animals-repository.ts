import { prisma } from '@/lib/prisma'
import type { Prisma, Animal } from '@prisma/client'
import type {
  AnimalsRepository,
  findManyByNgoIdParams,
  findManyParams,
} from '../animals-repository'

export class PrismaAnimalsRepository implements AnimalsRepository {
  async update(data: Prisma.AnimalUpdateInput): Promise<Animal> {
    const animalId = data.id?.toString()

    if (animalId === null) throw new Error()

    const animal = await prisma.animal.update({
      where: { id: animalId },
      data,
    })

    return animal
  }
  async create(data: Prisma.AnimalCreateInput) {
    const animal = await prisma.animal.create({
      data,
    })

    return animal
  }
  async findMany(page: number, params?: findManyParams): Promise<Animal[]> {
    const animals = await prisma.animal.findMany({
      where: {
        sex: params?.animalSex ? params.animalSex : undefined,
        species: params?.animalSpecies ? params.animalSpecies : undefined,
        ageGroup: params?.animalAge ? params.animalAge : undefined,
        size: params?.animalSize ? params.animalSize : undefined,
        ngo:
          params?.animalNgo || params?.state || params?.city
            ? {
                ngoName: params?.animalNgo
                  ? { contains: params.animalNgo, mode: 'insensitive' }
                  : undefined,
                address: {
                  state: params?.state
                    ? { contains: params.state, mode: 'insensitive' }
                    : undefined,
                  city: params?.city
                    ? { contains: params.city, mode: 'insensitive' }
                    : undefined,
                },
              }
            : undefined,
      },
      take: 12,
      skip: (page - 1) * 12,
    })

    return animals
  }

  async findManyByNgoId(
    page: number,
    ngoId: string,
    params: findManyByNgoIdParams
  ): Promise<Animal[]> {
    const animals = await prisma.animal.findMany({
      where: {
        ngo_id: ngoId,
        name: params?.animalName ? params.animalName : undefined,
        sex: params?.animalSex ? params.animalSex : undefined,
        size: params?.animalSize ? params.animalSize : undefined,

        species: params?.animalSpecies ? params.animalSpecies : undefined,
      },
      take: 9,
      skip: (page - 1) * 9,
    })

    return animals
  }
  async delete(id: string): Promise<void> {
    await prisma.animal.delete({
      where: {
        id,
      },
    })
  }
  async findById(id: string): Promise<Animal | null> {
    const animal = await prisma.animal.findUnique({
      where: {
        id,
      },
    })

    return animal
  }
}
