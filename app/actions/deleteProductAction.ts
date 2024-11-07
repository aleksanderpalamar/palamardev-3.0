'use server'

import { deleteProduct } from '@/Functions/get-products'
import { revalidatePath } from 'next/cache'

export async function deleteProductAction(id: string) {
  try {
    await deleteProduct(id)
    revalidatePath('/dashboard/admin/products/list')
    return { success: true }
  } catch (error) {
    console.error('Error deleting post:', error)
    return { success: false, error: 'Failed to delete post' }    
  }
}