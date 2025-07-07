import React, { useEffect } from 'react'
import { createFileRoute, useNavigate } from '@tanstack/react-router'

import type { CreateCandidateType } from '@/types/candidate'

import { Input } from '@/components/form/input'
import { Select } from '@/components/form/select'
import DataRepo from '@/api/datasource'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import deleteCandidate from  'src/api/domain/ds/DataDS.ts'

type SearchParams = {
  id: string
}

export const Route = createFileRoute('/form/$id')({
  component: RouteComponent,
})

function RouteComponent() {
  // Get the `id` parameter from the route
  const { id } = Route.useParams();
  const navigate = useNavigate();

  const [mode] = React.useState<'create' | 'update'>(
    id === 'new' ? 'create' : 'update',
  )

  const { data } = useQuery({
    enabled: mode === 'update',
    queryKey: ['candidate', id],
    queryFn: () => DataRepo.getCandidateById(id),
  })

  const {mutate, isPending} = useMutation<boolean,Error, CreateCandidateType>({
    mutationKey: ['candidate'],
    mutationFn: (values) => {
      if (mode === 'create') {
        return DataRepo.saveCandidate(values)
      } else {
        return DataRepo.updateCandidate({
          ...values,
          id: id,
        })
      }
    },
    onSettled: (_, error) => {
      if (error) {
        alert(`Error saving candidate: ${error.message}`)
      } else {
        if (mode === 'create') {
          alert('Candidate created successfully!')
        }
        if (mode === 'update') {
          alert('Candidate updated successfully!')
        }
        // Redirect to the candidates list or another page
        navigate({ to: '/candidates' })
      }
    }
  })

  const [form, setForm] = React.useState<CreateCandidateType>({
    name: '',
    age: 0,
    experience: 0,
    status: 'Pending',
    skills: [],
    working: false,
  })

  useEffect(
    () => {
      if (data) {
        setForm({
          name: data.name,
          age: data.age,
          experience: data.experience,
          status: data.status,
          skills: data.skills,
          working: data.working,
        })
      }
    },
    [data]
  )



  return (
    <form
      className="flex flex-col gap-4 p-4 max-w-2xl"
      onSubmit={(e) => {
        e.preventDefault()
        submitForm()
      }}
    >
      <h1 className="text-2xl font-bold">Form</h1>

      <Input
        type="text"
        placeholder="Enter the candidate name"
        className="w-full"
        data-slot="input"
        label="Name"
        value={form.name}
        onChange={(e) => handleChange('name', e.target.value)}
      />

      <Input
        type="number"
        placeholder="Enter the candidate age"
        className="w-full"
        data-slot="input"
        label="Age"
        value={form.age}
        onChange={(e) => handleChange('age', parseInt(e.target.value))}
      />

      <Input
        type="number"
        placeholder="Enter the years of experience"
        className="w-full"
        data-slot="input"
        label="Experience"
        value={form.experience}
        onChange={(e) => handleChange('experience', parseInt(e.target.value))}
      />

      <Select
        className="w-full"
        data-slot="select"
        label="Status"
        options={[
          { value: 'Pending', label: 'Pending' },
          { value: 'Reviewing', label: 'Reviewing' },
          { value: 'Interviewing', label: 'Interviewing' },
          { value: 'Hired', label: 'Hired' },
        ]}
        value={form.status}
        onChange={(e) => handleChange('status', e.target.value)}
      />

      <Input
        type="text"
        placeholder="Enter the candidate skills"
        className="w-full"
        data-slot="input"
        label="Skills"
        value={form.skills.join(', ')}
        onChange={(e) =>
          handleChange(
            'skills',
            e.target.value.split(',').map((s) => s.trim()),
          )
        }
      />

      <Input
        type="checkbox"
        className="w-full"
        data-slot="input"
        label="Working"
        checked={form.working}
        onChange={(e) => handleChange('working', e.target.checked)}
      />

      <button
        className="mt-4 w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded"
        type="submit"
      >
        {isPending ? "Saving.." : (mode === 'create' ? 'Create' : 'Update') + ' Candidate'}
      </button>


    </form>
  )



  function submitForm() {
    console.log('Form submitted:', form)
    mutate(form)
  }

  function handleChange(
    key: string,
    value: string | number | boolean | Array<string>,
  ) {
    setForm((prev) => ({
      ...prev,
      [key]: value,
    }))
  }
}


