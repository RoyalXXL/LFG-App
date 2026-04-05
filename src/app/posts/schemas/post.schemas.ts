import { z } from 'zod';

export const postSchema = z.object({
  title: z.string().min(1),
  postType: z.enum(['raid', 'dungeon', 'pvp', 'casual']).default('casual'),
  platforms: z.array(z.string().min(1)).min(1),
  party: z.string().min(1),
  startTime: z.string().min(1),
  micRequired: z.boolean().default(false),
  language: z.string().min(1),
  rank: z.string().min(1),
  status: z.enum(['open', 'filled', 'closed']).default('open'),
  host: z.string().min(1),
  score: z.number().int().default(0),
  comments: z.number().int().default(0),
});

export type CreatePostInput = z.infer<typeof postSchema>;