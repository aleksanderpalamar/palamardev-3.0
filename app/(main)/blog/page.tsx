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
          <div key={post.id} className="bg-zinc-50 w-full max-w-4xl text-wrap flex flex-col overflow-hidden shadow-lg rounded-xl px-6 py-4">
            {post.title && (
              <Link href={`/blog/${post.id}`} rel="noopener noreferrer">
                <h2 className="text-lg font-semibold text-zinc-950 mb-2 hover:underline hover:text-violet-500 cursor-pointer">
                  {post.title}
                </h2>
              </Link>
            )}
            <div className="flex justify-between items-center">
              <p className="text-zinc-600 text-xs">{formattedDate(post.createdAt)}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}