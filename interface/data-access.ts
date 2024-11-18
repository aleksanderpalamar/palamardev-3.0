import { About, Post, Product, Project } from "@prisma/client";

export interface PostRepository {
  getPost(id: string): Promise<Post | null>;
  updatePost(id: string, data: Partial<Post>): Promise<Post>;
  deletePost(id: string): Promise<void>;
}

export interface ProjectRepository {
  getProject(id: string): Promise<Project | null>;
  updateProject(id: string, data: Partial<Project>): Promise<Project>;
  deleteProject(id: string): Promise<void>;
}

export interface AboutRepository {
  getAbout(id: string): Promise<About | null>;
  updateAbout(id: string, data: Partial<About>): Promise<About>;
  deleteAbout(id: string): Promise<void>;
}

export interface ProductRepository {
  getProduct(id: string): Promise<Product | null>;
  updateProduct(id: string, data: Partial<Product>): Promise<Product>;
  deleteProduct(id: string): Promise<void>;
}