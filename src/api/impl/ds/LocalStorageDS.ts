import type DataDS from '@/api/domain/ds/DataDS'
import type {
  CandidateType,
  CreateCandidateType,
  UpdateCandidateType,
} from '@/types/candidate'

const CANDIDATES_KEY = 'candidates'

const sleep = (ms = 500) => new Promise((resolve) => setTimeout(resolve, ms))

class LocalStorageDS implements DataDS {
  async getCandidates(status?: string) {
    try {
      await sleep()

      const candidatesRaw = localStorage.getItem(CANDIDATES_KEY) ?? '[]'

      const candidates = JSON.parse(candidatesRaw) as Array<CandidateType>

      return candidates.filter((candidate) => {
        if (status) {
          return candidate.status === status
        }

        return true
      })
    } catch (error) {
      console.error(error)
      throw new Error('Error loading users')
    }
  }

  async getCandidateById(id: string): Promise<CandidateType> {
    try {
      await sleep()

      const candidatesRaw = localStorage.getItem(CANDIDATES_KEY) ?? '[]'

      const candidates = JSON.parse(candidatesRaw) as Array<CandidateType>

      const candidate = candidates.find((c) => c.id === id)

      if (!candidate) {
        throw new Error('Candidate not found')
      }

      return candidate
    } catch (error) {
      console.error(error)
      throw new Error('Error loading user')
    }
  }

  async saveCandidate(candidate: CreateCandidateType): Promise<boolean> {
    try {
      await sleep()

      const candidatesRaw = localStorage.getItem(CANDIDATES_KEY) ?? '[]'

      const candidates = JSON.parse(candidatesRaw) as Array<CandidateType>

      const newCandidate: CandidateType = {
        ...candidate,
        id: crypto.randomUUID(),
        status: 'Pending',
      }

      candidates.push(newCandidate)

      localStorage.setItem(CANDIDATES_KEY, JSON.stringify(candidates))

      return true
    } catch (error) {
      console.error(error)
      throw new Error('Error saving user')
    }
  }

  async updateCandidate(candidate: UpdateCandidateType): Promise<boolean> {
    try {
      await sleep()

      const candidatesRaw = localStorage.getItem(CANDIDATES_KEY) ?? '[]'

      const candidates = JSON.parse(candidatesRaw) as Array<CandidateType>

      const candidateIndex = candidates.findIndex((c) => c.id === candidate.id)

      if (candidateIndex === -1) {
        throw new Error('Candidate not found')
      }

      candidates[candidateIndex] = {
        ...candidates[candidateIndex],
        ...candidate,
      }

      localStorage.setItem(CANDIDATES_KEY, JSON.stringify(candidates))

      return true
    } catch (error) {
      console.error(error)
      throw new Error('Error updating user')
    }
  }

  async deleteCandidate(id: string): Promise<boolean> {
    try {
      await sleep()

      const candidatesRaw = localStorage.getItem(CANDIDATES_KEY) ?? '[]'

      const candidates = JSON.parse(candidatesRaw) as Array<CandidateType>

      const candidateIndex = candidates.findIndex((c) => c.id === id)

      if (candidateIndex === -1) {
        throw new Error('Candidate not found')
      }

      candidates.splice(candidateIndex, 1)

      localStorage.setItem(CANDIDATES_KEY, JSON.stringify(candidates))

      return true
    } catch (error) {
      console.error(error)
      throw new Error('Error deleting user')
    }
  }
}

export default LocalStorageDS
