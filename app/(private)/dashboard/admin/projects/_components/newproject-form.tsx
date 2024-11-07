"use client";

import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Project } from "@/lib/interfaces";
import { ApiProjectService } from "@/lib/services";
import { useRouter } from "next/navigation";
import { useState } from "react";

export const NewProjectForm = () => {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [imageUrl, setImageUrl] = useState('')
  const [githubUrl, setGithubUrl] = useState('')
  const [liveUrl, setLiveUrl] = useState('')
  const router = useRouter()
  const projectService = new ApiProjectService()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const project: Project = { title, description, imageUrl, githubUrl, liveUrl }
    try {
      await projectService.createProject(project)
      router.push('/projects')
    } catch (error) {
      console.error('Failed to create project:', error)      
    }
  }

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <h1 className="text-4xl font-bold">Add New Project</h1>
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
          <label htmlFor="description" className="block text-sm font-medium text-zinc-50">
            Description
          </label>
          <Textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="mt-1 block w-full rounded-md bg-zinc-900 border-zinc-800 
            shadow-sm focus:border-violet-500 focus:ring focus:ring-violet-200 
            focus:ring-opacity-50 resize-none"
            required
          ></Textarea>
        </div>
        <div>
          <label htmlFor="imageUrl" className="block text-sm font-medium text-zinc-50">
            Image URL
          </label>
          <Input
            type="url"
            id="imageUrl"
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
            className="mt-1 block w-full rounded-md bg-zinc-900 border-zinc-800 shadow-sm focus:border-violet-500 focus:ring focus:ring-violet-200 focus:ring-opacity-50"
          />
        </div>
        <div>
          <label htmlFor="githubUrl" className="block text-sm font-medium text-zinc-50">
            GitHub URL
          </label>
          <Input
            type="url"
            id="githubUrl"
            value={githubUrl}
            onChange={(e) => setGithubUrl(e.target.value)}
            className="mt-1 block w-full rounded-md bg-zinc-900 border-zinc-800 shadow-sm focus:border-violet-500 focus:ring focus:ring-violet-200 focus:ring-opacity-50"
          />
        </div>
        <div>
          <label htmlFor="liveUrl" className="block text-sm font-medium text-zinc-50">
            Live URL
          </label>
          <Input
            type="url"
            id="liveUrl"
            value={liveUrl}
            onChange={(e) => setLiveUrl(e.target.value)}
            className="mt-1 block w-full rounded-md bg-zinc-900 border-zinc-800 shadow-sm focus:border-violet-500 focus:ring focus:ring-violet-200 focus:ring-opacity-50"
          />
        </div>
        <button
          type="submit"
          className="bg-violet-500 hover:bg-violet-600 text-zinc-50 font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          Add Project
        </button>
      </form>
    </div>
  )
}