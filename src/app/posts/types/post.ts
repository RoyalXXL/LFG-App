export type PostStatus = 'open' | 'filled' | 'closed';

export type PostType = 'raid' | 'dungeon' | 'pvp' | 'casual';

export interface Post {
  id: string;
  title: string;
  postType: PostType;
  platforms: string[];
  party: string;
  startTime: string;
  micRequired: boolean;
  language: string;
  rank: string;
  status: PostStatus;
  host: string;
  score: number;
  comments: number;
}