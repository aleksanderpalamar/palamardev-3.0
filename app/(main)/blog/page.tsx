import { getPosts } from "@/Functions/get-posts"
import { ArrowRight, Loader2 } from "lucide-react"
import { marked } from "marked";
import Link from "next/link"

export default async function Blog() {
  const posts = await getPosts()

  const renderer = new marked.Renderer();

  marked.setOptions({
    renderer,
    breaks: true,
    gfm: true,
  });

  const formattedDate = (date: Date) => {
    const options: Intl.DateTimeFormatOptions = {
      year: '2-digit',
      month: 'short',
      day: 'numeric',
    }
    return new Date(date).toLocaleDateString('pt-BR', options)
  }

  switch (posts) {
    case null:
      return <div className="flex justify-center">Posts not found</div>
    case undefined:
      return <div className="flex justify-center"><Loader2 className="w-6 h-6 animate-spin" /></div>
  }

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <h1 className="text-4xl font-bold">
        Articles
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {posts.map((post) => (
          <div key={post.id} className="bg-zinc-50 overflow-hidden shadow-lg rounded-xl px-6 py-4">
            {post.title && (
              <h2 className="text-xl font-semibold text-zinc-950 mb-2">{post.title}</h2>
            )}
            <p 
              className="text-zinc-600 mb-4 text-clip overflow-hidden line-clamp-2"
              dangerouslySetInnerHTML={{ __html: marked.parse(post.content) }}
            />
            <div className="flex justify-between items-center">
              <Link href={`/blog/${post.id}`} className="flex items-center text-violet-600 hover:text-violet-800">
                <ArrowRight className="w-6 h-6 mr-2" />
                Read More
              </Link>
              <p className="text-zinc-600">{formattedDate(post.createdAt)}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}