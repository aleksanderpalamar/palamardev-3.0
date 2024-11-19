'use server'

import { ProductService } from "@/services/product-service"
import { PrismaProductRepository } from "@/repositories/product-repository"

const productRepository = new PrismaProductRepository()
const productService = new ProductService(productRepository)

export async function deleteProduct(id: string) {
  try {
    await productService.deleteProduct(id);
    return { success: true, message: 'Product deleted successfully' }
  } catch (error) {
    console.error('Error deleting product:', error)
    return { success: false, error: 'Failed to delete product' }
  }
}