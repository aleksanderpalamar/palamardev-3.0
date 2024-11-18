import { ProjectRepository } from "@/interface/data-access";
import { Project } from "@prisma/client";

export class ProjectService {
  constructor(private projectRepository: ProjectRepository) {}

  async editProject(id: string, data: Partial<Project>) {
    try {
      await this.projectRepository.updateProject(id, data)
    } catch (error) {
      console.error('Error updating project:', error)
      return { success: false, error: 'Failed to update project' }
    }
  }

  async deleteProject(id: string) {
    try {
      await this.projectRepository.deleteProject(id)
    } catch (error) {
      console.error('Error deleting project:', error)
      return { success: false, error: 'Failed to delete project' }
    }
  }
}