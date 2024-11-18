import { ProductRepository } from "@/interface/data-access";
import { Product } from "@prisma/client";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export class PrismaProductRepository implements ProductRepository {
  async getProduct(id: string) {
    return prisma.product.findUnique({ where: { id } });
  }

  async updateProduct(id: string, data: Partial<Product>) {
    return prisma.product.update({ where: { id }, data });
  }

  async deleteProduct(id: string): Promise<void> {
    await prisma.product.delete({ where: { id } });
  }
}