"use client"

import { BlogPost } from '@/lib/interfaces'
import { ApiBlogService } from '@/lib/services'
import dynamic from 'next/dynamic'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { Input } from './ui/input'

const ServerComponent = dynamic(() => import('@/components/RichTextEditor'), { 
  ssr: true,
  loading: () => <p>Loading editor...</p>
})

export const NewPostForm = () => {
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const router = useRouter()
  const blogService = new ApiBlogService()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const post: BlogPost = { title, content }
    try {
      await blogService.createPost(post)
      router.push('/blog')
    } catch (error) {
      console.error('Failed to create post:', error)
    }
  }

  return (
    <div className="max-w-6xl mx-auto space-y-6" suppressHydrationWarning>
      <h1 className="text-4xl font-bold">New Blog Post</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="title" className="block text-sm font-medium text-zinc-50">
            Title
          </label>
          <Input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="mt-1 block w-full rounded-md bg-zinc-900 border-zinc-800 shadow-sm focus:border-violet-500 focus:ring focus:ring-violet-200 focus:ring-opacity-50"
            required
          />
        </div>
        <div>
          <label htmlFor="content" className="block text-sm font-medium text-zinc-50">
            Content
          </label>
          <ServerComponent
            value={content}
            onChange={setContent}
          />
        </div>
        <button
          type="submit"
          className="bg-violet-500 hover:bg-violet-600 text-zinc-50 font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          Publish Post
        </button>
      </form>
    </div>
  )
}