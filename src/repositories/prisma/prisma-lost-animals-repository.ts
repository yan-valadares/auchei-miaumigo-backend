import { prisma } from '@/lib/prisma'
import type { Prisma, LostAnimal } from '@prisma/client'
import type {
  LostAnimalsRepository,
  findManyParams,
} from '../lost-animals-repository'

export class PrismaLostAnimalsRepository implements LostAnimalsRepository {
  async findById(id: string): Promise<LostAnimal | null> {
    const lostAnimal = await prisma.lostAnimal.findFirstOrThrow({
      where: {
        id,
      },
    })

    return lostAnimal
  }
  async findMany(page: number, params?: findManyParams): Promise<LostAnimal[]> {
    const lostAnimals = await prisma.lostAnimal.findMany({
      where: {
        state: params?.state ? params.state : undefined,
        city: params?.city ? params.city : undefined,
      },
      take: 12,
      skip: (page - 1) * 12,
    })

    return lostAnimals
  }
  async findOldest(): Promise<LostAnimal[]> {
    const lostAnimals = await prisma.lostAnimal.findMany({
      orderBy: {
        lostDate: 'asc',
      },
      take: 12,
    })

    return lostAnimals
  }
  async create(data: Prisma.LostAnimalCreateInput): Promise<LostAnimal> {
    const lostAnimal = await prisma.lostAnimal.create({
      data,
    })

    return lostAnimal
  }
}
