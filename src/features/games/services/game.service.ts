import { PrismaGameRepository } from '../repositories/game.repository';

export class GameService {
  constructor(private repo: PrismaGameRepository) {}

  search(query: string) {
    return this.repo.search(query);
  }

  trending() {
    return this.repo.trending();
  }
}