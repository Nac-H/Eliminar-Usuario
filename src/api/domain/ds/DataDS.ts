import type {
  CandidateType,
  CreateCandidateType,
  UpdateCandidateType,
} from '@/types/candidate'

abstract class DataDS {
  abstract getCandidates(state?: string): Promise<Array<CandidateType>>

  abstract getCandidateById(id: string): Promise<CandidateType>

  abstract saveCandidate(candidate: CreateCandidateType): Promise<boolean>

  abstract updateCandidate(candidate: UpdateCandidateType): Promise<boolean>

  abstract deleteCandidate(id: string): Promise<boolean>
}

export default DataDS
