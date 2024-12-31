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
          <div
            key={project.id}
            className="inline-flex w-full max-w-[650px] animate-shine items-center justify-center 
            rounded-xl border border-white/10 bg-[linear-gradient(110deg,#000103,45%,#303030,55%,#000103)] 
            bg-[length:400%_100%] text-sm transition-colors overflow-hidden"
          >
            <div className="flex flex-col gap-2">
              {project.imageUrl && (
                <Image
                  width={400}
                  height={200}
                  src={project.imageUrl}
                  alt={project.title}
                  className="w-full h-48 object-cover"
                />
              )}
              <div className="px-4 py-2 space-y-2 w-full max-w-[400px]">
                <h3 className="text-xl font-semibold text-neutral-200 overflow-hidden">
                  {project.title}
                </h3>
                <p className="text-sm leading-[1.5] text-neutral-400 line-clamp-2 overflow-hidden">
                  {project.description}
                </p>
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