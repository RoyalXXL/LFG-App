import { prisma } from '@/shared/lib/prisma';

export interface IGameRepository {
  search(query: string): Promise<unknown[]>;
  trending(): Promise<unknown[]>;
}

export class PrismaGameRepository implements IGameRepository {
  search(query: string) {
    return prisma.game.findMany({
      where: {
        OR: [{ name: { contains: query, mode: 'insensitive' } }, { aliases: { some: { alias: { contains: query, mode: 'insensitive' } } } }],
      },
      include: { hub: true },
      take: 12,
    });
  }

  trending() {
    return prisma.game.findMany({ orderBy: { activePlayers7d: 'desc' }, take: 8, include: { hub: true } });
  }
}