import { z } from 'zod'

export const CandidateSchema = z.object({
  id: z.string(),
  name: z.string(),
  age: z.number().min(0),
  experience: z.number().min(0),
  status: z.enum(['Pending', 'Reviewing', 'Interviewing', 'Hired']),
  skills: z.array(z.string()),
  working: z.boolean(),
})

export type CandidateType = z.infer<typeof CandidateSchema>

export const CreateCandidateSchema = CandidateSchema.omit({
  id: true,
})

export type CreateCandidateType = z.infer<typeof CreateCandidateSchema>

export const UpdateCandidateSchema = CandidateSchema.partial().extend({
  id: z.string(),
})

export type UpdateCandidateType = z.infer<typeof UpdateCandidateSchema>
