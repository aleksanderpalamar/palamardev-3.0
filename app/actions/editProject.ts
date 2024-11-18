'use server'

import { ProjectService } from "@/services/project-service"
import { PrismaProjectRepository } from "@/repositories/project-repository"
import { Project } from "@prisma/client"

const projectRepository = new PrismaProjectRepository()
const postService = new ProjectService(projectRepository)

export async function editProject(id: string, data: Partial<Project>) {
  try {
    await postService.editProject(id, data);
    return { success: true, message: 'Post updated successfully' }
  } catch (error) {
    console.error('Error updating post:', error)
    return { success: false, error: 'Failed to update post' }
  }
}