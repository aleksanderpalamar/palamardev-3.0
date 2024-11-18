import { AboutRepository } from "@/interface/data-access";
import { About } from "@prisma/client";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export class PrismaAboutRepository implements AboutRepository {
  async getAbout(id: string) {
    return prisma.about.findUnique({ where: { id } });
  }

  async updateAbout(id: string, data: Partial<About>) {
    return prisma.about.update({ where: { id }, data });
  }

  async deleteAbout(id: string): Promise<void> {
    await prisma.about.delete({ where: { id } });
  }
}