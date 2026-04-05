import { notFound } from 'next/navigation';
import { demoPosts } from '@/shared/lib/demo-data';
import { PostCard } from '@/features/posts/components/post-card';
import { LayoutShell } from '@/shared/ui/layout-shell';

export default async function GameHubPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  if (!slug) notFound();

  return (
    <LayoutShell>
      <section className="space-y-4">
        <h1 className="text-2xl font-semibold">{slug.replaceAll('-', ' ')} hub</h1>
        {demoPosts.map((post) => (
          <PostCard key={post.id} post={post} />
        ))}
      </section>
    </LayoutShell>
  );
}