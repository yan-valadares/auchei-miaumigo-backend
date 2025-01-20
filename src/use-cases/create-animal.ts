import type { AnimalsRepository } from '@/repositories/animals-repository'
import type { Animal } from '@prisma/client'

export interface CreateAnimalUseCaseParams {
  id?: string | null
  name: string
  sex: string
  weight: number
  age: string
  ageGroup: string
  species: string
  size: string
  tags: string[]
  ngoId: string
  imageUrl?: string | null
  description?: string | null
}

interface CreateAnimalUseCaseResponse {
  animal: Animal
}

export class CreateAnimalUseCase {
  constructor(private animalsRepository: AnimalsRepository) {}

  async execute({
    name,
    sex,
    weight,
    age,
    ageGroup,
    species,
    size,
    tags,
    ngoId,
    imageUrl,
    description,
  }: CreateAnimalUseCaseParams): Promise<CreateAnimalUseCaseResponse> {
    const animal = await this.animalsRepository.create({
      name,
      sex,
      weight,
      age,
      ageGroup,
      species,
      size,
      tags,
      imageUrl,
      description,
      ngo: { connect: { id: ngoId } },
    })

    return { animal }
  }
}
