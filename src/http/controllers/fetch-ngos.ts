import { makeFetchNgosUseCase } from '@/use-cases/factories/make-fetch-ngos-use-case'
import type { FastifyReply, FastifyRequest } from 'fastify'
import z from 'zod'

export interface FetchNgosResponse {
  filteredNgos: {
    id: string
    ngoName: string
    email: string
    adminFirstName: string
    adminLastName: string
    logoUrl: string | null
    created_at: Date
  }[]
}

export async function fetchNgos(
  request: FastifyRequest,
  reply: FastifyReply
): Promise<FetchNgosResponse> {
  const fetchNgosQuerySchema = z.object({
    state: z.string().optional(),
    city: z.string().optional(),
    page: z.coerce.number(),
  })

  const ngoInformations = fetchNgosQuerySchema.parse(request.query)

  const fetchNgos = makeFetchNgosUseCase()

  const { ngos } = await fetchNgos.execute(ngoInformations)

  const filteredNgos = ngos.map(({ password, ...ngo }) => ngo)

  return reply.status(200).send(filteredNgos)
}
