import { BlogGetService, BlogPost, BlogPostService, Project, ProjectPostService } from "./interfaces";

export class ApiBlogService implements BlogPostService {
  async createPost(post: BlogPost): Promise<void> {
    const response = await fetch('/api/posts', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(post),
    });
    if (!response.ok) {
      throw new Error('Failed to create post');
    }
  }
}

export class ApiBlogGetService implements BlogGetService {
  async getPosts(post: BlogPost): Promise<void> {
    const response = await fetch('/api/posts', {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(post),
    });
    if (!response.ok) {
      throw new Error('Failed to fetch posts');
    }
  }
}

export class ApiProjectService implements ProjectPostService {
  async createProject(project: Project): Promise<void> {
    const response = await fetch('/api/projects', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(project),
    });
    if (!response.ok) {
      throw new Error('Failed to create project');
    }
  }
}