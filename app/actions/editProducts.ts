'use server';

import { ProductService } from "@/services/product-service";
import { PrismaProductRepository } from "@/repositories/product-repository";
import { Product } from "@prisma/client";

const productRepository = new PrismaProductRepository()
const productService = new ProductService(productRepository)

export default async function editProducts(id: string, data: Partial<Product>) {
  try {
    await productService.editProduct(id, data);
    return { success: true, message: 'Product updated successfully' }
  } catch (error) {
    console.error('Error updating product:', error)
    return { success: false, error: 'Failed to update product' }
  }  
}