'use server'

import { deleteProject } from '@/Functions/get-projects'
import { revalidatePath } from 'next/cache'

export async function deleteProjectAction(id: string) {
  try {
    await deleteProject(id)
    revalidatePath('/dashboard/admin/projects/list')
    return { success: true }
  } catch (error) {
    console.error('Error deleting post:', error)
    return { success: false, error: 'Failed to delete post' }
  }
}