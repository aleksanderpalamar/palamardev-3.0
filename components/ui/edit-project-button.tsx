"use client";

import { useState } from "react";
import { Pencil } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { editProjectAction } from "@/app/actions/editProject";
import { useRouter } from "next/navigation";

// Defina o tipo ProjectProps para corresponder ao tipo Project
export interface ProjectProps {
  id: string
  title: string
  description: string
  imageUrl: string | null
  githubUrl: string | null
  liveUrl: string | null
}

interface EditProjectButtonProps {
  project: ProjectProps
}

export default function EditProjectButton({ project }: EditProjectButtonProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedProject, setEditedProject] = useState(project);
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();

  const handleEdit = async () => {
    setIsEditing(true)
    try {
      const result = await editProjectAction(
        editedProject.id,
        editedProject.title,
        editedProject.description,
        editedProject.imageUrl,
        editedProject.githubUrl,
        editedProject.liveUrl
      )
      if (result.success) {
        // The project was edited successfully, and the page will be revalidated
        alert('Project edited successfully.')
        router.refresh()
      } else {
        alert('Failed to edit project. Please try again.')
      }
    } catch (error) {
      console.error('Error editing project:', error)
      alert('An error occurred while editing the project.')
    } finally {
      setIsEditing(false)
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setEditedProject((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <button className="font-medium text-violet-600 hover:text-violet-500 disabled:opacity-50">
          <div className="flex justify-center bg-rose-100/10 hover:bg-rose-100/20 cursor-pointer rounded-md px-2 py-1">
            <Pencil className="w-6 h-6" />
          </div>
        </button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] bg-zinc-900 border-none">
        <DialogHeader>
          <DialogTitle>Edit Project</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <label htmlFor="title" className="text-right">
              Title
            </label>
            <Input
              id="title"
              name="title"
              value={editedProject.title}
              onChange={handleInputChange}
              className="col-span-3 border-zinc-800 focus:border-violet-500 focus:ring-violet-500"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <label htmlFor="description" className="text-right">
              Description
            </label>
            <Textarea
              id="description"
              name="description"
              value={editedProject.description}
              onChange={handleInputChange}
              className="col-span-3 border-zinc-800 focus:border-violet-500 focus:ring-violet-500"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <label htmlFor="imageUrl" className="text-right">
              Image URL
            </label>
            <Input
              id="imageUrl"
              name="imageUrl"
              value={editedProject.imageUrl || ""}
              onChange={handleInputChange}
              className="col-span-3 border-zinc-800 focus:border-violet-500 focus:ring-violet-500"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <label htmlFor="githubUrl" className="text-right">
              GitHub URL
            </label>
            <Input
              id="githubUrl"
              name="githubUrl"
              value={editedProject.githubUrl || ""}
              onChange={handleInputChange}
              className="col-span-3 border-zinc-800 focus:border-violet-500 focus:ring-violet-500"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <label htmlFor="liveUrl" className="text-right">
              Live URL
            </label>
            <Input
              id="liveUrl"
              name="liveUrl"
              value={editedProject.liveUrl || ""}
              onChange={handleInputChange}
              className="col-span-3 border-zinc-800 focus:border-violet-500 focus:ring-violet-500"
            />
          </div>
        </div>
        <Button onClick={handleEdit} disabled={isEditing} className="w-full mt-4 bg-violet-600 hover:bg-violet-500 rounded-md">
          {isEditing ? "Saving..." : "Save changes"}
        </Button>
      </DialogContent>
    </Dialog>
  );
}