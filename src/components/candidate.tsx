import type { CandidateType } from '@/types/candidate'

import { cn } from '@/lib/utils'
import { Link } from '@tanstack/react-router'

import DataRepo from '@/api/datasource'
import { useQueryClient,QueryClient, useMutation } from '@tanstack/react-query'


type CandidateProps = {
  data: CandidateType
}

const Candidate = (props: CandidateProps) => {
  const { name, age, experience, status, skills, working, id } = props.data
 const queryClient = useQueryClient()

  const mutation = useMutation({
    mutationFn: (id: string) => DataRepo.deleteCandidate(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['candidates'] })
      alert('Candidato eliminado correctamente')
    },
    onError: (error: Error) => {
      alert('Error al eliminar candidato: ' + error.message)
    }
  })
    return (
    <article className="border border-gray-300 rounded-lg p-4 shadow-md flex-col w-[300px]">
      <div className="flex items-center mb-4 gap-4 justify-between">
        <h2 className="text-xl font-bold text-gray-800">{name}</h2>
        <p
          className={cn(
            'text-white text-sm font-semibold px-2 py-1 rounded-full',
            getStatusColor(status),
          )}
        >
          {status}
        </p>
      </div>
      <p className="text-gray-600">Age: {age}</p>
      <p className="text-gray-600">Experience: {experience} years</p>

      {working && <p className="text-green-500">Currently working</p>}
      {!working && <p className="text-red-500">Not currently working</p>}

      <h3 className="text-lg font-semibold text-gray-800 mt-2">Skills:</h3>
      <ul>
        {skills.map((skill, index) => (
          <li className="text-gray-600 text-sm" key={index}>
            {skill}
          </li>
        ))}
      </ul>
      <Link to='/form/$id' params={{ id }}> Editar </Link>
      <button
        className="mt-4 w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded"
        onClick={copyData}
      >
        Copy data
      </button>

     
         <button
              className="mt-4 w-full bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded"
              type="button"
              onClick={() =>
                mutation.mutate(id)
              }
            >
              Eliminar Candidato
            </button>
        
   
    </article>
  )




     
      

    

  function copyData() {
    const textToCopy = `Name: ${name}, Status: ${status}, Working: ${working}, Age: ${age}, Experience: ${experience}, Skills: ${skills.join(
      ', ',
    )}`

    navigator.clipboard
      .writeText(textToCopy)
      .then(() => alert('Data copied to clipboard!'))
      .catch((err) => console.error('Failed to copy: ', err))
  }

  function getStatusColor(s: string) {
    switch (s) {
      case 'Pending':
        return 'bg-yellow-500'
      case 'Reviewing':
        return 'bg-blue-500'
      case 'Accepted':
        return 'bg-green-500'
      case 'Rejected':
        return 'bg-red-500'
      default:
        return 'bg-gray-500'
    }
  }
}

export default Candidate
