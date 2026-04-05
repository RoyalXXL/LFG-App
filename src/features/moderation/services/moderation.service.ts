export interface ModerationProvider {
  queue(gameHubId: string): Promise<Array<{ id: string; reason: string }>>;
}

export class ModerationService {
  constructor(private readonly provider: ModerationProvider) {}

  getQueue(gameHubId: string) {
    return this.provider.queue(gameHubId);
  }
}