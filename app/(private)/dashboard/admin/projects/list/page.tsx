import DeleteProjectButton from '@/components/ui/delete-project-button'
import { getProjects } from '@/Functions/get-projects'

export default async function ProjectsList() {
  const projects = await getProjects()

  return (
    <div className="max-w-6xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-extrabold text-zinc-50 mb-6">
          Projects List
        </h1>
        <ul className="divide-y divide-zinc-800 border border-zinc-800 overflow-hidden sm:rounded-md">
          {projects.map((project) => (
            <li key={project.id} className="px-4 py-4 sm:px-6 flex items-center justify-between">
              <div>
                <span className="font-medium text-violet-600 mr-2">{project.id}</span>
                <span className="text-zinc-50">{project.title}</span>
              </div>
              <DeleteProjectButton projectId={project.id} />
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}