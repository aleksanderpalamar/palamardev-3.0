import { getSinglePost } from "@/Functions/get-posts";
import { marked } from "marked";

export default async function Page({ params }: { params: { slug: string } }) {
  const post = await getSinglePost(params.slug)
  const content = marked.parse(post?.content || '')

  return (
    <div className="max-w-6xl mx-auto space-y-6" >
      <h1 className="text-4xl font-bold">
        {post?.title}
      </h1>
      <div
        className="max-w-none mx-auto text-justify text-zinc-50 border-none antialiased prose
         prose-headings:text-zinc-50 prose-headings:font-bold prose-strong:text-zinc-300
         prose-a:underline prose-a:text-violet-400 prose-a:hover:text-violet-500
         prose-p:text-zinc-50 prose-img:rounded-md prose-img:aspect-square prose-img:overflow-hidden 
         prose-img:object-cover prose-pre:bg-zinc-800 prose-pre:text-zinc-50 prose-code:p-1 prose-code:bg-zinc-800 
         prose-code:text-zinc-50 prose-code:font-mono prose-blockquote:p-2 prose-blockquote:bg-zinc-800 
         prose-blockquote:text-zinc-50 prose-video:rounded-lg prose-video:aspect-video"
        dangerouslySetInnerHTML={{ __html: content }}
      />
    </div>
  )
}