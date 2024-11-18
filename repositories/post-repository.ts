import { PostRepository } from "@/interface/data-access";
import { Post } from "@prisma/client";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export class PrismaPostRepository implements PostRepository {
  async getPost(id: string) {
    return prisma.post.findUnique({ where: { id } });
  }

  async updatePost(id: string, data: Partial<Post>) {
    return prisma.post.update({ where: { id }, data });
  }

  async deletePost(id: string) {
    await prisma.post.delete({ where: { id } });
  }
}