import { Card } from "@/components/ui/card";
import { getAbout } from "@/Functions/get-about";
import { getPosts } from "@/Functions/get-posts";
import { getProjects } from "@/Functions/get-projects";
import { Loader2 } from "lucide-react";
import Link from "next/link";

export const revalidate = 0

export default async function Home() {
  const project = await getProjects()
  const post = await getPosts()
  const about = await getAbout()

  if (!project || !post || !about) {
    return (
      <div className="flex justify-center">
        <Loader2 className="w-6 h-6 animate-spin" />
      </div>
    )
  }

  const latestProject = project[0]
  const latestPost = post[0]

  return (
    <div className="max-w-6xl mx-auto md:space-y-8 space-y-6">
      <h1 className="text-4xl font-bold">
        Olá, eu sou o <p className="text-violet-400">{about[0]?.title}
          <span className="hidden md:inline">👋</span></p>
        <span className="text-lg text-zinc-50 block">{about[0]?.description}</span>
      </h1>
      <p className="text-lg text-zinc-50 border-l-4 border-violet-500 pl-2">
        Sigo resolvendo problemas e impactando a vida das pessoas através do código.
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="flex flex-col justify-between max-w-md w-full mx-auto" title="Últimos Projetos">
          <h2 className="text-2xl font-semibold mb-4 text-zinc-50">Latest Project</h2>
          {latestProject && (
            <div className="flex-grow flex flex-col space-y-4 h-full">
              <Link href="/projects"
                className="flex flex-col space-y-2 h-full 
                rounded-lg border border-zinc-800 p-1 hover:bg-zinc-800/20">
                <h1>{latestProject.title}</h1>
                <p className="text-zinc-50 line-clamp-1"></p>
              </Link>
              <div className="flex-grow flex flex-col space-y-2 h-full" />
            </div>
          )}
        </Card>
        <Card className="flex flex-col justify-between max-w-md w-full mx-auto" title="Recent Blog Posts">
          <h2 className="text-2xl font-semibold mb-4 text-zinc-50">Recent Blog Posts</h2>
          {latestPost && (
            <div className="flex-grow flex flex-col space-y-4 h-full">
              <Link href={`/blog/${latestPost.id}`}
                className="flex flex-col space-y-2 h-full rounded-lg 
                border border-zinc-800 p-1 hover:bg-zinc-800/20">
                <h1>{latestPost.title}</h1>
                <p className="text-zinc-50 line-clamp-1" />
              </Link>
              <div className="flex-grow flex flex-col space-y-2 h-full" />
            </div>
          )}
        </Card>
      </div>
    </div>
  );
}
