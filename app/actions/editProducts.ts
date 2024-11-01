'use server';

import { PrismaClient } from '@prisma/client';
import { revalidatePath } from 'next/cache';

const prisma = new PrismaClient();

export async function editProductAction(
  id: string,
  title: string,
  description: string,
  imageUrl: string | null,
  price: number
) {
  try {
    const updatedProduct = await prisma.product.update({
      where: { id },
      data: {
        title,
        description,
        imageUrl,
        price
      },
    })
    revalidatePath('/dashboard/admin/products/list')
    revalidatePath(`/products/${id}`)

    return { success: true, product: updatedProduct }
  } catch (error) {
    console.error('Error updating product:', error)
    return { success: false, error: 'Failed to update product' }
  } finally {
    await prisma.$disconnect()
  }
}