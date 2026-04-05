import Link from 'next/link';
import { GameSearchBar } from '@/features/search/components/game-search-bar';
import { FilterChipRow } from '@/features/tags/components/filter-chip-row';
import { PostCard } from '@/features/posts/components/post-card';
import { LayoutShell } from '@/shared/ui/layout-shell';
import { demoPosts } from '@/shared/lib/demo-data';

export default function GamesPage() {
  return (
    <LayoutShell>
      <section className="space-y-4">
        <h1 className="text-2xl font-semibold">Game hubs</h1>
        <GameSearchBar />
        <FilterChipRow />
        <div className="space-y-3">
          {demoPosts.map((post) => (
            <Link href={`/posts/${post.id}`} key={post.id} className="block">
              <PostCard post={post} />
            </Link>
          ))}
        </div>
      </section>
    </LayoutShell>
  );
}