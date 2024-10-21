'use client'

import { useState } from 'react'
import { Loader2, Trash2 } from 'lucide-react'
import { deleteProjectAction } from '@/app/actions/deleteProjectAction'

export default function DeleteProjectButton({ projectId }: { projectId: string }) {
  const [isDeleting, setIsDeleting] = useState(false)

  const handleDelete = async () => {
    setIsDeleting(true)
    const result = await deleteProjectAction(projectId)
    if (result.success) {
      // The post was deleted successfully, and the page will be revalidated
    } else {
      alert('Failed to delete post. Please try again.')
    }
    setIsDeleting(false)
  }

  return (
    <button
      onClick={handleDelete}
      disabled={isDeleting}
      className="font-medium text-rose-600 hover:text-rose-500 disabled:opacity-50"
    >
      {isDeleting ? (
        <div className="flex justify-center">
          <Loader2 className="w-6 h-6 animate-spin" />
        </div>
      ) : (
        <div className="flex justify-center bg-rose-100/10 hover:bg-rose-100/20 cursor-pointer rounded-md px-2 py-1">
          <Trash2 className="w-6 h-6" />
        </div>
      )}
    </button>
  )
}