import { getSinglePost } from "@/Functions/get-posts";
import { Loader2 } from "lucide-react";
import { marked } from "marked";

export default async function Page({ params }: { params: { slug: string } }) {
  const post = await getSinglePost(params.slug)

  const renderer = new marked.Renderer();

  marked.setOptions({
    renderer,
    breaks: true,
    gfm: true,
  });

  switch (post) {
    case null:
      return <div className="flex justify-center">Post not found</div>
    case undefined:
      return <div className="flex justify-center"><Loader2 className="w-6 h-6 animate-spin" /></div>
  }

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <h1 className="text-4xl font-bold">{post.title}</h1>
      <div 
        className="prose prose-lg max-w-none mx-auto dark:prose-invert
                   prose-headings:font-bold prose-headings:text-gray-900 dark:prose-headings:text-gray-100
                   prose-p:text-gray-700 dark:prose-p:text-gray-300
                   prose-a:text-blue-600 hover:prose-a:text-blue-500
                   prose-strong:text-gray-900 dark:prose-strong:text-gray-100
                   prose-code:text-gray-900 dark:prose-code:text-gray-100 prose-code:bg-gray-100 dark:prose-code:bg-gray-800
                   prose-code:before:content-['```'] prose-code:after:content-['```']
                   prose-pre:text-gray-900 dark:prose-pre:text-gray-100
                   prose-pre:bg-gray-100 dark:prose-pre:bg-gray-800
                   prose-blockquote:text-gray-900 dark:prose-blockquote:text-gray-100
                   prose-img:rounded-xl prose-img:shadow-lg prose-img:shadow-gray-800/50
                   prose-img:object-cover prose-img:object-center space-y-4"
        dangerouslySetInnerHTML={{ __html: marked.parse(post.content) }}
      />
    </div>
  )
}