'use server'

import { PrismaClient } from '@prisma/client'
import { revalidatePath } from 'next/cache'

const prisma = new PrismaClient()

export async function editProjectAction(
  id: string,
  title: string,
  description: string,
  imageUrl: string | null,
  githubUrl: string | null,
  liveUrl: string | null
) {
  try {
    const updatedProject = await prisma.project.update({
      where: { id },
      data: {
        title,
        description,
        imageUrl,
        githubUrl,
        liveUrl,
      },
    })
    revalidatePath('/dashboard/admin/projects/list')
    revalidatePath(`/projects/${id}`)

    return { success: true, project: updatedProject }
  } catch (error) {
    console.error('Error updating project:', error)
    return { success: false, error: 'Failed to update project' }
  } finally {
    await prisma.$disconnect()
  }
}