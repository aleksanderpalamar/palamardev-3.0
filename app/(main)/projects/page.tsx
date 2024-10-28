import { getProjects } from "@/Functions/get-projects"
import Image from "next/image"
import Link from "next/link"

export const revalidate = 0

export default async function Projects() {
  const projects = await getProjects()
  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <h1 className="text-4xl font-bold">My Projects</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((project) => (
          <div key={project.id} className="bg-white overflow-hidden shadow-lg rounded-xl border border-zinc-800">
            {project.imageUrl && (
              <Image
                width={400}
                height={200}
                src={project.imageUrl}
                alt={project.title}
                className="w-full h-48 object-cover"
              />
            )}
            <div className="p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-2">{project.title}</h2>
              <p className="text-gray-600 mb-4 text-clip overflow-hidden line-clamp-1">{project.description}</p>
              <div className="flex justify-between items-center">
                {project.liveUrl && (
                  <Link
                    href={`/projects/${project.id}`}
                    rel="noopener noreferrer"
                    className="text-emerald-600 hover:text-emerald-800 font-semibold"
                  >
                    View
                  </Link>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}