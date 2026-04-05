import { Badge } from '@/shared/ui/badge';
import { Button } from '@/shared/ui/button';
import { Card } from '@/shared/ui/card';

export type PostCardModel = {
  id: string;
  title: string;
  postType: string;
  platforms: string[];
  party: string;
  startTime: string;
  micRequired: boolean;
  language: string;
  rank: string;
  status: string;
  host: string;
  score: number;
  comments: number;
};

export function PostCard({ post }: { post: PostCardModel }) {
  return (
    <Card className="space-y-3">
      <div className="flex items-start justify-between gap-3">
        <div>
          <h3 className="text-base font-semibold">{post.title}</h3>
          <p className="text-xs text-slate-500">Hosted by {post.host}</p>
        </div>
        <Badge>{post.postType}</Badge>
      </div>
      <div className="flex flex-wrap gap-2 text-xs">
        {post.platforms.map((platform) => (
          <Badge key={platform}>{platform}</Badge>
        ))}
        <Badge>{post.party}</Badge>
        <Badge>{post.startTime}</Badge>
        <Badge>{post.micRequired ? 'Mic required' : 'Mic optional'}</Badge>
        <Badge>{post.language}</Badge>
        <Badge>{post.rank}</Badge>
        <Badge>{post.status}</Badge>
      </div>
      <div className="flex items-center justify-between text-xs text-slate-500">
        <span>{post.score} score • {post.comments} comments</span>
        <Button>Request to Join</Button>
      </div>
    </Card>
  );
}