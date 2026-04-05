import type { Post } from '@/features/posts/types/post';

type PostCardProps = {
  post: Post;
};

export function PostCard({ post }: PostCardProps) {
  return (
    <article className="rounded-lg border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-800 dark:bg-slate-900">
      <header className="mb-2 flex items-center justify-between gap-2">
        <h2 className="text-base font-semibold">{post.title}</h2>
        <span className="rounded-full bg-slate-100 px-2 py-1 text-xs dark:bg-slate-800">{post.party}</span>
      </header>

      <p className="mb-2 text-sm text-slate-600 dark:text-slate-300">
        {post.postType.toUpperCase()} • {post.startTime} • {post.language}
      </p>

      <ul className="mb-3 flex flex-wrap gap-2">
        {post.platforms.map((platform: string) => (
          <li key={platform} className="rounded-md border border-slate-200 px-2 py-1 text-xs dark:border-slate-700">
            {platform}
          </li>
        ))}
      </ul>

      {post.micRequired ? <p className="mb-3 text-sm font-medium">Mic required</p> : null}

      <button type="button" className="rounded-md bg-brand-500 px-3 py-2 text-sm font-medium text-white hover:bg-brand-700">
        Request to Join
      </button>
    </article>
  );
}