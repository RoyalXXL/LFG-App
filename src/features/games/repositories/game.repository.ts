import { PrismaClient } from '@prisma/client';

export class PrismaGameRepository {
  private prisma = new PrismaClient();

  async search(query: string) {
    return this.prisma.game.findMany({
      where: {
        OR: [
          { name: { contains: query, mode: 'insensitive' } },
          { aliases: { some: { alias: { contains: query, mode: 'insensitive' } } } },
        ],
      },
      include: { aliases: true },
    });
  }

  async trending() {
    return this.prisma.game.findMany({
      orderBy: { activePlayers7d: 'desc' },
      take: 10,
      include: { aliases: true },
    });
  }
}