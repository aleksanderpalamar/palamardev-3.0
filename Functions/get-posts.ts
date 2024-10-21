import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function getPosts() {
  const posts = await prisma.post.findMany({
    orderBy: { createdAt: 'desc' },
  })
  return posts
}

export async function getSinglePost(id: string) {
  const post = await prisma.post.findUnique({
    where: { id },
  })
  return post
}

export async function putPost(id: string, title: string, content: string) {
  const post = await prisma.post.update({
    where: { id },
    data: { title, content },
  })
  return post
}

export async function deletePost(id: string) {
  const post = await prisma.post.delete({
    where: { id },
  })
  return post
}