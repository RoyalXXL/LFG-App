export type RankingContext = {
  userPlatform?: string;
  preferredLanguage?: string;
  now: Date;
};

export interface IRankingService<T> {
  rank(items: T[], context: RankingContext): T[];
  explain(item: T, context: RankingContext): string;
}

export class HeuristicRankingService<T extends { crossplay?: boolean; languages?: string[]; score?: number }> implements IRankingService<T> {
  rank(items: T[], context: RankingContext): T[] {
    return [...items].sort((a, b) => this.compute(b, context) - this.compute(a, context));
  }

  explain(item: T, context: RankingContext): string {
    const reasons = ['recent activity'];
    if (context.preferredLanguage && item.languages?.includes(context.preferredLanguage)) reasons.push('same language');
    if (item.crossplay) reasons.push('crossplay enabled');
    return `Best fit because ${reasons.join(', ')}`;
  }

  private compute(item: T, context: RankingContext) {
    let value = item.score ?? 0;
    if (context.preferredLanguage && item.languages?.includes(context.preferredLanguage)) value += 10;
    if (item.crossplay) value += 5;
    return value;
  }
}