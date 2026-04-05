import { PropsWithChildren } from 'react';
import Link from 'next/link';

export function LayoutShell({ children }: PropsWithChildren) {
  return (
    <div className="mx-auto grid min-h-screen max-w-7xl grid-cols-1 gap-4 p-4 md:grid-cols-[220px_1fr] xl:grid-cols-[220px_1fr_280px]">
      <aside className="hidden rounded-xl border border-slate-200 bg-white p-3 md:block dark:border-slate-800 dark:bg-slate-900">
        <nav className="space-y-2 text-sm">
          <Link href="/games">Games</Link>
          <br />
          <Link href="/posts/new">Create post</Link>
          <br />
          <Link href="/messages/demo-thread">Messages</Link>
          <br />
          <Link href="/notifications">Notifications</Link>
        </nav>
      </aside>
      <main>{children}</main>
      <aside className="hidden rounded-xl border border-slate-200 bg-white p-3 xl:block dark:border-slate-800 dark:bg-slate-900">
        <h3 className="text-sm font-semibold">Trust & activity</h3>
        <p className="mt-2 text-xs text-slate-500">Host reliability, expiring posts, and moderation shortcuts.</p>
      </aside>
    </div>
  );
}