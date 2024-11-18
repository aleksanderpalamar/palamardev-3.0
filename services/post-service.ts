import { PostRepository } from "@/interface/data-access";
import { Post } from "@prisma/client";

export class PostService {
  constructor(private postRepository: PostRepository) {}

  async editPost(id: string, data: Partial<Post>) {
    try {
      return this.postRepository.updatePost(id, data);      
    } catch (error) {
      console.error('Error updating post:', error)
      return { success: false, error: 'Failed to update post' }      
    }
  }

  async deletePost(id: string) {
    try {
      return this.postRepository.deletePost(id);      
    } catch (error) {
      console.error('Error deleting post:', error)
      return { success: false, error: 'Failed to delete post' }      
    }
  }
}