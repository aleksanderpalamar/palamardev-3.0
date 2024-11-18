import { ProductRepository } from "@/interface/data-access";
import { Product } from "@prisma/client";

export class ProductService {
  constructor(private productRepository: ProductRepository) {}

  async editProduct(id: string, data: Partial<Product>) {
    try {
      return this.productRepository.updateProduct(id, data);
    } catch (error) {
      console.error('Error updating product:', error)
      return { success: false, error: 'Failed to update product' }
    }
  }

  async deleteProduct(id: string) {
    try {
      return this.productRepository.deleteProduct(id);
    } catch (error) {
      console.error('Error deleting product:', error)
      return { success: false, error: 'Failed to delete product' }
    }
  }
}