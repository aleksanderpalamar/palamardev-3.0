'use server'

import { deletePost } from '@/Functions/get-posts'
import { revalidatePath } from 'next/cache'

export async function deletePostAction(id: string) {
  try {
    await deletePost(id)
    revalidatePath('/dashboard/admin/blog/list')
    return { success: true }
  } catch (error) {
    console.error('Error deleting post:', error)
    return { success: false, error: 'Failed to delete post' }
  }
}