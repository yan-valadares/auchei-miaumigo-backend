import { faker } from '@faker-js/faker'
import type { Animal } from '@prisma/client'
import { randomUUID } from 'node:crypto'
import { generateRandomNumbersString } from '@/utils/random-numbers-generator'
import { getRandomPropertyType } from '@/utils/get-random-property'
import type { CreateAnimalUseCaseParams } from '@/use-cases/create-animal'

function getRandomTags(): string[] {
  const tags = [
    'independent',
    'playful',
    'calm',
    'docile',
    'care',
    'energetic',
    'sociable',
    'selective',
    'protector',
  ]

  const shuffledTags = [...tags].sort(() => Math.random() - 0.5)

  return shuffledTags.slice(0, 3)
}

export function makeCompleteAnimal(
  override: Partial<Animal> = {},
  id?: string,
  ngoId?: string
) {
  const animalSpecies = getRandomPropertyType('cat', 'dog')
  const animalWeight = Number(generateRandomNumbersString(1)) + 1
  const animalAgeNumber = Number(generateRandomNumbersString(1))
  const animalAgeString = `${animalAgeNumber} anos`
  const animalAgeGroup: 'baby' | 'young' | 'old' =
    animalAgeNumber <= 2 ? 'baby' : animalAgeNumber <= 8 ? 'young' : 'old'

  const animal: CreateAnimalUseCaseParams = {
    name:
      animalSpecies === 'cat' ? faker.animal.cat.name : faker.animal.dog.name,
    age: animalAgeString,
    ageGroup: animalAgeGroup,
    description: String(faker.lorem.paragraph()),
    imageUrl: faker.internet.url(),
    sex: getRandomPropertyType('male', 'female'),
    size: getRandomPropertyType('small', 'medium', 'large'),
    species: animalSpecies,
    tags: getRandomTags(),
    weight: animalWeight,
    created_at: new Date(),
    id: id ?? randomUUID(),
    ngoId: ngoId ?? randomUUID(),
    ...override,
  }

  return animal
}

export function makeAnimal(
  override: Partial<Animal> = {},
  id?: string,
  ngoId?: string
) {
  const animalSpecies = getRandomPropertyType('cat', 'dog')
  const animalWeight = Number(generateRandomNumbersString(1)) + 1
  const animalAgeNumber = Number(generateRandomNumbersString(1))
  const animalAgeString = `${animalAgeNumber} anos`
  const animalAgeGroup: 'baby' | 'young' | 'old' =
    animalAgeNumber <= 2 ? 'baby' : animalAgeNumber <= 8 ? 'young' : 'old'

  const animal = {
    age: animalAgeString,
    ageGroup: animalAgeGroup,
    name:
      animalSpecies === 'cat' ? faker.animal.cat.name : faker.animal.dog.name,
    sex: getRandomPropertyType('male', 'female'),
    size: getRandomPropertyType('small', 'medium', 'large'),
    species: animalSpecies,
    weight: animalWeight,
    ngo: {
      connect: {
        id: ngoId ?? randomUUID(),
      },
    },
    id: id ?? randomUUID(),
    ...override,
  }

  return animal
}
