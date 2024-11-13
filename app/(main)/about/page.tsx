import { Button } from "@/components/ui/button"
import download from "@/Functions/download"
import Image from "next/image"
import { getAbout } from "@/Functions/get-about";
import { Loader2 } from "lucide-react";

export const revalidate = 0

export default async function About() {
  const about = await getAbout()

  switch (about) {
    case null:
      return <div className="flex justify-center">About not found</div>
    case undefined:
      return <div className="flex justify-center"><Loader2 className="w-6 h-6 animate-spin" /></div>
  }

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <h1 className="text-4xl font-bold">About Me</h1>
      <div className="flex flex-col space-y-4 md:flex-row md:items-start md:space-y-0 md:space-x-4">
        <div className="flex flex-col w-48 h-64 rounded-3xl overflow-hidden shrink-0">
          {about[0].imageUrl && (
            <Image
              width={1000}
              height={1000}
              src={about[0].imageUrl}
              alt={about[0].title}
              className="size-64 object-cover"
              quality={100}
            />
          )}
        </div>
        <div className="flex flex-col w-full space-y-4">
          {about.map((paragraph) => (
            <p key={paragraph.id}
              className="mb-4 max-w-3xl mx-auto text-justify text-zinc-50 border-none antialiased prose
              prose-headings:text-zinc-50 prose-headings:font-bold prose-strong:text-violet-400
                prose-a:underline prose-a:text-violet-400 prose-a:hover:text-violet-500
              prose-p:text-zinc-50 prose-img:rounded-md prose-img:aspect-square prose-img:overflow-hidden 
                prose-img:object-cover prose-pre:bg-neutral-800 prose-pre:text-zinc-50 prose-code:p-2 prose-code:rounded-md
              prose-code:bg-neutral-800 prose-code:text-zinc-50 prose-code:font-mono prose-blockquote:p-2 prose-blockquote:bg-neutral-800 
              prose-blockquote:text-zinc-50 prose-video:rounded-lg prose-video:aspect-video"
              dangerouslySetInnerHTML={{ __html: paragraph.content }}
            />
          ))}
          <Button
            className="bg-violet-600 hover:bg-violet-700 text-zinc-50 px-4 py-2 rounded-lg w-fit"
            onClick={download}
          >
            Download CV
          </Button>
        </div>
      </div>
    </div>
  )
}