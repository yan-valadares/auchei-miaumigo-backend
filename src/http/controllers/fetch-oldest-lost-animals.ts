import { makeFetchOldestLostAnimalsUseCase } from '@/use-cases/factories/make-fetch-oldest-lost-animals-use-case'
import type { FastifyReply, FastifyRequest } from 'fastify'
import z from 'zod'

export interface FetchOldestLostAnimalsResponse {
  lostAnimals: {
    name: string
    id: string
    created_at: Date
    tutor_id: string
    state: string
    city: string
    lastPlaceSeen: string
    lostDate: Date
    sex: string
    imageUrl: string | null
  }[]
}

export async function fetchOldestLostAnimals(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const fetchLostAnimals = makeFetchOldestLostAnimalsUseCase()

  const { lostAnimals } = await fetchLostAnimals.execute()

  return reply.status(200).send({ lostAnimals })
}
