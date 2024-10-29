'use server'

import { PrismaClient } from '@prisma/client'
import { revalidatePath } from 'next/cache'

const prisma = new PrismaClient()

export async function editPostAction(
  id: string,
  title: string,
  content: string
) {
  try {
    const updatedPost = await prisma.post.update({
      where: { id },
      data: {
        title,
        content,
      },
    })
    revalidatePath('/dashboard/admin/blog/list')
    revalidatePath(`/blog/${id}`)

    return { success: true, post: updatedPost }
  } catch (error) {
    console.error('Error updating post:', error)
    return { success: false, error: 'Failed to update post' }
  } finally {
    await prisma.$disconnect()
  }
}