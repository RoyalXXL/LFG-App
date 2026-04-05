import { describe, expect, it } from 'vitest';
import { HeuristicRankingService } from '@/features/matchmaking/services/ranking.service';

describe('HeuristicRankingService', () => {
  it('prioritizes language matches and crossplay', () => {
    const service = new HeuristicRankingService<{ id: string; languages: string[]; crossplay: boolean; score: number }>();
    const items = [
      { id: 'a', languages: ['English'], crossplay: true, score: 1 },
      { id: 'b', languages: ['French'], crossplay: false, score: 10 },
    ];

    const ranked = service.rank(items, { preferredLanguage: 'English', now: new Date() });

    expect(ranked[0].id).toBe('a');
    expect(service.explain(ranked[0], { preferredLanguage: 'English', now: new Date() })).toContain('same language');
  });
});
