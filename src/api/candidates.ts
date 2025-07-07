import type { CandidateType } from '@/types/candidate'

const data: Array<CandidateType> = [
  {
    id: '1',
    name: 'John Doe',
    age: 30,
    experience: 5,
    skills: ['JavaScript', 'React', 'Node.js'],
    status: 'Pending',
    working: true,
  },
  {
    id: '2',
    name: 'Jane Smith',
    age: 25,
    experience: 3,
    skills: ['Python', 'Django', 'Flask'],
    status: 'Reviewing',
    working: false,
  },
]

export const getCandidates = (status?: string) => {
  if (status) {
    return data.filter((c) => c.status === status)
  }

  return data
}

export const getCandidate = (id: string) => {
  const candidate = data.find((c) => c.id === id)

  if (!candidate) {
    throw new Error('Candidate not found')
  }

  return candidate
}
