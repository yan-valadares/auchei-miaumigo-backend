import type { LostAnimal, Prisma } from '@prisma/client'
import type {
  LostAnimalsRepository,
  findManyParams,
} from '../lost-animals-repository'
import { randomUUID } from 'node:crypto'

export class InMemoryLostAnimalsRepository implements LostAnimalsRepository {
  public items: LostAnimal[] = []

  async findMany(page: number, params?: findManyParams): Promise<LostAnimal[]> {
    return this.items
      .filter(item => {
        if (!params) return true

        return (
          (!params.state || item.state === params.state) &&
          (!params.city || (params.state && item.city === params.city))
        )
      })
      .slice((page - 1) * 12, page * 12)
  }

  async findOldest(): Promise<LostAnimal[]> {
    return this.items
      .filter(item => item.lostDate)
      .sort(
        (a, b) =>
          new Date(a.lostDate).getTime() - new Date(b.lostDate).getTime()
      )
      .slice(0, 12)
  }

  async findById(id: string): Promise<LostAnimal | null> {
    const lostAnimal = this.items.find(item => item.id === id)

    if (!lostAnimal) return null

    return lostAnimal
  }

  async create(
    data: Prisma.LostAnimalCreateInput,
    tutorId?: string
  ): Promise<LostAnimal> {
    const lostAnimal: LostAnimal = {
      id: data.id ?? randomUUID(),
      city: data.city,
      created_at: new Date(),
      imageUrl: data.imageUrl || null,
      lastPlaceSeen: data.lastPlaceSeen,
      lostDate:
        typeof data.lostDate === 'string'
          ? new Date(data.lostDate)
          : data.lostDate,
      name: data.name,
      sex: data.sex,
      state: data.state,
      tutor_id: tutorId ?? randomUUID(),
    }

    this.items.push(lostAnimal)

    return lostAnimal
  }
}
