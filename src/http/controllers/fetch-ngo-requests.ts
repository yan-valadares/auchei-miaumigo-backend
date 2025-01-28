import { makeFetchNgoRequestsUseCase } from '@/use-cases/factories/make-fetch-ngo-requests-use-case'
import type { FastifyReply, FastifyRequest } from 'fastify'
import z from 'zod'

export interface FetchNgoRequestsResponse {
  requests: {
    name: string
    id: string
    sex: string
    weight: number
    age: string
    ageGroup: string
    species: string
    size: string
    tags: string[]
    description: string | null
    imageUrl: string | null
    created_at: Date
    ngo_id: string
  }[]
}

export async function fetchNgoRequests(
  request: FastifyRequest,
  reply: FastifyReply
): Promise<FetchNgoRequestsResponse> {
  const fetchNgoRequestsQuerySchema = z.object({
    animalName: z.string().optional(),
    animalSpecies: z.string().optional(),
    tutorName: z.string().optional(),
    status: z.string().optional(),
    page: z.coerce.number(),
  })

  const paramsSchema = z.object({
    id: z.string().uuid(),
  })

  const { id } = paramsSchema.parse(request.params)

  const animalInformations = fetchNgoRequestsQuerySchema.parse(request.query)

  const fetchNgoRequests = makeFetchNgoRequestsUseCase()

  const { requests } = await fetchNgoRequests.execute({
    ngoId: id,
    ...animalInformations,
  })

  return reply.status(200).send({
    requests,
  })
}
