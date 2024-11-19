'use server'

import { AboutService } from "@/services/about-service"
import { PrismaAboutRepository } from "@/repositories/about-repository"
import { About } from "@prisma/client"

const aboutRepository = new PrismaAboutRepository()
const aboutService = new AboutService(aboutRepository)

export async function editAbout(id: string, data: Partial<About>) {
  try {
    await aboutService.editAbout(id, data);
    return { success: true, message: 'About updated successfully' }
  } catch (error) {
    console.error('Error updating about:', error)
    return { success: false, error: 'Failed to update about' }
  }
}