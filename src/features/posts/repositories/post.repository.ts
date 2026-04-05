import { prisma } from '@/shared/lib/prisma';
import { CreatePostInput } from '@/features/posts/schemas/post.schema';

export interface IPostRepository {
  create(authorId: string, input: CreatePostInput): Promise<{ id: string }>;
  listByGame(gameSlug: string): Promise<unknown[]>;
}

export class PrismaPostRepository implements IPostRepository {
  async create(authorId: string, input: CreatePostInput) {
    const created = await prisma.lFGPost.create({
      data: { ...input, authorId, timezone: 'UTC', postType: input.postType, joinMode: input.joinMode },
      select: { id: true },
    });
    return created;
  }

  async listByGame(gameSlug: string) {
    return prisma.lFGPost.findMany({
      where: { game: { slug: gameSlug } },
      include: { author: true, game: true, tags: true },
      orderBy: { createdAt: 'desc' },
      take: 30,
    });
  }
}