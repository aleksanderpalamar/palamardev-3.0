"use client";

import { editAbout } from "@/app/actions/editAbout";
import RichTextEditor from "@/components/RichTextEditor";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Loader, Pencil, Save } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

interface AboutProps {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  content: string;
}

interface EditAboutButtonProps {
  about: AboutProps
}

export default function EditAboutButton({ about }: EditAboutButtonProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedAbout, setEditedAbout] = useState(about);
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();

  const handleEdit = async () => {
    setIsEditing(true)
    try {
      const result = await editAbout(about.id, {
        title: editedAbout.title,
        description: editedAbout.description,
        imageUrl: editedAbout.imageUrl,
        content: editedAbout.content
      })
      if (result.success) {
        alert('About edited successfully.')
        router.refresh()
      } else {
        alert('Failed to edit about. Please try again.')
      }
    } catch (error) {
      console.error('Error editing about:', error)
    } finally {
      setIsEditing(false)
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setEditedAbout((prev) => ({ ...prev, [name]: value }));
  }

  const handleRichTextEditorChange = (value: string) => {
    setEditedAbout((prev) => ({ ...prev, content: value }));    
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
        <DialogHeader>
          <DialogTitle>Editing About</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="flex flex-col space-y-2 w-full">
            <label htmlFor="title">Title</label>
            <Input 
              id="title"
              name="title"
              value={editedAbout.title}
              onChange={handleInputChange}
            />
          </div>
          <div className="flex flex-col space-y-2 w-full">
            <label htmlFor="title">Description</label>
            <Input 
              id="description"
              name="description"
              value={editedAbout.description}
              onChange={handleInputChange}
            />
          </div>
          <div className="flex flex-col space-y-2 w-full">
            <label htmlFor="title">ImageUrl</label>
            <Input 
              id="imageUrl"
              name="imageUrl"
              value={editedAbout.imageUrl}
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