import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function getProducts() {
  const products = await prisma.product.findMany({
    orderBy: { createdAt: 'desc' },
  })
  return products
}

export async function getProductById(id: string) {
  const product = await prisma.product.findUnique({
    where: { id },
  })
  return product
}

export async function putProduct(id: string, title: string, description: string, imageUrl: string, price: number) {
  const product = await prisma.product.update({
    where: { id },
    data: { title, description, imageUrl, price },
  })
  return product
}

export async function deleteProduct(id: string) {
  const product = await prisma.product.delete({
    where: { id },
  })
  return product
}