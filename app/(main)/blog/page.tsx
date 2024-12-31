import { getPosts } from "@/Functions/get-posts"
import { Loader2 } from "lucide-react"
import Link from "next/link"

export const revalidate = 0

export default async function Blog() {
  const posts = await getPosts()

  if (!posts) {
    return <div className="flex justify-center">Posts not found</div>
  }

  const formattedDate = (date: Date) => {
    const options: Intl.DateTimeFormatOptions = {
      year: '2-digit',
      month: 'short',
      day: '2-digit',
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
    <div className="max-w-6xl mx-auto space-y-6" >
      <h1 className="text-4xl font-bold">
        Articles
      </h1>
      <div className="flex flex-col items-center justify-center w-full space-y-4">
        {posts.map((post) => (
          <div
            key={post.id}
            className="inline-flex w-full max-w-6xl animate-shine items-center rounded-xl border 
            border-white/10 bg-[linear-gradient(110deg,#000103,45%,#303030,55%,#000103)] 
            bg-[length:400%_100%] px-4 py-5 text-sm transition-colors"
          >
            <div className="flex flex-col gap-2">
              {post.title && (
                <Link href={`/blog/${post.id}`} rel="noopener noreferrer">
                  <h3 className="text-xl font-semibold text-neutral-200 line-clamp-2 hover:text-primary-200 transition-colors duration-200">
                    {post.title}
                  </h3>
                </Link>
              )}
              <div className="flex gap-2">
                <p className="text-zinc-400 text-xs">{formattedDate(post.createdAt)}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}