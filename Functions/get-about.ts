import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function getAbout() {
  const about = await prisma.about.findMany({
    orderBy: { createdAt: 'desc' },
  })
  return about
}

export async function putAbout(id: string, title: string, content: string, description: string, imageUrl: string) {
  const about = await prisma.about.update({
    where: { id },
    data: { title, content, description, imageUrl },
  })
  return about
}

export async function deleteAbout(id: string) {
  const about = await prisma.about.delete({
    where: { id },
  })
  return about
}