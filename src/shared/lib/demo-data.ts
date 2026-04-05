import type { Post } from '@/features/posts/types/post';

export const demoPost: Post = {
  id: 'demo-1',
  title: 'Need one more for final checkpoint',
  postType: 'raid',
  platforms: ['PC', 'PS5'],
  party: '5/6',
  startTime: 'Now',
  micRequired: true,
  language: 'English',
  rank: 'Any',
  status: 'open',
  host: 'Hosty',
  score: 12,
  comments: 4,
};

export const demoPosts: Post[] = [demoPost];