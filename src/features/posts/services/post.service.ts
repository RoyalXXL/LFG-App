import { PrismaPostRepository } from '../repositories/post.repository';

export class PostService {
  constructor(private repo: PrismaPostRepository) {}

  listByGame(gameSlug: string) {
    return this.repo.listByGame(gameSlug);
  }

  create(userId: string, data: any) {
    return this.repo.create(userId, data);
  }
}