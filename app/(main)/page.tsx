import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getAbout } from "@/Functions/get-about";
import { getPosts } from "@/Functions/get-posts";
import { getProjects } from "@/Functions/get-projects";
import { LinkIcon, Loader2 } from "lucide-react";
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
      <div className="flex flex-col space-y-4 items-center justify-center max-w-4xl mx-auto mt-8">
        <h1 className="text-4xl font-bold mb-14">
          Olá, eu sou o <p className="text-violet-400 animate-typewriter text-xl">{about[0]?.title}
            <span className="hidden md:inline">👋</span></p>
          <span className="text-lg text-zinc-50">{about[0]?.description}</span>
        </h1>

        <div className="flex flex-col items-center justify-center w-full space-y-4">
          <Card className="w-full md:w-1/2 bg-zinc-950 overflow-hidden shadow-lg p-1 rounded-xl border border-zinc-900">
            <CardHeader>
              <CardTitle className="text-zinc-50">Latest Project</CardTitle>
            </CardHeader>
            <CardContent>
              {latestProject && (
                <div className="flex-grow flex flex-col space-y-4 h-full">
                  <Link href="/projects"
                    className="flex flex-col space-y-2 h-full p-1 hover:bg-zinc-800/20 group">
                    <h1 className="text-zinc-50 font-semibold flex items-center overflow-hidden">
                      <span className="inline-block">
                        {latestProject.title}
                      </span>
                      <LinkIcon className="ml-2 w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    </h1>
                    <p className="text-zinc-50 line-clamp-1 text-lg">{latestProject.description}</p>
                  </Link>
                  <div className="flex-grow flex flex-col space-y-2 h-full" />
                </div>
              )}
            </CardContent>
          </Card>
          <Card className="w-full md:w-1/2 bg-zinc-950 overflow-hidden shadow-lg p-1 rounded-xl border border-zinc-900">
            <CardHeader>
              <CardTitle className="text-zinc-50">Latest Post</CardTitle>
            </CardHeader>
            <CardContent>
              {latestPost && (
                <div className="flex-grow flex flex-col space-y-4 h-full">
                  <Link href={`/blog/${latestPost.id}`}
                    className="flex flex-col space-y-2 h-full p-1 hover:bg-zinc-800/20 group">
                    <h1 className="text-zinc-50 font-semibold flex items-center overflow-hidden">
                      <span className="inline-block">
                        {latestPost.title}
                      </span>
                      <LinkIcon className="ml-2 w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    </h1>
                  </Link>
                  <div className="flex-grow flex flex-col space-y-2 h-full" />
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
