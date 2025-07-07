import { createFileRoute } from '@tanstack/react-router'

import type { CandidateType } from '@/types/candidate'
import { getCandidates } from '@/api/candidates'
import Candidate from '@/components/candidate'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import DataRepo from '@/api/datasource'

type SearchParams = {
  status?: string
}

export const Route = createFileRoute('/candidates')({
  component: RouteComponent,
  validateSearch: (
    search: Record<string, string | undefined>,
  ): SearchParams => ({
    status: search.status,
  }),
  loaderDeps: ({ search }) => ({
    status: search.status,
  }),
  loader: async ({ deps }) => {
    const { status } = deps

    const candidates = await new Promise<Array<CandidateType>>((resolve) => {
      setTimeout(() => {
        resolve(getCandidates(status))
      }, 1000)
    })

    return {
      candidates,
    }
  },
})

function RouteComponent() {
  const { status } = Route.useSearch()

  // const { candidates } = Route.useLoaderData()
  const queryClient = useQueryClient();

  /**
   * Invalidate the candidates query to refetch data
   * To be called **WHEN** you need it.
   * queryClient.invalidateQueries({
   *   queryKey: ['candidates'],
   * })
   */

  const { isPending, data: candidates, error } = useQuery({
    queryKey: ['candidates'],
    queryFn: () => DataRepo.getCandidates(status),
    refetchInterval: 2000, // Refetch every 2 seconds
    refetchOnWindowFocus: true, // Refetch when the window is focused
    retry: 3, // Retry failed requests up to 3 times
    refetchIntervalInBackground: false, // Do not refetch in the background
  })

  if (isPending) {
    return <div className="p-4">Loading...</div>
  }
  if (error) {
    return <div className="p-4 text-red-500">Error: {error.message}</div>
  }

  return (
    <div className="p-4">
      <div className="flex flex-row gap-2">
        {candidates.map((candidate) => (
          <Candidate key={candidate.id} data={candidate} />
        ))}
      </div>
    </div>
  )
}
