'use server'

import { PrismaClient } from '@prisma/client'
import { revalidatePath } from 'next/cache'

const prisma = new PrismaClient()

export async function editAboutAction(
  id: string,
  title: string,
  content: string,
  description: string,
  imageUrl: string
) {
  try {
    const updatedAbout = await prisma.about.update({
      where: { id },
      data: {
        title,
        content,
        description,
        imageUrl,
      },
    })
    revalidatePath(`/about/`)
    return { success: true, about: updatedAbout }
  } catch (error) {
    console.error('Error updating about:', error)
    return { success: false, error: 'Failed to update about' }    
  } finally {
    await prisma.$disconnect()
  }
}