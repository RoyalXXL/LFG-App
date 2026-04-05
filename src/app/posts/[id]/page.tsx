import { notFound } from 'next/navigation';
import { PostCard } from '@/features/posts/components/post-card';
import { demoPosts } from '@/shared/lib/demo-data';

type PostPageProps = {
  params: {
    id: string;
  };
};

export default function PostPage({ params }: PostPageProps) {
  const post = demoPosts.find((item) => item.id === params.id);

  if (!post) {
    notFound();
  }

  return (
    <main className="mx-auto max-w-2xl p-4">
      <div className="mb-2 text-sm text-slate-500">
        Platforms: {post.platforms.map((platform: string) => platform).join(', ')}
      </div>
      <PostCard post={post} />
    </main>
  );
}