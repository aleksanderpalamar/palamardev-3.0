
import { getProjectById } from "@/Functions/get-projects";
import Image from "next/image";
import Link from "next/link";

export const revalidate = 0

export default async function Project({ params }: { params: { slug: string } }) {
  const project = await getProjectById(params.slug)

  if (!project) {
    return <div>Project not found</div>
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <h1 className="text-4xl font-bold">{project.title}</h1>
      {project.imageUrl && (
        <Image
          width={1000}
          height={1000}
          src={project.imageUrl}
          alt={project.title}
          className="w-full h-64 object-cover rounded-xl"
          quality={100}
        />
      )}
      <p className="text-zinc-50 text-lg text-wrap overflow-hidden">{project.description}</p>
      <div className="flex items-center justify-between">
        {project.githubUrl && (
          <Link
            href={project.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-violet-50 bg-violet-500 hover:bg-violet-600 px-4 py-2 rounded-md"
          >
            GitHub Repository
          </Link>
        )}
        {project.liveUrl && (
          <Link
            href={project.liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-emerald-50 bg-emerald-500 hover:bg-emerald-600 px-4 py-2 rounded-md"
          >
            Live Demo
          </Link>
        )}
      </div>
    </div>
  )
}