import type { LostAnimalsRepository } from '@/repositories/lost-animals-repository'
import type { LostAnimal } from '@prisma/client'

export interface CreateLostAnimalUseCaseParams {
  id?: string | null
  name: string
  sex: string
  state: string
  city: string
  lastPlaceSeen: string
  lostDate: string | Date
  tutorId: string
  imageUrl: string | null
}

interface CreateLostAnimalUseCaseResponse {
  lostAnimal: LostAnimal
}

export class CreateLostAnimalUseCase {
  constructor(private lostAnimalsRepository: LostAnimalsRepository) {}

  async execute({
    name,
    sex,
    state,
    city,
    lastPlaceSeen,
    lostDate,
    tutorId,
    imageUrl,
  }: CreateLostAnimalUseCaseParams): Promise<CreateLostAnimalUseCaseResponse> {
    const lostAnimal = await this.lostAnimalsRepository.create({
      name,
      sex,
      state,
      city,
      lastPlaceSeen,
      lostDate,
      imageUrl,
      tutor: { connect: { id: tutorId } },
    })

    return { lostAnimal }
  }
}
