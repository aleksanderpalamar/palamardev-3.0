export interface BlogPost {
  title: string
  content: string
}

export interface Project {
  title: string
  description: string
  imageUrl: string
  githubUrl: string
  liveUrl: string
}

export interface Product {
  title: string
  description: string
  imageUrl: string
  price: number
}

export interface About {
  title?: string
  description?: string
  content: string
  imageUrl: string
}

export interface AboutGetService {
  getAbout(about: About): Promise<void>
}

export interface AboutPostService {
  createAbout(about: About): Promise<void>
}

export interface BlogPostService {
  createPost(post: BlogPost): Promise<void>
}

export interface BlogGetService {
  getPosts(post: BlogPost): Promise<void>
}

export interface ProjectPostService {
  createProject(project: Project): Promise<void>
}

export interface ProductPostService {
  createProduct(product: Product): Promise<void>
}

export interface ProductGetService {
  getProducts(product: Product): Promise<void>
}