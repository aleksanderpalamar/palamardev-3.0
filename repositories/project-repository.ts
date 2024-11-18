import { ProjectRepository } from "@/interface/data-access";
import { Project } from "@prisma/client";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export class PrismaProjectRepository implements ProjectRepository {
  async getProject(id: string) {
    return prisma.project.findUnique({ where: { id } });
  }

  async updateProject(id: string, data: Partial<Project>) {
    return prisma.project.update({ where: { id }, data });
  }

  async deleteProject(id: string) {
    await prisma.project.delete({ where: { id } });
  }
}