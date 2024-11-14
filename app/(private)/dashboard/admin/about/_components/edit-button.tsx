"use client"

import { editAboutAction } from "@/app/actions/editAboutAction"
import RichTextEditor from "@/components/RichTextEditor"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Loader, Pencil, Save } from "lucide-react"
import { useRouter } from "next/navigation"
import { useState } from "react"

export interface AboutProps {
  id: string
  title: string
  description: string
  content: string
  imageUrl: string
}

interface EditAboutButtonProps {
  about: AboutProps
}


export default function EditAboutButton({ about }: EditAboutButtonProps) {
  const [isEditing, setIsEditing] = useState(false)
  const [editedAbout, setEditedAbout] = useState(about)
  const [isOpen, setIsOpen] = useState(false)
  const router = useRouter()

  const handleEdit = async () => {
    setIsEditing(true)
    try {
      const result = await editAboutAction(
        editedAbout.id,
        editedAbout.title,
        editedAbout.description,
        editedAbout.content,
        editedAbout.imageUrl
      )
      if (result.success) {
        // The about was edited successfully, and the page will be revalidated
        alert('About edited successfully.')
        router.refresh()
      }
    } catch (error) {
      console.error('Error editing about:', error)
      alert('An error occurred while editing the about.')      
    } finally {
      setIsEditing(false)
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setEditedAbout((prev) => ({ ...prev, [name]: value }))
  }

  const handleRichTextEditorChange = (value: string) => {
    setEditedAbout((prev) => ({ ...prev, content: value }))
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <button className="font-medium text-violet-600 hover:text-violet-500 disabled:opacity-50">
          <div className="flex justify-center bg-rose-100/10 hover:bg-rose-100/20 cursor-pointer rounded-md px-2 py-1">
            <Pencil className="w-6 h-6" />
          </div>
        </button>
      </DialogTrigger>
      <DialogContent className="md:max-w-6xl max-w-[425px] bg-zinc-900 border-none">
        <div className="grid gap-4 py-4">
        <div className="flex flex-col space-y-2 w-full">
            <label className="text-zinc-50">Image</label>
            <Input
              id="image"
              name="image"
              value={editedAbout.imageUrl}
              onChange={handleInputChange}
            />
          </div>
          <div className="flex flex-col space-y-2 w-full">
            <label className="text-zinc-50">Title</label>
            <Input
              id="title"
              name="title"
              value={editedAbout.title}
              onChange={handleInputChange}
            />
          </div>
          <div className="flex flex-col space-y-2 w-full">
            <label className="text-zinc-50">Description</label>
            <Input
              id="description"
              name="description"
              value={editedAbout.description}
              onChange={handleInputChange}
            />
          </div>
          <div className="flex flex-col space-y-2 w-full">
            <RichTextEditor 
              value={editedAbout.content}
              onChange={handleRichTextEditorChange}
            />
          </div>
          <Button
            onClick={handleEdit}
            disabled={isEditing}
            className="w-min mt-4 bg-violet-600 hover:bg-violet-500 rounded-md"
          >
            {isEditing ? (
              <Loader className="w-6 h-6 animate-spin" />
            ) : (
              <Save className="w-6 h-6" />
            )}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}