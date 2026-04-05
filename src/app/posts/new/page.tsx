import { Button } from '@/shared/ui/button';
import { Card } from '@/shared/ui/card';

export default function CreatePostPage() {
  return (
    <main className="mx-auto max-w-3xl space-y-4 p-4">
      <h1 className="text-2xl font-semibold">Create an LFG post</h1>
      <Card className="space-y-3">
        <input className="w-full rounded border border-slate-300 p-2 text-sm dark:border-slate-700 dark:bg-slate-950" placeholder="Need 2 for ranked" />
        <textarea className="w-full rounded border border-slate-300 p-2 text-sm dark:border-slate-700 dark:bg-slate-950" placeholder="Describe role needs, run expectations, and vibes." rows={5} />
        <details>
          <summary className="cursor-pointer text-sm font-medium">Advanced options</summary>
          <p className="mt-2 text-xs text-slate-500">Rank range, age gate, recurring schedule, languages, and moderation defaults.</p>
        </details>
        <Button>Publish post</Button>
      </Card>
    </main>
  );
}