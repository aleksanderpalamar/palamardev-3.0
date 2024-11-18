'use server'

import { PostService } from "@/services/post-service"
import { PrismaPostRepository } from "@/repositories/post-repository"

const postRepository = new PrismaPostRepository()
const postService = new PostService(postRepository)

export async function deletePostAction(id: string) {
  try {
    await postService.deletePost(id);
    return { success: true, message: 'Post deleted successfully' }
  } catch (error) {
    console.error('Error deleting post:', error)
    return { success: false, error: 'Failed to delete post' }
  }
}