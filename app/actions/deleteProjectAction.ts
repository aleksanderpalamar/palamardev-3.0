'use server'

import { ProjectService } from "@/services/project-service"
import { PrismaProjectRepository } from "@/repositories/project-repository"

const projectRepository = new PrismaProjectRepository()
const projectService = new ProjectService(projectRepository)

export async function deleteProjectAction(id: string) {
  try {
    await projectService.deleteProject(id)
    return { success: true, message: 'Project deleted successfully' }
  } catch (error) {
    console.error('Error deleting project:', error)
    return { success: false, error: 'Failed to delete project' }
  }
}