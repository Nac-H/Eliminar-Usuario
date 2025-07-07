import type DataDS from '@/api/domain/ds/DataDS'
import type {
  CandidateType,
  CreateCandidateType,
  UpdateCandidateType,
} from '@/types/candidate'

class DataRepoImpl {
  constructor(private data: DataDS) {}

  async getCandidates(state?: string): Promise<Array<CandidateType>> {
    return await this.data.getCandidates(state)
  }

  async getCandidateById(id: string): Promise<CandidateType> {
    return await this.data.getCandidateById(id)
  }

  async saveCandidate(candidate: CreateCandidateType): Promise<boolean> {
    return await this.data.saveCandidate(candidate)
  }

  async updateCandidate(candidate: UpdateCandidateType): Promise<boolean> {
    return await this.data.updateCandidate(candidate)
  }

  async deleteCandidate(id: string): Promise<boolean> {
    return await this.data.deleteCandidate(id)
  }
}

export default DataRepoImpl
