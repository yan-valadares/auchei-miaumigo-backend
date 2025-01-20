import { faker } from '@faker-js/faker'
import type { LostAnimal } from '@prisma/client'
import { randomUUID } from 'node:crypto'
import { generateRandomNumbersString } from '@/utils/random-numbers-generator'
import { getRandomPropertyType } from '@/utils/get-random-property'
import type { CreateLostAnimalUseCaseParams } from '@/use-cases/create-lost-animal'

export function makeCompleteLostAnimal(
  override: Partial<LostAnimal> = {},
  id?: string
) {
  const lostAnimalSpecies = getRandomPropertyType('cat', 'dog')
  const fakeLostDate = faker.date.anytime()

  const lostAnimal: CreateLostAnimalUseCaseParams = {
    name:
      lostAnimalSpecies === 'cat'
        ? faker.animal.cat.name
        : faker.animal.dog.name,
    imageUrl: faker.internet.url(),
    sex: getRandomPropertyType('male', 'female'),
    created_at: new Date(),
    state: faker.location.state({ abbreviated: true }),
    city: faker.location.city(),
    lastPlaceSeen: faker.location.streetAddress(),
    lostDate: fakeLostDate,
    tutorId: id ?? randomUUID(),
    id: id ?? randomUUID(),
    ...override,
  }

  return lostAnimal
}
