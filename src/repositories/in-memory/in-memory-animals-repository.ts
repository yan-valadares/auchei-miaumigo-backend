import type { Animal, Prisma } from '@prisma/client'
import type { AnimalsRepository, findManyParams } from '../animals-repository'
import { randomUUID } from 'node:crypto'

export class InMemoryAnimalsRepository implements AnimalsRepository {
  public items: Animal[] = []
  async findMany(page: number, params?: findManyParams): Promise<Animal[]> {
    return this.items
      .filter(item => {
        if (!params) return true

        return (
          (!params.animalAge || item.ageGroup === params.animalAge) &&
          (!params.animalSpecies || item.species === params.animalSpecies) &&
          (!params.animalSex || item.sex === params.animalSex) &&
          (!params.animalSize || item.size === params.animalSize)
        )
      })
      .slice((page - 1) * 12, page * 12)
  }
  async findById(id: string): Promise<Animal | null> {
    const animal = this.items.find(item => item.id === id)

    if (!animal) return null

    return animal
  }
  async create(
    data: Prisma.AnimalCreateInput,
    ngoId?: string
  ): Promise<Animal> {
    const animal: Animal = {
      id: data.id ?? randomUUID(),
      age: data.age,
      ageGroup: data.ageGroup,
      description: data.description || null,
      imageUrl: data.imageUrl || null,
      name: data.name,
      species: data.species,
      created_at: new Date(),
      sex: data.sex,
      size: data.size,
      tags: Array.isArray(data.tags) ? data.tags : [],
      weight: data.weight,
      ngo_id: ngoId ?? randomUUID(),
    }

    this.items.push(animal)

    return animal
  }
}
