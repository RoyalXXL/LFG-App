import { createPostSchema, CreatePostInput } from '@/features/posts/schemas/post.schema';
import { IPostRepository } from '@/features/posts/repositories/post.repository';

export class PostService {
  constructor(private readonly repo: IPostRepository) {}

  async create(authorId: string, input: CreatePostInput) {
    const parsed = createPostSchema.parse(input);
    return this.repo.create(authorId, parsed);
  }

  async listByGame(gameSlug: string) {
    return this.repo.listByGame(gameSlug);
  }
}