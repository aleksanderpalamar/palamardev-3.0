import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

export async function getProjects() {
  const projects = await prisma.project.findMany({
    orderBy: { createdAt: 'desc' },
  })
  return projects
}

export async function deleteProject(id: string) {
  const project = await prisma.project.delete({
    where: { id },
  })
  return project
}