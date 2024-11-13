"use client"

import { Input } from "@/components/ui/input"
import { About} from "@/lib/interfaces"
import { ApiAboutService } from "@/lib/services"
import { useRouter } from "next/navigation"
import { useState } from "react"
import dynamic from 'next/dynamic'

const ServerComponent = dynamic(() => import('@/components/RichTextEditor'), { 
  ssr: true,
  loading: () => <p>Loading...</p>
})

export const NewAboutForm = () => {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [imageUrl, setImageUrl] = useState('')
  const [content, setContent] = useState('')
  const router = useRouter()
  const aboutService = new ApiAboutService()
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const about: About = {title, description, content, imageUrl }
    try {
      await aboutService.createAbout(about)
      router.push('/about')
    } catch (error) {
      console.error('Failed to create about:', error)
    }
  }

  return (
    <div className="max-w-6xl mx-auto space-y-6" suppressHydrationWarning>
      <h1 className="text-4xl font-bold">New About</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="image" className="block text-sm font-medium text-zinc-50">
            ImageUrl
          </label>
          <Input
            type="text"
            id="image"
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
            className="mt-1 block w-full rounded-md bg-zinc-900 border-zinc-800 shadow-sm focus:border-violet-500 focus:ring focus:ring-violet-200 focus:ring-opacity-50"
          />                    
        </div>
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
          />
        </div>
        <div>
          <label htmlFor="description" className="block text-sm font-medium text-zinc-50">
            Description
          </label>
          <Input
            type="text"
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="mt-1 block w-full rounded-md bg-zinc-900 border-zinc-800 shadow-sm focus:border-violet-500 focus:ring focus:ring-violet-200 focus:ring-opacity-50"
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
        <button type="submit" className="bg-violet-500 text-white px-4 py-2 rounded-md hover:bg-violet-600">
          Publish
        </button>        
      </form>
    </div>
  )
}