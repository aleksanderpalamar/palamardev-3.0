
import { getPosts } from '@/Functions/get-posts'
import EditPostButton from '../_components/edit-post-button'
import DeletePostButton from '../_components/delete-button'

export const revalidate = 0

export default async function BlogPostsList() {
  const posts = await getPosts()

  return (
    <div className="max-w-6xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-extrabold text-zinc-50 mb-6">Articles List</h1>
        <ul className="divide-y divide-zinc-800 border border-zinc-800 overflow-hidden sm:rounded-md">
          {posts.map((post) => (
            <li key={post.id} className="px-4 py-4 sm:px-6 flex items-center justify-between">
              <div>
                <span className="font-medium text-violet-600 mr-2">{post.id}</span>
                <span className="text-zinc-50">{post.title}</span>
              </div>
              <div className="flex space-x-2">
                <EditPostButton post={post} />
                <DeletePostButton postId={post.id} />
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}