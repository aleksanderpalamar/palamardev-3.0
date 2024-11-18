'use server'

import { PostService } from "@/services/post-service"
import { PrismaPostRepository } from "@/repositories/post-repository"
import { Post } from "@prisma/client"

const postRepository = new PrismaPostRepository()
const postService = new PostService(postRepository)

export async function editPost(id: string, data: Partial<Post>) {
  try {
    await postService.editPost(id, data);
    return { success: true, message: 'Post updated successfully' }
  } catch (error) {
    console.error('Error updating post:', error)
    return { success: false, error: 'Failed to update post' }
  }
}