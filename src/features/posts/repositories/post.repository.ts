import { PrismaClient } from '@prisma/client';

export class PrismaPostRepository {
  private prisma = new PrismaClient();

  async listByGame(gameSlug: string) {
    return this.prisma.lFGPost.findMany({
      where: {
        game: { slug: gameSlug },
      },
      include: {
        game: true,
        author: { select: { id: true, username: true } },
        tags: true,
        _count: { select: { comments: true, votes: true } },
      },
      orderBy: { createdAt: 'desc' },
    });
  }

  async create(userId: string, data: any) {
    return this.prisma.lFGPost.create({
      data: {
        ...data,
        authorId: userId,
      },
    });
  }
}