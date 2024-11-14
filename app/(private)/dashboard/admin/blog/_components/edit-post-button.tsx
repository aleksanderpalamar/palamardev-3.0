"use client";

import { editPostAction } from "@/app/actions/editPost";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Loader, Pencil, Save } from "lucide-react";
import { Input } from "@/components/ui/input";
import RichTextEditor from "@/components/RichTextEditor";
import { Button } from "@/components/ui/button";


export interface PostProps {
  id: string;
  title: string;
  content: string;
}

interface EditPostButtonProps {
  post: PostProps;
}

export default function EditPostButton({ post }: EditPostButtonProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedPost, setEditedPost] = useState(post);
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();

  const handleEdit = async () => {
    setIsEditing(true)
    try {
      const result = await editPostAction(
        editedPost.id,
        editedPost.title,
        editedPost.content
      )
      if (result.success) {
        // The post was edited successfully, and the page will be revalidated
        alert('Post edited successfully.')
        router.refresh()
      } else {
        alert('Failed to edit post. Please try again.')
      }
    } catch (error) {
      console.error('Error editing post:', error)
      alert('An error occurred while editing the post.')
    } finally {
      setIsEditing(false)
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setEditedPost((prev) => ({ ...prev, [name]: value }));
  }

  const handleRichTextEditorChange = (value: string) => {
    setEditedPost((prev) => ({ ...prev, content: value }));    
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
          <DialogTitle>Editing Post</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="flex flex-col space-y-2 w-full">
            <label htmlFor="title">Title</label>
            <Input 
              id="title"
              name="title"
              value={editedPost.title}
              onChange={handleInputChange}
            />
          </div>
          <div className="flex flex-col space-y-2 w-full">
            <RichTextEditor 
              value={editedPost.content}
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