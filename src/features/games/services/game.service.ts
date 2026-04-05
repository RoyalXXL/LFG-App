import { IGameRepository } from '@/features/games/repositories/game.repository';

export class GameService {
  constructor(private readonly repo: IGameRepository) {}

  search(query: string) {
    return this.repo.search(query);
  }

  trending() {
    return this.repo.trending();
  }
}