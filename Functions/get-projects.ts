import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

export async function getProjectById(id: string) {
  const project = await prisma.project.findUnique({
    where: { id },
  })
  return project
}

export async function getProjects() {
  const projects = await prisma.project.findMany({
    orderBy: { createdAt: 'desc' },
  })
  return projects
}

export async function putProject(id: string, title: string, description: string, imageUrl: string, githubUrl: string, liveUrl: string) {
  const project = await prisma.project.update({
    where: { id },
    data: { title, description, imageUrl, githubUrl, liveUrl },
  })
  return project
}

export async function deleteProject(id: string) {
  const project = await prisma.project.delete({
    where: { id },
  })
  return project
}