import {
  BlogGetService,
  BlogPost,
  BlogPostService,
  Product,
  ProductGetService,
  ProductPostService,
  Project,
  ProjectPostService
} from "./interfaces";

export class ApiProductGetService implements ProductGetService {
  async getProducts(product: Product): Promise<void> {
    const response = await fetch("/api/products", {
      method: "GET",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(product)
    });
    if (!response.ok) {
      throw new Error("Failed to fetch products");
    }
  }
}

export class ApiProductPostService implements ProductPostService {
  async createProduct(product: Product): Promise<void> {
    const response = await fetch("/api/products", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(product)
    });
    if (!response.ok) {
      throw new Error("Failed to create product");
    }
  }
}

export class ApiBlogService implements BlogPostService {
  async createPost(post: BlogPost): Promise<void> {
    const response = await fetch("/api/posts", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(post)
    });
    if (!response.ok) {
      throw new Error("Failed to create post");
    }
  }
}

export class ApiBlogGetService implements BlogGetService {
  async getPosts(post: BlogPost): Promise<void> {
    const response = await fetch("/api/posts", {
      method: "GET",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(post)
    });
    if (!response.ok) {
      throw new Error("Failed to fetch posts");
    }
  }
}

export class ApiProjectService implements ProjectPostService {
  async createProject(project: Project): Promise<void> {
    const response = await fetch("/api/projects", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(project)
    });
    if (!response.ok) {
      throw new Error("Failed to create project");
    }
  }
}
