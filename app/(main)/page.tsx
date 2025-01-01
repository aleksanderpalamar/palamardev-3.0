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
      <div className="flex flex-col space-y-4 items-center justify-center max-w-4xl mx-auto mt-8">
        <h1 className="text-4xl font-bold mb-14 flex flex-col">
          Olá, eu sou o 
          <p className="inline-flex animate-text-gradient bg-gradient-to-r from-[#ACACAC] 
            via-[#363636] to-[#ACACAC] bg-[200%_auto] bg-clip-text text-center text-2xl 
              font-semibold text-transparent">
              {about[0]?.title}
            <span className="hidden md:inline">👋</span>
          </p>
          <span className="text-lg text-zinc-50">{about[0]?.description}</span>
        </h1>
        <div className="flex flex-col items-center justify-center w-full space-y-4">
          <div className="w-full max-w-[350px]">
            <div className="group relative grid overflow-hidden rounded-xl px-4 py-5 shadow-[0_1000px_0_0_hsl(0_0%_20%)_inset] transition-colors duration-200">
              <span>
                <span className="spark mask-gradient absolute inset-0 h-[100%] w-[100%] animate-flip overflow-hidden rounded-xl [mask:linear-gradient(white,_transparent_50%)] before:absolute before:aspect-square before:w-[200%] before:rotate-[-90deg] before:animate-rotate before:bg-[conic-gradient(from_0deg,transparent_0_340deg,white_360deg)] before:content-[''] before:[inset:0_auto_auto_50%] before:[translate:-50%_-15%]" />
              </span>
              <span className="backdrop absolute inset-px rounded-[11px] bg-neutral-950 transition-colors duration-200" />
              <div className="z-10 space-y-2">
                {latestProject && (
                  <>
                    <h3 className="text-xl font-semibold text-neutral-200">Last Project</h3>
                    <Link href={`/projects/${latestProject.id}`}>
                      <p className="text-sm leading-[1.5] text-neutral-400">
                        {latestProject.title}
                      </p>
                    </Link>
                  </>
                )}
              </div>
            </div>
          </div>
          <div className="w-full max-w-[350px]">
            <div className="group relative grid overflow-hidden rounded-xl px-4 py-5 shadow-[0_1000px_0_0_hsl(0_0%_20%)_inset] transition-colors duration-200">
              <span>
                <span className="spark mask-gradient absolute inset-0 h-[100%] w-[100%] animate-flip overflow-hidden rounded-xl [mask:linear-gradient(white,_transparent_50%)] before:absolute before:aspect-square before:w-[200%] before:rotate-[-90deg] before:animate-rotate before:bg-[conic-gradient(from_0deg,transparent_0_340deg,white_360deg)] before:content-[''] before:[inset:0_auto_auto_50%] before:[translate:-50%_-15%]" />
              </span>
              <span className="backdrop absolute inset-px rounded-[11px] bg-neutral-950 transition-colors duration-200" />
              <div className="z-10 space-y-2">
                {latestPost && (
                  <>
                    <h3 className="text-xl font-semibold text-neutral-200">Last Post</h3>
                    <Link href={`/blog/${latestPost.id}`}>
                      <p className="text-sm leading-[1.5] text-neutral-400 line-clamp-2 overflow-hidden">
                        {latestPost.title}
                      </p>
                    </Link>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
