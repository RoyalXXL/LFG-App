import Link from 'next/link';
import { Button } from '@/shared/ui/button';

export default function AuthPage() {
  return (
    <main className="mx-auto max-w-md space-y-4 p-4">
      <h1 className="text-2xl font-semibold">Sign in to LFG Nexus</h1>
      <Button className="w-full">Continue with email</Button>
      <Button className="w-full" variant="outline">Continue as guest</Button>
      <p className="text-xs text-slate-500">Guest mode allows read-only browsing and limited join requests.</p>
      <Link href="/onboarding" className="text-sm text-brand-700">Go to onboarding</Link>
    </main>
  );
}