import { z } from 'zod';

export const createPostSchema = z.object({
  title: z.string().min(6).max(120),
  body: z.string().min(10).max(2000),
  gameId: z.string().cuid(),
  postType: z.enum(['casual', 'ranked', 'raid', 'dungeon', 'teaching', 'trade', 'clan', 'tournament', 'other']),
  partySizeNeeded: z.number().int().positive().max(40),
  currentPartySize: z.number().int().nonnegative().max(40),
  joinMode: z.enum(['instant_join', 'request_approval', 'invite_only']),
  crossplay: z.boolean(),
  micRequired: z.boolean(),
});

export type CreatePostInput = z.infer<typeof createPostSchema>;